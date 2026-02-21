import { roles } from '../data/dummyData';

export default function Roles() {
    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Roles & Access Control</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Roles</span>
                    </div>
                </div>
                <button className="btn-sms-primary"><i className="bi bi-plus-lg"></i> Add Role</button>
            </div>

            <div className="row g-3 mb-4">
                {roles.map(role => (
                    <div key={role.id} className="col-lg-4 col-md-6">
                        <div className="sms-card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`stat-icon ${['blue', 'purple', 'green', 'orange', 'teal'][role.id - 1]}`} style={{ width: 44, height: 44 }}>
                                            <i className={`bi ${role.name === 'Super Admin' ? 'bi-shield-fill-check' : role.name === 'Admin' ? 'bi-shield-fill' : role.name === 'Teacher' ? 'bi-person-badge' : role.name === 'Parent' ? 'bi-house-door' : 'bi-person'}`}></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-0">{role.name}</h6>
                                            <small className="text-muted">{role.users} users</small>
                                        </div>
                                    </div>
                                    <button className="btn btn-sm btn-outline-primary border-0"><i className="bi bi-pencil"></i></button>
                                </div>
                                <div className="mb-3">
                                    <small className="text-muted fw-semibold d-block mb-2">Permissions:</small>
                                    <p className="small mb-0">{role.permissions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Security Features */}
            <div className="sms-card">
                <div className="card-header">
                    <h6><i className="bi bi-shield-lock me-2 text-primary"></i>Security Features</h6>
                </div>
                <div className="card-body">
                    <div className="row g-3">
                        {[
                            { title: 'Two-Factor Authentication', desc: 'Add extra security with OTP verification', icon: 'bi-phone', enabled: true },
                            { title: 'Session Timeout', desc: 'Auto-logout after 30 minutes of inactivity', icon: 'bi-clock-history', enabled: true },
                            { title: 'IP Whitelisting', desc: 'Restrict access to specific IP addresses', icon: 'bi-globe', enabled: false },
                            { title: 'Password Policy', desc: 'Enforce strong password requirements', icon: 'bi-key', enabled: true },
                            { title: 'Login History', desc: 'Track all login attempts', icon: 'bi-list-check', enabled: true },
                            { title: 'Data Encryption', desc: 'End-to-end encryption for sensitive data', icon: 'bi-lock', enabled: true },
                        ].map((feature, idx) => (
                            <div key={idx} className="col-md-6 col-lg-4">
                                <div className="d-flex align-items-center justify-content-between p-3 border rounded-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <i className={`bi ${feature.icon} text-primary`} style={{ fontSize: 20 }}></i>
                                        <div>
                                            <span className="fw-semibold small d-block">{feature.title}</span>
                                            <small className="text-muted">{feature.desc}</small>
                                        </div>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" defaultChecked={feature.enabled} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
