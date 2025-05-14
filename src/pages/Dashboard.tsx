
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, ArrowUp, ArrowDown, PhoneCall, MessageSquare, 
  Bot, Plus, Phone, Headphones 
} from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

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
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground mb-6">Welcome back to your voice agent platform</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <PhoneCall className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground flex items-center pt-1">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 mr-1">12%</span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">543</div>
              <p className="text-xs text-muted-foreground flex items-center pt-1">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 mr-1">8%</span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground flex items-center pt-1">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500 mr-1">2</span>
                new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground flex items-center pt-1">
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                <span className="text-red-500 mr-1">4%</span>
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create AI Agent</CardTitle>
              <CardDescription>Build a new conversation agent for your business</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure your AI agent with custom prompts, voice settings, and conversation flow.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/ai-agents')}>
                <Plus className="mr-2 h-4 w-4" />
                New Agent
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Set Up Phone Number</CardTitle>
              <CardDescription>Purchase a new phone number for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose numbers with your desired area code, toll-free options available.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => navigate('/phone-numbers')}>
                <Phone className="mr-2 h-4 w-4" />
                Get Number
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create Custom Model</CardTitle>
              <CardDescription>Build custom voice and language models</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create and train specialized models for your specific industry needs.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => navigate('/custom-models')}>
                <Headphones className="mr-2 h-4 w-4" />
                Build Model
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
