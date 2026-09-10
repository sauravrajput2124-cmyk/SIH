import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { CalendarDays, Plus, Save, History, Flame, Droplets, ChartNoAxesCombined, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PeriodTrackingPage = () => {
  const { t } = useLanguage();
  const [logs, setLogs] = useState(() => storageService.getPeriodLogs());

  // Form State
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-06');
  const [cycleLength, setCycleLength] = useState('30');
  const [bleedingLevel, setBleedingLevel] = useState('Normal');
  const [painLevel, setPainLevel] = useState(4);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePeriod = (e) => {
    e.preventDefault();
    const newLog = {
      startDate,
      endDate,
      cycleLength: Number(cycleLength) || 28,
      bleedingLevel,
      painLevel: Number(painLevel),
      symptoms: ['Abdominal cramps'],
    };

    const updated = storageService.addPeriodLog(newLog);
    setLogs(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CalendarDays className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.trackingTitle}
          </h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            {t.trackingDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Column */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-sky-100 shadow-xl space-y-5">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
              <Plus className="w-5 h-5 text-sky-600" />
              {t.logPeriodBtn}
            </h3>

            {savedSuccess && (
              <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-200 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Period Log Saved Successfully!
              </div>
            )}

            <form onSubmit={handleSavePeriod} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.periodStartDate}</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.periodEndDate}</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.cycleLengthDays}</label>
                <input
                  type="number"
                  min="15"
                  max="60"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.bleeding}</label>
                <select
                  value={bleedingLevel}
                  onChange={(e) => setBleedingLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:bg-white focus:outline-none"
                >
                  <option value="Light">Light</option>
                  <option value="Normal">Normal</option>
                  <option value="Heavy">Heavy</option>
                  <option value="Very Heavy">Very Heavy</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>{t.painScore}</span>
                  <span className="text-sky-600 font-extrabold">{painLevel}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Save className="w-4 h-4" />
                {t.savePeriod}
              </button>
            </form>
          </div>

          {/* History Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <History className="w-5 h-5 text-sky-600" />
                {t.cycleHistoryTitle} ({logs.length})
              </h3>

              <Link
                to="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200"
              >
                <ChartNoAxesCombined className="w-3.5 h-3.5 text-sky-600" />
                View Analytics
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {logs.map((log, idx) => (
                <div
                  key={log.id || idx}
                  className="bg-white p-5 rounded-2xl border border-sky-100 shadow-md hover:shadow-lg transition-all space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
                      Cycle {logs.length - idx}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {log.startDate}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Length</span>
                      <span className="font-bold text-slate-900 text-sm">{log.cycleLength} days</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Pain Level</span>
                      <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-rose-500" />
                        {log.painLevel}/10
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 font-semibold">
                    <span className="text-slate-500">Bleeding:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      log.bleedingLevel === 'Very Heavy' ? 'bg-rose-100 text-rose-800' :
                      log.bleedingLevel === 'Heavy' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {log.bleedingLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
