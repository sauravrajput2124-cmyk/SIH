import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceInputButton } from './VoiceInputButton';
import { Check, Mic } from 'lucide-react';

export const QuestionCard = ({ question, value, onChange }) => {
  const { t } = useLanguage();

  const title = t[question.titleKey] || question.titleKey;

  const handleVoiceResult = (text) => {
    if (question.type === 'multiselect') {
      const lower = text.toLowerCase();
      const current = Array.isArray(value) ? value : [];
      let updated = [...current];

      if ((lower.includes('रक्तस्राव') || lower.includes('bleeding')) && !updated.includes('Heavy bleeding')) {
        updated.push('Abdominal cramps');
      }
      if ((lower.includes('दुखणे') || lower.includes('दर्द') || lower.includes('pain')) && !updated.includes('Abdominal cramps')) {
        updated.push('Abdominal cramps');
        updated.push('Back pain');
      }
      onChange(updated.length > 0 ? updated : ['Abdominal cramps']);
    } else {
      onChange(text);
    }
  };

  const renderInput = () => {
    switch (question.type) {
      case 'number':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 max-w-xs">
              <input
                type="number"
                min={question.min}
                max={question.max}
                value={value || question.defaultValue || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 text-lg font-bold bg-white border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-inner text-slate-900"
              />
              <span className="text-slate-500 font-semibold">years / days</span>
            </div>
          </div>
        );

      case 'date':
        return (
          <div className="max-w-xs">
            <input
              type="date"
              value={value || question.defaultValue || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-4 py-3 text-base font-semibold bg-white border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-2xs text-slate-900"
            />
          </div>
        );

      case 'radio':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((opt) => {
              const optionLabel = t[opt.labelKey] || opt.value;
              const isSelected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange(opt.value)}
                  className={`p-4 rounded-2xl border text-left font-semibold transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
                >
                  <span className="text-sm">{optionLabel}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-white bg-white text-sky-600'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'slider':
        const currentPain = Number(value || question.defaultValue || 1);
        return (
          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-2xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600">Pain Intensity:</span>
              <span
                className={`text-lg font-extrabold px-4 py-1 rounded-full ${
                  currentPain >= 8
                    ? 'bg-rose-100 text-rose-800 ring-2 ring-rose-300'
                    : currentPain >= 5
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {currentPain} / 10
              </span>
            </div>

            <input
              type="range"
              min={question.min}
              max={question.max}
              value={currentPain}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />

            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>{t[question.labelsKeyMin]}</span>
              <span>{t[question.labelsKeyMax]}</span>
            </div>
          </div>
        );

      case 'multiselect':
        const selectedList = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt) => {
                const optionLabel = t[opt.labelKey] || opt.value;
                const isSelected = selectedList.includes(opt.value);

                const handleToggle = () => {
                  let updated;
                  if (opt.value === 'None') {
                    updated = ['None'];
                  } else {
                    const filtered = selectedList.filter((v) => v !== 'None');
                    if (isSelected) {
                      updated = filtered.filter((v) => v !== opt.value);
                    } else {
                      updated = [...filtered, opt.value];
                    }
                  }
                  onChange(updated);
                };

                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={handleToggle}
                    className={`p-3.5 rounded-2xl border text-left font-semibold transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                    }`}
                  >
                    <span className="text-sm font-semibold">{optionLabel}</span>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isSelected
                          ? 'bg-white text-sky-600 border-white'
                          : 'bg-slate-50 border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Microphone Voice Input for Symptoms */}
            <div className="pt-3 border-t border-sky-100">
              <span className="text-xs font-bold text-sky-900 block mb-1">
                Prefer speaking? Use Voice Input:
              </span>
              <VoiceInputButton onSpeechResult={handleVoiceResult} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
        {title}
      </h2>
      {renderInput()}
    </div>
  );
};
