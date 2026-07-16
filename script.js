// =============================================================
// CHART VARIABLES
// =============================================================
let modalChart = null;

// =============================================================
// THEME MANAGEMENT
// =============================================================
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

function getTheme() {
    return localStorage.getItem('adtec-theme') || 'dark'; // Default to dark for premium feel
}
function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('adtec-theme', theme);
    if(iconSun) iconSun.style.display = theme === 'dark' ? 'block' : 'none';
    if(iconMoon) iconMoon.style.display = theme === 'dark' ? 'none' : 'block';
    
    if (modalChart && document.getElementById('course-modal').classList.contains('open')) {
        // We could rebuild modal chart here if needed, but it's redrawn on open anyway
    }
}
applyTheme(getTheme());
if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
}

// =============================================================
// SIDEBAR NAV
// =============================================================
const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const target = document.getElementById(link.dataset.section);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.getElementById('sidebar').classList.remove('open');
    });
});

const hamburgerBtn = document.getElementById('hamburger-btn');
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

// =============================================================
// GLOBAL STATE & DATA FETCHING
// =============================================================
let studentData = [];
let currentData = [];
let grandTotal = 0, totalMale = 0, totalFemale = 0;
let courseNames = [], courseTotals = [];

Papa.parse('courses.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
        // Filter out empty rows just in case
        studentData = results.data.filter(row => row.course);
        currentData = [...studentData];
        
        calculateAggregates();
        initDashboard();
        renderCourseGrid(currentData);
    },
    error: function(err) {
        console.error("Failed to load courses.csv:", err);
        document.getElementById('course-cards-grid').innerHTML = '<div style="grid-column:1/-1;text-align:center;color:red;padding:40px;">Ralat memuatkan data CSV. Pastikan anda menjalankan pelayan web tempatan.</div>';
    }
});

function calculateAggregates() {
    grandTotal = 0; totalMale = 0; totalFemale = 0;
    courseNames = []; courseTotals = [];

    studentData.forEach(c => {
        const t = c.sem1 + c.sem2 + c.sem3 + c.sem4;
        grandTotal += t;
        totalMale += c.lelaki;
        totalFemale += c.perempuan;
        courseNames.push(c.shortName || c.course);
        courseTotals.push(t);
    });
}

function initDashboard() {
    // HERO & ABOUT POPULATION
    const heroEst = document.getElementById('hero-established');
    const heroAcc = document.getElementById('hero-accreditation');
    if (heroEst) heroEst.textContent = campusInfo.established || '1994';
    if (heroAcc) heroAcc.textContent = (campusInfo.accreditation && campusInfo.accreditation.includes('JPK')) ? 'JPK' : 'DSD';

    // Populate Facilities
    if (typeof facilitiesData !== 'undefined') {
        const facEl = document.getElementById('facilities-grid');
        // Clear just in case
        if (facEl) {
            facEl.innerHTML = '';
            facilitiesData.forEach(f => {
                const d = document.createElement('div');
                d.className = 'facility-card';
                d.innerHTML = `
                    <div class="facility-icon">${f.icon}</div>
                    <div class="facility-info">
                        <h4>${f.name}</h4>
                        <p>Jumlah: <strong>${f.count}</strong> | Kapasiti: <strong>${f.capacity}</strong></p>
                    </div>
                `;
                facEl.appendChild(d);
            });
        }
    }

    // KPI POPULATION
    animateValue(document.getElementById('total-students'), grandTotal);
    if(document.getElementById('total-courses')) document.getElementById('total-courses').textContent = studentData.length;
    if(document.getElementById('grad-rate')) document.getElementById('grad-rate').textContent = campusInfo.graduationRate + '%';
    if(document.getElementById('emp-rate')) document.getElementById('emp-rate').textContent = campusInfo.employmentRate + '%';
    if(document.getElementById('last-updated')) document.getElementById('last-updated').textContent = campusInfo.lastUpdated;
}

function animateValue(el, target, suffix = '') {
    if (!el) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
    }, 20);
}

// =============================================================
// RENDERERS (Grid)
// =============================================================

