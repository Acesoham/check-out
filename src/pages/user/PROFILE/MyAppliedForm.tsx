import { 
  FileText,
  ChevronRight,
  Home,
  BriefcaseBusiness,
  MessageSquare,
  Bell,
  BarChart3,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Award,
  Image,
  Camera,
  MessageSquareText,
  Sun,
  Send,
  AlertTriangle,
  Eye,
  Upload,
  Download,
  X,
  CheckCircle,
  Calendar
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { Carousel } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface ChatMessage {
  sender: 'user' | 'system';
  message: string;
  timestamp?: Date;
}

interface Alert {
  id: number;
  document: string;
  issue: string;
  deadline: string;
  resolved?: boolean;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: string;
}

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}


interface GalleryItem {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
}

interface AppliedForm {
  id: string;
  type: string;
  status: string;
  appliedDate: string;
  approvalDate: string;
  remark: string;
}

interface QuickLink {
  title: string;
  path: string;
  icon: JSX.Element;
  color: string;
}

interface EmergencyContact {
  title: string;
  number: string;
}

const UserDashboard = () => {
  const [loading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "system",
      message: "Welcome to Zilla Parisad Gramin Vibhag! How can we help you today?",
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      document: "Resident Certificate",
      issue: "Incorrect address proof uploaded",
      deadline: "May 10, 2025",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<AppliedForm | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUploadId, setCurrentUploadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

const appliedForms = [

  {
    id: "APP-2024-00189",
    type: "Birth Certificate",
    status: "Approved",
    appliedDate: "2024-05-05",
    approvalDate: "2024-05-08",
    remark: "Processed quickly",
  },
  {
    id: "APP-2024-00201",
    type: "Baandkaam Parvangi",
    status: "Pending",
    appliedDate: "2024-05-18",
    approvalDate: "-",
    remark: "Awaiting labor department approval",
  },
  {
    id: "APP-2024-00234",
    type: "Death Certificate",
    status: "Approved",
    appliedDate: "2024-05-01",
    approvalDate: "2024-05-05",
    remark: "Processed with hospital records",
  },
  {
    id: "APP-2024-00256",
    type: "Business Non-Exemption Certificate",
    status: "Rejected",
    appliedDate: "2024-04-28",
    approvalDate: "2024-05-02",
    remark: "Missing tax clearance certificate",
  },
  {
    id: "APP-2024-00278",
    type: "Property Transfer Application",
    status: "Pending",
    appliedDate: "2024-05-15",
    approvalDate: "-",
    remark: "Under revenue department review",
  },
  {
    id: "APP-2024-00301",
    type: "Marriage Certificate",
    status: "Approved",
    appliedDate: "2024-04-20",
    approvalDate: "2024-04-25",
    remark: "Registered successfully",
  },
];

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, formId: string) => {
    const target = event.target;
    const file = target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload the document in PDF format.");
      target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must be less than 5MB");
      target.value = "";
      return;
    }

    setErrorMessage("");
    setIsUploading(true);
    setCurrentUploadId(formId);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowUploadSuccess(true);
          setTimeout(() => {
            setShowUploadSuccess(false);
            setCurrentUploadId(null);
          }, 3000);
          target.value = "";
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    console.log("Uploading file for form:", formId);
  }, []);

  const handleViewForm = useCallback((form: AppliedForm) => {
    setSelectedForm(form);
  }, []);

  const handleDownloadForm = useCallback(() => {
    console.log("Downloading form:", selectedForm?.id);
    const link = document.createElement('a');
    link.href = '/sample-form.pdf';
    link.download = `${selectedForm?.type.replace(/\s+/g, '-').toLowerCase()}-${selectedForm?.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [selectedForm]);
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

  return (
    <div className="animate-fade-in space-y-8">
      {/* View Form Modal */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedForm.type} - {selectedForm.id}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedForm(null)}
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Application Details</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Status:</span> 
                      <Badge
                        variant={
                          selectedForm.status === "Approved"
                            ? "secondary"
                            : selectedForm.status === "Rejected"
                            ? "destructive"
                            : "default"
                        }
                        className="ml-2"
                      >
                        {selectedForm.status}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Applied Date:</span> {new Date(selectedForm.appliedDate).toLocaleDateString()}</p>
                    {selectedForm.approvalDate !== "-" && (
                      <p><span className="font-medium">Approval Date:</span> {new Date(selectedForm.approvalDate).toLocaleDateString()}</p>
                    )}
                    <p><span className="font-medium">Remark:</span> {selectedForm.remark}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-black-700 dark:text-black-300 mb-2">Form Preview</h4>
                  <div className="border border-black-200 dark:border-black-700 rounded-md p-4 h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="mt-2 text-gray-500 dark:text-gray-400">Preview of {selectedForm.type}</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Application ID: {selectedForm.id}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setSelectedForm(null)}>
                  Close
                </Button>
                <Button onClick={handleDownloadForm}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Progress Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-white-900 rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white-900 dark:text-white">
                Uploading Document
              </h3>
              <span className="text-sm font-medium">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Uploading document for {appliedForms.find(f => f.id === currentUploadId)?.type || 'application'}...
            </p>
          </div>
        </div>
      )}

      {/* Upload Success Notification */}
      {showUploadSuccess && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-start max-w-sm">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Upload Successful!</p>
              <p className="text-sm">
                Your document for {appliedForms.find(f => f.id === currentUploadId)?.type || 'application'} has been uploaded successfully.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-4 h-6 w-6 text-white hover:bg-green-600"
              onClick={() => setShowUploadSuccess(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, User
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Empowering rural development through transparency, efficiency, and
            citizen participation.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="relative" aria-label="Alerts">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Help">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="h-[400px] md:h-[500px] bg-white-200 dark:bg-white-800 rounded-xl animate-pulse" />
      ) : (
        <div className="space-y-8">
          {/* Applied Forms Table Section */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                   <FileText className="h-6 w-6 text-indigo-600 mr-3" />
                 <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                  My Applied Forms
                 </h3>
                </div>
    <Button 
      variant="outline"
      size="sm"
      className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700"
    >
      Export to Excel
    </Button>
            </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-50 dark:bg-blue-900/30 text-left">
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300 rounded-tl-lg">Sr. No</th>
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300">Application ID</th>
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300">Certificate Type</th>
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300">Status</th>
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300">Applied Date</th>
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300">Approval Date</th>
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300">View/Download</th>
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300">Upload</th>
                      <th className="p-3 font-medium text-gray-700 dark:text-gray-300 rounded-tr-lg">Remark</th>
                    </tr>
                  </thead>
<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
  {appliedForms.map((form, index) => (
    <tr 
      key={form.id} 
      className={`
        ${
          form.status === "Pending" 
            ? "bg-yellow-50 dark:bg-yellow-900/10 hover:bg-yellow-100 dark:hover:bg-yellow-900/20" 
            : form.status === "Approved" 
              ? "bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20" 
              : form.status === "Rejected" 
                ? "bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20" 
                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }
      `}
    >
      <td className="p-3 font-medium text-gray-900 dark:text-white">
        {index + 1}
      </td>
      <td className="p-3 font-medium text-gray-900 dark:text-white">
        {form.id}
      </td>
      <td className="p-3 font-medium text-gray-700 dark:text-gray-300">
        {form.type}
      </td>
      <td className="p-3">
        <Badge
          className={`
            font-medium
            ${
              form.status === "Approved"
                ? "bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
                : form.status === "Pending"
                ? "bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700"
                : "bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
            }
          `}
        >
          {form.status}
        </Badge>
      </td>
      <td className="p-3 font-medium text-gray-700 dark:text-gray-300">
        {new Date(form.appliedDate).toLocaleDateString()}
      </td>
      <td className="p-3 font-medium text-gray-700 dark:text-gray-300">
        {form.approvalDate === "-" ? "-" : new Date(form.approvalDate).toLocaleDateString()}
      </td>
              <td className="p-3">
          <Button
            size="sm"
            className={`
              w-full font-medium text-white
              ${
                form.status === "Approved"
                  ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                  : form.status === "Pending"
                  ? "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                  : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              }
            `}
            onClick={() => handleViewForm(form)}
          >
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
        </td>

        <td className="p-3">
          <input
            type="file"
            id={`upload-${form.id}`}
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFileUpload(e, form.id)}
            disabled={isUploading}
          />
          <label
            htmlFor={`upload-${form.id}`}
            className={`
              inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-white h-9 px-3 py-2 w-full cursor-pointer
              ${
                form.status === "Approved"
                  ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                  : form.status === "Pending"
                  ? "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                  : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              }
              ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <Upload className="h-4 w-4 mr-1" /> Upload
          </label>
        </td>
      <td className={`
        p-3 font-medium
        ${
          form.status === "Approved"
            ? "text-green-700 dark:text-green-300"
            : form.status === "Pending"
            ? "text-yellow-700 dark:text-yellow-300"
            : "text-red-700 dark:text-red-300"
        }
      `}>
        {form.remark}
      </td>
    </tr>
                    ))}
                  </tbody>
                </table>
              </div>

  {/* Pagination with Colored Buttons */}
  <div className="flex items-center justify-between mt-4">
    <div className="text-sm text-black-700 dark:text-black-300 font-medium">
      Showing 1 to 4 of 4 entries
    </div>
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        disabled
        className="text-black-900 dark:text-black-900 font-medium bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 dark:hover:bg-blue-900/70"
      >
        Previous
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-blue-500 text-black hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 font-medium"
      >
        1
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        disabled
        className="text-black-700 dark:text-black-300 font-medium bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 dark:hover:bg-blue-900/70"
      >
        Next
      </Button>
    </div>
  </div>
</div>
          </Card>

        </div>
      )}
    </div>
  );
};

export default UserDashboard;