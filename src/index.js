import React ,{ Suspense }from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/index.css'
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <React.StrictMode>

        <App />

      </React.StrictMode>


);

