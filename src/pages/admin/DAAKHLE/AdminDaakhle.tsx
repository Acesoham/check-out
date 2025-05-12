import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart,
  PieChart,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Bell,
  Download,
  Search,
  AlertTriangle,
  Languages,
  Upload,
  Eye
} from 'lucide-react';
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";


// Mock Data for Certificates
const certificateTypes = [
  "BIRTH CERTIFICATE APPLICATION",
  "RESIDENT CERTIFICATE APPLICATION",
  "PROPERTY CERTIFICATE (ASSESSMENT EXTRACT)",
  "BUILDING PERMIT",
  "BUSINESS NON-EXEMPTION CERTIFICATE",
  "PROPERTY TRANSFER APPLICATION",
  "APPLICATION FOR MARRIAGE CERTIFICATE",
  "CERTIFICATE OF NO PENDING DUES",
  "DEATH CERTIFICATE APPLICATION",
  "AGE CERTIFICATE FOR THE NIRADHAR YOJANA",
  "DIGITAL SIGNED PROPERTY CARD",
  "DIGITALLY SIGNED 7/12",
  "DIGITALLY SIGNED FIELD 8A ",
];

// Marathi translations
const marathiTranslations: Record<string, string> = {
  "Zhilha Parishad Gramin Vibhage": "जिल्हा परिषद ग्रामीण विभाग",
  "Certificates Dashboard": "प्रमाणपत्र डॅशबोर्ड",
  "Search certificates...": "प्रमाणपत्र शोधा...",
  "Total Certificates": "एकूण प्रमाणपत्रे",
  "Approved Certificates": "मंजूर प्रमाणपत्रे",
  "Pending Certificates": "प्रलंबित प्रमाणपत्रे",
  "Rejected Certificates": "नाकारलेले प्रमाणपत्रे",
  "Certificate Status Overview": "प्रमाणपत्र स्थितीचा आढावा",
  "Certificate Distribution": "प्रमाणपत्र वितरण",
  "Quick Stats": "द्रुत आकडेवारी",
  "Applications": "अर्ज",
  "List of recent applications with status": "स्थितीसह अलीकडील अर्जांची यादी",
  "Application ID": "अर्ज आयडी",
  "Applicant Name": "अर्जदाराचे नाव",
  "Date": "तारीख",
  "Status": "स्थिती",
  "Actions": "क्रिया",
  "View": "पहा",
  "Send Alert": "सूचना पाठवा",
  "Pending": "प्रलंबित",
  "Approved": "मंजूर",
  "Rejected": "नाकारले",
  "Cancel": "रद्द करा",
  "Documents": "दस्तऐवज",
  "Update Status": "स्थिती अद्यतनित करा",
  "Notifications": "सूचना",
  "English": "इंग्रजी",
  "Marathi": "मराठी",
  "BIRTH CERTIFICATE APPLICATION" : 'जन्म प्रमाणपत्रासाठी अर्ज',
"RESIDENT CERTIFICATE APPLICATION" : 'राहिवासी प्रमाणपत्रासाठी अर्ज',
"PROPERTY CERTIFICATE (ASSESSMENT EXTRACT)" : 'मालमत्ता प्रमाणपत्र (मूल्यमापन उतारा)',
"BUILDING PERMIT" : 'बांधकाम परवाना',
"BUSINESS NON-EXEMPTION CERTIFICATE" : 'व्यवसाय अपवर्जन नसलेले प्रमाणपत्र',
"PROPERTY TRANSFER APPLICATION" : 'मालमत्ता हस्तांतरणासाठी अर्ज',
"APPLICATION FOR MARRIAGE CERTIFICATE" : 'विवाह प्रमाणपत्रासाठी अर्ज',
"CERTIFICATE OF NO PENDING DUES" : ' थकबाकी नसल्याचे प्रमाणपत्र',
"DEATH CERTIFICATE APPLICATION" : 'मृत्यू प्रमाणपत्रासाठी अर्ज',
"AGE CERTIFICATE FOR THE NIRADHAR YOJANA" : 'निराधार योजनेसाठी वयाचे प्रमाणपत्र',
"DIGITAL SIGNED PROPERTY CARD" : 'डिजिटल स्वाक्षरीत मालमत्ता कार्ड',
"DIGITALLY SIGNED 7/12" : 'डिजिटल स्वाक्षरीत ७/१२ उतारा',
"DIGITALLY SIGNED FIELD 8A" : 'डिजिटल स्वाक्षरीत जमीन फॉर्म ८अ',
};

