import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Pencil, Trash2, Copy, CheckCircle } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AIAgentActions from '@/components/AIAgentActions';
import { PhoneInput } from "@/components/ui/phone-input";

interface AIAgentFormData {
  name: string;
  phoneNumber: string;
  description: string;
  sttProvider: string;
  ttsProvider: string;
  nluProvider: string;
  language: string;
  voice: string;
  personality: string;
  responseTime: number;
  maxCallDuration: number;
  status: 'active' | 'inactive';
  customParameters: string; // Changed from Record<string, string> to string
}

const AIAgents = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAgentForDeletion, setSelectedAgentForDeletion] = useState<string | null>(null);

  // Sample data (in a real app, this would come from API calls)
  const sttProviders = [
    { id: 'stt-1', name: 'Google STT' },
    { id: 'stt-2', name: 'AssemblyAI' },
    { id: 'stt-3', name: 'Deepgram' },
  ];

  const ttsProviders = [
    { id: 'tts-1', name: 'Google TTS' },
    { id: 'tts-2', name: 'ElevenLabs' },
    { id: 'tts-3', name: 'Azure TTS' },
  ];

  const nluProviders = [
    { id: 'nlu-1', name: 'Dialogflow' },
    { id: 'nlu-2', name: 'Rasa' },
    { id: 'nlu-3', name: 'Luis' },
  ];

  const languages = [
    { id: 'lang-1', name: 'English' },
    { id: 'lang-2', name: 'Spanish' },
    { id: 'lang-3', name: 'French' },
  ];

  const voices = [
    { id: 'voice-1', name: 'John (English)' },
    { id: 'voice-2', name: 'Isabella (Spanish)' },
    { id: 'voice-3', name: 'Pierre (French)' },
  ];

  const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phoneNumber: z.string(),
    description: z.string(),
    sttProvider: z.string(),
    ttsProvider: z.string(),
    nluProvider: z.string(),
    language: z.string(),
    voice: z.string(),
    personality: z.string(),
    responseTime: z.number().min(1).max(10),
    maxCallDuration: z.number().min(60),
    status: z.enum(['active', 'inactive']),
    customParameters: z.string() // Changed from Record<string, string> to string
  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '+1 ',
      description: '',
      sttProvider: '',
      ttsProvider: '',
      nluProvider: '',
      language: '',
      voice: '',
      personality: '',
      responseTime: 3,
      maxCallDuration: 300,
      status: 'inactive',
      customParameters: '', // Changed from {} to ''
    },
  });

  const resetAndCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
    setEditingAgentId(null);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // For customParameters, we can parse it if it's provided as a JSON string
    let parsedCustomParameters = {};
    
    try {
      if (data.customParameters) {
        parsedCustomParameters = JSON.parse(data.customParameters);
      }
    } catch (e) {
      console.error("Failed to parse custom parameters:", e);
      toast({
        title: "Invalid custom parameters",
        description: "Please provide valid JSON format for custom parameters.",
        variant: "destructive"
      });
      return;
    }

    if (editingAgentId) {
      setAgents(agents.map(agent => 
        agent.id === editingAgentId ? { 
          ...agent, 
          ...data,
          customParameters: parsedCustomParameters
        } : agent
      ));
      toast({
        title: "AI Agent updated",
        description: "AI Agent has been updated successfully."
      });
    } else {
      const newAgent = {
        id: crypto.randomUUID(),
        ...data,
        customParameters: parsedCustomParameters,
        createdAt: new Date().toISOString(),
      };
      setAgents([...agents, newAgent]);
      toast({
        title: "AI Agent created",
        description: "New AI Agent has been created successfully."
      });
    }
    resetAndCloseDialog();
  };

  const handleEdit = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      // Convert customParameters object back to string for the form
      const customParametersString = 
        typeof agent.customParameters === 'object' && agent.customParameters !== null
          ? JSON.stringify(agent.customParameters, null, 2)
          : '';
      
      form.reset({
        name: agent.name,
        phoneNumber: agent.phoneNumber,
        description: agent.description,
        sttProvider: agent.sttProvider,
        ttsProvider: agent.ttsProvider,
        nluProvider: agent.nluProvider,
        language: agent.language,
        voice: agent.voice,
        personality: agent.personality,
        responseTime: agent.responseTime,
        maxCallDuration: agent.maxCallDuration,
        status: agent.status,
        customParameters: customParametersString,
      });
      setEditingAgentId(agentId);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (agentId: string) => {
    setAgents(agents.filter(a => a.id !== agentId));
    toast({
      title: "AI Agent deleted",
      description: "The AI Agent has been removed."
    });
  };

  const handleStatusChange = (agentId: string, newStatus: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, status: newStatus } : agent
    ));
    
    toast({
      title: `AI Agent ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
      description: `AI Agent has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`
    });
  };

  const handleDuplicate = (agentId: string) => {
    const agentToDuplicate = agents.find(a => a.id === agentId);
    if (agentToDuplicate) {
      const duplicatedAgent = {
        ...agentToDuplicate,
        id: crypto.randomUUID(),
        name: `${agentToDuplicate.name} (Copy)`,
        createdAt: new Date().toISOString(),
      };
      setAgents([...agents, duplicatedAgent]);
      toast({
        title: "AI Agent duplicated",
        description: "AI Agent has been duplicated successfully."
      });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
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
            <h1 className="text-2xl font-bold">AI Agents</h1>
            <p className="text-muted-foreground">Manage your AI agents</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create AI Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingAgentId ? "Edit AI Agent" : "Create New AI Agent"}</DialogTitle>
                <DialogDescription>
                  {editingAgentId ? "Update your AI agent details." : "Set up a new AI agent."}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Sales Agent" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Enter phone number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the agent's purpose..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="sttProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>STT Provider</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select STT Provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sttProviders.map(provider => (
                                <SelectItem key={provider.id} value={provider.id}>{provider.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ttsProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TTS Provider</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select TTS Provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ttsProviders.map(provider => (
                                <SelectItem key={provider.id} value={provider.id}>{provider.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nluProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NLU Provider</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select NLU Provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {nluProviders.map(provider => (
                                <SelectItem key={provider.id} value={provider.id}>{provider.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languages.map(language => (
                                <SelectItem key={language.id} value={language.id}>{language.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="voice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Voice</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Voice" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {voices.map(voice => (
                                <SelectItem key={voice.id} value={voice.id}>{voice.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="personality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personality</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Friendly, Professional" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="responseTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Response Time (seconds)</FormLabel>
                          <FormControl>
                            <Slider
                              defaultValue={[field.value]}
                              max={10}
                              min={1}
                              step={1}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Adjust the agent's response time.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
                            Maximum duration for each call.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="customParameters"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Parameters</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., {'param1': 'value1', 'param2': 'value2'}" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Add custom parameters in JSON format
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-md border p-4 space-y-0">
                        <div className="space-y-0.5">
                          <FormLabel>Status</FormLabel>
                          <FormDescription>
                            Set the agent's status to active or inactive.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === 'active'}
                            onCheckedChange={(checked) => field.onChange(checked ? 'active' : 'inactive')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetAndCloseDialog}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingAgentId ? "Update AI Agent" : "Create AI Agent"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {agents.length > 0 ? (
          <div className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.phoneNumber || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadgeClass(agent.status)} px-2 py-1`}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <AIAgentActions 
                          agentId={agent.id} 
                          agentName={agent.name} 
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                        <Button size="sm" variant="outline" onClick={() => handleDuplicate(agent.id)}>
                          <Copy className="h-4 w-4 mr-1" />
                          Duplicate
                        </Button>
                        {agent.status === 'inactive' ? (
                          <Button size="sm" onClick={() => handleStatusChange(agent.id, 'active')}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Activate
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleStatusChange(agent.id, 'inactive')}>
                            Deactivate
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <h3 className="font-medium mb-2">No AI Agents Created</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your first AI agent to start automating calls</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First AI Agent
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgents;
