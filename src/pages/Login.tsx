
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues extends LoginFormValues {
  confirmPassword: string;
  organizationName: string;
}

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const signupForm = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      organizationName: '',
    }
  });

  const handleLogin = (data: LoginFormValues) => {
    // In a real app, this would use actual authentication
    console.log('Login attempt:', data);
    
    // Mock successful login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', data.email);
    
    toast({
      title: "Login successful",
      description: "Welcome back!"
    });
    
    navigate('/dashboard');
  };

  const handleSignup = (data: SignupFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would create a new user and organization
    console.log('Signup attempt:', data);
    
    // Mock successful signup
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('organizationName', data.organizationName);
    
    toast({
      title: "Account created",
      description: `Welcome to ${data.organizationName}!`
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="relative h-12 w-12 rounded-md bg-teal-400 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-teal-900" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4L12 20" />
                <path d="M8 9L8 15" />
                <path d="M4 11L4 13" />
                <path d="M16 8L16 16" />
                <path d="M20 10L20 14" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to VAPI</CardTitle>
          <CardDescription>Sign in to your account or create a new organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="signup">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Create Account
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} VAPI. All rights reserved.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
