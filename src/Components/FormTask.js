export const FormTask = ({ task, handleChange }) => {
  return (
    <form>
      <div className="createTaskForm">
        <div className="textInputs">
          <input
            className="textInput"
            value={task.title}
            type="text"
            id="title"
            placeholder="Enter title for your task"
            onChange={(e) => {
              handleChange("title", e.target.value);
            }}
          />
          <textarea
            className="textInput"
            value={task.description}
            type="text"
            id="description"
            placeholder="Enter description for your task"
            onChange={(e) => {
              handleChange("description", e.target.value);
            }}
          />
        </div>
        <div className="deadline">
          <span className="text">Set deadline:</span>
          <input
            className="textInput dateInput"
            value={task.deadline}
            type="date"
            id="deadline"
            onChange={(e) => {
              handleChange(
                "deadline",
                e.target.value.length ? e.target.value : null
              );
            }}
          />
        </div>
        <input
          className="fileInput"
          type="file"
          id="attachment"
          onChange={(e) => {
            e.preventDefault();
            handleChange("attachment", e.target.files[0]);
          }}
        />
      </div>
    </form>
  );
};
