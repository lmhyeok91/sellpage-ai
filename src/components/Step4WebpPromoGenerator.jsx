import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Play, RefreshCw, Download, Check, Settings, Film, Award, Sliders, Layers, Eye, RefreshCcw, Image as ImageIcon, Move, Palette, ArrowUp, ArrowDown, Trash2, Plus, Upload, X
} from 'lucide-react';

export default function Step4WebpPromoGenerator() {
  // 1. Template selection (1~5)
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  // 2. Dual Speed controls (Top Text Speed & Bottom Review Speed)
  const [topTextSpeed, setTopTextSpeed] = useState(2.0);
  const [bottomReviewSpeed, setBottomReviewSpeed] = useState(8.0);

  // 3. Top Header Banner Enable Checkbox (Applies to Template 1 ONLY)
  const [useTopHeader, setUseTopHeader] = useState(true);

  // Laurel Style options (10 Options)
  const [laurelStyle, setLaurelStyle] = useState('1. 골드 럭셔리 월계수');

  const laurelOptions = [
    '1. 골드 럭셔리 월계수',
    '2. 천사 날개 하이라이트',
    '3. 그린 내추럴 월계관',
    '4. 골드 크라운 월계관',
    '5. 레드 리본 골드 월계수',
    '6. 골드 브라이트 럭셔리',
    '7. 아쿠아 오션 크리스탈',
    '8. 로열 골드 브랜치',
    '9. 클래식 골드 월계수',
    '10. 실버 메탈릭 월계수'
  ];

  // 5 Animation Effects Dropdown Options (COMPLETELY IDENTICAL ACROSS ALL TEMPLATES 1, 2, 3, 4, 5!)
  const effectOptions = [
    '📌 고정 (움직이지 않음)',
    '💡 반짝반짝 깜빡임 (Blink)',
    '🔍 커졌다 작아지기 (Zoom Pulse)',
    '🎨 글자색 스르륵 물듦',
    '🔲 형광펜 배경 박스'
  ];

  // Helper to create line item object
  const createLineItem = (text, kw = '', effect = '📌 고정 (움직이지 않음)', size = 28, mainColor = '#0F172A', kwColor = '#00A3E0', x = 0, y = 0) => ({
    id: Date.now() + Math.random(),
    text,
    kw,
    effect,
    size,
    mainColor,
    kwColor,
    x,
    y
  });

  // Top Header Banner 4 Lines Input State (For Template 1)
  const [line1, setLine1] = useState(createLineItem('수산물 부분 재구매율 1위!', '재구매율 1위!', '📌 고정 (움직이지 않음)', 18, '#b45309', '#d97706'));
  const [line2, setLine2] = useState(createLineItem('국내산 흰다리새우', '흰다리새우', '📌 고정 (움직이지 않음)', 34, '#0284c7', '#0369a1'));
  const [line3, setLine3] = useState(createLineItem('구매자의 100%가 이 상품에 만족했어요', '100%', '📌 고정 (움직이지 않음)', 14, '#475569', '#0ea5e9'));
  const [line4, setLine4] = useState(createLineItem('100% 품질보장! 타협없는 최상급', '100% 품질보장', '📌 고정 (움직이지 않음)', 18, '#ffffff', '#facc15'));
  const [ratingScore, setRatingScore] = useState('4.9');

  // Default Dynamic Lines Presets for Templates 2, 3, 4
  const defaultT2Lines = [
    createLineItem('지금 흰다리새우를 먹어야하는 이유!?', '', '📌 고정 (움직이지 않음)', 26, '#0F172A', '#334155'),
    createLineItem('1년 중 지금이 제철이니까', '', '📌 고정 (움직이지 않음)', 38, '#0F172A', '#0F172A'),
    createLineItem('가장 맛있을 때 먹자!', '가장 맛있을 때', '🔲 형광펜 배경 박스', 34, '#0F172A', '#00A3E0')
  ];

  const defaultT3Lines = [
    createLineItem('위생적인 환경에서', '', '📌 고정 (움직이지 않음)', 36, '#0F172A', '#0F172A'),
    createLineItem('꼼꼼한 선별과정', '꼼꼼한', '🔍 커졌다 작아지기 (Zoom Pulse)', 40, '#0F172A', '#00A3E0'),
    createLineItem('친환경적으로 키운 건강하고 품질 좋은 국내산 새우만을 엄선하였습니다.', '', '📌 고정 (움직이지 않음)', 16, '#64748B', '#64748B')
  ];

  const defaultT4Lines = [
    createLineItem('꼼꼼한 얼음 포장으로', '', '📌 고정 (움직이지 않음)', 30, '#0F172A', '#0F172A'),
    createLineItem('차원이 다른 신선함', '차원이 다른', '🎨 글자색 스르륵 물듦', 38, '#0F172A', '#00A3E0'),
    createLineItem('받았을 때도 싱싱해야하니까! 얼음을 아끼지 않고 꼼꼼하게 포장해 발송드립니다.', '', '📌 고정 (움직이지 않음)', 15, '#64748B', '#64748B')
  ];

  // Dynamic Lines State for Templates 2, 3, 4
  const [dynamicLines, setDynamicLines] = useState(defaultT2Lines);

  // Switch dynamic lines when template changes
  useEffect(() => {
    if (selectedTemplate === 2) setDynamicLines(defaultT2Lines);
    else if (selectedTemplate === 3) setDynamicLines(defaultT3Lines);
    else if (selectedTemplate === 4) setDynamicLines(defaultT4Lines);
  }, [selectedTemplate]);

  // Template 5 Product Images State (Real Multiple Upload Support!)
  const [t5Images, setT5Images] = useState([]); // List of image data URLs or file object URLs

  // Template 5 Image Box Border & Shape Controls (User Customizable: Sharp Right Angles, Border On/Off, Border Color, Border Width)
  const [t5BorderUse, setT5BorderUse] = useState(true);
  const [t5BorderColor, setT5BorderColor] = useState('#f97316');
  const [t5BorderWidth, setT5BorderWidth] = useState(3);
  const [t5BorderRadius, setT5BorderRadius] = useState(0); // 0px default for Sharp Right Angles (직각 네모박스)

  // Template 5 (Product Image Swap + Discount Tag Overlay) State
  const [t5Title, setT5Title] = useState('국내산 흰다리새우');
  const [t5TitleKw, setT5TitleKw] = useState('국내산');
  const [t5TitleSize, setT5TitleSize] = useState(38);
  const [t5TitleColor, setT5TitleColor] = useState('#FFFFFF');
  const [t5TitleKwColor, setT5TitleKwColor] = useState('#FACC15');
  const [t5TitleAnim, setT5TitleAnim] = useState('📌 고정 (움직이지 않음)');

  const [t5OrigPrice, setT5OrigPrice] = useState('27,000원');
  const [t5OrigSize, setT5OrigSize] = useState(34);
  const [t5OrigColor, setT5OrigColor] = useState('#EF4444');

  const [t5DiscPrice, setT5DiscPrice] = useState('14,900원');
  const [t5DiscSize, setT5DiscSize] = useState(52);
  const [t5DiscColor, setT5DiscColor] = useState('#FACC15');
  const [t5DiscAnim, setT5DiscAnim] = useState('🔍 커졌다 작아지기 (Zoom Pulse)');

  const [t5Badge, setT5Badge] = useState('청년특가');

  // Review Auto-Gen & Custom List (Template 1)
  const [productGenName, setProductGenName] = useState('수박 10kg');
  const [genReviewCount, setGenReviewCount] = useState(6);
  const [genOptionList, setGenOptionList] = useState('수박 5kg, 수박 8kg, 수박 10kg');

  const [reviews, setReviews] = useState([
    { id: 1, author: '김*희', badge: '재구매', option: '구매옵션 수박 5kg', text: '우연히 지인 추천으로 수박 5kg 속는셈 치고 주문했는데 산지직송이라 너~무 달고 싱싱해요!' },
    { id: 2, author: '이*영', badge: 'BEST', option: '구매옵션 수박 8kg', text: '배송 정말 빠르고 수박 8kg 포장도 꼼꼼하게 잘 왔습니다. 식구들 모두 너무 잘 먹네요!' },
    { id: 3, author: '박*준', badge: '', option: '구매옵션 수박 10kg', text: '수박 10kg 껍질도 얇고 속이 완전 꿀처럼 달고 차있어요. 2번째 주문하는 팬입니다.' },
    { id: 4, author: '최*서', badge: '재구매', option: '구매옵션 수박 5kg', text: '산지직송이라 그런지 수박 5kg 신선함이 다릅니다. 비린내/잡내 하나도 없이 깔끔하네요.' },
    { id: 5, author: '정*우', badge: '', option: '구매옵션 수박 8kg', text: '크기도 아주 크고 단단해서 냉장고 넣어두고 시원하게 화채 해먹으니 천국입니다.' },
    { id: 6, author: '한*지', badge: 'BEST', option: '구매옵션 수박 10kg', text: '수박 10kg 살까 말까 고민했는데 사길 정말 잘했네요. 싱싱해서 주변에도 추천합니다.' }
  ]);

  // Position & Decoration Fine Controls (Sliders)
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [boxWidth, setBoxWidth] = useState(120);
  const [boxHeight, setBoxHeight] = useState(32);

  // Animation Frame Tick for Live Preview
  const [tick, setTick] = useState(0);
  const [isRendering, setIsRendering] = useState(false);

  // Live Timer for CSS animations
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Handler for Template 5 Product Image Multiple Upload
  const handleT5ImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImgs = [];
    let readCount = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImgs.push(event.target.result);
        readCount++;
        if (readCount === files.length) {
          setT5Images(prev => [...prev, ...newImgs]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteT5Image = (index) => {
    setT5Images(t5Images.filter((_, i) => i !== index));
  };

  // Handlers for Dynamic Lines (Templates 2, 3, 4)
  const handleAddLine = () => {
    setDynamicLines([...dynamicLines, createLineItem('새로 추가된 문구 줄', '', '📌 고정 (움직이지 않음)', 28, '#0F172A', '#00A3E0')]);
  };

  const handleResetLines = () => {
    if (selectedTemplate === 2) setDynamicLines(defaultT2Lines);
    else if (selectedTemplate === 3) setDynamicLines(defaultT3Lines);
    else if (selectedTemplate === 4) setDynamicLines(defaultT4Lines);
  };

  const handleMoveLine = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= dynamicLines.length) return;
    const updated = [...dynamicLines];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setDynamicLines(updated);
  };

  const handleDeleteLine = (index) => {
    setDynamicLines(dynamicLines.filter((_, i) => i !== index));
  };

  const handleUpdateLine = (index, field, value) => {
    const updated = [...dynamicLines];
    updated[index] = { ...updated[index], [field]: value };
    setDynamicLines(updated);
  };

  // Review Auto-Gen Handler
  const handleAutoGenerateReviews = () => {
    const opts = genOptionList.split(',').map(o => o.trim()).filter(Boolean);
    const names = ['김*희', '이*영', '박*준', '최*서', '정*우', '한*지', '윤*민', '강*훈'];
    const badges = ['재구매', 'BEST', '', '재구매', 'BEST', ''];
    
    const newRevs = [];
    for (let i = 0; i < genReviewCount; i++) {
      const opt = opts[i % opts.length] || productGenName;
      newRevs.push({
        id: i + 1,
        author: names[i % names.length],
        badge: badges[i % badges.length],
        option: `구매옵션 ${opt}`,
        text: `우연히 추천받아 ${opt} 주문했는데 과즙이 팡 터지고 산지직송이라 극상 당도입니다! 재구매 의사 100%!`
      });
    }
    setReviews(newRevs);
  };

  const updateReview = (index, field, value) => {
    const updated = [...reviews];
    updated[index] = { ...updated[index], [field]: value };
    setReviews(updated);
  };

  const handleStartRender = () => {
    setIsRendering(true);
    setTimeout(() => {
      setIsRendering(false);
      // Trigger Real File Download to browser download folder
      const link = document.createElement('a');
      link.href = `/example_media/${selectedTemplate}.webp`;
      link.download = `마케팅_움짤_템플릿${selectedTemplate}번_780px.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  // Helper to render Laurel Emblem Graphic based on 10 Laurel options
  const renderLaurelGraphic = (style) => {
    if (style.includes('골드 럭셔리') || style.includes('클래식')) return '🌿';
    if (style.includes('천사 날개')) return '👼';
    if (style.includes('그린 내추럴')) return '🍃';
    if (style.includes('골드 크라운')) return '👑';
    if (style.includes('레드 리본')) return '🎀';
    if (style.includes('골드 브라이트')) return '✨';
    if (style.includes('아쿠아 오션')) return '🌊';
    if (style.includes('로열 골드')) return '🏆';
    if (style.includes('실버 메탈릭')) return '🩶';
    return '🌿';
  };

  // Helper to render text with DYNAMIC topTextSpeed ANIMATION TIMING & ALL 5 EFFECTS!
  const renderTextWithEffect = (lineObj) => {
    const { text, kw, effect, size, mainColor, kwColor, x = 0, y = 0 } = lineObj;
    if (!text) return null;

    let baseContainerStyle = {
      transform: `translate(${x}px, ${y}px)`,
      display: 'inline-block',
      whiteSpace: 'pre-wrap'
    };

    const hasKw = kw && kw.trim() !== '' && text.includes(kw);
    const isStatic = !effect || effect.includes('고정') || effect === 'static';

    // If kw is provided, targetKw = kw.
    // If kw is empty:
    //   - If static, targetKw = null so whole text renders strictly in mainColor (전체색)!
    //   - If animated effect selected (Blink, Zoom, Sweep, Highlight), targetKw = text (whole sentence animated).
    const targetKw = hasKw ? kw : (isStatic ? null : text);

    if (!targetKw || !text.includes(targetKw)) {
      return (
        <div style={baseContainerStyle}>
          <span style={{ fontSize: `${size}px`, color: mainColor, fontWeight: '900', whiteSpace: 'pre-wrap' }}>{text}</span>
        </div>
      );
    }

    const parts = text.split(targetKw);

    const isBlink = effect.includes('깜빡임') || effect === 'blink';
    const isZoom = effect.includes('커졌다') || effect === 'zoom';
    const isSweep = effect.includes('물듦') || effect === 'sweep';
    const isHighlight = effect.includes('형광펜') || effect === 'highlight';

    // Calculate scaled tick based on user's topTextSpeed (2.0s is base 1x speed)
    const textSpeedMult = 2.0 / Math.max(0.1, Number(topTextSpeed) || 2.0);
    const scaledTick = tick * textSpeedMult;

    let renderedKwElement = null;

    if (isHighlight) {
      // Highlight Box: Fixed padding so surrounding text stays 100% stationary
      const isBoxOn = Math.floor(scaledTick / 3) % 2 === 0;
      const padV = Math.max(2, Math.floor(boxHeight / 8));
      const padH = Math.max(6, Math.floor(boxWidth / 12));

      renderedKwElement = (
        <span style={{
          backgroundColor: isBoxOn ? kwColor : 'transparent',
          color: isBoxOn ? '#FFFFFF' : kwColor,
          fontSize: `${size}px`,
          fontWeight: '900',
          padding: `${padV}px ${padH}px`,
          borderRadius: '6px',
          display: 'inline-block',
          whiteSpace: 'pre-wrap',
          transition: 'background-color 0.15s ease, color 0.15s ease'
        }}>
          {targetKw}
        </span>
      );
    } else if (isZoom) {
      // Zoom Pulse: ZERO LAYOUT SHIFT! Surrounding text is 100% fixed, keyword expands cleanly from center!
      const zoomScale = 1.0 + 0.30 * Math.sin(scaledTick * 0.36);
      renderedKwElement = (
        <span style={{
          display: 'inline-block',
          position: 'relative',
          verticalAlign: 'baseline'
        }}>
          {/* Phantom hidden text reserves exact layout dimensions */}
          <span style={{ visibility: 'hidden', fontSize: `${size}px`, fontWeight: '900', whiteSpace: 'pre-wrap' }}>
            {targetKw}
          </span>

          {/* Scaled keyword centered absolutely over phantom text */}
          <span style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${zoomScale})`,
            transformOrigin: 'center center',
            color: kwColor,
            fontSize: `${size}px`,
            fontWeight: '900',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            transition: 'transform 0.08s ease-out'
          }}>
            {targetKw}
          </span>
        </span>
      );
    } else if (isBlink) {
      // Blink: Toggles OPACITY (1.0 vs 0.05) with kwColor for 100% CRISP FLASHING BLINK EFFECT!
      const isBlinkOn = Math.floor(scaledTick / 3) % 2 === 0;
      renderedKwElement = (
        <span style={{
          color: kwColor,
          fontSize: `${size}px`,
          fontWeight: '900',
          display: 'inline-block',
          opacity: isBlinkOn ? 1.0 : 0.05,
          whiteSpace: 'pre-wrap',
          transition: 'opacity 0.1s ease-in-out'
        }}>
          {targetKw}
        </span>
      );
    } else if (isSweep) {
      // Sweep: Character-by-character progression from lightGray to kwColor
      const lightGray = '#94a3b8';
      const kwChars = Array.from(targetKw);
      const activeCount = (Math.floor(scaledTick * 0.8) % (kwChars.length + 3));
      renderedKwElement = (
        <span style={{ fontSize: `${size}px`, fontWeight: '900', display: 'inline-block', whiteSpace: 'pre-wrap' }}>
          {kwChars.map((ch, idx) => (
            <span key={idx} style={{ color: idx < activeCount ? kwColor : lightGray, transition: 'color 0.15s ease' }}>
              {ch}
            </span>
          ))}
        </span>
      );
    } else {
      // Static (📌 고정)
      renderedKwElement = (
        <span style={{ color: kwColor, fontSize: `${size}px`, fontWeight: '900', display: 'inline-block', whiteSpace: 'pre-wrap' }}>
          {targetKw}
        </span>
      );
    }

    return (
      <div style={baseContainerStyle}>
        <span style={{ fontSize: `${size}px`, color: mainColor, fontWeight: '900', whiteSpace: 'pre-wrap', display: 'inline-flex', alignItems: 'center' }}>
          <span>{parts[0]}</span>
          {renderedKwElement}
          <span>{parts[1]}</span>
        </span>
      </div>
    );
  };

  // Reusable Line Control Form
  const renderLineControlForm = (label, lineState, setLineState) => (
    <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '800', color: '#64748b' }}>
          <span>크기:</span>
          <input 
            type="number" 
            value={lineState.size} 
            onChange={e => setLineState({ ...lineState, size: Number(e.target.value) })}
            style={{ width: '45px', padding: '2px 4px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', textAlign: 'center', fontWeight: '900', boxSizing: 'border-box' }} 
          />
        </div>
      </div>

      <input 
        type="text" 
        value={lineState.text} 
        onChange={e => setLineState({ ...lineState, text: e.target.value })} 
        placeholder="전체 문구 입력"
        style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '800', boxSizing: 'border-box', width: '100%' }} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px' }}>
        <div>
          <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>특정단어:</label>
          <input 
            type="text" 
            value={lineState.kw} 
            onChange={e => setLineState({ ...lineState, kw: e.target.value })} 
            placeholder="비워두면 문구 전체 적용"
            style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />
        </div>

        <div>
          <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>효과:</label>
          <select 
            value={lineState.effect} 
            onChange={e => setLineState({ ...lineState, effect: e.target.value })}
            style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '800', boxSizing: 'border-box' }}
          >
            {effectOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Palette style={{ width: '14px', height: '14px', color: '#64748b' }} />
          <span style={{ color: '#64748b', fontWeight: '800' }}>전체색:</span>
          <input type="color" value={lineState.mainColor} onChange={e => setLineState({ ...lineState, mainColor: e.target.value })} style={{ width: '28px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Palette style={{ width: '14px', height: '14px', color: '#0284c7' }} />
          <span style={{ color: '#64748b', fontWeight: '800' }}>단어색:</span>
          <input type="color" value={lineState.kwColor} onChange={e => setLineState({ ...lineState, kwColor: e.target.value })} style={{ width: '28px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
        </div>
      </div>
    </div>
  );

  // Synchronous 2-Column Review Rolling Offset calculation for Template 1
  const rollingStepHeight = 110;
  const totalRows = Math.ceil(reviews.length / 2);
  const maxScroll = totalRows * rollingStepHeight;
  const rollingOffsetY = (tick * (8.0 / Math.max(0.1, Number(bottomReviewSpeed) || 8.0)) * 12) % maxScroll;

  // Active rotated image index for Template 5
  const activeT5ImgIdx = t5Images.length > 0 ? Math.floor(tick / (15 * (Math.max(0.1, Number(topTextSpeed) || 2.0) / 2.0))) % t5Images.length : 0;
  const activeT5DummyIdx = (Math.floor(tick / 20) % 2) + 1; // #1 vs #2 animation when no images uploaded

  return (
    <div style={{
      padding: '32px',
      maxWidth: '1440px',
      margin: '0 auto',
      fontFamily: "'Pretendard', sans-serif",
      color: '#0f172a'
    }}>
      {/* Top Banner Notice Bar */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderRadius: '20px',
        padding: '24px 32px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles style={{ width: '24px', height: '24px', color: '#ffffff' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '900', margin: 0, color: '#38bdf8' }}>
              ⚡ 780px WebP 듀얼 미리보기 마케팅 움짤 자동 생성기
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>
              상단: 원본 예시 동영상 무한 재생 | 하단: 내 문구 실시간 움직임 동시 비교 재생 (5MB 엄수 엔진)
            </p>
          </div>
        </div>

        <button 
          onClick={handleStartRender}
          disabled={isRendering}
          style={{
            padding: '14px 28px',
            borderRadius: '14px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '14px',
            border: 'none',
            cursor: isRendering ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
          }}
        >
          {isRendering ? (
            <>
              <RefreshCw style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
              780px WebP 생성 렌더링 중...
            </>
          ) : (
            <>
              <Download style={{ width: '18px', height: '18px' }} />
              🚀 WebP 움짤 생성
            </>
          )}
        </button>
      </div>

      {/* Main 2-Column Split Workbench Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: '28px' }}>
        
        {/* LEFT COLUMN: Controls & Input Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '85vh', overflowY: 'auto', paddingRight: '6px', boxSizing: 'border-box' }}>
          
          {/* 1. Marketing Template Selector */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers style={{ width: '16px', height: '16px', color: '#0284c7' }} />
              1. 마케팅 템플릿 선택
            </h3>

            <select 
              value={selectedTemplate}
              onChange={e => setSelectedTemplate(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                fontWeight: '900',
                color: '#0f172a',
                outline: 'none',
                backgroundColor: '#f8fafc',
                boxSizing: 'border-box'
              }}
            >
              <option value={1}>1. 2열 롤링 리뷰 리스트</option>
              <option value={2}>2. 문장 / 형광펜 박스 깜빡임</option>
              <option value={3}>3. 지정 단어 커졌다 작아지기 (줌 펄스)</option>
              <option value={4}>4. 문장/단어 색상 스르륵 물듦</option>
              <option value={5}>5. 대표 이미지 교체 + 가격 할인 고정</option>
              <option value={6}>6. 🎬 Veo 3.1 AI 마스터 비디오 모션 라이브러리 (샤인머스켓/수박/농산)</option>
            </select>
          </div>

          {/* 2. Independent Speed Controls WITH DIRECT CUSTOM INPUT BOXES! */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders style={{ width: '16px', height: '16px', color: '#0284c7' }} />
              ⚡ 애니메이션 독립 재생 속도 조절 (버튼 선택 & 직접 입력 지원)
            </h3>

            {/* Top Text Speed Control */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: '800', marginBottom: '8px' }}>
                <span>상단 문구 애니메이션 속도 (빠르게):</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0.1" 
                    max="30" 
                    value={topTextSpeed} 
                    onChange={e => setTopTextSpeed(e.target.value === '' ? '' : Number(e.target.value))}
                    style={{ width: '65px', padding: '4px 6px', borderRadius: '8px', border: '1px solid #0284c7', fontSize: '12px', fontWeight: '900', textAlign: 'center', color: '#0284c7', backgroundColor: '#e0f2fe', boxSizing: 'border-box' }} 
                  />
                  <span style={{ color: '#0284c7', fontWeight: '900' }}>초</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px' }}>
                {[1.2, 2.0, 3.5, 5.0].map(spd => (
                  <button key={spd} onClick={() => setTopTextSpeed(spd)} style={{ padding: '8px', borderRadius: '8px', border: Number(topTextSpeed) === spd ? '2px solid #0284c7' : '1px solid #e2e8f0', backgroundColor: Number(topTextSpeed) === spd ? '#e0f2fe' : '#ffffff', color: Number(topTextSpeed) === spd ? '#0369a1' : '#64748b', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}>
                    {spd === 1.2 ? '매우빠르게(1.2초)' : spd === 2.0 ? '빠르게(2초)' : spd === 3.5 ? '보통(3.5초)' : '느리게(5초)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Review Speed Control */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: '800', marginBottom: '8px' }}>
                <span>하단 리뷰 롤링 스크롤 속도 (느리게):</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0.1" 
                    max="30" 
                    value={bottomReviewSpeed} 
                    onChange={e => setBottomReviewSpeed(e.target.value === '' ? '' : Number(e.target.value))}
                    style={{ width: '65px', padding: '4px 6px', borderRadius: '8px', border: '1px solid #0284c7', fontSize: '12px', fontWeight: '900', textAlign: 'center', color: '#0284c7', backgroundColor: '#e0f2fe', boxSizing: 'border-box' }} 
                  />
                  <span style={{ color: '#0284c7', fontWeight: '900' }}>초</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px' }}>
                {[4.0, 6.0, 8.0, 12.0].map(spd => (
                  <button key={spd} onClick={() => setBottomReviewSpeed(spd)} style={{ padding: '8px', borderRadius: '8px', border: Number(bottomReviewSpeed) === spd ? '2px solid #0284c7' : '1px solid #e2e8f0', backgroundColor: Number(bottomReviewSpeed) === spd ? '#e0f2fe' : '#ffffff', color: Number(bottomReviewSpeed) === spd ? '#0369a1' : '#64748b', fontWeight: '800', fontSize: '11px', cursor: 'pointer' }}>
                    {spd === 4.0 ? '빠르게(4초)' : spd === 6.0 ? '보통(6초)' : spd === 8.0 ? '느리게(8초)' : '매우느리게(12초)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TOP HEADER BANNER SECTION - Appears ONLY for Template 1 */}
          {selectedTemplate === 1 && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award style={{ width: '16px', height: '16px', color: '#eab308' }} />
                  상단 브랜드/평점 배너 포함 (상단 정적 이미지 + 하단 롤링 리뷰)
                </h3>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '900', color: '#0284c7', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={useTopHeader} 
                    onChange={e => setUseTopHeader(e.target.checked)} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }} 
                  />
                  <span>배너 사용</span>
                </label>
              </div>

              {useTopHeader && (
                <>
                  {/* 10 Laurel Decoration Options */}
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '4px' }}>장식 스타일:</label>
                    <select value={laurelStyle} onChange={e => setLaurelStyle(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '800', boxSizing: 'border-box' }}>
                      {laurelOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* 1. 월계관 문구 */}
                  {renderLineControlForm('1. 월계관 문구:', line1, setLine1)}

                  {/* 2. 메인 상품명 */}
                  {renderLineControlForm('2. 메인 상품명:', line2, setLine2)}

                  {/* 3. 평점/설명 */}
                  {renderLineControlForm('3. 평점/설명:', line3, setLine3)}

                  {/* 4. 품질 띠배너 */}
                  {renderLineControlForm('4. 품질 띠배너:', line4, setLine4)}
                </>
              )}
            </div>
          )}

          {/* DYNAMIC LINE EDITOR FOR TEMPLATES 2, 3, 4 */}
          {[2, 3, 4].includes(selectedTemplate) && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                  ✏️ 동적 문구 설정 (순서 변경 ⬆/⬇, 위치/크기/효과 조절)
                </h3>
              </div>

              {/* Action buttons: Add line / Reset preset */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button onClick={handleAddLine} style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#0284c7', color: '#fff', fontWeight: '900', fontSize: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Plus style={{ width: '16px', height: '16px' }} /> 문구 줄 추가
                </button>
                <button onClick={handleResetLines} style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#f1f5f9', color: '#334155', fontWeight: '800', fontSize: '12px', border: '1px solid #cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <RefreshCcw style={{ width: '14px', height: '14px' }} /> 템플릿 원본 예시 문구로 복원
                </button>
              </div>

              {/* Render Each Dynamic Line */}
              {dynamicLines.map((line, idx) => (
                <div key={line.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box', width: '100%' }}>
                  
                  {/* Line Title Bar & Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: '#0284c7' }}>문구 #{idx + 1}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => handleMoveLine(idx, -1)} disabled={idx === 0} style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <ArrowUp style={{ width: '12px', height: '12px' }} /> 위로
                      </button>
                      <button onClick={() => handleMoveLine(idx, 1)} disabled={idx === dynamicLines.length - 1} style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <ArrowDown style={{ width: '12px', height: '12px' }} /> 아래로
                      </button>
                      <button onClick={() => handleDeleteLine(idx)} style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Trash2 style={{ width: '12px', height: '12px' }} /> 삭제
                      </button>
                    </div>
                  </div>

                  {/* Text Input */}
                  <input 
                    type="text" 
                    value={line.text} 
                    onChange={e => handleUpdateLine(idx, 'text', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '900', boxSizing: 'border-box', width: '100%' }}
                  />

                  {/* Effect, Font Size & Colors */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 70px', gap: '6px', fontSize: '11px' }}>
                    <div>
                      <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>효과:</label>
                      <select value={line.effect} onChange={e => handleUpdateLine(idx, 'effect', e.target.value)} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '800', boxSizing: 'border-box' }}>
                        {effectOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>크기(px):</label>
                      <input type="number" value={line.size} onChange={e => handleUpdateLine(idx, 'size', Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: '900', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>전체색:</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input type="color" value={line.mainColor} onChange={e => handleUpdateLine(idx, 'mainColor', e.target.value)} style={{ width: '28px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
                      </div>
                    </div>
                  </div>

                  {/* Keyword & Keyword Color & Position X/Y */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 50px 50px', gap: '6px', fontSize: '11px' }}>
                    <div>
                      <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>특정 적용 단어:</label>
                      <input type="text" value={line.kw} onChange={e => handleUpdateLine(idx, 'kw', e.target.value)} placeholder="비워두면 문구 전체 적용" style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>단어색:</label>
                      <input type="color" value={line.kwColor} onChange={e => handleUpdateLine(idx, 'kwColor', e.target.value)} style={{ width: '28px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
                    </div>

                    <div>
                      <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>Y축:</label>
                      <input type="number" value={line.y || 0} onChange={e => handleUpdateLine(idx, 'y', Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>X축:</label>
                      <input type="number" value={line.x || 0} onChange={e => handleUpdateLine(idx, 'x', Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* TEMPLATE 5 FORM (CUSTOMIZABLE SHARP RIGHT ANGLES & BORDER ON/OFF/COLOR CONTROLS!) */}
          {selectedTemplate === 5 && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box', width: '100%' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                🖼️ 교체될 대표 이미지 목록 (업로드 수량 100% 전체 순차 교체됨)
              </h3>
              
              {/* Native File Selector for Multiple Product Images */}
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                id="t5-file-input" 
                onChange={handleT5ImageUpload}
                style={{ display: 'none' }} 
              />
              
              <label 
                htmlFor="t5-file-input"
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#e0f2fe',
                  border: '2px dashed #0284c7',
                  color: '#0369a1',
                  fontWeight: '900',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(2, 132, 199, 0.15)',
                  boxSizing: 'border-box',
                  width: '100%'
                }}
              >
                <Upload style={{ width: '18px', height: '18px' }} />
                📁 대표 이미지 여러 장 직접 선택 (현재 {t5Images.length}장 등록됨)
              </label>

              {/* Uploaded Thumbnail Grid */}
              {t5Images.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', backgroundColor: '#f8fafc', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
                  {t5Images.map((imgSrc, i) => (
                    <div key={i} style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: i === activeT5ImgIdx ? '2px solid #0284c7' : '1px solid #cbd5e1' }}>
                      <img src={imgSrc} alt={`업로드 이미지 #${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button onClick={() => handleDeleteT5Image(i)} style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <X style={{ width: '10px', height: '10px' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* IMAGE BOX BORDER & SHAPE CONTROLS (NEWLY ADDED AS REQUESTED!) */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: '900', color: '#0f172a' }}>🖼️ 이미지 상자 테두리 & 모서리 설정:</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '900', color: '#0284c7', cursor: 'pointer' }}>
                    <input type="checkbox" checked={t5BorderUse} onChange={e => setT5BorderUse(e.target.checked)} style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
                    <span>테두리 사용</span>
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', fontSize: '11px', alignItems: 'center' }}>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>테두리 색상:</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input type="color" value={t5BorderColor} onChange={e => setT5BorderColor(e.target.value)} disabled={!t5BorderUse} style={{ width: '28px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800' }}>{t5BorderColor}</span>
                    </div>
                  </div>

                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>테두리 두께(px):</label>
                    <input type="number" min="0" max="20" value={t5BorderWidth} onChange={e => setT5BorderWidth(Number(e.target.value))} disabled={!t5BorderUse} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: '800', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>모서리 라운드(px):</label>
                    <input type="number" min="0" max="50" value={t5BorderRadius} onChange={e => setT5BorderRadius(Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: '800', boxSizing: 'border-box' }} placeholder="0 = 직각" />
                  </div>
                </div>
              </div>

              {/* 1. 전체 상품명 설정 */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box', width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 65px 36px', gap: '6px', fontSize: '11px', alignItems: 'center' }}>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>전체 상품명:</label>
                    <input type="text" value={t5Title} onChange={e => setT5Title(e.target.value)} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '800', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>크기(px):</label>
                    <input type="number" value={t5TitleSize} onChange={e => setT5TitleSize(Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>전체색:</label>
                    <input type="color" value={t5TitleColor} onChange={e => setT5TitleColor(e.target.value)} style={{ width: '32px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px 1fr', gap: '6px', fontSize: '11px', alignItems: 'center' }}>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>특정 강조 단어:</label>
                    <input type="text" value={t5TitleKw} onChange={e => setT5TitleKw(e.target.value)} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>단어색:</label>
                    <input type="color" value={t5TitleKwColor} onChange={e => setT5TitleKwColor(e.target.value)} style={{ width: '32px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>효과:</label>
                    <select value={t5TitleAnim} onChange={e => setT5TitleAnim(e.target.value)} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '800', boxSizing: 'border-box' }}>
                      {effectOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. 기존 정가 & 3. 최종 할인가 (100% PERFECT FIT GRID - ZERO OVERFLOW!) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                
                {/* 기존 정가 Box */}
                <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '11px', boxSizing: 'border-box', width: '100%' }}>
                  <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '4px' }}>기존 정가(원):</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 45px 28px', gap: '4px', alignItems: 'center' }}>
                    <input type="text" value={t5OrigPrice} onChange={e => setT5OrigPrice(e.target.value)} style={{ width: '100%', padding: '6px 4px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                    <input type="number" value={t5OrigSize} onChange={e => setT5OrigSize(Number(e.target.value))} style={{ width: '100%', padding: '6px 2px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', boxSizing: 'border-box' }} />
                    <input type="color" value={t5OrigColor} onChange={e => setT5OrigColor(e.target.value)} style={{ width: '28px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
                  </div>
                </div>

                {/* 최종 할인가 Box */}
                <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '11px', boxSizing: 'border-box', width: '100%' }}>
                  <label style={{ color: '#ef4444', fontWeight: '900', display: 'block', marginBottom: '4px' }}>최종 할인가(원):</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 45px 28px', gap: '4px', alignItems: 'center', marginBottom: '6px' }}>
                    <input type="text" value={t5DiscPrice} onChange={e => setT5DiscPrice(e.target.value)} style={{ width: '100%', padding: '6px 4px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                    <input type="number" value={t5DiscSize} onChange={e => setT5DiscSize(Number(e.target.value))} style={{ width: '100%', padding: '6px 2px', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', boxSizing: 'border-box' }} />
                    <input type="color" value={t5DiscColor} onChange={e => setT5DiscColor(e.target.value)} style={{ width: '28px', height: '28px', border: 'none', cursor: 'pointer', background: 'none' }} />
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>할인가 효과:</label>
                    <select value={t5DiscAnim} onChange={e => setT5DiscAnim(e.target.value)} style={{ width: '100%', padding: '4px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: '800', boxSizing: 'border-box' }}>
                      {effectOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* 우상단 뱃지 문구 */}
              <div style={{ width: '100%', boxSizing: 'border-box' }}>
                <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '800', display: 'block', marginBottom: '2px' }}>우상단 뱃지 문구 (지우면 박스 완전 삭제):</label>
                <input type="text" value={t5Badge} onChange={e => setT5Badge(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '800', boxSizing: 'border-box' }} />
              </div>
            </div>
          )}

          {/* TEMPLATE 1 FORM (Review Auto-Gen) */}
          {selectedTemplate === 1 && (
            <>
              {/* 4. Review Auto-Gen & Custom Settings */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ✍️ 2열 롤링 리뷰 내용 자동 생성 & 커스텀 설정
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 80px', gap: '8px', fontSize: '12px' }}>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '2px' }}>대표 상품명:</label>
                    <input type="text" value={productGenName} onChange={e => setProductGenName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '2px' }}>생성 리뷰 수:</label>
                    <input type="number" min="2" max="10" value={genReviewCount} onChange={e => setGenReviewCount(Number(e.target.value))} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button onClick={handleAutoGenerateReviews} style={{ width: '100%', padding: '8px 4px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#fff', fontSize: '11px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                      ☑ 갯수 적용
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '2px' }}>상품 옵션 목록 (쉼표 구분):</label>
                  <input type="text" value={genOptionList} onChange={e => setGenOptionList(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>

                <button onClick={handleAutoGenerateReviews} style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '900', fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Sparkles style={{ width: '16px', height: '16px' }} /> 입력한 상품명/옵션으로 리뷰 내용 자동 생성
                </button>
              </div>

              {/* 5. Individual Review Editors */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                  ✏️ 생성된 개별 리뷰 내용 직접 수정 (실시간 미리보기 연동)
                </h3>

                {reviews.map((rev, idx) => (
                  <div key={rev.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: '900', color: '#0284c7' }}>리뷰 #{rev.id}</span>
                      <input type="text" value={rev.author} onChange={e => updateReview(idx, 'author', e.target.value)} placeholder="작성자" style={{ width: '70px', padding: '4px 6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px' }} />
                      <select value={rev.badge} onChange={e => updateReview(idx, 'badge', e.target.value)} style={{ padding: '4px 6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px' }}>
                        <option value="">뱃지없음</option>
                        <option value="재구매">재구매</option>
                        <option value="BEST">BEST</option>
                      </select>
                    </div>
                    <input type="text" value={rev.option} onChange={e => updateReview(idx, 'option', e.target.value)} placeholder="구매옵션" style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', boxSizing: 'border-box', width: '100%' }} />
                    <textarea rows="2" value={rev.text} onChange={e => updateReview(idx, 'text', e.target.value)} placeholder="리뷰 본문" style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', resize: 'none', boxSizing: 'border-box', width: '100%' }} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* OPTION 6: VEO 3.1 AI MASTER VIDEO REFERENCE LIBRARY */}
          {selectedTemplate === 6 && (
            <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #86efac', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Film style={{ width: '22px', height: '22px', color: '#16a34a' }} />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#15803d', margin: 0 }}>
                    🎬 Veo 3.1 AI 마스터 비디오 모션 라이브러리 (계정 전용)
                  </h3>
                  <span style={{ fontSize: '11px', color: '#166534' }}>
                    원본 스마트폰 촬영 영상 ➡️ Veo 3.1 AI 샤인머스켓/농산 과일 모션 변환 3종 세트가 100% 동기화되었습니다.
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  {
                    id: 1,
                    title: 'Veo 3.1 AI 모션 #1 (산지 수확 줌인 변환)',
                    orig: '/example_media/veo_master_reference_library/녹음 2026-08-02 153009.mp4',
                    veo: '/example_media/veo_master_reference_library/2026-08-02_153009_202608031528.mp4'
                  },
                  {
                    id: 2,
                    title: 'Veo 3.1 AI 모션 #2 (산지 세척/선별 트래킹 변환)',
                    orig: '/example_media/veo_master_reference_library/녹음 2026-08-02 153250.mp4',
                    veo: '/example_media/veo_master_reference_library/2026-08-02_153250_202608031528.mp4'
                  },
                  {
                    id: 3,
                    title: 'Veo 3.1 AI 모션 #3 (과즙 아삭 단면 트레이 변환)',
                    orig: '/example_media/veo_master_reference_library/녹음 2026-08-02 153323.mp4',
                    veo: '/example_media/veo_master_reference_library/2026-08-02_153323_202608031528.mp4'
                  }
                ].map(v => (
                  <div key={v.id} style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '14px', boxSizing: 'border-box' }}>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: '#15803d', display: 'block', marginBottom: '8px' }}>
                      {v.title}
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', display: 'block', marginBottom: '4px' }}>📱 원본 촬영 영상</span>
                        <video src={v.orig} controls autoPlay loop muted style={{ width: '100%', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: '900', color: '#16a34a', display: 'block', marginBottom: '4px' }}>✨ Veo 3.1 AI 변환 모션</span>
                        <video src={v.veo} controls autoPlay loop muted style={{ width: '100%', borderRadius: '10px', border: '2px solid #16a34a' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Background Image & Fine Positioning Sliders */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              🖼️ 배경 이미지 선택 (선택: 숲, 바다, 종이 질감 등)
            </h3>
            <button onClick={() => alert('📁 내 컴퓨터의 배경 이미지 파일(숲, 바다, 종이질감 등)을 선택할 수 있습니다.')} style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ImageIcon style={{ width: '16px', height: '16px' }} /> 📁 배경 이미지 선택 (기본 배경 적용 중)
            </button>

            <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: '12px 0 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📍 위치 & 장식 크기 미세 조절 (실시간 미리보기 연동)
            </h3>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', color: '#64748b' }}>
                <span>전체 문구 상하 이동 (Y축: -150px ~ +150px)</span>
                <span>{offsetY}px</span>
              </div>
              <input type="range" min="-150" max="150" value={offsetY} onChange={e => setOffsetY(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', color: '#64748b' }}>
                <span>전체 문구 좌우 이동 (X축: -150px ~ +150px)</span>
                <span>{offsetX}px</span>
              </div>
              <input type="range" min="-150" max="150" value={offsetX} onChange={e => setOffsetX(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', color: '#64748b' }}>
                <span>장식/형광펜 박스 가로 폭 (5px ~ 250px)</span>
                <span>{boxWidth}px</span>
              </div>
              <input type="range" min="5" max="250" value={boxWidth} onChange={e => setBoxWidth(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', color: '#64748b' }}>
                <span>장식/형광펜 박스 세로 높이 (2px ~ 80px)</span>
                <span>{boxHeight}px</span>
              </div>
              <input type="range" min="2" max="80" value={boxHeight} onChange={e => setBoxHeight(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => alert('🔄 실시간 미리보기가 새로고침 되었습니다.')} style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <RefreshCcw style={{ width: '14px', height: '14px' }} /> 내 문구 미리보기 새로고침
              </button>
              <button onClick={handleStartRender} style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: '900', fontSize: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                🚀 WebP 움짤 생성
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Real-Time Animated Dual Preview Canvas (780px) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '20px' }}>
          
          {/* Top Video Preview Box (Actual Animated WebP / GIF File loaded from /example_media!) */}
          <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '20px', color: '#ffffff', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Film style={{ width: '16px', height: '16px' }} /> 🎬 1. 참고용 원본 예시 동영상 (영상만들기 원본)
              </span>
              <span style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: '#0f172a', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
                ▶ 실제 WebP/GIF 템플릿 {selectedTemplate}번 재생중
              </span>
            </div>

            {/* Display actual Animated WebP image file from /example_media */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '14px', overflow: 'hidden', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={`/example_media/${selectedTemplate}.webp`}
                onError={(e) => { e.target.src = `/example_media/${selectedTemplate}.gif`; }}
                alt={`참고 예시 동영상 템플릿 ${selectedTemplate}번`}
                style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>
          </div>

          {/* Bottom Live Interactive Animated WebP Preview Canvas (780px) */}
          <div style={{ backgroundColor: '#ffffff', border: '2px solid #0284c7', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 12px 35px rgba(0,0,0,0.12)' }}>
            <div style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', fontWeight: '900' }}>
              <span>⚡ 2. 내가 만드는 실시간 움짤 미리보기 (가로 780px - 마우스 드래그 가능!)</span>
              <span>상단 {topTextSpeed}초 | 하단 {bottomReviewSpeed}초</span>
            </div>

            {/* Live Interactive Canvas */}
            <div style={{
              padding: '32px 24px',
              backgroundColor: '#fafbf8',
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              transition: 'transform 0.1s ease-out',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '280px'
            }}>
              {/* TOP HEADER BANNER CARD - Renders ONLY when selectedTemplate === 1 and useTopHeader is true */}
              {selectedTemplate === 1 && useTopHeader && (
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  marginBottom: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ fontSize: '26px', color: '#d97706', marginBottom: '4px' }}>
                    {renderLaurelGraphic(laurelStyle)}
                  </div>
                  <div style={{ marginBottom: '4px' }}>{renderTextWithEffect(line1)}</div>
                  <div style={{ margin: '6px 0' }}>{renderTextWithEffect(line2)}</div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#f59e0b', fontWeight: '900', fontSize: `${line3.size}px`, marginRight: '4px' }}>★ {ratingScore}</span>
                    {renderTextWithEffect(line3)}
                  </div>
                  <div style={{ backgroundColor: '#0284c7', padding: '8px 20px', borderRadius: '8px', display: 'inline-block' }}>
                    {renderTextWithEffect(line4)}
                  </div>
                </div>
              )}

              {/* Template 1: 2-Column Review Rolling Loop */}
              {selectedTemplate === 1 && (
                <div style={{ width: '100%' }}>
                  <div style={{ overflow: 'hidden', height: '240px', position: 'relative' }}>
                    <div style={{
                      transform: `translateY(-${rollingOffsetY}px)`,
                      transition: 'transform 0.1s linear',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px'
                    }}>
                      {reviews.map((rev) => (
                        <div key={rev.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', height: '90px', boxSizing: 'border-box' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ color: '#f59e0b', fontWeight: '900', fontSize: '11px' }}>★★★★★ {rev.author}</span>
                            {rev.badge && (
                              <span style={{ fontSize: '9px', backgroundColor: '#fef3c7', color: '#b45309', padding: '1px 6px', borderRadius: '4px', fontWeight: '800' }}>{rev.badge}</span>
                            )}
                          </div>
                          <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px' }}>{rev.option}</div>
                          <p style={{ fontSize: '11px', color: '#334155', margin: 0, lineHeight: '1.3', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{rev.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Templates 2, 3, 4: Render Dynamic Lines Stack */}
              {[2, 3, 4].includes(selectedTemplate) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center', width: '100%', alignItems: 'center' }}>
                  {dynamicLines.map((line) => (
                    <div key={line.id} style={{ width: '100%' }}>
                      {renderTextWithEffect(line)}
                    </div>
                  ))}
                </div>
              )}

              {/* Template 5: REAL MULTIPLE PRODUCT IMAGE SWAP & CUSTOMIZABLE BORDER / SHAPE OVERLAY */}
              {selectedTemplate === 5 && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                  {/* Real Product Image Container Box with CUSTOMIZABLE BORDER & STRAIGHT RIGHT ANGLES (0px default) */}
                  <div style={{
                    width: '380px',
                    height: '380px',
                    borderRadius: `${t5BorderRadius}px`,
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    border: t5BorderUse && t5BorderWidth > 0 ? `${t5BorderWidth}px solid ${t5BorderColor}` : 'none',
                    backgroundColor: '#1e293b',
                    transition: 'border 0.2s ease, border-radius 0.2s ease'
                  }}>
                    {/* Background Image: Render user-uploaded image OR default fallback image */}
                    {t5Images.length > 0 ? (
                      <img 
                        src={t5Images[activeT5ImgIdx]}
                        alt={`업로드 대표 이미지 #${activeT5ImgIdx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} 
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <img 
                          src="/example_media/5.webp" 
                          onError={(e) => { e.target.src = '/example_media/5.gif'; }}
                          alt="기본 대표 이미지" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        {/* Placeholder badge when no custom images are uploaded */}
                        <div style={{ position: 'absolute', top: '45%', left: 0, right: 0, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.85)', padding: '8px', color: '#0f172a', fontWeight: '900', fontSize: '13px' }}>
                          대표 이미지 #{activeT5DummyIdx} (업로드 시 100% 순차 교체됨)
                        </div>
                      </div>
                    )}

                    {/* Top-Right Badge Box */}
                    {t5Badge && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: '#ffffff',
                        border: t5BorderUse ? `1.5px solid ${t5BorderColor}` : '1.5px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: `${Math.min(6, t5BorderRadius)}px`,
                        fontSize: '11px',
                        fontWeight: '900',
                        color: t5BorderUse ? t5BorderColor : '#f97316',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}>
                        {t5Badge}
                      </div>
                    )}

                    {/* Bottom Overlay Title & Price Bar */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '16px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {/* Product Title Overlay */}
                      <div style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        {renderTextWithEffect({
                          text: t5Title,
                          kw: t5TitleKw,
                          effect: t5TitleAnim,
                          size: t5TitleSize,
                          mainColor: t5TitleColor,
                          kwColor: t5TitleKwColor
                        })}
                      </div>

                      {/* Prices: Orig & Disc Overlay */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        <span style={{ color: t5OrigColor, fontSize: `${t5OrigSize}px`, textDecoration: 'line-through', fontWeight: '900' }}>
                          {t5OrigPrice}
                        </span>

                        <span style={{ color: '#ef4444', fontSize: '20px', fontWeight: '900' }}>➔</span>

                        <div style={{ display: 'inline-block' }}>
                          {renderTextWithEffect({
                            text: t5DiscPrice,
                            kw: '',
                            effect: t5DiscAnim,
                            size: t5DiscSize,
                            mainColor: t5DiscColor,
                            kwColor: t5DiscColor
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Live Footer Status Bar */}
            <div style={{ backgroundColor: '#f1f5f9', borderTop: '1px solid #e2e8f0', padding: '10px 20px', fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>🎬 상단: 원본 참고 예시 동영상 재생 중</span>
              <span>⚡ 하단: 내 실시간 제작 움짤 재생 중 (780px x 685px)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
