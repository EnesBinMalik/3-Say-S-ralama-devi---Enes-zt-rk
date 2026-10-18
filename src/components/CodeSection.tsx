import React, { useState } from 'react';
import { ProgrammingLanguage } from '../types';
import { generateCode } from '../utils/sortingLogic';
import { Code2, Copy, Check, Terminal, FileCode, CheckCheck } from 'lucide-react';

interface CodeSectionProps {
  val1: number;
  val2: number;
  val3: number;
}

export const CodeSection: React.FC<CodeSectionProps> = ({ val1, val2, val3 }) => {
  const [activeLang, setActiveLang] = useState<ProgrammingLanguage>('c');
  const [copied, setCopied] = useState(false);

  const languages: { id: ProgrammingLanguage; name: string; icon: string; ext: string }[] = [
    { id: 'c', name: 'C Dili (Standart)', icon: '🇨', ext: '.c' },
    { id: 'python', name: 'Python 3', icon: '🐍', ext: '.py' },
    { id: 'cpp', name: 'C++', icon: '⚡', ext: '.cpp' },
    { id: 'java', name: 'Java', icon: '☕', ext: '.java' },
    { id: 'csharp', name: 'C# (.NET)', icon: '🔷', ext: '.cs' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨', ext: '.js' },
    { id: 'pseudocode', name: 'Sözde Kod / Algoritma', icon: '📝', ext: '.txt' },
  ];

  const currentCode = generateCode(activeLang, val1, val2, val3);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
              4
            </span>
            Ödev Kaynak Kodları (Farklı Dillerde)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Öğretmeninize teslim edebileceğiniz, <strong className="text-indigo-300">Enes Öztürk</strong> imzalı tam çalışan kaynak kodlar:
          </p>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {copied ? (
            <>
              <CheckCheck className="w-4 h-4 text-emerald-300" />
              <span>Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Kodu Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Language Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-slate-800/60">
        {languages.map((lang) => {
          const isActive = activeLang === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600/30 border border-indigo-500 text-indigo-300 shadow'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{lang.icon}</span>
              <span>{lang.name}</span>
            </button>
          );
        })}
      </div>

      {/* Code Editor Preview Window */}
      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 ml-2 flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              uc_sayi_sirala{languages.find((l) => l.id === activeLang)?.ext}
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Hazırlayan: <span className="text-slate-300 font-semibold">Enes Öztürk</span>
          </div>
        </div>

        {/* Code Block */}
        <div className="p-4 overflow-x-auto max-h-[380px]">
          <pre className="font-mono text-xs text-slate-200 leading-relaxed">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
