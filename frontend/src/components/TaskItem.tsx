import React from "react";
import { TaskItemProps } from "../types/interfaces";

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  function handleCapitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{task.title}</h3>
        <span
          className={`text-sm font-semibold px-2 py-1 rounded ${
            task.status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {handleCapitalize(task.status)}
        </span>
      </div>
      <p className="text-gray-600 line-clamp-3">{task.description}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-3 py-1 text-sm transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
