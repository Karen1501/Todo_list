"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import TaskItem from "../../components/TaskItem";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const newTaskHandler = (event) => {
    const value = event.target.value;
    setNewTask(value);
  };

  const saveTask = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`api/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newTask }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <form className="border border-gray-500 p-4 rounded-lg shadow flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label>Crear tarea nueva</label>
          <input
            onChange={newTaskHandler}
            value={newTask}
            className="p-4 h-8 rounded-lg border border-gray-200 shadow-md"
          />
        </div>
        <button
          onClick={saveTask}
          className="px-4 py-2 rounded-lg bg-indigo-800 hover:cursor-pointer hover:bg-indigo-400 text-white w-1/2 mx-auto"
        >
          Guardar Tarea
        </button>
      </form>
      <div className="border border-gray-400 shadow-md rounded-lg p-4 flex flex-col gap-4">
        <h1 className="text-2xl text-center">Tareas</h1>
        {tasks.length != 0 ? (
          <ol>
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </ol>
        ) : (
          <h2>No tienes tareas pendientes</h2>
        )}
      </div>
    </div>
  );
}
