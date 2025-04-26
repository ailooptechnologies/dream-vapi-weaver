
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Search, Menu, ChevronDown, ExternalLink, Play, MessageSquare, PenTool } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SidebarNav from '@/components/SidebarNav';
import AssistantCard from '@/components/AssistantCard';
import ConfigSection from '@/components/ConfigSection';

const Dashboard = () => {
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>("Riley");

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-card border-r">
        <SidebarNav />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarNav />
        </SheetContent>
      </Sheet>
      
      {/* Main Content */}
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
            <Button className="w-full mb-4 flex items-center gap-2 bg-primary">
              <span>Create Assistant</span>
            </Button>
            
            <AssistantCard 
              name="Riley"
              description="Elliot"
              isSelected={selectedAssistant === "Riley"}
              onClick={() => setSelectedAssistant("Riley")}
            />
          </div>

          {/* Assistant Configuration */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold">Riley</h2>
                <p className="text-sm text-muted-foreground">c139d93-7a62-4c6b-8bd4-ab59603f15f4</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <PenTool className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  <span>Test</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </Button>
                <Button className="flex items-center gap-1">
                  <span>Talk to Assistant</span>
                </Button>
                <Button className="bg-primary flex items-center gap-1">
                  <span>Publish</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button variant="outline" className="flex gap-2">
                Model
              </Button>
              <Button variant="outline" className="flex gap-2">
                Transcriber
              </Button>
              <Button variant="outline" className="flex gap-2">
                Voice
              </Button>
              <Button variant="outline" className="flex gap-2">
                Tools
              </Button>
              <Button variant="outline" className="flex gap-2">
                Analysis
              </Button>
              <Button variant="outline" className="flex gap-2">
                Advanced
              </Button>
            </div>

            <div className="space-y-4">
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
              
              <ConfigSection 
                title="Predefined Functions"
                description="We've pre-built functions for common use cases. You can enable them and configure them below."
              />
              
              <ConfigSection 
                title="Custom Functions"
                description="Define your custom functions here to enhance your assistant's capabilities. You can use your own code or tools like Pipedream or Make for the setup."
              />
              
              <ConfigSection 
                title="Voice Configuration"
                description="Select a voice from the list, or sync your voice library if it's missing. If errors persist, enable custom voice and add a voice ID."
              />
              
              <ConfigSection 
                title="Model"
                description="Configure the behavior of the assistant."
              >
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Message</label>
                    <textarea 
                      className="w-full h-20 p-2 border rounded-md bg-background"
                      defaultValue="Thank you for calling Wellness Partners. This is Riley, your scheduling assistant."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Provider</label>
                      <select className="w-full p-2 border rounded-md bg-background">
                        <option>openai</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Model</label>
                      <select className="w-full p-2 border rounded-md bg-background">
                        <option>gpt-4o</option>
                      </select>
                    </div>
                  </div>
                </div>
              </ConfigSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
