// components/SubTaskItem.js
export default function SubTaskItem({ subTask }) {
  return (
    <div>
      <h3>{subTask.title}</h3>
      <p>{subTask.description}</p>
    </div>
  );
}
