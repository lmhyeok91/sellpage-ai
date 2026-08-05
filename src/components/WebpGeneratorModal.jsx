import React, { useState } from 'react';
import { Film, Download, Play, Check, RefreshCw, X, Sparkles, Sliders, Layers } from 'lucide-react';

export default function WebpGeneratorModal({ isOpen, onClose, onApplyToCanvas }) {
  const [selectedPreset, setSelectedPreset] = useState(1);
  const [fps, setFps] = useState(15);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState(860);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedWebp, setConvertedWebp] = useState(null);

  if (!isOpen) return null;

  const presets = [
    { id: 1, name: "1. 과즙 터짐 슬로모션", file: "1.webp", orig: "1.gif / 1.mp4", duration: "3.2초", desc: "참외/과일 단면 자를 때 즙이 팡 터지는 모션 컷" },
    { id: 2, name: "2. 새벽 산지직송 밭 수확", file: "2.webp", orig: "2.gif / 2.mp4", duration: "4.0초", desc: "새벽 5시 농가에서 신선하게 수확하는 감성 비디오" },
    { id: 3, name: "3. 18Brix 당도 센서 측정", file: "3.webp", orig: "3.gif / 3.mp4", duration: "2.5초", desc: "비파괴 레이저 당도 측정이 일어나는 모션" },
    { id: 4, name: "4. 아삭아삭 식감 확대", file: "4.webp", orig: "4.gif / 4.mp4", duration: "3.0초", desc: "한 입 베어 물 때 텍스처가 돋보이는 오감 모션" },
    { id: 5, name: "5. 농부 직송 24시간 배송", file: "5.webp", orig: "5.gif / 5.mp4", duration: "3.5초", desc: "우체국 당일 출고 차량 및 안전 에어백 포장" }
  ];

  const currentPreset = presets.find(p => p.id === selectedPreset) || presets[0];

  const handleStartConversion = () => {
    setIsConverting(true);
    setConvertedWebp(null);
    setTimeout(() => {
      setIsConverting(false);
      setConvertedWebp(currentPreset.file);
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '820px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Pretendard', sans-serif"
      }}>
        {/* Modal Header */}
        <div style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Film style={{ width: '20px', height: '20px', color: '#ffffff' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: '#ffffff' }}>🎞️ WebP 고화질 움짤 생성기</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0 0' }}>비디오(MP4/GIF)를 용량이 가벼운 초고화질 WebP 모션 컷으로 변환합니다.</p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}>
            <X style={{ width: '24px', height: '24px' }} />
          </button>
        </div>

        {/* Modal Main Content (2 Columns) */}
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxHeight: '75vh', overflowY: 'auto' }}>
          
          {/* Left Column: Preset 1~5 Selection & Video Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a' }}>1. 변환할 비디오 선택 (1~5번 모션 컷)</span>
              <span style={{ fontSize: '10px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '10px', fontWeight: '800' }}>
                영상만들기 폴더 연동
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset.id);
                    setConvertedWebp(null);
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: selectedPreset === preset.id ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    backgroundColor: selectedPreset === preset.id ? '#f0f9ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: selectedPreset === preset.id ? '#0369a1' : '#0f172a' }}>
                      {preset.name}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>{preset.duration}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{preset.desc}</p>
                </div>
              ))}
            </div>

            {/* Custom Video File Upload Option */}
            <div style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '14px',
              padding: '16px',
              textAlign: 'center',
              backgroundColor: '#fafbf8'
            }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block' }}>📁 또 다른 내 비디오(MP4) 업로드</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Veo 비디오나 촬영한 과일 영상을 WebP로 변환</span>
            </div>
          </div>

          {/* Right Column: Settings & WebP Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a' }}>2. WebP 변환 옵션 설정</span>

            {/* Controls */}
            <div style={{ backgroundColor: '#fafbf8', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', marginBottom: '4px' }}>
                  <span>프레임 레이트 (FPS)</span>
                  <span style={{ color: '#0284c7' }}>{fps} FPS</span>
                </div>
                <input type="range" min="10" max="30" value={fps} onChange={e => setFps(Number(e.target.value))} style={{ width: '100%' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', marginBottom: '4px' }}>
                  <span>화질 품질 (Quality)</span>
                  <span style={{ color: '#0284c7' }}>{quality}%</span>
                </div>
                <input type="range" min="50" max="95" value={quality} onChange={e => setQuality(Number(e.target.value))} style={{ width: '100%' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', marginBottom: '4px' }}>
                  <span>가로 해상도 (Width)</span>
                  <span style={{ color: '#0284c7' }}>{width}px (캔버스 맞춤)</span>
                </div>
                <input type="range" min="400" max="1080" step="20" value={width} onChange={e => setWidth(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            </div>

            {/* Action Convert Button */}
            <button
              onClick={handleStartConversion}
              disabled={isConverting}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                backgroundColor: isConverting ? '#94a3b8' : '#0284c7',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '14px',
                border: 'none',
                cursor: isConverting ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
              }}
            >
              {isConverting ? (
                <>
                  <RefreshCw style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                  WebP 초고화질 움짤 변환 중...
                </>
              ) : (
                <>
                  <Sparkles style={{ width: '18px', height: '18px' }} />
                  ⚡ WebP 움짤 변환 시작하기
                </>
              )}
            </button>

            {/* Preview & Apply Card */}
            {convertedWebp && (
              <div style={{
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: '900', fontSize: '13px' }}>
                  <Check style={{ width: '16px', height: '16px', color: '#059669' }} />
                  변환 완료! ({currentPreset.file} - 1.2 MB 초경량화)
                </div>

                <div style={{ width: '100%', padding: '12px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #a7f3d0', fontSize: '12px', color: '#334155', fontWeight: '700' }}>
                  🎬 {currentPreset.name} WebP 모션 파일 생성 준비 완료
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
                  <button onClick={() => alert(`📥 ${currentPreset.file} 파일이 바로 다운로드되었습니다.`)} style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px solid #059669', color: '#059669', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}>
                    📥 WebP 다운로드
                  </button>
                  <button onClick={() => { onApplyToCanvas(currentPreset.file); onClose(); }} style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#059669', color: '#ffffff', border: 'none', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}>
                    ✨ 현재 캔버스에 적용
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
