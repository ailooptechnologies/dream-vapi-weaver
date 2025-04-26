
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Upload, Plus } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";

const PhoneNumbers = () => {
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
            <h1 className="text-2xl font-bold">Phone Numbers</h1>
            <p className="text-muted-foreground">Manage your phone number groups and slots</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Group
          </Button>
        </div>

        {/* Phone Number Groups */}
        <div className="space-y-6">
          {/* Group Card */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <h3 className="font-medium">Default Group</h3>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Numbers
              </Button>
            </div>
            
            {/* Number List */}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Search phone numbers..."
                className="max-w-sm"
              />
              <div className="text-sm text-muted-foreground">
                No phone numbers added to this group yet.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumbers;
