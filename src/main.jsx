import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <- Import Tailwind styles

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
