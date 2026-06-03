// BalSaathiAI Demo Data - Preloaded for Rural India Context

export const LANGUAGES = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
];

// Use curated royalty-free images from Unsplash Source for realistic portraits.
// These are fetched at runtime from the internet. If you prefer local copies,
// download images into `public/assets/` and update the URLs below.

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  hi: {
    // Hero
    heroTitle: 'हर बच्चा. सही समय.',
    heroSubtitle: 'भारत के हर बच्चे के लिए AI-संचालित प्रारंभिक विकासात्मक स्क्रीनिंग',
    heroDescription: 'आंगनवाड़ी कार्यकर्ताओं को विकासात्मक देरी की पहचान करने और परिवारों को समय पर देखभाल से जोड़ने में मदद करना।',
    explorePlatform: 'प्लेटफॉर्म देखें',
    watchDemo: 'डेमो देखें',

    // Navigation
    home: 'होम',
    platform: 'प्लेटफॉर्म',
    demo: 'डेमो',
    dashboard: 'डैशबोर्ड',
    impact: 'प्रभाव',
    contact: 'संपर्क',

    // Dashboard
    namaste: 'नमस्ते',
    welcomeBack: 'वापसी पर स्वागत है',
    syncStatus: 'सिंक स्थिति',
    synced: 'सिंक हो गया',
    pendingSync: 'सिंक बाकी',
    followUpsCompleted: 'इस महीने पूरे किए गए फॉलो-अप',
    screeningsPending: 'आज बाकी स्क्रीनिंग',
    followUpDue: 'फॉलो-अप बाकी',
    childrenFlagged: 'इस सप्ताह फ्लैग किए गए बच्चे',

    // Actions
    screenChild: 'बच्चे की स्क्रीनिंग करें',
    myFollowUps: 'मेरे फॉलो-अप',
    myChildren: 'मेरे बच्चे',
    villageReport: 'गांव की रिपोर्ट',

    // Screening
    selectAge: 'आयु चुनें',
    months: 'महीने',
    years: 'साल',
    speechLanguage: 'भाषण और भाषा',
    motorSkills: 'मोटर कौशल',
    socialEmotional: 'सामाजिक और भावनात्मक',
    cognitive: 'संज्ञानात्मक',
    yes: 'हाँ',
    no: 'नहीं',
    sometimes: 'कभी-कभी',

    // Results
    onTrack: 'सही राह पर',
    watch: 'निगरानी',
    referNow: 'अभी रेफर करें',
    notScreened: 'स्क्रीन नहीं हुआ',
    congratulations: 'बधाई हो! बच्चा सही राह पर है।',
    domainsChecked: 'जाँच किए गए क्षेत्र',
    nextScreening: 'अगली स्क्रीनिंग की तारीख',

    // Referral
    createReferral: 'रेफरल बनाएं',
    explainToParent: 'माता-पिता को समझाएं',
    sendWhatsApp: 'WhatsApp पर भेजें',
    printReferral: 'प्रिंट करें',

    // Activity
    daysAgo: 'दिन पहले',
    yesterday: 'कल',
    today: 'आज',

    // Training
    training: 'प्रशिक्षण',
    learnMore: 'और जानें',

    // Impact
    impactChildrenScreened: 'स्क्रीन किए गए बच्चे',
    impactChildrenFlagged: 'फ्लैग किए गए बच्चे',
    impactReferralsGenerated: 'बनाए गए रेफरल',
    impactFollowUpsCompleted: 'पूरे किए गए फॉलो-अप',
  },
  en: {
    // Hero
    heroTitle: 'Har Baccha. Sahi Samay.',
    heroSubtitle: 'AI-powered early developmental screening for every child in Bharat',
    heroDescription: 'Helping Anganwadi workers identify developmental delays early and connect families to timely care.',
    explorePlatform: 'Explore Platform',
    watchDemo: 'Watch Demo',

    // Navigation
    home: 'Home',
    platform: 'Platform',
    demo: 'Demo',
    dashboard: 'Dashboard',
    impact: 'Impact',
    contact: 'Contact',

    // Dashboard
    namaste: 'Namaste',
    welcomeBack: 'Welcome back',
    syncStatus: 'Sync Status',
    synced: 'Synced',
    pendingSync: 'Pending Sync',
    followUpsCompleted: 'follow-ups completed this month',
    screeningsPending: 'screenings pending today',
    followUpDue: 'follow-up due',
    childrenFlagged: 'children flagged this week',

    // Actions
    screenChild: 'Screen a Child',
    myFollowUps: 'My Follow-Ups',
    myChildren: 'My Children',
    villageReport: 'Village Report',

    // Screening
    selectAge: 'Select Age',
    months: 'months',
    years: 'years',
    speechLanguage: 'Speech & Language',
    motorSkills: 'Motor Skills',
    socialEmotional: 'Social & Emotional',
    cognitive: 'Cognitive',
    yes: 'Yes',
    no: 'No',
    sometimes: 'Sometimes',

    // Results
    onTrack: 'On Track',
    watch: 'Watch',
    referNow: 'Refer Now',
    notScreened: 'Not Screened',
    congratulations: 'Congratulations! The child is on track.',
    domainsChecked: 'Domains Checked',
    nextScreening: 'Next Screening Date',

    // Referral
    createReferral: 'Create Referral',
    explainToParent: 'Explain to Parent',
    sendWhatsApp: 'Send on WhatsApp',
    printReferral: 'Print',

    // Activity
    daysAgo: 'days ago',
    yesterday: 'Yesterday',
    today: 'Today',

    // Training
    training: 'Training',
    learnMore: 'Learn More',

    // Impact
    impactChildrenScreened: 'Children Screened',
    impactChildrenFlagged: 'Children Flagged',
    impactReferralsGenerated: 'Referrals Generated',
    impactFollowUpsCompleted: 'Follow-Ups Completed',
  },
};

