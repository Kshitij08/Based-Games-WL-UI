import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// In production builds, scale down to match localhost 100% (deployed often renders ~133% otherwise)
if (import.meta.env.PROD) {
  document.documentElement.classList.add('prod-scale-fix')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
