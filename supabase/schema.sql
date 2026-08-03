-- =========================================================
-- CYBER SECURITY AWARENESS NOTEBOOKLM PLATFORM SCHEMA
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'security_champion' CHECK (role IN ('admin', 'security_champion', 'content_creator', 'viewer')),
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. CYBERSECURITY GUIDELINES TABLE
CREATE TABLE IF NOT EXISTS public.cyber_guidelines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('phishing', 'zero_trust', 'passwords_mfa', 'data_protection', 'incident_response', 'remote_work', 'ai_governance')),
  title TEXT NOT NULL,
  severity TEXT DEFAULT 'HIGH' CHECK (severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
  summary TEXT NOT NULL,
  rule_directives TEXT[] NOT NULL, -- Mandatory rules that NotebookLM MUST enforce
  forbidden_topics TEXT[], -- Topics or actions explicitly prohibited
  notebooklm_prompt_template TEXT NOT NULL, -- Formatted prompt block for NotebookLM ground truth
  is_global BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. PROJECTS (PRESENTATIONS & VIDEOS) TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_audience TEXT NOT NULL DEFAULT 'All Employees', -- e.g., Executives, Developers, General Staff
  media_type TEXT NOT NULL CHECK (media_type IN ('presentation', 'video_script', 'podcast_audio', 'interactive_deck')),
  target_duration_minutes INT DEFAULT 5,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'guidelines_applied', 'notebooklm_ready', 'completed', 'archived')),
  selected_guideline_ids UUID[] DEFAULT '{}',
  notebooklm_source_text TEXT,
  final_prompt_directive TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. GENERATED OUTPUTS TABLE
CREATE TABLE IF NOT EXISTS public.generated_outputs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  slide_deck_json JSONB, -- Slide titles, bullet points, speaker notes
  audio_podcast_script TEXT, -- NotebookLM Audio Overview script
  video_storyboard JSONB, -- Scene by scene visual + audio directives
  compliance_check_passed BOOLEAN DEFAULT TRUE,
  compliance_notes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cyber_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view & update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Cyber Guidelines: Everyone authenticated can view global guidelines
CREATE POLICY "Anyone can view global guidelines" ON public.cyber_guidelines FOR SELECT USING (is_global = TRUE OR created_by = auth.uid());
CREATE POLICY "Users can insert custom guidelines" ON public.cyber_guidelines FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Projects: Users can manage their own projects
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Generated Outputs: Users can access outputs for their own projects
CREATE POLICY "Users can view outputs for own projects" ON public.generated_outputs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = generated_outputs.project_id AND projects.user_id = auth.uid())
);
CREATE POLICY "Users can create outputs for own projects" ON public.generated_outputs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = generated_outputs.project_id AND projects.user_id = auth.uid())
);

-- Seed Initial Global Cybersecurity Guidelines
INSERT INTO public.cyber_guidelines (category, title, severity, summary, rule_directives, forbidden_topics, notebooklm_prompt_template, is_global)
VALUES
(
  'phishing',
  'Strict Phishing & Anti-Impersonation Protocol',
  'CRITICAL',
  'Mandatory rules for spotting email, SMS (smishing), and deepfake voice/video phishing attacks.',
  ARRAY[
    'ALWAYS verify unexpected urgent payment/credential requests via an out-of-band communication channel.',
    'NEVER click on links or open attachments in unsolicited messages before checking sender domain headers.',
    'DO NOT fall for urgency tactics ("Your account will be suspended in 10 minutes").',
    'Report suspicious emails immediately using the internal PhishAlert button.'
  ],
  ARRAY[
    'Promoting workarounds to security filters',
    'Assuming internal emails are always trustworthy without verification'
  ],
  'CORE SECURITY DIRECTIVE: All generated presentations and audio scripts MUST explicitly highlight out-of-band verification and zero-trust verification of links. Emphasize non-punitive reporting culture.',
  TRUE
),
(
  'zero_trust',
  'Zero-Trust Architecture & Credential Hygiene',
  'HIGH',
  'Core rules on strong passphrase standards, password managers, and multi-factor authentication (MFA).',
  ARRAY[
    'Password reuse across corporate and personal accounts is strictly prohibited.',
    'MFA is mandatory on every system. Never approve unsolicited MFA push notifications (MFA Fatigue).',
    'Use enterprise-approved password managers to generate 20+ character random passphrases.'
  ],
  ARRAY[
    'Writing passwords on physical sticky notes',
    'Sharing credentials via Slack or email'
  ],
  'CORE SECURITY DIRECTIVE: The output MUST highlight MFA Push Fatigue defense and strict prohibition of credential sharing in chat apps.',
  TRUE
),
(
  'ai_governance',
  'Safe Enterprise Use of Generative AI & LLMs',
  'HIGH',
  'Guidelines on preventing confidential IP leakage into public AI models.',
  ARRAY[
    'NEVER paste proprietary source code, customer PII, or internal financials into unapproved public AI tools.',
    'Verify all AI-generated code or text for security vulnerabilities and hallucinations prior to deployment.',
    'Use enterprise-vetted AI environments with data opt-out guarantees.'
  ],
  ARRAY[
    'Inputting customer personally identifiable information (PII) into public LLM chats'
  ],
  'CORE SECURITY DIRECTIVE: Highlight safe prompt engineering, data privacy boundaries, and prevention of corporate data leaks through public AI models.',
  TRUE
);
