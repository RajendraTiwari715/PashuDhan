import React, { useState } from 'react';
import { createComplaint } from '../services/storage';
import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  Camera,
  MapPin,
  Building2,
  ShieldCheck,
  X,
  ArrowLeft,
  Navigation,
  Send
} from 'lucide-react';

export const ComplaintFormModal = ({
  isOpen,
  onClose,
  targetAnimal,
  userPhone = '98765 43210',
  onComplaintSubmitted
}) => {
  const [tagId, setTagId] = useState(targetAnimal?.tagId || '');
  const [category, setCategory] = useState(targetAnimal?.category || 'Gay');
  const [phone, setPhone] = useState(userPhone);
  const [complainantName, setComplainantName] = useState('नागरिक (Citizen)');
  const [description, setDescription] = useState('मुख्य मार्ग पर लावारिस पशु घूम रहा है, जिससे यातायात बाधित हो रहा है।');
  const [photoUrl, setPhotoUrl] = useState(
    targetAnimal?.photos[0] || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
  );
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [cityName, setCityName] = useState('भोपाल, मुख्य मार्ग (NH-44 Highway)');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFetchGPS = () => {
    setIsFetchingLocation(true);
    setTimeout(() => {
      setIsFetchingLocation(false);
      setCityName('भोपाल (Bhopal) - जीपीएस निर्देशांक: 23.2599° N, 77.4126° E');
    }, 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('कृपया शिकायत का संक्षिप्त विवरण दर्ज करें।');
      return;
    }

    const complaint = createComplaint({
      animalTagId: tagId || targetAnimal?.tagId || 'UNTAGGED-STRAY',
      animalCategory: category,
      complainantPhone: phone,
      complainantName,
      photoProofUrl: photoUrl,
      description,
      cityName
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    onComplaintSubmitted(complaint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="glass-modal w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700 my-8">
        
        {/* Back and Close Bar */}
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
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <AlertTriangle className="w-7 h-7 text-white animate-bounce" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">लावारिस / सड़क पर पशु शिकायत दर्ज करें</h3>
          <p className="text-xs text-slate-400 mt-1">जीपीएस लोकेशन की मदद से निकटतम पशु विभाग एवं पुलिस थाने को स्वतः अलर्ट भेजा जाएगा</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">पशु वर्ग (Cattle Category):</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium"
            >
              <option value="Gay">गाय (Cow)</option>
              <option value="Bail">बैल (Ox / Bull)</option>
              <option value="Bachada">बछड़ा / बछड़ी (Calf)</option>
              <option value="Bhais">भैंस (Buffalo)</option>
              <option value="Bhed/Bakar">भेड़ / बकरी (Goat)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">QR / RFID Tag ID (यदि कान पर उपलब्ध हो):</label>
            <input
              type="text"
              value={tagId}
              onChange={(e) => setTagId(e.target.value)}
              placeholder="e.g. TAG-1002 (अनिवार्य नहीं)"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">स्थान / जीपीएस (Location):</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              />
              <button
                type="button"
                onClick={handleFetchGPS}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold px-3 py-2 rounded-xl flex items-center gap-1 shrink-0"
              >
                <Navigation className={`w-3.5 h-3.5 ${isFetchingLocation ? 'animate-spin' : ''}`} />
                <span>GPS ले</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">घटना का विवरण:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="सड़क पर घूम रहे आवारा या घायल पशु का विवरण लिखें..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">फोटो प्रमाण (Photo Evidence):</label>
            <div className="flex items-center gap-3">
              {photoUrl && (
                <img src={photoUrl} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
              )}
              <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>फोटो अपलोड करें</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
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
              className="w-2/3 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20"
            >
              <Send className="w-4 h-4" />
              <span>शिकायत दर्ज करें (Send Alert)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};