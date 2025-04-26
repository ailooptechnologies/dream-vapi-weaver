
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Plus } from "lucide-react";
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

interface TelephonyProviderFormValues {
  providerName: string;
  providerType: string;
  accountSid: string;
  authToken: string;
  apiKey: string;
  apiSecret: string;
  region: string;
}

const TelephonyProviders = () => {
  const { toast } = useToast();
  const [providers, setProviders] = useState<any[]>([
    { 
      id: "1", 
      name: "Twilio Primary", 
      type: "twilio", 
      accountSid: "AC12345", 
      status: "active" 
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<string | null>(null);

  const form = useForm<TelephonyProviderFormValues>({
    defaultValues: {
      providerName: '',
      providerType: 'twilio',
      accountSid: '',
      authToken: '',
      apiKey: '',
      apiSecret: '',
      region: 'us-east-1',
    },
  });

  const resetAndCloseDialog = () => {
    form.reset();
    setIsDialogOpen(false);
    setEditingProvider(null);
  };

  const onSubmit = (data: TelephonyProviderFormValues) => {
    if (editingProvider) {
      setProviders(providers.map(provider => 
        provider.id === editingProvider 
          ? { 
              ...provider, 
              name: data.providerName, 
              type: data.providerType,
              accountSid: data.accountSid
            } 
          : provider
      ));
      toast({
        title: "Provider updated",
        description: "Telephony provider has been updated successfully."
      });
    } else {
      const newProvider = {
        id: Date.now().toString(),
        name: data.providerName,
        type: data.providerType,
        accountSid: data.accountSid,
        status: "active"
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
      form.setValue('providerName', provider.name);
      form.setValue('providerType', provider.type);
      form.setValue('accountSid', provider.accountSid || '');
      setEditingProvider(providerId);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (providerId: string) => {
    setProviders(providers.filter(p => p.id !== providerId));
    toast({
      title: "Provider deleted",
      description: "The telephony provider has been removed."
    });
  };

  const toggleStatus = (providerId: string) => {
    setProviders(providers.map(provider => 
      provider.id === providerId 
        ? { 
            ...provider, 
            status: provider.status === "active" ? "inactive" : "active"
          } 
        : provider
    ));
    const provider = providers.find(p => p.id === providerId);
    const newStatus = provider?.status === "active" ? "inactive" : "active";
    toast({
      title: "Status updated",
      description: `Provider is now ${newStatus}.`
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6" />
            <div>
              <h1 className="text-2xl font-bold">Telephony Providers</h1>
              <p className="text-muted-foreground">Manage your phone service providers</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Provider
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProvider ? "Edit Provider" : "Add New Provider"}</DialogTitle>
                <DialogDescription>
                  Configure your telephony service provider credentials.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="providerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Twilio Main Account" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="providerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select provider type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="twilio">Twilio</SelectItem>
                            <SelectItem value="telnyx">Telnyx</SelectItem>
                            <SelectItem value="messagebird">MessageBird</SelectItem>
                            <SelectItem value="vonage">Vonage</SelectItem>
                            <SelectItem value="plivo">Plivo</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="accountSid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account SID</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="AC..." {...field} />
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
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key (optional)</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apiSecret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Secret (optional)</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                            <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                            <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                            <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                            <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetAndCloseDialog}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingProvider ? "Update Provider" : "Add Provider"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider) => (
            <Card key={provider.id} className={provider.status === "active" ? "border-primary/50" : ""}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold">{provider.name}</CardTitle>
                  <CardDescription className="capitalize">{provider.type}</CardDescription>
                </div>
                <div className={`rounded-full h-3 w-3 ${provider.status === "active" ? "bg-green-500" : "bg-gray-300"}`}></div>
              </CardHeader>
              <CardContent className="py-2">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account SID:</span>
                    <span className="font-mono">•••••{provider.accountSid?.slice(-5) || '•••••'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="capitalize">{provider.status}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(provider.id)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(provider.id)}>
                    Delete
                  </Button>
                </div>
                <Button 
                  variant={provider.status === "active" ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => toggleStatus(provider.id)}
                >
                  {provider.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border-dashed">
            <CardHeader className="flex flex-col items-center justify-center text-center p-6">
              <Phone className="h-8 w-8 text-muted-foreground mb-2" />
              <CardTitle>Add New Provider</CardTitle>
              <CardDescription>Configure your telephony service</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center pb-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Provider
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TelephonyProviders;
