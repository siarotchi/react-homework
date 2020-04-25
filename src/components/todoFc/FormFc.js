import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";

const FormFc = ({ addTask, taskIsBeindEdited, cleanEdit }, ref) => {
  const inputRef = useRef();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (taskIsBeindEdited) updateNewTitle(taskIsBeindEdited.title);
  }, [taskIsBeindEdited]);

  useEffect(() => {
    inputRef.current.focus();
  }, [addTask]);

  useImperativeHandle(ref, () => ({
    getHeight: () => {
      return inputRef.current.offsetParent.clientHeight;
    },
  }));

  const updateNewTitle = (title) => {
    setValue(title);
  };

  const updateValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onHandleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask(e.target.value);
      setValue("");
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(value);
    setValue("");
  };

  const onCancelEdit = (e) => {
    e.preventDefault();
    addTask(taskIsBeindEdited.title);
    setValue("");
    cleanEdit();
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
      {taskIsBeindEdited && (
        <button onClick={onCancelEdit} type="submit" className="btn btn-danger text-capitalize">
          Cancel
        </button>
      )}
    </form>
  );
};

export default forwardRef(FormFc);
