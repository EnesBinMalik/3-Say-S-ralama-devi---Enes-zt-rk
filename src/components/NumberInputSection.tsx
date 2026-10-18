import React from 'react';
import { Sparkles, RotateCcw, Shuffle, ArrowRightLeft } from 'lucide-react';

interface NumberInputSectionProps {
  val1: string;
  val2: string;
  val3: string;
  onChange1: (val: string) => void;
  onChange2: (val: string) => void;
  onChange3: (val: string) => void;
  onReset: () => void;
  onRandom: () => void;
  onSelectPreset: (v1: number, v2: number, v3: number) => void;
}

export const NumberInputSection: React.FC<NumberInputSectionProps> = ({
  val1,
  val2,
  val3,
  onChange1,
  onChange2,
  onChange3,
  onReset,
  onRandom,
  onSelectPreset,
}) => {
  const presets = [
    { label: 'Rastgele Karışık', values: [42, 17, 89], desc: 'Standart pozitif' },
    { label: 'Negatif Sayılar', values: [-15, 0, -42], desc: 'Sıfır ve negatifler' },
    { label: 'İkisi Eşit', values: [25, 10, 25], desc: 'Eşitlik testi (A = C)' },
    { label: 'Tümü Eşit', values: [7, 7, 7], desc: 'A = B = C' },
    { label: 'Ters Sıralı', values: [100, 50, 10], desc: 'Büyükten küçüğe girilmiş' },
    { label: 'Ondalıklı Sayılar', values: [3.14, 2.71, 1.41], desc: 'Küsüratlı test' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
              1
            </span>
            Sayı Girişi (Ödev Girdileri)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sıralamak istediğiniz 3 sayıyı klavyeden girin veya hazır test senaryolarından seçin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRandom}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition"
            title="Rastgele 3 sayı ata"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Rastgele Üret</span>
          </button>
          <button
            onClick={onReset}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition"
            title="Girdileri temizle"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Number 1 */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>1. Sayı (A)</span>
            <span className="text-[10px] text-slate-500 font-mono">1. Değişken</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400 font-mono font-bold text-sm pointer-events-none">
              A =
            </div>
            <input
              type="number"
              step="any"
              value={val1}
              onChange={(e) => onChange1(e.target.value)}
              placeholder="Örn: 24"
              className="w-full bg-slate-950/80 border border-slate-700/80 group-focus-within:border-indigo-500 rounded-xl pl-12 pr-4 py-3.5 text-lg font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Number 2 */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>2. Sayı (B)</span>
            <span className="text-[10px] text-slate-500 font-mono">2. Değişken</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400 font-mono font-bold text-sm pointer-events-none">
              B =
            </div>
            <input
              type="number"
              step="any"
              value={val2}
              onChange={(e) => onChange2(e.target.value)}
              placeholder="Örn: 12"
              className="w-full bg-slate-950/80 border border-slate-700/80 group-focus-within:border-sky-500 rounded-xl pl-12 pr-4 py-3.5 text-lg font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Number 3 */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>3. Sayı (C)</span>
            <span className="text-[10px] text-slate-500 font-mono">3. Değişken</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400 font-mono font-bold text-sm pointer-events-none">
              C =
            </div>
            <input
              type="number"
              step="any"
              value={val3}
              onChange={(e) => onChange3(e.target.value)}
              placeholder="Örn: 58"
              className="w-full bg-slate-950/80 border border-slate-700/80 group-focus-within:border-emerald-500 rounded-xl pl-12 pr-4 py-3.5 text-lg font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hızlı Ödev Test Senaryoları:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelectPreset(p.values[0], p.values[1], p.values[2])}
              className="px-2.5 py-2 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition group"
            >
              <div className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
                {p.label}
              </div>
              <div className="text-[10px] font-mono text-indigo-400 truncate mt-0.5">
                [{p.values.join(', ')}]
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
