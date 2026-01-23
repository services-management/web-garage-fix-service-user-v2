import React, { useState } from 'react';
import { MapPin, Phone, User, Clock, FileText } from 'lucide-react';

interface StepTwoProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwo({ formData, setFormData, onNext, onBack }: StepTwoProps) {
  const [services] = useState([
    { id: 1, name: 'សេវាផ្លាស់ប្តូរប្រេង', description: 'Engine Oil Change', price: 'XX$' },
    { id: 2, name: 'សេវាពិនិត្យមុនធ្វើដំណើរ', description: 'Tire rotation included', price: 'XX$' },
    { id: 3, name: 'សេវាជួសជុលម៉ាស៊ីន', description: 'Engine repair', price: 'XX$' },
  ]);

  const [contactInfo] = useState([
    { icon: MapPin, label: 'អាសយដ្ឋាន', value: 'St 26 Boeng Kk' },
    { icon: Phone, label: 'លេខទូរស័ព្ទ', value: '010-XXX-XXX' },
    { icon: User, label: 'អ្នកទទួលខុសត្រូវ', value: 'Kona, spk-bonna' },
    { icon: Clock, label: 'ម៉ោងបើកទ្វារ', value: '010-XXX-XXX' },
  ]);

  const toggleService = (serviceId: number) => {
    const existingIndex = formData.items.findIndex((item: any) => item.service_id === serviceId);
    let newItems = [...formData.items];
    
    if (existingIndex >= 0) {
      newItems.splice(existingIndex, 1);
    } else {
      newItems.push({ service_id: serviceId, product_id: 0, quantity: 1 });
    }
    
    setFormData({ ...formData, items: newItems });
  };

  const isSelected = (serviceId: number) => {
    return formData.items.some((item: any) => item.service_id === serviceId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">សូមជ្រើសរើសសេវាដែលអ្នកចង់បាន</h2>

      {/* Services List */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h3 className="font-semibold text-sm sm:text-base">បង្ហាញសេវាកម្មដែលមាន</h3>
          <button className="text-red-700 text-xs sm:text-sm border border-red-700 px-3 py-1.5 sm:py-1 rounded self-start sm:self-auto">
            + កាលបរិច្ឆេទសេវា
          </button>
        </div>
        
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition ${
                isSelected(service.id)
                  ? 'border-red-700 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center flex-1 min-w-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-700 mr-2 sm:mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{service.name}</p>
                    <p className="text-xs text-gray-500 truncate">{service.description}</p>
                  </div>
                </div>
                <span className="font-bold text-red-700 text-sm sm:text-base ml-2 flex-shrink-0">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-4 sm:mb-6 bg-gray-50 p-3 sm:p-4 rounded-lg">
        <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">ការទំនាក់ទំនង</h3>
        <div className="space-y-2 sm:space-y-3">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-center bg-red-50 p-2.5 sm:p-3 rounded-lg">
              <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-700 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-xs sm:text-sm truncate">{info.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mb-4 sm:mb-6">
        <label className="block font-semibold mb-2 text-sm sm:text-base">
          កំណត់ចំណាំរបស់អ្នកសម្រាប់ការណាត់ (Optional)
        </label>
        <textarea
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
          rows={4}
          placeholder="សូមបញ្ចូលកំណត់ចំណាំរបស់អ្នកនៅទីនេះ"
        />
      </div>

      {/* Summary */}
      <div className="mb-6 sm:mb-8 border-t pt-3 sm:pt-4">
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>សេវាសរុប</span>
          <span className="font-bold">XX$</span>
        </div>
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>ការដឹកជញ្ជូន</span>
          <span className="font-bold">$</span>
        </div>
        <div className="flex justify-between text-base sm:text-lg font-bold text-red-700 pt-2 border-t">
          <span>សរុបរួម</span>
          <span>XX$</span>
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
          onClick={onNext}
          disabled={formData.items.length === 0}
          className="w-full sm:flex-1 bg-red-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-red-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          បន្ត
        </button>
      </div>
    </div>
  );
}