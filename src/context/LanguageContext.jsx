import React, { createContext, useContext, useState, useEffect } from 'react';
import { speakGuidance } from '../services/voiceGuidance';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  hi: {
    // General & Navbar
    app_name: 'पशु-धन (PashuDhan)',
    tagline: 'डिजिटल गोवंश रक्षा व प्रबंधन ऐप',
    role_citizen: 'नागरिक',
    role_tagging_agent: 'टैगिंग एजेंट',
    role_patrol_squad: 'पेट्रोलिंग स्क्वाड',
    role_pashu_malik: 'पशु मालिक',
    role_gaushala_manager: 'गोशाला मैनेजर',
    role_admin: 'एडमिन',
    scan_qr: 'QR स्कैन करें',
    file_complaint: 'शिकायत दर्ज करें',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    search_placeholder: '15-अंकीय QR Tag आईडी खोजें...',
    link_tag: 'टैग लिंक करें',

    // User Dashboard
    hero_title: 'पशु-धन गोवंश सुरक्षा पोर्टल',
    hero_subtitle: 'गोवंश के QR ear-tag को स्कैन करें या घायल/लावारिस पशु की सूचना दें।',
    sos_button: '1962 एम्बुलेंस SOS',
    rescue_stats: 'साप्ताहिक रेस्क्यू आंकड़े',
    leaderboard_title: 'गौरक्षक लीडरबोर्ड',

    // Admin Portal
    admin_title: 'मास्टर एडमिन कंट्रोल पैनल',
    admin_subtitle: 'पशुधन आंकड़े, रोल प्रबंधन व सिस्टम नियंत्रण।',
    tab_analytics: '1. एनालिटिक्स',
    tab_roles: '2. रोल प्रबंधन',
    tab_tagging_agent: '3. टैगिंग एजेंट',
    tab_patrol: '4. पेट्रोलिंग नियंत्रण',
    tab_gaushala: '5. गोशाला प्रबंधन',
    tab_system: '6. आपातकालीन ब्रॉडकास्ट',

    // Common Action Buttons
    submit: 'सबमिट करें',
    cancel: 'रद्द करें',
    close: 'बंद करें',
    view_details: 'विवरण देखें',
  },
  en: {
    // General & Navbar
    app_name: 'PashuDhan',
    tagline: 'Digital Cattle Welfare & Management Portal',
    role_citizen: 'Citizen',
    role_tagging_agent: 'Tagging Agent',
    role_patrol_squad: 'Patrol Squad',
    role_pashu_malik: 'Cattle Owner',
    role_gaushala_manager: 'Gaushala Manager',
    role_admin: 'Master Admin',
    scan_qr: 'Scan QR',
    file_complaint: 'File Complaint',
    login: 'Login',
    logout: 'Logout',
    search_placeholder: 'Search 15-digit Tag ID...',
    link_tag: 'Link Tag',

    // User Dashboard
    hero_title: 'PashuDhan Cattle Protection Portal',
    hero_subtitle: 'Scan ear-tag QR code or report stray/injured cattle instantly.',
    sos_button: '1962 Ambulance SOS',
    rescue_stats: 'Weekly Rescue Stats',
    leaderboard_title: 'GauRakshak Leaderboard',

    // Admin Portal
    admin_title: 'Master Admin Control Panel',
    admin_subtitle: 'Cattle analytics, user role management & system control.',
    tab_analytics: '1. Analytics',
    tab_roles: '2. Role Management',
    tab_tagging_agent: '3. Tagging Agent',
    tab_patrol: '4. Patrol Control',
    tab_gaushala: '5. Gaushala Management',
    tab_system: '6. Emergency Broadcast',

    // Common Action Buttons
    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close',
    view_details: 'View Details',
  },
  gu: {
    // Gujarati
    app_name: 'પશુ-ધન (PashuDhan)',
    tagline: 'ડિજિટલ ગોવંશ સુરક્ષા પોર્ટલ',
    role_citizen: 'નાગરિક',
    role_tagging_agent: 'ટેગિંગ એજન્ટ',
    role_patrol_squad: 'પેટ્રોલિંગ સ્કવોડ',
    role_pashu_malik: 'પશુપાલક',
    role_gaushala_manager: 'ગૌશાળા મેનેજર',
    role_admin: 'એડમિન',
    scan_qr: 'QR સ્કેન કરો',
    file_complaint: 'ફરિયાદ નોંધાવો',
    login: 'લોગિન',
    logout: 'લોગઆઉટ',
    search_placeholder: '15-અંકની Tag ID શોધો...',
    link_tag: 'ટેગ લિંક કરો',

    hero_title: 'પશુ-ધન ગોવંશ સુરક્ષા પોર્ટલ',
    hero_subtitle: 'ગોવંશના QR ટેગને સ્કેન કરો અથવા ઈજાગ્રસ્ત પશુની જાણ કરો.',
    sos_button: '1962 એમ્બ્યુલન્સ SOS',
    rescue_stats: 'સાપ્તાહિક રેસ્ક્યુ આંકડા',
    leaderboard_title: 'ગૌરક્ષક લીડરબોર્ડ',

    admin_title: 'માસ્ટર એડમિન કંટ્રોલ પેનલ',
    admin_subtitle: 'પશુધન આંકડા અને સિસ્ટમ કંટ્રોલ.',
    tab_analytics: '1. એનાલિટિક્સ',
    tab_roles: '2. રોલ કંટ્રોલ',
    tab_tagging_agent: '3. ટેગિંગ એજન્ટ',
    tab_patrol: '4. પેટ્રોલિંગ કંટ્રોલ',
    tab_gaushala: '5. ગૌશાળા કંટ્રોલ',
    tab_system: '6. ઈમરજન્સી બ્રોડકાસ્ટ',

    submit: 'સબમિટ કરો',
    cancel: 'રદ કરો',
    close: 'બંધ કરો',
    view_details: 'વિગતો જુઓ',
  },
  mr: {
    // Marathi
    app_name: 'पशू-धन (PashuDhan)',
    tagline: 'डिजिटल गोवंश संरक्षण व व्यवस्थापन',
    role_citizen: 'नागरीक',
    role_tagging_agent: 'टॅगिंग एजंट',
    role_patrol_squad: 'पेट्रोलिंग पथक',
    role_pashu_malik: 'पशू मालक',
    role_gaushala_manager: 'गोशाळा व्यवस्थापक',
    role_admin: 'अ‍ॅडमिन',
    scan_qr: 'QR स्कॅन करा',
    file_complaint: 'तक्रार नोंदवा',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    search_placeholder: '१५-अंकी Tag ID शोधा...',
    link_tag: 'टॅग लिंक करा',

    hero_title: 'पशू-धन गोवंश संरक्षण पोर्टल',
    hero_subtitle: 'गोवंशाचे QR टॅग स्कॅन करा किंवा जखमी पशूची तक्रार करा.',
    sos_button: '१९६२ रुग्णवाहिका SOS',
    rescue_stats: 'साप्ताहिक रेस्क्यू आकडेवारी',
    leaderboard_title: 'गोरक्षक लीडरबोर्ड',

    admin_title: 'मास्टर अ‍ॅडमिन कंट्रोल पॅनेल',
    admin_subtitle: 'पशूधन आकडेवारी व रोल व्यवस्थापन.',
    tab_analytics: '1. अ‍ॅनालिटिक्स',
    tab_roles: '2. रोल व्यवस्थापन',
    tab_tagging_agent: '3. टॅगिंग एजंट',
    tab_patrol: '4. पेट्रोलिंग नियंत्रण',
    tab_gaushala: '5. गोशाळा नियंत्रण',
    tab_system: '6. आपत्कालीन ब्रॉडकास्ट',

    submit: 'सबमिट करा',
    cancel: 'रद्द करा',
    close: 'बंद करा',
    view_details: 'तपशील पहा',
  },
  bn: {
    // Bundeli / Regional
    app_name: 'पशु-धन (PashuDhan)',
    tagline: 'डिजिटल गोवंश सुरक्षा ऐप',
    role_citizen: 'नागरिक',
    role_tagging_agent: 'टैगिंग एजेंट',
    role_patrol_squad: 'पेट्रोलिंग दल',
    role_pashu_malik: 'पशु मालिक',
    role_gaushala_manager: 'गोशाला मैनेजर',
    role_admin: 'एडमिन',
    scan_qr: 'QR स्कैन करो',
    file_complaint: 'शिकायत लिखो',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    search_placeholder: '15-अंक की टैग आईडी खोजो...',
    link_tag: 'टैग जोड़ो',

    hero_title: 'पशु-धन गोवंश सुरक्षा पोर्टल',
    hero_subtitle: 'गाय माता को QR स्कैन करो या घायल पशु की खबर दो।',
    sos_button: '1962 एम्बुलेंस SOS',
    rescue_stats: 'हफ्ते भर के आंकड़े',
    leaderboard_title: 'गौरक्षक लीडरबोर्ड',

    admin_title: 'मास्टर एडमिन कंट्रोल पैनल',
    admin_subtitle: 'पशुधन आंकड़े और कर्मचारी अधिकार।',
    tab_analytics: '1. आंकड़े',
    tab_roles: '2. रोल प्रबंधन',
    tab_tagging_agent: '3. टैगिंग एजेंट',
    tab_patrol: '4. पेट्रोलिंग नियंत्रण',
    tab_gaushala: '5. गोशाला प्रबंधन',
    tab_system: '6. ब्रॉडकास्ट अलर्ट',

    submit: 'सबमिट करो',
    cancel: 'रद्द करो',
    close: 'बंद करो',
    view_details: 'विवरण देखो',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('pashudhan_lang') || 'hi';
  });

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('pashudhan_lang', langCode);
    speakGuidance('welcome', langCode);
  };

  const t = (key) => {
    if (TRANSLATIONS[language] && TRANSLATIONS[language][key]) {
      return TRANSLATIONS[language][key];
    }
    if (TRANSLATIONS['hi'][key]) {
      return TRANSLATIONS['hi'][key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
