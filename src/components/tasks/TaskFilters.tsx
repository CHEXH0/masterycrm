
import React from 'react';
import { Button } from '@/components/ui/button';

interface TaskFiltersProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant={activeFilter === null ? "secondary" : "outline"}
        size="sm"
        onClick={() => onFilterChange(null)}
      >
        All
      </Button>
      <Button 
        variant={activeFilter === "pending" ? "secondary" : "outline"}
        size="sm"
        onClick={() => onFilterChange("pending")}
      >
        Pending
      </Button>
      <Button 
        variant={activeFilter === "completed" ? "secondary" : "outline"}
        size="sm"
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </Button>
      <Button 
        variant={activeFilter === "overdue" ? "secondary" : "outline"}
        size="sm"
        onClick={() => onFilterChange("overdue")}
      >
        Overdue
      </Button>
      <Button 
        variant={activeFilter === "high" ? "secondary" : "outline"}
        size="sm"
        onClick={() => onFilterChange("high")}
      >
        High Priority
      </Button>
    </div>
  );
};

export default TaskFilters;
