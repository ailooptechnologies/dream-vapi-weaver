
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bot, Plus } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';

const AIAgents = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
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
            <p className="text-muted-foreground">Create and manage your AI agents</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Agent
          </Button>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Empty State */}
          <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <Bot className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No Agents Created</h3>
            <p className="text-sm text-muted-foreground">Create your first AI agent to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgents;
