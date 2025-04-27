import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Bot, MessageSquare, Calendar as CalendarIcon, Plus, Play, Pencil, Trash2, BarChart, Pause, CheckCircle, List, Filter, Search, User } from "lucide-react";
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
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCampaignForDeletion, setSelectedCampaignForDeletion] = useState<string | null>(null);
  const [date, setDate] = useState<Date>();
  
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterBot, setFilterBot] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState<CallLog | null>(null);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCampaignForLogs, setSelectedCampaignForLogs] = useState<string | null>(null);
  const [showCallLogsDialog, setShowCallLogsDialog] = useState(false);
  
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

  const onSubmit = (data: CampaignFormValues) => {
    // Format the scheduled date and time if applicable
    let scheduledDateTime = null;
    if (data.schedule === 'scheduled' && data.scheduledDate) {
      const timeString = data.scheduledTime || '00:00';
      const [hours, minutes] = timeString.split(':').map(Number);
      const scheduledDate = new Date(data.scheduledDate);
      scheduledDate.setHours(hours, minutes);
      scheduledDateTime = scheduledDate.toISOString();
    }

    if (editingCampaignId) {
      setCampaigns(campaigns.map(campaign => 
        campaign.id === editingCampaignId ? { 
          ...campaign, 
          ...data,
          scheduledDateTime 
        } : campaign
      ));
      toast({
        title: "Campaign updated",
        description: "Campaign has been updated successfully."
      });
    } else {
      const newCampaign = {
        id: crypto.randomUUID(),
        ...data,
        scheduledDateTime,
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
      setCampaigns([...campaigns, newCampaign]);
      toast({
        title: "Campaign created",
        description: "New campaign has been created successfully."
      });
    }
    resetAndCloseDialog();
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
  
  // Filter logs based on search and filters
  const filteredLogs = callLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.botName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = filterStatus === '' || log.status === filterStatus;
    const matchesBot = filterBot === '' || log.botId === filterBot;
    
    return matchesSearch && matchesStatus && matchesBot;
  });
  
  const viewCallSummary = (log: CallLog) => {
    setSelectedLog(log);
    setShowSummaryDialog(true);
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
                    <Tabs defaultValue="basic" className="w-full">
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
                                      )
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
                                      )
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
                      <Button type="submit">
                        {editingCampaignId ? "Update Campaign" : "Create Campaign"}
                      </Button>
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
                        {!campaign.agents?.length && <span className="text-sm text-muted-foreground">No agents selected</span>}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Groups</h4>
                      <div className="flex flex-wrap gap-1">
                        {campaign.phoneGroups?.map((groupId: string) => (
                          <div key={groupId} className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-xs">
                            <Phone className="h-3 w-3" />
                            <span>{phoneGroups.find(g => g.id === groupId)?.name || groupId}</span>
                          </div>
                        ))}
                        {!campaign.phoneGroups?.length && <span className="text-sm text-muted-foreground">No groups selected</span>}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Schedule</h4>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {campaign.schedule === 'immediate' ? 
                            'Start immediately' : 
                            campaign.scheduledDateTime ? 
                              `Scheduled for ${format(new Date(campaign.scheduledDateTime), "PPP 'at' p")}` :
                              'Scheduled for later'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {campaign.stats && (
                    <div className="border rounded-md p-3 bg-secondary/20">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <BarChart className="h-4 w-4" />
                        Campaign Progress
                      </h4>
                      <div className="grid grid-cols-5 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold">{campaign.stats.total || 0}</div>
                          <div className="text-xs text-muted-foreground">Total</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{campaign.stats.completed || 0}</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{campaign.stats.inProgress || 0}</div>
                          <div className="text-xs text-muted-foreground">In Progress</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{campaign.stats.scheduled || 0}</div>
                          <div className="text-xs text-muted-foreground">Scheduled</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{campaign.stats.failed || 0}</div>
                          <div className="text-xs text-muted-foreground">Failed</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 justify-between pt-4">
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(campaign.id)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDeleteClick(campaign.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleViewLogs(campaign.id)}>
                      <List className="h-4 w-4 mr-1" />
                      Call Logs
                    </Button>
                  </div>
                  <div className="space-x-2">
                    {campaign.status === 'active' ? (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(campaign.id, 'paused')}>
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                    ) : campaign.status === 'paused' ? (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(campaign.id, 'active')}>
                        <Play className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleStatusChange(campaign.id, 'active')}>
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleStatusChange(campaign.id, 'completed')}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-card/50">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No campaigns yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create your first campaign to start making automated AI-powered calls to your contacts.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Create First Campaign
            </Button>
          </div>
        )}
        
        {/* Call Logs Dialog */}
        <Dialog open={showCallLogsDialog} onOpenChange={setShowCallLogsDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Call Logs</DialogTitle>
              <DialogDescription>
                View all call logs for this campaign
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by phone number or agent..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="connected">Connected</SelectItem>
                    <SelectItem value="disconnected">Disconnected</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="no-answer">No Answer</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterBot} onValueChange={setFilterBot}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <SelectValue placeholder="Filter by agent" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    {agents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Call Log Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              {log.botName}
                            </div>
                          </TableCell>
                          <TableCell>{log.phoneNumber}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(log.status)}>
                              {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.status !== 'no-answer' && log.status !== 'busy' ? formatDuration(log.duration) : '—'}</TableCell>
                          <TableCell>{format(log.timestamp, "MMM d, yyyy h:mm a")}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="ghost" onClick={() => viewCallSummary(log)}>
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Summary
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No call logs found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Call Summary Dialog */}
        <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Call Summary</DialogTitle>
              <DialogDescription>
                Detailed information about this call
              </DialogDescription>
            </DialogHeader>
            
            {selectedLog && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Agent</h4>
                    <p>{selectedLog.botName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Phone Number</h4>
                    <p>{selectedLog.phoneNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                    <Badge variant={getBadgeVariant(selectedLog.status)}>
                      {selectedLog.status.charAt(0).toUpperCase() + selectedLog.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                    <p>{selectedLog.status !== 'no-answer' && selectedLog.status !== 'busy' ? formatDuration(selectedLog.duration) : '—'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Date & Time</h4>
                    <p>{format(selectedLog.timestamp, "PPP 'at' p")}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Call Summary</h4>
                  <div className="p-4 border rounded-md bg-secondary/10">
                    {selectedLog.summary || 'No summary available.'}
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button onClick={() => setShowSummaryDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Delete Campaign Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                campaign and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Campaign;
