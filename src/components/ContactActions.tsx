
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Edit, Trash2, MoreVertical, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContactActionsProps {
  contactId: string;
  contactName: string;
  contactPhone?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCall?: (phone: string) => void;
}

const ContactActions = ({ 
  contactId, 
  contactName, 
  contactPhone,
  onEdit,
  onDelete,
  onCall
}: ContactActionsProps) => {

  const handleEdit = () => {
    if (onEdit) {
      onEdit(contactId);
    } else {
      toast("Edit Contact", {
        description: `Editing contact: ${contactName}`,
        variant: "success"
      });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(contactId);
    } else {
      toast("Contact Deleted", {
        description: `${contactName} has been deleted.`,
        variant: "success"
      });
    }
  };

  const handleCall = () => {
    // If no phone number prefix is present, add +91 (India) prefix
    const formattedPhone = contactPhone && !contactPhone.startsWith('+') ? 
                           `+91 ${contactPhone}` : contactPhone;
    
    if (formattedPhone && onCall) {
      onCall(formattedPhone);
    } else if (formattedPhone) {
      toast("Calling Contact", {
        description: `Initiating call to ${contactName} at ${formattedPhone}`,
        variant: "success"
      });
    } else {
      toast("Cannot Call", {
        description: `No phone number available for ${contactName}`,
        variant: "destructive"
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 md:w-56 bg-popover">
        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        {contactPhone && (
          <DropdownMenuItem onClick={handleCall} className="cursor-pointer">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContactActions;
