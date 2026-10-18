import React from 'react';
import { Award, BookOpen, User, CheckCircle2, FileText, Printer } from 'lucide-react';

interface HomeworkHeaderProps {
  onOpenReport: () => void;
  onPrint: () => void;
}

export const HomeworkHeader: React.FC<HomeworkHeaderProps> = ({ onOpenReport, onPrint }) => {
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 p-6 md:p-8 shadow-2xl backdrop-blur-md">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Algoritma ve Programlama Dersi Ödevi</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Girilen 3 Sayıyı <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Küçükten Büyüğe Sıralama</span>
          </h1>

          <p className="mt-2 text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
            Kullanıcı tarafından girilen 3 sayının matematiksel ve mantıksal karşılaştırma algoritmalarıyla
            adım adım küçükten büyüğe (<span className="font-mono text-indigo-300 font-semibold">A ≤ B ≤ C</span>) sıralanması ve analizi.
          </p>
        </div>

        {/* Student signature card */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <div className="flex items-center gap-4 bg-slate-950/70 border border-indigo-500/30 rounded-xl p-4 shadow-inner ring-1 ring-white/5">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
              <User className="w-6 h-6" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Ödevi Hazırlayan
              </div>
              <div className="text-lg font-bold text-white tracking-wide">
                Enes Öztürk
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {currentDate} • Onaylı Ödev Teslimi
              </div>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Ödev Raporu Görüntüle"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Ödev Raporu</span>
            </button>
            <button
              onClick={onPrint}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-xs font-semibold text-indigo-300 border border-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Yazdır veya PDF Kaydet"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>Yazdır / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
