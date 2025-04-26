
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Home, 
  Bot, 
  Phone, 
  Key, 
  HelpCircle, 
  MessageSquare, 
  Mic, 
  Headphones, 
  LogOut,
  Plus,
  Building
} from 'lucide-react';
import OrganizationDialog from './OrganizationDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SidebarNav = () => {
  const [expandedSections, setExpandedSections] = useState({
    build: true
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orgDialogOpen, setOrgDialogOpen] = useState(false);
  
  // Get organization name from localStorage or use default
  const organizationName = localStorage.getItem('organizationName') || 'My Organization';
  const userEmail = localStorage.getItem('userEmail') || 'example@gmail.com';

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleCreateOrganization = (data: { name: string; description: string }) => {
    // In a real app, this would create a new organization in the backend
    localStorage.setItem('organizationName', data.name);
    toast({
      title: "Organization created",
      description: `Switched to ${data.name}`
    });
    setOrgDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-md bg-teal-400 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-teal-900" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4L12 20" />
              <path d="M8 9L8 15" />
              <path d="M4 11L4 13" />
              <path d="M16 8L16 16" />
              <path d="M20 10L20 14" />
            </svg>
          </div>
          <span className="text-xl font-bold text-teal-400">VAPI</span>
        </Link>
      </div>

      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-muted-foreground mb-2">ORGANIZATION</h2>
        <div className="flex flex-col space-y-2">
          <div className="px-2 py-1 bg-slate-100 rounded-md text-sm font-medium flex items-center justify-between">
            <div className="flex items-center">
              <Building className="h-3 w-3 mr-2" />
              <span className="truncate">{organizationName}</span>
            </div>
          </div>
          <div className="px-2 py-1 text-xs text-muted-foreground">{userEmail}</div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-xs"
            onClick={() => setOrgDialogOpen(true)}
          >
            <Plus className="h-3 w-3 mr-1" /> New Organization
          </Button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
            location.pathname === '/dashboard' ? 'bg-primary/10 text-primary' : ''
          }`}
        >
          <Home className="h-4 w-4" />
          <span className="text-sm">Overview</span>
        </Link>

        <div className="mt-4">
          <button 
            onClick={() => toggleSection('build')} 
            className="flex items-center justify-between w-full px-3 py-2"
          >
            <span className="text-xs font-semibold text-muted-foreground">BUILD</span>
            <ChevronDown className={`h-4 w-4 transform transition-transform ${expandedSections.build ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.build && (
            <div className="space-y-1 mt-1">
              <Link 
                to="/campaign" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/campaign' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">Campaign</span>
              </Link>
              <Link 
                to="/ai-agents" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/ai-agents' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Bot className="h-4 w-4" />
                <span className="text-sm">AI Agents</span>
              </Link>
              <Link 
                to="/phone-numbers" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/phone-numbers' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">Phone Numbers</span>
              </Link>
              <Link 
                to="/custom-models" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/custom-models' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Headphones className="h-4 w-4" />
                <span className="text-sm">Custom Models</span>
              </Link>
              <Link 
                to="/provider-keys" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/provider-keys' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Key className="h-4 w-4" />
                <span className="text-sm">Provider Keys</span>
              </Link>
              <Link 
                to="/telephony-providers" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/telephony-providers' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">Telephony Providers</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="p-2 mt-auto border-t">
        <Link 
          to="/help" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
            location.pathname === '/help' ? 'bg-primary/10 text-primary' : ''
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span className="text-sm">Help</span>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors w-full text-left"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
      
      <OrganizationDialog 
        open={orgDialogOpen} 
        onOpenChange={setOrgDialogOpen} 
        onCreateOrganization={handleCreateOrganization} 
      />
    </div>
  );
};

export default SidebarNav;
