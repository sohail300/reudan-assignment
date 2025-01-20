import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { TaskListProps } from "../types/interfaces";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <select
          className="border rounded p-2"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "pending" | "completed")
          }
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Search tasks..."
          className="border rounded p-2 flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
