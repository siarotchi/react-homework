import React from "react";

const Form = ({ value, inputChange, handleEnter, addTask }) => {
  return (
    <div className="task-input">
      <input
        type="text"
        className="form-control"
        placeholder="Enter Task"
        onChange={inputChange}
        onKeyPress={handleEnter}
        value={value}
      ></input>
      <button onClick={() => addTask(value)} type="submit" className="btn btn-primary text-capitalize">
        add
      </button>
    </div>
  );
};

export default Form;
