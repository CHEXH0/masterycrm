
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Pencil,
  Trash2
} from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from 'lucide-react';
import { format } from 'date-fns';

interface TasksTableProps {
  tasks: Task[];
  isLoading: boolean;
  onStatusToggle: (taskId: string, completed: boolean) => Promise<boolean>;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => Promise<boolean>;
}

const TasksTable: React.FC<TasksTableProps> = ({ 
  tasks, 
  isLoading, 
  onStatusToggle,
  onEditTask,
  onDeleteTask
}) => {
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high': return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{priority}</Badge>;
      case 'medium': return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{priority}</Badge>;
      case 'low': return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{priority}</Badge>;
      default: return <Badge>{priority}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'overdue': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-orange-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d');
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="w-[125px]">Due Date</TableHead>
            <TableHead className="w-28">Priority</TableHead>
            <TableHead className="w-28">Status</TableHead>
            <TableHead>Related To</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox 
                    checked={task.status === 'completed'}
                    onCheckedChange={(checked) => 
                      onStatusToggle(task.id, checked === true)
                    }
                  />
                </TableCell>
                <TableCell className={task.status === 'completed' ? "line-through text-muted-foreground" : ""}>
                  {task.title}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formatDate(task.due_date)}
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getStatusIcon(task.status)}
                    <span className="ml-2 capitalize">{task.status}</span>
                  </div>
                </TableCell>
                <TableCell>{task.related || '-'}</TableCell>
                <TableCell>{task.assignee || '-'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditTask(task)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive" 
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                <div className="text-center py-4">
                  <h3 className="text-lg font-medium">No tasks found</h3>
                  <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksTable;
