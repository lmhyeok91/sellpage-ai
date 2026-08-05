import React from 'react';
import { Key, FileText, FolderOpen, Sparkles, LogOut, Crown, Clock, RefreshCw } from 'lucide-react';

export default function TopBar({ 
  currentUser, 
  sessionRemainingSeconds = 3600,
  onExtendSession,
  onLogout, 
  onOpenApiKeyModal, 
  onOpenKnowledgeModal, 
  onOpenTaskModal, 
  onNewTask,
  onOpenAdminApproval,
  pendingApprovalCount = 0
}) {
  const isMaster = !currentUser || currentUser?.email?.toLowerCase() === 'lmhyeok@naver.com' || currentUser?.role === 'master';

  // Format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isLowTime = sessionRemainingSeconds <= 300; // < 5 minutes warning

  return (
    <div className="topbar">
      <div className="topbar-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.5px' }}>SELLPAGE AI</span>
        
        {currentUser && (
          <>
            <span style={{
              fontSize: '11px',
              backgroundColor: currentUser.role === 'master' ? '#fef3c7' : '#e0f2fe',
              color: currentUser.role === 'master' ? '#b45309' : '#0369a1',
              border: currentUser.role === 'master' ? '1px solid #fcd34d' : '1px solid #7dd3fc',
              padding: '2px 8px',
              borderRadius: '16px',
              fontWeight: '900',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              whiteSpace: 'nowrap'
            }}>
              {currentUser.role === 'master' && <Crown style={{ width: '11px', height: '11px', color: '#d97706' }} />}
              {currentUser.role === 'master' ? `마스터 (${currentUser.email})` : `사업자 (${currentUser.email})`}
            </span>

            {/* Banking-Grade 1-Hour Session Timer Pill & Extend Button */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: isLowTime ? '#fef2f2' : '#f0fdf4',
              border: isLowTime ? '1.5px solid #f87171' : '1.5px solid #86efac',
              borderRadius: '16px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: '900',
              color: isLowTime ? '#dc2626' : '#166534',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease'
            }}>
              <Clock style={{ width: '11px', height: '11px', color: isLowTime ? '#dc2626' : '#16a34a' }} />
              <span>유지시간 {formatTime(sessionRemainingSeconds)}</span>
              <button
                onClick={onExtendSession}
                title="로그인 유지 시간을 1시간(60분) 연장합니다"
                style={{
                  backgroundColor: isLowTime ? '#dc2626' : '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '2px 7px',
                  fontSize: '10px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <RefreshCw style={{ width: '9px', height: '9px' }} /> 연장
              </button>
            </div>
          </>
        )}
      </div>

      <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
        {/* Master Account Special Approval Button */}
        {isMaster && (
          <button 
            onClick={onOpenAdminApproval} 
            className="btn-secondary" 
            style={{ backgroundColor: '#fef3c7', border: '1.5px solid #fcd34d', color: '#b45309', fontWeight: '900', whiteSpace: 'nowrap' }}
          >
            <Crown className="w-3.5 h-3.5" style={{ color: '#d97706' }} /> ⚙️ 계정 승인
            {pendingApprovalCount > 0 && (
              <span style={{ backgroundColor: '#ef4444', color: '#ffffff', fontSize: '10px', padding: '1px 5px', borderRadius: '10px', marginLeft: '3px', fontWeight: '900' }}>
                {pendingApprovalCount}
              </span>
            )}
          </button>
        )}

        <button onClick={onOpenApiKeyModal} className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
          <Key className="w-3.5 h-3.5" /> API 키 설정
        </button>

        <button onClick={onOpenKnowledgeModal} className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
          <FileText className="w-3.5 h-3.5" /> 지식파일 등록
        </button>

        <button onClick={onOpenTaskModal} className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
          <FolderOpen className="w-3.5 h-3.5" /> 기존작업 열기
        </button>

        <button onClick={onNewTask} className="btn-primary-black" style={{ whiteSpace: 'nowrap' }}>
          <Sparkles className="w-3.5 h-3.5" /> 새 작업 시작
        </button>

        {currentUser && (
          <button onClick={onLogout} className="btn-secondary" style={{ color: '#ef4444', whiteSpace: 'nowrap' }}>
            <LogOut className="w-3.5 h-3.5" /> 로그아웃
          </button>
        )}
      </div>
    </div>
  );
}
