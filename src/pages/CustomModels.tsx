
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Mic, VolumeX, Volume2, Headphones, MessageSquare, Plus } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const CustomModels = () => {
  // State for active models
  const [activeSTTModel, setActiveSTTModel] = useState<string | null>(null);
  const [activeTTSModel, setActiveTTSModel] = useState<string | null>(null);
  const [activeNLUModel, setActiveNLUModel] = useState<string | null>(null);
  
  // Sample model data (in a real app, this would come from an API)
  const sttModels = [
    { id: 'whisper-1', name: 'Whisper v1', provider: 'OpenAI', accuracy: 'High' },
    { id: 'deepgram-nova', name: 'Nova', provider: 'Deepgram', accuracy: 'Very High' },
    { id: 'azure-stt', name: 'Azure Speech', provider: 'Microsoft', accuracy: 'Medium' },
  ];
  
  const ttsModels = [
    { id: 'eleven-multilingual', name: 'Multilingual v2', provider: 'ElevenLabs', quality: 'Premium' },
    { id: 'azure-neural', name: 'Neural Voices', provider: 'Microsoft', quality: 'High' },
    { id: 'gcp-wavenet', name: 'WaveNet', provider: 'Google', quality: 'High' },
  ];
  
  const nluModels = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', capability: 'Advanced' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', capability: 'Advanced' },
    { id: 'llama-70b', name: 'Llama 3 70B', provider: 'Meta', capability: 'High' },
  ];

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Custom Models</h1>
          <p className="text-muted-foreground">Configure and manage your AI models for voice and language processing</p>
        </div>

        <Tabs defaultValue="stt" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="stt" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>Speech-to-Text</span>
            </TabsTrigger>
            <TabsTrigger value="tts" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <span>Text-to-Speech</span>
            </TabsTrigger>
            <TabsTrigger value="nlu" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Natural Language</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Speech-to-Text Tab */}
          <TabsContent value="stt">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Speech-to-Text Models</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom STT Model
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sttModels.map((model) => (
                <Card key={model.id} className={activeSTTModel === model.id ? 'border-primary' : ''}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-base font-semibold">{model.name}</CardTitle>
                      <CardDescription>{model.provider}</CardDescription>
                    </div>
                    <Mic className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="text-sm">
                      <span className="font-medium">Accuracy:</span> {model.accuracy}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant={activeSTTModel === model.id ? "secondary" : "outline"} 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveSTTModel(model.id)}
                    >
                      {activeSTTModel === model.id ? 'Selected' : 'Select Model'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-dashed border-2">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-base font-semibold">Custom STT Model</CardTitle>
                    <CardDescription>Add your own model</CardDescription>
                  </div>
                  <Mic className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-6">
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Configure a custom STT model with your provider</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Add Custom Model
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {activeSTTModel && (
              <div className="mt-8 border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Configure STT Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <Input type="password" placeholder="Enter API key" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Region</label>
                    <Select defaultValue="us-west">
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-west">US West</SelectItem>
                        <SelectItem value="us-east">US East</SelectItem>
                        <SelectItem value="eu-west">EU West</SelectItem>
                        <SelectItem value="asia">Asia Pacific</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select defaultValue="en-US">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Model Version</label>
                    <Select defaultValue="latest">
                      <SelectTrigger>
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="legacy">Legacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>Save Configuration</Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Text-to-Speech Tab */}
          <TabsContent value="tts">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Text-to-Speech Models</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom TTS Model
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ttsModels.map((model) => (
                <Card key={model.id} className={activeTTSModel === model.id ? 'border-primary' : ''}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-base font-semibold">{model.name}</CardTitle>
                      <CardDescription>{model.provider}</CardDescription>
                    </div>
                    <Headphones className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="text-sm">
                      <span className="font-medium">Quality:</span> {model.quality}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant={activeTTSModel === model.id ? "secondary" : "outline"} 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveTTSModel(model.id)}
                    >
                      {activeTTSModel === model.id ? 'Selected' : 'Select Model'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-dashed border-2">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-base font-semibold">Custom TTS Model</CardTitle>
                    <CardDescription>Add your own model</CardDescription>
                  </div>
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-6">
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Configure a custom TTS model with your provider</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Add Custom Model
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {activeTTSModel && (
              <div className="mt-8 border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Configure TTS Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <Input type="password" placeholder="Enter API key" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Voice</label>
                    <Select defaultValue="female-1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female-1">Female Voice 1</SelectItem>
                        <SelectItem value="female-2">Female Voice 2</SelectItem>
                        <SelectItem value="male-1">Male Voice 1</SelectItem>
                        <SelectItem value="male-2">Male Voice 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select defaultValue="en-US">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Speed</label>
                    <Select defaultValue="1.0">
                      <SelectTrigger>
                        <SelectValue placeholder="Select speed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.8">Slow (0.8x)</SelectItem>
                        <SelectItem value="1.0">Normal (1.0x)</SelectItem>
                        <SelectItem value="1.2">Fast (1.2x)</SelectItem>
                        <SelectItem value="1.5">Very Fast (1.5x)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>Save Configuration</Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Natural Language Understanding Tab */}
          <TabsContent value="nlu">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Natural Language Models</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom NLU Model
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nluModels.map((model) => (
                <Card key={model.id} className={activeNLUModel === model.id ? 'border-primary' : ''}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-base font-semibold">{model.name}</CardTitle>
                      <CardDescription>{model.provider}</CardDescription>
                    </div>
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="text-sm">
                      <span className="font-medium">Capability:</span> {model.capability}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant={activeNLUModel === model.id ? "secondary" : "outline"} 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveNLUModel(model.id)}
                    >
                      {activeNLUModel === model.id ? 'Selected' : 'Select Model'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-dashed border-2">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-base font-semibold">Custom NLU Model</CardTitle>
                    <CardDescription>Add your own model</CardDescription>
                  </div>
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-6">
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Configure a custom NLU model with your provider</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Add Custom Model
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {activeNLUModel && (
              <div className="mt-8 border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Configure NLU Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <Input type="password" placeholder="Enter API key" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Temperature</label>
                    <Select defaultValue="0.7">
                      <SelectTrigger>
                        <SelectValue placeholder="Select temperature" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.0">0.0 (Deterministic)</SelectItem>
                        <SelectItem value="0.3">0.3 (Conservative)</SelectItem>
                        <SelectItem value="0.7">0.7 (Balanced)</SelectItem>
                        <SelectItem value="1.0">1.0 (Creative)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Tokens</label>
                    <Select defaultValue="1024">
                      <SelectTrigger>
                        <SelectValue placeholder="Select max tokens" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512">512</SelectItem>
                        <SelectItem value="1024">1024</SelectItem>
                        <SelectItem value="2048">2048</SelectItem>
                        <SelectItem value="4096">4096</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">System Prompt</label>
                    <Input placeholder="Enter system prompt" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>Save Configuration</Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomModels;
