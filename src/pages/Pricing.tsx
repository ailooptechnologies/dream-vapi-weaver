
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 1,000 minutes/month",
        "2 AI Agents",
        "Basic analytics",
        "Email support",
        "1 Telephony provider",
        "Standard voice models"
      ],
      action: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "$199",
      description: "For growing businesses with advanced needs",
      features: [
        "Up to 5,000 minutes/month",
        "10 AI Agents",
        "Advanced analytics",
        "Priority support",
        "3 Telephony providers",
        "Custom voice models",
        "API access",
        "Team collaboration"
      ],
      highlighted: true,
      action: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific requirements",
      features: [
        "Unlimited minutes",
        "Unlimited AI Agents",
        "Custom analytics",
        "24/7 dedicated support",
        "Unlimited providers",
        "Custom everything",
        "Full API access",
        "Advanced security",
        "SLA guarantee"
      ],
      action: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include core Voice AI features.
          </p>
        </section>

        {/* Pricing Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${plan.highlighted ? 'border-primary shadow-lg' : 'border-border/50'}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.action}
                    </Button>
                  </CardFooter>
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

export default Pricing;
