import React, { useState } from 'react';
import { GaushalaModule } from './GaushalaModule';
import { GaushalaLiveTrackingMap } from './GaushalaLiveTrackingMap';
import { GaushalaLiveTrackingModal } from './GaushalaLiveTrackingModal';
import {
  Building2,
  Heart,
  PlusCircle,
  CheckCircle2,
  Navigation,
  Truck,
  QrCode,
  Shield,
  FileText,
  Bell,
  Search,
  Activity,
  User,
  ChevronRight,
  Radio,
  Maximize2
} from 'lucide-react';

export const GaushalaManagerDashboard = ({ animals }) => {
  const [donorName, setDonorName] = useState('');
  const [donorAmount, setDonorAmount] = useState(1100);
  const [donations, setDonations] = useState([
    { name: 'श्री जगदीश अग्रवाल', amount: 5100, item: '10 क्विंटल हरा चारा', date: '2026-08-10', badge: '🥇 स्वर्ण दानदाता' },
    { name: 'श्रीमती संगीता शर्मा', amount: 2100, item: 'गो-सेवा गोद ग्रहण (सप्ताह)', date: '2026-08-11', badge: '🥈 रजत दानदाता' }
  ]);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const [isLiveTrackingModalOpen, setIsLiveTrackingModalOpen] = useState(false);
  const [activeTrackingUnit, setActiveTrackingUnit] = useState('ALPHA-1');

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
  const currentRescuedCount = 325;
  const occupancyPercent = Math.round((currentRescuedCount / totalCapacity) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100 shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-3 py-0.5 rounded-full font-bold">
                  गोशाला मैनेजर पोर्टल
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE telemetry active
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800">
                गोशाला डैशबोर्ड
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left / Main Section (8 cols on XL) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Gaushala Capacity Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800 mb-1">गौशाला क्षमता एवं शेड सूचकांक</h2>
                <p className="text-xs text-slate-500 mb-4">कुल गौवंश आवास स्थिति</p>

                {/* SVG Donut Chart */}
                <div className="flex flex-col items-center justify-center relative py-2">
                  <div className="relative w-44 h-24 overflow-hidden mb-2">
                    <svg className="w-44 h-44 absolute top-0 left-0" viewBox="0 0 100 100">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 20 50 A 30 30 0 0 1 80 50" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />

                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="125" strokeDashoffset="40" strokeLinecap="round" />
                      <path d="M 20 50 A 30 30 0 0 1 80 50" fill="none" stroke="#0d9488" strokeWidth="8" strokeDasharray="94" strokeDashoffset="15" strokeLinecap="round" />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end">
                      <div className="text-amber-600 font-black text-xl">{currentRescuedCount} / {totalCapacity}</div>
                      <div className="text-[10px] text-slate-500 font-bold">({occupancyPercent}% ऑक्यूपेंसी)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-slate-100 mt-2">
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                  <div className="text-slate-500 text-[10px]">शेड A (नंदिनी)</div>
                  <div className="text-teal-700 font-bold mt-0.5">120 (85%)</div>
                  <div className="text-amber-600 text-[10px] font-semibold">शेष 35 स्थान</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                  <div className="text-slate-500 text-[10px]">शेड B (कामधेनु)</div>
                  <div className="text-cyan-700 font-bold mt-0.5">200 (65%)</div>
                  <div className="text-amber-600 text-[10px] font-semibold">शेष 175 स्थान</div>
                </div>
              </div>
            </div>

          {/* Donations Form & List */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>गो-सेवा एवं दान पंजीकरण (Donations & Activity)</span>
              </h2>
            </div>

            <form onSubmit={handleAddDonation} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">दानदाता का नाम</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="उदा. श्री रमेश जी"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">राशि (₹)</label>
                <input
                  type="number"
                  value={donorAmount}
                  onChange={(e) => setDonorAmount(Number(e.target.value))}
                  placeholder="1100"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>जोड़ें</span>
                </button>
              </div>
            </form>

            {donationSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs flex items-center gap-2 font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>दान सफलतापूर्वक पंजीकृत हो गया!</span>
              </div>
            )}

            <div className="space-y-2 pt-2">
              {donations.map((d, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm">
                      {i === 0 ? '🥇' : '🥈'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        {d.name} <span className="text-[10px] text-amber-600 font-semibold">({d.badge})</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{d.item}</div>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-mono font-bold text-sm">₹{d.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Alerts */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-800">लाइव रियल-टाइम मॉनिटरिंग एवं अलर्ट्स</h2>
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-2xl">
                <div className="flex gap-2.5">
                  <Navigation className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-blue-800">
                        लाइव रेस्क्यू इनबाउंड - रेस्क्यू नेविगेशन GPS Pin Route (लाइव)
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      लोकेशन: राष्ट्रीय राजमार्ग 44, सीहोर तिराहा | दूरी: 1.4 KM | ईटीए: 6 मिनट (वाहन: MP-04-GAU-9012)
                    </div>
                    <div className="w-full h-1.5 bg-blue-100 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[78%] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl flex items-start justify-between">
                <div className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-emerald-800">इनटेक स्कैन सत्यापित (TAG-1004)</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">रेस्क्यू मालिक: Vikram Verma</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">2026-08-18</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (4 cols on XL): Custody, Isolation & Feed Log */}
        <div className="xl:col-span-4 space-y-6">
          {/* Active Bovine Custody Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  TAG-1004
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1.5">हरियाणवी (Haryanvi)</h3>
                <p className="text-xs text-slate-500">पूर्व मालिक: विक्रम वर्मा</p>
              </div>
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2 py-0.5 rounded-md font-bold">
                Gaushala Custody
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div className="text-[10px] text-slate-400 font-bold mb-1">CUSTODY TRANSFER STATUS:</div>
              <div className="flex items-center justify-between font-bold">
                <span className="text-rose-600">'Violator'</span>
                <span className="text-slate-400">→</span>
                <span className="text-emerald-600">'Gaushala Custody'</span>
              </div>
            </div>

            {/* Countdown Meter */}
            <div className="text-center pt-2">
              <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-3">
                30-Day Isolation Time-Remaining
              </div>
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="8"
                      strokeDasharray="264"
                      strokeDashoffset="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-800">29</span>
                    <span className="text-[10px] text-slate-400 font-semibold">/ 30 DAYS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed Log Form */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">दैनिक आहार (Daily Feed Log)</h4>
              <form onSubmit={handleAddFeedLog} className="flex gap-2">
                <input
                  type="text"
                  value={feedItem}
                  onChange={(e) => setFeedItem(e.target.value)}
                  placeholder="उदा. हरा चारा"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                />
                <input
                  type="number"
                  value={feedQuantity}
                  onChange={(e) => setFeedQuantity(e.target.value)}
                  placeholder="Kg"
                  className="w-16 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-800 text-center focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-500 text-white rounded-xl px-3 py-2 flex items-center justify-center shrink-0 font-bold text-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
              </form>

              <div className="space-y-2 max-h-36 overflow-y-auto">
                {feedLogs.map((log, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-slate-700 font-medium">{log.item}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-teal-700 font-mono font-bold">{log.quantity}</span>
                      <span className="text-slate-400 text-[10px]">{log.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Data View */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          गोशाला पंजीकृत पशु रिकॉर्ड (Gaushala Records)
        </h3>
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <GaushalaModule animals={animals} />
        </div>
      </div>

      {/* Live Tracking Modal */}
      <GaushalaLiveTrackingModal
        isOpen={isLiveTrackingModalOpen}
        onClose={() => setIsLiveTrackingModalOpen(false)}
        initialUnitId={activeTrackingUnit}
      />
    </div>
  );
};