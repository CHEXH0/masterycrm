
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  employees: string;
  website: string;
  status: 'active' | 'lead' | 'churned';
  logo?: string;
}

const sampleCompanies: Company[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    industry: 'Manufacturing',
    location: 'New York, USA',
    employees: '1,000+',
    website: 'acmecorp.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Globex Industries',
    industry: 'Technology',
    location: 'San Francisco, USA',
    employees: '500-1,000',
    website: 'globex.com',
    status: 'active',
  },
  {
    id: 3,
    name: 'Wayne Enterprises',
    industry: 'Conglomerate',
    location: 'Gotham, USA',
    employees: '10,000+',
    website: 'wayne.com',
    status: 'lead',
  },
  {
    id: 4,
    name: 'Massive Dynamics',
    industry: 'Biotech',
    location: 'Boston, USA',
    employees: '1,000+',
    website: 'massive.co',
    status: 'lead',
  },
  {
    id: 5,
    name: 'Stark Industries',
    industry: 'Defense',
    location: 'Los Angeles, USA',
    employees: '5,000+',
    website: 'stark.com',
    status: 'active',
  },
  {
    id: 6,
    name: 'Umbrella Corporation',
    industry: 'Pharmaceuticals',
    location: 'Raccoon City, USA',
    employees: '2,000+',
    website: 'umbrella.com',
    status: 'churned',
  },
  {
    id: 7,
    name: 'LexCorp',
    industry: 'Technology',
    location: 'Metropolis, USA',
    employees: '3,000+',
    website: 'lexcorp.com',
    status: 'active',
  },
  {
    id: 8,
    name: 'Oscorp',
    industry: 'Research',
    location: 'New York, USA',
    employees: '1,500+',
    website: 'oscorp.com',
    status: 'lead',
  },
];

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>(sampleCompanies);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter) {
      return matchesSearch && company.status === statusFilter;
    }
    
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'lead': return <Badge className="bg-blue-100 text-blue-800">Lead</Badge>;
      case 'churned': return <Badge className="bg-red-100 text-red-800">Churned</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </div>
      
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search companies..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={statusFilter === null ? "secondary" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === "active" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("active")}
          >
            Active
          </Button>
          <Button 
            variant={statusFilter === "lead" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("lead")}
          >
            Leads
          </Button>
          <Button 
            variant={statusFilter === "churned" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("churned")}
          >
            Churned
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCompanies.map(company => (
          <Card key={company.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={company.logo} />
                  <AvatarFallback className="bg-muted">{getInitials(company.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{company.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Employees:</span>
                  <span>{company.employees}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Website:</span>
                  <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {company.website}
                  </a>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                {getStatusBadge(company.status)}
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/companies/${company.id}`}>View Details</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No companies found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Companies;
