
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Building2 } from "lucide-react";

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  avatar?: string;
}

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-primary h-4"></div>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage src={contact.avatar} />
            <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
          </Avatar>
          <h3 className="font-medium">{contact.name}</h3>
          <p className="text-sm text-muted-foreground">{contact.position}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="truncate">{contact.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{contact.company}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
