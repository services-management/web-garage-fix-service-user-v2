import React, { useState } from 'react';
import { Building, Home } from 'lucide-react';
import ServiceCard from '../service/serviceCard';
import PackageCard from '../service/packageCard';
import ProductCard from '../service/productCard';

interface StepOneProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  selectedItem?: any; // The service/package/product that was selected
  itemType?: 'service' | 'package' | 'product'; // Type of item selected
}

export default function StepOne({ formData, setFormData, onNext, selectedItem, itemType }: StepOneProps) {
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.phone) newErrors.phone = 'សូមបញ្ចូលលេខទូរស័ព្ទ';
    if (!formData.full_name) newErrors.full_name = 'សូមបញ្ចូលឈ្មោះពេញ';
    if (!formData.car_make) newErrors.car_make = 'សូមជ្រើសរើសម៉ាកឡាន';
    if (!formData.car_model) newErrors.car_model = 'សូមបញ្ចូលម៉ូដែល';
    if (!formData.appointment_date) newErrors.appointment_date = 'សូមជ្រើសរើសកាលបរិច្ឆេទ';
    if (!formData.start_time) newErrors.start_time = 'សូមជ្រើសរើសម៉ោង';
    if (!formData.service_location) newErrors.service_location = 'សូមជ្រើសរើសទីតាំង';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">ព័ត៌មានផ្ទាល់ខ្លួន</h2>

      {/* Contact Info */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium mb-2">
          ទំនាក់ទំនងរបស់អ្នក
        </label>
        <div className="mb-4">
          <label className="block text-xs text-gray-600 mb-1">លេខទូរស័ព្ទ *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
            placeholder="010635568"
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">ឈ្មោះ *</label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
          />
          {errors.full_name && <p className="text-red-600 text-xs mt-1">{errors.full_name}</p>}
        </div>
      </div>

      {/* Car Info */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium mb-2">ព័ត៌មានរថយន្ត</label>
        <div className="mb-4">
          <label className="block text-xs text-gray-600 mb-1">ម៉ាកឡាន *</label>
          <input
            type="text"
            value={formData.car_make}
            onChange={(e) => setFormData({ ...formData, car_make: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
            placeholder="Toyota"
          />
          {errors.car_make && <p className="text-red-600 text-xs mt-1">{errors.car_make}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">ម៉ូដែល *</label>
            <input
              type="text"
              value={formData.car_model}
              onChange={(e) => setFormData({ ...formData, car_model: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
              placeholder="Camry"
            />
            {errors.car_model && <p className="text-red-600 text-xs mt-1">{errors.car_model}</p>}
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">ឆ្នាំ</label>
            <input
              type="text"
              value={formData.car_year || ''}
              onChange={(e) => setFormData({ ...formData, car_year: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
              placeholder="2020"
            />
          </div>
        </div>
      </div>

      {/* Appointment Time */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-sm font-medium mb-2">ពេលវេលានៃការណាត់ជួប</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">កាលបរិច្ឆេទ *</label>
            <input
              type="date"
              value={formData.appointment_date}
              onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
            />
            {errors.appointment_date && <p className="text-red-600 text-xs mt-1">{errors.appointment_date}</p>}
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">ម៉ោង *</label>
            <input
              type="time"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
            />
            {errors.start_time && <p className="text-red-600 text-xs mt-1">{errors.start_time}</p>}
          </div>
        </div>
      </div>

      {/* Selected Service/Package/Product Display */}
      {selectedItem && itemType && (
        <div className="mb-6 sm:mb-8">
          <label className="block text-sm font-medium mb-4">សេវាកម្មដែលបានជ្រើសរើស</label>
          <div className="max-w-md mx-auto">
            {itemType === 'service' && <ServiceCard service={selectedItem} />}
            {itemType === 'package' && <PackageCard pkg={selectedItem} />}
            {itemType === 'product' && <ProductCard product={selectedItem} />}
          </div>
        </div>
      )}

      {/* Service Location */}
      <div className="mb-6 sm:mb-8">
        <label className="block text-sm font-medium mb-2">ជ្រើសរើសទីតាំងសេវា</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, service_location: 'អាងរថយន្ត' })}
            className={`p-4 sm:p-6 border-2 rounded-lg flex flex-col items-center justify-center transition ${
              formData.service_location === 'អាងរថយន្ត'
                ? 'border-red-700 bg-red-50'
                : 'border-gray-300 hover:border-red-300'
            }`}
          >
            <Building className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-red-700" />
            <span className="font-medium text-sm sm:text-base">អាងរថយន្ត</span>
            <span className="text-xs text-red-700 mt-1">រកឡានមក</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, service_location: 'ផ្ទះរបស់អ្នក' })}
            className={`p-4 sm:p-6 border-2 rounded-lg flex flex-col items-center justify-center transition ${
              formData.service_location === 'ផ្ទះរបស់អ្នក'
                ? 'border-red-700 bg-red-50'
                : 'border-gray-300 hover:border-red-300'
            }`}
          >
            <Home className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-red-700" />
            <span className="font-medium text-sm sm:text-base">ផ្ទះរបស់អ្នក</span>
            <span className="text-xs text-red-700 mt-1">សេវាដឹកជញ្ជូន</span>
          </button>
        </div>
        {errors.service_location && <p className="text-red-600 text-xs mt-2">{errors.service_location}</p>}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-red-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-red-800 transition text-sm sm:text-base"
      >
        បន្ត
      </button>
    </div>
  );
}