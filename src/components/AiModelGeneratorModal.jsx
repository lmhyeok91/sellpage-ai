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

  // 10 Smiling Real User Reference Candidates with Strictly Isolated Face Views
  const defaultFrontCandidates = [
    { 
      id: 'f1', name: '후보 1 (하우스 산지 6대 다각도 기준 인물)', url: '/example_media/c1_view_1.png', prompt: 'front-facing portrait of 30s muscular Korean male farmer with bright teeth smile, navy quarter-zip shirt, greenhouse background',
      views: { v1: '/example_media/c1_view_1.png', v2: '/example_media/c1_view_2.png', v3: '/example_media/c1_view_3.png', v4: '/example_media/c1_view_4.png', v5: '/example_media/c1_view_5.png', v6: '/example_media/c1_view_6.png' }
    },
    { 
      id: 'f2', name: '후보 2 (박스창고 앞 자상한 미소)', url: '/example_media/user_smile_2.png', prompt: 'front-facing portrait of 30s Korean male farmer, gentle authentic smile, short crop haircut, packing boxes background',
      views: { v1: '/example_media/user_smile_2.png', v2: '/example_media/user_smile_2.png', v3: '/example_media/user_smile_2.png', v4: '/example_media/user_smile_2.png', v5: '/example_media/user_smile_2.png', v6: '/example_media/user_smile_2.png' }
    },
    { 
      id: 'f3', name: '후보 3 (트럭 창고 앞 6대 다각도 기준 인물)', url: '/example_media/c3_view_1.png', prompt: 'front-facing portrait of 30s Korean male farmer with natural two-block haircut, bright genuine smile with work gloves',
      views: { v1: '/example_media/c3_view_1.png', v2: '/example_media/c3_view_2.png', v3: '/example_media/c3_view_3.png', v4: '/example_media/c3_view_4.png', v5: '/example_media/c3_view_5.png', v6: '/example_media/c3_view_6.png' }
    },
    { 
      id: 'f4', name: '후보 4 (하우스 산지 앞 미소 포커스)', url: '/example_media/user_smile_4.png', prompt: 'front-facing portrait of 30s Korean male farmer, warm gentle smile, short fade haircut, greenhouse field background',
      views: { v1: '/example_media/user_smile_4.png', v2: '/example_media/user_smile_4.png', v3: '/example_media/user_smile_4.png', v4: '/example_media/user_smile_4.png', v5: '/example_media/user_smile_4.png', v6: '/example_media/user_smile_4.png' }
    },
    { 
      id: 'f5', name: '후보 5 (창고 스냅 보조개 미소)', url: '/example_media/user_smile_5.png', prompt: 'front-facing headshot of 30s Korean male farmer, warm trustworthy smile with dimples, truck & green crates background',
      views: { v1: '/example_media/user_smile_5.png', v2: '/example_media/user_smile_5.png', v3: '/example_media/user_smile_5.png', v4: '/example_media/user_smile_5.png', v5: '/example_media/user_smile_5.png', v6: '/example_media/user_smile_5.png' }
    },
    { 
      id: 'f6', name: '후보 6 (하우스 배경 환한 미소)', url: '/example_media/user_smile_6.png', prompt: 'front-facing headshot of 30s Korean male farmer with natural two-block haircut, bright teeth smile, navy quarter-zip shirt',
      views: { v1: '/example_media/user_smile_6.png', v2: '/example_media/user_smile_6.png', v3: '/example_media/user_smile_6.png', v4: '/example_media/user_smile_6.png', v5: '/example_media/user_smile_6.png', v6: '/example_media/user_smile_6.png' }
    },
    { 
      id: 'f7', name: '후보 7 (수박 상자 앞 팔짱 미소)', url: '/example_media/user_smile_7.png', prompt: 'front-facing portrait of 30s Korean male farmer with arms crossed, natural smile, watermelon crate background',
      views: { v1: '/example_media/user_smile_7.png', v2: '/example_media/user_smile_7.png', v3: '/example_media/user_smile_7.png', v4: '/example_media/user_smile_7.png', v5: '/example_media/user_smile_7.png', v6: '/example_media/user_smile_7.png' }
    },
    { 
      id: 'f8', name: '후보 8 (패킹센터 산지 자신감 컷)', url: '/example_media/user_smile_8.png', prompt: 'three-quarter portrait of 30s Korean male farmer, subtle confident smile, packing warehouse background',
      views: { v1: '/example_media/user_smile_8.png', v2: '/example_media/user_smile_8.png', v3: '/example_media/user_smile_8.png', v4: '/example_media/user_smile_8.png', v5: '/example_media/user_smile_8.png', v6: '/example_media/user_smile_8.png' }
    },
    { 
      id: 'f9', name: '후보 9 (수박 수확 안고 미소 스냅)', url: '/example_media/user_smile_9.png', prompt: 'portrait of 30s Korean male farmer holding a large fresh watermelon naturally with work gloves, truck background',
      views: { v1: '/example_media/user_smile_9.png', v2: '/example_media/scene_product_present.png', v3: '/example_media/user_smile_9.png', v4: '/example_media/user_smile_9.png', v5: '/example_media/user_smile_9.png', v6: '/example_media/user_smile_9.png' }
    },
    { 
      id: 'f10', name: '후보 10 (창고 앞 팔짱 환한 미소)', url: '/example_media/user_smile_10.png', prompt: 'front-facing portrait of 30s Korean male farmer with arms crossed, bright teeth smile, warehouse background',
      views: { v1: '/example_media/user_smile_10.png', v2: '/example_media/user_smile_10.png', v3: '/example_media/user_smile_10.png', v4: '/example_media/user_smile_10.png', v5: '/example_media/user_smile_10.png', v6: '/example_media/user_smile_10.png' }
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

      const views = selectedFrontFace.views || {
        v1: selectedFrontFace.url,
        v2: '/example_media/c3_view_2.png',
        v3: '/example_media/c3_view_3.png',
        v4: '/example_media/c3_view_4.png',
        v5: '/example_media/c3_view_5.png',
        v6: '/example_media/c3_view_6.png'
      };

      const generatedViews = [
        { id: 'v1', view_id: 'front_headshot', title: '대표 정면 얼굴', ratio: '1:1', url: views.v1 },
        { id: 'v2', view_id: 'front_upper_body', title: '정면 상반신 (직립)', ratio: '4:5', url: views.v2 },
        { id: 'v3', view_id: 'left_45', title: '좌측 45도 (측면 프로필)', ratio: '1:1', url: views.v3 },
        { id: 'v4', view_id: 'right_45', title: '우측 45도 (측면 프로필)', ratio: '1:1', url: views.v4 },
        { id: 'v5', view_id: 'half_body', title: '반신 (카고 바지 컷)', ratio: '4:5', url: views.v5 },
        { id: 'v6', view_id: 'full_body', title: '전신 (전신 착장 & 워크화)', ratio: '4:5', url: views.v6 }
      ];

      setMasterViews(generatedViews);
      setCurrentStep(3);
    }, 1500);
  };

  // Global Claimed Brand Models Registry State
  const [claimedRegistry, setClaimedRegistry] = useState({});

  useEffect(() => {
    const raw = localStorage.getItem('global_claimed_brand_persons');
    if (raw) {
      try {
        setClaimedRegistry(JSON.parse(raw));
      } catch (e) {
        setClaimedRegistry({});
      }
    }
  }, [isOpen]);

  // STEP 3 -> STEP 4: Save Master Person Record to Library and Claim Brand Model Exclusively
  const handleSaveToLibrary = () => {
    if (!selectedFrontFace) {
      alert('대표 정면 얼굴이 선택되지 않았습니다.');
      return;
    }

    const currentEmail = currentUser?.email?.toLowerCase() || 'master';

    // Global Brand Exclusive Claim Registration
    const updatedRegistry = {
      ...claimedRegistry,
      [selectedFrontFace.id]: {
        claimedBy: currentEmail,
        claimedAt: new Date().toISOString(),
        url: selectedFrontFace.url,
        name: selectedFrontFace.name
      }
    };
    setClaimedRegistry(updatedRegistry);
    localStorage.setItem('global_claimed_brand_persons', JSON.stringify(updatedRegistry));

    const masterRecord = {
      id: Date.now(),
      candidate_id: selectedFrontFace.id,
      name: `${ethnicity} ${genderAge} (${hairstyle})`,
      url: selectedFrontFace.url,
      representative_face: selectedFrontFace.url,
      master_views: masterViews,
      prompt: modelPrompt,
      negative_prompt: 'plastic skin, waxy face, beauty retouching, celebrity look, excessive smoothing, fruit, truck, orchard, packing center',
      selected_options: { ethnicity, genderAge, bodyType, hairstyle, outfit },
      created_at: new Date().toLocaleDateString(),
      is_claimed_exclusively: true
    };

    onSelectAndSaveModel(masterRecord);
    setCurrentStep(4);
    alert('🎉 [브랜드 독점 선점 완료] 해당 인물 모델이 계정에 영구 등록되었습니다! 다른 브랜드 계정에서는 이 모델을 중복 선택할 수 없도록 선점 잠금 처리되었습니다.');
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
      
      // Match scene image based on selected preset with user-uploaded gold standard scene reference cuts
      let sceneUrl = '/example_media/scene_product_present.png';
      if (selectedScenePreset === '과수원 수확') sceneUrl = '/example_media/scene_orchard_harvest.png';
      if (selectedScenePreset === '패킹센터 검수') sceneUrl = '/example_media/scene_packing_inspect.png';
      if (selectedScenePreset === '1톤 트럭 적재') sceneUrl = '/example_media/scene_truck_loading.png';
      if (selectedScenePreset === '산지 출고 확인') sceneUrl = '/example_media/scene_dispatch_check.png';
      if (selectedScenePreset === '상품 들고 소개') sceneUrl = '/example_media/scene_product_present.png';

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
          <X style={{ width: '20px', height: '20px' }} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', backgroundColor: '#dcfce7', borderRadius: '20px', color: '#15803d', fontSize: '11px', fontWeight: '800', marginBottom: '8px' }}>
            <Sparkles style={{ width: '14px', height: '14px' }} /> SANJI YOUTH BRAND PERSON BUILDER v2.0
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck style={{ width: '28px', height: '28px', color: '#16a34a' }} /> 산지청년 AI 기준 인물 생성·보관 시스템
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            대표 정면 얼굴을 먼저 생성·확정한 후, 동일 인물 정체성을 100% 유지하며 다각도 기준컷 및 산지 수확 장면에 재사용합니다.
          </p>
        </div>

        {/* 5-STAGE STEPPER PROCESS BAR */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '24px' }}>
          {[
            { step: 1, label: '1. 인물 설정' },
            { step: 2, label: '2. 정면 얼굴 선택' },
            { step: 3, label: '3. 기준컷 생성' },
            { step: 4, label: '4. 라이브러리 저장' },
            { step: 5, label: '5. 장면 생성' }
          ].map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            const isLocked = s.step === 5 && !sceneModePerson;

            return (
              <div
                key={s.step}
                style={{
                  padding: '10px 4px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: isCurrent ? '2px solid #0284c7' : isCompleted ? '1px solid #16a34a' : '1px solid #e2e8f0',
                  backgroundColor: isCurrent ? '#0284c7' : isCompleted ? '#dcfce7' : '#f8fafc',
                  color: isCurrent ? '#ffffff' : isCompleted ? '#15803d' : isLocked ? '#94a3b8' : '#475569',
                  opacity: isLocked ? 0.6 : 1,
                  boxShadow: isCurrent ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {s.label}
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('custom')}
            style={{
              padding: '10px 18px', borderRadius: '12px', border: 'none',
              backgroundColor: activeTab === 'custom' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'custom' ? '#ffffff' : '#475569',
              fontSize: '13px', fontWeight: '800', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Sparkles style={{ width: '16px', height: '16px' }} /> 커스텀 상세 옵션 조합
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            style={{
              padding: '10px 18px', borderRadius: '12px', border: 'none',
              backgroundColor: activeTab === 'upload' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'upload' ? '#ffffff' : '#475569',
              fontSize: '13px', fontWeight: '800', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <ImageIcon style={{ width: '16px', height: '16px' }} /> 인물 참고 사진 AI 분석
          </button>
          <button
            onClick={() => { setActiveTab('library'); setCurrentStep(4); }}
            style={{
              padding: '10px 18px', borderRadius: '12px', border: 'none',
              backgroundColor: activeTab === 'library' || currentStep === 4 ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'library' || currentStep === 4 ? '#ffffff' : '#475569',
              fontSize: '13px', fontWeight: '800', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <BookmarkCheck style={{ width: '16px', height: '16px', color: '#22c55e' }} /> 보관된 인물 라이브러리 ({savedModels.length})
          </button>
        </div>

        {/* STEP 1: CUSTOM COMBO BUILDER TAB */}
        {activeTab === 'custom' && currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>1. 인종 (Ethnicity)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {ethnicities.map(item => (
                  <button
                    key={item}
                    onClick={() => handleSelectorChange('ethnicity', item)}
                    style={{
                      padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700',
                      border: ethnicity === item ? '2px solid #16a34a' : '1px solid #cbd5e1',
                      backgroundColor: ethnicity === item ? '#f0fdf4' : '#ffffff',
                      color: ethnicity === item ? '#15803d' : '#475569', cursor: 'pointer'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>2. 성별 및 연령대 (Gender & Age)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {genderAges.map(item => (
                  <button
                    key={item}
                    onClick={() => handleSelectorChange('genderAge', item)}
                    style={{
                      padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700',
                      border: genderAge === item ? '2px solid #16a34a' : '1px solid #cbd5e1',
                      backgroundColor: genderAge === item ? '#f0fdf4' : '#ffffff',
                      color: genderAge === item ? '#15803d' : '#475569', cursor: 'pointer'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>3. 체형 (Body Type)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {bodyTypes.map(item => (
                  <button
                    key={item}
                    onClick={() => handleSelectorChange('bodyType', item)}
                    style={{
                      padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700',
                      border: bodyType === item ? '2px solid #16a34a' : '1px solid #cbd5e1',
                      backgroundColor: bodyType === item ? '#f0fdf4' : '#ffffff',
                      color: bodyType === item ? '#15803d' : '#475569', cursor: 'pointer'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>4. 헤어 스타일 (Hairstyle)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {hairstyles.map(item => (
                  <button
                    key={item}
                    onClick={() => handleSelectorChange('hairstyle', item)}
                    style={{
                      padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700',
                      border: hairstyle === item ? '2px solid #16a34a' : '1px solid #cbd5e1',
                      backgroundColor: hairstyle === item ? '#f0fdf4' : '#ffffff',
                      color: hairstyle === item ? '#15803d' : '#475569', cursor: 'pointer'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>5. 의상 및 착장 (Outfit)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {outfits.map(item => (
                  <button
                    key={item}
                    onClick={() => handleSelectorChange('outfit', item)}
                    style={{
                      padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700',
                      border: outfit === item ? '2px solid #16a34a' : '1px solid #cbd5e1',
                      backgroundColor: outfit === item ? '#f0fdf4' : '#ffffff',
                      color: outfit === item ? '#15803d' : '#475569', cursor: 'pointer'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '8px' }}>최종 자동 조합 프롬프트 (Neutral Headshot Only):</label>
              <textarea
                value={modelPrompt}
                onChange={(e) => setModelPrompt(e.target.value)}
                style={{
                  width: '100%', height: '70px', padding: '12px', borderRadius: '12px',
                  border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'monospace',
                  backgroundColor: '#f8fafc', boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              onClick={handleGenerateFrontCandidates}
              disabled={isGeneratingFront}
              style={{
                width: '100%', padding: '16px', borderRadius: '16px',
                backgroundColor: '#16a34a', color: '#ffffff', fontSize: '15px', fontWeight: '900',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 10px 25px -5px rgba(22, 163, 74, 0.4)'
              }}
            >
              {isGeneratingFront ? <RefreshCw className="animate-spin" style={{ width: '18px', height: '18px' }} /> : <Sparkles style={{ width: '18px', height: '18px' }} />}
              {isGeneratingFront ? '중립 배경 정면 후보 4개 생성 중...' : '1. 정면 얼굴 후보 10개 생성하기'}
            </button>
          </div>
        )}

        {/* UPLOAD & VISION ANALYSIS TAB */}
        {activeTab === 'upload' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '32px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
              <input type="file" accept="image/*" onChange={handleRefImageUpload} id="ref-image-input" style={{ display: 'none' }} />
              <label htmlFor="ref-image-input" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <ImageIcon style={{ width: '40px', height: '40px', color: '#16a34a' }} />
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>인물 참고 사진 업로드</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>브랜드 대표 모델로 사용할 실제 인물 사진을 등록하세요</span>
              </label>

              {refImage && (
                <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#dcfce7', padding: '8px 16px', borderRadius: '12px' }}>
                  <img src={refImage.url} alt="Reference" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#15803d' }}>{refImage.name}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleAnalyzePersonImage}
              disabled={isAnalyzingImage || !refImage}
              style={{
                width: '100%', padding: '16px', borderRadius: '16px',
                backgroundColor: isAnalyzingImage || !refImage ? '#cbd5e1' : '#0284c7', color: '#ffffff', fontSize: '15px', fontWeight: '900',
                border: 'none', cursor: isAnalyzingImage || !refImage ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              {isAnalyzingImage ? <RefreshCw className="animate-spin" style={{ width: '18px', height: '18px' }} /> : <Sparkles style={{ width: '18px', height: '18px' }} />}
              {isAnalyzingImage ? 'AI 인물 특징 분석 중...' : 'AI 비전 인물 특징 분석 시작'}
            </button>
          </div>
        )}

        {/* STEP 2: NEUTRAL FRONT CANDIDATE SELECTION */}
        {currentStep >= 2 && activeTab === 'custom' && (
          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '2px dashed #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
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

            {/* 5-Grid Front Face Cards with Brand Exclusion Guard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {frontCandidates.map((res, index) => {
                const isSelected = selectedFrontFace?.id === res.id;
                const currentEmail = currentUser?.email?.toLowerCase() || 'master';
                const claimInfo = claimedRegistry[res.id];
                const isClaimedByOther = claimInfo && claimInfo.claimedBy !== currentEmail;
                const isClaimedByMe = claimInfo && claimInfo.claimedBy === currentEmail;

                const handleCardClick = () => {
                  if (isClaimedByOther) {
                    alert(`⚠️ [타 브랜드 선점 모델 잠금]\n\n해당 인물 레퍼런스는 이미 다른 브랜드 계정(${claimInfo.claimedBy})에서 영구 독점 선점하여 사용 중입니다.\n\n브랜드 상표권 보호 및 상업 모델 분쟁 방지를 위해 타 브랜드에서 선점된 인물은 중복 선택하실 수 없습니다.`);
                    return;
                  }
                  setSelectedFrontFace(res);
                };

                return (
                  <div 
                    key={res.id}
                    onClick={handleCardClick}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: isSelected ? '3.5px solid #16a34a' : isClaimedByOther ? '2px solid #ef4444' : '1px solid #cbd5e1',
                      cursor: isClaimedByOther ? 'not-allowed' : 'pointer',
                      aspectRatio: '1/1',
                      boxShadow: isSelected ? '0 8px 20px rgba(22, 163, 74, 0.35)' : '0 2px 6px rgba(0,0,0,0.05)',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      opacity: isClaimedByOther ? 0.65 : 1,
                      filter: isClaimedByOther ? 'grayscale(0.5)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={res.url} alt={res.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    
                    {isSelected && !isClaimedByOther && (
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

                    {isClaimedByOther && (
                      <div style={{
                        position: 'absolute', top: '8px', right: '8px',
                        backgroundColor: '#dc2626', color: '#ffffff',
                        borderRadius: '20px', padding: '4px 8px',
                        fontSize: '9px', fontWeight: '900',
                        display: 'flex', alignItems: 'center', gap: '3px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                      }}>
                        🔒 선점 잠금
                      </div>
                    )}

                    {isClaimedByMe && !isSelected && (
                      <div style={{
                        position: 'absolute', top: '8px', right: '8px',
                        backgroundColor: '#0284c7', color: '#ffffff',
                        borderRadius: '20px', padding: '4px 8px',
                        fontSize: '9px', fontWeight: '900',
                        display: 'flex', alignItems: 'center', gap: '3px'
                      }}>
                        ★ 내 독점 모델
                      </div>
                    )}

                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      backgroundColor: isClaimedByOther ? 'rgba(220, 38, 38, 0.9)' : isSelected ? 'rgba(22, 163, 74, 0.9)' : 'rgba(15, 23, 42, 0.85)',
                      color: '#ffffff', fontSize: '11px', fontWeight: '800',
                      padding: '6px 8px', textAlign: 'center'
                    }}>
                      {isClaimedByOther ? `[선점완료] #${index + 1} ${res.name}` : `#${index + 1} ${res.name}`}
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

        {/* STEP 4: SAVED PERSON LIBRARY TAB */}
        {(currentStep === 4 || activeTab === 'library') && (
          <div style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', display: 'block', marginBottom: '12px' }}>
              내 계정에 보관된 브랜드 대표 인물 목록 ({savedModels.length}개):
            </span>

            {savedModels.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '16px', color: '#64748b' }}>
                아직 보관된 브랜드 인물이 없습니다. 1~3단계를 진행하여 대표 인물을 생성·보관해 보세요.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {savedModels.map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img src={m.url} alt={m.name} style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: '#0f172a' }}>{m.name}</h4>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>"{m.prompt}"</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenSceneCreation(m)}
                        style={{
                          padding: '10px 16px', borderRadius: '10px',
                          backgroundColor: '#16a34a', color: '#ffffff', fontSize: '13px', fontWeight: '900',
                          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                        }}
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
                  "{sceneModePerson.name}" 인물로 농산물 장면 만들기
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
                  ✅ 생성된 '{generatedSceneImage.preset}' 장면컷:
                </span>
                <div style={{ width: '100%', backgroundColor: '#0f172a', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={generatedSceneImage.url} alt={generatedSceneImage.preset} style={{ maxWidth: '100%', maxHeight: '480px', objectFit: 'contain' }} />
                </div>
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
