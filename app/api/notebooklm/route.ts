import { NextResponse } from 'next/server';
import { generateNotebookLMSourceDoc, GLOBAL_CYBER_GUIDELINES } from '@/lib/securityGuidelines';
import { NotebookLMEnterpriseClient } from '@/lib/notebooklmEnterpriseClient';
import { NotebookLMCommunityClient } from '@/lib/notebooklmCommunityClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      targetAudience = 'All Corporate Staff',
      mediaType = 'presentation',
      selectedGuidelineIds = ['g-1', 'g-2', 'g-3', 'g-4'],
      mode = 'preview', // 'preview' | 'enterprise_api' | 'community_api'
      gcpProjectId,
      gcpAccessToken,
    } = body;

    // Filter selected security directives
    const selectedGuidelines = GLOBAL_CYBER_GUIDELINES.filter((g) =>
      selectedGuidelineIds.includes(g.id)
    );

    // Generate NotebookLM Ground Truth Document
    const groundTruthDoc = generateNotebookLMSourceDoc(
      title,
      targetAudience,
      mediaType,
      selectedGuidelines
    );

    // Mode 1: Return formatted ground-truth text block for client-side / manual import
    if (mode === 'preview') {
      return NextResponse.json({
        success: true,
        mode: 'preview',
        title,
        mediaType,
        targetAudience,
        enforcedDirectivesCount: selectedGuidelines.length,
        groundTruthDoc,
        instructions: [
          '1. Copy groundTruthDoc from the payload.',
          '2. Open Google NotebookLM (notebooklm.google.com).',
          '3. Add new source -> Copied Text.',
          '4. Click Audio Overview or Generate Study Guide.',
        ],
      });
    }

    // Mode 2: Official Gemini Notebook Enterprise API
    if (mode === 'enterprise_api') {
      if (!gcpProjectId || !gcpAccessToken) {
        return NextResponse.json(
          { error: 'Missing gcpProjectId or gcpAccessToken for Enterprise API mode.' },
          { status: 400 }
        );
      }

      const enterpriseClient = new NotebookLMEnterpriseClient({
        projectId: gcpProjectId,
        accessToken: gcpAccessToken,
      });

      const notebook = await enterpriseClient.createNotebook(title, `Cybersecurity Briefing: ${title}`);
      const notebookId = notebook.name ? notebook.name.split('/').pop() : notebook.id;

      const source = await enterpriseClient.addSource(
        notebookId,
        'Cybersecurity Guidelines Ground Truth',
        groundTruthDoc
      );

      return NextResponse.json({
        success: true,
        mode: 'enterprise_api',
        notebook,
        source,
      });
    }

    // Mode 3: Community NotebookLM REST API wrapper
    if (mode === 'community_api') {
      const communityClient = new NotebookLMCommunityClient();
      const notebook = await communityClient.createNotebook(title);
      const source = await communityClient.addSource(
        notebook.id,
        'Cybersecurity Guidelines Ground Truth',
        groundTruthDoc
      );

      return NextResponse.json({
        success: true,
        mode: 'community_api',
        notebook,
        source,
      });
    }

    return NextResponse.json({ error: 'Invalid mode specified.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process NotebookLM API request.' },
      { status: 500 }
    );
  }
}
