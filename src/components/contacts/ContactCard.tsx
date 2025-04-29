
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Building2, User, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  notes: string | null;
  avatar_url: string | null;
  type: 'prospect' | 'client' | 'lead' | 'referral';
  status: 'active' | 'inactive' | 'archived';
}

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client':
        return 'bg-green-500';
      case 'prospect':
        return 'bg-blue-500';
      case 'lead':
        return 'bg-yellow-500';
      case 'referral':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card className="overflow-hidden">
      <div className={`${getTypeColor(contact.type)} h-2`}></div>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage src={contact.avatar_url || undefined} />
            <AvatarFallback>{getInitials(contact.first_name, contact.last_name)}</AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-center">{contact.first_name} {contact.last_name}</h3>
          <p className="text-sm text-muted-foreground">{contact.position || 'No position'}</p>
          <div className="mt-2">
            <Badge variant={contact.status === 'active' ? 'default' : 
                  contact.status === 'inactive' ? 'secondary' : 'outline'}>
              {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          {contact.email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="truncate">{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact.company && (
            <div className="flex items-center text-sm">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{contact.company}</span>
            </div>
          )}
          <div className="flex items-center text-sm">
            <UserCircle className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{getTypeLabel(contact.type)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
