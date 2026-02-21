import { useState } from 'react';
import { attendanceData, students, classOptions } from '../data/dummyData';

export default function Attendance() {
    const [selectedClass, setSelectedClass] = useState('10-A');
    const [date, setDate] = useState('2026-02-21');
    const [view, setView] = useState('class-wise');

    const classStudents = students.filter(s => s.class === selectedClass);

    const [attendanceMarks, setAttendanceMarks] = useState(
        classStudents.reduce((acc, s) => ({ ...acc, [s.id]: 'present' }), {})
    );

    const toggleAttendance = (id, status) => {
        setAttendanceMarks(prev => ({ ...prev, [id]: status }));
    };

    const presentCount = Object.values(attendanceMarks).filter(v => v === 'present').length;
    const absentCount = Object.values(attendanceMarks).filter(v => v === 'absent').length;
    const leaveCount = Object.values(attendanceMarks).filter(v => v === 'leave').length;

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Attendance Management</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Attendance</span>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button className={`btn-sms-${view === 'class-wise' ? 'primary' : 'outline'}`} onClick={() => setView('class-wise')}>
                        <i className="bi bi-grid"></i> Class-wise
                    </button>
                    <button className={`btn-sms-${view === 'mark' ? 'primary' : 'outline'}`} onClick={() => setView('mark')}>
                        <i className="bi bi-check2-square"></i> Mark Attendance
                    </button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Present Today', value: '1,154', icon: 'bi-check-circle-fill', color: 'green' },
                    { label: 'Total Absent', value: '72', icon: 'bi-x-circle-fill', color: 'red' },
                    { label: 'On Leave', value: '22', icon: 'bi-calendar-x', color: 'orange' },
                    { label: 'Overall %', value: '92.4%', icon: 'bi-graph-up', color: 'blue' },
                ].map((stat, idx) => (
                    <div key={idx} className="col-lg-3 col-md-6">
                        <div className={`stat-card ${stat.color}`}>
                            <div className={`stat-icon ${stat.color}`}>
                                <i className={`bi ${stat.icon}`}></i>
                            </div>
                            <div className="stat-info">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {view === 'class-wise' ? (
                <div className="sms-card">
                    <div className="card-header">
                        <h6><i className="bi bi-building me-2 text-primary"></i>Class-wise Attendance - {date}</h6>
                        <input type="date" className="form-control" style={{ width: 'auto' }} value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className="table-responsive">
                        <table className="sms-table">
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Total Students</th>
                                    <th>Present</th>
                                    <th>Absent</th>
                                    <th>On Leave</th>
                                    <th>Attendance %</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.classes.map((cls, idx) => (
                                    <tr key={idx}>
                                        <td><span className="fw-semibold">{cls.name}</span></td>
                                        <td>{cls.totalStudents}</td>
                                        <td><span className="text-success fw-semibold">{cls.present}</span></td>
                                        <td><span className="text-danger fw-semibold">{cls.absent}</span></td>
                                        <td><span className="text-warning fw-semibold">{cls.onLeave}</span></td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="sms-progress" style={{ width: 80 }}>
                                                    <div className={`progress-bar ${cls.percentage >= 90 ? 'bg-success' : 'bg-warning'}`} style={{ width: `${cls.percentage}%` }}></div>
                                                </div>
                                                <small className="fw-bold">{cls.percentage}%</small>
                                            </div>
                                        </td>
                                        <td><span className={`sms-badge ${cls.percentage >= 90 ? 'active' : 'pending'}`}>{cls.percentage >= 90 ? 'Good' : 'Average'}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="sms-card">
                    <div className="card-header">
                        <h6><i className="bi bi-check2-square me-2 text-primary"></i>Mark Attendance</h6>
                        <div className="d-flex gap-2">
                            <select className="form-select form-select-sm" value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: 'auto' }}>
                                {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input type="date" className="form-control form-control-sm" style={{ width: 'auto' }} value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="card-body">
                        {/* Quick Stats */}
                        <div className="d-flex gap-3 mb-3 flex-wrap">
                            <span className="sms-badge active" style={{ padding: '6px 14px', fontSize: 13 }}>
                                <i className="bi bi-check-circle me-1"></i> Present: {presentCount}
                            </span>
                            <span className="sms-badge absent" style={{ padding: '6px 14px', fontSize: 13 }}>
                                <i className="bi bi-x-circle me-1"></i> Absent: {absentCount}
                            </span>
                            <span className="sms-badge pending" style={{ padding: '6px 14px', fontSize: 13 }}>
                                <i className="bi bi-calendar-x me-1"></i> Leave: {leaveCount}
                            </span>
                            <button className="btn btn-sm btn-success ms-auto" style={{ borderRadius: 'var(--radius-sm)' }}>
                                <i className="bi bi-check-all me-1"></i> Mark All Present
                            </button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="sms-table">
                            <thead>
                                <tr>
                                    <th>Roll No.</th>
                                    <th>Student</th>
                                    <th>Present</th>
                                    <th>Absent</th>
                                    <th>Leave</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classStudents.map(s => (
                                    <tr key={s.id}>
                                        <td>{s.rollNo}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="user-avatar sm" style={{ background: s.gender === 'Male' ? '#1a73e8' : '#e91e8a' }}>
                                                    {s.name[0]}
                                                </div>
                                                <span className="fw-semibold">{s.name}</span>
                                            </div>
                                        </td>
                                        {['present', 'absent', 'leave'].map(status => (
                                            <td key={status}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`attendance-${s.id}`}
                                                        checked={attendanceMarks[s.id] === status}
                                                        onChange={() => toggleAttendance(s.id, status)}
                                                    />
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card-body d-flex justify-content-end gap-2">
                        <button className="btn-sms-outline">Reset</button>
                        <button className="btn-sms-primary"><i className="bi bi-save me-1"></i> Save Attendance</button>
                    </div>
                </div>
            )}
        </div>
    );
}
