// ===== Raghukul Academy - Dummy Data =====

export const schoolInfo = {
    name: "Raghukul Academy",
    tagline: "Nurturing Minds, Building Futures",
    address: "123 Knowledge Lane, Education City, UP 226001",
    phone: "+91 00113 43210",
    email: "info@raghukulacademy.edu.in",
    website: "www.raghukulacademy.edu.in",
    academicYear: "2025-2026",
    logo: null,
    principalName: "Dr. Ramesh Kumar Sharma",
};

export const dashboardStats = {
    totalStudents: 1248,
    activeStudents: 1195,
    inactiveStudents: 53,
    totalTeachers: 68,
    attendanceToday: 92.4,
    pendingFees: 845000,
    totalEvents: 12,
    totalClasses: 42,
};

export const chartData = {
    monthlyAttendance: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        data: [94, 91, 88, 0, 93, 95, 92, 90, 87, 93, 92],
    },
    feeCollection: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        collected: [520000, 480000, 390000, 150000, 510000, 490000, 460000, 430000, 380000, 500000, 320000],
        pending: [80000, 120000, 210000, 450000, 90000, 110000, 140000, 170000, 220000, 100000, 280000],
    },
    examPerformance: {
        labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
        midterm: [78, 82, 75, 80, 73, 77, 71, 74, 69, 72],
        final: [82, 85, 79, 84, 78, 81, 76, 78, 73, 76],
    },
};

export const recentNotifications = [
    { id: 1, title: "Annual Day Rehearsal Schedule", type: "event", time: "2 hours ago", read: false },
    { id: 2, title: "Fee payment reminder for Class 8", type: "fee", time: "5 hours ago", read: false },
    { id: 3, title: "Mid-term exam timetable published", type: "exam", time: "1 day ago", read: true },
    { id: 4, title: "New teacher joined - Mrs. Priya Singh", type: "staff", time: "2 days ago", read: true },
    { id: 5, title: "Parent-Teacher Meeting on 25th Feb", type: "event", time: "3 days ago", read: true },
];

export const upcomingEvents = [
    { id: 1, title: "Republic Day Celebration", date: "2026-01-26", type: "Cultural", color: "#1a73e8" },
    { id: 2, title: "Parent-Teacher Meeting", date: "2026-02-25", type: "PTM", color: "#0d904f" },
    { id: 3, title: "Annual Sports Day", date: "2026-03-05", type: "Sports", color: "#e37400" },
    { id: 4, title: "Science Exhibition", date: "2026-03-15", type: "Academic", color: "#7c3aed" },
    { id: 5, title: "Annual Function", date: "2026-03-28", type: "Cultural", color: "#d93025" },
];

