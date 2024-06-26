import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './routes/Details.jsx';
import NotFound from './routes/NotFound.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path="*" element={ <NotFound /> }/> {/* graceful error-handling page page */}
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
