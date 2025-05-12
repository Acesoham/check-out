import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import './i18n/config';
import LanguageSwitcher from './components/LanguageSwitcher';
import BusinessNonExemptionCertificate from "./pages/user/DAAKHLE/BusinessNonExemptionCertificate";
import DigitalSignedPropertyCard from "./pages/user/DAAKHLE/DigitalSignedPropertyCard";
import NiradhaarYojnesathiVayachaDakhla from "./pages/user/DAAKHLE/NiradhaarYojnesathiVayachaDakhla";
import BaandkamParvangi from "./pages/user/DAAKHLE/BaandkamParvangi";
import DigitallySignedField8A from "./pages/user/DAAKHLE/DigitallySignedField8A";
import CertificateofNoPendingDues from "./pages/user/DAAKHLE/CertificateofNoPendingDues";
import PropertyRegisteration from "./pages/user/DAAKHLE/PropertyRegisteration";
import DeathCertificateForm from "./pages/user/DAAKHLE/DeathCertificateForm";
import ResidentCertificate from "./pages/user/DAAKHLE/ResidentCertificate";
import MarriageCertificate from "./pages/user/DAAKHLE/MarriageCertificate";
import DigitallySigned712 from "./pages/user/DAAKHLE/DigitallySigned712";
import BirthCertificateForm from "./pages/user/DAAKHLE/BirthCertificateForm";
import PropertyTransfer from "./pages/user/DAAKHLE/PropertyTransfer";
import KaamMaagniArjForm from "./pages/user/MANREGA/KaamMaagniArjForm";
import JobCardMaagniArj from "./pages/user/MANREGA/JobCardMaagniArj";
import PaaniPuravtha1 from "./pages/user/TAKRAAR/CleaningServiceRelatedComplaints";
import PaaniPuravtha from "./pages/user/TAKRAAR/PaaniPuravtha";
import DistrictMaster from "./pages/admin/MASTERS/DistrictMaster";
import TalukaMaster from "./pages/admin/MASTERS/TalukaMaster";
import VillageMaster from "./pages/admin/MASTERS/VillageMaster";
import BusinessMaster from "./pages/admin/MASTERS/BusinessMaster";
import CasteMaster from "./pages/admin/MASTERS/CasteMaster";
import FloorsMaster from "./pages/admin/MASTERS/FloorsMaster";
import DeathCauseMaster from "./pages/admin/MASTERS/DeathCauseMaster";
import Notification from "./pages/user/PROFILE/Notification";
import MyAppliedForm from "./pages/user/PROFILE/MyAppliedForm";
import MyAppliedFormHistory from "./pages/user/PROFILE/MyAppliedFormHistory";
import Profile from "./pages/user/PROFILE/Profile";




const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
            
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;