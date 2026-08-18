import React, { useState } from 'react';
import { setUserSession, getRoleForPhone } from '../services/storage';
import { Phone, KeyRound, CheckCircle2, ArrowRight, X } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [detectedRole, setDetectedRole] = useState(null);

  if (!isOpen) return null;

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      const role = getRoleForPhone(phone);
      setDetectedRole(role);
      setStep('otp');
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.length === 4 || otp === '1234') {
      const session = {
        phone,
        role: detectedRole || 'user',
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };
      setUserSession(session);
      onLoginSuccess(session);
      onClose();
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return 'मुख्य प्रशासनिक अधिकारी (Master Admin)';
      case 'tagging_agent': return 'टैगिंग एजेंट (Tagging Agent)';
      case 'patrol_squad': return 'पेट्रोलिंग स्क्वाड (Patrol Squad)';
      case 'gaushala_manager': return 'गोशाला मैनेजर (Gaushala Manager)';
      case 'pashu_malik': return 'पंजीकृत पशुपालक (Pashu Malik)';
      default: return 'नागरिक / पशुपालक यूज़र (User)';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
            <Phone className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-800">
            पशु-धन पोर्टल लॉगिन
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            मोबाइल नंबर दर्ज कर ओटीपी (OTP) द्वारा सुरक्षित प्रवेश करें
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                मोबाइल नंबर
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="उदा. 9407784182"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>ओटीपी (OTP) भेजें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 text-center text-xs space-y-1">
              <span className="text-slate-500 font-medium">पहचाना गया रोल:</span>
              <div className="font-bold text-blue-700">
                {getRoleBadge(detectedRole)}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                4-अंकों का OTP दर्ज करें
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1234"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-center text-slate-800 font-mono text-lg tracking-widest font-black focus:outline-none focus:border-blue-500"
              />
              <p className="text-[10px] text-slate-400 text-center mt-1">
                (परीक्षण हेतु OTP: 1234 का प्रयोग करें)
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>सत्यापित करें एवं लॉगिन करें</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};