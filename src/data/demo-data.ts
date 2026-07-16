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
        id: 'speech_q1',
        ageRange: '18-24',
        question: 'Does child respond when called by name?',
        questionHindi: 'क्या बच्चा अपने नाम से बुलाए जाने पर प्रतिक्रिया देता है?',
        domain: 'speech',
        milestone: 'Responds to name',
        milestoneHindi: 'नाम पर प्रतिक्रिया करता है',
        illustration: 'speech',
      },
      {
        id: 'speech_q2',
        ageRange: '18-24',
        question: 'Can child communicate basic needs using words or gestures?',
        questionHindi: 'क्या बच्चा शब्दों या इशारों का उपयोग करके बुनियादी जरूरतों का संचार कर सकता है?',
        domain: 'speech',
        milestone: 'Communicates needs',
        milestoneHindi: 'जरूरतों का संचार करता है',
        illustration: 'speech',
      },
    ],
    '24-36': [
      {
        id: 'speech_q1',
        ageRange: '24-36',
        question: 'Does child respond when called by name?',
        questionHindi: 'क्या बच्चा अपने नाम से बुलाए जाने पर प्रतिक्रिया देता है?',
        domain: 'speech',
        milestone: 'Responds to name',
        milestoneHindi: 'नाम पर प्रतिक्रिया करता है',
        illustration: 'speech',
      },
      {
        id: 'speech_q2',
        ageRange: '24-36',
        question: 'Can child communicate basic needs using words or gestures?',
        questionHindi: 'क्या बच्चा शब्दों या इशारों का उपयोग करके बुनियादी जरूरतों का संचार कर सकता है?',
        domain: 'speech',
        milestone: 'Communicates needs',
        milestoneHindi: 'जरूरतों का संचार करता है',
        illustration: 'speech',
      },
    ],
  },
  motor: {
    '18-24': [
      {
        id: 'motor_q1',
        ageRange: '18-24',
        question: 'Can child walk without support?',
        questionHindi: 'क्या बच्चा बिना सहारे चल सकता है?',
        domain: 'motor',
        milestone: 'Walks independently',
        milestoneHindi: 'स्वतंत्र रूप से चलता है',
        illustration: 'motor',
      },
      {
        id: 'motor_q2',
        ageRange: '18-24',
        question: 'Can child climb stairs or furniture independently?',
        questionHindi: 'क्या बच्चा स्वतंत्र रूप से सीढ़ियों या फर्नीचर पर चढ़ सकता है?',
        domain: 'motor',
        milestone: 'Climbs independently',
        milestoneHindi: 'स्वतंत्र रूप से चढ़ता है',
        illustration: 'motor',
      },
    ],
    '24-36': [
      {
        id: 'motor_q1',
        ageRange: '24-36',
        question: 'Can child walk without support?',
        questionHindi: 'क्या बच्चा बिना सहारे चल सकता है?',
        domain: 'motor',
        milestone: 'Walks independently',
        milestoneHindi: 'स्वतंत्र रूप से चलता है',
        illustration: 'motor',
      },
      {
        id: 'motor_q2',
        ageRange: '24-36',
        question: 'Can child climb stairs or furniture independently?',
        questionHindi: 'क्या बच्चा स्वतंत्र रूप से सीढ़ियों या फर्नीचर पर चढ़ सकता है?',
        domain: 'motor',
        milestone: 'Climbs independently',
        milestoneHindi: 'स्वतंत्र रूप से चढ़ता है',
        illustration: 'motor',
      },
    ],
  },
  social: {
    '18-24': [
      {
        id: 'social_q1',
        ageRange: '18-24',
        question: 'Does child make eye contact during interaction?',
        questionHindi: 'क्या बच्चा बातचीत के दौरान आंखों से संपर्क बनाता है?',
        domain: 'social',
        milestone: 'Makes eye contact',
        milestoneHindi: 'आंखों से संपर्क बनाता है',
        illustration: 'social',
      },
      {
        id: 'social_q2',
        ageRange: '18-24',
        question: 'Does child engage in play with caregivers or peers?',
        questionHindi: 'क्या बच्चा देखभाल करने वालों या साथियों के साथ खेल में संलग्न होता है?',
        domain: 'social',
        milestone: 'Engages in play',
        milestoneHindi: 'खेल में संलग्न होता है',
        illustration: 'social',
      },
    ],
    '24-36': [
      {
        id: 'social_q1',
        ageRange: '24-36',
        question: 'Does child make eye contact during interaction?',
        questionHindi: 'क्या बच्चा बातचीत के दौरान आंखों से संपर्क बनाता है?',
        domain: 'social',
        milestone: 'Makes eye contact',
        milestoneHindi: 'आंखों से संपर्क बनाता है',
        illustration: 'social',
      },
      {
        id: 'social_q2',
        ageRange: '24-36',
        question: 'Does child engage in play with caregivers or peers?',
        questionHindi: 'क्या बच्चा देखभाल करने वालों या साथियों के साथ खेल में संलग्न होता है?',
        domain: 'social',
        milestone: 'Engages in play',
        milestoneHindi: 'खेल में संलग्न होता है',
        illustration: 'social',
      },
    ],
  },
  cognitive: {
    '18-24': [
      {
        id: 'cognitive_q1',
        ageRange: '18-24',
        question: 'Can child identify familiar people or objects?',
        questionHindi: 'क्या बच्चा परिचित लोगों या वस्तुओं की पहचान कर सकता है?',
        domain: 'cognitive',
        milestone: 'Identifies familiar things',
        milestoneHindi: 'परिचित चीजों की पहचान करता है',
        illustration: 'cognitive',
      },
      {
        id: 'cognitive_q2',
        ageRange: '18-24',
        question: 'Can child follow age-appropriate instructions?',
        questionHindi: 'क्या बच्चा उम्र के अनुसार निर्देशों का पालन कर सकता है?',
        domain: 'cognitive',
        milestone: 'Follows instructions',
        milestoneHindi: 'निर्देशों का पालन करता है',
        illustration: 'cognitive',
      },
    ],
    '24-36': [
      {
        id: 'cognitive_q1',
        ageRange: '24-36',
        question: 'Can child identify familiar people or objects?',
        questionHindi: 'क्या बच्चा परिचित लोगों या वस्तुओं की पहचान कर सकता है?',
        domain: 'cognitive',
        milestone: 'Identifies familiar things',
        milestoneHindi: 'परिचित चीजों की पहचान करता है',
        illustration: 'cognitive',
      },
      {
        id: 'cognitive_q2',
        ageRange: '24-36',
        question: 'Can child follow age-appropriate instructions?',
        questionHindi: 'क्या बच्चा उम्र के अनुसार निर्देशों का पालन कर सकता है?',
        domain: 'cognitive',
        milestone: 'Follows instructions',
        milestoneHindi: 'निर्देशों का पालन करता है',
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
      id: 'speech_followup_q1',
      question: 'If not, does child react to familiar voices?',
      questionHindi: 'यदि नहीं, तो क्या बच्चा परिचित आवाजों पर प्रतिक्रिया करता है?',
      insight: 'This helps understand if hearing and understanding are developing.',
      insightHindi: 'इससे पता चलता है कि सुनना और समझना सही हो रहा है।',
    },
    {
      id: 'speech_followup_q2',
      question: 'If not, does child attempt communication through sounds or pointing?',
      questionHindi: 'यदि नहीं, तो क्या बच्चा ध्वनियों या इशारों के माध्यम से संचार का प्रयास करता है?',
      insight: 'Babbling is an important step before words.',
      insightHindi: 'शब्दों से पहले बड़बड़ाना एक महत्वपूर्ण कदम है।',
    },
  ],
  motor: [
    {
      id: 'motor_followup_q1',
      question: 'If not, can child stand while holding furniture?',
      questionHindi: 'यदि नहीं, तो क्या बच्चा फर्नीचर पकड़कर खड़ा हो सकता है?',
      insight: 'Fine motor skills are important for daily activities.',
      insightHindi: 'छोटी मोटर कौशल दैनिक गतिविधियों के लिए महत्वपूर्ण हैं।',
    },
    {
      id: 'motor_followup_q2',
      question: 'If not, can child move independently between locations?',
      questionHindi: 'यदि नहीं, तो क्या बच्चा स्थानों के बीच स्वतंत्र रूप से जा सकता है?',
      insight: 'Gross motor skills are important for mobility.',
      insightHindi: 'सकल मोटर कौशल गतिशीलता के लिए महत्वपूर्ण हैं।',
    },
  ],
  social: [
    {
      id: 'social_followup_q1',
      question: 'If not, does child respond to smiling faces?',
      questionHindi: 'यदि नहीं, तो क्या बच्चा मुस्कुराते चेहरों पर प्रतिक्रिया करता है?',
      insight: 'Eye contact is important for social development.',
      insightHindi: 'आंखों का संपर्क सामाजिक विकास के लिए महत्वपूर्य है।',
    },
    {
      id: 'social_followup_q2',
      question: 'If not, does child show interest when others are playing nearby?',
      questionHindi: 'यदि नहीं, तो क्या बच्चा दूसरों के पास खेलने पर रुचि दिखाता है?',
      insight: 'Social interaction is key for development.',
      insightHindi: 'सामाजिक संपर्क विकास के लिए महत्वपूर्ण है।',
    },
  ],
  cognitive: [
    {
      id: 'cognitive_followup_q1',
      question: 'If not, can child recognize their primary caregiver?',
      questionHindi: 'यदि नहीं, तो क्या बच्चा अपने प्राथमिक देखभालकर्ता को पहचान सकता है?',
      insight: 'Recognizing familiar faces is a key cognitive milestone.',
      insightHindi: 'परिचित चेहरों को पहचानना एक महत्वपूर्ण संज्ञानात्मक सीमा है।',
    },
    {
      id: 'cognitive_followup_q2',
      question: 'If not, can child follow simple one-step commands?',
      questionHindi: 'यदि नहीं, तो क्या बच्चा सरल एक-चरणीय आदेशों का पालन कर सकता है?',
      insight: 'Following instructions is a key cognitive milestone.',
      insightHindi: 'निर्देशों का पालन करना एक महत्वपूर्ण संज्ञानात्मक सीमा है।',
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
