/**
 * Official Gemini Notebook Enterprise API Client
 * Documentation: https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-notebooks
 */

export interface EnterpriseNotebookConfig {
  projectId: string;
  location?: string; // 'us', 'eu', or 'global'
  accessToken: string;
}

export interface CreateNotebookRequest {
  displayName: string;
  description?: string;
}

export interface AddSourceDataRequest {
  notebookId: string;
  sourceTitle: string;
  content: string; // Plain text / Markdown ground truth
}

export class NotebookLMEnterpriseClient {
  private projectId: string;
  private location: string;
  private accessToken: string;

  constructor(config: EnterpriseNotebookConfig) {
    this.projectId = config.projectId;
    this.location = config.location || 'us';
    this.accessToken = config.accessToken;
  }

  private get baseUrl(): string {
    return `https://${this.location}-discoveryengine.googleapis.com/v1alpha/projects/${this.projectId}/locations/${this.location}`;
  }

  private get headers(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Create a new Gemini Enterprise Notebook
   */
  async createNotebook(displayName: string, description?: string) {
    const url = `${this.baseUrl}/notebooks`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        displayName,
        description: description || 'Cybersecurity Awareness AI Ground Truth Notebook',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to create Enterprise Notebook [${response.status}]: ${errText}`);
    }

    return await response.json();
  }

  /**
   * Add a text / document source into a specific notebook
   */
  async addSource(notebookId: string, sourceTitle: string, rawTextContent: string) {
    const url = `${this.baseUrl}/notebooks/${notebookId}/sources`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        displayName: sourceTitle,
        userContent: {
          text: rawTextContent,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to add source to Enterprise Notebook [${response.status}]: ${errText}`);
    }

    return await response.json();
  }

  /**
   * Query / Generate response based on grounded sources in notebook
   */
  async queryNotebook(notebookId: string, promptDirective: string) {
    const url = `${this.baseUrl}/notebooks/${notebookId}:query`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        query: promptDirective,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to query Enterprise Notebook [${response.status}]: ${errText}`);
    }

    return await response.json();
  }
}
