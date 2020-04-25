import React, { useEffect, useContext, useRef, useState } from "react";
import { Context } from "../../pages/ToDoFcUseReducer";

const FormFcReducer = ({ setTaskIsBeingEdited, cleanEdit }) => {
  const [value, setValue] = useState("");
  const { addTask } = useContext(Context);

  const inputRef = useRef(null);

  useEffect(() => {
    if (setTaskIsBeingEdited) updateNewTitle(setTaskIsBeingEdited.title);
  }, [setTaskIsBeingEdited]);

  useEffect(() => {
    inputRef.current.focus();
  }, [addTask]);

  const updateNewTitle = (title) => {
    console.log(title);
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
    addTask(setTaskIsBeingEdited.title);
    setValue("");
    cleanEdit();
  };

  console.log({ setTaskIsBeingEdited });

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
      {setTaskIsBeingEdited && (
        <button onClick={onCancelEdit} type="submit" className="btn btn-danger text-capitalize">
          Cancel
        </button>
      )}
    </form>
  );
};

export default FormFcReducer;
