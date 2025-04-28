import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Bot, MessageSquare, Calendar as CalendarIcon, Plus, Play, Pencil, Trash2, BarChart, Pause, CheckCircle, List, Filter, Search, User, FileText } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";
import FileUpload from '@/components/FileUpload';
import { useNavigate } from 'react-router-dom';

interface CampaignFormValues {
  name: string;
  description: string;
  agents: string[];
  phoneGroups: string[];
  prompt: string;
  maxCallDuration: string;
  maxConcurrentCalls: string;
  schedule: string;
  scheduledDate?: Date;
  scheduledTime?: string;
  script: string;
  trainingData: string;
  trainingImages: string[];
  callLogs: CallLog[];
  trainingFiles: File[];
  trainingUrls: string[];
}

interface CallLog {
  id: string;
  botId: string;
  botName: string;
  phoneNumber: string;
  status: 'connected' | 'disconnected' | 'busy' | 'no-answer' | 'failed';
  duration: number;
  timestamp: Date;
  summary: string;
}

const Campaign = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCampaignForDeletion, setSelectedCampaignForDeletion] = useState<string | null>(null);
  const [date, setDate] = useState<Date>();
  
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBot, setFilterBot] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState<CallLog | null>(null);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCampaignForLogs, setSelectedCampaignForLogs] = useState<string | null>(null);
  const [showCallLogsDialog, setShowCallLogsDialog] = useState(false);
  
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    // Simulate loading call logs for demo
    if (selectedCampaignForLogs) {
      const mockCallLogs: CallLog[] = [
        {
          id: '1',
          botId: 'agent-1',
          botName: 'Customer Support Agent',
          phoneNumber: '+1 (555) 123-4567',
          status: 'connected',
          duration: 185,
          timestamp: new Date(2023, 3, 15, 10, 30),
          summary: 'Customer inquired about product features. Agent explained the subscription options and recommended the premium plan. Customer showed interest and requested a follow-up call next week.'
        },
        {
          id: '2',
          botId: 'agent-2',
          botName: 'Sales Agent',
          phoneNumber: '+1 (555) 234-5678',
          status: 'disconnected',
          duration: 45,
          timestamp: new Date(2023, 3, 15, 11, 15),
          summary: 'Call disconnected after initial greeting. Customer seemed interested but had poor connection.'
        },
        {
          id: '3',
          botId: 'agent-1',
          botName: 'Customer Support Agent',
          phoneNumber: '+1 (555) 345-6789',
          status: 'no-answer',
          duration: 0,
          timestamp: new Date(2023, 3, 15, 13, 45),
          summary: 'No answer after 6 rings. Voice message left about the promotional offer.'
        },
        {
          id: '4',
          botId: 'agent-3',
          botName: 'Appointment Scheduler',
          phoneNumber: '+1 (555) 456-7890',
          status: 'connected',
          duration: 240,
          timestamp: new Date(2023, 3, 16, 9, 30),
          summary: 'Successfully scheduled appointment for product demo on Friday at 2 PM. Customer expressed high interest in the enterprise solution. Follow-up email with details was sent.'
        },
        {
          id: '5',
          botId: 'agent-2',
          botName: 'Sales Agent',
          phoneNumber: '+1 (555) 567-8901',
          status: 'busy',
          duration: 0,
          timestamp: new Date(2023, 3, 16, 14, 0),
          summary: 'Line was busy. Scheduled for automatic callback in 2 hours.'
        },
        {
          id: '6',
          botId: 'agent-3',
          botName: 'Appointment Scheduler',
          phoneNumber: '+1 (555) 678-9012',
          status: 'failed',
          duration: 3,
          timestamp: new Date(2023, 3, 16, 16, 15),
          summary: 'Call failed due to technical issues. System will retry automatically tomorrow.'
        }
      ];
      setCallLogs(mockCallLogs);
    }
  }, [selectedCampaignForLogs]);

  // Sample data (in a real app, this would come from API calls)
  const agents = [
    { id: 'agent-1', name: 'Customer Support Agent' },
    { id: 'agent-2', name: 'Sales Agent' },
    { id: 'agent-3', name: 'Appointment Scheduler' },
  ];

  const phoneGroups = [
    { id: 'group-1', name: 'New Leads' },
    { id: 'group-2', name: 'Customers' },
    { id: 'group-3', name: 'Follow-ups' },
  ];

  const form = useForm<CampaignFormValues>({
    defaultValues: {
      name: '',
      description: '',
      agents: [],
      phoneGroups: [],
      prompt: '',
      maxCallDuration: '300',
      maxConcurrentCalls: '5',
      schedule: 'immediate',
      scheduledTime: '09:00',
      script: '',
      trainingData: '',
      trainingImages: [],
      callLogs: [],
      trainingFiles: [],
      trainingUrls: [],
    },
  });

  // Watch the schedule type to conditionally show date/time pickers
  const scheduleType = form.watch("schedule");

  const resetAndCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
    setEditingCampaignId(null);
  };

  // Updated handleNextTab function to properly navigate between tabs
  const handleNextTab = () => {
    switch(activeTab) {
      case 'basic':
        setActiveTab('agents');
        break;
      case 'agents':
        setActiveTab('settings');
        break;
      case 'settings':
        setActiveTab('training');
        break;
      default:
        break;
    }
  };

  // This function is only triggered from the final "Create Campaign" button on the training tab
  const onSubmit = (data: CampaignFormValues) => {
    // Store as draft in localStorage before testing
    const draftCampaign = {
      id: crypto.randomUUID(),
      ...data,
      status: "draft",
      createdAt: new Date().toISOString(),
      stats: {
        total: 0,
        completed: 0,
        inProgress: 0,
        scheduled: 0,
        failed: 0
      }
    };
    
    // Save draft to localStorage
    localStorage.setItem('currentCampaign', JSON.stringify(draftCampaign));
    
    // Navigate to testing
    navigate('/campaign/testing');
  };

  const handleEdit = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      // Parse scheduled date and time if they exist
      let scheduledDate;
      let scheduledTime = '09:00';
      if (campaign.scheduledDateTime) {
        const date = new Date(campaign.scheduledDateTime);
        scheduledDate = date;
        scheduledTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      }

      form.reset({
        name: campaign.name,
        description: campaign.description,
        agents: campaign.agents,
        phoneGroups: campaign.phoneGroups,
        prompt: campaign.prompt,
        maxCallDuration: campaign.maxCallDuration,
        maxConcurrentCalls: campaign.maxConcurrentCalls,
        schedule: campaign.schedule,
        scheduledDate,
        scheduledTime,
        script: campaign.script,
        trainingData: campaign.trainingData,
        trainingImages: campaign.trainingImages,
        callLogs: campaign.callLogs,
      });
      setEditingCampaignId(campaignId);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (campaignId: string) => {
    setSelectedCampaignForDeletion(campaignId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCampaignForDeletion) {
      setCampaigns(campaigns.filter(c => c.id !== selectedCampaignForDeletion));
      toast({
        title: "Campaign deleted",
        description: "The campaign has been removed."
      });
      setDeleteDialogOpen(false);
      setSelectedCampaignForDeletion(null);
    }
  };

  const handleStatusChange = (campaignId: string, newStatus: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign
    ));
    
    toast({
      title: `Campaign ${newStatus === 'active' ? 'activated' : newStatus === 'paused' ? 'paused' : 'completed'}`,
      description: `Campaign has been ${newStatus === 'active' ? 'activated' : newStatus === 'paused' ? 'paused' : 'marked as completed'}.`
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'connected':
        return 'secondary'; // Changed from 'success' to 'secondary'
      case 'disconnected':
        return 'destructive';
      case 'busy':
        return 'secondary';
      case 'no-answer':
        return 'outline'; // Changed from 'warning' to 'outline'
      case 'failed':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
  };

  // Add file handling functions
  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
    form.setValue('trainingFiles', files);
  };
  
  const handleViewLogs = (campaignId: string) => {
    setSelectedCampaignForLogs(campaignId);
    setShowCallLogsDialog(true);
  };
  
  // New function to export call logs as CSV
  const exportCallLogs = () => {
    if (!filteredLogs.length) {
      toast({
        title: "No logs to export",
        description: "There are no call logs matching your filters to export.",
        variant: "destructive"
      });
      return;
    }
    
    // Create CSV header row
    const headers = ['Agent', 'Phone Number', 'Status', 'Duration', 'Date & Time', 'Summary'];
    
    // Create CSV data rows
    const csvData = filteredLogs.map(log => [
      log.botName,
      log.phoneNumber,
      log.status,
      log.status !== 'no-answer' && log.status !== 'busy' ? formatDuration(log.duration) : '—',
      format(log.timestamp, "MMM d, yyyy h:mm a"),
      log.summary
    ]);
    
    // Combine header and data
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up download attributes
    link.setAttribute('href', url);
    link.setAttribute('download', `call-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.display = 'none';
    
    // Append to document, trigger download and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: "Call logs have been exported to CSV successfully."
    });
  };
  
  // Filter logs based on search and filters
  const filteredLogs = callLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.botName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesBot = filterBot === 'all' || log.botId === filterBot;
    
    return matchesSearch && matchesStatus && matchesBot;
  });
  
  const viewCallSummary = (log: CallLog) => {
    setSelectedLog(log);
    setShowSummaryDialog(true);
  };

  // Update campaign card to show test results
  const renderTestResults = (campaign: any) => {
    if (!campaign.testResults) return null;
    
    return (
      <div className="border rounded-md p-3 mt-4 bg-secondary/10">
        <h4 className="text-sm font-medium mb-2">Test Results</h4>
        <div className="space-y-2">
          <p className="text-sm">
            Tested on {campaign.testResults.testedNumbers.length} numbers
            on {new Date(campaign.testResults.testedAt).toLocaleDateString()}
          </p>
          {Object.entries(campaign.testResults.feedback).map(([idx, data]: [string, any]) => (
            <div key={idx} className="text-sm">
              <span className="font-medium">Call {Number(idx) + 1}:</span> {data.rating}
              {data.feedback && (
                <p className="text-muted-foreground ml-4">{data.feedback}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Campaigns</h1>
            <p className="text-muted-foreground">Manage your calling campaigns</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingCampaignId ? "Edit Campaign" : "Create New Campaign"}</DialogTitle>
                  <DialogDescription>
                    {editingCampaignId ? "Update your campaign details." : "Set up a new calling campaign."}
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="agents">Agents & Contacts</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="training">Training</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="basic" className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Campaign Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Q2 Sales Outreach" {...field} required />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Describe the campaign purpose..." {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="prompt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>AI Agent Prompt</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Provide context and instructions for the AI agent..." 
                                  className="min-h-[150px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                This prompt instructs the AI how to handle the calls
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="agents" className="space-y-4">
                        <FormField
                          control={form.control}
                          name="agents"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Select AI Agents</FormLabel>
                                <FormDescription>
                                  Choose which AI agents will handle calls in this campaign
                                </FormDescription>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {agents.map((agent) => (
                                  <FormField
                                    key={agent.id}
                                    control={form.control}
                                    name="agents"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={agent.id}
                                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(agent.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, agent.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== agent.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-medium">
                                              {agent.name}
                                            </FormLabel>
                                          </div>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phoneGroups"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Select Contact Groups</FormLabel>
                                <FormDescription>
                                  Choose which contact groups to target in this campaign
                                </FormDescription>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {phoneGroups.map((group) => (
                                  <FormField
                                    key={group.id}
                                    control={form.control}
                                    name="phoneGroups"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={group.id}
                                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(group.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, group.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== group.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-medium">
                                              {group.name}
                                            </FormLabel>
                                          </div>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="settings" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="maxCallDuration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Max Call Duration (seconds)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="60" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Maximum duration for each call
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="maxConcurrentCalls"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Max Concurrent Calls</FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" max="100" {...field} />
                                </FormControl>
                                <FormDescription>
                                  How many calls can run simultaneously
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="schedule"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Schedule</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select schedule" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="immediate">Start Immediately</SelectItem>
                                  <SelectItem value="scheduled">Schedule for Later</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                When should this campaign begin
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        {scheduleType === 'scheduled' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="scheduledDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                          field.onChange(date);
                                          form.setValue('scheduledDate', date);
                                        }}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                        className={cn("p-3 pointer-events-auto")}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormDescription>
                                    The date to start the campaign
                                  </FormDescription>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="scheduledTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Time</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    The time to start the campaign
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="training" className="space-y-4">
                        <FormField
                          control={form.control}
                          name="script"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Campaign Script</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter the script for AI agents..."
                                  className="min-h-[200px]"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="trainingData"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Training Data</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter training data and context..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="trainingUrls"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Training URLs</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter URLs (one per line) for additional training data..."
                                  className="min-h-[100px]"
                                  value={Array.isArray(field.value) ? field.value.join('\n') : ''}
                                  onChange={(e) => field.onChange(e.target.value.split('\n').filter(Boolean))}
                                />
                              </FormControl>
                              <FormDescription>
                                Enter one URL per line for additional training materials
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <FormItem>
                          <FormLabel>Upload Training Files</FormLabel>
                          <FileUpload onFilesSelected={handleFileSelect} />
                          {selectedFiles.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span>{file.name}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const newFiles = selectedFiles.filter((_, i) => i !== index);
                                      setSelectedFiles(newFiles);
                                      form.setValue('trainingFiles', newFiles);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          <FormDescription>
                            Upload PDFs, documents, images, or videos to train the AI agent
                          </FormDescription>
                        </FormItem>
                      </TabsContent>
                    </Tabs>
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={resetAndCloseDialog}>
                        Cancel
                      </Button>
                      {activeTab !== 'training' ? (
                        <Button type="button" onClick={handleNextTab}>
                          Next
                        </Button>
                      ) : (
                        <Button type="submit">
                          Create Campaign
                        </Button>
                      )}
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {campaigns.length > 0 ? (
          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl">{campaign.name}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">{campaign.description}</CardDescription>
                    </div>
                    <Badge className={`${getStatusBadgeClass(campaign.status)} px-3 py-1`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Selected Agents</h4>
                      <div className="flex flex-wrap gap-1">
                        {campaign.agents?.map((agentId: string) => (
                          <div key={agentId} className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-xs">
                            <Bot className="h-3 w-3" />
                            <span>{agents.find(a => a.id === agentId)?.name || agentId}</span>
                          </div>
                        ))}
                        {!campaign.agents?.length && (
                          <span className="text-sm text-muted-foreground">
