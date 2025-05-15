import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Phone, User, UserPlus, PhoneForwarded, PhoneOff, PhoneMissed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock agent data - would be fetched from API in real implementation
const mockHumanAgents = [
  { id: '1', name: 'John Doe', available: true },
  { id: '2', name: 'Jane Smith', available: true },
  { id: '3', name: 'Mike Johnson', available: false },
  { id: '4', name: 'Sarah Wilson', available: true },
];

export interface CallData {
  id: string;
  phoneNumber: string;
  startTime: Date;
  status: 'active' | 'waiting' | 'transferred' | 'ended';
  duration?: number;
  aiAgent?: string;
}

interface CallTransferSystemProps {
  inboundCall?: CallData;
  onAnswer?: (callId: string) => void;
  onReject?: (callId: string) => void;
  onTransfer?: (callId: string, agentId: string) => void;
  onEnd?: (callId: string) => void;
}

const CallTransferSystem = ({
  inboundCall,
  onAnswer,
  onReject,
  onTransfer,
  onEnd
}: CallTransferSystemProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [isTransferring, setIsTransferring] = useState(false);
  const { toast } = useToast();

  // Handle answering an inbound call
  const handleAnswer = () => {
    if (inboundCall) {
      onAnswer?.(inboundCall.id);
      toast("Call Answered", {
        description: `Connected to ${inboundCall.phoneNumber}`
      });
    }
  };

  // Handle rejecting an inbound call
  const handleReject = () => {
    if (inboundCall) {
      onReject?.(inboundCall.id);
      toast("Call Rejected", {
        description: `Call from ${inboundCall.phoneNumber} was rejected`
      });
    }
  };

  // Handle transferring a call to a human agent
  const handleTransfer = () => {
    if (!selectedAgent || !inboundCall) return;
    
    setIsTransferring(true);
    
    // Simulate transfer process with setTimeout
    setTimeout(() => {
      setIsTransferring(false);
      onTransfer?.(inboundCall.id, selectedAgent);
      
      const agent = mockHumanAgents.find(a => a.id === selectedAgent);
      toast("Call Transferred", {
        description: `Call transferred to ${agent?.name}`
      });
    }, 2000);
  };

  // Handle ending a call
  const handleEndCall = () => {
    if (inboundCall) {
      onEnd?.(inboundCall.id);
      toast("Call Ended", {
        description: `Call with ${inboundCall.phoneNumber} has ended`
      });
    }
  };

  // Format seconds into mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If no call is active, show default state
  if (!inboundCall) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Call Transfer System</CardTitle>
          <CardDescription>No active calls at the moment</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="text-center text-muted-foreground flex flex-col items-center gap-4">
            <Phone size={48} className="text-muted-foreground/50" />
            <p>Waiting for inbound calls</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show active call UI
  return (
    <Card className={inboundCall.status === 'active' ? 'border-primary' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          {inboundCall.status === 'waiting' ? 'Incoming Call' : 'Active Call'}
        </CardTitle>
        <CardDescription>
          {inboundCall.phoneNumber}
          {inboundCall.duration !== undefined && (
            <span className="ml-2">• {formatDuration(inboundCall.duration)}</span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {inboundCall.status === 'waiting' && (
          <div className="flex gap-4 justify-center">
            <Button onClick={handleAnswer} className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Answer
            </Button>
            <Button onClick={handleReject} variant="destructive" className="flex-1">
              <PhoneOff className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        )}
        
        {inboundCall.status === 'active' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">AI Agent Handling Call</p>
                <p className="text-sm text-muted-foreground">{inboundCall.aiAgent || 'Default Agent'}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Transfer to human agent</label>
              <div className="flex gap-2">
                <Select
                  value={selectedAgent}
                  onValueChange={setSelectedAgent}
                  disabled={isTransferring}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select agent..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockHumanAgents.map((agent) => (
                      <SelectItem
                        key={agent.id}
                        value={agent.id}
                        disabled={!agent.available}
                      >
                        <div className="flex items-center">
                          <span>{agent.name}</span>
                          {!agent.available && (
                            <span className="ml-auto text-sm text-muted-foreground">(Unavailable)</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleTransfer} 
                  disabled={!selectedAgent || isTransferring}
                  className="whitespace-nowrap"
                >
                  <PhoneForwarded className="mr-2 h-4 w-4" />
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {inboundCall.status === 'active' && (
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={handleEndCall}
          >
            <PhoneOff className="mr-2 h-4 w-4" />
            End Call
          </Button>
        )}
        
        {inboundCall.status === 'transferred' && (
          <div className="w-full text-center bg-muted p-2 rounded">
            <p className="text-sm text-muted-foreground">
              Call has been transferred to a human agent
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CallTransferSystem;
