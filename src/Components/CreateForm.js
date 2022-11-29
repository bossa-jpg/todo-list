import { useState } from "react";
import { FormTask } from "./FormTask";

export const CreateForm = ({ addTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    attachment: null,
    completed: false,
  });

  const [isShowForm, setIsShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({
      title: "",
      description: "",
      deadline: "",
      attachment: null,
      completed: false,
    });
  };

  const handleChange = (field, value) => {
    setTask({ ...task, [field]: value });
  };

  return (
    <div className="createForm">
      <button
        className="addButton"
        onClick={() => {
          setIsShowForm(!isShowForm);
        }}
      >
        Add task
      </button>
      {isShowForm && (
        <div
          className="popup"
          onClick={() => {
            setIsShowForm(!isShowForm);
          }}
        >
          <div className="popupContent" onClick={(e) => e.stopPropagation()}>
            <FormTask task={task} handleChange={handleChange} />
            <div className="formButtons">
              <button
                className="button"
                onClick={(e) => {
                  handleSubmit(e);
                  setIsShowForm(!isShowForm);
                }}
              >
                Create
              </button>
              <button
                className="button"
                onClick={() => setIsShowForm(!isShowForm)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
