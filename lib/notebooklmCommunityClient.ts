/**
 * Community NotebookLM REST API Client (notebooklm-rest-api / notebooklm-py)
 * Repository: https://github.com/gnh1201/notebooklm-rest-api
 */

export interface CommunityNotebookConfig {
  baseUrl?: string; // Default: http://localhost:8000
  apiKey?: string;
}

export class NotebookLMCommunityClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(config?: CommunityNotebookConfig) {
    this.baseUrl = config?.baseUrl || process.env.NOTEBOOKLM_REST_API_URL || 'http://localhost:8000';
    this.apiKey = config?.apiKey || process.env.NOTEBOOKLM_REST_API_KEY;
  }

  private get headers(): Record<string, string> {
    const h: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      h['X-API-Key'] = this.apiKey;
    }
    return h;
  }

  /**
   * List existing notebooks
   */
  async listNotebooks() {
    const res = await fetch(`${this.baseUrl}/api/v1/notebooks`, {
      method: 'GET',
      headers: this.headers,
    });
    return res.json();
  }

  /**
   * Create a new notebook
   */
  async createNotebook(title: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/notebooks`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ title }),
    });
    return res.json();
  }

  /**
   * Add a cybersecurity awareness ground truth source
   */
  async addSource(notebookId: string, title: string, content: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/notebooks/${notebookId}/sources`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        title,
        type: 'text',
        content,
      }),
    });
    return res.json();
  }

  /**
   * Request NotebookLM Q&A or Audio Overview script generation
   */
  async generateArtifact(notebookId: string, artifactType: 'audio_overview' | 'study_guide' | 'faq', prompt: string) {
    const res = await fetch(`${this.baseUrl}/api/v1/notebooks/${notebookId}/generate`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        artifact_type: artifactType,
        prompt,
      }),
    });
    return res.json();
  }
}
