import React, { useState } from 'react';
import type { Animal, QRTag } from '../types';
import { getBlankTags, getAnimals, generateNewBlankTag } from '../services/storage';
import { QRCodeSVG } from 'qrcode.react';
import { Tag, PlusCircle, Sparkles, UserCheck, Link2, Printer, Target, Download, CheckCircle2 } from 'lucide-react';


interface TaggingAgentDashboardProps {
  onOpenLinkTagModal: (tagId?: string) => void;
  onSelectAnimal: (animal: Animal) => void;
}

export const TaggingAgentDashboard: React.FC<TaggingAgentDashboardProps> = ({
  onOpenLinkTagModal,
  onSelectAnimal
}) => {
  const [blankTags, setBlankTags] = useState<QRTag[]>(getBlankTags());
  const [animals, setAnimals] = useState<Animal[]>(getAnimals());
  const [batchCount, setBatchCount] = useState<number>(5);
  const [printedSheet, setPrintedSheet] = useState<QRTag[] | null>(null);

  const refresh = () => {
    setBlankTags(getBlankTags());
    setAnimals(getAnimals());
  };

  const handleGenerateNewTag = () => {
    const newTag = generateNewBlankTag();
    refresh();
    alert(`नया ISO 15-Digit QR कान टैग "${newTag.tagId}" जारी हुआ!`);
  };

  const handleGenerateBatchPrint = () => {
    const generated: QRTag[] = [];
    for (let i = 0; i < batchCount; i++) {
      generated.push(generateNewBlankTag());
    }
    refresh();
    setPrintedSheet(generated);
  };

  const dailyTarget = 15;
  const completedToday = animals.length;
  const progressPercent = Math.min(Math.round((completedToday / dailyTarget) * 100), 100);
  const totalIncentiveEarned = completedToday * 50;

  const unlinkedTags = blankTags.filter(t => !t.isLinked);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-glow-emerald relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Tag className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  टैगिंग एजेंट डैशबोर्ड (Tagging Agent Panel)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                डोरस्टेप पशु पंजीकरण एवं Paytm-Style QR टैगिंग
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                खाली QR कान टैग जनरेट करें, आधार OCR द्वारा सत्यापित करें तथा 4-फ़ोटो समेत पशु टैगिंग पूरा करें
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateNewTag}
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>+ नया Paytm-Style QR टैग जनरेट करें</span>
          </button>
        </div>
      </div>

      {/* FEATURE 1 & 2 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bulk QR Code Printer */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-glow-cyan space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Printer className="w-5 h-5 text-cyan-400" />
              <span>1. बल्क QR कान टैग प्रिंट एवं शीट एक्सपोर्टर</span>
            </div>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
              Bulk Export Tool
            </span>
          </div>

          <p className="text-xs text-slate-400">
            मात्रा में खाली QR कान टैग जनरेट करें तथा पशुपालकों को वितरण हेतु प्रिंट शीट डाउनलोड करें।
          </p>

          <div className="flex items-center gap-3">
            <select
              value={batchCount}
              onChange={(e) => setBatchCount(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
            >
              <option value={5}>5 QR टैग शीट</option>
              <option value={10}>10 QR टैग शीट</option>
              <option value={20}>20 QR टैग शीट</option>
            </select>

            <button
              onClick={handleGenerateBatchPrint}
              className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>बल्क PDF शीट प्रिंट करें</span>
            </button>
          </div>

          {printedSheet && (
            <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
              <div className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {printedSheet.length} नए ISO QR कान टैग प्रिंट हेतु तैयार हैं!
              </div>
              <div className="flex gap-2 overflow-x-auto py-1">
                {printedSheet.map(t => (
                  <div key={t.tagId} className="p-1.5 bg-white rounded-lg text-slate-950 text-center font-mono text-[9px] font-bold shrink-0 shadow-md">
                    <QRCodeSVG value={`PASHUDHAN:${t.tagId}`} size={48} />
                    <span>{t.tagId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Daily Target & Incentive Tracker */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 shadow-glow-emerald space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Target className="w-5 h-5 text-emerald-400" />
              <span>2. दैनिक टैगिंग लक्ष्य एवं इंसेंटिव रिपोर्ट</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
              ₹50/Tag Incentive
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">दैनिक लक्ष्य (Target: {dailyTarget} टैग)</span>
              <span className="text-emerald-400 font-mono">{completedToday} / {dailyTarget} पूर्ण ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">आज का कुल इंसेंटिव</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">₹{totalIncentiveEarned}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">मासिक अनुमानित आय</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">₹{totalIncentiveEarned * 25}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Unlinked Paytm-Style 3D Ear Tag Bank */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>3D Paytm-Style QR Ear-Tag Bank ({unlinkedTags.length})</span>
          </h3>
          <span className="text-xs text-slate-400">टैग पर क्लिक करके पशुपालक से लिंक करें</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {unlinkedTags.map((tag) => (
            <div
              key={tag.tagId}
              className="glass-panel p-5 rounded-3xl border border-amber-500/40 hover:border-amber-400 transition-all flex flex-col justify-between space-y-4 shadow-glow-amber relative overflow-hidden group"
            >
              {/* Metallic Golden Ear-Tag Shape */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-400 to-amber-600 rounded-bl-3xl opacity-90 flex items-center justify-center text-slate-950 font-black text-[10px]">
                ISO
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">जारी: {tag.generatedDate}</span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Blank Tag
                </span>
              </div>

              <div className="bg-white p-3 rounded-2xl self-center shadow-lg group-hover:scale-105 transition-transform">
                <QRCodeSVG value={`PASHUDHAN:${tag.tagId}`} size={110} />
              </div>

              <div className="text-center">
                <div className="font-mono text-lg font-black text-white">{tag.tagId}</div>
                <div className="text-[11px] text-slate-400">Paytm-style Blank QR Tag</div>
              </div>

              <button
                onClick={() => onOpenLinkTagModal(tag.tagId)}
                className="w-full bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Link2 className="w-4 h-4" />
                <span>आधार OCR व पशु से लिंक करें</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Registrations Registry */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <span>आपके द्वारा पंजीकृत पशु एवं क्यूआर कोड</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => onSelectAnimal(animal)}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <img src={animal.photos[0]} alt={animal.breed} className="w-14 h-14 rounded-xl object-cover border border-slate-700" />
                <div>
                  <span className="font-mono font-bold text-emerald-400 text-xs">{animal.tagId}</span>
                  <div className="font-bold text-white text-sm">{animal.breed}</div>
                  <div className="text-xs text-slate-400">मालिक: {animal.owner.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
