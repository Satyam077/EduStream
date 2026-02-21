import { students, feePayments, examResults, announcements, upcomingEvents } from '../data/dummyData';

export default function ParentPortal() {
    const child = students[0]; // Simulating parent viewing child
    const childFees = feePayments.filter(f => f.studentName === child.name);
    const childResults = examResults.filter(r => r.studentName === child.name);

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Parent Portal</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Parent Portal</span>
                    </div>
                </div>
            </div>

            {/* Child Info */}
            <div className="row g-3 mb-4">
                <div className="col-lg-4">
                    <div className="sms-card">
                        <div className="profile-header-card text-center">
                            <div className="user-avatar xl mx-auto mb-3" style={{ background: '#1a73e8' }}>
                                {child.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h5 className="fw-bold mb-1">{child.name}</h5>
                            <p className="mb-1 opacity-75">Class {child.class} | Roll No. {child.rollNo}</p>
                            <span className="sms-badge active">{child.status}</span>
                        </div>
                        <div className="card-body">
                            {[
                                ['Admission No.', child.admissionNo],
                                ['Parent', child.parentName],
                                ['Phone', child.parentPhone],
                                ['Attendance', `${child.attendance}%`],
                                ['Fee Status', child.feeStatus],
                            ].map(([label, value], idx) => (
                                <div key={idx} className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">{label}</span>
                                    <span className="fw-semibold small">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="row g-3">
                        {[
                            { label: 'Attendance', value: `${child.attendance}%`, icon: 'bi-calendar-check-fill', color: 'green' },
                            { label: 'Fee Status', value: child.feeStatus, icon: 'bi-wallet-fill', color: child.feeStatus === 'Paid' ? 'green' : 'orange' },
                            { label: 'Last Exam Rank', value: childResults[0]?.rank || '-', icon: 'bi-trophy-fill', color: 'purple' },
                            { label: 'Last Exam %', value: childResults[0]?.percentage ? `${childResults[0].percentage}%` : '-', icon: 'bi-graph-up', color: 'blue' },
                        ].map((stat, idx) => (
                            <div key={idx} className="col-md-6 col-sm-6">
                                <div className={`stat-card ${stat.color}`}>
                                    <div className={`stat-icon ${stat.color}`}><i className={`bi ${stat.icon}`}></i></div>
                                    <div className="stat-info"><h3>{stat.value}</h3><p>{stat.label}</p></div>
                                </div>
                            </div>
                        ))}

                        {/* Results Section */}
                        <div className="col-12">
                            <div className="sms-card">
                                <div className="card-header">
                                    <h6><i className="bi bi-journal-text me-2 text-primary"></i>Exam Results</h6>
                                    <button className="btn-sms-outline btn-sm"><i className="bi bi-download"></i> Download Marksheet</button>
                                </div>
                                {childResults.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="sms-table">
                                            <thead>
                                                <tr>
                                                    <th>Exam</th>
                                                    {Object.keys(childResults[0].subjects).map(s => <th key={s}>{s}</th>)}
                                                    <th>Total</th><th>%</th><th>Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {childResults.map(r => (
                                                    <tr key={r.id}>
                                                        <td className="fw-semibold">{r.exam}</td>
                                                        {Object.values(r.subjects).map((m, idx) => <td key={idx} className={m >= 80 ? 'text-success fw-semibold' : ''}>{m}</td>)}
                                                        <td className="fw-bold">{r.total}</td>
                                                        <td className="fw-bold">{r.percentage}%</td>
                                                        <td><span className="sms-badge active">{r.grade}</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="card-body text-center py-4">
                                        <p className="text-muted">No results available yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Fee Payments */}
                        <div className="col-12">
                            <div className="sms-card">
                                <div className="card-header">
                                    <h6><i className="bi bi-wallet2 me-2 text-success"></i>Fee Payments</h6>
                                </div>
                                <div className="card-body p-0">
                                    {childFees.map(f => (
                                        <div key={f.id} className="d-flex align-items-center justify-content-between p-3 border-bottom">
                                            <div>
                                                <span className="fw-semibold small">{f.month}</span>
                                                <br /><small className="text-muted">{f.receiptNo}</small>
                                            </div>
                                            <div className="text-end">
                                                <span className="fw-bold">₹{f.amount.toLocaleString()}</span>
                                                <br /><span className={`sms-badge ${f.status.toLowerCase()}`}>{f.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Announcements */}
            <div className="row g-3">
                <div className="col-lg-6">
                    <div className="sms-card">
                        <div className="card-header"><h6><i className="bi bi-megaphone me-2 text-warning"></i>School Announcements</h6></div>
                        <div className="card-body p-0">
                            {announcements.filter(a => a.target === 'All' || a.target === 'Parents').map(a => (
                                <div key={a.id} className="p-3 border-bottom">
                                    <h6 className="fw-bold small mb-1">{a.title}</h6>
                                    <p className="text-muted small mb-1">{a.message}</p>
                                    <small className="text-muted">{new Date(a.date).toLocaleDateString('en-IN')}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="sms-card">
                        <div className="card-header"><h6><i className="bi bi-calendar-event me-2 text-primary"></i>Upcoming Events</h6></div>
                        <div className="card-body p-0">
                            {upcomingEvents.map(e => (
                                <div key={e.id} className="d-flex align-items-center gap-3 p-3 border-bottom">
                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>{new Date(e.date).getDate()}</span>
                                        <span style={{ fontSize: 9, color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 600 }}>{new Date(e.date).toLocaleString('en', { month: 'short' })}</span>
                                    </div>
                                    <div>
                                        <p className="mb-0 fw-semibold small">{e.title}</p>
                                        <small className="text-muted">{e.type}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
