import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TranContextProvider } from './context/TranContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <TranContextProvider >
      <App />
    </TranContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
