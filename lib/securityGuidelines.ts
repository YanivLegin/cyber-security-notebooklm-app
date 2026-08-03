import { CyberGuideline } from './supabase';

export const GLOBAL_CYBER_GUIDELINES: CyberGuideline[] = [
  {
    id: 'g-1',
    category: 'phishing',
    title: 'Phishing & Deepfake Social Engineering Defense',
    severity: 'CRITICAL',
    summary: 'Essential rules for detecting spear-phishing, business email compromise (BEC), and AI voice/video impersonation.',
    rule_directives: [
      'ALWAYS verify unexpected urgent financial or credential requests out-of-band via trusted channels.',
      'Inspect sender domain headers and hover over links before clicking.',
      'DO NOT reply to suspicious emails or approve unknown authentication attempts.',
      'Click the "Report Phishing" button immediately upon spotting suspicious activity.'
    ],
    forbidden_topics: [
      'Recommending paying ransoms or communicating directly with attackers',
      'Minimizing the severity of clicking unknown links'
    ],
    notebooklm_prompt_template: 'DIRECTIVE: Emphasize out-of-band verification for urgent financial requests and non-punitive phishing reporting.',
    is_global: true,
  },
  {
    id: 'g-2',
    category: 'passwords_mfa',
    title: 'Zero-Trust Identity, Password & MFA Hygiene',
    severity: 'CRITICAL',
    summary: 'Guidelines for robust passphrases, hardware keys, and stopping MFA Push Fatigue attacks.',
    rule_directives: [
      'Use 20+ character passphrases generated via Enterprise Password Managers.',
      'NEVER approve an MFA push notification you did not initiate (MFA Push Fatigue).',
      'Never share credentials across personal and work accounts or via internal messaging apps.'
    ],
    forbidden_topics: [
      'Suggesting writing passwords down or reusing master passwords'
    ],
    notebooklm_prompt_template: 'DIRECTIVE: Highlight MFA Push Fatigue awareness and the requirement for enterprise password managers.',
    is_global: true,
  },
  {
    id: 'g-3',
    category: 'ai_governance',
    title: 'Safe AI & LLM Usage Governance',
    severity: 'HIGH',
    summary: 'Preventing corporate data leaks, intellectual property loss, and code vulnerabilities when using Generative AI.',
    rule_directives: [
      'NEVER paste customer PII, confidential source code, or internal financial data into public AI models.',
      'Audit and review all AI-generated code for security flaws and hallucinations before merging.',
      'Use only enterprise-vetted LLM tools with strict zero-data-retention agreements.'
    ],
    forbidden_topics: [
      'Sharing confidential customer files with external public chatbots'
    ],
    notebooklm_prompt_template: 'DIRECTIVE: Enforce data privacy boundaries regarding public LLM usage and mandatory code security auditing.',
    is_global: true,
  },
  {
    id: 'g-4',
    category: 'incident_response',
    title: 'Incident Reporting & Ransomware Readiness',
    severity: 'HIGH',
    summary: 'Rapid response protocols for lost devices, malware alerts, and ransomware isolation.',
    rule_directives: [
      'If ransomware or abnormal device behavior is detected, IMMEDIATELY disconnect from Wi-Fi/Ethernet.',
      'Do not power off the machine (preserve RAM artifacts); report to the SOC immediately.',
      'Promote an open, transparent security culture where reporting mistakes is rewarded.'
    ],
    forbidden_topics: [
      'Hiding or delaying reporting of a suspected breach'
    ],
    notebooklm_prompt_template: 'DIRECTIVE: Detail immediate network isolation steps and highlight non-punitive reporting culture.',
    is_global: true,
  }
];

export function generateNotebookLMSourceDoc(
  title: string,
  targetAudience: string,
  mediaType: string,
  selectedGuidelines: CyberGuideline[]
): string {
  const dateStr = new Date().toISOString().split('T')[0];

  return `====================================================================
NOTEBOOKLM GROUND TRUTH SOURCE FILE
TITLE: ${title}
TARGET AUDIENCE: ${targetAudience}
MEDIA TYPE: ${mediaType.toUpperCase()}
DATE GENERATED: ${dateStr}
SYSTEM SECURITY FRAMEWORK: Enterprise Cyber Security Awareness Standards
====================================================================

[IMPORTANT SYSTEM DIRECTIVE]
This document serves as the GROUND TRUTH for NotebookLM to construct an AI-generated ${mediaType} (Slide Deck, Audio Overview Podcast, or Video Script).
NotebookLM MUST NOT extrapolate or contradict any of the security guidelines listed below.

--------------------------------------------------------------------
1. CORE OBJECTIVE & TARGET AUDIENCE
--------------------------------------------------------------------
- Primary Objective: Train ${targetAudience} on critical cybersecurity threat mitigation.
- Tone: Professional, authoritative yet engaging, action-oriented, and zero-jargon.
- Call to Action: "Stay Vigilant, Verify Out-of-Band, Report Instantly."

--------------------------------------------------------------------
2. MANDATORY CYBERSECURITY GUIDELINES & DIRECTIVES
--------------------------------------------------------------------
${selectedGuidelines.map((g, idx) => `
### RULE SET ${idx + 1}: ${g.title.toUpperCase()} [SEVERITY: ${g.severity}]
- Category: ${g.category}
- Summary: ${g.summary}

BOLD DIRECTIVES TO ENFORCE:
${g.rule_directives.map(r => `  * ${r}`).join('\n')}

FORBIDDEN TOPICS & ANTI-PATTERNS:
${g.forbidden_topics.map(f => `  * [PROHIBITED] ${f}`).join('\n')}
`).join('\n--------------------------------------------------------------------')}

--------------------------------------------------------------------
3. NOTEBOOKLM OUTPUT FORMATTING SPECIFICATION
--------------------------------------------------------------------
When generating a ${mediaType}, structure the content as follows:

A. For Presentations:
   - Slide 1: High-Impact Title & Executive Summary
   - Slide 2: Real-World Threat Scenario & Attack Vectors
   - Slide 3: Bold Security Rules & Defensive Actions (DO vs DO NOT)
   - Slide 4: Interactive Scenario / Quick Self-Check Quiz
   - Slide 5: Escalation Contacts & How to Report to SOC

B. For Video Scripts / Audio Podcast Overviews:
   - Speaker 1 (Security Officer): Sets up the threat landscape with vivid real-world context.
   - Speaker 2 (Employee / Co-Host): Asks practical questions about day-to-day work challenges.
   - Dialogue Focus: Clear breakdown of the Bold Guidelines with actionable solutions.
   - Ending: Memorable security slogan and immediate reporting protocol.

====================================================================
END OF NOTEBOOKLM SOURCE FILE
====================================================================`;
}
