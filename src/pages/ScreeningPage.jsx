import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { screeningQuestions, conditionalQuestions } from '../data/screeningQuestions';
import { analyzeMenstrualSymptoms } from '../services/demoMLService';
import { storageService } from '../services/storageService';
import { DemoScenarioBar } from '../components/DemoScenarioBar';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { AIAnalysisAnimation } from '../components/AIAnalysisAnimation';
import { Brain, ArrowLeft, ArrowRight, Lock } from 'lucide-react';

export const ScreeningPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    age: 21,
    lastPeriodDate: '2026-08-20',
    regularity: 'Yes',
    bleedingDuration: '4–5 days',
    bleedingIntensity: 'Normal',
    painLevel: 4,
    symptoms: ['Abdominal cramps'],
    recurrence: 'No',
    voiceText: '',
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const getActiveQuestions = () => {
    const list = [...screeningQuestions];

    if (conditionalQuestions.heavyBleeding.trigger(answers)) {
      list.splice(5, 0, conditionalQuestions.heavyBleeding);
    }
    if (conditionalQuestions.severePain.trigger(answers)) {
      list.splice(7, 0, conditionalQuestions.severePain);
    }
    if (conditionalQuestions.irregularity.trigger(answers)) {
      list.splice(3, 0, conditionalQuestions.irregularity);
    }

    return list;
  };

  const activeQuestions = getActiveQuestions();
  const totalSteps = activeQuestions.length;
  const currentQuestion = activeQuestions[currentStepIndex] || activeQuestions[0];

  const handleAnswerChange = (val) => {
    setErrorMsg('');
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: val,
    }));
  };

  const handleNext = () => {
    const currentVal = answers[currentQuestion.key];
    if (currentVal === undefined || currentVal === null || currentVal === '' || (Array.isArray(currentVal) && currentVal.length === 0)) {
      setErrorMsg(t.selectOption || 'Please select an option to continue.');
      return;
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      startAnalysis();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    const result = analyzeMenstrualSymptoms(answers);
    storageService.saveLastScreening(result);
    navigate('/result');
  };

  const handleSelectScenario = (scenario) => {
    setSelectedScenarioId(scenario.id);
    setAnswers(scenario.answers);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Presentation Demo Scenario Bar */}
        <DemoScenarioBar
          onSelectScenario={handleSelectScenario}
          currentScenarioId={selectedScenarioId}
        />

        {/* Clean Page Header (Direct Heading, No Icon/Flower above) */}
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {t.screeningTitle}
          </h1>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            {t.screeningDesc}
          </p>
        </div>

        {isAnalyzing ? (
          <AIAnalysisAnimation onComplete={handleAnalysisComplete} />
        ) : (
          <div className="space-y-6">
            
            {/* Sky Blue Progress Bar */}
            <ProgressBar currentStep={currentStepIndex + 1} totalSteps={totalSteps} />

            {errorMsg && (
              <div className="bg-rose-50 text-rose-700 text-xs p-3 rounded-xl border border-rose-200 font-bold text-center">
                {errorMsg}
              </div>
            )}

            {/* Question Card */}
            <QuestionCard
              question={currentQuestion}
              value={answers[currentQuestion.key]}
              onChange={handleAnswerChange}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className={`px-5 py-3.5 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentStepIndex === 0
                    ? 'text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed'
                    : 'text-sky-950 bg-sky-50 border border-sky-200 hover:bg-sky-100 shadow-2xs'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                {t.previous}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-200 flex items-center gap-2 cursor-pointer transition-all border-none"
              >
                {currentStepIndex === totalSteps - 1 ? (
                  <>
                    <Brain className="w-4 h-4 text-white" />
                    {t.submit}
                  </>
                ) : (
                  <>
                    {t.next}
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </div>

            {/* Privacy Disclaimer */}
            <div className="p-3 bg-white rounded-xl border border-sky-100 text-center text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5 shadow-2xs">
              <Lock className="w-4 h-4 text-sky-600" />
              {t.privacyNotice}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
