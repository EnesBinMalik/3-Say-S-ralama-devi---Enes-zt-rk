import React, { useState } from 'react';
import { SortingResult } from '../types';
import { X, Printer, Copy, CheckCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';
import { generateCode } from '../utils/sortingLogic';

interface HomeworkReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: SortingResult;
}

export const HomeworkReportModal: React.FC<HomeworkReportModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const fullReportText = `=====================================================
          ÖDEV TESLİM RAPORU / RAPOR FORMU
=====================================================
DERS: Algoritma ve Programlama
ÖDEV KONUSU: Girilen 3 Sayıyı Küçükten Büyüğe Sıralama
ÖĞRENCİ: Enes Öztürk
TARİH: ${currentDate}
DURUM: Tamamlandı / Başarılı

1. PROBLEM TANIMI:
Kullanıcıdan alınan herhangi üç reel sayının (A, B, C)
mantıksal karşılaştırmalar kullanılarak küçükten büyüğe
(A <= B <= C) sıralanması.

2. GİRİLEN TEST DEĞERLERİ:
- 1. Sayı (A): ${result.original[0]}
- 2. Sayı (B): ${result.original[1]}
- 3. Sayı (C): ${result.original[2]}

3. SIRALAMA SONUCU:
- Küçükten Büyüğe: ${result.relationString}
- 1. Sayı (En Küçük): ${result.sorted[0]}
- 2. Sayı (Ortanca) : ${result.sorted[1]}
- 3. Sayı (En Büyük): ${result.sorted[2]}

4. İSTATİSTİKSEL VERİLER:
- Minimum: ${result.min}
- Medyan (Ortanca): ${result.median}
- Maksimum: ${result.max}
- Toplam: ${result.sum}
- Aritmetik Ortalama: ${result.average}
- Değer Açıklığı (Max - Min): ${result.range}

5. ALGORİTMA ADIMLARI (TRACE):
${result.steps.map(s => `[Adım ${s.stepNumber}] ${s.title}: ${s.condition} -> ${s.result ? 'DOĞRU (Yer değiştirildi)' : 'YANLIŞ (Sıra korundu)'}`).join('\n')}

6. ÖRNEK KAYNAK KOD (C DİLİ):
${generateCode('c', result.original[0], result.original[1], result.original[2])}

=====================================================
HAZIRLAYAN: Enes Öztürk
İMZA: [Enes Öztürk - Dijital Olarak Doğrulandı]
=====================================================`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullReportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Ödev Teslim Raporu</h3>
              <p className="text-xs text-slate-400">Öğretmen teslimi için hazır resmi rapor formatı</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
              title="Metin olarak kopyala"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition"
              title="Yazdır veya PDF olarak kaydet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Paper Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-200 text-sm font-sans bg-slate-900">
          {/* Institutional Header */}
          <div className="text-center border-b border-slate-800 pb-5">
            <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-1">
              Algoritma ve Programlama Dersi
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              GİRİLEN 3 SAYIYI KÜÇÜKTEN BÜYÜĞE SIRALAMA ÖDEVİ
            </h2>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Hazırlayan: <strong className="text-white">Enes Öztürk</strong></span>
              <span className="text-slate-500">•</span>
              <span>Tarih: {currentDate}</span>
            </div>
          </div>

          {/* Section 1: Problem */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              1. Ödev Konusu ve Amacı
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Kullanıcı tarafından klavyeden girilen 3 sayının bilgisayar belleğinde geçici değişken (temp / swap)
              mantığı ve mantıksal koşul yapıları (if-else) kullanılarak en küçükten en büyüğe doğru sıralanmasıdır.
            </p>
          </div>

          {/* Section 2: Input & Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                2. Girilen Değerler
              </h4>
              <ul className="space-y-1.5 text-xs font-mono">
                <li className="flex justify-between">
                  <span className="text-slate-400">1. Sayı (A):</span>
                  <span className="text-white font-bold">{result.original[0]}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">2. Sayı (B):</span>
                  <span className="text-white font-bold">{result.original[1]}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">3. Sayı (C):</span>
                  <span className="text-white font-bold">{result.original[2]}</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                3. Sıralama Çıktısı
              </h4>
              <div className="text-lg font-bold font-mono text-emerald-300 mb-2">
                {result.relationString}
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>En Küçük: <strong className="text-white">{result.min}</strong></div>
                <div>Ortanca: <strong className="text-white">{result.median}</strong></div>
                <div>En Büyük: <strong className="text-white">{result.max}</strong></div>
              </div>
            </div>
          </div>

          {/* Section 3: Trace Steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              4. Algoritma Karşılaştırma Adımları
            </h4>
            <div className="space-y-2">
              {result.steps.map((st) => (
                <div key={st.stepNumber} className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-semibold text-white mb-1">
                    <span>Adım {st.stepNumber}: {st.title}</span>
                    <span className={st.result ? 'text-amber-400' : 'text-emerald-400'}>
                      {st.result ? 'Koşul Sağlandı (Swap Yapıldı)' : 'Koşul Sağlanmadı (Aynen Kaldı)'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{st.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Signature Box */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Öğrenci Adı Soyadı:</div>
              <div className="text-base font-bold text-white tracking-wide">Enes Öztürk</div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ödev Doğrulandı ve İmzalandı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
