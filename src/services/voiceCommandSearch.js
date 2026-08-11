







export class VoiceCommandSearchEngine {
  recognition = null;
  isListening = false;
  handlers;

  constructor(handlers) {
    this.handlers = handlers;
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'hi-IN'; // Default Hindi recognition

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Voice Command Received:', transcript);
        this.processTranscript(transcript);
      };

      this.recognition.onerror = (err) => {
        console.warn('Speech Recognition error:', err);
        this.isListening = false;
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    }
  }

  startListening() {

    if (!this.recognition) {
      alert('माइक वॉयस रिकग्निशन आपके ब्राउज़र में समर्थित नहीं है। क्रोम या एंड्रॉइड ब्राउज़र का उपयोग करें।');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      return;
    }

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (e) {
      console.error(e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  processTranscript(transcript) {
    // 1. Tag Search Command (e.g., "टैग 1001" or "tag 1001")
    const tagMatch = transcript.match(/tag\s*[-_]?\s*(\d+)/i) || transcript.match(/टैग\s*[-_]?\s*(\d+)/i);
    if (tagMatch && tagMatch[1]) {
      const tagId = `TAG-${tagMatch[1]}`;
      this.handlers.onSearchTag(tagId);
      return;
    }

    // 2. Scan Command (e.g., "स्कैन करो", "scan qr", "कैमरा खोलो")
    if (transcript.includes('स्कैन') || transcript.includes('scan') || transcript.includes('कैमरा')) {
      this.handlers.onOpenScanner();
      return;
    }

    // 3. Link Tag / Register Cow (e.g., "गाय रजिस्टर", "नया टैग", "register cow")
    if (transcript.includes('रजिस्टर') || transcript.includes('नया टैग') || transcript.includes('लिंक') || transcript.includes('register')) {
      this.handlers.onOpenLinkTag();
      return;
    }

    // 4. Admin Portal (e.g., "एडमिन", "admin", "पोर्टल")
    if (transcript.includes('एडमिन') || transcript.includes('admin')) {
      this.handlers.onNavigateAdmin();
      return;
    }

    // 5. Home (e.g., "होम", "home")
    if (transcript.includes('होम') || transcript.includes('home')) {
      this.handlers.onNavigateHome();
      return;
    }

    alert(`वॉयस कमांड: "${transcript}" पहचाना गया। 'टैग 1001', 'स्कैन करो', या 'नया टैग' बोलें।`);
  }
}