'use client';

import React, { useState } from 'react';
import {
  Star,
  Clock,
  Award,
  ArrowLeft,
  Check,
  Shield,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function ServiceDetail() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string; // ✅ FIXED

  const [selectedImage, setSelectedImage] = useState(0);

  // mock service data
  const service = {
    id: serviceId,
    title: 'ការផ្លាស់ប្តូរប្រេងម៉ាស៊ីន',
    titleEn: 'Premium Oil Change',
    code: '#0001',
    price: 25.0,
    rating: 4.8,
    reviews: 124,
    duration: '30 min',
    bookings: 450,
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800',
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    ],
    description: 'ប្រេងម៉ាស៊ីនគុណភាពខ្ពស់ សម្រាប់ការពារម៉ាស៊ីនរថយន្តរបស់អ្នក',
    fullDescription:
      'សេវាកម្មផ្លាស់ប្តូរប្រេងម៉ាស៊ីនគុណភាពខ្ពស់ ដោយប្រើប្រេងដែលមានស្តង់ដារអន្តរជាតិ និងបច្ចេកទេសជំនាញ។',
    features: [
      'ប្រេងម៉ាស៊ីនគុណភាពខ្ពស់',
      'ផ្លាស់ប្តូរ Oil Filter',
      'ពិនិត្យប្រព័ន្ធម៉ាស៊ីន',
      'បំពេញប្រេងត្រឹមត្រូវ',
    ],
    benefits: [
      'បង្កើនអាយុកាលម៉ាស៊ីន',
      'កាត់បន្ថយការប្រើប្រាស់ប្រេង',
      'បង្កើនសមត្ថភាពម៉ាស៊ីន',
    ],
    technicians: [
      {
        name: 'សុខា',
        experience: '5 years',
        specialty: 'Engine Specialist',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          onClick={() => router.push('/service')}
          className="flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          ត្រឡប់ទៅសេវាកម្ម
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div>
            <img
              src={service.gallery[selectedImage]}
              className="w-full h-[420px] object-cover rounded-2xl shadow"
              alt={service.title}
            />
            <div className="flex gap-3 mt-4">
              {service.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(index)}
                  className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === index
                      ? 'border-red-500'
                      : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {service.title}
            </h1>
            <p className="text-gray-500 mt-1">{service.titleEn}</p>

            <div className="flex items-center mt-4 gap-4">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 mr-1 fill-yellow-500" />
                {service.rating}
              </div>
              <span className="text-gray-500">
                ({service.reviews} reviews)
              </span>
            </div>

            <p className="mt-6 text-gray-700">{service.fullDescription}</p>

            <div className="mt-6 space-y-3">
              {service.features.map((item, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="text-3xl font-bold text-red-600">
                ${service.price}
              </div>
              <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
                កក់ឥឡូវនេះ
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                {service.duration}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                {service.bookings}+ bookings
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5" />
                Certified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
