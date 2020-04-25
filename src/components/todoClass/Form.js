import React, { useContext } from "react";
import { ContextClass } from "../../pages/ToDo";

const Form = ({ handleEnter, addTask, inputChange }) => {
  const context = useContext(ContextClass);
  const { value, changeState, tasks } = context;

  const handleAdd = (e) => {
    e.preventDefault();
    addTask(value, tasks, changeState);
  };
  return (
    <form className="task-input">
      <input
        type="text"
        className="form-control"
        placeholder="Enter Task"
        onChange={(event) => inputChange(event.target.value, tasks, changeState)}
        onKeyPress={(event) => handleEnter(event, tasks, changeState)}
        value={value}
      ></input>
      <button onClick={handleAdd} type="submit" className="btn btn-primary text-capitalize">
        add
      </button>
    </form>
  );
};

export default Form;
