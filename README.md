# CyberStudio AI - NotebookLM Cybersecurity Presentation & Video Creator

> An enterprise web application for creating AI-generated Cybersecurity Awareness presentations, slide decks, video scripts, and Google NotebookLM audio overviews — backed by non-negotiable security directives, Supabase, Vercel, and GitHub.

---

## 🌟 Key Features

1. **NotebookLM Ground Truth Generator**: Automatically builds formatted source documents for Google NotebookLM, prepending bold, clear security rules and directives.
2. **Bold Cybersecurity Guidelines & Guardrails**: Enforces non-negotiable policy standards across Phishing & Deepfakes, Zero-Trust Identity, Passwords & MFA Push Fatigue, Data Protection, Incident Response, and Safe Generative AI usage.
3. **Multi-Format AI Output Support**:
   - **Slide Decks**: Structure, speaker notes, and key takeaways.
   - **Video Storyboard Scripts**: Scene-by-scene audio and visual cues.
   - **NotebookLM Audio Overviews**: Two-host conversational podcast scripts.
4. **Supabase Database & Auth Integration**: Store projects, custom guidelines, and audit logs with Row Level Security (RLS).
5. **Turnkey GitHub & Vercel Deployment**: Pre-configured CI/CD workflow (`.github/workflows/deploy.yml`) and `vercel.json` for seamless deployment.

---

## 🏗 Architecture & Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript, React 18)
- **Styling**: Tailwind CSS with Cyber Dark Glassmorphic Theme
- **Database & Auth**: Supabase (PostgreSQL with RLS policies)
- **AI Core**: Google NotebookLM Ground Truth Prompt Engine
- **Deployment**: Vercel + GitHub Actions

---

## 🚀 Step-by-Step Deployment Guide

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Copy the contents of `supabase/schema.sql` from this repository and run the script. This creates:
   - `profiles` table
   - `cyber_guidelines` table (pre-populated with global security directives)
   - `projects` table
   - `generated_outputs` table
   - `audit_logs` table
   - Row Level Security (RLS) policies and triggers
4. Copy your **Project URL** and **Anon Key** from `Project Settings` -> `API`.

---

### 2. Local Setup & Testing
1. Clone your repository:
   ```bash
   git clone https://github.com/your-username/cyber-security-notebooklm-app.git
   cd cyber-security-notebooklm-app
   ```
2. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Install dependencies and start the local development server:
   ```bash
   npm install
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 3. GitHub & Vercel Deployment

#### Step A: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit of CyberStudio NotebookLM Web App"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/cyber-security-notebooklm-app.git
git push -u origin main
```

#### Step B: Connect Vercel
1. Log in to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Select your GitHub repository (`cyber-security-notebooklm-app`).
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key`
4. Click **Deploy**. Vercel will build and host your application with automatic SSL and global CDN.

---

## 🛡️ Core Cybersecurity Directives & Guidelines for NotebookLM

Every presentation or video generated through this system incorporates the following **bold guardrails**:

1. **Phishing & Social Engineering**:
   - *Mandate*: Always verify unexpected urgent financial/credential requests **out-of-band** (phone/direct chat). Never reply to suspicious senders.
2. **Zero-Trust Identity & MFA Fatigue**:
   - *Mandate*: Never approve unsolicited MFA push notifications. Report unknown push prompts as fraud immediately.
3. **Safe Generative AI Usage**:
   - *Mandate*: Never paste confidential source code, customer PII, or internal financials into unapproved public AI models.
4. **Incident Escalation**:
   - *Mandate*: Disconnect Wi-Fi/Ethernet immediately upon ransomware suspicion. Report immediately without fear of punishment.

---

## 📄 License
MIT License. Free for enterprise cybersecurity awareness training and educational use.
