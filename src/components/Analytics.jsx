import React from 'react';
import { BarChart3, TrendingUp, Users, Activity, PieChart } from 'lucide-react';

export const Analytics = () => {
  return (
    <div className="space-y-6 animate-fadeIn p-6">
      <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">एनालिटिक्स (Analytics)</h2>
          <p className="text-sm text-slate-400 mt-1">ऐप यूसेज एवं ग्रोथ रिपोर्ट</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
           <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-4">
             <Users className="w-4 h-4" /> कुल सक्रिय यूज़र्स (DAU)
           </h3>
           <div className="text-3xl font-bold text-white mb-2">1,240</div>
           <div className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% पिछले हफ्ते से
           </div>
        </div>
        
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
           <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-4">
             <Activity className="w-4 h-4" /> कुल ऐप इंटरेक्शन
           </h3>
           <div className="text-3xl font-bold text-white mb-2">45K+</div>
           <div className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +5% पिछले हफ्ते से
           </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
           <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 mb-4">
             <PieChart className="w-4 h-4" /> सर्वर रिस्पॉन्स टाइम
           </h3>
           <div className="text-3xl font-bold text-white mb-2">42ms</div>
           <div className="text-xs text-emerald-400 flex items-center gap-1">
              अत्यधिक तेज़
           </div>
        </div>
      </div>

      {/* Mock Chart Area */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl mt-6">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
           <BarChart3 className="w-5 h-5 text-blue-400" /> यूज़र ग्रोथ (पिछले 6 महीने)
         </h3>
         
         {/* Fake Chart CSS Bars */}
         <div className="h-64 flex items-end gap-4 justify-between border-b border-l border-slate-700 pb-2 pl-2">
            {[40, 55, 45, 70, 85, 100].map((h, i) => (
               <div key={i} className="w-full bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/50 rounded-t-sm relative group transition-all" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     {h * 12} Users
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                     {['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
