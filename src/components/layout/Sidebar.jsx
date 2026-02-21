import { NavLink } from 'react-router-dom';
import { schoolInfo } from '../../data/dummyData';
import { getSidebarForRole } from '../../config/roleConfig';

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose, userRole }) {
    const navItems = getSidebarForRole(userRole || 'admin');

    return (
        <>
            <div className={`sidebar-overlay ${mobileOpen ? 'show' : ''}`} onClick={onMobileClose}></div>
            <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-brand">
                    <div className="brand-icon">
                        <i className="bi bi-mortarboard-fill"></i>
                    </div>
                    <div className="brand-text">
                        <h6>{schoolInfo.name}</h6>
                        <small>Management System</small>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item, idx) => {
                        if (item.section) {
                            return (
                                <div key={idx} className="sidebar-section-title">
                                    {item.section}
                                </div>
                            );
                        }
                        return (
                            <NavLink
                                key={idx}
                                to={item.path}
                                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                                onClick={onMobileClose}
                                end={item.path === '/'}
                            >
                                <i className={`bi ${item.icon}`}></i>
                                <span className="nav-label">{item.label}</span>
                                {item.badge && <span className="badge-count">{item.badge}</span>}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <button
                        className="nav-item-link"
                        onClick={onToggle}
                        title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        <i className={`bi ${collapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'}`}></i>
                        <span className="nav-label">{collapsed ? 'Expand' : 'Collapse'}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
