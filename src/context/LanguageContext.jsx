import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  hi: {
    // Navbar & Common
    app_name: 'पशु-धन',
    tagline: 'डिजिटल गोवंश रक्षा व प्रबंधन पोर्टल',
    role_citizen: 'नागरिक',
    role_tagging_agent: 'टैगिंग एजेंट',
    role_patrol_squad: 'पेट्रोलिंग स्क्वाड',
    role_pashu_malik: 'पशु मालिक',
    role_gaushala_manager: 'गोशाला मैनेजर',
    role_admin: 'एडमिन',
    scan_qr: 'QR स्कैन',
    file_complaint: 'शिकायत दर्ज करें',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    search_placeholder: '15-अंकीय QR Tag खोजें...',
    link_tag: 'टैग लिंक करें',
    back: 'वापस जाएं',

    // Dashboard & Actions
    hero_title: 'राष्ट्रीय गोवंश सुरक्षा पोर्टल',
    hero_subtitle: 'पशु के कान पर लगे QR ear-tag को स्कैन करें या लावारिस/घायल पशु की रिपोर्ट करें।',
    sos_button: '1962 एम्बुलेंस SOS',
    rescue_stats: 'साप्ताहिक रेस्क्यू आंकड़े',
    leaderboard_title: 'गौरक्षा लीडरबोर्ड',

    // Profile & Language
    profile_title: 'उपयोगकर्ता प्रोफ़ाइल एवं गोवंश रिकॉर्ड',
    language_select: 'भाषा चयन (Language)',
    lang_hi: 'हिन्दी (Hindi)',
    lang_en: 'English (अंग्रेज़ी)',
    login_info: 'लॉगिन विवरण',
    registered_cattle: 'इस नंबर से पंजीकृत गोवंश',

    // Admin
    admin_title: 'मास्टर एडमिन कंट्रोल पैनल',
    admin_subtitle: 'पशुधन आंकड़े, कर्मचारी रोल व सिस्टम नियंत्रण।',
    tab_analytics: '1. एनालिटिक्स',
    tab_roles: '2. रोल प्रबंधन',
    tab_tagging_agent: '3. टैगिंग एजेंट',
    tab_patrol: '4. पेट्रोलिंग नियंत्रण',
    tab_gaushala: '5. गोशाला प्रबंधन',
    tab_complaints: '6. शिकायत प्रबंधन (CAD)',
    tab_system: '7. आपातकालीन ब्रॉडकास्ट',

    // Patrol
    patrol_title: '1-2m लांग-रेंज RFID स्कैनिंग व गश्त',
    case_a: 'Case A (सुरक्षित परिसर)',
    case_b: 'Case B (जिओ-फेंस उल्लंघन)',
    case_c: 'Case C (लावारिस रेस्क्यू)',
    case_limit_msg: 'एक पशु पर 24 घंटे में केवल 1 केस दर्ज हो सकता है।',

    // Gaushala
    gaushala_title: 'गोशाला प्रबंधन व कस्टडी ट्रांसफर',
    step_1: '1. रेस्क्यू नेविगेशन',
    step_2: '2. लोडिंग व ट्रांसपोर्ट',
    step_3: '3. इनटेक QR स्कैन',
    step_4: '4. कस्टडी ट्रांसफर',
    step_5: '5. क्वारंटीन व फीड',

    // Buttons
    submit: 'सबमिट करें',
    cancel: 'रद्द करें',
    close: 'बंद करें',
    view_details: 'विवरण देखें',
  },
  en: {
    // Navbar & Common
    app_name: 'PashuDhan',
    tagline: 'Digital Cattle Protection & Rescue Portal',
    role_citizen: 'Citizen',
    role_tagging_agent: 'Tagging Agent',
    role_patrol_squad: 'Patrol Squad',
    role_pashu_malik: 'Cattle Owner',
    role_gaushala_manager: 'Gaushala Manager',
    role_admin: 'Admin',
    scan_qr: 'Scan QR',
    file_complaint: 'File Complaint',
    login: 'Login',
    logout: 'Logout',
    search_placeholder: 'Search 15-digit Tag ID...',
    link_tag: 'Link Tag',
    back: 'Back',

    // Dashboard & Actions
    hero_title: 'National Cattle Protection Portal',
    hero_subtitle: 'Scan cattle ear-tag QR code or report stray/injured animals.',
    sos_button: '1962 Ambulance SOS',
    rescue_stats: 'Weekly Rescue Stats',
    leaderboard_title: 'GauRakshak Leaderboard',

    // Profile & Language
    profile_title: 'User Profile & Cattle Records',
    language_select: 'Select Language',
    lang_hi: 'हिन्दी (Hindi)',
    lang_en: 'English',
    login_info: 'Login Information',
    registered_cattle: 'Registered Cattle Under This Number',

    // Admin
    admin_title: 'Master Admin Control Panel',
    admin_subtitle: 'Cattle analytics, user roles & system control.',
    tab_analytics: '1. Analytics',
    tab_roles: '2. Role Management',
    tab_tagging_agent: '3. Tagging Agent',
    tab_patrol: '4. Patrol Control',
    tab_gaushala: '5. Gaushala Management',
    tab_complaints: '6. Complaints (CAD)',
    tab_system: '7. Emergency Broadcast',

    // Patrol
    patrol_title: '1-2m Long-Range RFID Patrol',
    case_a: 'Case A (Safe On-Premises)',
    case_b: 'Case B (Geo-Fence Violation)',
    case_c: 'Case C (Unowned Rescue)',
    case_limit_msg: 'Only 1 case per cattle can be filed in 24 hours.',

    // Gaushala
    gaushala_title: 'Gaushala Custody & Transfer',
    step_1: '1. Rescue Navigation',
    step_2: '2. Transport Loading',
    step_3: '3. Gate Intake QR Scan',
    step_4: '4. Custody Transfer',
    step_5: '5. Quarantine & Feed',

    // Buttons
    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close',
    view_details: 'View Details',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('pashudhan_lang') || 'hi';
  });

  const changeLanguage = (langCode) => {
    const valid = langCode === 'en' ? 'en' : 'hi';
    setLanguage(valid);
    localStorage.setItem('pashudhan_lang', valid);
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
