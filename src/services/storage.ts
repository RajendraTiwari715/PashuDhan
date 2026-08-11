import type { Animal, Complaint, QRTag, UserSession, NoticeRecord, UserRole } from '../types';
import {
  INITIAL_ANIMALS,
  INITIAL_BLANK_TAGS,
  INITIAL_COMPLAINTS,
  REGIONAL_PASU_VIBHAG,
  REGIONAL_POLICE_STATIONS,
  REGIONAL_GAUSHALAS
} from './mockData';

const STORAGE_KEYS = {
  ANIMALS: 'pashudhan_animals_v2',
  BLANK_TAGS: 'pashudhan_blank_tags_v2',
  COMPLAINTS: 'pashudhan_complaints_v2',
  USER_SESSION: 'pashudhan_user_session_v2',
  ROLE_REGISTRY: 'pashudhan_role_registry_v2'
};

export interface RegisteredUserRole {
  phone: string;
  name: string;
  role: UserRole;
  assignedDate: string;
}

const DEFAULT_ROLE_REGISTRY: RegisteredUserRole[] = [
  { phone: '940778182', name: 'मुख्य प्रशासनिक अधिकारी (Master Admin)', role: 'admin', assignedDate: '2026-08-01' },
  { phone: '94077841820', name: 'एडमिन कंट्रोल रूम', role: 'admin', assignedDate: '2026-08-01' },
  { phone: '9407784182', name: 'एडमिन टीम', role: 'admin', assignedDate: '2026-08-01' },
  { phone: '9826011111', name: 'अनिल कुमार (टैगिंग एजेंट)', role: 'tagging_agent', assignedDate: '2026-08-05' },
  { phone: '9826022222', name: 'विक्रम राठौर (पेट्रोलिंग स्क्वाड इंचार्ज)', role: 'patrol_squad', assignedDate: '2026-08-06' },
  { phone: '9826033333', name: 'महंत रामदास (गोशाला मैनेजर)', role: 'gaushala_manager', assignedDate: '2026-08-07' },
  { phone: '9826145210', name: 'रमेश कुमार पटेल (पशुपालक)', role: 'pashu_malik', assignedDate: '2025-11-14' },
  { phone: '9425088123', name: 'शिवम सिंह (पशुपालक)', role: 'pashu_malik', assignedDate: '2025-12-01' }
];

// Initialize LocalStorage with seed data if empty
export const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.ANIMALS)) {
    localStorage.setItem(STORAGE_KEYS.ANIMALS, JSON.stringify(INITIAL_ANIMALS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLANK_TAGS)) {
    localStorage.setItem(STORAGE_KEYS.BLANK_TAGS, JSON.stringify(INITIAL_BLANK_TAGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMPLAINTS)) {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ROLE_REGISTRY)) {
    localStorage.setItem(STORAGE_KEYS.ROLE_REGISTRY, JSON.stringify(DEFAULT_ROLE_REGISTRY));
  }
};

// Role Registry DB Functions
export const getRoleRegistry = (): RegisteredUserRole[] => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ROLE_REGISTRY) || '[]');
  } catch (e) {
    return DEFAULT_ROLE_REGISTRY;
  }
};

export const checkAdminPhone = (phone: string): boolean => {
  const clean = phone.replace(/\D/g, '');
  return clean === '940778182' || clean === '94077841820' || clean === '9407784182';
};

export const getRoleForPhone = (phone: string): UserRole => {
  const clean = phone.replace(/\D/g, '');
  if (checkAdminPhone(clean)) return 'admin';

  const registry = getRoleRegistry();
  const found = registry.find(r => r.phone.replace(/\D/g, '') === clean);
  return found ? found.role : 'citizen';
};

