import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from '@/services/auth';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: 'demo@example.com',
      password: 'demo123',
    }
  });

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const response = await authService.login(data.email, data.password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', response.user.email);
      
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive"
      });
    }
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
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" required {...field} />
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
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} VAPI. All rights reserved.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
