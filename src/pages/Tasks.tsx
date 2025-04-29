
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import TasksTable from '@/components/tasks/TasksTable';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskFormDialog from '@/components/tasks/TaskFormDialog';
import { Task } from '@/types/task';

const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) {
        throw error;
      }

      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load tasks. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle task creation
  const handleAddTask = async (taskData: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select();

      if (error) {
        throw error;
      }

      setTasks([...tasks, data[0]]);
      toast({
        title: "Success",
        description: "Task has been added successfully."
      });
      return true;
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Handle task update
  const handleUpdateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(taskData)
        .eq('id', taskId);

      if (error) {
        throw error;
      }

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, ...taskData } : task
      ));
      toast({
        title: "Success",
        description: "Task has been updated successfully."
      });
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        throw error;
      }

      setTasks(tasks.filter(task => task.id !== taskId));
      toast({
        title: "Success",
        description: "Task has been deleted successfully."
      });
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Handle task status toggle
  const handleStatusToggle = async (taskId: string, completed: boolean) => {
    const newStatus = completed ? 'completed' : 'pending';
    return handleUpdateTask(taskId, { status: newStatus });
  };

  // Handle edit task
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsAddDialogOpen(true);
  };

  // Filter tasks based on search query and filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.related?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    if (filter === 'completed') return matchesSearch && task.status === 'completed';
    if (filter === 'pending') return matchesSearch && task.status === 'pending';
    if (filter === 'overdue') return matchesSearch && task.status === 'overdue';
    if (filter === 'high') return matchesSearch && task.priority === 'high';
    
    return matchesSearch;
  });

  // Close dialog and reset form
  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setTaskToEdit(null);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
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
        <TaskFilters activeFilter={filter} onFilterChange={setFilter} />
      </div>

      <TasksTable 
        tasks={filteredTasks} 
        isLoading={isLoading}
        onStatusToggle={handleStatusToggle}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskFormDialog
        open={isAddDialogOpen}
        onOpenChange={handleCloseDialog}
        onSubmit={taskToEdit ? 
          (data) => handleUpdateTask(taskToEdit.id, data) : 
          handleAddTask
        }
        task={taskToEdit}
      />
    </div>
  );
};

export default Tasks;
