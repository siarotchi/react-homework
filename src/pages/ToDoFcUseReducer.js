import React, { useEffect, createContext, useReducer, useMemo } from "react";
import FormFcReducer from "../components/todoFc/FormFcReducer";
import NotesFc from "../components/todoFc/NotesFc";
import { v4 as uuidv4 } from "uuid";
import { useBg } from "../components/customHooks";

export const Context = createContext({});

const initialState = {
  tasks: [],
  tasksCount: 0,
  value: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TASKS": {
      return {
        ...state,
        tasks: payload,
        tasksCount: payload.length,
      };
    }

    case "SET_VALUE": {
      return {
        ...state,
        value: payload,
      };
    }

    default:
      return state;
  }
};

const ToDoFcUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tasks, value, tasksCount } = state;
  const contextValue = { tasks, value };
  const [color] = useBg(tasks);

  // useEffects

  useEffect(() => {
    const arr = localStorage.getItem("tasks") || [];
    dispatch({ type: "ADD_TASKS", payload: JSON.parse(arr) });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  ///

  const addTask = (task) => {
    if (!task) return null;
    dispatch({ type: "ADD_TASKS", payload: [...tasks, { id: uuidv4(), title: task, done: false }] });
    dispatch({ type: "SET_VALUE", payload: "" });
  };

  const doneTask = (id) => {
    dispatch({ type: "ADD_TASKS", payload: tasks.map((task) => (task.id === id ? ((task.done = true), task) : task)) });
  };

  const deleteTask = (id) => {
    dispatch({ type: "ADD_TASKS", payload: tasks.filter((task) => task.id !== id) });
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addTask(event.target.value);
      dispatch({ type: "SET_VALUE", payload: "" });
    }
  };

  const clearAll = () => {
    dispatch({ type: "ADD_TASKS", payload: [] });
  };

  const inputChange = (event) => {
    dispatch({ type: "SET_VALUE", payload: event.target.value });
  };

  const editTask = (id) => {
    const selectedItem = tasks.find((task) => task.id === id);
    dispatch({
      type: "ADD_TASKS",
      payload: tasks.filter((task) => {
        return task.id !== id;
      }),
    });
    dispatch({ type: "SET_VALUE", payload: selectedItem.title });
  };

  /// useMemo Example
  const [counter1, setCounter1] = React.useState(0);
  const [counter2, setCounter2] = React.useState(0);

  const updateCounter1 = () => {
    setCounter1(counter1 + 1);
  };

  const updateCounter2 = () => {
    setCounter2(counter2 + 1);
  };

  const lessThan3 = useMemo(() => {
    for (let i = 0; i < 1000000000; i++) {
      i++;
    }
    return counter1 <= 3;
  }, [counter1]);

  ///

  return (
    <Context.Provider value={contextValue}>
      <div className="todo-container" style={{ backgroundColor: color }}>
        <hr />
        <h3 className="d-flex justify-content-center"> First counter is {lessThan3 ? "less" : "greater"} than 3</h3>
        <div className="counter d-flex justify-content-around">
          <button className="btn btn-primary" onClick={updateCounter1}>
            Increment Counter 1
          </button>
          <span className="btn btn-warning">{counter1}</span>
          <button className="btn btn-primary" onClick={updateCounter2}>
            Increment Counter 2
          </button>
          <span className="btn btn-warning">{counter2}</span>
        </div>
        <hr />
        <h1 className="todo-header d-flex justify-content-center">ToDo List: {tasksCount} tasks to do.</h1>
        <FormFcReducer addTask={addTask} inputChange={inputChange} handleEnter={handleEnter} />
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
