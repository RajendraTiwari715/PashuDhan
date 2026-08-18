import React from 'react';
import { MessageSquare, ExternalLink, X } from 'lucide-react';

export const WhatsAppNoticeModal = ({ isOpen, onClose, animal, notice }) => {
  if (!isOpen) return null;

  const ownerPhone = animal?.ownerPhone || animal?.owner?.phone || '9407784182';
  const ownerName = animal?.ownerName || animal?.owner?.name || 'पशुपालक';
  const ownerPhoneClean = ownerPhone.replace(/\D/g, '');
  const noticeId = notice ? notice.id : 'NTC-8891';
  const offenseLevel = notice ? notice.offenseLevel : 1;

  const rawMessage = `*शासकीय ई-नोटिस: पशु नियंत्रण विभाग (क्रमांक: ${noticeId})*
नमस्ते श्री ${ownerName},
आपके गोवंश (टैग: ${animal?.tagId || 'TAG-8821'}) ने निर्धारित सुरक्षित फेंस का उल्लंघन किया है।
यह स्तर-${offenseLevel} उल्लंघन है। कृपया 48 घंटे के भीतर पशु को सुरक्षित बाड़े में ले जाएं।
पोर्टल: https://pashudhan.gov.in/verify`;

  const handleSendWhatsApp = () => {
    const url = `https://wa.me/91${ownerPhoneClean}?text=${encodeURIComponent(rawMessage)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
              WhatsApp Business API
            </span>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">
              व्हाट्सएप ई-नोटिस प्रेषक
            </h3>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-700 font-sans leading-relaxed">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-400 font-bold">प्राप्तकर्ता:</span>
            <span className="font-bold text-slate-900">{ownerName} ({ownerPhone})</span>
          </div>
          <div className="whitespace-pre-line text-slate-800 bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px]">
            {rawMessage}
          </div>
        </div>

        <button
          onClick={handleSendWhatsApp}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>व्हाट्सएप संदेश भेजें</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};