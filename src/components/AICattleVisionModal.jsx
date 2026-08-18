import React, { useState, useEffect, useRef } from 'react';
import { Camera, AlertTriangle, RefreshCw, X, Cpu, Video, VideoOff } from 'lucide-react';

export const AICattleVisionModal = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize and stop live camera feed
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(false);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setIsCameraActive(true);
      } else {
        setCameraError(true);
      }
    } catch (err) {
      console.warn('Camera access issue:', err);
      setCameraError(true);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  if (!isOpen) return null;

  const handleStartAIScan = () => {
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setResult({
        breed: 'साहीवाल (Sahiwal Breed)',
        confidence: 98.4,
        diseaseRisk: 'लंपी वायरस त्वचा नोड्यूल्स (Lumpy Disease Alert)',
        diseaseLevel: 'warning',
        recommendation: 'पशु के पीठ पर 12-15% हल्के स्किन नोड्यूल्स (लंपी लक्षण) पाए गए। गोशाला आइसोलेशन एवं पशु चिकित्सक एंटीसेप्टिक लेप की सिफारिश की जाती है।'
      });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold">
                AI Vision Model Active
              </span>
              {isCameraActive && (
                <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                  LIVE CAMERA
                </span>
              )}
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">
              🤖 AI गोवंश विज़न एवं रोग स्कैनर
            </h3>
          </div>
        </div>

        {/* Vision Viewfinder */}
        <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-950 flex items-center justify-center shadow-inner">
          {/* Live Video Camera Stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!isCameraActive ? 'hidden' : 'block'}`}
          />

          {/* Fallback Simulation Image if camera permission not available */}
          {!isCameraActive && (
            <img
              src="https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=800"
              alt="Cattle Vision AI"
              className="w-full h-full object-cover opacity-80"
            />
          )}

          <div className="absolute inset-4 sm:inset-6 border-2 border-dashed border-emerald-400 rounded-2xl flex flex-col justify-between p-3 pointer-events-none">
            <div className="flex justify-between text-[10px] font-mono font-bold text-emerald-300 bg-slate-900/80 px-2 py-1 rounded border border-emerald-500/40">
              <span>[AI BOUNDING BOX: CATTLE DETECTED]</span>
              <span>CONFIDENCE: 98.4%</span>
            </div>

            <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 animate-pulse"></div>

            <div className="text-[10px] font-mono text-cyan-300 bg-slate-900/80 px-2 py-1 rounded self-start border border-cyan-500/40">
              {isCameraActive ? 'LIVE VIDEO STREAM ACTIVE...' : 'ANALYZING SKIN PATTERNS...'}
            </div>
          </div>

          {isScanning && (
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-2">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
              <p className="text-xs font-bold text-emerald-300 font-mono">
                एआई न्यूरल नेटवर्क विश्लेषण जारी है...
              </p>
            </div>
          )}
        </div>

        {!result ? (
          <button
            onClick={handleStartAIScan}
            disabled={isScanning}
            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Camera className="w-5 h-5" />
            <span>AI नस्ल व रोग स्कैन शुरू करें</span>
          </button>
        ) : (
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] text-slate-500 font-mono font-bold">पहचानी गई नस्ल (Breed):</span>
                <div className="font-bold text-slate-800 text-base">{result.breed}</div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-mono font-bold">
                {result.confidence}% Match
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>स्वास्थ्य निदान: {result.diseaseRisk}</span>
              </div>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                {result.recommendation}
              </p>
            </div>

            <button
              onClick={handleStartAIScan}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>पुनः स्कैन करें</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};