// ============================================================
// STUDENT DATA — ADTEC JTM Kampus Sandakan
// ============================================================
// HOW TO UPDATE:
//   1. Change the semester numbers (sem1–sem4) for each course.
//   2. Update 'lelaki' and 'perempuan' counts.
//   3. Update 'lastUpdated' to today's date.
//   4. Update 'prevSessionTotal' with the PREVIOUS session's grand total.
//   5. Update 'graduationRate' with the latest figure from JPK.

const campusInfo = {
    name: "ADTEC JTM Kampus Sandakan",
    fullName: "Pusat Latihan Teknologi Tinggi (ADTEC) Jabatan Tenaga Manusia",
    established: 1994,
    accreditation: "Jabatan Pembangunan Kemahiran (JPK)",
    capacity: 800,
    totalStaff: 85,
    totalInstructors: 52,
    address: "Batu 5, Jalan Sibuga, 90000 Sandakan, Sabah",
    phone: "089-240 500",
    email: "ilpsdk@jtm.gov.my",
    website: "ilpsdk.gov.my",
    lastUpdated: "13 Julai 2026",
    prevSessionTotal: 580,
    graduationRate: 92.5,
    employmentRate: 87.3,
};



// ============================================================
// HISTORICAL TRENDS DATA (Dummy Data)
// =============================================================
const historicalData = [
    { year: 2022, total: 420 },
    { year: 2023, total: 485 },
    { year: 2024, total: 512 },
    { year: 2025, total: 580 },
    { year: 2026, total: 0 } // This will be dynamically replaced by grandTotal in script.js
];

// ============================================================
// CAMPUS FACILITIES DATA (Dummy Data)
// =============================================================
const facilitiesData = [
    { name: "Asrama Lelaki", count: 2, capacity: 500, icon: "🏢" },
    { name: "Asrama Perempuan", count: 1, capacity: 300, icon: "🏢" },
    { name: "Dewan Kuliah Utama", count: 1, capacity: 250, icon: "🏫" },
    { name: "Bilik Kuliah Biasa", count: 12, capacity: 360, icon: "🚪" },
    { name: "Bengkel Latihan", count: 8, capacity: 240, icon: "🔧" },
    { name: "Makmal Komputer", count: 4, capacity: 120, icon: "💻" },
    { name: "Perpustakaan", count: 1, capacity: 100, icon: "📚" },
    { name: "Dewan Serbaguna / Sukan", count: 1, capacity: 400, icon: "🏀" }
];
