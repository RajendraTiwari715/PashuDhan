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
  BarChart3
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner & Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldAlert className="w-64 h-64 text-amber-500" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-inner">
                <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
                राष्ट्रीय गोवंश नियंत्रण केंद्र - मास्टर एडमिन कमांड
              </span>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                सर्वर ऑनलाइन
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              एडवांस एडमिनिस्ट्रेटिव कमांड व लाइव एनालिटिक्स
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              संपूर्ण देश भर के पंजीकृत पशुधन, क्यूआर टैग इन्वेंट्री, लाइव पेट्रोलिंग गश्त, गोशाला क्षमता एवं नागरिक शिकायतों का केंद्रीय प्रबंधन नियंत्रण।
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={handleGenerateNewTag}
              className="bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold px-5 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all transform hover:scale-[1.02]"
            >
              <PlusCircle className="w-5 h-5" />
              <span>नया QR कान-टैग जारी करें</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">असाइन कर्मचारी</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">
              {roleRegistry.length}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">सक्रिय रोल उपयोगकर्ता</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">पंजीकृत गोवंश</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              {animals.length}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">100% आधार व QR लिंक्ड</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-300 font-semibold">अनलिंक्ड QR टैग</span>
              <Tag className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1">
              {unlinkedTags.length}
            </div>
            <div className="text-[10px] text-amber-500 mt-1">इन्वेंट्री में उपलब्ध</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner hover:border-rose-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-rose-300 font-semibold">सक्रिय शिकायतें</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-1">
              {activeComplaints.length}
            </div>
            <div className="text-[10px] text-rose-500 mt-1">तत्काल कार्रवाई योग्य</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Admin Sections */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSection('analytics')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'analytics'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <span>1. लाइव एनालिटिक्स एवं रिपोर्ट</span>
        </button>

        <button
          onClick={() => setActiveSection('roles')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'roles'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4 text-cyan-400" />
          <span>2. कर्मचारी रोल प्रबंधन</span>
        </button>

        <button
          onClick={() => setActiveSection('tagging')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'tagging'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Tag className="w-4 h-4 text-emerald-400" />
          <span>{t('tab_tagging_agent')}</span>
        </button>

        <button
          onClick={() => setActiveSection('patrol')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'patrol'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Radio className="w-4 h-4 text-purple-400" />
          <span>4. पेट्रोलिंग नियंत्रण</span>
        </button>

        <button
          onClick={() => setActiveSection('gaushala')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'gaushala'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Building2 className="w-4 h-4 text-rose-400" />
          <span>5. गोशाला इन्फ्रास्ट्रक्चर</span>
        </button>

        <button
          onClick={() => setActiveSection('system')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'system'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg'
              : 'text-slate-400 hover:bg-slate-800/60'
          }`}
        >
          <Server className="w-4 h-4 text-blue-400" />
          <span>6. आपातकालीन ब्रॉडकास्ट</span>
        </button>
      </div>

      {/* SECTION 1: LIVE ANALYTICS & INSIGHTS */}
      {activeSection === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Health & Vaccination Status Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  स्वास्थ्य एवं टीकाकरण स्थिति
                </h3>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  Realtime
                </span>
              </div>
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>100% स्वस्थ एवं टीकाकृत</span>
                    <span className="text-white font-mono font-bold">85%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>चिकित्सा उपचाराधीन</span>
                    <span className="text-amber-400 font-mono font-bold">10%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[10%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>गंभीर / आइसोलेशन में</span>
                    <span className="text-rose-400 font-mono font-bold">5%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 w-[5%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Geo-Fence Compliance Metric */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  जिओ-फेंस (500m) अनुपालन
                </h3>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono">
                  GPS Active
                </span>
              </div>

              <div className="flex items-center justify-around py-2">
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    {animals.filter(a => !a.geoFence?.isOutsideFence).length}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">फेंस के अंदर (Safe)</div>
                </div>

                <div className="h-10 w-px bg-slate-800"></div>

                <div className="text-center">
                  <div className="text-3xl font-black text-rose-400 font-mono">
                    {animals.filter(a => a.geoFence?.isOutsideFence).length}
                  </div>
                  <div className="text-[10px] text-rose-400 font-bold mt-1">उल्लंघन (Alert)</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>स्वचालित सायरन अलर्ट:</span>
                <span className="text-emerald-400 font-bold">सक्रिय (Auto Trigger)</span>
              </div>
            </div>

            {/* Quick Action Simulator Launcher */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  क्विक रोल सिमुलेटर
                </h3>
                <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                  Simulate
                </span>
              </div>
              <p className="text-xs text-slate-400">
                बिना अकाउंट स्विच किए किसी भी रोल के इंटरफेस की त्वरित जांच करें:
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => { setInspectedRole('tagging_agent'); setInspectedPhone('9826011111'); }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-emerald-300 font-bold text-left flex items-center gap-1.5"
                >
                  <Tag className="w-3.5 h-3.5" />
                  टैगिंग एजेंट
                </button>

                <button
                  onClick={() => { setInspectedRole('patrol_squad'); setInspectedPhone('9826022222'); }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-300 font-bold text-left flex items-center gap-1.5"
                >
                  <Radio className="w-3.5 h-3.5" />
                  पेट्रोलिंग स्क्वाड
                </button>

                <button
                  onClick={() => { setInspectedRole('gaushala_manager'); setInspectedPhone('9826033333'); }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-rose-300 font-bold text-left flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  गोशाला मैनेजर
                </button>

                <button
                  onClick={() => { setInspectedRole('pashu_malik'); setInspectedPhone('9826145210'); }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-blue-300 font-bold text-left flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  पशुपालक
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ROLES & USER MANAGEMENT */}
      {activeSection === 'roles' && (
        <div className="space-y-6">
          {/* New User Role Registration */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-400" />
              <span>नया कर्मचारी / अधिकारी पंजीकृत करें</span>
            </h3>

            {roleSuccessMsg && (
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{roleSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleAssignRoleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">कर्मचारी का नाम</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="उदा. विक्रम सिंह"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">मोबाइल नंबर</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="उदा. 9826022222"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">आवंटित भूमिका (Role)</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs font-semibold focus:border-amber-500 focus:outline-none"
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
                className="bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>अधिकार असाइन करें</span>
              </button>
            </form>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="नाम या नंबर से खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none"
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
              <div key={user.phone} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{user.name}</span>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                    {user.role}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  नंबर: <span className="text-cyan-400 font-bold">{user.phone}</span>
                </div>

                <button
                  onClick={() => {
                    setInspectedRole(user.role);
                    setInspectedPhone(user.phone);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-amber-500/30 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>लाइव डैशबोर्ड निरीक्षण करें</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TAG BANK */}
      {activeSection === 'tagging' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
            <div>
              <h3 className="text-base font-bold text-white">अनलिंक्ड QR Ear-Tag बैंक ({unlinkedTags.length} टैग उपलब्ध)</h3>
              <p className="text-xs text-slate-400">क्षेत्रीय एजेंटों द्वारा पशु से लिंक करने हेतु उपलब्ध खाली टैग्स</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('tagging_agent');
                setInspectedPhone('9826011111');
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>टैगिंग एजेंट डैशबोर्ड खोलें</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {unlinkedTags.map((tag) => (
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

      {/* SECTION 4: PATROL SQUAD SECTION */}
      {activeSection === 'patrol' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40">
            <div>
              <h3 className="text-base font-bold text-white">पेट्रोलिंग गश्त व निर्णय लॉजिक</h3>
              <p className="text-xs text-slate-400">1-2m लांग-रेंज UHF RFID स्कैनर एवं ई-चालान सिस्टम</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('patrol_squad');
                setInspectedPhone('9826022222');
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>पेट्रोलिंग लाइव सिमुलेटर खोलें</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: GAUSHALA MANAGMENT */}
      {activeSection === 'gaushala' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40">
            <div>
              <h3 className="text-base font-bold text-white">गोशाला इन्फ्रास्ट्रक्चर व आइसोलेशन कक्ष</h3>
              <p className="text-xs text-slate-400">30-दिवसीय आइसोलेशन, चारा इन्वेंट्री व मेडिकल रिकॉर्ड</p>
            </div>
            <button
              onClick={() => {
                setInspectedRole('gaushala_manager');
                setInspectedPhone('9826033333');
              }}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>गोशाला मैनेजर लाइव डैशबोर्ड खोलें</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 6: SYSTEM BROADCAST & LOGS */}
      {activeSection === 'system' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BellRing className="w-5 h-5 text-blue-400" />
              <span>आपातकालीन मास्टर ब्रॉडकास्ट सिस्टम</span>
            </h3>

            <form onSubmit={handleSendBroadcast} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                placeholder="सभी मोबाइल ऐप्स पर प्रसारित करने हेतु आपातकालीन संदेश लिखें..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
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

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <span>सिस्टम लाइव एक्टिविटी लॉग</span>
            </h3>

            <div className="space-y-2">
              {broadcastLog.map(log => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-mono">{log.text}</span>
                  <span className="text-slate-500 font-mono text-[10px]">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};