export const students = [
    { id: 1, admissionNo: "RGA2025001", name: "Aarav Sharma", class: "10-A", rollNo: 1, gender: "Male", dob: "2010-05-15", phone: "9876543210", parentName: "Rajesh Sharma", parentPhone: "9876543211", address: "12, MG Road, Lucknow", status: "Active", attendance: 94, feeStatus: "Paid", photo: null, bloodGroup: "O+", religion: "Hindu", category: "General", aadhar: "1234-5678-9012", email: "rajesh.sharma@email.com" },
    { id: 2, admissionNo: "RGA2025002", name: "Ananya Patel", class: "10-A", rollNo: 2, gender: "Female", dob: "2010-08-22", phone: "9876543220", parentName: "Vikram Patel", parentPhone: "9876543221", address: "45, Hazratganj, Lucknow", status: "Active", attendance: 97, feeStatus: "Paid", photo: null, bloodGroup: "A+", religion: "Hindu", category: "OBC", aadhar: "2345-6789-0123", email: "vikram.patel@email.com" },
    { id: 3, admissionNo: "RGA2025003", name: "Rohan Gupta", class: "9-B", rollNo: 1, gender: "Male", dob: "2011-03-10", phone: "9876543230", parentName: "Suresh Gupta", parentPhone: "9876543231", address: "78, Gomti Nagar, Lucknow", status: "Active", attendance: 88, feeStatus: "Pending", photo: null, bloodGroup: "B+", religion: "Hindu", category: "General", aadhar: "3456-7890-1234", email: "suresh.gupta@email.com" },
    { id: 4, admissionNo: "RGA2025004", name: "Priya Verma", class: "9-A", rollNo: 3, gender: "Female", dob: "2011-07-28", phone: "9876543240", parentName: "Anil Verma", parentPhone: "9876543241", address: "23, Aliganj, Lucknow", status: "Active", attendance: 96, feeStatus: "Paid", photo: null, bloodGroup: "AB+", religion: "Hindu", category: "SC", aadhar: "4567-8901-2345", email: "anil.verma@email.com" },
    { id: 5, admissionNo: "RGA2025005", name: "Arjun Singh", class: "8-A", rollNo: 1, gender: "Male", dob: "2012-01-05", phone: "9876543250", parentName: "Deepak Singh", parentPhone: "9876543251", address: "56, Indira Nagar, Lucknow", status: "Active", attendance: 91, feeStatus: "Partial", photo: null, bloodGroup: "O-", religion: "Sikh", category: "General", aadhar: "5678-9012-3456", email: "deepak.singh@email.com" },
    { id: 6, admissionNo: "RGA2025006", name: "Kavya Mishra", class: "8-B", rollNo: 2, gender: "Female", dob: "2012-11-18", phone: "9876543260", parentName: "Rakesh Mishra", parentPhone: "9876543261", address: "89, Mahanagar, Lucknow", status: "Active", attendance: 93, feeStatus: "Paid", photo: null, bloodGroup: "A-", religion: "Hindu", category: "General", aadhar: "6789-0123-4567", email: "rakesh.mishra@email.com" },
    { id: 7, admissionNo: "RGA2025007", name: "Vivaan Khan", class: "7-A", rollNo: 5, gender: "Male", dob: "2013-04-30", phone: "9876543270", parentName: "Salman Khan", parentPhone: "9876543271", address: "34, Aminabad, Lucknow", status: "Inactive", attendance: 72, feeStatus: "Pending", photo: null, bloodGroup: "B-", religion: "Muslim", category: "General", aadhar: "7890-1234-5678", email: "salman.khan@email.com" },
    { id: 8, admissionNo: "RGA2025008", name: "Ishita Jain", class: "7-B", rollNo: 3, gender: "Female", dob: "2013-09-12", phone: "9876543280", parentName: "Manoj Jain", parentPhone: "9876543281", address: "67, Vikas Nagar, Lucknow", status: "Active", attendance: 95, feeStatus: "Paid", photo: null, bloodGroup: "O+", religion: "Jain", category: "General", aadhar: "8901-2345-6789", email: "manoj.jain@email.com" },
    { id: 9, admissionNo: "RGA2025009", name: "Aditya Yadav", class: "6-A", rollNo: 2, gender: "Male", dob: "2014-06-25", phone: "9876543290", parentName: "Ramesh Yadav", parentPhone: "9876543291", address: "90, Rajajipuram, Lucknow", status: "Active", attendance: 89, feeStatus: "Paid", photo: null, bloodGroup: "AB-", religion: "Hindu", category: "OBC", aadhar: "9012-3456-7890", email: "ramesh.yadav@email.com" },
    { id: 10, admissionNo: "RGA2025010", name: "Saanvi Reddy", class: "6-B", rollNo: 4, gender: "Female", dob: "2014-12-03", phone: "9876543300", parentName: "Krishna Reddy", parentPhone: "9876543301", address: "11, Chowk, Lucknow", status: "Active", attendance: 98, feeStatus: "Paid", photo: null, bloodGroup: "A+", religion: "Hindu", category: "General", aadhar: "0123-4567-8901", email: "krishna.reddy@email.com" },
];

