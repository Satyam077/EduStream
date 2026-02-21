import { schoolInfo } from '../data/dummyData';

export default function Settings() {
    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Settings</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Settings</span>
                    </div>
                </div>
            </div>

            <div className="row g-3">
                {/* School Info */}
                <div className="col-lg-6">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-building me-2 text-primary"></i>School Information</h6>
                            <button className="btn-sms-outline btn-sm"><i className="bi bi-pencil"></i> Edit</button>
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <div style={{ width: 80, height: 80, background: 'var(--primary-gradient)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 32, color: 'white' }}>
                                    <i className="bi bi-mortarboard-fill"></i>
                                </div>
                                <h5 className="fw-bold mt-3 mb-0">{schoolInfo.name}</h5>
                                <small className="text-muted">{schoolInfo.tagline}</small>
                            </div>
                            {[
                                ['Address', schoolInfo.address], ['Phone', schoolInfo.phone], ['Email', schoolInfo.email],
                                ['Website', schoolInfo.website], ['Academic Year', schoolInfo.academicYear], ['Principal', schoolInfo.principalName],
                            ].map(([label, value], idx) => (
                                <div key={idx} className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">{label}</span>
                                    <span className="fw-semibold small text-end" style={{ maxWidth: 250 }}>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* General Settings */}
                <div className="col-lg-6">
                    <div className="sms-card mb-3">
                        <div className="card-header">
                            <h6><i className="bi bi-gear me-2 text-primary"></i>General Settings</h6>
                        </div>
                        <div className="card-body">
                            {[
                                { title: 'Email Notifications', desc: 'Receive email alerts', enabled: true },
                                { title: 'SMS Notifications', desc: 'Send SMS to parents', enabled: false },
                                { title: 'Auto Backup', desc: 'Daily backup at 11 PM', enabled: true },
                                { title: 'Maintenance Mode', desc: 'System maintenance', enabled: false },
                            ].map((setting, idx) => (
                                <div key={idx} className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <div>
                                        <span className="fw-semibold small d-block">{setting.title}</span>
                                        <small className="text-muted">{setting.desc}</small>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" defaultChecked={setting.enabled} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-database me-2 text-success"></i>Backup & Data</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <span className="fw-semibold small d-block">Last Backup</span>
                                    <small className="text-muted">20 Feb 2026, 11:00 PM</small>
                                </div>
                                <span className="sms-badge active">Success</span>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn-sms-primary btn-sm"><i className="bi bi-cloud-download me-1"></i> Backup Now</button>
                                <button className="btn-sms-outline btn-sm"><i className="bi bi-file-earmark-arrow-down me-1"></i> Export Data</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Year */}
                <div className="col-lg-6">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-calendar3 me-2 text-primary"></i>Academic Year Management</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-2" style={{ background: 'var(--primary-light)' }}>
                                <div>
                                    <span className="fw-bold small">2025-2026</span>
                                    <br /><small className="text-muted">Apr 2025 - Mar 2026</small>
                                </div>
                                <span className="sms-badge active">Current</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ background: 'var(--secondary-light)' }}>
                                <div>
                                    <span className="fw-semibold small">2024-2025</span>
                                    <br /><small className="text-muted">Apr 2024 - Mar 2025</small>
                                </div>
                                <span className="sms-badge info">Closed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Multi-School */}
                <div className="col-lg-6">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-buildings me-2 text-purple" style={{ color: '#7c3aed' }}></i>Multi-School Management</h6>
                        </div>
                        <div className="card-body text-center py-4">
                            <i className="bi bi-buildings d-block mb-2" style={{ fontSize: 40, color: 'var(--text-muted)' }}></i>
                            <p className="small text-muted mb-3">Manage multiple schools from a single dashboard</p>
                            <button className="btn-sms-outline btn-sm"><i className="bi bi-plus me-1"></i> Add School Branch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
