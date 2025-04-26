import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, HelpCircle, Search, Mail, MessageSquare } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const helpSections = [
  {
    title: "Getting Started",
    description: "Learn the basics of using our Voice AI platform",
    items: [
      { title: "Platform Overview", content: "Understand the key features and capabilities of our Voice AI platform. Our platform enables you to create sophisticated AI voice agents that can handle calls, conduct conversations, and perform tasks autonomously.", expanded: false },
      { title: "Quick Start Guide", content: "Set up your first campaign in minutes with our step-by-step guide. Connect your telephony provider, create a simple AI agent, and launch your first outbound campaign to experience the platform's capabilities.", expanded: false },
      { title: "Best Practices", content: "Learn the recommended practices for creating effective voice campaigns. Craft clear agent scripts, test thoroughly before launching, monitor call quality, and continuously refine your agents based on call analytics.", expanded: false }
    ]
  },
  {
    title: "AI Agents",
    description: "Everything about creating and managing AI agents",
    items: [
      { title: "Creating Agents", content: "Learn how to create and customize AI agents for your needs. Define your agent's personality, knowledge base, and conversational patterns to ensure they represent your brand effectively.", expanded: false },
      { title: "Training Models", content: "Understand how to train your AI models effectively. Upload sample conversations, provide examples of good responses, and use our feedback tools to improve agent performance over time.", expanded: false },
      { title: "Agent Settings", content: "Configure your AI agents for optimal performance. Adjust parameters like response time, interruption handling, speech patterns, and fallback behaviors to fine-tune your agent's conversational abilities.", expanded: false }
    ]
  },
  {
    title: "Campaigns",
    description: "Managing your voice campaigns",
    items: [
      { title: "Campaign Setup", content: "Create and configure voice campaigns step by step. Define target audiences, schedule calls, assign agents, and set campaign goals to ensure successful execution.", expanded: false },
      { title: "Call Logs", content: "Track and analyze your campaign performance. Review call transcripts, listen to recordings, and use our analytics dashboard to understand key metrics and outcomes.", expanded: false },
      { title: "Scheduling", content: "Learn how to schedule and manage campaign timings. Set up recurring campaigns, respect time zones, and configure blackout periods to optimize contact rates while maintaining compliance.", expanded: false }
    ]
  },
  {
    title: "Telephony",
    description: "Managing phone numbers and providers",
    items: [
      { title: "Provider Configuration", content: "Set up and manage your telephony providers. Connect services like Twilio, AWS Chime, or Plivo to enable voice capabilities for your agents.", expanded: false },
      { title: "Phone Number Management", content: "Learn how to acquire, configure, and manage phone numbers for your campaigns. Set up caller ID, voicemail, and routing options to enhance your call operations.", expanded: false },
      { title: "Call Quality", content: "Optimize for clear and reliable calls. Understand bandwidth requirements, audio processing options, and troubleshooting techniques for handling common call quality issues.", expanded: false }
    ]
  },
  {
    title: "Analytics & Reporting",
    description: "Understanding your campaign performance",
    items: [
      { title: "Dashboard Overview", content: "Navigate and interpret your campaign analytics dashboard. Track key performance indicators like connection rates, conversion rates, call duration, and agent effectiveness.", expanded: false },
      { title: "Custom Reports", content: "Create tailored reports for specific business needs. Export data in various formats and schedule automated report delivery to stakeholders.", expanded: false },
      { title: "Insight Generation", content: "Extract actionable insights from your call data. Identify patterns, understand customer sentiment, and discover opportunities for improving your voice operations.", expanded: false }
    ]
  }
];

