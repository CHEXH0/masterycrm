
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import ContactCard, { Contact } from '@/components/contacts/ContactCard';

// Sample data for contacts
const sampleContacts: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@acmecorp.com",
    phone: "(555) 123-4567",
    company: "Acme Corporation",
    position: "CEO",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@globex.com",
    phone: "(555) 234-5678",
    company: "Globex Industries",
    position: "Sales Manager",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@massive.co",
    phone: "(555) 345-6789",
    company: "Massive Dynamics",
    position: "CTO",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.b@wayne.com",
    phone: "(555) 456-7890",
    company: "Wayne Enterprises",
    position: "Marketing Director",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.w@stark.com",
    phone: "(555) 567-8901",
    company: "Stark Industries",
    position: "Product Manager",
  },
  {
    id: 6,
    name: "Lisa Davis",
    email: "lisa.d@oscorp.com",
    phone: "(555) 678-9012",
    company: "Oscorp",
    position: "HR Director",
  },
  {
    id: 7,
    name: "David Martinez",
    email: "david.m@umbrella.com",
    phone: "(555) 789-0123",
    company: "Umbrella Corp",
    position: "Research Lead",
  },
  {
    id: 8,
    name: "Sarah Johnson",
    email: "sarah.j@lexcorp.com",
    phone: "(555) 890-1234",
    company: "LexCorp",
    position: "VP of Sales",
  },
];

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Button>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No contacts found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Contacts;
