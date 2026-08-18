import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { getAnimalsByOwnerPhone, getComplaintsForOwnerPhone } from '../services/storage';
import { GeoFenceMap } from './GeoFenceMap';
import { OwnerLiveDispatchModal } from './OwnerLiveDispatchModal';
import {
  User,
  AlertTriangle,
  ArrowRight,
  Milk,
  CalendarCheck,
  Stethoscope,
  CheckCircle2,
  Radio,
  Truck,
  MapPin,
  Clock,
  FileText,
  ShieldAlert,
  Phone,
  PlusCircle
} from 'lucide-react';

export const PashuMalikDashboard = ({
  userPhone,
  onSelectAnimal,
  onOpenComplaint
}) => {
  const ownedAnimals = getAnimalsByOwnerPhone(userPhone);
  const primaryAnimal = ownedAnimals[0];

  const [dailyMilkLiters, setDailyMilkLiters] = useState(14);
  const [vetBooked, setVetBooked] = useState(false);
  const [doctorDate, setDoctorDate] = useState('2026-08-25');
  const [complaintFilter, setComplaintFilter] = useState('ALL');
  const [selectedComplaintForTracking, setSelectedComplaintForTracking] = useState(null);

  // Fetch complaints linked to owner's animals or phone
  const ownerComplaints = getComplaintsForOwnerPhone(userPhone);

  const filteredComplaints = ownerComplaints.filter(c => {
    if (complaintFilter === 'ACTIVE') {
      return c.status !== 'Resolved' && c.status !== 'Completed';
    }
    if (complaintFilter === 'RESOLVED') {
      return c.status === 'Resolved' || c.status === 'Completed';
    }
    return true;
  });

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

      {/* ========================================================================= */}
      {/* COMPLAINTS & EMERGENCY CAD DISPATCH TRACKING SECTION */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-800">
                  गोवंश संबंधित शिकायतें एवं लाइव डिस्पैच स्थिति
                </h3>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {ownerComplaints.length} कुल शिकायतें
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                आपके पंजीकृत गोवंश के संदर्भ में दर्ज शिकायतें, जीपीएस लोकेशन व आपातकालीन एम्बुलेंस स्थिति
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
            <button
              onClick={() => setComplaintFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                complaintFilter === 'ALL'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              सभी ({ownerComplaints.length})
            </button>
            <button
              onClick={() => setComplaintFilter('ACTIVE')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                complaintFilter === 'ACTIVE'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              सक्रिय ({ownerComplaints.filter(c => c.status !== 'Resolved' && c.status !== 'Completed').length})
            </button>
            <button
              onClick={() => setComplaintFilter('RESOLVED')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                complaintFilter === 'RESOLVED'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              निस्तारित ({ownerComplaints.filter(c => c.status === 'Resolved' || c.status === 'Completed').length})
            </button>
          </div>
        </div>

        {filteredComplaints.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">कोई सक्रिय शिकायत दर्ज नहीं है।</h4>
            <p className="text-xs text-slate-500">
              आपके पंजीकृत गोवंश के संबंध में कोई उल्लंघन या आपातकालीन डिस्पैच लंबित नहीं है।
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => {
              const matchedAnimal = ownedAnimals.find(
                a => a.tagId.toUpperCase() === (complaint.animalTagId || '').toUpperCase()
              ) || primaryAnimal;

              const isDispatched = complaint.status.includes('Dispatched') || complaint.status.includes('Progress') || complaint.assignedUnit;

              return (
                <div
                  key={complaint.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-4"
                >
                  {/* Top row of card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                        {complaint.animalTagId || 'TAG-UNKNOWN'}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <span>शिकायत क्रमांक: {complaint.id}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({complaint.createdAt})</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          पशु वर्ग: <span className="font-semibold text-slate-700">{complaint.animalCategory || 'गोवंश'}</span> ({matchedAnimal?.breed || 'देसी'})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold border flex items-center gap-1.5 ${
                          complaint.status === 'Resolved' || complaint.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                        }`}
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>{complaint.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* CAD Lifecycle Status Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                      <span>शिकायत एवं डिस्पैच लाइफसायकल:</span>
                      <span className="text-amber-700 font-bold">FSM State Machine Active</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 text-[10px] text-center font-bold">
                      <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">1. दर्ज (Created)</div>
                      <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">2. स्वीकृत (Assigned)</div>
                      <div className={`p-1.5 rounded-lg ${isDispatched ? 'bg-amber-400 text-slate-950 font-black shadow-sm' : 'bg-slate-200 text-slate-500'}`}>
                        3. डिस्पैच (Dispatched)
                      </div>
                      <div className={`p-1.5 rounded-lg ${complaint.status.includes('Progress') ? 'bg-cyan-500 text-white font-bold' : 'bg-slate-200 text-slate-500'}`}>
                        4. मौके पर (Scene)
                      </div>
                      <div className={`p-1.5 rounded-lg ${complaint.status === 'Resolved' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        5. पूर्ण (Completed)
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Location */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" /> घटना स्थल (Location):
                      </div>
                      <div className="font-bold text-slate-800">
                        {complaint.location?.addressName || complaint.cityName || 'भोपाल मुख्य मार्ग'}
                      </div>
                      <div className="text-slate-500 font-mono text-[10px]">
                        GPS: {complaint.location?.lat || '23.2599'}, {complaint.location?.lng || '77.4126'}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
                        <FileText className="w-3.5 h-3.5 text-blue-500" /> विवरण (Details):
                      </div>
                      <p className="text-slate-700 line-clamp-2 italic">
                        "{complaint.description}"
                      </p>
                      <div className="text-[10px] text-slate-400">
                        रिपोर्टर: {complaint.complainantName}
                      </div>
                    </div>

                    {/* Assigned Response Unit */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
                        <Truck className="w-3.5 h-3.5 text-amber-500" /> तैनात रेस्क्यू दल:
                      </div>
                      <div className="font-bold text-slate-800">
                        {complaint.assignedUnit?.callsign || 'रेस्क्यू एम्बुलेंस Alpha-1 (1962)'}
                      </div>
                      <div className="text-amber-700 font-mono font-bold text-[11px]">
                        ईटीए: {complaint.assignedUnit?.etaMinutes || 6} मिनट | दूरी: {complaint.assignedUnit?.distanceKm || 1.4} KM
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>अंतिम अपडेट: {complaint.updatedAt || complaint.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedComplaintForTracking(complaint)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-amber-500/20"
                      >
                        <Radio className="w-4 h-4 text-slate-950 animate-pulse" />
                        <span>लाइव एम्बुलेंस ट्रैक करें (Live Tracking)</span>
                      </button>

                      {matchedAnimal && (
                        <button
                          onClick={() => onSelectAnimal(matchedAnimal)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition-colors border border-slate-300"
                        >
                          <span>पशु प्रोफ़ाइल देखें</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
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

      {/* Owner Live CAD Dispatch Tracking Modal */}
      <OwnerLiveDispatchModal
        isOpen={!!selectedComplaintForTracking}
        onClose={() => setSelectedComplaintForTracking(null)}
        complaint={selectedComplaintForTracking}
        animal={primaryAnimal}
      />
    </div>
  );
};