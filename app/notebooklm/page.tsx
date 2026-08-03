'use client';

import { useState } from 'react';
import { BookOpen, Sparkles, ExternalLink, Copy, Check, ShieldCheck, Play, FileText, ArrowUpRight } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES, generateNotebookLMSourceDoc } from '@/lib/securityGuidelines';

export default function NotebookLMStudio() {
  const [copiedDoc, setCopiedDoc] = useState(false);
  const sampleDoc = generateNotebookLMSourceDoc(
    'Enterprise Cybersecurity Awareness & Incident Escalation',
    'All Corporate Employees & Vendors',
    'presentation',
    GLOBAL_CYBER_GUIDELINES
  );

  const handleCopyDoc = () => {
    navigator.clipboard.writeText(sampleDoc);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Google NotebookLM Integration Center
        </div>
        <h1 className="text-3xl font-extrabold text-white">NotebookLM Export & Audio Overview Studio</h1>
        <p className="text-gray-400 text-sm mt-1">
          Bridge your Supabase cybersecurity guidelines directly into Google NotebookLM for AI audio overview podcasts and slide generation.
        </p>
      </div>

      {/* Workflow Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cyber-glass rounded-2xl p-6 border-cyan-500/30 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 text-black font-extrabold flex items-center justify-center font-mono">1</div>
          <h3 className="text-base font-bold text-white">Export Ground Truth</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Generate your formatted security source document containing non-negotiable cyber directives.
          </p>
          <button
            onClick={handleCopyDoc}
            className="w-full py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-cyan-500/30 transition-colors"
          >
            {copiedDoc ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedDoc ? 'Copied Source!' : 'Copy Ground Truth'}
          </button>
        </div>

        <div className="cyber-glass rounded-2xl p-6 border-purple-500/30 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500 text-white font-extrabold flex items-center justify-center font-mono">2</div>
          <h3 className="text-base font-bold text-white">Upload to NotebookLM</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Open Google NotebookLM, add a new source, and paste the copied text directly into the source editor.
          </p>
          <a
            href="https://notebooklm.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-purple-500/30 transition-colors"
          >
            Open NotebookLM <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="cyber-glass rounded-2xl p-6 border-emerald-500/30 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black font-extrabold flex items-center justify-center font-mono">3</div>
          <h3 className="text-base font-bold text-white">Generate Audio & Slides</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Click "Generate Audio Overview" or request a study guide outline. NotebookLM will strictly enforce your security rules.
          </p>
          <div className="py-2 px-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <Play className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            Audio Overview Ready
          </div>
        </div>
      </div>

      {/* Ground Truth Source Editor / Inspection */}
      <div className="cyber-glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Current Ground Truth Export Text
          </h2>
          <span className="text-xs font-mono text-cyan-400">Ready for Google NotebookLM</span>
        </div>

        <div className="bg-gray-950 rounded-xl p-4 border border-gray-800">
          <pre className="text-xs font-mono text-cyan-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
            {sampleDoc}
          </pre>
        </div>
      </div>
    </div>
  );
}
