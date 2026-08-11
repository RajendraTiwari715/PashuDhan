import React, { useState, useEffect } from 'react';
import { isOnline } from '../services/offlineSync';
import { VoiceLanguageSelector } from './VoiceLanguageSelector';
import { VoiceCommandMicButton } from './VoiceCommandMicButton';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, QrCode, LogIn, LogOut, Tag, Radio, User, Building2, Cpu, MessageSquare, Bluetooth, Wifi, WifiOff } from 'lucide-react';

export const Navbar = ({
  session,
  onOpenLogin,
  onLogout,
  onOpenScanner,
  onOpenAIVision,
  onOpenWhatsApp,
  onOpenBluetooth,
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
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-400" /> {t('role_admin')}
          </span>
        );
      case 'tagging_agent':
        return (
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Tag className="w-3 h-3 text-emerald-400" /> {t('role_tagging_agent')}
          </span>
        );
      case 'patrol_squad':
        return (
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400" /> {t('role_patrol_squad')}
          </span>
        );
      case 'pashu_malik':
        return (
          <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <User className="w-3 h-3 text-blue-400" /> {t('role_pashu_malik')}
          </span>
        );
      case 'gaushala_manager':
        return (
          <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Building2 className="w-3 h-3 text-rose-400" /> {t('role_gaushala_manager')}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Title */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-cyan-300">
                  पशु
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  {t('app_name')}
                </h1>
                <div className="hidden sm:block">
                  {session && getRoleBadge(session.role)}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Voice Mic Button */}
            <VoiceCommandMicButton
              onSearchTag={onSearchTag}
              onOpenScanner={onOpenScanner}
              onOpenLinkTag={onOpenLinkTagModal}
              onNavigateHome={() => setActiveTab('home')}
              onNavigateAdmin={() => setActiveTab('admin')}
            />

            {/* Language Selector */}
            <VoiceLanguageSelector />

            {/* Network Indicator */}
            <div
              className={`flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full border ${
                onlineState
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
              }`}
              title={onlineState ? 'ऑनलाइन सर्वर सिंक' : 'ऑफलाइन मोड'}
            >
              {onlineState ? (
                <>
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">Offline</span>
                </>
              )}
            </div>

            {/* Quick Action Tools */}
            <button
              onClick={onOpenAIVision}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="AI Cattle Vision"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="hidden lg:inline">AI Vision</span>
            </button>

            <button
              onClick={onOpenScanner}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">{t('scan_qr')}</span>
            </button>

            {/* Authentication Button */}
            {session ? (
              <button
                onClick={onLogout}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span className="hidden md:inline">{t('logout')}</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>{t('login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};