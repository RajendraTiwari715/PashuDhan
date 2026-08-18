import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldAlert, Printer, X, MapPin } from 'lucide-react';

export const OfficialLegalNoticePDF = ({ isOpen, onClose, animal, notice }) => {
  if (!isOpen) return null;

  const noticeId = notice ? notice.id : 'NTC-8891';
  const offenseLevel = notice ? notice.offenseLevel : 1;

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200 text-slate-800">
        <div className="flex justify-between items-center mb-6 print:hidden border-b pb-4 border-slate-100">
          <div className="flex items-center gap-2">
            <span className="bg-amber-50 text-amber-800 text-xs px-3 py-1 rounded-full font-bold border border-amber-200">
              शासकीय विधिक नोटिस पूर्वावलोकन (Official Legal E-Notice)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDocument}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>प्रिंट / PDF सेव करें</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Notice Paper Content */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 text-slate-800 font-sans">
          {/* Header Seal */}
          <div className="text-center border-b-2 border-slate-300 pb-4 space-y-1">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-2 font-black text-xl border border-amber-300">
              🏛️
            </div>
            <h2 className="text-lg font-black tracking-wide text-slate-900">
              कार्यालय मुख्य पशु चिकित्सा अधिकारी / नगर निगम प्रशासन
            </h2>
            <p className="text-xs font-bold text-slate-600">
              मध्य प्रदेश पशु नियंत्रण एवं आवारा पशु रोकथाम अधिनियम 2026
            </p>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 font-bold">
              <span>क्रमांक: MP-GOV/{noticeId}/2026</span>
              <span>दिनांक: {new Date().toLocaleDateString('hi-IN')}</span>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-bold block text-[10px]">नोटिस प्रेषित (To Owner):</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{animal.ownerName}</div>
              <div className="text-slate-600 font-mono">मो०: {animal.ownerPhone}</div>
              <div className="text-slate-500 font-medium">आधार: {animal.ownerAadhaar || 'XXXX-XXXX-9482'}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-400 font-bold block text-[10px]">पशुधन विवरण:</span>
              <div className="font-mono font-bold text-emerald-700 text-sm mt-0.5">{animal.tagId}</div>
              <div className="text-slate-700 font-medium">{animal.name} ({animal.breed})</div>
              <div className="text-slate-500 text-[11px]">श्रेणी: {animal.category}</div>
            </div>
          </div>

          {/* Legal Notice Body */}
          <div className="space-y-3 text-xs leading-relaxed">
            <p className="font-bold text-slate-900">
              विषय: पंजीकृत गोवंश के निर्धारित जिओ-फेंस परिधि का उल्लंघन कर सार्वजनिक मार्ग पर आवारा विचरण करने बाबत।
            </p>
            <p className="text-slate-700">
              महोदय/महोदया, आपके पंजीकृत गोवंश (टैग आईडी: <span className="font-mono font-bold">{animal.tagId}</span>) को जीपीएस ट्रैकिंग सेंसर एवं पेट्रोलिंग स्क्वाड द्वारा सार्वजनिक मार्ग/हाईवे पर अनियंत्रित व आवारा विचरण करते पाया गया है।
            </p>
            <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300 font-bold text-amber-900 text-[11px]">
              ⚠️ निर्देश: यह आपका उल्लंघन स्तर-{offenseLevel} है। सूचना प्राप्ति के 48 घंटे के भीतर अपने पशु को सुरक्षित बाड़े में ले जाएं अन्यथा विधिक कार्रवाई व ₹500 का अर्थदंड अधिरोपित किया जाएगा।
            </div>
          </div>

          {/* Footer QR & Authority Signature */}
          <div className="flex items-end justify-between border-t-2 border-slate-300 pt-4 text-xs">
            <div className="flex items-center gap-3">
              <QRCodeSVG value={`https://pashudhan.gov.in/notice/${noticeId}`} size={60} />
              <div className="text-[10px] text-slate-500 font-mono">
                <span>सत्यापन हेतु स्कैन करें</span>
                <span className="block font-bold text-slate-800">पोर्टल: pashudhan.gov.in</span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="font-serif italic font-bold text-slate-800 text-sm">डिजिटल हस्ताक्षरित</div>
              <div className="font-bold text-slate-900 text-[11px]">सक्षम प्राधिकारी, पशु नियंत्रण कक्ष</div>
              <div className="text-[9px] text-slate-500">कंट्रोल रूम (टोल-फ्री): 1962</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};