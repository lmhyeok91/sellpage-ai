import React from 'react';
import { Upload, FileSpreadsheet, Trash2 } from 'lucide-react';

export default function Step1MaterialUpload({
  productImages, setProductImages,
  modelImages, setModelImages,
  additionalInfo, setAdditionalInfo,
  reviewFile, setReviewFile,
  onNextStep
}) {
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

      {/* Numbered Card 2: 모델 이미지 등록 */}
      <div className="card-section">
        <div className="card-header">
          <div className="badge-num">2</div>
          <div className="card-title-group">
            <span className="card-sub-tag">있을 경우</span>
            <h2 className="card-title">모델 이미지 등록</h2>
            <p className="card-desc">
              특정 인물은 히어로어나 모델컷 전체에 맞출 때만 업로드하세요.
            </p>
          </div>
        </div>

        {/* Dropzone Box */}
        <label className="dropzone-box">
          <div className="dropzone-icon">
            <Upload style={{ width: '20px', height: '20px', color: '#475569' }} />
          </div>
          <span className="dropzone-title">모델 이미지 등록(있을 경우)</span>
          <span className="dropzone-sub">선택 사항입니다. 모델컷 생성 시 참조 이미지로 사용됩니다.</span>
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
    </div>
  );
}
