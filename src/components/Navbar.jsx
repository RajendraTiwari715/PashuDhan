import React, { useState, useEffect } from 'react';
import { isOnline } from '../services/offlineSync';
import { VoiceLanguageSelector } from './VoiceLanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, QrCode, LogIn, LogOut, Tag, Radio, User, Building2, Cpu } from 'lucide-react';

export const Navbar = ({
  session,
  onOpenLogin,
  onLogout,
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
          
          {/* Logo & Title */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                  पशु
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-wide">
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
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Language Selector */}
            <VoiceLanguageSelector />

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

            {/* Authentication Button */}
            {session ? (
              <button
                onClick={onLogout}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span className="hidden md:inline">{t('logout')}</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <LogIn className="w-4 h-4 text-amber-500" />
                <span>{t('login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};