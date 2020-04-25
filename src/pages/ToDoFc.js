import React, { useState, createContext, useRef, useMemo } from "react";
import FormFc from "../components/todoFc/FormFc";
import NotesFc from "../components/todoFc/NotesFc";
import { v4 as uuidv4 } from "uuid";

export const ContextFc = createContext({});

const TodoFc = () => {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [taskIsBeindEdited, setTaskIsBeingEdited] = useState(false);
  const [containerHeight, setContainerHeight] = useState(300);

  const contextValue = { tasks, value };
  const inputRef = useRef();

  const addTask = (task) => {
    if (!task) return null;
    setContainerHeight(inputRef.current.getHeight());
    setTasks([...tasks, { id: uuidv4(), title: task, done: false }]);
    setValue("");
  };

  const doneTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? ((task.done = true), task) : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
    setContainerHeight(300);
  };

  const inputChange = (event) => {
    setValue(event.target.value);
    event.preventDefault();
  };

  const editTask = (id) => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
    const editedTask = tasks.find((task) => task.id === id);
    setTaskIsBeingEdited(editedTask);
  };

  const renderedTasksFc = useMemo(
    () =>
      tasks.map((task, index) => (
        <NotesFc
          doneTask={() => doneTask(task.id)}
          deleteTask={() => deleteTask(task.id)}
          editTask={() => editTask(task.id)}
          task={task}
          key={task.id}
        />
      )),
    [tasks]
  );

  return (
    <ContextFc.Provider value={contextValue}>
      <div className="todo-container" style={{ height: `${containerHeight}px` }}>
        <h3 className="todo-header">ToDo Height: {containerHeight}</h3>
        <h1 className="todo-header">ToDo List: </h1>
        <FormFc
          ref={inputRef}
          addTask={addTask}
          inputChange={inputChange}
          taskIsBeindEdited={taskIsBeindEdited}
          cleanEdit={() => {
            setTaskIsBeingEdited(false);
          }}
        />
        <hr />
        {renderedTasksFc}
        <hr />
        <button onClick={clearAll} type="button" className="btn btn-primary btn-block text-capitalize ">
          clear all
        </button>
      </div>
    </ContextFc.Provider>
  );
};

export default TodoFc;
