
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Save, Phone, CheckCircle, XCircle, ArrowRight, Smartphone } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import VoiceAgent from '@/components/VoiceAgent';

// Define the schema for test numbers
const testSchema = z.object({
  numbers: z.array(z.string().min(7, "Phone number must be valid")).min(1, "Add at least one number").max(5, "Maximum 5 test numbers allowed"),
  reactions: z.record(z.string(), z.object({
    rating: z.enum(["excellent", "good", "average", "poor", "terrible"]),
    feedback: z.string().optional(),
  })).optional(),
});

type TestFormValues = z.infer<typeof testSchema>;

// Define a consistent type for reactions
type ReactionType = {
  rating: string;
  feedback?: string;
};

const CampaignTesting = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCalling, setIsCalling] = useState(false);
  const [currentCallIndex, setCurrentCallIndex] = useState<number | null>(null);
  const [callCompleted, setCallCompleted] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get campaign data from localStorage
  const campaignData = localStorage.getItem('currentCampaign') 
    ? JSON.parse(localStorage.getItem('currentCampaign') || '{}')
    : { name: 'Test Campaign', agentId: '123' };

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      numbers: [''],
      reactions: {},
    },
  });

  const addNumber = () => {
    const currentNumbers = form.getValues('numbers');
    if (currentNumbers.length < 5) {
      form.setValue('numbers', [...currentNumbers, '']);
    } else {
      toast({
        title: "Maximum reached",
        description: "You can add a maximum of 5 test numbers",
        variant: "destructive"
      });
    }
  };

  const removeNumber = (index: number) => {
    const currentNumbers = form.getValues('numbers');
    if (currentNumbers.length > 1) {
      form.setValue('numbers', currentNumbers.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Minimum required",
        description: "At least one test number is required",
        variant: "destructive"
      });
    }
  };

  const simulateCall = async (index: number) => {
    const numbers = form.getValues('numbers');
    if (!numbers[index] || numbers[index].length < 7) {
      toast({
        title: "Invalid number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setIsCalling(true);
    setCurrentCallIndex(index);
    
    // Simulate API call duration
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setCallCompleted([...callCompleted, numbers[index]]);
    setCurrentCallIndex(null);
    setIsCalling(false);
    
    toast({
      title: "Call completed",
      description: `Test call to ${numbers[index]} was completed successfully`,
    });
  };

  const handleStartTesting = async () => {
    const result = await form.trigger('numbers');
    if (!result) {
      return;
    }
    
    // Validate that all numbers are unique
    const numbers = form.getValues('numbers');
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      toast({
        title: "Duplicate numbers",
        description: "Please ensure all test numbers are unique",
        variant: "destructive"
      });
      return;
    }
    
    // Ensure at least one call has been completed
    if (callCompleted.length === 0) {
      toast({
        title: "No calls made",
        description: "Please test at least one phone number before proceeding",
        variant: "destructive"
      });
      return;
    }
    
    // Initialize reactions for completed calls
    const reactions = { ...form.getValues('reactions') } || {};
    callCompleted.forEach(number => {
      const numberIndex = form.getValues('numbers').indexOf(number);
      if (!reactions[numberIndex]) {
        reactions[numberIndex] = { rating: "average" };
      }
    });
    form.setValue('reactions', reactions);
    
    setShowFeedback(true);
  };
  
  const handleSubmit = (data: TestFormValues) => {
    setIsSubmitting(true);
    
    // Check if all completed calls have feedback
    const allFeedbackProvided = callCompleted.every(number => {
      const numberIndex = form.getValues('numbers').indexOf(number);
      return form.getValues(`reactions.${numberIndex}.rating`);
    });
    
    if (!allFeedbackProvided) {
      toast({
        title: "Missing feedback",
        description: "Please provide feedback for all completed calls",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Create the final campaign data with test results
    const testResults = {
      testedNumbers: callCompleted,
      feedback: form.getValues('reactions'),
      testedAt: new Date().toISOString(),
    };
    
    // Update campaign data with test results
    const updatedCampaignData = {
      ...campaignData,
      testResults,
      // Update bot configuration based on feedback
      agentConfig: {
        ...campaignData.agentConfig,
        // Incorporate feedback into agent configuration
        adjustedPrompt: generateAdjustedPrompt(form.getValues('reactions') || {}),
      },
      status: 'draft', // Keep as draft until final review
    };
    
    // Save the complete campaign with test results
    localStorage.setItem('currentCampaign', JSON.stringify(updatedCampaignData));
    
    setIsSubmitting(false);
    toast({
      title: "Testing completed",
      description: "Your campaign test feedback has been submitted successfully. Proceeding to final review.",
    });
    
    // Navigate to campaign review
    navigate("/campaign");
  };
  
  // Helper function to adjust bot prompt based on feedback
  const generateAdjustedPrompt = (reactions: Record<string, ReactionType>) => {
    const feedbackPoints = Object.values(reactions)
      .filter(r => r && r.feedback) // Ensure the reaction exists and has feedback
      .map(r => r.feedback)
      .filter(Boolean)
      .join('\n');
      
    // Combine original prompt with feedback
    const originalPrompt = campaignData.prompt || '';
    return `${originalPrompt}\n\nAdjustments based on testing feedback:\n${feedbackPoints}`;
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Campaign Testing</h1>
            <p className="text-muted-foreground">Test your campaign with up to 5 phone numbers</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              Campaign: {campaignData.name}
            </span>
          </div>
        </div>

        {!showFeedback ? (
          <Card>
            <CardHeader>
              <CardTitle>Add Test Phone Numbers</CardTitle>
              <CardDescription>Add up to 5 phone numbers to test your AI agent</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className="space-y-4">
                  {form.watch('numbers').map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`numbers.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <div className="flex items-center gap-3">
                              <FormControl>
                                <Input 
                                  placeholder="Phone number" 
                                  {...field}
                                  disabled={callCompleted.includes(field.value)}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                disabled={isCalling || callCompleted.includes(field.value)}
                                onClick={() => simulateCall(index)}
                                className="min-w-[100px]"
                              >
                                {callCompleted.includes(field.value) ? (
                                  <span className="flex items-center gap-2 text-green-500">
                                    <CheckCircle className="h-4 w-4" />
                                    Called
                                  </span>
                                ) : currentCallIndex === index && isCalling ? (
                                  <span className="flex items-center gap-2">
                                    <span className="animate-pulse">Calling...</span>
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Test Call
                                  </span>
                                )}
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeNumber(index)}
                                disabled={form.watch('numbers').length <= 1}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addNumber}
                    disabled={form.watch('numbers').length >= 5}
                    className="w-full"
                  >
                    + Add Another Number
                  </Button>
                  
                  <div className="pt-4 border-t mt-6">
                    <Button
                      type="button"
                      className="w-full flex items-center gap-2 justify-center"
                      onClick={handleStartTesting}
                      disabled={callCompleted.length === 0}
                    >
                      <ArrowRight className="h-4 w-4" />
                      Continue to Feedback
                    </Button>
                  </div>
                </div>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>AI Agent Preview</CardTitle>
                <CardDescription>This is the AI agent that made the test calls</CardDescription>
              </CardHeader>
              <CardContent>
                <VoiceAgent 
                  name={campaignData.agentName || "Test AI Agent"}
                  description={campaignData.agentDescription || "AI voice agent for automated calling"}
                />
              </CardContent>
            </Card>
          
            <Card>
              <CardHeader>
                <CardTitle>Provide Feedback</CardTitle>
                <CardDescription>Rate the performance of the AI agent in each test call</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    {callCompleted.map((number) => {
                      const numberIndex = form.getValues('numbers').indexOf(number);
                      return (
                        <div key={number} className="p-4 border rounded-md">
                          <div className="flex items-center gap-2 mb-4">
                            <Smartphone className="h-4 w-4" />
                            <h3 className="font-medium">{number}</h3>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name={`reactions.${numberIndex}.rating`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>How was the call quality?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="excellent" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Excellent - The AI was perfect
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="good" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Good - The AI was mostly on point
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="average" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Average - The AI was acceptable
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="poor" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Poor - The AI needs improvement
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="terrible" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Terrible - The AI was unusable
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`reactions.${numberIndex}.feedback`}
                            render={({ field }) => (
                              <FormItem className="mt-4">
                                <FormLabel>Additional feedback (optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Provide any specific feedback to improve the AI agent" 
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      );
                    })}
                    
                    <Button 
                      type="submit" 
                      className="w-full flex items-center gap-2 justify-center"
                      disabled={isSubmitting}
                    >
                      <Save className="h-4 w-4" />
                      {isSubmitting ? "Submitting..." : "Submit Feedback & Complete Testing"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignTesting;
