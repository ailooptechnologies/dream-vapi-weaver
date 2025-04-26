import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Key, MessageSquare, Mic, Volume2, Plus, Trash2, Pencil } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface ProviderKey {
  id: string;
  name: string;
  key: string;
  type: 'nlu' | 'tts' | 'stt';
  provider: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

interface ProviderKeyFormValues {
  name: string;
  key: string;
  provider: string;
  status: 'active' | 'inactive';
}

const ProviderKeys = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'nlu' | 'tts' | 'stt'>('nlu');
  const [providerKeys, setProviderKeys] = useState<ProviderKey[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKeyId, setEditingKeyId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  
  const form = useForm<ProviderKeyFormValues>({
    defaultValues: {
      name: '',
      key: '',
      provider: '',
      status: 'active',
    }
  });

  const NLU_PROVIDERS = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'mistral', label: 'Mistral AI' },
    { value: 'google', label: 'Google Gemini' },
    { value: 'cohere', label: 'Cohere' },
  ];

  const TTS_PROVIDERS = [
    { value: 'elevenlabs', label: 'ElevenLabs' },
    { value: 'google', label: 'Google Cloud TTS' },
    { value: 'amazon', label: 'Amazon Polly' },
    { value: 'microsoft', label: 'Microsoft Azure TTS' },
  ];

  const STT_PROVIDERS = [
    { value: 'whisper', label: 'OpenAI Whisper' },
    { value: 'google', label: 'Google Cloud STT' },
    { value: 'deepgram', label: 'Deepgram' },
    { value: 'assembly', label: 'AssemblyAI' },
  ];

  const getProviderOptions = () => {
    switch(activeTab) {
      case 'nlu': return NLU_PROVIDERS;
      case 'tts': return TTS_PROVIDERS;
      case 'stt': return STT_PROVIDERS;
      default: return [];
    }
  };

  const handleStatusToggle = (keyId: string) => {
    setProviderKeys(providerKeys.map(key => {
      if (key.id === keyId) {
        return {
          ...key,
          status: key.status === 'active' ? 'inactive' : 'active'
        };
      }
      return key;
    }));

    toast({
      title: "Status updated",
      description: "The provider key status has been updated successfully."
    });
  };

  const handleAddKey = (data: ProviderKeyFormValues) => {
    const keyData: ProviderKey = {
      id: editingKeyId || crypto.randomUUID(),
      name: data.name,
      key: data.key,
      type: activeTab,
      provider: data.provider,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    if (editingKeyId) {
      setProviderKeys(providerKeys.map(key => key.id === editingKeyId ? keyData : key));
      toast({
        title: "API Key updated",
        description: `${data.name} key has been updated successfully.`
      });
    } else {
      setProviderKeys([...providerKeys, keyData]);
      toast({
        title: "API Key added",
        description: `${data.name} key has been added successfully.`
      });
    }

    setIsDialogOpen(false);
    form.reset();
    setEditingKeyId(null);
  };

  const handleEditKey = (key: ProviderKey) => {
    setActiveTab(key.type);
    form.reset({
      name: key.name,
      key: key.key,
      provider: key.provider,
      status: key.status,
    });
    setEditingKeyId(key.id);
    setIsDialogOpen(true);
  };

  const handleDeleteKey = (id: string) => {
    setKeyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteKey = () => {
    if (keyToDelete) {
      setProviderKeys(providerKeys.filter(key => key.id !== keyToDelete));
      toast({
        title: "API Key deleted",
        description: "The API key has been removed."
      });
      setDeleteDialogOpen(false);
      setKeyToDelete(null);
    }
  };

  const openAddDialog = (type: 'nlu' | 'tts' | 'stt') => {
    setActiveTab(type);
    form.reset();
    setEditingKeyId(null);
    setIsDialogOpen(true);
  };

  const filteredKeys = providerKeys.filter(key => key.type === activeTab);
  const getProviderLabel = (provider: string) => {
    const options = getProviderOptions();
    return options.find(opt => opt.value === provider)?.label || provider;
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
        <div className="flex items-center gap-2 mb-6">
          <Key className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold">Provider Keys</h1>
            <p className="text-muted-foreground">Manage your API keys for various services</p>
          </div>
        </div>

        <Tabs defaultValue="nlu" value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="nlu" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>NLU Providers</span>
              </TabsTrigger>
              <TabsTrigger value="tts" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span>TTS Providers</span>
              </TabsTrigger>
              <TabsTrigger value="stt" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>STT Providers</span>
              </TabsTrigger>
            </TabsList>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openAddDialog(activeTab)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add {activeTab.toUpperCase()} Key
                </Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add {activeTab.toUpperCase()} Provider Key</DialogTitle>
                  <DialogDescription>
                    Configure API keys for {
                      activeTab === 'nlu' ? 'Natural Language Understanding' : 
                      activeTab === 'tts' ? 'Text-to-Speech' : 'Speech-to-Text'
                    } services
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddKey)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Production OpenAI Key" required {...field} />
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
                              {getProviderOptions().map(provider => (
                                <SelectItem key={provider.value} value={provider.value}>
                                  {provider.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the service provider
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="key"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input type="password" required {...field} />
                          </FormControl>
                          <FormDescription>
                            This key will be stored securely
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                     <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Set the status of the API key
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingKeyId ? "Update Key" : "Add Key"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <TabsContent value="nlu" className="space-y-4">
            {filteredKeys.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredKeys.map((key) => (
                  <Card key={key.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{key.name}</CardTitle>
                          <CardDescription>{getProviderLabel(key.provider)}</CardDescription>
                        </div>
                        <Switch 
                          checked={key.status === 'active'}
                          onCheckedChange={() => handleStatusToggle(key.id)}
                          className="ml-2"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Input 
                          type="password" 
                          value={key.key} 
                          readOnly 
                          className="font-mono" 
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditKey(key)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteKey(key.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium mb-1">No NLU Provider Keys</h3>
                <p className="text-sm text-muted-foreground mb-4">Add API keys for OpenAI, Anthropic, and other NLU providers</p>
                <Button onClick={() => openAddDialog('nlu')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add NLU Key
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tts" className="space-y-4">
            {filteredKeys.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredKeys.map((key) => (
                  <Card key={key.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{key.name}</CardTitle>
                          <CardDescription>{getProviderLabel(key.provider)}</CardDescription>
                        </div>
                        <Switch 
                          checked={key.status === 'active'}
                          onCheckedChange={() => handleStatusToggle(key.id)}
                          className="ml-2"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Input 
                          type="password" 
                          value={key.key} 
                          readOnly 
                          className="font-mono" 
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditKey(key)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteKey(key.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center">
                <Volume2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium mb-1">No TTS Provider Keys</h3>
                <p className="text-sm text-muted-foreground mb-4">Add API keys for ElevenLabs, Google, and other TTS providers</p>
                <Button onClick={() => openAddDialog('tts')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add TTS Key
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stt" className="space-y-4">
            {filteredKeys.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredKeys.map((key) => (
                  <Card key={key.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{key.name}</CardTitle>
                          <CardDescription>{getProviderLabel(key.provider)}</CardDescription>
                        </div>
                        <Switch 
                          checked={key.status === 'active'}
                          onCheckedChange={() => handleStatusToggle(key.id)}
                          className="ml-2"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Input 
                          type="password" 
                          value={key.key} 
                          readOnly 
                          className="font-mono" 
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditKey(key)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteKey(key.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center">
                <Mic className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium mb-1">No STT Provider Keys</h3>
                <p className="text-sm text-muted-foreground mb-4">Add API keys for Whisper, Google, and other STT providers</p>
                <Button onClick={() => openAddDialog('stt')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add STT Key
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
              This action cannot be undone. This API key will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteKey} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProviderKeys;
