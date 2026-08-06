import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Runtime Exception Caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', backgroundColor: '#0f172a', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px', textAlign: 'center'
        }}>
          <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '24px', border: '1.5px solid #38bdf8', maxWidth: '540px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#38bdf8', marginBottom: '12px' }}>
              ⚡ SellPage AI 시스템 자동 복구 안내
            </h2>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '20px' }}>
              브라우저 캐시 또는 이전 세션 데이터 충돌로 인해 임시 화면 오류가 발생했습니다.<br/>
              아래 <b>[ 시스템 세션 초기화 및 복구 ]</b> 버튼을 누르시면 정상 화면으로 즉시 복구됩니다.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                padding: '14px 28px', backgroundColor: '#0284c7', color: '#ffffff',
                fontSize: '14px', fontWeight: '900', borderRadius: '12px', border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(2, 132, 199, 0.4)'
              }}
            >
              🔄 시스템 세션 초기화 및 즉시 복구
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
