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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-700/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-slate-950/30">
        <div className="pointer-events-none absolute -top-12 -right-8 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-4 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative grid gap-8 xl:grid-cols-[1.8fr_1fr] xl:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 backdrop-blur-sm">
              <Tag className="w-4 h-4" />
              टैगिंग एजेंट डैशबोर्ड
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-cyan-100">Smarter QR टैगिंग, तेज पंजीकरण</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                अपने टैगिंग वर्कफ़्लो को modern बनाएं: खाली Paytm-Style QR कान टैग जनरेट करें, तुरंत लिंक करें, और अधिक तेज़ी से मजदूरी कमाएँ।
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/95 p-5 shadow-lg shadow-slate-950/20">
                <p className="text-[11px] uppercase tracking-[0.26em] text-slate-500">आज की टैगिंग</p>
                <p className="mt-4 text-4xl font-black text-cyan-300">{completedToday}</p>
                <p className="mt-2 text-xs text-slate-400">आज का पूरा किया गया काम</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/95 p-5 shadow-lg shadow-slate-950/20">
                <p className="text-[11px] uppercase tracking-[0.26em] text-slate-500">लिंक्ड टैग</p>
                <p className="mt-4 text-4xl font-black text-emerald-300">{linkedTagsCount}</p>
                <p className="mt-2 text-xs text-slate-400">अब तक जोड़ चुके टैग</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-950/95 p-5 shadow-lg shadow-slate-950/20">
                <p className="text-[11px] uppercase tracking-[0.26em] text-slate-500">उपलब्ध QR टैग</p>
                <p className="mt-4 text-4xl font-black text-cyan-100">{totalTags}</p>
                <p className="mt-2 text-xs text-slate-400">ब्लैंक टैग स्टॉक</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-700/50 bg-slate-950/95 p-6 shadow-glow-cyan backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-100">Quick Action</p>
                <p className="mt-1 text-xs text-slate-400">एक नया QR टैग जनरेट करें और जल्दी काम शुरू करें।</p>
              </div>
              <button
                type="button"
                onClick={handleGenerateNewTag}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5"
              >
                <PlusCircle className="w-5 h-5" />
                नया टैग बनाएं
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-900/90 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">लक्ष्य प्रगति</p>
                <p className="mt-3 text-2xl font-black text-emerald-300">{progressPercent}%</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-900/90 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">आज की कमाई</p>
                <p className="mt-3 text-2xl font-black text-cyan-300">₹{totalIncentiveEarned}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.75rem] bg-slate-900/90 p-4 border border-slate-800">
              <p className="text-xs text-slate-400">यहाँ पर हर टैग से मिलने वाली reward और workflow health एक नजर में देखें।</p>
              <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-200">
                <div className="rounded-3xl bg-slate-950/80 px-4 py-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.22em]">ऊर्जा</p>
                  <p className="mt-2 font-black text-emerald-300">Strong</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 px-4 py-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.22em]">वाहन</p>
                  <p className="mt-2 font-black text-cyan-300">Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-[2rem] border border-cyan-500/15 bg-slate-950/90 p-6 shadow-glow-cyan backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-cyan-300">
              <Printer className="w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">Bulk Print</p>
                <p className="text-xs text-slate-400">एक्शन शीट बनाने के लिए टैग्स चुनें और डाउनलोड करें।</p>
              </div>
            </div>
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200">Fast Export</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] items-end">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">शीट साइज</label>
              <select
                value={batchCount}
                onChange={(e) => setBatchCount(Number(e.target.value))}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition hover:border-slate-600"
              >
                <option value={5}>5 टैग</option>
                <option value={10}>10 टैग</option>
                <option value={20}>20 टैग</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleGenerateBatchPrint}
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              <Download className="w-4 h-4" />
              प्रिंट शीट बनाएँ
            </button>
          </div>

          {printedSheet && (
            <div className="mt-6 space-y-4 rounded-[1.75rem] border border-cyan-500/15 bg-slate-900/95 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
                <CheckCircle2 className="w-4 h-4" />
                {printedSheet.length} टैग की PDF शीट तैयार है
              </div>
              <div className="grid grid-cols-2 gap-3 overflow-x-auto sm:grid-cols-3 lg:grid-cols-5">
                {printedSheet.map((tag) => (
                  <div key={tag.tagId} className="rounded-3xl bg-slate-950 p-4 text-center shadow-lg shadow-cyan-500/10">
                    <QRCodeSVG value={`PASHUDHAN:${tag.tagId}`} size={58} />
                    <p className="mt-3 text-[10px] font-mono text-slate-300 break-words">{tag.tagId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="rounded-[2rem] border border-emerald-500/15 bg-slate-950/90 p-6 shadow-glow-emerald backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-emerald-300">
              <Target className="w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">इंसेंटिव ट्रैकिंग</p>
                <p className="text-xs text-slate-400">₹50 प्रत्‍येक ब्लैंक टैग लिंक होने पर मिलेगी।</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-200">₹50 / टैग</span>
          </div>

          <div className="mt-6 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span>आज का लक्ष्य</span>
                <span>{completedToday}/{dailyTarget}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                <div style={{ width: `${progressPercent}%` }} className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/90 p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">आज की अर्जन</p>
                <p className="mt-3 text-3xl font-black text-emerald-300">₹{totalIncentiveEarned}</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/90 p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">मासिक अनुमान</p>
                <p className="mt-3 text-3xl font-black text-cyan-300">₹{totalIncentiveEarned * 25}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-amber-500/15 bg-slate-950/90 p-6 shadow-glow-amber backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-cyan-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                QR Ear-Tag Bank
              </h2>
              <p className="mt-1 text-xs text-slate-400">ब्लैंक टैग्स देखें, जल्दी लिंक करें और कवर करें।</p>
            </div>
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-amber-200">{unlinkedTags.length} Unlinked</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {unlinkedTags.length > 0 ? (
              unlinkedTags.slice(0, 8).map((tag) => (
                <article
                  key={tag.tagId}
                  className="glass-panel relative overflow-hidden rounded-[2rem] border border-amber-500/30 p-5 shadow-glow-amber transition hover:-translate-y-1"
                >
                  <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-amber-500/15" />
                  <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
                    <span>{tag.generatedDate}</span>
                    <span className="rounded-full bg-amber-500/20 px-2 py-1 text-amber-300">Blank</span>
                  </div>
                  <div className="mt-5 flex justify-center rounded-3xl bg-slate-950/90 p-3 shadow-inner shadow-slate-900/20">
                    <QRCodeSVG value={`PASHUDHAN:${tag.tagId}`} size={92} />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-mono text-base font-black text-cyan-100">{tag.tagId}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Paytm-style QR Tag</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenLinkTagModal(tag.tagId)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-amber-400 to-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:scale-[1.01]"
                  >
                    <Link2 className="w-4 h-4" />
                    लिंक करें
                  </button>
                </article>
              ))
            ) : (
              <div className="rounded-[2rem] border border-slate-800/70 bg-slate-900/90 p-10 text-center text-slate-400">
                कोई भी बिंदीकृत टैग उपलब्ध नहीं है। पहले नया टैग बनाएं।
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-700/50 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-cyan-100 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                पंजीकृत पशु
              </h2>
              <p className="mt-1 text-xs text-slate-400">QR टैग वाली हाल की पंजीकृत पशु सूची।</p>
            </div>
            <span className="rounded-full bg-slate-950/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-400 border border-slate-800">
              {animals.length} पशु
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {animals.map((animal) => (
              <article
                key={animal.id}
                onClick={() => onSelectAnimal(animal)}
                className="glass-panel cursor-pointer overflow-hidden rounded-[2rem] border border-slate-800 p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-400/40"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={animal.photos[0]}
                    alt={animal.breed}
                    className="h-16 w-16 rounded-3xl object-cover border border-slate-700"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">{animal.tagId}</p>
                    <p className="mt-1 text-lg font-bold text-cyan-100">{animal.breed}</p>
                    <p className="mt-1 text-xs text-slate-400">मालिक: {animal.owner.name}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-900/90 p-3 text-[11px] text-slate-300 border border-slate-800">
                    <p className="font-semibold text-slate-200">पंजीकरण</p>
                    <p className="mt-2 text-sm text-slate-400">{animal.isRegistered ? 'Complete' : 'Pending'}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/90 p-3 text-[11px] text-slate-300 border border-slate-800">
                    <p className="font-semibold text-slate-200">टैग कनेक्ट</p>
                    <p className="mt-2 text-sm text-slate-400">QR मौके पर स्कैन करें</p>
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
