
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Home, Bot, Workflow, Phone, Wrench, File, Users, Key, HelpCircle } from 'lucide-react';

const SidebarNav = () => {
  const [expandedSections, setExpandedSections] = useState({
    build: true,
    test: false
  });
  
  const location = useLocation();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
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
        <div className="relative">
          <select className="w-full py-2 pl-2 pr-8 bg-background border rounded-md text-sm">
            <option>example@gmail.com</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 pointer-events-none" />
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
                to="/dashboard" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/dashboard' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Bot className="h-4 w-4" />
                <span className="text-sm">Assistants</span>
              </Link>
              <Link 
                to="/workflows" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/workflows' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Workflow className="h-4 w-4" />
                <span className="text-sm">Workflows</span>
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
                to="/tools" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/tools' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Wrench className="h-4 w-4" />
                <span className="text-sm">Tools</span>
              </Link>
              <Link 
                to="/files" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/files' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <File className="h-4 w-4" />
                <span className="text-sm">Files</span>
              </Link>
              <Link 
                to="/squads" 
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  location.pathname === '/squads' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="text-sm">Squads</span>
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
            </div>
          )}
        </div>

        <div className="mt-4">
          <button 
            onClick={() => toggleSection('test')} 
            className="flex items-center justify-between w-full px-3 py-2"
          >
            <span className="text-xs font-semibold text-muted-foreground">TEST</span>
            <ChevronDown className={`h-4 w-4 transform transition-transform ${expandedSections.test ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.test && (
            <div className="space-y-1 mt-1">
              <div className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                  <span className="text-sm">Vapi Free</span>
                </div>
                <div className="mt-2">
                  <div className="font-bold">0</div>
                  <div className="text-xs text-muted-foreground">/1000 free minutes used</div>
                  <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                    <div className="h-2 bg-teal-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div className="text-xs mt-2 text-muted-foreground">
                  Renews on May 1
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="p-2 mt-auto">
        <Link 
          to="/help" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
            location.pathname === '/help' ? 'bg-primary/10 text-primary' : ''
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span className="text-sm">Help</span>
        </Link>
      </div>
    </div>
  );
};

export default SidebarNav;
