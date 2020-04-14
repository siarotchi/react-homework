import React from "react";
import { ActionBtn } from "./ActionBtn";

const Notes = ({ task, doneTask, deleteTask, editTask }) => {
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
            <ActionBtn task={task} doneTask={doneTask} deleteTask={deleteTask} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Notes;
