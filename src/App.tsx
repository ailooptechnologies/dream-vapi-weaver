
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import AIAgents from "./pages/AIAgents";
import PhoneNumbers from "./pages/PhoneNumbers";
import CustomModels from "./pages/CustomModels";
import ProviderKeys from "./pages/ProviderKeys";
import Campaign from "./pages/Campaign";
import CampaignTesting from "./pages/CampaignTesting";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/AuthGuard";
import TelephonyProviders from "./pages/TelephonyProviders";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ApiDocs from "./pages/ApiDocs";
import Activity from "./pages/Activity";
import { useEffect } from "react";
import ElectronWindowControls from "./components/ElectronWindowControls";

function App() {
  // Initialize default organization if none exists
  useEffect(() => {
    try {
      // Get stored organizations
      const storedOrgs = localStorage.getItem('organizations');
      
      if (!storedOrgs) {
        // Create and save default organization if none exists
        const defaultOrg = { id: '1', name: 'Default Organization', isActive: true };
        localStorage.setItem('organizations', JSON.stringify([defaultOrg]));
        localStorage.setItem('currentOrganizationId', defaultOrg.id);
        localStorage.setItem('currentOrganizationName', defaultOrg.name);
      } else {
        // Ensure there's always a currentOrganizationId
        const orgs = JSON.parse(storedOrgs);
        const activeOrg = orgs.find((org: any) => org.isActive) || orgs[0];
        if (activeOrg) {
          localStorage.setItem('currentOrganizationId', activeOrg.id);
          localStorage.setItem('currentOrganizationName', activeOrg.name);
        }
      }
    } catch (error) {
      console.error("Error initializing organization data:", error);
    }
  }, []);

  return (
    <>
      <ElectronWindowControls />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="/ai-agents" element={<AuthGuard><AIAgents /></AuthGuard>} />
        <Route path="/phone-numbers" element={<AuthGuard><PhoneNumbers /></AuthGuard>} />
        <Route path="/custom-models" element={<AuthGuard><CustomModels /></AuthGuard>} />
        <Route path="/provider-keys" element={<AuthGuard><ProviderKeys /></AuthGuard>} />
        <Route path="/campaign" element={<AuthGuard><Campaign /></AuthGuard>} />
        <Route path="/campaign/testing" element={<AuthGuard><CampaignTesting /></AuthGuard>} />
        <Route path="/telephony-providers" element={<AuthGuard><TelephonyProviders /></AuthGuard>} />
        <Route path="/help" element={<AuthGuard><Help /></AuthGuard>} />
        <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
        <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
        <Route path="/api-docs" element={<AuthGuard><ApiDocs /></AuthGuard>} />
        <Route path="/activity" element={<AuthGuard><Activity /></AuthGuard>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
