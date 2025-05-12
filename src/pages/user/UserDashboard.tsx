import { 
  FileText,
  Bell,
  HelpCircle,
  Download,
  X,
  Home,
  Landmark,
  ScrollText,
  User,
  Hammer,
  HeartPulse,
  School,
  Droplet, // Replaced Water with Droplet
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Scheme {
  id: string;
  schemeName: string;
  department: string;
  category: 'dakhle' | 'manrega' | 'complaint';
  status: 'eligible' | 'applied' | 'rejected';
  lastAction: string;
}

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface QuickLink {
  title: string;
  category: string;
  icon: JSX.Element;
  color: string;
}

const UserDashboard = () => {
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const quickLinks: QuickLink[] = [
    { title: "Property", category: "property", icon: <Landmark className="h-5 w-5" />, color: "bg-purple-100 text-purple-800" },
    { title: "Birth/Death", category: "birth_death", icon: <User className="h-5 w-5" />, color: "bg-blue-100 text-blue-800" },
    { title: "Complaints", category: "complaints", icon: <AlertTriangle className="h-5 w-5" />, color: "bg-red-100 text-red-800" },
    { title: "All Schemes", category: "all", icon: <ScrollText className="h-5 w-5" />, color: "bg-gray-100 text-gray-800" },
  ];

  const suggestedSchemes: Scheme[] = [
    // Property related forms
    {
      id: "SCHEME-003",
      schemeName: "Property Tax Complaint",
      department: "Municipal Council",
      category: "complaint",
      status: "eligible",
      lastAction: "Apply Now"
    },
    {
      id: "SCHEME-009",
      schemeName: "Road Repair Complaint",
      department: "Public Works Department",
      category: "complaint",
      status: "applied",
      lastAction: "Download"
    },
    {
      id: "SCHEME-010",
      schemeName: "Property Mutation",
      department: "Revenue Department",
      category: "dakhle",
      status: "eligible",
      lastAction: "Apply Now"
    },
    // Birth/Death related forms
    {
      id: "SCHEME-001",
      schemeName: "Birth Certificate Application",
      department: "Revenue Department",
      category: "dakhle",
      status: "eligible",
      lastAction: "Apply Now"
    },
    {
      id: "SCHEME-004",
      schemeName: "Death Certificate",
      department: "Revenue Department",
      category: "dakhle",
      status: "eligible",
      lastAction: "Apply Now"
    },
    {
      id: "SCHEME-007",
      schemeName: "Marriage Certificate",
      department: "Revenue Department",
      category: "dakhle",
      status: "eligible",
      lastAction: "Apply Now"
    },
    // Other forms
    {
      id: "SCHEME-002",
      schemeName: "MGNREGA Job Card",
      department: "Rural Development",
      category: "manrega",
      status: "applied",
      lastAction: "Download"
    },
    {
      id: "SCHEME-005",
      schemeName: "MGNREGA Wage Payment Issue",
      department: "Rural Development",
      category: "manrega",
      status: "rejected",
      lastAction: "Reapply"
    },
    {
      id: "SCHEME-006",
      schemeName: "Water Supply Complaint",
      department: "Public Works Department",
      category: "complaint",
      status: "applied",
      lastAction: "View Status"
    },
    {
      id: "SCHEME-008",
      schemeName: "MGNREGA Works Application",
      department: "Rural Development",
      category: "manrega",
      status: "eligible",
      lastAction: "Apply Now"
    }
  ];

  const notices: Notice[] = [
    {
      id: 1,
      title: "Village Development Meeting",
      content: "All residents are invited to attend the village development meeting on May 15th at 10 AM in the Gram Panchayat office.",
      date: "2024-05-05",
      priority: "high"
    },
    {
      id: 2,
      title: "Water Supply Interruption",
      content: "Water supply will be interrupted on May 12th from 9 AM to 5 PM for pipeline maintenance work.",
      date: "2024-05-03",
      priority: "medium"
    },
    {
      id: 3,
      title: "New Scholarship Program",
      content: "Applications are open for the new rural student scholarship program. Deadline: May 20th.",
      date: "2024-05-01",
      priority: "medium"
    }
  ];

  const filteredSchemes = selectedCategory 
    ? selectedCategory === 'all'
      ? suggestedSchemes
      : selectedCategory === 'property'
        ? suggestedSchemes.filter(s => s.schemeName.includes('Property') || s.schemeName.includes('Road') || s.schemeName.includes('Tax'))
        : selectedCategory === 'birth_death'
          ? suggestedSchemes.filter(s => s.schemeName.includes('Birth') || s.schemeName.includes('Death') || s.schemeName.includes('Marriage'))
          : suggestedSchemes.filter(s => s.category === selectedCategory)
    : suggestedSchemes;

  const handleDownload = (scheme: Scheme) => {
    const link = document.createElement('a');
    link.href = '/sample-form.pdf';
    link.download = `${scheme.schemeName.replace(/\s+/g, '-').toLowerCase()}-${scheme.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApply = (scheme: Scheme) => {
    setSelectedScheme(scheme);
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'dakhle': return 'text-blue-600 dark:text-blue-400';
      case 'manrega': return 'text-green-600 dark:text-green-400';
      case 'complaint': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getApplyButtonText = (scheme: Scheme) => {
    if (scheme.status === 'rejected') return 'Reapply';
    if (scheme.status === 'applied') return 'View Status';
    return 'Apply Now';
  };

  const getRowBackground = (scheme: Scheme) => {
    switch(scheme.status) {
      case 'eligible': return 'bg-blue-50/50 hover:bg-blue-100 dark:bg-blue-900/10 dark:hover:bg-blue-900/20';
      case 'applied': return 'bg-green-50/50 hover:bg-green-100 dark:bg-green-900/10 dark:hover:bg-green-900/20';
      case 'rejected': return 'bg-red-50/50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20';
      default: return 'hover:bg-gray-50 dark:hover:bg-gray-800/50';
    }
  };

  const handleDownloadPDF = (schemeId: string) => {
    try {
      // Get the PDF data from localStorage using the same key structure
      const storageKey = `certificate_pdf_${schemeId}`;
      const pdfData = localStorage.getItem(storageKey);
      const metadata = localStorage.getItem(`${storageKey}_metadata`);

      if (!pdfData || !metadata) {
        alert('No PDF file available for this certificate. Please contact the administrator.');
        return;
      }

      const { fileName, uploadDate } = JSON.parse(metadata);

      // Create a link element for download
      const link = document.createElement('a');
      link.href = pdfData;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Add a success notification
      const notification = `Certificate "${fileName}" downloaded successfully`;
      // You can add this to your notification system if you have one

    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download the certificate. Please try again later.');
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      {/* Scheme Details Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setSelectedScheme(null)}
            >
              <X className="h-5 w-5" />
            </Button>
            <h3 className="text-xl font-bold mb-4">{selectedScheme.schemeName}</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Department:</span>
                <span className="font-medium">{selectedScheme.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <span className={`font-medium ${getCategoryColor(selectedScheme.category)}`}>
                  {selectedScheme.category.charAt(0).toUpperCase() + selectedScheme.category.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <Badge
                  variant={
                    selectedScheme.status === 'eligible'
                      ? 'default'
                      : selectedScheme.status === 'applied'
                      ? 'success'
                      : 'destructive'
                  }
                >
                  {selectedScheme.status.charAt(0).toUpperCase() + selectedScheme.status.slice(1)}
                </Badge>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setSelectedScheme(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedScheme.status === 'applied') {
                      // Navigate to status page
                      navigate(`/schemes/${selectedScheme.id}/status`);
                    } else {
                      // Navigate to application form
                      navigate(`/schemes/${selectedScheme.id}/apply`);
                    }
                    setSelectedScheme(null);
                  }}
                >
                  {getApplyButtonText(selectedScheme)}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
            Welcome back, User
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore and apply for government schemes and services
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Help">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Quick Links Section */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {quickLinks.map((link) => (
              <Button
                key={link.category}
                variant="outline"
                className={`flex flex-col items-center justify-center h-24 ${link.color} ${selectedCategory === link.category ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                onClick={() => setSelectedCategory(link.category === selectedCategory ? null : link.category)}
              >
                <div className="mb-2">{link.icon}</div>
                <span className="text-sm font-medium">{link.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Government Schemes Section */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('_', '/')} Forms` : 'Government Schemes'}
              </h3>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => navigate('/schemes')}
            >
              View All Schemes
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/30 text-left">
                  <th className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-tl-lg">SR.No</th>
                  <th className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Certificate Type</th>
                  <th className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Category</th>
                  <th className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Action Taken </th>
                  <th className="p-4 text-lg font-semibold text-gray-700 dark:text-gray-300 rounded-tr-lg">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSchemes.map((scheme, index) => (
                  <tr 
                    key={scheme.id} 
                    className={`${getRowBackground(scheme)} transition-colors`}
                  >
                    <td className="p-4 text-lg font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="p-4 text-lg font-medium text-gray-900 dark:text-white">
                      {scheme.schemeName}
                    </td>
                    <td className={`p-4 text-lg font-medium ${getCategoryColor(scheme.category)}`}>
                      {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                    </td>
                    <td className="p-4">
                      <Button
                        size="lg"
                        className={`w-full text-lg ${
                          scheme.status === 'rejected' 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : scheme.status === 'applied' 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                        onClick={() => handleApply(scheme)}
                      >
                        {getApplyButtonText(scheme)}
                      </Button>
                    </td>
                    <td className="p-4">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full text-lg text-blue-600 hover:text-blue-700 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => handleDownloadPDF(scheme.id)}
                      >
                        <Download className="h-5 w-5 mr-2" />
                        {localStorage.getItem(`certificate_pdf_${scheme.id}`) ? 'Download Certificate' : 'No Certificate Available'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing 1 to {filteredSchemes.length} of {filteredSchemes.length} entries
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Important Notices Section */}
      <Card className="border-l-4 border-yellow-400">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Important Notices
              </h3>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/notices')}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`p-4 rounded-lg border-l-4 ${
                  notice.priority === "high"
                    ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                    : notice.priority === "medium"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                    : "border-green-500 bg-green-50 dark:bg-green-900/10"
                }`}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {notice.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notice.date}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;