'use client';

import { useState } from 'react';
import { Mic, Play, Pause, Volume2, Download, Sparkles, CheckCircle } from 'lucide-react';

export interface DialogueLine {
  speaker: string; // 'מארח 1' | 'מארח 2' | 'Host 1' | 'Host 2'
  text: string;
}

export default function AudioPodcastViewer({ dialogue, title }: { dialogue: DialogueLine[]; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  const handlePlayPodcastSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('דפדפן זה אינו תומך בהשמעת דיבור');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    let lineIdx = 0;

    const speakNextLine = () => {
      if (lineIdx >= dialogue.length) {
        setIsPlaying(false);
        setCurrentLineIdx(0);
        return;
      }

      setCurrentLineIdx(lineIdx);
      const line = dialogue[lineIdx];
      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.lang = 'he-IL';
      utterance.rate = 1.0;

      utterance.onend = () => {
        lineIdx++;
        speakNextLine();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextLine();
  };

  return (
    <div className="space-y-4 font-sans" dir="rtl">
      {/* Top Audio Player Bar */}
      <div className="flex items-center justify-between bg-[#080d19] p-4 rounded-xl border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayPodcastSpeech}
            className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center font-bold transition-transform shadow-lg shadow-cyan-500/20"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-0.5" />}
          </button>
          <div>
            <div className="text-sm font-bold text-white">פודקאסט שמע AI (NotebookLM Audio Overview)</div>
            <div className="text-xs text-cyan-300 font-mono">{title}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPlaying && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30 animate-pulse">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              משמיע פודקאסט חי...
            </span>
          )}
        </div>
      </div>

      {/* Transcript Dialogue Feed */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto p-4 rounded-2xl bg-[#050811] border border-gray-800">
        {dialogue.map((line, idx) => {
          const isCurrent = isPlaying && currentLineIdx === idx;
          const isSpeakerOne = line.speaker.includes('1');

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md'
                  : 'bg-gray-900/60 border-gray-800/80 text-gray-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className={`font-bold ${isSpeakerOne ? 'text-cyan-400' : 'text-purple-400'}`}>
                  {line.speaker}
                </span>
              </div>
              <p className="text-xs leading-relaxed font-sans">{line.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
