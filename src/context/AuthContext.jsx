import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Demo user profiles for each role
const roleProfiles = {
    admin: {
        name: 'Raghukul Academy Admin',
        email: 'admin@raghukulacademy.edu.in',
        avatar: 'AC',
        roleLabel: 'Super Admin',
    },
    teacher: {
        name: 'Dr. Meera Sharma',
        email: 'meera.sharma@raghukulacademy.edu.in',
        avatar: 'MS',
        roleLabel: 'Teacher',
        subject: 'Mathematics',
        empId: 'TCH001',
    },
    parent: {
        name: 'Rajesh Sharma',
        email: 'rajesh.sharma@email.com',
        avatar: 'RS',
        roleLabel: 'Parent',
        childName: 'Aarav Sharma',
        childClass: '10-A',
        childId: 1,
    },
    student: {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@raghukulacademy.edu.in',
        avatar: 'AS',
        roleLabel: 'Student',
        class: '10-A',
        rollNo: 1,
        studentId: 1,
    },
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // { role, ...profile }

    const login = (role) => {
        const profile = roleProfiles[role] || roleProfiles.admin;
        setUser({ role, ...profile });
    };

    const logout = () => {
        setUser(null);
    };

    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
