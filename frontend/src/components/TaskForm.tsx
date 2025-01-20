import React, { useState, useEffect } from "react";
import { TaskFormData } from "../types/interfaces";
import { TaskFormProps } from "../types/interfaces";

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "pending",
  });
  const [errors, setErrors] = useState<Partial<TaskFormData>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskFormData> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ title: "", description: "", status: "pending" });
      onClose();
    }
  };

  const inputClasses =
    "mt-1 block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const errorClasses = "text-rose-500 text-sm mt-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className={labelClasses}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Enter task title"
        />
        {errors.title && <p className={errorClasses}>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
          rows={5}
          placeholder="Enter task description"
        />
        {errors.description && (
          <p className={errorClasses}>{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className={labelClasses}>
          Status
        </label>
        <div className="relative">
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-all duration-300"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-all duration-300"
        >
          {task ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
