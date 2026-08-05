import React from 'react';
import { Lock, Check } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, openaiKey, geminiKey, knowledgeCount, step1Done, step2Done }) {
  const menuItems = [
    { id: 'dashboard', label: '대시보드', num: '01', unlocked: true },
    { id: 'work', label: '상세페이지 작업', num: '02', unlocked: step1Done },
    { id: 'result', label: '결과 확인', num: '03', unlocked: step1Done && step2Done },
    { id: 'webp_promo', label: '마케팅 움짤 생성기', num: '04', unlocked: true },
    { id: 'mp4_fast', label: 'MP4 초고속 변환기', num: '05', unlocked: true }
  ];

  const handleNavClick = (item) => {
    if (item.id === 'work' && !step1Done) {
      alert('🔒 [01 대시보드]에서 1 자료등록과 2 생성설정(AI 상세페이지 생성)을 먼저 작성하고 완료해 주세요!');
      return;
    }
    if (item.id === 'result' && !step1Done) {
      alert('🔒 [01 대시보드]에서 자료등록과 AI 상세페이지 생성을 먼저 작성해 주세요!');
      return;
    }
    if (item.id === 'result' && !step2Done) {
      alert('🔒 [02 상세페이지 작업] 단계를 먼저 확인하고 내보내기 진행해 주세요!');
      return;
    }
    setActiveTab(item.id);
  };

  return (
    <aside className="sidebar">
      <div>
        {/* Brand Header: SellPage AI (셀페이지) */}
        <div className="brand-logo">
          <div className="brand-badge">SP</div>
          <div className="brand-title">
            SellPage AI (셀페이지 3.0)
          </div>
        </div>

        {/* Navigation Menu (01 ~ 05) */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            const isUnlocked = item.unlocked;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                style={{
                  opacity: isUnlocked ? 1 : 0.45,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  position: 'relative'
                }}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {!isUnlocked && <Lock style={{ width: '12px', height: '12px', color: '#94a3b8' }} />}
                  <span>{item.label}</span>
                </div>
                <span className="nav-num">{item.num}</span>
              </button>
            );
          })}
        </nav>

        {/* Status Card */}
        <div className="status-card">
          <div className="status-row">
            <span>Gemini</span>
            <span className={`status-pill ${geminiKey ? 'green' : ''}`}>
              {geminiKey ? '연동 완료' : '키 필요'}
            </span>
          </div>

          <div className="status-row">
            <span>OpenAI Image 2.0</span>
            <span className={`status-pill ${openaiKey ? 'green' : ''}`}>
              {openaiKey ? '연동 완료' : '키 필요'}
            </span>
          </div>

          <div className="status-row">
            <span>사전 지식</span>
            <span className={`status-pill ${knowledgeCount > 0 ? 'green' : ''}`}>
              {knowledgeCount > 0 ? `등록 완료 (${knowledgeCount}개)` : '미등록'}
            </span>
          </div>

          <div className="status-row">
            <span>단계 진행 상태</span>
            <span className={`status-pill ${step1Done ? 'green' : ''}`}>
              {step1Done ? (step2Done ? '03단계 완료' : '02단계 진행중') : '01단계 진행중'}
            </span>
          </div>
        </div>
      </div>

      {/* Version Footer */}
      <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', marginTop: '24px' }}>
        SellPage AI v3.05 (Master Edition)
      </div>
    </aside>
  );
}