// Worker Profile
export const DEMO_WORKER = {
  id: 'worker-001',
  name: 'Savitri Devi',
  nameHindi: 'सावित्री देवी',
  // vendored local portrait (run `npm run vendor-images` to download)
  avatar: '/assets/vendor/worker-1.jpg',
  centre: 'Anganwadi Centre 14',
  village: 'Rampur',
  district: 'Jharkhand',
  phone: '+91 98765 43210',
  joinDate: '2022-06-15',
  streak: 8,
  totalScreenings: 47,
  totalFlagged: 6,
  totalReferrals: 4,
  totalFollowUps: 2,
};

// Demo Children
export const DEMO_CHILDREN = [
  {
    id: 'child-001',
    name: 'Meena Kumari',
    nameHindi: 'मीना कुमारी',
    dob: '2024-05-15',
    age: 24,
    ageDisplay: '24 महीने',
    motherName: 'Rani Devi',
    motherNameHindi: 'रानी देवी',
    village: 'Rampur',
    centre: 'Anganwadi Centre 14',
    photo: '/assets/vendor/child-1.jpg',
    status: 'refer',
    statusHindi: 'अभी रेफर करें',
    flaggedDomain: 'Speech & Language',
    lastScreened: '2026-05-25',
    referralDate: '2026-05-26',
    daysSinceReferral: 3,
  },
  {
    id: 'child-002',
    name: 'Arjun Kumar',
    nameHindi: 'अर्जुन कुमार',
    dob: '2024-11-20',
    age: 18,
    ageDisplay: '18 महीने',
    motherName: 'Sunita Devi',
    motherNameHindi: 'सुनीता देवी',
    village: 'Rampur',
    centre: 'Anganwadi Centre 14',
    photo: '/assets/vendor/child-2.jpg',
    status: 'on-track',
    statusHindi: 'सही राह पर',
    flaggedDomain: null,
    lastScreened: '2026-05-20',
    nextScreening: '2026-08-20',
  },
  {
    id: 'child-003',
    name: 'Kavya Sharma',
    nameHindi: 'काव्या शर्मा',
    dob: '2023-11-10',
    age: 30,
    ageDisplay: '30 महीने',
    motherName: 'Priya Sharma',
    motherNameHindi: 'प्रिया शर्मा',
    village: 'Rampur',
    centre: 'Anganwadi Centre 14',
    photo: '/assets/vendor/child-3.jpg',
    status: 'watch',
    statusHindi: 'निगरानी',
    flaggedDomain: 'Motor Skills',
    lastScreened: '2026-05-28',
    nextScreening: '2026-06-28',
  },
  {
    id: 'child-004',
    name: 'Ramu Gupta',
    nameHindi: 'रामू गुप्ता',
    dob: '2025-05-29',
    age: 12,
    ageDisplay: '12 महीने',
    motherName: 'Lakshmi Devi',
    motherNameHindi: 'लक्ष्मी देवी',
    village: 'Rampur',
    centre: 'Anganwadi Centre 14',
    photo: '/assets/vendor/child-4.jpg',
    status: 'not-screened',
    statusHindi: 'स्क्रीन नहीं हुआ',
    flaggedDomain: null,
    lastScreened: null,
  },
];

