import React, { useState } from 'react';
import { GaushalaModule } from './GaushalaModule';
import { Building2, Heart, PlusCircle, CheckCircle2, Navigation, Truck, QrCode, Shield, FileText, Bell, Search, Activity, User } from 'lucide-react';

export const GaushalaManagerDashboard = ({ animals }) => {
  const [donorName, setDonorName] = useState('');
  const [donorAmount, setDonorAmount] = useState(1100);
  const [donations, setDonations] = useState([
    { name: 'श्री जगदीश अग्रवाल', amount: 5100, item: '10 क्विंटल हरा चारा', date: '2026-08-10', badge: '🥇 स्वर्ण दानदाता' },
    { name: 'श्रीमती संगीता शर्मा', amount: 2100, item: 'गो-सेवा गोद ग्रहण (सप्ताह)', date: '2026-08-11', badge: '🥈 रजत दानदाता' }
  ]);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const [feedItem, setFeedItem] = useState('');
  const [feedQuantity, setFeedQuantity] = useState('');
  const [feedLogs, setFeedLogs] = useState([
    { item: 'हरा चारा (Napier Grass)', quantity: '12 Kg', date: '2026-08-11' },
    { item: 'हरा चारा (Green Fodder) + भूसा', quantity: '15 Kg', date: '2026-08-11' }
  ]);

  const handleAddFeedLog = (e) => {
    e.preventDefault();
    if (!feedItem.trim() || !feedQuantity.trim()) return;
    const dateToday = new Date().toISOString().split('T')[0];
    setFeedLogs((prev) => [
      { item: feedItem, quantity: `${feedQuantity} Kg`, date: dateToday },
      ...prev
    ]);
    setFeedItem('');
    setFeedQuantity('');
  };

  const handleAddDonation = (e) => {
    e.preventDefault();
    if (!donorName.trim()) return;
    const dateToday = new Date().toISOString().split('T')[0];
    setDonations((prev) => [
      { name: donorName, amount: donorAmount, item: 'चारा एवं दाना सेवा सहयोग', date: dateToday, badge: '🏆 गो-सेवक' },
      ...prev
    ]);
    setDonationSuccess(true);
    setDonorName('');
    setTimeout(() => setDonationSuccess(false), 4000);
  };

  const totalCapacity = 500;
  const currentRescuedCount = 325; // Hardcoded to match 325/500 image for demo, could use animals.length
  const occupancyPercent = Math.round((currentRescuedCount / totalCapacity) * 100);

  return (
    <div className="flex h-screen bg-[#1e293b] text-slate-300 font-sans overflow-hidden">
       {/* Left Sidebar (Icon only, from Image 3) */}
       <div className="w-16 bg-[#0f172a] border-r border-slate-800 flex flex-col items-center py-4 space-y-6 shrink-0 relative z-20">
          <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-500/50 mb-4">
             <Building2 className="w-6 h-6 text-teal-400" />
          </div>
          <button className="p-2 bg-teal-500/20 rounded-lg text-teal-400 border border-teal-500/40"><Activity className="w-5 h-5" /></button>
          <button className="p-2 text-slate-500 hover:text-slate-300"><FileText className="w-5 h-5" /></button>
          <button className="p-2 text-slate-500 hover:text-slate-300"><Bell className="w-5 h-5" /><span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span></button>
          <button className="p-2 text-slate-500 hover:text-slate-300"><User className="w-5 h-5" /></button>
       </div>

       {/* Main Area */}
       <div className="flex-1 flex flex-col min-w-0 bg-[#1e293b] relative">
          
          {/* Top Navbar */}
          <div className="h-16 border-b border-slate-700 bg-[#0f172a] flex items-center justify-between px-6 shrink-0">
             <div className="relative w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input type="text" placeholder="Search" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-teal-500" />
             </div>
             <div className="flex items-center gap-4">
                <div className="relative">
                   <Bell className="w-5 h-5 text-slate-400" />
                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#0f172a] flex items-center justify-center text-[8px] text-white font-bold">1</div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center"><User className="w-4 h-4" /></div>
                   <div className="text-xs">
                      <div className="text-slate-400">Profile Details</div>
                      <div className="text-white font-bold">Gaushala Manage ▾</div>
                   </div>
                </div>
                <div className="text-sm font-mono text-slate-300 ml-4 flex items-center gap-1">
                   <Activity className="w-4 h-4" /> 07:37 PM
                </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
             {/* Header */}
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg border border-amber-500/30">
                      <Building2 className="w-7 h-7 text-white" />
                   </div>
                   <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">गौशाला इनटेक, कस्टडी ट्रांसफर एवं 30-दिवसीय आइसोलेशन (Gaushala Manager Portal)</h1>
                      <p className="text-xs text-slate-400 mt-1">रेस्क्यू वाहन ट्रैकिंग, गेट पर QR इनटेक स्कैन, कस्टडी ट्रांसफर तथा दैनिक आहार एवं मेडिकल रजिस्टर</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full">
                   <Activity className="w-4 h-4 text-teal-400" />
                   <span className="text-teal-400 font-bold text-xs">LIVE Telemetry Engine</span>
                </div>
             </div>

             <div className="flex flex-col xl:flex-row gap-6">
                
                {/* Center Column (Overview, Actions, Donors, Alerts) */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                   
                   {/* Gaushala Capacity Donut Chart */}
                   <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-2xl shadow-xl">
                      <h2 className="text-sm font-bold text-white mb-6">गौशाला क्षमता एवं प्रबंधन मॉड्यूल <span className="text-slate-400 font-normal text-xs">(Gaushala Overview)</span></h2>
                      <div className="flex flex-col items-center">
                         <div className="text-xs text-slate-300 mb-2 font-bold">गौशाला कुल क्षमता एवं शेड सूचकांक</div>
                         
                         {/* SVG Donut Chart */}
                         <div className="relative w-48 h-24 overflow-hidden mb-6 mt-4">
                            <svg className="w-48 h-48 absolute top-0 left-0" viewBox="0 0 100 100">
                               {/* Background tracks */}
                               <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
                               <path d="M 20 50 A 30 30 0 0 1 80 50" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
                               
                               {/* Value tracks (Outer: Orange 65%, Inner: Teal 85%) */}
                               <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="125" strokeDashoffset="40" strokeLinecap="round" />
                               <path d="M 20 50 A 30 30 0 0 1 80 50" fill="none" stroke="#14b8a6" strokeWidth="8" strokeDasharray="94" strokeDashoffset="15" strokeLinecap="round" />
                            </svg>
                            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end">
                               <div className="text-amber-500 font-black text-lg">325 / 500 (65%)</div>
                               <div className="text-[9px] text-slate-400">Total Capacity: 500 Bovines</div>
                            </div>
                         </div>

                         <div className="w-full flex justify-between text-xs border-t border-slate-700 pt-4 mt-2">
                            <div>
                               <div className="text-slate-400 mb-1">शेड A (नंदिनी शेड)</div>
                               <div className="text-teal-400 font-bold">120 (85%) <span className="text-amber-500 font-normal ml-2">उपलब्ध स्थान 35 स्थान</span></div>
                            </div>
                            <div className="text-right">
                               <div className="text-slate-400 mb-1">शेड B (कामधेनु शेड)</div>
                               <div className="text-cyan-400 font-bold">200 (65%) <span className="text-amber-500 font-normal ml-2">उपलब्ध स्थान 175 स्थान</span></div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Quick Actions Grid */}
                   <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col">
                      <h2 className="text-sm font-bold text-white mb-4">गौशाला क्षमता एवं प्रबंधन मॉड्यूल <span className="text-slate-400 font-normal text-xs">(Gaushala Overview)</span></h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
                         <button className="bg-teal-900/40 border border-teal-500/50 hover:bg-teal-900/60 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center transition-all group">
                            <Navigation className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform" />
                            <div className="text-xs font-bold text-teal-300">1. रेस्क्यू नेविगेशन</div>
                            <div className="text-[9px] text-teal-500/80">GPS Pin Route</div>
                         </button>
                         <button className="bg-[#0f172a] border border-slate-700 hover:border-slate-500 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center transition-all group">
                            <Truck className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
                            <div className="text-xs font-bold text-slate-300">2. लोडिंग व ट्रांसपोर्ट</div>
                            <div className="text-[9px] text-slate-500">Vehicle Tracking</div>
                         </button>
                         <button className="bg-[#0f172a] border border-slate-700 hover:border-slate-500 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center transition-all group">
                            <QrCode className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
                            <div className="text-xs font-bold text-slate-300">3. इनटेक QR स्कैन</div>
                            <div className="text-[9px] text-slate-500">Gate Tag Scan</div>
                         </button>
                         <button className="bg-[#0f172a] border border-slate-700 hover:border-slate-500 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center transition-all group">
                            <QrCode className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
                            <div className="text-xs font-bold text-slate-300">3. इनटेक QR स्कैन</div>
                            <div className="text-[9px] text-slate-500">Gate Tag Scan</div>
                         </button>
                         <button className="bg-[#0f172a] border border-slate-700 hover:border-slate-500 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center transition-all group">
                            <Shield className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                            <div className="text-xs font-bold text-slate-300">4. कस्टडी ट्रांसफर</div>
                            <div className="text-[9px] text-slate-500">Gaushala Custody</div>
                         </button>
                         <button className="bg-[#0f172a] border border-slate-700 hover:border-slate-500 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center transition-all group">
                            <Heart className="w-6 h-6 text-rose-500 group-hover:scale-110 transition-transform" />
                            <div className="text-xs font-bold text-slate-300">5. क्वारंटीन व फीड</div>
                            <div className="text-[9px] text-slate-500">30-Day Feed Log</div>
                         </button>
                      </div>
                   </div>

                   {/* Go-seva Donations */}
                   <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-2xl shadow-xl">
                      <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-500" />
                        गो-सेवा एवं लाइव गतिविधि <span className="text-slate-400 font-normal text-xs">(Donations & Activity)</span>
                      </h2>
                      <h3 className="text-xs font-bold text-rose-400 mb-3">2. गो-सेवा गोद लें एवं चारा/दाना दान पंजीकरण</h3>
                      
                      <form onSubmit={handleAddDonation} className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
                         <div className="sm:col-span-2">
                            <label className="text-[10px] text-slate-400 block mb-1">Donor Name</label>
                            <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="दानदाता का नाम" className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none" />
                         </div>
                         <div className="sm:col-span-2">
                            <label className="text-[10px] text-slate-400 block mb-1">Amount</label>
                            <input type="number" value={donorAmount} onChange={(e) => setDonorAmount(Number(e.target.value))} placeholder="1100" className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-rose-500 focus:outline-none" />
                         </div>
                         <div className="sm:col-span-1 flex items-end">
                            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-[#0f172a] font-bold py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1 transition-colors h-[30px]">
                               <PlusCircle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">दान पंजीकृत करें</span>
                            </button>
                         </div>
                      </form>

                      {donationSuccess && (
                         <div className="p-2 mb-3 rounded-lg bg-teal-500/20 text-teal-400 text-xs flex items-center gap-1.5 font-bold border border-teal-500/40">
                            <CheckCircle2 className="w-3.5 h-3.5" /> दान सफलतापूर्वक पंजीकृत!
                         </div>
                      )}

                      <div className="space-y-2">
                         {donations.map((d, i) => (
                            <div key={i} className="bg-[#0f172a] border border-slate-700 p-2.5 rounded-xl flex justify-between items-center">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-lg">{i===0?'🏅':'🥈'}</div>
                                  <div>
                                     <div className="text-xs font-bold text-white flex items-center gap-1">{d.name} <span className="text-[9px] text-amber-500">({d.badge})</span></div>
                                     <div className="text-[10px] text-slate-400">{d.item}</div>
                                  </div>
                               </div>
                               <div className="text-teal-400 font-mono font-bold text-sm">₹{d.amount}</div>
                            </div>
                         ))}
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center border-t border-slate-700 pt-3">
                         <span className="text-[10px] text-slate-400">Donation Figures: <span className="text-teal-400 font-bold">₹50</span></span>
                         <button className="bg-teal-500 hover:bg-teal-400 text-[#0f172a] font-bold py-1 px-3 rounded-lg text-[10px] flex items-center gap-1">
                            <PlusCircle className="w-3 h-3" /> दान पंजीकृत करें
                         </button>
                      </div>
                   </div>

                   {/* Live Real-time Monitoring & Alerts */}
                   <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col">
                      <h2 className="text-sm font-bold text-white mb-4">लाइव रियल-टाइम मॉनिटरिंग एवं अलर्ट्स</h2>
                      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                         
                         {/* Alert 1 */}
                         <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-xl">
                            <div className="flex gap-2">
                               <Navigation className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                               <div className="w-full">
                                  <div className="text-xs font-bold text-blue-400 flex justify-between">
                                     <span>लाइव रेस्क्यू इनबाउंड - रेस्क्यू नेविगेशन GPS Pin Route (लाइव)</span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 mt-1">लोकेशन: राष्ट्रीय राजमार्ग 44, सीहोर तिराहा | दूरी: 1.4 KM | ईटीए: 15 मिनट</div>
                                  <div className="w-full h-1 bg-blue-950 mt-2 rounded-full overflow-hidden">
                                     <div className="h-full bg-blue-500 w-[80%] rounded-full"></div>
                                  </div>
                               </div>
                            </div>
                         </div>

                         {/* Alert 2 */}
                         <div className="bg-teal-900/20 border border-teal-500/30 p-3 rounded-xl flex items-start justify-between">
                            <div className="flex gap-2">
                               <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                               <div>
                                  <div className="text-xs font-bold text-teal-400">इनटेक स्कैन सत्यापित (TAG-1004)</div>
                                  <div className="text-[10px] text-slate-400 mt-0.5">रेस्क्यू मालिक: (Vikram Verma)</div>
                               </div>
                            </div>
                            <span className="text-[10px] text-slate-500">2026-08-18</span>
                         </div>

                         {/* Alert 3 */}
                         <div className="bg-teal-900/20 border border-teal-500/30 p-3 rounded-xl flex items-start justify-between">
                            <div className="flex gap-2">
                               <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                               <div>
                                  <div className="text-xs font-bold text-teal-400">इनटेक स्कैन सत्यापित (TAG-1004)</div>
                                  <div className="text-[10px] text-slate-400 mt-0.5">रेस्क्यू मालिक: (Vikram Verma)</div>
                               </div>
                            </div>
                            <span className="text-[10px] text-slate-500">2026-08-10</span>
                         </div>
                      </div>
                   </div>

                </div>

                {/* Right Sidebar (Tag Details & Feed Log) */}
                <div className="w-full xl:w-[350px] bg-[#0f172a] rounded-2xl border border-slate-700 overflow-hidden flex flex-col shrink-0">
                   <div className="p-4 border-b border-slate-800 bg-[#1e293b]">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <div className="text-teal-400 font-bold text-sm">TAG-1004</div>
                            <div className="text-white font-bold">हरियाणवी (Haryanvi)</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">पूर्व मालिक: विक्रम वर्मा (Vikram Verma)</div>
                         </div>
                         <div className="bg-amber-900/40 text-amber-500 border border-amber-500/30 text-[9px] px-2 py-0.5 rounded-md">Gaushala Custody</div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-3 mb-1">Transfer Status: <span className="float-right">रेस्क्यू वाहन संख्या:</span></div>
                      <div className="flex items-center text-[11px] font-bold">
                         <span className="text-rose-400">'Violator'</span>
                         <span className="flex-1 border-t border-dashed border-slate-600 mx-2 relative"><span className="absolute -top-1.5 right-0 text-teal-400">→</span></span>
                         <span className="text-teal-400">'Gaushala Custody'</span>
                      </div>
                   </div>

                   <div className="flex border-b border-slate-800 text-xs font-bold bg-[#1e293b]">
                      <button className="flex-1 py-2.5 text-teal-400 border-b-2 border-teal-400 bg-teal-900/10">Isolation Status</button>
                      <button className="flex-1 py-2.5 text-slate-500 hover:text-slate-300">Feed Logs</button>
                      <button className="flex-1 py-2.5 text-slate-500 hover:text-slate-300">Medical Logs</button>
                   </div>

                   <div className="p-6 flex-1 flex flex-col">
                      <div className="text-center text-[10px] text-slate-400 font-bold tracking-widest mb-6">ISOLATION TIME-REMAINING</div>
                      <div className="flex justify-center mb-8">
                         {/* Circle Countdown */}
                         <div className="relative w-36 h-36">
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                               <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="6" />
                               <circle cx="50" cy="50" r="45" fill="none" stroke="#14b8a6" strokeWidth="6" strokeDasharray="283" strokeDashoffset="10" className="drop-shadow-[0_0_15px_rgba(20,184,166,0.6)]" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                               <span className="text-4xl font-black text-white">29</span>
                               <span className="text-xs text-slate-400">30 days</span>
                            </div>
                         </div>
                      </div>

                      <div className="text-xs font-bold text-teal-500 mb-3 uppercase tracking-wider">Daily Feed Log</div>
                      
                      <form onSubmit={handleAddFeedLog} className="flex gap-2 mb-4">
                         <input type="text" value={feedItem} onChange={e => setFeedItem(e.target.value)} placeholder="हरा चारा (पत्तापोट)" className="flex-1 bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white" />
                         <input type="number" value={feedQuantity} onChange={e => setFeedQuantity(e.target.value)} placeholder="12" className="w-16 bg-[#1e293b] border border-slate-700 rounded-lg px-2 py-2 text-xs text-white text-center" />
                         <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white rounded-lg px-3 py-2 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
                            <PlusCircle className="w-4 h-4 mr-1" /> <span className="text-[10px] font-bold">आहार जोड़ें</span>
                         </button>
                      </form>

                      <div className="space-y-2 mt-auto h-32 overflow-y-auto pr-1">
                         {feedLogs.map((log, idx) => (
                           <div key={idx} className="flex justify-between items-center text-[11px] p-2 bg-[#1e293b] border border-slate-800 rounded-lg">
                              <span className="text-slate-300">{log.item}</span>
                              <div className="flex items-center gap-3">
                                 <span className="text-teal-400 font-bold">{log.quantity}</span>
                                 <span className="text-slate-500">{log.date}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

             </div>

             {/* Rendering the existing GaushalaModule underneath for data preservation if needed */}
             <div className="mt-12 pt-8 border-t border-slate-800">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Legacy Data View</h3>
                <GaushalaModule animals={animals} />
             </div>
          </div>
       </div>
    </div>
  );
};