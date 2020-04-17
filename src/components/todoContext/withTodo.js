import React from "react";
import { TodoConsumer } from ".";

export function withTodo(Component) {
  class WithTodo extends React.Component {
    render() {
      return <TodoConsumer>{(context) => <Component context={context} {...this.props} />}</TodoConsumer>;
    }
  }
  WithTodo.displayName = `WithTodo(${getDisplayName(Component)})`;

  return WithTodo;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
