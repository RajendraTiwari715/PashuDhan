import React, { useState, useEffect, useRef } from 'react';
import { getAnimalByTagId, getBlankTags } from '../services/storage';
import { QrCode, Camera, Search, X, AlertCircle } from 'lucide-react';

export const QRScannerModal = ({ isOpen, onClose, onSelectAnimal, onSelectBlankTag }) => {
  const [manualTagId, setManualTagId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

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
      }
    } catch (err) {
      console.warn('QR Scanner Camera issue:', err);
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

  const handleProcessTag = (tagId) => {
    const clean = tagId.trim().toUpperCase();
    if (!clean) return;

    const matchedAnimal = getAnimalByTagId(clean);
    if (matchedAnimal) {
      stopCamera();
      onSelectAnimal(matchedAnimal);
      onClose();
      return;
    }

    const blankTags = getBlankTags();
    const matchedBlank = blankTags.find(t => t.tagId.toUpperCase() === clean);
    if (matchedBlank) {
      stopCamera();
      if (onSelectBlankTag) {
        onSelectBlankTag(matchedBlank.tagId);
      } else {
        setErrorMessage(`यह टैग (${clean}) अप्रयुक्त है। कृपया टैगिंग एजेंट डैशबोर्ड से टैग करें।`);
      }
      onClose();
      return;
    }

    setErrorMessage(`कोई रिकॉर्ड नहीं मिला: ${clean} (कृपया नया टैग ID जाँचें)`);
  };

  const sampleTags = ['MP-04-G-8821', 'MP-04-G-9932', 'MP-04-G-1102', 'TAG-8821'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200">
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
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shadow-sm">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-cyan-50 text-cyan-700 border border-cyan-200 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold">
                ISO 11784 QR / Ear Tag
              </span>
              {isCameraActive && (
                <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                  CAMERA ON
                </span>
              )}
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">
              QR टैग स्कैनर एवं खोज
            </h3>
          </div>
        </div>

        {/* Viewfinder scanner box */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden border-2 border-cyan-500/50 bg-slate-950 flex items-center justify-center shadow-inner mb-6">
          {/* Live camera stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!isCameraActive ? 'hidden' : 'block'}`}
          />

          <div className="absolute inset-4 border-2 border-dashed border-cyan-400 rounded-xl flex flex-col justify-between p-3 pointer-events-none">
            <div className="flex justify-between text-[10px] font-mono font-bold text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/40">
              <span>{isCameraActive ? '[LIVE CAMERA FEED]' : '[SCANNER READY]'}</span>
              <span>AUTO FOCUS</span>
            </div>
            <div className="w-full h-0.5 bg-cyan-400 animate-pulse"></div>
          </div>

          {!isCameraActive && (
            <div className="text-center p-4 space-y-2 z-10">
              <Camera className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
              <p className="text-xs text-slate-300 font-medium">
                पशु के कान के QR टैग को फ़्रेम में लाएं
              </p>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Manual Tag Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProcessTag(manualTagId);
          }}
          className="space-y-3"
        >
          <label className="block text-xs font-bold text-slate-700">
            या टैग आईडी (Tag ID) मैन्युअल रूप से दर्ज करें:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualTagId}
              onChange={(e) => setManualTagId(e.target.value)}
              placeholder="उदा. MP-04-G-8821"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>खोजें</span>
            </button>
          </div>
        </form>

        {/* Quick Sample Tags */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold block mb-2">
            परीक्षण हेतु उपलब्ध टैग्स:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleProcessTag(tag)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg transition-colors border border-slate-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};