export const teachers = [
    { id: 1, empId: "TCH001", name: "Dr. Meera Sharma", subject: "Mathematics", classes: ["10-A", "10-B", "9-A"], qualification: "Ph.D. Mathematics", experience: "15 years", phone: "9876501001", email: "meera.sharma@raghukulacademy.edu.in", status: "Active", joinDate: "2011-06-15", salary: 65000, attendance: 96, leaveBalance: 12, gender: "Female" },
    { id: 2, empId: "TCH002", name: "Rajiv Kumar", subject: "Science", classes: ["9-A", "9-B", "8-A"], qualification: "M.Sc. Physics", experience: "10 years", phone: "9876501002", email: "rajiv.kumar@raghukulacademy.edu.in", status: "Active", joinDate: "2016-04-01", salary: 55000, attendance: 93, leaveBalance: 8, gender: "Male" },
    { id: 3, empId: "TCH003", name: "Sunita Devi", subject: "Hindi", classes: ["8-A", "8-B", "7-A", "7-B"], qualification: "M.A. Hindi", experience: "20 years", phone: "9876501003", email: "sunita.devi@raghukulacademy.edu.in", status: "Active", joinDate: "2006-07-20", salary: 70000, attendance: 98, leaveBalance: 15, gender: "Female" },
    { id: 4, empId: "TCH004", name: "Amit Tripathi", subject: "English", classes: ["10-A", "9-B", "8-A"], qualification: "M.A. English Literature", experience: "8 years", phone: "9876501004", email: "amit.tripathi@raghukulacademy.edu.in", status: "Active", joinDate: "2018-01-10", salary: 48000, attendance: 91, leaveBalance: 5, gender: "Male" },
    { id: 5, empId: "TCH005", name: "Priya Singh", subject: "Computer Science", classes: ["10-A", "10-B", "9-A", "9-B"], qualification: "M.Tech CSE", experience: "6 years", phone: "9876501005", email: "priya.singh@raghukulacademy.edu.in", status: "Active", joinDate: "2020-08-01", salary: 52000, attendance: 95, leaveBalance: 10, gender: "Female" },
    { id: 6, empId: "TCH006", name: "Vikash Pandey", subject: "Social Studies", classes: ["7-A", "7-B", "6-A", "6-B"], qualification: "M.A. History", experience: "12 years", phone: "9876501006", email: "vikash.pandey@raghukulacademy.edu.in", status: "On Leave", joinDate: "2014-03-15", salary: 58000, attendance: 88, leaveBalance: 2, gender: "Male" },
    { id: 7, empId: "TCH007", name: "Neha Agarwal", subject: "Art & Craft", classes: ["6-A", "6-B", "5-A", "5-B"], qualification: "B.F.A.", experience: "5 years", phone: "9876501007", email: "neha.agarwal@raghukulacademy.edu.in", status: "Active", joinDate: "2021-06-01", salary: 40000, attendance: 94, leaveBalance: 9, gender: "Female" },
    { id: 8, empId: "TCH008", name: "Sanjay Mishra", subject: "Physical Education", classes: ["All"], qualification: "B.P.Ed", experience: "18 years", phone: "9876501008", email: "sanjay.mishra@raghukulacademy.edu.in", status: "Active", joinDate: "2008-04-10", salary: 60000, attendance: 97, leaveBalance: 14, gender: "Male" },
];

export const attendanceData = {
    classes: [
        { name: "10-A", totalStudents: 45, present: 42, absent: 2, onLeave: 1, percentage: 93.3 },
        { name: "10-B", totalStudents: 44, present: 40, absent: 3, onLeave: 1, percentage: 90.9 },
        { name: "9-A", totalStudents: 42, present: 39, absent: 2, onLeave: 1, percentage: 92.8 },
        { name: "9-B", totalStudents: 43, present: 41, absent: 1, onLeave: 1, percentage: 95.3 },
        { name: "8-A", totalStudents: 40, present: 37, absent: 2, onLeave: 1, percentage: 92.5 },
        { name: "8-B", totalStudents: 41, present: 38, absent: 2, onLeave: 1, percentage: 92.6 },
        { name: "7-A", totalStudents: 38, present: 35, absent: 2, onLeave: 1, percentage: 92.1 },
        { name: "7-B", totalStudents: 39, present: 36, absent: 2, onLeave: 1, percentage: 92.3 },
        { name: "6-A", totalStudents: 36, present: 34, absent: 1, onLeave: 1, percentage: 94.4 },
        { name: "6-B", totalStudents: 37, present: 35, absent: 1, onLeave: 1, percentage: 94.5 },
    ],
    date: "2026-02-21",
};

export const leaveRequests = [
    { id: 1, applicant: "Aarav Sharma", type: "Student", class: "10-A", startDate: "2026-02-22", endDate: "2026-02-24", reason: "Family function", status: "Pending", appliedOn: "2026-02-20" },
    { id: 2, applicant: "Rajiv Kumar", type: "Teacher", subject: "Science", startDate: "2026-02-25", endDate: "2026-02-26", reason: "Medical appointment", status: "Pending", appliedOn: "2026-02-19" },
    { id: 3, applicant: "Priya Verma", type: "Student", class: "9-A", startDate: "2026-02-18", endDate: "2026-02-19", reason: "Sick leave", status: "Approved", appliedOn: "2026-02-17" },
    { id: 4, applicant: "Vikash Pandey", type: "Teacher", subject: "Social Studies", startDate: "2026-02-20", endDate: "2026-02-28", reason: "Personal emergency", status: "Approved", appliedOn: "2026-02-18" },
    { id: 5, applicant: "Kavya Mishra", type: "Student", class: "8-B", startDate: "2026-02-21", endDate: "2026-02-21", reason: "Doctor visit", status: "Rejected", appliedOn: "2026-02-20" },
];

