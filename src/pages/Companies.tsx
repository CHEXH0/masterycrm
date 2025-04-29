
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: string;
  website: string;
  status: 'active' | 'lead' | 'churned';
  logo?: string;
  created_at?: string;
  updated_at?: string;
}

// Define a type for new company entries that matches what Supabase expects
interface NewCompany {
  name: string;
  industry: string;
  location: string;
  employees: string;
  website: string;
  status: 'active' | 'lead' | 'churned';
  logo?: string | null;
}

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isAddCompanyDialogOpen, setIsAddCompanyDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [newCompany, setNewCompany] = useState<NewCompany>({
    name: '',
    industry: '',
    location: '',
    employees: '',
    website: '',
    status: 'active',
    logo: null,
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching companies:', error);
        toast({
          variant: "destructive",
          title: "Failed to load companies",
          description: error.message
        });
      } else {
        setCompanies(data as Company[]);
      }
    } catch (err) {
      console.error('Error in fetchCompanies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCompany = async () => {
    if (!newCompany.name || !newCompany.industry || !newCompany.location || 
        !newCompany.employees || !newCompany.website) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please fill in all required fields."
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase
        .from('companies')
        .insert(newCompany)
        .select();

      if (error) {
        console.error('Error adding company:', error);
        toast({
          variant: "destructive",
          title: "Failed to add company",
          description: error.message
        });
      } else {
        setCompanies(prevCompanies => [...(data as Company[]), ...prevCompanies]);
        setIsAddCompanyDialogOpen(false);
        setNewCompany({
          name: '',
          industry: '',
          location: '',
          employees: '',
          website: '',
          status: 'active',
          logo: null,
        });
        toast({
          title: "Company added",
          description: "The company has been added successfully."
        });
      }
    } catch (err) {
      console.error('Error in handleAddCompany:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: 'active' | 'lead' | 'churned') => {
    setNewCompany(prev => ({ ...prev, status: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Button onClick={() => setIsAddCompanyDialogOpen(true)}>
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
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
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
          
          {filteredCompanies.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No companies found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </>
      )}

      <Dialog open={isAddCompanyDialogOpen} onOpenChange={setIsAddCompanyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogDescription>
              Enter the details of the new company.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name*</Label>
              <Input
                id="name"
                name="name"
                value={newCompany.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry*</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={newCompany.industry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input
                  id="location"
                  name="location"
                  value={newCompany.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employees">Employees*</Label>
                <Input
                  id="employees"
                  name="employees"
                  value={newCompany.employees}
                  onChange={handleInputChange}
                  placeholder="e.g., 1,000+"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website*</Label>
                <Input
                  id="website"
                  name="website"
                  value={newCompany.website}
                  onChange={handleInputChange}
                  placeholder="e.g., company.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status*</Label>
              <Select
                value={newCompany.status}
                onValueChange={(value) => handleSelectChange(value as 'active' | 'lead' | 'churned')}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="churned">Churned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                value={newCompany.logo || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCompanyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCompany} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : "Add Company"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Companies;
