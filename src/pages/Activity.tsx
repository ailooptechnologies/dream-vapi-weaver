import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, Calendar, Phone, Bot, MessageSquare, FileText, Clock, ArrowRight, 
  ArrowUp, ArrowDown, Filter, Download, RefreshCcw, Search, XCircle
} from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define activity data structure
interface ActivityItem {
  id: string;
  type: 'call' | 'agent' | 'campaign' | 'system';
  title: string;
  description: string;
  time: string;
  date: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const Activity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data fetching
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockActivities: ActivityItem[] = [
        {
          id: '1',
          type: 'call',
          title: 'Call to John Smith completed',
          description: 'Duration: 3m 24s. Topics: Product demo, pricing, next steps.',
          time: '2:15 PM',
          date: 'Today',
          status: 'success'
        },
        {
          id: '2',
          type: 'agent',
          title: 'Sales Agent updated',
          description: 'Updated model from GPT-3.5 to GPT-4. New parameters configured.',
          time: '11:32 AM',
          date: 'Today',
          status: 'info'
        },
        {
          id: '3',
          type: 'campaign',
          title: 'Demo Campaign launched',
          description: 'Targeting 235 contacts. Scheduled: Daily 9AM-5PM.',
          time: '9:45 AM',
          date: 'Today',
          status: 'success'
        },
        {
          id: '4',
          type: 'call',
          title: 'Call to Sarah Johnson failed',
          description: 'Reason: No answer. System will retry tomorrow.',
          time: '5:20 PM',
          date: 'Yesterday',
          status: 'error'
        },
        {
          id: '5',
          type: 'system',
          title: 'System maintenance',
          description: 'Scheduled downtime: 2:00 AM - 3:00 AM EST for database optimization.',
          time: '3:00 PM',
          date: 'Yesterday',
          status: 'warning'
        },
        {
          id: '6',
          type: 'call',
          title: 'Call to Michael Davis completed',
          description: 'Duration: 5m 12s. Topics: Technical support, troubleshooting.',
          time: '1:10 PM',
          date: 'Yesterday',
          status: 'success'
        },
        {
          id: '7',
          type: 'campaign',
          title: 'Support Campaign paused',
          description: 'Paused by admin user. Reason: Content review needed.',
          time: '10:30 AM',
          date: '2 days ago',
          status: 'warning'
        },
        {
          id: '8',
          type: 'agent',
          title: 'New Agent created',
          description: 'Support Specialist agent created and configured with GPT-4.',
          time: '9:15 AM',
          date: '2 days ago',
          status: 'info'
        },
        {
          id: '9',
          type: 'system',
          title: 'API key rotated',
          description: 'OpenAI API key automatically rotated. Services unaffected.',
          time: '8:40 AM',
          date: '3 days ago',
          status: 'info'
        },
        {
          id: '10',
          type: 'call',
          title: 'Call to Lisa Roberts completed',
          description: 'Duration: 2m 45s. Topics: Subscription renewal, upgrades.',
          time: '4:50 PM',
          date: '3 days ago',
          status: 'success'
        },
      ];
      
      setActivities(mockActivities);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.type === filter;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Helper function for icon rendering
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'agent':
        return <Bot className="h-4 w-4" />;
      case 'campaign':
        return <MessageSquare className="h-4 w-4" />;
      case 'system':
        return <RefreshCcw className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Helper function for status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>;
      case 'warning':
        return <Badge variant="warning" className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'info':
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
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
        <div className="mb-6 animate-slide-in-up">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-gradient">Activity Log</h1>
          <p className="text-muted-foreground">Track all system activities and events</p>
        
          {/* Filters and Actions */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search activities..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="call">Calls</SelectItem>
                  <SelectItem value="agent">Agents</SelectItem>
                  <SelectItem value="campaign">Campaigns</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 800);
                }}
              >
                <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Activity List */}
        <Tabs defaultValue="all" className="animate-slide-in-up">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              // Loading state
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted"></div>
                        <div className="flex-1">
                          <div className="h-5 bg-muted rounded-md w-2/3 mb-2"></div>
                          <div className="h-4 bg-muted rounded-md w-full mb-2"></div>
                          <div className="h-4 bg-muted rounded-md w-1/2"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredActivities.length === 0 ? (
              // Empty state
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No activities found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters or search term</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              // Activity cards
              <div className="space-y-4">
                {filteredActivities.map((activity, index) => (
                  <Card 
                    key={activity.id}
                    className="overflow-hidden hover:shadow-md transition-shadow animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center
                          ${activity.status === 'success' ? 'bg-green-100 text-green-600' : ''}
                          ${activity.status === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                          ${activity.status === 'warning' ? 'bg-amber-100 text-amber-600' : ''}
                          ${activity.status === 'error' ? 'bg-red-100 text-red-600' : ''}
                        `}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium">{activity.title}</h3>
                            {getStatusBadge(activity.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{activity.time}</span>
                            <span className="mx-2">•</span>
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{activity.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="py-4 text-center">
                  <Button variant="outline">Load more activities</Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Other tab contents would filter by date */}
          <TabsContent value="today" className="space-y-4">
            {!isLoading && filteredActivities.filter(a => a.date === 'Today').map((activity, index) => (
              <Card 
                key={activity.id}
                className="overflow-hidden hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${activity.status === 'success' ? 'bg-green-100 text-green-600' : ''}
                      ${activity.status === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                      ${activity.status === 'warning' ? 'bg-amber-100 text-amber-600' : ''}
                      ${activity.status === 'error' ? 'bg-red-100 text-red-600' : ''}
                    `}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{activity.title}</h3>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Similar content for other tabs */}
          <TabsContent value="week">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Week view</h3>
              <p className="text-muted-foreground mt-1">Showing activities from this week</p>
            </div>
          </TabsContent>
          
          <TabsContent value="month">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Month view</h3>
              <p className="text-muted-foreground mt-1">Showing activities from this month</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Activity;
