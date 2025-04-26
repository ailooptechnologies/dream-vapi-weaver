
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Search, Menu, ChevronDown, ExternalLink, Play, MessageSquare, PenTool, Phone, Bot, Volume2, Mic, Key } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import AssistantCard from '@/components/AssistantCard';
import ConfigSection from '@/components/ConfigSection';
import { useAssistantStore } from '@/store/useAssistantStore';
import AssistantConfig from '@/components/AssistantConfig';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

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
  
  // Sample data for dashboard metrics
  const campaignStats = {
    total: 5,
    active: 2,
    completed: 2,
    draft: 1,
    totalCalls: 1250,
    completedCalls: 980,
    avgDuration: '3:24',
  };
  
  const agentStats = {
    total: 8,
    active: 5,
    totalCallsHandled: 1250,
    avgCallDuration: '3:24',
    topPerformer: 'Customer Support Agent',
  };
  
  const contactStats = {
    totalGroups: 12,
    totalContacts: 5420,
    reachedContacts: 980,
    conversionRate: '12.5%',
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
      
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your AI calling operations</p>
        </div>
        
        {/* Campaign Stats */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Campaigns</CardDescription>
                <CardTitle className="text-3xl">{campaignStats.total}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Active</div>
                  <div>{campaignStats.active}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Completed</div>
                  <div>{campaignStats.completed}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Draft</div>
                  <div>{campaignStats.draft}</div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <a href="/campaign">View Campaigns</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Calls</CardDescription>
                <CardTitle className="text-3xl">{campaignStats.totalCalls}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Completed</div>
                  <div>{campaignStats.completedCalls}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Success Rate</div>
                  <div>{Math.round((campaignStats.completedCalls / campaignStats.totalCalls) * 100)}%</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Avg Duration</div>
                  <div>{campaignStats.avgDuration}</div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full">
                  View Call Records
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>AI Agents</CardDescription>
                <CardTitle className="text-3xl">{agentStats.total}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Active</div>
                  <div>{agentStats.active}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Calls Handled</div>
                  <div>{agentStats.totalCallsHandled}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Top Performer</div>
                  <div className="truncate max-w-[100px]">{agentStats.topPerformer}</div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <a href="/ai-agents">Manage Agents</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Contacts</CardDescription>
                <CardTitle className="text-3xl">{contactStats.totalContacts}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Groups</div>
                  <div>{contactStats.totalGroups}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Reached</div>
                  <div>{contactStats.reachedContacts}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Conversion Rate</div>
                  <div>{contactStats.conversionRate}</div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <a href="/phone-numbers">Manage Contacts</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Start Campaign</CardTitle>
                  <CardDescription>Launch a new calling campaign</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full" asChild>
                  <a href="/campaign">Create Campaign</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Create Agent</CardTitle>
                  <CardDescription>Configure a new AI assistant</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full" asChild>
                  <a href="/ai-agents">New Agent</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">View Analytics</CardTitle>
                  <CardDescription>Review campaign performance</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full">
                  Open Analytics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Configuration Status */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">System Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Speech-to-Text</CardTitle>
                  <CardDescription>Whisper v1 (Active)</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/custom-models">Configure</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Volume2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Text-to-Speech</CardTitle>
                  <CardDescription>ElevenLabs (Active)</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/custom-models">Configure</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Language Model</CardTitle>
                  <CardDescription>GPT-4 (Active)</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/custom-models">Configure</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Provider Keys</CardTitle>
                  <CardDescription>3 Keys Configured</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/provider-keys">Manage Keys</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
