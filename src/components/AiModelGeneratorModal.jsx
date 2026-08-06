import React, { useState } from 'react';
import { Sparkles, X, Check, RefreshCw, Upload, User, BookmarkCheck, Trash2, FileText, Search, Image as ImageIcon, Camera, ArrowRight, Layers, Lock, ChevronRight } from 'lucide-react';

export default function AiModelGeneratorModal({ isOpen, onClose, onSelectAndSaveModel, savedModels = [], onDeleteSavedModel }) {
  const [activeTab, setActiveTab] = useState('custom'); // 'custom' | 'image_vision' | 'library'
  
  // Strict Stepper Workflow Stage: 1 ('setup') | 2 ('front_candidates') | 3 ('master_views') | 4 ('library_saved') | 5 ('scene_mode')
  const [currentStep, setCurrentStep] = useState(1);

  // Custom Attribute Selectors
  const [ethnicity, setEthnicity] = useState('한국인');
  const [genderAge, setGenderAge] = useState('30대 청년 남성');
  const [bodyType, setBodyType] = useState('다부진 체형');
  const [hairstyle, setHairstyle] = useState('단정한 스포츠 머리');
  const [outfit, setOutfit] = useState('농가/산지 작업복');

  const [modelPrompt, setModelPrompt] = useState('한국인 30대 청년 남성, 다부진 체형, 단정한 스포츠 머리, 농가/산지 작업복 차림, 중립 배경 정면 얼굴');
  
  // Phase 1: Front Candidates State (4 Neutral Background Front Headshots)
  const [frontCandidates, setFrontCandidates] = useState([]);
  const [selectedFrontFace, setSelectedFrontFace] = useState(null);
  const [isGeneratingFront, setIsGeneratingFront] = useState(false);

  // Phase 2: Master Angle Views State (Front Upper Body, Left 45, Right 45, Half Body, Full Body)
  const [masterViews, setMasterViews] = useState([]);
  const [isGeneratingViews, setIsGeneratingViews] = useState(false);

  // Image-to-Prompt Vision Analysis State
  const [refImage, setRefImage] = useState(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [analyzedPrompt, setAnalyzedPrompt] = useState('');

  // Scene Generation Mode State (Unlocked ONLY from Saved Person Library)
  const [sceneModePerson, setSceneModePerson] = useState(null);
  const [selectedScenePreset, setSelectedScenePreset] = useState('과수원 수확');
  const [generatedSceneImage, setGeneratedSceneImage] = useState(null);
  const [isGeneratingScene, setIsGeneratingScene] = useState(false);

  // Options Lists (Strict v2 Specification)
  const ethnicities = ['한국인', '동양인/아시아계'];
  const genderAges = ['30대 청년 남성', '20대 청년 남성', '40대 중년 남성', '50대 베테랑 남성'];
  const bodyTypes = ['다부진 체형', '건장한 근육형', '슬림/마른 체형', '기본 체형'];
  const hairstyles = ['단정한 스포츠 머리', '깔끔한 투블럭', '자연스러운 숏컷'];
  const outfits = ['농가/산지 작업복', '1톤 트럭 수확복', '패킹센터 검수복', '브랜드 대표 댄디룩', '캐주얼 반팔티'];

  // 10 Smiling Real User Reference Candidates with 6 Multi-Angle Mappings
  const defaultFrontCandidates = [
    { 
      id: 'f1', name: '후보 1 (트럭 앞 환한 자신감 미소)', url: '/example_media/user_smile_1.png', prompt: 'front-facing portrait of 30s muscular Korean male farmer with bright teeth smile, navy quarter-zip shirt, farm truck background',
      views: { front_headshot: '/example_media/user_smile_1.png', front_upper_body: '/example_media/user_new_1.png', left_45: '/example_media/master_left_45.png', right_45: '/example_media/user_smile_8.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f2', name: '후보 2 (박스창고 앞 자상한 미소)', url: '/example_media/user_smile_2.png', prompt: 'front-facing portrait of 30s Korean male farmer, gentle authentic smile, short crop haircut, packing boxes background',
      views: { front_headshot: '/example_media/user_smile_2.png', front_upper_body: '/example_media/user_new_2.png', left_45: '/example_media/master_left_45.png', right_45: '/example_media/user_new_4.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f3', name: '후보 3 (투블럭 & 장갑 팔짱 미소)', url: '/example_media/user_smile_3.png', prompt: 'front-facing portrait of 30s Korean male farmer with natural two-block haircut, bright genuine smile with work gloves',
      views: { front_headshot: '/example_media/user_smile_3.png', front_upper_body: '/example_media/user_smile_3.png', left_45: '/example_media/user_smile_4.png', right_45: '/example_media/user_smile_5.png', half_body: '/example_media/user_smile_7.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f4', name: '후보 4 (하우스 산지 앞 미소 포커스)', url: '/example_media/user_smile_4.png', prompt: 'front-facing portrait of 30s Korean male farmer, warm gentle smile, short fade haircut, greenhouse field background',
      views: { front_headshot: '/example_media/user_smile_4.png', front_upper_body: '/example_media/user_new_7.png', left_45: '/example_media/user_smile_4.png', right_45: '/example_media/user_new_4.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f5', name: '후보 5 (창고 스냅 보조개 미소)', url: '/example_media/user_smile_5.png', prompt: 'front-facing headshot of 30s Korean male farmer, warm trustworthy smile with dimples, truck & green crates background',
      views: { front_headshot: '/example_media/user_smile_5.png', front_upper_body: '/example_media/user_new_6.png', left_45: '/example_media/master_left_45.png', right_45: '/example_media/user_smile_8.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f6', name: '후보 6 (하우스 배경 환한 미소)', url: '/example_media/user_smile_6.png', prompt: 'front-facing headshot of 30s Korean male farmer with natural two-block haircut, bright teeth smile, navy quarter-zip shirt',
      views: { front_headshot: '/example_media/user_smile_6.png', front_upper_body: '/example_media/user_new_3.png', left_45: '/example_media/master_left_45.png', right_45: '/example_media/user_new_7.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f7', name: '후보 7 (수박 상자 앞 팔짱 미소)', url: '/example_media/user_smile_7.png', prompt: 'front-facing portrait of 30s Korean male farmer with arms crossed, natural smile, watermelon crate background',
      views: { front_headshot: '/example_media/user_smile_7.png', front_upper_body: '/example_media/user_smile_7.png', left_45: '/example_media/user_smile_8.png', right_45: '/example_media/user_new_9.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f8', name: '후보 8 (패킹센터 산지 자신감 컷)', url: '/example_media/user_smile_8.png', prompt: 'three-quarter portrait of 30s Korean male farmer, subtle confident smile, packing warehouse background',
      views: { front_headshot: '/example_media/user_smile_8.png', front_upper_body: '/example_media/user_new_8.png', left_45: '/example_media/user_smile_8.png', right_45: '/example_media/user_new_4.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f9', name: '후보 9 (수박 수확 안고 미소 스냅)', url: '/example_media/user_smile_9.png', prompt: 'portrait of 30s Korean male farmer holding a large fresh watermelon naturally with work gloves, truck background',
      views: { front_headshot: '/example_media/user_smile_9.png', front_upper_body: '/example_media/scene_watermelon.png', left_45: '/example_media/master_left_45.png', right_45: '/example_media/user_new_4.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    },
    { 
      id: 'f10', name: '후보 10 (창고 앞 팔짱 환한 미소)', url: '/example_media/user_smile_10.png', prompt: 'front-facing portrait of 30s Korean male farmer with arms crossed, bright teeth smile, warehouse background',
      views: { front_headshot: '/example_media/user_smile_10.png', front_upper_body: '/example_media/user_new_1.png', left_45: '/example_media/master_left_45.png', right_45: '/example_media/user_new_7.png', half_body: '/example_media/master_half_body.png', full_body: '/example_media/master_full_body.png' }
    }
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

    const combined = `${newEthnicity} ${newGenderAge}, ${newBodyType}, ${newHairstyle}, ${newOutfit} 차림, 소프트 중립 회색 배경 정면 얼굴`;
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
      alert('✨ [AI 인물 비전 분석 완료] 참고 사진의 얼굴 구조, 헤어 스타일, 체형 특징이 추출되었습니다!');
    }, 1000);
  };

  // STEP 1 -> STEP 2: Generate 4 Neutral Background Front Headshot Candidates
  const handleGenerateFrontCandidates = () => {
    if (!modelPrompt.trim()) {
      alert('인물 묘사 프롬프트를 입력해 주세요.');
      return;
    }
    setIsGeneratingFront(true);
    setTimeout(() => {
      setIsGeneratingFront(false);
      setFrontCandidates(defaultFrontCandidates);
      setSelectedFrontFace(defaultFrontCandidates[0]);
      setCurrentStep(2);
    }, 1200);
  };

  // STEP 2 -> STEP 3: Generate 5 Multi-Angle Master Views using Selected Front Face as Reference
  const handleGenerateMasterViews = () => {
    if (!selectedFrontFace) {
      alert('대표 정면 얼굴 1개를 먼저 선택해 주세요.');
      return;
    }

    setIsGeneratingViews(true);
    setTimeout(() => {
      setIsGeneratingViews(false);

      // Real Multi-Angle Photoshoot cuts of the 30s Athletic Korean Male Farmer persona
      const generatedViews = [
        { id: 'v1', view_id: 'front_headshot', title: '대표 정면 얼굴', ratio: '1:1', url: selectedFrontFace.url },
        { id: 'v2', view_id: 'front_upper_body', title: '정면 상반신 (직립)', ratio: '4:5', url: '/example_media/master_upper_body.png' },
        { id: 'v3', view_id: 'left_45', title: '좌측 45도 (측면 프로필)', ratio: '1:1', url: '/example_media/master_left_45.png' },
        { id: 'v4', view_id: 'right_45', title: '우측 45도 (측면 프로필)', ratio: '1:1', url: '/example_media/master_right_45.png' },
        { id: 'v5', view_id: 'half_body', title: '반신 (카고 바지 컷)', ratio: '4:5', url: '/example_media/master_half_body.png' },
        { id: 'v6', view_id: 'full_body', title: '전신 (전신 착장 & 워크화)', ratio: '4:5', url: '/example_media/master_full_body.png' }
      ];

      setMasterViews(generatedViews);
      setCurrentStep(3);
    }, 1500);
  };

  // STEP 3 -> STEP 4: Save Master Person Record to Library
  const handleSaveToLibrary = () => {
    if (!selectedFrontFace) {
      alert('대표 정면 얼굴이 선택되지 않았습니다.');
      return;
    }

    const masterRecord = {
      id: Date.now(),
      name: `${ethnicity} ${genderAge} (${hairstyle})`,
      url: selectedFrontFace.url,
      representative_face: selectedFrontFace.url,
      master_views: masterViews,
      prompt: modelPrompt,
      negative_prompt: 'plastic skin, waxy face, beauty retouching, celebrity look, excessive smoothing, fruit, truck, orchard, packing center',
      selected_options: { ethnicity, genderAge, bodyType, hairstyle, outfit },
      created_at: new Date().toLocaleDateString()
    };

    onSelectAndSaveModel(masterRecord);
    setCurrentStep(4);
    alert('🎉 [인물 라이브러리 영구 저장 완료] 정면 얼굴 및 5개 각도 기준컷이 라이브러리에 저장되었습니다!');
  };

  // STEP 5: Open Scene Creation for a Saved Person in Library
  const handleOpenSceneCreation = (person) => {
    setSceneModePerson(person);
    setGeneratedSceneImage(null);
    setCurrentStep(5);
  };

  const handleGenerateScene = () => {
    if (!sceneModePerson) return;

    setIsGeneratingScene(true);
    setTimeout(() => {
      setIsGeneratingScene(false);
      
      // Match scene image based on selected preset
      let sceneUrl = '/example_media/scene_watermelon.png';
      if (selectedScenePreset === '과수원 수확') sceneUrl = '/example_media/scene_watermelon.png';
      if (selectedScenePreset === '패킹센터 검수') sceneUrl = '/example_media/user_smile_8.png';
      if (selectedScenePreset === '1톤 트럭 적재') sceneUrl = '/example_media/user_smile_1.png';
      if (selectedScenePreset === '산지 출고 확인') sceneUrl = '/example_media/user_smile_6.png';
      if (selectedScenePreset === '상품 들고 소개') sceneUrl = '/example_media/scene_watermelon.png';

      setGeneratedSceneImage({
        preset: selectedScenePreset,
        url: sceneUrl
      });
    }, 1200);
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
        width: '820px',
        maxWidth: '100%',
        maxHeight: '92vh',
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
            cursor: 'pointer', zIndex: 10
          }}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Modal Header Title */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: '900', color: '#16a34a', backgroundColor: '#dcfce7', padding: '3px 10px', borderRadius: '12px' }}>
              SANJI YOUTH BRAND PERSON BUILDER v2.0
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User style={{ width: '24px', height: '24px', color: '#0284c7' }} />
            산지청년 AI 기준 인물 생성·보관 시스템
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            대표 정면 얼굴을 먼저 생성·확정한 후, 동일 인물 정체성을 100% 유지하며 다각도 기준컷 및 산지 수확 장면에 재사용합니다.
          </p>
        </div>

        {/* STRICT WORKFLOW STEPPER BAR (Steps 1~5) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '6px',
          backgroundColor: '#f8fafc',
          padding: '10px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          {[
            { step: 1, label: '1. 인물 설정' },
            { step: 2, label: '2. 정면 얼굴 선택' },
            { step: 3, label: '3. 기준컷 생성' },
            { step: 4, label: '4. 라이브러리 저장' },
            { step: 5, label: '5. 장면 생성' }
          ].map(s => {
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;
            const isLocked = s.step === 5 && currentStep < 4;

            return (
              <div 
                key={s.step} 
                style={{
                  textAlign: 'center',
                  padding: '8px 4px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? '#0284c7' : isCompleted ? '#dcfce7' : '#ffffff',
                  color: isActive ? '#ffffff' : isCompleted ? '#15803d' : isLocked ? '#94a3b8' : '#475569',
                  border: isActive ? 'none' : isCompleted ? '1px solid #86efac' : '1px solid #e2e8f0',
                  fontSize: '11px',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                {isLocked ? <Lock style={{ width: '10px', height: '10px' }} /> : null}
                {s.label}
              </div>
            );
          })}
        </div>

        {/* TOP NAVIGATION TABS */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('custom')}
            style={{
              padding: '10px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: '900', cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'custom' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'custom' ? '#ffffff' : '#64748b',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Sparkles style={{ width: '15px', height: '15px' }} /> 커스텀 상세 옵션 조합
          </button>

          <button
            onClick={() => setActiveTab('image_vision')}
            style={{
              padding: '10px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: '900', cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'image_vision' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'image_vision' ? '#ffffff' : '#64748b',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Camera style={{ width: '15px', height: '15px' }} /> 인물 참고 사진 AI 분석
          </button>

          <button
            onClick={() => setActiveTab('library')}
            style={{
              padding: '10px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: '900', cursor: 'pointer',
              border: 'none',
              backgroundColor: activeTab === 'library' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'library' ? '#ffffff' : '#64748b',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <BookmarkCheck style={{ width: '15px', height: '15px' }} /> 보관된 인물 라이브러리 ({savedModels.length})
          </button>
        </div>

        {/* TAB 1: CUSTOM OPTIONS BUILDER */}
        {activeTab === 'custom' && currentStep <= 4 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>1. 국적 / 인종:</label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {ethnicities.map(item => (
                    <button key={item} onClick={() => handleSelectorChange('ethnicity', item)} style={{ padding: '7px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', border: '1px solid #cbd5e1', backgroundColor: ethnicity === item ? '#0284c7' : '#fff', color: ethnicity === item ? '#fff' : '#334155', cursor: 'pointer' }}>{item}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>2. 성별 & 연령대:</label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {genderAges.map(item => (
                    <button key={item} onClick={() => handleSelectorChange('genderAge', item)} style={{ padding: '7px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', border: '1px solid #cbd5e1', backgroundColor: genderAge === item ? '#0284c7' : '#fff', color: genderAge === item ? '#fff' : '#334155', cursor: 'pointer' }}>{item}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>3. 체형 / 몸매:</label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {bodyTypes.map(item => (
                    <button key={item} onClick={() => handleSelectorChange('bodyType', item)} style={{ padding: '7px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', border: '1px solid #cbd5e1', backgroundColor: bodyType === item ? '#0284c7' : '#fff', color: bodyType === item ? '#fff' : '#334155', cursor: 'pointer' }}>{item}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>4. 헤어 스타일:</label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {hairstyles.map(item => (
                    <button key={item} onClick={() => handleSelectorChange('hairstyle', item)} style={{ padding: '7px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', border: '1px solid #cbd5e1', backgroundColor: hairstyle === item ? '#0284c7' : '#fff', color: hairstyle === item ? '#fff' : '#334155', cursor: 'pointer' }}>{item}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>5. 복장 스타일 (농가 맞춤):</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {outfits.map(item => (
                  <button key={item} onClick={() => handleSelectorChange('outfit', item)} style={{ padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', border: '1px solid #cbd5e1', backgroundColor: outfit === item ? '#0284c7' : '#fff', color: outfit === item ? '#fff' : '#334155', cursor: 'pointer' }}>{item}</button>
                ))}
              </div>
            </div>

            {/* Prompt Display Panel */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '14px', padding: '14px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: '900', color: '#64748b', display: 'block', marginBottom: '4px' }}>조합된 기준 인물 정면 프롬프트 (중립 배경):</span>
              <textarea
                value={modelPrompt}
                onChange={(e) => setModelPrompt(e.target.value)}
                style={{ width: '100%', height: '48px', borderRadius: '8px', border: '1px solid #cbd5e1', padding: '8px', fontSize: '12px', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
            </div>

            {/* STEP 1 ACTION BUTTON */}
            {currentStep === 1 && (
              <button
                onClick={handleGenerateFrontCandidates}
                disabled={isGeneratingFront}
                style={{
                  width: '100%', padding: '16px', borderRadius: '16px',
                  backgroundColor: '#0284c7', color: '#ffffff', fontSize: '15px', fontWeight: '900',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.4)'
                }}
              >
                {isGeneratingFront ? <RefreshCw className="animate-spin style={{ width: '18px', height: '18px' }}" /> : <Sparkles style={{ width: '18px', height: '18px' }} />}
                {isGeneratingFront ? '중립 배경 정면 얼굴 후보 4개 생성 중...' : '1. 정면 얼굴 후보 4개 생성하기'}
              </button>
            )}
          </div>
        )}

        {/* TAB 2: REFERENCE ANALYZER */}
        {activeTab === 'image_vision' && (
          <div>
            <div style={{ border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '24px', textAlign: 'center', backgroundColor: '#fafbf8', marginBottom: '20px' }}>
              <input type="file" accept="image/*" id="ref-image-input" style={{ display: 'none' }} onChange={handleRefImageUpload} />
              <label htmlFor="ref-image-input" style={{ cursor: 'pointer', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Upload style={{ width: '32px', height: '32px', color: '#0284c7' }} />
                <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a' }}>참고 사진 업로드 (얼굴, 헤어, 체형 AI 분석)</span>
              </label>
              {refImage && <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '900', display: 'block', marginTop: '8px' }}>✅ 선택됨: {refImage.name}</span>}
            </div>

            <button
              onClick={handleAnalyzePersonImage}
              disabled={isAnalyzingImage}
              style={{
                width: '100%', padding: '14px', borderRadius: '14px',
                backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', fontWeight: '900',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              {isAnalyzingImage ? <RefreshCw className="animate-spin" style={{ width: '16px', height: '16px' }} /> : <Camera style={{ width: '16px', height: '16px' }} />}
              {isAnalyzingImage ? '참고 사진 AI 비전 분석 중...' : '사진 분석하고 정면 프롬프트에 반영'}
            </button>
          </div>
        )}

        {/* STEP 2: PHASE 1 FRONT HEADSHOT CANDIDATES (4 Neutral Background Cards) */}
        {currentStep >= 2 && activeTab === 'custom' && (
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '2px dashed #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles style={{ width: '16px', height: '16px', color: '#0284c7' }} />
                  기준 인물 생성 결과 (대표 정면 얼굴 선택)
                </span>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '2px' }}>
                  중립 배경에서 촬영된 정면 후보 4개 중 가장 마음에 드는 대표 얼굴 1개를 선택하세요.
                </span>
              </div>

              {selectedFrontFace && (
                <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '14px', fontWeight: '900' }}>
                  ✅ '{selectedFrontFace.name}' 선택됨
                </span>
              )}
            </div>

            {/* 5-Grid Front Face Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {frontCandidates.map((res, index) => {
                const isSelected = selectedFrontFace?.id === res.id;

                return (
                  <div 
                    key={res.id}
                    onClick={() => setSelectedFrontFace(res)}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: isSelected ? '3.5px solid #16a34a' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      aspectRatio: '1/1',
                      boxShadow: isSelected ? '0 8px 20px rgba(22, 163, 74, 0.35)' : '0 2px 6px rgba(0,0,0,0.05)',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={res.url} alt={res.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    
                    {isSelected && (
                      <div style={{
                        position: 'absolute', top: '8px', right: '8px',
                        backgroundColor: '#16a34a', color: '#ffffff',
                        borderRadius: '20px', padding: '4px 8px',
                        fontSize: '10px', fontWeight: '900',
                        display: 'flex', alignItems: 'center', gap: '3px'
                      }}>
                        <Check style={{ width: '12px', height: '12px' }} /> 대표 얼굴
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

            {/* STEP 2 ACTION BUTTON */}
            {currentStep === 2 && selectedFrontFace && (
              <button
                onClick={handleGenerateMasterViews}
                disabled={isGeneratingViews}
                style={{
                  width: '100%', padding: '16px', borderRadius: '16px',
                  backgroundColor: '#16a34a', color: '#ffffff', fontSize: '15px', fontWeight: '900',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 10px 25px -5px rgba(22, 163, 74, 0.4)'
                }}
              >
                {isGeneratingViews ? <RefreshCw className="animate-spin" style={{ width: '18px', height: '18px' }} /> : <Layers style={{ width: '18px', height: '18px' }} />}
                {isGeneratingViews ? '선택 얼굴을 참조하여 5개 각도 기준컷 생성 중...' : '2. 선택한 정면 얼굴로 5개 각도 기준컷 생성하기'}
              </button>
            )}
          </div>
        )}

        {/* STEP 3: MASTER ANGLE VIEWS (Front Upper Body, Left 45, Right 45, Half Body, Full Body) */}
        {currentStep >= 3 && activeTab === 'custom' && (
          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '2px dashed #e2e8f0' }}>
            <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <Layers style={{ width: '16px', height: '16px', color: '#0284c7' }} />
              동일 인물 6개 다각도 기준컷 세트 (동일 정체성 100% 동기화)
            </span>

            {/* 6-Grid Master Angle Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
              {masterViews.map((mv) => (
                <div key={mv.id} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
                  <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
                    <img src={mv.url} alt={mv.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: '#0f172a', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '10px', fontWeight: '900' }}>
                      {mv.ratio}
                    </span>
                  </div>
                  <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '6px' }}>{mv.title}</span>
                    <button 
                      onClick={() => alert(`'${mv.title}' 각도가 정상 재생성되었습니다.`)}
                      style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#f1f5f9', color: '#475569', fontSize: '10px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
                    >
                      이 각도만 다시 생성
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* STEP 3 ACTION BUTTON */}
            {currentStep === 3 && (
              <button
                onClick={handleSaveToLibrary}
                style={{
                  width: '100%', padding: '16px', borderRadius: '16px',
                  backgroundColor: '#0f172a', color: '#ffffff', fontSize: '15px', fontWeight: '900',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.4)'
                }}
              >
                <BookmarkCheck style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                3. 인물 라이브러리에 영구 저장하기
              </button>
            )}
          </div>
        )}

        {/* STEP 4: LIBRARY SAVED CONFIRMATION BANNER */}
        {currentStep === 4 && activeTab === 'custom' && (
          <div style={{ marginTop: '24px', backgroundColor: '#f0fdf4', border: '2px solid #86efac', borderRadius: '18px', padding: '20px', textAlign: 'center' }}>
            <Check style={{ width: '36px', height: '36px', color: '#16a34a', margin: '0 auto 8px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#14532d', margin: '0 0 4px 0' }}>🎉 기준 인물 라이브러리 저장 완료!</h3>
            <p style={{ fontSize: '12px', color: '#166534', margin: '0 0 16px 0' }}>
              대표 정면 얼굴 및 5개 다각도 기준컷이 계정에 저장되었습니다. 이제 이 인물로 농산물 수확, 검수, 적재 장면을 생성하실 수 있습니다.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setActiveTab('library')}
                style={{ padding: '12px 20px', borderRadius: '12px', backgroundColor: '#15803d', color: '#fff', fontSize: '13px', fontWeight: '900', border: 'none', cursor: 'pointer' }}
              >
                보관된 인물 라이브러리로 이동
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SAVED PERSON LIBRARY (Includes "이 인물로 장면 만들기" action) */}
        {activeTab === 'library' && currentStep !== 5 && (
          <div>
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '12px' }}>
              내 계정에 보관된 브랜드 대표 인물 목록 ({savedModels.length}개):
            </span>

            {savedModels.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fafbf8', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                <User style={{ width: '36px', height: '36px', color: '#94a3b8', marginBottom: '8px' }} />
                <span style={{ fontSize: '13px', color: '#64748b', display: 'block', marginBottom: '12px' }}>보관된 인물 레퍼런스가 없습니다. 커스텀 옵션 조합에서 기준 인물을 먼저 생성해 보세요.</span>
                <button onClick={() => setActiveTab('custom')} style={{ padding: '10px 18px', borderRadius: '10px', backgroundColor: '#0284c7', color: '#fff', fontSize: '12px', fontWeight: '900', border: 'none', cursor: 'pointer' }}>
                  첫 기준 인물 만들기
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {savedModels.map(m => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img src={m.url || m.representative_face} alt={m.name} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} />
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', display: 'block' }}>{m.name}</span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>"{m.prompt}"</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleOpenSceneCreation(m)}
                        style={{ padding: '10px 16px', borderRadius: '10px', backgroundColor: '#16a34a', color: '#fff', fontSize: '12px', fontWeight: '900', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Sparkles style={{ width: '14px', height: '14px' }} /> 이 인물로 장면 만들기
                      </button>
                      <button 
                        onClick={() => onDeleteSavedModel(m.id)}
                        style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', cursor: 'pointer' }}
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

        {/* STEP 5 / SCENE CREATION MODAL VIEW (UNLOCKED ONLY WHEN CLICKED FROM LIBRARY) */}
        {(currentStep === 5 || activeTab === 'scene_mode') && sceneModePerson && (
          <div style={{ backgroundColor: '#fafbf8', border: '2px solid #0284c7', borderRadius: '20px', padding: '24px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontWeight: '900' }}>
                  SCENE GENERATION ENGINE (인물 정체성 100% 락)
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>
                  '${sceneModePerson.name}' 인물로 농산물 장면 만들기
                </h3>
              </div>
              <button onClick={() => setCurrentStep(4)} style={{ fontSize: '12px', color: '#64748b', backgroundColor: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}>
                ◀ 라이브러리로 돌아가기
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '8px' }}>농산물 현장 장면 프리셋 선택:</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['과수원 수확', '패킹센터 검수', '1톤 트럭 적재', '산지 출고 확인', '상품 들고 소개'].map(preset => (
                  <button
                    key={preset}
                    onClick={() => setSelectedScenePreset(preset)}
                    style={{
                      padding: '10px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '800',
                      border: selectedScenePreset === preset ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: selectedScenePreset === preset ? '#e0f2fe' : '#ffffff',
                      color: selectedScenePreset === preset ? '#0369a1' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateScene}
              disabled={isGeneratingScene}
              style={{
                width: '100%', padding: '14px', borderRadius: '12px',
                backgroundColor: '#0284c7', color: '#ffffff', fontSize: '14px', fontWeight: '900',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              {isGeneratingScene ? <RefreshCw className="animate-spin" style={{ width: '16px', height: '16px' }} /> : <Sparkles style={{ width: '16px', height: '16px' }} />}
              {isGeneratingScene ? `'${selectedScenePreset}' 장면 렌더링 중...` : `'${selectedScenePreset}' 장면 이미지 생성하기`}
            </button>

            {/* Generated Scene Output Card */}
            {generatedSceneImage && (
              <div style={{ marginTop: '20px', backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', border: '1.5px solid #86efac' }}>
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#16a34a', display: 'block', marginBottom: '8px' }}>
                  ✅ 생성된 '${generatedSceneImage.preset}' 장면컷:
                </span>
                <img src={generatedSceneImage.url} alt={generatedSceneImage.preset} style={{ width: '100%', maxHeight: '380px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />
                <button
                  onClick={() => {
                    onSelectAndSaveModel({
                      id: Date.now(),
                      name: `${sceneModePerson.name} (${generatedSceneImage.preset})`,
                      url: generatedSceneImage.url,
                      prompt: `${sceneModePerson.prompt} - ${generatedSceneImage.preset}`
                    });
                    alert(`'${generatedSceneImage.preset}' 장면컷이 상세페이지에 적용되었습니다!`);
                    onClose();
                  }}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: '#16a34a', color: '#fff', fontSize: '13px', fontWeight: '900', border: 'none', cursor: 'pointer' }}
                >
                  이 장면컷 상세페이지에 적용하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
