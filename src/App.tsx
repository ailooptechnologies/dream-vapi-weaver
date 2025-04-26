
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Campaign from "./pages/Campaign";
import AIAgents from "./pages/AIAgents";
import PhoneNumbers from "./pages/PhoneNumbers";
import ProviderKeys from "./pages/ProviderKeys";
import CustomModels from "./pages/CustomModels";
import TelephonyProviders from "./pages/TelephonyProviders";
import AuthGuard from "./components/AuthGuard";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/campaign" element={
            <AuthGuard>
              <Campaign />
            </AuthGuard>
          } />
          <Route path="/ai-agents" element={
            <AuthGuard>
              <AIAgents />
            </AuthGuard>
          } />
          <Route path="/phone-numbers" element={
            <AuthGuard>
              <PhoneNumbers />
            </AuthGuard>
          } />
          <Route path="/provider-keys" element={
            <AuthGuard>
              <ProviderKeys />
            </AuthGuard>
          } />
          <Route path="/custom-models" element={
            <AuthGuard>
              <CustomModels />
            </AuthGuard>
          } />
          <Route path="/telephony-providers" element={
            <AuthGuard>
              <TelephonyProviders />
            </AuthGuard>
          } />
          <Route path="/help" element={
            <AuthGuard>
              <Help />
            </AuthGuard>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
