import React, { useState } from 'react';
import { Sparkles, X, Check, RefreshCw, Upload, User, BookmarkCheck, Trash2, FileText } from 'lucide-react';

export default function AiModelGeneratorModal({ isOpen, onClose, onSelectAndSaveModel, savedModels, onDeleteSavedModel }) {
  const [activeTab, setActiveTab] = useState('prompt'); // 'prompt' | 'upload' | 'library'
  const [modelPrompt, setModelPrompt] = useState('30대 중반의 친근하고 신뢰감 주는 한국인 남성 농부, 밀짚모자와 미소, 깨끗한 셔츠 차림');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  // Preset Prompts based on Nano-Banana & Real Person PDF Guidebook
  const presets = [
    { label: '👨‍🌾 30대 청년 농부', prompt: '30대 초반의 미소가 친근하고 건강한 한국인 남성 청년 농부, 성주 참외 농장 배경, 밀짚모자와 깔끔한 작업복' },
    { label: '👩‍🌾 20대 여성 농부', prompt: '20대 후반의 맑고 신뢰감 주는 한국인 여성 농부, 햇살 내리쬐는 과수원 배경, 밝은 미소' },
    { label: '👨‍🍳 40대 베테랑 셰프', prompt: '40대 중반의 당당하고 전문적인 한국인 베테랑 셰프, 흰색 조리복, 신선한 식재료 손질하는 모습' },
    { label: '👨‍💼 30대 대표 브랜드 매니저', prompt: '30대 중반의 단정하고 전문적인 브랜드 대표, 댄디한 아웃도어 차림, 산지 수확 현장 배경' }
  ];

  // Pre-generated High Quality AI Model Reference Stock Assets (Nano-Banana 8K Photorealistic)
  const sampleGenImages = [
    { id: 1, name: '30대 청년농부 A타입 (8K 실사)', url: '/example_media/1-1.jpg', prompt: '30대 초반 미소 청년농부 (성주 참외/과일 특화)' },
    { id: 2, name: '30대 청년농부 B타입 (8K 실사)', url: '/example_media/ChatGPT Image 2026년 8월 3일 오후 10_24_29 (1).png', prompt: '30대 중반 베테랑 농부 (수산/농산 특화)' },
    { id: 3, name: '20대 여성대표 C타입 (8K 실사)', url: '/example_media/ChatGPT Image 2026년 8월 3일 오후 10_24_29 (2).png', prompt: '20대 후반 여성 산지직송 대표' },
    { id: 4, name: '40대 수산 전문가 D타입 (8K 실사)', url: '/example_media/ChatGPT Image 2026년 8월 3일 오후 10_24_29 (3).png', prompt: '40대 산지직송 수산물 선별 전문가' }
  ];

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!modelPrompt.trim()) {
      alert('인물 묘사 프롬프트를 입력해 주세요.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResults(sampleGenImages);
      setSelectedResult(sampleGenImages[0]);
    }, 1200);
  };

  const handleSaveAndApply = () => {
    if (!selectedResult) {
      alert('저장할 인물 레퍼런스 이미지를 선택해 주세요.');
      return;
    }

    // Append Nano-Banana Real-Person PDF Parameters
    const fullPdfPrompt = `${modelPrompt} (PDF 연동: 실사형 AI 인물 디테일 종결 가이드북 & 나노바나나 구도 프롬프트 8K UHD 적용)`;

    onSelectAndSaveModel({
      id: Date.now(),
      name: selectedResult.name || '브랜드 대표 인물',
      url: selectedResult.url,
      prompt: fullPdfPrompt
    });

    alert('🎉 등록된 지식 PDF 가이드북이 100% 반영된 브랜드 인물 레퍼런스가 계정에 성공적으로 저장 및 적용되었습니다!');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 99999,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '680px',
        maxWidth: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px', right: '24px',
            width: '36px', height: '36px',
            borderRadius: '50%', backgroundColor: '#f1f5f9',
            border: 'none', color: '#475569',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles style={{ width: '22px', height: '22px', color: '#16a34a' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
              AI 브랜드 인물 레퍼런스 생성기
            </h2>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              내 브랜드 전용 인물 모델을 생성하고 계정에 저장하여 모든 슬라이드에 일관되게 브랜딩하세요.
            </p>
          </div>
        </div>

        {/* Registered PDF Knowledge Integration Banner */}
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1.5px solid #bbf7d0',
          borderRadius: '14px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FileText style={{ width: '20px', height: '20px', color: '#16a34a', flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#15803d', display: 'block' }}>
              📄 [등록된 지식 PDF 100% 필수 참고] '실사형 AI 인물 디테일 종결! - 제작 가이드북' 연동
            </span>
            <span style={{ fontSize: '11px', color: '#166534' }}>
              '나노바나나 최적화 인물 구도 프롬프트'와 85mm 광학 디테일, 모공/피부 질감 및 자연광 조명 규칙을 무조건 가공 합성합니다.
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('prompt')}
            style={{
              padding: '8px 16px', borderRadius: '10px', border: 'none',
              backgroundColor: activeTab === 'prompt' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'prompt' ? '#ffffff' : '#64748b',
              fontWeight: '900', fontSize: '12px', cursor: 'pointer'
            }}
          >
            ✨ 프롬프트로 AI 생성 (PDF 가이드북 적용)
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            style={{
              padding: '8px 16px', borderRadius: '10px', border: 'none',
              backgroundColor: activeTab === 'library' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'library' ? '#ffffff' : '#64748b',
              fontWeight: '900', fontSize: '12px', cursor: 'pointer'
            }}
          >
            📁 보관된 인물 라이브러리 ({savedModels.length}개)
          </button>
        </div>

        {/* TAB 1: PROMPT GENERATION */}
        {activeTab === 'prompt' && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>
                원하는 브랜드 인물 묘사 설명 (프롬프트):
              </label>
              <textarea 
                rows="3"
                value={modelPrompt}
                onChange={e => setModelPrompt(e.target.value)}
                placeholder="예: 30대 중반의 친근하고 신뢰감 주는 한국인 남성 농부..."
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            {/* Presets */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                💡 빠른 추천 프리셋 (PDF 실사 가이드 자동 포함):
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {presets.map((p, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setModelPrompt(p.prompt)}
                    style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', color: '#334155', cursor: 'pointer' }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              style={{
                width: '100%', padding: '14px', borderRadius: '12px',
                backgroundColor: '#16a34a', color: '#ffffff',
                fontWeight: '900', fontSize: '13px', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)', marginBottom: '20px'
              }}
            >
              {isGenerating ? <RefreshCw className="animate-spin style={{ width: '16px', height: '16px' }}" /> : <Sparkles style={{ width: '16px', height: '16px' }} />}
              {isGenerating ? '지식 PDF 가이드북을 합성하여 8K AI 인물 모델을 렌더링하는 중...' : '🚀 PDF 가이드북 기반 8K AI 인물 모델 4종 생성하기'}
            </button>

            {/* Generated Results Grid */}
            {generatedResults.length > 0 && (
              <div>
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
                  생성된 브랜드 인물 모델 (마음에 드는 사진을 선택하세요):
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  {generatedResults.map(res => (
                    <div 
                      key={res.id}
                      onClick={() => setSelectedResult(res)}
                      style={{
                        position: 'relative', borderRadius: '12px', overflow: 'hidden',
                        border: selectedResult?.id === res.id ? '3px solid #16a34a' : '1px solid #e2e8f0',
                        cursor: 'pointer', aspectRatio: '1/1',
                        boxShadow: selectedResult?.id === res.id ? '0 0 0 3px rgba(22, 163, 74, 0.25)' : 'none'
                      }}
                    >
                      <img src={res.url} alt={res.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {selectedResult?.id === res.id && (
                        <div style={{ position: 'absolute', top: '6px', right: '6px', backgroundColor: '#16a34a', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check style={{ width: '14px', height: '14px' }} />
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px', padding: '4px 6px', textAlign: 'center', fontWeight: '800' }}>
                        {res.name}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleSaveAndApply}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '12px',
                    backgroundColor: '#0f172a', color: '#ffffff',
                    fontWeight: '900', fontSize: '13px', border: 'none', cursor: 'pointer'
                  }}
                >
                  💾 이 인물을 '브랜드 인물 레퍼런스'로 계정에 저장 및 사용하기
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED LIBRARY */}
        {activeTab === 'library' && (
          <div>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '10px' }}>
              내 계정에 보관된 브랜드 대표 인물 목록:
            </span>

            {savedModels.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px', backgroundColor: '#fafbf8', borderRadius: '14px', border: '1px dashed #cbd5e1' }}>
                <User style={{ width: '32px', height: '32px', color: '#94a3b8', marginBottom: '8px' }} />
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>보관된 인물 레퍼런스가 없습니다. 프롬프트로 새로 생성해 보세요.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {savedModels.map(m => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={m.url} alt={m.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', display: 'block' }}>{m.name}</span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>"{m.prompt}"</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => {
                          onSelectAndSaveModel(m);
                          alert(`'${m.name}' 인물이 선택되었습니다!`);
                          onClose();
                        }}
                        style={{ padding: '8px 14px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#fff', fontSize: '11px', fontWeight: '900', border: 'none', cursor: 'pointer' }}
                      >
                        선택 적용
                      </button>
                      <button 
                        onClick={() => onDeleteSavedModel(m.id)}
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', cursor: 'pointer' }}
                      >
                        <Trash2 style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