export const assignUserRole = (phone: string, role: UserRole, name?: string): RegisteredUserRole => {
  const registry = getRoleRegistry();
  const clean = phone.replace(/\D/g, '');
  
  const existing = registry.find(r => r.phone.replace(/\D/g, '') === clean);
  const nowStr = new Date().toISOString().split('T')[0];

  if (existing) {
    existing.role = role;
    if (name) existing.name = name;
    existing.assignedDate = nowStr;
  } else {
    registry.push({
      phone: clean,
      name: name || `उपयोगकर्ता (${clean})`,
      role,
      assignedDate: nowStr
    });
  }

  localStorage.setItem(STORAGE_KEYS.ROLE_REGISTRY, JSON.stringify(registry));
  return existing || registry[registry.length - 1];
};

// Animals DB functions
export const getAnimals = (): Animal[] => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ANIMALS) || '[]');
  } catch (e) {
    return INITIAL_ANIMALS;
  }
};

export const getAnimalsByOwnerPhone = (phone: string): Animal[] => {
  const clean = phone.replace(/\D/g, '');
  const animals = getAnimals();
  return animals.filter(a => a.owner.phone.replace(/\D/g, '') === clean);
};

export const getAnimalByTagId = (tagId: string): Animal | undefined => {
  const animals = getAnimals();
  const cleanTag = tagId.trim().toUpperCase();
  return animals.find(a => a.tagId.toUpperCase() === cleanTag);
};

export const saveAnimal = (animalData: Omit<Animal, 'id' | 'registeredDate' | 'isRegistered' | 'photos'> & { photos?: string[] }): Animal => {
  const animals = getAnimals();
  const photosArray = animalData.photos || [animalData.fourPhotos.front, animalData.fourPhotos.side];

  const newAnimal: Animal = {
    ...animalData,
    id: `ANM-${Math.floor(1000 + Math.random() * 9000)}`,
    photos: photosArray,
    registeredDate: new Date().toISOString().split('T')[0],
    isRegistered: true
  };

  animals.unshift(newAnimal);
  localStorage.setItem(STORAGE_KEYS.ANIMALS, JSON.stringify(animals));

  // Mark the QR tag as linked
  markTagAsLinked(animalData.tagId, newAnimal.id);

  // Automatically assign owner role to the owner phone
  assignUserRole(animalData.owner.phone, 'pashu_malik', animalData.owner.name);

  return newAnimal;
};

export const issueOffenseNotice = (animalId: string): NoticeRecord => {
  const animals = getAnimals();
  const animal = animals.find(a => a.id === animalId);
  const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  const currentViolations = animal ? animal.priorViolationsCount : 0;
  const offenseLevel = (Math.min(currentViolations + 1, 3)) as 1 | 2 | 3;

  let noticeType: NoticeRecord['noticeType'] = 'Warning_Notice';
  let status: NoticeRecord['status'] = 'Active_Warning';

  if (offenseLevel === 2) {
    noticeType = 'Heavy_Challan_Notice';
  } else if (offenseLevel === 3) {
    noticeType = 'Seizure_Custody_Order';
    status = 'Custody_Transferred';
  }

  const newNotice: NoticeRecord = {
    id: `NTC-${Math.floor(1000 + Math.random() * 9000)}`,
    animalId,
    animalTagId: animal?.tagId || 'TAG-UNKNOWN',
    offenseLevel,
    priorViolations: currentViolations,
    issuedAt: nowStr,
    resolveByTimeHours: 48,
    noticeType,
    status,
    photoEvidence: animal?.photos || ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'],
    gpsEvidence: animal?.location || {
      lat: 23.2599,
      lng: 77.4126,
      addressName: 'मुख्य मार्ग, भोपाल',
      city: 'भोपाल',
      state: 'मध्य प्रदेश',
      pincode: '462011'
    }
  };

  if (animal) {
    animal.priorViolationsCount = Math.min(currentViolations + 1, 3);
    animal.activeNotices.unshift(newNotice);
    localStorage.setItem(STORAGE_KEYS.ANIMALS, JSON.stringify(animals));
  }

  return newNotice;
};

// Blank QR Ear Tags functions (Paytm-style scanner linking)
export const getBlankTags = (): QRTag[] => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BLANK_TAGS) || '[]');
  } catch (e) {
    return INITIAL_BLANK_TAGS;
  }
};

