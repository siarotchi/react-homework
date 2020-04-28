import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, useCallback } from "react";

const FormFc = ({ addTask, taskIsBeindEdited, cleanEdit }, ref) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const onChange = useCallback(({ target: { value } }) => setValue(value), []);
  const onSubmit = (e) => {
    e.preventDefault();
    handleAddTask(e);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (taskIsBeindEdited) setValue(taskIsBeindEdited.title);
  }, [taskIsBeindEdited]);

  useImperativeHandle(ref, () => ({
    getHeight: () => {
      return inputRef.current.offsetParent.clientHeight;
    },
  }));

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
    <form onSubmit={onSubmit} className="task-input">
      <input
        ref={inputRef}
        type="text"
        className="form-control fc"
        placeholder="Enter Task"
        onChange={onChange}
        value={value}
      ></input>
      <button type="submit" className="btn btn-danger text-capitalize">
        Add
      </button>
      {taskIsBeindEdited && (
        <button onClick={onCancelEdit} className="btn btn-danger text-capitalize">
          Cancel
        </button>
      )}
    </form>
  );
};

export default forwardRef(FormFc);
