import { useState } from 'react';
import { feeStructure, feePayments, classOptions } from '../data/dummyData';

export default function FeeManagement() {
    const [activeTab, setActiveTab] = useState('payments');
    const [showReceipt, setShowReceipt] = useState(null);

    const totalCollected = feePayments.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
    const totalPending = feePayments.filter(f => f.status === 'Pending').reduce((sum, f) => sum + f.amount, 0);
    const totalFine = feePayments.reduce((sum, f) => sum + f.fine, 0);

    if (showReceipt) {
        const p = showReceipt;
        return (
            <div className="fade-in">
                <div className="page-header">
                    <div>
                        <button className="btn btn-sm btn-sms-outline mb-2" onClick={() => setShowReceipt(null)}>
                            <i className="bi bi-arrow-left"></i> Back
                        </button>
                        <h4>Fee Receipt</h4>
                    </div>
                    <button className="btn-sms-primary"><i className="bi bi-printer"></i> Print Receipt</button>
                </div>
                <div className="sms-card" style={{ maxWidth: 600, margin: '0 auto' }}>
                    <div className="card-body p-4">
                        <div className="text-center mb-4 pb-3 border-bottom">
                            <h5 className="fw-bold" style={{ color: 'var(--primary)' }}>Raghukul Academy</h5>
                            <small className="text-muted">Fee Payment Receipt</small>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6"><small className="text-muted">Receipt No.</small><br /><span className="fw-bold">{p.receiptNo}</span></div>
                            <div className="col-6 text-end"><small className="text-muted">Date</small><br /><span className="fw-bold">{p.paidDate || 'N/A'}</span></div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-6"><small className="text-muted">Student</small><br /><span className="fw-bold">{p.studentName}</span></div>
                            <div className="col-3"><small className="text-muted">Class</small><br /><span className="fw-bold">{p.class}</span></div>
                            <div className="col-3"><small className="text-muted">Month</small><br /><span className="fw-bold">{p.month}</span></div>
                        </div>
                        <table className="table table-bordered">
                            <tbody>
                                <tr><td>Fee Amount</td><td className="text-end fw-bold">₹{p.amount.toLocaleString()}</td></tr>
                                <tr><td>Fine</td><td className="text-end text-danger">₹{p.fine.toLocaleString()}</td></tr>
                                <tr style={{ background: 'var(--primary-light)' }}>
                                    <td className="fw-bold">Total</td>
                                    <td className="text-end fw-bold" style={{ color: 'var(--primary)' }}>₹{(p.amount + p.fine).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between">
                            <div><small className="text-muted">Payment Mode</small><br /><span className="fw-semibold">{p.mode || 'N/A'}</span></div>
                            <div className="text-end"><small className="text-muted">Status</small><br /><span className={`sms-badge ${p.status.toLowerCase()}`}>{p.status}</span></div>
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
                    <h4>Fee Management</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Fees</span>
                    </div>
                </div>
                <button className="btn-sms-primary"><i className="bi bi-plus-lg"></i> Collect Fee</button>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Collected', value: `₹${totalCollected.toLocaleString()}`, icon: 'bi-wallet-fill', color: 'green' },
                    { label: 'Pending Amount', value: `₹${totalPending.toLocaleString()}`, icon: 'bi-hourglass-split', color: 'orange' },
                    { label: 'Total Fine', value: `₹${totalFine.toLocaleString()}`, icon: 'bi-exclamation-triangle-fill', color: 'red' },
                    { label: 'Payment Rate', value: `${((feePayments.filter(f => f.status === 'Paid').length / feePayments.length) * 100).toFixed(0)}%`, icon: 'bi-graph-up', color: 'blue' },
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

            {/* Tabs */}
            <ul className="nav nav-tabs sms-tabs mb-4">
                {[['payments', 'Fee Payments'], ['structure', 'Fee Structure'], ['report', 'Reports']].map(([key, label]) => (
                    <li key={key} className="nav-item">
                        <button className={`nav-link ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                    </li>
                ))}
            </ul>

            {activeTab === 'payments' && (
                <div className="sms-card">
                    <div className="card-header">
                        <h6><i className="bi bi-receipt me-2 text-primary"></i>Fee Payments</h6>
                        <div className="d-flex gap-2">
                            <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                                <option>All Classes</option>
                                {classOptions.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                                <option>All Status</option>
                                <option>Paid</option><option>Pending</option><option>Partial</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="sms-table">
                            <thead>
                                <tr>
                                    <th>Receipt No.</th>
                                    <th>Student</th>
                                    <th>Class</th>
                                    <th>Month</th>
                                    <th>Amount</th>
                                    <th>Fine</th>
                                    <th>Paid Date</th>
                                    <th>Mode</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feePayments.map(p => (
                                    <tr key={p.id}>
                                        <td><code className="small">{p.receiptNo}</code></td>
                                        <td className="fw-semibold">{p.studentName}</td>
                                        <td><span className="sms-badge info">{p.class}</span></td>
                                        <td>{p.month}</td>
                                        <td className="fw-bold">₹{p.amount.toLocaleString()}</td>
                                        <td className={p.fine > 0 ? 'text-danger fw-semibold' : ''}>₹{p.fine}</td>
                                        <td>{p.paidDate ? new Date(p.paidDate).toLocaleDateString('en-IN') : '-'}</td>
                                        <td>{p.mode || '-'}</td>
                                        <td><span className={`sms-badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button className="btn btn-sm btn-outline-primary border-0" onClick={() => setShowReceipt(p)} title="Receipt">
                                                    <i className="bi bi-receipt"></i>
                                                </button>
                                                {p.status !== 'Paid' && (
                                                    <button className="btn btn-sm btn-outline-success border-0" title="Collect">
                                                        <i className="bi bi-wallet2"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'structure' && (
                <div className="sms-card">
                    <div className="card-header">
                        <h6><i className="bi bi-list-columns-reverse me-2 text-primary"></i>Fee Structure</h6>
                        <button className="btn-sms-outline btn-sm"><i className="bi bi-pencil"></i> Edit Structure</button>
                    </div>
                    <div className="table-responsive">
                        <table className="sms-table">
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Tuition Fee</th>
                                    <th>Exam Fee</th>
                                    <th>Activity Fee</th>
                                    <th>Lab Fee</th>
                                    <th>Library Fee</th>
                                    <th>Sports Fee</th>
                                    <th>Monthly Total</th>
                                    <th>Annual Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeStructure.map(f => (
                                    <tr key={f.id}>
                                        <td className="fw-bold">{f.class}</td>
                                        <td>₹{f.tuitionFee.toLocaleString()}</td>
                                        <td>₹{f.examFee.toLocaleString()}</td>
                                        <td>₹{f.activityFee.toLocaleString()}</td>
                                        <td>₹{f.labFee.toLocaleString()}</td>
                                        <td>₹{f.libraryFee.toLocaleString()}</td>
                                        <td>₹{f.sportsFee.toLocaleString()}</td>
                                        <td className="fw-bold text-primary">₹{f.totalMonthly.toLocaleString()}</td>
                                        <td className="fw-bold text-success">₹{f.totalAnnual.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'report' && (
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="sms-card h-100">
                            <div className="card-header"><h6><i className="bi bi-file-earmark-bar-graph me-2 text-primary"></i>Pending Fees Report</h6></div>
                            <div className="card-body p-0">
                                {feePayments.filter(f => f.status !== 'Paid').map(p => (
                                    <div key={p.id} className="d-flex align-items-center justify-content-between p-3 border-bottom">
                                        <div>
                                            <span className="fw-semibold small">{p.studentName}</span>
                                            <br /><small className="text-muted">{p.class} • {p.month}</small>
                                        </div>
                                        <div className="text-end">
                                            <span className="fw-bold text-danger">₹{p.amount.toLocaleString()}</span>
                                            {p.fine > 0 && <br />}
                                            {p.fine > 0 && <small className="text-muted">Fine: ₹{p.fine}</small>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="sms-card h-100">
                            <div className="card-header"><h6><i className="bi bi-clock-history me-2 text-success"></i>Recent Collections</h6></div>
                            <div className="card-body p-0">
                                {feePayments.filter(f => f.status === 'Paid').map(p => (
                                    <div key={p.id} className="d-flex align-items-center justify-content-between p-3 border-bottom">
                                        <div>
                                            <span className="fw-semibold small">{p.studentName}</span>
                                            <br /><small className="text-muted">{p.class} • {p.mode}</small>
                                        </div>
                                        <div className="text-end">
                                            <span className="fw-bold text-success">₹{p.amount.toLocaleString()}</span>
                                            <br /><small className="text-muted">{new Date(p.paidDate).toLocaleDateString('en-IN')}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
