import React, { useContext, useCallback, useState, useEffect } from "react";
import { ContextClass } from "../../pages/ToDo";

const Form = ({ addTask, taskIsBeingEdited }) => {
  const context = useContext(ContextClass);
  const { changeState, tasks } = context;
  const [value, setValue] = useState("");

  useEffect(() => {
    if (taskIsBeingEdited) setValue(taskIsBeingEdited);
  }, [taskIsBeingEdited]);

  const onChange = useCallback(({ target: { value } }) => setValue(value), []);

  const onSubmit = (e) => {
    e.preventDefault();
    handleAdd(e);
    setValue("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addTask(value, tasks, changeState);
  };

  return (
    <form onSubmit={onSubmit} className="task-input">
      <input type="text" className="form-control" placeholder="Enter Task" onChange={onChange} value={value}></input>
      <button type="submit" className="btn btn-primary text-capitalize">
        add
      </button>
    </form>
  );
};

export default Form;
