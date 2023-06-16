import Login from "./components/Login";
import Register from "./components/Register";
import React, { useState } from "react";

function App(): JSX.Element {
  const [currentForm, setCurrentForm] = useState<string>("login");

  const toggleForm = (formName: string): void => {
    setCurrentForm(formName);
  };
  return (
    <div>
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
}

export default App;
