
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Bot, MessageSquare, Calendar, Plus, Play, Pencil, Trash2, BarChart } from "lucide-react";
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

interface CampaignFormValues {
  name: string;
  description: string;
  agents: string[];
  phoneGroups: string[];
  prompt: string;
  maxCallDuration: string;
  maxConcurrentCalls: string;
  schedule: string;
}

const Campaign = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCampaignForDeletion, setSelectedCampaignForDeletion] = useState<string | null>(null);

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
    },
  });

  const resetAndCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
    setEditingCampaignId(null);
  };

  const onSubmit = (data: CampaignFormValues) => {
    if (editingCampaignId) {
      setCampaigns(campaigns.map(campaign => 
        campaign.id === editingCampaignId ? { ...campaign, ...data } : campaign
      ));
      toast({
        title: "Campaign updated",
        description: "Campaign has been updated successfully."
      });
    } else {
      const newCampaign = {
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
      form.reset({
        name: campaign.name,
        description: campaign.description,
        agents: campaign.agents,
        phoneGroups: campaign.phoneGroups,
        prompt: campaign.prompt,
        maxCallDuration: campaign.maxCallDuration,
        maxConcurrentCalls: campaign.maxConcurrentCalls,
        schedule: campaign.schedule,
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
      title: `Campaign ${newStatus}`,
      description: `Campaign has been ${newStatus === 'active' ? 'activated' : newStatus === 'paused' ? 'paused' : 'completed'}.`
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
            <h1 className="text-2xl font-bold">Campaigns</h1>
            <p className="text-muted-foreground">Manage your calling campaigns</p>
          </div>
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
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="agents">Agents & Contacts</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
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
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {campaign.schedule === 'immediate' ? 'Start immediately' : 'Scheduled for later'}
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
                  </div>
                  
                  <div className="space-x-2">
                    {campaign.status === 'draft' && (
                      <Button size="sm" onClick={() => handleStatusChange(campaign.id, 'active')}>
                        <Play className="h-4 w-4 mr-1" />
                        Start Campaign
                      </Button>
                    )}
                    {campaign.status === 'active' && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(campaign.id, 'paused')}>
                        Pause Campaign
                      </Button>
                    )}
                    {campaign.status === 'paused' && (
                      <Button size="sm" onClick={() => handleStatusChange(campaign.id, 'active')}>
                        Resume Campaign
                      </Button>
                    )}
                    {(campaign.status === 'active' || campaign.status === 'paused') && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(campaign.id, 'completed')}>
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <MessageSquare className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No Campaigns Created</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your first campaign to start making calls</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Campaign
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected campaign.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Campaign;
