"use client";

import { useState, useEffect } from "react";

const SubtasksPage = () => {
  const [subTasks, setSubtasks] = useState([]);

  useEffect(() => {
    fetch("/api/subtasks")
      .then((response) => response.json())
      .then((data) => setSubtasks(data))
      .catch((error) => console.error("Error al traer subtasks:", error));
  }, []);

  return (
    <div>
      <h1>Subtareas</h1>
      <ul>
        {subTasks.map((subtask) => {
          <li key={subtask._id}>{subtask.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default SubtasksPage;
