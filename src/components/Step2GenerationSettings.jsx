import React, { useState } from 'react';
import { Edit3, AlertTriangle, Sparkles, Check } from 'lucide-react';

export default function Step2GenerationSettings({
  productImages,
  modelImages,
  additionalInfo,
  reviewFile,
  geminiKey,
  openaiKey,
  onEditMaterial,
  onGenerateHero
}) {
  const [outputMode, setOutputMode] = useState('tong'); // 'tong' or 'text'
  const [selectedAiModel, setSelectedAiModel] = useState('gemini'); // 'gemini' or 'openai'
  const [selectedTone, setSelectedTone] = useState('auto');
  const [selectedRatio, setSelectedRatio] = useState('mobile_vertical');

  const tones = [
    { id: 'auto', label: 'AI 자동 추천' },
    { id: 'premium', label: '프리미엄' },
    { id: 'modern', label: '모던' },
    { id: 'tech', label: '테크' },
    { id: 'minimal', label: '미니멀' },
    { id: 'popart', label: '팝아트' },
    { id: 'insta', label: '인스타감성' },
    { id: 'retro', label: '레트로' }
  ];

  const ratios = [
    { id: 'square', label: '정방형', desc: '썸네일, 마켓 대표 이미지', icon: '🔲' },
    { id: 'normal_vertical', label: '일반 세로', desc: '상세페이지 기본형', icon: '📱' },
    { id: 'mobile_vertical', label: '모바일 세로', desc: '모바일 집중형 상세페이지', icon: '📱' },
    { id: 'normal_horizontal', label: '일반 가로', desc: '배너, 중간 섹션 컷', icon: '🖥️' },
    { id: 'wide', label: '와이드', desc: '히어로 배너형', icon: '📺' }
  ];

  const isCurrentModelKeySet = selectedAiModel === 'gemini' ? !!geminiKey : !!openaiKey;

  return (
    <div className="form-container">
      {/* Header */}
      <div className="card-section">
        <div className="card-header">
          <div className="badge-num" style={{ background: '#000', color: '#fff' }}>2</div>
          <div className="card-title-group">
            <h2 className="card-title">생성 설정</h2>
            <p className="card-desc">
              먼저 히어로 우 1장을 만든 뒤, 결과를 보고 상세페이지 섹션 타입을 고를 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Section A: 등록 자료 */}
      <div className="card-section">
        <div style={{ display: 'flex', itemsCenter: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', display: 'block' }}>등록 자료</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>첫 화면에서 등록한 자료를 기준으로 생성합니다.</span>
          </div>

          <button onClick={onEditMaterial} className="btn-secondary">
            <Edit3 style={{ width: '13px', height: '13px' }} /> 자료 수정
          </button>
        </div>

        <div className="data-summary-grid">
          {/* Card 1: 분석 자료 */}
          <div className="summary-card">
            <span className="summary-label">분석 자료</span>
            <span className="summary-val">
              {productImages.length > 0 ? `${productImages[0].name.slice(0, 12)}...` : '등록 안 함'}
            </span>
            <span className="summary-sub">
              {productImages.length > 0 ? `제품 이미지 ${productImages.length}장` : ''}
            </span>
          </div>

          {/* Card 2: 모델 이미지 */}
          <div className="summary-card">
            <span className="summary-label">모델 이미지</span>
            <span className="summary-val">
              {modelImages.length > 0 ? `모델컷 ${modelImages.length}장` : '등록 안 함'}
            </span>
          </div>

          {/* Card 3: 추가 정보 */}
          <div className="summary-card">
            <span className="summary-label">추가 정보</span>
            <span className="summary-val">
              {additionalInfo.trim() ? `${additionalInfo.slice(0, 10)}...` : '비워둠'}
            </span>
          </div>

          {/* Card 4: 고객 후기 */}
          <div className="summary-card">
            <span className="summary-label">고객 후기</span>
            <span className="summary-val">
              {reviewFile ? reviewFile.slice(0, 10) : '등록 안 함'}
            </span>
          </div>
        </div>
      </div>

      {/* Section B: 출력 방식 */}
      <div className="card-section">
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', display: 'block' }}>출력 방식</span>
        
        <div className="options-grid-2">
          <div
            onClick={() => setOutputMode('tong')}
            className={`option-box ${outputMode === 'tong' ? 'active' : ''}`}
          >
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', marginBottom: '4px' }}>통이미지 모드</div>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>카피와 디자인까지 이미지 안에 포함된 섹션으로 만듭니다.</p>
            <span style={{ fontSize: '10px', fontWeight: '700', background: '#f1f5f9', color: '#334155', padding: '2px 8px', borderRadius: '4px' }}>
              Gemini · OpenAI 지원
            </span>
          </div>

          <div className="option-box" style={{ opacity: 0.6 }}>
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#64748b', marginBottom: '4px' }}>텍스트편집 모드</div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>이번 버전에서는 통이미지 모드 중심으로 먼저 제공합니다.</p>
            <span style={{ fontSize: '10px', fontWeight: '700', background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px' }}>
              🔑 어드밴스드 전용
            </span>
          </div>
        </div>
      </div>

      {/* Section C: AI 모델 */}
      <div className="card-section">
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', display: 'block' }}>AI 모델</span>

        <div className="options-grid-2">
          {/* Gemini Model Card */}
          <div
            onClick={() => setSelectedAiModel('gemini')}
            className={`option-box ${selectedAiModel === 'gemini' ? 'active' : ''}`}
          >
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles style={{ width: '16px', height: '16px', color: '#f59e0b' }} /> Gemini
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>Gemini 분석과 이미지 생성 경로</p>
            
            <span style={{
              fontSize: '10px',
              fontWeight: '800',
              backgroundColor: geminiKey ? '#dcfce7' : '#000000',
              color: geminiKey ? '#15803d' : '#ffffff',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {geminiKey ? '연동 완료' : 'API 키 필요'}
            </span>
          </div>

          {/* OpenAI Model Card (GPT-5.4 mini + GPT Image 2 / Medium) */}
          <div
            onClick={() => setSelectedAiModel('openai')}
            className={`option-box ${selectedAiModel === 'openai' ? 'active' : ''}`}
          >
            <div style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', marginBottom: '4px' }}>
              🤖 OpenAI (GPT-5.4 mini + GPT Image 2 / Medium)
            </div>
            <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px', lineHeight: '1.4' }}>
              문구: <b>GPT-5.4 mini</b> · 사진 배경: <b>GPT Image 2 / Medium</b>
            </p>

            <span style={{
              fontSize: '10px',
              fontWeight: '800',
              backgroundColor: openaiKey ? '#dcfce7' : '#000000',
              color: openaiKey ? '#15803d' : '#ffffff',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {openaiKey ? '연동 완료' : 'API 키 필요'}
            </span>
          </div>
        </div>

        {/* Dynamic Status / Warning Banner */}
        {isCurrentModelKeySet ? (
          <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', fontSize: '12px', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
            <Check style={{ width: '16px', height: '16px', flexShrink: 0 }} />
            <span>✅ {selectedAiModel === 'gemini' ? 'Gemini' : 'OpenAI'} API 키가 정상적으로 연동되어 생성이 가능합니다!</span>
          </div>
        ) : (
          <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', fontSize: '12px', padding: '12px 16px', borderRadius: '12px', display: 'flex', itemsCenter: 'center', gap: '8px', fontWeight: '700' }}>
            <AlertTriangle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
            <span>⚠️ {selectedAiModel === 'gemini' ? 'Gemini' : 'OpenAI'}를 사용하려면 설정에서 해당 API 키를 저장해 주세요.</span>
          </div>
        )}
      </div>

      {/* Section D: 원하는 톤 */}
      <div className="card-section">
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', display: 'block' }}>원하는 톤</span>

        <div className="tone-pills">
          {tones.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTone(t.id)}
              className={`tone-pill ${selectedTone === t.id ? 'active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section E: 이미지 비율 */}
      <div className="card-section">
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', display: 'block' }}>이미지 비율</span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {ratios.map(r => (
            <div
              key={r.id}
              onClick={() => setSelectedRatio(r.id)}
              className={`option-box ${selectedRatio === r.id ? 'active' : ''}`}
            >
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>
                <span>{r.icon}</span> {r.label}
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
        <button
          onClick={onGenerateHero}
          style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '13px',
            padding: '14px 32px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
          }}
        >
          🪄 통이미지 모드로 히어로 1장 만들기
        </button>
      </div>
    </div>
  );
}
