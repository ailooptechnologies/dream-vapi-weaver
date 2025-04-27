
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Building, ChevronDown, Plus } from "lucide-react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizationDialog from './OrganizationDialog';

interface Organization {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

const OrganizationSwitcher = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(Date.now()); // Add a key to force re-render

  // Load organizations from localStorage on component mount
  useEffect(() => {
    const storedOrgs = localStorage.getItem('organizations');
    if (storedOrgs) {
      setOrganizations(JSON.parse(storedOrgs));
    } else {
      // Set default organization if none exist
      const defaultOrg = { id: '1', name: 'Default Organization', isActive: true };
      setOrganizations([defaultOrg]);
      localStorage.setItem('organizations', JSON.stringify([defaultOrg]));
      localStorage.setItem('currentOrganizationId', defaultOrg.id);
      localStorage.setItem('currentOrganizationName', defaultOrg.name);
    }
  }, []);

  const handleSwitchOrg = (orgId: string) => {
    const updatedOrgs = organizations.map(org => ({
      ...org,
      isActive: org.id === orgId
    }));
    
    setOrganizations(updatedOrgs);
    localStorage.setItem('organizations', JSON.stringify(updatedOrgs));

    const org = organizations.find(o => o.id === orgId);
    if (org) {
      // Store current organization info
      localStorage.setItem('currentOrganizationId', orgId);
      localStorage.setItem('currentOrganizationName', org.name);
      
      toast({
        title: "Organization Switched",
        description: `Switched to ${org.name}`
      });
      
      // Force a refresh to update the UI context
      window.location.reload();
    }
  };

  const handleCreateOrg = (data: { name: string; description: string }) => {
    const newOrg = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      isActive: false
    };
    
    const updatedOrgs = [...organizations, newOrg];
    setOrganizations(updatedOrgs);
    localStorage.setItem('organizations', JSON.stringify(updatedOrgs));
    
    toast({
      title: "Organization Created",
      description: `${data.name} has been created successfully.`
    });
    
    // Force dropdown to re-render by updating key
    setDropdownKey(Date.now());
  };

  const activeOrg = organizations.find(org => org.isActive) || organizations[0];

  return (
    <>
      <DropdownMenu key={dropdownKey}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <Building className="mr-2 h-4 w-4" />
            <span className="truncate flex-1 text-left">{activeOrg?.name}</span>
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {organizations.map((org) => (
            <DropdownMenuItem
              key={org.id}
              onClick={() => handleSwitchOrg(org.id)}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{org.name}</span>
                {org.isActive && <span className="ml-2 text-green-500">✓</span>}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowCreateDialog(true)} className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            New Organization
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <OrganizationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateOrganization={handleCreateOrg}
      />
    </>
  );
};

export default OrganizationSwitcher;
