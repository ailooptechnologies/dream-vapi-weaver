
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, BarChart2, Users } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
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
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your campaigns and agents</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Campaigns</CardTitle>
                <CardDescription>Number of active campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Agents</CardTitle>
                <CardDescription>Number of configured AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Number of users in your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">15</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Statistics</CardTitle>
                <CardDescription>Overview of campaign performance</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart2 className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Track key metrics like call duration, conversion rates, and agent performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Activity</CardTitle>
                <CardDescription>Recent team activity and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <Users className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Stay informed about team activities, agent updates, and campaign changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
