
export interface Task {
  id: string;
  title: string;
  due_date: string;
  priority: string;
  status: string;
  related?: string;
  assignee?: string;
  created_at: string;
  updated_at: string;
}
