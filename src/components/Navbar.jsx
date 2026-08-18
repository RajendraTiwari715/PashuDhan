import React, { useState, useEffect } from 'react';
import { isOnline } from '../services/offlineSync';
import { VoiceLanguageSelector } from './VoiceLanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, QrCode, LogIn, LogOut, Tag, Radio, User, Building2, Cpu } from 'lucide-react';

export const Navbar = ({
  session,
  onOpenLogin,
  onLogout,
  onOpenPashuProfile,
  onOpenScanner,
  onOpenAIVision,
  onSearchTag,
  onOpenLinkTagModal,
  setActiveTab
}) => {
  const { t } = useLanguage();
  const [onlineState, setOnlineState] = useState(true);

  useEffect(() => {
    setOnlineState(isOnline());
    const handleOnline = () => setOnlineState(true);
    const handleOffline = () => setOnlineState(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return (
          <span className="bg-amber-50 text-amber-600 border border-amber-200 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-500" /> {t('role_admin')}
          </span>
        );
      case 'tagging_agent':
        return (
          <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Tag className="w-3 h-3 text-emerald-500" /> {t('role_tagging_agent')}
          </span>
        );
      case 'patrol_squad':
        return (
          <span className="bg-cyan-50 text-cyan-600 border border-cyan-200 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-500" /> {t('role_patrol_squad')}
          </span>
        );
      case 'pashu_malik':
        return (
          <span className="bg-blue-50 text-blue-600 border border-blue-200 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <User className="w-3 h-3 text-blue-500" /> {t('role_pashu_malik')}
          </span>
        );
      case 'gaushala_manager':
        return (
          <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Building2 className="w-3 h-3 text-rose-500" /> {t('role_gaushala_manager')}
          </span>
        );
      default:
        return null;
    }
  };

  const isAdmin = session?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Pashu Symbol Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPashuProfile}
              className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl p-1 -m-1"
              title="पशु सिंबल पर क्लिक करें: यूज़र लॉगिन जानकारी, पंजीकृत पशु व लॉगिन/लॉगआउट"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-md group-hover:scale-105 transition-all duration-300 relative">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                    पशु
                  </span>
                </div>
                {/* Active user dot */}
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-wide group-hover:text-emerald-700 transition-colors">
                    {t('app_name')}
                  </h1>
                  <div className="hidden sm:block">
                    {session && getRoleBadge(session.role)}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 hidden md:block">
                  {t('tagline')}
                </p>
              </div>
            </button>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Online Server Indicator - SHOW ONLY FOR ADMIN */}
            {isAdmin && (
              <div
                className={`flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full border ${
                  onlineState
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-amber-50 text-amber-600 border-amber-200 animate-pulse'
                }`}
                title={onlineState ? 'ऑनलाइन सर्वर सिंक (Admin Only)' : 'ऑफलाइन मोड'}
              >
                <span className={`w-2 h-2 rounded-full ${onlineState ? 'bg-emerald-500' : 'bg-amber-500'} animate-ping`}></span>
                <span className="hidden sm:inline">Online Server</span>
              </div>
            )}

            {/* Quick Action Tools */}
            <button
              onClick={onOpenAIVision}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-cyan-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="AI Vision"
            >
              <Cpu className="w-4 h-4 text-cyan-600" />
              <span className="hidden lg:inline">AI Vision</span>
            </button>

            <button
              onClick={onOpenScanner}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">{t('scan_qr')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};