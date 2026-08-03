'use client';

import Link from 'next/link';
import { Zap, ArrowRight, ShieldAlert, CheckCircle2, Terminal, Radio } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES } from '@/lib/securityGuidelines';

export default function CommandCenterDashboard() {
  const activeDispatches = [
    {
      id: 'disp-01',
      title: 'Executive Deepfake & Phishing Defense Briefing',
      format: 'Slide Deck',
      audience: 'Executive Board',
      directives: 4,
      status: 'API Dispatched',
      time: 'Just now',
    },
    {
      id: 'disp-02',
      title: 'Zero-Trust & MFA Fatigue Video Storyboard',
      format: 'Video Script',
      audience: 'All Staff',
      directives: 3,
      status: 'Notebook Created',
      time: '42 mins ago',
    },
    {
      id: 'disp-03',
      title: 'Generative AI Safe Usage & Privacy Overview',
      format: 'Audio Podcast',
      audience: 'Product & Dev Teams',
      directives: 3,
      status: 'Audio Overview Ready',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tactical Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1322] via-[#090e1a] to-[#0d1322] border border-cyan-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tactical text-cyan-300">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            AUTOMATED NOTEBOOKLM THREAT DEFENSE MATRIX
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight font-sans">
            Tactical AI Presentation & Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Command Center</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Programmatically generate cybersecurity training decks, video scripts, and Google NotebookLM audio podcasts. Bound with non-negotiable security directives and dispatched directly via API — with zero manual labor.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 font-tactical text-xs">
            <Link
              href="/create"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Zap className="w-4 h-4 text-black" />
              LAUNCH AI GENERATOR MATRIX
            </Link>
            <Link
              href="/notebooklm"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-cyan-500/30 text-cyan-300 font-bold flex items-center gap-2 transition-all"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              API OPERATIONS CONSOLE
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="tactical-panel p-5 border-l-4 border-l-cyan-400">
          <div className="text-[11px] font-tactical text-gray-400 uppercase">System Status</div>
          <div className="text-2xl font-bold text-white mt-1 font-tactical">ACTIVE</div>
          <div className="text-xs text-cyan-400 mt-1 font-tactical">Zero Manual Copying</div>
        </div>
        <div className="tactical-panel p-5 border-l-4 border-l-emerald-400">
          <div className="text-[11px] font-tactical text-gray-400 uppercase">Bound Directives</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-tactical">{GLOBAL_CYBER_GUIDELINES.length} RULES</div>
          <div className="text-xs text-gray-400 mt-1 font-tactical">100% Guardrail Enforced</div>
        </div>
        <div className="tactical-panel p-5 border-l-4 border-l-amber-400">
          <div className="text-[11px] font-tactical text-gray-400 uppercase">Threat Defense Level</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 font-tactical">DEFCON 1</div>
          <div className="text-xs text-gray-400 mt-1 font-tactical">Zero-Trust Active</div>
        </div>
        <div className="tactical-panel p-5 border-l-4 border-l-purple-400">
          <div className="text-[11px] font-tactical text-gray-400 uppercase">Infrastructure</div>
          <div className="text-xs font-bold text-cyan-300 mt-2 space-y-0.5 font-tactical">
            <div>✓ GitHub CI/CD Active</div>
            <div>✓ Vercel Auto-Deploy</div>
            <div>✓ Supabase RLS Connected</div>
          </div>
        </div>
      </div>

      {/* Enforced Security Directives Matrix */}
      <div className="tactical-panel p-6 border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white font-tactical uppercase">Enforced Security Directives & Guardrails</h2>
          </div>
          <Link href="/guidelines" className="text-xs font-tactical text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            Manage All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GLOBAL_CYBER_GUIDELINES.map((rule) => (
            <div key={rule.id} className="bg-[#080d19] rounded-xl p-4 border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 font-tactical uppercase">{rule.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-tactical font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  {rule.severity}
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{rule.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Dispatches Table */}
      <div className="tactical-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white font-tactical uppercase">Live NotebookLM Dispatches</h2>
            <p className="text-xs text-gray-400 font-tactical">Automated API execution logs</p>
          </div>
          <Link
            href="/create"
            className="text-xs font-tactical text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
          >
            Launch Matrix <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300 font-tactical">
            <thead className="text-xs uppercase bg-[#080d19] text-gray-400 border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Target Audience</th>
                <th className="py-3 px-4">Directives</th>
                <th className="py-3 px-4">API Status</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-xs">
              {activeDispatches.map((d) => (
                <tr key={d.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{d.title}</td>
                  <td className="py-3.5 px-4 text-cyan-400 uppercase">{d.format}</td>
                  <td className="py-3.5 px-4 text-gray-300">{d.audience}</td>
                  <td className="py-3.5 px-4 text-emerald-400">{d.directives} Directives</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-gray-400">{d.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
