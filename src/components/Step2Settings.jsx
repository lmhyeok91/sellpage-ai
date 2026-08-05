import React from 'react';
import { Sliders, Monitor, Sparkles, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Step2Settings({
  canvasWidth, setCanvasWidth,
  aspectRatio, setAspectRatio,
  toneManner, setToneManner,
  onGenerate
}) {
  const tones = [
    { id: 'fresh', title: '🍃 산지 갓 수확 신선함', desc: '과즙, 당도, 수확 당일 직송 강조' },
    { id: 'farmer', title: '👨‍🌾 30년 농부 진정성 스토리', desc: '농부의 고집과 정직함, 유기농 흙' },
    { id: 'premium', title: '👑 18Brix 극상 당도 프리미엄', desc: '비파괴 당도 센서, 특A급 명품 과일' },
    { id: 'timesale', title: '🔥 선착순 100박스 타임세일', desc: '오늘 마감 임박, 산지 직송 한정 특가' }
  ];

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 py-6">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full inline-block mb-3">
          STEP 2 · AI 생성 설정
        </span>
        <h2 className="text-2xl font-black text-white mb-2">상세페이지 해상도 및 컨셉을 설정하세요</h2>
        <p className="text-xs text-gray-400">네이버 스마트스토어, 쿠팡, 쇼피 등 마켓에 맞춘 규격과 톤앤매너를 선택합니다.</p>
      </div>

      {/* Box 1: Resolution & Aspect Ratio */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h3 className="font-extrabold text-sm text-white mb-4 flex items-center gap-2">
          <Monitor className="w-4 h-4 text-amber-400" /> 상세페이지 해상도 & 규격 선택
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => { setCanvasWidth('860'); setAspectRatio('vertical'); }}
            className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${canvasWidth === '860' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'}`}
          >
            <div>
              <div className="text-xs font-bold text-amber-400 mb-1">스마트스토어 표준</div>
              <div className="text-base font-extrabold text-white">860 px</div>
              <p className="text-[10px] text-gray-400 mt-1">네이버 스마트스토어 모바일 최적화 폭</p>
            </div>
            <div className="mt-3 text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded w-max">권장 규격</div>
          </div>

          <div 
            onClick={() => { setCanvasWidth('1080'); setAspectRatio('vertical'); }}
            className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${canvasWidth === '1080' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'}`}
          >
            <div>
              <div className="text-xs font-bold text-emerald-400 mb-1">쿠팡 / 자사몰 고화질</div>
              <div className="text-base font-extrabold text-white">1080 px</div>
              <p className="text-[10px] text-gray-400 mt-1">쿠팡, 자사몰, 11번가 고해상도 폭</p>
            </div>
            <div className="mt-3 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded w-max">고화질 옵션</div>
          </div>

          <div 
            onClick={() => { setCanvasWidth('1080'); setAspectRatio('square'); }}
            className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${aspectRatio === 'square' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'}`}
          >
            <div>
              <div className="text-xs font-bold text-purple-400 mb-1">쇼피 / 정방형 (1:1)</div>
              <div className="text-base font-extrabold text-white">1:1 Square</div>
              <p className="text-[10px] text-gray-400 mt-1">해외 마켓 및 인스타그램 카탈로그</p>
            </div>
            <div className="mt-3 text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded w-max">글로벌 규격</div>
          </div>
        </div>
      </div>

      {/* Box 2: Tone & Manner */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 shadow-xl">
        <h3 className="font-extrabold text-sm text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-400" /> 세일즈 서사 & 톤앤매너 컨셉
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tones.map(t => (
            <div
              key={t.id}
              onClick={() => setToneManner(t.id)}
              className={`p-4 rounded-xl border cursor-pointer transition ${toneManner === t.id ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500 text-white' : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'}`}
            >
              <div className="font-bold text-sm text-white mb-1">{t.title}</div>
              <p className="text-xs text-gray-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={onGenerate}
          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-sm px-10 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition active:scale-95 flex items-center gap-3"
        >
          <Zap className="w-5 h-5 fill-black" />
          <span>3단계: 26개 세부 슬라이드 AI 자동 생성 & 편집 실행</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
