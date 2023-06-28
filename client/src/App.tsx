import Login from "./components/Login";
import Register from "./components/Register";
import React, { useState } from "react";
import "./App.css";

function App(): JSX.Element {
  const [currentForm, setCurrentForm] = useState<string>("login");

  const toggleForm = (formName: string): void => {
    setCurrentForm(formName);
  };
  return (
    <>
      <div className="background"></div>
      <div className="App">
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )}
      </div>
    </>
  );
}

export default App;
