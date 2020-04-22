import React, { useEffect, createContext, useReducer } from "react";
import FormFcReducer from "../components/todoFc/FormFcReducer";
import NotesFc from "../components/todoFc/NotesFc";
import { v4 as uuidv4 } from "uuid";
import { useBg, getFromStorage, useLocalStorage } from "../components/customHooks";

export const Context = createContext({});

const initialState = {
  tasks: getFromStorage("tasks"),
  tasksCount: 0,
  value: "",
};

const reducer = (state, { type, payload }) => {
  const handlers = {
    ADD_TASKS: () => ({
      ...state,
      tasks: [...state.tasks, { id: uuidv4(), title: payload, done: false }],
      tasksCount: state.tasks.length + 1,
    }),
    SET_VALUE: (state, payload) => ({
      ...state,
      value: payload,
    }),
    DONE_TASK: (state, id) => ({
      ...state,
      tasks: state.tasks.map((task) => (task.id === id ? ((task.done = true), task) : task)),
    }),
    DELETE_TASK: (state, id) => ({
      ...state,
      tasks: state.tasks.filter((task) => task.id !== id),
      tasksCount: state.tasksCount - 1,
    }),
    CLEAR_ALL: (state) => ({
      ...state,
      tasks: [],
      tasksCount: 0,
    }),
    EDIT_TASK: (state, id) => ({
      ...state,
      tasks: state.tasks.filter((task) => {
        return task.id !== id;
      }),
    }),
  };

  return handlers[type](state, payload) || state;
};

const ToDoFcUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tasks, value, tasksCount } = state;

  const [color] = useBg(tasks);

  useLocalStorage("tasks", tasks);

  const addTask = (taskContent) => {
    if (!taskContent) return null;
    dispatch({ type: "ADD_TASKS", payload: taskContent });
    dispatch({ type: "SET_VALUE", payload: "" });
  };

  const doneTask = (id) => {
    dispatch({ type: "DONE_TASK", payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addTask(event.target.value);
      dispatch({ type: "SET_VALUE", payload: "" });
    }
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  const inputChange = (event) => {
    dispatch({ type: "SET_VALUE", payload: event.target.value });
  };

  const editTask = (id) => {
    const selectedItem = tasks.find((task) => task.id === id);
    dispatch({
      type: "EDIT_TASK",
      payload: id,
    });
    dispatch({ type: "SET_VALUE", payload: selectedItem.title });
  };

  const contextValue = { tasks, value, addTask, inputChange, handleEnter };

  return (
    <Context.Provider value={contextValue}>
      <div className="todo-container" style={{ backgroundColor: color }}>
        <hr />
        <h1 className="todo-header d-flex justify-content-center">ToDo List: {tasksCount} tasks to do.</h1>
        <FormFcReducer />
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

export default ToDoFcUseReducer;