const faqItems = [
  {
    question: "How do I create my first AI agent?",
    answer: "Navigate to the AI Agents section, click 'Add New Agent', and follow the setup wizard. You'll need to define your agent's name, personality, and capabilities before training it with sample conversations."
  },
  {
    question: "Can I use my existing phone numbers?",
    answer: "Yes, you can port existing numbers to our platform or use them through our supported telephony providers like Twilio, AWS Chime, or Plivo."
  },
  {
    question: "How do I monitor active campaigns?",
    answer: "Visit the Campaign section and select your active campaign. You'll see real-time metrics, call logs, and can listen to ongoing calls or review transcripts as they complete."
  },
  {
    question: "What voice models are supported?",
    answer: "We support various text-to-speech and speech-to-text models from providers like OpenAI, ElevenLabs, Google, Amazon, and more. You can configure these in the Custom Models section."
  },
  {
    question: "How do I switch between organizations?",
    answer: "Use the organization switcher in the top navigation bar to move between different organizations you have access to."
  },
  {
    question: "What compliance features are available?",
    answer: "Our platform includes features for call recording consent, do-not-call list management, call time restrictions by region, and detailed audit logs for regulatory compliance."
  },
  {
    question: "Can I integrate with my CRM?",
    answer: "Yes, we offer integrations with popular CRMs like Salesforce, HubSpot, and more. You can also use our API to build custom integrations with your existing systems."
  }
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  const [activeTab, setActiveTab] = useState('guides');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  const toggleItemExpansion = (sectionTitle: string, itemTitle: string) => {
    const key = `${sectionTitle}-${itemTitle}`;
    setExpandedItems({
      ...expandedItems,
      [key]: !expandedItems[key]
    });
  };

  const filteredSections = searchQuery 
    ? helpSections.map(section => ({
        ...section,
        items: section.items.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.items.length > 0)
    : helpSections;

  const filteredFaqs = searchQuery
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  const handleEmailSupport = () => {
    window.location.href = "mailto:support@example.com";
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Help Center</h1>
              <p className="text-muted-foreground">Find guides, tutorials, and answers to common questions</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search for help topics..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="guides" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="guides">Guides & Tutorials</TabsTrigger>
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-6">
              {filteredSections.length > 0 ? (
                filteredSections.map((section) => (
                  <Card key={section.title}>
                    <CardHeader>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] rounded-md border p-4">
                        <div className="space-y-4">
                          {section.items.map((item) => {
                            const itemKey = `${section.title}-${item.title}`;
                            const isExpanded = expandedItems[itemKey];
                            
                            return (
                              <div key={item.title} className="space-y-2 border-b pb-4 last:border-b-0 last:pb-0">
                                <div 
                                  className="flex justify-between items-center cursor-pointer"
                                  onClick={() => toggleItemExpansion(section.title, item.title)}
                                >
                                  <h3 className="text-lg font-medium">{item.title}</h3>
                                  <Button variant="ghost" size="sm">
                                    {isExpanded ? "Show Less" : "Show More"}
                                  </Button>
                                </div>
                                <p className={`text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'}`}>
                                  {item.content}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border rounded-lg">
                  <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query or browse our help sections above
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Quick answers to common questions about our platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-6">
                      {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((item, index) => (
                          <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                            <h3 className="font-medium mb-2">{item.question}</h3>
                            <p className="text-sm text-muted-foreground">{item.answer}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No matching FAQs found</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
                <CardDescription>Get in touch with our support team for personalized assistance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-start gap-2 h-auto py-3"
                    onClick={() => setIsChatOpen(true)}
                  >
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Live Chat</div>
                      <div className="text-xs text-muted-foreground">Talk with our support team</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-start gap-2 h-auto py-3"
                    onClick={handleEmailSupport}
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Email Support</div>
                      <div className="text-xs text-muted-foreground">Get help via email</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-muted-foreground">
                  Our support team is available Monday through Friday, 9am-5pm PT
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Live Chat Support</SheetTitle>
            <SheetDescription>
              Chat with our support team in real-time
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 border rounded-lg p-4 h-[500px] flex flex-col justify-between">
            <div className="flex-1 overflow-auto mb-4">
              <div className="text-center text-muted-foreground">
                Start a conversation with our support team
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Fallback icon for search
const SearchIcon = Search;

export default Help;
