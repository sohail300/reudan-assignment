import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Modal from "../components/Modal";
import { Task, TaskFormData } from "../types/interfaces";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTasks = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/tasks`);
      console.log(response.data.data);

      if (response.data.success === true) {
        console.log(response.data.data);
        setTasks(response.data.data.tasks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      console.log(taskData);
      const response = await axios.post(`${BACKEND_URL}/tasks`, taskData);

      if (response.data.success === true) {
        getTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!editingTask) return;

    console.log(editingTask.id);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/tasks/${editingTask.id}`,
        taskData
      );

      if (response.data.success === true) {
        getTasks();
        setEditingTask(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      console.log(id);
      const response = await axios.delete(`${BACKEND_URL}/tasks/${id}`);

      if (response.data.success === true) {
        getTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (task?: Task) => {
    setEditingTask(task || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-500">
              Manage and organize your tasks efficiently
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transform transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Task
          </button>
        </div>

        <TaskList
          tasks={tasks}
          onEditTask={openModal}
          onDeleteTask={handleDeleteTask}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingTask ? "Edit Task" : "Create New Task"}
          </h2>
          <TaskForm
            task={editingTask || undefined}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onClose={closeModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
