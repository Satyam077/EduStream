import { useState } from 'react';
import { events } from '../data/dummyData';

export default function Events() {
    const [view, setView] = useState('list');
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Events & Functions</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Events</span>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button className={`btn-sms-${view === 'list' ? 'primary' : 'outline'}`} onClick={() => setView('list')}>
                        <i className="bi bi-list"></i> List
                    </button>
                    <button className={`btn-sms-${view === 'calendar' ? 'primary' : 'outline'}`} onClick={() => setView('calendar')}>
                        <i className="bi bi-calendar3"></i> Calendar
                    </button>
                    <button className="btn-sms-primary" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus-lg"></i> Create Event
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Events', value: events.length, icon: 'bi-calendar-event-fill', color: 'blue' },
                    { label: 'Upcoming', value: events.filter(e => e.status === 'Upcoming').length, icon: 'bi-clock-fill', color: 'orange' },
                    { label: 'Completed', value: events.filter(e => e.status === 'Completed').length, icon: 'bi-check-circle-fill', color: 'green' },
                    { label: 'Total Budget', value: `₹${(events.reduce((s, e) => s + e.budget, 0) / 1000).toFixed(0)}K`, icon: 'bi-wallet-fill', color: 'purple' },
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

            {view === 'list' ? (
                <div className="row g-3">
                    {events.map(event => (
                        <div key={event.id} className="col-lg-6">
                            <div className="sms-card h-100">
                                <div className="card-body">
                                    <div className="d-flex gap-3">
                                        <div style={{
                                            width: 56, height: 56, borderRadius: 'var(--radius-md)',
                                            background: event.status === 'Completed' ? 'var(--accent-green-light)' : 'var(--primary-light)',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                        }}>
                                            <span style={{ fontSize: 18, fontWeight: 700, color: event.status === 'Completed' ? 'var(--accent-green)' : 'var(--primary)', lineHeight: 1 }}>
                                                {new Date(event.date).getDate()}
                                            </span>
                                            <span style={{ fontSize: 10, color: event.status === 'Completed' ? 'var(--accent-green)' : 'var(--primary)', textTransform: 'uppercase', fontWeight: 600 }}>
                                                {new Date(event.date).toLocaleString('en', { month: 'short' })}
                                            </span>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-1">
                                                <h6 className="fw-bold mb-0">{event.title}</h6>
                                                <span className={`sms-badge ${event.status === 'Completed' ? 'active' : 'info'}`}>{event.status}</span>
                                            </div>
                                            <p className="text-muted small mb-2">{event.description}</p>
                                            <div className="d-flex gap-3 flex-wrap">
                                                <small><i className="bi bi-clock me-1"></i>{event.time}</small>
                                                <small><i className="bi bi-geo-alt me-1"></i>{event.venue}</small>
                                                <small><i className="bi bi-tag me-1"></i>{event.type}</small>
                                                <small><i className="bi bi-wallet2 me-1"></i>₹{event.budget.toLocaleString()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="sms-card">
                    <div className="card-header">
                        <h6><i className="bi bi-calendar3 me-2 text-primary"></i>Event Calendar - 2026</h6>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            {['January', 'February', 'March'].map((month, mIdx) => (
                                <div key={month} className="col-md-4">
                                    <div className="border rounded-3 p-3">
                                        <h6 className="fw-bold text-center mb-3">{month} 2026</h6>
                                        <div className="d-flex flex-wrap justify-content-center gap-1 mb-2">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                                <div key={i} className="text-center" style={{ width: 32, fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>{d}</div>
                                            ))}
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center gap-1">
                                            {Array.from({ length: [31, 28, 31][mIdx] }, (_, i) => {
                                                const day = i + 1;
                                                const eventForDay = events.find(e => {
                                                    const d = new Date(e.date);
                                                    return d.getDate() === day && d.getMonth() === mIdx;
                                                });
                                                return (
                                                    <div
                                                        key={day}
                                                        className={`calendar-day ${eventForDay ? 'has-event' : ''}`}
                                                        style={{ width: 32, height: 32, fontSize: 12, background: eventForDay ? 'var(--primary-light)' : 'transparent' }}
                                                        title={eventForDay?.title || ''}
                                                    >
                                                        {day}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-2">
                                            {events.filter(e => new Date(e.date).getMonth() === mIdx).map(e => (
                                                <div key={e.id} className="d-flex align-items-center gap-2 mt-1">
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }}></div>
                                                    <small className="text-muted">{new Date(e.date).getDate()} - {e.title}</small>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold"><i className="bi bi-calendar-plus me-2 text-primary"></i>Create Event</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="form-group-sms"><label>Event Title *</label><input type="text" className="form-control" placeholder="e.g. Annual Sports Day" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms"><label>Date</label><input type="date" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms"><label>Time</label><input type="time" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms"><label>Venue</label><input type="text" className="form-control" placeholder="Venue" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms">
                                            <label>Type</label>
                                            <select className="form-select"><option>Cultural</option><option>Sports</option><option>Academic</option><option>PTM</option></select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group-sms"><label>Budget (₹)</label><input type="number" className="form-control" placeholder="Budget" /></div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group-sms"><label>Description</label><textarea className="form-control" rows="3" placeholder="Event description..."></textarea></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-sms-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn-sms-primary" onClick={() => setShowModal(false)}><i className="bi bi-check-lg"></i> Create Event</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
