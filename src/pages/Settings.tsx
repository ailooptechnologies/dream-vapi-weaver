
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Moon, Sun, Globe } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const { toast } = useToast();
  
  // Sample settings for UI display
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      marketing: false
    },
    appearance: {
      theme: 'system', // 'light', 'dark', 'system'
    },
    language: 'en', // 'en', 'es', 'fr', etc.
  });

  const handleNotificationToggle = (settingName: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [settingName]: !settings.notifications[settingName]
      }
    });
    
    toast({
      title: "Settings updated",
      description: `${settingName} notifications ${settings.notifications[settingName] ? 'disabled' : 'enabled'}.`
    });
  };

  const handleThemeChange = (theme: string) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        theme
      }
    });
    
    toast({
      title: "Theme updated",
      description: `Theme set to ${theme}.`
    });
  };

  const handleLanguageChange = (language: string) => {
    setSettings({
      ...settings,
      language
    });
    
    toast({
      title: "Language updated",
      description: `Language set to ${language === 'en' ? 'English' : language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : language}.`
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences</p>
        </div>

        <div className="space-y-6">
          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={() => handleNotificationToggle('email')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive browser push notifications
                  </p>
                </div>
                <Switch 
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={() => handleNotificationToggle('push')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-notifications" className="font-medium">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new features and promotions
                  </p>
                </div>
                <Switch 
                  id="marketing-notifications"
                  checked={settings.notifications.marketing}
                  onCheckedChange={() => handleNotificationToggle('marketing')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {settings.appearance.theme === 'dark' ? <Moon className="h-5 w-5" /> : 
                 settings.appearance.theme === 'light' ? <Sun className="h-5 w-5" /> : 
                 <div className="flex">
                   <Sun className="h-5 w-5" />
                   <Moon className="h-5 w-5 -ml-2" />
                 </div>}
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={settings.appearance.theme} 
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger id="theme" className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  {settings.appearance.theme === 'system' 
                    ? 'Automatically matches your system preference'
                    : `Always use ${settings.appearance.theme} mode`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language
              </CardTitle>
              <CardDescription>Change the display language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Label htmlFor="language">Display Language</Label>
                <Select 
                  value={settings.language} 
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger id="language" className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English (US)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
