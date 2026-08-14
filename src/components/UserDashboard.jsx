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
      {/* Hero Banner Section (Clean, Light, Professional) */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t('hero_title')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-800 leading-tight tracking-tight">
            {t('app_name')}
          </h1>
        </div>
      </div>

      {/* SOS Ambulance Bar - Highly Visible */}
      <div className="bg-rose-50 border border-rose-200 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white text-rose-500 shadow-sm border border-rose-100 animate-pulse">
            <Siren className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-black text-rose-700">पशु आपातकालीन 1962 SOS</div>
            <div className="text-xs text-rose-600/80">तत्काल जीपीएस एम्बुलेंस सेवा</div>
          </div>
        </div>

        <button
          onClick={handleSosAmbulanceDispatch}
          disabled={sosDispatched}
          className={`w-full sm:w-auto font-black px-6 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
            sosDispatched
              ? 'bg-emerald-600 text-white'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
          }`}
        >
          <Siren className="w-4 h-4" />
          <span>{sosDispatched ? '✓ एम्बुलेंस डिस्पैच हो गई' : t('sos_button')}</span>
        </button>
      </div>

      {/* Services Grid (Umang Style) */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4 px-2">मुख्य सेवाएँ (Core Services)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={onOpenScanner}
            className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <QrCode className="w-7 h-7" />
            </div>
            <span className="font-bold text-sm text-slate-700 text-center">{t('scan_qr')}</span>
          </button>

          <button
            onClick={() => onOpenComplaintForm()}
            className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <span className="font-bold text-sm text-slate-700 text-center">{t('file_complaint')}</span>
          </button>

          <button
            onClick={() => {}} // Could open a leaderboard modal/page
            className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <span className="font-bold text-sm text-slate-700 text-center">{t('leaderboard_title')}</span>
          </button>
          
          <button
            onClick={() => {}} // Could open stats/analytics page
            className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7" />
            </div>
            <span className="font-bold text-sm text-slate-700 text-center">गौशाला व आंकड़े</span>
          </button>
        </div>
      </div>
      
      {/* Quick Access Info Section (Uncluttered) */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
         <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-slate-800">क्या आप जानते हैं?</h3>
         </div>
         <p className="text-sm text-slate-600 leading-relaxed">
            पशु-धन ऐप के माध्यम से आप किसी भी आवारा या घायल गोवंश का QR स्कैन करके उसकी संपूर्ण जानकारी प्राप्त कर सकते हैं। 
            आप 1962 पर कॉल करके एम्बुलेंस भी बुला सकते हैं। ऐप का मुख्य उद्देश्य गो-माता की रक्षा और देखभाल को सुगम बनाना है।
         </p>
      </div>

    </div>
  );
};