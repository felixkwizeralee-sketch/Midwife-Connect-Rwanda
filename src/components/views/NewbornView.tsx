import React, { useState } from 'react';
import {
  Baby,
  Heart,
  Thermometer,
  ShieldAlert,
  Calculator,
  CheckCircle2,
  Syringe,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePlatform } from '../../contexts/PlatformContext';
import { rwandaVaccinationSchedule, neonatalDangerSigns } from '../../data/clinicalToolsData';

export const NewbornView: React.FC = () => {
  const { t } = useLanguage();
  const { routeParams, setIsEmergencyOpen } = usePlatform();

  const [activeTab, setActiveTab] = useState<'kmc' | 'apgar' | 'vaccines' | 'danger_signs'>(
    routeParams?.tab || 'kmc'
  );

  // APGAR Calculator State
  const [apgarActivity, setApgarActivity] = useState<number>(2);
  const [apgarPulse, setApgarPulse] = useState<number>(2);
  const [apgarGrimace, setApgarGrimace] = useState<number>(2);
  const [apgarAppearance, setApgarAppearance] = useState<number>(2);
  const [apgarRespiration, setApgarRespiration] = useState<number>(2);

  const totalApgar = apgarActivity + apgarPulse + apgarGrimace + apgarAppearance + apgarRespiration;

  const getApgarInterpretation = (score: number) => {
    if (score >= 7) {
      return {
        label: 'Reassuring / Normal Transition (Score 7–10)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        advice: 'Continue routine thermal care, immediate skin-to-skin on mother chest, and initiate early breastfeeding.',
      };
    } else if (score >= 4 && score <= 6) {
      return {
        label: 'Moderately Depressed (Score 4–6)',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        advice: 'Clear airway, stimulate, administer oxygen or CPAP, and re-evaluate APGAR score at 5 and 10 minutes.',
      };
    } else {
      return {
        label: 'Severely Depressed (Score 0–3)',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        advice: 'Immediate positive pressure bag-and-mask resuscitation within the Golden Minute; prepare advanced neonatal resuscitation.',
      };
    }
  };

  const apgarStatus = getApgarInterpretation(totalApgar);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Baby className="w-3.5 h-3.5" />
            <span>Essential Newborn Care & Neonatal Protocols</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Newborn Health, KMC & Child Survival
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Evidence-based neonatal care for the Golden Minute, Kangaroo Mother Care for low birth weight infants, APGAR evaluation, and Rwanda's childhood immunization roadmap.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => setActiveTab('kmc')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'kmc' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Thermometer className="w-4 h-4" />
          <span>Kangaroo Mother Care (KMC)</span>
        </button>

        <button
          onClick={() => setActiveTab('apgar')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'apgar' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>APGAR Score Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('vaccines')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'vaccines' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Syringe className="w-4 h-4" />
          <span>Rwanda Vaccine Schedule (EPI)</span>
        </button>

        <button
          onClick={() => setActiveTab('danger_signs')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'danger_signs' ? 'bg-rose-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Neonatal Danger Signs</span>
        </button>
      </div>

      {/* TAB 1: KMC */}
      {activeTab === 'kmc' && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Life-Saving Protocol for Preterm Infants
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Kangaroo Mother Care (KMC) Clinical Standard
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Continuous skin-to-skin contact between mother and low birth weight infant (&lt;2,500g) that reduces neonatal mortality by up to 40%.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>1. Continuous Skin-to-Skin</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Place baby naked (wearing only diaper and warm cap) vertically between mother's breasts in the "frog position". Head turned to one side with slightly extended neck to keep airway open.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>2. Exclusive Breastfeeding</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Support frequent feeding every 2–3 hours. For small infants with weak suckling, teach mother how to express colostrum and cup-feed safely without choking.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>3. Discharge & Follow-up</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Discharge criteria: Infant gaining weight steadily (&gt;15g/kg/day for 3 consecutive days), maintaining temperature (36.5–37.5°C), and mother confident in KMC at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APGAR SCORE CALCULATOR */}
      {activeTab === 'apgar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-700" />
                <span>APGAR Scoring Criteria (1 & 5 Minutes Post-Birth)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select the clinical observation for each of the 5 criteria:
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Activity / Muscle Tone */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">A - Activity (Muscle Tone)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, text: '0: Flaccid / Limp' },
                    { val: 1, text: '1: Some flexion of arms/legs' },
                    { val: 2, text: '2: Active motion' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarActivity(opt.val)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        apgarActivity === opt.val
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pulse */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">P - Pulse (Heart Rate)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, text: '0: Absent (No pulse)' },
                    { val: 1, text: '1: < 100 bpm' },
                    { val: 2, text: '2: ≥ 100 bpm' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarPulse(opt.val)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        apgarPulse === opt.val
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grimace */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">G - Grimace (Reflex Irritability)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, text: '0: No response' },
                    { val: 1, text: '1: Grimace / weak cry' },
                    { val: 2, text: '2: Vigorous cry, sneeze, cough' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarGrimace(opt.val)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        apgarGrimace === opt.val
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appearance */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">A - Appearance (Skin Color)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, text: '0: Blue/pale all over' },
                    { val: 1, text: '1: Body pink, hands/feet blue' },
                    { val: 2, text: '2: Completely pink' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarAppearance(opt.val)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        apgarAppearance === opt.val
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Respiration */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800">R - Respiration (Breathing Effort)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, text: '0: Absent (Apnea)' },
                    { val: 1, text: '1: Slow, irregular, gasping' },
                    { val: 2, text: '2: Good strong crying' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setApgarRespiration(opt.val)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                        apgarRespiration === opt.val
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Calculated APGAR Score
              </span>

              <div className="p-6 rounded-3xl bg-slate-900 text-white text-center space-y-2">
                <span className="text-5xl font-black text-emerald-400">{totalApgar}</span>
                <span className="text-slate-400 text-xs block">/ 10 Points</span>
              </div>

              <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${apgarStatus.color}`}>
                <p className="font-bold">{apgarStatus.label}</p>
                <p className="text-[11px] leading-relaxed">{apgarStatus.advice}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1">
              <p className="font-bold">Clinical Timing Rule:</p>
              <p className="text-[11px] leading-relaxed text-blue-800">
                Do NOT delay neonatal resuscitation (ventilation within 60 seconds) to wait for the 1-minute APGAR score. Begin resuscitation immediately if the baby is not breathing!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RWANDA VACCINATION SCHEDULE (EPI) */}
      {activeTab === 'vaccines' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Rwanda Expanded Programme on Immunization
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              National Infant Immunization Schedule
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Provided free of charge at all Rwanda health centers to ensure 100% protection against vaccine-preventable childhood illnesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {rwandaVaccinationSchedule.map((vac, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-700 text-white">
                      {vac.age}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{vac.route}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{vac.vaccine}</h3>
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Protects against:</span> {vac.protectsAgainst}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: NEONATAL DANGER SIGNS */}
      {activeTab === 'danger_signs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Emergency Neonatal Red Flags
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Neonatal Danger Signs Requiring Immediate Hospitalization
              </h2>
            </div>
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
            >
              Emergency SAMU 112
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {neonatalDangerSigns.map((sign, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{sign.sign}</h3>
                  <span className="text-[10px] font-bold text-rose-800 bg-rose-200 px-2 py-0.5 rounded uppercase">
                    {sign.urgency}
                  </span>
                </div>
                <p className="text-xs text-slate-600">Action: {sign.immediateAction}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
