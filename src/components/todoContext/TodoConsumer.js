import React from "react";
import { TodoContext } from ".";

class TodoConsumer extends React.Component {
  render() {
    return <TodoContext.Consumer>{(context) => this.props.children(context)}</TodoContext.Consumer>;
  }
}

export default TodoConsumer;
