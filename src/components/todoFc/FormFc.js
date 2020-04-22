import React, { useEffect, useContext, useRef, forwardRef, useImperativeHandle } from "react";
import { ContextFc } from "../../pages/ToDoFc";

const FormFc = ({ inputChange, handleEnter, addTask }, ref) => {
  const { value } = useContext(ContextFc);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [value]);

  useImperativeHandle(ref, () => ({
    getHeight: () => {
      return inputRef.current.offsetParent.clientHeight;
    },
  }));

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

export default forwardRef(FormFc);
// export default React.memo(FormFc);
