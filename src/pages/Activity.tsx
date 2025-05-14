
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Download, Phone, Bot, User, Search } from 'lucide-react';
import SidebarNav from '@/components/SidebarNav';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Generate mock data for activities
const generateMockActivities = (count: number) => {
  const types = ['call', 'message', 'ai-interaction'];
  const statuses = ['completed', 'failed', 'pending'];
  const activities = [];
  
  for (let i = 1; i <= count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    let iconComponent;
    let title;
    let description;
    
    switch (type) {
      case 'call':
        iconComponent = Phone;
        title = `Outbound call to +1 (555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i).slice(1)}`;
        description = `Duration: ${Math.floor(Math.random() * 10) + 1} minutes`;
        break;
      case 'message':
        iconComponent = User;
        title = `Text message to John Doe ${i}`;
        description = `SMS sent with campaign ${['A', 'B', 'C'][i % 3]}`;
        break;
      case 'ai-interaction':
        iconComponent = Bot;
        title = `AI Agent interaction #${1000 + i}`;
        description = `${Math.floor(Math.random() * 20) + 10} turns conversation`;
        break;
    }
    
    activities.push({
      id: `activity-${i}`,
      type,
      status,
      icon: iconComponent,
      title,
      description,
      datetime: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
    });
  }
  
  return activities;
};

const Activity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities] = useState(generateMockActivities(20));
  const { toast } = useToast();
  
  const filteredActivities = searchTerm 
    ? activities.filter(activity => 
        activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : activities;
    
  const handleDownload = (activityType: string) => {
    // In a real app, this would generate and download a CSV file
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${activityType}-activity-log-${timestamp}.csv`;
    
    // Create CSV content
    const headers = "ID,Type,Status,Title,Description,Date\n";
    const rows = filteredActivities
      .filter(a => activityType === 'all' || a.type === activityType)
      .map(a => `${a.id},${a.type},${a.status},"${a.title}","${a.description}",${a.datetime.toISOString()}`)
      .join('\n');
    
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    
    // Create download link and trigger click
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `${filename} is being downloaded`
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Activity</h1>
            <p className="text-muted-foreground">View your account activity</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" className="flex gap-2" onClick={() => handleDownload('all')}>
              <Download className="h-4 w-4" />
              Download Log
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="call">Calls</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="ai-interaction">AI Interactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>
          
          <TabsContent value="call" className="space-y-4">
            {filteredActivities
              .filter(activity => activity.type === 'call')
              .map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            }
          </TabsContent>
          
          <TabsContent value="message" className="space-y-4">
            {filteredActivities
              .filter(activity => activity.type === 'message')
              .map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            }
          </TabsContent>
          
          <TabsContent value="ai-interaction" className="space-y-4">
            {filteredActivities
              .filter(activity => activity.type === 'ai-interaction')
              .map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            }
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ActivityProps {
  activity: {
    id: string;
    type: string;
    status: string;
    icon: React.ElementType;
    title?: string;
    description?: string;
    datetime: Date;
  };
}

const ActivityCard = ({ activity }: ActivityProps) => {
  const Icon = activity.icon;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-md">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">{activity.title}</CardTitle>
            <CardDescription>{activity.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground">
          {activity.datetime.toLocaleString()}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className={`text-xs px-2 py-1 rounded-full ${
          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
          activity.status === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Activity;
