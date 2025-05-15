
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface OrganizationFormValues {
  name: string;
  description?: string;
}

const OrganizationDialog = ({ onOrgCreated }: { onOrgCreated?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const form = useForm<OrganizationFormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (data: OrganizationFormValues) => {
    // Store the new organization in localStorage to persist it
    const orgs = JSON.parse(localStorage.getItem('organizations') || '[]');
    const newOrg = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    orgs.push(newOrg);
    localStorage.setItem('organizations', JSON.stringify(orgs));
    
    // Set as current organization
    localStorage.setItem('currentOrganization', JSON.stringify(newOrg));
    
    toast("Organization created", {
      description: 'Your new organization has been created successfully.'
    });
    
    // Reset form and close dialog
    form.reset();
    setIsOpen(false);
    
    // Notify parent component
    if (onOrgCreated) {
      onOrgCreated();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Create Organization</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription>
            Add a new organization to manage your campaigns and resources.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter organization name" required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Brief description of the organization" />
                  </FormControl>
                  <FormDescription>
                    Optional: Add a short description for your organization
                  </FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Organization</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationDialog;
