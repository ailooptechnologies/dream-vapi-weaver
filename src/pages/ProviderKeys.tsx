
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Key } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface ProviderKeysForm {
  openaiKey: string;
  elevenLabsKey: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
}

const ProviderKeys = () => {
  const { toast } = useToast();
  const form = useForm<ProviderKeysForm>();

  const onSubmit = (data: ProviderKeysForm) => {
    // In a real app, this would be securely stored
    console.log('Provider keys:', data);
    toast({
      title: "Keys updated",
      description: "Your provider keys have been successfully updated."
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
        <div className="flex items-center gap-2 mb-6">
          <Key className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold">Provider Keys</h1>
            <p className="text-muted-foreground">Manage your API keys for various services</p>
          </div>
        </div>

        <div className="max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="openaiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OpenAI API Key</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="sk-..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="elevenLabsKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ElevenLabs API Key</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twilioAccountSid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twilio Account SID</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="AC..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twilioAuthToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twilio Auth Token</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Save Keys</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProviderKeys;