export const exams = [
    { id: 1, name: "Mid-Term Examination", type: "Midterm", startDate: "2026-09-15", endDate: "2026-09-25", status: "Completed", classes: ["6-A", "6-B", "7-A", "7-B", "8-A", "8-B", "9-A", "9-B", "10-A", "10-B"] },
    { id: 2, name: "Unit Test - I", type: "Unit Test", startDate: "2026-07-10", endDate: "2026-07-12", status: "Completed", classes: ["6-A", "6-B", "7-A", "7-B", "8-A", "8-B", "9-A", "9-B", "10-A", "10-B"] },
    { id: 3, name: "Final Examination", type: "Final", startDate: "2026-03-01", endDate: "2026-03-15", status: "Upcoming", classes: ["6-A", "6-B", "7-A", "7-B", "8-A", "8-B", "9-A", "9-B", "10-A", "10-B"] },
    { id: 4, name: "Unit Test - II", type: "Unit Test", startDate: "2026-01-05", endDate: "2026-01-07", status: "Completed", classes: ["6-A", "6-B", "7-A", "7-B", "8-A", "8-B", "9-A", "9-B", "10-A", "10-B"] },
];

export const examResults = [
    { id: 1, studentName: "Aarav Sharma", class: "10-A", exam: "Mid-Term", subjects: { Mathematics: 92, Science: 88, English: 85, Hindi: 90, SST: 87, Computer: 95 }, total: 537, percentage: 89.5, grade: "A+", rank: 3 },
    { id: 2, studentName: "Ananya Patel", class: "10-A", exam: "Mid-Term", subjects: { Mathematics: 96, Science: 94, English: 91, Hindi: 88, SST: 90, Computer: 97 }, total: 556, percentage: 92.6, grade: "A+", rank: 1 },
    { id: 3, studentName: "Rohan Gupta", class: "9-B", exam: "Mid-Term", subjects: { Mathematics: 78, Science: 82, English: 75, Hindi: 80, SST: 76, Computer: 85 }, total: 476, percentage: 79.3, grade: "B+", rank: 12 },
    { id: 4, studentName: "Priya Verma", class: "9-A", exam: "Mid-Term", subjects: { Mathematics: 88, Science: 85, English: 90, Hindi: 92, SST: 86, Computer: 89 }, total: 530, percentage: 88.3, grade: "A+", rank: 5 },
    { id: 5, studentName: "Arjun Singh", class: "8-A", exam: "Mid-Term", subjects: { Mathematics: 72, Science: 76, English: 80, Hindi: 74, SST: 78, Computer: 82 }, total: 462, percentage: 77, grade: "B+", rank: 18 },
];

export const events = [
    { id: 1, title: "Republic Day Celebration", date: "2026-01-26", time: "09:00 AM", venue: "Main Ground", type: "Cultural", description: "Grand celebration with flag hoisting, cultural programs, and patriotic songs.", budget: 50000, status: "Completed", participants: 1200, photos: [] },
    { id: 2, title: "Parent-Teacher Meeting", date: "2026-02-25", time: "10:00 AM", venue: "Classrooms", type: "PTM", description: "Discuss student progress with parents. Mid-term results will be shared.", budget: 5000, status: "Upcoming", participants: 0, photos: [] },
    { id: 3, title: "Annual Sports Day", date: "2026-03-05", time: "08:00 AM", venue: "Sports Complex", type: "Sports", description: "Inter-house sports competition including track events, field events, and team sports.", budget: 150000, status: "Upcoming", participants: 0, photos: [] },
    { id: 4, title: "Science Exhibition", date: "2026-03-15", time: "10:00 AM", venue: "Science Lab & Hall", type: "Academic", description: "Students showcase innovative science projects and working models.", budget: 30000, status: "Upcoming", participants: 0, photos: [] },
    { id: 5, title: "Annual Function & Farewell", date: "2026-03-28", time: "05:00 PM", venue: "Auditorium", type: "Cultural", description: "Annual day celebration with cultural performances, prize distribution, and Class 10 farewell.", budget: 200000, status: "Upcoming", participants: 0, photos: [] },
];

