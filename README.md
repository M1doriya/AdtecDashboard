# ADTEC JTM Kampus Sandakan Dashboard

This project is a Student Enrollment Dashboard built specifically for **Institut Latihan Perindustrian (ILP) Sandakan / ADTEC JTM Kampus Sandakan**. 

It is designed to be easily presented during audits or visitor briefings to show the current student enrollment numbers across all courses and semesters.

## Features
- **Premium Design:** Clean, modern, and easy-to-read charts designed to wow visitors.
- **Total Enrollment Metric:** Instantly shows the total number of students across all semesters and courses.
- **Course Breakdown:** View a horizontal bar chart and pie chart to compare course popularity.
- **Semester Breakdown:** Drill down into specific courses to see student numbers per semester.
- **Easy to Update:** No coding required to update the data! Simply edit the `students_data.csv` file.

## How to Update Data for a New Semester
Whenever a new semester starts, or if you need to correct the student numbers:
1. Open `students_data.csv` using Excel, Notepad, or any spreadsheet/text editor.
2. Update the numbers in the `Number of Students` column.
3. Save the file.
4. Refresh the dashboard in your web browser. The charts will update automatically!

## How to Run Locally
1. Ensure you have Python installed.
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the dashboard:
   ```bash
   streamlit run app.py
   ```

## How to Deploy to Railway or Streamlit Cloud
Since the code is already prepared:
1. Upload this folder to a new **GitHub repository**.
2. To deploy on **Streamlit Community Cloud** (Free and Recommended):
   - Go to [share.streamlit.io](https://share.streamlit.io/)
   - Connect your GitHub account and select the repository.
   - Set the Main file path to `app.py`.
   - Click "Deploy".
3. To deploy on **Railway**:
   - Create an account on [Railway.app](https://railway.app/).
   - Click "New Project" -> "Deploy from GitHub repo".
   - Railway will automatically detect the `requirements.txt` and run it if you configure the start command as `streamlit run app.py --server.port $PORT --server.address 0.0.0.0`.
