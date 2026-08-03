'use client';

import { useState } from 'react';
import { BookOpen, Zap, Server, ShieldCheck, CheckCircle2, Play, RefreshCw, Key, Globe, Terminal, ArrowUpRight } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES, generateNotebookLMSourceDoc } from '@/lib/securityGuidelines';

export default function NotebookLMStudio() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'community'>('enterprise');
  
  // Enterprise API state
  const [projectId, setProjectId] = useState('cyber-security-enterprise-2026');
  const [location, setLocation] = useState('us');
  const [accessToken, setAccessToken] = useState('ya29.a0Axoo-placeholder-token');

  // Community REST API state
  const [communityUrl, setCommunityUrl] = useState('http://localhost:8000');
  const [apiKey, setApiKey] = useState('cyber_studio_key_2026');

  // Execution state
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const sampleGroundTruth = generateNotebookLMSourceDoc(
    'Enterprise Cyber Threat Briefing & AI Safety Directives',
    'All Corporate Staff',
    'presentation',
    GLOBAL_CYBER_GUIDELINES
  );

  const handleTestApiCall = async () => {
    setLoading(true);
    setApiResponse(null);

    try {
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
      setApiResponse(data);
    } catch (err: any) {
      setApiResponse({ error: err.message || 'API request failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-400 mb-2">
          <Server className="w-3.5 h-3.5" />
          Automated API Operations Center
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">NotebookLM API Operations Studio</h1>
        <p className="text-gray-400 text-sm mt-1">
          Direct programmatic interface connecting your security directives to NotebookLM via official Enterprise GCP & Community REST APIs.
        </p>
      </div>

      {/* API Selection Tabs */}
      <div className="flex border-b border-gray-800 gap-6 text-sm font-mono">
        <button
          onClick={() => setActiveTab('enterprise')}
          className={`pb-3 flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'enterprise'
              ? 'border-blue-500 text-blue-400 font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          Official GCP Gemini Enterprise API
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`pb-3 flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'community'
              ? 'border-blue-500 text-blue-400 font-bold'
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
            <div className="panel-card p-6 space-y-4">
              <h2 className="text-base font-bold text-white mono-heading flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-400" />
                GCP Discovery Engine Credentials
              </h2>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">GCP Project Number / ID</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700/80 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Multi-Region Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700/80 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                >
                  <option value="us">us (United States Multi-Region)</option>
                  <option value="eu">eu (European Union Multi-Region)</option>
                  <option value="global">global (Global Location)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Bearer OAuth Access Token</label>
                <input
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700/80 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-gray-900/90 border border-gray-800 text-[11px] font-mono text-gray-400">
                Endpoint: <span className="text-blue-300">https://{location}-discoveryengine.googleapis.com/v1alpha/projects/{projectId}/locations/{location}/notebooks</span>
              </div>
            </div>
          ) : (
            <div className="panel-card p-6 space-y-4">
              <h2 className="text-base font-bold text-white mono-heading flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                Community REST Server Settings
              </h2>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">REST API Service Base URL</label>
                <input
                  type="text"
                  value={communityUrl}
                  onChange={(e) => setCommunityUrl(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700/80 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">X-API-Key Header</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700/80 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={handleTestApiCall}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold font-mono text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            {loading ? 'Executing API Call...' : 'Test Automated API Connection'}
          </button>
        </div>

        {/* Right API Response Inspector */}
        <div className="lg:col-span-6 space-y-6">
          <div className="panel-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white mono-heading flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                API Telemetry & Response Viewer
              </h2>
              <span className="text-[11px] font-mono text-emerald-400">AUTOMATED REST RESPONSE</span>
            </div>

            <pre className="bg-gray-950 text-cyan-300 font-mono text-xs p-4 rounded-xl border border-gray-800 max-h-96 overflow-y-auto leading-relaxed">
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
