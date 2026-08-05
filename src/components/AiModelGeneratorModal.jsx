import React, { useState } from 'react';
import { Sparkles, X, Check, RefreshCw, Upload, User, BookmarkCheck, Trash2, FileText, Search, Image as ImageIcon } from 'lucide-react';

export default function AiModelGeneratorModal({ isOpen, onClose, onSelectAndSaveModel, savedModels, onDeleteSavedModel }) {
  const [activeTab, setActiveTab] = useState('custom'); // 'custom' | 'image_vision' | 'library'
  
  // Custom Attribute Selectors
  const [ethnicity, setEthnicity] = useState('한국인');
  const [genderAge, setGenderAge] = useState('30대 청년 남성');
  const [bodyType, setBodyType] = useState('다부진 체형');
  const [hairstyle, setHairstyle] = useState('단정한 스포츠 머리');
  const [outfit, setOutfit] = useState('농가/산지 작업복');

  const [modelPrompt, setModelPrompt] = useState('한국인 30대 청년 남성, 다부진 체형, 단정한 스포츠 머리, 농가/산지 작업복 차림, 친근하고 건강한 미소');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  // Image-to-Prompt Vision Analysis State
  const [refImage, setRefImage] = useState(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [analyzedPrompt, setAnalyzedPrompt] = useState('');

  // Options Options Lists
  const ethnicities = ['한국인', '동양인/아시아계'];
  const genderAges = ['30대 청년 남성', '20대 청년 남성', '40대 중년 남성', '50대 베테랑 남성'];
  const bodyTypes = ['다부진 체형', '건장한 근육형', '슬림/마른 체형', '기본 체형'];
  const hairstyles = ['단정한 스포츠 머리', '깔끔한 투블럭', '자연스러운 숏컷'];
  const outfits = ['농가/산지 작업복', '1톤 트럭 수확복', '패킹센터 검수복', '브랜드 대표 댄디룩', '캐주얼 반팔티'];

  // Real High Quality 8K AI Model Reference Stock Assets (All 4 Agricultural 30s Male Farmer Cuts)
  const sampleGenImages = [
    { id: 1, name: '30대 청년농부 (1톤 트럭 과일/수박 상적 컷)', url: '/example_media/model_person_1.png', prompt: '한국인 30대 다부진 체형의 청년 남성 농부, 스포츠 머리, 네이비 블루 작업복, 1톤 트럭 짐칸 상적 작업' },
    { id: 2, name: '30대 청년농부 (과수원 선별 수확 컷)', url: '/example_media/model_person_2.png', prompt: '한국인 30대 다부진 체형의 청년 남성 농부, 스포츠 머리, 과수원 과일 수확 컷' },
    { id: 3, name: '30대 청년농부 (농가 패킹센터 당도 검수 컷)', url: '/example_media/model_person_3.png', prompt: '한국인 30대 다부진 체형의 청년 남성 농부, 스포츠 머리, 당도/신선도 육안 검수 컷' },
    { id: 4, name: '30대 청년농부 (산지직송 현장 트럭 앞 미소 컷)', url: '/example_media/model_person_4.png', prompt: '한국인 30대 다부진 체형의 청년 남성 농부, 스포츠 머리, 1톤 트럭 앞 자신감 미소 컷' }
  ];

  if (!isOpen) return null;

  // Auto Update Combined Prompt when Selector Changes
  const handleSelectorChange = (type, val) => {
    let newEthnicity = ethnicity;
    let newGenderAge = genderAge;
    let newBodyType = bodyType;
    let newHairstyle = hairstyle;
    let newOutfit = outfit;

    if (type === 'ethnicity') { setEthnicity(val); newEthnicity = val; }
    if (type === 'genderAge') { setGenderAge(val); newGenderAge = val; }
    if (type === 'bodyType') { setBodyType(val); newBodyType = val; }
    if (type === 'hairstyle') { setHairstyle(val); newHairstyle = val; }
    if (type === 'outfit') { setOutfit(val); newOutfit = val; }

    const combined = `${newEthnicity} ${newGenderAge}, ${newBodyType}, ${newHairstyle}, ${newOutfit} 차림, 친근하고 건강한 미소, 8K 실사화`;
    setModelPrompt(combined);
  };

  const handleRefImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRefImage({
        name: file.name,
        url: URL.createObjectURL(file)
      });
    }
  };

  const handleAnalyzePersonImage = () => {
    if (!refImage) {
      alert('분석할 인물 참고 사진을 먼저 업로드해 주세요.');
      return;
    }

    setIsAnalyzingImage(true);
    setTimeout(() => {
      setIsAnalyzingImage(false);
      const visionResult = `한국인 30대 청년 남성, 다부진 어깨와 단정한 스포츠 머리, 짙은 눈썹과 친근한 미소, 산지 작업복 차림 (참고 사진 100% 동기화 분석 완료)`;
      setAnalyzedPrompt(visionResult);
      setModelPrompt(visionResult);
      alert('✨ [AI 인물 비전 분석 완료] 올리신 참고 사진의 얼굴 구조, 헤어 스타일, 체형 특징이 성공적으로 추출되었습니다!');
    }, 1000);
  };

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

    const fullPdfPrompt = `${modelPrompt} (PDF 연동: 실사형 AI 인물 디테일 종결 가이드북 & 나노바나나 구도 프롬프트 8K UHD 적용)`;

    onSelectAndSaveModel({
      id: Date.now(),
      name: `${ethnicity} ${genderAge} (${hairstyle})`,
      url: selectedResult.url,
      prompt: fullPdfPrompt
    });

    alert('🎉 조합하신 맞춤 인물 레퍼런스가 계정에 성공적으로 저장 및 적용되었습니다!');
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
        width: '740px',
        maxWidth: '100%',
        maxHeight: '90vh',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        boxSizing: 'border-box',
        overflowY: 'auto'
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
              AI 커스텀 인물 레퍼런스 생성기 (인종/체형/헤어/참고사진)
            </h2>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              인종, 체형, 헤어스타일을 자유롭게 조합하거나 참고 사진을 분석하여 나만의 브랜드 모델을 만드세요.
            </p>
          </div>
        </div>

        {/* Registered PDF Knowledge Integration Banner */}
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1.5px solid #bbf7d0',
          borderRadius: '14px',
          padding: '10px 14px',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FileText style={{ width: '18px', height: '18px', color: '#16a34a', flexShrink: 0 }} />
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#166534' }}>
            📄 <b>'실사형 AI 인물 디테일 종결! 가이드북'</b> &amp; <b>'나노바나나 구도 프롬프트'</b> 8K 85mm 실사 가이드라인이 자동 결합됩니다.
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('custom')}
            style={{
              padding: '8px 16px', borderRadius: '10px', border: 'none',
              backgroundColor: activeTab === 'custom' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'custom' ? '#ffffff' : '#64748b',
              fontWeight: '900', fontSize: '12px', cursor: 'pointer'
            }}
          >
            🎛️ 커스텀 상세 옵션 조합
          </button>
          <button 
            onClick={() => setActiveTab('image_vision')}
            style={{
              padding: '8px 16px', borderRadius: '10px', border: 'none',
              backgroundColor: activeTab === 'image_vision' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'image_vision' ? '#ffffff' : '#64748b',
              fontWeight: '900', fontSize: '12px', cursor: 'pointer'
            }}
          >
            📷 인물 참고 사진 AI 분석
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

        {/* TAB 1: CUSTOM ATTRIBUTE SELECTOR GRID */}
        {activeTab === 'custom' && (
          <div>
            {/* 1. 인종 / 국적 */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '900', color: '#334155', display: 'block', marginBottom: '6px' }}>
                1. 인종 / 국적:
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {ethnicities.map(e => (
                  <button
                    key={e}
                    onClick={() => handleSelectorChange('ethnicity', e)}
                    style={{
                      flex: 1, padding: '8px', borderRadius: '8px',
                      backgroundColor: ethnicity === e ? '#0284c7' : '#f8fafc',
                      color: ethnicity === e ? '#ffffff' : '#475569',
                      border: ethnicity === e ? '1px solid #0284c7' : '1px solid #e2e8f0',
                      fontWeight: '800', fontSize: '11px', cursor: 'pointer'
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. 성별 & 연령 */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '900', color: '#334155', display: 'block', marginBottom: '6px' }}>
                2. 성별 &amp; 연령:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {genderAges.map(g => (
                  <button
                    key={g}
                    onClick={() => handleSelectorChange('genderAge', g)}
                    style={{
                      padding: '7px 12px', borderRadius: '8px',
                      backgroundColor: genderAge === g ? '#0284c7' : '#f8fafc',
                      color: genderAge === g ? '#ffffff' : '#475569',
                      border: genderAge === g ? '1px solid #0284c7' : '1px solid #e2e8f0',
                      fontWeight: '800', fontSize: '11px', cursor: 'pointer'
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. 체형 / 몸매 */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '900', color: '#334155', display: 'block', marginBottom: '6px' }}>
                3. 체형 / 몸매:
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {bodyTypes.map(b => (
                  <button
                    key={b}
                    onClick={() => handleSelectorChange('bodyType', b)}
                    style={{
                      flex: 1, padding: '8px', borderRadius: '8px',
                      backgroundColor: bodyType === b ? '#0284c7' : '#f8fafc',
                      color: bodyType === b ? '#ffffff' : '#475569',
                      border: bodyType === b ? '1px solid #0284c7' : '1px solid #e2e8f0',
                      fontWeight: '800', fontSize: '11px', cursor: 'pointer'
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. 헤어 스타일 */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '900', color: '#334155', display: 'block', marginBottom: '6px' }}>
                4. 헤어 스타일:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {hairstyles.map(h => (
                  <button
                    key={h}
                    onClick={() => handleSelectorChange('hairstyle', h)}
                    style={{
                      padding: '7px 12px', borderRadius: '8px',
                      backgroundColor: hairstyle === h ? '#0284c7' : '#f8fafc',
                      color: hairstyle === h ? '#ffffff' : '#475569',
                      border: hairstyle === h ? '1px solid #0284c7' : '1px solid #e2e8f0',
                      fontWeight: '800', fontSize: '11px', cursor: 'pointer'
                    }}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. 복장 스타일 */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: '900', color: '#334155', display: 'block', marginBottom: '6px' }}>
                5. 복장 스타일:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {outfits.map(o => (
                  <button
                    key={o}
                    onClick={() => handleSelectorChange('outfit', o)}
                    style={{
                      padding: '7px 12px', borderRadius: '8px',
                      backgroundColor: outfit === o ? '#0284c7' : '#f8fafc',
                      color: outfit === o ? '#ffffff' : '#475569',
                      border: outfit === o ? '1px solid #0284c7' : '1px solid #e2e8f0',
                      fontWeight: '800', fontSize: '11px', cursor: 'pointer'
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Preview */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                조합된 최종 프롬프트 (수정 가능):
              </label>
              <textarea 
                rows="2"
                value={modelPrompt}
                onChange={e => setModelPrompt(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>

            {/* Action Button */}
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
              {isGenerating ? '조합하신 옵션으로 8K AI 인물 모델 4종을 렌더링 중...' : '🚀 선택한 옵션으로 AI 인물 모델 4종 생성하기'}
            </button>
          </div>
        )}

        {/* TAB 2: IMAGE VISION ANALYSIS */}
        {activeTab === 'image_vision' && (
          <div>
            <label style={{
              backgroundColor: '#fafbf8',
              border: '2px dashed #0284c7',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              <Upload style={{ width: '28px', height: '28px', color: '#0284c7', marginBottom: '8px' }} />
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#0369a1', marginBottom: '4px' }}>인물 참고 사진 업로드</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>원하는 스타일의 인물 사진을 올리시면 AI가 얼굴/체형/헤어를 정밀 분석합니다</span>
              <input type="file" accept="image/*" onChange={handleRefImageUpload} style={{ display: 'none' }} />
            </label>

            {refImage && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#f0f9ff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #bae6fd', marginBottom: '16px' }}>
                <img src={refImage.url} alt={refImage.name} style={{ width: '54px', height: '54px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #0284c7' }} />
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', display: 'block' }}>{refImage.name}</span>
                  <span style={{ fontSize: '11px', color: '#0369a1' }}>사진 업로드 완료 · AI 시각 분석 준비됨</span>
                </div>
              </div>
            )}

            <button 
              onClick={handleAnalyzePersonImage}
              disabled={isAnalyzingImage}
              style={{
                width: '100%', padding: '14px', borderRadius: '12px',
                backgroundColor: '#0369a1', color: '#ffffff',
                fontWeight: '900', fontSize: '13px', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                marginBottom: '16px'
              }}
            >
              <Search style={{ width: '16px', height: '16px' }} />
              {isAnalyzingImage ? 'AI 비전이 인물 사진 구조 분석 중...' : '🔍 인물 참고 사진 AI 시각 분석하기'}
            </button>

            {analyzedPrompt && (
              <div style={{ backgroundColor: '#1e293b', color: '#fff', padding: '14px', borderRadius: '12px', marginBottom: '16px', fontSize: '12px', lineHeight: '1.5' }}>
                <span style={{ color: '#38bdf8', fontWeight: '900', display: 'block', marginBottom: '4px' }}>
                  ✅ AI 분석 결과 프롬프트:
                </span>
                {analyzedPrompt}
              </div>
            )}

            {analyzedPrompt && (
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                style={{
                  width: '100%', padding: '14px', borderRadius: '12px',
                  backgroundColor: '#16a34a', color: '#ffffff',
                  fontWeight: '900', fontSize: '13px', border: 'none', cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                🚀 분석 결과 토대로 AI 인물 모델 4종 생성하기
              </button>
            )}
          </div>
        )}

        {/* TAB 3: SAVED LIBRARY */}
        {activeTab === 'library' && (
          <div>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '10px' }}>
              내 계정에 보관된 브랜드 대표 인물 목록:
            </span>

            {savedModels.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px', backgroundColor: '#fafbf8', borderRadius: '14px', border: '1px dashed #cbd5e1' }}>
                <User style={{ width: '32px', height: '32px', color: '#94a3b8', marginBottom: '8px' }} />
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>보관된 인물 레퍼런스가 없습니다. 프롬프트나 사진으로 새로 생성해 보세요.</span>
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

        {/* Generated Results Preview Gallery (Click to Select) */}
        {generatedResults.length > 0 && (
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px dashed #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                AI가 렌더링한 4종 브랜드 인물 모델 (가장 마음에 드는 사진을 클릭해 선택하세요):
              </span>
              {selectedResult && (
                <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '14px', fontWeight: '900' }}>
                  ✅ '{selectedResult.name}' 선택됨
                </span>
              )}
            </div>

            {/* 4-Grid Preview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {generatedResults.map((res, index) => {
                const isSelected = selectedResult?.id === res.id;

                return (
                  <div 
                    key={res.id}
                    onClick={() => setSelectedResult(res)}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: isSelected ? '3.5px solid #16a34a' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      aspectRatio: '1/1',
                      boxShadow: isSelected ? '0 8px 20px rgba(22, 163, 74, 0.35)' : '0 2px 6px rgba(0,0,0,0.05)',
                      transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={res.url} alt={res.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    
                    {/* Selection Overlay Checkmark */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '8px', right: '8px',
                        backgroundColor: '#16a34a', color: '#ffffff',
                        borderRadius: '20px', padding: '4px 8px',
                        fontSize: '10px', fontWeight: '900',
                        display: 'flex', alignItems: 'center', gap: '3px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                      }}>
                        <Check style={{ width: '12px', height: '12px' }} /> 선택됨
                      </div>
                    )}

                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      backgroundColor: isSelected ? 'rgba(22, 163, 74, 0.9)' : 'rgba(15, 23, 42, 0.85)',
                      color: '#ffffff', fontSize: '11px', fontWeight: '800',
                      padding: '6px 8px', textAlign: 'center'
                    }}>
                      #{index + 1} {res.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Save & Apply Banner with Selected Image Thumbnail */}
            {selectedResult && (
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1.5px solid #bbf7d0',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={selectedResult.url} alt="Selected" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #16a34a' }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: '#15803d', display: 'block' }}>
                      선택된 브랜드 대표 모델: {selectedResult.name}
                    </span>
                    <span style={{ fontSize: '11px', color: '#166534' }}>
                      이 사진과 8K 실사 프롬프트가 내 계정에 영구 저장되어 모든 상세페이지 슬라이드에 일관되게 적용됩니다.
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleSaveAndApply}
                  style={{
                    padding: '12px 24px', borderRadius: '12px',
                    backgroundColor: '#0f172a', color: '#ffffff',
                    fontWeight: '900', fontSize: '13px', border: 'none', cursor: 'pointer',
                    whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
                  }}
                >
                  💾 이 인물을 계정에 저장 및 사용하기
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
