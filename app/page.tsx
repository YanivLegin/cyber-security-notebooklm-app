'use client';

import Link from 'next/link';
import { ShieldCheck, Video, FileText, Sparkles, ArrowRight, BookOpen, AlertTriangle, Cpu, CheckCircle2 } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES } from '@/lib/securityGuidelines';

export default function Dashboard() {
  const mockProjects = [
    {
      id: 'proj-101',
      title: 'Executive Phishing & Deepfake Defense Deck',
      media_type: 'presentation',
      target_audience: 'Executive Leadership',
      status: 'notebooklm_ready',
      updated_at: '2026-08-03',
      guidelineCount: 3
    },
    {
      id: 'proj-102',
      title: 'Zero-Trust & MFA Push Fatigue Video Script',
      media_type: 'video_script',
      target_audience: 'All Staff',
      status: 'completed',
      updated_at: '2026-08-02',
      guidelineCount: 4
    },
    {
      id: 'proj-103',
      title: 'Safe Generative AI & Data Protection Audio Overview',
      media_type: 'podcast_audio',
      target_audience: 'Engineering & Product Teams',
      status: 'guidelines_applied',
      updated_at: '2026-08-01',
      guidelineCount: 2
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 border border-cyan-500/30 p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            NotebookLM + Cybersecurity Awareness Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Create AI Presentations & Videos with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Strict Security Directives</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Generate high-impact awareness slide decks, audio overview podcasts, and video storyboards via Google NotebookLM while embedding non-negotiable enterprise cybersecurity guidelines into the AI ground truth.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/create"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <Video className="w-4 h-4" />
              New AI Project
            </Link>
            <Link
              href="/guidelines"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Manage Security Rules ({GLOBAL_CYBER_GUIDELINES.length})
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="cyber-glass rounded-xl p-5 border-l-4 border-l-cyan-400">
          <div className="text-xs font-mono text-gray-400">Total Projects</div>
          <div className="text-2xl font-bold text-white mt-1">12</div>
          <div className="text-xs text-cyan-400 mt-2 font-mono">Presentations & Video Scripts</div>
        </div>
        <div className="cyber-glass rounded-xl p-5 border-l-4 border-l-emerald-400">
          <div className="text-xs font-mono text-gray-400">Security Guidelines Enforced</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{GLOBAL_CYBER_GUIDELINES.length} Rules</div>
          <div className="text-xs text-gray-400 mt-2 font-mono">100% Policy Compliance</div>
        </div>
        <div className="cyber-glass rounded-xl p-5 border-l-4 border-l-purple-400">
          <div className="text-xs font-mono text-gray-400">NotebookLM Exporter</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">Ready</div>
          <div className="text-xs text-gray-400 mt-2 font-mono">Ground Truth Source Builder</div>
        </div>
        <div className="cyber-glass rounded-xl p-5 border-l-4 border-l-amber-400">
          <div className="text-xs font-mono text-gray-400">Infra Connections</div>
          <div className="text-xs font-bold text-amber-300 mt-2 space-y-1 font-mono">
            <div>✓ GitHub Repo Linked</div>
            <div>✓ Vercel Deployed</div>
            <div>✓ Supabase RLS Active</div>
          </div>
        </div>
      </div>

      {/* Core Guidelines Preview Banner */}
      <div className="cyber-glass rounded-2xl p-6 border border-amber-500/20 bg-amber-950/10">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Active Non-Negotiable Security Directives</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GLOBAL_CYBER_GUIDELINES.slice(0, 4).map((rule) => (
            <div key={rule.id} className="bg-gray-900/80 rounded-xl p-4 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-cyan-300">{rule.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  {rule.severity}
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{rule.summary}</p>
              <div className="text-[11px] text-amber-300/90 font-mono pt-1">
                Mandate: {rule.rule_directives[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="cyber-glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Recent AI Presentation Projects</h2>
            <p className="text-xs text-gray-400 font-mono">Saved in Supabase & formatted for NotebookLM export</p>
          </div>
          <Link
            href="/create"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            Create New <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs font-mono uppercase bg-gray-900/80 text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Target Audience</th>
                <th className="py-3 px-4">Directives</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 font-sans">
              {mockProjects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{p.title}</td>
                  <td className="py-3.5 px-4 capitalize font-mono text-xs text-cyan-400">
                    {p.media_type.replace('_', ' ')}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-300">{p.target_audience}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-emerald-400">
                    {p.guidelineCount} Guidelines
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      {p.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/notebooklm?project=${p.id}`}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors"
                    >
                      Export NotebookLM
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
