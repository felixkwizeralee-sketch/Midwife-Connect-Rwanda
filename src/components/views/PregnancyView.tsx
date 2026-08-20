import React, { useState } from 'react';
import {
  Baby,
  Calculator,
  Calendar,
  ShieldAlert,
  Apple,
  CheckSquare,
  AlertTriangle,
  Clock,
  Heart,
  FileCheck,
  PhoneCall,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePlatform } from '../../contexts/PlatformContext';
import { maternalDangerSigns, ancScheduleRwanda } from '../../data/clinicalToolsData';

export const PregnancyView: React.FC = () => {
  const { t } = useLanguage();
  const { routeParams, setIsEmergencyOpen, setIsAiAssistantOpen } = usePlatform();

  const [activeTab, setActiveTab] = useState<'calculator' | 'anc' | 'danger_signs' | 'nutrition' | 'bpcr'>(
    routeParams?.tab || 'calculator'
  );

  // EDD Calculator State
  const [lmpDate, setLmpDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14 * 7); // Default 14 weeks ago for demo
    return d.toISOString().split('T')[0];
  });
  const [cycleLength, setCycleLength] = useState<number>(28);

  // Calculate EDD using Naegele's Rule: LMP + 280 days + (cycleLength - 28)
  const calculateEDD = () => {
    if (!lmpDate) return null;
    const lmp = new Date(lmpDate);
    const edd = new Date(lmp.getTime());
    const adjustmentDays = 280 + (cycleLength - 28);
    edd.setDate(edd.getDate() + adjustmentDays);

    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const gestationalWeeks = Math.floor(diffDays / 7);
    const gestationalExtraDays = diffDays % 7;

    const daysRemaining = Math.max(0, Math.floor((edd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    let trimester = 'First Trimester (Weeks 1 - 12)';
    let trimesterNumber = 1;
    if (gestationalWeeks >= 13 && gestationalWeeks <= 27) {
      trimester = 'Second Trimester (Weeks 13 - 27)';
      trimesterNumber = 2;
    } else if (gestationalWeeks >= 28) {
      trimester = 'Third Trimester (Weeks 28 - 40+)';
      trimesterNumber = 3;
    }

    return {
      eddFormatted: edd.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      gestationalWeeks,
      gestationalExtraDays,
      daysRemaining,
      trimester,
      trimesterNumber,
      progressPercentage: Math.min(100, Math.max(0, Math.round((gestationalWeeks / 40) * 100))),
    };
  };

  const eddResult = calculateEDD();

  // Danger Signs Category Filter
  const [dangerFilter, setDangerFilter] = useState<'all' | 'Immediate Emergency' | 'Urgent Same-Day Evaluation'>('all');
  const filteredDangerSigns = maternalDangerSigns.filter(
    (s) => dangerFilter === 'all' || s.urgency.startsWith(dangerFilter)
  );

  // BPCR Checklist State
  const [bpcrItems, setBpcrItems] = useState([
    { id: 'bp-1', text: 'Identified delivery health facility with 24/7 skilled midwife care', done: true },
    { id: 'bp-2', text: 'Arranged emergency transport and recorded trusted driver mobile number', done: true },
    { id: 'bp-3', text: 'Identified continuous birth companion of choice for labor support', done: false },
    { id: 'bp-4', text: 'Set aside emergency family savings fund for unexpected medical costs', done: false },
    { id: 'bp-5', text: 'Packed maternity bag (clean baby clothes, diapers, sanitary pads, towel, baby cap)', done: true },
    { id: 'bp-6', text: 'Identified two compatible emergency blood donors in the community', done: false },
  ]);

  const toggleBpcr = (id: string) => {
    setBpcrItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Baby className="w-3.5 h-3.5" />
            <span>Maternal & Fetal Health Suite</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Pregnancy Tools & Clinical Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Evidence-based tools for expectant mothers, families, and midwives: calculate your accurate estimated due date, follow the Rwanda 8-contact ANC roadmap, and identify danger signs early.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{t('eddCalculatorTitle')}</span>
        </button>

        <button
          onClick={() => setActiveTab('anc')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'anc'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t('ancScheduleTitle')}</span>
        </button>

        <button
          onClick={() => setActiveTab('danger_signs')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'danger_signs'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t('dangerSignsTitle')}</span>
        </button>

        <button
          onClick={() => setActiveTab('nutrition')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'nutrition'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Apple className="w-4 h-4" />
          <span>Rwandan Nutrition</span>
        </button>

        <button
          onClick={() => setActiveTab('bpcr')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'bpcr'
              ? 'bg-indigo-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Birth Preparedness Plan</span>
        </button>
      </div>

      {/* TAB 1: EDD CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-700" />
                <span>Calculate Your Due Date</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Based on Naegele's rule adjusted for menstrual cycle duration.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t('calcLmpLabel')}
                </label>
                <input
                  type="date"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Average Menstrual Cycle Length
                  </label>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {cycleLength} days
                  </span>
                </div>
                <input
                  type="range"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>21 days</span>
                  <span>28 days (standard)</span>
                  <span>35 days</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-700" />
                <span>Ultrasound Dating Clinical Rule</span>
              </p>
              <p className="text-[11px] leading-relaxed text-blue-800">
                If an early first-trimester ultrasound (Crown-Rump Length, CRL) is performed, the ultrasound date takes precedence if the discrepancy with LMP exceeds 5–7 days.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {eddResult ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Estimated Clinical Timeline
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {eddResult.trimester}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-1">
                    <span className="text-xs font-semibold text-blue-800">{t('calcEddResult')}</span>
                    <p className="text-xl sm:text-2xl font-black text-blue-950">{eddResult.eddFormatted}</p>
                    <p className="text-[11px] text-blue-700">Estimated 40 weeks milestone</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                    <span className="text-xs font-semibold text-emerald-800">{t('calcGestationalAge')}</span>
                    <p className="text-xl sm:text-2xl font-black text-emerald-950">
                      {eddResult.gestationalWeeks} Weeks, {eddResult.gestationalExtraDays} Days
                    </p>
                    <p className="text-[11px] text-emerald-700">{eddResult.daysRemaining} days until estimated birth</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Pregnancy Journey Progress</span>
                    <span>{eddResult.progressPercentage}% Completed</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${eddResult.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Clinical advice matching current week */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Clinical Focus for Week {eddResult.gestationalWeeks}:</span>
                  </h4>
                  <ul className="space-y-1.5 text-slate-700 text-[11px] leading-relaxed">
                    {eddResult.gestationalWeeks < 13 && (
                      <>
                        <li>• Initiate daily Iron (30-60mg) + Folic Acid (400mcg) supplementation.</li>
                        <li>• Attend ANC Contact 1 (before 12 weeks) for baseline laboratory blood group, Hb, and HIV/Syphilis testing.</li>
                        <li>• Stay well-hydrated and rest to manage normal first-trimester nausea.</li>
                      </>
                    )}
                    {eddResult.gestationalWeeks >= 13 && eddResult.gestationalWeeks < 28 && (
                      <>
                        <li>• Attend ANC Contact 2 at 20 weeks (fetal anatomy scan & screening for preeclampsia risk).</li>
                        <li>• Track baby movements daily starting around 20–24 weeks (quickening).</li>
                        <li>• Receive Tetanus-Diphtheria (Td) immunization booster and insecticide-treated bed net.</li>
                      </>
                    )}
                    {eddResult.gestationalWeeks >= 28 && (
                      <>
                        <li>• Third-trimester frequent ANC checks (Weeks 30, 34, 36, 38, 40).</li>
                        <li>• Review and finalize your written Birth Preparedness and Complication Readiness (BPCR) plan.</li>
                        <li>• Monitor for severe danger signs (severe headaches, blurred vision, sudden swelling, vaginal bleeding).</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
                Please select your Last Menstrual Period date above to view results.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RWANDA 8-CONTACT ANC SCHEDULE */}
      {activeTab === 'anc' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Rwanda Ministry of Health & WHO Model
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                The 8-Contact Positive Pregnancy Experience Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Replaces the older 4-visit model with 8 evidence-based contacts to reduce stillbirths, detect hypertensive disorders of pregnancy early, and ensure comprehensive birth preparedness.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {ancScheduleRwanda.map((contact) => (
                <div
                  key={contact.contactNumber}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-700 text-white">
                      Contact {contact.contactNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200">
                      {contact.gestationalWeek}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">
                    {contact.primaryObjectives}
                  </h3>

                  <div className="space-y-1.5 text-xs">
                    <p className="text-slate-600 font-semibold text-[11px] uppercase tracking-wider text-slate-400">
                      Key Clinical Actions:
                    </p>
                    <ul className="space-y-1 text-slate-700">
                      {contact.clinicalActions.map((act, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DANGER SIGNS DIRECTORY */}
      {activeTab === 'danger_signs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Clinical Red Flags
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Maternal & Obstetric Danger Signs Directory
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Signs indicating acute risk to mother or fetus requiring immediate ambulance transfer (SAMU 112) or urgent health center triage.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDangerFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    dangerFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  All ({maternalDangerSigns.length})
                </button>
                <button
                  onClick={() => setDangerFilter('Immediate Emergency')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    dangerFilter === 'Immediate Emergency'
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  Immediate Emergency
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDangerSigns.map((sign) => (
                <div
                  key={sign.id}
                  className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 hover:bg-rose-50 transition-colors space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{sign.sign}</h3>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 shrink-0">
                        {sign.urgency.split('(')[0]}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-emerald-800 italic">
                      Ikinyarwanda: {sign.kinyarwandaSign}
                    </p>

                    <p className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-700">Possible Cause:</span> {sign.potentialCause}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-rose-200/60 flex items-center justify-between text-xs font-medium">
                    <span className="text-rose-800 font-semibold">{sign.immediateAction}</span>
                    <button
                      onClick={() => setIsEmergencyOpen(true)}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors shrink-0"
                    >
                      Call 112
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RWANDAN NUTRITION GUIDE */}
      {activeTab === 'nutrition' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Evidence-Based Diet
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Maternal Nutrition Using Rwandan Staples
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Optimizing energy, protein, iron, calcium, and iodine intake using locally available and affordable foods across Rwanda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>🐟 Iron & Protein Powerhouses</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li>• <strong>Indagara (Small Lake Kivu Fish):</strong> Eaten whole with bones, indagara provides exceptional calcium, omega-3 fatty acids, and bioavailable iron.</li>
                <li>• <strong>Eggs & Beans (Ibiharage):</strong> Daily plant and animal proteins supporting fetal brain and cellular development.</li>
                <li>• <strong>Liver (Amasashi):</strong> Consume once weekly for rich vitamin A and heme iron stores.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>🥬 Dark Leafy Greens & Vitamins</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li>• <strong>Dodo (Amaranth) & Isombe (Cassava Leaves):</strong> Rich in dietary folate, beta-carotene, and magnesium.</li>
                <li>• <strong>Citrus & Papaya:</strong> Vitamin C enhances non-heme iron absorption when eaten together with green vegetables.</li>
                <li>• <strong>Orange-Fleshed Sweet Potatoes:</strong> Excellent source of provitamin A for immune function.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>⚠️ Dietary Safety & Hydration</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li>• <strong>Hydration:</strong> Drink 2.5–3 liters of safe boiled/filtered water daily to maintain amniotic fluid volume.</li>
                <li>• <strong>Avoid Tea/Coffee with Meals:</strong> Tannins inhibit iron absorption by up to 60%. Drink tea between meals.</li>
                <li>• <strong>Zero Alcohol & Smoking:</strong> Alcohol causes irreversible fetal alcohol syndrome and low birth weight.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BIRTH PREPAREDNESS PLAN (BPCR) */}
      {activeTab === 'bpcr' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Emergency Preparedness
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Interactive Birth Preparedness & Complication Readiness (BPCR)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              A structured plan eliminates delays in seeking, reaching, and receiving emergency obstetric care. Check off each preparedness milestone with your family.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {bpcrItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleBpcr(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  item.done
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                      item.done
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {item.done && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${item.done ? 'line-through opacity-80' : ''}`}>
                    {item.text}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/80 border border-slate-200 shrink-0">
                  {item.done ? 'Ready' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
