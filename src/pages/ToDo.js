import React, { createContext } from "react";
import Form from "../components/todoClass/Form";
import Notes from "../components/todoClass/Notes";
import { v4 as uuidv4 } from "uuid";
// import { TodoProvider } from "../components/todoContext";

export const ContextClass = createContext({});

class Todo extends React.Component {
  state = {
    tasks: [],
    value: "",
  };

  changeState = (e) => this.setState(e);

  addTask = (task, tasks, changeState) => {
    const taskEdit = this.editedTask(tasks);
    if (!task) return null;

    if (taskEdit) {
      return changeState({
        tasks: tasks.map((task) => (task.id === taskEdit.id ? { ...task, edit: false } : task)),
        value: "",
      });
    }

    changeState(({ tasks }) => ({
      tasks: [
        ...tasks,
        {
          id: uuidv4(),
          title: task,
          done: false,
          edit: false,
        },
      ],
      value: "",
    }));
  };

  doneTask = (id, changeState) => {
    changeState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) task.done = true;
        return task;
      }),
    }));
  };

  deleteTask = (id, changeState) => {
    changeState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  };

  clearAll = (changeState) => {
    changeState(() => ({
      tasks: [],
    }));
  };

  editTask = (id, tasks, changeState) => {
    const editTasks = tasks.map((task) => (task.id === id ? { ...task, edit: true } : task));
    const selectedItem = (tasks = tasks.find((task) => task.id === id));

    changeState(() => ({
      value: selectedItem.title,
      tasks: editTasks,
    }));
  };

  editedTask = (tasks = []) => {
    let taskToEdit = tasks;
    if (tasks.length > 0) {
      taskToEdit = tasks.find((task) => task.edit);
    }
    // const taskToEdit = tasks.length > 0 ? tasks.filter((task) => task.edit) : [];
    return taskToEdit && taskToEdit.length ? taskToEdit[0] : undefined;
  };

  inputChange = (value, tasks, changeState) => {
    const taskEdit = this.editedTask(tasks);
    if (taskEdit) {
      changeState({
        tasks: tasks.map((task) => (task.id === taskEdit.id ? { ...task, title: value } : task)),
      });
    }
    changeState({ value: value });
  };

  handleEnter = (event, tasks, changeState) => {
    if (event.key === "Enter") {
      this.addTask(event.target.value, tasks, changeState);
    }
  };

  render() {
    const { value, tasks } = this.state;
    console.log(tasks);

    const contextValue = { tasks, value, changeState: this.changeState };

    return (
      <ContextClass.Provider value={contextValue}>
        <div className="todo-container">
          <h1 className="todo-header">ToDo List:</h1>
          <Form addTask={this.addTask} inputChange={this.inputChange} handleEnter={this.handleEnter} />
          <hr />
          <Notes
            doneTask={this.doneTask}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            clearAll={this.clearAll}
          />
        </div>
      </ContextClass.Provider>
    );
  }
}

export default Todo;
