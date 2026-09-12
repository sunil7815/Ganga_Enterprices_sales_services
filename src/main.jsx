import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './schema.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
