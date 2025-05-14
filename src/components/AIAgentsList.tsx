
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Trash, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
}

interface AIAgentsListProps {
  agents: AIAgent[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const AIAgentsList = ({ agents, onDelete, onEdit }: AIAgentsListProps) => {
  const { toast } = useToast();
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setAgentToDelete(id);
  };

  const confirmDelete = () => {
    if (agentToDelete) {
      onDelete(agentToDelete);
      toast({
        title: "Agent deleted",
        description: "The AI agent has been successfully deleted.",
      });
      setAgentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setAgentToDelete(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  {agent.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {agent.type}
                </span>
              </CardTitle>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Created {agent.createdAt.toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => onEdit(agent.id)} className="flex gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(agent.id)} className="flex gap-2">
                <Trash className="h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={agentToDelete !== null} onOpenChange={() => setAgentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the AI agent and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AIAgentsList;
