import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { students, teachers } from '../data/dummyData';

export default function Profile() {
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [saved, setSaved] = useState(false);

    // Get full profile data based on role
    const getProfileData = () => {
        switch (user.role) {
            case 'admin':
                return {
                    name: user.name, email: user.email, phone: '9876543200',
                    designation: 'Super Admin', department: 'Administration',
                    joinDate: '2015-04-01', address: '45, Civil Lines, Lucknow',
                    qualification: 'MBA, M.Ed', experience: '20 years',
                };
            case 'teacher': {
                const t = teachers.find(t1 => t1.name === user.name) || teachers[0];
                return {
                    name: t.name, email: t.email, phone: t.phone,
                    designation: 'Teacher', department: t.subject, empId: t.empId,
                    joinDate: t.joinDate, qualification: t.qualification,
                    experience: t.experience, classes: t.classes.join(', '),
                    salary: `₹${t.salary.toLocaleString()}`, leaveBalance: `${t.leaveBalance} days`,
                };
            }
            case 'parent': {
                const s = students.find(st => st.name === user.childName) || students[0];
                return {
                    name: user.name, email: s.email, phone: s.parentPhone,
                    address: s.address, childName: s.name, childClass: s.class,
                    childRollNo: s.rollNo, childAdmission: s.admissionNo,
                    relation: 'Father',
                };
            }
            case 'student': {
                const s = students.find(st => st.name === user.name) || students[0];
                return {
                    name: s.name, email: s.email, phone: s.phone,
                    class: s.class, rollNo: s.rollNo, admissionNo: s.admissionNo,
                    dob: s.dob, gender: s.gender, bloodGroup: s.bloodGroup,
                    religion: s.religion, category: s.category, aadhar: s.aadhar,
                    address: s.address, parentName: s.parentName, parentPhone: s.parentPhone,
                };
            }
            default:
                return { name: user.name, email: user.email };
        }
    };

    const profile = getProfileData();
    const [formData, setFormData] = useState({ ...profile });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setEditMode(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const roleBadgeColors = { admin: '#1a73e8', teacher: '#7c3aed', parent: '#0d904f', student: '#e37400' };
    const roleColor = roleBadgeColors[user.role] || '#1a73e8';

    // Define which fields are editable per role
    const editableFields = {
        admin: ['phone', 'address'],
        teacher: ['phone', 'address'],
        parent: ['phone', 'address', 'email'],
        student: ['phone', 'address'],
    };

    const isEditable = (field) => editableFields[user.role]?.includes(field);

    // Field labels mapping
    const fieldLabels = {
        name: 'Full Name', email: 'Email Address', phone: 'Phone Number',
        designation: 'Designation', department: 'Department', joinDate: 'Date of Joining',
        address: 'Address', qualification: 'Qualification', experience: 'Experience',
        empId: 'Employee ID', classes: 'Assigned Classes', salary: 'Salary',
        leaveBalance: 'Leave Balance', childName: 'Child Name', childClass: 'Child Class',
        childRollNo: 'Child Roll No', childAdmission: 'Admission No', relation: 'Relation',
        class: 'Class', rollNo: 'Roll No', admissionNo: 'Admission No',
        dob: 'Date of Birth', gender: 'Gender', bloodGroup: 'Blood Group',
        religion: 'Religion', category: 'Category', aadhar: 'Aadhar Number',
        parentName: 'Parent Name', parentPhone: 'Parent Phone',
    };

    const fieldIcons = {
        name: 'bi-person', email: 'bi-envelope', phone: 'bi-telephone',
        designation: 'bi-briefcase', department: 'bi-building', joinDate: 'bi-calendar',
        address: 'bi-geo-alt', qualification: 'bi-mortarboard', experience: 'bi-clock-history',
        empId: 'bi-person-badge', classes: 'bi-book', salary: 'bi-currency-rupee',
        leaveBalance: 'bi-calendar-x', childName: 'bi-person-hearts', childClass: 'bi-book',
        childRollNo: 'bi-hash', childAdmission: 'bi-card-text', relation: 'bi-people',
        class: 'bi-book', rollNo: 'bi-hash', admissionNo: 'bi-card-text',
        dob: 'bi-calendar-date', gender: 'bi-gender-ambiguous', bloodGroup: 'bi-droplet',
        religion: 'bi-building', category: 'bi-tag', aadhar: 'bi-shield-check',
        parentName: 'bi-person', parentPhone: 'bi-telephone',
    };

    return (
        <div className="fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h4><i className="bi bi-person-circle me-2"></i>My Profile</h4>
                    <div className="breadcrumb">
                        <a href="/">Home</a> <span className="mx-2">/</span> <span>Profile</span>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    {editMode ? (
                        <>
                            <button className="btn btn-outline-secondary px-3 py-2" style={{ borderRadius: 'var(--radius-sm)', fontSize: 13 }} onClick={() => { setEditMode(false); setFormData({ ...profile }); }}>
                                <i className="bi bi-x-lg me-1"></i>Cancel
                            </button>
                            <button className="btn-sms-primary px-4 py-2" style={{ fontSize: 13 }} onClick={handleSave}>
                                <i className="bi bi-check-lg me-1"></i>Save Changes
                            </button>
                        </>
                    ) : (
                        <button className="btn-sms-primary px-4 py-2" style={{ fontSize: 13 }} onClick={() => setEditMode(true)}>
                            <i className="bi bi-pencil-square me-1"></i>Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Success Alert */}
            {saved && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4" style={{ borderRadius: 'var(--radius-md)', border: 'none', background: '#d4edda' }}>
                    <i className="bi bi-check-circle-fill" style={{ color: '#0d904f', fontSize: 20 }}></i>
                    <span className="fw-semibold" style={{ color: '#0d904f' }}>Profile updated successfully!</span>
                </div>
            )}

            <div className="row g-4">
                {/* Profile Card (Left) */}
                <div className="col-lg-4">
                    <div className="sms-card">
                        <div className="card-body text-center py-4">
                            <div className="mx-auto mb-3" style={{
                                width: 96, height: 96, borderRadius: '50%',
                                background: roleColor,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 36, fontWeight: 700, color: 'white',
                                boxShadow: `0 4px 20px ${roleColor}40`
                            }}>
                                {user.avatar}
                            </div>
                            <h5 className="fw-bold mb-1">{formData.name}</h5>
                            <p className="text-muted small mb-2">{formData.email}</p>
                            <span className="sms-badge" style={{
                                background: `${roleColor}15`, color: roleColor,
                                border: `1px solid ${roleColor}30`, fontSize: 11, padding: '4px 14px'
                            }}>
                                <i className="bi bi-shield-check me-1"></i>
                                {user.roleLabel}
                            </span>

                            <hr className="my-4" />

                            {/* Quick Info */}
                            <div className="text-start">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <i className="bi bi-telephone-fill" style={{ color: roleColor, fontSize: 14 }}></i>
                                    <span className="small">{formData.phone}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <i className="bi bi-envelope-fill" style={{ color: roleColor, fontSize: 14 }}></i>
                                    <span className="small">{formData.email}</span>
                                </div>
                                {formData.address && (
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <i className="bi bi-geo-alt-fill" style={{ color: roleColor, fontSize: 14 }}></i>
                                        <span className="small">{formData.address}</span>
                                    </div>
                                )}
                            </div>

                            {/* Role-specific stats */}
                            {user.role === 'teacher' && (
                                <div className="row g-2 mt-3">
                                    <div className="col-6">
                                        <div className="p-3 rounded-3" style={{ background: 'var(--primary-light)' }}>
                                            <h5 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>{profile.classes?.split(',').length}</h5>
                                            <small className="text-muted">Classes</small>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="p-3 rounded-3" style={{ background: 'var(--accent-green-light)' }}>
                                            <h5 className="fw-bold mb-0" style={{ color: 'var(--accent-green)' }}>{profile.leaveBalance}</h5>
                                            <small className="text-muted">Leaves</small>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {user.role === 'student' && (
                                <div className="row g-2 mt-3">
                                    <div className="col-4">
                                        <div className="p-2 rounded-3" style={{ background: 'var(--primary-light)' }}>
                                            <h6 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>{profile.class}</h6>
                                            <small className="text-muted" style={{ fontSize: 10 }}>Class</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="p-2 rounded-3" style={{ background: 'var(--accent-green-light)' }}>
                                            <h6 className="fw-bold mb-0" style={{ color: 'var(--accent-green)' }}>#{profile.rollNo}</h6>
                                            <small className="text-muted" style={{ fontSize: 10 }}>Roll</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="p-2 rounded-3" style={{ background: 'var(--accent-orange-light)' }}>
                                            <h6 className="fw-bold mb-0" style={{ color: 'var(--accent-orange)' }}>{profile.bloodGroup}</h6>
                                            <small className="text-muted" style={{ fontSize: 10 }}>Blood</small>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Details (Right) */}
                <div className="col-lg-8">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-person-lines-fill me-2 text-primary"></i>
                                {editMode ? 'Edit Profile Details' : 'Profile Details'}
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                {Object.keys(formData).map(field => (
                                    <div key={field} className="col-md-6">
                                        <label className="form-label small fw-semibold text-muted mb-1">
                                            <i className={`bi ${fieldIcons[field] || 'bi-info-circle'} me-1`}></i>
                                            {fieldLabels[field] || field}
                                        </label>
                                        {editMode && isEditable(field) ? (
                                            field === 'address' ? (
                                                <textarea
                                                    className="form-control"
                                                    rows={2}
                                                    value={formData[field]}
                                                    onChange={(e) => handleChange(field, e.target.value)}
                                                    style={{ borderRadius: 'var(--radius-sm)', fontSize: 13 }}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData[field]}
                                                    onChange={(e) => handleChange(field, e.target.value)}
                                                    style={{ borderRadius: 'var(--radius-sm)', fontSize: 13 }}
                                                />
                                            )
                                        ) : (
                                            <div className="form-control-plaintext px-3 py-2" style={{
                                                background: 'var(--bg-body)',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: 13,
                                                border: '1px solid var(--border-light)'
                                            }}>
                                                {formData[field] || '—'}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Password Change Section */}
                    <div className="sms-card mt-4">
                        <div className="card-header">
                            <h6><i className="bi bi-shield-lock me-2 text-warning"></i>Change Password</h6>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label small fw-semibold text-muted mb-1">Current Password</label>
                                    <input type="password" className="form-control" placeholder="••••••••" style={{ borderRadius: 'var(--radius-sm)', fontSize: 13 }} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label small fw-semibold text-muted mb-1">New Password</label>
                                    <input type="password" className="form-control" placeholder="••••••••" style={{ borderRadius: 'var(--radius-sm)', fontSize: 13 }} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label small fw-semibold text-muted mb-1">Confirm New Password</label>
                                    <input type="password" className="form-control" placeholder="••••••••" style={{ borderRadius: 'var(--radius-sm)', fontSize: 13 }} />
                                </div>
                            </div>
                            <button className="btn-sms-primary px-4 py-2 mt-3" style={{ fontSize: 13 }}>
                                <i className="bi bi-shield-check me-2"></i>Update Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
