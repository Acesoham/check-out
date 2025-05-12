import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  BarChart,
  PieChart,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Flag,
  ArrowUpDown,
  Bell,
  Calendar as CalendarIcon,
  Download,
  Search,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell, 
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from 'framer-motion';
import { format, subDays, subMonths, subYears } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

// Mock Data (unchanged)
interface RecentUser {
  id: string;
  name: string;
  village: string;
  jobCardIssuedOn: string;
  status: 'Pending' | 'Active' | 'Inactive';
  details?: {
    address: string;
    phone: string;
    bankAccount: string;
    familyMembers: number;
    lastWorkedOn: string;
  };
}

interface RecentComplaint {
  id: string;
  subject: string;
  jobCardHolder: string;
  village: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
}

interface Application {
  id: string;
  applicantName: string;
  village: string;
  applicationDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  formType: 'Job Card' | 'Kaam Magni Arj';
  formUrl: string;
  uploadedPdf?: string; // Add this line
  query?: string;
}

const generateMockUsers = (count: number): RecentUser[] => {
  const statuses: RecentUser['status'][] = ['Pending', 'Active', 'Inactive'];
  const names = ['Ram', 'Shyam', 'Meena', 'Geeta', 'Ravi', 'Pooja', 'Arjun', 'Kiran'];
  const villages = ['Village A', 'Village B', 'Village C', 'Village D'];

  return Array.from({ length: count }, (_, i) => ({
    id: `JC-${1000 + i}`,
    name: names[Math.floor(Math.random() * names.length)],
    village: villages[Math.floor(Math.random() * villages.length)],
    jobCardIssuedOn: `2024-01-${(i % 30) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    details: {
      address: `House No ${i + 1}, ${villages[Math.floor(Math.random() * villages.length)]}`,
      phone: `987654321${i % 10}`,
      bankAccount: `XXXX${1000 + i}`,
      familyMembers: (i % 5) + 1,
      lastWorkedOn: `2024-02-${(i % 28) + 1}`,
    },
  }));
};

const generateMockComplaints = (count: number): RecentComplaint[] => {
  const statuses: RecentComplaint['status'][] = ['Pending', 'In Progress', 'Resolved'];
  const priorities: RecentComplaint['priority'][] = ['High', 'Medium', 'Low'];
  const subjects = [
    'Delay in Payment',
    'Issue with Job Allocation',
    'Corruption Allegation',
    'Missing Facilities',
    'Wage Dispute',
  ];
  const names = ['Ram', 'Shyam', 'Meena', 'Geeta', 'Ravi', 'Pooja', 'Arjun', 'Kiran'];
  const villages = ['Village A', 'Village B', 'Village C', 'Village D'];

  return Array.from({ length: count }, (_, i) => ({
    id: `COMP-${2000 + i}`,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    jobCardHolder: names[Math.floor(Math.random() * names.length)],
    village: villages[Math.floor(Math.random() * villages.length)],
    date: `2024-03-${(i % 28) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  }));
};

const generateMockApplications = (count: number): Application[] => {
  const statuses: Application['status'][] = ['Pending', 'Approved', 'Rejected'];
  const names = ['Aarav Sharma', 'Diya Patel', 'Aryan Singh', 'Siya Verma', 'Advik Yadav'];
  const villages = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai'];
  const formTypes: Application['formType'][] = ['Job Card', 'Kaam Magni Arj'];

  return Array.from({ length: count }, (_, i) => ({
    id: `APP-${3000 + i}`,
    applicantName: names[i % names.length],
    village: villages[i % villages.length],
    applicationDate: `2024-04-${(i % 30) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    formType: formTypes[Math.floor(Math.random() * formTypes.length)],
    formUrl: `https://example.com/forms/${3000 + i}.pdf`,
    uploadedPdf: Math.random() > 0.5 ? `https://example.com/uploads/${3000 + i}.pdf` : undefined,
    query: Math.random() > 0.7 ? 'Please provide additional documents' : undefined
  }));
};

// Updated to softer color scheme
const CHART_COLORS = {
  primary: '#6366F1',    // Indigo-500 (softer)
  secondary: '#22C55E',  // Green-500 (softer)
  accent: '#F59E0B',     // Amber-500
  danger: '#EF4444',     // Red-500
  success: '#10B981',    // Emerald-500
  warning: '#F59E0B',    // Amber-500
  info: '#3B82F6',       // Blue-500
  dark: '#1F2937',       // Gray-800
  light: '#F9FAFB',      // Gray-50
  slate: '#64748B',      // Slate-500
  sky: '#0EA5E9',        // Sky-500
  violet: '#7C3AED',     // Violet-600
  pink: '#EC4899',       // Pink-500
  teal: '#14B8A6',       // Teal-500
  cyan: '#06B6D4',       // Cyan-500
  rose: '#F43F5E',       // Rose-500
};

// Softer harmonized color palette for charts
const PIE_CHART_COLORS = [
  '#8B5CF6', // Violet-500
  '#3B82F6', // Blue-500
  '#10B981', // Emerald-500
  '#F59E0B', // Amber-500
  '#EF4444', // Red-500 (added)
  '#14B8A6', // Teal-500
  '#F97316', // Orange-500
  '#64748B'  // Slate-500
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
    case 'Approved':
    case 'Resolved':
      return 'bg-emerald-500 text-white';
    case 'Inactive':
    case 'Rejected':
      return 'bg-red-500 text-white';
    case 'Pending':
      return 'bg-amber-500 text-white';
    case 'In Progress':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-indigo-500 text-white';
  }
};

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'Active':
    case 'Approved':
    case 'Resolved':
      return 'bg-emerald-50/80 dark:bg-emerald-900/20 hover:bg-emerald-100/90 dark:hover:bg-emerald-900/30';
    case 'Inactive':
    case 'Rejected':
      return 'bg-red-50/80 dark:bg-red-900/20 hover:bg-red-100/90 dark:hover:bg-red-900/30';
    case 'Pending':
      return 'bg-amber-50/80 dark:bg-amber-900/20 hover:bg-amber-100/90 dark:hover:bg-amber-900/30';
    case 'In Progress':
      return 'bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-100/90 dark:hover:bg-blue-900/30';
    default:
      return 'bg-indigo-50/80 dark:bg-indigo-900/20 hover:bg-indigo-100/90 dark:hover:bg-indigo-900/30';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500 text-white';
    case 'Medium':
      return 'bg-amber-500 text-white';
    case 'Low':
      return 'bg-emerald-500 text-white';
    default:
      return 'bg-indigo-500 text-white';
  }
};

