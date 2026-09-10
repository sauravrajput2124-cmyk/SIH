# 🩺 CareLink – AI-Assisted Multilingual Healthcare & Menstrual Education Platform

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/sauravrajput2124-cmyk/SIH)
[![Localhost](https://img.shields.io/badge/Localhost-http%3A%2F%2Flocalhost%3A5173-emerald?logo=vite)](http://localhost:5173)
[![Multilingual](https://img.shields.io/badge/Languages-Marathi%20%7C%20Hindi%20%7C%20English-sky)](#-multilingual-support)

**CareLink** is an AI-assisted healthcare and menstrual education prototype designed for adolescent girls, women, and community healthcare workers in India. It features localized educational video modules, Web Speech API voice input, real-time AI symptom screening triage, period tracking, and multilingual support across Marathi, Hindi, and English.

---

## 🚀 How to Run in Localhost (`http://localhost:5173`)

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your machine.

### 2. Clone the Repository & Install Dependencies
```bash
git clone https://github.com/sauravrajput2124-cmyk/SIH.git
cd SIH
npm install
```

### 3. Start the Local Development Server
```bash
npm run dev
```

### 4. Open in Browser
Click or navigate to the local server URL:
👉 **[http://localhost:5173](http://localhost:5173)**

- Direct link to **My First Period Education**: **[http://localhost:5173/first-period](http://localhost:5173/first-period)**
- Direct link to **Menstrual Healthcare Dashboard**: **[http://localhost:5173/menstrual](http://localhost:5173/menstrual)**

---

## 📹 Educational Videos Setup

Place your 5 `.mp4` video files inside `public/videos/`:

- `public/videos/video1.mp4` – *What is Menstruation?*
- `public/videos/video2.mp4` – *Why Do Periods Start?*
- `public/videos/video3.mp4` – *What to Expect During Your First Period*
- `public/videos/video4.mp4` – *Basic Menstrual Hygiene & Pad Usage*
- `public/videos/video5.mp4` – *Common Symptoms & When to Consult an Adult*

> *Note: If video files are missing, the interactive player automatically displays clean animated fallback scenes so playback never breaks!*

---

## 📋 Implementation Plan & Architecture Overview

```
User Accesses CareLink
        ↓
Multilingual Language Selector (Marathi / Hindi / English)
        ↓
Home Dashboard → Menstrual Healthcare Section
        ↓
"My First Period – Menstrual Education" Card (/first-period)
        ↓
5 Synchronized Educational Video Cards (Play, Pause, Seek Bar, Volume)
        ↓
"Describe What You Are Experiencing" (Free Text OR Web Speech API Voice Mic)
        ↓
AI Triage Screening Engine (demoMLService.js)
        ↓
Result Output Card (🟢 Low Concern / 🟡 Moderate Concern / 🔴 Higher Concern)
        ↓
Guidance & Printable Health Assessment Report
```

### ⚙️ Key Technical Features:
1. **Synchronized Video Player**: DOM `useRef` array binding HTML5 video events (`onPlay`, `onPause`, `onTimeUpdate`, `onLoadedMetadata`) with interactive seek slider, formatted time display (`mm:ss`), volume controls, and auto-pausing inactive streams.
2. **Web Speech API Voice Recognition**: Speech-to-text recognition supporting `mr-IN` (Marathi), `hi-IN` (Hindi), and `en-IN` (English).
3. **Local Machine Learning Triage Engine**: Symptom score evaluator returning clinical guidance without storing sensitive health data externally.
4. **CareLink Design System**: Ice Blue aesthetic palette (`#EAF7FF`, `#2196E8`, `#123969`) with Lucide UI icons.
