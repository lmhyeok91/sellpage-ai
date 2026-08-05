import React, { useState, useEffect } from 'react';
import { Upload, FileSpreadsheet, Trash2, Sparkles, UserCheck, Check } from 'lucide-react';
import AiModelGeneratorModal from './AiModelGeneratorModal';

export default function Step1MaterialUpload({
  productImages, setProductImages,
  modelImages, setModelImages,
  additionalInfo, setAdditionalInfo,
  reviewFile, setReviewFile,
  onNextStep
}) {
  const [isModelGenModalOpen, setIsModelGenModalOpen] = useState(false);
  const [savedBrandModel, setSavedBrandModel] = useState(null);
  const [savedModelsList, setSavedModelsList] = useState([
    {
      id: 1,
      name: '30대 대표 산지 농부 (기본 브랜딩)',
      url: '/example_media/1-1.jpg',
      prompt: '30대 초반의 미소가 친근한 한국인 남성 농부, 성주 참외 농장 배경, 밀짚모자와 선명한 미소'
    }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('saved_brand_model');
    if (saved) {
      try {
        setSavedBrandModel(JSON.parse(saved));
      } catch (e) {}
    } else {
      // Default sample brand model
      setSavedBrandModel(savedModelsList[0]);
    }
  }, []);

  const handleSelectAndSaveModel = (model) => {
    setSavedBrandModel(model);
    localStorage.setItem('saved_brand_model', JSON.stringify(model));
    if (!savedModelsList.some(m => m.id === model.id)) {
      setSavedModelsList([model, ...savedModelsList]);
    }
    // Also add to modelImages so it populates active upload
    setModelImages([
      { id: model.id, name: model.name, url: model.url }
    ]);
  };

  const handleDeleteSavedBrandModel = () => {
    setSavedBrandModel(null);
    localStorage.removeItem('saved_brand_model');
    alert('저장된 브랜드 인물 레퍼런스가 해제되었습니다.');
  };

  const handleDeleteModelFromList = (id) => {
    setSavedModelsList(savedModelsList.filter(m => m.id !== id));
    if (savedBrandModel?.id === id) {
      handleDeleteSavedBrandModel();
    }
  };

  const handleProductUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setProductImages([...productImages, ...newImgs]);
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
      {/* Numbered Card 1: 이미지/PDF 또는 상세페이지 등록 */}
      <div className="card-section">
        <div className="card-header">
          <div className="badge-num">1</div>
          <div className="card-title-group">
            <h2 className="card-title">이미지/PDF 또는 상세페이지 등록</h2>
            <p className="card-desc">
              여러 제품컷, 상세페이지 캡처, PDF 자료를 한 번에 올리면 대표 자료와 보조 자료를 함께 분석합니다.
            </p>
          </div>
        </div>

        {/* Dropzone Box */}
        <label className="dropzone-box">
          <div className="dropzone-icon">
            <Upload style={{ width: '20px', height: '20px', color: '#475569' }} />
          </div>
          <span className="dropzone-title">상세페이지 자료 업로드</span>
          <span className="dropzone-sub">제품컷, 패키지컷, 기존 상세페이지 캡처 이미지와 PDF를 여러 개 선택할 수 있습니다.</span>
          <span className="dropzone-note">
            최대 8개 · 상세페이지 이미지는 최대 5장까지 원본 반영 · PDF는 텍스트 반영
          </span>
          <input type="file" multiple accept="image/*,.pdf" onChange={handleProductUpload} style={{ display: 'none' }} />
        </label>

        {productImages.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginTop: '8px' }}>
            {productImages.map(img => (
              <div key={img.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', aspectRatio: '1/1' }}>
                <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
      </div>

      {/* Numbered Card 2: 모델 이미지 등록 & 브랜드 인물 레퍼런스 */}
      <div className="card-section">
        <div className="card-header">
          <div className="badge-num">2</div>
          <div className="card-title-group">
            <span className="card-sub-tag">있을 경우</span>
            <h2 className="card-title">모델 이미지 등록 &amp; AI 브랜드 인물 레퍼런스</h2>
            <p className="card-desc">
              특정 인물 모델을 AI로 생성하거나 사진을 저장하여 브랜드 일관성을 유지하세요.
            </p>
          </div>
        </div>

        {/* 브랜드 인물 레퍼런스 Box (UI Exact Match for Screenshot 2) */}
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
                {savedBrandModel ? '저장된 인물 레퍼런스 자동 사용 중' : '저장된 인물 레퍼런스 없음'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setIsModelGenModalOpen(true)}
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
            산지/출고/선별 장면 생성 시 같은 인물 기준 이미지로 자동 사용합니다.
          </p>

          {savedBrandModel && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '14px', backgroundColor: '#292524', padding: '12px 16px', borderRadius: '12px', border: '1px solid #57534e' }}>
              <img src={savedBrandModel.url} alt="Saved Brand Model" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #22c55e' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: '900', color: '#ffffff', display: 'block' }}>
                  {savedBrandModel.name} <span style={{ fontSize: '10px', color: '#22c55e', marginLeft: '6px' }}>[자동 브랜딩 적용 중]</span>
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
          placeholder="예: 상품명 부쉬맨 워터프루프 프로 선크림, 카테고리 선케어, 20대 여성, 여름 시즌, 네이버 스마트스토어용"
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
        savedModels={savedModelsList}
        onDeleteSavedModel={handleDeleteModelFromList}
      />
    </div>
  );
}
