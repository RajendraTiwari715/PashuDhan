import React from 'react';
import { Users, Truck, ShieldAlert, Heart, Building2, TrendingUp, Activity } from 'lucide-react';

export const DashboardOverview = () => {
  return (
    <div className="space-y-6 animate-fadeIn p-6">
      <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">राष्ट्रीय गोवंश नियंत्रण केंद्र - ओवरव्यू</h2>
          <p className="text-sm text-slate-400 mt-1">संपूर्ण सिस्टम का लाइव सारांश</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
           <Activity className="w-4 h-4 text-blue-400" />
           <span className="text-blue-400 font-bold text-xs">LIVE Telemetry</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 hover:border-emerald-500/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-bold uppercase">कुल पंजीकृत गोवंश</div>
            <div className="text-2xl font-bold text-white">12,450</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 hover:border-blue-500/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-bold uppercase">कुल कर्मचारी / यूज़र्स</div>
            <div className="text-2xl font-bold text-white">3,204</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 hover:border-amber-500/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
            <Truck className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-bold uppercase">सक्रिय रेस्क्यू / पेट्रोल</div>
            <div className="text-2xl font-bold text-white">45</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 hover:border-rose-500/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
            <Heart className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-bold uppercase">कुल गो-सेवा दान (₹)</div>
            <div className="text-2xl font-bold text-white">₹5.2L</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
         <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-400" /> गौशाला स्टेटस
            </h3>
            <div className="space-y-4">
               <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm text-slate-300">भोपाल गौशाला (क्षमता: 500)</span>
                     <span className="text-sm font-bold text-teal-400">325 / 500</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-teal-500 w-[65%]"></div>
                  </div>
               </div>
               <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm text-slate-300">इंदौर गौशाला (क्षमता: 1000)</span>
                     <span className="text-sm font-bold text-amber-400">850 / 1000</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-500 w-[85%]"></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" /> हालिया चेतावनियां (Alerts)
            </h3>
            <div className="space-y-3">
               <div className="p-3 bg-rose-500/10 border-l-2 border-rose-500 rounded-r-xl">
                  <div className="text-sm font-bold text-white">अनधिकृत पशु परिवहन</div>
                  <div className="text-xs text-slate-400 mt-1">हाईवे 44 पर 1 अनटैग्ड वाहन स्कैन किया गया। (10 मिनट पहले)</div>
               </div>
               <div className="p-3 bg-amber-500/10 border-l-2 border-amber-500 rounded-r-xl">
                  <div className="text-sm font-bold text-white">गौशाला क्षमता अलर्ट</div>
                  <div className="text-xs text-slate-400 mt-1">इंदौर गौशाला 85% क्षमता पर है। (1 घंटे पहले)</div>
               </div>
               <div className="p-3 bg-blue-500/10 border-l-2 border-blue-500 rounded-r-xl">
                  <div className="text-sm font-bold text-white">सिस्टम अपडेट</div>
                  <div className="text-xs text-slate-400 mt-1">नया AI कैमरा मॉड्यूल सफलतापूर्वक अपडेट किया गया। (3 घंटे पहले)</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
