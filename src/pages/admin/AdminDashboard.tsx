
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Users, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Eye,
  FileCheck,
  FileX,
  Home,
  Mail,
  Phone,
  MapPin,
  Download,
  Printer,
  MessageSquare,
  Calendar,
  PieChart as PieChartIcon,
  BarChart2,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Filter,
  ChevronDown,
  HardHat,
  AlertTriangle,
  FileSignature,
  CheckCircle,
  XCircle,
  UserCog,
  User
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Label,
  RadialBar,
  RadialBarChart,
  Area,
  AreaChart
} from 'recharts';
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [language, setLanguage] = useState<'english' | 'marathi'>('english');
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      setApplications(recentApplications);
    }, 800);

    // Auto-rotate announcements
    const announcementTimer = setInterval(() => {
      setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(announcementTimer);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'marathi' : 'english');
  };

  const recentApplications = [
    {
      id: "APP-1234",
      applicant: "Rajesh Sharma",
      type: "Birth Certificate",
      date: "2023-04-12",
      details: {
        address: "123 Main St, Rohini Sector 5, Delhi",
        phone: "+91 9876543210",
        email: "rajesh.sharma@example.com",
        documents: ["Aadhaar Card", "Hospital Birth Proof", "Address Proof"],
        notes: "Application submitted for birth certificate. Requires verification from hospital records.",
        officer: "Arvind Kumar (Zone 3)"
      }
    },
    {
      id: "APP-1235",
      applicant: "Priya Patel",
      type: "Property Transfer",
      date: "2023-04-08",
      details: {
        address: "456 Park Avenue, Rohini Sector 11, Delhi",
        phone: "+91 9876543211",
        email: "priya.patel@example.com",
        documents: ["Property Deed", "Aadhaar Card", "PAN Card", "No Objection Certificate"],
        notes: "Property transfer application approved after document verification.",
        officer: "Sunita Sharma (Zone 2)"
      }
    },
    {
      id: "APP-1236",
      applicant: "Sunil Kumar",
      type: "Job Card Application",
      date: "2023-04-05",
      details: {
        address: "789 Oak Street, Rohini Sector 15, Delhi",
        phone: "+91 9876543212",
        email: "sunil.kumar@example.com",
        documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
        notes: "Job card application under review. Income certificate needs validation.",
        officer: "Ramesh Singh (Zone 4)"
      }
    },
    {
      id: "APP-1237",
      applicant: "Ananya Singh",
      type: "Marriage Certificate",
      date: "2023-04-01",
      details: {
        address: "321 Pine Road, Rohini Sector 8, Delhi",
        phone: "+91 9876543213",
        email: "ananya.singh@example.com",
        documents: ["Marriage Proof", "Aadhaar Cards", "Wedding Photos"],
        notes: "Application rejected due to incomplete documents. Missing marriage affidavit.",
        officer: "Neha Gupta (Zone 1)"
      }
    },
    {
      id: "APP-1238",
      applicant: "Vijay Deshmukh",
      type: "Resident Certificate",
      date: "2023-03-28",
      details: {
        address: "654 Maple Lane, Rohini Sector 3, Delhi",
        phone: "+91 9876543214",
        email: "vijay.deshmukh@example.com",
        documents: ["Aadhaar Card", "Voter ID", "Electricity Bill"],
        notes: "Resident certificate application pending address verification.",
        officer: "Arvind Kumar (Zone 3)"
      }
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "System Maintenance",
      date: "2023-04-15",
      content: "Portal will be unavailable from 2:00 AM to 4:00 AM on April 18 for scheduled maintenance."
    },
    {
      id: 2,
      title: "New Services Added",
      date: "2023-04-10",
      content: "Three new services added: Water Connection, Trade License, and Building Plan Approval."
    },
    {
      id: 3,
      title: "Document Verification Process Update",
      date: "2023-04-05",
      content: "New document verification process implemented for property-related applications."
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "New application submitted",
      message: "APP-1245: Birth Certificate application from Amit Kumar",
      time: "10 mins ago",
      read: false
    },
    {
      id: 2,
      title: "Application approved",
      message: "APP-1235: Property Transfer application has been approved",
      time: "2 hours ago",
      read: true
    },
    {
      id: 3,
      title: "System alert",
      message: "Scheduled maintenance tonight at 2:00 AM",
      time: "1 day ago",
      read: true
    }
  ];

  const handleViewClick = (application: any) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  // Color themes for charts
  const colorThemes = {
    primary: '#3B82F6', // Blue
    secondary: '#F97316', // Orange
    accent: '#10B981', // Green
    accent2: '#EF4444', // Red
    purple: '#8B5CF6', // Purple
    yellow: '#F59E0B' // Yellow
  };

  // Data for charts
  const chartData = {
    certificateStatus: [
      { name: 'Pending', value: 32, color: colorThemes.secondary },
      { name: 'In Review', value: 15, color: colorThemes.primary },
      { name: 'Approved', value: 85, color: colorThemes.accent },
      { name: 'Rejected', value: 8, color: colorThemes.accent2 }
    ],
    certificateTypes: [
      { name: 'Birth Certificate', value: 45, color: colorThemes.primary },
      { name: 'Property Transfer', value: 30, color: colorThemes.secondary },
      { name: 'Marriage Certificate', value: 20, color: colorThemes.purple },
      { name: 'Resident Certificate', value: 18, color: colorThemes.accent2 }
    ],
    mnregaStatus: [
      { name: 'Pending', value: 22, color: colorThemes.secondary },
      { name: 'Approved', value: 65, color: colorThemes.accent },
      { name: 'Rejected', value: 5, color: colorThemes.accent2 }
    ],
    complaintStatus: [
      { name: 'Open', value: 18, color: colorThemes.secondary },
      { name: 'In Progress', value: 12, color: colorThemes.primary },
      { name: 'Resolved', value: 42, color: colorThemes.accent }
    ],
    applicationTrends: [
      { month: 'Jan', applications: 20, resolved: 15 },
      { month: 'Feb', applications: 25, resolved: 20 },
      { month: 'Mar', applications: 30, resolved: 25 },
      { month: 'Apr', applications: 35, resolved: 28 },
      { month: 'May', applications: 28, resolved: 25 },
      { month: 'Jun', applications: 32, resolved: 28 }
    ],
    zoneWiseDistribution: [
      { name: 'Zone 1', applications: 35, color: colorThemes.primary },
      { name: 'Zone 2', applications: 28, color: colorThemes.secondary },
      { name: 'Zone 3', applications: 42, color: colorThemes.accent },
      { name: 'Zone 4', applications: 30, color: colorThemes.purple },
      { name: 'Zone 5', applications: 25, color: colorThemes.accent2 }
    ],
    satisfactionData: [
      { subject: 'Processing Time', A: 85, fullMark: 100 },
      { subject: 'Ease of Use', A: 92, fullMark: 100 },
      { subject: 'Officer Helpfulness', A: 78, fullMark: 100 },
      { subject: 'Document Clarity', A: 82, fullMark: 100 },
      { subject: 'Overall Satisfaction', A: 87, fullMark: 100 },
    ]
  };

  // Translations
  const translations = {
    english: {
      dashboardTitle: "Admin Dashboard",
      dashboardSubtitle: "Manage applications, services, and portal operations",
      certificateDashboard: "Certificate Dashboard",
      mnregaDashboard: "MNREGA Dashboard",
      complaintsDashboard: "Complaints Dashboard",
      userManagement: "User Management",
      recentApplications: "Recent Applications",
      viewAll: "View all",
      announcements: "Announcements",
      quickActions: "Quick Actions",
      detailedAnalytics: "Detailed Analytics",
      certificateAnalytics: "Certificate Analytics",
      mnregaAnalytics: "MNREGA Analytics",
      complaintsAnalytics: "Complaints Analytics",
      certificateStatus: "Certificate Status",
      certificateTypes: "Certificate Types",
      mnregaStatus: "MNREGA Status",
      zoneWiseDistribution: "Zone-wise Distribution",
      complaintStatus: "Complaint Status",
      complaintTrends: "Complaint Trends",
      averageProcessingTime: "Average Processing Time",
      citizenSatisfaction: "Citizen Satisfaction",
      portalUsage: "Portal Usage",
      notifications: "Notifications",
      viewAllNotifications: "View all notifications",
      applicationDetails: "Application Details",
      basicInfo: "Basic Information",
      contactInfo: "Contact Information",
      documents: "Documents",
      notes: "Notes",
      addComment: "Add Comment",
      saveComment: "Save Comment",
      close: "Close",
      saveChanges: "Save Changes",
      approvedApplications: "Approved Applications",
      rejectedApplications: "Rejected Applications",
      inProgressApplications: "In Progress Applications",
      allApplications: "All Applications"
    },
    marathi: {
      dashboardTitle: "प्रशासक डॅशबोर्ड",
      dashboardSubtitle: "अर्ज, सेवा आणि पोर्टल ऑपरेशन्स व्यवस्थापित करा",
      certificateDashboard: "प्रमाणपत्र डॅशबोर्ड",
      mnregaDashboard: "मनरेगा डॅशबोर्ड",
      complaintsDashboard: "तक्रारी डॅशबोर्ड",
      userManagement: "वापरकर्ते व्यवस्थापन",
      recentApplications: "अलीकडील अर्ज",
      viewAll: "सर्व पहा",
      announcements: "जाहिराती",
      quickActions: "द्रुत क्रिया",
      detailedAnalytics: "तपशीलवार विश्लेषण",
      certificateAnalytics: "प्रमाणपत्र विश्लेषण",
      mnregaAnalytics: "मनरेगा विश्लेषण",
      complaintsAnalytics: "तक्रारी विश्लेषण",
      certificateStatus: "प्रमाणपत्र स्थिती",
      certificateTypes: "प्रमाणपत्र प्रकार",
      mnregaStatus: "मनरेगा स्थिती",
      zoneWiseDistribution: "झोननुसार वितरण",
      complaintStatus: "तक्रार स्थिती",
      complaintTrends: "तक्रारीचे ट्रेंड",
      averageProcessingTime: "सरासरी प्रक्रिया वेळ",
      citizenSatisfaction: "नागरिक समाधान",
      portalUsage: "पोर्टल वापर",
      notifications: "सूचना",
      viewAllNotifications: "सर्व सूचना पहा",
      applicationDetails: "अर्ज तपशील",
      basicInfo: "मूलभूत माहिती",
      contactInfo: "संपर्क माहिती",
      documents: "दस्तऐवज",
      notes: "नोट्स",
      addComment: "टिप्पणी जोडा",
      saveComment: "टिप्पणी जतन करा",
      close: "बंद करा",
      saveChanges: "बदल जतन करा",
      approvedApplications: "मंजूर अर्ज",
      rejectedApplications: "नाकारलेले अर्ज",
      inProgressApplications: "प्रगतीपथावर असलेले अर्ज",
      allApplications: "सर्व अर्ज"
    }
  };

  const t = translations[language];

  return (
    <div className="animate-fade-in">
      {/* Header with Blue Background */}
      <div className="bg-gradient-to-r from-white-600 to-white-700 text-black px-6 py-4 rounded-t-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{t.dashboardTitle}</h1>
            <p className="text-black-100 mt-1">{t.dashboardSubtitle}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button 
              onClick={toggleLanguage}
              className="px-10 py-4 bg-white text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors shadow-md"
            >
              {language === 'english' ? 'मराठी' : 'English'}
            </button>
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full hover:bg-blue-500 relative transition-colors shadow-md"
              >
                <Bell className="h-5 w-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                )}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t.notifications}</h3>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      >
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      {t.viewAllNotifications}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold shadow-md">
                AK
              </div>
              <span className="font-medium">Admin</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-b-lg shadow-lg">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <>
{/* Quick Actions Section */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {/* Approved Applications */}
  <motion.div 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-gradient-to-r from-green-100 to-green-300 dark:from-green-900 dark:to-green-800 rounded-lg shadow-lg p-6 border border-green-200 dark:border-green-700 hover:shadow-xl transition-all"
  >
    <Link to="/admin/applications/approved">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300 mr-4 shadow-md">
          <CheckCircle className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-green-800 dark:text-green-200">{t.approvedApplications}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">85</h3>
          <p className="text-xs text-green-600 dark:text-green-300 mt-1">+12 from last week</p>
        </div>
      </div>
    </Link>
  </motion.div>

  {/* Rejected Applications */}
  <motion.div 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-gradient-to-r from-red-100 to-red-300 dark:from-red-900 dark:to-red-800 rounded-lg shadow-lg p-6 border border-red-200 dark:border-red-700 hover:shadow-xl transition-all"
  >
    <Link to="/admin/applications/rejected">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 mr-4 shadow-md">
          <XCircle className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-red-800 dark:text-red-200">{t.rejectedApplications}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
          <p className="text-xs text-red-600 dark:text-red-300 mt-1">-2 from last week</p>
        </div>
      </div>
    </Link>
  </motion.div>

  {/* In Progress Applications */}
  <motion.div 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-800 rounded-lg shadow-lg p-6 border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all"
  >
    <Link to="/admin/applications/in-progress">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 mr-4 shadow-md">
          <Clock className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-blue-800 dark:text-blue-200">{t.inProgressApplications}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">47</h3>
          <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">+5 from yesterday</p>
        </div>
      </div>
    </Link>
  </motion.div>

  {/* User Management */}
  <motion.div 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-gradient-to-r from-purple-100 to-purple-300 dark:from-purple-900 dark:to-purple-800 rounded-lg shadow-lg p-6 border border-purple-200 dark:border-purple-700 hover:shadow-xl transition-all"
  >
    <Link to="/admin/users">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 mr-4 shadow-md">
          <UserCog className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-purple-800 dark:text-purple-200">{t.userManagement}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">215</h3>
          <p className="text-xs text-purple-600 dark:text-purple-300 mt-1">12 admins • 203 officers</p>
        </div>
      </div>
    </Link>
  </motion.div>
</div>

            
            {/* Announcements Section */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-xl border-2 border-blue-200 dark:border-gray-600 mb-8 overflow-hidden">
              <div className="px-6 py-4 border-b border-blue-100 dark:border-gray-600 flex justify-between items-center bg-white/50 dark:bg-gray-800/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-500 animate-pulse" />
                  {t.announcements}
                </h3>
                <div className="flex space-x-2">
                  {announcements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAnnouncement(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentAnnouncement === index ? 'bg-blue-500 scale-125' : 'bg-blue-200 dark:bg-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="relative h-40">
                {announcements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: currentAnnouncement === index ? 1 : 0, 
                      x: currentAnnouncement === index ? 0 : 50,
                      transition: { duration: 0.5 }
                    }}
                    className={`absolute inset-0 p-6 ${currentAnnouncement === index ? 'block' : 'hidden'}`}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white text-lg mb-2">
                      {announcement.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {announcement.content}
                    </p>
                    <div className="absolute bottom-4 right-6 text-xs text-blue-500 dark:text-blue-400 font-medium">
                      {announcement.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
{/* Main Content Area - Horizontal Chart Groups */}
<div className="space-y-6 mb-8">
  {/* Certificate Analytics Group */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Certificate Status */}
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl"
    >
      <div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <FileSignature className="h-5 w-5 mr-2 text-blue-500" />
          {t.certificateStatus}
        </h3>
      </div>
      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.certificateStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.certificateStatus.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} applications`, 'Count']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(4px)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>

    {/* Certificate Types */}
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl"
    >
      <div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-500" />
          {t.certificateTypes}
        </h3>
      </div>
      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.certificateTypes}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip 
                formatter={(value) => [`${value} applications`, 'Count']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(4px)'
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.certificateTypes.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  </div>

  {/* MNREGA Analytics Group */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* MNREGA Status */}
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl"
    >
      <div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <HardHat className="h-5 w-5 mr-2 text-green-500" />
          {t.mnregaStatus}
        </h3>
      </div>
      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.mnregaStatus}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.mnregaStatus.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} job cards`, 'Count']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(4px)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>

    {/* Zone-wise Distribution */}
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl"
    >
      <div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-green-500" />
          {t.zoneWiseDistribution}
        </h3>
      </div>
      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData.zoneWiseDistribution}>
              <PolarGrid stroke="#e5e7eb" opacity={0.5} />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar 
                name="Applications" 
                dataKey="applications" 
                stroke={colorThemes.accent}
                fill={colorThemes.accent}
                fillOpacity={0.6}
              />
              <Tooltip 
                formatter={(value) => [`${value} applications`, 'Count']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(4px)'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  </div>

  {/* Complaints Analytics - Horizontal Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Complaint Status - Changed to Radial Bar Chart */}
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl"
    >
      <div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
          {t.complaintStatus}
        </h3>
      </div>
      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="20%"
              outerRadius="90%"
              data={chartData.complaintStatus.map(item => ({
                ...item,
                fill: item.color
              }))}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar 
                label={{ 
                  position: 'insideStart', 
                  fill: '#fff',
                  formatter: (value) => `${value}`
                }}
                background
                dataKey="value" 
                cornerRadius={10}
              />
              <Legend 
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} complaints`,
                  name
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(4px)'
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>

    {/* Complaint Trends - Area Chart */}
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-xl"
    >
      <div className="px-6 py-5 border-b border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-red-500" />
          {t.complaintTrends}
        </h3>
      </div>
      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData.applicationTrends}>
              <defs>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colorThemes.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colorThemes.primary} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colorThemes.accent} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colorThemes.accent} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(4px)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="applications"
                stroke={colorThemes.primary}
                fillOpacity={1}
                fill="url(#colorApplications)"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stroke={colorThemes.accent}
                fillOpacity={1}
                fill="url(#colorResolved)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  </div>
</div>

            {/* Recent Applications Table - Enhanced Design */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t.recentApplications}
                </h3>
                <Link
                  to="/admin/applications"
                  className="text-sm text-orange-600 dark:text-orange-400 hover:underline flex items-center"
                >
                  {t.viewAll} <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" /> ID
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" /> Applicant
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileSignature className="h-4 w-4 mr-2" /> Type
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" /> Date
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" /> Actions
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {applications.map((app, index) => (
                        <motion.tr 
                          key={index}
                          whileHover={{ 
                            backgroundColor: index % 2 === 0 
                              ? 'rgba(219, 234, 254, 0.5)' 
                              : 'rgba(239, 246, 255, 0.5)',
                            transition: { duration: 0.2 }
                          }}
                          className={`
                            ${index % 2 === 0 ? 'bg-blue-50/30 dark:bg-gray-700/30' : 'bg-white dark:bg-gray-800'}
                            transition-colors
                          `}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800 dark:text-blue-200">
                            {app.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {app.applicant}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {app.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {app.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <motion.button
                              onClick={() => handleViewClick(app)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md shadow-md hover:shadow-lg transition-all flex items-center"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View Details
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Detailed Analytics - Horizontal Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-orange-500" />
                  {t.detailedAnalytics}
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Processing Time */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800 shadow-md"
                  >
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {t.averageProcessingTime}
                    </h4>
                    <div className="text-2xl font-bold text-blue-800 dark:text-white">3.2 <span className="text-lg">days</span></div>
                    <div className="text-xs text-blue-500 dark:text-blue-300 mt-1">-0.5 days from last month</div>
                    <div className="mt-3 h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" 
                        style={{ width: '72%' }}
                      ></div>
                    </div>
                  </motion.div>

                  {/* Citizen Satisfaction */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800 shadow-md"
                  >
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-300 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {t.citizenSatisfaction}
                    </h4>
                    <div className="text-2xl font-bold text-green-800 dark:text-white">87<span className="text-lg">%</span></div>
                    <div className="text-xs text-green-500 dark:text-green-300 mt-1">+2% from last quarter</div>
                    <div className="mt-3 h-2 bg-green-200 dark:bg-green-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 dark:bg-green-400 rounded-full" 
                        style={{ width: '87%' }}
                      ></div>
                    </div>
                  </motion.div>

                  {/* Portal Usage */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-4 rounded-lg border border-purple-200 dark:border-purple-800 shadow-md"
                  >
                    <h4 className="text-sm font-medium text-purple-600 dark:text-purple-300 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {t.portalUsage}
                    </h4>
                    <div className="text-2xl font-bold text-purple-800 dark:text-white">1,284<span className="text-lg"> visits</span></div>
                    <div className="text-xs text-purple-500 dark:text-purple-300 mt-1">+15% from last week</div>
                    <div className="mt-3 h-2 bg-purple-200 dark:bg-purple-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 dark:bg-purple-400 rounded-full" 
                        style={{ width: '68%' }}
                      ></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal for viewing application details */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.applicationDetails} - {selectedApplication.id}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{t.basicInfo}</h4>
                  <dl className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <dt className="text-xs text-gray-500 dark:text-gray-400">Application ID</dt>
                      <dd className="text-sm text-gray-900 dark:text-white mt-1">{selectedApplication.id}</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <dt className="text-xs text-gray-500 dark:text-gray-400">Applicant Name</dt>
                      <dd className="text-sm text-gray-900 dark:text-white mt-1">{selectedApplication.applicant}</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <dt className="text-xs text-gray-500 dark:text-gray-400">Application Type</dt>
                      <dd className="text-sm text-gray-900 dark:text-white mt-1">{selectedApplication.type}</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <dt className="text-xs text-gray-500 dark:text-gray-400">Submission Date</dt>
                      <dd className="text-sm text-gray-900 dark:text-white mt-1">{selectedApplication.date}</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <dt className="text-xs text-gray-500 dark:text-gray-400">Assigned Officer</dt>
                      <dd className="text-sm text-gray-900 dark:text-white mt-1">{selectedApplication.details.officer}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{t.contactInfo}</h4>
                  <dl className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" /> Address
                      </dt>
                      <dd className="text-sm text-gray-900 dark:text-white mt-1">{selectedApplication.details.address}</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Phone className="h-3 w-3 mr-1" /> Phone
                      </dt>
                      <dd className="text-sm text-gray-900 dark:text-white mt-1">{selectedApplication.details.phone}</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <dt className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Mail className="h-3 w-3 mr-1" /> Email
                      </dt>
                      <dd className="text-sm text-gray-900 dark:text-white mt-1">{selectedApplication.details.email}</dd>
                    </div>
                  </dl>

                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-6 mb-3">{t.documents}</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <ul className="space-y-2">
                      {selectedApplication.details.documents.map((doc: string, index: number) => (
                        <li key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-900 dark:text-white">{doc}</span>
                          <button className="text-orange-600 dark:text-orange-400 hover:underline text-xs transition-colors">
                            View
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-6 mb-3">{t.notes}</h4>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <p className="text-sm text-gray-900 dark:text-white">{selectedApplication.details.notes}</p>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{t.addComment}</h4>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white transition-colors"
                  rows={3}
                  placeholder="Add your comments here..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors shadow-md">
                    {t.saveComment}
                  </button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between sticky bottom-0 bg-white dark:bg-gray-800">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t.close}
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors shadow-md">
                {t.saveChanges}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;