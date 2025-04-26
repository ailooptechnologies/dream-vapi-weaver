
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bot, Plus, Pen, Trash2, Phone, Copy, Check } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface AIAgentFormValues {
  name: string;
  description: string;
  phoneNumber: string;
  firstMessage: string;
  sttModel: string;
  ttsModel: string;
  nluModel: string;
}

const AIAgents = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAgentForDeletion, setSelectedAgentForDeletion] = useState<string | null>(null);

  const form = useForm<AIAgentFormValues>({
    defaultValues: {
      name: '',
      description: '',
      phoneNumber: '',
      firstMessage: 'Hello, this is an AI assistant. How can I help you today?',
      sttModel: 'whisper-1',
      ttsModel: 'eleven-multilingual',
      nluModel: 'gpt-4',
    },
  });

  const resetAndCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
    setEditingAgentId(null);
  };

  const onSubmit = (data: AIAgentFormValues) => {
    if (editingAgentId) {
      setAgents(agents.map(agent => 
        agent.id === editingAgentId ? { ...agent, ...data } : agent
      ));
      toast({
        title: "Agent updated",
        description: "AI agent has been updated successfully."
      });
    } else {
      const newAgent = {
        id: crypto.randomUUID(),
        ...data,
        status: "active",
        createdAt: new Date().toISOString()
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
        firstMessage: agent.firstMessage,
        sttModel: agent.sttModel,
        ttsModel: agent.ttsModel,
        nluModel: agent.nluModel,
      });
      setEditingAgentId(agentId);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedAgentForDeletion) {
      setAgents(agents.filter(a => a.id !== selectedAgentForDeletion));
      toast({
        title: "Agent deleted",
        description: "The AI agent has been removed."
      });
      setDeleteDialogOpen(false);
      setSelectedAgentForDeletion(null);
    }
  };

  const handleDeleteClick = (agentId: string) => {
    setSelectedAgentForDeletion(agentId);
    setDeleteDialogOpen(true);
  };

  const handleCopyId = (agentId: string) => {
    navigator.clipboard.writeText(agentId);
    toast({
      title: "ID Copied",
      description: "Agent ID copied to clipboard."
    });
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
            <p className="text-muted-foreground">Create and manage your AI agents</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingAgentId ? "Edit Agent" : "Create New Agent"}</DialogTitle>
                <DialogDescription>
                  {editingAgentId ? "Update your AI agent details." : "Configure a new AI agent to handle calls."}
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
                            <Input placeholder="e.g., Customer Support Agent" {...field} required />
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
                            Optional: If left blank, a number will be assigned
                          </FormDescription>
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
                          <Textarea placeholder="Describe what this agent does..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="firstMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Initial message the agent will say..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="sttModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Speech-to-Text Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select STT model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="whisper-1">OpenAI Whisper v1</SelectItem>
                              <SelectItem value="deepgram-nova">Deepgram Nova</SelectItem>
                              <SelectItem value="azure-stt">Microsoft Azure STT</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ttsModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Text-to-Speech Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select TTS model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="eleven-multilingual">ElevenLabs Multilingual</SelectItem>
                              <SelectItem value="azure-neural">Microsoft Neural</SelectItem>
                              <SelectItem value="gcp-wavenet">Google WaveNet</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nluModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select NLU model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="gpt-4">GPT-4</SelectItem>
                              <SelectItem value="claude-3">Claude 3</SelectItem>
                              <SelectItem value="llama-70b">Llama 3 70B</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{agent.name}</CardTitle>
                      <CardDescription className="line-clamp-1">{agent.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Pen className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(agent.id)}>
                          <Pen className="h-4 w-4 mr-2" />
                          Edit Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyId(agent.id)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive" 
                          onClick={() => handleDeleteClick(agent.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-3 pb-3">
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{agent.phoneNumber || "No phone number assigned"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      <span>{agent.nluModel}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0 pb-4">
                  <div className="text-xs text-muted-foreground">
                    Created {new Date(agent.createdAt).toLocaleDateString()}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    agent.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {agent.status}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
              <Bot className="h-8 w-8 mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">No Agents Created</h3>
              <p className="text-sm text-muted-foreground mb-4">Create your first AI agent to get started</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Agent
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
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
