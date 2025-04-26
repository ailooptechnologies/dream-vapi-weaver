
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Plus, Pencil, Trash2, CheckCircle, Globe } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

interface TelephonyProviderFormValues {
  name: string;
  provider: string;
  accountSid: string;
  authToken: string;
  apiKey?: string;
  apiSecret?: string;
  region?: string;
  outboundNumber?: string;
}

const TelephonyProviders = () => {
  const { toast } = useToast();
  const [providers, setProviders] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProviderId, setEditingProviderId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState<string | null>(null);

  const providerTypes = [
    { value: 'twilio', label: 'Twilio' },
    { value: 'aws-chime', label: 'AWS Chime' },
    { value: 'plivo', label: 'Plivo' },
    { value: 'telnyx', label: 'Telnyx' },
    { value: 'vonage', label: 'Vonage (Nexmo)' },
    { value: 'messagebird', label: 'MessageBird' },
  ];

  const form = useForm<TelephonyProviderFormValues>({
    defaultValues: {
      name: '',
      provider: '',
      accountSid: '',
      authToken: '',
      apiKey: '',
      apiSecret: '',
      region: '',
      outboundNumber: '',
    }
  });

  // Watch provider type to show conditional fields
  const providerType = form.watch('provider');

  const resetAndCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
    setEditingProviderId(null);
  };

  const onSubmit = (data: TelephonyProviderFormValues) => {
    const providerLabel = providerTypes.find(p => p.value === data.provider)?.label || data.provider;
    
    if (editingProviderId) {
      setProviders(providers.map(provider => 
        provider.id === editingProviderId ? { 
          ...provider, 
          ...data, 
          providerLabel,
          status: provider.status,
        } : provider
      ));
      toast({
        title: "Provider updated",
        description: "Telephony provider has been updated successfully."
      });
    } else {
      const newProvider = {
        id: crypto.randomUUID(),
        ...data,
        providerLabel,
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      setProviders([...providers, newProvider]);
      toast({
        title: "Provider added",
        description: "New telephony provider has been added successfully."
      });
    }
    resetAndCloseDialog();
  };

  const handleEdit = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      form.reset({
        name: provider.name,
        provider: provider.provider,
        accountSid: provider.accountSid,
        authToken: provider.authToken,
        apiKey: provider.apiKey,
        apiSecret: provider.apiSecret,
        region: provider.region,
        outboundNumber: provider.outboundNumber,
      });
      setEditingProviderId(providerId);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (providerId: string) => {
    setProviderToDelete(providerId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (providerToDelete) {
      setProviders(providers.filter(p => p.id !== providerToDelete));
      toast({
        title: "Provider deleted",
        description: "The telephony provider has been removed."
      });
      setDeleteDialogOpen(false);
      setProviderToDelete(null);
    }
  };

  const toggleProviderStatus = (providerId: string) => {
    setProviders(providers.map(provider => {
      if (provider.id === providerId) {
        const newStatus = provider.status === 'active' ? 'inactive' : 'active';
        toast({
          title: `Provider ${newStatus}`,
          description: `Provider has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`
        });
        return { ...provider, status: newStatus };
      }
      return provider;
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
            <h1 className="text-2xl font-bold">Telephony Providers</h1>
            <p className="text-muted-foreground">Manage your telephony service providers</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Provider
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingProviderId ? "Edit Provider" : "Add New Provider"}</DialogTitle>
                <DialogDescription>
                  {editingProviderId ? "Update your telephony provider details." : "Connect a new telephony service provider."}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Production Twilio" {...field} required />
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
                            {providerTypes.map(provider => (
                              <SelectItem key={provider.value} value={provider.value}>
                                {provider.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  {/* Show fields based on provider type */}
                  {providerType && (
                    <>
                      <FormField
                        control={form.control}
                        name="accountSid"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account SID</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} required />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="authToken"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Auth Token</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} required />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      {(providerType === 'twilio' || providerType === 'telnyx' || providerType === 'aws-chime') && (
                        <FormField
                          control={form.control}
                          name="apiKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>API Key</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {(providerType === 'twilio' || providerType === 'telnyx') && (
                        <FormField
                          control={form.control}
                          name="apiSecret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>API Secret</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {providerType === 'aws-chime' && (
                        <FormField
                          control={form.control}
                          name="region"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>AWS Region</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., us-east-1" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="outboundNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Outbound Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormDescription>
                              Default number to use for outbound calls
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetAndCloseDialog}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingProviderId ? "Update Provider" : "Add Provider"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle>{provider.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <span>{provider.providerLabel}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge className={provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {provider.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-muted-foreground">Account SID</div>
                    <div className="font-mono">••••••••••{provider.accountSid.slice(-4)}</div>
                    
                    <div className="text-muted-foreground">Auth Token</div>
                    <div className="font-mono">••••••••••{provider.authToken.slice(-4)}</div>
                    
                    {provider.apiKey && (
                      <>
                        <div className="text-muted-foreground">API Key</div>
                        <div className="font-mono">••••••••••{provider.apiKey.slice(-4)}</div>
                      </>
                    )}
                    
                    {provider.region && (
                      <>
                        <div className="text-muted-foreground">Region</div>
                        <div>{provider.region}</div>
                      </>
                    )}
                    
                    {provider.outboundNumber && (
                      <>
                        <div className="text-muted-foreground">Outbound Number</div>
                        <div>{provider.outboundNumber}</div>
                      </>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(provider.id)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteClick(provider.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    variant={provider.status === 'active' ? "outline" : "default"}
                    onClick={() => toggleProviderStatus(provider.id)}
                  >
                    {provider.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <Phone className="h-8 w-8 mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No Telephony Providers</h3>
            <p className="text-sm text-muted-foreground mb-4">Add your first telephony provider to start making calls</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Provider
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
              This action cannot be undone. This telephony provider will be permanently deleted.
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

export default TelephonyProviders;
