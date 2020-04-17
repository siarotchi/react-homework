import React from "react";
import { TodoContext } from ".";

class TodoProvider extends React.Component {
  state = {
    tasks: [],
    value: "",
  };

  changeState = (exp) => this.setState(exp);

  render() {
    const todoContextValue = {
      ...this.state,
      changeState: this.changeState,
    };
    return <TodoContext.Provider value={todoContextValue}>{this.props.children}</TodoContext.Provider>;
  }
}

export default TodoProvider;
