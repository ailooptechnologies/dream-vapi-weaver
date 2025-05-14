
import React, { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Download, ChevronDown, ChevronRight, Search, Copy } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// API documentation data structure
const apiDocs = [
  {
    category: "Authentication",
    endpoints: [
      {
        name: "Login",
        description: "Authenticate a user with email and password",
        url: "/api/auth/login",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Content-Type", value: "application/json", required: true }
        ],
        body: {
          type: "json",
          content: {
            email: "user@example.com",
            password: "password123"
          }
        },
        responses: [
          {
            status: 200,
            description: "Successfully authenticated",
            content: {
              token: "jwt-token-here",
              user: {
                id: "user-id",
                email: "user@example.com",
                name: "User Name"
              }
            }
          },
          {
            status: 401,
            description: "Authentication failed",
            content: {
              error: "Invalid credentials"
            }
          }
        ]
      },
      {
        name: "Register",
        description: "Register a new user account",
        url: "/api/auth/register",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Content-Type", value: "application/json", required: true }
        ],
        body: {
          type: "json",
          content: {
            email: "newuser@example.com",
            password: "newpassword123",
            name: "New User"
          }
        },
        responses: [
          {
            status: 201,
            description: "User created successfully",
            content: {
              user: {
                id: "new-user-id",
                email: "newuser@example.com",
                name: "New User"
              }
            }
          },
          {
            status: 400,
            description: "Validation error",
            content: {
              error: "Email already in use"
            }
          }
        ]
      }
    ]
  },
  {
    category: "Organizations",
    endpoints: [
      {
        name: "Get Organizations",
        description: "Retrieve all organizations for the current user",
        url: "/api/organizations",
        method: "GET",
        parameters: [],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true }
        ],
        body: null,
        responses: [
          {
            status: 200,
            description: "List of organizations",
            content: {
              organizations: [
                {
                  id: "org-id-1",
                  name: "Organization 1",
                  isActive: true
                },
                {
                  id: "org-id-2",
                  name: "Organization 2",
                  isActive: false
                }
              ]
            }
          }
        ]
      },
      {
        name: "Create Organization",
        description: "Create a new organization",
        url: "/api/organizations",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true },
          { name: "Content-Type", value: "application/json", required: true }
        ],
        body: {
          type: "json",
          content: {
            name: "New Organization"
          }
        },
        responses: [
          {
            status: 201,
            description: "Organization created",
            content: {
              id: "new-org-id",
              name: "New Organization",
              isActive: true
            }
          }
        ]
      }
    ]
  },
  {
    category: "Campaigns",
    endpoints: [
      {
        name: "Get Campaigns",
        description: "Retrieve all campaigns for the current organization",
        url: "/api/campaigns",
        method: "GET",
        parameters: [
          { name: "organizationId", required: true, in: "query", description: "ID of the organization" }
        ],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true }
        ],
        body: null,
        responses: [
          {
            status: 200,
            description: "List of campaigns",
            content: {
              campaigns: [
                {
                  id: "campaign-1",
                  name: "Campaign Name",
                  status: "active",
                  startDate: "2023-01-01T00:00:00Z",
                  endDate: "2023-02-01T00:00:00Z"
                }
              ]
            }
          }
        ]
      },
      {
        name: "Create Campaign",
        description: "Create a new calling campaign",
        url: "/api/campaigns",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true },
          { name: "Content-Type", value: "application/json", required: true }
        ],
        body: {
          type: "json",
          content: {
            name: "New Campaign",
            organizationId: "org-id",
            agentId: "agent-id",
            contacts: ["contact-id-1", "contact-id-2"],
            schedule: {
              startDate: "2023-01-01T00:00:00Z",
              endDate: "2023-02-01T00:00:00Z",
              callTimes: {
                monday: { start: "09:00", end: "17:00" },
                tuesday: { start: "09:00", end: "17:00" }
              }
            }
          }
        },
        responses: [
          {
            status: 201,
            description: "Campaign created",
            content: {
              id: "new-campaign-id",
              name: "New Campaign",
              status: "draft"
            }
          }
        ]
      }
    ]
  },
  {
    category: "AI Agents",
    endpoints: [
      {
        name: "Get Agents",
        description: "Retrieve all AI agents for the current organization",
        url: "/api/agents",
        method: "GET",
        parameters: [
          { name: "organizationId", required: true, in: "query", description: "ID of the organization" }
        ],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true }
        ],
        body: null,
        responses: [
          {
            status: 200,
            description: "List of AI agents",
            content: {
              agents: [
                {
                  id: "agent-id",
                  name: "Customer Support Agent",
                  description: "Handles customer inquiries",
                  model: "gpt-4",
                  provider: "openai"
                }
              ]
            }
          }
        ]
      },
      {
        name: "Create Agent",
        description: "Create a new AI agent",
        url: "/api/agents",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true },
          { name: "Content-Type", value: "application/json", required: true }
        ],
        body: {
          type: "json",
          content: {
            name: "Sales Agent",
            description: "Handles sales calls",
            firstMessage: "Hello, this is the sales department. How can I help you today?",
            model: "gpt-4",
            provider: "openai",
            organizationId: "org-id"
          }
        },
        responses: [
          {
            status: 201,
            description: "Agent created",
            content: {
              id: "new-agent-id",
              name: "Sales Agent",
              description: "Handles sales calls",
              model: "gpt-4",
              provider: "openai"
            }
          }
        ]
      }
    ]
  },
  {
    category: "Phone Numbers",
    endpoints: [
      {
        name: "Get Phone Numbers",
        description: "Retrieve all phone numbers for the current organization",
        url: "/api/phone-numbers",
        method: "GET",
        parameters: [
          { name: "organizationId", required: true, in: "query", description: "ID of the organization" }
        ],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true }
        ],
        body: null,
        responses: [
          {
            status: 200,
            description: "List of phone numbers",
            content: {
              phoneNumbers: [
                {
                  id: "phone-id-1",
                  number: "+15551234567",
                  provider: "twilio",
                  capabilities: ["voice", "sms"],
                  status: "active"
                }
              ]
            }
          }
        ]
      },
      {
        name: "Purchase Phone Number",
        description: "Purchase a new phone number",
        url: "/api/phone-numbers/purchase",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true },
          { name: "Content-Type", value: "application/json", required: true }
        ],
        body: {
          type: "json",
          content: {
            organizationId: "org-id",
            areaCode: "555",
            capabilities: ["voice", "sms"],
            provider: "twilio"
          }
        },
        responses: [
          {
            status: 201,
            description: "Phone number purchased",
            content: {
              id: "new-phone-id",
              number: "+15551234999",
              provider: "twilio",
              capabilities: ["voice", "sms"],
              status: "active"
            }
          }
        ]
      }
    ]
  },
  {
    category: "Custom Models",
    endpoints: [
      {
        name: "Get Custom Models",
        description: "Retrieve all custom models for the current organization",
        url: "/api/custom-models",
        method: "GET",
        parameters: [
          { name: "organizationId", required: true, in: "query", description: "ID of the organization" }
        ],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true }
        ],
        body: null,
        responses: [
          {
            status: 200,
            description: "List of custom models",
            content: {
              models: [
                {
                  id: "model-id-1",
                  name: "Custom Support Voice",
                  type: "voice",
                  status: "trained",
                  createdAt: "2023-01-01T00:00:00Z"
                }
              ]
            }
          }
        ]
      },
      {
        name: "Create Custom Model",
        description: "Create a new custom voice or text model",
        url: "/api/custom-models",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true },
          { name: "Content-Type", value: "multipart/form-data", required: true }
        ],
        body: {
          type: "form-data",
          content: {
            name: "Custom Sales Voice",
            type: "voice",
            organizationId: "org-id",
            samples: "[File uploads]",
            description: "Voice model for sales calls"
          }
        },
        responses: [
          {
            status: 202,
            description: "Model creation initiated",
            content: {
              id: "new-model-id",
              name: "Custom Sales Voice",
              type: "voice",
              status: "processing"
            }
          }
        ]
      }
    ]
  },
  {
    category: "Provider Keys",
    endpoints: [
      {
        name: "Get Provider Keys",
        description: "Retrieve all provider API keys for the current organization",
        url: "/api/provider-keys",
        method: "GET",
        parameters: [
          { name: "organizationId", required: true, in: "query", description: "ID of the organization" }
        ],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true }
        ],
        body: null,
        responses: [
          {
            status: 200,
            description: "List of provider keys",
            content: {
              providerKeys: [
                {
                  id: "key-id-1",
                  provider: "openai",
                  name: "Production OpenAI Key",
                  lastFourDigits: "1234"
                }
              ]
            }
          }
        ]
      },
      {
        name: "Add Provider Key",
        description: "Add a new provider API key",
        url: "/api/provider-keys",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true },
          { name: "Content-Type", value: "application/json", required: true }
        ],
        body: {
          type: "json",
          content: {
            provider: "anthropic",
            name: "Anthropic API Key",
            key: "sk-ant-api-key-full-value-here",
            organizationId: "org-id"
          }
        },
        responses: [
          {
            status: 201,
            description: "Provider key added",
            content: {
              id: "new-key-id",
              provider: "anthropic",
              name: "Anthropic API Key",
              lastFourDigits: "7890"
            }
          }
        ]
      }
    ]
  },
  {
    category: "Telephony Providers",
    endpoints: [
      {
        name: "Get Telephony Providers",
        description: "Retrieve all configured telephony providers",
        url: "/api/telephony-providers",
        method: "GET",
        parameters: [
          { name: "organizationId", required: true, in: "query", description: "ID of the organization" }
        ],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true }
        ],
        body: null,
        responses: [
          {
            status: 200,
            description: "List of telephony providers",
            content: {
              providers: [
                {
                  id: "provider-id-1",
                  name: "Twilio Account",
                  provider: "twilio",
                  status: "connected"
                }
              ]
            }
          }
        ]
      },
      {
        name: "Connect Telephony Provider",
        description: "Connect a new telephony provider",
        url: "/api/telephony-providers",
        method: "POST",
        parameters: [],
        headers: [
          { name: "Authorization", value: "Bearer {token}", required: true },
          { name: "Content-Type", value: "application/json", required: true }
        ],
        body: {
          type: "json",
          content: {
            provider: "twilio",
            name: "Main Twilio Account",
            credentials: {
              accountSid: "account-sid-value",
              authToken: "auth-token-value"
            },
            organizationId: "org-id"
          }
        },
        responses: [
          {
            status: 201,
            description: "Telephony provider connected",
            content: {
              id: "new-provider-id",
              name: "Main Twilio Account",
              provider: "twilio",
              status: "connected"
            }
          }
        ]
      }
    ]
  }
];

