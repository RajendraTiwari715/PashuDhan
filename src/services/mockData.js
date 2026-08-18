

export const INITIAL_ANIMALS = [
{
  id: 'ANM-1001',
  tagId: 'TAG-1001',
  category: 'Gay',
  breed: 'साहीवाल (Sahiwal)',
  color: 'हल्का लाल / भूरा (Light Reddish Brown)',
  gender: 'Female',
  ageYears: 4,
  healthStatus: 'Healthy',
  owner: {
    name: 'रमेश कुमार पटेल (Ramesh Kumar Patel)',
    aadhaarNumber: '4521-8890-1204',
    phone: '98261 45210',
    villageOrCity: 'ग्राम फंदा, भोपाल (Fanda Village, Bhopal)',
    fullAddress: 'मकान नं. 45, मुख्य मार्ग, ग्राम फंदा, जिला भोपाल, म.प्र. 462030',
    isAadhaarVerified: true,
    isMobileOtpVerified: true,
    aadhaarOcrData: {
      scannedName: 'Ramesh Kumar Patel',
      dob: '14/05/1982',
      gender: 'MALE',
      verifiedAt: '2025-11-14 10:30 AM'
    }
  },
  fourPhotos: {
    front: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
    side: 'https://images.unsplash.com/photo-1570042707222-67803328e3b5?auto=format&fit=crop&w=800&q=80',
    back: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    earTagCloseUp: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80'
  },
  photos: [
  'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1570042707222-67803328e3b5?auto=format&fit=crop&w=800&q=80'],

  location: {
    lat: 23.2599,
    lng: 77.4126,
    addressName: 'ग्राम फंदा, सीहोर रोड',
    city: 'भोपाल (Bhopal)',
    state: 'मध्य प्रदेश',
    pincode: '462030'
  },
  geoFence: {
    centerLat: 23.2599,
    centerLng: 77.4126,
    radiusMeters: 500,
    homeAddress: 'डेयरी फ़ार्म फंदा, भोपाल',
    isOutsideFence: false,
    lastCheckedDistanceMeters: 80
  },
  priorViolationsCount: 0,
  activeNotices: [],
  registeredDate: '2025-11-14',
  isRegistered: true
},
{
  id: 'ANM-1002',
  tagId: 'TAG-1002',
  category: 'Gay',
  breed: 'गिर (Gir Breed)',
  color: 'चितकबरा लाल-सफेद (Red Spotted White)',
  gender: 'Female',
  ageYears: 5,
  healthStatus: 'Vaccinated',
  owner: {
    name: 'शिवम सिंह (Shivam Singh)',
    aadhaarNumber: '7712-4401-9982',
    phone: '94250 88123',
    villageOrCity: 'होशंगाबाद (Hoshangabad)',
    fullAddress: 'वार्ड नं. 12, नर्मदा रोड, होशंगाबाद, म.प्र. 461001',
    isAadhaarVerified: true,
    isMobileOtpVerified: true,
    aadhaarOcrData: {
      scannedName: 'Shivam Singh',
      dob: '02/11/1990',
      gender: 'MALE',
      verifiedAt: '2025-12-01 11:15 AM'
    }
  },
  fourPhotos: {
    front: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    side: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
    back: 'https://images.unsplash.com/photo-1570042707222-67803328e3b5?auto=format&fit=crop&w=800&q=80',
    earTagCloseUp: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80'
  },
  photos: [
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80'],

  location: {
    lat: 22.7533,
    lng: 77.7289,
    addressName: 'नर्मदा मार्ग, वार्ड 12',
    city: 'होशंगाबाद',
    state: 'मध्य प्रदेश',
    pincode: '461001'
  },
  geoFence: {
    centerLat: 22.7533,
    centerLng: 77.7289,
    radiusMeters: 500,
    homeAddress: 'नर्मदा फ़ार्महाउस, होशंगाबाद',
    isOutsideFence: true,
    lastCheckedDistanceMeters: 1400
  },
  priorViolationsCount: 1,
  activeNotices: [
  {
    id: 'NTC-8801',
    animalId: 'ANM-1002',
    animalTagId: 'TAG-1002',
    offenseLevel: 1,
    priorViolations: 0,
    issuedAt: '2026-08-10 04:30 PM',
    resolveByTimeHours: 48,
    noticeType: 'Warning_Notice',
    status: 'Active_Warning',
    photoEvidence: ['https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80'],
    gpsEvidence: {
      lat: 22.7650,
      lng: 77.7400,
      addressName: 'राष्ट्रीय राजमार्ग 69 (Highway NH-69 Hoshangabad)',
      city: 'होशंगाबाद',
      state: 'मध्य प्रदेश',
      pincode: '461001'
    }
  }],

  registeredDate: '2025-12-01',
  isRegistered: true
},
{
  id: 'ANM-1003',
  tagId: 'TAG-1003',
  category: 'Bhais',
  breed: 'मुर्रा नस्ल (Murrah)',
  color: 'गहरा काला (Deep Black)',
  gender: 'Female',
  ageYears: 6,
  healthStatus: 'Healthy',
  owner: {
    name: 'सुरेश यादव (Suresh Yadav)',
    aadhaarNumber: '9912-3341-2210',
    phone: '98930 77112',
    villageOrCity: 'रायसेन (Raisen)',
    fullAddress: 'यादव मोहल्ला, ग्राम सांची, रायसेन, म.प्र. 464551',
    isAadhaarVerified: true,
    isMobileOtpVerified: true
  },
  fourPhotos: {
    front: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80',
    side: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    back: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
    earTagCloseUp: 'https://images.unsplash.com/photo-1570042707222-67803328e3b5?auto=format&fit=crop&w=800&q=80'
  },
  photos: [
  'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80'],

  location: {
    lat: 23.332,
    lng: 77.799,
    addressName: 'ग्राम सांची तिराहा',
    city: 'रायसेन',
    state: 'मध्य प्रदेश',
    pincode: '464551'
  },
  geoFence: {
    centerLat: 23.332,
    centerLng: 77.799,
    radiusMeters: 500,
    homeAddress: 'सांची डेरी यार्ड, रायसेन',
    isOutsideFence: false,
    lastCheckedDistanceMeters: 45
  },
  priorViolationsCount: 0,
  activeNotices: [],
  registeredDate: '2026-01-10',
  isRegistered: true
},
{
  id: 'ANM-1004',
  tagId: 'TAG-1004',
  category: 'Bail',
  breed: 'हरियाणवी (Haryanvi)',
  color: 'सफेद (White)',
  gender: 'Male',
  ageYears: 3,
  healthStatus: 'Needs Treatment',
  owner: {
    name: 'विक्रम वर्मा (Vikram Verma)',
    aadhaarNumber: '5543-2219-0012',
    phone: '91790 33441',
    villageOrCity: 'विदिशा (Vidisha)',
    fullAddress: 'कृषि उपज मंडी रोड, विदिशा, म.प्र. 464001',
    isAadhaarVerified: true,
    isMobileOtpVerified: true
  },
  fourPhotos: {
    front: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
    side: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80',
    back: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    earTagCloseUp: 'https://images.unsplash.com/photo-1570042707222-67803328e3b5?auto=format&fit=crop&w=800&q=80'
  },
  photos: [
  'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'],

  location: {
    lat: 23.5251,
    lng: 77.8081,
    addressName: 'मंडी परिसर, विदिशा',
    city: 'विदिशा',
    state: 'मध्य प्रदेश',
    pincode: '464001'
  },
  geoFence: {
    centerLat: 23.5251,
    centerLng: 77.8081,
    radiusMeters: 500,
    homeAddress: 'विदिशा मंडी',
    isOutsideFence: true,
    lastCheckedDistanceMeters: 2100
  },
  priorViolationsCount: 2,
  activeNotices: [
  {
    id: 'NTC-9902',
    animalId: 'ANM-1004',
    animalTagId: 'TAG-1004',
    offenseLevel: 3,
    priorViolations: 2,
    issuedAt: '2026-08-11 08:00 AM',
    resolveByTimeHours: 48,
    noticeType: 'Seizure_Custody_Order',
    status: 'Custody_Transferred',
    photoEvidence: ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'],
    gpsEvidence: {
      lat: 23.5300,
      lng: 77.8100,
      addressName: 'विदिशा चौराहा मुख्य मार्ग',
      city: 'विदिशा',
      state: 'मध्य प्रदेश',
      pincode: '464001'
    }
  }],

  gaushalaRecord: {
    intakeId: 'GSH-7712',
    animalId: 'ANM-1004',
    animalTagId: 'TAG-1004',
    gaushalaName: 'श्री गोपाल गोशाला एवं जीव रक्षा केंद्र, भोपाल',
    gaushalaOfficer: 'महंत रामदास (प्रबंधक)',
    gaushalaPhone: '+91 94250 11890',
    transportVehicleNo: 'MP-04-GAU-9012',
    intakeDate: '2026-08-11',
    quarantineDaysTotal: 30,
    quarantineDaysRemaining: 29,
    custodyStatus: 'Gaushala Custody',
    dailyFeedDetails: [
    { date: '2026-08-11', feedType: 'हरा चारा (Green Fodder) + भूसा', quantityKg: 15 }],

    healthLogs: [
    { date: '2026-08-11', doctorName: 'डॉ. आर.के. शर्मा (पशु चिकित्सक)', diagnosis: 'पैर में हल्की चोट, ड्रेसिंग एवं पेनकिलर सिरप दिया गया।' }]

  },
  registeredDate: '2026-02-05',
  isRegistered: true
}];


export const INITIAL_BLANK_TAGS = [
{ tagId: 'TAG-8821', isLinked: false, generatedDate: '2026-08-01' },
{ tagId: 'TAG-9402', isLinked: false, generatedDate: '2026-08-05' },
{ tagId: 'TAG-3110', isLinked: false, generatedDate: '2026-08-08' },
{ tagId: 'TAG-5001', isLinked: false, generatedDate: '2026-08-10' }];


export const REGIONAL_PASU_VIBHAG = [
{
  name: 'जिला पशु चिकित्सालय एवं पशु कल्याण केंद्र, भोपाल',
  district: 'भोपाल (Bhopal)',
  officerInCharge: 'डॉ. आर. के. शर्मा (उप संचालक, पशु चिकित्सा)',
  phone: '0755-2554100 / +91 98260 11223',
  distanceKm: 1.8,
  type: 'PasuVibhag'
},
{
  name: 'पशु संरक्षण एवं चिकित्सा अधिकारी कार्यालय, इंदौर',
  district: 'इंदौर (Indore)',
  officerInCharge: 'डॉ. ए. के. वर्मा (मुख्य पशु चिकित्सा अधिकारी)',
  phone: '0731-2441990 / +91 98270 44556',
  distanceKm: 3.2,
  type: 'PasuVibhag'
},
{
  name: 'पशु धन विकास केंद्र, जबलपुर',
  district: 'जबलपुर (Jabalpur)',
  officerInCharge: 'डॉ. एस. पी. मिश्रा',
  phone: '0761-2623340 / +91 94251 77889',
  distanceKm: 2.4,
  type: 'PasuVibhag'
}];


export const REGIONAL_POLICE_STATIONS = [
{
  name: 'एम.पी. नगर थाना (नियंत्रण कक्ष - पशु स्क्वाड)',
  district: 'भोपाल',
  officerInCharge: 'थाना प्रभारी निरीक्षक अजय सिंह',
  phone: '112 / 0755-2555555',
  distanceKm: 2.1,
  type: 'PoliceStation'
},
{
  name: 'एम.जी. रोड थाना (यातायात एवं पशु गश्त टीम)',
  district: 'इंदौर',
  officerInCharge: 'थाना प्रभारी राजीव चतुर्वेदी',
  phone: '112 / 0731-2551100',
  distanceKm: 2.9,
  type: 'PoliceStation'
}];


export const REGIONAL_GAUSHALAS = [
{
  name: 'श्री गोपाल गोशाला एवं जीव रक्षा केंद्र, भोपाल',
  district: 'भोपाल',
  officerInCharge: 'महंत रामदास (प्रबंधक)',
  phone: '+91 94250 11890',
  distanceKm: 4.5,
  type: 'Gaushala'
},
{
  name: 'आनंद धाम कामधेनु गोशाला, होशंगाबाद रोड',
  district: 'भोपाल',
  officerInCharge: 'सुरेश सोनी',
  phone: '+91 98263 77800',
  distanceKm: 6.1,
  type: 'Gaushala'
}];


export const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-9041',
    animalTagId: 'TAG-1004',
    animalCategory: 'Bail',
    complainantPhone: '98765 43210',
    complainantName: 'अमित मेहरा (Amit Mehra)',
    photoProofUrl: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
    description: 'सड़क के बीच में अकेला बैल घूम रहा है जिससे यातायात बाधित हो रहा है।',
    location: {
      lat: 23.2599,
      lng: 77.4126,
      addressName: 'होशंगाबाद रोड, बोर्ड ऑफिस चौराहा',
      city: 'भोपाल',
      state: 'मध्य प्रदेश',
      pincode: '462011'
    },
    nearestPasuVibhag: REGIONAL_PASU_VIBHAG[0],
    nearestPoliceStation: REGIONAL_POLICE_STATIONS[0],
    assignedGaushala: REGIONAL_GAUSHALAS[0],
    status: 'Dispatched to Pasu Vibhag',
    assignedUnit: {
      callsign: 'रेस्क्यू एम्बुलेंस Alpha-1',
      plate: 'MP-04-GAU-9012',
      driver: 'राजेश सिंह',
      driverPhone: '98260 99881',
      etaMinutes: 6,
      distanceKm: 1.4
    },
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2026-08-11 09:15 AM',
        note: 'नागरिक द्वारा शिकायत दर्ज की गई।',
        updatedBy: 'Citizen App'
      },
      {
        status: 'Dispatched to Pasu Vibhag',
        timestamp: '2026-08-11 09:20 AM',
        note: 'निकटतम पशु विभाग (भोपाल) को अलर्ट एवं जीपीएस पिन प्रेषित किया गया।',
        updatedBy: 'PashuDhan Auto System'
      }
    ],
    createdAt: '2026-08-11 09:15 AM',
    updatedAt: '2026-08-11 09:20 AM'
  },
  {
    id: 'CMP-9042',
    animalTagId: 'TAG-1001',
    animalCategory: 'Gay',
    complainantPhone: '98260 55443',
    complainantName: 'सुरेश पाटीदार (नागरिक रिपोर्टर)',
    photoProofUrl: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
    description: 'फंदा रोड चौराहे के पास गाय खुले में बैठी है। कृपया जांच करें।',
    location: {
      lat: 23.2599,
      lng: 77.4126,
      addressName: 'फंदा रोड चौराहा, सीहोर मार्ग',
      city: 'भोपाल',
      state: 'मध्य प्रदेश',
      pincode: '462030'
    },
    nearestPasuVibhag: REGIONAL_PASU_VIBHAG[0],
    nearestPoliceStation: REGIONAL_POLICE_STATIONS[0],
    assignedGaushala: REGIONAL_GAUSHALAS[0],
    status: 'Dispatched to Pasu Vibhag',
    assignedUnit: {
      callsign: 'रेस्क्यू स्क्वाड Bravo-2',
      plate: 'MP-04-GAU-8841',
      driver: 'कमलेश यादव',
      driverPhone: '98261 44321',
      etaMinutes: 12,
      distanceKm: 3.2
    },
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2026-08-18 10:00 AM',
        note: 'शिकायत दर्ज हुई एवं फोटो सत्यापन सफल।',
        updatedBy: 'Citizen App'
      },
      {
        status: 'Dispatched to Pasu Vibhag',
        timestamp: '2026-08-18 10:05 AM',
        note: 'पशु कल्याण टीम को आपातकालीन डिस्पैच अलर्ट जारी।',
        updatedBy: 'PashuDhan CAD Engine'
      }
    ],
    createdAt: '2026-08-18 10:00 AM',
    updatedAt: '2026-08-18 10:05 AM'
  },
  {
    id: 'CMP-9043',
    animalTagId: 'TAG-1002',
    animalCategory: 'Gay',
    complainantPhone: '94250 88123',
    complainantName: 'शिवम सिंह (मालिक द्वारा गुमशुदगी रिपोर्ट)',
    photoProofUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    description: 'मेरी गिर गाय बाड़े से 1.4 किमी दूर फेंस तोड़कर निकल गई है, कृपया ढूंढने में सहायता करें।',
    location: {
      lat: 22.7533,
      lng: 77.7289,
      addressName: 'हाईवे NH-69, नर्मदा रोड',
      city: 'होशंगाबाद',
      state: 'मध्य प्रदेश',
      pincode: '461001'
    },
    nearestPasuVibhag: REGIONAL_PASU_VIBHAG[1] || REGIONAL_PASU_VIBHAG[0],
    nearestPoliceStation: REGIONAL_POLICE_STATIONS[1] || REGIONAL_POLICE_STATIONS[0],
    assignedGaushala: REGIONAL_GAUSHALAS[0],
    status: 'In Progress (Patrol Search)',
    assignedUnit: {
      callsign: 'हाईवे पेट्रोल यूनिट 4',
      plate: 'MP-05-PAT-1102',
      driver: 'महेश कुमार',
      driverPhone: '94250 33221',
      etaMinutes: 8,
      distanceKm: 2.1
    },
    statusHistory: [
      {
        status: 'Pending',
        timestamp: '2026-08-10 04:30 PM',
        note: 'पशुपालक द्वारा गुमशुदगी दर्ज की गई।',
        updatedBy: 'Pashu Malik App'
      },
      {
        status: 'In Progress (Patrol Search)',
        timestamp: '2026-08-10 04:45 PM',
        note: 'हाईवे पेट्रोल यूनिट को जीपीएस सर्च निर्देशांक आवंटित।',
        updatedBy: 'CAD Auto-Router'
      }
    ],
    createdAt: '2026-08-10 04:30 PM',
    updatedAt: '2026-08-10 04:45 PM'
  }
];