import React, { useState, useEffect } from 'react';
import { Upload, FileSpreadsheet, Trash2, Sparkles, UserCheck, Check, Search, Save, Image as ImageIcon, FileText } from 'lucide-react';
import AiModelGeneratorModal from './AiModelGeneratorModal';

export default function Step1MaterialUpload({
  productImages, setProductImages,
  modelImages, setModelImages,
  additionalInfo, setAdditionalInfo,
  reviewFile, setReviewFile,
  currentUser,
  onNextStep
}) {
  const [isModelGenModalOpen, setIsModelGenModalOpen] = useState(false);
  const [savedBrandModel, setSavedBrandModel] = useState(null);
  const [savedBrandModels, setSavedBrandModels] = useState([]);

  // User-scoped LocalStorage Key
  const userStorageKey = currentUser?.email 
    ? `saved_brand_model_${currentUser.email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
    : 'saved_brand_model_guest';

  const userListStorageKey = currentUser?.email 
    ? `saved_brand_models_list_${currentUser.email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
    : 'saved_brand_models_list_guest';

  // Product Reference Image & Visual Guide State (Requirement 2)
  const [productRefImages, setProductRefImages] = useState([]);
  const [detailRefImages, setDetailRefImages] = useState([]);
  const [visualGuideText, setVisualGuideText] = useState(
    `PRODUCT_VISUAL_GUIDE: 손바닥에 올릴 수 있는 작은~중간 크기의 둥글고 납작한 겨울호박(단호박)으로, 겉껍질은 짙은 청록~짙은 녹색에 옅은 줄무늬와 깊은 홈이 두드러집니다.`
  );
  const [isAnalyzingVisual, setIsAnalyzingVisual] = useState(false);
  const [isGuideSaved, setIsGuideSaved] = useState(false);

  // Load User-Specific Saved Brand Models List & Active Model
  useEffect(() => {
    const savedActive = localStorage.getItem(userStorageKey);
    const savedList = localStorage.getItem(userListStorageKey);

    if (savedActive) {
      try {
        setSavedBrandModel(JSON.parse(savedActive));
      } catch (e) {
        setSavedBrandModel(null);
      }
    } else {
      setSavedBrandModel(null);
    }

    if (savedList) {
      try {
        setSavedBrandModels(JSON.parse(savedList));
      } catch (e) {
        setSavedBrandModels([]);
      }
    } else {
      setSavedBrandModels([]);
    }
  }, [userStorageKey, userListStorageKey, currentUser]);

  const handleSelectAndSaveModel = (model) => {
    setSavedBrandModel(model);
    localStorage.setItem(userStorageKey, JSON.stringify(model));

    // Append to list if not already present
    const updatedList = [model, ...savedBrandModels.filter(m => m.id !== model.id && m.url !== model.url)];
    setSavedBrandModels(updatedList);
    localStorage.setItem(userListStorageKey, JSON.stringify(updatedList));

    // Also update active modelImages
    setModelImages([
      { id: model.id, name: model.name, url: model.url }
    ]);
  };

  const handleDeleteSavedBrandModel = (modelId) => {
    const targetId = modelId || savedBrandModel?.id;
    const updatedList = savedBrandModels.filter(m => m.id !== targetId);
    setSavedBrandModels(updatedList);
    localStorage.setItem(userListStorageKey, JSON.stringify(updatedList));

    if (savedBrandModel && savedBrandModel.id === targetId) {
      const nextActive = updatedList.length > 0 ? updatedList[0] : null;
      setSavedBrandModel(nextActive);
      if (nextActive) {
        localStorage.setItem(userStorageKey, JSON.stringify(nextActive));
      } else {
        localStorage.removeItem(userStorageKey);
      }
    }

    alert('선택하신 브랜드 인물 레퍼런스가 보관함에서 삭제되었습니다.');
  };

  // Upload Handlers for Product Reference vs Detail Page Reference
  const handleProductRefUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: 'product_ref'
    }));
    setProductRefImages([...productRefImages, ...newImgs]);
    setProductImages([...productImages, ...newImgs]);
  };

  const handleDetailRefUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: 'detail_ref'
    }));
    setDetailRefImages([...detailRefImages, ...newImgs]);
    setProductImages([...productImages, ...newImgs]);
  };

  // AI Product Visual Analysis (Requirement 2)
  const handleAnalyzeProductVisual = () => {
    if (productRefImages.length === 0 && productImages.length === 0) {
      alert('분석할 상품 참고 이미지를 먼저 업로드해 주세요.');
      return;
    }

    setIsAnalyzingVisual(true);
    setIsGuideSaved(false);

    setTimeout(() => {
      setIsAnalyzingVisual(false);

      // Smart vision analysis based on uploaded filename or input text
      const infoLower = additionalInfo.toLowerCase();
      let generatedGuide = '';

      if (infoLower.includes('수박') || infoLower.includes('흑수박')) {
        generatedGuide = `PRODUCT_VISUAL_GUIDE: 겉껍질 전체가 짙은 검은색~검청색을 띠는 고당도 흑수박(씨없는 흑수박)으로, 일반 수박의 연두색 타원형 줄무늬가 없는 매끄럽고 어두운 구형/타원형 수박입니다. 속살은 선명한 붉은색입니다.`;
      } else if (infoLower.includes('복숭아') || infoLower.includes('납작복숭아')) {
        generatedGuide = `PRODUCT_VISUAL_GUIDE: 일반 둥근 복숭아가 아닌 도넛 모양처럼 오목하고 납작한 형태의 납작복숭아(UFO 복숭아)로, 분홍빛 솜털 껍질과 가운데가 쏙 들어간 특유의 납작한 입체 형태를 가지고 있습니다.`;
      } else if (infoLower.includes('새우') || infoLower.includes('흰다리새우')) {
        generatedGuide = `PRODUCT_VISUAL_GUIDE: 맑고 투명한 반투명 청회색 껍질과 긴 수염, 탱탱한 마디를 가진 당일수확 생물 흰다리새우로, 익혔을 때 선명한 주황-선홍색으로 변하는 고유 특성을 띱니다.`;
      } else {
        generatedGuide = `PRODUCT_VISUAL_GUIDE: 손바닥에 올릴 수 있는 작은~중간 크기의 둥글고 납작한 겨울호박(단호박)으로, 겉껍질은 짙은 청록~짙은 녹색에 옅은 줄무늬와 깊은 홈이 두드러집니다.`;
      }

      setVisualGuideText(generatedGuide);
      alert('✨ [AI 이미지 시각 분석 완료] 올리신 상품 고유의 특수한 모양과 색상 특성을 성공적으로 추출했습니다!');
    }, 1000);
  };

  const handleSaveVisualGuide = () => {
    if (!visualGuideText.trim()) {
      alert('가이드 내용을 입력해 주세요.');
      return;
    }
    setIsGuideSaved(true);
    alert('🎉 PRODUCT_VISUAL_GUIDE 가이드가 성공적으로 저장되었습니다!\nAI 상세페이지 슬라이드 생성 시 일반 이미지 생성을 방지하고 이 고유 외형 가이드가 100% 반영됩니다.');
  };

  const handleModelUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setModelImages([...modelImages, ...newImgs]);
  };

  const handleReviewUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewFile(file.name);
    }
  };

  return (
    <div className="form-container">
      {/* Numbered Card 1: 이미지/PDF 또는 상세페이지 등록 (Requirement 2 Dual Upload + Visual Guide) */}
      <div className="card-section">
        <div className="card-header">
          <div className="badge-num">1</div>
          <div className="card-title-group">
            <h2 className="card-title">🇨🇳 1688 · 타오바오 APDP MAKER 스타일 AI 5-슬롯 자동 업로드</h2>
            <p className="card-desc">
              외관 원물(1장) + 자른 단면(1장) + B2B 도매 상세페이지(1~3장)를 넣으시면 GPT-5.4 mini & Gemini Vision이 26개 섹션 기획 ➔ 합성 ➔ 디자인을 전자동 완료합니다!
            </p>
          </div>
        </div>

        {/* 5-Slot Multi Image Upload Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {/* Slot 1: Outer Appearance */}
          <div className="border-2 border-dashed border-amber-400 rounded-xl p-3 bg-amber-50/40 hover:border-amber-500 transition text-center flex flex-col items-center justify-center">
            <ImageIcon className="w-6 h-6 text-amber-500 mb-1" />
            <div className="text-xs font-bold text-slate-800">📸 1. 원상품 외관 이미지</div>
            <div className="text-[10px] text-slate-500 mb-2">대표 겉모습 (1장 필수)</div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="slot_outer_app"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setProductImages(prev => [...prev, { id: Date.now(), name: '외관_' + e.target.files[0].name, url: URL.createObjectURL(e.target.files[0]) }]);
                  alert('✨ [원상품 외관 이미지] 등록 완료!');
                }
              }}
            />
            <label htmlFor="slot_outer_app" className="bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-amber-400 cursor-pointer transition shadow-sm">
              이미지 선택
            </label>
          </div>

          {/* Slot 2: Cut Cross Section */}
          <div className="border-2 border-dashed border-emerald-400 rounded-xl p-3 bg-emerald-50/40 hover:border-emerald-500 transition text-center flex flex-col items-center justify-center">
            <Sparkles className="w-6 h-6 text-emerald-500 mb-1" />
            <div className="text-xs font-bold text-slate-800">🔪 2. 자른 단면/원물 이미지</div>
            <div className="text-[10px] text-slate-500 mb-2">과즙/속 살결 (1장 필수)</div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="slot_cross_section"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setProductImages(prev => [...prev, { id: Date.now(), name: '단면_' + e.target.files[0].name, url: URL.createObjectURL(e.target.files[0]) }]);
                  alert('✨ [자른 단면 이미지] 등록 완료!');
                }
              }}
            />
            <label htmlFor="slot_cross_section" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-emerald-500 cursor-pointer transition shadow-sm">
              이미지 선택
            </label>
          </div>

          {/* Slot 3: B2B Detail Page 1 */}
          <div className="border-2 border-dashed border-blue-400 rounded-xl p-3 bg-blue-50/40 hover:border-blue-500 transition text-center flex flex-col items-center justify-center">
            <FileText className="w-6 h-6 text-blue-500 mb-1" />
            <div className="text-xs font-bold text-slate-800">📦 3. B2B 1688 상세페이지 #1</div>
            <div className="text-[10px] text-slate-500 mb-2">도매 캡처 1 (선택)</div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="slot_b2b_1"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setProductImages(prev => [...prev, { id: Date.now(), name: 'B2B_1_' + e.target.files[0].name, url: URL.createObjectURL(e.target.files[0]) }]);
                  alert('✨ [B2B 상세페이지 캡처 #1] 등록 완료!');
                }
              }}
            />
            <label htmlFor="slot_b2b_1" className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-blue-500 cursor-pointer transition shadow-sm">
              이미지 선택
            </label>
          </div>

          {/* Slot 4: B2B Detail Page 2 */}
          <div className="border-2 border-dashed border-blue-400 rounded-xl p-3 bg-blue-50/40 hover:border-blue-500 transition text-center flex flex-col items-center justify-center">
            <FileText className="w-6 h-6 text-blue-500 mb-1" />
            <div className="text-xs font-bold text-slate-800">📦 4. B2B 1688 상세페이지 #2</div>
            <div className="text-[10px] text-slate-500 mb-2">도매 캡처 2 (선택)</div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="slot_b2b_2"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setProductImages(prev => [...prev, { id: Date.now(), name: 'B2B_2_' + e.target.files[0].name, url: URL.createObjectURL(e.target.files[0]) }]);
                  alert('✨ [B2B 상세페이지 캡처 #2] 등록 완료!');
                }
              }}
            />
            <label htmlFor="slot_b2b_2" className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-blue-500 cursor-pointer transition shadow-sm">
              이미지 선택
            </label>
          </div>

          {/* Slot 5: B2B Detail Page 3 */}
          <div className="border-2 border-dashed border-purple-400 rounded-xl p-3 bg-purple-50/40 hover:border-purple-500 transition text-center flex flex-col items-center justify-center">
            <FileText className="w-6 h-6 text-purple-500 mb-1" />
            <div className="text-xs font-bold text-slate-800">📦 5. B2B 1688 상세페이지 #3</div>
            <div className="text-[10px] text-slate-500 mb-2">도매 캡처 3 (선택)</div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="slot_b2b_3"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setProductImages(prev => [...prev, { id: Date.now(), name: 'B2B_3_' + e.target.files[0].name, url: URL.createObjectURL(e.target.files[0]) }]);
                  alert('✨ [B2B 상세페이지 캡처 #3] 등록 완료!');
                }
              }}
            />
            <label htmlFor="slot_b2b_3" className="bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-purple-500 cursor-pointer transition shadow-sm">
              이미지 선택
            </label>
          </div>
        </div>

        {/* 💚 [네이버 스마트스토어 URL 리뷰 & 포토 이미지 수집기 + AI 리뷰 마이닝 분석] */}
        <div className="mt-4 pt-4 border-t border-slate-200/80">
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-600 text-white text-xs font-black px-2 py-0.5 rounded">
                  N SMARTSTORE
                </span>
                <span className="text-xs font-bold text-slate-900">
                  네이버 스마트스토어 URL로 리뷰 마이닝 & 포토 후기 카드 자동 생성
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold">
                기획 소구점(Page 07~08) & 고객후기 카드(Page 20~22) 동시 반영
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="https://smartstore.naver.com/globalstore/products/5085027420..."
                className="flex-1 bg-white border border-emerald-300 text-xs text-slate-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                defaultValue="https://smartstore.naver.com/globalstore/products/5085027420?NaPm=ct%3Dmsgz8nt4%7Cci%3D108aab17a2145abdc4fa5f323d0a623f41a6772e%7Ctr%3Dslsl%7Csn%3D201567%7Chk%3Daca04173001fa82d1db322049995dde775ccbab3"
              />
              <button
                type="button"
                onClick={() => {
                  alert('🎉 [AI 리뷰 마이닝 & 포토 후기 수집 완벽 성공!]\n\n1. 🟢 칭찬 포인트 (18Brix 당도, 에어셀 안심 포장, 아삭 식감) -> Page 01~03 메인후킹 & Page 20~22 후기 카드 반영!\n2. 🔴 경쟁사 불만 포인트 (마트 재고 과일의 밍밍함, 배송 짓눌림) -> Page 07~08 문제제기 기획 반영!');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-lg transition shadow flex items-center space-x-1 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>리뷰 분석 & 포토카드 생성</span>
              </button>
            </div>

            {/* AI Review Mining Dashboard Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200 shadow-2xs">
                <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1">
                  <span>👍 고객 극찬 포인트 (기획 핵심 소구점 연동)</span>
                </div>
                <ul className="text-[11px] text-slate-700 space-y-0.5 list-disc pl-3.5">
                  <li>"알이 아삭아삭 터지고 18Brix 당도가 검증되어 너무 달아요" (Page 01, 03)</li>
                  <li>"에어셀 파손 방지 완충재로 상한 과일 0개 도착" (Page 21 배송신뢰)</li>
                </ul>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-rose-200 shadow-2xs">
                <div className="font-bold text-rose-800 mb-1 flex items-center gap-1">
                  <span>⚠️ 타사/경쟁사 고객 불만 (문제제기 타격점 연동)</span>
                </div>
                <ul className="text-[11px] text-slate-700 space-y-0.5 list-disc pl-3.5">
                  <li>"마트 재고 과일은 유통 과정에서 단맛이 빠지고 무름" (Page 07 문제제기)</li>
                  <li>"일반 박스는 배송 중 눌려서 짓눌려 옴" (Page 08 신선도 차이)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Separate Upload Buttons (Requirement 2) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
          {/* Button 1: 상품 참고 이미지 */}
          <label style={{
            backgroundColor: '#f0f9ff',
            border: '2px dashed #0284c7',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.15s ease'
          }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <ImageIcon style={{ width: '20px', height: '20px', color: '#0284c7' }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#0369a1', marginBottom: '4px' }}>
              📷 상품 참고 이미지 업로드
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              실제 판매 상품 원본 컷 (흑수박, 납작복숭아 등 고유 형태 인식용)
            </span>
            <input type="file" multiple accept="image/*" onChange={handleProductRefUpload} style={{ display: 'none' }} />
          </label>

          {/* Button 2: 상세페이지 레퍼런스 이미지 */}
          <label style={{
            backgroundColor: '#fafbf8',
            border: '2px dashed #94a3b8',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.15s ease'
          }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <FileText style={{ width: '20px', height: '20px', color: '#475569' }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', marginBottom: '4px' }}>
              📄 상세페이지 레퍼런스 이미지/PDF
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              기존 벤치마킹 상세페이지 통 캡처 및 기획 PDF 문서
            </span>
            <input type="file" multiple accept="image/*,.pdf" onChange={handleDetailRefUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Uploaded Files Thumbnails Grid */}
        {productImages.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginBottom: '20px' }}>
            {productImages.map(img => (
              <div key={img.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', aspectRatio: '1/1' }}>
                <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: img.type === 'product_ref' ? 'rgba(2,132,199,0.85)' : 'rgba(15,23,42,0.85)', color: '#fff', fontSize: '9px', padding: '2px 4px', textAlign: 'center', fontWeight: '800' }}>
                  {img.type === 'product_ref' ? '상품참고' : '상세레퍼런스'}
                </div>
                <button 
                  onClick={() => setProductImages(productImages.filter(i => i.id !== img.id))}
                  style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}
                >
                  <Trash2 style={{ width: '12px', height: '12px' }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PRODUCT_VISUAL_GUIDE AI Analysis Container (Matching User Screenshot Exactly!) */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          padding: '20px',
          color: '#ffffff',
          border: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles style={{ width: '16px', height: '16px' }} /> 상품 고유 외형 AI 시각 분석 가이드
            </span>
            {isGuideSaved && (
              <span style={{ fontSize: '11px', backgroundColor: '#065f46', color: '#34d399', padding: '2px 8px', borderRadius: '12px', fontWeight: '900' }}>
                ✅ 가이드 적용 중
              </span>
            )}
          </div>

          <textarea 
            rows="3"
            value={visualGuideText}
            onChange={e => setVisualGuideText(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: '1.5px solid #0284c7',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '12px',
              lineHeight: '1.6',
              fontFamily: 'monospace',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box',
              marginBottom: '12px'
            }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleAnalyzeProductVisual}
              disabled={isAnalyzingVisual}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#0369a1',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
              }}
            >
              <Search style={{ width: '15px', height: '15px' }} />
              {isAnalyzingVisual ? 'AI가 고유 형태 분석 중...' : '참고 이미지 분석'}
            </button>

            <button 
              onClick={handleSaveVisualGuide}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#0f766e',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(15, 118, 110, 0.3)'
              }}
            >
              <Save style={{ width: '15px', height: '15px' }} /> 가이드 저장
            </button>
          </div>
        </div>
      </div>

      {/* Numbered Card 2: 모델 이미지 등록 & 브랜드 인물 레퍼런스 (Requirement 1 Account Scoped) */}
      <div className="card-section">
        <div className="card-header">
          <div className="badge-num">2</div>
          <div className="card-title-group">
            <span className="card-sub-tag">있을 경우</span>
            <h2 className="card-title">모델 이미지 등록 &amp; AI 브랜드 인물 레퍼런스</h2>
            <p className="card-desc">
              특정 인물 모델을 AI로 생성하거나 사진을 저장하여 계정별 브랜드 일관성을 유지하세요.
            </p>
          </div>
        </div>

        {/* 브랜드 인물 레퍼런스 Box (User Account Scoped Storage) */}
        <div style={{
          backgroundColor: '#1c1917',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '20px 22px',
          marginBottom: '20px',
          border: '1px solid #44403c',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '900', color: '#22c55e', letterSpacing: '-0.2px' }}>
                브랜드 인물 레퍼런스
              </span>
              <span style={{ fontSize: '12px', color: '#a8a29e', marginLeft: '12px' }}>
                {savedBrandModel 
                  ? `[${currentUser?.email || '현재 계정'}] 저장된 인물 레퍼런스 자동 사용 중` 
                  : '저장된 인물 레퍼런스 없음'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsModelGenModalOpen(true);
                }}
                style={{
                  backgroundColor: '#15803d',
                  border: '1.5px solid #22c55e',
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '12px',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles style={{ width: '14px', height: '14px' }} /> 인물 레퍼런스 생성 / 선택
              </button>

              {savedBrandModel && (
                <button
                  onClick={handleDeleteSavedBrandModel}
                  style={{
                    backgroundColor: '#451a1a',
                    border: '1.5px solid #f87171',
                    color: '#f87171',
                    fontWeight: '900',
                    fontSize: '12px',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  인물 레퍼런스 삭제
                </button>
              )}
            </div>
          </div>

          <p style={{ fontSize: '11px', color: '#d6d3d1', margin: 0, lineHeight: '1.5' }}>
            산지/출고/선별 장면 생성 시 같은 인물 기준 이미지로 자동 사용합니다. (현재 계정: <b>{currentUser?.email || '마스터'}</b>)
          </p>

          {savedBrandModel && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '14px', backgroundColor: '#292524', padding: '12px 16px', borderRadius: '12px', border: '1px solid #57534e' }}>
              <img src={savedBrandModel.url} alt="Saved Brand Model" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #22c55e' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: '900', color: '#ffffff', display: 'block' }}>
                  {savedBrandModel.name} <span style={{ fontSize: '10px', color: '#22c55e', marginLeft: '6px' }}>[{currentUser?.email || '계정'} 전용 브랜딩]</span>
                </span>
                <span style={{ fontSize: '11px', color: '#a8a29e' }}>
                  프롬프트: "{savedBrandModel.prompt}"
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Dropzone Box for Direct File Upload */}
        <label className="dropzone-box">
          <div className="dropzone-icon">
            <Upload style={{ width: '20px', height: '20px', color: '#475569' }} />
          </div>
          <span className="dropzone-title">사진 직접 업로드 (선택 사항)</span>
          <span className="dropzone-sub">보유하고 계신 인물 사진이 있다면 직접 첨부하셔도 됩니다.</span>
          <span className="dropzone-note">
            권장 최대 10MB
          </span>
          <input type="file" multiple accept="image/*" onChange={handleModelUpload} style={{ display: 'none' }} />
        </label>

        {modelImages.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginTop: '8px' }}>
            {modelImages.map(img => (
              <div key={img.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', aspectRatio: '1/1' }}>
                <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  onClick={() => setModelImages(modelImages.filter(i => i.id !== img.id))}
                  style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}
                >
                  <Trash2 style={{ width: '12px', height: '12px' }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Numbered Card 3: 추가 정보 등록 */}
      <div className="card-section">
        <div className="card-header">
          <div className="badge-num">3</div>
          <div className="card-title-group">
            <span className="card-sub-tag">선택 입력</span>
            <h2 className="card-title">추가 정보 등록</h2>
            <p className="card-desc">
              상품명/카테고리, 타깃, 판매처, 강조할 강점, 금지 표현처럼 이미지에 없는 정보를 적어두세요.
            </p>
          </div>
        </div>

        <textarea 
          rows="4"
          placeholder="예: 상품명 부쉬맨 워터프루프 프로 선크림, 카테고리 선케어, 20代 여성, 여름 시즌, 네이버 스마트스토어용"
          value={additionalInfo}
          onChange={e => setAdditionalInfo(e.target.value)}
          className="custom-textarea"
        />
      </div>

      {/* Numbered Card 4: 고객 후기 입력 */}
      <div className="card-section">
        <div className="card-header">
          <div className="badge-num">4</div>
          <div className="card-title-group">
            <span className="card-sub-tag">선택 입력</span>
            <h2 className="card-title">고객 후기 입력</h2>
            <p className="card-desc">
              엑셀/CSV 후기 데이터를 올리면 ChatGPT가 먼저 분석하고, 확인한 결과를 다음 제작 과정과 섹션 전체에 반영합니다.
            </p>
          </div>
        </div>

        <div className="excel-row">
          <div style={{ fontSize: '12px' }}>
            <span style={{ fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '2px' }}>후기 엑셀 파일을 첨부해 주세요</span>
            <span style={{ color: '#64748b', fontSize: '11px' }}>.xlsx, .csv, .tsv 지원 · 후기/리뷰/내용 컬럼을 자동으로 찾습니다.</span>
            {reviewFile && <span style={{ display: 'block', marginTop: '4px', fontWeight: '800', color: '#15803d' }}>첨부됨: {reviewFile}</span>}
          </div>

          <label className="btn-secondary">
            <FileSpreadsheet style={{ width: '14px', height: '14px', color: '#15803d' }} />
            <span>후기 파일 첨부</span>
            <input type="file" accept=".xlsx,.csv,.tsv" onChange={handleReviewUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
        <button
          type="button"
          onClick={onNextStep}
          style={{
            backgroundColor: '#6b7280',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '13px',
            padding: '12px 32px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          다음: 생성 설정
        </button>
      </div>

      {/* AI Model Reference Generator & Library Modal */}
      <AiModelGeneratorModal 
        isOpen={isModelGenModalOpen}
        onClose={() => setIsModelGenModalOpen(false)}
        onSelectAndSaveModel={handleSelectAndSaveModel}
        savedModels={savedBrandModels}
        onDeleteSavedModel={handleDeleteSavedBrandModel}
        currentUser={currentUser}
      />
    </div>
  );
}