export const feeStructure = [
    { id: 1, class: "Class 1-5", tuitionFee: 2500, examFee: 500, activityFee: 300, labFee: 0, libraryFee: 200, sportsFee: 200, totalMonthly: 3700, totalAnnual: 44400 },
    { id: 2, class: "Class 6-8", tuitionFee: 3500, examFee: 700, activityFee: 400, labFee: 500, libraryFee: 300, sportsFee: 300, totalMonthly: 5700, totalAnnual: 68400 },
    { id: 3, class: "Class 9-10", tuitionFee: 4500, examFee: 1000, activityFee: 500, labFee: 800, libraryFee: 400, sportsFee: 400, totalMonthly: 7600, totalAnnual: 91200 },
];

export const feePayments = [
    { id: 1, receiptNo: "FEE2026001", studentName: "Aarav Sharma", class: "10-A", amount: 7600, month: "February 2026", paidDate: "2026-02-05", mode: "Online", status: "Paid", fine: 0 },
    { id: 2, receiptNo: "FEE2026002", studentName: "Ananya Patel", class: "10-A", amount: 7600, month: "February 2026", paidDate: "2026-02-03", mode: "Cash", status: "Paid", fine: 0 },
    { id: 3, receiptNo: "FEE2026003", studentName: "Rohan Gupta", class: "9-B", amount: 7600, month: "February 2026", paidDate: null, mode: null, status: "Pending", fine: 200 },
    { id: 4, receiptNo: "FEE2026004", studentName: "Priya Verma", class: "9-A", amount: 7600, month: "February 2026", paidDate: "2026-02-10", mode: "UPI", status: "Paid", fine: 0 },
    { id: 5, receiptNo: "FEE2026005", studentName: "Arjun Singh", class: "8-A", amount: 5700, month: "February 2026", paidDate: "2026-02-15", mode: "Online", status: "Partial", fine: 100 },
    { id: 6, receiptNo: "FEE2026006", studentName: "Kavya Mishra", class: "8-B", amount: 5700, month: "January 2026", paidDate: null, mode: null, status: "Pending", fine: 500 },
    { id: 7, receiptNo: "FEE2026007", studentName: "Vivaan Khan", class: "7-A", amount: 5700, month: "February 2026", paidDate: null, mode: null, status: "Pending", fine: 200 },
    { id: 8, receiptNo: "FEE2026008", studentName: "Ishita Jain", class: "7-B", amount: 5700, month: "February 2026", paidDate: "2026-02-01", mode: "Online", status: "Paid", fine: 0 },
];

export const announcements = [
    { id: 1, title: "Mid-Term Exam Schedule Released", message: "The mid-term examination schedule for all classes has been published. Please check the exam notice board.", target: "All", postedBy: "Admin", date: "2026-02-15", priority: "High" },
    { id: 2, title: "Annual Sports Day Registration", message: "Registration for Annual Sports Day events is now open. Students can register through their class teachers.", target: "Students", postedBy: "Sports Dept", date: "2026-02-18", priority: "Medium" },
    { id: 3, title: "PTM Notice", message: "Parent-Teacher Meeting is scheduled for 25th February. Parents are requested to attend.", target: "Parents", postedBy: "Admin", date: "2026-02-19", priority: "High" },
    { id: 4, title: "Holiday Notice - Maha Shivratri", message: "School will remain closed on 26th February on account of Maha Shivratri.", target: "All", postedBy: "Admin", date: "2026-02-20", priority: "Medium" },
    { id: 5, title: "New Library Books Added", message: "50 new books have been added to the school library. Students can check the catalog.", target: "Students", postedBy: "Library", date: "2026-02-14", priority: "Low" },
];

