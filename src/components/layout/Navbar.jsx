import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recentNotifications, schoolInfo } from '../../data/dummyData';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onToggleSidebar, onLogout }) {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { user } = useAuth();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
    };

    const unreadCount = recentNotifications.filter(n => !n.read).length;

    // Role-specific badge color
    const roleBadgeColors = {
        admin: '#1a73e8',
        teacher: '#7c3aed',
        parent: '#0d904f',
        student: '#e37400',
    };
    const roleBadgeColor = roleBadgeColors[user?.role] || '#1a73e8';

    return (
        <header className="top-navbar">
            <div className="navbar-left">
                <button className="sidebar-toggle" onClick={onToggleSidebar} id="sidebar-toggle-btn">
                    <i className="bi bi-list"></i>
                </button>
                <div className="search-box">
                    <i className="bi bi-search"></i>
                    <input type="text" placeholder="Search students, teachers, classes..." id="global-search" />
                </div>
            </div>

            <div className="navbar-right">
                {/* Role Badge */}
                <div
                    className="academic-year-badge"
                    style={{ background: roleBadgeColor + '15', color: roleBadgeColor, border: `1px solid ${roleBadgeColor}30` }}
                >
                    <i className="bi bi-person-check-fill me-1"></i>
                    {user?.roleLabel || 'Admin'}
                </div>

                <div className="academic-year-badge">
                    <i className="bi bi-calendar3"></i>
                    {schoolInfo.academicYear}
                </div>

                <button
                    className="nav-icon-btn"
                    onClick={toggleDarkMode}
                    title="Toggle Dark Mode"
                    id="dark-mode-toggle"
                >
                    <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
                </button>

                <button className="nav-icon-btn" title="Messages" id="messages-btn">
                    <i className="bi bi-chat-dots-fill"></i>
                    <span className="notification-dot"></span>
                </button>

                <div className="position-relative">
                    <button
                        className="nav-icon-btn"
                        title="Notifications"
                        onClick={() => setShowNotifications(!showNotifications)}
                        id="notifications-btn"
                    >
                        <i className="bi bi-bell-fill"></i>
                        {unreadCount > 0 && <span className="notification-dot"></span>}
                    </button>

                    {showNotifications && (
                        <div
                            className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg"
                            style={{ width: 360, zIndex: 1050, border: '1px solid var(--border-light)' }}
                        >
                            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                                <h6 className="mb-0 fw-bold">Notifications</h6>
                                <span className="sms-badge info">{unreadCount} New</span>
                            </div>
                            <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                                {recentNotifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        className={`p-3 border-bottom d-flex gap-3 align-items-start ${!notif.read ? 'bg-light' : ''}`}
                                        style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                                    >
                                        <div className={`stat-icon ${notif.type === 'event' ? 'blue' : notif.type === 'fee' ? 'orange' : notif.type === 'exam' ? 'purple' : 'green'}`}
                                            style={{ width: 36, height: 36, fontSize: 14, flexShrink: 0 }}>
                                            <i className={`bi ${notif.type === 'event' ? 'bi-calendar-event' : notif.type === 'fee' ? 'bi-wallet2' : notif.type === 'exam' ? 'bi-journal-text' : 'bi-person-plus'}`}></i>
                                        </div>
                                        <div>
                                            <p className="mb-0 small fw-semibold" style={{ color: 'var(--text-primary)' }}>{notif.title}</p>
                                            <small className="text-muted">{notif.time}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 text-center">
                                <button className="btn btn-sm btn-link text-decoration-none fw-semibold">View All Notifications</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="dropdown">
                    <button className="profile-dropdown" data-bs-toggle="dropdown" id="profile-dropdown-btn">
                        <div className="profile-avatar" style={{ background: roleBadgeColor }}>
                            {user?.avatar || 'U'}
                        </div>
                        <div className="profile-info">
                            <div className="name">{user?.name || 'User'}</div>
                            <div className="role">{user?.roleLabel || 'User'}</div>
                        </div>
                        <i className="bi bi-chevron-down ms-1" style={{ fontSize: 12, color: 'var(--text-muted)' }}></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2">
                        <li className="px-3 py-2 border-bottom">
                            <div className="d-flex align-items-center gap-2">
                                <div className="profile-avatar" style={{ width: 40, height: 40, fontSize: 16, background: roleBadgeColor }}>
                                    {user?.avatar || 'U'}
                                </div>
                                <div>
                                    <div className="fw-bold small">{user?.name || 'User'}</div>
                                    <div className="text-muted" style={{ fontSize: 11 }}>{user?.email || ''}</div>
                                </div>
                            </div>
                        </li>
                        <li><a className="dropdown-item py-2" href="#" onClick={(e) => { e.preventDefault(); navigate('/profile'); }}><i className="bi bi-person me-2"></i> My Profile</a></li>
                        <li><a className="dropdown-item py-2" href="#"><i className="bi bi-gear me-2"></i> Settings</a></li>
                        <li><a className="dropdown-item py-2" href="#"><i className="bi bi-question-circle me-2"></i> Help Center</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item py-2 text-danger" href="#" onClick={(e) => { e.preventDefault(); onLogout && onLogout(); }}><i className="bi bi-box-arrow-right me-2"></i> Logout</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
