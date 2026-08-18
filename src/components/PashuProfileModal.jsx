import React from 'react';
import {
  X,
  User,
  Phone,
  ShieldAlert,
  Tag,
  Radio,
  Building2,
  LogOut,
  LogIn,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  HelpCircle,
  Activity,
  Globe,
  Check
} from 'lucide-react';
import { getRoleForPhone } from '../services/storage';
import { useLanguage } from '../context/LanguageContext';

export const PashuProfileModal = ({
  isOpen,
  onClose,
  session,
  animals = [],
  onLogout,
  onOpenLogin,
  onSelectAnimal,
  onOpenLinkTagModal
}) => {
  const { language, changeLanguage, t } = useLanguage();
  if (!isOpen) return null;

  const cleanPhone = session?.phone ? session.phone.replace(/\D/g, '') : '';

  // Filter animals registered to this user's phone number
  const registeredAnimals = cleanPhone
    ? animals.filter(
        (a) => a.owner && a.owner.phone && a.owner.phone.replace(/\D/g, '') === cleanPhone
      )
    : [];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return {
          title: language === 'hi' ? 'मुख्य प्रशासनिक अधिकारी (Master Admin)' : 'Master Admin Officer',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <ShieldAlert className="w-4 h-4 text-amber-600" />
        };
      case 'tagging_agent':
        return {
          title: language === 'hi' ? 'टैगिंग एजेंट (Tagging Agent)' : 'Field Tagging Agent',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <Tag className="w-4 h-4 text-emerald-600" />
        };
      case 'patrol_squad':
        return {
          title: language === 'hi' ? 'पेट्रोलिंग स्क्वाड (Patrol Squad)' : 'Patrol Squad Incharge',
          bg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
          icon: <Radio className="w-4 h-4 text-cyan-600" />
        };
      case 'pashu_malik':
        return {
          title: language === 'hi' ? 'पशु मालिक (Cattle Owner)' : 'Registered Cattle Owner',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <User className="w-4 h-4 text-blue-600" />
        };
      case 'gaushala_manager':
        return {
          title: language === 'hi' ? 'गोशाला मैनेजर (Gaushala Manager)' : 'Gaushala Manager',
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: <Building2 className="w-4 h-4 text-rose-600" />
        };
      default:
        return {
          title: language === 'hi' ? 'आम नागरिक / अतिथि (Citizen User)' : 'Citizen / Guest User',
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: <User className="w-4 h-4 text-slate-500" />
        };
    }
  };

  const roleInfo = getRoleBadge(session?.role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl relative border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            {/* Pashu Emblem */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                  {language === 'hi' ? 'पशु' : 'PD'}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {language === 'hi' ? 'पशु-धन उपयोगकर्ता प्रोफ़ाइल' : 'PashuDhan User Profile'}
                </span>
                {session?.isLoggedIn && (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {language === 'hi' ? 'सत्र सक्रिय' : 'Active Session'}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {language === 'hi' ? 'उपयोगकर्ता प्रोफ़ाइल एवं गोवंश रिकॉर्ड' : 'User Profile & Cattle Records'}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-5 flex-1">
          
          {/* LANGUAGE SELECTION (HINDI & ENGLISH ONLY) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-cyan-600" />
                <span>{language === 'hi' ? 'भाषा चयन (App Language)' : 'Language Preference'}</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                {language === 'hi' ? 'सक्रिय: हिन्दी' : 'Active: English'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Hindi Option */}
              <button
                onClick={() => changeLanguage('hi')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  language === 'hi'
                    ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-800">हिन्दी (Hindi)</span>
                  {language === 'hi' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 mt-1">
                  सम्पूर्ण ऐप हिन्दी में
                </span>
              </button>

              {/* English Option */}
              <button
                onClick={() => changeLanguage('en')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  language === 'en'
                    ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-800">English (English)</span>
                  {language === 'en' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 mt-1">
                  Complete app in English
                </span>
              </button>
            </div>
          </div>

          {/* USER LOGIN INFORMATION CARD */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'लॉगिन विवरण (Login Information)' : 'Login Information'}</span>
              </h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border flex items-center gap-1.5 ${roleInfo.bg}`}>
                {roleInfo.icon}
                <span>{roleInfo.title}</span>
              </span>
            </div>

            {session?.isLoggedIn ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">
                    {language === 'hi' ? 'उपयोगकर्ता का नाम' : 'User Name'}
                  </span>
                  <div className="font-bold text-slate-800 text-sm">
                    {session.name || (language === 'hi' ? 'पंजीकृत उपयोगकर्ता' : 'Registered User')}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">
                    {language === 'hi' ? 'पंजीकृत मोबाइल नंबर' : 'Registered Phone Number'}
                  </span>
                  <div className="font-mono font-bold text-cyan-700 text-sm flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{session.phone}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-3 space-y-2">
                <p className="text-xs text-slate-500">
                  {language === 'hi' ? (
                    <>वर्तमान में आप <strong className="text-slate-700">अतिथि (Guest)</strong> रूप में देख रहे हैं।</>
                  ) : (
                    <>You are currently viewing as a <strong className="text-slate-700">Guest User</strong>.</>
                  )}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenLogin();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{language === 'hi' ? 'अभी मोबाइल नंबर से लॉगिन करें' : 'Login with Mobile Number'}</span>
                </button>
              </div>
            )}
          </div>

          {/* REGISTERED ANIMALS UNDER THIS MOBILE NUMBER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-600" />
                <span>
                  {language === 'hi'
                    ? `इस नंबर से पंजीकृत गोवंश (${registeredAnimals.length})`
                    : `Registered Cattle under this Number (${registeredAnimals.length})`}
                </span>
              </h3>
              {session?.isLoggedIn && (
                <span className="text-[11px] font-mono text-slate-400">
                  Phone: {session.phone}
                </span>
              )}
            </div>

            {!session?.isLoggedIn ? (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-800 space-y-1">
                <p className="font-bold">
                  {language === 'hi' ? 'पशु रिकॉर्ड देखने हेतु लॉगिन आवश्यक है।' : 'Login required to view cattle records.'}
                </p>
                <p className="text-[11px] text-amber-700">
                  {language === 'hi'
                    ? 'कृपया अपने पंजीकृत मोबाइल नंबर से लॉगिन करें ताकि आपके सभी टैग किए गए पशु यहाँ दिखाई दें।'
                    : 'Please login with your registered phone number to view all mapped livestock.'}
                </p>
              </div>
            ) : registeredAnimals.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center space-y-2">
                <Tag className="w-8 h-8 text-slate-300 mx-auto" />
                <div className="text-xs font-bold text-slate-700">
                  {language === 'hi'
                    ? 'इस मोबाइल नंबर पर कोई पशु पंजीकृत नहीं है।'
                    : 'No cattle registered under this mobile number.'}
                </div>
                <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                  {session.role === 'admin' || session.role === 'patrol_squad' || session.role === 'gaushala_manager'
                    ? (language === 'hi' ? 'यह एक प्रशासनिक/फील्ड स्टाफ नंबर है।' : 'This is an administrative/field staff account.')
                    : (language === 'hi' ? 'नया कान टैग लिंक करने हेतु टैगिंग एजेंट या पशु विभाग से संपर्क करें।' : 'Contact tagging agent or animal husbandry dept to link a tag.')}
                </p>
                {onOpenLinkTagModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenLinkTagModal();
                    }}
                    className="mt-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs inline-flex items-center gap-1.5 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'नया QR टैग लिंक करें' : 'Link New QR Tag'}</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {registeredAnimals.map((animal) => (
                  <div
                    key={animal.id || animal.tagId}
                    onClick={() => {
                      if (onSelectAnimal) {
                        onSelectAnimal(animal);
                        onClose();
                      }
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                        {animal.tagId}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                        {animal.healthStatus || (language === 'hi' ? 'स्वस्थ' : 'Healthy')}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {animal.breed || (language === 'hi' ? 'देशी गोवंश' : 'Indigenous Cattle')}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {language === 'hi'
                          ? `श्रेणी: ${animal.category === 'Gay' ? 'गाय (Cow)' : animal.category || 'गोवंश'} | आयु: ${animal.ageYears || 3} वर्ष`
                          : `Category: ${animal.category || 'Cattle'} | Age: ${animal.ageYears || 3} yrs`}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">
                        {language === 'hi' ? 'पंजीकरण:' : 'Registered:'} {animal.registeredDate || '2026-08'}
                      </span>
                      <span className="text-emerald-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        {language === 'hi' ? 'विवरण ➔' : 'View ➔'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer / Action Buttons */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {session?.isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{language === 'hi' ? 'अन्य नंबर / रोल बदलें' : 'Switch Account / Role'}</span>
              </button>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>{language === 'hi' ? 'लॉगआउट करें (Logout)' : 'Logout'}</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>{language === 'hi' ? 'मोबाइल नंबर से लॉगिन करें' : 'Login with Mobile Number'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
