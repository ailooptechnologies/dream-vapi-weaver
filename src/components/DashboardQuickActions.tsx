
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Phone, Headphones } from 'lucide-react';

const DashboardQuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get started</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/campaign">
          <Card className="h-full transition-all hover:bg-muted/50 cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <MessageSquare className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Create Campaign</h3>
              <p className="text-sm text-muted-foreground mt-1">Set up a new calling campaign</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/ai-agents">
          <Card className="h-full transition-all hover:bg-muted/50 cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Bot className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Create AI Agent</h3>
              <p className="text-sm text-muted-foreground mt-1">Build a new voice agent</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/phone-numbers">
          <Card className="h-full transition-all hover:bg-muted/50 cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Phone className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Add Phone Number</h3>
              <p className="text-sm text-muted-foreground mt-1">Purchase or configure phone numbers</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/custom-models">
          <Card className="h-full transition-all hover:bg-muted/50 cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Headphones className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Create Custom Model</h3>
              <p className="text-sm text-muted-foreground mt-1">Build and train custom voice models</p>
            </CardContent>
          </Card>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DashboardQuickActions;
