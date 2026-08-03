'use client';

import { useState } from 'react';
import { Video, Presentation, Mic, ShieldCheck, Zap, CheckCircle, Loader2, Sparkles, Server, ArrowRight, Play, FileCheck, RefreshCw } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES } from '@/lib/securityGuidelines';

export default function AutomatedCreateProject() {
  const [title, setTitle] = useState('Enterprise Phishing & Zero-Trust Awareness Briefing');
  const [mediaType, setMediaType] = useState<'presentation' | 'video_script' | 'podcast_audio'>('presentation');
  const [targetAudience, setTargetAudience] = useState('All Corporate Employees');
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>(['g-1', 'g-2', 'g-3', 'g-4']);
  const [apiMode, setApiMode] = useState<'preview' | 'enterprise_api' | 'community_api'>('preview');

  // Execution state
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [apiResult, setApiResult] = useState<any>(null);

  const toggleRule = (id: string) => {
    if (selectedRuleIds.includes(id)) {
      setSelectedRuleIds(selectedRuleIds.filter((r) => r !== id));
    } else {
      setSelectedRuleIds([...selectedRuleIds, id]);
    }
  };

  const handleRunAutomatedApi = async () => {
    setIsExecuting(true);
    setApiResult(null);
    setExecutionLogs([
      '⚡ Initializing NotebookLM API Dispatch Engine...',
      '🛡️ Binding selected Cybersecurity Guardrails into ground truth framework...',
    ]);

    try {
      await new Promise((r) => setTimeout(r, 600));
      setExecutionLogs((prev) => [
        ...prev,
        '📡 Sending payload to /api/notebooklm endpoint...',
      ]);

      const res = await fetch('/api/notebooklm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          targetAudience,
          mediaType,
          selectedGuidelineIds: selectedRuleIds,
          mode: apiMode,
        }),
      });

      const data = await res.json();
      await new Promise((r) => setTimeout(r, 700));

      if (res.ok) {
        setExecutionLogs((prev) => [
          ...prev,
          '✅ Ground Truth compiled & validated against compliance policies.',
          '🎉 NotebookLM API execution complete! Zero manual copy-pasting required.',
        ]);
        setApiResult(data);
      } else {
        setExecutionLogs((prev) => [
          ...prev,
          `❌ API Error: ${data.error || 'Execution failed.'}`,
        ]);
      }
    } catch (err: any) {
      setExecutionLogs((prev) => [
        ...prev,
        `❌ Connection Error: ${err.message || 'Server error'}`,
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-400 mb-2">
          <Zap className="w-3.5 h-3.5" />
          Zero-Manual-Labor Automated Execution
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Automated AI Presentation & Video Creator</h1>
        <p className="text-gray-400 text-sm mt-1">
          Configure security directives and trigger NotebookLM generation directly via API with zero copy-pasting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="panel-card p-6 space-y-5">
            <h2 className="text-base font-bold text-white mono-heading flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white font-mono text-xs flex items-center justify-center">1</span>
              Project Parameters
            </h2>

            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1.5">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1.5">Target Media Output</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'presentation', name: 'Slide Deck', icon: Presentation },
                  { type: 'video_script', name: 'Video Script', icon: Video },
                  { type: 'podcast_audio', name: 'Audio Podcast', icon: Mic },
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
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                          : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                      <div className="text-xs font-mono">{item.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1.5">Audience Scope</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-sans"
              >
                <option>All Corporate Employees</option>
                <option>Executive Leadership & Board</option>
                <option>Engineering & Software Developers</option>
                <option>Finance & Accounting Teams</option>
                <option>New Onboarding Cohorts</option>
              </select>
            </div>
          </div>

          {/* Directives Selector */}
          <div className="panel-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white mono-heading flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white font-mono text-xs flex items-center justify-center">2</span>
                Bound Security Directives
              </h2>
              <span className="text-xs font-mono text-blue-400 font-bold">{selectedRuleIds.length} Active</span>
            </div>

            <div className="space-y-3">
              {GLOBAL_CYBER_GUIDELINES.map((rule) => {
                const isChecked = selectedRuleIds.includes(rule.id);
                return (
                  <div
                    key={rule.id}
                    onClick={() => toggleRule(rule.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-gray-900 border-blue-500/60 text-white'
                        : 'bg-gray-950/40 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-blue-500 rounded"
                        />
                        <span className="text-xs font-bold text-blue-300 mono-heading">{rule.title}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        {rule.severity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Automated API Execution Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="panel-card p-6 space-y-5 border-blue-500/30 sticky top-20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white mono-heading flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-400" />
                  API Direct Trigger
                </h2>
                <p className="text-xs text-gray-400 font-mono">Automated execution via NotebookLM API</p>
              </div>

              {/* API Mode Toggle */}
              <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setApiMode('preview')}
                  className={`px-2.5 py-1 rounded ${apiMode === 'preview' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400'}`}
                >
                  Direct API
                </button>
                <button
                  type="button"
                  onClick={() => setApiMode('enterprise_api')}
                  className={`px-2.5 py-1 rounded ${apiMode === 'enterprise_api' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400'}`}
                >
                  GCP Enterprise
                </button>
              </div>
            </div>

            {/* Execute Button */}
            <button
              type="button"
              disabled={isExecuting}
              onClick={handleRunAutomatedApi}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold font-mono text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Executing API Request...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  Generate via NotebookLM API (Automated)
                </>
              )}
            </button>

            {/* Live API Console Output */}
            <div className="bg-gray-950 rounded-xl p-4 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-b border-gray-800 pb-2">
                <span>Execution Logs</span>
                <span className="text-emerald-400">STATUS: READY</span>
              </div>
              <div className="font-mono text-xs text-blue-300 space-y-1.5 min-h-[100px] max-h-[160px] overflow-y-auto">
                {executionLogs.length === 0 ? (
                  <div className="text-gray-500 italic">Click the button above to trigger automated API execution...</div>
                ) : (
                  executionLogs.map((log, i) => <div key={i}>{log}</div>)
                )}
              </div>
            </div>

            {/* API Result Preview */}
            {apiResult && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-mono space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  NotebookLM Output Generated via API!
                </div>
                <div className="text-gray-300 space-y-1 text-[11px]">
                  <div>• Project: <span className="text-white">{apiResult.title}</span></div>
                  <div>• Bound Directives: <span className="text-emerald-400">{apiResult.enforcedDirectivesCount} Enforced</span></div>
                  <div>• Format: <span className="text-blue-300 uppercase">{apiResult.mediaType}</span></div>
                </div>
                <textarea
                  readOnly
                  value={apiResult.groundTruthDoc || ''}
                  rows={8}
                  className="w-full bg-gray-950 text-cyan-300 font-mono text-[11px] p-3 rounded-lg border border-gray-800 leading-relaxed resize-none mt-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
