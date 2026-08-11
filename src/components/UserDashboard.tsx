import React, { useState } from 'react';
import type { Animal, Complaint } from '../types';
import { QRCodeSVG } from 'qrcode.react';
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


interface UserDashboardProps {
  onOpenScanner: () => void;
  onOpenComplaintForm: (animal?: Animal) => void;
  onSelectAnimal: (animal: Animal) => void;
  complaints: Complaint[];
  animals: Animal[];
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onOpenScanner,
  onOpenComplaintForm,
  onSelectAnimal,
  complaints,
  animals
}) => {
  const [sosDispatched, setSosDispatched] = useState(false);

  const handleSosAmbulanceDispatch = () => {
    setSosDispatched(true);
    alert('🚨 पशु आपातकालीन 1962 एम्बुलेंस को जीपीएस लोकेशन (भोपाल मुख्य मार्ग) स्वतः डिस्पैच कर दी गई है! 10 मिनट में निकटतम मोबाइल मेडिकल वैन पहुँचेगी।');
    setTimeout(() => setSosDispatched(false), 6000);
  };

  const sampleTags = ['TAG-1001', 'TAG-1002', 'TAG-1003', 'TAG-1004'];

  const leaderboard = [
    { rank: 1, name: 'गौरक्षक राहुल राजपूत (भोपाल)', points: 450, badge: '🏆 जीव रक्षा रत्न' },
    { rank: 2, name: 'श्रीमती नीलम पांडे (इंदौर)', points: 380, badge: '🥇 गो-सेवा शिरोमणि' },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      
      {/* Hero Section with Saffron & Emerald Glow */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 shadow-glow-emerald">
        
        {/* Glow ambient circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>राष्ट्रीय सनातनी गोवंश रक्षा एवं Paytm-Style QR टैगिंग पोर्टल</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            पशु-धन <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-cyan-300">PashuDhan</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            सड़क पर घूम रहे किसी भी गोवंश के कान पर लगे **QR/RFID Tag** को स्कैन करें। पशु के मालिक की जानकारी, जिओ-फेंस एवं अलर्ट तुरंत प्राप्त करें या घायल/लावारिस पशु की शिकायत सीधे पुलिस व पशु विभाग को भेजें।
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenScanner}
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black px-7 py-4 rounded-2xl shadow-glow-emerald flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base"
            >
              <QrCode className="w-5 h-5 animate-pulse" />
              <span>पशु का QR कोड स्कैन करें</span>
            </button>

            <button
              onClick={() => onOpenComplaintForm()}
              className="bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-bold px-6 py-4 rounded-2xl transition-all flex items-center gap-2.5 text-sm"
            >
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>आवारा पशु शिकायत दर्ज करें</span>
            </button>
          </div>

        </div>
      </div>

      {/* Real-time Metrics Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 shadow-glow-emerald space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
            <span>कुल पंजीकृत गोवंश</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">1,420</div>
          <span className="text-[10px] text-emerald-300/80 font-mono">↑ 12% इस सप्ताह</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-cyan-500/30 shadow-glow-cyan space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
            <span>सक्रिय पेट्रोलिंग टीम</span>
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 font-mono">48</div>
          <span className="text-[10px] text-cyan-300/80 font-mono">24x7 हाईवे गश्त</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-amber-500/30 shadow-glow-amber space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
            <span>जिओ-फेंस ऑन-प्रिमाइसेस</span>
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">94%</div>
          <span className="text-[10px] text-amber-300/80 font-mono">सुरक्षित बाड़ के अंदर</span>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-rose-500/30 shadow-glow-rose space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
            <span>संबद्ध पंजीकृत गोशालाएं</span>
            <Building2 className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400 font-mono">112</div>
          <span className="text-[10px] text-rose-300/80 font-mono">30-दिन क्वारंटीन शेड</span>
        </div>
      </div>

      {/* Interactive Live Gauraksha Analytics Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span>साप्ताहिक गोवंश रेस्क्यू एवं QR टैगिंग विश्लेषण चार्ट</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">लाइव अपडेटेड</span>
        </div>

        <div className="grid grid-cols-7 gap-2 items-end h-40 pt-4 px-2 bg-slate-950/80 rounded-2xl border border-slate-900">
          {weeklyAnalytics.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              <div className="w-full flex justify-center items-end gap-1 h-28">
                {/* Rescued bar */}
                <div
                  className="w-3 rounded-t-lg bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:scale-y-105 transition-transform"
                  style={{ height: `${(item.rescued / 52) * 100}%` }}
                  title={`रेस्क्यू: ${item.rescued}`}
                ></div>
                {/* Tagged bar */}
                <div
                  className="w-3 rounded-t-lg bg-gradient-to-t from-amber-600 to-yellow-400 group-hover:scale-y-105 transition-transform"
                  style={{ height: `${(item.tagLinked / 52) * 100}%` }}
                  title={`टैग लिंक्ड: ${item.tagLinked}`}
                ></div>
              </div>
              <span className="text-[11px] text-slate-400 font-bold">{item.day}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 text-xs font-semibold pt-1">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>गोवंश रेस्क्यू संख्या</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span>QR Ear-Tag मैपिंग</span>
          </div>
        </div>
      </div>

      {/* 2 NEW FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SOS 1-Click Animal Ambulance Dispatch */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/40 shadow-glow-rose space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <Siren className="w-5 h-5 text-rose-400 animate-pulse" />
              <span>SOS आपातकालीन पशु एम्बुलेंस (1962) जीपीएस डिस्पैच</span>
            </div>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full font-mono font-bold">
              GPS Ambulance
            </span>
          </div>

          <p className="text-xs text-slate-400">
            गंभीर घायल या एक्सीडेंट ग्रस्त गोवंश मिलने पर 1-क्लिक इमरजेंसी जीपीएस एम्बुलेंस बुलाएं।
          </p>

          <button
            onClick={handleSosAmbulanceDispatch}
            className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl border border-amber-400/30 transform active:scale-95"
          >
            <Siren className="w-5 h-5 animate-bounce text-amber-300" />
            <span>🚨 1-CLICK SOS: 1962 पशु एम्बुलेंस जीपीएस बुलाएं</span>
          </button>

          {sosDispatched && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 font-semibold border border-emerald-500/40 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>आपातकालीन एम्बुलेंस जीपीएस अलर्ट प्रेषित! वैन चालक आपसे संपर्क कर रहा है।</span>
            </div>
          )}
        </div>

        {/* Gauraksha Citizen Community Leaderboard */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 shadow-glow-amber space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Award className="w-5 h-5 text-amber-400" />
              <span>गौरक्षक समुदाय लीडरबोर्ड एवं सम्मान पत्र</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-mono font-bold">
              Citizen Hero
            </span>
          </div>

          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div key={user.rank} className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold font-mono text-[11px]">
                    #{user.rank}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{user.name}</span>
                    <span className="text-[10px] text-amber-400 font-semibold">{user.badge}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-xs">{user.points} अंक</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Live Complaint Status Tracker */}
      {complaints.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>लाइव शिकायत ट्रैकिंग एवं स्टेटस ({complaints.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complaints.slice(0, 2).map((c) => (
              <div key={c.id} className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-cyan-400">{c.id}</span>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30">
                    {c.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium line-clamp-2">{c.description}</div>
                <div className="text-[10px] text-slate-400 font-mono">स्थान: {c.location.addressName}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Demo Ear-Tag Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">नमूना QR कान टैग (Sample Ear Tags)</h3>
          <span className="text-xs text-slate-400">स्कैन करने हेतु क्लिक करें</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sampleTags.map((tagId) => {
            const animalMatch = animals.find(a => a.tagId === tagId);
            return (
              <div
                key={tagId}
                onClick={() => animalMatch && onSelectAnimal(animalMatch)}
                className="glass-panel p-4 rounded-3xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all text-center space-y-2 group shadow-xl hover:shadow-glow-emerald"
              >
                <div className="bg-white p-2.5 rounded-2xl inline-block group-hover:scale-105 transition-transform shadow-md">
                  <QRCodeSVG value={`PASHUDHAN:${tagId}`} size={84} />
                </div>
                <div className="font-mono text-xs font-bold text-amber-400">{tagId}</div>
                <div className="text-[11px] text-slate-300 truncate">
                  {animalMatch ? animalMatch.breed : 'नमूना टैग'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
