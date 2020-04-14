import React from "react";

export const ActionBtn = ({ task, doneTask, deleteTask }) => (
  <div className="action-btn">
    {!task.done ? (
      <button onClick={doneTask} type="button" className="btn btn-outline-success btn-lg">
        &#9998;
      </button>
    ) : (
      <button onClick={deleteTask} type="button" className="btn btn-outline-danger btn-lg">
        &#10006;
      </button>
    )}
  </div>
);
