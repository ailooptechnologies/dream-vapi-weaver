import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, ChevronDown, ExternalLink, Play, MessageSquare, 
  PenTool, Phone, Bot, Volume2, Mic, Key, BarChart, 
  TrendingUp, Users, Zap, Activity, ArrowUp, ArrowDown 
} from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { useAssistantStore } from '@/store/useAssistantStore';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer } from '@/components/ui/responsive-container';
import { getStaggeredDelay, formatPercentage } from '@/lib/utils';

const Dashboard = () => {
  const { selectedAssistant, assistants, setSelectedAssistant } = useAssistantStore();
  const [progressValues, setProgressValues] = useState({
    campaigns: 0,
    agents: 0,
    calls: 0,
    revenue: 0
  });

  // Animated values for stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValues({
        campaigns: 85,
        agents: 72,
        calls: 94,
        revenue: 65
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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
    growth: 12
  };
  
  const agentStats = {
    total: 8,
    active: 5,
    topPerformer: 'Customer Support Agent',
    growth: 5
  };
  
  const contactStats = {
    totalGroups: 12,
    totalContacts: 5420,
    reachedContacts: 980,
    conversionRate: '12.5%',
    growth: -2
  };
  
  // Performance metrics
  const performanceMetrics = {
    callCompleted: 245,
    avgDuration: '2m 35s',
    conversionRate: '18.3%',
    customerSatisfaction: '4.7/5',
    callsThisWeek: 128,
    growth: 14
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-60 bg-card border-r">
        <SidebarNav />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-60">
          <SidebarNav />
        </SheetContent>
      </Sheet>
      
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="mb-6 sm:mb-8 animate-slide-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-gradient">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground">Your AI calling operations at a glance</p>
          
          {/* Quick links/CTA buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/campaign">
              <Button variant="outline" size="sm" className="group button-hover-effect">
                <MessageSquare className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                New Campaign
              </Button>
            </Link>
            <Link to="/api-docs">
              <Button variant="outline" size="sm" className="group button-hover-effect">
                <PenTool className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                API Docs
              </Button>
            </Link>
            <Link to="/ai-agents">
              <Button variant="outline" size="sm" className="group button-hover-effect">
                <Bot className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                AI Agents
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Key Metrics Overview - Responsive Grid */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 transition-all duration-500 hover:shadow-md hover:shadow-primary/5 group animate-slide-in-up stagger-1">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Calls</p>
              <h3 className="text-xl sm:text-2xl font-bold animate-count">{performanceMetrics.callCompleted}</h3>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>{performanceMetrics.growth}% this week</span>
              </div>
              <Progress value={progressValues.calls} className="h-1 w-full mt-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 transition-all duration-500 hover:shadow-md hover:shadow-secondary/5 group animate-slide-in-up stagger-2">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Activity className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Avg Duration</p>
              <h3 className="text-xl sm:text-2xl font-bold animate-count">{performanceMetrics.avgDuration}</h3>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <ArrowDown className="h-3 w-3 mr-0.5" />
                <span>3% shorter</span>
              </div>
              <Progress value={progressValues.campaigns} className="h-1 w-full mt-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 transition-all duration-500 hover:shadow-md hover:shadow-accent/5 group animate-slide-in-up stagger-3">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Conversion</p>
              <h3 className="text-xl sm:text-2xl font-bold animate-count">{performanceMetrics.conversionRate}</h3>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>2.1% increase</span>
              </div>
              <Progress value={progressValues.agents} className="h-1 w-full mt-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20 transition-all duration-500 hover:shadow-md hover:shadow-primary/5 group animate-slide-in-up stagger-4">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Satisfaction</p>
              <h3 className="text-xl sm:text-2xl font-bold animate-count">{performanceMetrics.customerSatisfaction}</h3>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>0.2 increase</span>
              </div>
              <Progress value={progressValues.revenue} className="h-1 w-full mt-2" />
            </CardContent>
          </Card>
        </div>
        
        {/* Campaign Stats */}
        <div className="mb-8 animate-slide-in-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xl font-semibold mb-4 px-1 flex items-center">
            <span className="text-gradient">Campaign Performance</span>
            <div className="h-1 w-1 rounded-full bg-primary/50 mx-2"></div>
            <span className="text-sm text-muted-foreground font-normal">{campaignStats.total} campaigns</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-primary card-hover-effect overflow-hidden group relative animate-fade-in stagger-1">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                <Button variant="outline" size="sm" className="w-full group button-hover-effect" asChild>
                  <Link to="/campaign" className="flex items-center justify-center">
                    View Campaigns
                    <ExternalLink className="ml-2 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>
              </CardFooter>
              <div className="absolute top-3 right-3 flex items-center">
                <span className="text-xs text-green-500 mr-1">{campaignStats.growth}%</span>
                <ArrowUp className="h-3 w-3 text-green-500" />
              </div>
            </Card>
            
            <Card className="border-l-4 border-l-secondary card-hover-effect overflow-hidden group relative animate-fade-in stagger-2">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                <Button variant="outline" size="sm" className="w-full group button-hover-effect" asChild>
                  <Link to="/ai-agents" className="flex items-center justify-center">
                    Manage Agents
                    <ExternalLink className="ml-2 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>
              </CardFooter>
              <div className="absolute top-3 right-3 flex items-center">
                <span className="text-xs text-green-500 mr-1">{agentStats.growth}%</span>
                <ArrowUp className="h-3 w-3 text-green-500" />
              </div>
            </Card>
            
            <Card className="border-l-4 border-l-accent card-hover-effect overflow-hidden group relative animate-fade-in stagger-3">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                <Button variant="outline" size="sm" className="w-full group button-hover-effect" asChild>
                  <Link to="/phone-numbers" className="flex items-center justify-center">
                    Manage Contacts
                    <ExternalLink className="ml-2 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>
              </CardFooter>
              <div className="absolute top-3 right-3 flex items-center">
                <span className="text-xs text-red-500 mr-1">{contactStats.growth}%</span>
                <ArrowDown className="h-3 w-3 text-red-500" />
              </div>
            </Card>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6 animate-slide-in-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-xl font-semibold mb-4 px-1 flex items-center">
            <span className="text-gradient">Quick Actions</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-shadow group relative overflow-hidden border border-muted card-hover-effect animate-fade-in stagger-1">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform group-hover:bg-primary/20">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Start Campaign</CardTitle>
                  <CardDescription>Launch a new calling campaign</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full group-hover:bg-primary/90 button-hover-effect" asChild>
                  <Link to="/campaign">Create Campaign</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-shadow group relative overflow-hidden border border-muted card-hover-effect animate-fade-in stagger-2">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform group-hover:bg-secondary/20">
                  <Bot className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Create Agent</CardTitle>
                  <CardDescription>Configure a new AI assistant</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full group-hover:bg-secondary/90 button-hover-effect" asChild>
                  <Link to="/ai-agents">New Agent</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-r from-background to-muted/30 hover:shadow-md transition-shadow group relative overflow-hidden border border-muted card-hover-effect animate-fade-in stagger-3">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="pb-2 flex flex-row items-center space-y-0">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform group-hover:bg-accent/20">
                  <Headphones className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Custom Model</CardTitle>
                  <CardDescription>Create a new custom voice model</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button size="sm" className="w-full group-hover:bg-accent/90 button-hover-effect" asChild>
                  <Link to="/custom-models">Create Model</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6 animate-slide-in-up" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xl font-semibold mb-4 px-1 flex items-center">
            <span className="text-gradient">Recent Activity</span>
          </h2>
          <Card className="border border-muted card-hover-effect">
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  { type: 'call', title: 'New call completed', time: '2 minutes ago', icon: <Phone className="h-4 w-4" />, status: 'success' },
                  { type: 'agent', title: 'Agent settings updated', time: '1 hour ago', icon: <Bot className="h-4 w-4" />, status: 'info' },
                  { type: 'campaign', title: 'New campaign created', time: '3 hours ago', icon: <MessageSquare className="h-4 w-4" />, status: 'success' },
                  { type: 'system', title: 'System maintenance completed', time: '1 day ago', icon: <Zap className="h-4 w-4" />, status: 'info' }
                ].map((activity, idx) => (
                  <div key={idx} className={`flex items-center px-4 py-3 hover:bg-muted/40 transition-colors animate-fade-in ${getStaggeredDelay(idx)}`}>
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-3
                      ${activity.status === 'success' ? 'bg-green-100 text-green-600' : ''}
                      ${activity.status === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                      ${activity.status === 'warning' ? 'bg-amber-100 text-amber-600' : ''}
                      ${activity.status === 'error' ? 'bg-red-100 text-red-600' : ''}
                    `}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center py-2 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className="button-hover-effect group"
                asChild
              >
                <Link to="/activity" className="flex items-center">
                  View All Activity
                  <Activity className="ml-2 h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
