import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Tooltip, Legend, Filler
} from 'chart.js';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    dashboardStats, chartData, upcomingEvents, recentNotifications,
    feePayments, students, examResults, attendanceData, timetable, announcements
} from '../data/dummyData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: { usePointStyle: true, font: { size: 12, family: 'Inter' }, padding: 16 }
        }
    },
    scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11, family: 'Inter' } } },
        y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 11, family: 'Inter' } } }
    }
};

// ======================== WELCOME BANNER ========================
function WelcomeBanner({ user }) {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-IN', { weekday: 'long' });
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const greetings = {
        admin: { title: `Welcome back, ${user.name}! 👋`, sub: "Here's what's happening at Raghukul Academy today." },
        teacher: { title: `Good day, ${user.name}! 📚`, sub: "Here's your teaching overview for today." },
        parent: { title: `Hello, ${user.name}! 👨‍👧`, sub: `Viewing dashboard for ${user.childName} — Class ${user.childClass}` },
        student: { title: `Hey, ${user.name}! 🎓`, sub: "Here's your academic overview. Keep up the great work!" },
    };
    const g = greetings[user.role] || greetings.admin;

    const gradients = {
        admin: 'var(--primary-gradient)',
        teacher: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        parent: 'linear-gradient(135deg, #0d904f 0%, #34d399 100%)',
        student: 'linear-gradient(135deg, #e37400 0%, #fbbf24 100%)',
    };

    return (
        <div className="row mb-4">
            <div className="col-12">
                <div style={{
                    background: gradients[user.role],
                    borderRadius: 'var(--radius-lg)',
                    padding: '28px 32px',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: -30, right: -10, width: 180, height: 180, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: -40, right: 100, width: 120, height: 120, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }}></div>
                    <div className="row align-items-center position-relative">
                        <div className="col-md-8">
                            <h4 className="fw-bold mb-1">{g.title}</h4>
                            <p className="mb-0 opacity-75">{g.sub}</p>
                        </div>
                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                            <div className="d-flex justify-content-md-end gap-2">
                                <span className="badge bg-white text-primary px-3 py-2 fw-semibold">
                                    <i className="bi bi-calendar3 me-1"></i> {dateStr}
                                </span>
                                <span className="badge bg-white bg-opacity-25 px-3 py-2 fw-semibold">
                                    <i className="bi bi-clock me-1"></i> {dayName}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ======================== STAT CARDS COMPONENT ========================
function StatCards({ stats }) {
    const colClass = stats.length <= 4 ? 'col-xl-3 col-lg-3 col-md-6 col-sm-6' : 'col-xl-2 col-lg-4 col-md-4 col-sm-6';
    return (
        <div className="row g-3 mb-4">
            {stats.map((stat, idx) => (
                <div key={idx} className={`${colClass} fade-in fade-in-delay-${(idx % 4) + 1}`}>
                    <div className={`stat-card ${stat.color}`}>
                        <div className={`stat-icon ${stat.color}`}>
                            <i className={`bi ${stat.icon}`}></i>
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p className="mb-0">{stat.title}</p>
                            <div className="d-flex align-items-center gap-2">
                                <small style={{ color: 'var(--text-muted)', fontSize: 11 }}>{stat.sub}</small>
                                {stat.trend && (
                                    <span className={`stat-trend ${stat.trendDir}`}>
                                        <i className={`bi bi-arrow-${stat.trendDir}`}></i> {stat.trend}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ======================== ADMIN DASHBOARD ========================
function AdminDashboard() {
    const navigate = useNavigate();
    const stats = [
        { title: "Total Students", value: dashboardStats.totalStudents.toLocaleString(), sub: `${dashboardStats.activeStudents} Active`, icon: "bi-people-fill", color: "blue", trend: "+12", trendDir: "up" },
        { title: "Total Teachers", value: dashboardStats.totalTeachers, sub: "8 Departments", icon: "bi-person-badge-fill", color: "purple", trend: "+2", trendDir: "up" },
        { title: "Attendance Today", value: `${dashboardStats.attendanceToday}%`, sub: "1,154 of 1,248", icon: "bi-calendar-check-fill", color: "green", trend: "+1.2%", trendDir: "up" },
        { title: "Pending Fees", value: `₹${(dashboardStats.pendingFees / 1000).toFixed(0)}K`, sub: "53 Students", icon: "bi-wallet-fill", color: "orange", trend: "-8%", trendDir: "down" },
        { title: "Upcoming Events", value: dashboardStats.totalEvents, sub: "Next: PTM 25 Feb", icon: "bi-calendar-event-fill", color: "teal" },
        { title: "Total Classes", value: dashboardStats.totalClasses, sub: "10 Grades", icon: "bi-building", color: "red" },
    ];

    const quickActions = [
        { icon: "bi-person-plus-fill", label: "Add Student", bg: "var(--primary-light)", color: "var(--primary)", path: "/students" },
        { icon: "bi-person-badge", label: "Add Teacher", bg: "var(--accent-purple-light)", color: "var(--accent-purple)", path: "/teachers" },
        { icon: "bi-calendar-check", label: "Mark Attendance", bg: "var(--accent-green-light)", color: "var(--accent-green)", path: "/attendance" },
        { icon: "bi-wallet2", label: "Collect Fee", bg: "var(--accent-orange-light)", color: "var(--accent-orange)", path: "/fees" },
        { icon: "bi-megaphone", label: "Send Notice", bg: "var(--accent-teal-light)", color: "var(--accent-teal)", path: "/notifications" },
        { icon: "bi-journal-plus", label: "Create Exam", bg: "var(--accent-red-light)", color: "var(--accent-red)", path: "/exams" },
    ];

    const attendanceChartData = {
        labels: chartData.monthlyAttendance.labels,
        datasets: [{
            label: 'Attendance %', data: chartData.monthlyAttendance.data,
            borderColor: '#1a73e8', backgroundColor: 'rgba(26, 115, 232, 0.1)',
            fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#1a73e8',
        }]
    };

    const feeChartData = {
        labels: chartData.feeCollection.labels,
        datasets: [
            { label: 'Collected', data: chartData.feeCollection.collected, backgroundColor: '#0d904f', borderRadius: 6, barPercentage: 0.6 },
            { label: 'Pending', data: chartData.feeCollection.pending, backgroundColor: '#e37400', borderRadius: 6, barPercentage: 0.6 }
        ]
    };

    const examChartData = {
        labels: chartData.examPerformance.labels,
        datasets: [
            { label: 'Mid-Term', data: chartData.examPerformance.midterm, borderColor: '#7c3aed', fill: false, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#7c3aed' },
            { label: 'Final', data: chartData.examPerformance.final, borderColor: '#0d904f', fill: false, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#0d904f' }
        ]
    };

    const genderData = {
        labels: ['Boys', 'Girls'],
        datasets: [{ data: [680, 568], backgroundColor: ['#1a73e8', '#e91e8a'], borderWidth: 0 }]
    };

    const pendingPayments = feePayments.filter(f => f.status !== 'Paid').slice(0, 5);

    return (
        <>
            <StatCards stats={stats} />

            {/* Quick Actions */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-lightning-fill text-warning me-2"></i>Quick Actions</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-flex gap-3 flex-wrap">
                                {quickActions.map((action, idx) => (
                                    <div key={idx} className="quick-action-btn" onClick={() => navigate(action.path)} style={{ cursor: 'pointer' }}>
                                        <i className={`bi ${action.icon}`} style={{ background: action.bg, color: action.color, borderRadius: 'var(--radius-md)' }}></i>
                                        <span>{action.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="row g-3 mb-4">
                <div className="col-lg-8">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-graph-up me-2 text-primary"></i>Monthly Attendance Trend</h6>
                        </div>
                        <div className="card-body">
                            <div className="chart-container">
                                <Line data={attendanceChartData} options={{ ...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, min: 60, max: 100 } } }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-pie-chart-fill me-2 text-primary"></i>Gender Distribution</h6>
                        </div>
                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <div style={{ width: 200, height: 200 }}>
                                <Doughnut data={genderData} options={{ responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, font: { size: 12, family: 'Inter' }, padding: 16 } } } }} />
                            </div>
                            <div className="d-flex gap-4 mt-3">
                                <div className="text-center">
                                    <h5 className="mb-0 fw-bold" style={{ color: '#1a73e8' }}>680</h5>
                                    <small className="text-muted">Boys (54.5%)</small>
                                </div>
                                <div className="text-center">
                                    <h5 className="mb-0 fw-bold" style={{ color: '#e91e8a' }}>568</h5>
                                    <small className="text-muted">Girls (45.5%)</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fee & Exam Charts */}
            <div className="row g-3 mb-4">
                <div className="col-lg-6">
                    <div className="sms-card h-100">
                        <div className="card-header"><h6><i className="bi bi-bar-chart-fill me-2 text-success"></i>Fee Collection Overview</h6></div>
                        <div className="card-body"><div className="chart-container"><Bar data={feeChartData} options={chartOptions} /></div></div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="sms-card h-100">
                        <div className="card-header"><h6><i className="bi bi-graph-up-arrow me-2" style={{ color: '#7c3aed' }}></i>Exam Performance</h6></div>
                        <div className="card-body"><div className="chart-container"><Line data={examChartData} options={chartOptions} /></div></div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="row g-3 mb-4">
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-calendar-event me-2 text-primary"></i>Upcoming Events</h6>
                            <a href="/events" className="btn btn-sm btn-sms-outline" style={{ fontSize: 11 }}>View All</a>
                        </div>
                        <div className="card-body p-0">
                            {upcomingEvents.map(event => (
                                <div key={event.id} className="d-flex align-items-center gap-3 p-3 border-bottom">
                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: `${event.color}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: event.color, lineHeight: 1 }}>{new Date(event.date).getDate()}</span>
                                        <span style={{ fontSize: 9, color: event.color, textTransform: 'uppercase', fontWeight: 600 }}>{new Date(event.date).toLocaleString('en', { month: 'short' })}</span>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 fw-semibold small">{event.title}</p>
                                        <small className="text-muted">{event.type}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-wallet2 me-2 text-warning"></i>Pending Payments</h6>
                        </div>
                        <div className="card-body p-0">
                            {pendingPayments.map(payment => (
                                <div key={payment.id} className="d-flex align-items-center gap-3 p-3 border-bottom">
                                    <div className="user-avatar" style={{ background: payment.status === 'Pending' ? 'var(--accent-orange)' : 'var(--accent-teal)' }}>{payment.studentName.charAt(0)}</div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 fw-semibold small">{payment.studentName}</p>
                                        <small className="text-muted">{payment.class} • {payment.month}</small>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-0 fw-bold small">₹{payment.amount.toLocaleString()}</p>
                                        <span className={`sms-badge ${payment.status.toLowerCase()}`} style={{ fontSize: 10 }}>{payment.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-bell me-2 text-danger"></i>Recent Notifications</h6>
                        </div>
                        <div className="card-body p-0">
                            {recentNotifications.map(notif => (
                                <div key={notif.id} className="d-flex align-items-start gap-3 p-3 border-bottom" style={{ background: !notif.read ? 'var(--primary-light)' : 'transparent' }}>
                                    <div className={`stat-icon ${notif.type === 'event' ? 'blue' : notif.type === 'fee' ? 'orange' : notif.type === 'exam' ? 'purple' : 'green'}`} style={{ width: 36, height: 36, fontSize: 14 }}>
                                        <i className={`bi ${notif.type === 'event' ? 'bi-calendar-event' : notif.type === 'fee' ? 'bi-wallet2' : notif.type === 'exam' ? 'bi-journal-text' : 'bi-person-plus'}`}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 fw-semibold small">{notif.title}</p>
                                        <small className="text-muted">{notif.time}</small>
                                    </div>
                                    {!notif.read && <span className="badge bg-primary rounded-pill" style={{ fontSize: 9 }}>New</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ======================== TEACHER DASHBOARD ========================
function TeacherDashboard() {
    const navigate = useNavigate();
    const myClasses = ['10-A', '10-B', '9-A'];
    const myClassAttendance = attendanceData.classes.filter(c => myClasses.includes(c.name));
    const totalStudents = myClassAttendance.reduce((s, c) => s + c.totalStudents, 0);
    const totalPresent = myClassAttendance.reduce((s, c) => s + c.present, 0);
    const avgAttendance = totalStudents > 0 ? ((totalPresent / totalStudents) * 100).toFixed(1) : 0;

    const stats = [
        { title: "My Classes", value: myClasses.length, sub: myClasses.join(', '), icon: "bi-book-fill", color: "purple" },
        { title: "Total Students", value: totalStudents, sub: "Across all classes", icon: "bi-people-fill", color: "blue" },
        { title: "Attendance Today", value: `${avgAttendance}%`, sub: `${totalPresent} of ${totalStudents}`, icon: "bi-calendar-check-fill", color: "green", trend: "+1.2%", trendDir: "up" },
        { title: "Pending Exams", value: 1, sub: "Final Exam — Mar", icon: "bi-journal-bookmark-fill", color: "orange" },
    ];

    const myStudentResults = examResults.filter(r => myClasses.includes(r.class)).slice(0, 5);

    const todayTimetable = timetable.days.Monday?.filter(p => p.teacher.includes('Meera')) || timetable.days.Monday?.slice(0, 4);

    const quickActions = [
        { icon: "bi-calendar-check", label: "Mark Attendance", bg: "var(--accent-green-light)", color: "var(--accent-green)", path: "/attendance" },
        { icon: "bi-journal-plus", label: "Enter Marks", bg: "var(--accent-purple-light)", color: "var(--accent-purple)", path: "/exams" },
        { icon: "bi-people", label: "View Students", bg: "var(--primary-light)", color: "var(--primary)", path: "/students" },
        { icon: "bi-clock", label: "Timetable", bg: "var(--accent-teal-light)", color: "var(--accent-teal)", path: "/timetable" },
    ];

    return (
        <>
            <StatCards stats={stats} />

            {/* Quick Actions */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="sms-card">
                        <div className="card-header"><h6><i className="bi bi-lightning-fill text-warning me-2"></i>Quick Actions</h6></div>
                        <div className="card-body">
                            <div className="d-flex gap-3 flex-wrap">
                                {quickActions.map((action, idx) => (
                                    <div key={idx} className="quick-action-btn" onClick={() => navigate(action.path)} style={{ cursor: 'pointer' }}>
                                        <i className={`bi ${action.icon}`} style={{ background: action.bg, color: action.color, borderRadius: 'var(--radius-md)' }}></i>
                                        <span>{action.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                {/* My Classes Attendance */}
                <div className="col-lg-6">
                    <div className="sms-card h-100">
                        <div className="card-header"><h6><i className="bi bi-bar-chart me-2 text-success"></i>Class-wise Attendance Today</h6></div>
                        <div className="card-body p-0">
                            {myClassAttendance.map(cls => (
                                <div key={cls.name} className="d-flex align-items-center gap-3 p-3 border-bottom">
                                    <div className="stat-icon blue" style={{ width: 40, height: 40, fontSize: 14 }}>
                                        <i className="bi bi-book"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="fw-semibold small">Class {cls.name}</span>
                                            <span className="fw-bold small" style={{ color: cls.percentage >= 90 ? 'var(--accent-green)' : 'var(--accent-orange)' }}>{cls.percentage}%</span>
                                        </div>
                                        <div className="progress" style={{ height: 6, borderRadius: 3 }}>
                                            <div className="progress-bar" style={{ width: `${cls.percentage}%`, background: cls.percentage >= 90 ? 'var(--accent-green)' : 'var(--accent-orange)', borderRadius: 3 }}></div>
                                        </div>
                                        <small className="text-muted">{cls.present} present, {cls.absent} absent, {cls.onLeave} on leave</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Today's Timetable */}
                <div className="col-lg-6">
                    <div className="sms-card h-100">
                        <div className="card-header"><h6><i className="bi bi-clock me-2 text-primary"></i>Today's Schedule</h6></div>
                        <div className="card-body p-0">
                            {todayTimetable.map((period, idx) => (
                                <div key={idx} className="d-flex align-items-center gap-3 p-3 border-bottom">
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 'var(--radius-md)',
                                        background: idx % 2 === 0 ? 'var(--accent-purple-light)' : 'var(--primary-light)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: 14,
                                        color: idx % 2 === 0 ? 'var(--accent-purple)' : 'var(--primary)'
                                    }}>P{period.period}</div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 fw-semibold small">{period.subject}</p>
                                        <small className="text-muted">{period.time} • Class 10-A</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Results */}
            <div className="row g-3 mb-4">
                <div className="col-12">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-journal-text me-2" style={{ color: '#7c3aed' }}></i>Recent Student Results</h6>
                            <a href="/exams" className="btn btn-sm btn-sms-outline" style={{ fontSize: 11 }}>View All</a>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead style={{ background: 'var(--bg-body)' }}>
                                        <tr>
                                            <th className="small fw-semibold">Student</th>
                                            <th className="small fw-semibold">Class</th>
                                            <th className="small fw-semibold">Exam</th>
                                            <th className="small fw-semibold">Total</th>
                                            <th className="small fw-semibold">%</th>
                                            <th className="small fw-semibold">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myStudentResults.map(r => (
                                            <tr key={r.id}>
                                                <td className="small fw-semibold">{r.studentName}</td>
                                                <td className="small">{r.class}</td>
                                                <td className="small">{r.exam}</td>
                                                <td className="small fw-semibold">{r.total}</td>
                                                <td className="small"><span className={`fw-bold ${r.percentage >= 80 ? 'text-success' : r.percentage >= 60 ? 'text-warning' : 'text-danger'}`}>{r.percentage}%</span></td>
                                                <td><span className={`sms-badge ${r.grade.includes('A') ? 'success' : 'info'}`} style={{ fontSize: 10 }}>{r.grade}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ======================== PARENT / STUDENT DASHBOARD ========================
function ParentStudentDashboard({ user }) {
    const navigate = useNavigate();
    const isParent = user.role === 'parent';
    const childName = isParent ? user.childName : user.name;
    const childClass = isParent ? user.childClass : user.class;

    const studentData = students.find(s => s.name === childName) || students[0];
    const studentResults = examResults.find(r => r.studentName === childName) || examResults[0];
    const studentFees = feePayments.filter(f => f.studentName === childName);
    const pendingFees = studentFees.filter(f => f.status !== 'Paid');
    //const paidFees = studentFees.filter(f => f.status === 'Paid');

    const stats = [
        { title: "Attendance", value: `${studentData.attendance}%`, sub: "This semester", icon: "bi-calendar-check-fill", color: "green", trend: "+2%", trendDir: "up" },
        { title: "Exam Score", value: `${studentResults.percentage}%`, sub: `Grade: ${studentResults.grade}`, icon: "bi-trophy-fill", color: "purple", trend: `Rank #${studentResults.rank}`, trendDir: "up" },
        { title: "Fee Status", value: studentData.feeStatus, sub: pendingFees.length > 0 ? `${pendingFees.length} pending` : 'All clear', icon: "bi-wallet-fill", color: studentData.feeStatus === 'Paid' ? "teal" : "orange" },
        { title: "Class Rank", value: `#${studentResults.rank}`, sub: `Class ${childClass}`, icon: "bi-award-fill", color: "blue" },
    ];

    // Subject-wise marks for chart
    const subjects = Object.keys(studentResults.subjects);
    const marks = Object.values(studentResults.subjects);

    const subjectChartData = {
        labels: subjects,
        datasets: [{
            label: 'Marks',
            data: marks,
            backgroundColor: ['#1a73e8', '#7c3aed', '#e37400', '#0d904f', '#d93025', '#0891b2'],
            borderRadius: 6,
            barPercentage: 0.6,
        }]
    };

    const attendanceDonut = {
        labels: ['Present', 'Absent'],
        datasets: [{
            data: [studentData.attendance, 100 - studentData.attendance],
            backgroundColor: ['#0d904f', '#e5e7eb'],
            borderWidth: 0,
        }]
    };

    const todayTimetable = timetable.days.Monday?.slice(0, 5) || [];

    return (
        <>
            <StatCards stats={stats} />

            <div className="row g-3 mb-4">
                {/* Student Info Card */}
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header"><h6><i className="bi bi-person-circle me-2 text-primary"></i>Student Profile</h6></div>
                        <div className="card-body text-center">
                            <div className="user-avatar xl mx-auto mb-3" style={{ background: 'var(--primary-gradient)', width: 72, height: 72, fontSize: 28 }}>
                                {childName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h5 className="fw-bold mb-1">{childName}</h5>
                            <p className="text-muted small mb-3">Class {childClass} • Roll No: {studentData.rollNo}</p>
                            <div className="d-flex justify-content-center gap-4 mb-3">
                                <div className="text-center">
                                    <h6 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>{studentData.attendance}%</h6>
                                    <small className="text-muted">Attendance</small>
                                </div>
                                <div className="text-center">
                                    <h6 className="fw-bold mb-0" style={{ color: '#7c3aed' }}>{studentResults.percentage}%</h6>
                                    <small className="text-muted">Score</small>
                                </div>
                                <div className="text-center">
                                    <h6 className="fw-bold mb-0" style={{ color: '#0d904f' }}>#{studentResults.rank}</h6>
                                    <small className="text-muted">Rank</small>
                                </div>
                            </div>
                            <button className="btn-sms-primary px-4 py-2" style={{ fontSize: 13 }} onClick={() => navigate('/profile')}>
                                <i className="bi bi-pencil-square me-2"></i>Update Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Subject-wise Marks */}
                <div className="col-lg-8">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-bar-chart-fill me-2" style={{ color: '#7c3aed' }}></i>Subject-wise Performance (Mid-Term)</h6>
                        </div>
                        <div className="card-body">
                            <div className="chart-container">
                                <Bar data={subjectChartData} options={{
                                    ...chartOptions,
                                    scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, min: 0, max: 100 } }
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                {/* Attendance Donut */}
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header"><h6><i className="bi bi-pie-chart-fill me-2 text-success"></i>Attendance Overview</h6></div>
                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <div style={{ width: 160, height: 160, position: 'relative' }}>
                                <Doughnut data={attendanceDonut} options={{
                                    responsive: true, maintainAspectRatio: false, cutout: '70%',
                                    plugins: { legend: { display: false } }
                                }} />
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                    <h4 className="fw-bold mb-0" style={{ color: 'var(--accent-green)' }}>{studentData.attendance}%</h4>
                                    <small className="text-muted" style={{ fontSize: 10 }}>Present</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fee Status */}
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-wallet2 me-2 text-warning"></i>Fee Status</h6>
                            {isParent && <button className="btn btn-sm btn-sms-outline" style={{ fontSize: 11 }} onClick={() => navigate('/fee-payment')}>Pay Now</button>}
                        </div>
                        <div className="card-body p-0">
                            {studentFees.length > 0 ? studentFees.map(fee => (
                                <div key={fee.id} className="d-flex align-items-center gap-3 p-3 border-bottom">
                                    <div className={`stat-icon ${fee.status === 'Paid' ? 'green' : 'orange'}`} style={{ width: 36, height: 36, fontSize: 14 }}>
                                        <i className={`bi ${fee.status === 'Paid' ? 'bi-check-circle' : 'bi-clock'}`}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 fw-semibold small">{fee.month}</p>
                                        <small className="text-muted">{fee.mode || 'Not paid'}</small>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-0 fw-bold small">₹{fee.amount.toLocaleString()}</p>
                                        <span className={`sms-badge ${fee.status.toLowerCase()}`} style={{ fontSize: 10 }}>{fee.status}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-4 text-center text-muted">
                                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: 32 }}></i>
                                    <p className="mt-2 mb-0 small">All fees are up to date!</p>
                                </div>
                            )}
                            {isParent && pendingFees.length > 0 && (
                                <div className="p-3 text-center" style={{ background: 'var(--primary-light)' }}>
                                    <button className="btn-sms-primary px-4 py-2" onClick={() => navigate('/fee-payment')} style={{ fontSize: 13 }}>
                                        <i className="bi bi-credit-card me-2"></i>Pay ₹{pendingFees.reduce((s, f) => s + f.amount, 0).toLocaleString()} Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Today's Timetable */}
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-clock me-2 text-primary"></i>Today's Timetable</h6>
                            <a href="/timetable" className="btn btn-sm btn-sms-outline" style={{ fontSize: 11 }}>Full</a>
                        </div>
                        <div className="card-body p-0">
                            {todayTimetable.map((period, idx) => (
                                <div key={idx} className="d-flex align-items-center gap-3 p-3 border-bottom">
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                                        background: idx % 2 === 0 ? 'var(--primary-light)' : 'var(--accent-purple-light)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: 12,
                                        color: idx % 2 === 0 ? 'var(--primary)' : 'var(--accent-purple)'
                                    }}>P{period.period}</div>
                                    <div className="flex-grow-1">
                                        <p className="mb-0 fw-semibold small">{period.subject}</p>
                                        <small className="text-muted">{period.time}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Announcements */}
            <div className="row g-3 mb-4">
                <div className="col-12">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-megaphone me-2 text-danger"></i>Recent Announcements</h6>
                        </div>
                        <div className="card-body p-0">
                            {announcements.slice(0, 4).map(a => (
                                <div key={a.id} className="d-flex align-items-start gap-3 p-3 border-bottom">
                                    <div className={`stat-icon ${a.priority === 'High' ? 'red' : a.priority === 'Medium' ? 'orange' : 'blue'}`} style={{ width: 36, height: 36, fontSize: 14 }}>
                                        <i className="bi bi-megaphone-fill"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="mb-1 fw-semibold small">{a.title}</p>
                                        <p className="mb-0 text-muted" style={{ fontSize: 12 }}>{a.message}</p>
                                        <small className="text-muted">{a.date} • {a.postedBy}</small>
                                    </div>
                                    <span className={`sms-badge ${a.priority === 'High' ? 'danger' : a.priority === 'Medium' ? 'warning' : 'info'}`} style={{ fontSize: 10 }}>{a.priority}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ======================== MAIN DASHBOARD ========================
export default function Dashboard() {
    const { user } = useAuth();
    const role = user?.role || 'admin';

    return (
        <div className="fade-in">
            <WelcomeBanner user={user} />
            {role === 'admin' && <AdminDashboard />}
            {role === 'teacher' && <TeacherDashboard user={user} />}
            {(role === 'parent' || role === 'student') && <ParentStudentDashboard user={user} />}
        </div>
    );
}
