'use client';

import { useState } from 'react';
import { Video, Presentation, Mic, ShieldCheck, Zap, CheckCircle, Loader2, Server, Key, AlertCircle, Activity } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES } from '@/lib/securityGuidelines';

export default function AutomatedCreateProject() {
  const [title, setTitle] = useState('Enterprise Phishing & Zero-Trust Awareness Briefing');
  const [mediaType, setMediaType] = useState<'presentation' | 'video_script' | 'podcast_audio'>('presentation');
  const [targetAudience, setTargetAudience] = useState('All Corporate Employees');
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>(['g-1', 'g-2', 'g-3', 'g-4']);
  const [apiMode, setApiMode] = useState<'preview' | 'enterprise_api' | 'community_api'>('preview');

  // Credentials
  const [gcpProjectId, setGcpProjectId] = useState('');
  const [gcpAccessToken, setGcpAccessToken] = useState('');

  // Execution & Progress Bar State
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [progressStepLabel, setProgressStepLabel] = useState('');
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
    setProgress(5);
    setProgressStepLabel('Phase 1/4: Compiling Cybersecurity Directives...');
    setApiResult(null);
    setExecutionLogs([
      '⚡ Initializing NotebookLM API Dispatch Engine...',
      '🛡️ Binding selected Cybersecurity Guardrails into ground truth framework...',
    ]);

    try {
      // Step 1 Simulation
      await new Promise((r) => setTimeout(r, 400));
      setProgress(30);
      setProgressStepLabel('Phase 2/4: Constructing Ground Truth Payload...');
      setExecutionLogs((prev) => [
        ...prev,
        `📄 Formatted ground truth document for ${mediaType.toUpperCase()}...`,
      ]);

      // Step 2 Simulation
      await new Promise((r) => setTimeout(r, 400));
      setProgress(60);
      setProgressStepLabel('Phase 3/4: Dispatching Request to /api/notebooklm Endpoint...');
      setExecutionLogs((prev) => [
        ...prev,
        `📡 Sending payload (${apiMode.toUpperCase()}) to serverless API route...`,
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
          gcpProjectId: gcpProjectId || undefined,
          gcpAccessToken: gcpAccessToken || undefined,
        }),
      });

      const data = await res.json();
      await new Promise((r) => setTimeout(r, 500));
      setProgress(90);
      setProgressStepLabel('Phase 4/4: Verifying Compliance & Response Payload...');

      await new Promise((r) => setTimeout(r, 300));
      setProgress(100);

      if (res.ok) {
        if (data.warning) {
          setProgressStepLabel('Complete with Warning: Direct API Fallback Active');
          setExecutionLogs((prev) => [
            ...prev,
            `⚠️ Notice: ${data.warning}`,
            '✅ Ground Truth compiled successfully via Direct API fallback mode.',
          ]);
        } else {
          setProgressStepLabel('Execution Complete! 100% Policy Compliant');
          setExecutionLogs((prev) => [
            ...prev,
            '✅ Ground Truth compiled & validated against compliance policies.',
            '🎉 NotebookLM API execution complete! Zero manual copy-pasting required.',
          ]);
        }
        setApiResult(data);
      } else {
        setProgressStepLabel('API Error Encountered');
        setExecutionLogs((prev) => [
          ...prev,
          `❌ API Error: ${data.error || 'Execution failed.'}`,
        ]);
      }
    } catch (err: any) {
      setProgressStepLabel('Connection Failed');
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tactical text-cyan-300 mb-2">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          AUTOMATED DISPATCH MATRIX
        </div>
        <h1 className="text-3xl font-black text-white font-sans tracking-tight">Automated AI Presentation & Video Creator</h1>
        <p className="text-gray-400 text-sm mt-1 font-sans">
          Configure security directives and trigger NotebookLM generation directly via API.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="tactical-panel p-6 space-y-5">
            <h2 className="text-base font-bold text-white font-tactical uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-cyan-500 text-black font-tactical text-xs flex items-center justify-center font-bold">1</span>
              Project Parameters
            </h2>

            <div>
              <label className="block text-xs font-tactical text-gray-300 mb-1.5 uppercase">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#080d19] border border-cyan-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-tactical text-gray-300 mb-1.5 uppercase">Target Media Format</label>
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
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-[#080d19] border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                      <div className="text-xs font-tactical uppercase">{item.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-tactical text-gray-300 mb-1.5 uppercase">Audience Scope</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-[#080d19] border border-cyan-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-sans"
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
          <div className="tactical-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white font-tactical uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-cyan-500 text-black font-tactical text-xs flex items-center justify-center font-bold">2</span>
                Bound Security Guardrails
              </h2>
              <span className="text-xs font-tactical text-cyan-400 font-bold">{selectedRuleIds.length} ACTIVE</span>
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
                        ? 'bg-[#080d19] border-cyan-500/60 text-white'
                        : 'bg-gray-950/40 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 accent-cyan-400 rounded"
                        />
                        <span className="text-xs font-bold text-cyan-300 font-tactical uppercase">{rule.title}</span>
                      </div>
                      <span className="text-[10px] font-tactical font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        {rule.severity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Automated Execution & Live Progress Bar Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="tactical-panel p-6 space-y-5 border-cyan-500/30 sticky top-20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white font-tactical uppercase flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyan-400" />
                  API Execution Matrix
                </h2>
                <p className="text-xs text-gray-400 font-tactical">Automated NotebookLM API Dispatcher</p>
              </div>

              {/* Mode Selector */}
              <div className="flex bg-[#080d19] p-1 rounded-lg border border-cyan-500/20 text-[11px] font-tactical">
                <button
                  type="button"
                  onClick={() => setApiMode('preview')}
                  className={`px-3 py-1 rounded ${apiMode === 'preview' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400'}`}
                >
                  Direct API
                </button>
                <button
                  type="button"
                  onClick={() => setApiMode('enterprise_api')}
                  className={`px-3 py-1 rounded ${apiMode === 'enterprise_api' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400'}`}
                >
                  GCP Enterprise
                </button>
              </div>
            </div>

            {/* Optional GCP Inputs */}
            {apiMode === 'enterprise_api' && (
              <div className="p-4 rounded-xl bg-[#080d19] border border-cyan-500/30 space-y-3 font-tactical text-xs">
                <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  GCP Enterprise OAuth Credentials:
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">GCP Project ID / Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 1234567890"
                    value={gcpProjectId}
                    onChange={(e) => setGcpProjectId(e.target.value)}
                    className="w-full bg-[#050811] border border-gray-800 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Bearer Access Token</label>
                  <input
                    type="password"
                    placeholder="OAuth Access Token"
                    value={gcpAccessToken}
                    onChange={(e) => setGcpAccessToken(e.target.value)}
                    className="w-full bg-[#050811] border border-gray-800 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>
            )}

            {/* Execute Button */}
            <button
              type="button"
              disabled={isExecuting}
              onClick={handleRunAutomatedApi}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold font-tactical text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  Processing NotebookLM Payload...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-black" />
                  Execute Direct API Dispatch
                </>
              )}
            </button>

            {/* LIVE ANIMATED PROGRESS BAR */}
            {(isExecuting || progress > 0) && (
              <div className="p-4 rounded-xl bg-[#080d19] border border-cyan-500/40 space-y-3 font-tactical">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    {progressStepLabel || 'Processing...'}
                  </span>
                  <span className="text-cyan-400 font-black text-sm">{progress}%</span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-3 bg-gray-950 rounded-full overflow-hidden border border-cyan-500/30 relative">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-300 ease-out rounded-full relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/60 animate-pulse"></div>
                  </div>
                </div>

                {/* Phase Indicators */}
                <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-mono pt-1 text-gray-400">
                  <div className={progress >= 25 ? 'text-cyan-400 font-bold' : ''}>1. Directives</div>
                  <div className={progress >= 50 ? 'text-cyan-400 font-bold' : ''}>2. Payload</div>
                  <div className={progress >= 75 ? 'text-cyan-400 font-bold' : ''}>3. API Dispatch</div>
                  <div className={progress >= 100 ? 'text-emerald-400 font-bold' : ''}>4. Verified</div>
                </div>
              </div>
            )}

            {/* Live API Console Output */}
            <div className="bg-[#050811] rounded-xl p-4 border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-tactical text-gray-400 border-b border-gray-800 pb-2">
                <span>Execution Logs</span>
                <span className={progress === 100 ? 'text-emerald-400' : 'text-cyan-400'}>
                  {progress === 100 ? 'STATUS: COMPLETE' : isExecuting ? 'STATUS: RUNNING' : 'STATUS: READY'}
                </span>
              </div>
              <div className="font-mono text-xs text-cyan-300 space-y-1.5 min-h-[90px] max-h-[150px] overflow-y-auto">
                {executionLogs.length === 0 ? (
                  <div className="text-gray-500 italic">Click the button above to start live API progress execution...</div>
                ) : (
                  executionLogs.map((log, i) => <div key={i}>{log}</div>)
                )}
              </div>
            </div>

            {/* API Result Preview */}
            {apiResult && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-tactical space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  NotebookLM Payload Generated Successfully!
                </div>
                {apiResult.warning && (
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>{apiResult.warning}</span>
                  </div>
                )}
                <div className="text-gray-300 space-y-1 text-[11px] font-sans">
                  <div>• Project: <span className="text-white font-bold">{apiResult.title}</span></div>
                  <div>• Bound Directives: <span className="text-emerald-400 font-bold">{apiResult.enforcedDirectivesCount} Enforced</span></div>
                  <div>• Format: <span className="text-cyan-300 font-bold uppercase">{apiResult.mediaType}</span></div>
                </div>
                <textarea
                  readOnly
                  value={apiResult.groundTruthDoc || ''}
                  rows={8}
                  className="w-full bg-[#050811] text-cyan-300 font-mono text-[11px] p-3 rounded-lg border border-cyan-500/30 leading-relaxed resize-none mt-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
