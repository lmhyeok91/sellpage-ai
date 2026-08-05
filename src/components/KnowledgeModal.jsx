import React, { useState } from 'react';
import { FileText, Upload, Trash2, X, Check, HelpCircle } from 'lucide-react';

export default function KnowledgeModal({ 
  isOpen, 
  onClose, 
  files = [], 
  knowledgeFiles, 
  onAddFiles, 
  onDeleteFile, 
  setKnowledgeFiles 
}) {
  const [customText, setCustomText] = useState('');

  if (!isOpen) return null;

  // Safely resolve active files list
  const currentFiles = (knowledgeFiles && Array.isArray(knowledgeFiles)) ? knowledgeFiles : (Array.isArray(files) ? files : []);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = uploadedFiles.map(f => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB'
    }));

    if (onAddFiles) {
      onAddFiles(newFiles);
    } else if (setKnowledgeFiles) {
      setKnowledgeFiles([...currentFiles, ...newFiles]);
    }
  };

  const handleDelete = (id) => {
    if (onDeleteFile) {
      onDeleteFile(id);
    } else if (setKnowledgeFiles) {
      setKnowledgeFiles(currentFiles.filter(f => f.id !== id));
    }
  };

  const handleSave = () => {
    alert(`🎉 총 ${currentFiles.length}개의 사전 지식 파일이 저장 및 적용 완료되었습니다!`);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      {/* Backdrop */}
      <div style={{ flex: 1 }} onClick={onClose}></div>

      {/* Drawer Container */}
      <div style={{
        width: '480px',
        maxWidth: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e2e8f0',
        padding: '32px 28px',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        <div>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#e0f2fe',
              border: '1px solid #bae6fd',
              color: '#0369a1',
              fontSize: '12px',
              fontWeight: '800',
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              <FileText style={{ width: '12px', height: '12px' }} /> 사전 지식 (Knowledge RAG)
            </div>

            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '28px',
                right: '28px',
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
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px 0' }}>
            지식파일 등록 (사전 지식)
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.5' }}>
            AI가 상세페이지 카피를 생성할 때 우선적으로 반영할 내 농가/브랜드 전용 지식 문서를 업로드해 두세요.
          </p>

          {/* Guide Card */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
              <HelpCircle style={{ width: '16px', height: '16px', color: '#0284c7' }} />
              어떤 문서를 넣을 수 있나요?
            </div>
            <ul style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0, paddingLeft: '18px' }}>
              <li><b>농가/브랜드 소개서</b>: 농부 경력, 농법 철학, 유기농 흙 이야기</li>
              <li><b>품질/당도 보증서</b>: 비파괴 당도 센서 모델, Brix 측정 등급표</li>
              <li><b>CS/환불 가이드</b>: 100% 무료 재배송/환불 세부 정책</li>
              <li><b>금지 표현집</b>: 필수 준수사항 및 광고 가이드라인</li>
            </ul>
          </div>

          {/* File Upload Box */}
          <label style={{
            backgroundColor: '#fafbf8',
            border: '2px dashed #cbd5e1',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <Upload style={{ width: '24px', height: '24px', color: '#0284c7', marginBottom: '8px' }} />
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>지식파일 업로드 (.txt, .pdf, .docx, .md)</span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>클릭하거나 문서를 여기에 끌어다 놓으세요</span>
            <input type="file" multiple accept=".txt,.pdf,.docx,.md" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          {/* File List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#475569' }}>
              등록된 지식파일 ({currentFiles.length}개)
            </span>
            {currentFiles.map(file => (
              <div key={file.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText style={{ width: '14px', height: '14px', color: '#0284c7' }} />
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{file.name}</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>({file.size})</span>
                </div>
                <button 
                  onClick={() => handleDelete(file.id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
            ))}
          </div>

          {/* Textarea for Direct Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: '900', color: '#475569', textTransform: 'uppercase' }}>
              또는 직접 지식 메모 입력
            </label>
            <textarea
              rows="4"
              placeholder="예: 우리 농가는 30년 동안 성주 낙동강 연안에서 18Brix 이상 특A급 참외만 당일 수확 출고합니다."
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '12px',
                color: '#0f172a',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Save Action Button */}
        <button 
          onClick={handleSave}
          style={{
            width: '100%',
            marginTop: '24px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '13px',
            padding: '16px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          지식파일 등록 및 적용 완료
        </button>
      </div>
    </div>
  );
}
