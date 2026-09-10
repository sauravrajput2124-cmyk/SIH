import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Flame, Droplets } from 'lucide-react';

export const InsightsCharts = ({ logs = [] }) => {
  const { t } = useLanguage();

  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-sky-100 p-6">
        <p className="text-slate-500 font-medium">{t.noDataYet || "No period logs recorded yet."}</p>
      </div>
    );
  }

  const timelineLogs = [...logs].reverse();

  return (
    <div className="space-y-6">
      
      {/* Chart 1: Cycle Length Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-2xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-900 text-base">{t.chartCycleTitle}</h4>
        </div>

        <div className="h-40 flex items-end justify-around gap-2 pt-6 px-2 border-b border-slate-200">
          {timelineLogs.map((log, index) => {
            const length = log.cycleLength || 28;
            const heightPercent = Math.min(100, Math.round((length / 45) * 100));

            return (
              <div key={log.id || index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-bold text-sky-600">{length} d</span>
                <div
                  className="w-full max-w-[40px] bg-gradient-to-t from-sky-600 to-blue-500 rounded-t-lg transition-all duration-500 shadow-2xs"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[11px] text-slate-500 font-semibold">
                  C{index + 1}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mt-2 px-1">
          <span>Normal Range: 21–35 Days</span>
          <span>Target Stability: ~28 Days</span>
        </div>
      </div>

      {/* Grid for Pain Score & Bleeding Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pain Level Indicator */}
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t.chartPainTitle}</h4>
          </div>

          <div className="space-y-3">
            {timelineLogs.map((log, index) => {
              const pain = log.painLevel || 1;
              const painPercent = (pain / 10) * 100;
              const painColor = pain >= 7 ? 'bg-rose-500' : pain >= 4 ? 'bg-amber-500' : 'bg-emerald-500';

              return (
                <div key={log.id || index} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Cycle {index + 1} ({log.startDate})</span>
                    <span className="font-bold text-slate-900">{pain}/10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${painColor}`}
                      style={{ width: `${painPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bleeding Severity Levels */}
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">{t.chartBleedingTitle}</h4>
          </div>

          <div className="space-y-3">
            {timelineLogs.map((log, index) => {
              const bLevel = log.bleedingLevel || 'Normal';
              const getBleedingBadge = () => {
                if (bLevel === 'Very Heavy') return 'bg-rose-100 text-rose-800 border-rose-300';
                if (bLevel === 'Heavy') return 'bg-amber-100 text-amber-800 border-amber-300';
                return 'bg-emerald-100 text-emerald-800 border-emerald-300';
              };

              return (
                <div key={log.id || index} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs font-semibold text-slate-700">
                    Cycle {index + 1} ({log.startDate})
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getBleedingBadge()}`}>
                    {bLevel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
