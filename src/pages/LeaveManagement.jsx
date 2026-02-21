import { useState } from 'react';
import { leaveRequests } from '../data/dummyData';

export default function LeaveManagement() {
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);

    const filtered = filter === 'All' ? leaveRequests : leaveRequests.filter(l => l.status === filter);

    const stats = [
        { label: 'Total Requests', value: leaveRequests.length, icon: 'bi-file-text-fill', color: 'blue' },
        { label: 'Pending', value: leaveRequests.filter(l => l.status === 'Pending').length, icon: 'bi-hourglass-split', color: 'orange' },
        { label: 'Approved', value: leaveRequests.filter(l => l.status === 'Approved').length, icon: 'bi-check-circle-fill', color: 'green' },
        { label: 'Rejected', value: leaveRequests.filter(l => l.status === 'Rejected').length, icon: 'bi-x-circle-fill', color: 'red' },
    ];

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Leave Management</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Leave</span>
                    </div>
                </div>
                <button className="btn-sms-primary" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus-lg"></i> New Leave Request
                </button>
            </div>

            <div className="row g-3 mb-4">
                {stats.map((stat, idx) => (
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

            {/* Leave Calendar Preview */}
            <div className="row g-3 mb-4">
                <div className="col-lg-8">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-list-check me-2 text-primary"></i>Leave Requests</h6>
                            <div className="d-flex gap-2">
                                {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                                    <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-secondary'}`}
                                        style={{ borderRadius: 20, fontSize: 12 }} onClick={() => setFilter(f)}>
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="sms-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Applicant</th>
                                        <th>Type</th>
                                        <th>Duration</th>
                                        <th>Reason</th>
                                        <th>Applied On</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((l, idx) => (
                                        <tr key={l.id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <div>
                                                    <span className="fw-semibold">{l.applicant}</span>
                                                    <br /><small className="text-muted">{l.class || l.subject}</small>
                                                </div>
                                            </td>
                                            <td><span className={`sms-badge ${l.type === 'Student' ? 'info' : 'purple'}`}>{l.type}</span></td>
                                            <td>
                                                <small>{new Date(l.startDate).toLocaleDateString('en-IN')} - {new Date(l.endDate).toLocaleDateString('en-IN')}</small>
                                            </td>
                                            <td><small>{l.reason}</small></td>
                                            <td><small>{new Date(l.appliedOn).toLocaleDateString('en-IN')}</small></td>
                                            <td>
                                                <span className={`sms-badge ${l.status.toLowerCase()}`}>{l.status}</span>
                                            </td>
                                            <td>
                                                {l.status === 'Pending' && (
                                                    <div className="d-flex gap-1">
                                                        <button className="btn btn-sm btn-success" style={{ borderRadius: 'var(--radius-sm)', fontSize: 11 }}>
                                                            <i className="bi bi-check"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-danger" style={{ borderRadius: 'var(--radius-sm)', fontSize: 11 }}>
                                                            <i className="bi bi-x"></i>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-calendar3 me-2 text-primary"></i>Leave Calendar</h6>
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <h6 className="fw-bold mb-0">February 2026</h6>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center gap-1">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                    <div key={d} className="calendar-day fw-bold text-muted" style={{ fontSize: 10, width: 36 }}>{d}</div>
                                ))}
                                {Array.from({ length: 28 }, (_, i) => i + 1).map(day => {
                                    const hasLeave = [18, 19, 20, 21, 22, 24, 25, 26, 27, 28].includes(day);
                                    const isToday = day === 21;
                                    return (
                                        <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${hasLeave ? 'has-event' : ''}`}>
                                            {day}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-3">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }}></div>
                                    <small className="text-muted">Today</small>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-orange)' }}></div>
                                    <small className="text-muted">Leave Day</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold"><i className="bi bi-calendar-x me-2 text-primary"></i>New Leave Request</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="form-group-sms">
                                            <label>Applicant Type</label>
                                            <select className="form-select"><option>Student</option><option>Teacher</option></select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Start Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>End Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group-sms">
                                            <label>Reason</label>
                                            <textarea className="form-control" rows="3" placeholder="Reason for leave..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-sms-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn-sms-primary" onClick={() => setShowModal(false)}>
                                    <i className="bi bi-send me-1"></i> Submit Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
