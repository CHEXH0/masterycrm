
import React from 'react';
import DealCard, { Deal } from './DealCard';

interface KanbanColumnProps {
  title: string;
  deals: Deal[];
  count: number;
  value: number;
}

const KanbanColumn = ({ title, deals, count, value }: KanbanColumnProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="kanban-column">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{count} policies</span>
          <span>{formatCurrency(value)}</span>
        </div>
      </div>
      <div className="space-y-3">
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
