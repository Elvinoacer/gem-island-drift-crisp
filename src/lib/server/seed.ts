import { getSql } from "@/lib/db";

const AETHER = "pharm-aether";
const COAST = "pharm-coast";
const HIGHLANDS = "pharm-highlands";

function hours(pharmacyId: string, rows: [string, string][]) {
  return rows.map((r, i) => ({
    id: `${pharmacyId}-h${i}`,
    pharmacy_id: pharmacyId,
    sort_order: i,
    day: r[0],
    time: r[1],
  }));
}

const GALLERY = [
  ["/images/gallery/welcoming_retail_floor.webp", "Bright pharmacy interior with organised shelves", "Welcoming retail floor"],
  ["/images/gallery/careful_dispensing.webp", "Pharmacist reviewing medication bottles", "Careful dispensing"],
  ["/images/gallery/private_counselling.webp", "Private consultation between pharmacist and patient", "Private counselling"],
  ["/images/gallery/modern_care_tools.webp", "Healthcare professional with digital tablet", "Modern care tools"],
  ["/images/gallery/curated_wellness_aisle.webp", "Wellness and vitamin products on display", "Curated wellness aisle"],
  ["/images/gallery/comfortable_waiting_area.webp", "Calm modern clinic waiting area", "Comfortable waiting area"],
] as const;

let seeded = false;

