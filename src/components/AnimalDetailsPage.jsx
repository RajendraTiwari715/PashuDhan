import React, { useState } from 'react';
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

export const AnimalDetailsPage = ({ animal, onBack, onOpenComplaint }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const getCategoryTitle = (cat) => {
    switch (cat) {
      case 'Gay': return 'गाय (Cow)';
      case 'Bail': return 'बैल (Ox / Bull)';
      case 'Bachada': return 'बछड़ा / बछड़ी (Calf)';
      case 'Bhais': return 'भैंस (Buffalo)';
      case 'Bhed/Bakar': return 'भेड़ / बकरी (Sheep/Goat)';
      default: return cat;
    }
  };

  const getHealthBadge = (health) => {
    switch (health) {
      case 'Healthy':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> पूर्ण स्वस्थ (Healthy)
          </span>
        );
      case 'Vaccinated':
        return (
          <span className="bg-cyan-50 text-cyan-700 border border-cyan-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> टीकाकरण संपन्न (Vaccinated)
          </span>
        );
      case 'Needs Treatment':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> उपचार आवश्यक
          </span>
        );
      case 'Injured':
        return (
          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> घायल (Injured)
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
            {health}
          </span>
        );
    }
  };

  const photoList = [
    { title: 'सामने (Front)', url: animal.fourPhotos?.front || animal.photos[0] },
    { title: 'साइड (Side)', url: animal.fourPhotos?.side || animal.photos[0] },
    { title: 'पीछे (Back)', url: animal.fourPhotos?.back || animal.photos[0] },
    { title: 'पहचान चिह्न', url: animal.fourPhotos?.mark || animal.photos[0] }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Navigation Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-2xl text-xs font-bold shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>वापस जाएं (Back)</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`पशुधन डिजिटल पासपोर्ट टैग URL शेयर किया गया: ${window.location.origin}/#/animal/${animal.tagId}`)}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-2xl hover:bg-blue-100 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>डिजिटल पासपोर्ट शेयर करें</span>
          </button>
        </div>
      </div>

      {/* Main Info Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-mono font-bold">
                {animal.tagId}
              </span>
              {getHealthBadge(animal.healthStatus)}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
              {animal.name} ({getCategoryTitle(animal.category)})
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              नस्ल: <span className="font-bold text-slate-700">{animal.breed}</span> | उम्र: <span className="font-bold text-slate-700">{animal.age} वर्ष</span> | रंग: <span className="font-bold text-slate-700">{animal.color}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <QRCodeSVG value={`https://pashudhan.gov.in/tag/${animal.tagId}`} size={70} />
            <div className="text-[11px] space-y-1">
              <span className="text-slate-400 font-mono block font-bold">ISO 11784 QR Tag</span>
              <span className="text-slate-700 font-mono font-bold block">{animal.tagId}</span>
              <span className="text-emerald-600 font-bold block text-[10px]">सत्यापित सरकारी टैग</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-3">
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
              <img
                src={photoList[activePhotoIdx].url}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-xs px-3 py-1 rounded-full font-bold">
                {photoList[activePhotoIdx].title}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {photoList.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`h-20 rounded-xl overflow-hidden border-2 transition-all relative ${
                    activePhotoIdx === idx
                      ? 'border-blue-600 shadow-md scale-95'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Owner & Identity Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                पशुपालक (स्वामी) विवरण
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>{animal.ownerName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-mono">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{animal.ownerPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-mono">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>आधार: {animal.ownerAadhaar || 'XXXX-XXXX-9482'}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                पंजीकरण तिथि एवं स्थिति
              </h3>
              <div className="space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">पंजीकरण तिथि:</span>
                  <span className="font-mono font-bold text-slate-800">{animal.registrationDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">जिओ-फेंस त्रिज्या:</span>
                  <span className="font-mono font-bold text-emerald-600">{animal.geoFence?.radius || 500} मीटर</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenComplaint(animal)}
              className="w-full bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>आवारा विचरण या चोरी की शिकायत दर्ज करें</span>
            </button>
          </div>
        </div>
      </div>

      {/* Geofence Map Module */}
      {animal.geoFence && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-800">
            लाइव जिओ-फेंस एवं लोकेशन मैप
          </h3>
          <GeoFenceMap geoFence={animal.geoFence} animalName={animal.name} />
        </div>
      )}

      {/* Legal Penalty & Notice Module */}
      <NoticePenaltyModule animal={animal} />
    </div>
  );
};