
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Search, Menu, ChevronDown, ExternalLink, Play, MessageSquare, PenTool } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import AssistantCard from '@/components/AssistantCard';
import ConfigSection from '@/components/ConfigSection';
import { useAssistantStore } from '@/store/useAssistantStore';
import AssistantConfig from '@/components/AssistantConfig';
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { selectedAssistant, assistants, setSelectedAssistant } = useAssistantStore();

  const handleCreateAssistant = () => {
    const newAssistant = {
      id: crypto.randomUUID(),
      name: "New Assistant",
      description: "Description",
      firstMessage: "Hello, how can I help you?",
      provider: "openai",
      model: "gpt-4"
    };
    setSelectedAssistant(newAssistant);
    toast({
      title: "Assistant created",
      description: "New assistant has been created successfully."
    });
  };

  const handleTest = () => {
    toast({
      title: "Test started",
      description: "Testing the assistant configuration..."
    });
  };

  const handlePublish = () => {
    toast({
      title: "Published",
      description: "Assistant has been published successfully."
    });
  };

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
      
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="border-b py-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Button variant="outline">Assistants</Button>
              <Button variant="ghost">Docs</Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search Assistants"
                className="h-10 w-64 rounded-md border bg-background px-8 text-sm"
              />
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Assistant List */}
          <div className="w-64 p-4 border-r">
            <Button 
              className="w-full mb-4 flex items-center gap-2"
              onClick={handleCreateAssistant}
            >
              <span>Create Assistant</span>
            </Button>
            
            {assistants.map(assistant => (
              <AssistantCard 
                key={assistant.id}
                name={assistant.name}
                description={assistant.description}
                isSelected={selectedAssistant?.id === assistant.id}
                onClick={() => setSelectedAssistant(assistant)}
              />
            ))}
          </div>

          {/* Assistant Configuration */}
          <div className="flex-1 p-6">
            {selectedAssistant && (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedAssistant.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedAssistant.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <PenTool className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="flex items-center gap-1" onClick={handleTest}>
                      <Play className="h-4 w-4" />
                      <span>Test</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat</span>
                    </Button>
                    <Button className="flex items-center gap-1" onClick={handlePublish}>
                      <span>Publish</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4 mb-8">
                  <Button variant="outline">Model</Button>
                  <Button variant="outline">Transcriber</Button>
                  <Button variant="outline">Voice</Button>
                  <Button variant="outline">Tools</Button>
                  <Button variant="outline">Analysis</Button>
                  <Button variant="outline">Advanced</Button>
                </div>

                <div className="space-y-4">
                  <ConfigSection 
                    title="Model"
                    description="Configure the behavior of the assistant."
                  >
                    <AssistantConfig />
                  </ConfigSection>
                  
                  <ConfigSection 
                    title="Privacy"
                    description="This section allows you to configure the privacy settings for the assistant."
                  />
                  
                  <ConfigSection 
                    title="Start Speaking Plan"
                    description="This is the plan for when the assistant should start talking."
                  />
                  
                  <ConfigSection 
                    title="Voicemail Detection"
                    description="Configure how the assistant detects and handles voicemail."
                  />
                  
                  <ConfigSection 
                    title="Stop Speaking Plan"
                    description="This is the plan for when the assistant should stop talking."
                  />
                  
                  <ConfigSection 
                    title="Call Timeout Settings"
                    description="Configure when the assistant should end a call based on silence or duration."
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
