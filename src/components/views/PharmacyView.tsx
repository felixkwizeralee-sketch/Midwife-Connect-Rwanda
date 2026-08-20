import React, { useState } from 'react';
import {
  Pill,
  ShieldAlert,
  ThermometerSnowflake,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
  BookOpen,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';

export const PharmacyView: React.FC = () => {
  const { navigate } = usePlatform();
  const [activeTab, setActiveTab] = useState<'formulary' | 'cold_chain' | 'teratogens'>('formulary');

  const essentialDrugs = [
    {
      name: 'Oxytocin',
      category: 'Uterotonic (First-Line)',
      indications: 'Prevention & treatment of Postpartum Hemorrhage (PPH)',
      dosage: '10 IU IM immediately after delivery; 20-40 IU in 1000mL IV infusion for treatment',
      storage: '2°C to 8°C Strict Cold Chain (loses 14% potency/month at 30°C)',
      keyCaution: 'Never administer IV push undiluted (causes sudden hypotension and cardiac arrest).',
    },
    {
      name: 'Magnesium Sulfate (50%)',
      category: 'Anticonvulsant',
      indications: 'Severe preeclampsia & eclampsia seizure prophylaxis/treatment',
      dosage: 'Pritchard Protocol: 4g IV loading + 10g IM (5g per buttock); Maintenance: 5g IM every 4h',
      storage: 'Store below 25°C. Do not freeze.',
      keyCaution: 'Monitor respiratory rate (>16/min), patellar reflexes, and urine output (>30ml/h). Have Calcium Gluconate 10% readily available at bedside.',
    },
    {
      name: 'Tranexamic Acid (TXA)',
      category: 'Antifibrinolytic',
      indications: 'Treatment of Postpartum Hemorrhage',
      dosage: '1g IV in 100mL normal saline over 10 minutes within 3 hours of bleeding onset; repeat 1g after 30 min if bleeding continues',
      storage: 'Store at 15°C to 30°C (heat stable)',
      keyCaution: 'Must be administered within 3 hours of delivery for mortality reduction (WOMAN trial).',
    },
    {
      name: 'Heat-Stable Carbetocin',
      category: 'Long-Acting Oxytocin Agonist',
      indications: 'Prevention of PPH in settings where cold chain is unreliable',
      dosage: '100 mcg IM single dose immediately after delivery',
      storage: 'Stable up to 30°C without refrigeration for 36 months',
      keyCaution: 'Recommended by WHO & Rwanda MoH specifically for community and health center births with fragile electricity.',
    },
    {
      name: 'Misoprostol',
      category: 'Prostaglandin E1 Analogue',
      indications: 'PPH prevention (600 mcg oral) & treatment (800 mcg sublingual)',
      dosage: '600 mcg orally for prevention if oxytocin is unavailable; 800 mcg sublingually for treatment',
      storage: 'Keep in original double-aluminum blister packs (sensitive to humidity)',
      keyCaution: 'Common side effects include shivering and transient high fever (manage with hydration/paracetamol).',
    },
    {
      name: 'Nifedipine (Immediate-Release)',
      category: 'Calcium Channel Blocker',
      indications: 'Acute severe hypertension in pregnancy (BP ≥ 160/110 mmHg)',
      dosage: '10-20 mg orally (swallowed whole, not sublingual); repeat in 30 min if needed',
      storage: 'Light-sensitive; store in original container',
      keyCaution: 'Do not give sublingually as it may cause precipitous blood pressure drop and fetal distress.',
    },
  ];

  const teratogenicDrugs = [
    { drug: 'ACE Inhibitors / ARBs (e.g. Enalapril, Losartan)', risk: 'Fetal renal failure, oligohydramnios, skull hypoplasia', safeAlternative: 'Methyldopa, Labetalol, Nifedipine' },
    { drug: 'Warfarin / Oral Anticoagulants', risk: 'Warfarin embryopathy (nasal hypoplasia, stippled epiphyses, CNS defects)', safeAlternative: 'Low Molecular Weight Heparin (LMWH)' },
    { drug: 'Sodium Valproate / Carbamazepine', risk: 'Neural tube defects (spina bifida), craniofacial and cognitive impairment', safeAlternative: 'Levetiracetam, Lamotrigine' },
    { drug: 'Statins (Atorvastatin, Simvastatin)', risk: 'Disrupts essential cholesterol synthesis during embryogenesis', safeAlternative: 'Dietary management; resume postpartum' },
    { drug: 'Tetracyclines / Doxycycline', risk: 'Permanent yellow-brown discoloration of deciduous teeth and enamel hypoplasia', safeAlternative: 'Amoxicillin, Azithromycin, Ceftriaxone' },
    { drug: 'Isotretinoin (Accutane)', risk: 'Severe craniofacial, cardiac, and thymic malformations (>30% teratogenicity)', safeAlternative: 'Topical azelaic acid or erythromycin' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Pill className="w-3.5 h-3.5" />
            <span>Maternal & Perinatal Pharmacology Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Pharmacists, Midwives & Drug Safety Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Essential maternal medicines, strict cold-chain preservation protocols for Oxytocin, teratogenicity reference guides, and antibiotic stewardship in obstetric care.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => setActiveTab('formulary')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'formulary' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Essential Maternal Drug Formulary</span>
        </button>

        <button
          onClick={() => setActiveTab('cold_chain')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'cold_chain' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ThermometerSnowflake className="w-4 h-4" />
          <span>Oxytocin Cold Chain Protocol</span>
        </button>

        <button
          onClick={() => setActiveTab('teratogens')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'teratogens' ? 'bg-rose-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Teratogenic Drugs in Pregnancy</span>
        </button>
      </div>

      {/* TAB 1: FORMULARY */}
      {activeTab === 'formulary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {essentialDrugs.map((drug, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {drug.category}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1">{drug.name}</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700">Clinical Indication:</span>
                    <p className="text-slate-600">{drug.indications}</p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700">Standard Dosing Regimen:</span>
                    <p className="text-slate-600">{drug.dosage}</p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700">Storage & Cold Chain Requirement:</span>
                    <p className="text-emerald-800 font-medium">{drug.storage}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Clinical Precaution:</span>
                </span>
                <p className="text-[11px] leading-relaxed">{drug.keyCaution}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: COLD CHAIN PROTOCOL */}
      {activeTab === 'cold_chain' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Quality Assurance & Potency Preservation
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Protecting Oxytocin Efficacy in Rwandan Facilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Oxytocin is a thermosensitive peptide hormone. Heat exposure degrades its active component, leading to preventable maternal deaths from unmanageable Postpartum Hemorrhage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
              <h4 className="font-bold text-blue-950 text-sm">1. Temperature Monitoring</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log refrigerator temperatures twice daily (morning and evening). Maintain 2°C to 8°C at district pharmacies and maternity delivery wards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
              <h4 className="font-bold text-blue-950 text-sm">2. Cold Box Transport</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Always transport oxytocin ampoules in validated vaccine carriers with conditioned ice packs during supply transfers between central medical stores and health centers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
              <h4 className="font-bold text-blue-950 text-sm">3. Heat-Stable Transition</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deploy Heat-Stable Carbetocin or Misoprostol as the preferred agent when cold chain monitoring cannot be guaranteed during home or remote outreach births.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TERATOGENIC DRUGS */}
      {activeTab === 'teratogens' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Maternal-Fetal Pharmacology Safety
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Contraindicated Teratogenic Medications & Safe Alternatives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Medications known to cross the placenta and induce congenital malformations, intrauterine growth restriction, or fetal death.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teratogenicDrugs.map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2">
                <h4 className="font-bold text-rose-950 text-sm">{t.drug}</h4>
                <p className="text-xs text-rose-800">
                  <span className="font-bold text-rose-900">Teratogenic Risk:</span> {t.risk}
                </p>
                <div className="pt-2 border-t border-rose-200 text-xs text-emerald-800 font-semibold">
                  <span>Safe Obstetric Alternative:</span> {t.safeAlternative}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
