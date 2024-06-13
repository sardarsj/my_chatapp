import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChatProvider from './components/Context/ChatProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    //whatever state we make in contextAPI, it will be available to whole app
  //removed strict mode
  // <ChatProvider></ChatProvider> this is not working, 
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
