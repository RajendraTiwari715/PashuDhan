import React, { useState } from 'react';
import type { UserSession } from '../types';
import { setUserSession, getRoleForPhone } from '../services/storage';
import { Phone, KeyRound, CheckCircle2, ArrowRight, X } from 'lucide-react';


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phone.trim().replace(/\D/g, '');
    if (clean.length < 8) {
      setError('कृपया सही मोबाइल नंबर दर्ज करें।');
      return;
    }

    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('कृपया सही OTP दर्ज करें।');
      return;
    }

    const clean = phone.trim().replace(/\D/g, '');
    const assignedRole = getRoleForPhone(clean);

    const session: UserSession = {
      phone: clean,
      role: assignedRole,
      isLoggedIn: true
    };

    setUserSession(session);
    onLoginSuccess(session);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700/80">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Phone className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">पशु-धन पोर्टल लॉगिन</h2>
          <p className="text-xs text-slate-400 mt-1">
            पंजीकृत मोबाइल नंबर एवं OTP द्वारा सत्यापित करें
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                मोबाइल नंबर (Mobile Number)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-sm font-semibold text-slate-400">
                  +91
                </span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="आपका मोबाइल नंबर दर्ज करें"
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-14 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-sm"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>OTP प्राप्त करें (Send OTP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  6-अंकों का OTP दर्ज करें
                </label>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP दर्ज करें"
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white tracking-widest font-mono text-lg placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-center"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                प्रमाणन कोड नंबर <span className="font-mono text-slate-200">{phone}</span> पर भेजा गया है
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-xl border border-slate-700 text-xs"
              >
                नंबर बदलें
              </button>
              <button
                type="submit"
                className="w-2/3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>सत्यापित करें एवं लॉगिन करें</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
