import React, { useState } from 'react';
import { 
  Sparkles, Plus, Trash2, ArrowUp, ArrowDown, Edit3, 
  Layers3, Eye, FileSpreadsheet, Check, RefreshCw, Filter, ImageIcon
} from 'lucide-react';

export default function Step3Editor({
  slides, setSlides,
  canvasWidth, setCanvasWidth,
  productImages, modelImages,
  onNextStep
}) {
  const [filterCat, setFilterCat] = useState('ALL');
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSub, setEditSub] = useState('');

  // Reorder slides
  const moveSlide = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= slides.length) return;
    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setSlides(updated);
  };

  // Delete slide
  const deleteSlide = (id) => {
    if (slides.length <= 1) return;
    setSlides(slides.filter(s => s.id !== id));
  };

  // Start Editing
  const startEdit = (slide) => {
    setEditingSlideId(slide.id);
    setEditTitle(slide.title);
    setEditSub(slide.subtitle);
  };

  // Save Editing
  const saveEdit = (id) => {
    setSlides(slides.map(s => s.id === id ? { ...s, title: editTitle, subtitle: editSub } : s));
    setEditingSlideId(null);
  };

  const filteredSlides = slides.filter(s => filterCat === 'ALL' || s.category === filterCat);

  return (
    <div className="w-full flex-1 flex flex-col items-center py-6">
      {/* Top Toolbar */}
      <div className="w-full max-w-5xl bg-gray-900/90 border border-gray-800 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-amber-400">규격 폭:</span>
          <button 
            onClick={() => setCanvasWidth('860')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${canvasWidth === '860' ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400'}`}
          >
            860px (스마트스토어)
          </button>
          <button 
            onClick={() => setCanvasWidth('1080')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${canvasWidth === '1080' ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400'}`}
          >
            1080px (쿠팡)
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400 font-bold">심리 파트:</span>
          {['ALL', '욕망', '신뢰', '전환'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl font-extrabold transition ${filterCat === cat ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400'}`}
            >
              {cat === 'ALL' ? '전체 (26개)' : `PART ${cat}`}
            </button>
          ))}
        </div>

        <button
          onClick={onNextStep}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs px-5 py-2 rounded-xl shadow-lg shadow-amber-500/20"
        >
          4단계: 내보내기로 이동 →
        </button>
      </div>

      {/* Canvas View Container */}
      <div 
        style={{ maxWidth: `${canvasWidth}px` }} 
        className="w-full flex flex-col gap-2 transition-all duration-300"
      >
        {filteredSlides.map((slide, index) => {
          const isEditing = editingSlideId === slide.id;
          const assignedImg = productImages[index % (productImages.length || 1)]?.url;

          return (
            <div 
              key={slide.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group transition hover:border-amber-500/40"
            >
              {/* Slide Control Bar */}
              <div className="bg-gray-950 px-4 py-2 border-b border-gray-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-amber-400">{slide.page}</span>
                  <span className="text-gray-400">|</span>
                  <span className="font-bold text-white">{slide.section}</span>
                  <span className="text-gray-500 text-[10px]">({slide.topic})</span>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => moveSlide(index, -1)} className="p-1 text-gray-400 hover:text-white"><ArrowUp className="w-3.5 h-3.5" /></button>
                  <button onClick={() => moveSlide(index, 1)} className="p-1 text-gray-400 hover:text-white"><ArrowDown className="w-3.5 h-3.5" /></button>
                  <button onClick={() => startEdit(slide)} className="p-1 text-amber-400 hover:text-amber-300 ml-2 flex items-center gap-1 text-[11px] font-bold"><Edit3 className="w-3.5 h-3.5" /> 편집</button>
                  <button onClick={() => deleteSlide(slide.id)} className="p-1 text-red-500 hover:text-red-400 ml-2"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {/* Slide Visual Card Preview */}
              <div className={`p-6 bg-gradient-to-br ${slide.bgGradient} text-white relative flex flex-col justify-between min-h-[220px]`}>
                <div>
                  <div className="inline-block bg-black/30 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-black px-3 py-1 rounded-full mb-3 shadow">
                    {slide.badge}
                  </div>

                  {isEditing ? (
                    <div className="flex flex-col gap-2 my-2">
                      <input 
                        type="text" 
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="bg-black/60 border border-white/40 rounded-lg p-2 text-white font-extrabold text-base outline-none"
                      />
                      <textarea 
                        rows="2"
                        value={editSub}
                        onChange={e => setEditSub(e.target.value)}
                        className="bg-black/60 border border-white/40 rounded-lg p-2 text-white text-xs outline-none resize-none"
                      />
                      <button 
                        onClick={() => saveEdit(slide.id)}
                        className="bg-white text-black font-extrabold text-xs py-1 px-3 rounded-lg w-max shadow"
                      >
                        저장 완료
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-black text-xl leading-tight mb-2 drop-shadow">
                        {slide.title}
                      </h3>
                      <p className="text-xs text-white/90 leading-relaxed max-w-xl">
                        {slide.subtitle}
                      </p>
                    </>
                  )}
                </div>

                {/* Optional Image Representation */}
                {assignedImg && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/20 max-h-48">
                    <img src={assignedImg} alt="제품컷" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Highlights footer */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/20">
                  {slide.highlights.map((hl, i) => (
                    <span key={i} className="text-[10px] bg-black/40 text-amber-200 px-2.5 py-0.5 rounded-full font-bold border border-white/10 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
