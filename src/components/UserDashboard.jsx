import React, { useState } from 'react';
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
  Building2,
  Phone,
  MapPin,
  Heart,
  Truck,
  Users,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const UserDashboard = ({
  onOpenScanner,
  onOpenComplaintForm,
  onSelectAnimal,
  complaints = [],
  animals = []
}) => {
  const { t, language } = useLanguage();
  const [sosDispatched, setSosDispatched] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('all'); // 'all', 'leaderboard', 'gaushala', 'analytics'

  const handleSosAmbulanceDispatch = () => {
    setSosDispatched(true);
    alert(
      language === 'hi'
        ? '🚨 पशु आपातकालीन 1962 एम्बुलेंस को आपकी वर्तमान जीपीएस लोकेशन स्वतः डिस्पैच कर दी गई है! चालक को अलर्ट प्रेषित।'
        : '🚨 Animal Emergency 1962 Ambulance has been auto-dispatched to your GPS coordinates! Driver alerted.'
    );
    setTimeout(() => setSosDispatched(false), 6000);
  };

  const leaderboard = [
    { rank: 1, name: language === 'hi' ? 'राहुल राजपूत' : 'Rahul Rajput', city: language === 'hi' ? 'भोपाल (Bhopal)' : 'Bhopal', points: 520, rescues: 18, reports: 24, badge: language === 'hi' ? '🏆 जीव रक्षा रत्न (Diamond)' : '🏆 Diamond Rescuer', level: 'Level 5' },
    { rank: 2, name: language === 'hi' ? 'नीलम पांडे' : 'Neelam Pandey', city: language === 'hi' ? 'इंदौर (Indore)' : 'Indore', points: 440, rescues: 14, reports: 19, badge: language === 'hi' ? '🥇 गो-सेवा शिरोमणि (Gold)' : '🥇 Gold Guardian', level: 'Level 4' },
    { rank: 3, name: language === 'hi' ? 'सचिन वर्मा' : 'Sachin Verma', city: language === 'hi' ? 'उज्जैन (Ujjain)' : 'Ujjain', points: 360, rescues: 11, reports: 15, badge: language === 'hi' ? '🥈 गौरक्षक मित्र (Silver)' : '🥈 Silver Protector', level: 'Level 3' },
    { rank: 4, name: language === 'hi' ? 'अमित मेहरा' : 'Amit Mehra', city: language === 'hi' ? 'सीहोर (Sehore)' : 'Sehore', points: 280, rescues: 8, reports: 12, badge: language === 'hi' ? '⭐ सक्रिय गो-सेवक' : '⭐ Active Volunteer', level: 'Level 2' },
    { rank: 5, name: language === 'hi' ? 'संगीता शर्मा' : 'Sangeeta Sharma', city: language === 'hi' ? 'जबलपुर (Jabalpur)' : 'Jabalpur', points: 210, rescues: 6, reports: 9, badge: language === 'hi' ? '⭐ सक्रिय गो-सेवक' : '⭐ Active Volunteer', level: 'Level 2' }
  ];

  const gaushalasList = [
    {
      id: 'GSH-01',
      name: language === 'hi' ? 'श्री गोपाल गोशाला एवं जीव रक्षा केंद्र' : 'Shri Gopal Gaushala & Animal Welfare Centre',
      district: language === 'hi' ? 'भोपाल (Bhopal)' : 'Bhopal',
      address: language === 'hi' ? 'गांधी नगर, एयरपोर्ट रोड, भोपाल' : 'Gandhi Nagar, Airport Road, Bhopal',
      incharge: language === 'hi' ? 'महंत रामदास (प्रबंधक)' : 'Mahant Ramdas (Manager)',
      phone: '+91 94250 11890',
      totalCapacity: 500,
      occupied: 385,
      isolationBeds: 40,
      availableBeds: 115,
      doctorAvailable: true,
      hasAmbulance: true,
      distanceKm: 3.2
    },
    {
      id: 'GSH-02',
      name: language === 'hi' ? 'आनंद धाम कामधेनु गो-अभयारण्य' : 'Anand Dham Kamdhenu Sanctuary',
      district: language === 'hi' ? 'भोपाल (Bhopal)' : 'Bhopal',
      address: language === 'hi' ? 'होशंगाबाद रोड, मिसरोद, भोपाल' : 'Hoshangabad Road, Misrod, Bhopal',
      incharge: language === 'hi' ? 'सुरेश सोनी' : 'Suresh Soni',
      phone: '+91 98263 77800',
      totalCapacity: 350,
      occupied: 260,
      isolationBeds: 25,
      availableBeds: 90,
      doctorAvailable: true,
      hasAmbulance: true,
      distanceKm: 5.8
    },
    {
      id: 'GSH-03',
      name: language === 'hi' ? 'नंदिनी गोशाला सेवा ट्रस्ट' : 'Nandini Gaushala Seva Trust',
      district: language === 'hi' ? 'सीहोर (Sehore)' : 'Sehore',
      address: language === 'hi' ? 'राष्ट्रीय राजमार्ग 44 तिराहा, सीहोर' : 'NH-44 Junction, Sehore',
      incharge: language === 'hi' ? 'पंडित रविशंकर शास्त्री' : 'Pt. Ravishankar Shastri',
      phone: '+91 98260 33441',
      totalCapacity: 400,
      occupied: 310,
      isolationBeds: 30,
      availableBeds: 90,
      doctorAvailable: true,
      hasAmbulance: false,
      distanceKm: 8.4
    }
  ];

  const weeklyAnalytics = [
    { day: language === 'hi' ? 'सोम' : 'Mon', rescued: 14, tagLinked: 28, height: '55%' },
    { day: language === 'hi' ? 'मंगल' : 'Tue', rescued: 19, tagLinked: 34, height: '70%' },
    { day: language === 'hi' ? 'बुध' : 'Wed', rescued: 12, tagLinked: 22, height: '45%' },
    { day: language === 'hi' ? 'गुरु' : 'Thu', rescued: 25, tagLinked: 45, height: '90%' },
    { day: language === 'hi' ? 'शुक्र' : 'Fri', rescued: 22, tagLinked: 38, height: '80%' },
    { day: language === 'hi' ? 'शनि' : 'Sat', rescued: 30, tagLinked: 52, height: '100%' },
    { day: language === 'hi' ? 'रवि' : 'Sun', rescued: 18, tagLinked: 31, height: '65%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>{language === 'hi' ? 'सनातनी डिजिटल गोवंश रक्षा मंच' : 'Digital Livestock Protection Platform'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 leading-tight tracking-tight">
              {t('app_name')} - {language === 'hi' ? 'नागरिक डैशबोर्ड' : 'Citizen Dashboard'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'सड़क पर घायल या लावारिस गोवंश की तत्काल सहायता करें, QR कान टैग स्कैन करें, पास की गौशाला खोजें एवं गौरक्षा में योगदान दें।'
                : 'Help injured or stray cattle immediately, scan ear-tag QR codes, find nearby shelters, and participate in rescue operations.'}
            </p>
          </div>

          {/* Quick Impact Badges */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <div className="text-emerald-600 font-mono font-black text-xl">1,240+</div>
              <div className="text-[10px] text-slate-500 font-bold">
                {language === 'hi' ? 'पंजीकृत गोवंश' : 'Registered Cattle'}
              </div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <div className="text-cyan-600 font-mono font-black text-xl">942+</div>
              <div className="text-[10px] text-slate-500 font-bold">
                {language === 'hi' ? 'सफल रेस्क्यू' : 'Successful Rescues'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOS Ambulance Bar - Highly Visible */}
      <div className="bg-rose-50 border border-rose-200 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-white text-rose-600 shadow-sm border border-rose-100 animate-pulse shrink-0">
            <Siren className="w-7 h-7" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-black text-rose-800">
              {language === 'hi' ? 'पशु आपातकालीन 1962 SOS एम्बुलेंस' : 'Animal Emergency 1962 SOS Ambulance'}
            </div>
            <div className="text-xs text-rose-600 font-medium">
              {language === 'hi'
                ? 'सड़क पर गंभीर रूप से घायल पशु हेतु तत्काल जीपीएस रेस्क्यू वाहन बुलाएं'
                : 'Request emergency GPS rescue vehicle for severely injured stray animals'}
            </div>
          </div>
        </div>

        <button
          onClick={handleSosAmbulanceDispatch}
          disabled={sosDispatched}
          className={`w-full sm:w-auto font-black px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
            sosDispatched
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
          }`}
        >
          <Siren className="w-4 h-4" />
          <span>
            {sosDispatched
              ? (language === 'hi' ? '✓ एम्बुलेंस रवाना हो चुकी है' : '✓ Ambulance Dispatched')
              : (language === 'hi' ? '🚨 तत्काल 1962 एम्बुलेंस बुलाएं' : '🚨 Call 1962 Ambulance')}
          </span>
        </button>
      </div>

      {/* Services Grid (Umang Style Navigation) */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-base font-bold text-slate-800">
            {language === 'hi' ? 'मुख्य सेवाएँ एवं नियंत्रण' : 'Core Services & Controls'}
          </h2>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveViewTab('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${activeViewTab === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'}`}
            >
              {language === 'hi' ? 'सभी (All)' : 'All'}
            </button>
            <button
              onClick={() => setActiveViewTab('leaderboard')}
              className={`px-3 py-1 rounded-lg transition-colors ${activeViewTab === 'leaderboard' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500'}`}
            >
              {language === 'hi' ? 'लीडरबोर्ड' : 'Leaderboard'}
            </button>
            <button
              onClick={() => setActiveViewTab('gaushala')}
              className={`px-3 py-1 rounded-lg transition-colors ${activeViewTab === 'gaushala' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-500'}`}
            >
              {language === 'hi' ? 'गौशाला' : 'Gaushala'}
            </button>
            <button
              onClick={() => setActiveViewTab('analytics')}
              className={`px-3 py-1 rounded-lg transition-colors ${activeViewTab === 'analytics' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}`}
            >
              {language === 'hi' ? 'आंकड़े' : 'Analytics'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={onOpenScanner}
            className="flex flex-col items-center justify-center gap-3 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group"
          >
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-slate-700 text-center">{t('scan_qr')}</span>
          </button>

          <button
            onClick={() => onOpenComplaintForm()}
            className="flex flex-col items-center justify-center gap-3 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group"
          >
            <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-slate-700 text-center">{t('file_complaint')}</span>
          </button>

          <button
            onClick={() => setActiveViewTab('leaderboard')}
            className={`flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all group ${
              activeViewTab === 'leaderboard' ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-400/20' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-slate-700 text-center">
              {language === 'hi' ? 'गौरक्षा लीडरबोर्ड' : 'Leaderboard'}
            </span>
          </button>
          
          <button
            onClick={() => setActiveViewTab('gaushala')}
            className={`flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all group ${
              activeViewTab === 'gaushala' ? 'bg-rose-50/60 border-rose-300 ring-2 ring-rose-400/20' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-13 h-13 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-slate-700 text-center">
              {language === 'hi' ? 'गौशाला व आंकड़े' : 'Gaushala & Stats'}
            </span>
          </button>
        </div>
      </div>

      {/* SECTION 1: GAURAKSHA LEADERBOARD & REWARD POINTS */}
      {(activeViewTab === 'all' || activeViewTab === 'leaderboard') && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <span>🏆 गौरक्षा सेवा लीडरबोर्ड (Hero Champions)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  सक्रिय रिपोर्टिंग, घायल पशु सहायता एवं गो-सेवा में अग्रणी नागरिक
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs flex items-center gap-3 self-start sm:self-auto">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>+50 अंक / रिपोर्ट</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5 font-bold text-blue-700">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>+100 अंक / 1962 रेस्क्यू</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top 5 Leaderboard Table */}
            <div className="lg:col-span-8 space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    user.rank === 1
                      ? 'bg-amber-50/70 border-amber-200 shadow-xs'
                      : user.rank === 2
                      ? 'bg-slate-50/90 border-slate-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl font-black flex items-center justify-center text-sm shrink-0 ${
                        user.rank === 1
                          ? 'bg-amber-500 text-white shadow-xs'
                          : user.rank === 2
                          ? 'bg-slate-300 text-slate-800'
                          : user.rank === 3
                          ? 'bg-amber-700/80 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {user.rank}
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-2">
                        <span>{user.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({user.city})</span>
                      </div>
                      <div className="text-[11px] text-amber-800 font-bold flex items-center gap-1.5 mt-0.5">
                        <span>{user.badge}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 font-semibold">{user.rescues} रेस्क्यू पूर्ण</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono font-black text-sm text-emerald-600">{user.points} अंक</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{user.level}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Your Impact Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-emerald-50/80 via-white to-cyan-50/80 p-5 rounded-2xl border border-emerald-200 flex flex-col justify-between space-y-4 shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>आपकी गौरक्षा रैंक</span>
                </div>
                <div className="text-2xl font-black text-slate-800">Rank #12 (नागरिक)</div>
                <p className="text-xs text-slate-500 mt-1">
                  आपने 2 लावारिस गोवंश की सहायता की है। अगले स्तर <strong>'गो-सेवा शिरोमणि'</strong> हेतु केवल 90 अंक शेष!
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>प्रगति स्तर (Progress)</span>
                  <span className="text-emerald-600 font-mono">160 / 250 PTS</span>
                </div>
                <div className="w-full h-2.5 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 w-[64%] rounded-full"></div>
                </div>
              </div>

              <button
                onClick={() => onOpenComplaintForm()}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <PlusCircleIcon className="w-4 h-4" />
                <span>नया रेस्क्यू रिपोर्ट करें (+50 Pts)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: GAUSHALA DIRECTORY & BED CAPACITY */}
      {(activeViewTab === 'all' || activeViewTab === 'gaushala') && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  क्षेत्रीय गौशाला नेटवर्क एवं लाइव बेड क्षमता (Gaushala Directory)
                </h3>
                <p className="text-xs text-slate-500">
                  निकटतम मान्यता प्राप्त गौशालाओं में उपलब्ध स्थान, आइसोलेशन वार्ड एवं संपर्क विवरण
                </p>
              </div>
            </div>

            <div className="text-xs font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-full self-start sm:self-auto">
              कुल 3 गौशालाएँ सक्रिय
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gaushalasList.map((g) => {
              const occupancyPct = Math.round((g.occupied / g.totalCapacity) * 100);
              return (
                <div
                  key={g.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        {g.district}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" /> {g.distanceKm} KM
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-800 leading-snug">
                      {g.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {g.address}
                    </p>

                    {/* Capacity bar */}
                    <div className="pt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-semibold">आवास क्षमता ({occupancyPct}% भरी)</span>
                        <span className="font-bold text-emerald-700">{g.occupied} / {g.totalCapacity}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${occupancyPct > 85 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${occupancyPct}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold">
                        {g.availableBeds} स्थान रिक्त | {g.isolationBeds} आइसोलेशन वार्ड
                      </div>
                    </div>

                    {/* Facilities badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                      {g.doctorAvailable && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                          ✓ पशु चिकित्सक
                        </span>
                      )}
                      {g.hasAmbulance && (
                        <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-semibold">
                          🚑 एम्बुलेंस सुविधा
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${g.phone}`}
                      className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>कॉल करें</span>
                    </a>

                    <button
                      onClick={() => alert(`गौशाला "${g.name}" का नेविगेशन मानचित्र खुल रहा है...`)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>दिशा देखें</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: REAL-TIME ANALYTICS & IMPACT METRICS */}
      {(activeViewTab === 'all' || activeViewTab === 'analytics') && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  सार्वजनिक गोवंश रक्षा आंकड़े एवं साप्ताहिक प्रभाव (Public Impact Stats)
                </h3>
                <p className="text-xs text-slate-500">
                  क्षेत्रीय स्तर पर गोवंश सहायता, टैगिंग एवं एम्बुलेंस डिस्पैच का वास्तविक प्रदर्शन
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full self-start sm:self-auto">
              साप्ताहिक अपडेटेड
            </span>
          </div>

          {/* 4 Analytics KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-slate-500 text-xs font-semibold">कुल पंजीकृत गोवंश</div>
              <div className="text-2xl font-black text-slate-800 font-mono">1,248</div>
              <div className="text-[10px] text-emerald-600 font-bold">↑ 12% इस माह वृद्धि</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-slate-500 text-xs font-semibold">सफल एम्बुलेंस रेस्क्यू</div>
              <div className="text-2xl font-black text-cyan-700 font-mono">942</div>
              <div className="text-[10px] text-cyan-600 font-bold">1962 हेल्पलाइन द्वारा</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-slate-500 text-xs font-semibold">औसत रिस्पांस समय</div>
              <div className="text-2xl font-black text-amber-700 font-mono">8.4 Min</div>
              <div className="text-[10px] text-amber-600 font-bold">भोपाल व इंदौर संभाग</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-slate-500 text-xs font-semibold">शिकायत समाधान दर</div>
              <div className="text-2xl font-black text-emerald-700 font-mono">98.4%</div>
              <div className="text-[10px] text-emerald-600 font-bold">24-48 घंटे के भीतर</div>
            </div>
          </div>

          {/* Weekly Interactive Bar Chart */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>साप्ताहिक रेस्क्यू एवं टैगिंग दर (Mon - Sun)</span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> रेस्क्यू
                </span>
                <span className="flex items-center gap-1.5 text-cyan-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> टैगिंग
                </span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-6 items-end h-40 border-b border-slate-200 pb-2">
              {weeklyAnalytics.map((w, idx) => (
                <div key={idx} className="flex flex-col items-center h-full justify-end group">
                  <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono mb-1">
                    {w.rescued}
                  </div>
                  <div className="w-full max-w-[28px] bg-slate-200 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-lg transition-all group-hover:brightness-110"
                      style={{ height: w.height }}
                    ></div>
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 mt-2">{w.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Helpful Info Alert Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200 shadow-xs">
        <div className="flex items-center gap-2.5 mb-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-800 text-sm">गो-सेवा एवं नागरिक जागरूकता संदेश</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          पशु-धन पोर्टल का उद्देश्य आवारा व बेसहारा गोवंश को सुरक्षित गौशाला में पहुँचाना, पशुपालकों के गोवंश की GPS मॉनिटरिंग करना तथा 1962 पशु एम्बुलेंस के माध्यम से समय पर चिकित्सा सहायता उपलब्ध कराना है। किसी भी आपातकाल में 1962 बटन दबाकर सहायता प्राप्त करें।
        </p>
      </div>

    </div>
  );
};

const PlusCircleIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);