const MANREGADashbord= () => {
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentComplaints, setRecentComplaints] = useState<RecentComplaint[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RecentUser | null>(null);
  const [showUserStatusDropdown, setShowUserStatusDropdown] = useState(false);
  const [selectedUserForStatusUpdate, setSelectedUserForStatusUpdate] = useState<RecentUser | null>(null);
  const [showComplaintStatusDropdown, setShowComplaintStatusDropdown] = useState(false);
  const [selectedComplaintForStatusUpdate, setSelectedComplaintForStatusUpdate] = useState<RecentComplaint | null>(null);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState<number | null>(null);
  const [showComplaintPriorityDropdown, setShowComplaintPriorityDropdown] = useState(false);
  const [selectedComplaintForPriorityUpdate, setSelectedComplaintForPriorityUpdate] = useState<RecentComplaint | null>(null);
  const [kaamMagniArjData, setKaamMagniArjData] = useState<{ status: string; count: number }[]>([]);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const complaintStatusRef = useRef<HTMLDivElement>(null);
  const complaintPriorityRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<'en' | 'mr'>('en');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'info' | 'warning' | 'error' }[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newApplicationQuery, setNewApplicationQuery] = useState('');
  const [selectedApplicationForQuery, setSelectedApplicationForQuery] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [dropdownFocusedIndex, setDropdownFocusedIndex] = useState<number | null>(null);
  const [showRecentJobCardHolders, setShowRecentJobCardHolders] = useState(true);
    // Handle keyboard navigation in dropdowns
    const handleDropdownKeyDown = (e: React.KeyboardEvent, items: string[], currentValue: string, handler: (value: string) => void) => {
      const currentIndex = items.indexOf(currentValue);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        setDropdownFocusedIndex(nextIndex);
        handler(items[nextIndex]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        setDropdownFocusedIndex(prevIndex);
        handler(items[prevIndex]);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (dropdownFocusedIndex !== null) {
          handler(items[dropdownFocusedIndex]);
        }
        setShowComplaintStatusDropdown(false);
        setShowComplaintPriorityDropdown(false);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowComplaintStatusDropdown(false);
        setShowComplaintPriorityDropdown(false);
      }
    };

  // Translations
  const translations = {
    en: {
      dashboardTitle: 'MNREGA Dashboard',
      totalJobCardHolders: 'Total Job Card Holders',
      totalJobCards: 'Total Job Cards',
      activeJobCards: 'Active Job Cards',
      pendingApplications: 'Pending Applications',
      jobCardStatus: 'Job Card Status',
      kaamMagniArjStatus: 'Work Demand Application Status',
      complaintStatus: 'Complaint Status',
      recentJobCardHolders: 'Recent Job Card Holders',
      recentComplaints: 'Recent Complaints',
      name: 'Name',
      village: 'Village',
      issuedOn: 'Issued On',
      status: 'Status',
      view: 'View',
      subject: 'Subject',
      jobCardHolder: 'Job Card Holder',
      date: 'Date',
      priority: 'Priority',
      userDetails: 'Job Card Holder Details',
      close: 'Close',
      jobCardID: 'Job Card ID',
      address: 'Address',
      phone: 'Phone',
      bankAccount: 'Bank Account',
      familyMembers: 'Family Members',
      lastWorkedOn: 'Last Worked On',
      applicationsReceived: 'Applications Received',
      applicantName: 'Applicant Name',
      applicationDate: 'Application Date',
      formType: 'Form Type',
      form: 'Form',
      actions: 'Actions',
      approve: 'Approve',
      reject: 'Reject',
      query: 'Query',
      sendQuery: 'Send Query',
      noRecentUsers: 'No recent job card holders found.',
      noRecentComplaints: 'No recent complaints found.',
      noApplications: 'No applications received.',
      all: 'All',
      last30Days: 'Last 30 Days',
      thisYear: 'This Year',
      customRange: 'Custom Range',
      notifications: 'Notifications',
      markAsRead: 'Mark as Read',
      language: 'Language',
      english: 'English',
      marathi: 'Marathi',
      search: 'Search',
      clear: 'Clear',
      download: 'Download',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly'
    },
    mr: {
      dashboardTitle: 'तक्रार डॅशबोर्ड',
      totalJobCardHolders: 'एकूण तक्रारी',
      totalJobCards: 'एस्कलेटेड',
      activeJobCards: 'निकाली काढले',
      pendingApplications: 'प्रलंबित अर्ज',
      jobCardStatus: 'जॉब कार्ड स्थिती',
      kaamMagniArjStatus: 'काम मागणी अर्ज स्थिती',
      complaintStatus: 'तक्रार स्थिती',
      recentJobCardHolders: 'नवीन जॉब कार्ड धारक',
      recentComplaints: 'नवीन तक्रारी',
      name: 'नाव',
      village: 'गाव',
      issuedOn: 'जारी केल्याची तारीख',
      status: 'स्थिती',
      view: 'पहा',
      subject: 'विषय',
      jobCardHolder: 'जॉब कार्ड धारक',
      date: 'तारीख',
      priority: 'प्राधान्य',
      userDetails: 'जॉब कार्ड धारकाचा तपशील',
      close: 'बंद करा',
      jobCardID: 'जॉब कार्ड आयडी',
      address: 'पत्ता',
      phone: 'फोन',
      bankAccount: 'बँक खाते',
      familyMembers: 'कुटुंब सदस्य',
      lastWorkedOn: 'शेवटचे काम केले',
      applicationsReceived: 'प्राप्त अर्ज',
      applicantName: 'अर्जदाराचे नाव',
      applicationDate: 'अर्ज तारीख',
      formType: 'फॉर्म प्रकार',
      form: 'फॉर्म',
      actions: 'क्रिया',
      approve: 'मंजूर करा',
      reject: 'नाकारा',
      query: 'Query',
      sendQuery: 'Query पाठवा',
      noRecentUsers: 'नवीन जॉब कार्ड धारक आढळले नाहीत.',
      noRecentComplaints: 'नवीन तक्रारी आढळल्या नाहीत.',
      noApplications: 'अर्ज प्राप्त झाले नाहीत.',
      all: 'सर्व',
      last30Days: 'गेले 30 दिवस',
      thisYear: 'हे वर्ष',
      customRange: 'सानुकूल श्रेणी',
      notifications: 'सूचना',
      markAsRead: 'वाचले म्हणून चिन्हांकित करा',
      language: 'भाषा',
      english: 'इंग्रजी',
      marathi: 'मराठी',
      search: 'शोधा',
      clear: 'Clear',
      download: 'डाउनलोड',
      daily: 'दैनिक',
      weekly: 'साप्ताहिक',
      monthly: 'मासिक',
      yearly: 'वार्षिक'
    },
  };

  const t = translations[language];

  // Generate mock data on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentUsers(generateMockUsers(5));
      setRecentComplaints(generateMockComplaints(5));
      setApplications(generateMockApplications(5));
      setKaamMagniArjData([
        { status: 'Pending', count: 25 },
        { status: 'Approved', count: 60 },
        { status: 'Rejected', count: 15 },
      ]);
      setLoading(false);
      setNotifications([
        { id: '1', message: 'New user registered!', type: 'info' },
        { id: '2', message: 'Complaint received: Delay in Payment', type: 'warning' },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleViewUserClick = (user: RecentUser) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleUserStatusChange = (userId: string, newStatus: RecentUser['status']) => {
    setRecentUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );

    if (selectedUser) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }

    setShowUserStatusDropdown(false);
    addNotification(`User ${userId} status updated to ${newStatus}`, 'info');
  };

    // Enhanced handleDownloadPDF function
  const handleDownloadPDF = (pdfUrl: string, applicantName: string) => {
    if (!pdfUrl) {
      addNotification('No PDF available to download', 'warning');
      return;
    };
  
     const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `application_${applicantName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addNotification(`Downloading PDF for ${applicantName}`, 'info');
  };

  const handleComplaintStatusChange = (complaintId: string, newStatus: RecentComplaint['status']) => {
    setRecentComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      )
    );
    setShowComplaintStatusDropdown(false);
    addNotification(`Complaint ${complaintId} status updated to ${newStatus}`, 'info');
  };

  const handleComplaintPriorityChange = (complaintId: string, newPriority: RecentComplaint['priority']) => {
    setRecentComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === complaintId ? { ...complaint, priority: newPriority } : complaint
      )
    );
    setShowComplaintPriorityDropdown(false);
    addNotification(`Complaint ${complaintId} priority updated to ${newPriority}`, 'warning');
  };

  const handleApplicationStatusChange = (applicationId: string, newStatus: Application['status'], query?: string) => {
    setApplications(prevApplications =>
      prevApplications.map(app =>
        app.id === applicationId ? { ...app, status: newStatus, query } : app
      )
    );
    addNotification(`Application ${applicationId} status updated to ${newStatus}`, 'info');
  };

  const handleSendQuery = (applicationId: string) => {
    if (newApplicationQuery.trim()) {
      handleApplicationStatusChange(applicationId, 'Rejected', newApplicationQuery);
      setNewApplicationQuery('');
      setSelectedApplicationForQuery(null);
    }
  };

  const addNotification = (message: string, type: 'info' | 'warning' | 'error') => {
    const id = crypto.randomUUID();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const filteredApplications = applications.filter(application =>
    Object.values(application).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  const handleTimeRangeChange = (range: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    setTimeRange(range);
    // Update dateRange based on selected range
    const today = new Date();
    switch (range) {
      case 'daily':
        setDateRange({ from: today, to: today });
        break;
      case 'weekly':
        setDateRange({ from: subDays(today, 7), to: today });
        break;
      case 'monthly':
        setDateRange({ from: subMonths(today, 1), to: today });
        break;
      case 'yearly':
        setDateRange({ from: subYears(today, 1), to: today });
        break;
    }
  };

  // Donut Chart settings
  const donutColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const RADIAN = Math.PI / 180;
  // Updated renderCustomizedLabel with better visibility
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-bold drop-shadow-md"
        stroke="#333"
        strokeWidth={0.5}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.dashboardTitle}</h1>
        <div className="flex items-center gap-4">
          {/* Language Toggle with color */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 p-1 rounded-full shadow">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${language === 'en' ? 'bg-white text-indigo-600 shadow-md' : 'text-white hover:bg-white/10'}`}
            >
              {t.english}
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${language === 'mr' ? 'bg-white text-indigo-600 shadow-md' : 'text-white hover:bg-white/10'}`}
            >
              {t.marathi}
            </button>
          </div>

          {/* Time Range Selector with color */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 p-1 rounded-full shadow">
            <button
              className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${timeRange === 'daily' ? 'bg-white text-blue-600 font-bold shadow-md' : 'text-white hover:bg-white/20'}`}
              onClick={() => handleTimeRangeChange('daily')}
            >
              {t.daily}
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${timeRange === 'weekly' ? 'bg-white text-blue-600 font-bold shadow-md' : 'text-white hover:bg-white/20'}`}
              onClick={() => handleTimeRangeChange('weekly')}
            >
              {t.weekly}
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${timeRange === 'monthly' ? 'bg-white text-blue-600 font-bold shadow-md' : 'text-white hover:bg-white/20'}`}
              onClick={() => handleTimeRangeChange('monthly')}
            >
              {t.monthly}
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${timeRange === 'yearly' ? 'bg-white text-blue-600 font-bold shadow-md' : 'text-white hover:bg-white/20'}`}
              onClick={() => handleTimeRangeChange('yearly')}
            >
              {t.yearly}
            </button>
          </div>

          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-md"
              />
            </PopoverContent>
          </Popover>

          {/* Notifications Bell with color */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-full p-2 hover:from-yellow-500 hover:to-yellow-600 shadow-md"
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-ping" />
              )}
            </Button>
            {showNotifications && (
              <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.notifications}</h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto max-h-60">
                  {notifications.map(notification => (
                    <div key={notification.id} className="px-4 py-2 flex items-start gap-3">
                      {notification.type === 'info' && <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
                      {notification.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                      {notification.type === 'error' && <XCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {notification.message}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNotification(notification.id)}
                        className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <XCircle className="h-4 w-4" />
                        <span className="sr-only">Mark as Read</span>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <Button
                    variant="outline"
                    onClick={markAllNotificationsAsRead}
                    className="w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                  >
                    {t.markAsRead}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards (unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-blue-800 dark:text-blue-200 flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
              {t.totalJobCardHolders}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">Total number of registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,250</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-100 to-green-300 dark:from-green-900 dark:to-green-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-green-800 dark:text-green-200 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
              {t.totalJobCards}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">Total number of job cards issued</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,500</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              {t.activeJobCards}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">Number of active job cards</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,100</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-100 to-red-300 dark:from-red-900 dark:to-red-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-red-800 dark:text-red-200 flex items-center">
              <XCircle className="mr-2 h-5 w-5 text-red-600 dark:text-red-400" />
              {t.pendingApplications}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">Number of pending job card applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">50</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Card Status Donut Chart */}
<Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
  <CardHeader>
  <CardTitle className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 flex items-center">
  <PieChart className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
  {t.jobCardStatus}
</CardTitle>

    <CardDescription className="text-gray-600 dark:text-gray-300 font-medium">
    Distribution of complaint statuses
    </CardDescription>
  </CardHeader>
  <CardContent className="flex justify-center">
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={[
            { name: 'Active', count: recentUsers.filter(u => u.status === 'Active').length },
            { name: 'Inactive', count: recentUsers.filter(u => u.status === 'Inactive').length },
            { name: 'Pending', count: recentUsers.filter(u => u.status === 'Pending').length },
          ]}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={60}
          fill="#8884d8"
          dataKey="count"
          animationBegin={0}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {[{ name: 'Active', count: recentUsers.filter(u => u.status === 'Active').length },
          { name: 'Inactive', count: recentUsers.filter(u => u.status === 'Inactive').length },
          { name: 'Pending', count: recentUsers.filter(u => u.status === 'Pending').length }].map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} 
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ 
            backgroundColor: CHART_COLORS.dark, 
            borderColor: CHART_COLORS.slate,
            color: CHART_COLORS.light,
            fontFamily: 'Inter, sans-serif',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            fontWeight: '600'
          }}
          labelStyle={{ fontWeight: 'bold', fontFamily: 'Inter, sans-serif', color: CHART_COLORS.light }}
          itemStyle={{ fontWeight: '600', fontFamily: 'Inter, sans-serif', color: CHART_COLORS.light }}
        />
        <Legend
          wrapperStyle={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: '600',
            color: CHART_COLORS.dark,
            fontSize: '14px'
          }}
          formatter={(value, entry, index) => {
            return (
              <span className="text-gray-800 dark:text-gray-200">
                {value}
              </span>
            );
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

{/* Kaam Magni Arj Donut Chart */}
<Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
  <CardHeader>
  <CardTitle className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 flex items-center">
  <PieChart className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
  {t.kaamMagniArjStatus}
</CardTitle>
    <CardDescription className="text-gray-600 dark:text-gray-300 font-medium">
    Distribution of complaints by category
    </CardDescription>
  </CardHeader>
  <CardContent className="flex justify-center">
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={kaamMagniArjData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={60}
          fill="#8884d8"
          dataKey="count"
          animationBegin={200}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {kaamMagniArjData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={PIE_CHART_COLORS[(index + 2) % PIE_CHART_COLORS.length]} 
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ 
            backgroundColor: CHART_COLORS.dark, 
            borderColor: CHART_COLORS.slate,
            color: CHART_COLORS.light,
            fontFamily: 'Inter, sans-serif',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            fontWeight: '600'
          }}
          labelStyle={{ fontWeight: 'bold', fontFamily: 'Inter, sans-serif', color: CHART_COLORS.light }}
          itemStyle={{ fontWeight: '600', fontFamily: 'Inter, sans-serif', color: CHART_COLORS.light }}
        />
        <Legend
          wrapperStyle={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: '600',
            color: CHART_COLORS.dark,
            fontSize: '14px'
          }}
          formatter={(value, entry, index) => {
            return (
              <span className="text-gray-800 dark:text-gray-200">
                {value}
              </span>
            );
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

      {/* Recent Job Card Holders Table */}
      <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Users className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              {t.recentJobCardHolders}
            </CardTitle>
            {recentUsers.length > 0 && (
              <Link to="/admin/job-cards" className="text-sm text-indigo-600 hover:underline font-medium dark:text-indigo-400">
                View All
              </Link>
            )}
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300 font-medium">
            List of complaints with details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-600 dark:text-gray-300 font-medium">Loading recent job card holders...</p>
          ) : recentUsers.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 font-medium">{t.noRecentUsers}</p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="bg-indigo-50 dark:bg-indigo-900/20">
                  <TableRow>
                    <TableHead className="text-left text-sm font-semibold text-indigo-800 dark:text-indigo-200 uppercase tracking-wider">
                      {t.jobCardID}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-indigo-800 dark:text-indigo-200 uppercase tracking-wider">
                      {t.name}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-indigo-800 dark:text-indigo-200 uppercase tracking-wider">
                      {t.village}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-indigo-800 dark:text-indigo-200 uppercase tracking-wider">
                      {t.issuedOn}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-indigo-800 dark:text-indigo-200 uppercase tracking-wider">
                      {t.status}
                    </TableHead>
                    <TableHead className="text-right text-sm font-semibold text-indigo-800 dark:text-indigo-200 uppercase tracking-wider">
                      {t.view}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map(user => (
                    <TableRow 
                      key={user.id} 
                      className={`${getStatusBgColor(user.status)} hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10`}
                    >
                      <TableCell className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.id}</TableCell>
                      <TableCell className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.name}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.village}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.jobCardIssuedOn}</TableCell>
                      <TableCell>
                        <div className="relative inline-block">
                          <button
                            onClick={() => {
                              setSelectedUserForStatusUpdate(user);
                              setShowUserStatusDropdown(!showUserStatusDropdown);
                              setSelectedStatusIndex(['Pending', 'Active', 'Inactive'].indexOf(user.status));
                            }}
                            className={`inline-flex items-center justify-between px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                          >
                            {user.status}
                            <ChevronDown className="ml-1 h-3 w-3" />
                          </button>
                          {showUserStatusDropdown && selectedUserForStatusUpdate?.id === user.id && (
                            <div 
                              className="absolute left-0 mt-1 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10"
                              ref={statusDropdownRef}
                            >
                              {['Pending', 'Active', 'Inactive'].map((status, index) => (
                                <button
                                  key={status}
                                  className={`w-full text-left px-3 py-2 text-sm ${
                                    index === selectedStatusIndex
                                      ? 'bg-indigo-100 dark:bg-indigo-900'
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`}
                                  onClick={() => handleUserStatusChange(user.id, status as RecentUser['status'])}
                                >
                                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                    status === 'Active' ? 'bg-emerald-500' :
                                    status === 'Inactive' ? 'bg-red-500' :
                                    'bg-amber-500'
                                  }`}></span>
                                  {status}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUserClick(user)}
                          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold"
                        >
                          <Eye className="h-5 w-5" />
                          <span className="sr-only">{t.view}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
 {/* Recent Complaints Table with enhanced dropdowns */}
 <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <FileText className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
          {t.recentComplaints}
        </CardTitle>
        {recentComplaints.length > 0 && (
          <Link to="/admin/complaints" className="text-sm text-amber-600 hover:underline font-medium dark:text-amber-400">
            View All
          </Link>
        )}
      </div>
      <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">
        List of recently received complaints
      </CardDescription>
    </CardHeader>
    <CardContent>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300 font-medium">Loading recent complaints...</p>
      ) : recentComplaints.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 font-medium">{t.noRecentComplaints}</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-amber-50 dark:bg-amber-900/20">
              <TableRow>
                <TableHead className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.subject}</TableHead>
                <TableHead className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.jobCardHolder}</TableHead>
                <TableHead className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.village}</TableHead>
                <TableHead className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.date}</TableHead>
                <TableHead className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.status}</TableHead>
                <TableHead className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t.priority}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentComplaints.map(complaint => (
                <TableRow 
                  key={complaint.id} 
                  className={`${getStatusBgColor(complaint.status)} hover:bg-amber-50/50 dark:hover:bg-amber-900/10`}
                >
                  <TableCell className="text-sm font-semibold text-gray-800 dark:text-gray-200">{complaint.subject}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-700 dark:text-gray-300">{complaint.jobCardHolder}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-700 dark:text-gray-300">{complaint.village}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-700 dark:text-gray-300">{complaint.date}</TableCell>
                  <TableCell>
                    <div className="relative" ref={complaintStatusRef}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedComplaintForStatusUpdate(complaint);
                          setShowComplaintStatusDropdown(!showComplaintStatusDropdown);
                          setDropdownFocusedIndex(null);
                        }}
                        className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}
                      >
                        {complaint.status}
                      </Button>
                      {showComplaintStatusDropdown && selectedComplaintForStatusUpdate?.id === complaint.id && (
                        <div 
                          className="absolute left-0 mt-1 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10"
                          ref={complaintStatusRef}
                        >
                          {['Pending', 'In Progress', 'Resolved'].map((status, index) => (
                            <div
                              key={status}
                              className={`px-3 py-2 text-sm cursor-pointer ${
                                dropdownFocusedIndex === index 
                                  ? 'bg-indigo-100 dark:bg-indigo-900' 
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => handleComplaintStatusChange(complaint.id, status as RecentComplaint['status'])}
                              onKeyDown={(e) => handleDropdownKeyDown(
                                e, 
                                ['Pending', 'In Progress', 'Resolved'], 
                                complaint.status, 
                                (newStatus) => handleComplaintStatusChange(complaint.id, newStatus as RecentComplaint['status'])
                              )}
                              tabIndex={0}
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="relative" ref={complaintPriorityRef}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedComplaintForPriorityUpdate(complaint);
                          setShowComplaintPriorityDropdown(!showComplaintPriorityDropdown);
                          setDropdownFocusedIndex(null);
                        }}
                        className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(complaint.priority)}`}
                      >
                        {complaint.priority}
                      </Button>
                      {showComplaintPriorityDropdown && selectedComplaintForPriorityUpdate?.id === complaint.id && (
                        <div 
                          className="absolute left-0 mt-1 w-28 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10"
                          ref={complaintPriorityRef}
                        >
                          {['High', 'Medium', 'Low'].map((priority, index) => (
                            <div
                              key={priority}
                              className={`px-3 py-2 text-sm cursor-pointer ${
                                dropdownFocusedIndex === index 
                                  ? 'bg-indigo-100 dark:bg-indigo-900' 
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => handleComplaintPriorityChange(complaint.id, priority as RecentComplaint['priority'])}
                              onKeyDown={(e) => handleDropdownKeyDown(
                                e, 
                                ['High', 'Medium', 'Low'], 
                                complaint.priority, 
                                (newPriority) => handleComplaintPriorityChange(complaint.id, newPriority as RecentComplaint['priority'])
                              )}
                              tabIndex={0}
                            >
                              {priority}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </CardContent>
  </Card>
  
      {/* Applications Received Table */}
      <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <FileText className="mr-2 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              {t.applicationsReceived}
            </CardTitle>
            {applications.length > 0 && (
              <Link to="/admin/applications" className="text-sm text-emerald-600 hover:underline font-medium dark:text-emerald-400">
                View All
              </Link>
            )}
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300 font-medium">
            List of recently received applications for MNREGA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder={t.search}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {loading ? (
            <p className="text-gray-600 dark:text-gray-300 font-medium">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 font-medium">{t.noApplications}</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-emerald-50 dark:bg-emerald-900/20">
                  <TableRow>
                    <TableHead className="text-left text-sm font-semibold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      {t.applicantName}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      {t.village}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      {t.applicationDate}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      {t.formType}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      {t.status}
                    </TableHead>
                    <TableHead className="text-left text-sm font-semibold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      Upload PDF
                    </TableHead>
                    <TableHead className="text-right text-sm font-semibold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
                      {t.actions}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map(application => (
                    <TableRow 
                      key={application.id} 
                      className={`${getStatusBgColor(application.status)} hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10`}
                    >
                      <TableCell className="text-sm font-semibold text-gray-800 dark:text-gray-200">{application.applicantName}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-700 dark:text-gray-300">{application.village}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-700 dark:text-gray-300">{application.applicationDate}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-700 dark:text-gray-300">{application.formType}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {application.uploadedPdf ? (
                            <a 
                              href={application.uploadedPdf} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View PDF
                            </a>
                          ) : (
                            <div className="relative">
                              <label className="cursor-pointer">
                                <input 
                                  type="file" 
                                  accept=".pdf"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      // In a real app, you would upload the file here
                                      const file = e.target.files[0];
                                      const fileUrl = URL.createObjectURL(file);
                                      
                                      setApplications(prev => 
                                        prev.map(app => 
                                          app.id === application.id 
                                            ? { ...app, uploadedPdf: fileUrl } 
                                            : app
                                        )
                                      );
                                      
                                      addNotification(`PDF uploaded for ${application.applicantName}`, 'info');
                                    }
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-sm px-3 py-1 flex items-center"
                                >
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload
                                </Button>
                              </label>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(application.formUrl, '_blank')}
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {t.view}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadPDF(application.uploadedPdf || '', application.applicantName)}
                          className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          {t.download}
                        </Button>
                        {application.status === 'Pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApplicationStatusChange(application.id, 'Approved')}
                              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {t.approve}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApplicationForQuery(application)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              {t.reject}
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      </div>

      {/* Query Modal */}
      {selectedApplicationForQuery && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="relative w-full max-w-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t.sendQuery}
                </CardTitle>
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setSelectedApplicationForQuery(null)}
                >
                  <XCircle className="h-6 w-6" />
                  <span className="sr-only">{t.close}</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Please provide reason for rejecting application {selectedApplicationForQuery.id}
                  </p>
                  <Textarea
                    value={newApplicationQuery}
                    onChange={(e) => setNewApplicationQuery(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <div className="p-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedApplicationForQuery(null)}
                >
                  {t.close}
                </Button>
                <Button
                  onClick={() => handleSendQuery(selectedApplicationForQuery.id)}
                  disabled={!newApplicationQuery.trim()}
                >
                  {t.sendQuery}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    
  {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="relative w-full max-w-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t.userDetails}
                </CardTitle>
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => {
                    setShowUserModal(false);
                    setShowUserStatusDropdown(false);
                  }}
                >
                  <XCircle className="h-6 w-6" />
                  <span className="sr-only">{t.close}</span>
                </Button>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.jobCardID}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.name}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.village}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.village}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.issuedOn}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.jobCardIssuedOn}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.address}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.details?.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.phone}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.details?.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.bankAccount}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.details?.bankAccount}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.familyMembers}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.details?.familyMembers}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.lastWorkedOn}</dt>
                  <dd className="text-gray-900 dark:text-white">{selectedUser.details?.lastWorkedOn}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.status}</dt>
                  <dd className="relative" ref={statusDropdownRef}>
                    <div className="relative inline-block">
                      <button
                        onClick={() => {
                          setSelectedUserForStatusUpdate(selectedUser);
                          setShowUserStatusDropdown(!showUserStatusDropdown);
                          setSelectedStatusIndex(['Pending', 'Active', 'Inactive'].indexOf(selectedUser.status));
                        }}
                        className={`inline-flex items-center justify-between px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)} text-white`}
                      >
                        {selectedUser.status}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                      {showUserStatusDropdown && selectedUserForStatusUpdate?.id === selectedUser.id && (
                        <div 
                          className="absolute left-0 mt-1 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10"
                          ref={statusDropdownRef}
                        >
                          {['Pending', 'Active', 'Inactive'].map((status, index) => (
                            <button
                              key={status}
                              className={`w-full text-left px-3 py-2 text-sm flex items-center ${
                                index === selectedStatusIndex
                                  ? 'bg-indigo-100 dark:bg-indigo-900'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => handleUserStatusChange(selectedUser.id, status as RecentUser['status'])}
                            >
                              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                status === 'Active' ? 'bg-emerald-500' :
                                status === 'Inactive' ? 'bg-red-500' :
                                'bg-amber-500'
                              }`}></span>
                              {status}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </dd>
                </div>
              </CardContent>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUserModal(false);
                    setShowUserStatusDropdown(false);
                  }}
                >
                  {t.close}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
      </div>
      );
    };
    
    export default MANREGADashbord;