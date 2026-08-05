import React from 'react';
import { Upload, Image as ImageIcon, User, FileSpreadsheet, Plus, Trash2, CheckCircle } from 'lucide-react';

export default function Step1Upload({ 
  productImages, setProductImages,
  modelImages, setModelImages,
  productInfo, setProductInfo,
  reviewText, setReviewText,
  onNextStep
}) {
  const handleProductImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setProductImages([...productImages, ...newImgs]);
  };

  const handleModelImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setModelImages([...modelImages, ...newImgs]);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 py-6">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full inline-block mb-3">
          STEP 1 · 자료 등록 대시보드
        </span>
        <h2 className="text-2xl font-black text-white mb-2">제품 사진과 정보를 업로드해 주세요</h2>
        <p className="text-xs text-gray-400">제품 컷, 모델/농부 사진, 후기 데이터를 등록하면 AI가 26개 슬라이드로 분석·설계합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box 1: Product Images / PDF Dropzone */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" /> 제품컷 · 패키지컷 · 기존 상세 (최대 8개)
              </h3>
              <span className="text-[11px] text-amber-400 font-bold">{productImages.length}/8 개</span>
            </div>

            <label className="border-2 border-dashed border-gray-700 hover:border-amber-500/50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition bg-gray-950/50 mb-4">
              <Upload className="w-8 h-8 text-amber-400 mb-2" />
              <span className="text-xs font-bold text-gray-200">클릭하거나 이미지를 여기에 끌어다 놓으세요</span>
              <span className="text-[10px] text-gray-400 mt-1">PNG, JPG, WebP, PDF 지원 (1장당 10MB 이하)</span>
              <input type="file" multiple accept="image/*,.pdf" onChange={handleProductImageUpload} className="hidden" />
            </label>

            {productImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map(img => (
                  <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-700 aspect-square">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setProductImages(productImages.filter(i => i.id !== img.id))}
                      className="absolute top-1 right-1 bg-red-600/80 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Box 2: Model / Farmer Image Dropzone */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" /> 모델 · 농부 페르소나 이미지 등록
              </h3>
              <span className="text-[11px] text-emerald-400 font-bold">{modelImages.length}개</span>
            </div>

            <label className="border-2 border-dashed border-gray-700 hover:border-emerald-500/50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition bg-gray-950/50 mb-4">
              <User className="w-8 h-8 text-emerald-400 mb-2" />
              <span className="text-xs font-bold text-gray-200">농부님 얼굴 / 실사 모델 이미지 업로드</span>
              <span className="text-[10px] text-gray-400 mt-1">스토리브랜드 신뢰성 구축용</span>
              <input type="file" multiple accept="image/*" onChange={handleModelImageUpload} className="hidden" />
            </label>

            {modelImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {modelImages.map(img => (
                  <div key={img.id} className="relative group rounded-lg overflow-hidden border border-emerald-500/50 aspect-square">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setModelImages(modelImages.filter(i => i.id !== img.id))}
                      className="absolute top-1 right-1 bg-red-600/80 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Box 3: Additional Specs & Info */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h3 className="font-extrabold text-sm text-amber-400 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Plus className="w-4 h-4" /> 추가 정보 등록 (카피라이팅 반영용)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-gray-400 mb-1">상품명</label>
            <input 
              type="text"
              value={productInfo.title}
              onChange={e => setProductInfo({...productInfo, title: e.target.value})}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-white focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">보증 당도 (Brix)</label>
            <input 
              type="text"
              value={productInfo.brix}
              onChange={e => setProductInfo({...productInfo, brix: e.target.value})}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-white focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">청정 산지</label>
            <input 
              type="text"
              value={productInfo.origin}
              onChange={e => setProductInfo({...productInfo, origin: e.target.value})}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-white focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">농부 성함 & 경력</label>
            <input 
              type="text"
              value={productInfo.farmer}
              onChange={e => setProductInfo({...productInfo, farmer: e.target.value})}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-white focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">판매가</label>
            <input 
              type="text"
              value={productInfo.price}
              onChange={e => setProductInfo({...productInfo, price: e.target.value})}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-white focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">핵심 강점 / 특이사항</label>
            <input 
              type="text"
              value={productInfo.feature}
              onChange={e => setProductInfo({...productInfo, feature: e.target.value})}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-white focus:border-amber-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Box 4: Customer Reviews Excel/Text Parser */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-sm text-emerald-400 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> 고객 후기 입력 (엑셀 / 카톡 리뷰 파일 지원)
          </h3>
          <span className="text-[10px] text-gray-400">.xlsx, .csv 텍스트 일괄 파싱 지원</span>
        </div>

        <textarea 
          rows="3"
          placeholder="리뷰 문구를 줄바꿈으로 입력하거나 스마트스토어 리뷰 엑셀 텍스트를 붙여넣으세요..."
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          className="w-full bg-gray-950 border border-gray-700 rounded-xl p-3 text-xs text-white focus:border-emerald-500 outline-none resize-none"
        />
      </div>

      {/* Next Step Button */}
      <div className="flex justify-end">
        <button
          onClick={onNextStep}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 transition active:scale-95 flex items-center gap-2"
        >
          <span>2단계: 생성 설정으로 이동</span>
          <CheckCircle className="w-4 h-4 fill-black" />
        </button>
      </div>
    </div>
  );
}
