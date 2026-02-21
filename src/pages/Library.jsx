import { useState } from 'react';
import { libraryBooks } from '../data/dummyData';

export default function Library() {
    const [search, setSearch] = useState('');

    const filtered = libraryBooks.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Library Management</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Library</span>
                    </div>
                </div>
                <button className="btn-sms-primary"><i className="bi bi-plus-lg"></i> Add Book</button>
            </div>

            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Books', value: libraryBooks.reduce((s, b) => s + b.total, 0), icon: 'bi-book-fill', color: 'blue' },
                    { label: 'Available', value: libraryBooks.reduce((s, b) => s + b.available, 0), icon: 'bi-check-circle-fill', color: 'green' },
                    { label: 'Issued', value: libraryBooks.reduce((s, b) => s + (b.total - b.available), 0), icon: 'bi-arrow-right-circle-fill', color: 'orange' },
                    { label: 'Categories', value: [...new Set(libraryBooks.map(b => b.category))].length, icon: 'bi-tags-fill', color: 'purple' },
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
                    <h6><i className="bi bi-bookshelf me-2 text-primary"></i>Book Catalog</h6>
                    <div className="position-relative" style={{ width: 250 }}>
                        <i className="bi bi-search position-absolute" style={{ left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                        <input type="text" className="form-control form-control-sm" placeholder="Search books..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32 }} />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="sms-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Title</th><th>Author</th><th>ISBN</th><th>Category</th><th>Available</th><th>Total</th><th>Location</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((b, idx) => (
                                <tr key={b.id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <i className="bi bi-book text-primary"></i>
                                            </div>
                                            <span className="fw-semibold">{b.title}</span>
                                        </div>
                                    </td>
                                    <td>{b.author}</td>
                                    <td><code className="small">{b.isbn}</code></td>
                                    <td><span className="sms-badge info">{b.category}</span></td>
                                    <td><span className={`fw-bold ${b.available <= 3 ? 'text-danger' : 'text-success'}`}>{b.available}</span></td>
                                    <td>{b.total}</td>
                                    <td><small className="text-muted">{b.location}</small></td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <button className="btn btn-sm btn-outline-primary border-0" title="Issue"><i className="bi bi-arrow-up-right"></i></button>
                                            <button className="btn btn-sm btn-outline-warning border-0" title="Edit"><i className="bi bi-pencil"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
