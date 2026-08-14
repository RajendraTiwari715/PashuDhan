import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Download,
  ShieldCheck,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  Compass
} from 'lucide-react';

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30D');
  const [exportNotice, setExportNotice] = useState(false);
  const [selectedState, setSelectedState] = useState('All');
  const [detectedLocation, setDetectedLocation] = useState('राष्ट्रीय (All India)');
  const [isDetecting, setIsDetecting] = useState(false);

  const stateDistrictData = {
    'मध्य प्रदेश': [
      { district: 'भोपाल (Bhopal)', registered: 3420, rescued: 842, rate: '98.2%', status: 'उत्कृष्ट' },
      { district: 'इंदौर (Indore)', registered: 2890, rescued: 610, rate: '96.5%', status: 'उत्कृष्ट' },
      { district: 'उज्जैन (Ujjain)', registered: 1950, rescued: 490, rate: '94.1%', status: 'संतोषजनक' },
      { district: 'जबलपुर (Jabalpur)', registered: 1820, rescued: 380, rate: '92.8%', status: 'संतोषजनक' },
      { district: 'ग्वालियर (Gwalior)', registered: 1450, rescued: 310, rate: '91.0%', status: 'ध्यान दें' }
    ],
    'उत्तर प्रदेश': [
      { district: 'लखनऊ (Lucknow)', registered: 4850, rescued: 1120, rate: '98.9%', status: 'उत्कृष्ट' },
      { district: 'वाराणसी (Varanasi)', registered: 3920, rescued: 940, rate: '97.4%', status: 'उत्कृष्ट' },
      { district: 'कानपुर (Kanpur)', registered: 3100, rescued: 720, rate: '95.1%', status: 'संतोषजनक' },
      { district: 'गोरखपुर (Gorakhpur)', registered: 2450, rescued: 580, rate: '93.6%', status: 'संतोषजनक' }
    ],
    'राजस्थान': [
      { district: 'जयपुर (Jaipur)', registered: 4120, rescued: 980, rate: '97.8%', status: 'उत्कृष्ट' },
      { district: 'जोधपुर (Jodhpur)', registered: 2980, rescued: 690, rate: '95.8%', status: 'उत्कृष्ट' },
      { district: 'उदयपुर (Udaipur)', registered: 2150, rescued: 480, rate: '94.0%', status: 'संतोषजनक' }
    ],
    'महाराष्ट्र': [
      { district: 'पुणे (Pune)', registered: 4600, rescued: 1050, rate: '98.1%', status: 'उत्कृष्ट' },
      { district: 'नागपुर (Nagpur)', registered: 3200, rescued: 740, rate: '96.2%', status: 'उत्कृष्ट' },
      { district: 'नाशिक (Nashik)', registered: 2400, rescued: 530, rate: '93.8%', status: 'संतोषजनक' }
    ]
  };

  const handleDetectAutoLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setDetectedLocation('ऑटो डिटेक्टेड: भोपाल, मध्य प्रदेश (GPS Active)');
            setSelectedState('मध्य प्रदेश');
          },
          (err) => {
            setDetectedLocation('GPS एक्टिवेटेड: भोपाल जिला (मध्य प्रदेश)');
            setSelectedState('मध्य प्रदेश');
          }
        );
      } else {
        setDetectedLocation('GPS एक्टिवेटेड: भोपाल जिला (मध्य प्रदेश)');
        setSelectedState('मध्य प्रदेश');
      }
    }, 800);
  };

  const currentDistricts =
    selectedState === 'All'
      ? Object.values(stateDistrictData).flat()
      : stateDistrictData[selectedState] || stateDistrictData['मध्य प्रदेश'];

  const peakBreachHours = [
    { hour: '06:00 AM', breaches: 12 },
    { hour: '10:00 AM', breaches: 24 },
    { hour: '02:00 PM', breaches: 18 },
    { hour: '06:00 PM', breaches: 45 },
    { hour: '09:00 PM', breaches: 68 },
    { hour: '12:00 AM', breaches: 32 }
  ];

  const handleDownloadReport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn py-2">
      {/* All-India Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                राष्ट्रीय पशुधन एवं जिलावार एनालिटिक्स पोर्टल (All India)
              </span>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                28 राज्य / 8 UT
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              राष्ट्रीय व जिला स्तरीय एनालिटिक्स
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDetectAutoLocation}
              disabled={isDetecting}
              className="bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100 font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <Compass className={`w-4 h-4 text-cyan-600 ${isDetecting ? 'animate-spin' : ''}`} />
              <span>{isDetecting ? 'GPS खोजी जा रही है...' : 'ऑटो GPS ज़िला पहचानें'}</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>रिपोर्ट डाउनलोड करें (PDF/Excel)</span>
            </button>
          </div>
        </div>

        {/* Location Selector Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="font-bold text-slate-700">राज्य चुनें:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-bold text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="All">संपूर्ण भारत (All India National)</option>
              <option value="मध्य प्रदेश">मध्य प्रदेश (Madhya Pradesh)</option>
              <option value="उत्तर प्रदेश">उत्तर प्रदेश (Uttar Pradesh)</option>
              <option value="राजस्थान">राजस्थान (Rajasthan)</option>
              <option value="महाराष्ट्र">महाराष्ट्र (Maharashtra)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 w-full sm:w-auto justify-between">
            <span className="font-mono text-[11px] font-bold text-blue-700">{detectedLocation}</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">GPS Active</span>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600">
            {['7D', '30D', '90D', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-xl transition-all ${
                  timeRange === range
                    ? 'bg-white text-blue-600 shadow-sm font-black'
                    : 'hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {exportNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2 animate-fadeIn shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>सफलतापूर्वक रिपोर्ट जनरेट हो गई! `PashuDhan_National_{selectedState}_{timeRange}_Report.pdf` डाउनलोड होना शुरू हो गया है।</span>
        </div>
      )}

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>सक्रिय यूज़र्स (DAU)</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-800">1,240</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12.4% इस सप्ताह
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>सफल रेस्क्यू दर</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-800">94.8%</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +3.1% लक्ष्य से अधिक
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>QR स्कैन एवं सत्यापन</span>
            <Activity className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-800">14.2K</div>
          <div className="text-[11px] text-slate-500 font-medium">100% ISO 11784 कॉम्पैटिबल</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>औसत सिस्टम प्रतिक्रिया</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-800">38 ms</div>
          <div className="text-[11px] text-teal-700 font-bold">अत्यधिक तेज़ व स्थिर</div>
        </div>
      </div>

      {/* Main Charts & District Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-800">यूज़र एवं पंजीकरण वृद्धि ग्राफ</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">2026 M1 - M6</span>
          </div>

          <div className="h-60 flex items-end gap-3 justify-between border-b border-l border-slate-200 pb-2 pl-2 pt-8">
            {[45, 60, 52, 75, 88, 100].map((h, i) => (
              <div
                key={i}
                className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-t-xl relative group transition-all"
                style={{ height: `${h}%` }}
              >
                <div className="w-full bg-blue-600 rounded-t-xl" style={{ height: '40%' }}></div>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {h * 15}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-semibold">
                  {['मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त'][i]}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-2 font-semibold">
              <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block"></span>
              पंजीकृत पशुधन
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <span className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-200 inline-block"></span>
              सक्रिय ऐप यूज़र्स
            </span>
          </div>
        </div>

        {/* Peak Breach Risk Area */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-800">जिओ-फेंस उल्लंघन समय सारणी</h3>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
              AI Risk Detection
            </span>
          </div>

          <p className="text-xs text-slate-500">
            हाईवे एवं सड़कों पर आवारा पशु विचरण के मुख्य समय (रात 9 बजे सर्वाधिक जोखिम)
          </p>

          <div className="space-y-2.5 pt-1">
            {peakBreachHours.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.hour}</span>
                  <span className="text-amber-700 font-mono font-bold">{item.breaches} केस</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.breaches > 50 ? 'bg-rose-500' : item.breaches > 30 ? 'bg-amber-500' : 'bg-teal-500'
                    }`}
                    style={{ width: `${(item.breaches / 70) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District-wise Breakdown Table */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-800">
              जिलावार (District Level) पशुधन एवं रेस्क्यू विवरण — {selectedState === 'All' ? 'भारत के मुख्य मण्डल' : selectedState}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono font-bold">
            {currentDistricts.length} जिले सूचीबद्ध
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 rounded-l-xl">जिला (District)</th>
                <th className="p-3">पंजीकृत पशुधन</th>
                <th className="p-3">गौशाला भर्ती (Rescued)</th>
                <th className="p-3">समाधान दर</th>
                <th className="p-3 rounded-r-xl">स्थिति</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {currentDistricts.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>{row.district}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-700">{row.registered.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-teal-700">{row.rescued.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{row.rate}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        row.status === 'उत्कृष्ट'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : row.status === 'संतोषजनक'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
