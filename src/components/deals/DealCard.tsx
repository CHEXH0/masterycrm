
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Deal {
  id: number;
  title: string;
  company: string;
  value: number;
  probability: number;
  stage: "lead" | "discovery" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
  closeDate: string;
}

interface DealCardProps {
  deal: Deal;
}

const DealCard = ({ deal }: DealCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="deal-card">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium text-sm truncate">{deal.title}</h3>
        <Badge variant="outline">{deal.probability}%</Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{deal.company}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">{formatCurrency(deal.value)}</span>
        <span className="text-xs text-muted-foreground">{deal.closeDate}</span>
      </div>
    </div>
  );
};

export default DealCard;
