export type AnimalCategory = 'Gay' | 'Bail' | 'Bachada' | 'Bhais' | 'Bhed/Bakar' | 'Other';

export interface LocationCoords {
  lat: number;
  lng: number;
  addressName: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OwnerDetails {
  name: string;
  aadhaarNumber: string;
  phone: string;
  villageOrCity: string;
  fullAddress: string;
  isAadhaarVerified: boolean;
  isMobileOtpVerified: boolean;
  aadhaarOcrData?: {
    scannedName: string;
    dob: string;
    gender: string;
    verifiedAt: string;
  };
}

export interface FourPhotos {
  front: string;
  side: string;
  back: string;
  earTagCloseUp: string;
}

export interface GeoFence {
  centerLat: number;
  centerLng: number;
  radiusMeters: number;
  homeAddress: string;
  isOutsideFence: boolean;
  lastCheckedDistanceMeters: number;
}

export interface NoticeRecord {
  id: string;
  animalId: string;
  animalTagId: string;
  offenseLevel: 1 | 2 | 3;
  priorViolations: number;
  issuedAt: string;
  resolveByTimeHours: number;
  noticeType: 'Warning_Notice' | 'Heavy_Challan_Notice' | 'Seizure_Custody_Order';
  status: 'Active_Warning' | 'Pending_Payment' | 'Resolved' | 'Custody_Transferred';
  photoEvidence: string[];
  gpsEvidence: LocationCoords;
}

export interface GaushalaIntake {
  intakeId: string;
  animalId: string;
  animalTagId: string;
  gaushalaName: string;
  gaushalaOfficer: string;
  gaushalaPhone: string;
  transportVehicleNo: string;
  intakeDate: string;
  quarantineDaysTotal: number;
  quarantineDaysRemaining: number;
  custodyStatus: 'Violator' | 'Gaushala Custody' | 'Rehabilitated';
  dailyFeedDetails: { date: string; feedType: string; quantityKg: number }[];
  healthLogs: { date: string; doctorName: string; diagnosis: string }[];
}

export interface Animal {
  id: string;
  tagId: string;
  category: AnimalCategory;
  breed: string;
  color: string;
  gender: 'Female' | 'Male';
  ageYears: number;
  healthStatus: 'Healthy' | 'Needs Treatment' | 'Injured' | 'Vaccinated';
  owner: OwnerDetails;
  fourPhotos: FourPhotos;
  photos: string[]; // For backward compatibility
  location: LocationCoords;
  geoFence: GeoFence;
  priorViolationsCount: number;
  activeNotices: NoticeRecord[];
  gaushalaRecord?: GaushalaIntake;
  registeredDate: string;
  isRegistered: boolean;
}

export interface DepartmentInfo {
  name: string;
  district: string;
  officerInCharge: string;
  phone: string;
  distanceKm: number;
  type: 'PasuVibhag' | 'PoliceStation' | 'Gaushala';
}

export interface StatusLogItem {
  status: string;
  timestamp: string;
  note: string;
  updatedBy: string;
}

export type DecisionCase = 'CASE_A_SAFE_ON_PREMISES' | 'CASE_B_AUTO_FLAG_VIOLATOR' | 'CASE_C_UNOWNED_STRAY_RESCUE';

export interface PatrolScanResult {
  scanId: string;
  timestamp: string;
  tagId: string;
  animal?: Animal;
  scanDistanceMeters: number;
  currentGPS: LocationCoords;
  decisionCase: DecisionCase;
  systemAction: string;
  evidencePhotos: string[];
}

export interface Complaint {
  id: string;
  animalTagId?: string;
  animalCategory?: AnimalCategory;
  complainantPhone: string;
  complainantName?: string;
  photoProofUrl: string;
  description: string;
  location: LocationCoords;
  nearestPasuVibhag: DepartmentInfo;
  nearestPoliceStation: DepartmentInfo;
  assignedGaushala?: DepartmentInfo;
  status: 'Pending' | 'Dispatched to Pasu Vibhag' | 'Police Team Assigned' | 'Rescued to Gaushala' | 'Resolved';
  statusHistory: StatusLogItem[];
  createdAt: string;
  updatedAt: string;
}

export interface QRTag {
  tagId: string;
  isLinked: boolean;
  linkedAnimalId?: string;
  generatedDate: string;
}

export type UserRole = 'citizen' | 'admin' | 'tagging_agent' | 'patrol_squad' | 'pashu_malik' | 'gaushala_manager';

export interface UserSession {
  phone: string;
  role: UserRole;
  isLoggedIn: boolean;
  ownerName?: string;
}
