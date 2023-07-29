import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthProvider';

var start = performance.now();
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
 var timeTaken = performance.now() - start;
 console.log('Time taken for the app to render: ' + timeTaken + 'ms.')
