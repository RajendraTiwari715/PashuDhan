import React, { useState } from 'react';

import { getBlankTags, getAnimals, generateNewBlankTag } from '../services/storage';
import { QRCodeSVG } from 'qrcode.react';
import { Tag, PlusCircle, Sparkles, UserCheck, Link2, Printer, Target, Download, CheckCircle2 } from 'lucide-react';

export const TaggingAgentDashboard = ({
  onOpenLinkTagModal,
  onSelectAnimal
}) => {
  const [blankTags, setBlankTags] = useState(getBlankTags());
  const [animals, setAnimals] = useState(getAnimals());
  const [batchCount, setBatchCount] = useState(5);
  const [printedSheet, setPrintedSheet] = useState(null);

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
    const generated = [];
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
  const unlinkedTags = blankTags.filter((t) => !t.isLinked);
  const linkedTagsCount = blankTags.length - unlinkedTags.length;
  const totalTags = blankTags.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700">
              <Tag className="w-3.5 h-3.5" />
              टैगिंग एजेंट पोर्टल
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800">
              टैगिंग एजेंट डैशबोर्ड
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleGenerateNewTag}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-5 py-3.5 text-sm font-black text-white shadow-sm transition"
            >
              <PlusCircle className="w-5 h-5" />
              नया QR टैग जारी करें
            </button>
          </div>
        </div>

        {/* Stats Grid Header */}
        <div className="grid gap-4 sm:grid-cols-4 mt-6 pt-6 border-t border-slate-100">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">आज की टैगिंग</p>
            <p className="mt-2 text-3xl font-black text-emerald-600">{completedToday}</p>
            <p className="mt-1 text-xs text-slate-500">पूरा काम</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">लिंक्ड टैग</p>
            <p className="mt-2 text-3xl font-black text-cyan-600">{linkedTagsCount}</p>
            <p className="mt-1 text-xs text-slate-500">जोड़े जा चुके टैग</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">उपलब्ध QR टैग</p>
            <p className="mt-2 text-3xl font-black text-purple-600">{totalTags}</p>
            <p className="mt-1 text-xs text-slate-500">ब्लैंक स्टॉक</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">आज का इंसेंटिव</p>
            <p className="mt-2 text-3xl font-black text-amber-600">₹{totalIncentiveEarned}</p>
            <p className="mt-1 text-xs text-slate-500">अर्जित राशि</p>
          </div>
        </div>
      </div>

      {/* Bulk Print & Progress Section */}
      <div className="grid gap-6 xl:grid-cols-12">
        <section className="xl:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">बल्क प्रिंट (Bulk Print Generator)</p>
                <p className="text-xs text-slate-500">एक्शन शीट बनाने के लिए टैग्स चुनें और डाउनलोड करें।</p>
              </div>
            </div>
            <span className="rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-[10px] font-bold text-cyan-700">
              FAST EXPORT
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">शीट साइज चुनें</label>
              <select
                value={batchCount}
                onChange={(e) => setBatchCount(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-cyan-500"
              >
                <option value={5}>5 टैग शीट</option>
                <option value={10}>10 टैग शीट</option>
                <option value={20}>20 टैग शीट</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleGenerateBatchPrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-5 py-2.5 text-xs font-bold text-white transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              प्रिंट शीट जनरेट करें
            </button>
          </div>

          {printedSheet && (
            <div className="mt-6 space-y-4 rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                {printedSheet.length} टैग की PDF एक्शन शीट तैयार है
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {printedSheet.map((tag) => (
                  <div key={tag.tagId} className="rounded-2xl bg-white p-3 text-center border border-slate-200 shadow-sm">
                    <div className="flex justify-center">
                      <QRCodeSVG value={`PASHUDHAN:${tag.tagId}`} size={58} />
                    </div>
                    <p className="mt-2 text-[10px] font-mono font-bold text-slate-700 break-all">{tag.tagId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="xl:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">इंसेंटिव एवं लक्ष्य ट्रैकिंग</p>
                <p className="text-xs text-slate-500">₹50 प्रत्येक ब्लैंक टैग लिंक होने पर</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-700">
              ₹50 / टैग
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-700 font-bold">
              <span>आज का लक्ष्य प्रगति</span>
              <span className="font-mono text-emerald-600">{completedToday} / {dailyTarget} ({progressPercent}%)</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 pt-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">आज की अर्जन</p>
              <p className="mt-1 text-2xl font-black text-emerald-600">₹{totalIncentiveEarned}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">मासिक अनुमान</p>
              <p className="mt-1 text-2xl font-black text-cyan-600">₹{totalIncentiveEarned * 25}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Tag Bank & Registered Cattle List */}
      <div className="grid gap-6 xl:grid-cols-12">
        {/* Unlinked QR Bank */}
        <section className="xl:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>QR Ear-Tag Bank ({unlinkedTags.length} स्टॉक)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">ब्लैंक टैग्स देखें, पशु से तुरंत लिंक करें।</p>
            </div>
            <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-bold text-amber-700">
              {unlinkedTags.length} Unlinked
            </span>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {unlinkedTags.length > 0 ? (
              unlinkedTags.slice(0, 8).map((tag) => (
                <article
                  key={tag.tagId}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-center space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>{tag.generatedDate}</span>
                    <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Blank</span>
                  </div>
                  <div className="flex justify-center bg-white p-2 rounded-xl border border-slate-200">
                    <QRCodeSVG value={`PASHUDHAN:${tag.tagId}`} size={80} />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold text-slate-800">{tag.tagId}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenLinkTagModal(tag.tagId)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2 text-xs font-bold text-white transition shadow-sm"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>लिंक करें</span>
                  </button>
                </article>
              ))
            ) : (
              <div className="col-span-4 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-xs text-slate-500">
                कोई भी बिंदीकृत टैग उपलब्ध नहीं है। पहले नया टैग बनाएं।
              </div>
            )}
          </div>
        </section>

        {/* Registered Animals List */}
        <section className="xl:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>हाल ही में पंजीकृत पशु</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">QR टैग लगे हुए गोवंशों की सूची।</p>
            </div>
            <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600">
              {animals.length} पशु
            </span>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {animals.map((animal) => (
              <article
                key={animal.id}
                onClick={() => onSelectAnimal(animal)}
                className="bg-slate-50 hover:bg-slate-100/80 cursor-pointer rounded-2xl border border-slate-200 p-3.5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={animal.photos[0]}
                    alt={animal.breed}
                    className="h-14 w-14 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {animal.tagId}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {animal.isRegistered ? 'सत्यापित' : 'लंबित'}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 truncate mt-1">{animal.breed}</p>
                    <p className="text-xs text-slate-500 truncate">मालिक: {animal.owner.name}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
