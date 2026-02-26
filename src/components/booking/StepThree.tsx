'use client';

import React from 'react';
import {
  CheckCircle2, ChevronLeft, Calendar, Clock, User, Phone,
  MapPin, Building2, Home, StickyNote, Wrench, Sparkles
} from 'lucide-react';

interface StepThreeProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
}

const SERVICES_MAP: { [k: number]: { name: string; price: number } } = {
  1: { name: 'ប្រេងម៉ាស៊ីន 5W-40', price: 55 },
  2: { name: 'ប្រេងប្រអប់លេខ (Dexron iii)', price: 60 },
  3: { name: 'ថ្នាំសម្អាតម៉ាស៊ីន', price: 13 },
  4: { name: 'ប្រេងហ្រ៊ែម Dot3/Dot4', price: 15 },
  5: { name: 'ទឹកក្រោស', price: 45 },
  6: { name: 'ទឹកម៉ាស៊ីនត្រជាក់', price: 35 },
};

export default function StepThree({ formData, onBack, onSubmit }: StepThreeProps) {
  const isHome = formData.service_location === 'home';

  // Build service list — always include engine oil (required)
  const fromItems = (formData.items || [])
    .map((i: any) => SERVICES_MAP[i.service_id])
    .filter(Boolean);
  const engineOil = SERVICES_MAP[1];
  const allServices = fromItems.some((s: any) => s.name === engineOil.name)
    ? fromItems
    : [engineOil, ...fromItems];
  const total = allServices.reduce((s: number, v: any) => s + v.price, 0);

  const SectionHead = ({ icon: Icon, text, color = 'bg-red-500' }: any) => (
    <div className="flex items-center gap-2 mb-3 sm:mb-4">
      <div className={`w-7 h-7 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className="font-black text-gray-800 text-[11px] sm:text-xs uppercase tracking-widest">{text}</h3>
    </div>
  );

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 last:border-0">
      <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug break-words">{value || '—'}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Success Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 sm:p-6 mb-5 shadow-xl text-center">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }}
        />
        <div className="relative">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2.5">
            <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white mb-1">ត្រៀមរួចហើយ!</h3>
          <p className="text-green-100 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            សូមពិនិត្យព័ត៌មានរបស់អ្នកម្តងទៀតមុនបញ្ជាក់
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <div className="text-left">
              <p className="text-green-100 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">លេខកាលវិភាគ</p>
              <p className="text-white font-black text-base sm:text-lg leading-none">
                APT-{Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">

        {/* Appointment info */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 shadow-sm">
          <SectionHead icon={Calendar} text="ព័ត៌មានការណាត់ជួប" />
          <InfoRow icon={User} label="ឈ្មោះអតិថិជន" value={formData.full_name} />
          <InfoRow icon={Phone} label="លេខទូរស័ព្ទ" value={formData.phone ? `+855 ${formData.phone}` : ''} />
          <InfoRow icon={Calendar} label="កាលបរិច្ឆេទ" value={
            formData.appointment_date
              ? new Date(formData.appointment_date).toLocaleDateString('km-KH', {
                year: 'numeric', month: 'long', day: 'numeric',
              })
              : ''
          } />
          <InfoRow icon={Clock} label="ម៉ោងណាត់ជួប" value={formData.start_time || ''} />
        </div>

        {/* Location */}
        <div className={`rounded-2xl border-2 p-4 sm:p-5 shadow-sm
                    ${isHome ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                            ${isHome ? 'bg-blue-600' : 'bg-purple-600'}`}>
              {isHome
                ? <Home className="w-4 h-4 text-white" />
                : <Building2 className="w-4 h-4 text-white" />}
            </div>
            <h3 className={`font-black text-[11px] sm:text-xs uppercase tracking-widest
                            ${isHome ? 'text-blue-900' : 'text-purple-900'}`}>ទីតាំងសេវា</h3>
            <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full text-white flex-shrink-0
                            ${isHome ? 'bg-blue-600' : 'bg-purple-600'}`}>
              {isHome ? 'នៅផ្ទះ' : 'នៅហាង'}
            </span>
          </div>

          {isHome ? (
            <div className="space-y-1 pl-1">
              {formData.district && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <p className="text-xs sm:text-sm font-semibold text-blue-900">{formData.district}</p>
                </div>
              )}
              {formData.commune && (
                <p className="text-xs sm:text-sm text-blue-700 font-medium pl-5">{formData.commune}</p>
              )}
              {formData.address && (
                <p className="text-xs sm:text-sm text-blue-700 font-medium pl-5">{formData.address}</p>
              )}
              {formData.location_note && (
                <p className="text-[11px] text-blue-400 font-medium pl-5 italic">{formData.location_note}</p>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-2 pl-1">
              <MapPin className="w-3.5 h-3.5 text-purple-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-semibold text-purple-900">
                ផ្លូវ 271 សង្កាត់ទួលសង្កែ ខណ្ឌទួលគោក រាជធានីភ្នំពេញ
              </p>
            </div>
          )}
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 shadow-sm">
          <SectionHead icon={Wrench} text="សេវាកម្មដែលបានជ្រើស" />
          <div className="space-y-1.5 mb-4">
            {allServices.map((svc: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{svc.name}</span>
                </div>
                <span className="font-black text-[#DC2626] text-xs sm:text-sm flex-shrink-0">${svc.price}</span>
              </div>
            ))}
          </div>
          {/* Total */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-3.5 sm:p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase mb-0.5">{allServices.length} សេវាកម្ម</p>
              <p className="text-white font-black text-xs sm:text-sm">តម្លៃសរុប</p>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              ${total}
            </p>
          </div>
        </div>

        {/* Note */}
        {formData.note && (
          <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-4 sm:p-5 flex items-start gap-3 shadow-sm">
            <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <StickyNote className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">
                កំណត់ចំណាំ
              </p>
              <p className="text-xs sm:text-sm font-semibold text-amber-900 break-words">{formData.note}</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3 pb-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3.5 bg-gray-100 text-gray-700
                            font-black text-xs sm:text-sm rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> ថយក្រោយ
          </button>
          <button
            onClick={onSubmit}
            className="group flex-1 flex items-center justify-center gap-2 py-3.5
                            bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-sm sm:text-base
                            rounded-xl shadow-lg hover:shadow-green-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            បញ្ជាក់ការណាត់ជួប
          </button>
        </div>
      </div>
    </div>
  );
}