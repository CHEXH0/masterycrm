
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  stage: "lead" | "discovery" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
  close_date: string;
}

interface DealCardProps {
  deal: Deal;
  index: number;
  onClick?: (deal: Deal) => void;
}

const DealCard = ({ deal, index, onClick }: DealCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  // Format date for display (from ISO date to readable format)
  const displayDate = () => {
    try {
      // Parse the date string (could be ISO format or date object)
      const date = typeof deal.close_date === 'object' 
        ? deal.close_date 
        : new Date(deal.close_date);
      return format(date, 'MMM d');
    } catch (e) {
      return deal.close_date; // Fallback to original string
    }
  };

  return (
    <Draggable draggableId={deal.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick && onClick(deal)}
        >
          <Card className="policy-card hover:shadow-md transition-shadow">
            <CardContent className="p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium text-sm truncate">{deal.title}</h3>
                <Badge variant="outline">{deal.probability}%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{deal.company}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">{formatCurrency(deal.value)}</span>
                <span className="text-xs text-muted-foreground">{displayDate()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default DealCard;
