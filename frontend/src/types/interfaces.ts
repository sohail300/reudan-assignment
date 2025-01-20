export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
}

export interface TaskFormData {
  title: string;
  description: string;
  status: "pending" | "completed";
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface TaskFormProps {
  task?: Task;
  onSubmit: (task: TaskFormData) => void;
  onClose: () => void;
}

export interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}
