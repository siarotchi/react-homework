import React, { useEffect, useContext, useRef } from "react";
import { Context } from "../../pages/ToDoFcUseReducer";

const FormFcReducer = () => {
  const { value, inputChange, handleEnter, addTask } = useContext(Context);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [value]);

  return (
    <div className="task-input">
      <input
        ref={inputRef}
        type="text"
        className="form-control fc"
        placeholder="Enter Task"
        onChange={inputChange}
        onKeyPress={handleEnter}
        value={value}
      ></input>
      <button onClick={() => addTask(value)} type="submit" className="btn btn-danger text-capitalize">
        Add
      </button>
    </div>
  );
};

export default FormFcReducer;
// export default React.memo(FormFc);
