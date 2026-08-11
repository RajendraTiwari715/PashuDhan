import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UserDashboard } from './components/UserDashboard';
import { AdminPortal } from './components/AdminPortal';
import { TaggingAgentDashboard } from './components/TaggingAgentDashboard';
import { PatrolSquadDashboard } from './components/PatrolSquadDashboard';
import { PashuMalikDashboard } from './components/PashuMalikDashboard';
import { GaushalaManagerDashboard } from './components/GaushalaManagerDashboard';
import { AnimalDetailsPage } from './components/AnimalDetailsPage';
import { LoginModal } from './components/LoginModal';
import { QRScannerModal } from './components/QRScannerModal';
import { ComplaintFormModal } from './components/ComplaintFormModal';
import { LinkTagModal } from './components/LinkTagModal';
import { AICattleVisionModal } from './components/AICattleVisionModal';
import { WhatsAppNoticeModal } from './components/WhatsAppNoticeModal';
import { BluetoothRFIDModal } from './components/BluetoothRFIDModal';
import { SirenAlertModal } from './components/SirenAlertModal';
import type { Animal, Complaint, UserSession } from './types';
import { getAnimals, getComplaints, getUserSession, setUserSession, initStorage, getRoleForPhone } from './services/storage';

export function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'admin' | 'complaints'>('home');
  
  // Modals & Active Views
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isLinkTagModalOpen, setIsLinkTagModalOpen] = useState(false);
  
  // Core Tech Modals
  const [isAIVisionModalOpen, setIsAIVisionModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isBluetoothModalOpen, setIsBluetoothModalOpen] = useState(false);
  const [isSirenAlertModalOpen, setIsSirenAlertModalOpen] = useState(false);

  const [selectedTagForLink, setSelectedTagForLink] = useState('TAG-8821');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [complaintTargetAnimal, setComplaintTargetAnimal] = useState<Animal | undefined>(undefined);

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const refreshData = () => {
    initStorage();
    const fetchedAnimals = getAnimals();
    setAnimals(fetchedAnimals);
    setComplaints(getComplaints());
    const existingSession = getUserSession();
    if (existingSession) {
      existingSession.role = getRoleForPhone(existingSession.phone);
    }
    setSession(existingSession);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
    if (newSession.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('home');
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    setSession(null);
    setActiveTab('home');
  };

  const handleSelectAnimalFromScanner = (animal: Animal) => {
    setSelectedAnimal(animal);
  };

  const handleSelectBlankTagFromScanner = (tagId: string) => {
    if (session?.role === 'admin' || session?.role === 'tagging_agent') {
      setSelectedTagForLink(tagId);
      setIsLinkTagModalOpen(true);
    } else {
      alert(`QR टैग "${tagId}" एक नया खाली टैग है। इसे लिंक करने के लिए टैगिंग एजेंट या एडमिन लॉगिन आवश्यक है।`);
    }
  };

  const handleVoiceSearchTag = (tagId: string) => {
    const found = animals.find(a => a.tagId.toUpperCase() === tagId.toUpperCase() || a.id.toUpperCase() === tagId.toUpperCase());
    if (found) {
      setSelectedAnimal(found);
      alert(`वॉयस कमांड: गोवंश ${found.tagId} (${found.breed}) खोजा गया!`);
    } else {
      alert(`वॉयस कमांड: टैग ${tagId} नहीं मिला। नया टैग लिंक करने हेतु 'नया टैग लिंक करो' बोलें।`);
    }
  };

  const handleOpenComplaint = (animal?: Animal) => {
    setComplaintTargetAnimal(animal);
    setIsComplaintModalOpen(true);
  };

  const handleOpenLinkTagModal = (tagId?: string) => {
    if (tagId) setSelectedTagForLink(tagId);
    setIsLinkTagModalOpen(true);
  };

  const renderDashboardByRole = () => {
    if (!session || session.role === 'citizen') {
      return (
        <UserDashboard
          onOpenScanner={() => setIsScannerModalOpen(true)}
          onOpenComplaintForm={handleOpenComplaint}
          onSelectAnimal={(animal) => setSelectedAnimal(animal)}
          complaints={complaints}
          animals={animals}
        />
      );
    }

    switch (session.role) {
      case 'admin':
        return (
          <AdminPortal
            onOpenLinkTagModal={handleOpenLinkTagModal}
            onSelectAnimal={(animal) => setSelectedAnimal(animal)}
          />
        );
      case 'tagging_agent':
        return (
          <TaggingAgentDashboard
            onOpenLinkTagModal={handleOpenLinkTagModal}
            onSelectAnimal={(animal) => setSelectedAnimal(animal)}
          />
        );
      case 'patrol_squad':
        return <PatrolSquadDashboard />;
      case 'pashu_malik':
        return (
          <PashuMalikDashboard
            userPhone={session.phone}
            onSelectAnimal={(animal) => setSelectedAnimal(animal)}
            onOpenComplaint={handleOpenComplaint}
          />
        );
      case 'gaushala_manager':
        return <GaushalaManagerDashboard animals={animals} />;
      default:
        return (
          <UserDashboard
            onOpenScanner={() => setIsScannerModalOpen(true)}
            onOpenComplaintForm={handleOpenComplaint}
            onSelectAnimal={(animal) => setSelectedAnimal(animal)}
            complaints={complaints}
            animals={animals}
          />
        );
    }
  };

  const fallbackAnimal = animals[0] || {
    id: 'ANM-1001',
    tagId: 'TAG-1001',
    category: 'Gay',
    breed: 'साहीवाल (Sahiwal)',
    color: 'लाल-भूरा',
    ageYears: 4,
    healthStatus: 'Healthy',
    priorViolationsCount: 1,
    owner: {
      name: 'रमेश कुमार पटेल',
      phone: '9826145210',
      aadhaarNumber: 'XXXX-XXXX-9012',
      aadhaarOcrVerified: true,
      address: 'ग्राम पिपलिया, भोपाल',
      villageOrCity: 'भोपाल',
      pincode: '462011'
    },
    fourPhotos: {
      front: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
      side: 'https://images.unsplash.com/photo-1570042707221-a18833919b48?auto=format&fit=crop&w=800&q=80',
      back: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80',
      tagCloseup: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
    },
    photos: ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'],
    location: {
      lat: 23.2599,
      lng: 77.4126,
      addressName: 'पिपलिया डेयरी फार्म, भोपाल',
      city: 'भोपाल',
      state: 'मध्य प्रदेश',
      pincode: '462011'
    },
    geoFence: {
      centerLat: 23.2599,
      centerLng: 77.4126,
      radiusMeters: 500
    },
    registeredDate: '2025-11-14',
    isRegistered: true,
    activeNotices: []
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        session={session}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenScanner={() => setIsScannerModalOpen(true)}
        onOpenAIVision={() => setIsAIVisionModalOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
        onOpenBluetooth={() => setIsBluetoothModalOpen(true)}
        onSearchTag={handleVoiceSearchTag}
        onOpenLinkTagModal={() => setIsLinkTagModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setSelectedAnimal(null);
          setActiveTab(tab);
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {selectedAnimal ? (
          <AnimalDetailsPage
            animal={selectedAnimal}
            onBack={() => setSelectedAnimal(null)}
            onOpenComplaint={handleOpenComplaint}
          />
        ) : activeTab === 'admin' && session?.role === 'admin' ? (
          <AdminPortal
            onOpenLinkTagModal={handleOpenLinkTagModal}
            onSelectAnimal={(animal) => setSelectedAnimal(animal)}
          />
        ) : (
          renderDashboardByRole()
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-300">
              पशु-धन (PashuDhan) - राष्ट्रीय डिजिटल सनातनी गोवंश रक्षा एवं रेस्क्यू पोर्टल
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              भूमिका आधारित डैशबोर्ड, QR कान टैग मैपिंग एवं स्वतः पशु विभाग अलर्ट प्रणाली
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>मास्टर एडमिन: 940778182</span>
            <span>|</span>
            <span>पशु आपातकालीन: 1962</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <QRScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        onSelectAnimal={handleSelectAnimalFromScanner}
        onSelectBlankTag={handleSelectBlankTagFromScanner}
      />

      <ComplaintFormModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
        targetAnimal={complaintTargetAnimal}
        userPhone={session?.phone || '98765 43210'}
        onComplaintSubmitted={() => {
          refreshData();
          setActiveTab('home');
        }}
      />

      <LinkTagModal
        isOpen={isLinkTagModalOpen}
        onClose={() => setIsLinkTagModalOpen(false)}
        initialTagId={selectedTagForLink}
        onTagLinkedSuccess={(newAnimal) => {
          refreshData();
          setSelectedAnimal(newAnimal);
        }}
      />

      {/* Core Tech Modals */}
      <AICattleVisionModal
        isOpen={isAIVisionModalOpen}
        onClose={() => setIsAIVisionModalOpen(false)}
      />

      <WhatsAppNoticeModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        animal={selectedAnimal || (fallbackAnimal as Animal)}
      />

      <BluetoothRFIDModal
        isOpen={isBluetoothModalOpen}
        onClose={() => setIsBluetoothModalOpen(false)}
        onTagDetected={(tagId) => {
          handleSelectBlankTagFromScanner(tagId);
          setIsBluetoothModalOpen(false);
        }}
      />

      <SirenAlertModal
        isOpen={isSirenAlertModalOpen}
        onClose={() => setIsSirenAlertModalOpen(false)}
        animal={selectedAnimal || (fallbackAnimal as Animal)}
      />

    </div>
  );
}

export default App;
