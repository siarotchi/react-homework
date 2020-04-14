import React, { useContext } from "react";
import { Context } from "../../pages/ToDoFc";

const FormFc = ({ inputChange, handleEnter, addTask }) => {
  const { value } = useContext(Context);

  return (
    <div className="task-input">
      <input
        type="text"
        className="form-control fc"
        placeholder="Enter Task"
        onChange={inputChange}
        onKeyPress={handleEnter}
        value={value}
      ></input>
      <button onClick={() => addTask(value)} type="submit" className="btn btn-primary text-capitalize">
        Add
      </button>
    </div>
  );
};

export default FormFc;
