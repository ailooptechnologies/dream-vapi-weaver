
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Phone, MessageSquare, Mic, Volume2, Zap, Shield, BarChart2, Users } from "lucide-react";
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

const Features = () => {
  const features = [
    {
      title: "AI Voice Agents",
      description: "Advanced AI-powered voice agents that understand context and nuance",
      icon: <Bot className="h-6 w-6" />,
      details: [
        "Natural language understanding",
        "Context-aware conversations",
        "Multi-turn dialogues",
        "Custom personality configuration"
      ]
    },
    {
      title: "Telephony Integration",
      description: "Seamless integration with major telephony providers",
      icon: <Phone className="h-6 w-6" />,
      details: [
        "Multiple provider support",
        "High-quality voice calls",
        "Real-time call monitoring",
        "Call analytics"
      ]
    },
    {
      title: "Advanced NLP",
      description: "State-of-the-art natural language processing capabilities",
      icon: <MessageSquare className="h-6 w-6" />,
      details: [
        "Intent recognition",
        "Entity extraction",
        "Sentiment analysis",
        "Contextual understanding"
      ]
    },
    {
      title: "Speech Recognition",
      description: "High-accuracy speech-to-text conversion",
      icon: <Mic className="h-6 w-6" />,
      details: [
        "Multi-language support",
        "Accent recognition",
        "Background noise filtering",
        "Real-time transcription"
      ]
    },
    {
      title: "Voice Synthesis",
      description: "Natural-sounding text-to-speech conversion",
      icon: <Volume2 className="h-6 w-6" />,
      details: [
        "Multiple voice options",
        "Emotional expression",
        "Custom voice training",
        "Natural prosody"
      ]
    },
    {
      title: "Performance",
      description: "High-performance infrastructure for reliable operations",
      icon: <Zap className="h-6 w-6" />,
      details: [
        "Low latency responses",
        "High availability",
        "Scalable architecture",
        "Load balancing"
      ]
    },
    {
      title: "Security",
      description: "Enterprise-grade security measures",
      icon: <Shield className="h-6 w-6" />,
      details: [
        "End-to-end encryption",
        "Data privacy compliance",
        "Access control",
        "Audit logging"
      ]
    },
    {
      title: "Analytics",
      description: "Comprehensive analytics and reporting",
      icon: <BarChart2 className="h-6 w-6" />,
      details: [
        "Call statistics",
        "Conversation analytics",
        "Performance metrics",
        "Custom reports"
      ]
    },
    {
      title: "Team Collaboration",
      description: "Tools for team management and collaboration",
      icon: <Users className="h-6 w-6" />,
      details: [
        "Role-based access",
        "Team workspaces",
        "Shared resources",
        "Activity tracking"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powerful Features for Your <span className="text-primary">Voice AI</span> Needs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our comprehensive suite of features designed to help you build, deploy, and manage sophisticated voice AI applications.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Start Free Trial</Button>
            <Button size="lg" variant="outline">Contact Sales</Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
