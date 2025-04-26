
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Upload, Plus, Trash2, Edit, Check, X } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

// Types for our data structures
type ContactGroup = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};

type ContactBatch = {
  id: string;
  groupId: string;
  name: string;
  contactCount: number;
  isActive: boolean;
  uploadedAt: Date;
};

const PhoneNumbers = () => {
  // State for contact groups and batches
  const [contactGroups, setContactGroups] = useState<ContactGroup[]>([
    {
      id: '1',
      name: 'Default Group',
      description: 'Default contact group',
      createdAt: new Date(),
    }
  ]);
  
  const [contactBatches, setContactBatches] = useState<ContactBatch[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<ContactGroup | null>(contactGroups[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Forms for creating/editing
  const groupForm = useForm({
    defaultValues: {
      name: '',
      description: '',
    }
  });
  
  const batchForm = useForm({
    defaultValues: {
      name: '',
      isActive: true,
    }
  });
  
  // State for editing
  const [editingGroup, setEditingGroup] = useState<ContactGroup | null>(null);
  const [editingBatch, setEditingBatch] = useState<ContactBatch | null>(null);
  
  // CRUD operations for Groups
  const handleCreateGroup = (data: { name: string; description: string }) => {
    const newGroup = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      createdAt: new Date(),
    };
    
    setContactGroups([...contactGroups, newGroup]);
    groupForm.reset();
  };
  
  const handleUpdateGroup = (data: { name: string; description: string }) => {
    if (!editingGroup) return;
    
    const updatedGroups = contactGroups.map(group => 
      group.id === editingGroup.id 
        ? { ...group, name: data.name, description: data.description } 
        : group
    );
    
    setContactGroups(updatedGroups);
    setEditingGroup(null);
    groupForm.reset();
  };
  
  const handleDeleteGroup = (groupId: string) => {
    const updatedGroups = contactGroups.filter(group => group.id !== groupId);
    setContactGroups(updatedGroups);
    
    // Also delete all associated batches
    const updatedBatches = contactBatches.filter(batch => batch.groupId !== groupId);
    setContactBatches(updatedBatches);
    
    // Reset selected group if it was deleted
    if (selectedGroup && selectedGroup.id === groupId) {
      setSelectedGroup(updatedGroups[0] || null);
    }
  };
  
  // CRUD operations for Batches
  const handleCreateBatch = (data: { name: string; isActive: boolean }) => {
    if (!selectedGroup) return;
    
    // In a real app, here we would handle file upload
    // For now, we'll simulate adding a batch with random contact count
    const newBatch = {
      id: Date.now().toString(),
      groupId: selectedGroup.id,
      name: data.name,
      contactCount: Math.floor(Math.random() * 100) + 1,
      isActive: data.isActive,
      uploadedAt: new Date(),
    };
    
    setContactBatches([...contactBatches, newBatch]);
    batchForm.reset();
  };
  
  const handleUpdateBatch = (data: { name: string; isActive: boolean }) => {
    if (!editingBatch) return;
    
    const updatedBatches = contactBatches.map(batch => 
      batch.id === editingBatch.id 
        ? { ...batch, name: data.name, isActive: data.isActive } 
        : batch
    );
    
    setContactBatches(updatedBatches);
    setEditingBatch(null);
    batchForm.reset();
  };
  
  const handleDeleteBatch = (batchId: string) => {
    const updatedBatches = contactBatches.filter(batch => batch.id !== batchId);
    setContactBatches(updatedBatches);
  };
  
  const handleToggleBatchStatus = (batchId: string) => {
    const updatedBatches = contactBatches.map(batch => 
      batch.id === batchId 
        ? { ...batch, isActive: !batch.isActive } 
        : batch
    );
    
    setContactBatches(updatedBatches);
  };
  
  // UI helpers
  const startEditingGroup = (group: ContactGroup) => {
    setEditingGroup(group);
    groupForm.reset({
      name: group.name,
      description: group.description,
    });
  };
  
  const startEditingBatch = (batch: ContactBatch) => {
    setEditingBatch(batch);
    batchForm.reset({
      name: batch.name,
      isActive: batch.isActive,
    });
  };
  
  // Filter batches by selected group and search query
  const filteredBatches = contactBatches
    .filter(batch => batch.groupId === (selectedGroup?.id || ''))
    .filter(batch => 
      batch.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Phone Numbers</h1>
            <p className="text-muted-foreground">Manage your contact groups and batches</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingGroup ? 'Edit Group' : 'Create New Group'}</DialogTitle>
              </DialogHeader>
              <Form {...groupForm}>
                <form onSubmit={groupForm.handleSubmit(editingGroup ? handleUpdateGroup : handleCreateGroup)} className="space-y-4">
                  <FormField
                    control={groupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter group name..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={groupForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter group description..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">{editingGroup ? 'Update' : 'Create'}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Group Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {contactGroups.map((group) => (
            <div 
              key={group.id} 
              className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-accent/10 ${
                selectedGroup?.id === group.id ? 'bg-primary/10 border-primary/30' : ''
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <h3 className="font-medium">{group.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingGroup(group);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGroup(group.id);
                    }}
                    disabled={contactGroups.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{group.description}</p>
              <div className="text-xs text-muted-foreground mt-2">
                {contactBatches.filter(b => b.groupId === group.id).length} batches
              </div>
            </div>
          ))}
        </div>

        {/* Selected Group Details */}
        {selectedGroup && (
          <div className="border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg">{selectedGroup.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedGroup.description}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => {
                      setEditingBatch(null);
                      batchForm.reset({ name: '', isActive: true });
                    }}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Contact Batch
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingBatch ? 'Edit Contact Batch' : 'Upload New Contact Batch'}</DialogTitle>
                  </DialogHeader>
                  <Form {...batchForm}>
                    <form onSubmit={batchForm.handleSubmit(editingBatch ? handleUpdateBatch : handleCreateBatch)} className="space-y-4">
                      <FormField
                        control={batchForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Batch Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter batch name..." {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {!editingBatch && (
                        <FormItem>
                          <FormLabel>Contact File</FormLabel>
                          <FormControl>
                            <Input type="file" />
                          </FormControl>
                        </FormItem>
                      )}
                      <FormField
                        control={batchForm.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Active Status</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Set whether this batch will be used in campaigns
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">{editingBatch ? 'Update' : 'Upload'}</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Contact Batch List */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search batches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              {filteredBatches.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contacts</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">{batch.name}</TableCell>
                        <TableCell>{batch.contactCount}</TableCell>
                        <TableCell>{batch.uploadedAt.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span 
                              className={`mr-2 h-2.5 w-2.5 rounded-full ${
                                batch.isActive ? 'bg-green-500' : 'bg-gray-400'
                              }`}
                            ></span>
                            {batch.isActive ? 'Active' : 'Inactive'}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleToggleBatchStatus(batch.id)}
                            >
                              {batch.isActive ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => startEditingBatch(batch)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteBatch(batch.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? (
                    <p>No contact batches match your search.</p>
                  ) : (
                    <p>No contact batches added to this group yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumbers;
