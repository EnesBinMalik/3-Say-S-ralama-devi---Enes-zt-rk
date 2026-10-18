import React from 'react';
import { SortingResult } from '../types';
import { ArrowDownAZ, CheckCircle, Equal, BarChart3, TrendingUp, Info } from 'lucide-react';

interface SortingVisualizerProps {
  result: SortingResult;
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ result }) => {
  const { sortedWithLabels, original, sorted, relationString, min, median, max, sum, average, range, allEqual, hasDuplicates } = result;

  // Calculate relative heights for bar visualization
  const absValues = sorted.map(v => Math.abs(v));
  const maxAbs = Math.max(...absValues, 1);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
              2
            </span>
            Sıralama Sonucu (Küçükten Büyüğe)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Girilen sayılar başarıyla sıralandı. En küçükten en büyüğe hiyerarşik görünüm:
          </p>
        </div>

        {/* Status Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Sıralama Tamamlandı</span>
        </div>
      </div>

      {/* Main Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {sortedWithLabels.map((item, index) => {
          const isMin = index === 0;
          const isMid = index === 1;
          const isMax = index === 2;

          const cardTheme = isMin
            ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-900/90 text-emerald-300'
            : isMid
            ? 'border-sky-500/40 bg-gradient-to-b from-sky-950/30 to-slate-900/90 text-sky-300'
            : 'border-indigo-500/40 bg-gradient-to-b from-indigo-950/30 to-slate-900/90 text-indigo-300';

          const badgeBg = isMin
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            : isMid
            ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
            : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] shadow-lg ${cardTheme}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${badgeBg}`}>
                  {item.label}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Girdi: {item.originalLabel}
                </span>
              </div>

              <div className="my-2">
                <span className="text-3xl md:text-4xl font-extrabold text-white font-mono tracking-tight">
                  {item.value}
                </span>
              </div>

              <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 pt-2 border-t border-slate-800/60">
                {isMin && <span>Dizinin minimum değeri</span>}
                {isMid && <span>Dizinin ortanca (medyan) değeri</span>}
                {isMax && <span>Dizinin maksimum değeri</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inequality Banner */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ArrowDownAZ className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Matematiksel Sıralama Bağıntısı
            </div>
            <div className="text-lg md:text-xl font-bold font-mono text-indigo-300 tracking-wide mt-0.5">
              {relationString}
            </div>
          </div>
        </div>

        {/* Note on equality if any */}
        {(hasDuplicates || allEqual) && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>
              {allEqual
                ? 'Tüm sayılar birbirine eşittir (A = B = C).'
                : 'Eşit sayılar tespit edildi (≤ durumu geçerli).'}
            </span>
          </div>
        )}
      </div>

      {/* Graphical Bar Comparison */}
      <div className="mt-6 pt-5 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <span>Görsel Büyüklük Temsili (Sıralı Görünüm)</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Orijinal Giriş: [{original.join(', ')}]
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 items-end bg-slate-950/50 p-6 rounded-xl border border-slate-800/60 min-h-[170px]">
          {sorted.map((val, idx) => {
            const ratio = maxAbs > 0 ? Math.max((Math.abs(val) / maxAbs) * 100, 15) : 30;
            const colors = [
              'from-emerald-500 to-emerald-700 border-emerald-400/50',
              'from-sky-500 to-sky-700 border-sky-400/50',
              'from-indigo-500 to-indigo-700 border-indigo-400/50',
            ];

            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded shadow">
                  {val}
                </span>
                <div
                  style={{ height: `${ratio}%` }}
                  className={`w-full max-w-[80px] rounded-t-lg bg-gradient-to-t ${colors[idx]} border-t border-x shadow-lg transition-all duration-500 relative group`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium text-center">
                  {idx === 0 ? '1. Sayı (En Küçük)' : idx === 1 ? '2. Sayı (Ortanca)' : '3. Sayı (En Büyük)'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Minimum</div>
          <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">{min}</div>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Ortanca (Medyan)</div>
          <div className="text-base font-bold font-mono text-sky-400 mt-0.5">{median}</div>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Maksimum</div>
          <div className="text-base font-bold font-mono text-indigo-400 mt-0.5">{max}</div>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Toplam</div>
          <div className="text-base font-bold font-mono text-slate-200 mt-0.5">{sum}</div>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Aritmetik Ort.</div>
          <div className="text-base font-bold font-mono text-slate-200 mt-0.5">{average}</div>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Açıklık (Max-Min)</div>
          <div className="text-base font-bold font-mono text-slate-200 mt-0.5">{range}</div>
        </div>
      </div>
    </div>
  );
};
