import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { contraceptiveMethodsRwanda } from '../../data/clinicalToolsData';

export const ReproductiveHealthView: React.FC = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedMethod, setSelectedMethod] = useState(contraceptiveMethodsRwanda[0]);

  const categories = ['All', 'LARC', 'Hormonal', 'Permanent', 'Barrier', 'Natural'];

  const filteredMethods = contraceptiveMethodsRwanda.filter(
    (m) => selectedType === 'All' || m.type === selectedType
  );

  const reproductiveMyths = [
    {
      myth: 'Contraceptive implants or IUDs cause permanent infertility once removed.',
      fact: 'False. Fertility returns rapidly (often within days to weeks) after removing implants or IUDs. They do not damage future reproductive capacity.',
    },
    {
      myth: 'Exclusive breastfeeding alone is 100% reliable for birth spacing up to 1 year.',
      fact: 'False. The Lactational Amenorrhea Method (LAM) is only 98% effective for the first 6 months AND only if all 3 criteria are strictly met (no menses, baby <6 months, 100% exclusive feeding day and night).',
    },
    {
      myth: 'Emergency contraceptive pills cause abortion.',
      fact: 'False. Emergency contraception prevents pregnancy by delaying or inhibiting ovulation before fertilization occurs. It cannot terminate an established pregnancy.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-800/80 text-purple-200 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5" />
            <span>Family Planning & Reproductive Rights</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Reproductive Health & Contraceptive Choices
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Evidence-based clinical guidance on modern contraception, Long-Acting Reversible Contraception (LARC), postpartum birth spacing, and adolescent sexual & reproductive health.
          </p>
        </div>
      </div>

      {/* Contraceptive Method Matrix */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Modern Contraceptive Methods Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare clinical efficacy, mechanism, postpartum eligibility, and key counseling points.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedType === cat
                    ? 'bg-white text-purple-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Method List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
            {filteredMethods.map((method) => {
              const isSelected = selectedMethod.id === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-purple-50/80 border-purple-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{method.name}</h4>
                      <p className="text-[11px] text-purple-700 font-medium">Type: {method.type} • {method.duration}</p>
                    </div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {method.effectiveness}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{method.mechanism}</p>
                </div>
              );
            })}
          </div>

          {/* Detailed Method Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  {selectedMethod.type} Contraception
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  {selectedMethod.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Effectiveness</span>
                <span className="text-lg font-black text-emerald-700">{selectedMethod.effectiveness}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Duration of Action:</span>
                <p className="font-bold text-slate-900">{selectedMethod.duration}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Postpartum Timing:</span>
                <p className="font-bold text-slate-900">{selectedMethod.postpartumTiming}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <h5 className="font-bold text-slate-900">How It Works (Mechanism):</h5>
                <p className="text-slate-600 leading-relaxed">{selectedMethod.mechanism}</p>
              </div>

              <div className="space-y-1">
                <h5 className="font-bold text-slate-900">Possible Normal Side Effects:</h5>
                <p className="text-slate-600 leading-relaxed">{selectedMethod.sideEffects}</p>
              </div>

              <div className="space-y-1">
                <h5 className="font-bold text-slate-900">WHO Medical Eligibility (MEC) & Contraindications:</h5>
                <p className="text-slate-600 leading-relaxed">{selectedMethod.contraindications}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-xs text-purple-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-700" />
                <span>Midwifery Counseling Note:</span>
              </p>
              <p className="text-[11px] leading-relaxed text-purple-800">
                {selectedMethod.counselingNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dispelling Myths & Misconceptions */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Truth in Reproductive Health
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            Dispelling Common Myths & Misconceptions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Clear, respectful, and science-backed answers to frequently asked community questions in Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reproductiveMyths.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-rose-700 text-xs font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Myth:</span>
                </div>
                <p className="text-xs font-bold text-slate-900">"{item.myth}"</p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Clinical Fact:</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.fact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