function renderCourseGrid(data) {
    const grid = document.getElementById('course-cards-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (data.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-tertiary);">Tiada kursus dijumpai.</div>`;
        return;
    }

    data.forEach(c => {
        const originalIndex = studentData.indexOf(c);
        const card = document.createElement('div');
        card.className = 'course-card';
        card.onclick = () => openModal(originalIndex);

        card.innerHTML = `
            <div class="course-card-top">
                <div class="course-icon" style="background:${c.color}20; color:${c.color}; border: 1px solid ${c.color}30;">${c.icon}</div>
                <div class="course-explore">
                    <span>Lihat</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
            </div>
            <div class="course-name">${c.course}</div>
            <div class="course-desc-short">${c.desc}</div>
        `;
        grid.appendChild(card);
    });
}

// =============================================================
// SEARCH
// =============================================================
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        currentData = studentData.filter(c => c.course.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
        renderCourseGrid(currentData);
    });
}

// =============================================================
// MODAL
// =============================================================
const modal = document.getElementById('course-modal');

function openModal(idx) {
    const c = studentData[idx];
    const t = c.sem1 + c.sem2 + c.sem3 + c.sem4;
    const pct = ((t / grandTotal) * 100).toFixed(1);
    const maxSem = Math.max(c.sem1, c.sem2, c.sem3, c.sem4, 1);
    const isDark = getTheme() === 'dark';

    document.getElementById('modal-icon').textContent = c.icon;
    document.getElementById('modal-title').textContent = c.course;
    document.getElementById('modal-desc').textContent = c.desc;
    document.getElementById('modal-total').textContent = t;
    document.getElementById('modal-percent').textContent = pct + '%';
    document.getElementById('modal-male').textContent = c.lelaki;
    document.getElementById('modal-female').textContent = c.perempuan;
    
    // Rich background header
    document.getElementById('modal-header').style.background = `linear-gradient(135deg, ${c.color} 0%, ${c.color}cc 100%)`;
    document.getElementById('modal-header').style.boxShadow = `inset 0 -2px 15px rgba(0,0,0,0.2)`;

    // Gender Bar
    const totalGender = c.lelaki + c.perempuan;
    const malePct = totalGender > 0 ? (c.lelaki / totalGender) * 100 : 0;
    const femalePct = totalGender > 0 ? (c.perempuan / totalGender) * 100 : 0;
    
    document.getElementById('modal-gender-bar-male').style.width = malePct + '%';
    document.getElementById('modal-gender-bar-female').style.width = femalePct + '%';
    document.getElementById('modal-gender-male-lbl').textContent = `Lelaki (${Math.round(malePct)}%)`;
    document.getElementById('modal-gender-female-lbl').textContent = `Perempuan (${Math.round(femalePct)}%)`;

    const semContainer = document.getElementById('modal-semesters');
    semContainer.innerHTML = '';
    [
        { label: 'Semester 1', value: c.sem1 },
        { label: 'Semester 2', value: c.sem2 },
        { label: 'Semester 3', value: c.sem3 },
        { label: 'Semester 4', value: c.sem4 },
    ].forEach(s => {
        const w = (s.value / maxSem) * 100;
        const div = document.createElement('div');
        div.className = 'modal-sem-bar';
        div.innerHTML = `
            <div class="modal-sem-row"><span class="lbl">${s.label}</span><span class="val">${s.value}</span></div>
            <div class="modal-bar-track"><div class="modal-bar-fill" style="width:${w}%;background:${c.color};"></div></div>`;
        semContainer.appendChild(div);
    });

    if (modalChart) modalChart.destroy();
    const ctx = document.getElementById('modalChart').getContext('2d');
    modalChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            datasets: [{
                data: [c.sem1, c.sem2, c.sem3, c.sem4],
                borderColor: c.color,
                backgroundColor: c.color + '20', // slightly more visible
                fill: true, tension: .4, borderWidth: 3,
                pointBackgroundColor: c.color,
                pointBorderColor: isDark ? '#111827' : '#fff',
                pointBorderWidth: 2, pointRadius: 5, pointHoverRadius: 7,
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: chartTextColor(), font: { family: 'Inter', size: 11 } } },
                y: { grid: { color: chartGridColor() }, ticks: { color: chartTextColor(), font: { family: 'Inter' } }, beginAtZero: true }
            }
        }
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function chartTextColor() { return getTheme() === 'dark' ? '#94a3b8' : '#64748b'; }
function chartGridColor() { return getTheme() === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,.04)'; }

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
