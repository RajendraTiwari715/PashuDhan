import React, { useState } from 'react';
import { PatrolScannerView } from './PatrolScannerView';
import { Radio, Eye, ShieldAlert, Truck, Fuel, FileText, CheckCircle2 } from 'lucide-react';


export const PatrolSquadDashboard: React.FC = () => {
  const [isNightMode, setIsNightMode] = useState(false);
  const [blockadeAlertSent, setBlockadeAlertSent] = useState(false);
  const [dutyNote, setDutyNote] = useState('NH-44 भोपाल-सीहोर हाईवे गश्त संपन्न। 3 आवारा गोवंश सुरक्षित साइड किए गए।');
  const [dutyLogs, setDutyLogs] = useState([
    { time: '02:30 AM', note: 'नाइट विजन रडार द्वारा बोर्ड ऑफिस चौराहे पर चेकिंग', officer: 'सहा. निरीक्षक विक्रम सिंह' },
    { time: '04:15 AM', note: 'सीहोर तिराहा हाईवे पर 1 बैल पाया गया, पशु विभाग को सूचना', officer: 'कांस्टेबल राहुल' }
  ]);

  const handleSendBlockadeAlert = () => {
    setBlockadeAlertSent(true);
    alert('🚨 हाईवे नाकाबंदी एवं पशु स्क्वाड अलर्ट निकटतम 3 पुलिस थानों एवं पशु विभाग को प्रेषित किया गया!');
    setTimeout(() => setBlockadeAlertSent(false), 5000);
  };

  const handleAddDutyLog = () => {
    if (!dutyNote.trim()) return;
    const timeNow = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setDutyLogs(prev => [
      { time: timeNow, note: dutyNote, officer: 'पेट्रोलिंग अधिकारी' },
      ...prev
    ]);
    setDutyNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className={`glass-panel p-6 rounded-3xl transition-all duration-500 border ${
        isNightMode ? 'border-emerald-500/60 bg-emerald-950/30 shadow-glow-emerald' : 'border-cyan-500/30 shadow-glow-cyan'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Radio className="w-7 h-7 text-slate-950 font-bold animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  पेट्रोलिंग स्क्वाड / गौरक्षक दल डैशबोर्ड
                </span>
                {isNightMode && (
                  <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-bold animate-pulse">
                    🌙 Thermal Radar Active
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                1-2m लांग-रेंज RFID स्कैनिंग एवं हाईवे गश्त
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                सड़क पर घूम रहे आवारा पशुओं की स्वतः पहचान, Case A/B/C निर्णय लॉजिक एवं ऑटो-फ्लैग नोटिस
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              isNightMode 
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{isNightMode ? 'नाइट रडार मोड ON' : 'नाइट गश्त रडार मोड चालू करें'}</span>
          </button>
        </div>
      </div>

      {/* FEATURE 1 & 2 CARDS FOR PATROL SQUAD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Emergency Road Blockade Dispatch & Thermal Radar Graphic */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 shadow-glow-rose space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>1. नाइट विजन एवं हाईवे नाकाबंदी अलर्ट डिस्पैच</span>
            </div>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono font-bold">
              Emergency Blockade
            </span>
          </div>

          {/* Thermal Radar Scanner Sweep Circle Graphic */}
          <div className="relative w-full h-32 bg-slate-950 rounded-2xl border border-rose-500/30 overflow-hidden flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute w-28 h-28 rounded-full border border-rose-500/20"></div>
            <div className="absolute w-20 h-20 rounded-full border border-rose-500/30"></div>
            <div className="absolute w-12 h-12 rounded-full border border-rose-500/40"></div>
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>

            {/* Sweep Line */}
            <div className="absolute w-28 h-28 origin-center animate-radarSweep pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-tr from-rose-500/40 to-transparent border-r-2 border-rose-400"></div>
            </div>

            {/* Pulsing Radar Distance Pins */}
            <div className="absolute top-6 left-12 w-2 h-2 rounded-full bg-emerald-400 animate-ping" title="Cattle A Detected"></div>
            <div className="absolute bottom-8 right-16 w-2 h-2 rounded-full bg-amber-400 animate-ping" title="Cattle B Detected"></div>
          </div>

          <button
            onClick={handleSendBlockadeAlert}
            className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg border border-amber-400/30"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>🚨 1-क्लिक इमरजेंसी हाईवे नाकाबंदी अलर्ट भेजें</span>
          </button>

          {blockadeAlertSent && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 font-semibold border border-emerald-500/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>अलर्ट सफलतापूर्वक 112 कंट्रोल रूम एवं नजदीकी थानों को प्रेषित!</span>
            </div>
          )}
        </div>

        {/* Vehicle GPS & Digital Duty Logbook */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-glow-cyan space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Truck className="w-5 h-5 text-cyan-400" />
              <span>2. गश्त वाहन जीपीएस एवं डिजिटल ड्यूटी लॉगबुक</span>
            </div>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
              MP-04-PT-9012
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">गश्त वाहन संख्या:</span>
              <span className="font-mono font-bold text-white">MP-04-PT-9012</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px]">फ्यूल स्तर:</span>
                <span className="font-mono font-bold text-emerald-400">85% (Full Tank)</span>
              </div>
              <Fuel className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={dutyNote}
              onChange={(e) => setDutyNote(e.target.value)}
              placeholder="ड्यूटी टिप्पणी दर्ज करें..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
            />
            <button
              onClick={handleAddDutyLog}
              className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>लॉग दर्ज करें</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-28 overflow-y-auto">
            {dutyLogs.map((log, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] flex justify-between">
                <span className="text-slate-300">{log.note}</span>
                <span className="text-slate-500 font-mono shrink-0 ml-2">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <PatrolScannerView />
    </div>
  );
};
