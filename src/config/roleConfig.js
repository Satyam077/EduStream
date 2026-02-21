// ===== Role-Based Access Configuration =====
// Defines which routes and sidebar items each role can access.

/**
 * ROLES:
 *   admin    → Full access to everything
 *   teacher  → Exams, Students (view), Attendance, Timetable, Leave requests
 *   parent   → Parent Portal, Fee Payment, Timetable, Profile
 *   student  → Parent Portal (student view), Timetable, Profile
 */

// All possible routes in the system
// 'allowedRoles' — which roles can access this route
// If allowedRoles is empty or missing, only admin can access
export const routePermissions = {
    '/': { allowedRoles: ['admin', 'teacher', 'parent', 'student'] },
    '/students': { allowedRoles: ['admin', 'teacher'] },
    '/teachers': { allowedRoles: ['admin'] },
    '/attendance': { allowedRoles: ['admin', 'teacher'] },
    '/leaves': { allowedRoles: ['admin', 'teacher'] },
    '/exams': { allowedRoles: ['admin', 'teacher'] },
    '/fees': { allowedRoles: ['admin'] },
    '/fee-payment': { allowedRoles: ['parent', 'student'] },
    '/events': { allowedRoles: ['admin'] },
    '/notifications': { allowedRoles: ['admin', 'teacher', 'parent', 'student'] },
    '/timetable': { allowedRoles: ['admin', 'teacher', 'parent', 'student'] },
    '/library': { allowedRoles: ['admin'] },
    '/transport': { allowedRoles: ['admin'] },
    '/parent-portal': { allowedRoles: ['admin', 'parent', 'student'] },
    '/complaints': { allowedRoles: ['admin'] },
    '/roles': { allowedRoles: ['admin'] },
    '/audit-logs': { allowedRoles: ['admin'] },
    '/settings': { allowedRoles: ['admin'] },
    '/profile': { allowedRoles: ['admin', 'teacher', 'parent', 'student'] },
};

// Sidebar navigation structure with role-based visibility
export const sidebarConfig = [
    // ── Main ──
    { section: 'Main', allowedRoles: ['admin', 'teacher', 'parent', 'student'] },
    { path: '/', icon: 'bi-grid-1x2-fill', label: 'Dashboard', allowedRoles: ['admin', 'teacher', 'parent', 'student'] },

    // ── Academic ──
    { section: 'Academic', allowedRoles: ['admin', 'teacher'] },
    { path: '/students', icon: 'bi-people-fill', label: 'Students', badge: '1248', allowedRoles: ['admin', 'teacher'] },
    { path: '/teachers', icon: 'bi-person-badge-fill', label: 'Teachers', allowedRoles: ['admin'] },
    { path: '/attendance', icon: 'bi-calendar-check-fill', label: 'Attendance', allowedRoles: ['admin', 'teacher'] },
    { path: '/leaves', icon: 'bi-calendar-x-fill', label: 'Leave Management', allowedRoles: ['admin', 'teacher'] },
    { path: '/exams', icon: 'bi-journal-bookmark-fill', label: 'Exams & Results', allowedRoles: ['admin', 'teacher'] },
    { path: '/timetable', icon: 'bi-clock-fill', label: 'Timetable', allowedRoles: ['admin', 'teacher', 'parent', 'student'] },

    // ── Administration ──
    { section: 'Administration', allowedRoles: ['admin'] },
    { path: '/fees', icon: 'bi-wallet-fill', label: 'Fee Management', allowedRoles: ['admin'] },
    { path: '/events', icon: 'bi-calendar-event-fill', label: 'Events', allowedRoles: ['admin'] },
    { path: '/notifications', icon: 'bi-bell-fill', label: 'Notifications', badge: '3', allowedRoles: ['admin', 'teacher', 'parent', 'student'] },

    // ── Resources ──
    { section: 'Resources', allowedRoles: ['admin'] },
    { path: '/library', icon: 'bi-book-fill', label: 'Library', allowedRoles: ['admin'] },
    { path: '/transport', icon: 'bi-bus-front-fill', label: 'Transport', allowedRoles: ['admin'] },

    // ── Portal ──
    { section: 'Portal', allowedRoles: ['admin', 'teacher', 'parent', 'student'] },
    { path: '/parent-portal', icon: 'bi-house-door-fill', label: 'Parent Portal', allowedRoles: ['admin', 'parent', 'student'] },
    { path: '/fee-payment', icon: 'bi-credit-card-fill', label: 'Pay Fees', allowedRoles: ['parent', 'student'] },
    { path: '/profile', icon: 'bi-person-circle', label: 'My Profile', allowedRoles: ['admin', 'teacher', 'parent', 'student'] },

    // ── Settings ──
    { section: 'Settings', allowedRoles: ['admin'] },
    { path: '/complaints', icon: 'bi-exclamation-triangle-fill', label: 'Complaints', allowedRoles: ['admin'] },
    { path: '/roles', icon: 'bi-shield-lock-fill', label: 'Roles & Access', allowedRoles: ['admin'] },
    { path: '/audit-logs', icon: 'bi-list-check', label: 'Audit Logs', allowedRoles: ['admin'] },
    { path: '/settings', icon: 'bi-gear-fill', label: 'Settings', allowedRoles: ['admin'] },
];

/**
 * Check if a specific role can access a given path.
 */
export function canAccess(role, path) {
    const config = routePermissions[path];
    if (!config) return role === 'admin'; // unknown routes → admin only
    return config.allowedRoles.includes(role);
}

/**
 * Get filtered sidebar items for a role.
 * Also strips out section headers that have no visible children beneath them.
 */
export function getSidebarForRole(role) {
    // First, filter items this role can see
    const filtered = sidebarConfig.filter(item => {
        return item.allowedRoles && item.allowedRoles.includes(role);
    });

    // Remove orphan section headers (section followed by another section or at end)
    const result = [];
    for (let i = 0; i < filtered.length; i++) {
        const item = filtered[i];
        if (item.section) {
            // Check if next item exists and is NOT a section (i.e. has links under it)
            const next = filtered[i + 1];
            if (next && !next.section) {
                result.push(item);
            }
            // else skip this orphan section header
        } else {
            result.push(item);
        }
    }

    return result;
}

/**
 *  Default home route per role
 */
export function getDefaultRoute(role) {
    switch (role) {
        case 'admin': return '/';
        case 'teacher': return '/';
        case 'parent': return '/parent-portal';
        case 'student': return '/parent-portal';
        default: return '/';
    }
}
