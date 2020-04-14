import React from "react";
import { ActionBtn2 } from "./ActionBtnFc";

const NotesFc = ({ task, doneTask, deleteTask, editTask }) => {
  const className = `task ${task.done ? "lineTh" : ""}`;

  return (
    <div className="container">
      <ul className="list-group">
        <li className="list-group-item note">
          <div className={className}>{task.title}</div>
          <div className="buttons">
            <button onClick={editTask} type="button" className="btn btn-info edit text-capitalize">
              edit
            </button>
            <ActionBtn2 task={task} doneTask={doneTask} deleteTask={deleteTask} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NotesFc;
