import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_audience: string;
  media_type: 'presentation' | 'video_script' | 'podcast_audio' | 'interactive_deck';
  target_duration_minutes: number;
  status: 'draft' | 'guidelines_applied' | 'notebooklm_ready' | 'completed' | 'archived';
  selected_guideline_ids: string[];
  notebooklm_source_text?: string;
  final_prompt_directive?: string;
  created_at: string;
  updated_at: string;
};

export type CyberGuideline = {
  id: string;
  category: 'phishing' | 'zero_trust' | 'passwords_mfa' | 'data_protection' | 'incident_response' | 'remote_work' | 'ai_governance';
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  summary: string;
  rule_directives: string[];
  forbidden_topics: string[];
  notebooklm_prompt_template: string;
  is_global: boolean;
};
