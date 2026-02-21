import { useState } from 'react';
import { students, classOptions } from '../data/dummyData';

export default function Students() {
    const [search, setSearch] = useState('');
    const [classFilter, setClassFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [showProfile, setShowProfile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    const filtered = students.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.admissionNo.toLowerCase().includes(search.toLowerCase());
        const matchClass = classFilter === 'All' || s.class === classFilter;
        const matchStatus = statusFilter === 'All' || s.status === statusFilter;
        return matchSearch && matchClass && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const getAvatar = (name, gender) => {
        const colors = gender === 'Male'
            ? ['#1a73e8', '#0d47a1', '#1557b0']
            : ['#e91e8a', '#c2185b', '#ad1457'];
        return colors[name.length % colors.length];
    };

    if (showProfile) {
        const s = showProfile;
        return (
            <div className="fade-in">
                <div className="page-header">
                    <div>
                        <button className="btn btn-sm btn-sms-outline mb-2" onClick={() => setShowProfile(null)}>
                            <i className="bi bi-arrow-left"></i> Back to Students
                        </button>
                        <h4>Student Profile</h4>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-lg-4">
                        <div className="sms-card">
                            <div className="profile-header-card text-center">
                                <div className="user-avatar xl mx-auto mb-3" style={{ background: getAvatar(s.name, s.gender) }}>
                                    {s.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h5 className="fw-bold mb-1">{s.name}</h5>
                                <p className="mb-1 opacity-75">{s.admissionNo}</p>
                                <span className={`sms-badge ${s.status.toLowerCase()}`}>{s.status}</span>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Class & Section</span>
                                    <span className="fw-semibold small">{s.class}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Roll Number</span>
                                    <span className="fw-semibold small">{s.rollNo}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Gender</span>
                                    <span className="fw-semibold small">{s.gender}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Date of Birth</span>
                                    <span className="fw-semibold small">{new Date(s.dob).toLocaleDateString('en-IN')}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Blood Group</span>
                                    <span className="fw-semibold small">{s.bloodGroup}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Religion</span>
                                    <span className="fw-semibold small">{s.religion}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2">
                                    <span className="text-muted small">Category</span>
                                    <span className="fw-semibold small">{s.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="sms-card h-100">
                                    <div className="card-header">
                                        <h6><i className="bi bi-person-lines-fill me-2 text-primary"></i>Parent Details</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between py-2 border-bottom">
                                            <span className="text-muted small">Father/Guardian</span>
                                            <span className="fw-semibold small">{s.parentName}</span>
                                        </div>
                                        <div className="d-flex justify-content-between py-2 border-bottom">
                                            <span className="text-muted small">Phone</span>
                                            <span className="fw-semibold small">{s.parentPhone}</span>
                                        </div>
                                        <div className="d-flex justify-content-between py-2 border-bottom">
                                            <span className="text-muted small">Email</span>
                                            <span className="fw-semibold small">{s.email}</span>
                                        </div>
                                        <div className="d-flex justify-content-between py-2">
                                            <span className="text-muted small">Address</span>
                                            <span className="fw-semibold small text-end" style={{ maxWidth: 200 }}>{s.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="sms-card h-100">
                                    <div className="card-header">
                                        <h6><i className="bi bi-bar-chart me-2 text-success"></i>Academic Overview</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between py-2 border-bottom">
                                            <span className="text-muted small">Attendance</span>
                                            <span className="fw-semibold small">{s.attendance}%</span>
                                        </div>
                                        <div className="d-flex justify-content-between py-2 border-bottom">
                                            <span className="text-muted small">Fee Status</span>
                                            <span className={`sms-badge ${s.feeStatus.toLowerCase()}`}>{s.feeStatus}</span>
                                        </div>
                                        <div className="d-flex justify-content-between py-2 border-bottom">
                                            <span className="text-muted small">Aadhar No.</span>
                                            <span className="fw-semibold small">{s.aadhar}</span>
                                        </div>
                                        <div className="mt-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <small className="text-muted">Attendance Progress</small>
                                                <small className="fw-bold">{s.attendance}%</small>
                                            </div>
                                            <div className="sms-progress">
                                                <div className="progress-bar bg-success" style={{ width: `${s.attendance}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="sms-card">
                                    <div className="card-header">
                                        <h6><i className="bi bi-file-earmark-text me-2 text-warning"></i>Documents & Certificates</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            {['Aadhar Card', 'Birth Certificate', 'Transfer Certificate', 'Migration Certificate', 'Report Card', 'ID Card'].map((doc, idx) => (
                                                <div key={idx} className="col-md-4 col-sm-6">
                                                    <div className="border rounded-3 p-3 text-center" style={{ borderStyle: 'dashed !important', cursor: 'pointer' }}>
                                                        <i className={`bi ${idx < 2 ? 'bi-file-earmark-check text-success' : 'bi-file-earmark-plus text-muted'} d-block mb-2`} style={{ fontSize: 28 }}></i>
                                                        <small className="fw-semibold d-block">{doc}</small>
                                                        <small className="text-muted">{idx < 2 ? 'Uploaded' : 'Not Uploaded'}</small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="sms-card">
                                    <div className="card-header">
                                        <h6><i className="bi bi-chat-square-text me-2 text-info"></i>Behavior & Remarks</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex gap-3 align-items-start mb-3 p-3 rounded-3" style={{ background: 'var(--accent-green-light)' }}>
                                            <i className="bi bi-emoji-smile text-success" style={{ fontSize: 20 }}></i>
                                            <div>
                                                <p className="mb-0 small fw-semibold">Excellent Performance in Science Exhibition</p>
                                                <small className="text-muted">By: Rajiv Kumar • 15 Jan 2026</small>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-3 align-items-start p-3 rounded-3" style={{ background: 'var(--primary-light)' }}>
                                            <i className="bi bi-trophy text-primary" style={{ fontSize: 20 }}></i>
                                            <div>
                                                <p className="mb-0 small fw-semibold">Won 2nd Prize in Inter-School Quiz Competition</p>
                                                <small className="text-muted">By: Admin • 10 Dec 2025</small>
                                            </div>
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
                    <h4>Student Management</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Students</span>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn-sms-outline" onClick={() => { }}>
                        <i className="bi bi-download"></i> Export
                    </button>
                    <button className="btn-sms-primary" onClick={() => setShowModal(true)} id="add-student-btn">
                        <i className="bi bi-plus-lg"></i> Add Student
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Students', value: students.length, icon: 'bi-people-fill', color: 'blue' },
                    { label: 'Active', value: students.filter(s => s.status === 'Active').length, icon: 'bi-check-circle-fill', color: 'green' },
                    { label: 'Inactive', value: students.filter(s => s.status === 'Inactive').length, icon: 'bi-x-circle-fill', color: 'red' },
                    { label: 'Fee Pending', value: students.filter(s => s.feeStatus !== 'Paid').length, icon: 'bi-wallet-fill', color: 'orange' },
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

            {/* Filters */}
            <div className="sms-card mb-0">
                <div className="card-header">
                    <h6><i className="bi bi-funnel me-2"></i>Filters</h6>
                </div>
                <div className="card-body pb-0">
                    <div className="filter-bar">
                        <div className="position-relative flex-grow-1" style={{ maxWidth: 300 }}>
                            <i className="bi bi-search position-absolute" style={{ left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 14 }}></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name or admission no..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ paddingLeft: 36 }}
                                id="student-search"
                            />
                        </div>
                        <select className="form-select" value={classFilter} onChange={e => setClassFilter(e.target.value)} id="class-filter">
                            <option value="All">All Classes</option>
                            {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} id="status-filter">
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="sms-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student</th>
                                <th>Admission No.</th>
                                <th>Class</th>
                                <th>Roll No.</th>
                                <th>Gender</th>
                                <th>Parent</th>
                                <th>Attendance</th>
                                <th>Fee Status</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((s, idx) => (
                                <tr key={s.id}>
                                    <td>{(currentPage - 1) * perPage + idx + 1}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="user-avatar" style={{ background: getAvatar(s.name, s.gender) }}>
                                                {s.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <span className="fw-semibold">{s.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><code className="small">{s.admissionNo}</code></td>
                                    <td><span className="sms-badge info">{s.class}</span></td>
                                    <td>{s.rollNo}</td>
                                    <td>{s.gender}</td>
                                    <td>
                                        <small>{s.parentName}</small>
                                        <br />
                                        <small className="text-muted">{s.parentPhone}</small>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="sms-progress" style={{ width: 60 }}>
                                                <div className={`progress-bar ${s.attendance >= 90 ? 'bg-success' : s.attendance >= 75 ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${s.attendance}%` }}></div>
                                            </div>
                                            <small className="fw-semibold">{s.attendance}%</small>
                                        </div>
                                    </td>
                                    <td><span className={`sms-badge ${s.feeStatus.toLowerCase()}`}>{s.feeStatus}</span></td>
                                    <td><span className={`sms-badge ${s.status.toLowerCase()}`}>{s.status}</span></td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <button className="btn btn-sm btn-outline-primary border-0" title="View" onClick={() => setShowProfile(s)}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-warning border-0" title="Edit">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger border-0" title="Delete">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card-body d-flex align-items-center justify-content-between">
                    <small className="text-muted">Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filtered.length)} of {filtered.length} students</small>
                    <nav>
                        <ul className="pagination sms-pagination mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(p => p - 1)}><i className="bi bi-chevron-left"></i></button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(p => p + 1)}><i className="bi bi-chevron-right"></i></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Add Student Modal */}
            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold"><i className="bi bi-person-plus-fill me-2 text-primary"></i>Add New Student</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>First Name *</label>
                                            <input type="text" className="form-control" placeholder="Enter first name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Last Name *</label>
                                            <input type="text" className="form-control" placeholder="Enter last name" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group-sms">
                                            <label>Date of Birth *</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group-sms">
                                            <label>Gender *</label>
                                            <select className="form-select">
                                                <option value="">Select</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group-sms">
                                            <label>Blood Group</label>
                                            <select className="form-select">
                                                <option value="">Select</option>
                                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg}>{bg}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group-sms">
                                            <label>Class *</label>
                                            <select className="form-select">
                                                <option value="">Select Class</option>
                                                {classOptions.map(c => <option key={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group-sms">
                                            <label>Roll Number</label>
                                            <input type="number" className="form-control" placeholder="Roll number" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group-sms">
                                            <label>Aadhar Number</label>
                                            <input type="text" className="form-control" placeholder="XXXX-XXXX-XXXX" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <hr />
                                        <h6 className="fw-bold mb-3"><i className="bi bi-people me-2"></i>Parent Details</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Father/Guardian Name *</label>
                                            <input type="text" className="form-control" placeholder="Enter name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Parent Phone *</label>
                                            <input type="tel" className="form-control" placeholder="+91 XXXXX XXXXX" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Email</label>
                                            <input type="email" className="form-control" placeholder="parent@email.com" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Category</label>
                                            <select className="form-select">
                                                <option>General</option>
                                                <option>OBC</option>
                                                <option>SC</option>
                                                <option>ST</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group-sms">
                                            <label>Address</label>
                                            <textarea className="form-control" rows="2" placeholder="Full address"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group-sms">
                                            <label>Upload Photo</label>
                                            <div className="file-upload-area">
                                                <i className="bi bi-cloud-arrow-up d-block"></i>
                                                <p className="mb-1 fw-semibold">Click to upload or drag and drop</p>
                                                <small className="text-muted">PNG, JPG up to 2MB</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-sms-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn-sms-primary" onClick={() => setShowModal(false)}>
                                    <i className="bi bi-check-lg"></i> Save Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
