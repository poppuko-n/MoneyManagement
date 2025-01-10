import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='text-3xl font-bold underline'>MoneyManagement</div>
    <App />
  </StrictMode>
);
