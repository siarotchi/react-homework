import React, { createContext, useReducer, useMemo, useCallback } from "react";
import FormFcReducer from "../components/todoFc/FormFcReducer";
import NotesFc from "../components/todoFc/NotesFc";
import { v4 as uuidv4 } from "uuid";
import { useBg, getFromStorage, useLocalStorage } from "../components/customHooks";

export const Context = createContext({});

const initialState = {
  tasks: getFromStorage("tasks"),
  tasksCount: 0,
};

const reducer = (state, { type, payload }) => {
  const handlers = {
    ADD_TASKS: () => ({
      ...state,
      tasks: [...state.tasks, { id: uuidv4(), title: payload, done: false }],
      tasksCount: state.tasks.length + 1,
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
  if (type) {
    console.log(type);
    return handlers[type](state, payload) || state;
  } else return;
};

const ToDoFcUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tasks, value, tasksCount } = state;
  const [color] = useBg(tasks);

  useLocalStorage("tasks", tasks);

  const addTask = (taskContent) => {
    if (!taskContent) return null;
    dispatch({ type: "ADD_TASKS", payload: taskContent });
  };

  const doneTask = (id) => {
    dispatch({ type: "DONE_TASK", payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask(event.target.value);
    }
  };

  const clearAll = useCallback(() => {
    dispatch({ type: "CLEAR_ALL" });
  }, []);

  const editTask = (id) => {
    dispatch({
      type: "EDIT_TASK",
      payload: id,
    });
  };

  const contextValue = { tasks, value, dispatch, addTask, handleEnter };

  const renderedTasksFcReducer = useMemo(
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
    <Context.Provider value={contextValue}>
      <div className="todo-container" style={{ backgroundColor: color }}>
        <hr />
        <h1 className="todo-header d-flex justify-content-center">ToDo List: {tasksCount} tasks to do.</h1>
        <FormFcReducer />
        <hr />
        {renderedTasksFcReducer}
        <hr />
        <button onClick={clearAll} type="button" className="btn btn-primary btn-block text-capitalize ">
          clear all
        </button>
      </div>
    </Context.Provider>
  );
};

export default ToDoFcUseReducer;
