'use client';

import { useState } from 'react';
import { Video, Presentation, Mic, Zap, Loader2, Activity, Sparkles } from 'lucide-react';
import { GLOBAL_CYBER_GUIDELINES } from '@/lib/securityGuidelines';
import SlideDeckViewer from '@/components/SlideDeckViewer';
import VideoStoryboardViewer from '@/components/VideoStoryboardViewer';
import AudioPodcastViewer from '@/components/AudioPodcastViewer';

export default function AutomatedCreateProject() {
  const [title, setTitle] = useState('תדריך אבטחת מידע, סייבר ודיפפייק ארגוני');
  const [mediaType, setMediaType] = useState<'presentation' | 'video_script' | 'podcast_audio'>('presentation');
  const [targetAudience, setTargetAudience] = useState('כלל עובדי החברה');
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>(['g-1', 'g-2', 'g-3', 'g-4']);

  // Execution & Progress State
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setProgress(10);
    setProgressStepLabel('שלב 1/4: אוסף ומחיל הנחיות אבטחת מידע...');
    setApiResult(null);
    setExecutionLogs([
      '⚡ מתחיל מנוע ייצור AI למצגות, סרטונים ופודקאסטים...',
      '🛡️ קודח ומחיל הנחיות אבטחה מחייבות מול ה-Ground Truth Framework...',
    ]);

    try {
      await new Promise((r) => setTimeout(r, 400));
      setProgress(35);
      setProgressStepLabel('שלב 2/4: מייצר שקופיות, תסריטי וידאו ודיאלוגים...');
      setExecutionLogs((prev) => [
        ...prev,
        `📄 מייצר תוצר ${mediaType.toUpperCase()} מותאם אישית...`,
      ]);

      await new Promise((r) => setTimeout(r, 400));
      setProgress(70);
      setProgressStepLabel('שלב 3/4: משדר בקשה ל-NotebookLM API...');
      setExecutionLogs((prev) => [
        ...prev,
        '📡 משדר בקשת עיבוד לנקודת הקצה /api/notebooklm...',
      ]);

      const res = await fetch('/api/notebooklm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          targetAudience,
          mediaType,
          selectedGuidelineIds: selectedRuleIds,
        }),
      });

      const data = await res.json();
      await new Promise((r) => setTimeout(r, 400));
      setProgress(100);
      setProgressStepLabel('שלב 4/4: היצירה הושלמה בהצלחה! התוכן מוכן להצגה.');

      if (res.ok) {
        setExecutionLogs((prev) => [
          ...prev,
          '✅ המצגת/הסרטון/הפודקאסט נוצרו בהצלחה ומאומתים מול מדיניות האבטחה.',
          '🎉 התוצר האינטראקטיבי מוכן לצפייה ולניגון מטה!',
        ]);
        setApiResult(data);
      } else {
        setExecutionLogs((prev) => [
          ...prev,
          `❌ שגיאת API: ${data.error || 'הייצור נכשל.'}`,
        ]);
      }
    } catch (err: any) {
      setProgressStepLabel('התקשרות נכשלה');
      setExecutionLogs((prev) => [
        ...prev,
        `❌ שגיאת תקשורת: ${err.message || 'שגיאת שרת'}`,
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tactical text-cyan-300 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          מחולל AI אוטומטי למצגות, סרטונים ופודקאסטים
        </div>
        <h1 className="text-3xl font-black text-white font-sans tracking-tight">יצירת מצגת, סרטון וידאו או פודקאסט AI</h1>
        <p className="text-gray-400 text-sm mt-1 font-sans">
          בחר את הנחיות האבטחה והפעל יצירה אוטומטית מלאה של שקופיות, תסריט וידאו או שמע חי.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="tactical-panel p-6 space-y-5">
            <h2 className="text-base font-bold text-white font-tactical uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-cyan-500 text-black font-tactical text-xs flex items-center justify-center font-bold">1</span>
              פרמטרי התוצר
            </h2>

            <div>
              <label className="block text-xs font-tactical text-gray-300 mb-1.5 uppercase">כותרת המצגת / הסרטון</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#080d19] border border-cyan-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-tactical text-gray-300 mb-1.5 uppercase">סוג התוצר לייצור</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'presentation', name: 'מצגת שקופיות', icon: Presentation },
                  { type: 'video_script', name: 'סרטון וידאו', icon: Video },
                  { type: 'podcast_audio', name: 'פודקאסט שמע', icon: Mic },
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
                      <div className="text-xs font-tactical">{item.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-tactical text-gray-300 mb-1.5 uppercase">קהל יעד</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-[#080d19] border border-cyan-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-sans"
              >
                <option>כלל עובדי החברה</option>
                <option>חברי הנהלה ובקירה</option>
                <option>צוותי פיתוח והנדסת תוכנה</option>
                <option>צוותי כספים וחשבונאות</option>
                <option>עובדים חדשים בתהליך קליטה</option>
              </select>
            </div>
          </div>

          {/* Directives Selector */}
          <div className="tactical-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white font-tactical uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-cyan-500 text-black font-tactical text-xs flex items-center justify-center font-bold">2</span>
                הנחיות אבטחה לאכיפה
              </h2>
              <span className="text-xs font-tactical text-cyan-400 font-bold">{selectedRuleIds.length} פעילות</span>
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
                        <span className="text-xs font-bold text-cyan-300 font-tactical">{rule.title}</span>
                      </div>
                      <span className="text-[10px] font-tactical font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        {rule.severity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Execute Button */}
            <button
              type="button"
              disabled={isExecuting}
              onClick={handleRunAutomatedApi}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold font-tactical text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 mt-4"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  מייצר את התוצר כעת...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-black" />
                  צור {mediaType === 'presentation' ? 'מצגת שקופיות' : mediaType === 'video_script' ? 'סרטון וידאו' : 'פודקאסט שמע'} כעת!
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Screen */}
        <div className="lg:col-span-7 space-y-6">
          {/* Progress Bar Display */}
          {(isExecuting || progress > 0) && (
            <div className="tactical-panel p-5 border-cyan-500/40 space-y-3 font-tactical">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-300 font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  {progressStepLabel}
                </span>
                <span className="text-cyan-400 font-black text-sm">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-950 rounded-full overflow-hidden border border-cyan-500/30">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Real Generated Renderers */}
          {apiResult ? (
            <div className="animate-fadeIn space-y-6">
              {/* Show Slide Viewer if Presentation */}
              {mediaType === 'presentation' && apiResult.slides && (
                <SlideDeckViewer slides={apiResult.slides} title={apiResult.title} />
              )}

              {/* Show Video Storyboard if Video */}
              {mediaType === 'video_script' && apiResult.videoScenes && (
                <VideoStoryboardViewer scenes={apiResult.videoScenes} title={apiResult.title} />
              )}

              {/* Show Audio Podcast Player if Audio */}
              {mediaType === 'podcast_audio' && apiResult.audioDialogue && (
                <AudioPodcastViewer dialogue={apiResult.audioDialogue} title={apiResult.title} />
              )}
            </div>
          ) : (
            <div className="tactical-panel p-12 border-cyan-500/20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans">מסך התוצרים המיוצרים</h3>
              <p className="text-xs text-gray-400 font-sans max-w-md mx-auto leading-relaxed">
                לחץ על הכפתור <strong className="text-cyan-400">"צור כעת"</strong> מימין. המערכת תייצר ותציג מיד מצגת שקופיות אינטראקטיבית, תסריט וידאו עם סצינות ופרומפטים ל-AI Video, או פודקאסט שמע חי להשמעה!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
