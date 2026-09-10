import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:3000');
axios.defaults.baseURL = apiBaseUrl.replace(/\/$/, '');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)


 
