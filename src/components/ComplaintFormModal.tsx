import React, { useState } from 'react';
import type { Animal, Complaint } from '../types';
import { createComplaint } from '../services/storage';
import confetti from 'canvas-confetti';
import { 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  X, 
  Navigation,
  Send
} from 'lucide-react';

interface ComplaintFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetAnimal?: Animal;
  userPhone?: string;
  onComplaintSubmitted: (complaint: Complaint) => void;
}

export const ComplaintFormModal: React.FC<ComplaintFormModalProps> = ({
  isOpen,
  onClose,
  targetAnimal,
  userPhone = '98765 43210',
  onComplaintSubmitted
}) => {
  const [tagId, setTagId] = useState(targetAnimal?.tagId || '');
  const [category, setCategory] = useState<Animal['category']>(targetAnimal?.category || 'Gay');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <AlertTriangle className="w-7 h-7 text-white animate-bounce" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">लावारिस / सड़क पर पशु शिकायत दर्ज करें</h3>
          <p className="text-xs text-slate-400 mt-1">
            जीपीएस लोकेशन की मदद से निकटतम पशु विभाग एवं पुलिस थाने को स्वतः अलर्ट भेजा जाएगा
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Tag Code & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                पशु QR टैग कोड (Animal Tag ID)
              </label>
              <input
                type="text"
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                placeholder="TAG-1001 या बिना टैग का पशु"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm uppercase placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                पशु प्रकार (Species)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Animal['category'])}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="Gay">गाय (Cow)</option>
                <option value="Bail">बैल (Ox / Bull)</option>
                <option value="Bachada">बछड़ा / बछड़ी (Calf)</option>
                <option value="Bhais">भैंस (Buffalo)</option>
                <option value="Other">अन्य आवारा पशु (Other)</option>
              </select>
            </div>
          </div>

          {/* Photo Proof Upload Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>पशु की फोटो प्रमाण संलग्न करें (Photo Proof)</span>
              <span className="text-[10px] text-amber-400 font-normal">* अनिवार्य</span>
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-900 flex items-center justify-center relative">
                {photoUrl ? (
                  <img src={photoUrl} alt="Photo proof" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-slate-600" />
                )}
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-proof-file"
                />
                <label
                  htmlFor="photo-proof-file"
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3 py-2 rounded-xl border border-slate-700 text-xs cursor-pointer transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>कैमरा / गैलरी से फोटो चुनें</span>
                </label>
                <p className="text-[10px] text-slate-400">
                  सड़क पर घूम रहे या घायल पशु का स्पष्ट चित्र अपलोड करें
                </p>
              </div>
            </div>
          </div>

          {/* Google Location Auto-Fetch Banner */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>गूगल मैप्स जीपीएस लोकेशन (Google GPS Auto-Fetch)</span>
              </div>
              <button
                type="button"
                onClick={handleFetchGPS}
                disabled={isFetchingLocation}
                className="text-[11px] bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors"
              >
                <Navigation className={`w-3 h-3 text-emerald-400 ${isFetchingLocation ? 'animate-spin' : ''}`} />
                <span>{isFetchingLocation ? 'फैच हो रहा है...' : 'लोकेशन पुनः फैच करें'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono">
              {cityName}
            </div>

            {/* Auto matched departments callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-semibold text-cyan-300">पशु विभाग (Auto-Matched):</div>
                  <div className="text-slate-400 truncate">जिला पशु चिकित्सालय भोपाल</div>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-semibold text-amber-300">पुलिस थाना (Cattle Patrol):</div>
                  <div className="text-slate-400 truncate">एम.पी. नगर थाना भोपाल</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              शिकायत का विवरण (Description / Location Landmark)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="पशु की स्थिति एवं लैंडमार्क दर्ज करें..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Complainant Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                आपका नाम (Complainant Name)
              </label>
              <input
                type="text"
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                संपर्क मोबाइल नंबर (Contact Phone)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-rose-950/40 transition-all flex items-center justify-center gap-2 text-sm border border-amber-400/30"
          >
            <Send className="w-4 h-4" />
            <span>शिकायत दर्ज करें एवं पशु विभाग को भेजें</span>
          </button>

        </form>

      </div>
    </div>
  );
};
