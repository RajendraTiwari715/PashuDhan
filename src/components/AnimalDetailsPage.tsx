import React, { useState } from 'react';
import type { Animal } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { GeoFenceMap } from './GeoFenceMap';
import { NoticePenaltyModule } from './NoticePenaltyModule';
import { 
  ShieldCheck, 
  User, 
  Phone, 
  AlertTriangle, 
  Calendar, 
  Activity, 
  ArrowLeft,
  Share2,
  CheckCircle2,
  CreditCard
} from 'lucide-react';


interface AnimalDetailsPageProps {
  animal: Animal;
  onBack: () => void;
  onOpenComplaint: (animal: Animal) => void;
}

export const AnimalDetailsPage: React.FC<AnimalDetailsPageProps> = ({
  animal,
  onBack,
  onOpenComplaint
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const getCategoryTitle = (cat: Animal['category']) => {
    switch (cat) {
      case 'Gay': return 'गाय (Cow)';
      case 'Bail': return 'बैल (Ox / Bull)';
      case 'Bachada': return 'बछड़ा / बछड़ी (Calf)';
      case 'Bhais': return 'भैंस (Buffalo)';
      case 'Bhed/Bakar': return 'भेड़ / बकरी (Sheep/Goat)';
      default: return cat;
    }
  };

  const getHealthBadge = (health: Animal['healthStatus']) => {
    switch (health) {
      case 'Healthy':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> पूर्ण स्वस्थ (Healthy)</span>;
      case 'Vaccinated':
        return <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> टीकाकरण संपन्न (Vaccinated)</span>;
      case 'Needs Treatment':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> उपचार आवश्यक</span>;
      case 'Injured':
        return <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> घायल (Injured)</span>;
    }
  };

  const photoList = [
    { title: 'सामने (Front)', url: animal.fourPhotos?.front || animal.photos[0] },
    { title: 'साइड (Side)', url: animal.fourPhotos?.side || animal.photos[0] },
    { title: 'पीछे (Back)', url: animal.fourPhotos?.back || animal.photos[0] },
    { title: 'टैग (Tag Close-up)', url: animal.fourPhotos?.earTagCloseUp || animal.photos[0] }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Back Button & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 transition-colors text-xs font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>वापस जाएं (Back)</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">ID: {animal.id}</span>
          <button 
            onClick={() => alert(`QR Tag Code: ${animal.tagId} shared!`)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: 4 Cattle Photos & QR Tag */}
          <div className="flex flex-col items-center text-center space-y-4">
            
            {/* Active Photo Slot */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-slate-700 shadow-lg relative group">
              <img
                src={photoList[activePhotoIdx].url}
                alt={animal.breed}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 font-mono font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/40">
                {animal.tagId}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-200 text-[11px] font-semibold py-1 px-2 rounded-lg">
                {photoList[activePhotoIdx].title}
              </div>
            </div>

            {/* 4 Photo Thumbnails Selector */}
            <div className="grid grid-cols-4 gap-2 w-full">
              {photoList.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border transition-all ${
                    activePhotoIdx === idx ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Visual QR Ear Tag */}
            <div className="w-full p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col items-center">
              <div className="bg-white p-2.5 rounded-xl shadow-md mb-2">
                <QRCodeSVG
                  value={`PASHUDHAN:${animal.tagId}`}
                  size={120}
                  level="H"
                />
              </div>
              <div className="text-[11px] font-mono text-emerald-400 font-semibold tracking-widest">
                EAR-TAG: {animal.tagId}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                ISO 18000-6C 15-Digit RFID Standard
              </div>
            </div>

          </div>

          {/* Right 2 Columns: Details & Owner Info */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  {getCategoryTitle(animal.category)}
                </span>
                {getHealthBadge(animal.healthStatus)}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                नस्ल: {animal.breed}
              </h2>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                पंजीकरण तिथि: {animal.registeredDate}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">रंग (Color)</span>
                <span className="text-xs font-semibold text-slate-200">{animal.color}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">आयु (Age)</span>
                <span className="text-xs font-semibold text-slate-200">{animal.ageYears} वर्ष</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">लिंग (Gender)</span>
                <span className="text-xs font-semibold text-slate-200">{animal.gender === 'Female' ? 'मादा (Female)' : 'नर (Male)'}</span>
              </div>
            </div>

            {/* Owner Details Card with Aadhaar OCR Status */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  पशु मालिक का विवरण (Owner Information)
                </h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-cyan-500/30 flex items-center gap-1">
                  <CreditCard className="w-3 h-3" /> Aadhaar OCR Verified
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">मालिक का नाम:</span>
                  <span className="font-semibold text-slate-200">{animal.owner.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">आधार संख्या (Aadhaar):</span>
                  <span className="font-mono text-slate-300">{animal.owner.aadhaarNumber}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">संपर्क मोबाइल (OTP Validated):</span>
                  <a href={`tel:${animal.owner.phone}`} className="font-mono text-cyan-400 hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {animal.owner.phone}
                  </a>
                </div>
                <div className="flex justify-between items-start py-1">
                  <span className="text-slate-400 shrink-0">पंजीकृत पता:</span>
                  <span className="text-right text-slate-300 leading-snug">{animal.owner.fullAddress}</span>
                </div>
              </div>
            </div>

            {/* Call to Action: Raise Stray Complaint */}
            <div className="pt-2">
              <button
                onClick={() => onOpenComplaint(animal)}
                className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-rose-900/30 transition-all transform active:scale-98 flex items-center justify-center gap-3 text-sm sm:text-base border border-amber-400/30"
              >
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                <span>लावारिस / सड़क पर घूम रहे पशु की शिकायत दर्ज करें</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* GeoFence Map Component (Flowchart Requirement) */}
      <GeoFenceMap
        geoFence={animal.geoFence}
        currentLocation={animal.location}
      />

      {/* Notice & Penalty Engine Module (Flowchart Requirement) */}
      <NoticePenaltyModule
        animal={animal}
      />

    </div>
  );
};
