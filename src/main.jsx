import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'leaflet/dist/leaflet.css'
import { WheelchairProvider } from './context/WheelchairContext.jsx'
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered successfully:', reg))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WheelchairProvider>
        <App />
      </WheelchairProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
