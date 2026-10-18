import React, { useState } from 'react';
import { SortStep } from '../types';
import { GitCommit, ArrowRight, Check, X, Cpu, Lightbulb, Play, RotateCcw } from 'lucide-react';

interface StepByStepExplanationProps {
  steps: SortStep[];
  original: [number, number, number];
}

export const StepByStepExplanation: React.FC<StepByStepExplanationProps> = ({ steps, original }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 text-xs font-mono font-bold">
              3
            </span>
            Algoritma Adımları & Mantıksal Karşılaştırma Ağacı
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Bilgisayarın CPU ve belleğinde 3 sayıyı sıralamak için yaptığı ardışık 3 karşılaştırma:
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Cpu className="w-3.5 h-3.5" />
          <span>Karmaşıklık: O(1) [3 Karşılaştırma]</span>
        </div>
      </div>

      {/* Decision tree note */}
      <div className="my-5 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-indigo-200">Algoritmik Teori Notu (Ödev İncelemesi):</strong> 3 sayının olası tüm sıralanma durumları{' '}
          <span className="font-mono text-amber-300">3! = 6</span> adettir. Karar ağacı teoremine göre{' '}
          <span className="font-mono text-amber-300">⌈log₂(6)⌉ = 3</span> karşılaştırma en kötü durumda (worst-case) kesin sıralama için teorik olarak minimum ve en uygun adımdır.
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isSelected = activeStep === idx;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(isSelected ? null : idx)}
              className={`rounded-xl border p-4 transition-all cursor-pointer ${
                isSelected
                  ? 'border-indigo-500 bg-slate-950 ring-1 ring-indigo-500/50'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono font-bold ${
                      step.result
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    #{step.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>{step.title}</span>
                    </h3>
                    <div className="text-xs font-mono text-indigo-300 mt-0.5">
                      Koşul: <span className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300">{step.condition}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      step.result
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {step.result ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>DOĞRU (Swap Yapıldı)</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3" />
                        <span>YANLIŞ (Sıra Korundu)</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Step Explanation & Snapshot */}
              <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-300">
                <p>{step.explanation}</p>

                <div className="mt-2.5 flex items-center gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-slate-400 font-mono text-[11px]">
                  <span className="text-slate-500">Bu adım sonrası bellek:</span>
                  <div className="flex items-center gap-1.5 text-white font-bold">
                    <span>[{step.stateSnapshot.join(', ')}]</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
