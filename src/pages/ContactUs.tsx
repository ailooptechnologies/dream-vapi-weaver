import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Calendar, UserPlus } from "lucide-react";
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

const ContactUs = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contact form submitted:', data);
    toast("Message sent", {
      description: "We'll get back to you as soon as possible."
    });
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      
      <main className="flex-1">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Contact Our Team</h1>
                <p className="text-xl text-muted-foreground">
                  Get in touch with us to learn more about VoiceAI and how we can help your business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <Mail className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Email Us</CardTitle>
                    <CardDescription>
                      support@voiceai.com
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <Phone className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Call Us</CardTitle>
                    <CardDescription>
                      +1 (555) 123-4567
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <Calendar className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Schedule a Call</CardTitle>
                    <CardDescription>
                      Book a time that works for you
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" required {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" required {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Your company" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your needs..." 
                                className="min-h-[150px]"
                                required 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full md:w-auto">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
