import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Modal from "../components/AddModal";
import { sampleTasks } from "../utils/tasks";
import { Task, TaskFormData } from "../types/interfaces";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTasks = async () => {
    try {
      console.log("running");
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <button
            onClick={() => openModal()}
            className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 transition duration-300"
          >
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
        <TaskForm
          task={editingTask || undefined}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
