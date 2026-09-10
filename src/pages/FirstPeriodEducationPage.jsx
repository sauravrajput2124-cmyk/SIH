import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { analyzeMenstrualSymptoms } from '../services/demoMLService';
import { storageService } from '../services/storageService';
import { ResultCard } from '../components/ResultCard';

import {
  PlayCircle,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Mic,
  Brain,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  HelpCircle,
  Clock,
  Sparkle,
  UserCheck,
  Check
} from 'lucide-react';

// Subcomponent for each individual video card with full synced HTML5 player controls
const EducationalVideoCard = ({ video, t, activePlayingId, onPlayStart }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Sync activePlayingId: Pause this video if another video becomes active
  useEffect(() => {
    if (activePlayingId !== video.id && isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [activePlayingId, video.id, isPlaying]);

  // HTML5 Event Handlers
  const handleNativePlay = () => {
    setIsPlaying(true);
    onPlayStart(video.id);
  };

  const handleNativePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 0;
      setCurrentTime(curr);
      if (dur > 0) {
        setDuration(dur);
        if (curr >= dur - 0.5) {
          setIsCompleted(true);
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
  };

  const handleVideoError = () => {
    setHasVideoError(true);
  };

  // User Actions
  const handleTogglePlay = (e) => {
    if (e) e.stopPropagation();
    if (hasVideoError) return;

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        onPlayStart(video.id);
        videoRef.current.play().catch((err) => {
          console.warn("Video play error:", err);
        });
      }
    }
  };

  const handleSeekChange = (e) => {
    const seekPercent = parseFloat(e.target.value);
    if (videoRef.current && duration > 0) {
      const newTime = (seekPercent / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
    setIsMuted(newVol === 0);
  };

  const handleToggleMute = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  const IconComp = video.icon;

  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl ${
        isPlaying
          ? 'border-sky-600 ring-4 ring-sky-100'
          : isCompleted
          ? 'border-emerald-300'
          : 'border-sky-200'
      }`}
    >
      {/* Video Container Screen */}
      <div className="relative bg-gradient-to-br from-[#123969] via-[#1a4a82] to-[#2196E8] text-white p-4 flex flex-col justify-between overflow-hidden">
        
        {/* Background Subtle Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#BFE6F8_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        {/* Top Header Row: Video Number Badge & Completed Badge */}
        <div className="relative z-10 flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            Video {video.id} of 5
          </span>

          {isCompleted ? (
            <span className="text-[10px] font-bold bg-emerald-500 text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <Check className="w-3 h-3" />
              {t.completedBadge || "Completed"}
            </span>
          ) : (
            <span className="text-[10px] font-medium text-sky-100">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : video.duration}
            </span>
          )}
        </div>

        {/* Video Player or Fallback View */}
        {!hasVideoError ? (
          <div className="relative z-10 my-1 group cursor-pointer" onClick={handleTogglePlay}>
            <video
              ref={videoRef}
              src={video.src}
              preload="metadata"
              onPlay={handleNativePlay}
              onPause={handleNativePause}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              onError={handleVideoError}
              className="w-full h-40 object-cover rounded-xl shadow-md border border-white/20"
            />
            {/* Play/Pause Overlay Icon when Paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] rounded-xl flex items-center justify-center transition-all group-hover:bg-slate-900/50">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/40 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative z-10 my-4 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto shadow-md border border-white/30">
              <IconComp className="w-6 h-6 text-sky-200" />
            </div>
            <span className="text-xs font-bold text-white block">
              {video.title}
            </span>
          </div>
        )}

        {/* Interactive Scrub Bar & Controls */}
        <div className="relative z-10 space-y-2 pt-2">
          
          {/* Interactive Range Seek Bar */}
          <div className="relative w-full flex items-center group">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progressPercent}
              onChange={handleSeekChange}
              className="w-full h-2 accent-sky-300 bg-white/20 hover:bg-white/30 rounded-lg cursor-pointer transition-all focus:outline-none"
              title="Click or drag to seek video position"
            />
          </div>

          {/* Bottom Controls Row: Play/Pause Button, Time Display, Volume Control */}
          <div className="flex items-center justify-between text-[11px] font-medium pt-1">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-white/20 active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-sky-200" />
                  <span>{t.pauseVideoBtn || "Pause"}</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-3.5 h-3.5 text-sky-200" />
                  <span>{t.playVideoBtn || "Play Video"}</span>
                </>
              )}
            </button>

            {/* Time Display */}
            <span className="text-[10px] font-mono font-bold text-sky-100/90">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : video.duration}
            </span>

            {/* Volume Control */}
            <div className="relative flex items-center gap-1">
              <button
                type="button"
                onClick={handleToggleMute}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-300" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-12 sm:w-16 h-1.5 accent-sky-300 bg-white/20 rounded-lg cursor-pointer"
                title="Adjust Volume"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Video Details Body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
            {video.id}. {video.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {video.desc}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{t.videoProgress || "Progress"}: {Math.round(progressPercent)}%</span>
          {isCompleted && (
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t.watchedBadge || "Watched"}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export const FirstPeriodEducationPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Definition of 5 Educational Videos
  const videosList = [
    {
      id: 1,
      title: t.eduVideo1Title || "What is Menstruation?",
      desc: t.eduVideo1Desc || "Learn what a period is, why it happens, and how it is a completely natural monthly process for every woman.",
      src: "/videos/video1.mp4",
      icon: HeartPulse,
      duration: "1:30",
    },
    {
      id: 2,
      title: t.eduVideo2Title || "Why Do Periods Start?",
      desc: t.eduVideo2Desc || "Understand puberty, hormones, and bodily changes in growing young women in simple, reassuring terms.",
      src: "/videos/video2.mp4",
      icon: Sparkles,
      duration: "1:45",
    },
    {
      id: 3,
      title: t.eduVideo3Title || "What to Expect During Your First Period",
      desc: t.eduVideo3Desc || "Spotting, mild cramps, mood shifts, and reassuring guidance that you are completely safe and healthy.",
      src: "/videos/video3.mp4",
      icon: HelpCircle,
      duration: "2:10",
    },
    {
      id: 4,
      title: t.eduVideo4Title || "Basic Menstrual Hygiene & Pad Usage",
      desc: t.eduVideo4Desc || "How to use sanitary pads, changing frequency (every 4-6 hours), proper handwashing, and hygienic disposal.",
      src: "/videos/video4.mp4",
      icon: ShieldCheck,
      duration: "2:30",
    },
    {
      id: 5,
      title: t.eduVideo5Title || "Common Symptoms & When to Consult an Adult",
      desc: t.eduVideo5Desc || "Recognizing normal period symptoms vs. when to talk to your mother, teacher, ASHA worker, or doctor.",
      src: "/videos/video5.mp4",
      icon: UserCheck,
      duration: "2:00",
    },
  ];

  // Track currently playing video ID across all 5 cards
  const [activePlayingId, setActivePlayingId] = useState(null);

  const handlePlayStart = (id) => {
    setActivePlayingId(id);
  };

  // Free Text & Voice Input state
  const [userText, setUserText] = useState('');
  const [capturedVoiceNotice, setCapturedVoiceNotice] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [screeningResult, setScreeningResult] = useState(null);
  const [inputError, setInputError] = useState('');

  // Web Speech API hook
  const {
    isListening,
    transcript,
    error: voiceError,
    isSupported: isVoiceSupported,
    startListening,
    stopListening,
  } = useVoiceInput((speechText) => {
    if (speechText) {
      setUserText(speechText);
      setCapturedVoiceNotice(true);
      setTimeout(() => setCapturedVoiceNotice(false), 4000);
    }
  });

  const handleToggleVoice = () => {
    setInputError('');
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Analyze Concern
  const handleAnalyze = () => {
    if (!userText.trim()) {
      setInputError(
        language === 'mr'
          ? "कृपया तुमची लक्षणे किंवा चिंता टाइप करा किंवा बोलून नोंदवा."
          : language === 'hi'
          ? "कृपया अपने लक्षण या चिंता टाइप करें या बोलकर दर्ज करें।"
          : "Please type or speak your period symptoms or concerns before analyzing."
      );
      return;
    }

    setInputError('');
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = analyzeMenstrualSymptoms({
        voiceText: userText,
        freeText: userText,
        age: 13,
        regularity: 'Yes',
        bleedingDuration: '4–5 days',
        bleedingIntensity: 'Normal',
        painLevel: userText.toLowerCase().includes('pain') || userText.includes('दुख') || userText.includes('दर्द') ? 6 : 3,
        symptoms: ['Abdominal cramps'],
      });

      storageService.saveLastScreening(result);
      setScreeningResult(result);
      setIsAnalyzing(false);

      // Scroll smoothly down to result
      const resultElement = document.getElementById('analysis-result-section');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/menstrual"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-sky-100 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToMenstrual || "Back to Menstrual Health"}
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 px-3 py-1 rounded-full">
            {t.eduPageModuleBadge || "Educational Video Module"}
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <PlayCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            {t.eduCardTitle || "My First Period – Menstrual Education"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            {t.eduCardDesc || "Learn about menstruation, what to expect during your first period, and basic menstrual hygiene."}
          </p>
        </div>

        {/* SECTION 1: 5 EDUCATIONAL VIDEO CARDS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-600" />
                {t.videoSectionHeading || "5 Educational Video Modules"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {t.videoSectionDesc || "Watch these 5 simple guides to understand your period, hygiene, and self-care."}
              </p>
            </div>
            <span className="text-xs font-bold bg-sky-100 text-sky-800 px-3 py-1 rounded-full border border-sky-200">
              5 Videos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosList.map((video) => (
              <EducationalVideoCard
                key={video.id}
                video={video}
                t={t}
                activePlayingId={activePlayingId}
                onPlayStart={handlePlayStart}
              />
            ))}
          </div>
        </div>

        {/* SECTION 2: AFTER THE 5 VIDEOS — FREE TEXT & VOICE INPUT ONLY */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-xl space-y-6">

          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-900 px-3 py-1 rounded-full border border-sky-200 mb-2 inline-block">
              {t.expressSymptomsBadge || "Express Your Symptoms & Questions"}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.freeTextHeading || "Describe What You Are Experiencing"}
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed mt-1">
              {t.freeTextHelper || "Tell us in your own words about your period, symptoms, pain, bleeding, or anything that concerns you."}
            </p>
          </div>

          {/* Large Text Box Area */}
          <div className="space-y-3">
            <div className="relative">
              <textarea
                rows={5}
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder={t.freeTextPlaceholder || "Example: My period started for the first time yesterday and I have stomach pain..."}
                className="w-full p-4 rounded-2xl border-2 border-sky-200 focus:border-sky-600 focus:ring-4 focus:ring-sky-100 text-slate-900 text-sm font-medium leading-relaxed placeholder:text-slate-400 outline-none transition-all shadow-inner bg-slate-50/50"
              />

              {/* Speech Microphone Button */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                    isListening
                      ? 'bg-sky-600 text-white animate-pulse ring-4 ring-sky-200'
                      : capturedVoiceNotice
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-sky-700 border border-sky-300 hover:bg-sky-50'
                  }`}
                  title={isListening ? (t.voiceListening || "Listening...") : (t.voiceMicClick || "Speak using microphone")}
                >
                  <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-white' : 'text-sky-600'}`} />
                  <span>
                    {isListening
                      ? (t.voiceListening || "Listening...")
                      : capturedVoiceNotice
                      ? (t.voiceCaptured || "Voice Captured!")
                      : (t.voiceMicClick || "Press Mic to Speak")}
                  </span>
                </button>
              </div>
            </div>

            {/* Voice Status & Fallback text */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-medium px-1">
              <span className="flex items-center gap-1.5 text-sky-800 font-semibold">
                <Sparkle className="w-3.5 h-3.5 text-sky-600" />
                Language Speech Recognition: {language === 'mr' ? 'mr-IN (मराठी)' : language === 'hi' ? 'hi-IN (हिंदी)' : 'en-IN (English)'}
              </span>

              {!isVoiceSupported && (
                <span className="text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {t.voiceFallback || "If voice input is unavailable, type your answer above."}
                </span>
              )}
            </div>

            {inputError && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 text-center">
                {inputError}
              </div>
            )}
          </div>

          {/* Action Button: Analyze My Concern */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-base shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.analyzingText || "Analyzing Your Input with AI..."}</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 text-white" />
                  <span>{t.analyzeConcernBtn || "Analyze My Concern"}</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* SECTION 3: INLINE AI SCREENING RESULT PRESENTATION */}
        {screeningResult && (
          <div id="analysis-result-section" className="space-y-4 pt-4">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 border border-sky-200 px-3 py-1 rounded-full">
                {t.aiTriageOutputBadge || "AI Screening Triage Output"}
              </span>
            </div>
            
            <ResultCard result={screeningResult} />

            <div className="text-center">
              <Link
                to="/result"
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-900 bg-white border border-sky-200 px-5 py-2.5 rounded-xl shadow-2xs hover:bg-sky-50 transition-all"
              >
                <span>{t.viewPrintableReport || "View Complete Assessment Report"}</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
