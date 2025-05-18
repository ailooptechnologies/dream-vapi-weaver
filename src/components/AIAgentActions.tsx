
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

interface AgentActionsProps {
  agentId: string;
  agentName: string;
  agentPhone?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCall?: (phone: string) => void;
}

const AIAgentActions = ({ 
  agentId, 
  agentName, 
  agentPhone,
  onEdit, 
  onDelete,
  onCall 
}: AgentActionsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDelete = () => {
    onDelete(agentId);
    setDeleteDialogOpen(false);
    toast("Agent Deleted", {
      description: `${agentName} has been successfully deleted.`
    });
  };
  
  const handleCall = () => {
    if (!agentPhone) return;
    
    // If no phone number prefix is present, add +91 (India) prefix
    const formattedPhone = agentPhone && !agentPhone.startsWith('+') ? 
                          `+91 ${agentPhone}` : agentPhone;
    
    if (onCall && formattedPhone) {
      onCall(formattedPhone);
    } else {
      toast("Agent Call", {
        description: `Calling agent ${agentName} at ${formattedPhone || 'unknown number'}`
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover">
          <DropdownMenuItem onClick={() => onEdit(agentId)} className="cursor-pointer">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          {agentPhone && (
            <DropdownMenuItem onClick={handleCall} className="cursor-pointer">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive cursor-pointer"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the AI agent "{agentName}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AIAgentActions;
