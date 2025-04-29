
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DealCard, { Deal } from './DealCard';

interface KanbanColumnProps {
  title: string;
  deals: Deal[];
  count: number;
  value: number;
  id: string;
  onDealClick?: (deal: Deal) => void;
}

const KanbanColumn = ({ title, deals, count, value, id, onDealClick }: KanbanColumnProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="kanban-column min-w-[300px]">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{count} deals</span>
          <span>{formatCurrency(value)}</span>
        </div>
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div 
            className="space-y-3 min-h-[200px]" 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {deals.map((deal, index) => (
              <DealCard 
                key={deal.id} 
                deal={deal} 
                index={index} 
                onClick={onDealClick}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
