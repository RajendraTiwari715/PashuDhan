export type SupportedLanguage = 'hi' | 'en' | 'gu' | 'mr' | 'bn';

export const LANGUAGE_OPTIONS: { code: SupportedLanguage; label: string; voiceLang: string }[] = [
  { code: 'hi', label: 'हिंदी (Hindi)', voiceLang: 'hi-IN' },
  { code: 'en', label: 'English', voiceLang: 'en-IN' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)', voiceLang: 'gu-IN' },
  { code: 'mr', label: 'मराठी (Marathi)', voiceLang: 'mr-IN' },
  { code: 'bn', label: 'मालवी/बुंदेली (Bundeli)', voiceLang: 'hi-IN' }
];

const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  hi: {
    welcome: 'पशु-धन पोर्टल में आपका स्वागत है। गोवंश रक्षा एवं QR स्कैनिंग हेतु विकल्प चुनें।',
    scan_help: 'कैमरे के सामने 15-अंकीय QR या RFID ear-tag रखें।',
    notice_alert: 'सावधान! 500 मीटर जिओ-फेंस का उल्लंघन पाया गया है। 48 घंटे में समाधान करें।',
    emergency_ambulance: 'पशु आपातकालीन 1962 एम्बुलेंस को जीपीएस लोकेशन प्रेषित कर दी गई है।'
  },
  en: {
    welcome: 'Welcome to PashuDhan Portal. Please select an option for cattle welfare and QR scanning.',
    scan_help: 'Hold the 15-digit QR or RFID ear-tag in front of the camera.',
    notice_alert: 'Warning! 500 meters Geo-Fence violation detected. Resolve within 48 hours.',
    emergency_ambulance: 'Emergency animal ambulance 1962 dispatched with GPS location.'
  },
  gu: {
    welcome: 'પશુ-ધન પોર્ટલમાં આપનું સ્વાગત છે. ગોવંશ કલ્યાણ અને QR સ્કેનિંગ માટે વિકલ્પ પસંદ કરો.',
    scan_help: 'કેમેરા સામે 15-અંકનો QR અથવા RFID ઈયર-ટેગ રાખો.',
    notice_alert: 'ચેતવણી! 500 મીટર જીઓ-ફેન્સ ઉલ્લંઘન મળ્યું છે. 48 કલાકમાં ઉકેલ લાવો.',
    emergency_ambulance: 'ઇમરજન્સી પશુ એમ્બ્યુલન્સ 1962 જીપીએસ લોકેશન સાથે રવાના કરવામાં આવી છે.'
  },
  mr: {
    welcome: 'पशू-धन पोर्टलवर आपले स्वागत आहे. गोवंश कल्याण आणि QR स्कॅनिंगसाठी पर्याय निवडा.',
    scan_help: 'कॅमेऱ्यासमोर १५ अंकी QR किंवा RFID इअर-टॅग धरा.',
    notice_alert: 'सावधान! ५०० मीटर जिओ-फेन्स उल्लंघन आढळले आहे. ४८ तासांत तोडगा काढा.',
    emergency_ambulance: 'आणीबाणी पशू रुग्णवाहिका १९६२ जीपीएस लोकेशनसह रवाना करण्यात आली आहे.'
  },
  bn: {
    welcome: 'पशु-धन पोर्टल में तुमरो स्वागत है रे भाई। गाय माता की रक्षा और QR स्कैन करो।',
    scan_help: 'कैमरा के आगे कान को 15 नंबर वालो QR टैग लगाओ।',
    notice_alert: 'अरे सुनो! गाय 500 मीटर फेंस से बाहर चली गई है। 48 घंटे में घर लाओ।',
    emergency_ambulance: '1962 पशु एम्बुलेंस गाड़ी जीपीएस से तुरंत भेजी जा रही है।'
  }
};

export const speakGuidance = (key: string, langCode: SupportedLanguage = 'hi') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel(); // Stop current speech

  const langOption = LANGUAGE_OPTIONS.find(l => l.code === langCode) || LANGUAGE_OPTIONS[0];
  const langTranslations = TRANSLATIONS[langCode] || TRANSLATIONS['hi'];
  const textToSpeak = langTranslations[key] || TRANSLATIONS['hi'][key] || key;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = langOption.voiceLang;
  utterance.rate = 0.95; // Slightly slower for clarity
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};
