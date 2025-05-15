
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAssistantStore } from '@/store/useAssistantStore';
import { toast } from '@/hooks/use-toast';

const AssistantConfig: React.FC = () => {
  const { selectedAssistant, updateAssistant } = useAssistantStore();

  const handleFirstMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedAssistant) return;
    updateAssistant(selectedAssistant.id, { firstMessage: e.target.value });
    toast("First message updated", {
      description: "The assistant's first message has been updated successfully."
    });
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedAssistant) return;
    updateAssistant(selectedAssistant.id, { provider: e.target.value });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedAssistant) return;
    updateAssistant(selectedAssistant.id, { model: e.target.value });
  };

  if (!selectedAssistant) return null;

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Message</label>
        <Textarea 
          className="w-full h-20"
          value={selectedAssistant.firstMessage}
          onChange={handleFirstMessageChange}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Provider</label>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={selectedAssistant.provider}
            onChange={handleProviderChange}
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={selectedAssistant.model}
            onChange={handleModelChange}
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssistantConfig;