// Mock document data
const mockDocuments: Record<string, string[]> = {
  "APP-10001": ["Aadhar Card", "Birth Proof"],
  "APP-10002": ["Residence Proof", "Income Certificate"],
  "APP-10003": ["Property Documents", "Tax Receipts"],
  "APP-10004": ["Marriage Proof", "Affidavit"]
};

const generateMockCertificateData = () => {
  return certificateTypes.map(type => ({
    name: type,
    pending: Math.floor(Math.random() * 50) + 10,
    approved: Math.floor(Math.random() * 100) + 20,
    rejected: Math.floor(Math.random() * 30) + 5,
  }));
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-500 text-white';
    case 'Rejected':
      return 'bg-red-500 text-white';
    case 'Pending':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getStatusRowColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-50 hover:bg-green-100';
    case 'Rejected':
      return 'bg-red-50 hover:bg-red-100';
    case 'Pending':
      return 'bg-yellow-50 hover:bg-yellow-100';
    default:
      return '';
  }
};

const CertificatesDashboard = () => {
  const [certificateData, setCertificateData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [language, setLanguage] = useState<'english' | 'marathi'>('english');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [applications, setApplications] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'alert' | 'documents'>('alert');
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadError, setUploadError] = useState<Record<string, string>>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
   const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Generate mock data on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = generateMockCertificateData();
      setCertificateData(data);
      
      // Generate mock applications
      const apps = [];
      data.forEach((cert, index) => {
        apps.push(
          { id: `APP-${1000 + index}1`, name: 'Rahul Sharma', date: '2024-01-15', status: 'Pending', certificate: cert.name, documents: ['Aadhar Card', 'Proof of Residence'] },
          { id: `APP-${1000 + index}2`, name: 'Priya Patel', date: '2024-01-10', status: 'Approved', certificate: cert.name, documents: ['Aadhar Card', 'Birth Proof'] },
          { id: `APP-${1000 + index}3`, name: 'Amit Singh', date: '2024-01-05', status: 'Rejected', certificate: cert.name, documents: ['PAN Card', 'Property Documents'] },
          { id: `APP-${1000 + index}4`, name: 'Neha Gupta', date: '2024-01-01', status: 'Pending', certificate: cert.name, documents: ['Passport', 'Address Proof'] }
        );
      });
      setApplications(apps);
      
      setLoading(false);
      // Add some mock notifications
      setNotifications([
        "New application received for Birth Certificate",
        "Property Transfer application approved",
        "3 pending applications need review"
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCertificates = certificateData.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendAlert = (certificate: any) => {
    if (alertMessage.trim()) {
      // In a real app, you would send this alert to the user
      console.log(`Alert sent for ${certificate.name}: ${alertMessage}`);
      setAlertMessage('');
      setSelectedCertificate(null);
      // Add to notifications
      setNotifications(prev => [
        `Alert sent to ${certificate.application.name}: ${alertMessage}`,
        ...prev
      ]);
    }
  };

  const handleStatusUpdate = (appId: string, newStatus: string) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    // Add to notifications
    setNotifications(prev => [
      `Status updated for ${appId} to ${newStatus}`,
      ...prev
    ]);
  };

  const handleUploadClick = (appId: string) => {
    if (fileInputRefs.current[appId]) {
      fileInputRefs.current[appId]?.click();
    }
  };

  const handleFileUpload = async (appId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setUploadError(prev => ({
        ...prev,
        [appId]: 'Please upload a PDF file'
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(prev => ({
        ...prev,
        [appId]: 'File size should be less than 5MB'
      }));
      return;
    }

   try {
      setUploading(prev => ({ ...prev, [appId]: true }));
      setUploadError(prev => ({ ...prev, [appId]: '' }));

    // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the file
      setUploadedFiles(prev => ({
        ...prev,
        [appId]: file
      }));

       // Show success message
      setUploadSuccessMessage(`PDF "${file.name}" uploaded successfully for application ${appId}`);
      setShowSuccessDialog(true);

      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        const base64String = reader.result as string;
        
        // Create a unique storage key using the application ID
        const storageKey = `certificate_pdf_${appId}`;
        
        // Store the PDF data
        localStorage.setItem(storageKey, base64String);
        
        // Store metadata with additional information
        const metadata = {
          fileName: file.name,
          uploadDate: new Date().toISOString(),
          fileSize: file.size,
          fileType: file.type,
          applicationId: appId,
          certificateType: 'Birth Certificate', // You can make this dynamic based on the certificate type
          status: 'uploaded'
        };
        localStorage.setItem(`${storageKey}_metadata`, JSON.stringify(metadata));

        // Update the UI state
        setUploadedFiles(prev => ({
          ...prev,
          [appId]: file
        }));

        // Show success dialog
        setUploadSuccessMessage(`PDF "${file.name}" uploaded successfully for application ${appId}`);
        setShowSuccessDialog(true);

        // Add success notification
        setNotifications(prev => [
          `File uploaded successfully for ${appId}: ${file.name}`,
          ...prev
        ]);

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };

      reader.onerror = () => {
        throw new Error('Failed to read file');
      };

    } catch (error) {
      setUploadError(prev => ({
        ...prev,
        [appId]: 'Failed to upload file. Please try again.'
      }));
      
       // Add error notification
      setNotifications(prev => [
        `Failed to upload file for ${appId}: ${file.name}`,
        ...prev
      ]);
    } finally {
      setUploading(prev => ({ ...prev, [appId]: false }));
    }
  };

  const translate = (key: string) => {
    return language === 'marathi' ? marathiTranslations[key] || key : key;
  };

    const handleDownloadPdf = (appId: string) => {
    const file = uploadedFiles[appId];
    if (!file) return;
        // Create a temporary URL for the file
    const url = URL.createObjectURL(file);
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name || `certificate_${appId}.pdf`;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Subtle colors for charts
  const pieColors = [ 
   '#8B5CF6', // Violet-500
  '#3B82F6', // Blue-500
  '#10B981', // Emerald-500
  '#F59E0B', // Amber-500
  '#EF4444', // Red-500 (added)
  '#14B8A6', // Teal-500
  '#F97316', // Orange-500
  '#64748B'  // Slate-500
];
  const barColors = [ 
  '#3B82F6', // Blue-500
  '#10B981', // Emerald-500
  '#F59E0B', // Amber-500
  '#EF4444', // Red-500 (added)
  '#14B8A6', // Teal-500
  '#F97316', // Orange-500
  '#64748B'  // Slate-500
  ]

  return (
    <div className="min-h-screen">
      {/* Main Content - now takes full width */}
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{translate("CERTIFICATE DASHBORD")}</h1>
          
          <div className="flex items-center space-x-4">

{/* Language Toggle with color */}
<div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 p-1 rounded-full shadow">
  <button
    onClick={() => setLanguage('english')}
    className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${language === 'english' ? 'bg-white text-indigo-600 shadow-md' : 'text-white hover:bg-white/10'}`}
  >
    {translate("English")}
  </button>
  <button
    onClick={() => setLanguage('marathi')}
    className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${language === 'marathi' ? 'bg-white text-indigo-600 shadow-md' : 'text-white hover:bg-white/10'}`}
  >
    {translate("Marathi")}
  </button>
</div>
            {/* Notification Button */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                              className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-full p-2 hover:from-yellow-500 hover:to-yellow-600 shadow-md"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ">
                    {notifications.length}
                  </span>
                )}
              </Button>
              
              {showNotifications && (
              <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium">{translate("Notifications")}</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((note, i) => (
                        <div key={i} className="p-2 border-b border-gray-100 text-sm">
                          {note}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-500">{translate("No new notifications")}</div>
                    )}
                  </div>
                </div>
                )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder={translate("Search certificates...")}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Overall Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                {translate("Total Certificates")}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">Total number of registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">
                {certificateData.reduce((sum, cert) => sum + cert.pending + cert.approved + cert.rejected, 0)}
              </p>
            </CardContent>
          </Card>

        <Card className="bg-gradient-to-r from-green-100 to-green-300 dark:from-green-900 dark:to-green-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-green-800 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                {translate("Approved Certificates")}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 font-medium">Total number of Approved Certificate </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">
                {certificateData.reduce((sum, cert) => sum + cert.approved, 0)}
              </p>
            </CardContent>
          </Card>

        <Card className="bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-red-800 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                {translate("Pending Certificates")}
              </CardTitle>
             <CardDescription className="text-gray-600 dark:text-gray-400 font-medium"> Total Number of Pending Application </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">
                {certificateData.reduce((sum, cert) => sum + cert.pending, 0)}
              </p>
            </CardContent>
          </Card>

        <Card className="bg-gradient-to-r from-red-100 to-red-300 dark:from-red-900 dark:to-red-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-red-800 flex items-center">
                <XCircle className="mr-2 h-5 w-5" />
                {translate("Rejected Certificates")}
              </CardTitle>
             <CardDescription className="text-gray-600 dark:text-gray-400 font-medium"> Total Number of Rejected Application </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">
                {certificateData.reduce((sum, cert) => sum + cert.rejected, 0)}
              </p>
            </CardContent>
          </Card>

          
        </div>

        {/* Overall Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader>
<CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
  <BarChart className="mr-2 h-5 w-5 text-blue-500" />
  {translate("Certificate Status Overview")}
</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={certificateData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={150}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="pending" 
                    name={translate("Pending")} 
                    fill={barColors[2]}
                  />
                  <Bar 
                    dataKey="approved" 
                    name={translate("Approved")} 
                    fill={barColors[1]}
                  />
                  <Bar 
                    dataKey="rejected" 
                    name={translate("Rejected")} 
                    fill={barColors[0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-green-500" />
                {translate("Certificate Distribution")}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={[
                      { name: translate('Pending'), value: certificateData.reduce((sum, cert) => sum + cert.pending, 0) },
                      { name: translate('Approved'), value: certificateData.reduce((sum, cert) => sum + cert.approved, 0) },
                      { name: translate('Rejected'), value: certificateData.reduce((sum, cert) => sum + cert.rejected, 0) },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill={pieColors[2]} />
                    <Cell fill={pieColors[1]} />
                    <Cell fill={pieColors[4]} />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Individual Certificate Sections */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">{translate("Loading certificate data...")}</p>
          </div>
        ) : (
          filteredCertificates.map((certificate, index) => {
            const certApplications = applications.filter(app => app.certificate === certificate.name);
            
            return (
              <section 
                key={index} 
                id={certificate.name.replace(/\s+/g, '-').toLowerCase()}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                {translate(certificate.name)}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Certificate Charts */}
                  <Card className="shadow-lg border border-gray-200 lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {certificate.name} {translate("Status")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart
                              data={[
                                { name: translate('Pending'), value: certificate.pending },
                                { name: translate('Approved'), value: certificate.approved },
                                { name: translate('Rejected'), value: certificate.rejected },
                              ]}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="value" fill={pieColors[0]} />
                            </RechartsBarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={[
                                  { name: translate('Pending'), value: certificate.pending },
                                  { name: translate('Approved'), value: certificate.approved },
                                  { name: translate('Rejected'), value: certificate.rejected },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                <Cell fill={pieColors[2]} />
                                <Cell fill={pieColors[1]} />
                                <Cell fill={pieColors[4]} />
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certificate Summary */}
                  <Card className="shadow-lg border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {translate("Quick Stats")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">{translate("Total Applications")}</p>
                          <p className="text-xl font-bold">
                            {certificate.pending + certificate.approved + certificate.rejected}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{translate("Pending")}</p>
                          <p className="text-xl font-bold text-yellow-600">
                            {certificate.pending}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{translate("Approved")}</p>
                          <p className="text-xl font-bold text-green-600">
                            {certificate.approved}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{translate("Rejected")}</p>
                          <p className="text-xl font-bold text-red-600">
                            {certificate.rejected}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

  {/* Certificate Applications Table */}
  <Card className="shadow-lg border border-gray-200">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-900">
        {certificate.name} {translate("")}
      </CardTitle>
      <CardDescription>
        {translate("List of recent applications with status")}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="bg-blue-50 dark:bg-blue-900/30 text-left">
              <TableHead className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-tl-lg">
                {translate("Application ID")}
              </TableHead>
              <TableHead className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {translate("Applicant Name")}
              </TableHead>
              <TableHead className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {translate("Date")}
              </TableHead>
              <TableHead className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {translate("Status")}
              </TableHead>
              <TableHead className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {translate("Upload PDF")}
              </TableHead>
              <TableHead className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-tr-lg text-right">
                {translate("Actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {certApplications.map((app, appIndex) => (
              <TableRow 
                key={appIndex} 
                className={`${getStatusRowColor(app.status)} transition-colors`}
              >
                <TableCell className="p-4 text-lg font-medium text-gray-900 dark:text-white">
                  {app.id}
                </TableCell>
                <TableCell className="p-4 text-lg font-medium text-gray-900 dark:text-white">
                  {app.name}
                </TableCell>
                <TableCell className="p-4 text-lg font-medium text-gray-900 dark:text-white">
                  {app.date}
                </TableCell>
                <TableCell className="p-4">
                  <Select 
                    value={app.status}
                    onValueChange={(value) => handleStatusUpdate(app.id, value)}
                  >
                    <SelectTrigger className={`w-full text-lg ${
                      app.status === 'Rejected' 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : app.status === 'Approved' 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-yellow-500 hover:bg-yellow-700 text-white'
                    }`}>
                      <SelectValue placeholder={translate(app.status)} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending" className="text-yellow-300">
  {translate("Pending")}
</SelectItem>
<SelectItem value="Approved" className="text-green-600">
  {translate("Approved")}
</SelectItem>
<SelectItem value="Rejected" className="text-red-600">
  {translate("Rejected")}
</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        ref={el => fileInputRefs.current[app.id] = el}
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(app.id, e)}
                        disabled={uploading[app.id]}
                      />
                      <Button
                        size="lg"
                        variant="outline"
                        className={`text-lg text-blue-600 hover:text-blue-700 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                          uploading[app.id] ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handleUploadClick(app.id)}
                        disabled={uploading[app.id]}
                      >
                        {uploading[app.id] ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            {translate("Uploading...")}
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            {uploadedFiles[app.id] ? uploadedFiles[app.id].name : translate("Upload PDF")}
                          </>
                        )}
                      </Button>
                      {uploadedFiles[app.id] && (
                        <Button
                          size="lg"
                          variant="outline"
                          className="text-lg text-green-600 hover:text-green-700 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                          onClick={() => handleDownloadPdf(app.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {translate("Download")}
                        </Button>
                      )}
                    </div>
                    {uploadError[app.id] && (
                      <p className="text-sm text-red-500">{uploadError[app.id]}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-4 text-right space-x-2">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg text-blue-600 hover:text-blue-700 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => {
                      setSelectedCertificate({
                        ...certificate, 
                        application: app
                      });
                      setViewMode('documents');
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {translate("View")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg text-purple-600 hover:text-purple-700 border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => {
                      setSelectedCertificate({
                        ...certificate, 
                        application: app
                      });
                      setViewMode('alert');
                    }}
                  >
                    {translate("Send Alert")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
              </section>
            );
          })
        )}
      </div>

      {/* Modal */}
      {selectedCertificate && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="relative w-full max-w-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {viewMode === 'alert' ? 
                    `${translate("Send Alert for")} ${selectedCertificate.name}` : 
                    `${translate("Documents")} - ${selectedCertificate.name}`}
                </CardTitle>
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedCertificate(null)}
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </CardHeader>
              <CardContent>
                {viewMode === 'alert' ? (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      {translate("Application")}: {selectedCertificate.application.id}
                    </p>
                    <p className="text-gray-700">
                      {translate("Applicant")}: {selectedCertificate.application.name}
                    </p>
                    <Textarea
                      value={alertMessage}
                      onChange={(e) => setAlertMessage(e.target.value)}
                      placeholder={translate("Enter your alert message...")}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCertificate(null)}
                      >
                        {translate("Cancel")}
                      </Button>
                      <Button
                        onClick={() => handleSendAlert(selectedCertificate)}
                        disabled={!alertMessage.trim()}
                      >
                        {translate("Send Alert")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">{translate("Application Details")}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">{translate("Application ID")}</p>
                          <p>{selectedCertificate.application.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{translate("Applicant Name")}</p>
                          <p>{selectedCertificate.application.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{translate("Date")}</p>
                          <p>{selectedCertificate.application.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{translate("Status")}</p>
                          <p>{translate(selectedCertificate.application.status)}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">{translate("Documents")}</h3>
                      <div className="space-y-2">
                        {selectedCertificate.application.documents.map((doc: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <span>{doc}</span>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              {translate("Download")}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600">Upload Successful</DialogTitle>
            <DialogDescription>
              {uploadSuccessMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificatesDashboard;