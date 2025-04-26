
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Headphones, MessageCircle, Speech } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceAgent from "@/components/VoiceAgent";
import Feature from "@/components/Feature";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import SoundWaveAnimation from "@/components/SoundWaveAnimation";

const Index = () => {
  const [demoActive, setDemoActive] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 gradient-bg opacity-[0.03] pointer-events-none"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
                Voice AI <span className="text-primary">Agents</span> for Developers
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Create intelligent voice experiences with our powerful Voice AI platform. Build, test, and deploy voice agents that understand natural language.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Get Started Free</Button>
                <Button size="lg" variant="outline">View Documentation</Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-3xl"></div>
              <div className="relative bg-black/5 dark:bg-white/5 rounded-3xl p-8 border border-border/50 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Voice AI Playground</div>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border/50 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">CustomerSupportAgent</div>
                      <div className="text-sm">How can I assist you today?</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between">
                  <Button 
                    variant={demoActive ? "destructive" : "default"} 
                    onClick={() => setDemoActive(!demoActive)}
                    className="w-full"
                  >
                    {demoActive ? 'Stop Demo' : 'Start Demo'}
                  </Button>
                  <div className="w-24">
                    <SoundWaveAnimation isActive={demoActive} barCount={4} />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Voice AI Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create exceptional voice experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature 
              icon={<Speech className="h-6 w-6" />}
              title="Natural Language Processing"
              description="Advanced NLP capabilities that understand context, intent, and sentiment in human speech."
            />
            <Feature 
              icon={<Bot className="h-6 w-6" />}
              title="Customizable Agents"
              description="Build and customize voice agents for specific use cases and domains with our intuitive interface."
            />
            <Feature 
              icon={<Headphones className="h-6 w-6" />}
              title="Voice Recognition"
              description="High-accuracy speech recognition that works across accents, languages, and noisy environments."
            />
            <Feature 
              icon={<MessageCircle className="h-6 w-6" />}
              title="Seamless Integration"
              description="Easy-to-use APIs and SDKs for integrating voice capabilities into your applications."
            />
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Try Our Voice Agents</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore different voice agent templates for your next project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <VoiceAgent 
              name="Customer Support" 
              description="Handle support requests and answer common questions"
            />
            <VoiceAgent 
              name="Smart Assistant" 
              description="General-purpose assistant for daily tasks"
            />
            <VoiceAgent 
              name="Sales Agent" 
              description="Generate leads and handle product inquiries"
            />
          </div>

          <div className="text-center mt-12">
            <Button size="lg">View All Templates</Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-[0.03] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Voice AI Experience?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get started with VoiceAI today and transform how users interact with your applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Start Free Trial</Button>
              <Button size="lg" variant="outline">Schedule a Demo</Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
