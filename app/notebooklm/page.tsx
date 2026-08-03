'use client';

import { useState } from 'react';
import { BookOpen, Zap, Server, ShieldCheck, CheckCircle2, Play, RefreshCw, Key, Globe, Terminal, Activity } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES, generateNotebookLMSourceDoc } from '@/lib/securityGuidelines';

export default function NotebookLMStudio() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'community'>('enterprise');
  
  // Credentials
  const [projectId, setProjectId] = useState('cyber-security-enterprise-2026');
  const [location, setLocation] = useState('us');
  const [accessToken, setAccessToken] = useState('ya29.a0Axoo-placeholder-token');

  // Execution state & Progress Bar
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [apiResponse, setApiResponse] = useState<any>(null);

  const handleTestApiCall = async () => {
    setLoading(true);
    setProgress(10);
    setProgressLabel('Connecting to Endpoint...');
    setApiResponse(null);

    try {
      await new Promise((r) => setTimeout(r, 300));
      setProgress(40);
      setProgressLabel('Dispatching OAuth Payload...');

      await new Promise((r) => setTimeout(r, 400));
      setProgress(75);
      setProgressLabel('Executing NotebookLM Source Registration...');

      const res = await fetch('/api/notebooklm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Automated API Security Briefing',
          mediaType: 'presentation',
          mode: activeTab === 'enterprise' ? 'enterprise_api' : 'community_api',
          gcpProjectId: projectId,
          gcpAccessToken: accessToken,
        }),
      });

      const data = await res.json();
      setProgress(100);
      setProgressLabel('API Execution Complete');
      setApiResponse(data);
    } catch (err: any) {
      setProgressLabel('Execution Failed');
      setApiResponse({ error: err.message || 'API request failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tactical text-cyan-300 mb-2">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          API OPERATIONS STUDIO
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight font-sans">NotebookLM API Operations Studio</h1>
        <p className="text-gray-400 text-sm mt-1 font-sans">
          Direct programmatic interface connecting your security directives to NotebookLM via official Enterprise GCP & Community REST APIs.
        </p>
      </div>

      {/* API Selection Tabs */}
      <div className="flex border-b border-cyan-500/20 gap-6 text-xs font-tactical">
        <button
          onClick={() => setActiveTab('enterprise')}
          className={`pb-3 flex items-center gap-2 transition-all border-b-2 uppercase ${
            activeTab === 'enterprise'
              ? 'border-cyan-400 text-cyan-300 font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          Official GCP Gemini Enterprise API
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`pb-3 flex items-center gap-2 transition-all border-b-2 uppercase ${
            activeTab === 'community'
              ? 'border-cyan-400 text-cyan-300 font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          Community REST API (notebooklm-py)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Credentials & Config Panel */}
        <div className="lg:col-span-6 space-y-6">
          {activeTab === 'enterprise' ? (
            <div className="tactical-panel p-6 space-y-4">
              <h2 className="text-base font-bold text-white font-tactical uppercase flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                GCP Discovery Engine Credentials
              </h2>

              <div>
                <label className="block text-xs font-tactical text-gray-300 mb-1 uppercase">GCP Project Number / ID</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-[#050811] border border-cyan-500/30 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-tactical text-gray-300 mb-1 uppercase">Multi-Region Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#050811] border border-cyan-500/30 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                >
                  <option value="us">us (United States Multi-Region)</option>
                  <option value="eu">eu (European Union Multi-Region)</option>
                  <option value="global">global (Global Location)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-tactical text-gray-300 mb-1 uppercase">Bearer OAuth Access Token</label>
                <input
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  className="w-full bg-[#050811] border border-cyan-500/30 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          ) : (
            <div className="tactical-panel p-6 space-y-4">
              <h2 className="text-base font-bold text-white font-tactical uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Community REST Server Settings
              </h2>

              <div>
                <label className="block text-xs font-tactical text-gray-300 mb-1 uppercase">REST API Service Base URL</label>
                <input
                  type="text"
                  value="http://localhost:8000"
                  readOnly
                  className="w-full bg-[#050811] border border-cyan-500/30 rounded-xl px-4 py-2 text-sm text-white font-mono"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={handleTestApiCall}
            className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold font-tactical text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 uppercase"
          >
            <Zap className="w-4 h-4 text-black" />
            {loading ? 'Executing API Request...' : 'Test Automated API Connection'}
          </button>

          {/* LIVE PROGRESS BAR */}
          {(loading || progress > 0) && (
            <div className="p-4 rounded-xl bg-[#080d19] border border-cyan-500/40 space-y-2 font-tactical">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-300 font-bold flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  {progressLabel}
                </span>
                <span className="text-cyan-400 font-black text-sm">{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-950 rounded-full overflow-hidden border border-cyan-500/30">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Right API Response Inspector */}
        <div className="lg:col-span-6 space-y-6">
          <div className="tactical-panel p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white font-tactical uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                API Telemetry Inspector
              </h2>
              <span className="text-[11px] font-tactical text-emerald-400 uppercase">AUTOMATED REST RESPONSE</span>
            </div>

            <pre className="bg-[#050811] text-cyan-300 font-mono text-xs p-4 rounded-xl border border-cyan-500/20 max-h-96 overflow-y-auto leading-relaxed">
              {apiResponse
                ? JSON.stringify(apiResponse, null, 2)
                : '// Click "Test Automated API Connection" to trigger direct API dispatch...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
