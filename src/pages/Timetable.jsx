import { useState } from 'react';
import { timetable, classOptions } from '../data/dummyData';

export default function Timetable() {
    const [selectedClass, setSelectedClass] = useState('10-A');

    const subjectColors = {
        'Mathematics': '#1a73e8', 'Science': '#0d904f', 'English': '#e37400', 'Hindi': '#d93025',
        'Computer Science': '#7c3aed', 'Social Studies': '#0891b2', 'Physical Education': '#e91e8a',
        'Art & Craft': '#f59e0b', 'Library': '#6b7280',
    };

    const days = Object.keys(timetable.days);

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Timetable Management</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Timetable</span>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <select className="form-select" value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: 'auto' }}>
                        {classOptions.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <button className="btn-sms-primary"><i className="bi bi-printer"></i> Print</button>
                </div>
            </div>

            <div className="sms-card">
                <div className="card-header">
                    <h6><i className="bi bi-clock me-2 text-primary"></i>Weekly Timetable - Class {selectedClass}</h6>
                </div>
                <div className="table-responsive">
                    <table className="sms-table text-center">
                        <thead>
                            <tr>
                                <th className="text-start" style={{ width: 100 }}>Day</th>
                                <th>Period 1<br /><small className="fw-normal">08:00-08:45</small></th>
                                <th>Period 2<br /><small className="fw-normal">08:45-09:30</small></th>
                                <th>Period 3<br /><small className="fw-normal">09:30-10:15</small></th>
                                <th style={{ background: '#fff3cd', width: 30 }}>
                                    <small>☕</small>
                                </th>
                                <th>Period 4<br /><small className="fw-normal">10:30-11:15</small></th>
                                <th>Period 5<br /><small className="fw-normal">11:15-12:00</small></th>
                                <th style={{ background: '#fff3cd', width: 30 }}>
                                    <small>🍽️</small>
                                </th>
                                <th>Period 6<br /><small className="fw-normal">12:45-01:30</small></th>
                                <th>Period 7<br /><small className="fw-normal">01:30-02:15</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map(day => {
                                const periods = timetable.days[day];
                                return (
                                    <tr key={day}>
                                        <td className="text-start fw-bold">{day}</td>
                                        {periods.slice(0, 3).map((p, idx) => (
                                            <td key={idx}>
                                                <div className="rounded-2 p-2" style={{ background: `${subjectColors[p.subject]}10`, minWidth: 90 }}>
                                                    <div className="fw-bold small" style={{ color: subjectColors[p.subject] }}>{p.subject}</div>
                                                    <small className="text-muted" style={{ fontSize: 10 }}>{p.teacher.split(' ').slice(-1)[0]}</small>
                                                </div>
                                            </td>
                                        ))}
                                        <td style={{ background: '#fffbeb' }}></td>
                                        {periods.slice(3, 5).map((p, idx) => (
                                            <td key={idx}>
                                                <div className="rounded-2 p-2" style={{ background: `${subjectColors[p.subject]}10`, minWidth: 90 }}>
                                                    <div className="fw-bold small" style={{ color: subjectColors[p.subject] }}>{p.subject}</div>
                                                    <small className="text-muted" style={{ fontSize: 10 }}>{p.teacher.split(' ').slice(-1)[0]}</small>
                                                </div>
                                            </td>
                                        ))}
                                        <td style={{ background: '#fffbeb' }}></td>
                                        {periods.slice(5).map((p, idx) => (
                                            <td key={idx}>
                                                <div className="rounded-2 p-2" style={{ background: `${subjectColors[p.subject]}10`, minWidth: 90 }}>
                                                    <div className="fw-bold small" style={{ color: subjectColors[p.subject] }}>{p.subject}</div>
                                                    <small className="text-muted" style={{ fontSize: 10 }}>{p.teacher.split(' ').slice(-1)[0]}</small>
                                                </div>
                                            </td>
                                        ))}
                                        {periods.length < 7 && <td colSpan={7 - periods.length}></td>}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="card-body">
                    <h6 className="fw-bold mb-3">Subject Color Legend</h6>
                    <div className="d-flex flex-wrap gap-3">
                        {Object.entries(subjectColors).map(([subject, color]) => (
                            <div key={subject} className="d-flex align-items-center gap-2">
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: color }}></div>
                                <small className="fw-semibold">{subject}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
