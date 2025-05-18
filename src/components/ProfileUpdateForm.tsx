
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '@/hooks/use-toast';
import { PhoneInput } from './ui/phone-input';
import { Loader2, Camera } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface ProfileUpdateFormProps {
  initialData?: {
    name: string;
    email: string;
    phone: string;
    profileUrl?: string;
  };
}

const ProfileUpdateForm = ({ initialData = { name: '', email: '', phone: '+91 ' } }: ProfileUpdateFormProps) => {
  // If the initialData doesn't have a phone, make sure it starts with +91
  const defaultPhone = initialData.phone && initialData.phone.startsWith('+') ? initialData.phone : '+91 ' + (initialData.phone || '');
  
  const [data, setData] = useState({
    ...initialData,
    phone: defaultPhone
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.profileUrl || null);
  const [updateSuccess, setUpdateSuccess] = useState(false); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
    // Clear success message when form is being edited
    if (updateSuccess) setUpdateSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Save to localStorage for demo purposes
      localStorage.setItem('userProfile', JSON.stringify(data));
      if (previewUrl) {
        localStorage.setItem('userProfileImage', previewUrl);
      }
      
      setIsLoading(false);
      setUpdateSuccess(true); // Set success state to true
      toast("Profile Updated", {
        description: "Your profile information has been successfully updated.",
        variant: "success"
      });
    }, 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast("File too large", { 
        description: "Please select an image under 5MB",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Avatar className="w-24 h-24 border-2 border-border">
                {previewUrl ? (
                  <AvatarImage src={previewUrl} alt="Profile" />
                ) : (
                  <AvatarFallback>{data.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                )}
              </Avatar>
              <Button 
                type="button" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full"
                onClick={triggerFileInput}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <Input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <PhoneInput
                id="phone"
                value={data.phone}
                onChange={(value) => handleChange('phone', value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end gap-4">
          <Button type="submit" className="ml-auto" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
          
          {updateSuccess && (
            <div className="w-full p-3 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm">
              Profile successfully updated! Your changes have been saved.
            </div>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfileUpdateForm;
