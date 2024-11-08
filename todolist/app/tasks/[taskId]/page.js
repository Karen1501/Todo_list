// app/tasks/[taskId]/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../services/api";
import SubTaskItem from "../../../components/SubTaskItem";

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [subTasks, setSubTasks] = useState([]);

  useEffect(() => {
    const fetchTaskAndSubTasks = async () => {
      const taskResponse = await api.get(`/tasks/${taskId}`);
      setTask(taskResponse.data);
      setSubTasks(taskResponse.data.subTasks);
    };
    fetchTaskAndSubTasks();
  }, [taskId]);

  return (
    <div>
      <h1>{task ? task.title : "Cargando..."}</h1>
      {subTasks.map((subTask) => (
        <SubTaskItem key={subTask._id} subTask={subTask} />
      ))}
    </div>
  );
}
