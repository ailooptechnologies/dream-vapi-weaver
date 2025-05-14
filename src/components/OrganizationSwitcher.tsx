
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrganizationDialog from "./OrganizationDialog";

interface Organization {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

const OrganizationSwitcher = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string>('');

  const loadOrganizations = () => {
    const orgs = JSON.parse(localStorage.getItem('organizations') || '[]');
    setOrganizations(orgs);
    
    const currentOrg = JSON.parse(localStorage.getItem('currentOrganization') || 'null');
    if (currentOrg) {
      setSelectedOrg(currentOrg.id);
    } else if (orgs.length > 0) {
      setSelectedOrg(orgs[0].id);
      localStorage.setItem('currentOrganization', JSON.stringify(orgs[0]));
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  const handleOrgChange = (orgId: string) => {
    const selectedOrg = organizations.find(org => org.id === orgId);
    if (selectedOrg) {
      localStorage.setItem('currentOrganization', JSON.stringify(selectedOrg));
      setSelectedOrg(orgId);
    }
  };

  return (
    <div className="flex items-center gap-2 max-w-full">
      <Select value={selectedOrg} onValueChange={handleOrgChange} className="flex-1 min-w-0">
        <SelectTrigger className="w-full max-w-full truncate">
          <SelectValue placeholder="Select organization" className="truncate" />
        </SelectTrigger>
        <SelectContent>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <OrganizationDialog onOrgCreated={loadOrganizations} />
    </div>
  );
};

export default OrganizationSwitcher;