export const generateNewBlankTag = (): QRTag => {
  const blankTags = getBlankTags();
  const newTagId = `TAG-${Math.floor(1000 + Math.random() * 9000)}`;
  const newTag: QRTag = {
    tagId: newTagId,
    isLinked: false,
    generatedDate: new Date().toISOString().split('T')[0]
  };
  blankTags.unshift(newTag);
  localStorage.setItem(STORAGE_KEYS.BLANK_TAGS, JSON.stringify(blankTags));
  return newTag;
};

export const markTagAsLinked = (tagId: string, animalId: string) => {
  const tags = getBlankTags();
  const existing = tags.find(t => t.tagId.toUpperCase() === tagId.toUpperCase());
  if (existing) {
    existing.isLinked = true;
    existing.linkedAnimalId = animalId;
  } else {
    tags.push({
      tagId,
      isLinked: true,
      linkedAnimalId: animalId,
      generatedDate: new Date().toISOString().split('T')[0]
    });
  }
  localStorage.setItem(STORAGE_KEYS.BLANK_TAGS, JSON.stringify(tags));
};

// Complaints functions
export const getComplaints = (): Complaint[] => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLAINTS) || '[]');
  } catch (e) {
    return INITIAL_COMPLAINTS;
  }
};

export const createComplaint = (data: {
  animalTagId?: string;
  animalCategory?: Animal['category'];
  complainantPhone: string;
  complainantName?: string;
  photoProofUrl: string;
  description: string;
  cityName?: string;
}): Complaint => {
  const complaints = getComplaints();
  const timeNowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  const pasuVibhag = REGIONAL_PASU_VIBHAG[0];
  const policeStation = REGIONAL_POLICE_STATIONS[0];
  const gaushala = REGIONAL_GAUSHALAS[0];

  const newComplaint: Complaint = {
    id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
    animalTagId: data.animalTagId,
    animalCategory: data.animalCategory || 'Gay',
    complainantPhone: data.complainantPhone,
    complainantName: data.complainantName || 'नागरिक (Citizen User)',
    photoProofUrl: data.photoProofUrl,
    description: data.description,
    location: {
      lat: 23.2599,
      lng: 77.4126,
      addressName: data.cityName || 'मुख्य मार्ग, भोपाल',
      city: 'भोपाल (Bhopal)',
      state: 'मध्य प्रदेश',
      pincode: '462011'
    },
    nearestPasuVibhag: pasuVibhag,
    nearestPoliceStation: policeStation,
    assignedGaushala: gaushala,
    status: 'Dispatched to Pasu Vibhag',
    statusHistory: [
      {
        status: 'Pending',
        timestamp: timeNowStr,
        note: 'शिकायत ऐप द्वारा सफलतापूर्वक दर्ज की गई।',
        updatedBy: 'Citizen App'
      },
      {
        status: 'Dispatched to Pasu Vibhag',
        timestamp: timeNowStr,
        note: `निकटतम पशु विभाग (${pasuVibhag.name}) एवं पुलिस नियंत्रण कक्ष को स्वतः अलर्ट भेजा गया।`,
        updatedBy: 'PashuDhan GPS Dispatch Engine'
      }
    ],
    createdAt: timeNowStr,
    updatedAt: timeNowStr
  };

  complaints.unshift(newComplaint);
  localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
  return newComplaint;
};

export const updateComplaintStatus = (
  complaintId: string,
  newStatus: Complaint['status'],
  note: string,
  updatedBy: string
): Complaint | undefined => {
  const complaints = getComplaints();
  const target = complaints.find(c => c.id === complaintId);
  if (!target) return undefined;

  const timeNowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  target.status = newStatus;
  target.updatedAt = timeNowStr;
  target.statusHistory.unshift({
    status: newStatus,
    timestamp: timeNowStr,
    note,
    updatedBy
  });

  localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
  return target;
};

export const getUserSession = (): UserSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const setUserSession = (session: UserSession | null) => {
  if (!session) {
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  } else {
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(session));
  }
};
