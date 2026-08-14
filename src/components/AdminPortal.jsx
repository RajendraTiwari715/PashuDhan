import React, { useState, useEffect } from 'react';
import {
  getAnimals,
  getBlankTags,
  getComplaints,
  generateNewBlankTag,
  getRoleRegistry,
  assignUserRole
} from '../services/storage';

import { useLanguage } from '../context/LanguageContext';
import { Analytics } from './Analytics';
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
  ArrowLeft,
  Activity,
  TrendingUp,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Zap,
  BellRing,
  Clock,
  ShieldCheck,
  Server,
  MapPin,
  Flame,
  BarChart3,
  QrCode
} from 'lucide-react';

export const AdminPortal = ({ onOpenLinkTagModal, onSelectAnimal }) => {
  const { t } = useLanguage();
  const [animals, setAnimals] = useState([]);
  const [blankTags, setBlankTags] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [roleRegistry, setRoleRegistry] = useState([]);

  // Admin Sections: 'analytics', 'roles', 'tagging', 'patrol', 'owner', 'gaushala', 'citizen', 'system'
  const [activeSection, setActiveSection] = useState('analytics');

  // Inspection Viewer State
  const [inspectedRole, setInspectedRole] = useState(null);
  const [inspectedPhone, setInspectedPhone] = useState('9826145210');

  // Role assign state
  const [newPhone, setNewPhone] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('tagging_agent');
  const [roleSuccessMsg, setRoleSuccessMsg] = useState('');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // System Live Logs / Broadcast state
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastLog, setBroadcastLog] = useState([
    { id: 1, text: 'राष्ट्रीय गोवंश नियंत्रण केंद्र सर्वर 100% ऑनलाइन सक्रिय।', time: '18:45:00', type: 'info' },
    { id: 2, text: 'पेट्रोलिंग स्क्वाड अलर्ट: 2 अनटैग गोवंश क्षेत्र-4 में संज्ञान में आए।', time: '18:50:12', type: 'warning' },
  ]);

  const loadData = () => {
    setAnimals(getAnimals());
    setBlankTags(getBlankTags());
    setComplaints(getComplaints());
    setRoleRegistry(getRoleRegistry());
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAssignRoleSubmit = (e) => {
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
    if (unlinkedTags.length >= 4) {
      alert('⚠️ इन्वेंट्री में पहले से ही 4 खाली QR टैग उपलब्ध हैं! नए टैग जनरेट करने के लिए पहले इन 4 टैग्स का उपयोग (Link/Use) करें।');
      return;
    }
    const newTag = generateNewBlankTag();
    loadData();
    alert(`नया QR कान टैग "${newTag.tagId}" सफलता पूर्वक जारी किया गया! (कुल इन्वेंट्री: ${unlinkedTags.length + 1}/4)`);
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    const newLog = {
      id: Date.now(),
      text: `[मास्टर ब्रॉडकास्ट] ${broadcastMsg}`,
      time: new Date().toLocaleTimeString(),
      type: 'urgent'
    };
    setBroadcastLog([newLog, ...broadcastLog]);
    setBroadcastMsg('');
    alert('आपातकालीन ब्रॉडकास्ट संदेश पूरे नेटवर्क एवं मोबाइल ऐप्स पर प्रसारित कर दिया गया!');
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'मुख्य एडमिन (Master Admin)';
      case 'tagging_agent': return 'टैगिंग एजेंट (Tagging Agent)';
      case 'patrol_squad': return 'पेट्रोलिंग स्क्वाड (Patrol Squad)';
      case 'pashu_malik': return 'पशु मालिक (Cattle Owner)';
      case 'gaushala_manager': return 'गोशाला मैनेजर (Gaushala Manager)';
      case 'citizen': return 'आम नागरिक (Citizen)';
      default: return role;
    }
  };

  const unlinkedTags = blankTags.filter((t) => !t.isLinked);
  const activeComplaints = complaints.filter(c => c.status !== 'Resolved');

  // Filtered Role Registry
  const filteredUsers = roleRegistry.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Inspection Mode Render
  if (inspectedRole) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
        <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-amber-400 animate-pulse" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-200">
                एडमिन डायरेक्ट लाइव निरीक्षण मोड (Admin Live Simulator)
              </div>
              <div className="text-sm font-bold text-white">
                रोल: <span className="underline">{getRoleLabel(inspectedRole)}</span> | मोबाइल: <span className="font-mono text-cyan-300">{inspectedPhone}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setInspectedRole(null)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-slate-700 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>मास्टर एडमिन कंट्रोल पैनल पर लौटें</span>
          </button>
        </div>

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      {/* Clean Admin Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-50 text-amber-600 border border-amber-200 text-xs px-3.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                मास्टर डैशबोर्ड
              </span>
              <span className="text-xs text-emerald-600 font-mono bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                सर्वर ऑनलाइन
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              एडमिन पोर्टल
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleGenerateNewTag}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3.5 rounded-2xl flex items-center gap-2 text-sm font-black transition-colors shadow-sm"
            >
              <PlusCircle className="w-5 h-5" />
              <span>नया QR टैग जारी करें</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Admin Services (Umang Style) */}
      {activeSection === 'analytics' && (
        <>
          <h2 className="text-base font-bold text-slate-800 px-1">प्रशासनिक सेवाएँ</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setActiveSection('analytics')}
              className="flex flex-col items-center justify-center gap-3 bg-blue-50/50 p-6 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7" />
              </div>
              <span className="font-bold text-sm text-slate-700 text-center">एनालिटिक्स</span>
            </button>

            <button
              onClick={() => setActiveSection('roles')}
              className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <span className="font-bold text-sm text-slate-700 text-center">कर्मचारी प्रबंधन</span>
            </button>

            <button
              onClick={() => setActiveSection('tagging')}
              className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Tag className="w-7 h-7" />
              </div>
              <span className="font-bold text-sm text-slate-700 text-center">टैगिंग नियंत्रण</span>
            </button>

            <button
              onClick={() => setActiveSection('patrol')}
              className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Radio className="w-7 h-7" />
              </div>
              <span className="font-bold text-sm text-slate-700 text-center">पेट्रोलिंग</span>
            </button>

            <button
              onClick={() => setActiveSection('gaushala')}
              className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <span className="font-bold text-sm text-slate-700 text-center">गोशाला</span>
            </button>

            <button
              onClick={() => setActiveSection('system')}
              className="flex flex-col items-center justify-center gap-3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Server className="w-7 h-7" />
              </div>
              <span className="font-bold text-sm text-slate-700 text-center">सिस्टम</span>
            </button>
          </div>
        </>
      )}

      {/* Overview Analytics Details (Only show when Analytics is active) */}
      {activeSection === 'analytics' && (
        <div className="mt-6">
          <Analytics />
        </div>
      )}

      {/* SECTION 2: ROLES & USER MANAGEMENT */}
      {activeSection === 'roles' && (
        <div className="space-y-6 mt-8">
          <button onClick={() => setActiveSection('analytics')} className="text-blue-600 text-sm font-bold mb-4 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> डैशबोर्ड पर वापस जाएँ</button>
          {/* New User Role Registration */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-600" />
              <span>नया कर्मचारी / अधिकारी पंजीकृत करें</span>
            </h3>

            {roleSuccessMsg && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{roleSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleAssignRoleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">कर्मचारी का नाम</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="उदा. विक्रम सिंह"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">मोबाइल नंबर</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="उदा. 9826022222"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-mono text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">आवंटित भूमिका (Role)</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:border-emerald-500 focus:outline-none"
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
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>अधिकार असाइन करें</span>
              </button>
            </form>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="नाम या नंबर से खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none"
              >
                <option value="ALL">सभी रोल (All Roles)</option>
                <option value="tagging_agent">टैगिंग एजेंट</option>
                <option value="patrol_squad">पेट्रोलिंग स्क्वाड</option>
                <option value="pashu_malik">पशु मालिक</option>
                <option value="gaushala_manager">गोशाला मैनेजर</option>
                <option value="citizen">नागरिक</option>
              </select>
            </div>
          </div>

          {/* Registered Users List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div key={user.phone} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                    {user.role}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  नंबर: <span className="text-slate-800 font-bold">{user.phone}</span>
                </div>

                <button
                  onClick={() => {
                    setInspectedRole(user.role);
                    setInspectedPhone(user.phone);
                  }}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>लाइव डैशबोर्ड निरीक्षण करें</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TAG BANK */}
      {activeSection === 'tagging' && (
        <div className="space-y-4 mt-8">
          <button onClick={() => setActiveSection('analytics')} className="text-blue-600 text-sm font-bold mb-4 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> डैशबोर्ड पर वापस जाएँ</button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl bg-white border border-slate-200 shadow-sm gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">अनलिंक्ड QR Ear-Tag बैंक ({unlinkedTags.length} टैग उपलब्ध)</h3>
              <p className="text-xs text-slate-500 mt-1">क्षेत्रीय एजेंटों द्वारा पशु से लिंक करने हेतु उपलब्ध खाली टैग्स</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('tagging_agent');
                setInspectedPhone('9826011111');
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <Eye className="w-4 h-4" />
              <span>टैगिंग डैशबोर्ड खोलें</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {unlinkedTags.map((tag) => (
              <div key={tag.tagId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 shadow-sm">
                <div className="bg-white p-2 rounded-xl inline-block border border-slate-200">
                  <QRCodeSVG value={`PASHUDHAN:${tag.tagId}`} size={70} />
                </div>
                <div className="font-mono text-xs font-bold text-emerald-600">{tag.tagId}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: PATROL SQUAD SECTION */}
      {activeSection === 'patrol' && (
        <div className="space-y-4 mt-8">
          <button onClick={() => setActiveSection('analytics')} className="text-blue-600 text-sm font-bold mb-4 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> डैशबोर्ड पर वापस जाएँ</button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl bg-white border border-slate-200 shadow-sm gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">पेट्रोलिंग गश्त व निर्णय लॉजिक</h3>
              <p className="text-xs text-slate-500 mt-1">1-2m लांग-रेंज UHF RFID स्कैनर एवं ई-चालान सिस्टम</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('patrol_squad');
                setInspectedPhone('9826022222');
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <Eye className="w-4 h-4" />
              <span>पेट्रोलिंग सिमुलेटर खोलें</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: GAUSHALA MANAGMENT */}
      {activeSection === 'gaushala' && (
        <div className="space-y-4 mt-8">
          <button onClick={() => setActiveSection('analytics')} className="text-blue-600 text-sm font-bold mb-4 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> डैशबोर्ड पर वापस जाएँ</button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl bg-white border border-slate-200 shadow-sm gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">गोशाला इन्फ्रास्ट्रक्चर व आइसोलेशन कक्ष</h3>
              <p className="text-xs text-slate-500 mt-1">30-दिवसीय आइसोलेशन, चारा इन्वेंट्री व मेडिकल रिकॉर्ड</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('gaushala_manager');
                setInspectedPhone('9826033333');
              }}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap"
            >
              <Eye className="w-4 h-4" />
              <span>गोशाला डैशबोर्ड खोलें</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 6: SYSTEM BROADCAST & LOGS */}
      {activeSection === 'system' && (
        <div className="space-y-6 mt-8">
          <button onClick={() => setActiveSection('analytics')} className="text-blue-600 text-sm font-bold mb-4 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> डैशबोर्ड पर वापस जाएँ</button>
          <div className="bg-white p-6 rounded-3xl border border-blue-100 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-blue-500" />
              <span>आपातकालीन मास्टर ब्रॉडकास्ट सिस्टम</span>
            </h3>

            <form onSubmit={handleSendBroadcast} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                placeholder="सभी मोबाइल ऐप्स पर प्रसारित करने हेतु आपातकालीन संदेश लिखें..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shrink-0"
              >
                <Zap className="w-4 h-4" />
                <span>ब्रॉडकास्ट भेजें</span>
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <span>सिस्टम लाइव एक्टिविटी लॉग</span>
            </h3>

            <div className="space-y-2">
              {broadcastLog.map(log => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <span className="text-slate-700 font-mono font-medium">{log.text}</span>
                  <span className="text-slate-400 font-mono text-[10px] whitespace-nowrap">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};