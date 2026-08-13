import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ExpenseProvider } from "./context/ExpenseContext.jsx"

import "./styles/variables.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
