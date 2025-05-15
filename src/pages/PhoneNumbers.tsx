import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Upload, Plus, Trash2, Edit, Check, X, Search } from "lucide-react";
import SidebarNav from '@/components/SidebarNav';
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
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
  DialogDescription,
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
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
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ContactActions from "@/components/ContactActions";

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
  contacts: Contact[];
};

type Contact = {
  id: string;
  batchId: string;
  name: string;
  phoneNumber: string;
  email?: string;
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
  const [selectedBatch, setSelectedBatch] = useState<ContactBatch | null>(null);
  const [contactSearchQuery, setContactSearchQuery] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;
  
  // Dialog open states
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);
  
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
  
  // Add new state for contact editing
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  // Contact form
  const contactForm = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
    }
  });
  
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
    setGroupDialogOpen(false); // Close dialog after submission
    toast.success("Group created successfully");
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
    setGroupDialogOpen(false); // Close dialog after submission
    toast.success("Group updated successfully");
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

    toast.success("Group deleted successfully");
  };
  
  // CRUD operations for Batches
  const handleCreateBatch = (data: { name: string; isActive: boolean }) => {
    if (!selectedGroup) return;
    
    // In a real app, here we would handle file upload
    // For now, we'll simulate adding a batch with random contact count
    const contactCount = Math.floor(Math.random() * 100) + 1;
    
    // Generate mock contacts
    const mockContacts = Array.from({ length: contactCount }, (_, i) => ({
      id: `contact-${Date.now()}-${i}`,
      batchId: Date.now().toString(),
      name: `Contact ${i + 1}`,
      phoneNumber: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      email: Math.random() > 0.5 ? `contact${i + 1}@example.com` : undefined
    }));
    
    const newBatch = {
      id: Date.now().toString(),
      groupId: selectedGroup.id,
      name: data.name,
      contactCount,
      isActive: data.isActive,
      uploadedAt: new Date(),
      contacts: mockContacts
    };
    
    setContactBatches([...contactBatches, newBatch]);
    batchForm.reset();
    setBatchDialogOpen(false); // Close dialog after submission
    toast.success("Contact batch uploaded successfully");
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
    setBatchDialogOpen(false); // Close dialog after submission
    toast.success("Batch updated successfully");
  };
  
  const handleDeleteBatch = (batchId: string) => {
    const updatedBatches = contactBatches.filter(batch => batch.id !== batchId);
    setContactBatches(updatedBatches);
    
    // If the selected batch is deleted, reset it
    if (selectedBatch && selectedBatch.id === batchId) {
      setSelectedBatch(null);
    }
    
    toast.success("Batch deleted successfully");
  };
  
  const handleToggleBatchStatus = (batchId: string) => {
    const updatedBatches = contactBatches.map(batch => 
      batch.id === batchId 
        ? { ...batch, isActive: !batch.isActive } 
        : batch
    );
    
    setContactBatches(updatedBatches);
    
    const batch = updatedBatches.find(b => b.id === batchId);
    if (batch) {
      toast.success(`Batch ${batch.isActive ? 'activated' : 'deactivated'} successfully`);
    }
  };
  
  const handleDeleteContact = (batchId: string, contactId: string) => {
    const updatedBatches = contactBatches.map(batch => {
      if (batch.id === batchId) {
        const updatedContacts = batch.contacts.filter(contact => contact.id !== contactId);
        return { 
          ...batch, 
          contacts: updatedContacts,
          contactCount: updatedContacts.length
        };
      }
      return batch;
    });
    
    setContactBatches(updatedBatches);
    
    // Update selected batch if it's the current one
    if (selectedBatch && selectedBatch.id === batchId) {
      const updatedBatch = updatedBatches.find(b => b.id === batchId);
      if (updatedBatch) {
        setSelectedBatch(updatedBatch);
      }
    }
    
    toast.success("Contact deleted successfully");
  };
  
  // Handle editing contact
  const handleEditContact = (batchId: string, contactId: string) => {
    if (selectedBatch && selectedBatch.id === batchId) {
      const contact = selectedBatch.contacts.find(c => c.id === contactId);
      if (contact) {
        setEditingContact(contact);
        contactForm.reset({
          name: contact.name,
          phoneNumber: contact.phoneNumber,
          email: contact.email || '',
        });
        setContactDialogOpen(true);
      }
    }
  };
  
  // Handle update contact
  const handleUpdateContact = (data: { name: string; phoneNumber: string; email: string }) => {
    if (!editingContact || !selectedBatch) return;
    
    const updatedBatches = contactBatches.map(batch => {
      if (batch.id === selectedBatch.id) {
        const updatedContacts = batch.contacts.map(contact => 
          contact.id === editingContact.id 
            ? { 
                ...contact, 
                name: data.name, 
                phoneNumber: data.phoneNumber, 
                email: data.email || undefined 
              } 
            : contact
        );
        return { ...batch, contacts: updatedContacts };
      }
      return batch;
    });
    
    setContactBatches(updatedBatches);
    
    // Update selected batch
    const updatedBatch = updatedBatches.find(b => b.id === selectedBatch.id);
    if (updatedBatch) {
      setSelectedBatch(updatedBatch);
    }
    
    setEditingContact(null);
    contactForm.reset();
    setContactDialogOpen(false);
    toast.success("Contact updated successfully");
  };
  
  // UI helpers
  const startEditingGroup = (group: ContactGroup) => {
    setEditingGroup(group);
    groupForm.reset({
      name: group.name,
      description: group.description,
    });
    setGroupDialogOpen(true);
  };
  
  const startEditingBatch = (batch: ContactBatch) => {
    setEditingBatch(batch);
    batchForm.reset({
      name: batch.name,
      isActive: batch.isActive,
    });
    setBatchDialogOpen(true);
  };
  
  // Open batch details to view contacts
  const openBatchDetails = (batch: ContactBatch) => {
    setSelectedBatch(batch);
    setCurrentPage(1); // Reset to first page when opening new batch
    setContactSearchQuery(''); // Reset search query
  };
  
  // Filter batches by selected group and search query
  const filteredBatches = contactBatches
    .filter(batch => batch.groupId === (selectedGroup?.id || ''))
    .filter(batch => 
      batch.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Filter and paginate contacts from the selected batch
  const filteredContacts = selectedBatch
    ? selectedBatch.contacts.filter(contact =>
        contact.name.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
        contact.phoneNumber.includes(contactSearchQuery) ||
        (contact.email && contact.email.toLowerCase().includes(contactSearchQuery.toLowerCase()))
      )
    : [];
    
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * contactsPerPage,
    currentPage * contactsPerPage
  );
  
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  
  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={i}>
        <PaginationLink 
          isActive={currentPage === i} 
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }
  
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
        {!selectedBatch ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Phone Numbers</h1>
                <p className="text-muted-foreground">Manage your contact groups and batches</p>
              </div>
              
              <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingGroup ? 'Edit Group' : 'Create New Group'}</DialogTitle>
                    <DialogDescription>
                      {editingGroup 
                        ? 'Edit the details of your contact group.' 
                        : 'Create a new group to organize your contacts.'}
                    </DialogDescription>
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
                  <Dialog open={batchDialogOpen} onOpenChange={setBatchDialogOpen}>
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
                        <DialogDescription>
                          {editingBatch 
                            ? 'Edit the details of your contact batch.' 
                            : 'Upload a new batch of contacts to this group.'}
                        </DialogDescription>
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
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search batches..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
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
                          <TableRow 
                            key={batch.id} 
                            className="cursor-pointer hover:bg-accent/10"
                            onClick={() => openBatchDetails(batch)}
                          >
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleBatchStatus(batch.id);
                                  }}
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditingBatch(batch);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteBatch(batch.id);
                                  }}
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
          </>
        ) : (
          // Contact List View (showing contacts within a batch)
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => setSelectedBatch(null)}
                className="mb-4"
              >
                ← Back to Batches
              </Button>
              
              <h2 className="text-xl font-bold">
                {selectedBatch.name} - {filteredContacts.length} Contacts
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  selectedBatch.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedBatch.isActive ? 'Active' : 'Inactive'}
                </span>
              </h2>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search contacts..."
                  value={contactSearchQuery}
                  onChange={(e) => {
                    setContactSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="pl-8"
                />
              </div>
            </div>
            
            {/* Contact Edit Dialog */}
            <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Contact</DialogTitle>
                  <DialogDescription>
                    Update the contact information.
                  </DialogDescription>
                </DialogHeader>
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(handleUpdateContact)} className="space-y-4">
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact name..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <PhoneInput 
                              value={field.value} 
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Contact email..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Update Contact</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            {paginatedContacts.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.phoneNumber}</TableCell>
                        <TableCell>{contact.email || '-'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditContact(selectedBatch.id, contact.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-4">
                                <p className="mb-2">Are you sure you want to delete this contact?</p>
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {/* Close popover */}}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleDeleteContact(selectedBatch.id, contact.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {paginationItems}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {contactSearchQuery ? (
                  <p>No contacts match your search.</p>
                ) : (
                  <p>No contacts in this batch.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumbers;
