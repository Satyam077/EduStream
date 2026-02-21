import { useState } from 'react';
import { announcements } from '../data/dummyData';

export default function Notifications() {
    const [showModal, setShowModal] = useState(false);

    const priorityColors = { High: 'red', Medium: 'orange', Low: 'green' };

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Notifications & Announcements</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Notifications</span>
                    </div>
                </div>
                <button className="btn-sms-primary" onClick={() => setShowModal(true)}>
                    <i className="bi bi-megaphone"></i> New Announcement
                </button>
            </div>

            <div className="row g-3">
                <div className="col-lg-8">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-megaphone me-2 text-primary"></i>Announcements</h6>
                            <div className="d-flex gap-2">
                                {['All', 'High', 'Medium', 'Low'].map(p => (
                                    <button key={p} className="btn btn-sm btn-outline-secondary" style={{ borderRadius: 20, fontSize: 11 }}>{p}</button>
                                ))}
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {announcements.map(a => (
                                <div key={a.id} className="p-3 border-bottom d-flex gap-3 align-items-start"
                                    style={{ borderLeft: `4px solid var(--accent-${priorityColors[a.priority]})` }}>
                                    <div className={`stat-icon ${priorityColors[a.priority]}`} style={{ width: 40, height: 40, fontSize: 16 }}>
                                        <i className={`bi ${a.priority === 'High' ? 'bi-exclamation-circle' : a.priority === 'Medium' ? 'bi-info-circle' : 'bi-bell'}`}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                            <h6 className="fw-bold mb-0 small">{a.title}</h6>
                                            <span className={`sms-badge ${priorityColors[a.priority] === 'red' ? 'absent' : priorityColors[a.priority] === 'orange' ? 'pending' : 'active'}`}>
                                                {a.priority}
                                            </span>
                                        </div>
                                        <p className="text-muted small mb-2">{a.message}</p>
                                        <div className="d-flex gap-3">
                                            <small className="text-muted"><i className="bi bi-person me-1"></i>{a.postedBy}</small>
                                            <small className="text-muted"><i className="bi bi-people me-1"></i>{a.target}</small>
                                            <small className="text-muted"><i className="bi bi-calendar me-1"></i>{new Date(a.date).toLocaleDateString('en-IN')}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="sms-card mb-3">
                        <div className="card-header">
                            <h6><i className="bi bi-send me-2 text-primary"></i>Quick Notify</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                {[
                                    { label: 'Notify All Students', icon: 'bi-people', bg: 'var(--primary-light)', color: 'var(--primary)' },
                                    { label: 'Notify All Teachers', icon: 'bi-person-badge', bg: 'var(--accent-purple-light)', color: 'var(--accent-purple)' },
                                    { label: 'Notify All Parents', icon: 'bi-house-door', bg: 'var(--accent-green-light)', color: 'var(--accent-green)' },
                                    { label: 'Notify Specific Class', icon: 'bi-building', bg: 'var(--accent-orange-light)', color: 'var(--accent-orange)' },
                                ].map((item, idx) => (
                                    <button key={idx} className="btn text-start d-flex align-items-center gap-3 p-3 border" style={{ borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className={`bi ${item.icon}`}></i>
                                        </div>
                                        <span className="fw-semibold small">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-bell me-2 text-warning"></i>Push Notifications</h6>
                        </div>
                        <div className="card-body text-center py-4">
                            <i className="bi bi-phone d-block mb-2" style={{ fontSize: 40, color: 'var(--text-muted)' }}></i>
                            <p className="small text-muted mb-3">Push notification integration placeholder</p>
                            <button className="btn-sms-outline btn-sm">Configure Push Notifications</button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold"><i className="bi bi-megaphone me-2 text-primary"></i>New Announcement</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="form-group-sms"><label>Title *</label><input type="text" className="form-control" placeholder="Announcement title" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Target Audience</label>
                                            <select className="form-select"><option>All</option><option>Students</option><option>Teachers</option><option>Parents</option></select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Priority</label>
                                            <select className="form-select"><option>High</option><option>Medium</option><option>Low</option></select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group-sms"><label>Message *</label><textarea className="form-control" rows="4" placeholder="Type your announcement..."></textarea></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-sms-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn-sms-primary" onClick={() => setShowModal(false)}><i className="bi bi-send me-1"></i> Publish</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
