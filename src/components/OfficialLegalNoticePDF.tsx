import React from 'react';
import type { Animal, NoticeRecord } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldAlert, Printer, X, MapPin } from 'lucide-react';


interface OfficialLegalNoticePDFProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal;
  notice?: NoticeRecord;
}

export const OfficialLegalNoticePDF: React.FC<OfficialLegalNoticePDFProps> = ({
  isOpen,
  onClose,
  animal,
  notice
}) => {
  if (!isOpen) return null;

  const noticeId = notice ? notice.id : 'NTC-8891';
  const offenseLevel = notice ? notice.offenseLevel : 1;

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-amber-500/40 text-slate-900 bg-white">
        
        {/* Print / Close Buttons */}
        <div className="flex justify-between items-center mb-6 print:hidden border-b pb-4 border-slate-200">
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold border border-amber-300">
              शासकीय विधिक नोटिस पूर्वावलोकन (Official Legal E-Notice)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDocument}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>नोटिस PDF प्रिंट / सेव करें</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE OFFICIAL GOVERNMENT LEGAL NOTICE SHEET */}
        <div className="relative p-6 sm:p-10 border-4 border-double border-slate-900 rounded-2xl bg-white text-slate-900 space-y-6 shadow-inner overflow-hidden">
          
          {/* Official Government Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-[-30deg]">
            <div className="text-center font-black text-6xl text-slate-900 uppercase">
              मध्य प्रदेश शासन<br />पशु चिकित्सा सेवा<br />राजपत्रित विधिक ई-नोटिस
            </div>
          </div>

          {/* Official Government Header */}
          <div className="text-center space-y-1 border-b-2 border-slate-900 pb-4">
            <div className="font-bold text-xs uppercase tracking-widest text-slate-700">
              मध्य प्रदेश शासन - पशुपालन एवं डेयरी विभाग | पुलिस नियंत्रण कक्ष
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-wide">
              राष्ट्रीय डिजिटल गोवंश ई-नोटिस व चेतावनी पत्र
            </h2>
            <div className="text-xs font-mono font-bold text-red-700">
              (म.प्र. गोवंश वध प्रतिषेध अधिनियम एवं पशु क्रूरता निवारण धारा 1962 के अंतर्गत प्रेषित)
            </div>
          </div>

          {/* Legal Stamp & Notice ID Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-300 font-mono text-xs">
            <div>
              <div><span className="font-bold text-slate-700">विधिक नोटिस संख्या:</span> <span className="font-bold text-slate-950">{noticeId}</span></div>
              <div><span className="font-bold text-slate-700">जारी तिथि:</span> {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
            </div>

            {/* Red Violation Stamp */}
            <div className="border-2 border-red-700 text-red-700 font-black text-xs px-3 py-1.5 rounded-lg transform -rotate-2 uppercase tracking-wider text-center">
              🚨 OFFENSE LEVEL {offenseLevel} NOTICE<br />
              <span className="text-[10px]">48 HOURS RESOLUTION TIMER</span>
            </div>
          </div>

          {/* Owner & Animal Details Table */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase border-b border-slate-400 pb-1">1. पशुपालक एवं पंजीकृत गोवंश विवरण</h4>
            
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-600 block text-[11px]">पशुपालक का नाम:</span>
                <span className="font-bold text-slate-950">{animal.owner.name}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[11px]">पंजीकृत मोबाइल नंबर:</span>
                <span className="font-mono font-bold text-slate-950">+91 {animal.owner.phone}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[11px]">15-Digit ISO QR Tag ID:</span>
                <span className="font-mono font-bold text-emerald-800 text-sm">{animal.tagId}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[11px]">पशु श्रेणी व नस्ल:</span>
                <span className="font-bold text-slate-950">{animal.category} - {animal.breed}</span>
              </div>
            </div>
          </div>

          {/* Offense Evidence & Map Coordinates */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase border-b border-slate-400 pb-1">2. 500m जिओ-फेंस उल्लंघन साक्ष्य एवं जीपीएस लोकेशन</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  जीपीएस लोकेशन साक्ष्य:
                </div>
                <div className="text-[11px] text-slate-700 leading-relaxed">
                  {animal.location.addressName}, {animal.location.city} ({animal.location.pincode})
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  अक्षांश: {animal.location.lat}, देशांतर: {animal.location.lng}
                </div>
              </div>

              <div className="flex justify-center items-center bg-white p-2 border border-slate-300 rounded-xl">
                <QRCodeSVG value={`PASHUDHAN_NOTICE:${noticeId}`} size={80} />
              </div>
            </div>
          </div>

          {/* Official Instructions */}
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              वैधानिक चेतावनी निर्देश:
            </div>
            <p className="text-[11px] leading-relaxed">
              आपको सूचित किया जाता है कि आगामी 48 घंटे के भीतर उक्त गोवंश को 500 मीटर फेंस के भीतर (अपने डेयरी फार्म/घर) लाएं। नियत समय में समाधान न होने पर पशुपालक की प्रोफ़ाइल ब्लॉक कर जब्ती आदेश प्रेषित किया जाएगा।
            </p>
          </div>

          {/* Official Signatures & Seals */}
          <div className="flex justify-between items-end pt-6 border-t-2 border-slate-900 text-xs">
            <div className="text-center space-y-1">
              <div className="w-20 h-20 rounded-full border-2 border-emerald-800 flex items-center justify-center font-bold text-[9px] text-emerald-800 uppercase mx-auto p-1 text-center">
                शासकीय मुहर<br />पशुपालन विभाग
              </div>
              <div className="font-bold text-slate-800">पशु कल्याण अधिकारी</div>
            </div>

            <div className="text-center space-y-1">
              <div className="w-20 h-20 rounded-full border-2 border-red-800 flex items-center justify-center font-bold text-[9px] text-red-800 uppercase mx-auto p-1 text-center">
                पुलिस मुहर<br />कंट्रोल रूम
              </div>
              <div className="font-bold text-slate-800">प्रभारी निरीक्षक, गौरक्षक दल</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
