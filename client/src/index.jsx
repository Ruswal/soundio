import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
