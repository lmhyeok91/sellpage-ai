import React, { useState } from 'react';
import { 
  Save, Download, Plus, Copy, ChevronLeft, ChevronRight, 
  Sparkles, Check, Image as ImageIcon, Sliders, X, RefreshCw, User, FileText, Eye, LayoutGrid, Award, Folder, Edit2, Upload, Trash2, Film
} from 'lucide-react';
import WebpGeneratorModal from './WebpGeneratorModal';

export default function Step3Workbench({ slides, setSlides, canvasWidth, onExport }) {
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  
  // WebP Generator Modal State
  const [isWebpModalOpen, setIsWebpModalOpen] = useState(false);

  // Right Panel Tab state: 'image', 'text_edit', or 'guide'
  const [rightTab, setRightTab] = useState('text_edit');

  // Manus AI 3:2 Dual Mode Toggle
  const [isManusMode, setIsManusMode] = useState(true);

  const [activeShotPreset, setActiveShotPreset] = useState('studio');
  const [includeModelCut, setIncludeModelCut] = useState(true);
  const [designGuideCheck, setDesignGuideCheck] = useState(true);
  const [showPromptPreview, setShowPromptPreview] = useState(false);

  // Model Persona States
  const [modelGender, setModelGender] = useState('female'); 
  const [modelAge, setModelAge] = useState('20s'); 
  const [modelCountry, setModelCountry] = useState('korea'); 

  const [activeWidth, setActiveWidth] = useState(780); // 780px (Naver) or 860px (Coupang)
  const [viewMode, setViewMode] = useState('mangoboard'); // 'mangoboard' (Full Detail Page Mode) or 'card' (3:2 Dual Mode)

  const activeWidthValue = activeWidth;
  const safeSlides = (Array.isArray(slides) && slides.length > 0) ? slides : MASTER_26_SLIDES;
  const currentSection = safeSlides[selectedSectionIdx] || safeSlides[0] || MASTER_26_SLIDES[0];

  // Handler to update current slide text properties live!
  const updateCurrentSlide = (field, value) => {
    if (!setSlides) return;
    const updatedSlides = [...safeSlides];
    const targetIdx = Math.min(selectedSectionIdx, updatedSlides.length - 1);
    if (!updatedSlides[targetIdx]) return;
    updatedSlides[targetIdx] = {
      ...updatedSlides[targetIdx],
      [field]: value
    };
    setSlides(updatedSlides);
  };

  // Handler to update specific highlight pill
  const updateHighlightPill = (pillIdx, newValue) => {
    if (!setSlides) return;
    const updatedSlides = [...safeSlides];
    const targetIdx = Math.min(selectedSectionIdx, updatedSlides.length - 1);
    if (!updatedSlides[targetIdx]) return;
    const highlights = updatedSlides[targetIdx].highlights || [];
    const newHighlights = [...highlights];
    newHighlights[pillIdx] = newValue;
    updatedSlides[targetIdx] = { ...updatedSlides[targetIdx], highlights: newHighlights };
    setSlides(updatedSlides);
  };

  // Handler to add a new highlight pill
  const addHighlightPill = () => {
    if (!setSlides) return;
    const updatedSlides = [...safeSlides];
    const targetIdx = Math.min(selectedSectionIdx, updatedSlides.length - 1);
    if (!updatedSlides[targetIdx]) return;
    const highlights = updatedSlides[targetIdx].highlights || [];
    const newHighlights = [...highlights, "새 특징 뱃지"];
    updatedSlides[targetIdx] = { ...updatedSlides[targetIdx], highlights: newHighlights };
    setSlides(updatedSlides);
  };

  // Handler to delete a highlight pill
  const deleteHighlightPill = (pillIdx) => {
    if (!setSlides) return;
    const updatedSlides = [...safeSlides];
    const targetIdx = Math.min(selectedSectionIdx, updatedSlides.length - 1);
    if (!updatedSlides[targetIdx]) return;
    const highlights = updatedSlides[targetIdx].highlights || [];
    const newHighlights = highlights.filter((_, idx) => idx !== pillIdx);
    updatedSlides[targetIdx] = { ...updatedSlides[targetIdx], highlights: newHighlights };
    setSlides(updatedSlides);
  };

  // Handler to apply generated WebP to current section
  const handleApplyWebpToCanvas = (webpFileName) => {
    alert(`✨ [${webpFileName}] 모션 컷이 현재 '${currentSection.section}' 슬라이드에 성공적으로 적용되었습니다!`);
  };

  const sectionFlowTypes = [
    { id: 'storybrand', title: '스토리브랜드 판매 서사', tag: '7~8장', desc: '고객 공감, 문제 제기, 제품 가이드, 해결 계획, 구매 제안, 손실 회피로 이어집니다.', active: true },
    { id: 'resistance', title: '구매저항 최소화형', tag: '추후 공개', desc: '고민, 전환 선언, 비교, 디테일, 근거, FAQ/교시술로 구매 불안을 먼저 제거합니다.', active: false },
    { id: 'scenario', title: '사용 시나리오형', tag: '추후 공개', desc: '상황 질문, 사용 장면, 루틴, 디테일, 구성으로 구매 후 장면을 선명하게 만듭니다.', active: false },
    { id: 'comparison', title: '비교/근거 강화형', tag: '추후 공개', desc: '왜 지금 필요한지, 무엇이 다른지, 이원 근거로 안심할 수 차례로 설득합니다.', active: false }
  ];

  // Manus AI Prompt Reference Generator
  const getCalculatedPrompt = () => {
    const genderText = modelGender === 'female' ? 'Korean female model' : 'Korean male model';
    const ageText = modelAge;
    const countryText = modelCountry === 'korea' ? 'East Asian Korean ethnicity' : modelCountry;
    return `[Manus AI 3:2 Dual Layout Rule + PDF Guide] Photorealistic 8k, 60/40 Split Ratio, ${ageText} ${countryText} ${genderText} holding fresh fruit, zero wordy sentences, short punchy copy: '${currentSection.title}', Mute Lime/Yellow (#FACC15, #15803D), top banner sticker badge '18Brix Guaranteed'.`;
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f7f8f5',
      color: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Pretendard', sans-serif"
    }}>
      {/* WebP Motion Generator Modal Component */}
      <WebpGeneratorModal 
        isOpen={isWebpModalOpen}
        onClose={() => setIsWebpModalOpen(false)}
        onApplyToCanvas={handleApplyWebpToCanvas}
      />

      {/* Top Banner Notice Bar with Manus AI Mode Indicator */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eaece5',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: '800', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
            {isManusMode ? '⭐️ Manus AI 3:2 듀얼 구조 모드 적용 중 (단어 중심 숏카피 + 실시간 문구/이미지 편집 가능)' : '스토리브랜드 판매 서사 흐름으로 설계 중...'}
          </span>

          <button 
            onClick={() => setIsManusMode(!isManusMode)}
            style={{
              fontSize: '11px',
              fontWeight: '900',
              backgroundColor: isManusMode ? '#fef3c7' : '#f1f5f9',
              color: isManusMode ? '#b45309' : '#475569',
              border: isManusMode ? '1px solid #fde68a' : '1px solid #cbd5e1',
              padding: '3px 10px',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <LayoutGrid style={{ width: '12px', height: '12px' }} />
            {isManusMode ? '⚡ Manus AI 3:2 모드 켜짐' : 'Manus AI 모드 켜기'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Prominent WebP Generator Tool Button */}
          <button 
            onClick={() => setIsWebpModalOpen(true)}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontWeight: '900',
              fontSize: '12px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
            }}
          >
            <Film style={{ width: '14px', height: '14px' }} /> 🎞️ WebP 움짤 생성기 켜기
          </button>

          <button style={{
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            fontWeight: '700',
            fontSize: '12px',
            color: '#0f172a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Save style={{ width: '14px', height: '14px' }} /> 작업 저장하기
          </button>
          
          <button onClick={onExport} style={{
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '12px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Download style={{ width: '14px', height: '14px' }} /> 전체 이미지 다운
          </button>
        </div>
      </div>

      {/* Main Workbench 3-Column Layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Column: Section List & Flow (width: 320px) */}
        <aside style={{
          width: '320px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #eaece5',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          overflowY: 'auto',
          flexShrink: 0
        }}>
          {/* Current Section Info Card */}
          <div style={{
            backgroundColor: '#fafbf8',
            border: '1px solid #e2e4dc',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>편집 섹션</span>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>{currentSection.section}</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{currentSection.topic}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '10px', borderTop: '1px solid #e2e4dc', fontSize: '12px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>현재 섹션</span>
                <span style={{ fontWeight: '900', color: '#0f172a' }}>{selectedSectionIdx + 1}/{totalPageCount}</span>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>레이아웃</span>
                <span style={{ fontWeight: '900', color: '#047857' }}>{isManusMode ? '3:2 듀얼 분할' : '통이미지'}</span>
              </div>
            </div>
          </div>

          {/* Next Step Section Flow Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>다음 단계</span>
            <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0 }}>섹션 타입 선택</h4>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>
              히어로를 확인한 뒤 상세페이지 흐름을 고르면 나머지 섹션을 한 번에 생성합니다.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sectionFlowTypes.map((flow) => (
                <div 
                  key={flow.id}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: flow.active ? '1px solid #a7f3d0' : '1px solid #e2e4dc',
                    backgroundColor: flow.active ? '#ecfdf5' : '#fafbf8',
                    color: flow.active ? '#047857' : '#94a3b8',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: '900', marginBottom: '4px' }}>
                    <span>{flow.title}</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: flow.active ? '#a7f3d0' : '#e2e8f0',
                      color: flow.active ? '#047857' : '#64748b'
                    }}>
                      {flow.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', margin: 0, lineHeight: '1.4', opacity: 0.9 }}>{flow.desc}</p>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              backgroundColor: '#6b7280',
              color: '#ffffff',
              fontWeight: '900',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <Sparkles style={{ width: '16px', height: '16px' }} /> 전체 흐름 설계 완료
            </button>
          </div>

          {/* Section List (섹션 목록) */}
          <div style={{ borderTop: '1px solid #eaece5', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a' }}>섹션 목록 (26개)</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button style={{ padding: '6px 10px', backgroundColor: '#fff', border: '1px solid #e2e4dc', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Plus style={{ width: '12px', height: '12px' }} /> 섹션 추가
                </button>
                <button style={{ padding: '6px 10px', backgroundColor: '#fff', border: '1px solid #e2e4dc', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Copy style={{ width: '12px', height: '12px' }} /> 복제
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {safeSlides.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSectionIdx(idx)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: selectedSectionIdx === idx ? '1px solid #0f172a' : '1px solid #e2e4dc',
                    backgroundColor: selectedSectionIdx === idx ? '#0f172a' : '#ffffff',
                    color: selectedSectionIdx === idx ? '#ffffff' : '#334155',
                    fontSize: '12px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      backgroundColor: selectedSectionIdx === idx ? '#334155' : '#f1f5f9',
                      color: selectedSectionIdx === idx ? '#ffffff' : '#64748b',
                      fontSize: '10px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whitespace: 'nowrap', fontSize: '11px', fontWeight: '800' }}>
                      {idx + 1}. {s.section.replace(/^[0-9]+\.\s*/, '')} / {s.topic ? s.topic.replace(/^[0-9]+-[0-9]+\.\s*/, '') : s.title}
                    </span>
                  </div>
                  {selectedSectionIdx === idx && <Check style={{ width: '14px', height: '14px', color: '#34d399' }} />}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Main Canvas Display (flex: 1) */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '0 32px 32px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Strictly Fixed Top Section Navigator Bar */}
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            width: '100%',
            maxWidth: `${canvasWidth}px`,
            backgroundColor: '#f7f8f5',
            padding: '20px 0 12px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #eaece5',
            marginBottom: '20px'
          }}>
            <div>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800' }}>편집 섹션</span>
              <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', margin: '2px 0' }}>{currentSection.section}</h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{currentSection.topic}</p>
            </div>

            {/* Fixed Navigation Buttons with 1/26 Display */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                disabled={selectedSectionIdx === 0}
                onClick={() => setSelectedSectionIdx(Math.max(0, selectedSectionIdx - 1))}
                style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <ChevronLeft style={{ width: '18px', height: '18px' }} />
              </button>

              <span style={{
                fontSize: '13px',
                fontFamily: 'monospace',
                fontWeight: '900',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                borderRadius: '10px',
                color: '#0f172a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                {selectedSectionIdx + 1}/{totalPageCount}
              </span>

              <button 
                disabled={selectedSectionIdx === totalPageCount - 1}
                onClick={() => setSelectedSectionIdx(Math.min(totalPageCount - 1, selectedSectionIdx + 1))}
                style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <ChevronRight style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          </div>

          {/* Width Selector & Canvas Mode Toolbar */}
          <div style={{
            width: `${activeWidthValue}px`,
            maxWidth: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '14px',
            padding: '10px 16px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>📐 가로 해상도:</span>
              <button
                onClick={() => setActiveWidth(780)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: activeWidth === 780 ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                  backgroundColor: activeWidth === 780 ? '#e0f2fe' : '#ffffff',
                  color: activeWidth === 780 ? '#0369a1' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                💚 780px (네이버 스마트스토어 표준)
              </button>

              <button
                onClick={() => setActiveWidth(860)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: activeWidth === 860 ? '1.5px solid #16a34a' : '1px solid #cbd5e1',
                  backgroundColor: activeWidth === 860 ? '#dcfce7' : '#ffffff',
                  color: activeWidth === 860 ? '#15803d' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                🚀 860px (쿠팡 / 오픈마켓 표준)
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => setViewMode('mangoboard')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: viewMode === 'mangoboard' ? '1.5px solid #0f172a' : '1px solid #cbd5e1',
                  backgroundColor: viewMode === 'mangoboard' ? '#0f172a' : '#ffffff',
                  color: viewMode === 'mangoboard' ? '#ffffff' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                🎨 망고보드 상세페이지 템플릿 모드
              </button>
              <button
                onClick={() => setViewMode('card')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: viewMode === 'card' ? '1.5px solid #0f172a' : '1px solid #cbd5e1',
                  backgroundColor: viewMode === 'card' ? '#0f172a' : '#ffffff',
                  color: viewMode === 'card' ? '#ffffff' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                🖼️ 3:2 카드 모드
              </button>
            </div>
          </div>

          {/* Recommended Reference Asset Banner */}
          {currentSection.recommendedAssets && (
            <div style={{
              width: `${activeWidthValue}px`,
              maxWidth: '100%',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '14px',
              padding: '10px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#1e40af'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Folder style={{ width: '16px', height: '16px', color: '#2563eb', flexShrink: 0 }} />
                <span style={{ fontWeight: '900' }}>추천 매칭 자산:</span>
                <span style={{ fontWeight: '700', color: '#1e3a8a' }}>
                  {currentSection.recommendedAssets.join(' | ')}
                </span>
              </div>
              <span style={{ fontSize: '10px', backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '10px', fontWeight: '800' }}>
                분석 매칭 완료
              </span>
            </div>
          )}

          {/* 780px / 860px Live Interactive Canvas Area */}
          <div style={{
            width: `${activeWidthValue}px`,
            maxWidth: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid #cbd5e1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '620px',
            transition: 'width 0.2s ease'
          }}>
            {viewMode === 'mangoboard' ? (
              /* MangoBoard Style Full Vertical E-Commerce Detail Page Layout */
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '600px', backgroundColor: '#ffffff' }}>
                {/* Header Banner Badge */}
                <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ backgroundColor: '#059669', color: '#ffffff', fontSize: '11px', fontWeight: '900', padding: '3px 10px', borderRadius: '12px' }}>
                      {currentSection.page}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '800' }}>
                      {selectedSectionIdx + 1}. {currentSection.section ? currentSection.section.replace(/^[0-9]+\.\s*/, '') : ''} / {currentSection.topic ? currentSection.topic.replace(/^[0-9]+-[0-9]+\.\s*/, '') : ''}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    가로 {activeWidthValue}px 표준 렌더링
                  </span>
                </div>

                {/* Hero Visual Banner Section */}
                <div style={{
                  padding: '36px 32px 28px 32px',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #ffffff 100%)',
                  borderBottom: '1px solid #e2e8f0',
                  position: 'relative'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: '900', color: '#059669', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    PREMIUM DETAIL PAGE BLUEPRINT
                  </div>

                  {/* LIVE EDITABLE TITLE */}
                  <input 
                    type="text"
                    value={currentSection.title}
                    onChange={e => updateCurrentSlide('title', e.target.value)}
                    style={{
                      width: '100%',
                      fontSize: '32px',
                      fontWeight: '900',
                      color: '#0f172a',
                      lineHeight: '1.25',
                      marginBottom: '12px',
                      backgroundColor: 'transparent',
                      border: '1px dashed transparent',
                      borderRadius: '8px',
                      outline: 'none',
                      padding: '4px'
                    }}
                    className="hover:border-emerald-400 focus:border-emerald-600 focus:bg-white transition"
                    title="클릭하여 헤드라인 직접 수정"
                  />

                  {/* LIVE EDITABLE SUBTITLE */}
                  <textarea 
                    rows="2"
                    value={currentSection.subtitle}
                    onChange={e => updateCurrentSlide('subtitle', e.target.value)}
                    style={{
                      width: '100%',
                      fontSize: '15px',
                      color: '#475569',
                      fontWeight: '700',
                      lineHeight: '1.5',
                      marginBottom: '20px',
                      backgroundColor: 'transparent',
                      border: '1px dashed transparent',
                      borderRadius: '8px',
                      outline: 'none',
                      padding: '4px',
                      resize: 'none'
                    }}
                    className="hover:border-emerald-400 focus:border-emerald-600 focus:bg-white transition"
                    title="클릭하여 서브 설명 직접 수정"
                  />

                  {/* Highlights Badge Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {currentSection?.highlights && currentSection.highlights.map((hl, i) => (
                      <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#ffffff', border: '1.5px solid #10b981', borderRadius: '20px', padding: '4px 12px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                        <Check style={{ width: '14px', height: '14px', color: '#059669' }} />
                        <input 
                          type="text"
                          value={hl}
                          onChange={e => updateHighlightPill(i, e.target.value)}
                          style={{
                            fontSize: '12px',
                            fontWeight: '800',
                            color: '#047857',
                            border: 'none',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            width: `${Math.max(70, hl.length * 12)}px`
                          }}
                        />
                        <button onClick={() => deleteHighlightPill(i)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>×</button>
                      </div>
                    ))}
                    <button onClick={addHighlightPill} style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '20px', border: '1px dashed #64748b', backgroundColor: '#fff', color: '#475569', cursor: 'pointer', fontWeight: '800' }}>
                      + 뱃지 추가
                    </button>
                  </div>
                </div>

                {/* MangoBoard Graphic Cards & Image Display Area */}
                <div style={{ padding: '24px 32px', backgroundColor: '#ffffff', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Feature Card Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Trust Card 1 */}
                    <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900', shrink: 0 }}>
                        18B
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a' }}>18Brix 비파괴 검수 완료</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>산지 1:1 센서 당도 98% 검증</div>
                      </div>
                    </div>

                    {/* Trust Card 2 */}
                    <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900', shrink: 0 }}>
                        24H
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a' }}>24시간 당일수확 출고</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>새벽 5시 수확 ➔ 당일 직송</div>
                      </div>
                    </div>
                  </div>

                  {/* Asset & Motion Generator Action Bar */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#475569' }}>🎬 섹션 연동 미디어:</span>
                      <span style={{ fontSize: '11px', backgroundColor: '#f1f5f9', color: '#334155', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                        {currentSection.recommendedAssets?.[0] || '샤인머스캣_대표컷.png'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => setIsWebpModalOpen(true)} style={{ padding: '8px 16px', backgroundColor: '#0284c7', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 6px rgba(2, 132, 199, 0.2)' }}>
                        <Film style={{ width: '14px', height: '14px' }} /> WebP 움짤 생성
                      </button>
                      <button onClick={() => setRightTab('image')} style={{ padding: '8px 16px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.2)' }}>
                        <Upload style={{ width: '14px', height: '14px' }} /> 이미지 변경
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Full Visual Poster Mode */
              <div style={{
                padding: '36px',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '480px'
              }}>
                <div>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(8px)',
                    color: '#fcd34d',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '12px',
                    fontWeight: '900',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    marginBottom: '16px'
                  }}>
                    {currentSection.badge}
                  </span>

                  <input 
                    type="text"
                    value={currentSection.title}
                    onChange={e => updateCurrentSlide('title', e.target.value)}
                    style={{
                      width: '100%',
                      fontSize: '32px',
                      fontWeight: '900',
                      lineHeight: '1.2',
                      marginBottom: '12px',
                      color: '#ffffff',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none'
                    }}
                  />

                  <textarea 
                    rows="2"
                    value={currentSection.subtitle}
                    onChange={e => updateCurrentSlide('subtitle', e.target.value)}
                    style={{
                      width: '100%',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: '1.6',
                      maxWidth: '520px',
                      margin: '0 0 24px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  margin: '16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '48px' }}>🍇</span>
                    <span style={{ fontWeight: '900', fontSize: '16px' }}>청포도 · 알맹이까지 보고 고르세요</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>송이와 단면이 함께 보이는 싱그러운 첫인상</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  {currentSection.highlights.map((hl, i) => (
                    <span key={i} style={{
                      fontSize: '11px',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: '#fef08a',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: '800',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Check style={{ width: '12px', height: '12px' }} /> {hl}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Status Bar under Canvas */}
            <div style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#334155'
            }}>
              <span style={{ fontWeight: '800' }}>
                {isManusMode ? '⭐️ Manus AI 3:2 듀얼 비주얼 모드 (실시간 한글/이미지 편집 가능)' : '데이터 편집 - 통이미지 모드'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '11px' }}>이미지 준비 완료</span>
                <span style={{ backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '11px' }}>생성됨 {selectedSectionIdx + 1}/{totalPageCount}</span>
                <button onClick={() => setRightPanelOpen(!rightPanelOpen)} style={{ backgroundColor: '#0f172a', color: '#fff', fontWeight: '800', padding: '4px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '11px' }}>
                  옵션 패널 {rightPanelOpen ? '열림' : '닫힘'}
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Column: Canvas Workbench Options Panel (width: 320px) */}
        {rightPanelOpen && (
          <aside style={{
            width: '320px',
            backgroundColor: '#ffffff',
            borderLeft: '1px solid #eaece5',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            overflowY: 'auto',
            flexShrink: 0
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', borderBottom: '1px solid #eaece5', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>CANVAS WORKBENCH</span>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '2px 0 0 0' }}>
                  {rightTab === 'text_edit' ? '한글 문구 실시간 수정' : rightTab === 'image' ? '이미지 및 자산 수정' : '섹션 가이드'}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>오른쪽 고정</span>
                <button onClick={() => setRightPanelOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>

            {/* Quick WebP Tool Trigger Bar */}
            <div 
              onClick={() => setIsWebpModalOpen(true)}
              style={{
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '12px',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Film style={{ width: '16px', height: '16px', color: '#0284c7' }} />
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#0369a1' }}>WebP 움짤 변환기 켜기</span>
              </div>
              <span style={{ fontSize: '10px', backgroundColor: '#0284c7', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>실행</span>
            </div>

            {/* Tabs: 문구 수정 | 이미지 | 가이드 */}
            <div style={{ backgroundColor: '#fafbf8', border: '1px solid #e2e4dc', padding: '4px', borderRadius: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', fontSize: '11px' }}>
              <button 
                onClick={() => setRightTab('text_edit')}
                style={{
                  padding: '8px 4px',
                  borderRadius: '8px',
                  backgroundColor: rightTab === 'text_edit' ? '#0f172a' : 'transparent',
                  fontWeight: '900',
                  color: rightTab === 'text_edit' ? '#ffffff' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Edit2 style={{ width: '12px', height: '12px' }} /> 문구수정
              </button>

              <button 
                onClick={() => setRightTab('image')}
                style={{
                  padding: '8px 4px',
                  borderRadius: '8px',
                  backgroundColor: rightTab === 'image' ? '#e0f2fe' : 'transparent',
                  fontWeight: '900',
                  color: rightTab === 'image' ? '#0369a1' : '#64748b',
                  border: rightTab === 'image' ? '1px solid #bae6fd' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <ImageIcon style={{ width: '12px', height: '12px' }} /> 이미지
              </button>

              <button 
                onClick={() => setRightTab('guide')}
                style={{
                  padding: '8px 4px',
                  borderRadius: '8px',
                  backgroundColor: rightTab === 'guide' ? '#e0f2fe' : 'transparent',
                  fontWeight: '900',
                  color: rightTab === 'guide' ? '#0369a1' : '#64748b',
                  border: rightTab === 'guide' ? '1px solid #bae6fd' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Sliders style={{ width: '12px', height: '12px' }} /> 가이드
              </button>
            </div>

            {/* TAB CONTENT A: 문구수정 TAB */}
            {rightTab === 'text_edit' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ backgroundColor: '#fafbf8', border: '1px solid #e2e4dc', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a' }}>✏️ 헤드라인 한글 문구 수정</span>
                  <input 
                    type="text"
                    value={currentSection.title}
                    onChange={e => updateCurrentSlide('title', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      fontWeight: '800',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ backgroundColor: '#fafbf8', border: '1px solid #e2e4dc', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a' }}>📝 서브 설명 문구 수정</span>
                  <textarea 
                    rows="3"
                    value={currentSection.subtitle}
                    onChange={e => updateCurrentSlide('subtitle', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      color: '#0f172a',
                      outline: 'none',
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ backgroundColor: '#fafbf8', border: '1px solid #e2e4dc', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a' }}>🏷️ 핵심 특징 뱃지 문구 수정</span>
                  {currentSection.highlights.map((hl, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input 
                        type="text"
                        value={hl}
                        onChange={e => updateHighlightPill(i, e.target.value)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '12px',
                          fontWeight: '700',
                          outline: 'none'
                        }}
                      />
                      <button onClick={() => deleteHighlightPill(i)} style={{ border: 'none', background: '#fee2e2', color: '#ef4444', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: '800' }}>
                        삭제
                      </button>
                    </div>
                  ))}

                  <button onClick={addHighlightPill} style={{ marginTop: '6px', padding: '10px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px dashed #0284c7', color: '#0284c7', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}>
                    + 새 뱃지 문구 추가하기
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT B: 가이드 TAB */}
            {rightTab === 'guide' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ backgroundColor: '#fafbf8', border: '1px solid #e2e4dc', borderRadius: '14px', padding: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '4px' }}>Guide Mode</span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Manus AI 3:2 듀얼 구조 우선</span>
                </div>

                <div style={{ backgroundColor: '#fafbf8', border: '1px solid #e2e4dc', borderRadius: '14px', padding: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '4px' }}>Image Purpose</span>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                    온라인 과일 선택에서 겉모습만으로 판단하기 어려운 망설임을 보여준다.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT C: 이미지 TAB */}
            {rightTab === 'image' && (
              <>
                {/* Shot Presets */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '12px' }}>
                  <button 
                    onClick={() => setActiveShotPreset('studio')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: '800',
                      backgroundColor: activeShotPreset === 'studio' ? '#0f172a' : '#fafbf8',
                      color: activeShotPreset === 'studio' ? '#ffffff' : '#334155',
                      border: activeShotPreset === 'studio' ? '1px solid #0f172a' : '1px solid #e2e4dc',
                      cursor: 'pointer'
                    }}
                  >
                    스튜디오컷
                  </button>

                  <button 
                    onClick={() => setActiveShotPreset('product')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: '800',
                      backgroundColor: activeShotPreset === 'product' ? '#0f172a' : '#fafbf8',
                      color: activeShotPreset === 'product' ? '#ffffff' : '#334155',
                      border: activeShotPreset === 'product' ? '1px solid #0f172a' : '1px solid #e2e4dc',
                      cursor: 'pointer'
                    }}
                  >
                    모델없이 제품 중심
                  </button>

                  <button 
                    onClick={() => setActiveShotPreset('design')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: '800',
                      backgroundColor: activeShotPreset === 'design' ? '#0f172a' : '#fafbf8',
                      color: activeShotPreset === 'design' ? '#ffffff' : '#334155',
                      border: activeShotPreset === 'design' ? '1px solid #0f172a' : '1px solid #e2e4dc',
                      cursor: 'pointer'
                    }}
                  >
                    디자인 가이드 우선
                  </button>
                </div>

                {/* Upload / Swap Image Button Box */}
                <div style={{ backgroundColor: '#fafbf8', border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                  <Upload style={{ width: '24px', height: '24px', color: '#0284c7', marginBottom: '8px' }} />
                  <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '4px' }}>내 상품 사진으로 이미지 교체</span>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '12px' }}>클릭하여 원하는 과일 이미지 파일 선택</span>
                  <button onClick={() => alert('📁 PC의 이미지 파일로 교체할 수 있습니다.')} style={{ padding: '8px 16px', borderRadius: '10px', backgroundColor: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                    파일 선택 및 이미지 교체
                  </button>
                </div>

                {/* Action Regenerate Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '14px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontWeight: '900',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <RefreshCw style={{ width: '16px', height: '16px' }} /> 이미지 다시 만들기
                  </button>
                </div>
              </>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
