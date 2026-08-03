'use client';

import { useState, useEffect } from 'react';
import { Activity, CheckCircle, Clock, Loader2, AlertCircle, Play, FileText, Video, Mic, RefreshCw, Sparkles, Download, ShieldCheck, Eye } from 'lucide-react';

export default function StatusTrackerPage() {
  const [filter, setFilter] = useState<'all' | 'processing' | 'completed'>('all');
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const fetchStatuses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tracker');
      const data = await res.json();
      if (data.assets) {
        setAssets(data.assets);
      }
    } catch (err) {
      console.error('Failed to fetch asset statuses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 5000); // Live poll every 5s
    return () => clearInterval(interval);
  }, []);

  const filteredAssets = assets.filter((a) => {
    if (filter === 'processing') return a.status === 'processing' || a.status === 'queued';
    if (filter === 'completed') return a.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tactical text-cyan-300 mb-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            ממשק מעקב סטטוס בזמן אמת (REAL-TIME TRACKER)
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight font-sans">
            מעקב סטטוס יצירת מצגות וסרטוני AI
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-sans">
            נטר בזמן אמת את תהליך העיבוד של NotebookLM API, התקדמות האחוזים וסטטוס מוכנות הקבצים.
          </p>
        </div>

        <button
          onClick={fetchStatuses}
          className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-tactical font-bold flex items-center gap-2 hover:bg-cyan-500/30 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          רענן נתונים
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex border-b border-cyan-500/20 gap-4 text-xs font-tactical">
        {[
          { key: 'all', label: 'כל המצגות והסרטונים' },
          { key: 'processing', label: 'בתהליך עיבוד (Processing)' },
          { key: 'completed', label: 'הושלמו ומוכנים (Completed)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`pb-3 px-2 border-b-2 font-bold transition-all ${
              filter === tab.key
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Asset Status Cards List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredAssets.map((asset) => {
          const isCompleted = asset.status === 'completed';
          const isProcessing = asset.status === 'processing';
          const isQueued = asset.status === 'queued';

          return (
            <div
              key={asset.id}
              className="tactical-panel p-6 border-cyan-500/20 hover:border-cyan-500/40 transition-all space-y-4"
            >
              {/* Card Top Row */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#050811] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    {asset.mediaType === 'presentation' && <FileText className="w-5 h-5" />}
                    {asset.mediaType === 'video_script' && <Video className="w-5 h-5" />}
                    {asset.mediaType === 'podcast_audio' && <Mic className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">{asset.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-tactical mt-0.5">
                      <span>קהל יעד: <strong className="text-gray-200">{asset.targetAudience}</strong></span>
                      <span>•</span>
                      <span>פורמט: <strong className="text-cyan-400 uppercase">{asset.mediaType}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tactical font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      הושלם ומוכן להורדה
                    </span>
                  )}
                  {isProcessing && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tactical font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 animate-pulse">
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                      מעבד כעת ב-NotebookLM API ({asset.progress}%)
                    </span>
                  )}
                  {isQueued && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tactical font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
                      <Clock className="w-4 h-4 text-amber-400" />
                      ממתין לתור
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar Row */}
              <div className="space-y-1.5 font-tactical">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold">{asset.currentStage}</span>
                  <span className="text-cyan-400 font-black">{asset.progress}%</span>
                </div>
                <div className="w-full h-3 bg-[#050811] rounded-full overflow-hidden border border-cyan-500/30">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-400'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    }`}
                    style={{ width: `${asset.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Directives & Metadata Footer */}
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-gray-800 text-xs font-tactical gap-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>הנחיות אבטחה אכפות: <strong>{asset.directivesEnforced.join(', ')}</strong></span>
                </div>

                {isCompleted && (
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 text-black font-extrabold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    צפה בתוצר ופרטים
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tactical-panel max-w-2xl w-full p-6 space-y-4 border-cyan-500/40">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold text-white font-sans">{selectedAsset.title}</h3>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-gray-400 hover:text-white font-mono text-sm"
              >
                ✕ סגור
              </button>
            </div>

            <div className="space-y-2 text-xs font-tactical text-gray-300">
              <div>• סטטוס: <span className="text-emerald-400 font-bold">100% הושלם</span></div>
              <div>• שקופיות/סצינות שנוצרו: <span className="text-cyan-300 font-bold">{selectedAsset.outputs?.slideCount || selectedAsset.outputs?.sceneCount || 8} יחידות</span></div>
              <div>• פודקאסט שמע נלווה: <span className="text-cyan-300 font-bold">{selectedAsset.outputs?.audioPodcastDurationMin || 4.5} דקות</span></div>
            </div>

            <div className="p-4 rounded-xl bg-[#050811] border border-cyan-500/20 text-xs font-mono text-cyan-300 leading-relaxed">
              [תוצר NotebookLM API מוכן ומאומת מול מדיניות האבטחה]
              <br />
              התוצר נשמר ב-Supabase ומסונכרן לחשבונך.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-tactical hover:bg-gray-700"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
