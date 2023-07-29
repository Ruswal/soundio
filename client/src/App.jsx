// import dependencies
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthContext, { AuthContextProvider } from "./context/AuthProvider";

// import pages
import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FileUploadPage from "./pages/artist-studio";

function App() {

  return(
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  )

}

function AppRoutes (){

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setIsAuthenticated(authContext.isLoggedIn);
  }, [authContext.isLoggedIn]);

  return(
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              isAuthenticated ? (
                <Navigate to="/homepage"/>
              ) : (
                <Navigate to='/login' replace={true} />
              )
            }
          />
          <Route path="/homepage" element={<Homepage />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/artist-studio' element={<FileUploadPage />}/>
          <Route path='/audioPlayer' element={<AudioPlayer />}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
