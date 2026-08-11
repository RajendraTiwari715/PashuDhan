import React, { useState, useEffect } from 'react';
import { Building2, Navigation, Truck, QrCode, ShieldCheck, HeartPulse, PlusCircle, Utensils, Activity, MapPin, RefreshCw, CheckCircle2 } from 'lucide-react';

export const GaushalaModule = ({ animals }) => {
  const gaushalaAnimals = animals.filter((a) => a.gaushalaRecord || a.priorViolationsCount >= 2);
  const [selectedAnimal, setSelectedAnimal] = useState(gaushalaAnimals[0] || animals[3]);
  const [activeStep, setActiveStep] = useState(1);
  const [newFeedType, setNewFeedType] = useState('हरा चारा (Napier Grass)');
  const [newFeedQty, setNewFeedQty] = useState(12);
  const [newDocName, setNewDocName] = useState('डॉ. आर.के. शर्मा');
  const [newDiagnosis, setNewDiagnosis] = useState('नियमित स्वास्थ्य जांच, तापमान सामान्य (38.5°C)।');

  // Live real-time telemetry state
  const [liveGps, setLiveGps] = useState({
    lat: 23.2599,
    lng: 77.4126,
    speedKmph: 42,
    address: 'राष्ट्रीय राजमार्ग 44, सीहोर तिराहा',
    driver: 'राजेश सिंह (वाहन MP-04-GAU-9012)'
  });

  const record = selectedAnimal?.gaushalaRecord;

  // Real-time telemetry ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveGps(prev => ({
        ...prev,
        lat: +(prev.lat + (Math.random() - 0.5) * 0.001).toFixed(4),
        lng: +(prev.lng + (Math.random() - 0.5) * 0.001).toFixed(4),
        speedKmph: Math.floor(35 + Math.random() * 15)
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleAddFeedLog = () => {
    if (!record) return;
    const todayStr = new Date().toISOString().split('T')[0];
    record.dailyFeedDetails.unshift({
      date: todayStr,
      feedType: newFeedType,
      quantityKg: newFeedQty
    });
    alert('दैनिक आहार विवरण गोशाला रजिस्टर में रियल-टाइम दर्ज हुआ!');
  };

  const handleAddHealthLog = () => {
    if (!record) return;
    const todayStr = new Date().toISOString().split('T')[0];
    record.healthLogs.unshift({
      date: todayStr,
      doctorName: newDocName,
      diagnosis: newDiagnosis
    });
    alert('स्वास्थ्य जांच एवं मेडिकल लॉग दर्ज हुआ!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Title */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">गोशाला प्रबंधन एवं कस्टडी ट्रांसफर मॉड्यूल</h2>
              <p className="text-xs text-slate-400 mt-1">रेस्क्यू नेविगेशन, लोडिंग-ट्रांसपोर्ट ट्रैकिंग, इनटेक स्कैन, कस्टडी व क्वारंटीन लाइव ट्रैक</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-2xl border border-slate-800">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-300 font-bold">LIVE Telemetry Engine</span>
          </div>
        </div>

        {/* Live Step Progress Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div
            onClick={() => setActiveStep(1)}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
              activeStep === 1
                ? 'bg-cyan-950/60 border-cyan-500 shadow-glow-cyan text-cyan-300 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Navigation className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">1. रेस्क्यू नेविगेशन</span>
            <span className="text-[9px] block opacity-80">GPS Pin Route</span>
          </div>

          <div
            onClick={() => setActiveStep(2)}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
              activeStep === 2
                ? 'bg-amber-950/60 border-amber-500 shadow-glow-amber text-amber-300 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Truck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">2. लोडिंग व ट्रांसपोर्ट</span>
            <span className="text-[9px] block opacity-80">Vehicle Tracking</span>
          </div>

          <div
            onClick={() => setActiveStep(3)}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
              activeStep === 3
                ? 'bg-emerald-950/60 border-emerald-500 shadow-glow-emerald text-emerald-300 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <QrCode className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">3. इनटेक QR स्कैन</span>
            <span className="text-[9px] block opacity-80">Gate Tag Scan</span>
          </div>

          <div
            onClick={() => setActiveStep(4)}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
              activeStep === 4
                ? 'bg-purple-950/60 border-purple-500 shadow-glow-purple text-purple-300 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">4. कस्टडी ट्रांसफर</span>
            <span className="text-[9px] block opacity-80">Gaushala Custody</span>
          </div>

          <div
            onClick={() => setActiveStep(5)}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition-all col-span-2 sm:col-span-1 ${
              activeStep === 5
                ? 'bg-rose-950/60 border-rose-500 shadow-glow-rose text-rose-300 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <HeartPulse className="w-4 h-4 text-rose-400 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">5. क्वारंटीन व फीड</span>
            <span className="text-[9px] block opacity-80">30-Day Feed Log</span>
          </div>
        </div>
      </div>

      {/* Live Real-Time Telemetry Dashboard for Active Step */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 space-y-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              लाइव रियल-टाइम मॉनिटरिंग कंसोल (Step {activeStep}/5 Active)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
            GPS: {liveGps.lat}, {liveGps.lng}
          </span>
        </div>

        {activeStep === 1 && (
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2 text-xs">
            <div className="font-bold text-cyan-300 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>1. रेस्क्यू नेविगेशन GPS Pin Route (लाइव)</span>
            </div>
            <p className="text-slate-300">लोकेशन: {liveGps.address} | दूरी: 1.4 KM शेष | ईटीए: 6 मिनट</p>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-cyan-400 h-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2 text-xs">
            <div className="font-bold text-amber-300 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>2. लोडिंग व ट्रांसपोर्ट Vehicle Live Tracking</span>
            </div>
            <p className="text-slate-300">चालक: {liveGps.driver} | गति: {liveGps.speedKmph} KM/H | सुरक्षा लॉक: Engaged</p>
          </div>
        )}

        {activeStep === 3 && (
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 text-xs">
            <div className="font-bold text-emerald-300 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>3. इनटेक QR स्कैन Gate Tag Verification</span>
            </div>
            <p className="text-slate-300">गेट टैग सेंसर status: Ready for Tag Scanning | RFID ISO 11784 Verified</p>
          </div>
        )}

        {activeStep === 4 && (
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2 text-xs">
            <div className="font-bold text-purple-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>4. कस्टडी ट्रांसफर Legal Gaushala Transfer Protocol</span>
            </div>
            <p className="text-slate-300">कानूनी कस्टडी: श्री गोपाल गोशाला भोपाल | हस्तांतरण डिजिटल हस्ताक्षर: OK</p>
          </div>
        )}

        {activeStep === 5 && (
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2 text-xs">
            <div className="font-bold text-rose-300 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>5. क्वारंटीन व फीड 30-Day Isolation Tracker</span>
            </div>
            <p className="text-slate-300">क्वारंटीन दिवस: 29/30 दिन शेष | दैनिक पोषण एवं चिकित्सा रजिस्टर सक्रिय</p>
          </div>
        )}
      </div>

      {/* Gaushala Cattle List & Medical/Feed Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Cattle Selector */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            गोशाला में भर्ती एवं कस्टडी पशु सूची
          </h3>

          <div className="space-y-3">
            {gaushalaAnimals.map((animal) => (
              <div
                key={animal.id}
                onClick={() => setSelectedAnimal(animal)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedAnimal?.id === animal.id
                    ? 'bg-rose-950/40 border-rose-500/60 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">{animal.tagId}</span>
                  <span className="bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    Gaushala Custody
                  </span>
                </div>
                <div className="text-sm font-bold text-white mt-1">{animal.breed}</div>
                <div className="text-xs text-slate-400">पूर्व मालिक: {animal.owner.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Selected Animal Details & Feed/Medical Logs */}
        {selectedAnimal && (
          <div className="md:col-span-2 space-y-6">
            
            {/* Overview Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedAnimal.breed} (TAG: {selectedAnimal.tagId})
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    कस्टडी ट्रांसफर स्टेटस: <span className="text-emerald-400 font-bold font-mono">'Violator' ➔ 'Gaushala Custody'</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">30-दिवसीय आइसोलेशन</span>
                  <span className="text-lg font-black text-rose-400 font-mono">
                    {record?.quarantineDaysRemaining || 29} दिन शेष
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">गोशाला संस्थान:</span>
                  <span className="font-bold text-white">{record?.gaushalaName || 'श्री गोपाल गोशाला भोपाल'}</span>
                  <span className="text-cyan-400 font-mono block">फोन: {record?.gaushalaPhone}</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">रेस्क्यू वाहन संख्या:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {record?.transportVehicleNo || 'MP-04-GAU-9012'}
                  </span>
                  <span className="text-slate-400 block">गेट इनटेक स्कैन: Verified</span>
                </div>
              </div>
            </div>

            {/* Daily Feed Log */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-700 space-y-4">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" />
                दैनिक आहार एवं पोषण लॉग (Daily Feed Log)
              </h4>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newFeedType}
                  onChange={(e) => setNewFeedType(e.target.value)}
                  placeholder="आहार प्रकार (e.g. हरा चारा + भूसा)"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                />
                <input
                  type="number"
                  value={newFeedQty}
                  onChange={(e) => setNewFeedQty(Number(e.target.value))}
                  placeholder="मात्रा (Kg)"
                  className="w-24 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono"
                />
                <button
                  onClick={handleAddFeedLog}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>आहार जोड़ें</span>
                </button>
              </div>

              <div className="space-y-2">
                {record?.dailyFeedDetails?.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-300">{f.feedType}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-emerald-400">{f.quantityKg} Kg</span>
                      <span className="text-[10px] text-slate-500 font-mono">{f.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quarantine Medical Log */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-700 space-y-4">
              <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-cyan-400" />
                30-दिवसीय स्वास्थ्य एवं चिकित्सा लॉग (Quarantine Medical Log)
              </h4>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    placeholder="चिकित्सक का नाम"
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newDiagnosis}
                    onChange={(e) => setNewDiagnosis(e.target.value)}
                    placeholder="स्वास्थ्य टिप्पणी / निदान"
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>
                <button
                  onClick={handleAddHealthLog}
                  className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>मेडिकल चेकअप लॉग करें</span>
                </button>
              </div>

              <div className="space-y-2">
                {record?.healthLogs?.map((h, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-semibold text-cyan-300">
                      <span>{h.doctorName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{h.date}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{h.diagnosis}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};