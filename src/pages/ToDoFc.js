import React, { useState, useEffect, createContext } from "react";
import FormFc from "../components/todoFc/FormFc";
import NotesFc from "../components/todoFc/NotesFc";
import { v4 as uuidv4 } from "uuid";
// import { TodoContext } from "../components/todoContext";

export const Context = createContext({});

const TodoFc = () => {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");

  const contextValue = { tasks, value };

  useEffect(() => {
    const arr = localStorage.getItem("tasks") || [];
    setTasks(JSON.parse(arr));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (!task) return null;
    setTasks([...tasks, { id: uuidv4(), title: task, done: false }]);
    setValue("");
  };

  const doneTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? ((task.done = true), task) : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addTask(event.target.value);
      setValue("");
    }
  };

  const clearAll = () => {
    setTasks([]);
  };

  const inputChange = (event) => {
    setValue(event.target.value);
  };

  const editTask = (id) => {
    const selectedItem = tasks.find((task) => task.id === id);
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
    setValue(selectedItem.title);
  };

  return (
    <Context.Provider value={contextValue}>
      <div className="todo-container">
        <h1 className="todo-header">ToDo List:</h1>
        <FormFc addTask={addTask} inputChange={inputChange} handleEnter={handleEnter} />
        <hr />
        {tasks.map((task, index) => (
          <NotesFc
            doneTask={() => doneTask(task.id)}
            deleteTask={() => deleteTask(task.id)}
            editTask={() => editTask(task.id)}
            task={task}
            key={task.id}
          />
        ))}
        <hr />
        <button onClick={clearAll} type="button" className="btn btn-primary btn-block text-capitalize ">
          clear all
        </button>
      </div>
    </Context.Provider>
  );
};

export default TodoFc;
