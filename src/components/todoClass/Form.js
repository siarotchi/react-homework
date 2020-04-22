import React, { useContext } from "react";
import { ContextClass } from "../../pages/ToDo";

const Form = ({ handleEnter, addTask, inputChange }) => {
  const context = useContext(ContextClass);
  const { value, changeState, tasks } = context;

  return (
    <div className="task-input">
      <input
        type="text"
        className="form-control"
        placeholder="Enter Task"
        onChange={(event) => inputChange(event.target.value, tasks, changeState)}
        onKeyPress={(event) => handleEnter(event, tasks, changeState)}
        value={value}
      ></input>
      <button
        onClick={() => addTask(value, tasks, changeState)}
        type="submit"
        className="btn btn-primary text-capitalize"
      >
        add
      </button>
    </div>
  );
};

export default Form;
