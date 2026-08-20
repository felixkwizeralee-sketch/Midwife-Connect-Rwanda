import { Course } from '../types';

export const initialCourses: Course[] = [
  {
    id: 'course-emonc-101',
    title: 'Emergency Obstetric & Neonatal Care (EmONC): PPH & Eclampsia Protocols',
    slug: 'emergency-obstetric-care-emonc',
    description: 'Master life-saving emergency protocols for Postpartum Hemorrhage (PPH), Severe Preeclampsia, Eclampsia, and Obstructed Labor aligned with Rwanda Ministry of Health and WHO guidelines.',
    category: 'Emergency Obstetric Care',
    level: 'Intermediate',
    durationHours: 6,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 5,
    certificateEligible: true,
    published: true,
    featured: true,
    quizId: 'quiz-emonc-1',
    learningObjectives: [
      'Accurately quantify postpartum blood loss using calibrated direct measurement drape methods.',
      'Execute the first-line and second-line medical and surgical bundle for PPH within the golden hour.',
      'Administer the loading and maintenance doses of Magnesium Sulfate for severe preeclampsia/eclampsia safely.',
      'Apply the Non-pneumatic Anti-Shock Garment (NASG) and uterine balloon tamponade (UBT) during obstetric referral transport.',
    ],
    targetAudience: ['Student Midwives', 'Registered Midwives', 'General Practitioners', 'Maternity Nurses'],
    lessons: [
      {
        id: 'lesson-emonc-1',
        title: 'Active Management of the Third Stage of Labor (AMTSL) & PPH Prevention',
        durationMinutes: 45,
        content: `### 1. Introduction to AMTSL
Active Management of the Third Stage of Labor (AMTSL) remains the single most effective clinical intervention in reducing postpartum hemorrhage (PPH) rates by up to 60%.

### 2. The Three Core Pillars of AMTSL
1. **Administration of a Uterotonic:**
   - **Oxytocin 10 IU IM** is the preferred first-line agent, administered within 1 minute of infant delivery (after ruling out multiple gestation).
   - If cold-chain is unavailable in remote health posts: **Misoprostol 600 mcg orally**.
2. **Controlled Cord Traction (CCT):**
   - Apply gentle counter-traction above the pubic bone (Brandt-Andrews maneuver) during a uterine contraction.
   - Never apply traction on a flaccid uterus to avoid uterine inversion.
3. **Uterine Fundal Massage & Tone Monitoring:**
   - Palpate fundus immediately following placental delivery.
   - Re-check uterine tone every 15 minutes for the first 2 hours postpartum.

### 3. Quantitative Blood Loss (QBL) vs Visual Estimation
Visual estimation routinely underestimates blood loss by 30–50%. Use graduated under-buttocks collection drapes to trigger timely emergency intervention at ≥500 mL (vaginal) or ≥1,000 mL (cesarean).`,
        keyTakeaways: [
          'Administer 10 IU Oxytocin IM within 60 seconds of fetal delivery.',
          'Always use counter-pressure during Controlled Cord Traction to prevent uterine inversion.',
          'Quantify blood loss objectively using calibrated drapes.',
        ],
        clinicalPearls: [
          'Uterine atony accounts for >70% of all primary PPH cases. Always check uterine tone first!',
          'Cold chain integrity: Oxytocin exposed to tropical heat (>30°C) loses over 40% potency within months. Ensure refrigerated storage (2–8°C).',
        ],
        downloadableResource: {
          title: 'Rwanda MoH PPH Emergency Bundle Checklist',
          description: 'Step-by-step clinical flow chart for managing obstetric hemorrhage.',
          fileType: 'PDF',
        },
      },
      {
        id: 'lesson-emonc-2',
        title: 'Medical Management of Severe PPH: First & Second-Line Algorithms',
        durationMinutes: 50,
        content: `### The 4 Ts of Postpartum Hemorrhage
- **Tone (70%):** Uterine atony
- **Trauma (20%):** Cervical/vaginal lacerations, uterine rupture
- **Tissue (10%):** Retained placenta or cotyledons
- **Thrombin (1%):** Coagulopathy, DIC

### Immediate Stepwise Management Protocol:
1. **Call for immediate assistance** (announce Obstetric Code / SAMU activation).
2. **Bimanual Uterine Compression & External Aortic Compression** while preparing medications.
3. **IV Access:** Place two large-bore IV cannulae (14G or 16G) and run warm crystalloids (Ringer's Lactate / Normal Saline).
4. **Uterotonic Escalation:**
   - Oxytocin infusion: 20–40 IU in 1L IV crystalloid at 60 drops/min.
   - Tranexamic Acid (TXA): 1g IV in 100mL Normal Saline over 10 min (give within 3 hours).
   - Misoprostol: 800 mcg sublingually.
5. **Uterine Balloon Tamponade (UBT):** If atony persists, insert condom-catheter UBT inflated with 300–500mL sterile saline.`,
        keyTakeaways: [
          'The 4 Ts framework rapidly clarifies etiology.',
          'Administer Tranexamic Acid (TXA) within 3 hours of birth to significantly lower mortality.',
          'Uterine balloon tamponade (condom catheter) is a vital bridge prior to surgical referral.',
        ],
        clinicalPearls: [
          'Do not wait for laboratory hemoglobin tests before initiating fluid resuscitation in decompensating mothers.',
          'Avoid ergometrine in patients with known hypertension or preeclampsia.',
        ],
      },
      {
        id: 'lesson-emonc-3',
        title: 'Severe Preeclampsia & Eclampsia: Magnesium Sulfate Protocols',
        durationMinutes: 55,
        content: `### Recognizing Preeclampsia with Severe Features
Blood Pressure ≥ 160/110 mmHg on two occasions 4 hours apart with one or more of:
- Platelet count < 100,000 / µL
- Serum creatinine > 1.1 mg/dL
- Pulmonary edema
- New-onset persistent right upper quadrant / epigastric pain
- Persistent headache or visual disturbances (scotomata, cortical blindness)

### Magnesium Sulfate (MgSO4) Regimen (The Pritchard Protocol)
**Loading Dose:**
- **IV:** 4g of 20% solution IV slowly over 15–20 minutes.
- **IM:** 10g of 50% solution IM (5g deep in each buttock, mixed with 1 mL 1% lidocaine to minimize pain).

**Maintenance Dose:**
- 5g IM (50% solution) every 4 hours into alternating buttocks for 24 hours postpartum or after last convulsion.

### Critical Safety Monitoring:
Before each maintenance dose, verify:
1. Respiratory rate ≥ 16 breaths per minute.
2. Patellar (knee-jerk) reflex is present.
3. Urine output ≥ 30 mL/hour over past 4 hours.

**Antidote:** Calcium Gluconate 10% (1g IV over 10 minutes) must always be at bedside.`,
        keyTakeaways: [
          'MgSO4 is the anticonvulsant of choice; diazepam is inferior for eclamptic seizures.',
          'Always test patellar reflexes and respiratory rate before giving maintenance IM doses.',
          'Have Calcium Gluconate drawn up and ready as an emergency antidote for toxicity.',
        ],
        clinicalPearls: [
          'Magnesium is excreted renally. In oliguric patients, halve or hold maintenance doses to avoid toxicity.',
        ],
      },
      {
        id: 'lesson-emonc-4',
        title: 'Non-Pneumatic Anti-Shock Garment (NASG) & Emergency Referral',
        durationMinutes: 40,
        content: `### Principles of the Non-Pneumatic Anti-Shock Garment (NASG)
The NASG is a lightweight, neoprene garment comprising six articulated segments that apply circumferential counter-pressure to the lower body and abdomen.

### Mechanism:
- Restores central circulatory volume by shunting ~250–300 mL of blood from the lower extremities to core organs (heart, brain, kidneys).
- Reduces pelvic and uterine blood flow by compressing the distal abdominal aorta and internal iliac arteries.

### Application Steps:
1. Slide under patient, aligning ball at pelvic level.
2. Fasten Segment 1 (ankles) tightly, Segment 2 (calves), Segment 3 (thighs).
3. Fasten Segment 4 (pelvis).
4. Fasten Segment 5 (abdomen with foam ball over umbilicus) and Segment 6 (upper abdomen).
5. Ensure patient can breathe freely.

### Safe Removal Rule:
- Remove only at the receiving surgical center when hemodynamic stability is sustained for at least 2 hours (HR < 100 bpm, SBP > 100 mmHg).
- Open segments one by one starting from ankles, waiting 15 minutes between each segment while tracking blood pressure.`,
        keyTakeaways: [
          'NASG stabilizes mothers in hypovolemic shock during transport between health posts and district hospitals.',
          'Never remove the garment prematurely or quickly; incremental removal prevents rebound hypotension.',
        ],
      },
      {
        id: 'lesson-emonc-5',
        title: 'Obstructed Labor & Partograph Action Line Decisions',
        durationMinutes: 40,
        content: `### Defining Cephalopelvic Disproportion (CPD) and Obstructed Labor
Obstructed labor occurs when the presenting part cannot progress through the birth canal despite adequate uterine contractions.

### Key Clinical Signs:
- Prolonged active labor with lack of descent of fetal head.
- Progressive caput succedaneum (scalp edema) and significant cranial bone molding (Grade 3++).
- Bandl's Pathological Retraction Ring (visible transverse groove in lower abdominal wall).
- Maternal tachycardia, dehydration, acetone in urine, and fetal distress.

### Partograph Decision Rules:
- **Alert Line:** Crosses when cervical dilation rate is < 1 cm/hour in active phase. Re-evaluate maternal-fetal status and transfer.
- **Action Line (4 hours to the right of Alert Line):** Crossing the action line mandates immediate intervention (cesarean delivery or vacuum extraction if fully dilated and low station).`,
        keyTakeaways: [
          'Grade 3 bone molding + Bandl ring = Impending uterine rupture; prepare for immediate surgical birth.',
          'The Partograph prevents prolonged labor and saves both mother and baby from fistula and asphyxia.',
        ],
      },
    ],
  },
  {
    id: 'course-newborn-101',
    title: 'Essential Newborn Care, Neonatal Resuscitation & Kangaroo Mother Care (KMC)',
    slug: 'essential-newborn-care-kmc',
    description: 'Evidence-based protocols for immediate newborn transition, the Golden Minute of neonatal resuscitation, infection prevention, thermal regulation, and Kangaroo Mother Care for low birth weight infants.',
    category: 'Newborn Care',
    level: 'Beginner',
    durationHours: 4,
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 4,
    certificateEligible: true,
    published: true,
    featured: true,
    quizId: 'quiz-newborn-1',
    learningObjectives: [
      'Execute the 5 immediate steps of essential newborn care within the first 60 seconds.',
      'Perform bag-and-mask ventilation for non-breathing newborns within the Golden Minute.',
      'Initiate and sustain Kangaroo Mother Care (KMC) for preterm and low birth weight infants.',
      'Recognize neonatal danger signs and manage early onset sepsis protocols.',
    ],
    targetAudience: ['Student Midwives', 'Registered Midwives', 'Pediatric Nurses', 'Community Health Officers'],
    lessons: [
      {
        id: 'lesson-newborn-1',
        title: 'Immediate Care at Birth & Thermal Protection',
        durationMinutes: 35,
        content: `### The Golden First Minute
Every newborn requires immediate assessment for:
1. **Breathing or crying?**
2. **Good muscle tone?**

If YES:
- Place directly **skin-to-skin** on mother's bare chest.
- Thoroughly dry infant with a warm, clean cloth; discard wet cloth and cover with dry warm towel and cap.
- **Delay cord clamping by 1–3 minutes** to transfer 80–100 mL of placental blood (dramatically reduces neonatal anemia and intraventricular hemorrhage).
- Support early initiation of **exclusive breastfeeding within the first hour**.
- Administer Eye Prophylaxis (Tetracycline 1% ointment), Vitamin K1 (1 mg IM), and 7.1% Chlorhexidine gel to cord stump.`,
        keyTakeaways: [
          'Immediate skin-to-skin prevents neonatal hypothermia, the silent killer of newborns.',
          'Delayed cord clamping transfers vital iron stores for infant brain development.',
        ],
        clinicalPearls: [
          'Do NOT routinely suction the newborn airway unless particulate meconium is obstructing breathing.',
        ],
      },
      {
        id: 'lesson-newborn-2',
        title: 'Neonatal Resuscitation: Helping Babies Breathe (HBB)',
        durationMinutes: 45,
        content: `### The Helping Babies Breathe Action Plan
If baby is NOT crying or breathing at birth:
1. **Clear Airway & Stimulate:** Position head in "sniffing position", suction mouth then nose if obstructed. Rub back twice.
2. **Ventilate within the Golden Minute:** If still not breathing or gasping, apply appropriately sized face mask covering mouth, nose, and chin.
3. **Ventilation Rate:** 40 to 60 breaths per minute ("Squeeze, two, three, squeeze...").
4. **Evaluate Chest Rise:**
   - If chest does not rise, perform **MR. SOPA**:
     - **M:** Mask adjustment
     - **R:** Reposition airway
     - **S:** Suction mouth & nose
     - **O:** Open mouth slightly
     - **P:** Pressure increase
     - **A:** Alternative airway`,
        keyTakeaways: [
          'Effective bag-and-mask ventilation is the single most crucial step in saving non-breathing newborns.',
          'Look for chest rise with every positive pressure ventilation breath.',
        ],
      },
      {
        id: 'lesson-newborn-3',
        title: 'Kangaroo Mother Care (KMC) for Preterm & Low Birth Weight Babies',
        durationMinutes: 40,
        content: `### What is Kangaroo Mother Care?
KMC is continuous skin-to-skin contact between mother (or designated caregiver) and low birth weight (<2,500g) or preterm infant, combined with exclusive and frequent breastfeeding.

### Benefits:
- Reduces neonatal mortality by 40% in stable low birth weight infants.
- Maintains normal thermal equilibrium (36.5°C–37.5°C).
- Lowers risk of hospital-acquired sepsis and hypothermia.
- Enhances maternal-infant bonding and breast milk production.

### KMC Position:
- Baby is placed upright in the frog position between mother's breasts under her clothing.
- Head turned to one side with neck slightly extended to keep airway clear.
- Wears only a diaper, warm socks, and a cap.`,
        keyTakeaways: [
          'KMC is more effective and protective than standard incubator care for stable preterm infants.',
          'Partners and grandmothers can share KMC shifts to support the mother.',
        ],
      },
      {
        id: 'lesson-newborn-4',
        title: 'Neonatal Danger Signs & Infection Prevention',
        durationMinutes: 30,
        content: `### Key Neonatal Danger Signs (Require Immediate Hospital Care)
1. **Inability to breastfeed or suckle.**
2. **Severe chest indrawing or grunting.**
3. **Fever (>37.5°C) or Hypothermia (<36.5°C).**
4. **Lethargy or unconsciousness, reduced movements.**
5. **Umbilical redness extending to surrounding skin or foul pus discharge.**
6. **Skin pustules or blisters.**
7. **Jaundice appearing within the first 24 hours of life or extending to palms and soles.**`,
        keyTakeaways: [
          'Early recognition of danger signs prevents rapid neonatal deterioration from septic shock.',
        ],
      },
    ],
  },
  {
    id: 'course-anc-101',
    title: 'Comprehensive 8-Contact Antenatal Care (ANC) & Risk Stratification',
    slug: 'comprehensive-antenatal-care-anc',
    description: 'Learn the modern WHO and Rwanda Ministry of Health 8-contact positive pregnancy experience model, laboratory screenings, nutritional counseling, and early complication detection.',
    category: 'Antenatal Care',
    level: 'Beginner',
    durationHours: 5,
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 4,
    certificateEligible: true,
    published: true,
    featured: false,
    quizId: 'quiz-anc-1',
    learningObjectives: [
      'Implement the 8-contact ANC schedule according to gestational age milestones.',
      'Interpret maternal laboratory results for anemia, syphilis, HIV, and gestational diabetes.',
      'Formulate tailored nutritional advice and micronutrient supplementation plans.',
      'Develop customized Birth Preparedness and Complication Readiness (BPCR) plans with families.',
    ],
    targetAudience: ['Student Midwives', 'Primary Healthcare Workers', 'Maternal Health Advocates'],
    lessons: [
      {
        id: 'lesson-anc-1',
        title: 'Transitioning from 4-Visit to 8-Contact ANC Model',
        durationMinutes: 40,
        content: `### Why the 8-Contact Model?
Evidence demonstrated that the older 4-visit model missed critical third-trimester hypertensive and growth abnormalities. The 8-contact model improves maternal-fetal outcomes and reduces stillbirths by up to 8 per 1,000 births.

### Contact Timing Overview:
- **Contact 1:** Up to 12 weeks
- **Contact 2:** 20 weeks
- **Contact 3:** 26 weeks
- **Contact 4:** 30 weeks
- **Contact 5:** 34 weeks
- **Contact 6:** 36 weeks
- **Contact 7:** 38 weeks
- **Contact 8:** 40 weeks`,
        keyTakeaways: [
          'Increased contacts during the 3rd trimester catch late-onset preeclampsia and fetal growth restriction.',
        ],
      },
      {
        id: 'lesson-anc-2',
        title: 'Essential Laboratory Screening & Prophylaxis',
        durationMinutes: 45,
        content: `### Mandatory First Contact Laboratory Battery:
- **Hemoglobin / Full Blood Count:** Diagnose anemia (<11 g/dL in 1st/3rd trimester, <10.5 g/dL in 2nd trimester).
- **Blood Group & Rh Status:** Screen for Rh-negative status to plan anti-D prophylaxis.
- **Dual HIV & Syphilis Rapid Test:** Eliminate mother-to-child transmission (eMTCT).
- **Hepatitis B Surface Antigen (HBsAg).**
- **Urine dipstick for proteinuria and bacteriuria.**
- **Daily Micronutrient Supplementation:** 30–60 mg elemental Iron + 400 mcg Folic Acid daily.`,
        keyTakeaways: [
          'Routine Iron and Folic Acid prevent neural tube defects and maternal anemia.',
        ],
      },
      {
        id: 'lesson-anc-3',
        title: 'Nutritional Counseling & Weight Gain in Pregnancy',
        durationMinutes: 35,
        content: `### Key Nutritional Guidance:
- Emphasize diet diversity incorporating Rwanda staple foods: beans, peas, eggs, small fish (indagara), dark green leafy vegetables (dodo, isombe), sweet potatoes, and fortified grains.
- Advise adequate hydration (2–3 liters daily).
- Restrict excessive salt and avoid alcohol, smoking, and unpasteurized dairy.`,
        keyTakeaways: [
          'Locally accessible nutrient-dense foods provide optimal maternal-fetal nutrition.',
        ],
      },
      {
        id: 'lesson-anc-4',
        title: 'Birth Preparedness & Complication Readiness (BPCR)',
        durationMinutes: 35,
        content: `### The 6 Core Elements of BPCR:
1. Designated delivery facility with 24/7 skilled midwifery staff.
2. Identified emergency transport and driver contact.
3. Designated birth companion of choice.
4. Dedicated savings fund for unexpected medical or travel expenses.
5. Prepared clean birth kit, baby clothing, and personal hygiene supplies.
6. Identified compatible blood donors in case of emergency transfusion.`,
        keyTakeaways: [
          'A written BPCR plan dramatically reduces the first and second delays in obstetric emergencies.',
        ],
      },
    ],
  },
  {
    id: 'course-fp-101',
    title: 'Postpartum & Interval Family Planning: Long-Acting Reversible Contraception (LARC)',
    slug: 'postpartum-interval-family-planning',
    description: 'Clinical counseling, medical eligibility criteria (MEC), and insertion techniques for Postpartum Intrauterine Devices (PPIUD), subdermal implants, and hormonal contraceptives.',
    category: 'Family Planning',
    level: 'Intermediate',
    durationHours: 4,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 3,
    certificateEligible: true,
    published: true,
    featured: false,
    quizId: 'quiz-fp-1',
    learningObjectives: [
      'Apply WHO Medical Eligibility Criteria (MEC) for contraceptive initiation across different patient profiles.',
      'Counsel mothers on immediate postpartum family planning options (PPIUD, implants, LAM).',
      'Address cultural myths and misconceptions surrounding hormonal contraception respectfully.',
    ],
    targetAudience: ['Midwives', 'Nurses', 'Pharmacists', 'Reproductive Health Counselors'],
    lessons: [
      {
        id: 'lesson-fp-1',
        title: 'WHO Medical Eligibility Criteria (MEC) & Counseling Skills',
        durationMinutes: 40,
        content: `### The WHO MEC Classification:
- **Category 1:** No restriction for use.
- **Category 2:** Advantages outweigh theoretical or proven risks.
- **Category 3:** Theoretical or proven risks usually outweigh advantages.
- **Category 4:** Unacceptable health risk (Absolute Contraindication).

### REDI Counseling Framework:
- **R:** Rapport building
- **E:** Exploration of client lifestyle and reproductive goals
- **D:** Decision-making support
- **I:** Implementation and follow-up plan`,
        keyTakeaways: [
          'Use the WHO MEC wheel to match patient medical history safely.',
        ],
      },
      {
        id: 'lesson-fp-2',
        title: 'Immediate Postpartum Family Planning (PPIUD & Implants)',
        durationMinutes: 45,
        content: `### Postpartum Timing Windows:
- **Immediate Postplacental PPIUD:** Inserted within 10 minutes of placental expulsion using Ring forceps.
- **Early Postpartum:** Inserted up to 48 hours post-delivery.
- **Subdermal Implants (Jadelle / Implanon):** Can be inserted immediately postpartum before facility discharge without impacting breastfeeding volume.`,
        keyTakeaways: [
          'Immediate postpartum provision captures patients before they leave the maternity ward.',
        ],
      },
      {
        id: 'lesson-fp-3',
        title: 'Lactational Amenorrhea Method (LAM) & Transition Planning',
        durationMinutes: 30,
        content: `### The 3 Essential Criteria for LAM:
1. Menses have not returned since childbirth.
2. Baby is exclusively or predominantly breastfed on demand day and night (at least every 4h by day, 6h by night).
3. Baby is less than 6 months of age.

If ANY of the 3 criteria is not met, the mother must transition immediately to another modern contraceptive method.`,
        keyTakeaways: [
          'LAM is 98% effective ONLY when all three conditions are strictly met.',
        ],
      },
    ],
  },
  {
    id: 'course-pharma-101',
    title: 'Essential Maternal & Neonatal Pharmacotherapy & Medication Safety',
    slug: 'maternal-neonatal-pharmacotherapy',
    description: 'Comprehensive pharmacology module covering uterotonics, tocolytics, anti-hypertensives, antibiotics in pregnancy, and neonatal medication administration safety.',
    category: 'Pharmacology',
    level: 'Advanced',
    durationHours: 5,
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 3,
    certificateEligible: true,
    published: true,
    featured: false,
    quizId: 'quiz-pharma-1',
    learningObjectives: [
      'Compare pharmacokinetics and safety of hydralazine, labetalol, and nifedipine for acute severe hypertension.',
      'Differentiate appropriate prophylactic and therapeutic antibiotic regimens in chorioamnionitis and PROM.',
      'Calculate precise weight-based dosing for neonatal antibiotics and emergency resuscitation.',
    ],
    targetAudience: ['Pharmacists', 'Midwives', 'Clinical Officers', 'Medical Students'],
    lessons: [
      {
        id: 'lesson-pharma-1',
        title: 'Emergency Antihypertensive Agents in Severe Preeclampsia',
        durationMinutes: 45,
        content: `### Rapid-Acting Antihypertensive Therapy:
Target BP: 140–150 / 90–100 mmHg (avoid aggressive drops that compromise placental perfusion).

1. **Oral Nifedipine (Immediate Release):**
   - Dose: 10–20 mg orally (swallowed, NOT sublingual). Repeat in 20–30 min if BP remains ≥160/110.
2. **IV Labetalol:**
   - Dose: 20 mg IV bolus over 2 min; repeat 40 mg after 10 min, then 80 mg up to max 300 mg.
   - *Contraindication:* Asthma, congestive heart failure.
3. **IV Hydralazine:**
   - Dose: 5–10 mg IV slowly over 2 min; repeat every 20 min (max 20 mg).`,
        keyTakeaways: [
          'Lower severe BP gradually to protect uteroplacental blood flow.',
        ],
      },
      {
        id: 'lesson-pharma-2',
        title: 'Antibiotic Stewardship in Obstetrics (PROM & Chorioamnionitis)',
        durationMinutes: 40,
        content: `### Protocols:
- **PPROM (<37 weeks):** Oral Erythromycin 250 mg 6-hourly or Ampicillin + Azithromycin to prolong latency.
- **Intrapartum Chorioamnionitis (Triple Therapy):**
  - Ampicillin 2g IV every 6 hours +
  - Gentamicin 5 mg/kg IV once daily +
  - Metronidazole 500 mg IV every 8 hours (if cesarean delivery is planned).`,
        keyTakeaways: [
          'Timely broad-spectrum coverage prevents neonatal sepsis and maternal bacteremia.',
        ],
      },
      {
        id: 'lesson-pharma-3',
        title: 'Neonatal Medication Safety & Calculation Rules',
        durationMinutes: 40,
        content: `### High-Alert Safety Rules in Neonates:
- Always perform two-person independent calculation checks for neonatal IV medications.
- Account for immature hepatic and renal clearance in preterm neonates by extending dosing intervals (e.g. Gentamicin every 24–48 hours depending on gestational age).`,
        keyTakeaways: [
          'Neonates have reduced drug clearance; strict weight-based dosing is mandatory.',
        ],
      },
    ],
  },
];
