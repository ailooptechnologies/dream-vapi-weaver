
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bot, Plus, Pencil, Trash2, Activity, Volume2, Mic, MessageSquare } from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AIAgentFormValues {
  name: string;
  description: string;
  phoneNumber: string;
  defaultPrompt: string;
  sttModel: string;
  ttsModel: string;
  nluModel: string;
  voice: string;
  language: string;
  maxDuration: number;
}

const AIAgents = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);
  
  // Sample data for models and voices
  const [customModels, setCustomModels] = useState({
    stt: [{ id: 'stt-1', name: 'Default STT Model' }],
    tts: [{ id: 'tts-1', name: 'Default TTS Model' }],
    nlu: [{ id: 'nlu-1', name: 'Default NLU Model' }]
  });

  const voices = [
    { id: 'voice-1', name: 'Aria', gender: 'Female' },
    { id: 'voice-2', name: 'Roger', gender: 'Male' },
    { id: 'voice-3', name: 'Sarah', gender: 'Female' },
    { id: 'voice-4', name: 'George', gender: 'Male' },
  ];

  const languages = [
    { value: 'en-US', name: 'English (US)' },
    { value: 'en-GB', name: 'English (UK)' },
    { value: 'es-ES', name: 'Spanish (Spain)' },
    { value: 'fr-FR', name: 'French (France)' },
    { value: 'de-DE', name: 'German (Germany)' },
  ];

  // Fetch custom models (in a real app, this would be an API call)
  useEffect(() => {
    // Simulating API fetch
    const mockFetchModels = () => {
      return {
        stt: [
          { id: 'stt-1', name: 'OpenAI Whisper' },
          { id: 'stt-2', name: 'Google Cloud STT' },
          { id: 'stt-3', name: 'Deepgram' },
        ],
        tts: [
          { id: 'tts-1', name: 'ElevenLabs Multilingual v2' },
          { id: 'tts-2', name: 'Google WaveNet' },
          { id: 'tts-3', name: 'Amazon Polly Neural' },
        ],
        nlu: [
          { id: 'nlu-1', name: 'GPT-4' },
          { id: 'nlu-2', name: 'Claude 3 Opus' },
          { id: 'nlu-3', name: 'Mistral Large' },
        ]
      };
    };
    
    setCustomModels(mockFetchModels());
  }, []);

  const form = useForm<AIAgentFormValues>({
    defaultValues: {
      name: '',
      description: '',
      phoneNumber: '',
      defaultPrompt: '',
      sttModel: '',
      ttsModel: '',
      nluModel: '',
      voice: '',
      language: 'en-US',
      maxDuration: 300,
    }
  });

  const resetAndCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
    setEditingAgentId(null);
  };

  const onSubmit = (data: AIAgentFormValues) => {
    const sttModel = customModels.stt.find(model => model.id === data.sttModel);
    const ttsModel = customModels.tts.find(model => model.id === data.ttsModel);
    const nluModel = customModels.nlu.find(model => model.id === data.nluModel);
    const selectedVoice = voices.find(v => v.id === data.voice);
    const selectedLanguage = languages.find(l => l.value === data.language);

    if (editingAgentId) {
      setAgents(agents.map(agent => 
        agent.id === editingAgentId ? { 
          ...agent, 
          ...data, 
          sttModelName: sttModel?.name,
          ttsModelName: ttsModel?.name, 
          nluModelName: nluModel?.name,
          voiceName: selectedVoice?.name,
          languageName: selectedLanguage?.name,
        } : agent
      ));
      toast({
        title: "Agent updated",
        description: "AI agent has been updated successfully."
      });
    } else {
      const newAgent = {
        id: crypto.randomUUID(),
        ...data,
        sttModelName: sttModel?.name,
        ttsModelName: ttsModel?.name,
        nluModelName: nluModel?.name,
        voiceName: selectedVoice?.name,
        languageName: selectedLanguage?.name,
        status: 'inactive',
        createdAt: new Date().toISOString(),
      };
      setAgents([...agents, newAgent]);
      toast({
        title: "Agent created",
        description: "New AI agent has been created successfully."
      });
    }
    resetAndCloseDialog();
  };

  const handleEdit = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      form.reset({
        name: agent.name,
        description: agent.description,
        phoneNumber: agent.phoneNumber,
        defaultPrompt: agent.defaultPrompt,
        sttModel: agent.sttModel,
        ttsModel: agent.ttsModel,
        nluModel: agent.nluModel,
        voice: agent.voice,
        language: agent.language,
        maxDuration: agent.maxDuration,
      });
      setEditingAgentId(agentId);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (agentId: string) => {
    setAgentToDelete(agentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (agentToDelete) {
      setAgents(agents.filter(a => a.id !== agentToDelete));
      toast({
        title: "Agent deleted",
        description: "The AI agent has been removed."
      });
      setDeleteDialogOpen(false);
      setAgentToDelete(null);
    }
  };

  const toggleAgentStatus = (agentId: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === agentId) {
        const newStatus = agent.status === 'active' ? 'inactive' : 'active';
        toast({
          title: `Agent ${newStatus}`,
          description: `Agent has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`
        });
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
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
            <p className="text-muted-foreground">Create and manage your voice AI agents</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingAgentId ? "Edit AI Agent" : "Create New AI Agent"}</DialogTitle>
                <DialogDescription>
                  {editingAgentId ? "Update your AI agent details." : "Set up a new AI voice agent."}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="models">Models & Voice</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Agent Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Support Assistant" {...field} required />
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
                              <Textarea placeholder="Describe the agent's purpose..." {...field} />
                            </FormControl>
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
                              <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormDescription>
                              Optional dedicated phone number for this agent
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="defaultPrompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Prompt</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Instructions for the AI agent..." 
                                className="min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Default prompt to use when creating campaigns with this agent
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="models" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name="nluModel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>NLU Model</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select NLU model" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {customModels.nlu.map(model => (
                                    <SelectItem key={model.id} value={model.id}>
                                      {model.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Natural Language Understanding model for text generation
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="sttModel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>STT Model</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select STT model" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {customModels.stt.map(model => (
                                    <SelectItem key={model.id} value={model.id}>
                                      {model.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Speech-to-Text model for understanding user speech
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="ttsModel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>TTS Model</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select TTS model" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {customModels.tts.map(model => (
                                    <SelectItem key={model.id} value={model.id}>
                                      {model.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Text-to-Speech model for agent's voice
                              </FormDescription>
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
                                    <SelectValue placeholder="Select voice" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {voices.map(voice => (
                                    <SelectItem key={voice.id} value={voice.id}>
                                      {voice.name} ({voice.gender})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Voice for the AI agent
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Language</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {languages.map(lang => (
                                    <SelectItem key={lang.value} value={lang.value}>
                                      {lang.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="maxDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Call Duration (seconds)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="60" 
                                  {...field} 
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Maximum duration for calls with this agent
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetAndCloseDialog}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingAgentId ? "Update Agent" : "Create Agent"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle>{agent.name}</CardTitle>
                      <CardDescription className="line-clamp-1">{agent.description}</CardDescription>
                    </div>
                    <Badge className={agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {agent.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>NLU Model</span>
                      </div>
                      <div className="font-medium">{agent.nluModelName || 'Not set'}</div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mic className="h-4 w-4" />
                        <span>STT Model</span>
                      </div>
                      <div className="font-medium">{agent.sttModelName || 'Not set'}</div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Volume2 className="h-4 w-4" />
                        <span>TTS Model</span>
                      </div>
                      <div className="font-medium">{agent.ttsModelName || 'Not set'}</div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Activity className="h-4 w-4" />
                        <span>Voice</span>
                      </div>
                      <div className="font-medium">{agent.voiceName || 'Default'} ({agent.languageName || 'English'})</div>
                    </div>
                    
                    {agent.phoneNumber && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Phone: </span>
                        <span className="font-medium">{agent.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(agent.id)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteClick(agent.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    variant={agent.status === 'active' ? "outline" : "default"}
                    onClick={() => toggleAgentStatus(agent.id)}
                  >
                    {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <Bot className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No AI Agents Created</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your first AI agent to start making calls</p>
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

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected AI agent.
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

export default AIAgents;
