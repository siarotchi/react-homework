import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Todo from "./pages/ToDo";
import TodoFc from "./pages/ToDoFc";
import ToDoFcUseReducer from "./pages/ToDoFcUseReducer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container pt-4">
        <Switch>
          <Route path={"/class"} exact component={Todo} />
          <Route path={"/func"} exact component={TodoFc} />
          <Route path={"/funcreducer"} exact component={ToDoFcUseReducer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
