import React from 'react';
import { Loader2, Film } from 'lucide-react';

export default function LoadingOverlay({ isOpen, title, subtitle, progress, remainingTime, currentStep, totalStep }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-[#fafbf8] border border-[#e2e4dc] rounded-3xl w-full max-w-2xl p-8 shadow-2xl flex flex-col gap-6 animate-scale-up">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white border border-[#e2e4dc] flex items-center justify-center shadow-sm text-gray-800 shrink-0">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block">이미지 생성 대기</span>
            <h3 className="text-xl font-black text-gray-900">{title || "AI가 상세페이지 구조를 만드는 중입니다"}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle || "제품을 분석하고 히어로 첫 장을 설계하는 중입니다."}</p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white border border-[#e2e4dc] rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-gray-900">{progress}% {progress < 100 ? '남음' : '완료'}</span>
            <span className="text-xs font-extrabold bg-[#dcfce7] text-[#15803d] px-3 py-1 rounded-full border border-[#bbf7d0]">
              {remainingTime || "약 3분 16초 남음"}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden p-0.5 border border-gray-200">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Option Badges */}
          <div className="flex items-center gap-2 pt-2 text-[11px]">
            <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-bold">
              선택 모델: OpenAI Image 2.0
            </span>
            <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-bold">
              생성 범위: {currentStep || 1}/{totalStep || 8} 장
            </span>
            <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-bold">
              통이미지 모드
            </span>
          </div>
        </div>

        {/* Theater Video Player Box */}
        <div className="bg-white border border-[#e2e4dc] rounded-2xl p-6 shadow-sm flex items-center justify-between gap-6">
          <div className="flex-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1">기다리는 동안</span>
            <h4 className="font-extrabold text-lg text-gray-900 mb-1 flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-500" /> 영상보며 기다리세요
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              생성이 끝나면 자동으로 편집 화면으로 넘어갑니다. 이 작은 극장, 꽤 쓸만합니다.
            </p>
          </div>

          <div className="w-64 h-36 bg-[#0f172a] rounded-xl overflow-hidden shadow-inner flex items-center justify-center text-white relative">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:scale-110 transition">
              ▶
            </div>
            <span className="absolute bottom-2 left-2 text-[10px] text-gray-400 bg-black/60 px-2 py-0.5 rounded">
              추천 영상 재생 중
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
