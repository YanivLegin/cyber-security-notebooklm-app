'use client';

import { useState } from 'react';
import { Video, Play, Download, Film, Sparkles, Clock, Eye } from 'lucide-react';

export interface VideoScene {
  sceneNumber: number;
  timestamp: string;
  visualPrompt: string;
  audioDialogue: string;
  actionGuideline: string;
}

export default function VideoStoryboardViewer({ scenes, title }: { scenes: VideoScene[]; title: string }) {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);

  const handleDownloadScript = () => {
    const content = scenes.map(s => `=== SCENE ${s.sceneNumber} [${s.timestamp}] ===\nVISUAL: ${s.visualPrompt}\nAUDIO: ${s.audioDialogue}\nMANDATE: ${s.actionGuideline}\n`).join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_VideoScript.txt`;
    a.click();
  };

  return (
    <div className="space-y-4 font-sans" dir="rtl">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-[#080d19] p-3.5 rounded-xl border border-cyan-500/30">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white text-sm">מחולל תסריט ווידאו ופרומפטים ל-AI Video: {title}</span>
        </div>
        <button
          onClick={handleDownloadScript}
          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-tactical flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          הורד תסריט מלא
        </button>
      </div>

      {/* Scenes Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenes.map((scene, idx) => (
          <div
            key={scene.sceneNumber}
            onClick={() => setActiveSceneIdx(idx)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeSceneIdx === idx
                ? 'bg-[#0d1322] border-cyan-400 shadow-lg shadow-cyan-500/10'
                : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-cyan-400 font-bold">סצינה {scene.sceneNumber}</span>
              <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {scene.timestamp}</span>
            </div>
            <p className="text-xs text-white line-clamp-2 font-sans font-bold">{scene.visualPrompt}</p>
          </div>
        ))}
      </div>

      {/* Active Scene Detail View */}
      {scenes[activeSceneIdx] && (
        <div className="tactical-panel p-6 border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-sm font-bold text-white font-tactical">
              סצינה {scenes[activeSceneIdx].sceneNumber} ({scenes[activeSceneIdx].timestamp})
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              הנחיה אכפה: {scenes[activeSceneIdx].actionGuideline}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="bg-[#050811] p-4 rounded-xl border border-gray-800 space-y-1.5">
              <div className="font-bold text-cyan-400 font-tactical">🎥 תיאור ויזואלי ופרומפט ל-AI Video (Sora/Runway):</div>
              <p className="text-gray-200 leading-relaxed font-mono">{scenes[activeSceneIdx].visualPrompt}</p>
            </div>
            <div className="bg-[#050811] p-4 rounded-xl border border-gray-800 space-y-1.5">
              <div className="font-bold text-emerald-400 font-tactical">🎙️ דיאלוג וקריינות שמע (Voiceover Script):</div>
              <p className="text-gray-200 leading-relaxed font-sans">{scenes[activeSceneIdx].audioDialogue}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
