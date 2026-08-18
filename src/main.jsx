import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { HashRouter } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("PashuDhan App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center font-sans">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md max-w-sm space-y-3">
            <h2 className="text-lg font-bold text-slate-800">पशु-धन (PashuDhan) ऐप</h2>
            <p className="text-xs text-slate-600">ऐप प्रारंभ हो रहा है... कृपया पुनः प्रयास करें।</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-xl text-xs"
            >
              पुनः लोड करें (Reload)
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>
);