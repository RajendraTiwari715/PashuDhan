import React, { useState } from 'react';
import { FileText, Download, Filter, Search } from 'lucide-react';

export const Reports = () => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const reportsList = [
    { title: 'मासिक टैगिंग रिपोर्ट', date: 'अगस्त 2026', type: 'TAGGING', count: '1,245 Tags' },
    { title: 'हाईवे पेट्रोल रेस्क्यू डेटा', date: 'पिछले 7 दिन', type: 'RESCUE', count: '32 Rescues' },
    { title: 'गौशाला फीड एवं दान रिपोर्ट', date: 'अगस्त 2026', type: 'GAUSHALA', count: '₹52,000' },
    { title: 'वार्षिक गोवंश सारांश', date: 'वर्ष 2025-2026', type: 'ALL', count: '12,450 Total' },
    { title: 'अवैध परिवहन शिकायतें', date: 'अगस्त 2026', type: 'RESCUE', count: '14 Complaints' },
  ];

  const filteredReports = reportsList.filter(r => {
    const matchesFilter = filter === 'ALL' || r.type === filter || (filter === 'ALL' && r.type === 'ALL');
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  return (
    <div className="space-y-6 animate-fadeIn p-6">
      <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">सिस्टम रिपोर्ट्स (System Reports)</h2>
          <p className="text-sm text-slate-400 mt-1">सभी प्रकार की जनरेटेड रिपोर्ट्स</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900/60 border border-slate-800 p-3 rounded-xl gap-4 mb-6 shadow-xl">
         <div className="flex items-center gap-2 flex-1 w-full pl-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="रिपोर्ट खोजें..." className="bg-transparent border-none focus:outline-none text-sm text-white w-full placeholder-slate-600" />
         </div>
         <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-transparent border-none text-xs text-slate-300 py-2 focus:outline-none pr-2 w-full">
              <option value="ALL">सभी (All)</option>
              <option value="TAGGING">टैगिंग रिपोर्ट्स</option>
              <option value="RESCUE">रेस्क्यू रिपोर्ट्स</option>
              <option value="GAUSHALA">गौशाला फीड रिपोर्ट्स</option>
            </select>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report, i) => (
           <div key={i} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between hover:bg-slate-800/80 transition-colors group">
              <div>
                 <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                       <FileText className="w-5 h-5 text-teal-400" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-950 rounded-md text-slate-400 border border-slate-800">{report.type}</span>
                 </div>
                 <h3 className="text-sm font-bold text-white mb-1">{report.title}</h3>
                 <div className="text-[11px] text-slate-400">{report.date}</div>
              </div>
              <div className="mt-4 flex justify-between items-end border-t border-slate-800 pt-3">
                 <span className="text-xs font-bold text-teal-400">{report.count}</span>
                 <button className="flex items-center gap-1 text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors">
                    <Download className="w-3 h-3" /> डाउनलोड PDF
                 </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};
