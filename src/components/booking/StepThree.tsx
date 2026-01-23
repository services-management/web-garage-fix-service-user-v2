import React from 'react';

interface StepThreeProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepThree({ formData, onBack, onSubmit }: StepThreeProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">សូមពិនិត្យមើលព័ត៌មាន</h2>

      {/* Success Message */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">កាលបរិច្ឆេទបានជោគជ័យ</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-2">
          កាលវិភាគដែលអ្នកបានកក់ត្រូវបានកត់ត្រាយ៉ាងជោគជ័យ
        </p>
        <div className="bg-pink-100 inline-block px-4 sm:px-6 py-2 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600">លេខកាលវិភាគរបស់អ្នក</p>
          <p className="text-lg sm:text-xl font-bold text-red-700">APT-2023-1026</p>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 border-b pb-2">
          <h3 className="font-semibold text-sm sm:text-base">ការណាត់ជួប</h3>
          <span className="text-xs sm:text-sm text-gray-500">លក្ខខណ្ឌ និងបទប្បញ្ញត្តិ</span>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b gap-1 sm:gap-0">
            <span className="text-gray-600 text-sm sm:text-base">កាលបរិច្ឆេទ</span>
            <span className="font-medium text-sm sm:text-base">
              {formData.appointment_date ? new Date(formData.appointment_date).toLocaleDateString('km-KH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'N/A'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b gap-1 sm:gap-0">
            <span className="text-gray-600 text-sm sm:text-base">ម៉ោងណាត់ជួប</span>
            <span className="font-medium text-sm sm:text-base">
              {formData.start_time ? `${formData.start_time}` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Customer & Car Info */}
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-gray-600 mb-1">ឈ្មោះអតិថិជន</p>
            <p className="font-medium break-words">{formData.full_name}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">លេខទូរស័ព្ទ</p>
            <p className="font-medium">{formData.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">ម៉ាកឡាន</p>
            <p className="font-medium">{formData.car_make}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">ម៉ូដែល</p>
            <p className="font-medium">{formData.car_model}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-gray-600 mb-1">ទីតាំងសេវា</p>
            <p className="font-medium">{formData.service_location}</p>
          </div>
          {formData.note && (
            <div className="sm:col-span-2">
              <p className="text-gray-600 mb-1">កំណត់ចំណាំ</p>
              <p className="font-medium break-words">{formData.note}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onBack}
          className="w-full sm:flex-1 bg-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-sm sm:text-base"
        >
          ថយក្រោយ
        </button>
        <button
          onClick={onSubmit}
          className="w-full sm:flex-1 bg-red-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-red-800 transition text-sm sm:text-base"
        >
          បញ្ជាក់ការណាត់ជួប
        </button>
      </div>
    </div>
  );
}