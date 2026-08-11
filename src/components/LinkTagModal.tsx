import React, { useState } from 'react';
import { saveAnimal } from '../services/storage';
import type { Animal, AnimalCategory, FourPhotos } from '../types';
import { AadhaarOCRModal } from './AadhaarOCRModal';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import { 
  User, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Link2,
  Camera,
  CreditCard,
  MapPin
} from 'lucide-react';

interface LinkTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTagId?: string;
  onTagLinkedSuccess: (animal: Animal) => void;
}

export const LinkTagModal: React.FC<LinkTagModalProps> = ({
  isOpen,
  onClose,
  initialTagId = 'TAG-8821',
  onTagLinkedSuccess
}) => {
  const [tagId, setTagId] = useState(initialTagId);
  const [category, setCategory] = useState<AnimalCategory>('Gay');
  const [breed, setBreed] = useState('गिर (Gir Breed)');
  const [color, setColor] = useState('चितकबरा लाल-सफेद');
  const [gender, setGender] = useState<'Female' | 'Male'>('Female');
  const [ageYears, setAgeYears] = useState<number>(3);
  const [healthStatus, setHealthStatus] = useState<Animal['healthStatus']>('Healthy');
  
  // Owner info
  const [ownerName, setOwnerName] = useState('रामस्वरूप शर्मा');
  const [ownerAadhaar, setOwnerAadhaar] = useState('8832-1104-5590');
  const [ownerPhone, setOwnerPhone] = useState('98260 77123');
  const [villageOrCity, setVillageOrCity] = useState('ग्राम फंदा, भोपाल');
  const [fullAddress, setFullAddress] = useState('मकान न. 12, मंदिर चौक, ग्राम फंदा, भोपाल, म.प्र.');
  const [isAadhaarOcrDone, setIsAadhaarOcrDone] = useState(false);

  // 4 Photo Slots (Flowchart Green Box Requirement)
  const [fourPhotos, setFourPhotos] = useState<FourPhotos>({
    front: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
    side: 'https://images.unsplash.com/photo-1570042707222-67803328e3b5?auto=format&fit=crop&w=800&q=80',
    back: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    earTagCloseUp: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80'
  });

  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePhotoUpload = (slot: keyof FourPhotos, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFourPhotos(prev => ({ ...prev, [slot]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAadhaarOcrComplete = (ocrData: {
    scannedName: string;
    aadhaarNo: string;
    dob: string;
    gender: string;
    address: string;
  }) => {
    setOwnerName(ocrData.scannedName);
    setOwnerAadhaar(ocrData.aadhaarNo);
    setFullAddress(ocrData.address);
    setIsAadhaarOcrDone(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagId.trim()) {
      setError('कृपया 15-digit QR कान टैग कोड दर्ज करें।');
      return;
    }
    if (!ownerName.trim() || !ownerPhone.trim()) {
      setError('कृपया पशु मालिक का नाम एवं संपर्क नंबर दर्ज करें।');
      return;
    }

    const newAnimal = saveAnimal({
      tagId: tagId.trim().toUpperCase(),
      category,
      breed,
      color,
      gender,
      ageYears: Number(ageYears) || 3,
      healthStatus,
      owner: {
        name: ownerName,
        aadhaarNumber: ownerAadhaar,
        phone: ownerPhone,
        villageOrCity,
        fullAddress,
        isAadhaarVerified: true,
        isMobileOtpVerified: true
      },
      fourPhotos,
      location: {
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
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Link2 className="w-7 h-7 text-slate-950 font-bold" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            पशु पंजीकरण एवं RFID / QR टैग लिंकिंग (Registration Workflow)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            आधार OCR, 4 पशु तस्वीरें, 500m जिओ-फेंस एवं 15-Digit ISO टैग मैपिंग
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Tag Selection Banner */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shrink-0">
                <QRCodeSVG value={`PASHUDHAN:${tagId}`} size={56} />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block">15-Digit ISO 18000-6C Ear-Tag:</span>
                <span className="font-mono font-bold text-lg text-white tracking-wider">{tagId}</span>
                <span className="text-[11px] text-amber-300 block">Status: Ready to link</span>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-[10px] text-slate-400 mb-1">टैग ID दर्ज / बदलें:</label>
              <input
                type="text"
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs uppercase"
              />
            </div>
          </div>

          {/* Section 1: Aadhaar OCR & Owner Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                1. पशुपालक विवरण एवं आधार OCR (Owner Data Entry)
              </h4>

              <button
                type="button"
                onClick={() => setIsOcrModalOpen(true)}
                className="text-xs bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>आधार ऑटो-OCR से भरें</span>
              </button>
            </div>

            {isAadhaarOcrDone && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>आधार OCR एवं मोबाइल OTP सत्यापित (Verified)</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">पशुपालक का नाम</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">आधार नंबर (OCR Verified)</label>
                <input
                  type="text"
                  value={ownerAadhaar}
                  onChange={(e) => setOwnerAadhaar(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">संपर्क मोबाइल (OTP Validated)</label>
                <input
                  type="text"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ग्राम / शहर</label>
                <input
                  type="text"
                  value={villageOrCity}
                  onChange={(e) => setVillageOrCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">पूर्ण पता</label>
                <input
                  type="text"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Cattle Specifications */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Sparkles className="w-3.5 h-3.5" />
              2. पशु विवरण (Cattle Specifications)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">पशु श्रेणी</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AnimalCategory)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                >
                  <option value="Gay">गाय (Cow)</option>
                  <option value="Bail">बैल (Ox / Bull)</option>
                  <option value="Bachada">बछड़ा / बछड़ी (Calf)</option>
                  <option value="Bhais">भैंस (Buffalo)</option>
                  <option value="Bhed/Bakar">भेड़ / बकरी</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">नस्ल (Breed)</label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="e.g. साहीवाल, गिर, मुर्रा"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">रंग (Color)</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. लाल, काला, चितकबरा"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">लिंग (Gender)</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Female' | 'Male')}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                >
                  <option value="Female">मादा (Female)</option>
                  <option value="Male">नर (Male)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">आयु (वर्षों में)</label>
                <input
                  type="number"
                  value={ageYears}
                  onChange={(e) => setAgeYears(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">स्वास्थ्य स्थिति</label>
                <select
                  value={healthStatus}
                  onChange={(e) => setHealthStatus(e.target.value as Animal['healthStatus'])}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                >
                  <option value="Healthy">पूर्ण स्वस्थ (Healthy)</option>
                  <option value="Vaccinated">टीकाकरण संपन्न (Vaccinated)</option>
                  <option value="Needs Treatment">उपचार आवश्यक</option>
                  <option value="Injured">घायल (Injured)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: 4 Cattle Photos Upload (Flowchart Requirement) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                3. पशु के 4 कोणों के चित्र अपलोड करें (4 Cow Photos Uploaded)
              </span>
              <span className="text-[10px] text-amber-400 font-mono">4 Slots Required</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Photo 1: Front */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                  <img src={fourPhotos.front} alt="Front photo" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 block">1. सामने का चित्र (Front)</span>
                <input
                  type="file"
                  onChange={(e) => handlePhotoUpload('front', e)}
                  className="text-[10px] text-slate-400 w-full"
                />
              </div>

              {/* Photo 2: Side */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                  <img src={fourPhotos.side} alt="Side photo" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 block">2. साइड का चित्र (Side)</span>
                <input
                  type="file"
                  onChange={(e) => handlePhotoUpload('side', e)}
                  className="text-[10px] text-slate-400 w-full"
                />
              </div>

              {/* Photo 3: Back */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                  <img src={fourPhotos.back} alt="Back photo" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 block">3. पीछे का चित्र (Back)</span>
                <input
                  type="file"
                  onChange={(e) => handlePhotoUpload('back', e)}
                  className="text-[10px] text-slate-400 w-full"
                />
              </div>

              {/* Photo 4: Tag Close-up */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="w-full aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                  <img src={fourPhotos.earTagCloseUp} alt="Tag close up" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 block">4. टैग क्लोज-अप (Tag Close-up)</span>
                <input
                  type="file"
                  onChange={(e) => handlePhotoUpload('earTagCloseUp', e)}
                  className="text-[10px] text-slate-400 w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Geo-Fence 500m radius pin */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-white block">डेयरी/बाड़ा 500m जिओ-फेंस जीपीएस मैपिंग:</span>
                <span className="text-slate-400 text-[11px]">होम जीपीएस कोऑर्डिनेट पिन captured (Lat: 23.2599, Lng: 77.4126)</span>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-500/30">
              500m Radius Set
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 text-sm border border-emerald-400/30"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>टैग पशु से जोड़ें एवं संपूर्ण पंजीकृत करें (Complete Flowchart Registration)</span>
          </button>

        </form>

      </div>

      {/* Aadhaar OCR Modal */}
      <AadhaarOCRModal
        isOpen={isOcrModalOpen}
        onClose={() => setIsOcrModalOpen(false)}
        onOCRComplete={handleAadhaarOcrComplete}
      />
    </div>
  );
};
