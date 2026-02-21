import { useState, useEffect } from 'react';
import { feeStructure, feePayments } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';

const months = [
    'April 2025', 'May 2025', 'June 2025', 'July 2025',
    'August 2025', 'September 2025', 'October 2025', 'November 2025',
    'December 2025', 'January 2026', 'February 2026', 'March 2026',
];

const paidMonths = ['April 2025', 'May 2025', 'June 2025', 'July 2025', 'August 2025',
    'September 2025', 'October 2025', 'November 2025', 'December 2025'];

// ==================== RAZORPAY SIMULATOR MODAL ====================
function RazorpaySimulator({ amount, studentName, selectedMonths, onSuccess, onClose }) {
    const [step, setStep] = useState('method'); // method → processing → otp → success / failed
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [otp, setOtp] = useState('');
    const [progress, setProgress] = useState(0);
    const [selectedBank, setSelectedBank] = useState('');

    // Processing animation
    useEffect(() => {
        if (step === 'processing') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setStep('otp'), 400);
                        return 100;
                    }
                    return prev + 4;
                });
            }, 60);
            return () => clearInterval(interval);
        }
    }, [step]);

    const handlePay = () => {
        if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) return;
        if (paymentMethod === 'upi' && !upiId) return;
        if (paymentMethod === 'netbanking' && !selectedBank) return;
        setStep('processing');
    };

    const handleVerifyOtp = () => {
        if (otp.length < 4) return;
        setStep('verifying');
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onSuccess({
                    paymentId: 'pay_' + Math.random().toString(36).substring(2, 15),
                    method: paymentMethod,
                    amount,
                    months: selectedMonths,
                });
            }, 2000);
        }, 1500);
    };

    return (
        <div className="razorpay-overlay" onClick={onClose}>
            <div className="razorpay-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="rzp-header">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rzp-logo">
                            <i className="bi bi-shield-lock-fill"></i>
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold" style={{ color: '#fff' }}>Raghukul Academy</h6>
                            <small style={{ color: 'rgba(255,255,255,0.7)' }}>Fee Payment</small>
                        </div>
                    </div>
                    <div className="text-end">
                        <div className="rzp-amount">₹{amount.toLocaleString()}</div>
                        <small style={{ color: 'rgba(255,255,255,0.7)' }}>{studentName}</small>
                    </div>
                </div>

                {/* Body */}
                <div className="rzp-body">
                    {step === 'method' && (
                        <>
                            <div className="rzp-section-title">Choose Payment Method</div>

                            {/* Payment Method Tabs */}
                            <div className="rzp-method-tabs">
                                {[
                                    { id: 'card', icon: 'bi-credit-card-fill', label: 'Card' },
                                    { id: 'upi', icon: 'bi-phone-fill', label: 'UPI' },
                                    { id: 'netbanking', icon: 'bi-bank2', label: 'Net Banking' },
                                    { id: 'wallet', icon: 'bi-wallet2', label: 'Wallet' },
                                ].map(m => (
                                    <button
                                        key={m.id}
                                        className={`rzp-method-tab ${paymentMethod === m.id ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod(m.id)}
                                    >
                                        <i className={`bi ${m.icon}`}></i>
                                        <span>{m.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Card Form */}
                            {paymentMethod === 'card' && (
                                <div className="rzp-form fade-in">
                                    <div className="rzp-input-group">
                                        <label>Card Number</label>
                                        <div className="rzp-input-wrap">
                                            <i className="bi bi-credit-card"></i>
                                            <input
                                                type="text" placeholder="1234 5678 9012 3456"
                                                value={cardNumber}
                                                onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19))}
                                                maxLength={19}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex gap-3">
                                        <div className="rzp-input-group flex-grow-1">
                                            <label>Expiry</label>
                                            <div className="rzp-input-wrap">
                                                <i className="bi bi-calendar"></i>
                                                <input
                                                    type="text" placeholder="MM/YY"
                                                    value={cardExpiry}
                                                    onChange={e => {
                                                        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                                                        setCardExpiry(v);
                                                    }}
                                                    maxLength={5}
                                                />
                                            </div>
                                        </div>
                                        <div className="rzp-input-group flex-grow-1">
                                            <label>CVV</label>
                                            <div className="rzp-input-wrap">
                                                <i className="bi bi-lock"></i>
                                                <input
                                                    type="password" placeholder="•••"
                                                    value={cardCvv}
                                                    onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                                    maxLength={3}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rzp-card-brands">
                                        <span className="rzp-card-brand visa">VISA</span>
                                        <span className="rzp-card-brand mc">MC</span>
                                        <span className="rzp-card-brand rupay">RuPay</span>
                                    </div>
                                </div>
                            )}

                            {/* UPI Form */}
                            {paymentMethod === 'upi' && (
                                <div className="rzp-form fade-in">
                                    <div className="rzp-input-group">
                                        <label>UPI ID</label>
                                        <div className="rzp-input-wrap">
                                            <i className="bi bi-phone"></i>
                                            <input
                                                type="text" placeholder="yourname@upi"
                                                value={upiId}
                                                onChange={e => setUpiId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="rzp-upi-apps">
                                        <small className="text-muted d-block mb-2">Or pay using UPI App</small>
                                        <div className="d-flex gap-3 justify-content-center">
                                            {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                                                <button key={app} className="rzp-upi-btn" onClick={() => { setUpiId(`demo@${app.toLowerCase()}`); }}>
                                                    <div className="rzp-upi-icon">{app[0]}</div>
                                                    <small>{app}</small>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Net Banking */}
                            {paymentMethod === 'netbanking' && (
                                <div className="rzp-form fade-in">
                                    <div className="rzp-section-title" style={{ fontSize: 12 }}>Popular Banks</div>
                                    <div className="rzp-bank-grid">
                                        {[
                                            { id: 'sbi', name: 'SBI', color: '#1a237e' },
                                            { id: 'hdfc', name: 'HDFC', color: '#004c8f' },
                                            { id: 'icici', name: 'ICICI', color: '#f37921' },
                                            { id: 'axis', name: 'Axis', color: '#97144d' },
                                            { id: 'kotak', name: 'Kotak', color: '#ed1c24' },
                                            { id: 'bob', name: 'BOB', color: '#f15a22' },
                                        ].map(bank => (
                                            <button
                                                key={bank.id}
                                                className={`rzp-bank-btn ${selectedBank === bank.id ? 'active' : ''}`}
                                                onClick={() => setSelectedBank(bank.id)}
                                            >
                                                <div className="rzp-bank-icon" style={{ background: bank.color }}>{bank.name[0]}</div>
                                                <small>{bank.name}</small>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Wallet */}
                            {paymentMethod === 'wallet' && (
                                <div className="rzp-form fade-in">
                                    <div className="rzp-bank-grid">
                                        {[
                                            { id: 'paytm', name: 'Paytm', color: '#00baf2' },
                                            { id: 'phonepe', name: 'PhonePe', color: '#5f259f' },
                                            { id: 'amazon', name: 'Amazon', color: '#ff9900' },
                                            { id: 'freecharge', name: 'FreeChrg', color: '#8dc63f' },
                                        ].map(w => (
                                            <button
                                                key={w.id}
                                                className={`rzp-bank-btn ${selectedBank === w.id ? 'active' : ''}`}
                                                onClick={() => { setSelectedBank(w.id); setPaymentMethod('wallet'); }}
                                            >
                                                <div className="rzp-bank-icon" style={{ background: w.color }}>{w.name[0]}</div>
                                                <small>{w.name}</small>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pay Button */}
                            {paymentMethod && (
                                <button className="rzp-pay-btn" onClick={handlePay}>
                                    <i className="bi bi-lock-fill me-2"></i>
                                    Pay ₹{amount.toLocaleString()}
                                </button>
                            )}
                        </>
                    )}

                    {/* Processing */}
                    {step === 'processing' && (
                        <div className="rzp-processing fade-in">
                            <div className="rzp-spinner"></div>
                            <h6 className="fw-bold mt-3 mb-2">Processing Payment...</h6>
                            <p className="text-muted small mb-3">Please do not close this window</p>
                            <div className="rzp-progress-bar">
                                <div className="rzp-progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <small className="text-muted mt-2 d-block">Connecting to bank...</small>
                        </div>
                    )}

                    {/* OTP Verification */}
                    {step === 'otp' && (
                        <div className="rzp-otp fade-in">
                            <div className="rzp-otp-icon">
                                <i className="bi bi-shield-lock"></i>
                            </div>
                            <h6 className="fw-bold mt-3 mb-1">Enter OTP</h6>
                            <p className="text-muted small mb-3">We've sent a 6-digit OTP to your registered mobile number ******7890</p>
                            <div className="rzp-otp-inputs">
                                {[0, 1, 2, 3, 4, 5].map(i => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="rzp-otp-input"
                                        value={otp[i] || ''}
                                        onChange={e => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            const newOtp = otp.split('');
                                            newOtp[i] = val;
                                            setOtp(newOtp.join(''));
                                            if (val && e.target.nextSibling) e.target.nextSibling.focus();
                                        }}
                                        onKeyDown={e => {
                                            if (e.key === 'Backspace' && !otp[i] && e.target.previousSibling) {
                                                e.target.previousSibling.focus();
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                            <button className="rzp-pay-btn mt-3" onClick={handleVerifyOtp}>
                                Verify & Pay ₹{amount.toLocaleString()}
                            </button>
                            <p className="text-muted small mt-3">
                                Didn't receive OTP? <a href="#" onClick={e => e.preventDefault()} className="fw-semibold">Resend</a>
                            </p>
                        </div>
                    )}

                    {/* Verifying */}
                    {step === 'verifying' && (
                        <div className="rzp-processing fade-in">
                            <div className="rzp-spinner"></div>
                            <h6 className="fw-bold mt-3 mb-2">Verifying Payment...</h6>
                            <p className="text-muted small">Please wait while we confirm your payment</p>
                        </div>
                    )}

                    {/* Success */}
                    {step === 'success' && (
                        <div className="rzp-success fade-in">
                            <div className="rzp-success-icon">
                                <i className="bi bi-check-lg"></i>
                            </div>
                            <h5 className="fw-bold mt-3 mb-1" style={{ color: '#0d904f' }}>Payment Successful!</h5>
                            <p className="text-muted small mb-3">₹{amount.toLocaleString()} has been paid successfully</p>
                            <div className="rzp-success-details">
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Amount</span>
                                    <span className="fw-semibold small">₹{amount.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Method</span>
                                    <span className="fw-semibold small text-capitalize">{paymentMethod}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2">
                                    <span className="text-muted small">Status</span>
                                    <span className="fw-bold small" style={{ color: '#0d904f' }}>✓ Completed</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="rzp-footer">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-lock-fill" style={{ color: '#0d904f', fontSize: 12 }}></i>
                            <small className="text-muted">Secured by <strong>Razorpay</strong></small>
                        </div>
                        {step === 'method' && (
                            <button className="btn btn-sm btn-link text-muted text-decoration-none" onClick={onClose} style={{ fontSize: 12 }}>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==================== FEE PAYMENT PAGE ====================
export default function FeePayment() {
    const { user } = useAuth();
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [showRazorpay, setShowRazorpay] = useState(false);

    const studentInfo = {
        name: user.role === 'parent' ? (user.childName || 'Aarav Sharma') : (user.name || 'Aarav Sharma'),
        class: user.role === 'parent' ? (user.childClass || '10-A') : (user.class || '10-A'),
        rollNo: 1,
        admissionNo: 'RGA2025001',
        parentName: user.role === 'parent' ? user.name : 'Rajesh Sharma',
    };

    const classFee = feeStructure.find(f => f.class === 'Class 9-10') || feeStructure[2];
    const monthlyFee = classFee.totalMonthly;

    const toggleMonth = (month) => {
        if (paidMonths.includes(month)) return;
        setSelectedMonths(prev =>
            prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
        );
    };

    const totalAmount = selectedMonths.length * monthlyFee;

    const handlePaymentSuccess = (result) => {
        setShowRazorpay(false);
        setPaymentSuccess(result);
        setSelectedMonths([]);
    };

    const recentPayments = feePayments.filter(p => p.studentName === studentInfo.name);

    return (
        <div className="fade-in">
            {/* Razorpay Simulator Modal */}
            {showRazorpay && (
                <RazorpaySimulator
                    amount={totalAmount}
                    studentName={studentInfo.name}
                    selectedMonths={selectedMonths}
                    onSuccess={handlePaymentSuccess}
                    onClose={() => setShowRazorpay(false)}
                />
            )}

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h4><i className="bi bi-credit-card me-2"></i>Pay Fees Online</h4>
                    <div className="breadcrumb">
                        <a href="/">Home</a> <span className="mx-2">/</span> <span>Fee Payment</span>
                    </div>
                </div>
            </div>

            {/* Student Info Card */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="sms-card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <div className="user-avatar xl" style={{ background: 'var(--primary-gradient)' }}>
                                        {studentInfo.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                                <div className="col">
                                    <h5 className="fw-bold mb-1">{studentInfo.name}</h5>
                                    <div className="d-flex flex-wrap gap-3">
                                        <span className="text-muted small">
                                            <i className="bi bi-mortarboard me-1"></i> Class {studentInfo.class}
                                        </span>
                                        <span className="text-muted small">
                                            <i className="bi bi-hash me-1"></i> Roll No: {studentInfo.rollNo}
                                        </span>
                                        <span className="text-muted small">
                                            <i className="bi bi-card-text me-1"></i> {studentInfo.admissionNo}
                                        </span>
                                        <span className="text-muted small">
                                            <i className="bi bi-person me-1"></i> Parent: {studentInfo.parentName}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="text-end">
                                        <small className="text-muted d-block">Monthly Fee</small>
                                        <h4 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>₹{monthlyFee.toLocaleString()}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fee Breakdown + Month Selection */}
            <div className="row g-3 mb-4">
                <div className="col-lg-4">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-receipt me-2 text-primary"></i>Fee Breakdown</h6>
                        </div>
                        <div className="card-body p-0">
                            <div className="p-3 border-bottom d-flex justify-content-between">
                                <span className="text-muted small">Tuition Fee</span>
                                <span className="fw-semibold small">₹{classFee.tuitionFee.toLocaleString()}</span>
                            </div>
                            <div className="p-3 border-bottom d-flex justify-content-between">
                                <span className="text-muted small">Exam Fee</span>
                                <span className="fw-semibold small">₹{classFee.examFee.toLocaleString()}</span>
                            </div>
                            <div className="p-3 border-bottom d-flex justify-content-between">
                                <span className="text-muted small">Activity Fee</span>
                                <span className="fw-semibold small">₹{classFee.activityFee.toLocaleString()}</span>
                            </div>
                            <div className="p-3 border-bottom d-flex justify-content-between">
                                <span className="text-muted small">Lab Fee</span>
                                <span className="fw-semibold small">₹{classFee.labFee.toLocaleString()}</span>
                            </div>
                            <div className="p-3 border-bottom d-flex justify-content-between">
                                <span className="text-muted small">Library Fee</span>
                                <span className="fw-semibold small">₹{classFee.libraryFee.toLocaleString()}</span>
                            </div>
                            <div className="p-3 border-bottom d-flex justify-content-between">
                                <span className="text-muted small">Sports Fee</span>
                                <span className="fw-semibold small">₹{classFee.sportsFee.toLocaleString()}</span>
                            </div>
                            <div className="p-3 d-flex justify-content-between" style={{ background: 'var(--primary-light)' }}>
                                <span className="fw-bold">Total Monthly</span>
                                <span className="fw-bold" style={{ color: 'var(--primary)' }}>₹{monthlyFee.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="sms-card h-100">
                        <div className="card-header">
                            <h6><i className="bi bi-calendar3 me-2 text-primary"></i>Select Months to Pay</h6>
                            {selectedMonths.length > 0 && (
                                <span className="sms-badge info">{selectedMonths.length} selected</span>
                            )}
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                {months.map(month => {
                                    const isPaid = paidMonths.includes(month);
                                    const isSelected = selectedMonths.includes(month);
                                    return (
                                        <div key={month} className="col-md-4 col-sm-6">
                                            <div
                                                className={`fee-month-card ${isPaid ? 'paid' : ''} ${isSelected ? 'selected' : ''}`}
                                                onClick={() => toggleMonth(month)}
                                                style={{ cursor: isPaid ? 'not-allowed' : 'pointer' }}
                                            >
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <p className="mb-0 fw-semibold small">{month}</p>
                                                        <small className="text-muted">₹{monthlyFee.toLocaleString()}</small>
                                                    </div>
                                                    {isPaid ? (
                                                        <span className="sms-badge success" style={{ fontSize: 10 }}>
                                                            <i className="bi bi-check-circle me-1"></i>Paid
                                                        </span>
                                                    ) : isSelected ? (
                                                        <i className="bi bi-check-circle-fill" style={{ fontSize: 22, color: 'var(--primary)' }}></i>
                                                    ) : (
                                                        <i className="bi bi-circle" style={{ fontSize: 22, color: 'var(--border-color)' }}></i>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Summary & Button */}
            {selectedMonths.length > 0 && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="sms-card" style={{ border: '2px solid var(--primary)', background: 'var(--primary-light)' }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h6 className="fw-bold mb-2">
                                            <i className="bi bi-cart-check me-2"></i>Payment Summary
                                        </h6>
                                        <div className="d-flex flex-wrap gap-2 mb-2">
                                            {selectedMonths.map(m => (
                                                <span key={m} className="badge bg-primary px-3 py-2">{m}</span>
                                            ))}
                                        </div>
                                        <p className="mb-0 text-muted small">
                                            {selectedMonths.length} month(s) × ₹{monthlyFee.toLocaleString()} = <strong style={{ color: 'var(--text-primary)', fontSize: 16 }}>₹{totalAmount.toLocaleString()}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                        <button
                                            className="btn-sms-primary px-4 py-3"
                                            onClick={() => setShowRazorpay(true)}
                                            style={{ fontSize: 16, borderRadius: 'var(--radius-md)' }}
                                        >
                                            <i className="bi bi-shield-check me-2"></i>
                                            Pay ₹{totalAmount.toLocaleString()}
                                        </button>
                                        <div className="mt-2">
                                            <small className="text-muted">
                                                <i className="bi bi-lock me-1"></i>Secured by Razorpay
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Success Alert */}
            {paymentSuccess && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="alert alert-success d-flex align-items-start gap-3" style={{ borderRadius: 'var(--radius-md)', border: 'none', background: '#d4edda' }}>
                            <i className="bi bi-check-circle-fill" style={{ fontSize: 32, color: '#0d904f' }}></i>
                            <div>
                                <h6 className="fw-bold mb-1" style={{ color: '#0d904f' }}>Payment Successful!</h6>
                                <p className="mb-1 small"><strong>Payment ID:</strong> {paymentSuccess.paymentId}</p>
                                <p className="mb-1 small"><strong>Amount Paid:</strong> ₹{paymentSuccess.amount.toLocaleString()}</p>
                                <p className="mb-1 small"><strong>Method:</strong> <span className="text-capitalize">{paymentSuccess.method}</span></p>
                                <p className="mb-0 small"><strong>Months:</strong> {paymentSuccess.months.join(', ')}</p>
                                <button className="btn btn-sm btn-outline-success mt-2" onClick={() => setPaymentSuccess(null)}>
                                    <i className="bi bi-x me-1"></i>Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment History */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="sms-card">
                        <div className="card-header">
                            <h6><i className="bi bi-clock-history me-2 text-primary"></i>Payment History</h6>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead style={{ background: 'var(--bg-body)' }}>
                                        <tr>
                                            <th className="small fw-semibold">Receipt No</th>
                                            <th className="small fw-semibold">Month</th>
                                            <th className="small fw-semibold">Amount</th>
                                            <th className="small fw-semibold">Date</th>
                                            <th className="small fw-semibold">Mode</th>
                                            <th className="small fw-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentPayments.length > 0 ? recentPayments.map(p => (
                                            <tr key={p.id}>
                                                <td className="small">{p.receiptNo}</td>
                                                <td className="small">{p.month}</td>
                                                <td className="small fw-semibold">₹{p.amount.toLocaleString()}</td>
                                                <td className="small">{p.paidDate || '—'}</td>
                                                <td className="small">{p.mode || '—'}</td>
                                                <td>
                                                    <span className={`sms-badge ${p.status.toLowerCase()}`} style={{ fontSize: 10 }}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={6} className="text-center text-muted py-4">No payment records found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
