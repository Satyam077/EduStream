import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const [showForgot, setShowForgot] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [selectedRole, setSelectedRole] = useState('admin');

    /* ---------- Right‑side form panels ---------- */

    const renderOtpPanel = () => (
        <div className="login-form-inner text-center">
            <div className="brand-section">
                <div className="school-icon"><i className="bi bi-shield-lock-fill"></i></div>
                <h4>OTP Verification</h4>
                <p>Enter the 6-digit code sent to your registered phone</p>
            </div>
            <div className="d-flex gap-2 justify-content-center mb-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <input key={i} type="text" className="form-control text-center fw-bold" maxLength={1}
                        style={{ width: 48, height: 48, fontSize: 20, borderRadius: 'var(--radius-md)' }} />
                ))}
            </div>
            <button className="btn-sms-primary w-100 py-2 mb-3" onClick={() => { setShowOtp(false); login(selectedRole); }}>
                Verify &amp; Login
            </button>
            <small className="text-muted">Didn't receive code?{' '}
                <a href="#" className="text-primary fw-semibold" onClick={(e) => e.preventDefault()}>Resend</a>
            </small>
        </div>
    );

    const renderForgotPanel = () => (
        <div className="login-form-inner">
            <div className="brand-section">
                <div className="school-icon"><i className="bi bi-key-fill"></i></div>
                <h4>Forgot Password</h4>
                <p>Enter your email to receive a password reset link</p>
            </div>
            <div className="form-group-sms">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="admin@raghukulacademy.edu.in" />
            </div>
            <button className="btn-sms-primary w-100 py-2 mb-3">
                <i className="bi bi-send me-2"></i>Send Reset Link
            </button>
            <div className="text-center">
                <a href="#" className="text-primary fw-semibold small" onClick={(e) => { e.preventDefault(); setShowForgot(false); }}>
                    <i className="bi bi-arrow-left me-1"></i>Back to Login
                </a>
            </div>
        </div>
    );

    const renderLoginPanel = () => (
        <div className="login-form-inner">
            {/* Mobile‑only branding (hidden on desktop because the left panel shows it) */}
            <div className="brand-section d-lg-none">
                <div className="school-icon"><i className="bi bi-mortarboard-fill"></i></div>
                <h4>Raghukul Academy</h4>
                <p>Sign in to School Management System</p>
            </div>

            <div className="login-form-header d-none d-lg-block">
                <h4>Welcome Back 👋</h4>
                <p>Sign in to your account to continue</p>
            </div>

            <div className="form-group-sms">
                <label>Email / Username</label>
                <div className="position-relative">
                    <i className="bi bi-person position-absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                    <input type="email" className="form-control" placeholder="admin@raghukulacademy.edu.in" style={{ paddingLeft: 40 }} id="login-email" />
                </div>
            </div>

            <div className="form-group-sms">
                <label>Password</label>
                <div className="position-relative">
                    <i className="bi bi-lock position-absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                    <input type="password" className="form-control" placeholder="Enter your password" style={{ paddingLeft: 40 }} id="login-password" />
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember-me" />
                    <label className="form-check-label small" htmlFor="remember-me">Remember me</label>
                </div>
                <a href="#" className="small fw-semibold text-primary" onClick={(e) => { e.preventDefault(); setShowForgot(true); }}>Forgot Password?</a>
            </div>

            <div className="form-group-sms">
                <label>Login As</label>
                <div className="position-relative">
                    <i className="bi bi-person-gear position-absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                    <select
                        className="form-control"
                        style={{ paddingLeft: 40, appearance: 'auto' }}
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        id="login-role"
                    >
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                        <option value="parent">Parent</option>
                        <option value="student">Student</option>
                    </select>
                </div>
            </div>

            <button className="btn-sms-primary w-100 py-2 mb-3" onClick={() => login(selectedRole)} id="login-btn">
                <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
            </button>

            <div className="text-center mb-3">
                <small className="text-muted">or sign in with</small>
            </div>

            <div className="d-flex gap-2 mb-4">
                <button className="btn btn-outline-secondary flex-grow-1 py-2" style={{ borderRadius: 'var(--radius-sm)' }}>
                    <i className="bi bi-google me-2"></i>Google
                </button>
                <button className="btn btn-outline-secondary flex-grow-1 py-2" style={{ borderRadius: 'var(--radius-sm)' }}>
                    <i className="bi bi-microsoft me-2"></i>Microsoft
                </button>
            </div>

            <div className="text-center">
                <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>Protected by Two-Factor Authentication
                </small>
            </div>

            {/* Role-based quick login */}
            <div className="mt-4 pt-3 border-top">
                <small className="text-muted d-block text-center mb-2">Quick Login As:</small>
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {['Admin', 'Teacher', 'Parent', 'Student'].map(role => (
                        <button key={role} className="btn btn-sm btn-outline-primary" style={{ borderRadius: 20, fontSize: 11 }} onClick={() => login(role.toLowerCase())}>
                            {role}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    /* ---------- Main layout ---------- */
    return (
        <div className="login-page">
            <div className="login-split-container">
                {/* ===== LEFT PANEL — School Branding ===== */}
                <div className="login-left-panel">
                    <div className="login-left-content">
                        {/* Floating decorative circles */}
                        <div className="login-left-circle login-left-circle-1"></div>
                        <div className="login-left-circle login-left-circle-2"></div>
                        <div className="login-left-circle login-left-circle-3"></div>

                        <div className="login-left-brand">
                            <div className="login-left-icon">
                                <i className="bi bi-mortarboard-fill"></i>
                            </div>
                            <h2>Raghukul Academy</h2>
                            <p className="login-left-tagline">School Management System</p>
                        </div>

                        <div className="login-left-features">
                            <div className="login-feature-item">
                                <div className="login-feature-icon"><i className="bi bi-people-fill"></i></div>
                                <div>
                                    <strong>Student Management</strong>
                                    <span>Track attendance, grades &amp; more</span>
                                </div>
                            </div>
                            <div className="login-feature-item">
                                <div className="login-feature-icon"><i className="bi bi-calendar-check-fill"></i></div>
                                <div>
                                    <strong>Timetable & Scheduling</strong>
                                    <span>Organize classes effortlessly</span>
                                </div>
                            </div>
                            <div className="login-feature-item">
                                <div className="login-feature-icon"><i className="bi bi-graph-up-arrow"></i></div>
                                <div>
                                    <strong>Reports & Analytics</strong>
                                    <span>Data-driven insights at a glance</span>
                                </div>
                            </div>
                        </div>

                        <div className="login-left-footer">
                            <small>© 2026 Raghukul Academy. All rights reserved.</small>
                        </div>
                    </div>
                </div>

                {/* ===== RIGHT PANEL — Login Form ===== */}
                <div className="login-right-panel">
                    {showOtp ? renderOtpPanel() : showForgot ? renderForgotPanel() : renderLoginPanel()}
                </div>
            </div>
        </div>
    );
}
