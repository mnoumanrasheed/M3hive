import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LoaderGate } from './components/LoaderGate.tsx';
import './index.css';
import './styles/globals.css';
import { runDevContentValidation } from './lib/validation.ts';

// Run development data validation
runDevContentValidation();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoaderGate>
      <App />
    </LoaderGate>
  </React.StrictMode>
);
