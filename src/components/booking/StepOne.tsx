'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  User, Calendar, MapPin, Home, Building2,
  ChevronRight, Navigation, AlertCircle,
} from 'lucide-react';

interface StepOneProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  selectedItem?: any;
  itemType?: 'service' | 'package' | 'product';
  serviceType?: 'oil-home' | 'oil-garage' | 'products'; // ← from BookingClient
}

const getDistricts = (t: any) => [
  t('districts.daunPenh'),
  t('districts.makara'),
  t('districts.chamkarmon'),
  t('districts.toulKork'),
  t('districts.bkk'),
  t('districts.meanChey'),
  t('districts.posenchey'),
  t('districts.chbarAmpov'),
  t('districts.russeyKeo'),
  t('districts.senSok'),
  t('districts.ponnheaLeu'),
  t('districts.dangkao'),
];

export default function StepOne({
  formData,
  setFormData,
  onNext,
  serviceType = 'oil-garage',
}: StepOneProps) {
  const t = useTranslations('booking');
  const [errors, setErrors] = useState<any>({});
  const DISTRICTS = getDistricts(t);

  // true  → user booked from "oil-home" tab  → show address fields
  // false → user booked from "oil-garage" tab → hide address fields
  const isHome = serviceType === 'oil-home';

  // const validate = () => {
  //     const e: any = {};
  //     if (!formData.full_name)        e.full_name        = 'សូមបញ្ចូលឈ្មោះពេញ';
  //     if (!formData.phone)            e.phone            = 'សូមបញ្ចូលលេខទូរស័ព្ទ';
  //     if (!formData.appointment_date) e.appointment_date = 'សូមជ្រើសរើសកាលបរិច្ឆេទ';
  //     if (!formData.start_time)       e.start_time       = 'សូមជ្រើសរើសម៉ោង';
  //     if (isHome) {
  //         if (!formData.district) e.district = 'សូមជ្រើសរើសខណ្ឌ';
  //         if (!formData.street)   e.street   = 'សូមបញ្ចូលផ្លូវ/លេខផ្ទះ';
  //     }
  //     setErrors(e);
  //     return Object.keys(e).length === 0;
  // };

  // const handleSubmit = () => {
  //     // Stamp service_location into formData before proceeding
  //     setFormData({ ...formData, service_location: isHome ? 'home' : 'garage' });
  //     if (validate()) onNext();
  // };

  /* ─── Style helpers ─── */
  const inputBase =
    'w-full px-3 py-3 text-sm border-2 rounded-xl bg-gray-50 text-gray-900 font-medium ' +
    'focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-400 ' +
    'transition-all placeholder:text-gray-300';
  const inp = (err: boolean) => `${inputBase} ${err ? 'border-red-400' : 'border-gray-200'}`;

  const Err = ({ msg }: { msg?: string }) =>
    msg ? (
      <p className="flex items-center gap-1 mt-1 text-red-500 text-[11px] font-semibold">
        <AlertCircle className="w-3 h-3 flex-shrink-0" /> {msg}
      </p>
    ) : null;

  const Label = ({ text }: { text: string }) => (
    <label className="block text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
      {text}
    </label>
  );

  const SectionHead = ({ icon: Icon, text, color = 'bg-red-500', badge }: any) => (
    <div className="flex items-center gap-2 mb-4">
      <div className={`w-7 h-7 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className="font-black text-gray-800 text-[11px] sm:text-xs uppercase tracking-widest">{text}</h3>
      {badge && (
        <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full text-white flex-shrink-0 ${color}`}>
          {badge}
        </span>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-2xl  mx-auto px-4 sm:px-0">

      {/* Service type badge — changes based on which tab the user came from */}
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-bold border
                ${isHome
          ? 'bg-blue-50 text-blue-700 border-blue-200'
          : 'bg-purple-50 text-purple-700 border-purple-200'
        }`}>
        {isHome
          ? <><Home className="w-3.5 h-3.5" /> {t('step1.homeService')}</>
          : <><Building2 className="w-3.5 h-3.5" /> {t('step1.garageService')}</>
        }
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">{t('step1.title')}</h2>
      <p className="text-gray-400 text-xs sm:text-sm mb-6">
        {t('step1.subtitle')}
      </p>

      <div className="space-y-4">

        {/* ── Personal Info ── */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 shadow-sm">
          <SectionHead icon={User} text={t('step1.personalInfoTitle')} />
          <div className="space-y-3">
            <div>
              <Label text={`${t('step1.fullName')} *`} />
              <input
                type="text"
                value={formData.full_name || ''}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                className={inp(!!errors.full_name)}
                placeholder={t('step1.fullNamePlaceholder')}
              />
              <Err msg={errors.full_name} />
            </div>
            <div>
              <Label text={`${t('step1.phone')} *`} />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs font-semibold pointer-events-none">
                  +855
                </span>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className={`${inp(!!errors.phone)} pl-12`}
                  placeholder={t('step1.phonePlaceholder')}
                />
              </div>
              <Err msg={errors.phone} />
            </div>
          </div>
        </div>

        {/* ── Appointment ── */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 sm:p-5 shadow-sm">
          <SectionHead icon={Calendar} text={t('step1.appointmentTitle')} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text={`${t('step1.date')} *`} />
              <input
                type="date"
                value={formData.appointment_date || ''}
                onChange={e => setFormData({ ...formData, appointment_date: e.target.value })}
                className={inp(!!errors.appointment_date)}
                min={new Date().toISOString().split('T')[0]}
              />
              <Err msg={errors.appointment_date} />
            </div>
            <div>
              <Label text={`${t('step1.time')} *`} />
              <input
                type="time"
                value={formData.start_time || ''}
                onChange={e => setFormData({ ...formData, start_time: e.target.value })}
                className={inp(!!errors.start_time)}
              />
              <Err msg={errors.start_time} />
            </div>
          </div>
        </div>

        {/* ── HOME ONLY: Customer inputs their own address ── */}
        {isHome && (
          <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-4 sm:p-5 shadow-sm">
            <SectionHead
              icon={Navigation}
              text={t('step1.addressTitle')}
              color="bg-blue-600"
              badge={t('step1.required')}
            />
            <div className="space-y-3">

              {/* District dropdown */}
              <div>
                <Label text={`${t('step1.district')} *`} />
                <div className="relative">
                  <select
                    value={formData.district || ''}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className={`${inp(!!errors.district)} bg-white appearance-none pr-8`}
                  >
                    <option value="">{t('step1.selectDistrict')}</option>
                    {DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                </div>
                <Err msg={errors.district} />
              </div>

              {/* Sangkat / Village — user types freely */}
              <div>
                <Label text={t('step1.commune')} />
                <input
                  type="text"
                  value={formData.commune || ''}
                  onChange={e => setFormData({ ...formData, commune: e.target.value })}
                  className={`${inp(false)} bg-white`}
                  placeholder={t('step1.communePlaceholder')}
                />
              </div>

              {/* Street / House number — user types freely */}
              <div>
                <Label text={`${t('step1.street')} *`} />
                <input
                  type="text"
                  value={formData.street || ''}
                  onChange={e => setFormData({ ...formData, street: e.target.value })}
                  className={`${inp(!!errors.street)} bg-white`}
                  placeholder={t('step1.streetPlaceholder')}
                />
                <Err msg={errors.street} />
              </div>

              {/* Landmark — user types freely */}
              <div>
                <Label text={t('step1.landmark')} />
                <input
                  type="text"
                  value={formData.location_note || ''}
                  onChange={e => setFormData({ ...formData, location_note: e.target.value })}
                  className={`${inp(false)} bg-white`}
                  placeholder={t('step1.landmarkPlaceholder')}
                />
              </div>

              {/* Map pin button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5
                                    border-2 border-dashed border-blue-300 rounded-xl
                                    text-blue-600 font-bold text-xs
                                    hover:bg-blue-100 transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                {t('step1.selectOnMap')}
              </button>
            </div>
          </div>
        )}

        {/* ── Submit ── */}
        <button
          onClick={onNext}
          className="w-full group flex items-center justify-center gap-2 py-3.5
                        bg-gradient-to-r from-[#DC2626] to-[#F97316]
                        text-white font-black text-sm sm:text-base rounded-xl shadow-lg
                        hover:shadow-red-400/40 hover:scale-[1.02] active:scale-[0.98]
                        transition-all duration-200"
        >
          {t('step1.continueButton')}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
}