export const timetable = {
    class: "10-A",
    days: {
        Monday: [
            { period: 1, time: "08:00 - 08:45", subject: "Mathematics", teacher: "Dr. Meera Sharma" },
            { period: 2, time: "08:45 - 09:30", subject: "English", teacher: "Amit Tripathi" },
            { period: 3, time: "09:30 - 10:15", subject: "Science", teacher: "Rajiv Kumar" },
            { period: 4, time: "10:30 - 11:15", subject: "Hindi", teacher: "Sunita Devi" },
            { period: 5, time: "11:15 - 12:00", subject: "Computer Science", teacher: "Priya Singh" },
            { period: 6, time: "12:45 - 01:30", subject: "Social Studies", teacher: "Vikash Pandey" },
            { period: 7, time: "01:30 - 02:15", subject: "Physical Education", teacher: "Sanjay Mishra" },
        ],
        Tuesday: [
            { period: 1, time: "08:00 - 08:45", subject: "Science", teacher: "Rajiv Kumar" },
            { period: 2, time: "08:45 - 09:30", subject: "Mathematics", teacher: "Dr. Meera Sharma" },
            { period: 3, time: "09:30 - 10:15", subject: "Hindi", teacher: "Sunita Devi" },
            { period: 4, time: "10:30 - 11:15", subject: "English", teacher: "Amit Tripathi" },
            { period: 5, time: "11:15 - 12:00", subject: "Social Studies", teacher: "Vikash Pandey" },
            { period: 6, time: "12:45 - 01:30", subject: "Computer Science", teacher: "Priya Singh" },
            { period: 7, time: "01:30 - 02:15", subject: "Art & Craft", teacher: "Neha Agarwal" },
        ],
        Wednesday: [
            { period: 1, time: "08:00 - 08:45", subject: "English", teacher: "Amit Tripathi" },
            { period: 2, time: "08:45 - 09:30", subject: "Science", teacher: "Rajiv Kumar" },
            { period: 3, time: "09:30 - 10:15", subject: "Mathematics", teacher: "Dr. Meera Sharma" },
            { period: 4, time: "10:30 - 11:15", subject: "Computer Science", teacher: "Priya Singh" },
            { period: 5, time: "11:15 - 12:00", subject: "Hindi", teacher: "Sunita Devi" },
            { period: 6, time: "12:45 - 01:30", subject: "Physical Education", teacher: "Sanjay Mishra" },
            { period: 7, time: "01:30 - 02:15", subject: "Social Studies", teacher: "Vikash Pandey" },
        ],
        Thursday: [
            { period: 1, time: "08:00 - 08:45", subject: "Hindi", teacher: "Sunita Devi" },
            { period: 2, time: "08:45 - 09:30", subject: "Mathematics", teacher: "Dr. Meera Sharma" },
            { period: 3, time: "09:30 - 10:15", subject: "English", teacher: "Amit Tripathi" },
            { period: 4, time: "10:30 - 11:15", subject: "Science", teacher: "Rajiv Kumar" },
            { period: 5, time: "11:15 - 12:00", subject: "Art & Craft", teacher: "Neha Agarwal" },
            { period: 6, time: "12:45 - 01:30", subject: "Mathematics", teacher: "Dr. Meera Sharma" },
            { period: 7, time: "01:30 - 02:15", subject: "Computer Science", teacher: "Priya Singh" },
        ],
        Friday: [
            { period: 1, time: "08:00 - 08:45", subject: "Computer Science", teacher: "Priya Singh" },
            { period: 2, time: "08:45 - 09:30", subject: "English", teacher: "Amit Tripathi" },
            { period: 3, time: "09:30 - 10:15", subject: "Science", teacher: "Rajiv Kumar" },
            { period: 4, time: "10:30 - 11:15", subject: "Mathematics", teacher: "Dr. Meera Sharma" },
            { period: 5, time: "11:15 - 12:00", subject: "Social Studies", teacher: "Vikash Pandey" },
            { period: 6, time: "12:45 - 01:30", subject: "Hindi", teacher: "Sunita Devi" },
            { period: 7, time: "01:30 - 02:15", subject: "Physical Education", teacher: "Sanjay Mishra" },
        ],
        Saturday: [
            { period: 1, time: "08:00 - 08:45", subject: "Mathematics", teacher: "Dr. Meera Sharma" },
            { period: 2, time: "08:45 - 09:30", subject: "Science", teacher: "Rajiv Kumar" },
            { period: 3, time: "09:30 - 10:15", subject: "English", teacher: "Amit Tripathi" },
            { period: 4, time: "10:30 - 11:15", subject: "Library", teacher: "Librarian" },
        ],
    },
};

