import React, { useState } from 'react';
import { saveAnimal } from '../services/storage';
import { AadhaarOCRModal } from './AadhaarOCRModal';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import {
  User,
  CheckCircle2,
  X,
  ArrowLeft,
  Sparkles,
  Link2,
  Camera,
  CreditCard,
  MapPin
} from 'lucide-react';

export const LinkTagModal = ({
  isOpen,
  onClose,
  initialTagId = 'TAG-8821',
  onTagLinkedSuccess
}) => {
  const [tagId, setTagId] = useState(initialTagId);
  const [category, setCategory] = useState('Gay');
  const [breed, setBreed] = useState('गिर (Gir Breed)');
  const [color, setColor] = useState('चितकबरा लाल-सफेद');
  const [gender, setGender] = useState('Female');
  const [ageYears, setAgeYears] = useState(3);
  const [healthStatus, setHealthStatus] = useState('Healthy');

  // Owner info
  const [ownerName, setOwnerName] = useState('रामस्वरूप शर्मा');
  const [ownerAadhaar, setOwnerAadhaar] = useState('8832-1104-5590');
  const [ownerPhone, setOwnerPhone] = useState('98260 77123');
  const [villageOrCity, setVillageOrCity] = useState('ग्राम फंदा, भोपाल');
  const [fullAddress, setFullAddress] = useState('मकान न. 12, मंदिर चौक, ग्राम फंदा, भोपाल, म.प्र.');
  const [isAadhaarOcrDone, setIsAadhaarOcrDone] = useState(false);
  const [isAadhaarModalOpen, setIsAadhaarModalOpen] = useState(false);

  // Photos
  const [photoFront, setPhotoFront] = useState('https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80');
  const [photoSide, setPhotoSide] = useState('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80');
  const [photoBack, setPhotoBack] = useState('https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80');
  const [photoTagClose, setPhotoTagClose] = useState('https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80');

  if (!isOpen) return null;

  const handleAadhaarExtracted = (extracted) => {
    setOwnerName(extracted.name);
    setOwnerAadhaar(extracted.aadhaarNo);
    setVillageOrCity(extracted.city);
    setFullAddress(extracted.address);
    setIsAadhaarOcrDone(true);
    setIsAadhaarModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagId.trim()) {
      alert('कृपया valid Tag ID दर्ज करें!');
      return;
    }

    const newAnimal = saveAnimal({
      tagId: tagId.trim().toUpperCase(),
      category,
      breed,
      color,
      gender,
      ageYears: Number(ageYears),
      healthStatus,
      owner: {
        name: ownerName,
        aadhaarNo: ownerAadhaar,
        phone: ownerPhone,
        villageOrCity,
        fullAddress,
        isAadhaarVerified: isAadhaarOcrDone
      },
      photos: [photoFront, photoSide, photoBack, photoTagClose],
      fourPhotos: {
        front: photoFront,
        side: photoSide,
        back: photoBack,
        tagCloseUp: photoTagClose
      },
      currentGPS: {
        lat: 23.2599,
        lng: 77.4126,
        addressName: villageOrCity,
        city: 'भोपाल',
        state: 'मध्य प्रदेश',
        pincode: '462030'
      },
      geoFence: {
        centerLat: 23.2599,
        centerLng: 77.4126,
        radiusMeters: 500,
        homeAddress: villageOrCity,
        isOutsideFence: false,
        lastCheckedDistanceMeters: 50
      },
      priorViolationsCount: 0,
      activeNotices: []
    });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {
      // ignore
    }
    onTagLinkedSuccess(newAnimal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="glass-modal w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700 my-8">
        
        {/* Top Back & Close Bar */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>वापस जाएं (Back)</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Link2 className="w-7 h-7 text-slate-950 font-bold" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">पशु पंजीकरण एवं RFID / QR टैग लिंकिंग Workflow</h3>
          <p className="text-xs text-slate-400 mt-1">आधार OCR, 4 पशु तस्वीरें, 500m जिओ-फेंस एवं 15-Digit ISO टैग मैपिंग</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* Tag Info */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">15-Digit ISO Standard Tag ID:</label>
              <input
                type="text"
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-mono text-base font-bold uppercase w-60"
              />
            </div>
            <div className="bg-white p-2 rounded-xl text-center">
              <QRCodeSVG value={`PASHUDHAN:${tagId}`} size={64} />
              <span className="text-[9px] font-mono text-slate-800 font-bold block mt-1">Paytm-Style EarTag</span>
            </div>
          </div>

          {/* Owner Info & Aadhaar OCR */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>पशु मालिक विवरण (Owner Aadhaar KYC)</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsAadhaarModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>कैमरे से आधार कार्ड स्कैन (OCR)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">मालिक का नाम:</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">आधार संख्या:</label>
                <input
                  type="text"
                  value={ownerAadhaar}
                  onChange={(e) => setOwnerAadhaar(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">मोबाइल नंबर:</label>
                <input
                  type="text"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Cattle Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">पशु वर्ग:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
              >
                <option value="Gay">गाय (Cow)</option>
                <option value="Bail">बैल (Ox / Bull)</option>
                <option value="Bachada">बछड़ा / बछड़ी (Calf)</option>
                <option value="Bhais">भैंस (Buffalo)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">नस्ल (Breed):</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">उम्र (वर्ष):</label>
              <input
                type="number"
                value={ageYears}
                onChange={(e) => setAgeYears(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">स्वास्थ्य स्थिति:</label>
              <select
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              >
                <option value="Healthy">पूर्ण स्वस्थ</option>
                <option value="Vaccinated">टीकाकरण संपन्न</option>
                <option value="Needs Treatment">उपचार आवश्यक</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-2xl"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              className="w-2/3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>पंजीकरण संपन्न करें (Save & Link Tag)</span>
            </button>
          </div>
        </form>

        <AadhaarOCRModal
          isOpen={isAadhaarModalOpen}
          onClose={() => setIsAadhaarModalOpen(false)}
          onExtracted={handleAadhaarExtracted}
        />
      </div>
    </div>
  );
};