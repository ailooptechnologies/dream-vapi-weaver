
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Headphones, Mic, MessageSquare, Plus, Pencil, Trash2, CheckCircle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ModelFormValues {
  name: string;
  provider: string;
  modelId: string;
  apiEndpoint?: string;
  description?: string;
  parameters?: string;
  type: 'stt' | 'tts' | 'nlu';
}

const CustomModels = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'stt' | 'tts' | 'nlu'>('stt');
  const [models, setModels] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [modelToDelete, setModelToDelete] = useState<string | null>(null);

  // Provider options for each type of model
  const providerOptions = {
    stt: [
      { value: 'whisper', label: 'OpenAI Whisper' },
      { value: 'google', label: 'Google Cloud STT' },
      { value: 'deepgram', label: 'Deepgram' },
      { value: 'assembly', label: 'AssemblyAI' },
    ],
    tts: [
      { value: 'elevenlabs', label: 'ElevenLabs' },
      { value: 'google', label: 'Google Cloud TTS' },
      { value: 'amazon', label: 'Amazon Polly' },
      { value: 'microsoft', label: 'Microsoft Azure TTS' },
    ],
    nlu: [
      { value: 'openai', label: 'OpenAI' },
      { value: 'anthropic', label: 'Anthropic' },
      { value: 'mistral', label: 'Mistral AI' },
      { value: 'google', label: 'Google Gemini' },
      { value: 'cohere', label: 'Cohere' },
    ]
  };

  const form = useForm<ModelFormValues>({
    defaultValues: {
      name: '',
      provider: '',
      modelId: '',
      apiEndpoint: '',
      description: '',
      parameters: '',
      type: 'stt',
    }
  });

  const resetAndCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
    setEditingModelId(null);
  };

  const onSubmit = (data: ModelFormValues) => {
    const providerLabel = providerOptions[data.type].find(p => p.value === data.provider)?.label || data.provider;
    
    // Parse parameters if provided (should be valid JSON)
    let parsedParameters = {};
    try {
      parsedParameters = data.parameters ? JSON.parse(data.parameters) : {};
    } catch (e) {
      toast({
        title: "Invalid Parameters",
        description: "The parameters must be valid JSON.",
        variant: "destructive"
      });
      return;
    }
    
    if (editingModelId) {
      setModels(models.map(model => 
        model.id === editingModelId ? { 
          ...model, 
          ...data, 
          providerLabel,
          parameters: parsedParameters,
        } : model
      ));
      toast({
        title: "Model updated",
        description: `${data.name} has been updated successfully.`
      });
    } else {
      const newModel = {
        id: crypto.randomUUID(),
        ...data,
        providerLabel,
        parameters: parsedParameters,
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      setModels([...models, newModel]);
      toast({
        title: "Model created",
        description: `${data.name} has been created successfully.`
      });
    }
    resetAndCloseDialog();
  };

  const handleEdit = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (model) {
      // Convert parameters back to string for editing
      const parametersString = model.parameters ? JSON.stringify(model.parameters, null, 2) : '';
      
      setActiveTab(model.type);
      form.reset({
        ...model,
        parameters: parametersString,
      });
      setEditingModelId(modelId);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (modelId: string) => {
    setModelToDelete(modelId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (modelToDelete) {
      setModels(models.filter(m => m.id !== modelToDelete));
      toast({
        title: "Model deleted",
        description: "The model has been removed."
      });
      setDeleteDialogOpen(false);
      setModelToDelete(null);
    }
  };

  const toggleModelStatus = (modelId: string) => {
    setModels(models.map(model => {
      if (model.id === modelId) {
        const newStatus = model.status === 'active' ? 'inactive' : 'active';
        toast({
          title: `Model ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
          description: `${model.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`
        });
        return { ...model, status: newStatus };
      }
      return model;
    }));
  };

  const openAddDialog = (type: 'stt' | 'tts' | 'nlu') => {
    setActiveTab(type);
    form.reset({ 
      name: '',
      provider: '',
      modelId: '',
      apiEndpoint: '',
      description: '',
      parameters: '',
      type: type,
    });
    setEditingModelId(null);
    setIsDialogOpen(true);
  };

  const filteredModels = models.filter(model => model.type === activeTab);

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
        <div className="flex items-center gap-2 mb-6">
          <Headphones className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold">Custom Models</h1>
            <p className="text-muted-foreground">Manage your custom AI models for voice applications</p>
          </div>
        </div>

        <Tabs defaultValue="stt" value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stt" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>Speech-to-Text</span>
              </TabsTrigger>
              <TabsTrigger value="tts" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>Text-to-Speech</span>
              </TabsTrigger>
              <TabsTrigger value="nlu" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Natural Language</span>
              </TabsTrigger>
            </TabsList>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openAddDialog(activeTab)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add {activeTab.toUpperCase()} Model
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingModelId ? "Edit Model" : `Add ${activeTab.toUpperCase()} Model`}</DialogTitle>
                  <DialogDescription>
                    {editingModelId 
                      ? "Update your custom model configuration." 
                      : `Configure a new ${
                          activeTab === 'stt' ? 'Speech-to-Text' : 
                          activeTab === 'tts' ? 'Text-to-Speech' : 
                          'Natural Language Understanding'
                        } model.`
                    }
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Production Whisper" {...field} required />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="provider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provider</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {providerOptions[activeTab].map(provider => (
                                <SelectItem key={provider.value} value={provider.value}>
                                  {provider.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="modelId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model ID</FormLabel>
                          <FormControl>
                            <Input placeholder={
                              activeTab === 'stt' ? 'e.g., whisper-1' : 
                              activeTab === 'tts' ? 'e.g., eleven_monolingual_v1' : 
                              'e.g., gpt-4'
                            } {...field} required />
                          </FormControl>
                          <FormDescription>
                            The specific model identifier used by the provider
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="apiEndpoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Endpoint (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., https://api.example.com/v1" {...field} />
                          </FormControl>
                          <FormDescription>
                            Custom endpoint if different from the provider default
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Brief description of this model..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="parameters"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parameters (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={`{\n  "temperature": 0.7,\n  "max_tokens": 2048\n}`} 
                              className="font-mono text-sm"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            JSON format of model parameters
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={resetAndCloseDialog}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingModelId ? "Update Model" : "Add Model"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <TabsContent value="stt" className="space-y-4">
            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModels.map((model) => (
                  <Card key={model.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{model.name}</CardTitle>
                          <CardDescription>{model.providerLabel}</CardDescription>
                        </div>
                        <Badge className={model.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {model.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Model ID: </span>
                          <code className="text-sm bg-muted p-1 rounded">{model.modelId}</code>
                        </div>
                        {model.apiEndpoint && (
                          <div>
                            <span className="text-sm font-medium">API Endpoint: </span>
                            <code className="text-sm bg-muted p-1 rounded">{model.apiEndpoint}</code>
                          </div>
                        )}
                        {model.description && (
                          <div className="text-sm text-muted-foreground mt-2">{model.description}</div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(model.id)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteClick(model.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant={model.status === 'active' ? "outline" : "default"}
                        onClick={() => toggleModelStatus(model.id)}
                      >
                        {model.status === 'active' ? (
                          <>Deactivate</>
                        ) : (
                          <><CheckCircle className="h-4 w-4 mr-1" />Activate</>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center">
                <Mic className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium mb-1">No STT Models</h3>
                <p className="text-sm text-muted-foreground mb-4">Add your first Speech-to-Text model</p>
                <Button onClick={() => openAddDialog('stt')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add STT Model
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tts" className="space-y-4">
            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModels.map((model) => (
                  <Card key={model.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{model.name}</CardTitle>
                          <CardDescription>{model.providerLabel}</CardDescription>
                        </div>
                        <Badge className={model.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {model.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Model ID: </span>
                          <code className="text-sm bg-muted p-1 rounded">{model.modelId}</code>
                        </div>
                        {model.apiEndpoint && (
                          <div>
                            <span className="text-sm font-medium">API Endpoint: </span>
                            <code className="text-sm bg-muted p-1 rounded">{model.apiEndpoint}</code>
                          </div>
                        )}
                        {model.description && (
                          <div className="text-sm text-muted-foreground mt-2">{model.description}</div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(model.id)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteClick(model.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant={model.status === 'active' ? "outline" : "default"}
                        onClick={() => toggleModelStatus(model.id)}
                      >
                        {model.status === 'active' ? (
                          <>Deactivate</>
                        ) : (
                          <><CheckCircle className="h-4 w-4 mr-1" />Activate</>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center">
                <Headphones className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium mb-1">No TTS Models</h3>
                <p className="text-sm text-muted-foreground mb-4">Add your first Text-to-Speech model</p>
                <Button onClick={() => openAddDialog('tts')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add TTS Model
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="nlu" className="space-y-4">
            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModels.map((model) => (
                  <Card key={model.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{model.name}</CardTitle>
                          <CardDescription>{model.providerLabel}</CardDescription>
                        </div>
                        <Badge className={model.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {model.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Model ID: </span>
                          <code className="text-sm bg-muted p-1 rounded">{model.modelId}</code>
                        </div>
                        {model.apiEndpoint && (
                          <div>
                            <span className="text-sm font-medium">API Endpoint: </span>
                            <code className="text-sm bg-muted p-1 rounded">{model.apiEndpoint}</code>
                          </div>
                        )}
                        {model.description && (
                          <div className="text-sm text-muted-foreground mt-2">{model.description}</div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(model.id)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteClick(model.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant={model.status === 'active' ? "outline" : "default"}
                        onClick={() => toggleModelStatus(model.id)}
                      >
                        {model.status === 'active' ? (
                          <>Deactivate</>
                        ) : (
                          <><CheckCircle className="h-4 w-4 mr-1" />Activate</>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium mb-1">No NLU Models</h3>
                <p className="text-sm text-muted-foreground mb-4">Add your first Natural Language Understanding model</p>
                <Button onClick={() => openAddDialog('nlu')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add NLU Model
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This model will be permanently deleted.
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

export default CustomModels;
