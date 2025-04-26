
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
      toast({
        title: "Organization Switched",
        description: `Switched to ${org.name}`
      });
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
  };

  const activeOrg = organizations.find(org => org.isActive);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-52">
            <Building className="mr-2 h-4 w-4" />
            {activeOrg?.name}
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
              {org.name}
              {org.isActive && <span className="ml-2 text-green-500">✓</span>}
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
