import { Task } from "./Task";

export const Todolist = ({ tasks, removeTask, editTask, completeTask }) => {
  if (!tasks.length) {
    return;
  }

  return (
    <div className="todoList">
      {tasks.map((task) => (
        <Task
          removeTask={removeTask}
          editTask={editTask}
          completeTask={completeTask}
          task={task}
        />
      ))}
    </div>
  );
};
