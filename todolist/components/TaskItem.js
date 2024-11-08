"use client";

import { useState } from "react";

export default function TaskItem({ task }) {
  const [currentTask, setCurrentTask] = useState(task);
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState(task.title);

  // Handler para eliminar la tarea
  const deleteHandler = async (taskId) => {
    try {
      const response = await fetch(`api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        console.log("Tarea eliminada");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Activar modo de edición de subtareas
  const addSubtaskHandler = () => setAddingSubtask(true);

  // Guardar nueva subtarea y actualizar el estado
  const saveSubtaskHandler = async (taskId) => {
    event.preventDefault();
    try {
      const response = await fetch(`api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...currentTask,
          subtasks: [
            ...currentTask.subtasks,
            { title: newSubtask, status: "pending" },
          ],
        }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setCurrentTask(updatedTask); // Actualizar el estado con la nueva tarea
        setNewSubtask(""); // Limpiar campo de nueva subtarea
        setAddingSubtask(false); // Cerrar formulario de nueva subtarea
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Actualizar título de la tarea y reflejarlo en el estado
  const saveTaskHandler = async (taskId) => {
    try {
      const response = await fetch(`api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...currentTask,
          title: updatedTitle,
        }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setCurrentTask(updatedTask); // Actualizar estado con el nuevo título
        setEditingTask(false); // Cerrar modo de edición de tarea
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="text-xl gap-4 border-b-4 pb-4 border-gray-400">
      <div className="flex flex-col gap-4">
        {editingTask ? (
          <form onSubmit={() => saveTaskHandler(currentTask._id)}>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="mb-4 p-2 border border-gray-200 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-800 text-white"
            >
              Guardar Tarea
            </button>
          </form>
        ) : (
          <span className="mb-4">{currentTask.title}</span>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => setEditingTask(!editingTask)}
            className="px-4 py-2 rounded-lg bg-indigo-800 text-white"
          >
            {editingTask ? "Cancelar" : "Editar"}
          </button>
          <button
            onClick={() => deleteHandler(currentTask._id)}
            className="px-4 py-2 rounded-lg bg-indigo-800 text-white"
          >
            Eliminar
          </button>
          <button
            onClick={() => addSubtaskHandler()}
            className="px-4 py-2 rounded-lg bg-indigo-800 text-white"
          >
            Agregar Subtarea
          </button>
        </div>

        {currentTask.subtasks.length > 0 && (
          <div className="ps-8">
            <h2 className="text-lg">Subtareas:</h2>
            <ul>
              {currentTask.subtasks.map(({ title, status }, index) => (
                <li key={index} className="pl-4">
                  {title} - {status}
                </li>
              ))}
            </ul>
          </div>
        )}

        {addingSubtask && (
          <div>
            <form
              onSubmit={() => saveSubtaskHandler(currentTask._id)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label>Nueva subtarea:</label>
                <input
                  onChange={(e) => setNewSubtask(e.target.value)}
                  value={newSubtask}
                  className="p-4 h-8 rounded-lg border border-gray-200 shadow-md"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-800 text-white w-1/2 mx-auto"
              >
                Guardar Subtarea
              </button>
            </form>
          </div>
        )}
      </div>
    </li>
  );
}
