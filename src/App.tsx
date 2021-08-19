import React from "react";
import ReactDOM from "react-dom";
import Test from "./Test";

const App = () => {
  return (
    <div>
      <h1>Test title</h1>
      <Test test="test val2" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
