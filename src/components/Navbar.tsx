import React, { useState, useEffect } from 'react';
import type { UserSession } from '../types';
import { isOnline } from '../services/offlineSync';
import { VoiceLanguageSelector } from './VoiceLanguageSelector';
import { VoiceCommandMicButton } from './VoiceCommandMicButton';
import { ShieldAlert, QrCode, LogIn, LogOut, Tag, Radio, User, Building2, Cpu, MessageSquare, Bluetooth, Wifi, WifiOff } from 'lucide-react';

interface NavbarProps {
  session: UserSession | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenScanner: () => void;
  onOpenAIVision: () => void;
  onOpenWhatsApp: () => void;
  onOpenBluetooth: () => void;
  onSearchTag: (tagId: string) => void;
  onOpenLinkTagModal: () => void;
  activeTab: 'home' | 'admin' | 'complaints';
  setActiveTab: (tab: 'home' | 'admin' | 'complaints') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  session,
  onOpenLogin,
  onLogout,
  onOpenScanner,
  onOpenAIVision,
  onOpenWhatsApp,
  onOpenBluetooth,
  onSearchTag,
  onOpenLinkTagModal,
  setActiveTab,
}) => {
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

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'admin':
        return (
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-400" /> एडमिन
          </span>
        );
      case 'tagging_agent':
        return (
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Tag className="w-3 h-3 text-emerald-400" /> टैगिंग एजेंट
          </span>
        );
      case 'patrol_squad':
        return (
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400" /> पेट्रोल स्क्वाड
          </span>
        );
      case 'pashu_malik':
        return (
          <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <User className="w-3 h-3 text-blue-400" /> पशुपालक
          </span>
        );
      case 'gaushala_manager':
        return (
          <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Building2 className="w-3 h-3 text-rose-400" /> गोशाला
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & Branding */}
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
                    पशु-धन <span className="text-emerald-400 font-normal text-xs sm:text-sm">PashuDhan</span>
                  </h1>
                  <div className="hidden sm:block">{session && getRoleBadge(session.role)}</div>
                </div>
                <p className="text-[11px] text-slate-400 hidden md:block">
                  राष्ट्रीय सनातनी गोवंश रक्षा, QR टैगिंग एवं डिजिटल गवर्नेंस पोर्टल
                </p>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Hands-free Voice Command Mic Button */}
              <VoiceCommandMicButton
                onSearchTag={onSearchTag}
                onOpenScanner={onOpenScanner}
                onOpenLinkTag={onOpenLinkTagModal}
                onNavigateHome={() => setActiveTab('home')}
                onNavigateAdmin={() => setActiveTab('admin')}
              />

              {/* 5-Language Voice Selector */}
              <VoiceLanguageSelector />

              {/* Online / Offline Sync Indicator */}
              <div
                className={`flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full border ${
                  onlineState 
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                }`}
                title={onlineState ? 'ऑनलाइन सर्वर सिंक एक्टिव' : 'ऑफलाइन मोड active - डेटा लोकल सेव होगा'}
              >
                {onlineState ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
                <span className="hidden sm:inline">{onlineState ? 'Online' : 'Offline Mode'}</span>
              </div>

              {/* AI Vision Scanner Button */}
              <button
                onClick={onOpenAIVision}
                className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-500/20 text-emerald-300 border border-slate-700 hover:border-emerald-500/40 transition-colors"
                title="AI गोवंश नस्ल व लंपी रोग स्कैनर"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
              </button>

              {/* WhatsApp E-Notice Dispatcher Button */}
              <button
                onClick={onOpenWhatsApp}
                className="p-2 rounded-xl bg-slate-800 hover:bg-green-500/20 text-green-300 border border-slate-700 hover:border-green-500/40 transition-colors"
                title="व्हाट्सएप ई-नोटिस प्रेषक"
              >
                <MessageSquare className="w-4 h-4 text-green-400" />
              </button>

              {/* Bluetooth RFID Link Button */}
              <button
                onClick={onOpenBluetooth}
                className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors"
                title="ब्लूटूथ RFID रीडर पेयरिंग"
              >
                <Bluetooth className="w-4 h-4 text-cyan-400" />
              </button>

              {/* QR Scanner Launch Button */}
              <button
                onClick={onOpenScanner}
                className="flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-md transition-all text-xs"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">QR स्कैन</span>
              </button>

              {/* Auth Login / Logout */}
              {session ? (
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                  title="लॉगआउट"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                  <span>लॉगिन</span>
                </button>
              )}

            </div>

          </div>
        </div>
      </header>
    </>
  );
};
