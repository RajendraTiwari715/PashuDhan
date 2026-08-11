import React from 'react';
import type { Animal, NoticeRecord } from '../types';
import { MessageSquare, ExternalLink, X } from 'lucide-react';


interface WhatsAppNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
  notice?: NoticeRecord;
}

export const WhatsAppNoticeModal: React.FC<WhatsAppNoticeModalProps> = ({
  isOpen,
  onClose,
  animal,
  notice
}) => {
  if (!isOpen) return null;

  const ownerPhoneClean = animal.owner.phone.replace(/\D/g, '');
  const noticeId = notice ? notice.id : 'NTC-8891';
  const offenseLevel = notice ? notice.offenseLevel : 1;

  const whatsappMessage = encodeURIComponent(
    `🚨 *राष्ट्रीय पशु-धन डिजिटल ई-नोटिस विधिक सूचना*\n\n` +
    `प्रिय पशुपालक श्री ${animal.owner.name},\n` +
    `आपके रजिस्टर्ड गोवंश (टैग ID: ${animal.tagId}, नस्ल: ${animal.breed}) का 500m जिओ-फेंस उल्लंघन पाया गया है।\n\n` +
    `⚠️ *उल्लंघन स्तर*: ${offenseLevel}st Warning E-Notice (${noticeId})\n` +
    `⏱️ *समाधान सीमा*: 48 घंटे के भीतर पशु को ऑन-प्रिमाइसेस (घर/डेयरी) लाएं।\n\n` +
    `ऑनलाइन नोटिस एवं जिओ-लोकेशन देखने के लिए लिंक पर क्लिक करें:\n` +
    `https://pashudhan.gov.in/notice/${noticeId}`
  );

  const whatsappUrl = `https://wa.me/91${ownerPhoneClean}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-emerald-500/40">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold">
              WhatsApp & SMS Gateway Dispatcher
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              💬 व्हाट्सएप ई-नोटिस प्रेषक (WhatsApp E-Notice)
            </h3>
          </div>
        </div>

        {/* PDF Notice Preview Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-emerald-400 font-bold">
            <span>[ई-नोटिस आईडी: {noticeId}]</span>
            <span className="text-amber-400">उल्लंघन: स्तर {offenseLevel}</span>
          </div>

          <div className="space-y-1">
            <div><span className="text-slate-400">पशुपालक:</span> {animal.owner.name}</div>
            <div><span className="text-slate-400">व्हाट्सएप नंबर:</span> +91 {animal.owner.phone}</div>
            <div><span className="text-slate-400">पशु टैग कोड:</span> {animal.tagId} ({animal.breed})</div>
            <div><span className="text-slate-400">समाधान समय:</span> 48 Hours Countdown</div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          <span>व्हाट्सएप पर तुरंत ई-नोटिस संदेश भेजें</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>

      </div>
    </div>
  );
};
