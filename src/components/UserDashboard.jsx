import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '../context/LanguageContext';
import {
  QrCode,
  AlertTriangle,
  Award,
  Siren,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  BarChart3,
  Activity,
  Building2
} from 'lucide-react';

export const UserDashboard = ({
  onOpenScanner,
  onOpenComplaintForm,
  onSelectAnimal,
  complaints,
  animals
}) => {
  const { t } = useLanguage();
  const [sosDispatched, setSosDispatched] = useState(false);

  const handleSosAmbulanceDispatch = () => {
    setSosDispatched(true);
    alert('🚨 पशु आपातकालीन 1962 एम्बुलेंस को जीपीएस लोकेशन ऑटो-डिस्पैच कर दी गई है!');
    setTimeout(() => setSosDispatched(false), 6000);
  };

  const sampleTags = ['TAG-1001', 'TAG-1002', 'TAG-1003', 'TAG-1004'];

  const leaderboard = [
    { rank: 1, name: 'राहुल राजपूत (भोपाल)', points: 450, badge: '🏆 जीव रक्षा रत्न' },
    { rank: 2, name: 'नीलम पांडे (इंदौर)', points: 380, badge: '🥇 गो-सेवा शिरोमणि' },
    { rank: 3, name: 'सचिन वर्मा (उज्जैन)', points: 290, badge: '🥈 गौरक्षक मित्र' }
  ];

  const weeklyAnalytics = [
    { day: 'सोम', rescued: 14, tagLinked: 28 },
    { day: 'मंगल', rescued: 19, tagLinked: 34 },
    { day: 'बुध', rescued: 12, tagLinked: 22 },
    { day: 'गुरु', rescued: 25, tagLinked: 45 },
    { day: 'शुक्र', rescued: 22, tagLinked: 38 },
    { day: 'शनि', rescued: 30, tagLinked: 52 },
    { day: 'रवि', rescued: 18, tagLinked: 31 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 p-6 sm:p-10 shadow-glow-emerald">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t('hero_title')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            {t('app_name')}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenScanner}
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black px-6 py-3.5 rounded-2xl shadow-glow-emerald flex items-center gap-2.5 transition-all text-sm sm:text-base"
            >
              <QrCode className="w-5 h-5 animate-pulse" />
              <span>{t('scan_qr')}</span>
            </button>

            <button
              onClick={() => onOpenComplaintForm()}
              className="bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-5 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-sm"
            >
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>{t('file_complaint')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
            <span>पंजीकृत गोवंश</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">1,420</div>
          <span className="text-[10px] text-emerald-300/80 font-mono">↑ 12% इस सप्ताह</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
            <span>सक्रिय QR टैग्स</span>
            <QrCode className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">3,850</div>
          <span className="text-[10px] text-amber-300/80 font-mono">98% ऑनलाइन</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
            <span>सुरक्षित गोशालाएँ</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono">84</div>
          <span className="text-[10px] text-cyan-300/80 font-mono">24/7 गेट इनटेक</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-rose-500/30 space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
            <span>हल की गई शिकायतें</span>
            <CheckCircle2 className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">94%</div>
          <span className="text-[10px] text-rose-300/80 font-mono">औसत 2 घंटे प्रतिक्रिया</span>
        </div>
      </div>

      {/* SOS Ambulance Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-slate-950 to-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
            <Siren className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-black text-white">पशु आपातकालीन 1962 मेडिकल एम्बुलेंस SOS</div>
            <div className="text-xs text-slate-400">गंभीर रूप से घायल/बीमार पशु हेतु तत्काल जीपीएस एम्बुलेंस डिस्पैच करें</div>
          </div>
        </div>

        <button
          onClick={handleSosAmbulanceDispatch}
          disabled={sosDispatched}
          className={`w-full sm:w-auto font-black px-6 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all ${
            sosDispatched
              ? 'bg-emerald-600 text-white'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
          }`}
        >
          <Siren className="w-4 h-4" />
          <span>{sosDispatched ? '✓ एम्बुलेंस डिस्पैच हो गई' : t('sos_button')}</span>
        </button>
      </div>

      {/* Leaderboard & Live Sample Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GauRakshak Leaderboard */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>{t('leaderboard_title')}</span>
            </h3>
            <span className="text-xs text-amber-400 font-semibold">टॉप 3</span>
          </div>

          <div className="space-y-3">
            {leaderboard.map((item) => (
              <div key={item.rank} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-xs font-mono">
                    #{item.rank}
                  </span>
                  <div>
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.badge}</div>
                  </div>
                </div>
                <div className="font-mono font-bold text-emerald-400">{item.points} अंक</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Test QR Tags */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-400" />
              <span>लाइव स्कैनिंग हेतु सैम्पल QR टैग्स</span>
            </h3>
            <span className="text-xs text-emerald-400 font-mono">Scan Test</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {sampleTags.map((tag) => (
              <div key={tag} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="bg-white p-2 rounded-xl inline-block">
                  <QRCodeSVG value={`PASHUDHAN:${tag}`} size={60} />
                </div>
                <div className="font-mono text-xs font-bold text-emerald-400">{tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};