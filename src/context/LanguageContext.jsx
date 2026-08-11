import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  hi: {
    // Navbar
    app_name: 'पशु-धन',
    tagline: 'डिजिटल गोवंश रक्षा व प्रबंधन',
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
    leaderboard_title: 'गौरक्षक लीडरबोर्ड',

    // Admin
    admin_title: 'मास्टर एडमिन कंट्रोल पैनल',
    admin_subtitle: 'पशुधन आंकड़े, कर्मचारी रोल व सिस्टम नियंत्रण।',
    tab_analytics: '1. एनालिटिक्स',
    tab_roles: '2. रोल प्रबंधन',
    tab_tagging_agent: '3. टैगिंग एजेंट',
    tab_patrol: '4. पेट्रोलिंग नियंत्रण',
    tab_gaushala: '5. गोशाला प्रबंधन',
    tab_system: '6. आपातकालीन ब्रॉडकास्ट',

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
    app_name: 'PashuDhan',
    tagline: 'Digital Cattle Protection Portal',
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

    hero_title: 'National Cattle Protection Portal',
    hero_subtitle: 'Scan cattle ear-tag QR code or report stray/injured animals.',
    sos_button: '1962 Ambulance SOS',
    rescue_stats: 'Weekly Rescue Stats',
    leaderboard_title: 'GauRakshak Leaderboard',

    admin_title: 'Master Admin Control Panel',
    admin_subtitle: 'Cattle analytics, user roles & system control.',
    tab_analytics: '1. Analytics',
    tab_roles: '2. Role Management',
    tab_tagging_agent: '3. Tagging Agent',
    tab_patrol: '4. Patrol Control',
    tab_gaushala: '5. Gaushala Management',
    tab_system: '6. Emergency Broadcast',

    patrol_title: '1-2m Long-Range RFID Patrol',
    case_a: 'Case A (Safe On-Premises)',
    case_b: 'Case B (Geo-Fence Violation)',
    case_c: 'Case C (Unowned Rescue)',
    case_limit_msg: 'Only 1 case per cattle can be filed in 24 hours.',

    gaushala_title: 'Gaushala Custody & Transfer',
    step_1: '1. Rescue Navigation',
    step_2: '2. Transport Loading',
    step_3: '3. Gate Intake QR Scan',
    step_4: '4. Custody Transfer',
    step_5: '5. Quarantine & Feed',

    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close',
    view_details: 'View Details',
  },
  gu: {
    app_name: 'પશુ-ધન',
    tagline: 'ડિજિટલ ગોવંશ સુરક્ષા પોર્ટલ',
    role_citizen: 'નાગરિક',
    role_tagging_agent: 'ટેગિંગ એજન્ટ',
    role_patrol_squad: 'પેટ્રોલિંગ સ્કવોડ',
    role_pashu_malik: 'પશુપાલક',
    role_gaushala_manager: 'ગૌશાળા મેનેજર',
    role_admin: 'એડમિન',
    scan_qr: 'QR સ્કેન',
    file_complaint: 'ફરિયાદ નોંધાવો',
    login: 'લોગિન',
    logout: 'લોગઆઉટ',
    search_placeholder: '15-અંકની Tag ID શોધો...',
    link_tag: 'ટેગ લિંક કરો',
    back: 'પાછા જાઓ',

    hero_title: 'રાષ્ટ્રીય ગોવંશ સુરક્ષા પોર્ટલ',
    hero_subtitle: 'ગોવંશના QR ટેગને સ્કેન કરો અથવા ઈજાગ્રસ્ત પશુની જાણ કરો.',
    sos_button: '1962 એમ્બ્યુલન્સ SOS',
    rescue_stats: 'સાપ્તાહિક રેસ્ક્યુ આંકડા',
    leaderboard_title: 'ગૌરક્ષક લીડરબોર્ડ',

    admin_title: 'માસ્ટર એડમિન કંટ્રોલ પેનલ',
    admin_subtitle: 'પશુધન આંકડા અને રોલ કંટ્રોલ.',
    tab_analytics: '1. એનાલિટિક્સ',
    tab_roles: '2. રોલ કંટ્રોલ',
    tab_tagging_agent: '3. ટેગિંગ એજન્ટ',
    tab_patrol: '4. પેટ્રોલિંગ કંટ્રોલ',
    tab_gaushala: '5. ગૌશાળા કંટ્રોલ',
    tab_system: '6. ઈમરજન્સી બ્રોડકાસ્ટ',

    patrol_title: '1-2m RFID ગશ્ત',
    case_a: 'Case A (સુરક્ષિત પરંપરા)',
    case_b: 'Case B (જીઓ-ફેન્સ ઉલ્લંઘન)',
    case_c: 'Case C (અનાથ રેસ્ક્યુ)',
    case_limit_msg: 'એક પશુ પર 24 કલાકમાં માત્ર 1 केस થઈ શકે છે.',

    gaushala_title: 'ગૌશાળા મેનેજમેન્ટ',
    step_1: '1. રેસ્ક્યુ નેવિગેશન',
    step_2: '2. ટ્રાન્સપોર્ટ લોડિંગ',
    step_3: '3. ગેટ ઈન્ટેક QR સ્કેન',
    step_4: '4. કસ્ટડી ટ્રાન્સફર',
    step_5: '5. ક્વોરેન્ટાઈન અને ફીડ',

    submit: 'સબમિટ કરો',
    cancel: 'રદ કરો',
    close: 'બંધ કરો',
    view_details: 'વિગતો જુઓ',
  },
  mr: {
    app_name: 'पशू-धन',
    tagline: 'डिजिटल गोवंश संरक्षण पोर्टल',
    role_citizen: 'नागरीक',
    role_tagging_agent: 'टॅगिंग एजंट',
    role_patrol_squad: 'पेट्रोलिंग पथक',
    role_pashu_malik: 'पशू मालक',
    role_gaushala_manager: 'गोशाळा व्यवस्थापक',
    role_admin: 'अ‍ॅडमिन',
    scan_qr: 'QR स्कॅन',
    file_complaint: 'तक्रार नोंदवा',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    search_placeholder: '१५-अंकी Tag ID शोधा...',
    link_tag: 'टॅग लिंक करा',
    back: 'मागे जा',

    hero_title: 'राष्ट्रीय गोवंश संरक्षण पोर्टल',
    hero_subtitle: 'गोवंशाचे QR टॅग स्कॅन करा किंवा जखमी पशूची तक्रार करा.',
    sos_button: '१९६२ रुग्णवाहिका SOS',
    rescue_stats: 'साप्ताहिक रेस्क्यू आकडेवारी',
    leaderboard_title: 'गोरक्षक लीडरबोर्ड',

    admin_title: 'मास्टर अ‍ॅडमिन कंट्रोल पॅनेल',
    admin_subtitle: 'पशूधन आकडेवारी व नियंत्रण.',
    tab_analytics: '1. अ‍ॅनालिटिक्स',
    tab_roles: '2. रोल व्यवस्थापन',
    tab_tagging_agent: '3. टॅगिंग एजंट',
    tab_patrol: '4. पेट्रोलिंग नियंत्रण',
    tab_gaushala: '5. गोशाळा नियंत्रण',
    tab_system: '6. आपत्कालीन ब्रॉडकास्ट',

    patrol_title: '1-2m RFID गस्त',
    case_a: 'Case A (सुरक्षित परिसर)',
    case_b: 'Case B (जिओ-फेन्स उल्लंघन)',
    case_c: 'Case C (बेवारस रेस्क्यू)',
    case_limit_msg: 'एका पशूवर २४ तासांत फक्त १ केस नोंदवता येईल.',

    gaushala_title: 'गोशाळा व्यवस्थापन',
    step_1: '1. रेस्क्यू नेव्हिगेशन',
    step_2: '2. ट्रान्सपोर्ट लोडिंग',
    step_3: '3. गेट इनटेक QR स्कॅन',
    step_4: '4. कस्टडी ट्रान्सफर',
    step_5: '5. क्वारंटाईन व फीड',

    submit: 'सबमिट करा',
    cancel: 'रद्द करा',
    close: 'बंद करा',
    view_details: 'तपशील पहा',
  },
  bn: {
    app_name: 'पशु-धन',
    tagline: 'डिजिटल गोवंश सुरक्षा',
    role_citizen: 'नागरिक',
    role_tagging_agent: 'टैगिंग एजेंट',
    role_patrol_squad: 'पेट्रोलिंग दल',
    role_pashu_malik: 'पशु मालिक',
    role_gaushala_manager: 'गोशाला मैनेजर',
    role_admin: 'एडमिन',
    scan_qr: 'QR स्कैन',
    file_complaint: 'शिकायत लिखो',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    search_placeholder: '15-अंक की टैग आईडी खोजो...',
    link_tag: 'टैग जोड़ो',
    back: 'वापस जाओ',

    hero_title: 'राष्ट्रीय गोवंश सुरक्षा पोर्टल',
    hero_subtitle: 'गाय माता को QR स्कैन करो या घायल पशु की खबर दो।',
    sos_button: '1962 एम्बुलेंस SOS',
    rescue_stats: 'हफ्ते भर के आंकड़े',
    leaderboard_title: 'गौरक्षक लीडरबोर्ड',

    admin_title: 'मास्टर एडमिन कंट्रोल पैनल',
    admin_subtitle: 'पशुधन आंकड़े और नियंत्रण।',
    tab_analytics: '1. आंकड़े',
    tab_roles: '2. रोल प्रबंधन',
    tab_tagging_agent: '3. टैगिंग एजेंट',
    tab_patrol: '4. पेट्रोलिंग नियंत्रण',
    tab_gaushala: '5. गोशाला प्रबंधन',
    tab_system: '6. ब्रॉडकास्ट अलर्ट',

    patrol_title: '1-2m RFID गश्त',
    case_a: 'Case A (सुरक्षित परिसर)',
    case_b: 'Case B (जिओ-फेंस उल्लंघन)',
    case_c: 'Case C (लावारिस रेस्क्यू)',
    case_limit_msg: 'एक गाय पे 24 घंटे में 1 ही केस लग सकत है।',

    gaushala_title: 'गोशाला प्रबंधन',
    step_1: '1. रेस्क्यू नेविगेशन',
    step_2: '2. लोडिंग व ट्रांसपोर्ट',
    step_3: '3. इनटेक QR स्कैन',
    step_4: '4. कस्टडी ट्रांसफर',
    step_5: '5. क्वारंटीन व फीड',

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
