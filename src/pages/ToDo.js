import React from "react";
import Form from "../components/todoClass/Form";
import Notes from "../components/todoClass/Notes";
import { v4 as uuidv4 } from "uuid";
// import { Context } from "../components/context";

// const contextValue = { tasks, value };

class Todo extends React.Component {
  state = {
    tasks: [],
    value: "",
  };

  addTask = (task) => {
    if (!task) return null;
    this.setState(({ tasks }) => ({
      tasks: [
        ...tasks,
        {
          id: uuidv4(),
          title: task,
          done: false,
        },
      ],
      value: "",
    }));
  };

  doneTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) task.done = true;
        return task;
      }),
    }));
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  };

  clearAll = () => {
    this.setState(() => ({
      tasks: [],
    }));
  };

  editTask = (id) => {
    const { tasks } = this.state;
    const selectedItem = tasks.find((task) => task.id === id);

    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => {
        return task.id !== id;
      }),
      value: selectedItem.title,
    }));
  };

  inputChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleEnter = (event) => {
    if (event.key === "Enter") {
      this.addTask(event.target.value);
    }
  };

  render() {
    const { tasks, value } = this.state;

    return (
      // <Context.Provider value={contextValue}>
      <div className="todo-container">
        <h1 className="todo-header">ToDo List:</h1>
        <Form addTask={this.addTask} inputChange={this.inputChange} handleEnter={this.handleEnter} value={value} />
        <hr />
        {tasks.map((task, index) => (
          <Notes
            doneTask={() => this.doneTask(task.id)}
            deleteTask={() => this.deleteTask(task.id)}
            editTask={() => this.editTask(task.id)}
            task={task}
            key={task.id}
          />
        ))}
        <hr />
        <div className="d-flex justify-content-end">
          <button onClick={this.clearAll} type="button" className="btn btn-danger text-capitalize ">
            clear all
          </button>
        </div>
      </div>
      // </Context.Provider>
    );
  }
}

export default Todo;
