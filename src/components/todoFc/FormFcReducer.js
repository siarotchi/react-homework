import React, { useEffect, useContext, useRef, useState } from "react";
import { Context } from "../../pages/ToDoFcUseReducer";

const FormFcReducer = () => {
  const [value, setValue] = useState("");
  const { handleEnter, addTask } = useContext(Context);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [addTask]);

  const updateValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onHandleEnter = (e) => {
    setValue("");
    handleEnter(e);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(value);
    setValue("");
  };

  return (
    <form className="task-input">
      <input
        ref={inputRef}
        type="text"
        className="form-control fc"
        placeholder="Enter Task"
        onChange={updateValue}
        onKeyPress={onHandleEnter}
        value={value}
      ></input>
      <button onClick={handleAddTask} type="submit" className="btn btn-danger text-capitalize">
        Add
      </button>
    </form>
  );
};

export default FormFcReducer;
