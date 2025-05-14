
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ExternalLink, Play, MessageSquare, PenTool, Phone, Bot, Volume2, Mic, Key, BarChart, TrendingUp, Users } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import AssistantCard from '@/components/AssistantCard';
import ConfigSection from '@/components/ConfigSection';
import { useAssistantStore } from '@/store/useAssistantStore';
import AssistantConfig from '@/components/AssistantConfig';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from 'react-router-dom';

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
    draft: 1
  };
  
  const agentStats = {
    total: 8,
    active: 5,
    topPerformer: 'Customer Support Agent',
  };
  
  const contactStats = {
    totalGroups: 12,
    totalContacts: 5420,
    reachedContacts: 980,
    conversionRate: '12.5%',
  };
  
  // Performance metrics
  const performanceMetrics = {
    callCompleted: 245,
    avgDuration: '2m 35s',
    conversionRate: '18.3%',
    customerSatisfaction: '4.7/5'
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
      
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground">Your AI calling operations at a glance</p>
        </div>
        
        {/* Key Metrics Overview - Responsive Grid */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Calls</p>
              <h3 className="text-xl sm:text-2xl font-bold">{performanceMetrics.callCompleted}</h3>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-2">
                <BarChart className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Avg Duration</p>
              <h3 className="text-xl sm:text-2xl font-bold">{performanceMetrics.avgDuration}</h3>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Conversion</p>
              <h3 className="text-xl sm:text-2xl font-bold">{performanceMetrics.conversionRate}</h3>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Satisfaction</p>
              <h3 className="text-xl sm:text-2xl font-bold">{performanceMetrics.customerSatisfaction}</h3>
            </CardContent>
          </Card>
        </div>
        
        {/* Campaign Stats */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 px-1">Campaign Performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-primary transform transition-transform hover:scale-[1.01] hover:shadow-md">
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">Campaigns</CardDescription>
                <CardTitle className="text-3xl">{campaignStats.total}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-400"></span>
                      <span>Active</span>
                    </div>
                    <div>{campaignStats.active}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                      <span>Completed</span>
                    </div>
                    <div>{campaignStats.completed}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                      <span>Draft</span>
                    </div>
                    <div>{campaignStats.draft}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full group" asChild>
                  <Link to="/campaign" className="flex items-center justify-center">
                    View Campaigns
                    <ExternalLink className="ml-2 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-l-4 border-l-secondary transform transition-transform hover:scale-[1.01] hover:shadow-md">
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">AI Agents</CardDescription>
                <CardTitle className="text-3xl">{agentStats.total}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-400"></span>
                      <span>Active</span>
                    </div>
                    <div>{agentStats.active}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                      <span>Top Performer</span>
                    </div>
                    <div className="truncate max-w-[120px]">{agentStats.topPerformer}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full group" asChild>
                  <Link to="/ai-agents" className="flex items-center justify-center">
                    Manage Agents
                    <ExternalLink className="ml-2 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-l-4 border-l-accent transform transition-transform hover:scale-[1.01] hover:shadow-md">
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">Contacts</CardDescription>
                <CardTitle className="text-3xl">{contactStats.totalContacts.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                      <span>Groups</span>
                    </div>
                    <div>{contactStats.totalGroups}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                      <span>Reached</span>
                    </div>
                    <div>{contactStats.reachedContacts.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-400"></span>
                      <span>Conversion</span>
                    </div>
                    <div>{contactStats.conversionRate}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full group" asChild>
                  <Link to="/phone-numbers" className="flex items-center justify-center">
                    Manage Contacts
                    <ExternalLink className="ml-2 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 px-1">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Start Campaign</CardTitle>
                  <CardDescription>Launch a new calling campaign</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full" asChild>
                  <Link to="/campaign">Create Campaign</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                  <Bot className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Create Agent</CardTitle>
                  <CardDescription>Configure a new AI assistant</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full" asChild>
                  <Link to="/ai-agents">New Agent</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                  <Key className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Provider Keys</CardTitle>
                  <CardDescription>Manage provider keys</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full" asChild>
                  <Link to="/provider-keys">Manage Keys</Link>
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
