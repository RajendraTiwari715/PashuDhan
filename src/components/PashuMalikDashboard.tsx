import React, { useState } from 'react';
import type { Animal } from '../types';
import { getAnimalsByOwnerPhone } from '../services/storage';
import { GeoFenceMap } from './GeoFenceMap';
import { QRCodeSVG } from 'qrcode.react';
import { User, AlertTriangle, ArrowRight, Milk, CalendarCheck, Stethoscope, CheckCircle2 } from 'lucide-react';


interface PashuMalikDashboardProps {
  userPhone: string;
  onSelectAnimal: (animal: Animal) => void;
  onOpenComplaint: (animal?: Animal) => void;
}

export const PashuMalikDashboard: React.FC<PashuMalikDashboardProps> = ({
  userPhone,
  onSelectAnimal,
  onOpenComplaint
}) => {
  const ownedAnimals = getAnimalsByOwnerPhone(userPhone);
  const primaryAnimal = ownedAnimals[0];

  const [dailyMilkLiters, setDailyMilkLiters] = useState<number>(14);
  const [vetBooked, setVetBooked] = useState<boolean>(false);
  const [doctorDate, setDoctorDate] = useState<string>('2026-08-15');

  const greenFodderKg = Math.round(15 + dailyMilkLiters * 1.2);
  const dryFodderKg = 5;
  const concentrateKg = Math.round((1.5 + dailyMilkLiters * 0.4) * 10) / 10;

  const weeklyMilkYield = [
    { day: 'सोम', yield: 13.5 },
    { day: 'मंगल', yield: 14.0 },
    { day: 'बुध', yield: 14.2 },
    { day: 'गुरु', yield: 13.8 },
    { day: 'शुक्र', yield: 14.5 },
    { day: 'शनि', yield: 15.0 },
    { day: 'रवि', yield: 14.8 }
  ];

  const handleBookVet = (e: React.FormEvent) => {
    e.preventDefault();
    setVetBooked(true);
    alert(`पशु चिकित्सक अपॉइंटमेंट ${doctorDate} के लिए सफलतापूर्वक बुक की गई! डॉ. राजेश शर्मा (पशु चिकित्सालय भोपाल) को एसएमएस भेज दिया गया है।`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 shadow-glow-cyan relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  पशुपालक डैशबोर्ड (Cattle Owner Portal)
                </span>
                <span className="text-xs text-slate-400 font-mono">मोबाइल: {userPhone}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {primaryAnimal ? primaryAnimal.owner.name : 'पशुपालक प्रोफ़ाइल'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                आपके पंजीकृत पशुओं की सुरक्षा, 500m जिओ-फेंस जीपीएस ट्रैकिंग एवं स्वास्थ्य रिकॉर्ड
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenComplaint(primaryAnimal)}
            className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm shrink-0"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>गुमशुदा / लावारिस पशु रिपोर्ट करें</span>
          </button>
        </div>
      </div>

      {/* FEATURE 1 & 2 CARDS FOR PASHU MALIK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Milk Yield & Feed Calculator with Bar Graph */}
        <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 shadow-glow-emerald space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
              <Milk className="w-5 h-5 text-teal-400" />
              <span>1. दुग्ध उत्पादन एवं संतुलित चारा पोषण कैलकुलेटर</span>
            </div>
            <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono font-bold">
              Feed Nutrition AI
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-300 font-semibold">दैनिक दूध उत्पादन:</label>
            <input
              type="number"
              value={dailyMilkLiters}
              onChange={(e) => setDailyMilkLiters(Math.max(1, Number(e.target.value)))}
              className="w-24 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono text-center font-bold text-sm"
            />
            <span className="text-xs text-slate-400 font-bold">लीटर / दिन</span>
          </div>

          {/* Weekly Production Bar Graph */}
          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-900 space-y-2">
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>साप्ताहिक उत्पादन ग्राफ (Liters/day):</span>
              <span className="text-teal-400 font-mono">औसत: 14.3 L</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 items-end h-20 pt-2">
              {weeklyMilkYield.map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-teal-600 to-emerald-400 rounded-t"
                    style={{ height: `${(m.yield / 16) * 100}%` }}
                    title={`${m.yield} L`}
                  ></div>
                  <span className="text-[9px] text-slate-400">{m.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">हरा चारा</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{greenFodderKg} Kg</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">सूखा भूसा</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{dryFodderKg} Kg</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">दाना मिश्रण</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">{concentrateKg} Kg</span>
            </div>
          </div>
        </div>

        {/* Vet Doctor Appointment Booking */}
        <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 shadow-glow-cyan space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
              <Stethoscope className="w-5 h-5 text-blue-400" />
              <span>2. टीकाकरण अनुसूची व पशु चिकित्सक अपॉइंटमेंट</span>
            </div>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">
              Vet Tele-Health
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
            <div>
              <span className="text-slate-400 block text-[10px]">आगामी मुँहपका-खुरपका (FMD) टीका:</span>
              <span className="font-bold text-amber-300">25 अगस्त 2026 (निशुल्क)</span>
            </div>
            <CalendarCheck className="w-5 h-5 text-amber-400" />
          </div>

          <form onSubmit={handleBookVet} className="flex gap-2">
            <input
              type="date"
              value={doctorDate}
              onChange={(e) => setDoctorDate(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
            />
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <Stethoscope className="w-4 h-4" />
              <span>डॉक्टर अपॉइंटमेंट बुक करें</span>
            </button>
          </form>

          {vetBooked && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 font-semibold border border-emerald-500/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>डॉक्टर अपॉइंटमेंट {doctorDate} के लिए कन्फर्म है!</span>
            </div>
          )}
        </div>

      </div>

      {/* Owned Animals List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">आपके पंजीकृत पशु ({ownedAnimals.length})</h3>

        {ownedAnimals.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl text-center space-y-2 border border-slate-800">
            <User className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">आपके मोबाइल नंबर से कोई पशु पंजीकृत नहीं मिला।</p>
            <p className="text-xs text-slate-400">पशु टैगिंग एजेंट (9826011111) या एडमिन (940778182) से संपर्क करें।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ownedAnimals.map((animal) => (
              <div
                key={animal.id}
                className="glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <img src={animal.photos[0]} alt={animal.breed} className="w-20 h-20 rounded-2xl object-cover border border-slate-700 shadow-md" />
                  <div className="flex-1">
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {animal.category}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">{animal.breed}</h4>
                    <span className="font-mono text-xs text-amber-400 font-bold block">
                      EAR-TAG: {animal.tagId}
                    </span>
                  </div>

                  <div className="bg-white p-2 rounded-xl shadow">
                    <QRCodeSVG value={`PASHUDHAN:${animal.tagId}`} size={64} />
                  </div>
                </div>

                {/* Geo-fence preview */}
                <GeoFenceMap geoFence={animal.geoFence} currentLocation={animal.location} />

                <button
                  onClick={() => onSelectAnimal(animal)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <span>संपूर्ण स्वास्थ्य एवं नोटिस विवरण देखें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
