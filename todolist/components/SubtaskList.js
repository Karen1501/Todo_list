const SubtaskList = ({ subtasks }) => {
  return (
    <ul>
      {subtasks.map((subtask) => {
        <li key={subtask._id}>{subtask.title}</li>;
      })}
    </ul>
  );
};

export default SubtaskList;
