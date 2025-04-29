
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  due_date: string;
  status: string;
}

const TasksList = () => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('due_date', { ascending: true })
          .limit(5);

        if (error) {
          throw error;
        }

        // Transform the data to match our component's expected structure
        const transformedTasks = data.map(task => ({
          id: task.id,
          title: task.title,
          completed: task.status === 'completed',
          priority: task.priority as "high" | "medium" | "low",
          due_date: formatDueDate(task.due_date),
          status: task.status
        }));

        setUserTasks(transformedTasks);
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

    fetchTasks();
  }, [toast]);

  const formatDueDate = (dateString: string) => {
    try {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      
      const taskDate = new Date(dateString);
      
      if (taskDate.toDateString() === today.toDateString()) {
        return "Today";
      } else if (taskDate.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
      } else {
        return new Date(dateString).toLocaleDateString('en-US', { 
          month: 'short',
          day: 'numeric'
        });
      }
    } catch (e) {
      return dateString;
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    const taskIndex = userTasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;

    const task = userTasks[taskIndex];
    const newStatus = task.completed ? 'pending' : 'completed';

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) {
        throw error;
      }

      setUserTasks(userTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive"
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Agent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : userTasks.length > 0 ? (
          <div className="space-y-4">
            {userTasks.map(task => (
              <div key={task.id} className="flex items-start gap-4">
                <Checkbox 
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)} 
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </p>
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Due {task.due_date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No tasks to display</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TasksList;
