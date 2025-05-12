import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, FileText, Users, Home, BriefcaseBusiness, Wrench, FileWarning } from "lucide-react";
import { VoiceService } from '../../utils/voiceService';

type SidebarItem = { 
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
};

interface SidebarProps {
  isOpen: boolean;
  type: "user" | "admin";
}

const Sidebar = ({ isOpen, type }: SidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    DAAKHLE: true, // Default expanded
    MANREGA: false,
    TAKRAAR: false,
    MASTERS: false,
  });
  const [activeItem, setActiveItem] = useState<string>("");

  // Update active item based on location
  useEffect(() => {
    let currentPath = location.pathname;
    
    // Check if it's a child path and expand parent if needed
    if (currentPath.includes("/DAAKHLE/")) {
      setExpandedItems((prev) => ({ ...prev, DAAKHLE: true }));
    } else if (currentPath.includes("/MANREGA/")) {
      setExpandedItems((prev) => ({ ...prev, MANREGA: true }));
    } else if (currentPath.includes("/TAKRAAR/")) {
      setExpandedItems((prev) => ({ ...prev, TAKRAAR: true }));
    }
    
    setActiveItem(currentPath);
  }, [location.pathname]);

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavClick = (label: string) => {
    // Speak the field name when clicked
    VoiceService.speakFieldName(label);
  };

  const userMenuItems: SidebarItem[] = [
    {
      title: "Dashboard",
      path: "/user/dashboard",
      icon: <Home size={20} />,
    },
    {
      title: "Profile",
      path: "#",
      icon: <Users size={20} />,
      children: [
        { title: "My Profile", path: "/user/profile/myprofile" },
        { title: "My Applied Forms", path: "/user/profile/myappliedform" },
        { title: "Notification", path: "/user/profile/notification" },
        { title: "My Applied Forms History", path: "/user/profile/myappliedformhistory" },
      ],
    },
    {
      title: "CERTIFICATES",
      path: "#",
      icon: <FileText size={20} />,
      children: [
      
        { title: "Business Non-Exemption Certificate", path: "/user/DAAKHLE/BusinessNonExemptionCertificate" },
        { title: "Digital Signed Property Card", path: "/user/DAAKHLE/DigitalSignedPropertyCard" },
        { title: "Age Proof for Niradhaar Scheme", path: "/user/DAAKHLE/NiradhaarYojnesathiVayachaDakhla" },
        { title: "Building Permit", path: "/user/DAAKHLE/BaandkamParvangi" },
        { title: "Digitally Signed Field 8-A", path: "/user/DAAKHLE/DigitallySignedField8A" },
        { title: "Certificate of No Pending Dues", path: "/user/DAAKHLE/CertificateofNoPendingDues" },
        { title: "Property Certificate (Assesment Extract)", path: "/user/DAAKHLE/PropertyRegisteration" },
        { title: "Death Certificate", path: "/user/DAAKHLE/DeathCertificateForm" },
        { title: "Resident Certificate", path: "/user/DAAKHLE/ResidentCertificate" },
        { title: "Marriage Certificate", path: "/user/DAAKHLE/MarriageCertificate" },
        { title: "Digitally Signed 7/12", path: "/user/DAAKHLE/DigitallySigned712" },
        { title: "Birth Certificate", path: "/user/DAAKHLE/BirthCertificateForm" },
        { title: "Property Transfer", path: "/user/DAAKHLE/PropertyTransfer" },

      ],
    },
    {
      title: "MNREGA",
      path: "#",
      icon: <BriefcaseBusiness size={20} />,
      children: [
        { title: "Job Card Request Application", path: "/user/MANREGA/JobCardMaagniArj" },
        { title: "Job Request Application", path: "/user/MANREGA/KaamMaagniArjForm" },

      ],
    },
    {
      title: "COMPLAINTS",
      path: "#",
      icon: <FileWarning size={20} />,
      children: [
        { title: "Cleaning Service Related Complaints", path: "/user/TAKRAAR/CleaningServiceRelatedComplaints" },
        { title: "Water Supply Related Complaints", path: "/user/TAKRAAR/PaaniPuravtha" },
      ],
    },
    
  ];

  const adminMenuItems: SidebarItem[] = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <Home size={20} />,
    },
    {
      title: "Certificates",
      path: "/admin/DAAKHLE",
      icon: <FileText size={20} />,
    },
    {
      title: "MNREGA",
      path: "/admin/MANREGA",
      icon: <BriefcaseBusiness size={20} />,
    },
    {
      title: "Complaints",
      path: "/admin/TAKRAAR",
      icon: <FileWarning size={20} />,
    },
    {
      title: "MASTERS",
      path: "#",
      icon: <FileWarning size={20} />,
      children: [
        { title: "District", path: "/admin/MASTERS/DistrictMaster" },
        { title: "Taluka", path: "/admin/MASTERS/TalukaMaster" },
        { title: "Village", path: "/admin/MASTERS/VillageMaster" },
        { title: "Business", path: "/admin/MASTERS/BusinessMaster" },
        { title: "Caste/ Category", path: "/admin/MASTERS/CasteMaster" },
        { title: "Number of Floors", path: "/admin/MASTERS/FloorsMaster" },
        { title: "Minority", path: "/admin/MASTERS/MinorityMaster" },
        { title: "Cause of death", path: "/admin/MASTERS/DeathCauseMaster" },

    
      ],
    },
  ];

  const menuItems = type === "user" ? userMenuItems : adminMenuItems;

  const isActive = (path: string) => {
    return activeItem === path;
  };

  return (
    <div 
      className={`fixed left-0 top-[60px] bottom-0 bg-sidebar z-40 text-sidebar-foreground w-[250px] shadow-lg border-r transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto custom-scrollbar`}
    >
      <div className="p-4">
        <div className="mt-2 mb-6">
          <h3 className="text-lg font-semibold flex items-center border-b border-sidebar-border pb-2">
            {type === "user" ? "User Portal" : "Admin Portal"}
          </h3>
        </div>

        <nav>
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index} className="slide-in-bottom" style={{ animationDelay: `${index * 0.05}s` }}>
                {!item.children ? (
                  <Link
                    to={item.path}
                    onClick={() => handleNavClick(item.title)}
                    className={`sidebar-link hover-scale ${isActive(item.path) ? "sidebar-link-active" : ""}`}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <div className="mb-1">
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={`w-full sidebar-link hover-scale flex items-center justify-between ${
                        expandedItems[item.title] ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform duration-200 ${
                          expandedItems[item.title] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedItems[item.title] && (
                      <ul className="mt-1 ml-6 space-y-1 animate-accordion-down">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex} className="slide-in-bottom" style={{ animationDelay: `${childIndex * 0.03}s` }}>
                            <Link
                              to={child.path}
                              onClick={() => handleNavClick(child.title)}
                              className={`sidebar-link text-sm hover-scale ${isActive(child.path) ? "sidebar-link-active" : ""}`}
                            >
                              {child.icon && <span className="mr-2">{child.icon}</span>}
                              <span>{child.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
