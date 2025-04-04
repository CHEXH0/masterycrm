
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Follow up with Microsoft",
    completed: false,
    priority: "high",
    dueDate: "Today"
  },
  {
    id: 2,
    title: "Prepare presentation for Apple meeting",
    completed: false,
    priority: "high",
    dueDate: "Tomorrow"
  },
  {
    id: 3,
    title: "Send proposal to Acme Corp",
    completed: false,
    priority: "medium",
    dueDate: "25 Apr"
  },
  {
    id: 4,
    title: "Update sales forecast",
    completed: true,
    priority: "medium",
    dueDate: "22 Apr"
  },
  {
    id: 5,
    title: "Schedule demo with IBM",
    completed: false,
    priority: "low",
    dueDate: "27 Apr"
  }
];

const TasksList = () => {
  const [userTasks, setUserTasks] = React.useState<Task[]>(tasks);

  const toggleTaskCompletion = (taskId: number) => {
    setUserTasks(userTasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
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
        <CardTitle>My Tasks</CardTitle>
      </CardHeader>
      <CardContent>
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
                <p className="text-xs text-muted-foreground">Due {task.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
