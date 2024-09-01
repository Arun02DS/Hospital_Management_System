import React,{ StrictMode, createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({ isAuthenticated: false })

const AppWrapper = () => {
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [User, SetUser] = useState({});

  return (<
    Context.Provider value={{isAuthenticated, SetIsAuthenticated,User, SetUser}}
    >
    <App />
  </Context.Provider>)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
