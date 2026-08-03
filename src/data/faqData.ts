import { FAQItem, QuickIntent } from '../types';

export const CLINIC_INFO = {
  name: 'Marlin Coast Veterinary Hospital',
  tagline: 'Caring & gentle gold standard veterinary care in Trinity Beach',
  location: 'Cnr Aropa St and Captain Cook Highway, Trinity Beach QLD 4879',
  phone: '07 4057 6033',
  phoneClean: '0740576033',
  email: 'admin@mcvet.com.au',
  owners: 'Dr Steven Porep and Dr Ashleigh Porep',
  tradingHours: 'Monday to Friday 8am to 7pm, Saturday 8am to 3pm, closed Sundays',
  logoUrl: 'https://irp.cdn-website.com/7d91de63/dms3rep/multi/opt/Logo_v1-597w.webp',
  links: {
    bookOnline: 'https://www.mcvet.com.au/appointment',
    orderOnline: 'https://www.mcvet.com.au/order-online',
    contactPage: 'https://www.mcvet.com.au/contact-us',
  },
  badges: [
    { label: 'GapOnly Accepted', type: 'payment' },
    { label: 'Zip Pay Accepted', type: 'payment' },
    { label: 'VetPay Accepted', type: 'payment' },
    { label: 'Certified PennHIP Member', type: 'accreditation' },
    { label: 'AQIS Approved Vets for Export', type: 'accreditation' },
  ],
};

export const QUICK_INTENTS: QuickIntent[] = [
  {
    id: 'book',
    label: 'Book an appointment',
    prompt: 'How do I book an appointment?',
    iconName: 'Calendar',
  },
  {
    id: 'hours',
    label: 'Trading hours',
    prompt: 'What are your trading hours?',
    iconName: 'Clock',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    prompt: 'Do you offer an after hours emergency service?',
    iconName: 'AlertTriangle',
  },
  {
    id: 'payment',
    label: 'Payment options',
    prompt: 'Do you accept pet insurance or payment plans?',
    iconName: 'CreditCard',
  },
  {
    id: 'medication',
    label: 'Order medication online',
    prompt: 'Can I order pet medication or prescription food online?',
    iconName: 'Pill',
  },
];

