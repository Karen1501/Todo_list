import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
  const newTaskHandler = (event) => {
    const value = event.target.value;
  };
  return (
    <div>
      <ul>
        {tasks.map((task) => {
          <TaskItem key={task.id} task={task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
