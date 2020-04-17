import React from "react";
import { TodoConsumer } from "../todoContext";

const Form = ({ handleEnter, addTask, inputChange }) => {
  return (
    <TodoConsumer>
      {({ value, tasks, changeState }) => (
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
      )}
    </TodoConsumer>
  );
};

export default Form;