// Helper function to download API docs as JSON
const downloadApiDocs = (docs: typeof apiDocs) => {
  const jsonString = JSON.stringify(docs, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vapi-api-docs.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Helper function to generate PDF of the API docs
const downloadApiDocsPdf = () => {
  // In a real implementation, this would use a PDF generation library
  // For now, we'll just download the JSON
  downloadApiDocs(apiDocs);
};

const ApiDocs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<any | null>(null);
  const { toast } = useToast();

  // Filter endpoints based on search term and selected category
  const filteredDocs = apiDocs.filter(category => {
    if (searchTerm === '' && !selectedCategory) return true;
    if (selectedCategory && category.category === selectedCategory) return true;
    
    if (searchTerm === '') return false;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return category.category.toLowerCase().includes(lowerSearchTerm) ||
           category.endpoints.some(endpoint => 
             endpoint.name.toLowerCase().includes(lowerSearchTerm) ||
             endpoint.description.toLowerCase().includes(lowerSearchTerm) ||
             endpoint.url.toLowerCase().includes(lowerSearchTerm)
           );
  });

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard."
    });
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
      
      <div className="flex-1 p-4 sm:p-6 overflow-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">API Documentation</h1>
            <p className="text-muted-foreground">Explore and interact with the VAPI REST API</p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={() => downloadApiDocsPdf()} variant="outline" className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={() => downloadApiDocs(apiDocs)} className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download JSON
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar/Navigation */}
          <div className="lg:col-span-3 border rounded-lg bg-card">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search APIs..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8"
                />
              </div>
            </div>
            
            <div className="p-4 space-y-2 max-h-[70vh] overflow-auto">
              {filteredDocs.map((category, index) => (
                <div key={index} className="pb-2">
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category.category ? null : category.category)}
                    className="flex justify-between items-center w-full px-2 py-2 text-sm font-medium rounded-md hover:bg-muted"
                  >
                    <span>{category.category}</span>
                    {selectedCategory === category.category ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {selectedCategory === category.category && (
                    <div className="ml-2 pl-2 border-l space-y-1 mt-1">
                      {category.endpoints.map((endpoint, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedEndpoint(endpoint)}
                          className={`
                            flex items-center w-full px-2 py-1.5 text-sm rounded-md
                            hover:bg-muted transition-colors
                            ${selectedEndpoint === endpoint ? 'bg-muted font-medium' : ''}
                          `}
                        >
                          <Badge
                            variant="outline"
                            className={`
                              mr-2 w-14 text-xs font-bold
                              ${endpoint.method === 'GET' ? 'bg-blue-500/10 text-blue-600 border-blue-200' : ''}
                              ${endpoint.method === 'POST' ? 'bg-green-500/10 text-green-600 border-green-200' : ''}
                              ${endpoint.method === 'PUT' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200' : ''}
                              ${endpoint.method === 'DELETE' ? 'bg-red-500/10 text-red-600 border-red-200' : ''}
                            `}
                          >
                            {endpoint.method}
                          </Badge>
                          <span className="truncate">{endpoint.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {filteredDocs.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No API endpoints found for the current search.
                </div>
              )}
            </div>
          </div>

          {/* API Details */}
          <div className="lg:col-span-9">
            {selectedEndpoint ? (
              <Card className="shadow-sm border transition-all animate-fade-in">
                <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`
                          w-16 flex justify-center text-sm font-bold
                          ${selectedEndpoint.method === 'GET' ? 'bg-blue-500/10 text-blue-600 border-blue-200' : ''}
                          ${selectedEndpoint.method === 'POST' ? 'bg-green-500/10 text-green-600 border-green-200' : ''}
                          ${selectedEndpoint.method === 'PUT' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200' : ''}
                          ${selectedEndpoint.method === 'DELETE' ? 'bg-red-500/10 text-red-600 border-red-200' : ''}
                        `}
                      >
                        {selectedEndpoint.method}
                      </Badge>
                      <CardTitle>{selectedEndpoint.name}</CardTitle>
                    </div>
                    <CardDescription className="mt-1">{selectedEndpoint.description}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(selectedEndpoint.url)}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Endpoint URL */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Endpoint</h3>
                    <div className="flex items-center">
                      <code className="bg-muted px-3 py-2 rounded-md font-mono text-sm w-full overflow-auto">
                        {selectedEndpoint.url}
                      </code>
                    </div>
                  </div>

                  {/* Headers */}
                  {selectedEndpoint.headers && selectedEndpoint.headers.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Headers</h3>
                      <div className="bg-muted rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-2 text-left">Name</th>
                              <th className="px-4 py-2 text-left">Value</th>
                              <th className="px-4 py-2 text-left">Required</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedEndpoint.headers.map((header: any, i: number) => (
                              <tr key={i} className={i !== selectedEndpoint.headers.length - 1 ? "border-b" : ""}>
                                <td className="px-4 py-2 font-mono">{header.name}</td>
                                <td className="px-4 py-2 font-mono">{header.value}</td>
                                <td className="px-4 py-2">
                                  {header.required ? (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">Required</Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-200">Optional</Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Parameters */}
                  {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Parameters</h3>
                      <div className="bg-muted rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-2 text-left">Name</th>
                              <th className="px-4 py-2 text-left">In</th>
                              <th className="px-4 py-2 text-left">Required</th>
                              <th className="px-4 py-2 text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedEndpoint.parameters.map((param: any, i: number) => (
                              <tr key={i} className={i !== selectedEndpoint.parameters.length - 1 ? "border-b" : ""}>
                                <td className="px-4 py-2 font-mono">{param.name}</td>
                                <td className="px-4 py-2">{param.in || 'query'}</td>
                                <td className="px-4 py-2">
                                  {param.required ? (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">Required</Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-200">Optional</Badge>
                                  )}
                                </td>
                                <td className="px-4 py-2">{param.description || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Request Body */}
                  {selectedEndpoint.body && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Request Body</h3>
                      <div className="bg-muted rounded-md p-4 overflow-auto">
                        <pre className="text-sm font-mono">
                          {JSON.stringify(selectedEndpoint.body.content, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Responses */}
                  {selectedEndpoint.responses && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Responses</h3>
                      <Tabs defaultValue={selectedEndpoint.responses[0].status.toString()}>
                        <TabsList className="mb-2">
                          {selectedEndpoint.responses.map((response: any, i: number) => (
                            <TabsTrigger key={i} value={response.status.toString()}>
                              {response.status}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {selectedEndpoint.responses.map((response: any, i: number) => (
                          <TabsContent key={i} value={response.status.toString()}>
                            <div className="rounded-md border p-2 mb-2">
                              <span className="text-sm font-medium">{response.description}</span>
                            </div>
                            <div className="bg-muted rounded-md p-4 overflow-auto">
                              <pre className="text-sm font-mono">
                                {JSON.stringify(response.content, null, 2)}
                              </pre>
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm h-[75vh] border flex items-center justify-center">
                <CardContent className="text-center p-8">
                  <div className="mb-4 bg-primary/10 p-6 rounded-full inline-flex">
                    <Search className="h-12 w-12 text-primary opacity-80" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Select an API endpoint</h3>
                  <p className="text-muted-foreground max-w-md">
                    Choose an endpoint from the sidebar to view detailed API documentation, including request parameters, response formats, and example code.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
