import React, { useState, useEffect } from 'react';
import {
  getAnimals,
  getBlankTags,
  getComplaints,
  generateNewBlankTag,
  getRoleRegistry,
  assignUserRole } from

'../services/storage';

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
  ArrowLeft } from
'lucide-react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";







export const AdminPortal = ({ onOpenLinkTagModal, onSelectAnimal }) => {
  const [animals, setAnimals] = useState([]);
  const [blankTags, setBlankTags] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [roleRegistry, setRoleRegistry] = useState([]);

  // Admin Sections
  const [activeSection, setActiveSection] = useState('roles');

  // Inspection Viewer State (Allows Admin to preview any dashboard directly inside Admin Mode!)
  const [inspectedRole, setInspectedRole] = useState(null);
  const [inspectedPhone, setInspectedPhone] = useState('9826145210');

  // Role assign state
  const [newPhone, setNewPhone] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('tagging_agent');
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
    const newTag = generateNewBlankTag();
    loadData();
    alert(`नया QR कान टैग "${newTag.tagId}" जारी किया गया!`);
  };


  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':return 'मुख्य एडमिन (Master Admin)';
      case 'tagging_agent':return 'टैगिंग एजेंट (Tagging Agent)';
      case 'patrol_squad':return 'पेट्रोलिंग स्क्वाड (Patrol Squad)';
      case 'pashu_malik':return 'पशु मालिक (Cattle Owner)';
      case 'gaushala_manager':return 'गोशाला मैनेजर (Gaushala Manager)';
      case 'citizen':return 'आम नागरिक (Citizen)';
    }
  };

  const unlinkedTags = blankTags.filter((t) => !t.isLinked);

  // Render Direct Dashboard Inspection View inside Admin Mode!
  if (inspectedRole) {
    return (/*#__PURE__*/
      _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6", children: [/*#__PURE__*/


        _jsxDEV("div", { className: "p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
            _jsxDEV(Eye, { className: "w-6 h-6 text-amber-400 animate-pulse" }, void 0, false), /*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("div", { className: "text-xs font-bold uppercase tracking-wider text-amber-200", children: "एडमिन डायरेक्ट डैशबोर्ड लाइव निरीक्षण मोड (Admin Inspection Mode)" }, void 0, false

              ), /*#__PURE__*/
              _jsxDEV("div", { className: "text-sm font-bold text-white", children: ["रोल: ", /*#__PURE__*/
                _jsxDEV("span", { className: "underline", children: getRoleLabel(inspectedRole) }, void 0, false), " | मोबाइल: ", /*#__PURE__*/_jsxDEV("span", { className: "font-mono text-cyan-300", children: inspectedPhone }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("button", {
            onClick: () => setInspectedRole(null),
            className: "bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-slate-700 transition-colors", children: [/*#__PURE__*/

            _jsxDEV(ArrowLeft, { className: "w-4 h-4 text-amber-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "एडमिन कंट्रोल पैनल पर वापस लौटें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ),


        inspectedRole === 'tagging_agent' && /*#__PURE__*/
        _jsxDEV(TaggingAgentDashboard, {
          onOpenLinkTagModal: onOpenLinkTagModal,
          onSelectAnimal: onSelectAnimal }, void 0, false
        ),

        inspectedRole === 'patrol_squad' && /*#__PURE__*/_jsxDEV(PatrolSquadDashboard, {}, void 0, false),
        inspectedRole === 'pashu_malik' && /*#__PURE__*/
        _jsxDEV(PashuMalikDashboard, {
          userPhone: inspectedPhone,
          onSelectAnimal: onSelectAnimal,
          onOpenComplaint: () => {} }, void 0, false
        ),

        inspectedRole === 'gaushala_manager' && /*#__PURE__*/_jsxDEV(GaushalaManagerDashboard, { animals: animals }, void 0, false),
        inspectedRole === 'citizen' && /*#__PURE__*/
        _jsxDEV(UserDashboard, {
          onOpenScanner: () => {},
          onOpenComplaintForm: () => {},
          onSelectAnimal: onSelectAnimal,
          complaints: complaints,
          animals: animals }, void 0, false
        )] }, void 0, true

      ));

  }

  return (/*#__PURE__*/
    _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn", children: [/*#__PURE__*/


      _jsxDEV("div", { className: "glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5", children: [/*#__PURE__*/
                _jsxDEV(ShieldAlert, { className: "w-4 h-4 text-amber-400" }, void 0, false), "मुख्य एडमिन मास्टर कंट्रोल रूम (Master Admin Panel)"] }, void 0, true

              ), /*#__PURE__*/
              _jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: "मास्टर नंबर: 940778182" }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("h2", { className: "text-2xl sm:text-3xl font-black text-white", children: "5 अनुभाग भूमिका प्रबंधन एवं लाइव डैशबोर्ड विश्लेषक" }, void 0, false

            ), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400 mt-1 max-w-2xl", children: "यहाँ से आप बिना लॉगिन बदले किसी भी रोल (Tagging Agent, Patrol Squad, Owner, Gaushala Manager, Citizen) के लाइव डैशबोर्ड का सीधा निरीक्षण व विश्लेषण कर सकते हैं।" }, void 0, false

            )] }, void 0, true
          ), /*#__PURE__*/

          _jsxDEV("button", {
            onClick: handleGenerateNewTag,
            className: "bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-bold px-5 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 text-sm transition-all shrink-0", children: [/*#__PURE__*/

            _jsxDEV(PlusCircle, { className: "w-5 h-5" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "नया Paytm-Style QR टैग जारी करें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800", children: [/*#__PURE__*/
          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/60 border border-slate-800", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "text-xs text-slate-400 font-semibold block", children: "असाइन किए गए रोल" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-2xl font-black text-cyan-400 font-mono", children: roleRegistry.length }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/60 border border-slate-800", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "text-xs text-slate-400 font-semibold block", children: "कुल पंजीकृत पशु" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-2xl font-black text-white font-mono", children: animals.length }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/60 border border-slate-800", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "text-xs text-amber-300 font-semibold block", children: "अनलिंक्ड खाली QR टैग" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-2xl font-black text-amber-400 font-mono", children: unlinkedTags.length }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/60 border border-slate-800", children: [/*#__PURE__*/
            _jsxDEV("span", { className: "text-xs text-rose-300 font-semibold block", children: "सक्रिय शिकायतें" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { className: "text-2xl font-black text-rose-400 font-mono", children: complaints.length }, void 0, false)] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ), /*#__PURE__*/


      _jsxDEV("div", { className: "flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto", children: [/*#__PURE__*/
        _jsxDEV("button", {
          onClick: () => setActiveSection('roles'),
          className: `px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
          activeSection === 'roles' ?
          'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg' :
          'text-slate-400 hover:bg-slate-800/60'}`, children: [/*#__PURE__*/


          _jsxDEV(Users, { className: "w-4 h-4 text-amber-400" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "1. भूमिका आवंटन रजिस्टर" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("button", {
          onClick: () => setActiveSection('tagging'),
          className: `px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
          activeSection === 'tagging' ?
          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg' :
          'text-slate-400 hover:bg-slate-800/60'}`, children: [/*#__PURE__*/


          _jsxDEV(Tag, { className: "w-4 h-4 text-emerald-400" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "2. टैगिंग एजेंट अनुभाग" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("button", {
          onClick: () => setActiveSection('patrol'),
          className: `px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
          activeSection === 'patrol' ?
          'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg' :
          'text-slate-400 hover:bg-slate-800/60'}`, children: [/*#__PURE__*/


          _jsxDEV(Radio, { className: "w-4 h-4 text-cyan-400" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "3. पेट्रोलिंग स्क्वाड अनुभाग" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("button", {
          onClick: () => setActiveSection('owner'),
          className: `px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
          activeSection === 'owner' ?
          'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg' :
          'text-slate-400 hover:bg-slate-800/60'}`, children: [/*#__PURE__*/


          _jsxDEV(User, { className: "w-4 h-4 text-blue-400" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "4. पशुपालक (Owner) अनुभाग" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("button", {
          onClick: () => setActiveSection('gaushala'),
          className: `px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
          activeSection === 'gaushala' ?
          'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg' :
          'text-slate-400 hover:bg-slate-800/60'}`, children: [/*#__PURE__*/


          _jsxDEV(Building2, { className: "w-4 h-4 text-rose-400" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "5. गोशाला मैनेजर अनुभाग" }, void 0, false)] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("button", {
          onClick: () => setActiveSection('citizen'),
          className: `px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
          activeSection === 'citizen' ?
          'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg' :
          'text-slate-400 hover:bg-slate-800/60'}`, children: [/*#__PURE__*/


          _jsxDEV(AlertTriangle, { className: "w-4 h-4 text-purple-400" }, void 0, false), /*#__PURE__*/
          _jsxDEV("span", { children: "6. नागरिक शिकायत अनुभाग" }, void 0, false)] }, void 0, true
        )] }, void 0, true
      ),


      activeSection === 'roles' && /*#__PURE__*/
      _jsxDEV("div", { className: "space-y-6", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "glass-panel p-6 rounded-3xl border border-slate-700/80 space-y-4 shadow-xl", children: [/*#__PURE__*/
          _jsxDEV("h3", { className: "text-lg font-bold text-white flex items-center gap-2", children: [/*#__PURE__*/
            _jsxDEV(UserPlus, { className: "w-5 h-5 text-amber-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "नया कर्मचारी / उपयोगकर्ता भूमिका पंजीकृत करें" }, void 0, false)] }, void 0, true
          ),

          roleSuccessMsg && /*#__PURE__*/
          _jsxDEV("div", { className: "p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-semibold", children: [/*#__PURE__*/
            _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: roleSuccessMsg }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/


          _jsxDEV("form", { onSubmit: handleAssignRoleSubmit, className: "grid grid-cols-1 sm:grid-cols-4 gap-4 items-end", children: [/*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "कर्मचारी का नाम" }, void 0, false), /*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: newName,
                onChange: (e) => setNewName(e.target.value),
                placeholder: "e.g. विक्रम सिंह",
                className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs" }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "मोबाइल नंबर" }, void 0, false), /*#__PURE__*/
              _jsxDEV("input", {
                type: "text",
                value: newPhone,
                onChange: (e) => setNewPhone(e.target.value),
                placeholder: "e.g. 9826022222",
                className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono text-xs" }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "आवंटित भूमिका (Role)" }, void 0, false), /*#__PURE__*/
              _jsxDEV("select", {
                value: newRole,
                onChange: (e) => setNewRole(e.target.value),
                className: "w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs font-semibold", children: [/*#__PURE__*/

                _jsxDEV("option", { value: "tagging_agent", children: "टैगिंग एजेंट (Tagging Agent)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("option", { value: "patrol_squad", children: "पेट्रोलिंग स्क्वाड (Patrol Squad)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("option", { value: "pashu_malik", children: "पशु मालिक (Cattle Owner)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("option", { value: "gaushala_manager", children: "गोशाला मैनेजर (Gaushala Manager)" }, void 0, false), /*#__PURE__*/
                _jsxDEV("option", { value: "citizen", children: "आम नागरिक (Citizen)" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ), /*#__PURE__*/

            _jsxDEV("button", {
              type: "submit",
              className: "bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5", children: [/*#__PURE__*/

              _jsxDEV(UserPlus, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "अधिकार असाइन करें" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/


        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children:
          roleRegistry.map((user) => /*#__PURE__*/
          _jsxDEV("div", { className: "glass-panel p-4 rounded-2xl border border-slate-800 space-y-3", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between items-center", children: [/*#__PURE__*/
              _jsxDEV("span", { className: "font-bold text-white text-sm", children: user.name }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { className: "bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold", children:
                user.role }, void 0, false
              )] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "text-xs text-slate-400 font-mono", children: ["नंबर: ", /*#__PURE__*/_jsxDEV("span", { className: "text-cyan-400 font-bold", children: user.phone }, void 0, false)] }, void 0, true), /*#__PURE__*/

            _jsxDEV("button", {
              onClick: () => {
                setInspectedRole(user.role);
                setInspectedPhone(user.phone);
              },
              className: "w-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-amber-500/30 transition-colors", children: [/*#__PURE__*/

              _jsxDEV(Eye, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false), /*#__PURE__*/
              _jsxDEV("span", { children: "लाइव डैशबोर्ड निरीक्षण करें" }, void 0, false)] }, void 0, true
            )] }, user.phone, true
          )
          ) }, void 0, false
        )] }, void 0, true
      ),



      activeSection === 'tagging' && /*#__PURE__*/
      _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("h3", { className: "text-base font-bold text-white", children: "टैगिंग एजेंट अनुभाग (Tagging Agent Section)" }, void 0, false), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400", children: ["अनलिंक्ड QR Ear-Tag बैंक (", unlinkedTags.length, " टैग) एवं एजेंट कार्यबल"] }, void 0, true)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => {
              setInspectedRole('tagging_agent');
              setInspectedPhone('9826011111');
            },
            className: "bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5", children: [/*#__PURE__*/

            _jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "टैगिंग एजेंट लाइव डैशबोर्ड देखें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children:
          unlinkedTags.map((tag) => /*#__PURE__*/
          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "bg-white p-2 rounded-xl inline-block", children: /*#__PURE__*/
              _jsxDEV(QRCodeSVG, { value: `PASHUDHAN:${tag.tagId}`, size: 70 }, void 0, false) }, void 0, false
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "font-mono text-xs font-bold text-emerald-400", children: tag.tagId }, void 0, false)] }, tag.tagId, true
          )
          ) }, void 0, false
        )] }, void 0, true
      ),



      activeSection === 'patrol' && /*#__PURE__*/
      _jsxDEV("div", { className: "space-y-4", children: /*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("h3", { className: "text-base font-bold text-white", children: "पेट्रोलिंग स्क्वाड अनुभाग (Patrol Squad Section)" }, void 0, false), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400", children: "1-2m लांग-रेंज RFID गश्त एवं निर्णय लॉजिक" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => {
              setInspectedRole('patrol_squad');
              setInspectedPhone('9826022222');
            },
            className: "bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5", children: [/*#__PURE__*/

            _jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "पेट्रोलिंग स्क्वाड लाइव डैशबोर्ड देखें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      ),



      activeSection === 'owner' && /*#__PURE__*/
      _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("h3", { className: "text-base font-bold text-white", children: "पशुपालक (Cattle Owner) अनुभाग" }, void 0, false), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400", children: "पशुपालकों के रजिस्टर्ड गोवंश एवं 500m जिओ-फेंस" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => {
              setInspectedRole('pashu_malik');
              setInspectedPhone('9826145210');
            },
            className: "bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5", children: [/*#__PURE__*/

            _jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "रमेश पटेल (`9826145210`) का डैशबोर्ड देखें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children:
          animals.map((a) => /*#__PURE__*/
          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs", children: [/*#__PURE__*/
            _jsxDEV("div", { children: [/*#__PURE__*/
              _jsxDEV("div", { className: "font-bold text-white", children: [a.breed, " (", a.category, ")"] }, void 0, true), /*#__PURE__*/
              _jsxDEV("div", { className: "text-slate-400 font-mono", children: ["TAG: ", a.tagId, " | मालिक: ", a.owner.name] }, void 0, true)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("button", {
              onClick: () => onSelectAnimal(a),
              className: "text-emerald-400 font-semibold hover:underline", children:
              "विवरण देखें" }, void 0, false

            )] }, a.id, true
          )
          ) }, void 0, false
        )] }, void 0, true
      ),



      activeSection === 'gaushala' && /*#__PURE__*/
      _jsxDEV("div", { className: "space-y-4", children: /*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("h3", { className: "text-base font-bold text-white", children: "गोशाला मैनेजर अनुभाग (Gaushala Manager Section)" }, void 0, false), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400", children: "गोशाला गेट QR इनटेक एवं 30-दिवसीय आइसोलेशन" }, void 0, false)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => {
              setInspectedRole('gaushala_manager');
              setInspectedPhone('9826033333');
            },
            className: "bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5", children: [/*#__PURE__*/

            _jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "गोशाला मैनेजर लाइव डैशबोर्ड देखें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      ),



      activeSection === 'citizen' && /*#__PURE__*/
      _jsxDEV("div", { className: "space-y-4", children: [/*#__PURE__*/
        _jsxDEV("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40", children: [/*#__PURE__*/
          _jsxDEV("div", { children: [/*#__PURE__*/
            _jsxDEV("h3", { className: "text-base font-bold text-white", children: "नागरिक शिकायत अनुभाग (Citizen Complaints Section)" }, void 0, false), /*#__PURE__*/
            _jsxDEV("p", { className: "text-xs text-slate-400", children: ["नागरिकों द्वारा दर्ज आवारा गोवंश शिकायतें (", complaints.length, ")"] }, void 0, true)] }, void 0, true
          ), /*#__PURE__*/
          _jsxDEV("button", {
            onClick: () => {
              setInspectedRole('citizen');
              setInspectedPhone('9876543210');
            },
            className: "bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5", children: [/*#__PURE__*/

            _jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false), /*#__PURE__*/
            _jsxDEV("span", { children: "नागरिक लाइव डैशबोर्ड देखें" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ), /*#__PURE__*/

        _jsxDEV("div", { className: "space-y-3", children:
          complaints.map((c) => /*#__PURE__*/
          _jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2", children: [/*#__PURE__*/
            _jsxDEV("div", { className: "flex justify-between font-mono text-cyan-400 font-bold", children: [/*#__PURE__*/
              _jsxDEV("span", { children: [c.id, " (टैग: ", c.animalTagId || 'N/A', ")"] }, void 0, true), /*#__PURE__*/
              _jsxDEV("span", { className: "text-amber-400", children: c.status }, void 0, false)] }, void 0, true
            ), /*#__PURE__*/
            _jsxDEV("div", { className: "text-slate-300", children: c.description }, void 0, false)] }, c.id, true
          )
          ) }, void 0, false
        )] }, void 0, true
      )] }, void 0, true


    ));

};