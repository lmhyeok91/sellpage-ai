import React from 'react';
import { Key, FileText, FolderOpen, Sparkles, LogOut, Crown } from 'lucide-react';

export default function TopBar({ 
  currentUser, 
  onLogout, 
  onOpenApiKeyModal, 
  onOpenKnowledgeModal, 
  onOpenTaskModal, 
  onNewTask,
  onOpenAdminApproval,
  pendingApprovalCount = 0
}) {
  const isMaster = !currentUser || currentUser?.email?.toLowerCase() === 'lmhyeok@naver.com' || currentUser?.role === 'master';

  return (
    <div className="topbar">
      <div className="topbar-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.5px' }}>SELLPAGE AI</span>
        {currentUser && (
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
