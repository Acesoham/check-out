import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import UserDashboard from "../pages/user/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import LandingDashboard from "../pages/LandingDashboard";
import Layout from "../components/layout/Layout";
import NotFound from "../pages/NotFound";

// Import all user pages
import BusinessNonExemptionCertificate from "../pages/user/DAAKHLE/BusinessNonExemptionCertificate";
import DigitalSignedPropertyCard from "../pages/user/DAAKHLE/DigitalSignedPropertyCard";
import NiradhaarYojnesathiVayachaDakhla from "../pages/user/DAAKHLE/NiradhaarYojnesathiVayachaDakhla";
import BaandkamParvangi from "../pages/user/DAAKHLE/BaandkamParvangi";
import DigitallySignedField8A from "../pages/user/DAAKHLE/DigitallySignedField8A";
import CertificateofNoPendingDues from "../pages/user/DAAKHLE/CertificateofNoPendingDues";
import PropertyRegisteration from "../pages/user/DAAKHLE/PropertyRegisteration";
import DeathCertificateForm from "../pages/user/DAAKHLE/DeathCertificateForm";
import ResidentCertificate from "../pages/user/DAAKHLE/ResidentCertificate";
import MarriageCertificate from "../pages/user/DAAKHLE/MarriageCertificate";
import DigitallySigned712 from "../pages/user/DAAKHLE/DigitallySigned712";
import BirthCertificateForm from "../pages/user/DAAKHLE/BirthCertificateForm";
import PropertyTransfer from "../pages/user/DAAKHLE/PropertyTransfer";
import KaamMaagniArjForm from "../pages/user/MANREGA/KaamMaagniArjForm";
import JobCardMaagniArj from "../pages/user/MANREGA/JobCardMaagniArj";
import CleaningServiceRelatedComplaints from "../pages/user/TAKRAAR/CleaningServiceRelatedComplaints";
import PaaniPuravtha from "../pages/user/TAKRAAR/PaaniPuravtha";
import DistrictMaster from "../pages/admin/MASTERS/DistrictMaster";
import TalukaMaster from "../pages/admin/MASTERS/TalukaMaster";
import VillageMaster from "../pages/admin/MASTERS/VillageMaster";
import BusinessMaster from "../pages/admin/MASTERS/BusinessMaster";
import CasteMaster from "../pages/admin/MASTERS/CasteMaster";
import FloorsMaster from "../pages/admin/MASTERS/FloorsMaster";
import MinorityMaster from "../pages/admin/MASTERS/MinorityMaster";
import DeathCauseMaster from "../pages/admin/MASTERS/DeathCauseMaster";
// Import profile pages 
import Profile from "../pages/user/PROFILE/Profile";
import Notification from "../pages/user/PROFILE/Notification";
import MyAppliedForm from "../pages/user/PROFILE/MyAppliedForm";
import MyAppliedFormHistory from "../pages/user/PROFILE/MyAppliedFormHistory";



// Import admin pages
import AdminDaakhle from "../pages/admin/DAAKHLE/AdminDaakhle";
import AdminManrega from "../pages/admin/MANREGA/AdminManrega";
import AdminTakraar from "../pages/admin/TAKRAAR/AdminTakraar";


const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LandingDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      
      {/* User Routes */}
      <Route path="/user" element={<Layout userType="user" />}>
        <Route index element={<Navigate to="/user/dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        
        {/* Profile Routes */}
        <Route path="profile">
          <Route path="myprofile" element={<Profile />} />
          <Route path="notification" element={<Notification />} />
          <Route path="myappliedform" element={<MyAppliedForm />} />
          <Route path="myappliedformhistory" element={<MyAppliedFormHistory />} />
        </Route>
        
        {/* DAAKHLE Routes */}
        <Route path="DAAKHLE">
          <Route path="BusinessNonExemptionCertificate" element={<BusinessNonExemptionCertificate />} />
          <Route path="DigitalSignedPropertyCard" element={<DigitalSignedPropertyCard />} />
          <Route path="NiradhaarYojnesathiVayachaDakhla" element={<NiradhaarYojnesathiVayachaDakhla />} />
          <Route path="BaandkamParvangi" element={<BaandkamParvangi />} />
          <Route path="DigitallySignedField8A" element={<DigitallySignedField8A />} />
          <Route path="CertificateofNoPendingDues" element={<CertificateofNoPendingDues />} />
          <Route path="PropertyRegisteration" element={<PropertyRegisteration />} />
          <Route path="DeathCertificateForm" element={<DeathCertificateForm />} />
          <Route path="ResidentCertificate" element={<ResidentCertificate />} />
          <Route path="MarriageCertificate" element={<MarriageCertificate />} />
          <Route path="DigitallySigned712" element={<DigitallySigned712 />} />
          <Route path="BirthCertificateForm" element={<BirthCertificateForm />} />
          <Route path="PropertyTransfer" element={<PropertyTransfer />} />
        </Route>

        {/* MANREGA Routes */}
        <Route path="MANREGA">
          <Route path="KaamMaagniArjForm" element={<KaamMaagniArjForm />} />
          <Route path="JobCardMaagniArj" element={<JobCardMaagniArj />} />
        </Route>

        {/* TAKRAAR Routes */}
        <Route path="TAKRAAR">
          <Route path="CleaningServiceRelatedComplaints" element={<CleaningServiceRelatedComplaints />} />
          <Route path="PaaniPuravtha" element={<PaaniPuravtha />} />
        </Route>

        
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={<Layout userType="admin" />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="DAAKHLE" element={<AdminDaakhle />} />
        <Route path="MANREGA" element={<AdminManrega />} />
        <Route path="TAKRAAR" element={<AdminTakraar />} />
        {/* MASTERS Routes */}
        <Route path="MASTERS">
          <Route path="DistrictMaster" element={<DistrictMaster />} />
          <Route path="TalukaMaster" element={<TalukaMaster />} />
          <Route path="VillageMaster" element={<VillageMaster />} />
          <Route path="BusinessMaster" element={<BusinessMaster />} />
          <Route path="CasteMaster" element={<CasteMaster />} />
          <Route path="FloorsMaster" element={<FloorsMaster />} />
          <Route path="MinorityMaster" element={<MinorityMaster />} />
          <Route path="DeathCauseMaster" element={<DeathCauseMaster />} />
        </Route>
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;