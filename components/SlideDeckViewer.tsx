'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Presentation, Download, CheckCircle, ShieldAlert, Sparkles, Play } from 'lucide-react';

export interface Slide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  speakerNotes: string;
  mandateDirective: string;
}

export default function SlideDeckViewer({ slides, title }: { slides: Slide[]; title: string }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ title, slides }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${title.replace(/\s+/g, '_')}_SlideDeck.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-4 font-sans" dir="rtl">
      {/* Top Header & Controls */}
      <div className="flex items-center justify-between bg-[#080d19] p-3.5 rounded-xl border border-cyan-500/30">
        <div className="flex items-center gap-2">
          <Presentation className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white text-sm">נגן מצגת שקופיות אינטראקטיבי: {title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-300">שקופית {currentSlideIndex + 1} מתוך {slides.length}</span>
          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-tactical flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            ייצא מצגת לקובץ
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="relative min-h-[320px] bg-gradient-to-br from-[#0d1322] via-[#080d19] to-[#050811] p-8 rounded-2xl border-2 border-cyan-500/40 shadow-2xl flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Slide Title & Subtitle */}
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[11px] font-mono border border-cyan-500/30">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            הנחיית אבטחה: {currentSlide?.mandateDirective}
          </div>
          <h2 className="text-2xl font-black text-white leading-tight">{currentSlide?.title}</h2>
          {currentSlide?.subtitle && <p className="text-sm text-cyan-300 font-mono">{currentSlide.subtitle}</p>}
        </div>

        {/* Bullets List */}
        <div className="my-6 space-y-3 relative z-10">
          {currentSlide?.bullets?.map((b, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-200 leading-relaxed">{b}</span>
            </div>
          ))}
        </div>

        {/* Slide Speaker Notes */}
        <div className="pt-4 border-t border-gray-800 text-xs font-mono text-gray-400 relative z-10">
          <span className="text-cyan-400 font-bold">הערות למרצה (Speaker Notes): </span>
          {currentSlide?.speakerNotes}
        </div>
      </div>

      {/* Navigation Arrow Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          disabled={currentSlideIndex === 0}
          onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
          className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs font-mono text-white flex items-center gap-2 disabled:opacity-40 hover:border-cyan-500/50"
        >
          <ChevronRight className="w-4 h-4" /> השקופית הקודמת
        </button>

        <div className="flex gap-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlideIndex === idx ? 'bg-cyan-400 w-8' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            />
          ))}
        </div>

        <button
          disabled={currentSlideIndex === slides.length - 1}
          onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
          className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs font-mono text-white flex items-center gap-2 disabled:opacity-40 hover:border-cyan-500/50"
        >
          השקופית הבאה <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
