
import React, { useState } from 'react';
import SidebarNav from '@/components/SidebarNav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Menu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIAgentsList from '@/components/AIAgentsList';

// Sample data
const initialAgents = [
  {
    id: '1',
    name: 'Customer Support Agent',
    description: 'Handles customer inquiries and support requests.',
    type: 'Support',
    createdAt: new Date(2023, 5, 15)
  },
  {
    id: '2',
    name: 'Sales Representative',
    description: 'Assists with product information and sales.',
    type: 'Sales',
    createdAt: new Date(2023, 6, 22)
  },
  {
    id: '3',
    name: 'Appointment Scheduler',
    description: 'Helps users schedule and manage appointments.',
    type: 'Scheduling',
    createdAt: new Date(2023, 8, 10)
  }
];

const AIAgents = () => {
  const [agents, setAgents] = useState(initialAgents);
  const { toast } = useToast();

  const handleDeleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id));
  };

  const handleEditAgent = (id: string) => {
    // In a real app, this would open an edit dialog
    toast({
      title: "Edit Agent",
      description: `Opening edit dialog for agent ID: ${id}`
    });
  };

  const handleCreateAgent = () => {
    // In a real app, this would open a create dialog
    toast({
      title: "Create Agent",
      description: "Opening create agent dialog"
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-card border-r">
        <SidebarNav />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarNav />
        </SheetContent>
      </Sheet>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">AI Agents</h1>
            <p className="text-muted-foreground">Manage your conversation agents</p>
          </div>
          <Button onClick={handleCreateAgent} className="flex gap-2">
            <Plus className="h-4 w-4" />
            New Agent
          </Button>
        </div>

        <AIAgentsList 
          agents={agents}
          onDelete={handleDeleteAgent}
          onEdit={handleEditAgent}
        />
      </div>
    </div>
  );
};

export default AIAgents;