export const libraryBooks = [
    { id: 1, title: "Mathematics for Class 10", author: "R.S. Aggarwal", isbn: "978-8120-1234-5", category: "Textbook", available: 15, total: 20, location: "Shelf A1" },
    { id: 2, title: "The Discovery of India", author: "Jawaharlal Nehru", isbn: "978-0143-0315-6", category: "History", available: 3, total: 5, location: "Shelf B3" },
    { id: 3, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", isbn: "978-8173-7114-6", category: "Biography", available: 2, total: 4, location: "Shelf C1" },
    { id: 4, title: "Concepts of Physics", author: "H.C. Verma", isbn: "978-8177-0916-4", category: "Science", available: 8, total: 12, location: "Shelf A2" },
    { id: 5, title: "English Grammar & Composition", author: "Wren & Martin", isbn: "978-9352-5300-3", category: "Language", available: 10, total: 15, location: "Shelf D1" },
];

export const transportRoutes = [
    { id: 1, routeNo: "R-01", name: "Gomti Nagar Route", driver: "Ram Singh", driverPhone: "9876600001", vehicle: "UP32 AB 1234", capacity: 40, students: 35, stops: ["Gomti Nagar", "Vikas Nagar", "Aliganj", "School"] },
    { id: 2, routeNo: "R-02", name: "Hazratganj Route", driver: "Shyam Lal", driverPhone: "9876600002", vehicle: "UP32 CD 5678", capacity: 35, students: 30, stops: ["Hazratganj", "Aminabad", "Chowk", "School"] },
    { id: 3, routeNo: "R-03", name: "Indira Nagar Route", driver: "Mohan Das", driverPhone: "9876600003", vehicle: "UP32 EF 9012", capacity: 40, students: 38, stops: ["Indira Nagar", "Mahanagar", "Rajajipuram", "School"] },
];

export const complaints = [
    { id: 1, from: "Rajesh Sharma (Parent)", subject: "Bus delay issue", description: "School bus on Route R-01 is consistently 15 minutes late.", date: "2026-02-18", status: "In Progress", priority: "High" },
    { id: 2, from: "Ananya Patel (Student)", subject: "Broken desk in 10-A", description: "Two desks in classroom 10-A are broken and need repair.", date: "2026-02-19", status: "Pending", priority: "Medium" },
    { id: 3, from: "Dr. Meera Sharma (Teacher)", subject: "Projector not working", description: "The projector in Science Lab 2 has stopped working.", date: "2026-02-17", status: "Resolved", priority: "High" },
];

export const roles = [
    { id: 1, name: "Super Admin", permissions: "Full Access", users: 2 },
    { id: 2, name: "Admin", permissions: "Manage Students, Teachers, Fees, Exams", users: 3 },
    { id: 3, name: "Teacher", permissions: "View Students, Mark Attendance, Enter Marks", users: 68 },
    { id: 4, name: "Parent", permissions: "View Child Info, Fees, Results", users: 950 },
    { id: 5, name: "Student", permissions: "View Profile, Results, Timetable", users: 1195 },
];

export const auditLogs = [
    { id: 1, user: "Admin", action: "Added Student", details: "Added Aarav Sharma to Class 10-A", timestamp: "2026-02-21 09:15:00", ip: "192.168.1.100" },
    { id: 2, user: "Dr. Meera Sharma", action: "Marked Attendance", details: "Marked attendance for Class 10-A", timestamp: "2026-02-21 08:30:00", ip: "192.168.1.105" },
    { id: 3, user: "Admin", action: "Fee Collection", details: "Collected fee ₹7,600 from Aarav Sharma", timestamp: "2026-02-20 14:20:00", ip: "192.168.1.100" },
    { id: 4, user: "Admin", action: "Published Results", details: "Published Mid-Term results for Class 9", timestamp: "2026-02-19 16:45:00", ip: "192.168.1.100" },
    { id: 5, user: "Rajiv Kumar", action: "Leave Applied", details: "Applied for sick leave (2 days)", timestamp: "2026-02-19 10:00:00", ip: "192.168.1.108" },
];

export const classOptions = [
    "1-A", "1-B", "2-A", "2-B", "3-A", "3-B", "4-A", "4-B", "5-A", "5-B",
    "6-A", "6-B", "7-A", "7-B", "8-A", "8-B", "9-A", "9-B", "10-A", "10-B"
];

export const subjectOptions = [
    "Mathematics", "Science", "English", "Hindi", "Social Studies",
    "Computer Science", "Physical Education", "Art & Craft", "Music", "Sanskrit"
];
