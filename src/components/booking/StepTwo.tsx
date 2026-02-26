'use client';

import React, { useEffect } from 'react';
import {
  MapPin, Phone, User, Clock, StickyNote,
  CheckCircle2, ChevronLeft, ChevronRight, Wrench, Plus
} from 'lucide-react';

interface StepTwoProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

// All available extra services user can add
const ALL_SERVICES = [
  { id: 1, name: 'ប្រេងម៉ាស៊ីន 5W-40', nameEn: 'Engine Oil 5W-40', price: 55 },
  { id: 2, name: 'ប្រេងប្រអប់លេខ (Dexron iii)', nameEn: 'Transmission Fluid', price: 60 },
  { id: 3, name: 'ថ្នាំសម្អាតម៉ាស៊ីន', nameEn: 'Engine Flush', price: 13 },
  { id: 4, name: 'ប្រេងហ្រ៊ែម Dot3/Dot4', nameEn: 'Brake Fluid', price: 15 },
  { id: 5, name: 'ទឹកក្រោស', nameEn: 'Coolant', price: 45 },
  { id: 6, name: 'ទឹកម៉ាស៊ីនត្រជាក់', nameEn: 'Air Condition Fluid', price: 35 },
];

const CONTACTS = [
  { icon: MapPin, label: 'អាស័យដ្ឋាន', value: 'ផ្លូវ 271 ខណ្ឌទួលគោក ភ្នំពេញ' },
  { icon: Phone, label: 'ទូរស័ព្ទ', value: '010-635-568' },
  { icon: User, label: 'អ្នកទទួលខុសត្រូវ', value: 'Kona, SPK-Bonna' },
  { icon: Clock, label: 'ម៉ោងបើក', value: 'ច័ន្ទ–សៅរ៍ · 7:30–18:00' },
];

export default function StepTwo({ formData, setFormData, onNext, onBack }: StepTwoProps) {
  const items: any[] = formData.items || [];

  // ── Helper: check if a service_id is already in items ──
  const isInItems = (id: number) =>
    items.some((i: any) => i.service_id === id);

  // ── Services pre-selected from the service page ──
  // These are the items user already chose before arriving at booking
  const preSelected = ALL_SERVICES.filter(s => isInItems(s.id));

  // ── Extra services NOT yet in items (user can add these) ──
  const extras = ALL_SERVICES.filter(s => !isInItems(s.id));

  // ── Add or remove an extra service ──
  const toggleExtra = (id: number) => {
    const idx = items.findIndex((i: any) => i.service_id === id);
    const next = [...items];
    if (idx >= 0) {
      next.splice(idx, 1); // remove
    } else {
      next.push({ service_id: id, product_id: 0, quantity: 1 }); // add
    }
    setFormData({ ...formData, items: next });
  };

  const total = ALL_SERVICES
    .filter(s => isInItems(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  const SectionHead = ({ icon: Icon, text, color = 'bg-red-500', right }: any) => (
    <div className="flex items-center gap-2 mb-4">
      <div className={`w-7 h-7 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className="font-black text-gray-800 text-[11px] sm:text-xs uppercase tracking-widest">{text}</h3>
      {right && <span className="ml-auto">{right}</span>}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">បញ្ជាក់សេវាកម្ម</h2>
      <p className="text-gray-400 text-xs sm:text-sm mb-6">
        សេវាកម្មដែលអ្នកបានជ្រើស + អាចបន្ថែមសេវាបន្ថែម
      </p>

      <div className="space-y-4">

        {/* ── Pre-selected services from service page ── */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 shadow-sm">
          <SectionHead icon={Wrench} text="សេវាកម្មដែលបានជ្រើស" color="bg-green-500" />

          {preSelected.length === 0 ? (
            <p className="text-gray-400 text-xs text-center py-4">មិនមានសេវាកម្មត្រូវបានជ្រើស</p>
          ) : (
            <div className="space-y-2">
              {preSelected.map((svc, i) => (
                <div
                  key={svc.id}
                  className="flex items-center gap-3 p-3 rounded-xl border-2 border-green-400 bg-green-50"
                >
                  {/* Green check badge */}
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-green-500 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-xs sm:text-sm leading-tight">{svc.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">{svc.nameEn}</p>
                  </div>

                  <span className="font-black text-green-600 text-sm flex-shrink-0">${svc.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Extra services user can optionally add ── */}
        {extras.length > 0 && (
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 shadow-sm">
            <SectionHead
              icon={Plus}
              text="បន្ថែមសេវាកម្មបន្ថែម"
              right={<span className="text-[10px] text-gray-400 font-medium">Optional</span>}
            />
            <div className="space-y-2">
              {extras.map((svc) => {
                const added = isInItems(svc.id);
                return (
                  <div
                    key={svc.id}
                    onClick={() => toggleExtra(svc.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-150
                                            ${added
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/30'
                      }`}
                  >
                    {/* Plus / check badge */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                                            ${added ? 'bg-green-500' : 'bg-gray-100'}`}>
                      {added
                        ? <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
                        : <Plus className="w-4 h-4 text-gray-400" />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-black text-gray-900 text-xs sm:text-sm leading-tight">{svc.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">{svc.nameEn}</p>
                    </div>

                    <span className={`font-black text-sm flex-shrink-0 ${added ? 'text-green-600' : 'text-[#DC2626]'}`}>
                      ${svc.price}
                    </span>

                    {/* Checkbox */}
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all
                                            ${added ? 'bg-green-500 border-green-500 scale-110' : 'bg-white border-gray-300'}`}>
                      {added && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Contact info ── */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 shadow-sm">
          <SectionHead icon={Phone} text="ការទំនាក់ទំនង" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CONTACTS.map((c, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 bg-red-50 rounded-xl border border-red-100">
                <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <c.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-bold text-red-400 uppercase tracking-wider">{c.label}</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Note ── */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 shadow-sm">
          <SectionHead
            icon={StickyNote}
            text="កំណត់ចំណាំ"
            right={<span className="text-[10px] text-gray-400 font-medium">Optional</span>}
          />
          <textarea
            value={formData.note || ''}
            onChange={e => setFormData({ ...formData, note: e.target.value })}
            className="w-full px-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-xs sm:text-sm
                            font-medium text-gray-900 resize-none
                            focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all"
            rows={3}
            placeholder="សូមបញ្ចូលកំណត់ចំណាំរបស់អ្នក..."
          />
        </div>

        {/* ── Summary ── */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-5 shadow-xl">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">សេចក្តីសង្ខេប</p>
          <div className="space-y-1.5 mb-3">
            {ALL_SERVICES.filter(s => isInItems(s.id)).map(s => (
              <div key={s.id} className="flex items-center justify-between gap-2">
                <span className="text-gray-300 text-xs sm:text-sm font-medium truncate">{s.name}</span>
                <span className="text-white font-bold text-xs sm:text-sm flex-shrink-0">${s.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-3 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-[10px] mb-0.5">
                {ALL_SERVICES.filter(s => isInItems(s.id)).length} សេវាកម្ម
              </p>
              <p className="text-white font-black text-xs sm:text-sm">តម្លៃសរុប</p>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              ${total}
            </p>
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3.5 bg-gray-100 text-gray-700
                            font-black text-xs sm:text-sm rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> ថយក្រោយ
          </button>
          <button
            onClick={onNext}
            className="group flex-1 flex items-center justify-center gap-2 py-3.5
                            bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white font-black text-sm sm:text-base
                            rounded-xl shadow-lg hover:shadow-red-400/40 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200"
          >
            បន្តទៅជំហានបន្ទាប់
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}