
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Search, 
  Plus, 
  ChevronDown, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'pending' | 'overdue';
  related: string;
  assignee: string;
}

const sampleTasks: Task[] = [
  {
    id: 1,
    title: 'Follow up with Microsoft about renewal',
    dueDate: '2025-04-05',
    priority: 'high',
    status: 'pending',
    related: 'Microsoft',
    assignee: 'John Doe',
  },
  {
    id: 2,
    title: 'Prepare Q2 sales presentation',
    dueDate: '2025-04-07',
    priority: 'high',
    status: 'pending',
    related: 'Internal',
    assignee: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Send proposal to Acme Corp',
    dueDate: '2025-04-08',
    priority: 'medium',
    status: 'pending',
    related: 'Acme Corp',
    assignee: 'John Doe',
  },
  {
    id: 4,
    title: 'Schedule demo with Stark Industries',
    dueDate: '2025-04-10',
    priority: 'medium',
    status: 'pending',
    related: 'Stark Industries',
    assignee: 'Emily Brown',
  },
  {
    id: 5,
    title: 'Update contact information for LexCorp',
    dueDate: '2025-03-30',
    priority: 'low',
    status: 'overdue',
    related: 'LexCorp',
    assignee: 'Michael Wilson',
  },
  {
    id: 6,
    title: 'Review contract terms with Globex',
    dueDate: '2025-04-02',
    priority: 'high',
    status: 'completed',
    related: 'Globex',
    assignee: 'Jane Smith',
  },
  {
    id: 7,
    title: 'Research competitors for Umbrella Corp pitch',
    dueDate: '2025-03-28',
    priority: 'medium',
    status: 'completed',
    related: 'Umbrella Corp',
    assignee: 'Emily Brown',
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string | null>(null);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.related.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'completed') return matchesSearch && task.status === 'completed';
    if (filter === 'pending') return matchesSearch && task.status === 'pending';
    if (filter === 'overdue') return matchesSearch && task.status === 'overdue';
    if (filter === 'high') return matchesSearch && task.priority === 'high';
    
    return matchesSearch;
  });

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
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filter === null ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          <Button 
            variant={filter === "pending" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
          <Button 
            variant={filter === "completed" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
          <Button 
            variant={filter === "overdue" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilter("overdue")}
          >
            Overdue
          </Button>
          <Button 
            variant={filter === "high" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setFilter("high")}
          >
            High Priority
          </Button>
        </div>
      </div>

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox 
                    checked={task.status === 'completed'}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                  />
                </TableCell>
                <TableCell className={task.status === 'completed' ? "line-through text-muted-foreground" : ""}>
                  {task.title}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formatDate(task.dueDate)}
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getStatusIcon(task.status)}
                    <span className="ml-2 capitalize">{task.status}</span>
                  </div>
                </TableCell>
                <TableCell>{task.related}</TableCell>
                <TableCell>{task.assignee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No tasks found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
