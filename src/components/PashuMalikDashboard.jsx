import React, { useState } from 'react';

import { getAnimalsByOwnerPhone } from '../services/storage';
import { GeoFenceMap } from './GeoFenceMap';
import { QRCodeSVG } from 'qrcode.react';
import { User, AlertTriangle, ArrowRight, Milk, CalendarCheck, Stethoscope, CheckCircle2 } from 'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";








export const PashuMalikDashboard = ({
  userPhone,
  onSelectAnimal,
  onOpenComplaint
}) => {
  const ownedAnimals = getAnimalsByOwnerPhone(userPhone);
  const primaryAnimal = ownedAnimals[0];

  const [dailyMilkLiters, setDailyMilkLiters] = useState(14);
  const [vetBooked, setVetBooked] = useState(false);
  const [doctorDate, setDoctorDate] = useState('2026-08-15');

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

  const handleBookVet = (e) => {
    e.preventDefault();
    setVetBooked(true);
    alert(`पशु चिकित्सक अपॉइंटमेंट ${doctorDate} के लिए सफलतापूर्वक बुक की गई! डॉ. राजेश शर्मा (पशु चिकित्सालय भोपाल) को एसएमएस भेज दिया गया है।`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-0.5 rounded-full font-bold">
                  पशुपालक पोर्टल (Cattle Owner)
                </span>
                <span className="text-xs text-slate-500 font-mono">मोबाइल: {userPhone}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                {primaryAnimal ? primaryAnimal.owner.name : 'पशुपालक प्रोफ़ाइल'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenComplaint(primaryAnimal)}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-3 rounded-2xl shadow-sm flex items-center justify-center gap-2 text-xs shrink-0 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>गुमशुदा / लावारिस पशु रिपोर्ट करें</span>
          </button>
        </div>
      </div>

      {/* Calculator & Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feed & Milk Calculator */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
              <Milk className="w-5 h-5 text-teal-600" />
              <span>1. दुग्ध उत्पादन एवं संतुलित चारा पोषण कैलकुलेटर</span>
            </div>
            <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
              Feed AI
            </span>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-600 font-semibold">दैनिक दूध उत्पादन:</label>
            <input
              type="number"
              value={dailyMilkLiters}
              onChange={(e) => setDailyMilkLiters(Math.max(1, Number(e.target.value)))}
              className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono text-center font-bold text-sm focus:outline-none focus:border-teal-500"
            />
            <span className="text-xs text-slate-500 font-bold">लीटर / दिन</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex justify-between text-[11px] font-semibold text-slate-500">
              <span>साप्ताहिक उत्पादन ग्राफ (Liters/day):</span>
              <span className="text-teal-700 font-mono font-bold">औसत: 14.3 L</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 items-end h-20 pt-2">
              {weeklyMilkYield.map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-teal-500 rounded-t"
                    style={{ height: `${(m.yield / 16) * 100}%` }}
                    title={`${m.yield} L`}
                  />
                  <span className="text-[9px] text-slate-400 font-semibold">{m.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 block font-semibold">हरा चारा</span>
              <span className="font-mono font-bold text-emerald-600 text-sm mt-0.5 block">{greenFodderKg} Kg</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 block font-semibold">सूखा भूसा</span>
              <span className="font-mono font-bold text-amber-600 text-sm mt-0.5 block">{dryFodderKg} Kg</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 block font-semibold">दाना मिश्रण</span>
              <span className="font-mono font-bold text-cyan-600 text-sm mt-0.5 block">{concentrateKg} Kg</span>
            </div>
          </div>
        </div>

        {/* Doctor & Vaccine */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              <span>2. टीकाकरण अनुसूची व पशु चिकित्सक अपॉइंटमेंट</span>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
              Tele-Health
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs flex justify-between items-center">
            <div>
              <span className="text-slate-500 block text-[10px] font-semibold">आगामी मुँहपका-खुरपका (FMD) टीका:</span>
              <span className="font-bold text-amber-700 mt-0.5 block">25 अगस्त 2026 (निशुल्क)</span>
            </div>
            <CalendarCheck className="w-5 h-5 text-amber-600" />
          </div>

          <form onSubmit={handleBookVet} className="flex gap-2">
            <input
              type="date"
              value={doctorDate}
              onChange={(e) => setDoctorDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Stethoscope className="w-4 h-4" />
              <span>डॉक्टर अपॉइंटमेंट बुक करें</span>
            </button>
          </form>

          {vetBooked && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs flex items-center gap-2 font-bold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>डॉक्टर अपॉइंटमेंट {doctorDate} के लिए कन्फर्म है!</span>
            </div>
          )}
        </div>
      </div>

      {/* Owned Cattle Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">
          आपके पंजीकृत पशु ({ownedAnimals.length})
        </h3>

        {ownedAnimals.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl text-center space-y-2 border border-slate-200 shadow-sm">
            <User className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">आपके मोबाइल नंबर से कोई पशु पंजीकृत नहीं मिला।</p>
            <p className="text-xs text-slate-500">पशु टैगिंग एजेंट (9826011111) या एडमिन से संपर्क करें।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ownedAnimals.map((animal) => (
              <div
                key={animal.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={animal.photos[0]}
                    alt={animal.breed}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                  />
                  <div className="flex-1">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {animal.category}
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 mt-1">{animal.breed}</h4>
                    <span className="font-mono text-xs text-amber-600 font-bold block mt-0.5">
                      EAR-TAG: {animal.tagId}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 shrink-0">
                    <QRCodeSVG value={`PASHUDHAN:${animal.tagId}`} size={64} />
                  </div>
                </div>

                <GeoFenceMap geoFence={animal.geoFence} currentLocation={animal.location} />

                <button
                  onClick={() => onSelectAnimal(animal)}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
                >
                  <span>संपूर्ण स्वास्थ्य एवं नोटिस विवरण देखें</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};