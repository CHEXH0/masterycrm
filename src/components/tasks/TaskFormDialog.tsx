
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Task } from '@/types/task';

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Please enter a valid date",
  }),
  priority: z.enum(['high', 'medium', 'low']),
  status: z.enum(['pending', 'completed', 'overdue']),
  assignee: z.string().optional(),
  related: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormValues) => Promise<boolean>;
  task?: Task | null;
}

const TaskFormDialog: React.FC<TaskFormDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  task 
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      due_date: task ? formatDateForInput(task.due_date) : formatDateForInput(new Date().toISOString()),
      priority: task?.priority as 'high' | 'medium' | 'low' || 'medium',
      status: task?.status as 'pending' | 'completed' | 'overdue' || 'pending',
      assignee: task?.assignee || '',
      related: task?.related || '',
    },
  });

  function formatDateForInput(dateStr: string) {
    try {
      const date = new Date(dateStr);
      return format(date, 'yyyy-MM-dd');
    } catch (e) {
      return format(new Date(), 'yyyy-MM-dd');
    }
  }

  React.useEffect(() => {
    if (open && task) {
      form.reset({
        title: task.title,
        due_date: formatDateForInput(task.due_date),
        priority: task.priority as 'high' | 'medium' | 'low',
        status: task.status as 'pending' | 'completed' | 'overdue',
        assignee: task.assignee || '',
        related: task.related || '',
      });
    } else if (open) {
      form.reset({
        title: '',
        due_date: formatDateForInput(new Date().toISOString()),
        priority: 'medium',
        status: 'pending',
        assignee: '',
        related: '',
      });
    }
  }, [open, task, form]);

  const handleSubmit = async (data: TaskFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(data);
      if (success) {
        onOpenChange(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogDescription>
            {task 
              ? 'Update the task details below.' 
              : 'Enter the details for the new task.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Input placeholder="Assignee name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="related"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related To</FormLabel>
                  <FormControl>
                    <Input placeholder="Company, contact or project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : task ? 'Update Task' : 'Create Task'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
