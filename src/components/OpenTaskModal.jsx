import React from 'react';
import { FolderOpen, X, Clock, Upload, CheckCircle, ArrowRight } from 'lucide-react';

export default function OpenTaskModal({ isOpen, onClose, onLoadTask }) {
  if (!isOpen) return null;

  const savedTasks = [
    {
      id: 1,
      title: '국내산 흰다리새우 (산지직송 860px)',
      date: '2026-08-05 21:40',
      slidesCount: 26,
      previewInfo: '수산물 / 흰다리새우 / 1년 중 지금이 제철'
    },
    {
      id: 2,
      title: '성주 꿀참외 10kg (18Brix 당도보장)',
      date: '2026-08-04 18:20',
      slidesCount: 26,
      previewInfo: '농산물 / 참외 / 산지직송 당일수확'
    },
    {
      id: 3,
      title: '고당도 샤인머스캣 2kg (특A급 프리미엄)',
      date: '2026-08-03 14:15',
      slidesCount: 26,
      previewInfo: '과일 / 샤인머스캣 / 꼼꼼한 에어팩 포장'
    }
  ];

  const handleJsonFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        alert(`📂 ${file.name} 작업 파일이 성공적으로 불러와졌습니다!`);
        onLoadTask(json);
        onClose();
      } catch (err) {
        alert('올바른 JSON 작업 파일 형식이 아닙니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '560px',
        maxWidth: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            border: 'none',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FolderOpen style={{ width: '22px', height: '22px', color: '#0284c7' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
              기존 작업 열기
            </h2>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              이전에 작업하던 상세페이지 기획안을 불러와 이어받아 작업하세요.
            </p>
          </div>
        </div>

        {/* Local JSON File Import Box */}
        <input 
          type="file" 
          accept=".json" 
          id="open-task-json-input" 
          onChange={handleJsonFileUpload} 
          style={{ display: 'none' }} 
        />
        
        <label 
          htmlFor="open-task-json-input"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px',
            borderRadius: '14px',
            backgroundColor: '#e0f2fe',
            border: '2px dashed #0284c7',
            color: '#0369a1',
            fontWeight: '900',
            fontSize: '13px',
            cursor: 'pointer',
            marginTop: '20px',
            marginBottom: '20px'
          }}
        >
          <Upload style={{ width: '18px', height: '18px' }} />
          📁 내 컴퓨터에서 JSON 작업 백업 파일 열기
        </label>

        {/* Saved Tasks History List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: '900', color: '#475569' }}>
            최근 작업한 기획안 히스토리 목록:
          </span>

          {savedTasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => {
                onLoadTask({ title: task.title });
                onClose();
              }}
              style={{
                backgroundColor: '#fafbf8',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a' }}>{task.title}</span>
                  <span style={{ fontSize: '10px', backgroundColor: '#d1fae5', color: '#059669', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                    {task.slidesCount}컷 완료
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>{task.previewInfo}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
                    <Clock style={{ width: '11px', height: '11px' }} /> {task.date}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '900', color: '#0284c7' }}>
                <span>열기</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
