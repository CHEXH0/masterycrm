
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Loader2 } from 'lucide-react';
import ContactCard, { Contact } from '@/components/contacts/ContactCard';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define a type for new contact entries that matches what Supabase expects
interface NewContact {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  position?: string | null;
  type?: string;
  status?: string;
}

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState<NewContact>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    type: 'prospect',
    status: 'active'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
        toast({
          variant: "destructive",
          title: "Failed to load contacts",
          description: error.message
        });
      } else {
        // Explicitly type the data as Contact[]
        setContacts(data as Contact[]);
      }
    } catch (err) {
      console.error('Error in fetchContacts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async () => {
    if (!newContact.first_name || !newContact.last_name) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "First name and last name are required."
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Ensure we're inserting a properly typed object
      const { data, error } = await supabase
        .from('contacts')
        .insert(newContact)
        .select();

      if (error) {
        console.error('Error adding contact:', error);
        toast({
          variant: "destructive",
          title: "Failed to add contact",
          description: error.message
        });
      } else {
        // Explicitly type the data as Contact[]
        setContacts(prevContacts => [...(data as Contact[]), ...prevContacts]);
        setIsAddContactDialogOpen(false);
        setNewContact({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          type: 'prospect',
          status: 'active'
        });
        toast({
          title: "Contact added",
          description: "The contact has been added successfully."
        });
      }
    } catch (err) {
      console.error('Error in handleAddContact:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredContacts = contacts.filter(contact => 
    `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (contact.company && contact.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Insurance Contacts</h1>
        <Button onClick={() => setIsAddContactDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>
      
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search contacts..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
          
          {filteredContacts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No contacts found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search criteria or add new contacts</p>
            </div>
          )}
        </>
      )}

      <Dialog open={isAddContactDialogOpen} onOpenChange={setIsAddContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Enter the details of the new insurance contact.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name*</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={newContact.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name*</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={newContact.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newContact.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={newContact.phone || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={newContact.company || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={newContact.position || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Contact Type</Label>
                <Select
                  value={newContact.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newContact.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddContact} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : "Add Contact"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
