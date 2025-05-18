
/**
 * This is a custom update to SidebarNav to make the help and logout options
 * stick to the bottom of the sidebar.
 */

import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  Home, Phone, Bot, BarChart2, Settings, Users, MessageSquare, 
  Bell, HelpCircle, LogOut, ChevronRight, Calendar, FileText
} from "lucide-react";
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SidebarNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent",
      isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
    );
  };

  // Mock user data
  const user = {
    name: localStorage.getItem('userName') || 'John Doe',
    email: localStorage.getItem('userEmail') || 'john.doe@example.com',
    avatar: localStorage.getItem('userAvatar') || '',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo and user section */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">AI</span>
          </div>
          <h1 className="font-semibold">AI Calling App</h1>
        </Link>

        <Link to="/profile" className="flex items-center gap-3 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-primary/10">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[140px]">{user.email}</span>
          </div>
        </Link>
      </div>
      
      {/* Nav items - scrollable */}
      <div className="flex-grow overflow-y-auto">
        <nav className="grid gap-1 px-2">
          <NavLink to="/dashboard" className={navLinkClasses}>
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink to="/aiagents" className={navLinkClasses}>
            <Bot className="h-4 w-4" />
            AI Agents
          </NavLink>
          <NavLink to="/campaign" className={navLinkClasses}>
            <MessageSquare className="h-4 w-4" />
            Campaigns
          </NavLink>
          <NavLink to="/activity" className={navLinkClasses}>
            <Calendar className="h-4 w-4" />
            Activity
          </NavLink>
          <NavLink to="/phonenumbers" className={navLinkClasses}>
            <Phone className="h-4 w-4" />
            Phone Numbers
          </NavLink>
          <NavLink to="/provider-keys" className={navLinkClasses}>
            <FileText className="h-4 w-4" />
            API Keys
          </NavLink>
          <NavLink to="/telephony-providers" className={navLinkClasses}>
            <Users className="h-4 w-4" />
            Telephony Providers
          </NavLink>
          <NavLink to="/settings" className={navLinkClasses}>
            <Settings className="h-4 w-4" />
            Settings
          </NavLink>
          
          {/* Additional items can be added here */}
          
        </nav>
      </div>
      
      {/* Help and logout - fixed at the bottom */}
      <div className="mt-auto border-t p-2">
        <nav className="grid gap-1">
          <NavLink to="/help" className={navLinkClasses}>
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </NavLink>
          <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2">
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Log out</span>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNav;
