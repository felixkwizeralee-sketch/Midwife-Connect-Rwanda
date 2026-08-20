import React from 'react';
import {
  X,
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  HeartPulse,
  Hospital,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { rwandaEmergencyContacts, maternalDangerSigns } from '../../data/clinicalToolsData';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyOpen, setIsEmergencyOpen, navigate } = usePlatform();
  const { t } = useLanguage();

  if (!isEmergencyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-rose-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-red-700 text-white p-6 relative">
          <button
            onClick={() => setIsEmergencyOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xs">
              <ShieldAlert className="w-7 h-7 text-white animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                Immediate Clinical & Maternal Crisis
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t('emergencyModalTitle')}
              </h2>
            </div>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-rose-100 leading-relaxed bg-black/15 p-3 rounded-xl border border-white/10">
            {t('emergencyDisclaimer')}
          </p>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Direct Rwanda Emergency Contact Cards */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>Verified Rwanda Emergency Helplines</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rwandaEmergencyContacts.map((contact) => (
                <div
                  key={contact.name}
                  className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex flex-col justify-between hover:bg-rose-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800 line-clamp-1">{contact.name}</span>
                      {contact.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900">
                          {contact.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">{contact.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-rose-200/60 flex items-center justify-between">
                    <span className="text-lg font-black text-rose-700 tracking-tight">
                      {contact.number}
                    </span>
                    <a
                      href={`tel:${contact.number.split('/')[0].trim()}`}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Red Flag Triage Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Severe Maternal Danger Signs & Immediate Action</span>
            </h3>

            <div className="space-y-2.5">
              {maternalDangerSigns.slice(0, 4).map((sign) => (
                <div
                  key={sign.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">{sign.sign}</p>
                    <p className="text-[11px] text-emerald-800 italic">{sign.kinyarwandaSign}</p>
                    <p className="text-[11px] text-slate-600">Possible Cause: {sign.potentialCause}</p>
                  </div>
                  <div className="text-right sm:max-w-xs shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800 mb-1">
                      {sign.urgency.split('(')[0]}
                    </span>
                    <p className="text-[11px] font-medium text-slate-800">{sign.immediateAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Advice */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <Hospital className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900">
              <p className="font-bold">Rwanda Health Center & Hospital Referral Advice</p>
              <p className="mt-1 leading-relaxed text-blue-800">
                If the mother is in labor or suffering active hemorrhage, do not delay for transport funds. Under Rwanda’s Mutuelle de Santé and universal emergency protocol, emergency maternal triage and ambulance dispatch via SAMU are prioritized unconditionally.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={() => {
              setIsEmergencyOpen(false);
              navigate('pregnancy', { tab: 'danger_signs' });
            }}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Full Danger Signs Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsEmergencyOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer"
          >
            {t('btnClose')}
          </button>
        </div>
      </div>
    </div>
  );
};
