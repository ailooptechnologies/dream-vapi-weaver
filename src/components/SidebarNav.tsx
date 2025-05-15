
import React, { useState, useEffect } from 'react';
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
  Building,
  User,
  Settings,
  Activity,
  FilePlus
} from 'lucide-react';
import OrganizationDialog from './OrganizationDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import OrganizationSwitcher from './OrganizationSwitcher';

const SidebarNav = () => {
  const [expandedSections, setExpandedSections] = useState({
    build: true,
    account: false
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get user info from localStorage or use default
  const userEmail = localStorage.getItem('userEmail') || 'example@gmail.com';

  // Auto-expand account section if on an account page
  useEffect(() => {
    const accountPages = ['/profile', '/settings', '/activity'];
    if (accountPages.some(page => location.pathname === page)) {
      setExpandedSections(prev => ({ ...prev, account: true }));
    }
  }, [location.pathname]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  // Helper to check if link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b">
        <Link to="/dashboard" className="flex items-center gap-2 p-1">
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

      <div className="py-2 px-2 border-b">
        <h2 className="text-xs font-semibold text-muted-foreground mb-1 px-1">ORGANIZATION</h2>
        <div className="flex flex-col">
          <OrganizationSwitcher />
          <div className="px-2 py-1 text-xs text-muted-foreground truncate">{userEmail}</div>
        </div>
      </div>

      <nav className="flex-1 p-2 flex flex-col">
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
            isActive('/dashboard') ? 'bg-primary/10 text-primary' : ''
          }`}
        >
          <Home className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm truncate">Overview</span>
        </Link>

        <div className="mt-2">
          <button 
            onClick={() => toggleSection('build')} 
            className="flex items-center justify-between w-full px-2 py-1"
          >
            <span className="text-xs font-semibold text-muted-foreground">BUILD</span>
            <ChevronDown className={`h-3.5 w-3.5 transform transition-transform ${expandedSections.build ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.build && (
            <div className="mt-1 space-y-0.5">
              <Link 
                to="/campaign" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/campaign') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">Campaign</span>
              </Link>
              <Link 
                to="/ai-agents" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/ai-agents') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Bot className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">AI Agents</span>
              </Link>
              <Link 
                to="/phone-numbers" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/phone-numbers') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">Phone Numbers</span>
              </Link>
              <Link 
                to="/custom-models" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/custom-models') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <FilePlus className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">Custom Models</span>
              </Link>
              <Link 
                to="/provider-keys" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/provider-keys') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Key className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">Provider Keys</span>
              </Link>
              <Link 
                to="/telephony-providers" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/telephony-providers') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">Telephony Providers</span>
              </Link>
            </div>
          )}
        </div>
        
        {/* Account Section */}
        <div className="mt-2">
          <button 
            onClick={() => toggleSection('account')} 
            className="flex items-center justify-between w-full px-2 py-1"
          >
            <span className="text-xs font-semibold text-muted-foreground">ACCOUNT</span>
            <ChevronDown className={`h-3.5 w-3.5 transform transition-transform ${expandedSections.account ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.account && (
            <div className="mt-1 space-y-0.5">
              <Link 
                to="/profile" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/profile') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <User className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">Profile</span>
              </Link>
              <Link 
                to="/settings" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/settings') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Settings className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">Settings</span>
              </Link>
              <Link 
                to="/activity" 
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
                  isActive('/activity') ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Activity className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">Activity</span>
              </Link>
            </div>
          )}
        </div>

        <div className="mt-auto pt-2 border-t">
          <Link 
            to="/help" 
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors ${
              isActive('/help') ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            <HelpCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">Help</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors w-full text-left"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SidebarNav;