export const formatChildAge = (months: number, isHindi: boolean) => {
  const unit = isHindi ? (months === 1 ? 'महीना' : 'महीने') : (months === 1 ? 'month' : 'months');
  return `${months} ${unit}`;
};

// Referral Centres
export const REFERRAL_CENTRES = [
  {
    id: 'centre-001',
    name: 'Rampur Primary Health Centre',
    nameHindi: 'रामपुर प्राथमिक स्वास्थ्य केंद्र',
    type: 'PHC',
    distance: '3.2 km',
    phone: '+91 67890 12345',
    timings: 'Mon-Sat, 9 AM - 5 PM',
    landmark: 'Near Rampur Bus Stand, opposite the post office',
    landmarkHindi: 'रामपुर बस स्टैंड के पास, डाकघर के सामने',
  },
  {
    id: 'centre-002',
    name: 'District Hospital Hazaribagh',
    nameHindi: 'जिला अस्पताल हजारीबाग',
    type: 'District Hospital',
    distance: '22 km',
    phone: '+91 23456 78901',
    timings: '24 Hours Emergency',
    landmark: 'Main Road, near the railway station, blue building',
    landmarkHindi: 'मेन रोड, रेलवे स्टेशन के पास, नीली इमारत',
  },
  {
    id: 'centre-003',
    name: 'Child Development Centre Ranchi',
    nameHindi: 'बाल विकास केंद्र रांची',
    type: 'CDC',
    distance: '45 km',
    phone: '+91 34567 89012',
    timings: 'Mon-Fri, 10 AM - 4 PM',
    landmark: 'Near Kanke Road, opposite Children\'s Park',
    landmarkHindi: 'कांके रोड के पास, चिल्ड्रन पार्क के सामने',
  },
];

// Screening Questions (Simplified for demo)
export const SCREENING_QUESTIONS: Record<string, Record<string, Array<{
  id: string;
  ageRange: string;
  question: string;
  questionHindi: string;
  domain: string;
  milestone: string;
  milestoneHindi: string;
  illustration: string;
}>>> = {
  speech: {
    '18-24': [
      {
        id: 'speech-1',
        ageRange: '18-24',
        question: 'Can the child say at least 10-15 meaningful words?',
        questionHindi: 'क्या बच्चा कम से कम 10-15 सार्थक शब्द बोल सकता है?',
        domain: 'speech',
        milestone: 'Says 10-15 words',
        milestoneHindi: '10-15 शब्द बोलता है',
        illustration: 'speech',
      },
      {
        id: 'speech-2',
        ageRange: '18-24',
        question: 'Does the child follow simple instructions like "come here" or "give me"?',
        questionHindi: 'क्या बच्चा आदेशों का पालन करता है जैसे "यहाँ आओ" या "दे दो"?',
        domain: 'speech',
        milestone: 'Follows simple instructions',
        milestoneHindi: 'आदेशों का पालन करता है',
        illustration: 'speech',
      },
    ],
  },
  motor: {
    '18-24': [
      {
        id: 'motor-1',
        ageRange: '18-24',
        question: 'Can the child walk without support?',
        questionHindi: 'क्या बच्चा बिना सहारे चल सकता है?',
        domain: 'motor',
        milestone: 'Walks independently',
        milestoneHindi: 'स्वतंत्र रूप से चलता है',
        illustration: 'motor',
      },
      {
        id: 'motor-2',
        ageRange: '18-24',
        question: 'Can the child stack 2-3 blocks on top of each other?',
        questionHindi: 'क्या बच्चा 2-3 ब्लॉक को एक के ऊपर एक रख सकता है?',
        domain: 'motor',
        milestone: 'Stacks blocks',
        milestoneHindi: 'ब्लॉक रखता है',
        illustration: 'motor',
      },
    ],
  },
  social: {
    '18-24': [
      {
        id: 'social-1',
        ageRange: '18-24',
        question: 'Does the child show interest in other children?',
        questionHindi: 'क्या बच्चा अन्य बच्चों में रुचि दिखाता है?',
        domain: 'social',
        milestone: 'Shows interest in peers',
        milestoneHindi: 'साथियों में रुचि दिखाता है',
        illustration: 'social',
      },
      {
        id: 'social-2',
        ageRange: '18-24',
        question: 'Does the child respond to their name when called?',
        questionHindi: 'क्या बच्चा अपने नाम के पुकारने पर प्रतिक्रिया करता है?',
        domain: 'social',
        milestone: 'Responds to name',
        milestoneHindi: 'नाम पर प्रतिक्रिया करता है',
        illustration: 'social',
      },
    ],
  },
  cognitive: {
    '18-24': [
      {
        id: 'cognitive-1',
        ageRange: '18-24',
        question: 'Can the child point to show you something they want?',
        questionHindi: 'क्या बच्चा उंगली से इशारा करके अपनी इच्छा बता सकता है?',
        domain: 'cognitive',
        milestone: 'Points to indicate wants',
        milestoneHindi: 'इच्छा बताने के लिए इशारा करता है',
        illustration: 'cognitive',
      },
      {
        id: 'cognitive-2',
        ageRange: '18-24',
        question: 'Can the child find an object when you hide it under a cloth?',
        questionHindi: 'क्या बच्चा वस्तु को कपड़े के नीचे छिपाने पर खोज सकता है?',
        domain: 'cognitive',
        milestone: 'Finds hidden objects',
        milestoneHindi: 'छिपी हुई वस्तुएं खोजता है',
        illustration: 'cognitive',
      },
    ],
  },
};

