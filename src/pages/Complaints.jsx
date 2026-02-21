import { useState } from 'react';
import { complaints } from '../data/dummyData';

export default function Complaints() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Complaints & Grievance</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Complaints</span>
                    </div>
                </div>
                <button className="btn-sms-primary" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus-lg"></i> New Complaint
                </button>
            </div>

            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Complaints', value: complaints.length, icon: 'bi-exclamation-triangle-fill', color: 'blue' },
                    { label: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, icon: 'bi-hourglass-split', color: 'orange' },
                    { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, icon: 'bi-arrow-repeat', color: 'purple' },
                    { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, icon: 'bi-check-circle-fill', color: 'green' },
                ].map((stat, idx) => (
                    <div key={idx} className="col-lg-3 col-md-6">
                        <div className={`stat-card ${stat.color}`}>
                            <div className={`stat-icon ${stat.color}`}><i className={`bi ${stat.icon}`}></i></div>
                            <div className="stat-info"><h3>{stat.value}</h3><p>{stat.label}</p></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sms-card">
                <div className="card-header">
                    <h6><i className="bi bi-list-ul me-2 text-primary"></i>All Complaints</h6>
                </div>
                <div className="table-responsive">
                    <table className="sms-table">
                        <thead>
                            <tr><th>#</th><th>From</th><th>Subject</th><th>Description</th><th>Date</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {complaints.map((c, idx) => (
                                <tr key={c.id}>
                                    <td>{idx + 1}</td>
                                    <td className="fw-semibold">{c.from}</td>
                                    <td>{c.subject}</td>
                                    <td><small className="text-muted">{c.description}</small></td>
                                    <td>{new Date(c.date).toLocaleDateString('en-IN')}</td>
                                    <td><span className={`sms-badge ${c.priority === 'High' ? 'absent' : 'pending'}`}>{c.priority}</span></td>
                                    <td><span className={`sms-badge ${c.status === 'Resolved' ? 'active' : c.status === 'Pending' ? 'pending' : 'info'}`}>{c.status}</span></td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <button className="btn btn-sm btn-outline-primary border-0"><i className="bi bi-eye"></i></button>
                                            <button className="btn btn-sm btn-outline-success border-0"><i className="bi bi-check"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold"><i className="bi bi-exclamation-triangle me-2 text-warning"></i>New Complaint</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12"><div className="form-group-sms"><label>Subject *</label><input type="text" className="form-control" placeholder="Complaint subject" /></div></div>
                                    <div className="col-md-6"><div className="form-group-sms"><label>Priority</label><select className="form-select"><option>High</option><option>Medium</option><option>Low</option></select></div></div>
                                    <div className="col-md-6"><div className="form-group-sms"><label>Category</label><select className="form-select"><option>Infrastructure</option><option>Academic</option><option>Transport</option><option>Other</option></select></div></div>
                                    <div className="col-12"><div className="form-group-sms"><label>Description *</label><textarea className="form-control" rows="4" placeholder="Describe the issue..."></textarea></div></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-sms-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn-sms-primary" onClick={() => setShowModal(false)}><i className="bi bi-send me-1"></i> Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
