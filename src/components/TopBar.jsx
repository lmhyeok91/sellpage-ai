import React from 'react';
import { Key, FileText, FolderOpen, Sparkles } from 'lucide-react';

export default function TopBar({ onOpenApiKeyModal, onOpenKnowledgeModal, onOpenTaskModal, onNewTask }) {
  return (
    <div className="topbar">
      <div className="topbar-title">
        DASHBOARD
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
      </div>
    </div>
  );
}