// Follow-up Questions
export const FOLLOW_UP_QUESTIONS: Record<string, Array<{
  id: string;
  question: string;
  questionHindi: string;
  insight: string;
  insightHindi: string;
}>> = {
  speech: [
    {
      id: 'follow-speech-1',
      question: 'Does the child understand what you say even if they don\'t speak?',
      questionHindi: 'क्या बच्चा समझता है आप क्या कह रहे हैं, भले ही बोल न सके?',
      insight: 'This helps understand if hearing and understanding are developing.',
      insightHindi: 'इससे पता चलता है कि सुनना और समझना सही हो रहा है।',
    },
    {
      id: 'follow-speech-2',
      question: 'Does the child make sounds like "ma", "ba", "da"?',
      questionHindi: 'क्या बच्चा "मा", "बा", "दा" जैसी आवाजें निकालता है?',
      insight: 'Babbling is an important step before words.',
      insightHindi: 'शब्दों से पहले बड़बड़ाना एक महत्वपूर्ण कदम है।',
    },
  ],
  motor: [
    {
      id: 'follow-motor-1',
      question: 'Can the child hold small objects with their fingers?',
      questionHindi: 'क्या बच्चा छोटी वस्तुओं को उंगलियों से पकड़ सकता है?',
      insight: 'Fine motor skills are important for daily activities.',
      insightHindi: 'छोटी मोटर कौशल दैनिक गतिविधियों के लिए महत्वपूर्ण हैं।',
    },
  ],
  social: [
    {
      id: 'follow-social-1',
      question: 'Does the child look at you when you talk to them?',
      questionHindi: 'क्या बच्चा आपके साथ बात करते समय आपको देखता है?',
      insight: 'Eye contact is important for social development.',
      insightHindi: 'आंखों का संपर्क सामाजिक विकास के लिए महत्वपूर्य है।',
    },
  ],
  cognitive: [
    {
      id: 'follow-cognitive-1',
      question: 'Does the child recognize familiar people like mother, father?',
      questionHindi: 'क्या बच्चा मां, पिता जैसे परिचित लोगों को पहचानता है?',
      insight: 'Recognizing familiar faces is a key cognitive milestone.',
      insightHindi: 'परिचित चेहरों को पहचानना एक महत्वपूर्ण संज्ञानात्मक सीमा है।',
    },
  ],
};

