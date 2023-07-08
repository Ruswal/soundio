import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FileUploadPage from "./pages/artist-studio";
function App() {
    const [currentForm, setCurrentForm] = useState("login");
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };
    return (<>
      <div className="background"></div>
      <div className="App">
        {currentForm === "login" ? (<Login onFormSwitch={toggleForm}/>) : currentForm === "register" ? (<Register onFormSwitch={toggleForm}/>): currentForm === "artist-studio" ? (
  <FileUploadPage onFormSwitch={toggleForm} />
) : null}
      </div>
    </>);
}
export default App;
