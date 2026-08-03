import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const mockStatuses = [
    {
      id: 'asset-101',
      title: 'תדריך דיפפייק ופישינג לבקירה בכירה',
      mediaType: 'presentation',
      targetAudience: 'חברי הנהלה דירקטוריון',
      status: 'completed', // queued | processing | generating | completed | error
      progress: 100,
      currentStage: 'הושלם בהצלחה - תקינות 100%',
      directivesEnforced: ['אימות Out-of-Band', 'מניעת MFA Fatigue'],
      createdAt: '2026-08-03T19:40:00Z',
      completedAt: '2026-08-03T19:42:15Z',
      estimatedTimeRemainingSec: 0,
      outputs: {
        slideCount: 8,
        audioPodcastDurationMin: 4.5,
        downloadUrl: '#',
      },
    },
    {
      id: 'asset-102',
      title: 'תסריט וידאו: זהירות מ-MFA Push Fatigue',
      mediaType: 'video_script',
      targetAudience: 'כלל עובדי החברה',
      status: 'processing',
      progress: 68,
      currentStage: 'יוצר סצינות וידאו והנחיות קוליות...',
      directivesEnforced: ['מניעת MFA Push Fatigue', 'ניהול סיסמאות בארגון'],
      createdAt: '2026-08-03T20:10:00Z',
      completedAt: null,
      estimatedTimeRemainingSec: 25,
      outputs: {
        sceneCount: 6,
        downloadUrl: null,
      },
    },
    {
      id: 'asset-103',
      title: 'פודקאסט שמע: שימוש בטוח ב-AI ופרטיות מידע',
      mediaType: 'podcast_audio',
      targetAudience: 'צוותי פיתוח והנדסה',
      status: 'queued',
      progress: 15,
      currentStage: 'ממתין לתור עיבוד ב-NotebookLM API...',
      directivesEnforced: ['איסור הזרמת PII ל-LLM ציבורי'],
      createdAt: '2026-08-03T20:12:00Z',
      completedAt: null,
      estimatedTimeRemainingSec: 60,
      outputs: null,
    },
  ];

  if (id) {
    const item = mockStatuses.find((s) => s.id === id);
    if (item) return NextResponse.json(item);
    return NextResponse.json({ error: 'Asset ID not found' }, { status: 404 });
  }

  return NextResponse.json({ assets: mockStatuses });
}
