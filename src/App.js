import { Todolist } from "./Components/Todolist";
import { CreateForm } from "./Components/CreateForm";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  console.log(localStorage.tasks);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  const editTask = (task, editedTask) => {
    const changingTask = tasks.indexOf(task);
    tasks.splice(changingTask, 1, editedTask);
    setTasks([...tasks]);
  };

  const completeTask = useCallback((task) => {
    setTasks((tasks) =>
      tasks.map((t) => {
        if (t === task) {
          t.completed = !t.completed;
        }
        return t;
      })
    );
  }, []);

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>
      <CreateForm addTask={addTask} />
      <Todolist
        removeTask={removeTask}
        editTask={editTask}
        completeTask={completeTask}
        tasks={tasks}
      />
    </div>
  );
}

export default App;
