import { useState } from 'react';
import { teachers } from '../data/dummyData';

export default function Teachers() {
    const [search, setSearch] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const subjects = [...new Set(teachers.map(t => t.subject))];

    const filtered = teachers.filter(t => {
        const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.empId.toLowerCase().includes(search.toLowerCase());
        const matchSubject = subjectFilter === 'All' || t.subject === subjectFilter;
        return matchSearch && matchSubject;
    });

    const getColor = (name) => {
        const colors = ['#1a73e8', '#0d904f', '#7c3aed', '#e37400', '#0891b2', '#d93025'];
        return colors[name.length % colors.length];
    };

    if (selectedTeacher) {
        const t = selectedTeacher;
        return (
            <div className="fade-in">
                <div className="page-header">
                    <div>
                        <button className="btn btn-sm btn-sms-outline mb-2" onClick={() => setSelectedTeacher(null)}>
                            <i className="bi bi-arrow-left"></i> Back to Teachers
                        </button>
                        <h4>Teacher Profile</h4>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn-sms-outline"><i className="bi bi-pencil"></i> Edit</button>
                        <button className="btn-sms-primary"><i className="bi bi-printer"></i> Print</button>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-lg-4">
                        <div className="sms-card">
                            <div className="profile-header-card text-center">
                                <div className="user-avatar xl mx-auto mb-3" style={{ background: getColor(t.name) }}>
                                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <h5 className="fw-bold mb-1">{t.name}</h5>
                                <p className="mb-1 opacity-75">{t.empId} • {t.subject}</p>
                                <span className={`sms-badge ${t.status === 'Active' ? 'active' : t.status === 'On Leave' ? 'pending' : 'inactive'}`}>{t.status}</span>
                            </div>
                            <div className="card-body">
                                {[
                                    ['Email', t.email], ['Phone', t.phone], ['Qualification', t.qualification],
                                    ['Experience', t.experience], ['Join Date', new Date(t.joinDate).toLocaleDateString('en-IN')],
                                    ['Gender', t.gender],
                                ].map(([label, value], idx) => (
                                    <div key={idx} className="d-flex justify-content-between py-2 border-bottom">
                                        <span className="text-muted small">{label}</span>
                                        <span className="fw-semibold small text-end" style={{ maxWidth: 180 }}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="row g-3">
                            {[
                                { label: 'Attendance', value: `${t.attendance}%`, icon: 'bi-calendar-check', color: 'green' },
                                { label: 'Leave Balance', value: `${t.leaveBalance} Days`, icon: 'bi-calendar-x', color: 'orange' },
                                { label: 'Monthly Salary', value: `₹${t.salary.toLocaleString()}`, icon: 'bi-wallet2', color: 'blue' },
                                { label: 'Classes Assigned', value: t.classes.length, icon: 'bi-building', color: 'purple' },
                            ].map((stat, idx) => (
                                <div key={idx} className="col-md-6 col-sm-6">
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

                            <div className="col-12">
                                <div className="sms-card">
                                    <div className="card-header">
                                        <h6><i className="bi bi-building me-2 text-primary"></i>Assigned Classes</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex flex-wrap gap-2">
                                            {t.classes.map((cls, idx) => (
                                                <span key={idx} className="sms-badge info" style={{ fontSize: 13, padding: '6px 14px' }}>{cls}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="sms-card">
                                    <div className="card-header">
                                        <h6><i className="bi bi-star me-2 text-warning"></i>Performance Review</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            {['Teaching Quality', 'Punctuality', 'Student Engagement', 'Knowledge'].map((metric, idx) => {
                                                const values = [88, 95, 82, 90];
                                                return (
                                                    <div key={idx} className="col-md-6">
                                                        <div className="d-flex justify-content-between mb-1">
                                                            <small className="fw-semibold">{metric}</small>
                                                            <small className="fw-bold text-primary">{values[idx]}%</small>
                                                        </div>
                                                        <div className="sms-progress">
                                                            <div className="progress-bar" style={{ width: `${values[idx]}%`, background: 'var(--primary-gradient)' }}></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="sms-card">
                                    <div className="card-header">
                                        <h6><i className="bi bi-wallet2 me-2 text-success"></i>Salary Details</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="sms-table">
                                                <thead>
                                                    <tr>
                                                        <th>Month</th>
                                                        <th>Basic</th>
                                                        <th>HRA</th>
                                                        <th>Deductions</th>
                                                        <th>Net Pay</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {['January', 'December', 'November'].map((month, idx) => (
                                                        <tr key={idx}>
                                                            <td>{month} 2026</td>
                                                            <td>₹{(t.salary * 0.6).toLocaleString()}</td>
                                                            <td>₹{(t.salary * 0.3).toLocaleString()}</td>
                                                            <td className="text-danger">₹{(t.salary * 0.1).toLocaleString()}</td>
                                                            <td className="fw-bold">₹{(t.salary * 0.9).toLocaleString()}</td>
                                                            <td><span className="sms-badge paid">Paid</span></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Teacher Management</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Teachers</span>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn-sms-outline"><i className="bi bi-download"></i> Export</button>
                    <button className="btn-sms-primary" onClick={() => setShowModal(true)} id="add-teacher-btn">
                        <i className="bi bi-plus-lg"></i> Add Teacher
                    </button>
                </div>
            </div>

            {/* Filter */}
            <div className="sms-card">
                <div className="card-body pb-0">
                    <div className="filter-bar">
                        <div className="position-relative flex-grow-1" style={{ maxWidth: 300 }}>
                            <i className="bi bi-search position-absolute" style={{ left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                            <input type="text" className="form-control" placeholder="Search teachers..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
                        </div>
                        <select className="form-select" value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
                            <option value="All">All Subjects</option>
                            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="sms-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Teacher</th>
                                <th>Employee ID</th>
                                <th>Subject</th>
                                <th>Classes</th>
                                <th>Experience</th>
                                <th>Attendance</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((t, idx) => (
                                <tr key={t.id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="user-avatar" style={{ background: getColor(t.name) }}>
                                                {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <div>
                                                <span className="fw-semibold">{t.name}</span>
                                                <br /><small className="text-muted">{t.qualification}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td><code className="small">{t.empId}</code></td>
                                    <td><span className="sms-badge purple">{t.subject}</span></td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-1">
                                            {t.classes.slice(0, 2).map((c, i) => <span key={i} className="sms-badge info" style={{ fontSize: 10 }}>{c}</span>)}
                                            {t.classes.length > 2 && <span className="sms-badge info" style={{ fontSize: 10 }}>+{t.classes.length - 2}</span>}
                                        </div>
                                    </td>
                                    <td>{t.experience}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="sms-progress" style={{ width: 50 }}>
                                                <div className={`progress-bar ${t.attendance >= 90 ? 'bg-success' : 'bg-warning'}`} style={{ width: `${t.attendance}%` }}></div>
                                            </div>
                                            <small className="fw-semibold">{t.attendance}%</small>
                                        </div>
                                    </td>
                                    <td><span className={`sms-badge ${t.status === 'Active' ? 'active' : 'pending'}`}>{t.status}</span></td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <button className="btn btn-sm btn-outline-primary border-0" onClick={() => setSelectedTeacher(t)}><i className="bi bi-eye"></i></button>
                                            <button className="btn btn-sm btn-outline-warning border-0"><i className="bi bi-pencil"></i></button>
                                            <button className="btn btn-sm btn-outline-danger border-0"><i className="bi bi-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Teacher Modal */}
            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold"><i className="bi bi-person-badge me-2 text-primary"></i>Add New Teacher</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    {[
                                        ['Full Name *', 'text', 'Enter full name'],
                                        ['Email *', 'email', 'teacher@school.com'],
                                        ['Phone *', 'tel', '+91 XXXXX XXXXX'],
                                        ['Date of Joining', 'date', ''],
                                    ].map(([label, type, placeholder], idx) => (
                                        <div key={idx} className="col-md-6">
                                            <div className="form-group-sms">
                                                <label>{label}</label>
                                                <input type={type} className="form-control" placeholder={placeholder} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Subject *</label>
                                            <select className="form-select">
                                                <option value="">Select Subject</option>
                                                {['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'].map(s => <option key={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Qualification</label>
                                            <input type="text" className="form-control" placeholder="e.g. M.Sc. Physics" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Experience</label>
                                            <input type="text" className="form-control" placeholder="e.g. 5 years" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Salary (₹)</label>
                                            <input type="number" className="form-control" placeholder="Monthly salary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-sms-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn-sms-primary" onClick={() => setShowModal(false)}>
                                    <i className="bi bi-check-lg"></i> Save Teacher
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
