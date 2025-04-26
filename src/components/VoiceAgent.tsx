
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Bot } from "lucide-react";
import SoundWaveAnimation from './SoundWaveAnimation';

interface VoiceAgentProps {
  name: string;
  description: string;
  avatar?: string;
  className?: string;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({
  name,
  description,
  avatar,
  className = '',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setTimeout(() => {
        setIsSpeaking(true);
        setResponse("I'm a voice AI assistant that can help developers build amazing voice experiences. This is a simulation of how I would respond in a real voice conversation.");
        
        setTimeout(() => {
          setIsSpeaking(false);
        }, 5000);
      }, 1000);
    } else {
      setResponse(null);
      setIsListening(true);
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {avatar ? (
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img src={avatar} alt={name} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="h-6 w-6" />
            </div>
          )}
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[100px] mb-4">
          {response && (
            <p className="text-sm text-muted-foreground">{response}</p>
          )}
          {!response && !isListening && (
            <p className="text-sm text-muted-foreground">Press the microphone button to start a conversation.</p>
          )}
          {isListening && (
            <p className="text-sm text-muted-foreground">Listening... Try saying "Tell me about yourself"</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button 
            onClick={toggleListening}
            variant={isListening ? "destructive" : "default"}
            className="flex gap-2"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? "Stop" : "Start"}
          </Button>
          
          <div className="h-10 flex items-center justify-center">
            {(isListening || isSpeaking) && (
              <SoundWaveAnimation isActive={isListening || isSpeaking} barCount={5} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAgent;
