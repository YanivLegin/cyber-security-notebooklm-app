'use client';

import Link from 'next/link';
import { ShieldCheck, Video, Zap, ArrowRight, BookOpen, AlertTriangle, Server, CheckCircle2, Activity, Play } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES } from '@/lib/securityGuidelines';

export default function Dashboard() {
  const recentApiRuns = [
    {
      id: 'run-901',
      title: 'Executive Deepfake & Phishing Defense Deck',
      media_type: 'presentation',
      target_audience: 'Executive Leadership',
      status: 'API Dispatched',
      rulesEnforced: 4,
      timestamp: '2 mins ago',
    },
    {
      id: 'run-902',
      title: 'Zero-Trust & MFA Fatigue Video Storyboard',
      media_type: 'video_script',
      target_audience: 'All Staff',
      status: 'Notebook Created',
      rulesEnforced: 3,
      timestamp: '1 hour ago',
    },
    {
      id: 'run-903',
      title: 'Generative AI Data Privacy Audio Podcast',
      media_type: 'podcast_audio',
      target_audience: 'Engineering Teams',
      status: 'Audio Overview Ready',
      rulesEnforced: 3,
      timestamp: '3 hours ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border border-blue-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            Automated NotebookLM API Dispatch Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Automated Cyber Awareness <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">NotebookLM Platform</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Generate cybersecurity awareness presentations, video scripts, and audio overviews programmatically. Bound with non-negotiable security directives and dispatched directly via NotebookLM APIs — eliminating manual copy-pasting.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
            <Link
              href="/create"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              Automated Generator
            </Link>
            <Link
              href="/notebooklm"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-bold flex items-center gap-2 transition-all"
            >
              <Server className="w-4 h-4 text-blue-400" />
              API Operations Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="panel-card p-5 border-l-4 border-l-blue-500">
          <div className="text-xs font-mono text-gray-400">Automated Dispatches</div>
          <div className="text-2xl font-bold text-white mt-1 font-mono">24 Runs</div>
          <div className="text-xs text-blue-400 mt-1 font-mono">Zero Manual Copying</div>
        </div>
        <div className="panel-card p-5 border-l-4 border-l-emerald-500">
          <div className="text-xs font-mono text-gray-400">Security Directives Bound</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{GLOBAL_CYBER_GUIDELINES.length} Rules</div>
          <div className="text-xs text-gray-400 mt-1 font-mono">100% Guardrail Enforced</div>
        </div>
        <div className="panel-card p-5 border-l-4 border-l-indigo-500">
          <div className="text-xs font-mono text-gray-400">API Pipeline State</div>
          <div className="text-2xl font-bold text-indigo-400 mt-1 font-mono">Active</div>
          <div className="text-xs text-gray-400 mt-1 font-mono">Enterprise & REST Modes</div>
        </div>
        <div className="panel-card p-5 border-l-4 border-l-amber-500">
          <div className="text-xs font-mono text-gray-400">Infrastructure Stack</div>
          <div className="text-xs font-bold text-amber-300 mt-2 space-y-0.5 font-mono">
            <div>✓ GitHub CI/CD Active</div>
            <div>✓ Vercel Auto-Deploy</div>
            <div>✓ Supabase RLS Connected</div>
          </div>
        </div>
      </div>

      {/* Active Directives Summary */}
      <div className="panel-card p-6 border-blue-500/20 bg-gray-900/50">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-white mono-heading">Enforced Security Guardrails</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GLOBAL_CYBER_GUIDELINES.map((rule) => (
            <div key={rule.id} className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300 mono-heading">{rule.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  {rule.severity}
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{rule.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent API Executions Table */}
      <div className="panel-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mono-heading">Recent API Executions</h2>
            <p className="text-xs text-gray-400 font-mono">Programmatically dispatched to NotebookLM API</p>
          </div>
          <Link
            href="/create"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"
          >
            Launch Automated Generator <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs font-mono uppercase bg-gray-900 text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Output</th>
                <th className="py-3 px-4">Target Audience</th>
                <th className="py-3 px-4">Directives</th>
                <th className="py-3 px-4">API Status</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 font-sans text-xs">
              {recentApiRuns.map((r) => (
                <tr key={r.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{r.title}</td>
                  <td className="py-3.5 px-4 font-mono text-blue-400 uppercase">{r.media_type.replace('_', ' ')}</td>
                  <td className="py-3.5 px-4 text-gray-300">{r.target_audience}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">{r.rulesEnforced} Enforced</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-gray-400">{r.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
