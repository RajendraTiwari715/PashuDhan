import React, { useState } from 'react';
import { PatrolScannerView } from './PatrolScannerView';
import { Radio, Eye, ShieldAlert, Truck, Fuel, FileText, CheckCircle2 } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";


export const PatrolSquadDashboard = () => {
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
    setDutyLogs((prev) => [
      { time: timeNow, note: dutyNote, officer: 'पेट्रोलिंग अधिकारी' },
      ...prev
    ]);
    setDutyNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
              <Radio className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs px-3 py-0.5 rounded-full font-bold">
                  पेट्रोलिंग स्क्वाड / गौरक्षक दल
                </span>
                {isNightMode && (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Thermal Radar Active
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                पेट्रोलिंग स्क्वाड
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              isNightMode
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{isNightMode ? 'नाइट रडार मोड सक्रिय (ON)' : 'नाइट गश्त रडार चालू करें'}</span>
          </button>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar & Blockade Alert */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>1. नाइट विजन एवं हाईवे नाकाबंदी अलर्ट डिस्पैच</span>
            </div>
            <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">
              Emergency Blockade
            </span>
          </div>

          {/* Radar Animation Box */}
          <div className="relative w-full h-32 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full border border-rose-500/20" />
            <div className="absolute w-20 h-20 rounded-full border border-rose-500/30" />
            <div className="absolute w-12 h-12 rounded-full border border-rose-500/40" />
            <div className="w-2 h-2 rounded-full bg-rose-500" />

            <div className="absolute w-28 h-28 origin-center animate-radarSweep pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-tr from-rose-500/40 to-transparent border-r-2 border-rose-400" />
            </div>

            <div className="absolute top-6 left-12 w-2 h-2 rounded-full bg-emerald-400 animate-ping" title="Cattle A Detected" />
            <div className="absolute bottom-8 right-16 w-2 h-2 rounded-full bg-amber-400 animate-ping" title="Cattle B Detected" />
          </div>

          <button
            onClick={handleSendBlockadeAlert}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>1-क्लिक इमरजेंसी हाईवे नाकाबंदी अलर्ट भेजें</span>
          </button>

          {blockadeAlertSent && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs flex items-center gap-2 font-bold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>अलर्ट सफलतापूर्वक 112 कंट्रोल रूम एवं नजदीकी थानों को प्रेषित!</span>
            </div>
          )}
        </div>

        {/* GPS Vehicle & Digital Log */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-700 font-bold text-sm">
              <Truck className="w-5 h-5 text-cyan-600" />
              <span>2. गश्त वाहन जीपीएस एवं डिजिटल ड्यूटी लॉगबुक</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
              MP-04-PT-9012
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 block text-[10px] font-semibold">गश्त वाहन संख्या</span>
              <span className="font-mono font-bold text-slate-800 mt-0.5 block">MP-04-PT-9012</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[10px] font-semibold">फ्यूल स्तर</span>
                <span className="font-mono font-bold text-emerald-600 mt-0.5 block">85% (Full Tank)</span>
              </div>
              <Fuel className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={dutyNote}
              onChange={(e) => setDutyNote(e.target.value)}
              placeholder="ड्यूटी टिप्पणी दर्ज करें..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleAddDutyLog}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>लॉग दर्ज करें</span>
            </button>
          </div>

          <div className="space-y-2 max-h-28 overflow-y-auto">
            {dutyLogs.map((log, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex justify-between">
                <span className="text-slate-700 font-medium">{log.note}</span>
                <span className="text-slate-400 font-mono text-[10px] shrink-0 ml-2">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PatrolScannerView />
    </div>
  );
};