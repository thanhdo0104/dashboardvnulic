import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Totals from './pages/Totals';
import ErrorBoundary from './components/ErrorBoundary';
import { getCurrentConfig } from './config';
import './App.css';

function App() {
  const config = getCurrentConfig();

  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/totals" element={<Totals />} />
        </Routes>
      </ErrorBoundary>
      
      {config.enableLogging && (
        <div className="debug-info">
          <small>Mode: {process.env.NODE_ENV} | Mock Data: {config.useMockData ? 'ON' : 'OFF'}</small>
        </div>
      )}
    </div>
  );
}

export default App;
