import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Mail, User, Lock } from "lucide-react";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleRegister = (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast("Error", {
        description: "Passwords do not match"
      });
      return;
    }
    
    console.log('Register attempt:', data);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', data.email);
    
    toast("Registration successful", {
      description: "Welcome to VoiceAI!"
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="relative h-12 w-12 rounded-md bg-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4L12 20" />
                <path d="M8 9L8 15" />
                <path d="M4 11L4 13" />
                <path d="M16 8L16 16" />
                <path d="M20 10L20 14" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Get started with VoiceAI</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input type="text" className="pl-10" required {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input type="email" className="pl-10" required {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input type="password" className="pl-10" required {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input type="password" className="pl-10" required {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
          <div>
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
          <div>
            &copy; {new Date().getFullYear()} VoiceAI. All rights reserved.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
