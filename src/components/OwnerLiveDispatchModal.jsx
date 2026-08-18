import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  Navigation,
  Truck,
  MapPin,
  Clock,
  Gauge,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Building2,
  User
} from 'lucide-react';

export const OwnerLiveDispatchModal = ({
  isOpen,
  onClose,
  complaint,
  animal
}) => {
  const [telemetry, setTelemetry] = useState({
    unitCallsign: 'रेस्क्यू एम्बुलेंस Alpha-1',
    vehiclePlate: 'MP-04-GAU-9012',
    driverName: 'राजेश सिंह (पशु आपातकालीन चालक)',
    driverPhone: '98260 99881',
    lat: 23.2624,
    lng: 77.4185,
    speedKmh: 40,
    distanceKm: 1.2,
    etaMinutes: 5,
    status: 'En Route to Incident Location',
    progressPercent: 70
  });

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTelemetry(prev => {
        const newDist = Math.max(0.1, +(prev.distanceKm - 0.05).toFixed(2));
        const newEta = Math.max(1, Math.round(newDist * 3));
        const speedVar = Math.floor(35 + Math.random() * 12);
        const newLat = +(prev.lat + (Math.random() - 0.5) * 0.0006).toFixed(4);
        const newLng = +(prev.lng + (Math.random() - 0.5) * 0.0006).toFixed(4);
        const newProgress = Math.min(96, prev.progressPercent + 1);

        return {
          ...prev,
          lat: newLat,
          lng: newLng,
          distanceKm: newDist,
          etaMinutes: newEta,
          speedKmh: speedVar,
          progressPercent: newProgress
        };
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !complaint) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span>वापस जाएं (Back)</span>
            </button>
            <div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                COMPLAINT ID: {complaint.id}
              </span>
              <h3 className="text-base font-bold text-slate-800 mt-0.5">
                लाइव आपातकालीन एम्बुलेंस ट्रैकिंग (Live CAD Dispatch)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CAD Lifecycle Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-5">
          <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center justify-between">
            <span>घटना निवारण प्रगति (Incident Lifecycle):</span>
            <span className="text-emerald-600 font-mono">STOMP: /topic/complaint.{complaint.animalTagId}.tracking</span>
          </div>

          <div className="grid grid-cols-5 gap-1 text-[10px] font-bold text-center">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">1. दर्ज (Created)</div>
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">2. स्वीकृत (Assigned)</div>
            <div className="p-1.5 bg-amber-400 text-slate-900 rounded-lg shadow-sm font-black animate-pulse">
              3. डिस्पैच (Dispatched)
            </div>
            <div className="p-1.5 bg-slate-200 text-slate-600 rounded-lg">4. मौके पर (Scene)</div>
            <div className="p-1.5 bg-slate-200 text-slate-600 rounded-lg">5. पूर्ण (Resolved)</div>
          </div>
        </div>

        {/* Live Radar/Map Canvas Simulation */}
        <div className="relative w-full h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-inner mb-5">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Radar Circles */}
          <div className="absolute w-56 h-56 rounded-full border border-emerald-500/30 animate-[spin_25s_linear_infinite] flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border border-dashed border-emerald-500/30"></div>
          </div>

          {/* Incident Destination Pin */}
          <div className="absolute top-10 left-16 z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 border-2 border-white flex items-center justify-center shadow-lg shadow-rose-600/60">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="bg-slate-900/90 text-rose-300 font-mono text-[9px] px-2 py-0.5 rounded font-bold mt-1 border border-slate-700">
              घटना स्थल (Animal Location)
            </span>
          </div>

          {/* Moving Ambulance Pin */}
          <div
            className="absolute z-20 transition-all duration-1000 flex flex-col items-center"
            style={{
              top: `${Math.min(70, 20 + (100 - telemetry.progressPercent) * 0.5)}%`,
              left: `${Math.min(75, 20 + telemetry.progressPercent * 0.6)}%`
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500 border-2 border-white flex items-center justify-center shadow-lg shadow-amber-500/60 animate-bounce">
              <Truck className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <span className="bg-slate-900/90 text-amber-300 font-mono text-[9px] px-2 py-0.5 rounded font-bold mt-1 border border-slate-700 whitespace-nowrap">
              {telemetry.unitCallsign} ({telemetry.speedKmh} km/h)
            </span>
          </div>

          <div className="absolute bottom-3 left-3 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700 text-[10px] text-slate-300 font-mono">
            GPS: {telemetry.lat}, {telemetry.lng} | गति: {telemetry.speedKmh} KM/H
          </div>

          <div className="absolute bottom-3 right-3 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700 text-[10px] text-amber-400 font-mono font-bold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>लाइव टेलीमेट्री सक्रिय</span>
          </div>
        </div>

        {/* Assigned Response Unit Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 block uppercase">
              तैनात आपातकालीन दल (Assigned Response Unit)
            </span>
            <div className="font-bold text-slate-800 text-sm">{telemetry.unitCallsign}</div>
            <div className="text-slate-600">वाहन पंजीयन: <span className="font-mono font-bold text-slate-800">{telemetry.vehiclePlate}</span></div>
            <div className="text-slate-600">चालक: <span className="font-semibold text-slate-800">{telemetry.driverName}</span></div>
            
            <a
              href={`tel:${telemetry.driverPhone}`}
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold font-mono mt-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>कॉल करें: {telemetry.driverPhone}</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-[11px] font-bold text-slate-500 block uppercase">
              घटना एवं पशु विवरण (Incident Data)
            </span>
            <div className="text-slate-800">
              <span className="text-slate-500">पशु टैग:</span> <span className="font-mono font-bold text-emerald-700">{complaint.animalTagId}</span>
            </div>
            <div className="text-slate-800">
              <span className="text-slate-500">स्थान:</span> <span className="font-semibold">{complaint.location?.addressName || complaint.cityName || 'मुख्य मार्ग'}</span>
            </div>
            <div className="text-slate-800">
              <span className="text-slate-500">शिकायत विवरण:</span> <span className="italic text-slate-600 block mt-0.5">{complaint.description}</span>
            </div>
          </div>
        </div>

        {/* ETA & Distance Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
            <span className="text-[11px] font-bold text-amber-800 block">अनुमानित आगमन समय (ETA)</span>
            <span className="text-2xl font-black text-amber-600 font-mono mt-0.5 block">{telemetry.etaMinutes} मिनट</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-[11px] font-bold text-emerald-800 block">शेष दूरी (Distance Remaining)</span>
            <span className="text-2xl font-black text-emerald-700 font-mono mt-0.5 block">{telemetry.distanceKm} KM</span>
          </div>
        </div>

      </div>
    </div>
  );
};
