import { useEffect, useState } from "react";
import { FormTask } from "./FormTask";
import { EditIcon } from "../icons/EditIcon";
import { TrashIcon } from "../icons/TrashIcon";

export const Task = ({ task, removeTask, editTask, completeTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isShowDescription, setIsShowDescription] = useState(false);
  const [isShowFile, setIsShowFile] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const { title, description, deadline, attachment, completed } = task;
  const [isChecked, setIsChecked] = useState(completed);

  // обновляет задачу по заполненной форме редактирования
  const handleEdit = (field, value) => {
    setEditedTask({ ...editedTask, [field]: value });
  };

  // отправляет отредактированную задачу в localStorage
  const handleSendEditTask = (e) => {
    e.preventDefault();
    editTask(task, editedTask);
  };

  const handleComplete = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDelete = () => {
    setIsChecked(completed);
    setIsShowDescription(false);
    removeTask(task);
  };

  useEffect(() => {
    if (task.completed !== isChecked) {
      completeTask(task);
    }
  }, [completeTask, isChecked, task]);

  let rawInfoClass = "taskInfo rawInfo";
  let buttonClass = "button";
  let descriptionClass = "description";
  if (isChecked) {
    rawInfoClass += " taskInfo_completed";
  }
  if (Date.now() > new Date(deadline)) {
    rawInfoClass += " text_failed";
    buttonClass += " button_failed";
    descriptionClass += " text_failed";
  }

  return (
    <div
      className={
        Date.now() > new Date(deadline)
          ? "taskBlock taskBlock_failed"
          : "taskBlock"
      }
    >
      <div className="taskHeader">
        <div className="taskInfo">
          <input
            className="checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleComplete}
          />
          <div
            className={rawInfoClass}
            onClick={() => setIsShowDescription(!isShowDescription)}
          >
            <h3>{title}</h3>
            {deadline ? <span className="text">deadline: {deadline}</span> : ""}
          </div>
        </div>
        <div className="buttons">
          <button
            className={buttonClass}
            onClick={() => setIsEditing(!isEditing)}
          >
            <EditIcon />
          </button>
          <button className={buttonClass} onClick={handleDelete}>
            <TrashIcon />
          </button>
        </div>
      </div>
      {isEditing ? (
        <div>
          <FormTask task={editedTask} handleChange={handleEdit} />
          <button
            className="button"
            onClick={(e) => {
              setIsEditing(!isEditing);
              handleSendEditTask(e);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        ""
      )}
      {isShowDescription ? (
        <div className={descriptionClass}>
          <p>{description}</p>
          {attachment !== {} ? (
            <div>
              <p
                onClick={() => {
                  console.log(attachment);
                  setIsShowFile(!isShowFile);
                }}
              >
                {attachment.name}
              </p>
              <div id="image-grid">
                <img src={attachment.file} alt="attachment"></img>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
