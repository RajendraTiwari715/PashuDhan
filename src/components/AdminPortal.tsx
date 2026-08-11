import React, { useState, useEffect } from 'react';
import { 
  getAnimals, 
  getBlankTags, 
  getComplaints, 
  generateNewBlankTag, 
  getRoleRegistry, 
  assignUserRole,
  type RegisteredUserRole 
} from '../services/storage';
import type { Animal, Complaint, QRTag, UserRole } from '../types';
import { TaggingAgentDashboard } from './TaggingAgentDashboard';
import { PatrolSquadDashboard } from './PatrolSquadDashboard';
import { PashuMalikDashboard } from './PashuMalikDashboard';
import { GaushalaManagerDashboard } from './GaushalaManagerDashboard';
import { UserDashboard } from './UserDashboard';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldAlert, 
  PlusCircle, 
  AlertTriangle, 
  Building2, 
  Users, 
  CheckCircle2, 
  UserPlus, 
  Eye, 
  Tag, 
  Radio, 
  User, 
  ArrowLeft 
} from 'lucide-react';


interface AdminPortalProps {
  onOpenLinkTagModal: (tagId?: string) => void;
  onSelectAnimal: (animal: Animal) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onOpenLinkTagModal, onSelectAnimal }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [blankTags, setBlankTags] = useState<QRTag[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [roleRegistry, setRoleRegistry] = useState<RegisteredUserRole[]>([]);
  
  // Admin Sections
  const [activeSection, setActiveSection] = useState<'roles' | 'tagging' | 'patrol' | 'owner' | 'gaushala' | 'citizen'>('roles');
  
  // Inspection Viewer State (Allows Admin to preview any dashboard directly inside Admin Mode!)
  const [inspectedRole, setInspectedRole] = useState<UserRole | null>(null);
  const [inspectedPhone, setInspectedPhone] = useState<string>('9826145210');

  // Role assign state
  const [newPhone, setNewPhone] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('tagging_agent');
  const [roleSuccessMsg, setRoleSuccessMsg] = useState('');

  const loadData = () => {
    setAnimals(getAnimals());
    setBlankTags(getBlankTags());
    setComplaints(getComplaints());
    setRoleRegistry(getRoleRegistry());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssignRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newPhone.trim().replace(/\D/g, '');
    if (clean.length < 9) {
      alert('कृपया सही मोबाइल नंबर दर्ज करें।');
      return;
    }

    assignUserRole(clean, newRole, newName || `कर्मचारी (${clean})`);
    setRoleSuccessMsg(`नंबर ${clean} को "${getRoleLabel(newRole)}" का अधिकार प्रेषित किया गया!`);
    setNewPhone('');
    setNewName('');
    loadData();
    setTimeout(() => setRoleSuccessMsg(''), 4000);
  };

  const handleGenerateNewTag = () => {
    const newTag = generateNewBlankTag();
    loadData();
    alert(`नया QR कान टैग "${newTag.tagId}" जारी किया गया!`);
  };


  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'मुख्य एडमिन (Master Admin)';
      case 'tagging_agent': return 'टैगिंग एजेंट (Tagging Agent)';
      case 'patrol_squad': return 'पेट्रोलिंग स्क्वाड (Patrol Squad)';
      case 'pashu_malik': return 'पशु मालिक (Cattle Owner)';
      case 'gaushala_manager': return 'गोशाला मैनेजर (Gaushala Manager)';
      case 'citizen': return 'आम नागरिक (Citizen)';
    }
  };

  const unlinkedTags = blankTags.filter(t => !t.isLinked);

  // Render Direct Dashboard Inspection View inside Admin Mode!
  if (inspectedRole) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Inspection Header Bar */}
        <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-amber-400 animate-pulse" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-200">
                एडमिन डायरेक्ट डैशबोर्ड लाइव निरीक्षण मोड (Admin Inspection Mode)
              </div>
              <div className="text-sm font-bold text-white">
                रोल: <span className="underline">{getRoleLabel(inspectedRole)}</span> | मोबाइल: <span className="font-mono text-cyan-300">{inspectedPhone}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setInspectedRole(null)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>एडमिन कंट्रोल पैनल पर वापस लौटें</span>
          </button>
        </div>

        {/* Dynamic Embedded Live Dashboard View */}
        {inspectedRole === 'tagging_agent' && (
          <TaggingAgentDashboard
            onOpenLinkTagModal={onOpenLinkTagModal}
            onSelectAnimal={onSelectAnimal}
          />
        )}
        {inspectedRole === 'patrol_squad' && <PatrolSquadDashboard />}
        {inspectedRole === 'pashu_malik' && (
          <PashuMalikDashboard
            userPhone={inspectedPhone}
            onSelectAnimal={onSelectAnimal}
            onOpenComplaint={() => {}}
          />
        )}
        {inspectedRole === 'gaushala_manager' && <GaushalaManagerDashboard animals={animals} />}
        {inspectedRole === 'citizen' && (
          <UserDashboard
            onOpenScanner={() => {}}
            onOpenComplaintForm={() => {}}
            onSelectAnimal={onSelectAnimal}
            complaints={complaints}
            animals={animals}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Master Admin Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                मुख्य एडमिन मास्टर कंट्रोल रूम (Master Admin Panel)
              </span>
              <span className="text-xs text-slate-400 font-mono">मास्टर नंबर: 940778182</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              5 अनुभाग भूमिका प्रबंधन एवं लाइव डैशबोर्ड विश्लेषक
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              यहाँ से आप बिना लॉगिन बदले किसी भी रोल (Tagging Agent, Patrol Squad, Owner, Gaushala Manager, Citizen) के लाइव डैशबोर्ड का सीधा निरीक्षण व विश्लेषण कर सकते हैं।
            </p>
          </div>

          <button
            onClick={handleGenerateNewTag}
            className="bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-bold px-5 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 text-sm transition-all shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>नया Paytm-Style QR टैग जारी करें</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block">असाइन किए गए रोल</span>
            <span className="text-2xl font-black text-cyan-400 font-mono">{roleRegistry.length}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block">कुल पंजीकृत पशु</span>
            <span className="text-2xl font-black text-white font-mono">{animals.length}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-amber-300 font-semibold block">अनलिंक्ड खाली QR टैग</span>
            <span className="text-2xl font-black text-amber-400 font-mono">{unlinkedTags.length}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-rose-300 font-semibold block">सक्रिय शिकायतें</span>
            <span className="text-2xl font-black text-rose-400 font-mono">{complaints.length}</span>
          </div>
        </div>
      </div>

      {/* 5 Divided Role Section Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSection('roles')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'roles'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4 text-amber-400" />
          <span>1. भूमिका आवंटन रजिस्टर</span>
        </button>

        <button
          onClick={() => setActiveSection('tagging')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'tagging'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Tag className="w-4 h-4 text-emerald-400" />
          <span>2. टैगिंग एजेंट अनुभाग</span>
        </button>

        <button
          onClick={() => setActiveSection('patrol')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'patrol'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Radio className="w-4 h-4 text-cyan-400" />
          <span>3. पेट्रोलिंग स्क्वाड अनुभाग</span>
        </button>

        <button
          onClick={() => setActiveSection('owner')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'owner'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <User className="w-4 h-4 text-blue-400" />
          <span>4. पशुपालक (Owner) अनुभाग</span>
        </button>

        <button
          onClick={() => setActiveSection('gaushala')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'gaushala'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Building2 className="w-4 h-4 text-rose-400" />
          <span>5. गोशाला मैनेजर अनुभाग</span>
        </button>

        <button
          onClick={() => setActiveSection('citizen')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSection === 'citizen'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-purple-400" />
          <span>6. नागरिक शिकायत अनुभाग</span>
        </button>
      </div>

      {/* SECTION 1: Staff & User Role Register */}
      {activeSection === 'roles' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-400" />
              <span>नया कर्मचारी / उपयोगकर्ता भूमिका पंजीकृत करें</span>
            </h3>

            {roleSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{roleSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleAssignRoleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">कर्मचारी का नाम</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. विक्रम सिंह"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मोबाइल नंबर</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="e.g. 9826022222"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">आवंटित भूमिका (Role)</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs font-semibold"
                >
                  <option value="tagging_agent">टैगिंग एजेंट (Tagging Agent)</option>
                  <option value="patrol_squad">पेट्रोलिंग स्क्वाड (Patrol Squad)</option>
                  <option value="pashu_malik">पशु मालिक (Cattle Owner)</option>
                  <option value="gaushala_manager">गोशाला मैनेजर (Gaushala Manager)</option>
                  <option value="citizen">आम नागरिक (Citizen)</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>अधिकार असाइन करें</span>
              </button>
            </form>
          </div>

          {/* Registered Roles Table with Direct Inspection Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleRegistry.map((user) => (
              <div key={user.phone} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{user.name}</span>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {user.role}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">नंबर: <span className="text-cyan-400 font-bold">{user.phone}</span></div>

                <button
                  onClick={() => {
                    setInspectedRole(user.role);
                    setInspectedPhone(user.phone);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-amber-500/30 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>लाइव डैशबोर्ड निरीक्षण करें</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Tagging Agent Inspection */}
      {activeSection === 'tagging' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
            <div>
              <h3 className="text-base font-bold text-white">टैगिंग एजेंट अनुभाग (Tagging Agent Section)</h3>
              <p className="text-xs text-slate-400">अनलिंक्ड QR Ear-Tag बैंक ({unlinkedTags.length} टैग) एवं एजेंट कार्यबल</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('tagging_agent');
                setInspectedPhone('9826011111');
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>टैगिंग एजेंट लाइव डैशबोर्ड देखें</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {unlinkedTags.map(tag => (
              <div key={tag.tagId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="bg-white p-2 rounded-xl inline-block">
                  <QRCodeSVG value={`PASHUDHAN:${tag.tagId}`} size={70} />
                </div>
                <div className="font-mono text-xs font-bold text-emerald-400">{tag.tagId}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Patrol Squad Inspection */}
      {activeSection === 'patrol' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40">
            <div>
              <h3 className="text-base font-bold text-white">पेट्रोलिंग स्क्वाड अनुभाग (Patrol Squad Section)</h3>
              <p className="text-xs text-slate-400">1-2m लांग-रेंज RFID गश्त एवं निर्णय लॉजिक</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('patrol_squad');
                setInspectedPhone('9826022222');
              }}
              className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>पेट्रोलिंग स्क्वाड लाइव डैशबोर्ड देखें</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: Owner Inspection */}
      {activeSection === 'owner' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40">
            <div>
              <h3 className="text-base font-bold text-white">पशुपालक (Cattle Owner) अनुभाग</h3>
              <p className="text-xs text-slate-400">पशुपालकों के रजिस्टर्ड गोवंश एवं 500m जिओ-फेंस</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('pashu_malik');
                setInspectedPhone('9826145210');
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>रमेश पटेल (`9826145210`) का डैशबोर्ड देखें</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {animals.map(a => (
              <div key={a.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-white">{a.breed} ({a.category})</div>
                  <div className="text-slate-400 font-mono">TAG: {a.tagId} | मालिक: {a.owner.name}</div>
                </div>
                <button
                  onClick={() => onSelectAnimal(a)}
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  विवरण देखें
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: Gaushala Manager Inspection */}
      {activeSection === 'gaushala' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40">
            <div>
              <h3 className="text-base font-bold text-white">गोशाला मैनेजर अनुभाग (Gaushala Manager Section)</h3>
              <p className="text-xs text-slate-400">गोशाला गेट QR इनटेक एवं 30-दिवसीय आइसोलेशन</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('gaushala_manager');
                setInspectedPhone('9826033333');
              }}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>गोशाला मैनेजर लाइव डैशबोर्ड देखें</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 6: Citizen Complaints */}
      {activeSection === 'citizen' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40">
            <div>
              <h3 className="text-base font-bold text-white">नागरिक शिकायत अनुभाग (Citizen Complaints Section)</h3>
              <p className="text-xs text-slate-400">नागरिकों द्वारा दर्ज आवारा गोवंश शिकायतें ({complaints.length})</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('citizen');
                setInspectedPhone('9876543210');
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>नागरिक लाइव डैशबोर्ड देखें</span>
            </button>
          </div>

          <div className="space-y-3">
            {complaints.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between font-mono text-cyan-400 font-bold">
                  <span>{c.id} (टैग: {c.animalTagId || 'N/A'})</span>
                  <span className="text-amber-400">{c.status}</span>
                </div>
                <div className="text-slate-300">{c.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
