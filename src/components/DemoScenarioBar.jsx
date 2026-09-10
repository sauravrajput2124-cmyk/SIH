import React from 'react';
import { demoScenarios } from '../data/demoScenarios';
import { useLanguage } from '../context/LanguageContext';
import { Brain, Play, CheckCircle2 } from 'lucide-react';

export const DemoScenarioBar = ({ onSelectScenario, currentScenarioId }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#EAF6FF] text-slate-900 p-4 sm:p-5 rounded-3xl shadow-md border border-[#C7E6F7] mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-200/80 flex items-center justify-center text-sky-700">
            <Brain className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-sky-950 flex items-center gap-2">
              {t.demoScenariosHeader}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Quickly auto-fill questionnaire data to demonstrate AI triage categories.
            </p>
          </div>
        </div>

        <span className="text-[11px] bg-sky-100 px-3 py-1 rounded-full text-sky-800 font-mono border border-sky-200 self-start md:self-auto font-bold">
          PRESET SCENARIOS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {demoScenarios.map((sc) => {
          const isSelected = currentScenarioId === sc.id;
          const label = t[sc.titleKey] || sc.titleKey;

          return (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc)}
              className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-white border-2 border-[#2D9CDB] shadow-md shadow-sky-200/50'
                  : 'bg-[#F3FAFF] border border-[#CFE8F7] hover:bg-white hover:border-[#2D9CDB]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${sc.badgeColor}`}>
                  {sc.badge}
                </span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
              </div>

              <div className="font-bold text-xs text-sky-950 mb-1">
                {label}
              </div>

              <div className="text-[11px] text-slate-600 leading-tight font-medium line-clamp-2">
                {sc.description}
              </div>

              <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-[#2D9CDB] hover:text-sky-700">
                <Play className="w-3 h-3 fill-[#2D9CDB]" />
                {t.loadScenarioBtn}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
