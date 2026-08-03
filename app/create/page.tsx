'use client';

import { useState } from 'react';
import { Video, Presentation, Mic, ShieldAlert, Sparkles, Copy, Check, Save, ArrowRight, Download } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES, generateNotebookLMSourceDoc } from '@/lib/securityGuidelines';

export default function CreateProject() {
  const [title, setTitle] = useState('Quarterly Ransomware & Deepfake Awareness Briefing');
  const [mediaType, setMediaType] = useState<'presentation' | 'video_script' | 'podcast_audio'>('presentation');
  const [targetAudience, setTargetAudience] = useState('All Corporate Employees');
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>(['g-1', 'g-2', 'g-3', 'g-4']);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const selectedGuidelines = GLOBAL_CYBER_GUIDELINES.filter((g) => selectedRuleIds.includes(g.id));
  const generatedGroundTruth = generateNotebookLMSourceDoc(title, targetAudience, mediaType, selectedGuidelines);

  const toggleRule = (id: string) => {
    if (selectedRuleIds.includes(id)) {
      setSelectedRuleIds(selectedRuleIds.filter((r) => r !== id));
    } else {
      setSelectedRuleIds([...selectedRuleIds, id]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedGroundTruth);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive NotebookLM Creator Wizard
        </div>
        <h1 className="text-3xl font-extrabold text-white">Create Cyber Awareness Presentation / Video</h1>
        <p className="text-gray-400 text-sm mt-1">
          Configure security directives and build ground-truth source material for Google NotebookLM.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Step 1: Basic Info */}
          <div className="cyber-glass rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-black font-extrabold text-xs flex items-center justify-center">1</span>
              Project Details
            </h2>

            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">Presentation/Video Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">Output Format</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'presentation', name: 'Slide Deck', icon: Presentation },
                  { type: 'video_script', name: 'Video Script', icon: Video },
                  { type: 'podcast_audio', name: 'Audio Overview', icon: Mic },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = mediaType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setMediaType(item.type as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                      <div className="text-xs">{item.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option>All Corporate Employees</option>
                <option>Executive Leadership & C-Suite</option>
                <option>Engineering & Software Developers</option>
                <option>Finance & Payroll Specialists</option>
                <option>New Onboarding Cohorts</option>
              </select>
            </div>
          </div>

          {/* Step 2: Select Cybersecurity Guidelines */}
          <div className="cyber-glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-black font-extrabold text-xs flex items-center justify-center">2</span>
                Enforce Security Directives
              </h2>
              <span className="text-xs font-mono text-cyan-400">{selectedRuleIds.length} Selected</span>
            </div>

            <div className="space-y-3">
              {GLOBAL_CYBER_GUIDELINES.map((rule) => {
                const isChecked = selectedRuleIds.includes(rule.id);
                return (
                  <div
                    key={rule.id}
                    onClick={() => toggleRule(rule.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-gray-900 border-cyan-500/60 text-white'
                        : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-cyan-400 rounded"
                        />
                        <span className="text-sm font-semibold text-cyan-300">{rule.title}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        {rule.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-2 pl-6">{rule.summary}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Live NotebookLM Source Preview */}
        <div className="lg:col-span-6 space-y-6">
          <div className="cyber-glass rounded-2xl p-6 space-y-4 border-cyan-500/30 sticky top-24">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-cyan-400" />
                  NotebookLM Ground Truth Preview
                </h2>
                <p className="text-xs text-gray-400 font-mono">Formatted for copy-paste into Google NotebookLM sources</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Source'}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold font-mono flex items-center gap-1.5 border border-gray-700 transition-colors"
                >
                  <Save className="w-3.5 h-3.5 text-emerald-400" />
                  {saved ? 'Saved to Supabase!' : 'Save Project'}
                </button>
              </div>
            </div>

            {/* Code / Text Block */}
            <div className="relative">
              <textarea
                readOnly
                value={generatedGroundTruth}
                rows={22}
                className="w-full bg-gray-950 text-cyan-300 font-mono text-xs p-4 rounded-xl border border-gray-800 leading-relaxed focus:outline-none resize-none select-all"
              />
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 space-y-2">
              <div className="font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                How to use with NotebookLM:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-gray-300 font-mono text-[11px]">
                <li>Copy the Ground Truth block above using the button.</li>
                <li>Go to <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">notebooklm.google.com</a>.</li>
                <li>Create a new notebook or select your Security Notebook.</li>
                <li>Add a new source &rarr; Choose <strong>Copied Text</strong> or paste into a doc.</li>
                <li>Click <strong>Audio Overview</strong> or <strong>Generate Study Guide / Slide Outline</strong>.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
