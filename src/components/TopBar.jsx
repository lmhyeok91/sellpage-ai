import React from 'react';
import { Key, FileText, FolderOpen, Sparkles, LogOut, Crown } from 'lucide-react';

export default function TopBar({ currentUser, onLogout, onOpenApiKeyModal, onOpenKnowledgeModal, onOpenTaskModal, onNewTask }) {
  return (
    <div className="topbar">
      <div className="topbar-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>SELLPAGE AI DASHBOARD</span>
        {currentUser && (
          <span style={{
            fontSize: '11px',
            backgroundColor: currentUser.role === 'master' ? '#fef3c7' : '#e0f2fe',
            color: currentUser.role === 'master' ? '#b45309' : '#0369a1',
            border: currentUser.role === 'master' ? '1px solid #fcd34d' : '1px solid #7dd3fc',
            padding: '3px 10px',
            borderRadius: '20px',
            fontWeight: '900',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {currentUser.role === 'master' && <Crown style={{ width: '12px', height: '12px', color: '#d97706' }} />}
            {currentUser.role === 'master' ? `마스터 (${currentUser.email})` : `사업자 (${currentUser.email})`}
          </span>
        )}
      </div>

      <div className="topbar-actions">
        <button onClick={onOpenApiKeyModal} className="btn-secondary">
          <Key className="w-3.5 h-3.5" /> API 키 설정
        </button>

        <button onClick={onOpenKnowledgeModal} className="btn-secondary">
          <FileText className="w-3.5 h-3.5" /> 지식파일 등록
        </button>

        <button onClick={onOpenTaskModal} className="btn-secondary">
          <FolderOpen className="w-3.5 h-3.5" /> 기존작업 열기
        </button>

        <button onClick={onNewTask} className="btn-primary-black">
          <Sparkles className="w-3.5 h-3.5" /> 새 작업 시작
        </button>

        {currentUser && (
          <button onClick={onLogout} className="btn-secondary" style={{ color: '#ef4444' }}>
            <LogOut className="w-3.5 h-3.5" /> 로그아웃
          </button>
        )}
      </div>
    </div>
  );
}
