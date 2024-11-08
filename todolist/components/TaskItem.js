// components/TaskItem.js
export default function TaskItem({ task }) {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
}
