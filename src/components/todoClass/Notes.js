import React, { useMemo, useContext } from "react";
import { ActionBtn } from "./ActionBtn";
// import { withTodo } from "../todoContext";
import { ContextClass } from "../../pages/ToDo";

const Notes = ({ doneTask, deleteTask, editTask, clearAll }) => {
  const className = (done) => `task ${done ? "lineTh" : ""}`;
  const { tasks, changeState } = useContext(ContextClass);

  const renderedTasks = useMemo(
    () =>
      tasks.map((task) => (
        <div className="container" key={task.id}>
          <ul className="list-group">
            <li className="list-group-item note" style={task.edit ? { border: "1px solid #28A745" } : {}}>
              <div className={className(task.done)}>{task.title}</div>
              <div className="buttons">
                <button
                  onClick={() => editTask(task.id, tasks, changeState)}
                  type="button"
                  className="btn btn-info edit text-capitalize"
                >
                  edit
                </button>
                <ActionBtn
                  task={task}
                  doneTask={() => doneTask(task.id, changeState)}
                  deleteTask={() => deleteTask(task.id, changeState)}
                />
              </div>
            </li>
          </ul>
        </div>
      )),
    [tasks]
  );

  return (
    <>
      {renderedTasks}
      <hr />
      <div className="d-flex justify-content-end">
        <button onClick={() => clearAll(changeState)} type="button" className="btn btn-danger text-capitalize ">
          clear all
        </button>
      </div>
    </>
  );
};

export default Notes;

// const Notes = withTodo(NotesCtx);

// class Notes extends React.Component {
//   // static contextType = TodoContext;
//   render() {
//     const className = (done) => `task ${done ? "lineTh" : ""}`;
//     const { doneTask, deleteTask, editTask, clearAll, context } = this.props;
//     const { tasks, changeState } = context;

//     return (
//       <>
//         {tasks.map((task) => (
//           <div className="container" key={task.id}>
//             <ul className="list-group">
//               <li className="list-group-item note" style={task.edit ? { border: "1px solid #28A745" } : {}}>
//                 <div className={className(task.done)}>{task.title}</div>
//                 <div className="buttons">
//                   <button
//                     onClick={() => editTask(task.id, tasks, changeState)}
//                     type="button"
//                     className="btn btn-info edit text-capitalize"
//                   >
//                     edit
//                   </button>
//                   <ActionBtn
//                     task={task}
//                     doneTask={() => doneTask(task.id, changeState)}
//                     deleteTask={() => deleteTask(task.id, changeState)}
//                   />
//                 </div>
//               </li>
//             </ul>
//           </div>
//         ))}
//         <hr />
//         <div className="d-flex justify-content-end">
//           <button onClick={() => clearAll(changeState)} type="button" className="btn btn-danger text-capitalize ">
//             clear all
//           </button>
//         </div>
//       </>
//     );
//   }
// }
