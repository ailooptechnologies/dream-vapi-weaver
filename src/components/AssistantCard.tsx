
import React from 'react';
import { Bot } from 'lucide-react';

interface AssistantCardProps {
  name: string;
  description: string;
  avatar?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const AssistantCard: React.FC<AssistantCardProps> = ({ 
  name, 
  description, 
  avatar, 
  isSelected = false,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-md cursor-pointer transition-colors ${
        isSelected ? 'bg-primary/10' : 'hover:bg-muted'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {avatar ? (
            <img src={avatar} alt={name} className="h-8 w-8 rounded-full" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AssistantCard;
