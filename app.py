import streamlit as st
import pandas as pd
import plotly.express as px
import os

# Page Config
st.set_page_config(
    page_title="ADTEC Sandakan Dashboard",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for a premium look
st.markdown("""
<style>
    .metric-card {
        background-color: #ffffff;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin-bottom: 20px;
        border-top: 4px solid #1f77b4;
    }
    .metric-value {
        font-size: 3.5rem;
        font-weight: 800;
        color: #1f77b4;
        margin: 10px 0;
    }
    .metric-label {
        font-size: 1.2rem;
        font-weight: 600;
        color: #444444;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .main-header {
        font-size: 2.8rem;
        font-weight: 800;
        background: -webkit-linear-gradient(45deg, #1f77b4, #00c6ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 5px;
    }
    .sub-header {
        text-align: center;
        font-size: 1.2rem;
        color: #666666;
        margin-bottom: 40px;
        font-weight: 500;
    }
</style>
""", unsafe_allow_html=True)

# Title
st.markdown("<h1 class='main-header'>🎓 ADTEC JTM Kampus Sandakan</h1>", unsafe_allow_html=True)
st.markdown("<p class='sub-header'>Student Enrollment Dashboard (Audit & Visitor Overview)</p>", unsafe_allow_html=True)

# Load Data
@st.cache_data
def load_data():
    csv_path = "students_data.csv"
    if os.path.exists(csv_path):
        return pd.read_csv(csv_path)
    else:
        st.error(f"Data file not found at {csv_path}. Please create it.")
        return pd.DataFrame()

df = load_data()

if not df.empty:
    # 1. All students
    total_students = df['Number of Students'].sum()
    
    st.markdown(f"""
    <div class='metric-card'>
        <div class='metric-label'>Total Enrolled Students (All Semesters)</div>
        <div class='metric-value'>{total_students}</div>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("<br>", unsafe_allow_html=True)
    
    # Create two columns for the charts
    col1, col2 = st.columns(2)
    
    with col1:
        # 2. Number of students based on course
        st.markdown("### 📊 Total Students by Course")
        course_totals = df.groupby('Course')['Number of Students'].sum().reset_index()
        course_totals = course_totals.sort_values(by='Number of Students', ascending=True)
        
        fig_course = px.bar(
            course_totals, 
            x='Number of Students', 
            y='Course',
            orientation='h',
            text='Number of Students',
            color='Course',
            color_discrete_sequence=px.colors.qualitative.Pastel
        )
        fig_course.update_traces(textposition='outside', textfont_size=12)
        fig_course.update_layout(
            showlegend=False, 
            xaxis_title="", 
            yaxis_title="",
            plot_bgcolor="rgba(0,0,0,0)",
            paper_bgcolor="rgba(0,0,0,0)",
            margin=dict(l=0, r=20, t=30, b=0),
            height=400
        )
        st.plotly_chart(fig_course, use_container_width=True)

    with col2:
        # Pie chart as an extra visual flair
        st.markdown("### 🍩 Enrollment Distribution")
        fig_pie = px.pie(
            course_totals, 
            values='Number of Students', 
            names='Course',
            hole=0.4,
            color_discrete_sequence=px.colors.qualitative.Pastel
        )
        fig_pie.update_layout(
            plot_bgcolor="rgba(0,0,0,0)",
            paper_bgcolor="rgba(0,0,0,0)",
            margin=dict(l=0, r=0, t=30, b=0),
            height=400
        )
        fig_pie.update_traces(textposition='inside', textinfo='percent')
        st.plotly_chart(fig_pie, use_container_width=True)
    
    st.divider()
    
    # 3. On their course, based on sem
    st.markdown("### 📈 Student Breakdown by Course & Semester")
    
    # Interactive filter for better presentation
    selected_course = st.selectbox("Filter by Course (Optional):", ["All Courses"] + list(df['Course'].unique()))
    
    if selected_course != "All Courses":
        filtered_df = df[df['Course'] == selected_course]
    else:
        filtered_df = df
        
    fig_sem = px.bar(
        filtered_df,
        x='Course',
        y='Number of Students',
        color='Semester',
        barmode='group',
        text='Number of Students',
        color_discrete_sequence=px.colors.qualitative.Set2
    )
    fig_sem.update_traces(textposition='outside')
    fig_sem.update_layout(
        xaxis_title="", 
        yaxis_title="Number of Students",
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
        legend_title="Semester",
        height=500
    )
    st.plotly_chart(fig_sem, use_container_width=True)
    
    # Detailed Data Table
    with st.expander("📂 View Raw Data Table"):
        st.dataframe(filtered_df, use_container_width=True, hide_index=True)

else:
    st.warning("No data available to display.")

st.markdown("---")
st.markdown("<p style='text-align: center; color: #888; font-size: 0.9rem;'>System is designed to be easily updated by modifying the <code>students_data.csv</code> file.</p>", unsafe_allow_html=True)
