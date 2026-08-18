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
import { PashuProfileModal } from './components/PashuProfileModal';

import {
  getAnimals,
  getComplaints,
  getUserSession,
  setUserSession,
  initStorage,
  getRoleForPhone
} from './services/storage';

export function App() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  // Modals & Active Views
  const [isPashuProfileModalOpen, setIsPashuProfileModalOpen] = useState(false);
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
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [complaintTargetAnimal, setComplaintTargetAnimal] = useState(undefined);

  const [animals, setAnimals] = useState([]);
  const [complaints, setComplaints] = useState([]);

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
    const existingSession = getUserSession();
    if (existingSession) {
      existingSession.role = getRoleForPhone(existingSession.phone);
      setSession(existingSession);
    } else {
      // Default to Master Admin so Overview & Analytics open directly
      const defaultAdminSession = {
        phone: '940778182',
        role: 'admin',
        isLoggedIn: true,
        name: 'मुख्य प्रशासनिक अधिकारी (Master Admin)'
      };
      setSession(defaultAdminSession);
    }
    refreshData();
  }, []);

  const handleLoginSuccess = (userSession) => {
    setSession(userSession);
    refreshData();
  };

  const handleLogout = () => {
    setUserSession(null);
    setSession(null);
    setSelectedAnimal(null);
    setActiveTab('home');
  };

  const handleSelectAnimalFromScanner = (animal) => {
    setSelectedAnimal(animal);
  };

  const handleSelectBlankTagFromScanner = (tagId) => {
    setSelectedTagForLink(tagId);
    setIsLinkTagModalOpen(true);
  };

  const handleVoiceSearchTag = (tagId) => {
    const cleanTag = tagId.trim().toUpperCase();
    const found = animals.find(a => a.tagId.toUpperCase() === cleanTag);
    if (found) {
      setSelectedAnimal(found);
      alert(`वॉयस कमांड: गोवंश ${found.tagId} (${found.breed}) खोजा गया!`);
    } else {
      alert(`वॉयस कमांड: टैग ${tagId} नहीं मिला। नया टैग लिंक करने हेतु 'नया टैग लिंक करो' बोलें।`);
    }
  };

  const handleOpenComplaint = (animal) => {
    setComplaintTargetAnimal(animal);
    setIsComplaintModalOpen(true);
  };

  const handleOpenLinkTagModal = (tagId) => {
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar
        session={session}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenPashuProfile={() => setIsPashuProfileModalOpen(true)}
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

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-700">
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

      <PashuProfileModal
        isOpen={isPashuProfileModalOpen}
        onClose={() => setIsPashuProfileModalOpen(false)}
        session={session}
        animals={animals}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onSelectAnimal={(animal) => {
          setSelectedAnimal(animal);
          setIsPashuProfileModalOpen(false);
        }}
        onOpenLinkTagModal={() => {
          setIsPashuProfileModalOpen(false);
          setIsLinkTagModalOpen(true);
        }}
      />

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

      <AICattleVisionModal
        isOpen={isAIVisionModalOpen}
        onClose={() => setIsAIVisionModalOpen(false)}
      />

      <WhatsAppNoticeModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        animal={selectedAnimal || fallbackAnimal}
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
        animal={selectedAnimal || fallbackAnimal}
      />
    </div>
  );
}

export default App;