import { useState } from 'react';
import { exams, examResults, classOptions } from '../data/dummyData';

export default function Exams() {
    const [activeTab, setActiveTab] = useState('exams');
    const [showCreateExam, setShowCreateExam] = useState(false);
    const [showMarksheet, setShowMarksheet] = useState(null);

    if (showMarksheet) {
        const r = showMarksheet;
        const subjects = Object.entries(r.subjects);
        return (
            <div className="fade-in">
                <div className="page-header">
                    <div>
                        <button className="btn btn-sm btn-sms-outline mb-2" onClick={() => setShowMarksheet(null)}>
                            <i className="bi bi-arrow-left"></i> Back to Results
                        </button>
                        <h4>Report Card / Marksheet</h4>
                    </div>
                    <button className="btn-sms-primary"><i className="bi bi-printer"></i> Print / Download PDF</button>
                </div>

                <div className="sms-card" style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div className="card-body p-4">
                        {/* School Header */}
                        <div className="text-center mb-4 pb-3 border-bottom">
                            <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                                <div style={{ width: 56, height: 56, background: 'var(--primary-gradient)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                                    <i className="bi bi-mortarboard-fill"></i>
                                </div>
                                <div>
                                    <h4 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>Raghukul Academy</h4>
                                    <small className="text-muted">Nurturing Minds, Building Futures</small>
                                </div>
                            </div>
                            <h6 className="fw-bold mt-2">{r.exam} Examination - Report Card</h6>
                            <small className="text-muted">Academic Year: 2025-2026</small>
                        </div>

                        {/* Student Info */}
                        <div className="row mb-4">
                            {[
                                ['Student Name', r.studentName], ['Class', r.class], ['Roll No.', r.rank],
                                ['Exam', r.exam], ['Percentage', `${r.percentage}%`], ['Grade', r.grade]
                            ].map(([label, value], idx) => (
                                <div key={idx} className="col-md-4 col-6 mb-2">
                                    <small className="text-muted d-block">{label}</small>
                                    <span className="fw-bold">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Marks Table */}
                        <table className="table table-bordered mb-4">
                            <thead style={{ background: 'var(--primary)', color: 'white' }}>
                                <tr>
                                    <th>Subject</th>
                                    <th className="text-center">Max Marks</th>
                                    <th className="text-center">Obtained</th>
                                    <th className="text-center">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map(([subject, marks], idx) => (
                                    <tr key={idx}>
                                        <td className="fw-semibold">{subject}</td>
                                        <td className="text-center">100</td>
                                        <td className="text-center fw-bold">{marks}</td>
                                        <td className="text-center">
                                            <span className={`sms-badge ${marks >= 90 ? 'active' : marks >= 75 ? 'info' : marks >= 60 ? 'pending' : 'absent'}`}>
                                                {marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B+' : marks >= 60 ? 'B' : 'C'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr style={{ background: 'var(--secondary-light)' }}>
                                    <td className="fw-bold">Total</td>
                                    <td className="text-center fw-bold">{subjects.length * 100}</td>
                                    <td className="text-center fw-bold">{r.total}</td>
                                    <td className="text-center"><span className="sms-badge active fw-bold">{r.grade}</span></td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="row mt-4 pt-3 border-top">
                            <div className="col-6">
                                <small className="text-muted">Class Teacher</small>
                                <div className="mt-4 pt-2 border-top" style={{ width: 150 }}>
                                    <small className="fw-semibold">Signature</small>
                                </div>
                            </div>
                            <div className="col-6 text-end">
                                <small className="text-muted">Principal</small>
                                <div className="mt-4 pt-2 border-top ms-auto" style={{ width: 150 }}>
                                    <small className="fw-semibold">Signature & Seal</small>
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
                    <h4>Examination & Results</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Exams</span>
                    </div>
                </div>
                <button className="btn-sms-primary" onClick={() => setShowCreateExam(true)}>
                    <i className="bi bi-plus-lg"></i> Create Exam
                </button>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs sms-tabs mb-4">
                {['exams', 'results', 'marks-entry'].map(tab => (
                    <li key={tab} className="nav-item">
                        <button className={`nav-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                            {tab === 'exams' ? 'Exams' : tab === 'results' ? 'Results' : 'Marks Entry'}
                        </button>
                    </li>
                ))}
            </ul>

            {activeTab === 'exams' && (
                <div className="row g-3">
                    {exams.map(exam => (
                        <div key={exam.id} className="col-lg-6">
                            <div className="sms-card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <h6 className="fw-bold mb-1">{exam.name}</h6>
                                            <span className={`sms-badge ${exam.type === 'Final' ? 'purple' : exam.type === 'Midterm' ? 'info' : 'pending'}`}>{exam.type}</span>
                                        </div>
                                        <span className={`sms-badge ${exam.status === 'Completed' ? 'active' : 'info'}`}>{exam.status}</span>
                                    </div>
                                    <div className="d-flex gap-4">
                                        <div>
                                            <small className="text-muted d-block">Start Date</small>
                                            <small className="fw-semibold">{new Date(exam.startDate).toLocaleDateString('en-IN')}</small>
                                        </div>
                                        <div>
                                            <small className="text-muted d-block">End Date</small>
                                            <small className="fw-semibold">{new Date(exam.endDate).toLocaleDateString('en-IN')}</small>
                                        </div>
                                        <div>
                                            <small className="text-muted d-block">Classes</small>
                                            <small className="fw-semibold">{exam.classes.length} Classes</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'results' && (
                <div className="sms-card">
                    <div className="card-header">
                        <h6><i className="bi bi-trophy me-2 text-warning"></i>Exam Results</h6>
                        <div className="d-flex gap-2">
                            <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                                <option>Mid-Term</option>
                                <option>Final</option>
                                <option>Unit Test</option>
                            </select>
                            <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                                <option>All Classes</option>
                                {classOptions.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="sms-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Student</th>
                                    <th>Class</th>
                                    <th>Maths</th>
                                    <th>Science</th>
                                    <th>English</th>
                                    <th>Hindi</th>
                                    <th>SST</th>
                                    <th>Computer</th>
                                    <th>Total</th>
                                    <th>%</th>
                                    <th>Grade</th>
                                    <th>Report Card</th>
                                </tr>
                            </thead>
                            <tbody>
                                {examResults.sort((a, b) => a.rank - b.rank).map(r => (
                                    <tr key={r.id}>
                                        <td>
                                            <span className={`fw-bold ${r.rank <= 3 ? 'text-warning' : ''}`}>
                                                {r.rank <= 3 && <i className="bi bi-trophy-fill me-1"></i>}{r.rank}
                                            </span>
                                        </td>
                                        <td className="fw-semibold">{r.studentName}</td>
                                        <td><span className="sms-badge info">{r.class}</span></td>
                                        {Object.values(r.subjects).map((m, idx) => (
                                            <td key={idx} className={m >= 80 ? 'text-success fw-semibold' : m >= 60 ? '' : 'text-danger'}>{m}</td>
                                        ))}
                                        <td className="fw-bold">{r.total}</td>
                                        <td className="fw-bold">{r.percentage}%</td>
                                        <td><span className={`sms-badge ${r.grade === 'A+' ? 'active' : 'pending'}`}>{r.grade}</span></td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary border-0" onClick={() => setShowMarksheet(r)}>
                                                <i className="bi bi-file-earmark-pdf"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'marks-entry' && (
                <div className="sms-card">
                    <div className="card-header">
                        <h6><i className="bi bi-pencil-square me-2 text-primary"></i>Marks Entry</h6>
                    </div>
                    <div className="card-body">
                        <div className="row g-3 mb-4">
                            <div className="col-md-3">
                                <label className="form-label small fw-semibold">Exam</label>
                                <select className="form-select">
                                    {exams.map(e => <option key={e.id}>{e.name}</option>)}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-semibold">Class</label>
                                <select className="form-select">
                                    {classOptions.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-semibold">Subject</label>
                                <select className="form-select">
                                    <option>Mathematics</option><option>Science</option><option>English</option>
                                </select>
                            </div>
                            <div className="col-md-3 d-flex align-items-end">
                                <button className="btn-sms-primary w-100"><i className="bi bi-search me-1"></i> Load Students</button>
                            </div>
                        </div>
                        <div className="text-center py-5">
                            <i className="bi bi-journal-text d-block mb-3" style={{ fontSize: 48, color: 'var(--text-muted)' }}></i>
                            <h6 className="text-muted">Select exam, class, and subject to start entering marks</h6>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Exam Modal */}
            {showCreateExam && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold"><i className="bi bi-journal-plus me-2 text-primary"></i>Create Exam</h5>
                                <button className="btn-close" onClick={() => setShowCreateExam(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="form-group-sms">
                                            <label>Exam Name *</label>
                                            <input type="text" className="form-control" placeholder="e.g. Mid-Term Examination" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Exam Type</label>
                                            <select className="form-select">
                                                <option>Midterm</option><option>Final</option><option>Unit Test</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Classes</label>
                                            <select className="form-select" multiple style={{ height: 80 }}>
                                                {classOptions.map(c => <option key={c}>{c}</option>)}
                                            </select>
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
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-sms-outline" onClick={() => setShowCreateExam(false)}>Cancel</button>
                                <button className="btn-sms-primary" onClick={() => setShowCreateExam(false)}>
                                    <i className="bi bi-check-lg"></i> Create Exam
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
