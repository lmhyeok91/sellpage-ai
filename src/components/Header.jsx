import React from 'react';
import { Key, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Header({ activeStep, setActiveStep, onOpenApiKeyModal, isApiKeySet }) {
  const steps = [
    { id: 1, label: '1. 자료 등록', desc: '제품컷·모델·엑셀리뷰' },
    { id: 2, label: '2. 생성 설정', desc: '해상도·컨셉·톤앤매너' },
    { id: 3, label: '3. 결과 편집', desc: '26슬라이드 캔버스 편집' },
    { id: 4, label: '4. 내보내기', desc: '통이미지·ZIP 다운로드' }
  ];

  return (
    <header className="h-16 border-b border-gray-800 bg-[#111827]/95 backdrop-blur-lg px-6 flex items-center justify-between sticky top-0 z-50 shadow-xl">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center font-black text-xl text-black shadow-lg shadow-amber-500/20">
          3.0
        </div>
        <div>
          <h1 className="font-extrabold text-base leading-tight flex items-center gap-2">
            <span>이민혁 상세페이지 마법사 3.0 Pro</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
              구독자 전용 · 26-Slide Master
            </span>
          </h1>
          <p className="text-[11px] text-gray-400">StoryBrand 7단계 서사구조 + 26개 세부 슬라이드 AI 자동 생성기</p>
        </div>
      </div>

      {/* 4-Step Navigation */}
      <nav className="flex items-center gap-2 bg-gray-900/90 border border-gray-800 p-1.5 rounded-2xl shadow-inner">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          const isDone = activeStep > step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/20 scale-105' 
                  : isDone 
                  ? 'bg-gray-800/80 text-amber-400 border border-amber-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span>{step.id}</span>}
              <div className="text-left">
                <div className="leading-tight">{step.label}</div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Right API Key Setting */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenApiKeyModal}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition active:scale-95 ${
            isApiKeySet 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>{isApiKeySet ? 'API 키 연동 완료' : 'API 키 설정'}</span>
        </button>
      </div>
    </header>
  );
}
