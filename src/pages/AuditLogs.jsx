import { auditLogs } from '../data/dummyData';

export default function AuditLogs() {
    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Audit Logs</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Audit Logs</span>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn-sms-outline"><i className="bi bi-download"></i> Export Logs</button>
                    <button className="btn-sms-primary"><i className="bi bi-arrow-clockwise"></i> Refresh</button>
                </div>
            </div>

            <div className="sms-card">
                <div className="card-header">
                    <h6><i className="bi bi-list-check me-2 text-primary"></i>Activity Logs</h6>
                    <div className="d-flex gap-2">
                        <input type="date" className="form-control form-control-sm" style={{ width: 'auto' }} />
                        <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                            <option>All Actions</option>
                            <option>Added Student</option>
                            <option>Marked Attendance</option>
                            <option>Fee Collection</option>
                        </select>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="sms-table">
                        <thead>
                            <tr><th>#</th><th>User</th><th>Action</th><th>Details</th><th>Timestamp</th><th>IP Address</th></tr>
                        </thead>
                        <tbody>
                            {auditLogs.map((log, idx) => (
                                <tr key={log.id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="user-avatar sm" style={{ background: 'var(--primary)' }}>{log.user[0]}</div>
                                            <span className="fw-semibold">{log.user}</span>
                                        </div>
                                    </td>
                                    <td><span className="sms-badge info">{log.action}</span></td>
                                    <td><small>{log.details}</small></td>
                                    <td><small className="text-muted">{log.timestamp}</small></td>
                                    <td><code className="small">{log.ip}</code></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
