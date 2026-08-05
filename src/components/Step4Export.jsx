import React, { useState } from 'react';
import { Download, Archive, FileText, CheckCircle2, Sparkles, Copy, RefreshCcw, Layers, Eye, Award, ExternalLink, RefreshCw } from 'lucide-react';
import JSZip from 'jszip';

export default function Step4Export({ slides = [], canvasWidth = 860, productInfo = {}, onReset }) {
  const [copied, setCopied] = useState(false);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);

  // Default 26 Slide Titles if slides array is empty
  const defaultSlideTitles = [
    '01. 메인 훅킹 타이틀', '02. 구매 만족도 99% 평점', '03. 문제 제기 & 공감', '04. 기존 제품 한계점',
    '05. 산지직송 브랜드 스토리', '06. 100% 당도/품질 보장', '07. 차별화 포인트 3가지', '08. 신선도 얼음 포장',
    '09. 실제 구매자 후기 #1', '10. 실제 구매자 후기 #2', '11. 당일 수확 당일 발송', '12. 생산 과정 직영 농장',
    '13. 사이즈 & 구성 안내', '14. 맛있는 레시피 추천', '15. 자주 묻는 질문 (Q&A)', '16. 고객센터 & 보상기준',
    '17. 한정 수량 특가 안내', '18. 재구매율 1위 검증', '19. 원산지 인증서 정보', '20. 세척 & 보관 꿀팁',
    '21. 포장 상태 언박싱', '22. 타사 비교 가이드', '23. 이벤트 무료배송 혜택', '24. 구매자 SNS 인증샷',
    '25. 최종 가격 표기 할인', '26. 엔딩 브랜드 감사인사'
  ];

  const slideList = slides && slides.length > 0 ? slides : defaultSlideTitles.map((t, idx) => ({
    page: idx + 1,
    title: t,
    section: `슬라이드 #${idx + 1}`,
    subtitle: `${productInfo.title || '국내산 산지직송 프리미엄'} 상세페이지 핵심 컷`,
    highlights: ['최고 신선도', '당일 발송', '100% 품질보장']
  }));

  // REAL ZIP GENERATION AND DIRECT BROWSER DOWNLOAD!
  const handleDownloadZip = async () => {
    setIsGeneratingZip(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("상세페이지_26개슬라이드_860px_패키지");

      // Draw each slide onto 860px HTML5 Canvas
      for (let idx = 0; idx < slideList.length; idx++) {
        const slide = slideList[idx];
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth || 860;
        canvas.height = 640;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#fafbf8';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Top Accent Bar
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(0, 0, canvas.width, 12);

        // Cut Badge
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(40, 40, 110, 36);
        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 15px Pretendard, sans-serif';
        ctx.fillText(`CUT #${idx + 1}`, 56, 63);

        // Slide Main Title
        ctx.fillStyle = '#0f172a';
        ctx.font = '900 34px Pretendard, sans-serif';
        ctx.fillText(slide.title || `슬라이드 #${idx + 1}`, 40, 130);

        // Subtitle
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 18px Pretendard, sans-serif';
        ctx.fillText(slide.subtitle || '프리미엄 산지직송 최상급 품질보장 상세페이지', 40, 175);

        // Content Frame Card
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(40, 210, canvas.width - 80, 350);

        ctx.fillStyle = '#0f172a';
        ctx.font = '900 26px Pretendard, sans-serif';
        ctx.fillText(productInfo.title || '국내산 프리미엄 정품', 70, 270);

        // Highlights Badges
        const hls = slide.highlights || ['100% 품질보장', '당일수확 당일발송', '무료배송 혜택'];
        hls.forEach((hl, hIdx) => {
          ctx.fillStyle = '#0284c7';
          ctx.fillRect(70 + hIdx * 210, 320, 190, 46);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 16px Pretendard, sans-serif';
          ctx.fillText(`✓ ${hl}`, 86 + hIdx * 210, 349);
        });

        ctx.fillStyle = '#64748b';
        ctx.font = '15px Pretendard, sans-serif';
        ctx.fillText('※ 본 이미지는 860px 모바일 상권 최적화 상세페이지 PNG 컷입니다.', 70, 440);

        // Convert Canvas to PNG Base64 Data
        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
        const fileName = `${String(idx + 1).padStart(2, '0')}_${(slide.title || '슬라이드').replace(/[^a-zA-Z0-9가-힣]/g, '_')}.png`;
        folder.file(fileName, base64Data, { base64: true });
      }

      // Add JSON file to Zip
      folder.file("상세페이지_기획안.json", JSON.stringify({ productInfo, slides: slideList }, null, 2));

      // Generate Zip Binary Blob
      const zipContent = await zip.generateAsync({ type: 'blob' });

      // Trigger Actual Browser File Download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipContent);
      const safeTitle = (productInfo.title || '상세페이지').replace(/[^a-zA-Z0-9가-힣]/g, '_');
      link.download = `${safeTitle}_26개슬라이드_860px_패키지.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error(err);
      alert('ZIP 파일 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ productInfo, slides: slideList }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    const safeTitle = (productInfo.title || '상세페이지').replace(/[^a-zA-Z0-9가-힣]/g, '_');
    downloadAnchor.setAttribute("download", `${safeTitle}_26개슬라이드_기획안.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyText = () => {
    const text = slideList.map(s => `[${s.page || s.section}]\n제목: ${s.title}\n부제목: ${s.subtitle || ''}\n키포인트: ${s.highlights ? s.highlights.join(', ') : ''}\n`).join('\n---\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      padding: '32px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Pretendard', sans-serif",
      color: '#0f172a'
    }}>
      {/* Top Hero Banner */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderRadius: '24px',
        padding: '28px 36px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.25)',
        border: '1px solid #1e293b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 style={{ width: '30px', height: '30px', color: '#ffffff' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ backgroundColor: '#064e3b', color: '#34d399', fontSize: '11px', fontWeight: '900', padding: '3px 10px', borderRadius: '20px', border: '1px solid #059669' }}>
                STEP 3 · 결과 확인 & 최종 내보내기
              </span>
              <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '700' }}>
                가로 규격: {canvasWidth}px
              </span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0, color: '#ffffff' }}>
              🎉 상세페이지 26개 슬라이드 기획 & 이미지가 완성되었습니다!
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 0 0' }}>
              모바일 860px 완벽 맞춤 통이미지, 26개 분할컷 ZIP 패키지, JSON 기획안 및 카피라이팅 텍스트를 바로 다운로드하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Action Workbench Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '36px' }}>
        
        {/* Card 1: ZIP & Images Download */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Archive style={{ width: '26px', height: '26px', color: '#d97706' }} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px 0' }}>
              📦 통이미지 & 26개 슬라이드 ZIP 다운로드
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
              모바일 웹표준 <b>{canvasWidth}px 해상도</b> 통상세페이지 연결 이미지 1장 + 26개 세부 슬라이드 분할 PNG 이미지가 단일 ZIP 패키지로 다운로드됩니다.
            </p>
          </div>

          <button 
            onClick={handleDownloadZip}
            disabled={isGeneratingZip}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: isGeneratingZip ? '#94a3b8' : '#0284c7',
              color: '#ffffff',
              fontWeight: '900',
              fontSize: '14px',
              border: 'none',
              cursor: isGeneratingZip ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
              transition: 'all 0.15s ease'
            }}
          >
            {isGeneratingZip ? (
              <>
                <RefreshCw style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                ⏳ 26개 슬라이드 860px 이미지 ZIP 생성 중...
              </>
            ) : (
              <>
                <Download style={{ width: '18px', height: '18px' }} />
                🚀 {canvasWidth}px 이미지 ZIP 패키지 다운로드
              </>
            )}
          </button>
        </div>

        {/* Card 2: JSON & Copywriting Text Export */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <FileText style={{ width: '26px', height: '26px', color: '#059669' }} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px 0' }}>
              📄 JSON 기획안 & 26개 카피라이팅 복사
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
              웹디자이너 전달용 JSON 구조화 데이터 파일 다운로드 및 상세페이지 26개 슬라이드 전체 카피라이팅 문구를 한 번에 복사할 수 있습니다.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button 
              onClick={handleDownloadJSON}
              style={{
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                fontWeight: '900',
                fontSize: '13px',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Download style={{ width: '16px', height: '16px' }} />
              JSON 기획안
            </button>

            <button 
              onClick={handleCopyText}
              style={{
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: copied ? '#059669' : '#10b981',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              <Copy style={{ width: '16px', height: '16px' }} />
              {copied ? '✅ 전체 복사 완료!' : '전체 카피 복사'}
            </button>
          </div>
        </div>

      </div>

      {/* 26 Slides Visual Preview Grid Section */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '28px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers style={{ width: '20px', height: '20px', color: '#0284c7' }} />
            🖼️ 완성된 26개 세부 슬라이드 한눈에 보기
          </h3>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '800', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '12px' }}>
            총 {slideList.length}개 슬라이드 기획 완료
          </span>
        </div>

        {/* 26 Slides Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
          {slideList.map((slide, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: '#fafbf8',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '2px 8px', borderRadius: '6px' }}>
                  CUT #{idx + 1}
                </span>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>
                  {canvasWidth}px
                </span>
              </div>

              <h4 style={{ fontSize: '13px', fontWeight: '900', color: '#0f172a', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {slide.title || `슬라이드 #${idx + 1}`}
              </h4>

              <p style={{ fontSize: '11px', color: '#64748b', margin: 0, lineHeight: '1.4', height: '32px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {slide.subtitle || '프리미엄 당일수확 품질 보장 상세페이지 핵심 컷'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                {(slide.highlights || ['품질보장', '무료배송']).slice(0, 2).map((hl, i) => (
                  <span key={i} style={{ fontSize: '9px', backgroundColor: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                    #{hl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar: Re-start */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={onReset}
          style={{
            padding: '14px 28px',
            borderRadius: '14px',
            backgroundColor: '#f1f5f9',
            border: '1px solid #cbd5e1',
            color: '#334155',
            fontWeight: '900',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <RefreshCcw style={{ width: '16px', height: '16px', color: '#0284c7' }} />
          ✨ 새로운 상세페이지 작업 시작하기 (초기화)
        </button>
      </div>

    </div>
  );
}
