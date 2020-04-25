import React from "react";
import { TodoContext } from ".";

class TodoProvider extends React.Component {
  state = {
    tasks: [],
    value: "",
  };

  render() {
    const todoContextValue = {
      ...this.state,
      changeState: (e) => this.setState(e), // this.setState
    };
    return <TodoContext.Provider value={todoContextValue}>{this.props.children}</TodoContext.Provider>;
  }
}

export default TodoProvider;
