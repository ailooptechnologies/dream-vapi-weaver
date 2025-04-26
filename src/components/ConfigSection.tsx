
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ConfigSectionProps {
  title: string;
  description: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({ 
  title, 
  description, 
  defaultOpen = false,
  children
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-md">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronDown 
          className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>
      
      {isOpen && children && (
        <div className="p-4 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

export default ConfigSection;
