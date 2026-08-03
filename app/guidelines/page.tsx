'use client';

import { useState } from 'react';
import { ShieldAlert, Plus, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES } from '@/lib/securityGuidelines';

export default function GuidelinesManager() {
  const [guidelines, setGuidelines] = useState(GLOBAL_CYBER_GUIDELINES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'phishing' | 'zero_trust' | 'passwords_mfa' | 'data_protection' | 'incident_response' | 'remote_work' | 'ai_governance'>('phishing');
  const [newSummary, setNewSummary] = useState('');
  const [newMandate, setNewMandate] = useState('');

  const handleAddGuideline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary || !newMandate) return;

    const newEntry = {
      id: `custom-${Date.now()}`,
      category: newCategory,
      title: newTitle,
      severity: 'HIGH' as const,
      summary: newSummary,
      rule_directives: [newMandate],
      forbidden_topics: ['Bypassing this security directive without CISO signoff'],
      notebooklm_prompt_template: `DIRECTIVE: Enforce ${newTitle} rules in generated output.`,
      is_global: false,
    };

    setGuidelines([newEntry, ...guidelines]);
    setNewTitle('');
    setNewSummary('');
    setNewMandate('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Policy Engine & AI Guardrails
          </div>
          <h1 className="text-3xl font-extrabold text-white">Cybersecurity Guidelines & Directives</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage the bold, non-negotiable security mandates injected into NotebookLM AI sources.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/10"
        >
          <Plus className="w-4 h-4" />
          Add Custom Directive
        </button>
      </div>

      {/* Add Directive Modal / Drawer */}
      {showAddModal && (
        <form onSubmit={handleAddGuideline} className="cyber-glass rounded-2xl p-6 border-cyan-500/40 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            New Cybersecurity Policy Directive
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">Policy Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Clean Desk & Screen Locking Policy"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="phishing">Phishing & Deepfakes</option>
                <option value="passwords_mfa">Passwords & MFA</option>
                <option value="zero_trust">Zero-Trust & Identity</option>
                <option value="ai_governance">AI Governance</option>
                <option value="incident_response">Incident Response</option>
                <option value="remote_work">Remote Work Security</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-300 mb-1">Summary Description</label>
            <input
              type="text"
              required
              placeholder="Brief rationale for this security rule..."
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-300 mb-1">Bold Mandate / Rule Directive</label>
            <textarea
              required
              rows={3}
              placeholder="ALWAYS lock screens (Win+L / Cmd+Ctrl+Q) when stepping away..."
              value={newMandate}
              onChange={(e) => setNewMandate(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-mono hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono hover:bg-cyan-400"
            >
              Save Directive
            </button>
          </div>
        </form>
      )}

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidelines.map((rule) => (
          <div key={rule.id} className="cyber-glass rounded-2xl p-6 border border-gray-800 space-y-4 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 text-xs font-mono font-bold border border-cyan-800 capitalize">
                {rule.category.replace('_', ' ')}
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                {rule.severity}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{rule.title}</h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">{rule.summary}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-800">
              <div className="text-xs font-mono text-cyan-400 font-bold">Enforced Rule Directives:</div>
              <ul className="space-y-1 text-xs text-gray-300">
                {rule.rule_directives.map((rd, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rd}</span>
                  </li>
                ))}
              </ul>
            </div>

            {rule.forbidden_topics && rule.forbidden_topics.length > 0 && (
              <div className="space-y-1 pt-2 border-t border-gray-800">
                <div className="text-xs font-mono text-red-400 font-bold">Explicitly Prohibited Actions:</div>
                <ul className="space-y-1 text-xs text-gray-400">
                  {rule.forbidden_topics.map((ft, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{ft}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