// Training Modules
export const TRAINING_MODULES = [
  {
    id: 'training-1',
    title: 'Asking Screening Questions',
    titleHindi: 'स्क्रीनिंग प्रश्न पूछना',
    description: 'Learn how to ask developmental questions in a friendly, non-judgmental way.',
    descriptionHindi: 'दोस्ताना और गैर-निर्णायक तरीके से विकासात्मक प्रश्न पूछना सीखें।',
    duration: '3 min',
    icon: 'message-circle',
    completed: true,
  },
  {
    id: 'training-2',
    title: 'Explaining Referrals',
    titleHindi: 'रेफरल समझाना',
    description: 'How to explain the need for specialist visits to parents.',
    descriptionHindi: 'माता-पिता को विशेषज्ञ से मिलने की आवश्यकता कैसे समझाएं।',
    duration: '4 min',
    icon: 'share-2',
    completed: false,
  },
  {
    id: 'training-3',
    title: 'Handling Distressed Parents',
    titleHindi: 'परेशान माता-पिता को संभालना',
    description: 'Techniques for supporting parents who may be worried or upset.',
    descriptionHindi: 'चिंतित या परेशान माता-पिता का समर्थन करने की तकनीकें।',
    duration: '5 min',
    icon: 'heart',
    completed: false,
  },
];

// Impact Statistics
export const IMPACT_STATS = {
  childrenScreened: 0,
  childrenFlagged: 0,
  referralsGenerated: 0,
  followUpsCompleted: 0,
  districts: 0,
  anganwadiWorkers: 0,
  accuracyRate: 0,
  parentSatisfaction: 0,
};

// Activity Timeline
export const ACTIVITY_TIMELINE = [
  {
    id: 'activity-1',
    childId: 'child-001',
    childName: 'Meena',
    childNameHindi: 'मीना',
    action: 'refer',
    actionHindi: 'रेफर करें',
    timestamp: '2 days ago',
    timestampHindi: '2 दिन पहले',
  },
  {
    id: 'activity-2',
    childId: 'child-003',
    childName: 'Kavya',
    childNameHindi: 'काव्या',
    action: 'watch',
    actionHindi: 'निगरानी',
    timestamp: 'Yesterday',
    timestampHindi: 'कल',
  },
  {
    id: 'activity-3',
    childId: 'child-002',
    childName: 'Arjun',
    childNameHindi: 'अर्जुन',
    action: 'on-track',
    actionHindi: 'सही राह पर',
    timestamp: '3 weeks ago',
    timestampHindi: '3 सप्ताह पहले',
  },
];

// Parent explainer steps
export const PARENT_EXPLAINER_STEPS = [
  {
    id: 'step-1',
    title: 'What is screening?',
    titleHindi: 'स्क्रीनिंग क्या है?',
    description: 'We check if your child is growing and learning like other children their age.',
    descriptionHindi: 'हम जांचते हैं कि आपका बच्चा अपनी उम्र के अन्य बच्चों की तरह बढ़ रहा है और सीख रहा है।',
    illustration: 'screening',
  },
  {
    id: 'step-2',
    title: 'Why early help matters',
    titleHindi: 'जल्दी मदद क्यों महत्वपूर्ण है',
    description: 'When we find delays early, simple activities and care can help a lot.',
    descriptionHindi: 'जब हमें देरी जल्दी मिलती है, तो आसान गतिविधियां और देखभाल बहुत मदद कर सकती हैं।',
    illustration: 'early-help',
  },
  {
    id: 'step-3',
    title: 'What is a referral centre?',
    titleHindi: 'रेफरल केंद्र क्या है?',
    description: 'Doctors and specialists at these centres can check your child more thoroughly.',
    descriptionHindi: 'इन केंद्रों पर डॉक्टर और विशेषज्ञ आपके बच्चे की अधिक गहराई से जांच कर सकते हैं।',
    illustration: 'referral-centre',
  },
  {
    id: 'step-4',
    title: 'You are the most important',
    titleHindi: 'आप सबसे महत्वपूर्ण हैं',
    description: 'Your love, care, and time with your child makes the biggest difference.',
    descriptionHindi: 'आपका प्यार, देखभाल और बच्चे के साथ समय सबसे बड़ा अंतर लाता है।',
    illustration: 'parent-love',
  },
];
