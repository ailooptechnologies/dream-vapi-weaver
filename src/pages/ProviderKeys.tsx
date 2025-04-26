
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Key, MessageSquare, Mic, Volume2 } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface ProviderKeysForm {
  // NLU Provider Keys
  openaiKey: string;
  anthropicKey: string;
  mistralKey: string;
  
  // TTS Provider Keys
  elevenLabsKey: string;
  googleTtsKey: string;
  amazonPollyKey: string;
  
  // STT Provider Keys
  whisperKey: string;
  googleSttKey: string;
  deepgramKey: string;
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

        <Tabs defaultValue="nlu" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
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
          
          <TabsContent value="nlu" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Natural Language Understanding Providers</CardTitle>
                <CardDescription>
                  Configure API keys for NLU services like OpenAI, Anthropic, and Mistral
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                      name="anthropicKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anthropic API Key</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="sk-ant-..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mistralKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mistral API Key</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Save NLU Keys</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Text-to-Speech Providers</CardTitle>
                <CardDescription>
                  Configure API keys for TTS services like ElevenLabs, Google, and Amazon Polly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      name="googleTtsKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Google Cloud TTS Key</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amazonPollyKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amazon Polly Access Key</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Save TTS Keys</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stt" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Speech-to-Text Providers</CardTitle>
                <CardDescription>
                  Configure API keys for STT services like Whisper, Google, and Deepgram
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="whisperKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OpenAI Whisper API Key</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="sk-..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="googleSttKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Google Cloud STT Key</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deepgramKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deepgram API Key</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Save STT Keys</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderKeys;
