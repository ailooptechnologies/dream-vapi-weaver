
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bot, Phone, MessageSquare, Search } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const helpSections = [
  {
    title: "Getting Started",
    description: "Learn the basics of using our Voice AI platform",
    items: [
      { title: "Platform Overview", content: "Understand the key features and capabilities of our Voice AI platform." },
      { title: "Quick Start Guide", content: "Set up your first campaign in minutes with our step-by-step guide." },
      { title: "Best Practices", content: "Learn the recommended practices for creating effective voice campaigns." }
    ]
  },
  {
    title: "AI Agents",
    description: "Everything about creating and managing AI agents",
    items: [
      { title: "Creating Agents", content: "Learn how to create and customize AI agents for your needs." },
      { title: "Training Models", content: "Understand how to train your AI models effectively." },
      { title: "Agent Settings", content: "Configure your AI agents for optimal performance." }
    ]
  },
  {
    title: "Campaigns",
    description: "Managing your voice campaigns",
    items: [
      { title: "Campaign Setup", content: "Create and configure voice campaigns step by step." },
      { title: "Call Logs", content: "Track and analyze your campaign performance." },
      { title: "Scheduling", content: "Learn how to schedule and manage campaign timings." }
    ]
  }
];

const Help = () => {
  return (
    <div className="flex min-h-screen bg-background">
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Help Center</h1>
          
          <div className="grid gap-6">
            {helpSections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div key={item.title} className="space-y-2">
                          <h3 className="text-lg font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
                <CardDescription>Get in touch with our support team for personalized assistance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Live Chat Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  <span>Search Documentation</span>
                </div>
                <Button className="w-full">Contact Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
