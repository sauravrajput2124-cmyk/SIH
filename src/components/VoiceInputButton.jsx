import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { Mic, MicOff, CheckCircle2, AlertCircle } from 'lucide-react';

export const VoiceInputButton = ({ onSpeechResult }) => {
  const { t } = useLanguage();
  const [captured, setCaptured] = useState(false);

  const {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
  } = useVoiceInput((text) => {
    if (onSpeechResult) {
      onSpeechResult(text);
      setCaptured(true);
      setTimeout(() => setCaptured(false), 3000);
    }
  });

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleListen}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
            isListening
              ? 'bg-sky-600 text-white animate-mic-listening ring-4 ring-sky-200'
              : captured
              ? 'bg-emerald-600 text-white'
              : 'bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 hover:border-sky-300'
          }`}
          title={isListening ? t.voiceListening : t.voiceMicClick}
        >
          {isListening ? (
            <>
              <Mic className="w-4 h-4 text-white animate-pulse" />
              <span>{t.voiceListening}</span>
            </>
          ) : captured ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{t.voiceCaptured}</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-sky-600" />
              <span>{t.voiceMicClick}</span>
            </>
          )}
        </button>

        {isListening && (
          <span className="text-xs font-mono font-medium text-sky-600 animate-pulse">
            ● Recording audio ({t.voiceListening})
          </span>
        )}
      </div>

      {!isSupported && (
        <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          {t.voiceFallback}
        </p>
      )}

      {transcript && (
        <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-100 text-xs font-medium text-sky-900">
          <span className="font-bold text-sky-700">Captured Voice: </span>
          "{transcript}"
        </div>
      )}
    </div>
  );
};
