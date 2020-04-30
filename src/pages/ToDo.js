import React, { createContext } from "react";
import Form from "../components/todoClass/Form";
import Notes from "../components/todoClass/Notes";
import { v4 as uuidv4 } from "uuid";

export const ContextClass = createContext({});

class Todo extends React.Component {
  state = {
    tasks: [],
    taskIsBeingEdited: false,
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
          edit: false,
        },
      ],
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
    const editedTask = tasks.find((task) => task.id === id);
    const newTasks = tasks.filter((task) => task.id !== editedTask.id);

    this.setState({ tasks: newTasks, taskIsBeingEdited: editedTask.title });
  };

  editedTask = (tasks = []) => {
    let taskToEdit = tasks;
    if (tasks.length > 0) {
      taskToEdit = tasks.find((task) => task.edit);
    }

    return taskToEdit && taskToEdit.length ? taskToEdit[0] : undefined;
  };

  render() {
    const { tasks, taskIsBeingEdited } = this.state;
    const contextValue = { tasks };

    return (
      <ContextClass.Provider value={contextValue}>
        <div className="todo-container">
          <h1 className="todo-header">ToDo List:</h1>
          <Form addTask={this.addTask} taskIsBeingEdited={taskIsBeingEdited} />
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
