import React from "react";
import { TaskItemProps } from "../types/interfaces";

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const handleCapitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="bg-white rounded-lg p-4 h-52 transition-all duration-300 hover:shadow-xl border border-gray-100 group relative">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-xl text-gray-800 tracking-tight transition-colors duration-300 line-clamp-2">
            {task.title}
          </h3>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-md transition-all duration-300 ${
              task.status === "completed"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {handleCapitalize(task.status)}
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm group-hover:text-gray-700 transition-colors duration-300">
          {task.description}
        </p>

        <div className="flex justify-end items-center space-x-3 pt-2 absolute bottom-4 right-4">
          <button
            onClick={() => onEdit(task)}
            className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-all duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-all duration-300 group-hover:bg-opacity-80"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
