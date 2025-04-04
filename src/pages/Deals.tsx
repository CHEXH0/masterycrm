
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Filter, ArrowDownUp } from 'lucide-react';
import KanbanColumn from '@/components/deals/KanbanColumn';
import { Deal } from '@/components/deals/DealCard';

// Sample data
const dealsData: Record<string, Deal[]> = {
  lead: [
    { id: 1, title: "Website Redesign", company: "Acme Corp", value: 12000, probability: 20, stage: "lead", closeDate: "May 15" },
    { id: 2, title: "Cloud Migration", company: "Wayne Enterprises", value: 45000, probability: 20, stage: "lead", closeDate: "Jun 22" },
    { id: 3, title: "Mobile App Development", company: "Stark Industries", value: 35000, probability: 15, stage: "lead", closeDate: "Jul 5" },
  ],
  discovery: [
    { id: 4, title: "Data Analytics Platform", company: "LexCorp", value: 55000, probability: 35, stage: "discovery", closeDate: "May 30" },
    { id: 5, title: "CRM Implementation", company: "Globex", value: 28000, probability: 40, stage: "discovery", closeDate: "Jun 10" },
  ],
  proposal: [
    { id: 6, title: "Security Assessment", company: "Umbrella Corp", value: 15000, probability: 60, stage: "proposal", closeDate: "May 20" },
    { id: 7, title: "Digital Marketing Campaign", company: "Massive Dynamics", value: 32000, probability: 65, stage: "proposal", closeDate: "May 18" },
    { id: 8, title: "ERP System", company: "Cyberdyne Systems", value: 120000, probability: 55, stage: "proposal", closeDate: "Jul 15" },
  ],
  negotiation: [
    { id: 9, title: "Custom Software Development", company: "Oscorp", value: 85000, probability: 80, stage: "negotiation", closeDate: "May 12" },
    { id: 10, title: "IT Infrastructure Upgrade", company: "Soylent Corp", value: 65000, probability: 75, stage: "negotiation", closeDate: "May 25" },
  ],
  "closed-won": [
    { id: 11, title: "Network Security Solution", company: "Initech", value: 42000, probability: 100, stage: "closed-won", closeDate: "Apr 28" },
    { id: 12, title: "SaaS Platform Subscription", company: "Hooli", value: 36000, probability: 100, stage: "closed-won", closeDate: "Apr 15" },
  ],
  "closed-lost": [
    { id: 13, title: "AI Implementation", company: "Xanatos Enterprises", value: 150000, probability: 0, stage: "closed-lost", closeDate: "Apr 10" }
  ],
};

const stageLabels: Record<string, string> = {
  "lead": "Lead",
  "discovery": "Discovery",
  "proposal": "Proposal",
  "negotiation": "Negotiation",
  "closed-won": "Closed Won",
  "closed-lost": "Closed Lost"
};

const calculateTotalValue = (deals: Deal[]) => {
  return deals.reduce((sum, deal) => sum + deal.value, 0);
};

const Deals = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Deals Pipeline</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowDownUp className="h-4 w-4 mr-2" /> Sort
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" /> New Deal
          </Button>
        </div>
      </div>
      
      <div className="flex gap-6 overflow-auto pb-6">
        {Object.keys(dealsData).map((stage) => (
          <KanbanColumn 
            key={stage}
            title={stageLabels[stage]}
            deals={dealsData[stage]}
            count={dealsData[stage].length}
            value={calculateTotalValue(dealsData[stage])}
          />
        ))}
      </div>
    </div>
  );
};

export default Deals;
