import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Safely extract theme early without throwing on restricted storage environments
try {
  const urlParams = new URLSearchParams(window.location.search);
  const queryTheme = urlParams.get('theme');
  const storedTheme = (queryTheme === 'light' || queryTheme === 'dark')
    ? queryTheme
    : (typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('shreeharsha-theme') : null);

  if (storedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.dataset.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.dataset.theme = 'dark';
  }
} catch (e) {
  // Fallback defensively to dark theme
  document.documentElement.classList.add('dark');
  document.documentElement.classList.remove('light');
  document.documentElement.dataset.theme = 'dark';
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Unhandled app error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0D1613',
          color: '#E9E4D2',
          fontFamily: 'monospace',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            border: '1px solid #D9A441',
            padding: '24px',
            borderRadius: '4px',
            maxWidth: '520px',
            backgroundColor: '#13211C'
          }}>
            <h2 style={{ color: '#D9A441', marginBottom: '12px', fontSize: '18px' }}>
              [SYSTEM RECOVERY] Engineering Interface Diagnostic
            </h2>
            <p style={{ color: '#93A096', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>
              The application encountered a transient runtime issue. Click below to reset client state and refresh.
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch (_) {}
                window.location.reload();
              }}
              style={{
                backgroundColor: '#D9A441',
                color: '#0D1613',
                border: 'none',
                padding: '8px 18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '2px',
                fontFamily: 'monospace'
              }}
            >
              Reset Cache &amp; Reload Interface
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function mountApp() {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Root element #root not found in DOM.');
    return;
  }
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
