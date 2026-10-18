/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { HomeworkHeader } from './components/HomeworkHeader';
import { NumberInputSection } from './components/NumberInputSection';
import { SortingVisualizer } from './components/SortingVisualizer';
import { StepByStepExplanation } from './components/StepByStepExplanation';
import { CodeSection } from './components/CodeSection';
import { HomeworkReportModal } from './components/HomeworkReportModal';
import { solveSorting } from './utils/sortingLogic';
import { User, Award, CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [val1, setVal1] = useState<string>('45');
  const [val2, setVal2] = useState<string>('12');
  const [val3, setVal3] = useState<string>('78');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Parse numerical values safely with fallback
  const num1 = useMemo(() => {
    const parsed = parseFloat(val1);
    return isNaN(parsed) ? 0 : parsed;
  }, [val1]);

  const num2 = useMemo(() => {
    const parsed = parseFloat(val2);
    return isNaN(parsed) ? 0 : parsed;
  }, [val2]);

  const num3 = useMemo(() => {
    const parsed = parseFloat(val3);
    return isNaN(parsed) ? 0 : parsed;
  }, [val3]);

  // Compute sorting results dynamically
  const sortingResult = useMemo(() => {
    return solveSorting(num1, num2, num3);
  }, [num1, num2, num3]);

  const handleReset = () => {
    setVal1('');
    setVal2('');
    setVal3('');
  };

  const handleRandom = () => {
    const r1 = Math.floor(Math.random() * 199) - 99;
    const r2 = Math.floor(Math.random() * 199) - 99;
    const r3 = Math.floor(Math.random() * 199) - 99;
    setVal1(String(r1));
    setVal2(String(r2));
    setVal3(String(r3));
  };

  const handleSelectPreset = (v1: number, v2: number, v3: number) => {
    setVal1(String(v1));
    setVal2(String(v2));
    setVal3(String(v3));
  };

  const handlePrint = () => {
    setIsReportOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-indigo-950/60 border-b border-indigo-900/50 py-2 px-4 text-center text-xs text-indigo-300 font-medium">
        🎓 <strong className="text-white">Algoritma ve Programlama Dersi</strong> — Ödev: 3 Sayıyı Küçükten Büyüğe Sıralama Programı • <span className="underline decoration-indigo-400">Hazırlayan: Enes Öztürk</span>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Homework Header with Enes Öztürk Signature */}
        <HomeworkHeader
          onOpenReport={() => setIsReportOpen(true)}
          onPrint={handlePrint}
        />

        {/* 1. Input Section */}
        <NumberInputSection
          val1={val1}
          val2={val2}
          val3={val3}
          onChange1={setVal1}
          onChange2={setVal2}
          onChange3={setVal3}
          onReset={handleReset}
          onRandom={handleRandom}
          onSelectPreset={handleSelectPreset}
        />

        {/* 2. Visualizer & Result */}
        <SortingVisualizer result={sortingResult} />

        {/* 3. Step-by-Step Logic Trace */}
        <StepByStepExplanation
          steps={sortingResult.steps}
          original={sortingResult.original}
        />

        {/* 4. Multi-language Code Examples */}
        <CodeSection val1={num1} val2={num2} val3={num3} />
      </main>

      {/* Homework Report Modal */}
      <HomeworkReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        result={sortingResult}
      />

      {/* Footer with Student Signature & Metadata */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 mt-12 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                3 Sayıyı Küçükten Büyüğe Sıralama Ödevi
              </p>
              <p className="text-[11px] text-slate-500">
                Bilgisayar Mühendisliği / Yazılım Geliştirme Temelleri
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl">
            <User className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400">Hazırlayan:</span>
            <span className="text-white font-bold tracking-wide">Enes Öztürk</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />
          </div>
        </div>
      </footer>
    </div>
  );
}