export async function ensureSeed() {
  if (seeded) return;
  const sql = await getSql();
  const rows = await sql<{ n: number }>`select count(*)::int as n from pharmacies`;
  if ((rows[0]?.n ?? 0) > 0) {
    seeded = true;
    return;
  }

  const pharmacies = [
    {
      id: AETHER,
      slug: "aether",
      name: "Aether Pharmacy",
      tagline: "Your neighbourhood pharmacy, built on trust",
      description:
        "Aether Pharmacy has served families across Nairobi for over 15 years with expert dispensing, personalised counselling, and convenient care services.",
      about:
        "Founded on Kenyatta Avenue, Aether is a PPB-licensed community pharmacy. We still know our patients by name — and we built the digital rails so refills, vaccines, and counselling stay that personal as the city grows.",
      status: "active",
      listed: true,
      featured: true,
      email: "care@aetherpharmacy.com",
      phone: "+254 790 670 542",
      whatsapp: "+254790670542",
      street: "Kenyatta Avenue",
      city: "Nairobi",
      county: "Nairobi",
      zip: "00100",
      latitude: -1.286389,
      longitude: 36.817223,
      cover: "/images/gallery/welcoming_retail_floor.webp",
      delivery_notes: "Same-day delivery across Westlands, Kilimani, Parklands, and CBD. Temperature-sensitive items packed with ice packs.",
      delivery_fee_kes: 250,
      licence: "PPB-NBI-4418",
      insurance: ["SHA / NHIF", "AAR Insurance", "Jubilee Health", "Britam", "CIC Insurance", "Madison Health"],
    },
    {
      id: COAST,
      slug: "coast-care",
      name: "Coast Care Pharmacy",
      tagline: "Nyali care, with a sea breeze",
      description:
        "Coast Care is Nyali’s walk-in pharmacy for families, hotels, and travellers — travel vaccines, malaria prevention, and a pharmacist on every shift.",
      about:
        "We opened on Links Road to give the north coast a licensed shop that stays open late. Hotel concierges know us; so do grandparents in Nyali and Bamburi.",
      status: "active",
      listed: true,
      featured: false,
      email: "hello@coastcare.ke",
      phone: "+254 722 118 440",
      whatsapp: "+254722118440",
      street: "Links Road, Nyali",
      city: "Mombasa",
      county: "Mombasa",
      zip: "80100",
      latitude: -4.043477,
      longitude: 39.668206,
      cover: "/images/gallery/curated_wellness_aisle.webp",
      delivery_notes: "Nyali, Bamburi, and Mtwapa same-day before 3pm. Hotel drop-offs welcome with a room number.",
      delivery_fee_kes: 300,
      licence: "PPB-MSA-2091",
      insurance: ["SHA / NHIF", "AAR Insurance", "Jubilee Health", "Madison Health"],
    },
    {
      id: HIGHLANDS,
      slug: "highlands",
      name: "Highlands Pharmacy",
      tagline: "Nakuru’s highland chemist",
      description: "A family chemist applying to join the Aether network — currently in licence review.",
      about: "Serving Nakuru town with chronic-care refills and a small wellness counter.",
      status: "submitted",
      listed: false,
      featured: false,
      email: "owner@highlands.ke",
      phone: "+254 701 334 221",
      whatsapp: "+254701334221",
      street: "Kenyatta Avenue",
      city: "Nakuru",
      county: "Nakuru",
      zip: "20100",
      latitude: -0.303099,
      longitude: 36.080025,
      cover: "/images/gallery/modern_care_tools.webp",
      delivery_notes: "Town centre bicycle runs on weekdays.",
      delivery_fee_kes: 150,
      licence: "PPB-NKR-1182",
      insurance: ["SHA / NHIF"],
    },
  ];

  for (const p of pharmacies) {
    await sql`
      insert into pharmacies (
        id, slug, name, tagline, description, about, status, listed, featured,
        email, phone, whatsapp, street, city, county, country, zip,
        latitude, longitude, maps_embed_url, logo_url, cover_image_url,
        delivery_notes, delivery_fee_kes, licence_number, insurance, listed_at
      ) values (
        ${p.id}, ${p.slug}, ${p.name}, ${p.tagline}, ${p.description}, ${p.about},
        ${p.status}, ${p.listed}, ${p.featured}, ${p.email}, ${p.phone}, ${p.whatsapp},
        ${p.street}, ${p.city}, ${p.county}, ${"Kenya"}, ${p.zip},
        ${p.latitude}, ${p.longitude},
        ${`https://www.google.com/maps?q=${p.latitude},${p.longitude}&z=16&output=embed`},
        ${"/favicon.svg"}, ${p.cover}, ${p.delivery_notes}, ${p.delivery_fee_kes},
        ${p.licence}, ${JSON.stringify(p.insurance)},
        ${p.listed ? new Date().toISOString() : null}
      )
    `;
  }

  const hourSets: Record<string, [string, string][]> = {
    [AETHER]: [
      ["Monday – Friday", "8:00 AM – 8:00 PM"],
      ["Saturday", "9:00 AM – 6:00 PM"],
      ["Sunday", "10:00 AM – 4:00 PM"],
    ],
    [COAST]: [
      ["Monday – Saturday", "8:00 AM – 9:00 PM"],
      ["Sunday", "9:00 AM – 6:00 PM"],
    ],
    [HIGHLANDS]: [
      ["Monday – Friday", "8:30 AM – 6:30 PM"],
      ["Saturday", "9:00 AM – 4:00 PM"],
      ["Sunday", "Closed"],
    ],
  };

  for (const [pid, rows] of Object.entries(hourSets)) {
    for (const h of hours(pid, rows)) {
      await sql`
        insert into pharmacy_hours (id, pharmacy_id, sort_order, day, time)
        values (${h.id}, ${h.pharmacy_id}, ${h.sort_order}, ${h.day}, ${h.time})
      `;
    }
  }

  for (const pid of [AETHER, COAST, HIGHLANDS]) {
    for (let i = 0; i < GALLERY.length; i++) {
      const [url, alt, caption] = GALLERY[i];
      await sql`
        insert into pharmacy_images (id, pharmacy_id, sort_order, url, alt, caption)
        values (${`${pid}-img${i}`}, ${pid}, ${i}, ${url}, ${alt}, ${caption})
      `;
    }
  }

  const teams: Record<string, [string, string, string, string][]> = {
    [AETHER]: [
      ["Dr. Priya Nair, PharmD", "Lead Pharmacist & Owner", "Priya founded Aether with a simple belief: every patient deserves clear answers and careful attention.", "/images/team/priya-nair.webp"],
      ["Marcus Chen, RPh", "Clinical Pharmacist", "Marcus leads vaccinations and health screenings. Patients know him for calm, plain-language counselling.", "/images/team/marcus-chen.webp"],
      ["Sofia Alvarez, CPhT", "Senior Pharmacy Technician", "Sofia keeps refills flowing and coordinates delivery logistics.", "/images/team/sofia-alvarez.webp"],
      ["James Okonkwo", "Patient Care Coordinator", "James helps patients navigate SHA, schedule consults, and set up pickup or delivery.", "/images/team/david-kim.webp"],
    ],
    [COAST]: [
      ["Amina Hassan, RPh", "Owner & Pharmacist", "Amina built Coast Care for Nyali families and the hotel corridor — travel health is her specialty.", "/images/team/sofia-alvarez.webp"],
      ["Daniel Otieno, RPh", "Clinical Pharmacist", "Daniel runs the malaria and vaccine desk, with late shifts for walk-ins.", "/images/team/marcus-chen.webp"],
    ],
    [HIGHLANDS]: [
      ["Grace Wanjiku, RPh", "Owner", "Grace is applying to list Highlands on Aether so Nakuru patients can refill online.", "/images/team/priya-nair.webp"],
    ],
  };

  for (const [pid, members] of Object.entries(teams)) {
    for (let i = 0; i < members.length; i++) {
      const [name, role, bio, photo] = members[i];
      await sql`
        insert into pharmacy_team (id, pharmacy_id, sort_order, name, role, bio, photo_url)
        values (${`${pid}-t${i}`}, ${pid}, ${i}, ${name}, ${role}, ${bio}, ${photo})
      `;
    }
  }

  const serviceDefs = [
    ["prescription-dispensing", "Prescription Dispensing", "Accurate filling with pharmacist counselling on every new medication.", "Our pharmacists review each prescription for accuracy, interactions, and appropriateness before dispensing.", "/images/services/prescription-dispensing.webp", "Ready in 30–45 minutes"],
    ["prescription-refills", "Prescription Refills", "Request online or by phone — ready for pickup or delivery.", "Never run out of essential medication. Request a refill through the form, WhatsApp, or phone.", "/images/services/prescription-refills.webp", "Same day before 3 PM"],
    ["medication-counselling", "Medication Counselling", "Private time with a pharmacist to understand your regimen.", "Starting a new therapy or managing several medicines? Book a private session so you feel confident.", "/images/services/medication-counselling.webp", "15–30 minutes"],
    ["blood-pressure-checks", "Blood Pressure Checks", "Walk-in screening with guidance on readings and next steps.", "Free walk-in blood pressure checks during open hours, with calibrated equipment.", "/images/services/blood-pressure-checks.webp", "5–10 minutes"],
    ["vaccinations", "Vaccinations", "Flu, COVID-19, travel, and adult vaccines by certified pharmacists.", "On-site immunisations after screening, information, and signed consent. Digital certificates in your portal.", "/images/services/vaccinations.webp", "10–20 minutes"],
    ["delivery-services", "Delivery Services", "Safe medication delivery across this pharmacy’s service area.", "Temperature-sensitive medicines handled with care. WhatsApp status updates on the way.", "/images/services/delivery-services.webp", "2–6 hours"],
    ["health-screenings", "Health Screenings", "Glucose, BMI, and authorised point-of-care tests.", "Preventive screenings by licensed pharmacists. Not a diagnosis — we refer when further care is needed.", "/images/services/health-screenings.webp", "10–20 minutes"],
    ["diabetes-care", "Diabetes Care Support", "Supplies, education, and pharmacist support for living well with diabetes.", "Meters, strips, insulin counselling, and sick-day rules — coordinated with your clinician.", "/images/services/diabetes-care.webp", "20–40 minutes"],
  ] as const;

  for (const pid of [AETHER, COAST]) {
    for (const s of serviceDefs) {
      if (pid === COAST && s[0] === "diabetes-care") continue;
      await sql`
        insert into services (id, pharmacy_id, slug, title, short, description, image_url, duration, published)
        values (${`${pid}-${s[0]}`}, ${pid}, ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ${s[4]}, ${s[5]}, ${true})
      `;
    }
  }

  const meds = [
    ["panadol-extra", "Panadol Extra", "Paracetamol + caffeine", "Pain Relief", "pain-relief", "Fast relief for headache and everyday pain. Do not combine with other paracetamol products.", "Caplets", "500 mg", "/images/otc/pain-relief.webp"],
    ["brufen-400", "Brufen 400", "Ibuprofen", "Pain Relief", "pain-relief", "NSAID for muscle, joint, and period pain. Ask us if you have stomach, kidney, or heart concerns.", "Tablets", "400 mg", "/images/otc/pain-relief.webp"],
    ["vitamin-c-1000", "Vitamin C 1000", "Ascorbic acid", "Vitamins & Supplements", "vitamins-supplements", "Daily immune support. Effervescent and tablet forms in stock.", "Tablets", "1000 mg", "/images/otc/vitamins-supplements.webp"],
    ["centrum-adults", "Centrum Adults", "Multivitamin", "Vitamins & Supplements", "vitamins-supplements", "Complete daily multivitamin. Third-party tested formula.", "Tablets", "Once daily", "/images/otc/vitamins-supplements.webp"],
    ["calpol-infant", "Calpol Infant", "Paracetamol", "Baby Care", "baby-care", "Weight-based fever and pain relief for infants. Always use the syringe provided.", "Suspension", "120 mg/5 ml", "/images/otc/baby-care.webp"],
    ["pampers-newborn", "Pampers Newborn", "Nappies", "Baby Care", "baby-care", "Newborn nappies, size 1. Ask about bulk pricing.", "Pack", "Size 1", "/images/otc/baby-care.webp"],
    ["betadine", "Betadine", "Povidone-iodine", "First Aid", "first-aid", "Broad antiseptic for minor cuts. Allow to air-dry before dressing.", "Solution", "10%", "/images/otc/first-aid.webp"],
    ["cerave-moisturiser", "CeraVe Moisturising Cream", "Ceramides", "Skin Care", "skin-care", "Fragrance-free cream for dry and eczema-prone skin.", "Cream", "454 g", "/images/otc/skin-care.webp"],
    ["onetouch-strips", "OneTouch Select Strips", "Glucose test strips", "Diabetes Care", "diabetes-care", "Match strips to your exact meter model. Store capped, away from moisture.", "Strips", "50s", "/images/otc/diabetes-management.webp"],
    ["pregnacare", "Pregnacare Original", "Prenatal vitamins", "Women's Health", "womens-health", "Folic acid and supporting nutrients. Ideally started before conception.", "Tablets", "Once daily", "/images/otc/womens-health.webp"],
    ["benylin", "Benylin Dry Cough", "Dextromethorphan", "Cold & Flu", "cold-flu", "Night-time cough relief. Check labels before stacking cold products.", "Syrup", "100 ml", "/images/otc/cold-flu.webp"],
    ["hydralyte", "Hydralyte ORS", "Oral rehydration salts", "Digestive Health", "digestive-health", "First priority for acute fluid loss. Mix with clean water as directed.", "Sachets", "10s", "/images/otc/first-aid.webp"],
  ] as const;

  for (const m of meds) {
    await sql`
      insert into medicines (id, slug, name, generic_name, category, category_slug, description, form, strength, image_url)
      values (${m[0]}, ${m[0]}, ${m[1]}, ${m[2]}, ${m[3]}, ${m[4]}, ${m[5]}, ${m[6]}, ${m[7]}, ${m[8]})
    `;
  }

  const aetherStock: [string, number, string][] = [
    ["panadol-extra", 280, "in_stock"],
    ["brufen-400", 320, "in_stock"],
    ["vitamin-c-1000", 450, "in_stock"],
    ["centrum-adults", 1850, "in_stock"],
    ["calpol-infant", 620, "in_stock"],
    ["pampers-newborn", 1450, "low"],
    ["betadine", 380, "in_stock"],
    ["cerave-moisturiser", 2890, "in_stock"],
    ["onetouch-strips", 2100, "in_stock"],
    ["pregnacare", 1650, "in_stock"],
    ["benylin", 540, "in_stock"],
    ["hydralyte", 420, "in_stock"],
  ];
  const coastStock: [string, number, string][] = [
    ["panadol-extra", 260, "in_stock"],
    ["brufen-400", 300, "in_stock"],
    ["vitamin-c-1000", 480, "in_stock"],
    ["calpol-infant", 640, "in_stock"],
    ["betadine", 360, "in_stock"],
    ["cerave-moisturiser", 3100, "low"],
    ["benylin", 560, "in_stock"],
    ["hydralyte", 390, "in_stock"],
    ["pregnacare", 1720, "out"],
  ];

  for (const [id, price, stock] of aetherStock) {
    await sql`
      insert into pharmacy_inventory (pharmacy_id, medicine_id, price_kes, stock_status, listed, sku)
      values (${AETHER}, ${id}, ${price}, ${stock}, ${true}, ${`AE-${id.slice(0, 6).toUpperCase()}`})
    `;
  }
  for (const [id, price, stock] of coastStock) {
    await sql`
      insert into pharmacy_inventory (pharmacy_id, medicine_id, price_kes, stock_status, listed, sku)
      values (${COAST}, ${id}, ${price}, ${stock}, ${stock !== "out"}, ${`CC-${id.slice(0, 6).toUpperCase()}`})
    `;
  }

  const articles = [
    ["medication-safety-at-home", "Medication Safety at Home: 8 Habits That Protect Your Family", "From child-proof storage to never sharing prescriptions — practical habits every household should follow.", "Medication Safety", "6 min", "Dr. Priya Nair, PharmD", "/images/articles/medication-safety-at-home.webp", ["Keep medicines in a cool, dry place away from bathrooms and kitchen heat.", "Use the original labelled container whenever possible.", "Never share prescription medication, even if symptoms seem identical.", "Dispose of expired medicines through our in-store take-back — do not flush them."]],
    ["understanding-blood-pressure", "Understanding Your Blood Pressure Numbers", "What systolic and diastolic readings mean, when to worry, and how lifestyle and medication work together.", "Blood Pressure", "5 min", "Marcus Chen, RPh", "/images/articles/understanding-blood-pressure.webp", ["A normal reading for most adults is under 120/80 mmHg.", "One high reading does not equal a diagnosis — a pattern does.", "If you take blood pressure medication, take it consistently.", "Walk in for a free check during open hours."]],
    ["diabetes-everyday-tips", "Living Well with Diabetes: Everyday Tips from Your Pharmacist", "Glucose checks, sick-day rules, foot care, and medication timing.", "Diabetes", "7 min", "Dr. Priya Nair, PharmD", "/images/articles/diabetes-everyday-tips.webp", ["Consistent routines beat perfect days.", "Always carry a rapid sugar source if you use insulin or medicines that can cause lows.", "Check feet daily for cuts or colour changes.", "On sick days, never stop diabetes medication without guidance."]],
    ["seasonal-allergy-guide", "Seasonal Allergies: Choosing Relief That Actually Helps", "Antihistamines, nasal sprays, eye drops — and when combination products create confusion.", "Wellness", "5 min", "Sofia Alvarez, CPhT", "/images/articles/seasonal-allergy-guide.webp", ["Non-drowsy antihistamines work well for many people.", "Steroid nasal sprays are often the most effective daily option for congestion.", "Avoid stacking multi-symptom cold products on top of allergy meds.", "Wheezing, facial swelling, or trouble breathing is not ordinary hay fever."]],
    ["flu-season-preparation", "How to Prepare for Flu Season", "Vaccination timing, household kits, and when fever or cough needs more than rest.", "Seasonal Health", "4 min", "Dr. Priya Nair, PharmD", "/images/articles/flu-season-preparation.webp", ["The best time to get a flu vaccine is before activity peaks — later is still worthwhile.", "Build a simple sick-day kit: thermometer, oral rehydration, tissues.", "Walk in for your flu shot during open hours; no appointment needed most days."]],
    ["pharmacy-vaccines-what-to-expect", "Getting vaccinated at the pharmacy: what to expect", "Screening, consent, a 15-minute wait, and a digital certificate.", "Immunisation", "5 min", "Marcus Chen, RPh", "/images/services/vaccinations.webp", ["Pharmacy vaccination is offered where the pharmacy and immuniser are locally authorised.", "Before any dose we complete a contraindication questionnaire and capture written consent.", "You stay for 15 minutes of observation — 30 minutes if you have a significant allergy history.", "Childhood KEPI vaccines remain at public immunisation clinics."]],
  ] as const;

  for (const a of articles) {
    await sql`
      insert into health_articles (id, slug, title, excerpt, category, read_time, author, image_url, content, published)
      values (${a[0]}, ${a[0]}, ${a[1]}, ${a[2]}, ${a[3]}, ${a[4]}, ${a[5]}, ${a[6]}, ${JSON.stringify(a[7])}, ${true})
    `;
  }

  await sql`
    insert into refill_requests (id, pharmacy_id, guest_name, guest_phone, medication, notes, status)
    values
      (${"rf-1"}, ${AETHER}, ${"Jane Wanjiru"}, ${"+254712000111"}, ${"Amlodipine 5 mg — 30 tablets"}, ${"SHA card on file"}, ${"pending"}),
      (${"rf-2"}, ${AETHER}, ${"David Mwangi"}, ${"+254722000222"}, ${"Metformin 500 mg"}, ${"Please pack for delivery to Kilimani"}, ${"ready"})
  `;
  await sql`
    insert into enquiries (id, pharmacy_id, name, email, phone, subject, message, status)
    values
      (${"eq-1"}, ${AETHER}, ${"Lydia Otieno"}, ${"lydia@example.com"}, ${"+254700111222"}, ${"Delivery zone"}, ${"Do you deliver to Lavington on Saturdays?"}, ${"open"}),
      (${"eq-2"}, ${COAST}, ${"Hotel Voyager"}, ${"concierge@voyager.ke"}, ${"+254711333444"}, ${"Travel vaccines"}, ${"Two guests need yellow fever counselling before Friday."}, ${"open"})
  `;
  await sql`
    insert into orders (id, pharmacy_id, guest_name, status, total_kes, items)
    values
      (${"ord-1"}, ${AETHER}, ${"Walk-in · counter"}, ${"dispensed"}, ${860}, ${JSON.stringify([{ name: "Panadol Extra", qty: 2, priceKes: 280 }, { name: "Benylin Dry Cough", qty: 1, priceKes: 540 }])}),
      (${"ord-2"}, ${COAST}, ${"Nyali delivery"}, ${"packing"}, ${640}, ${JSON.stringify([{ name: "Calpol Infant", qty: 1, priceKes: 640 }])})
  `;

  seeded = true;
}

export const DEMO_PHARMACY_IDS = { AETHER, COAST, HIGHLANDS };
