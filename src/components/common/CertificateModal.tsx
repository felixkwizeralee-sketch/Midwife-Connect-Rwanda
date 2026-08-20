import React from 'react';
import {
  X,
  Printer,
  Download,
  Award,
  ShieldCheck,
  CheckCircle2,
  Heart,
  QrCode,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { useLanguage } from '../../contexts/LanguageContext';
import confetti from 'canvas-confetti';

export const CertificateModal: React.FC = () => {
  const { selectedCertificate, setSelectedCertificate } = usePlatform();
  const { t } = useLanguage();

  if (!selectedCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Actions */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold">Verified Achievement Certificate</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={triggerCelebration}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 cursor-pointer"
            >
              🎉 Celebrate
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('certPrint')}</span>
            </button>
            <button
              onClick={() => setSelectedCertificate(null)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Frame */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-50 flex items-center justify-center">
          <div
            id="printable-certificate-canvas"
            className="w-full max-w-2xl bg-white border-8 border-double border-blue-900 rounded-2xl p-8 sm:p-12 shadow-lg relative text-center space-y-6"
          >
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <Heart className="w-96 h-96 fill-blue-900" />
            </div>

            {/* Header Logos */}
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-6">
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
                  <Heart className="w-6 h-6 fill-white/20" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-blue-950 tracking-tight leading-tight uppercase">
                    Midwife Connect Rwanda
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Connecting Midwives, Empowering Families
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                  Accredited Module
                </span>
                <p className="text-[10px] font-mono text-slate-400 mt-1">
                  ID: {selectedCertificate.certificateNumber}
                </p>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                {t('certTitle')}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
                Certificate of Competence
              </h1>
            </div>

            {/* Recipient */}
            <div className="space-y-2 py-2">
              <p className="text-xs text-slate-500 italic">{t('certPresentedTo')}</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-900 underline decoration-blue-300 underline-offset-8">
                {selectedCertificate.studentName}
              </p>
            </div>

            {/* Achievement text */}
            <div className="max-w-md mx-auto space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>{t('certCompleted')}:</p>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100">
                "{selectedCertificate.courseTitle}"
              </p>
              <p className="text-[11px] text-slate-500 font-medium pt-1">
                Demonstrated Examination Mastery: <span className="font-bold text-emerald-700">{selectedCertificate.scorePercentage}%</span>
              </p>
            </div>

            {/* Signatures & Verification Stamp */}
            <div className="pt-6 border-t-2 border-slate-100 grid grid-cols-3 gap-4 items-end text-left">
              <div>
                <div className="font-script text-lg text-slate-800 font-serif italic border-b border-slate-300 pb-1">
                  Sr. Clementine U.
                </div>
                <p className="text-[10px] font-bold text-slate-700 mt-1">
                  Director of Midwifery Education
                </p>
                <p className="text-[9px] text-slate-400">Midwife Connect Rwanda</p>
              </div>

              {/* Official Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-600 bg-amber-50 flex items-center justify-center text-amber-700 shadow-xs">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-amber-800 font-bold mt-1">
                  Verified Seal
                </span>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-medium text-slate-500">Date of Completion:</p>
                <p className="text-xs font-bold text-slate-900">{selectedCertificate.issueDate}</p>
                <p className="text-[9px] font-mono text-slate-400 mt-1">
                  Hash: {selectedCertificate.verificationHash}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center print:hidden">
          <span className="text-xs text-slate-500">
            Official verifiable continuing education credential.
          </span>
          <button
            onClick={() => setSelectedCertificate(null)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer"
          >
            {t('certClose')}
          </button>
        </div>
      </div>
    </div>
  );
};
