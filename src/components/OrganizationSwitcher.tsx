
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
import { Dialog } from "@/components/ui/dialog";
import OrganizationDialog from './OrganizationDialog';
import { useState } from 'react';

interface Organization {
  id: string;
  name: string;
  isActive: boolean;
}

const OrganizationSwitcher = () => {
  const { toast } = useToast();
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: '1', name: 'Default Organization', isActive: true },
    { id: '2', name: 'Marketing Team', isActive: false },
    { id: '3', name: 'Sales Department', isActive: false },
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleSwitchOrg = (orgId: string) => {
    setOrganizations(orgs =>
      orgs.map(org => ({
        ...org,
        isActive: org.id === orgId
      }))
    );

    const org = organizations.find(o => o.id === orgId);
    if (org) {
      // In a real app, this would switch the context to the selected organization
      localStorage.setItem('currentOrganizationId', orgId);
      localStorage.setItem('currentOrganizationName', org.name);
      
      toast({
        title: "Organization Switched",
        description: `Switched to ${org.name}`
      });
      
      // Force a page reload to refresh all data based on the new organization
      // In a real app, you might use a context provider to avoid the full reload
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleCreateOrg = (data: { name: string; description: string }) => {
    const newOrg = {
      id: crypto.randomUUID(),
      name: data.name,
      isActive: false
    };
    setOrganizations([...organizations, newOrg]);
    setShowCreateDialog(false);
    
    toast({
      title: "Organization Created",
      description: `${data.name} has been created successfully.`
    });
  };

  const activeOrg = organizations.find(org => org.isActive);

  return (
    <>
      <DropdownMenu>
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