export const FAQ_KNOWLEDGE_BASE: FAQItem[] = [
  {
    id: 1,
    question: 'What services does Marlin Coast Veterinary Hospital offer?',
    answer: 'Marlin Coast Veterinary Hospital offers wellbeing services, healthcare services, pet care for a wide range of animals, surgical services (orthopaedic, dental, soft tissue, ophthalmic), and pet diagnostics including imaging and PennHIP radiographs.',
    category: 'services',
    keywords: ['services', 'offer', 'do you do', 'treatments', 'care', 'healthcare', 'surgery', 'diagnostics'],
  },
  {
    id: 2,
    question: 'How do I book an appointment?',
    answer: 'You can book online at https://www.mcvet.com.au/appointment or call our reception team on 07 4057 6033.',
    category: 'booking',
    keywords: ['book', 'appointment', 'consultation', 'schedule', 'see a vet', 'booking'],
  },
  {
    id: 3,
    question: 'What are your trading hours?',
    answer: 'Our trading hours are Monday to Friday 8am to 7pm, Saturday 8am to 3pm, and closed Sundays.',
    category: 'hours',
    keywords: ['hours', 'open', 'trading', 'opening time', 'weekend', 'saturday', 'sunday', 'when are you open'],
  },
  {
    id: 4,
    question: 'Where are you located?',
    answer: 'We are located at Cnr Aropa St and Captain Cook Highway, Trinity Beach QLD 4879.',
    category: 'location',
    keywords: ['located', 'address', 'where', 'find', 'direction', 'trinity beach', 'cairns', 'map'],
  },
  {
    id: 5,
    question: 'Do you offer an after hours emergency service?',
    answer: 'Yes, Marlin Coast Veterinary Hospital provides an after hours emergency service for existing situations. Please call 07 4057 6033 immediately.',
    category: 'emergency',
    keywords: ['emergency', 'after hours', 'urgent', 'sick', 'injured', 'bloat', 'poisoned', 'bleeding', 'hit by car', 'after-hours'],
  },
  {
    id: 6,
    question: 'What animals do you treat?',
    answer: 'We treat cats, dogs, pocket pets, and also reptiles, amphibians, and birds.',
    category: 'animals',
    keywords: ['animals', 'treat', 'species', 'pets', 'cats', 'dogs', 'reptiles', 'birds', 'amphibians', 'guinea pigs', 'rabbits'],
  },
  {
    id: 7,
    question: 'Who runs the clinic?',
    answer: 'Dr Steven Porep and Dr Ashleigh Porep lead this family owned and locally operated hospital serving the Cairns and Northern Beaches community.',
    category: 'team',
    keywords: ['runs', 'owner', 'who', 'vets', 'steven porep', 'ashleigh porep', 'family owned', 'doctor'],
  },
  {
    id: 8,
    question: 'Do you offer wellbeing services?',
    answer: 'Yes, we offer wellbeing services including behavioural advice, nutritional advice, and puppy pre school.',
    category: 'services',
    keywords: ['wellbeing', 'wellness', 'puppy school', 'behaviour', 'behavioral', 'nutrition', 'diet', 'puppy pre school'],
  },
  {
    id: 9,
    question: 'Do you provide microchipping?',
    answer: 'Yes, microchipping can be done during a routine consultation and is mandatory in certain cases under Queensland law, including pets under 12 weeks when local microchipping laws began, pets being sold or given away, and declared regulated or dangerous dogs.',
    category: 'services',
    keywords: ['microchip', 'microchipping', 'chip', 'law', 'queensland', 'qld law', 'mandatory'],
  },
  {
    id: 10,
    question: 'Do you offer nail clipping?',
    answer: 'Yes, we offer nail clipping for both cats and dogs, with frequency depending on the pet\'s lifestyle and breed. Our staff can also teach owners how to do it at home.',
    category: 'services',
    keywords: ['nail', 'nails', 'clipping', 'trim', 'trimming', 'claws', 'paws'],
  },
  {
    id: 11,
    question: 'What surgical services are available?',
    answer: 'We provide general, orthopaedic, and dental surgeries, plus soft tissue and ophthalmic procedures, covering both routine and emergency surgery.',
    category: 'services',
    keywords: ['surgical', 'surgery', 'orthopaedic', 'orthopedic', 'soft tissue', 'eye', 'ophthalmic', 'operation'],
  },
  {
    id: 12,
    question: 'What diagnostic services do you provide?',
    answer: 'We provide modern imaging and PennHIP radiographs to detect and manage health concerns early.',
    category: 'services',
    keywords: ['diagnostic', 'diagnostics', 'xray', 'x-ray', 'imaging', 'radiographs', 'pennhip', 'tests'],
  },
  {
    id: 13,
    question: 'Can I order pet medication or prescription food online?',
    answer: 'Yes, via https://www.mcvet.com.au/order-online, which covers medication requests and prescription food requests.',
    category: 'services',
    keywords: ['medication', 'prescription', 'food', 'order online', 'refill', 'diet', 'pharmacy'],
  },
  {
    id: 14,
    question: 'Do you accept pet insurance or payment plans?',
    answer: 'Our clinic displays GapOnly, Zip Pay, and VetPay as accepted payment options. Please contact the clinic directly on 07 4057 6033 for details on how each works.',
    category: 'payment',
    keywords: ['insurance', 'gaponly', 'zip pay', 'vetpay', 'payment plans', 'finance', 'pay', 'cost', 'prices', 'fees'],
  },
  {
    id: 15,
    question: 'Do you provide vaccinations?',
    answer: 'Yes, vaccination recommendations are customised to each pet based on health, lifestyle, and location in Far North Queensland, following Australian Veterinary Association guidelines.',
    category: 'services',
    keywords: ['vaccination', 'vaccinations', 'vaccine', 'shots', 'booster', 'ava guidelines'],
  },
  {
    id: 16,
    question: 'What happens during an annual health check?',
    answer: 'A thorough physical examination and health assessment is performed before any vaccination, combining visual and hands-on examination with discussion with the pet owner.',
    category: 'services',
    keywords: ['annual health check', 'checkup', 'check up', 'physical exam', 'routine exam'],
  },
  {
    id: 17,
    question: 'Are you approved for export health certificates?',
    answer: 'Yes, Marlin Coast Veterinary Hospital has AQIS approved veterinarians for export.',
    category: 'services',
    keywords: ['export', 'aqis', 'travel', 'international', 'overseas', 'certificate', 'customs'],
  },
  {
    id: 18,
    question: 'Can I contact the clinic by email?',
    answer: 'Yes, you can email us directly at admin@mcvet.com.au.',
    category: 'booking',
    keywords: ['email', 'contact email', 'write', 'admin@mcvet.com.au', 'message'],
  },
  {
    id: 19,
    question: 'Do you treat exotic pets like birds and reptiles?',
    answer: 'Yes, the clinic provides care and life cycle feeding advice for dogs, cats, birds, and reptiles.',
    category: 'animals',
    keywords: ['exotic', 'birds', 'reptiles', 'lizard', 'snake', 'feeding advice', 'amphibian'],
  },
  {
    id: 20,
    question: 'What happens if my pet\'s nails get too long?',
    answer: 'Overgrown nails can split, break, bleed, or curl painfully into the paw pad. The clinic recommends nails be inspected or trimmed at least monthly and offers appointments to check or clip them.',
    category: 'services',
    keywords: ['overgrown nails', 'long nails', 'split nail', 'bleed', 'paw pad', 'curl'],
  },
];

/**
 * Local fallback matching algorithm to ensure 100% reliable responses
 * whenever GEMINI API is offline or key is pending.
 */
export function findBestFAQMatch(query: string): { match: FAQItem | null; isEmergency: boolean; isPriceQuery: boolean } {
  const lower = query.toLowerCase().trim();

  // Check emergency keywords first
  const emergencyKeywords = ['emergency', 'after hours', 'hit by car', 'bleeding', 'poison', 'collapse', 'dying', 'unconscious', 'breathing difficulty', 'choking'];
  const isEmergency = emergencyKeywords.some(k => lower.includes(k));

  // Check price query keywords
  const priceKeywords = ['price', 'cost', 'fee', 'how much', 'quote', 'rates', 'pricing', 'charge'];
  const isPriceQuery = priceKeywords.some(k => lower.includes(k));

  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of FAQ_KNOWLEDGE_BASE) {
    let score = 0;
    const qLower = item.question.toLowerCase();
    const aLower = item.answer.toLowerCase();

    // Direct question title substring match
    if (qLower.includes(lower) || lower.includes(qLower)) {
      score += 10;
    }

    // Keyword matching
    for (const kw of item.keywords) {
      if (lower.includes(kw)) {
        score += 3;
      }
    }

    // Answer substring matches
    if (aLower.includes(lower)) {
      score += 2;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return {
    match: highestScore >= 3 ? bestMatch : null,
    isEmergency,
    isPriceQuery,
  };
}
