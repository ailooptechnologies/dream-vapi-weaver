import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Trash, Edit } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const providerOptions = [
  { value: 'twilio', label: 'Twilio' },
  { value: 'plivo', label: 'Plivo' },
  { value: 'vonage', label: 'Vonage' },
  { value: 'telnyx', label: 'Telnyx' },
];

const regionOptions = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'eu-west-1', label: 'EU West (Ireland)' },
  { value: 'ap-southeast-2', label: 'Asia Pacific (Sydney)' },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Provider name must be at least 2 characters.",
  }),
  provider: z.enum(['twilio', 'plivo', 'vonage', 'telnyx']),
  apiKey: z.string().min(10, {
    message: "API Key must be at least 10 characters.",
  }),
  apiSecret: z.string().min(10, {
    message: "API Secret must be at least 10 characters.",
  }),
  region: z.enum(['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-2']),
  outboundNumber: z.string().min(5, {
    message: "Outbound number must be at least 5 characters.",
  }),
})

interface TelephonyProviderFormValues extends z.infer<typeof formSchema> {}

const TelephonyProviders = () => {
  const [open, setOpen] = useState(false);
  const [providers, setProviders] = useState([
    {
      id: '1',
      name: 'Twilio Prod',
      provider: 'twilio',
      apiKey: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1',
      apiSecret: 'your_twilio_api_secret_1',
      region: 'us-east-1',
      outboundNumber: '+15005550006',
    },
    {
      id: '2',
      name: 'Plivo Stage',
      provider: 'plivo',
      apiKey: 'MAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx2',
      apiSecret: 'your_plivo_api_secret_2',
      region: 'us-west-2',
      outboundNumber: '+14155550100',
    },
  ]);
  const [editingProviderId, setEditingProviderId] = useState<string | null>(null);

  const form = useForm<TelephonyProviderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      provider: 'twilio',
      apiKey: '',
      apiSecret: '',
      region: '',
      outboundNumber: '+91 ',
    }
  });

  const onSubmit = (data: TelephonyProviderFormValues) => {
    if (editingProviderId) {
      // Update existing provider
      setProviders(providers.map(p => p.id === editingProviderId ? { ...p, ...data } : p));
      toast({
        title: "Provider Updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Add new provider
      const newProvider = { id: String(Date.now()), ...data };
      setProviders([...providers, newProvider]);
      toast({
        title: "Provider Added",
        description: `${data.name} has been added successfully.`,
      });
    }
    setOpen(false);
    form.reset();
    setEditingProviderId(null);
  };

  const handleEdit = (id: string) => {
    const providerToEdit = providers.find(p => p.id === id);
    if (providerToEdit) {
      setEditingProviderId(id);
      form.setValue('name', providerToEdit.name);
      form.setValue('provider', providerToEdit.provider as TelephonyProviderFormValues["provider"]);
      form.setValue('apiKey', providerToEdit.apiKey);
      form.setValue('apiSecret', providerToEdit.apiSecret);
      form.setValue('region', providerToEdit.region as TelephonyProviderFormValues["region"]);
      form.setValue('outboundNumber', providerToEdit.outboundNumber);
      setOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setProviders(providers.filter(p => p.id !== id));
    toast({
      title: "Provider Deleted",
      description: "Telephony provider has been deleted successfully.",
    });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-card">
        <SidebarNav />
      </div>

      {/* Mobile sidebar */}
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

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Telephony Providers</h1>
          <p className="text-muted-foreground">
            Manage your telephony provider settings
          </p>
        </div>

        {/* Add provider button */}
        <Button onClick={() => { setOpen(true); setEditingProviderId(null); form.reset() }}>Add Provider</Button>

        {/* Providers list */}
        <div className="mt-4 space-y-4">
          {providers.map((provider) => (
            <Card key={provider.id}>
              <CardHeader>
                <CardTitle>{provider.name}</CardTitle>
                <CardDescription>
                  {provider.provider} - {provider.region}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4">
                  <Label>API Key:</Label>
                  <span>{provider.apiKey}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Label>Outbound Number:</Label>
                  <span>{provider.outboundNumber}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(provider.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(provider.id)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Add/Edit provider modal */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingProviderId ? "Edit Provider" : "Add Provider"}</SheetTitle>
            <SheetDescription>
              {editingProviderId ? "Edit the telephony provider details." : "Add a new telephony provider to your account."}
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Twilio Account" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name you'll use to identify this provider.
                    </FormDescription>
                    <FormMessage />
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
                          <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {providerOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the telephony provider you want to use.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the API key provided by your telephony provider.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apiSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Secret</FormLabel>
                    <FormControl>
                      <Input placeholder="YourAPISecretKey" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the API secret provided by your telephony provider.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the region where your telephony provider operates.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="outboundNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outbound Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+15005550006" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the outbound number you want to use for calls.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                <Button type="submit">{editingProviderId ? "Update Provider" : "Add Provider"}</Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TelephonyProviders;
