'use client';

import React, { useState } from 'react';
import {
  Star,
  Clock,
  ArrowLeft,
  Check,
  Shield,
  Award,
  Calendar,
  Package,
  Wrench,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

/* =======================
   Type Definitions
======================= */

type Service = {
  name: string;
  nameKh: string;
  description: string;
  duration: string;
  features: string[];
};

type Product = {
  name: string;
  nameKh: string;
  quantity: string;
  brand: string;
  image: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type Testimonial = {
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export default function PackageDetail() {
  const router = useRouter();
  useParams<{ id: string }>(); // kept for route compatibility

  /* =======================
     State (FIXED)
  ======================= */

  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<number>(0);

  /* =======================
     Mock Package Data
  ======================= */

  const pkg = {
    id: 1,
    title: 'Premium Complete',
    titleKh: 'កញ្ចប់ថែទាំពេញលេញ',
    code: '#PKG001',
    price: 89.99,
    originalPrice: 110.0,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800',
    ],
    fullDescription:
      'កញ្ចប់សេវាកម្មពេញលេញនេះរួមបញ្ចូលនូវសេវាកម្មចាំបាច់ទាំងអស់សម្រាប់ថែទាំរថយន្តរបស់អ្នក។',
    rating: 4.9,
    reviews: 289,
    duration: '2h',
    savings: 20,
    validUntil: '2024-12-31',

    services: [
      {
        name: 'Oil Change',
        nameKh: 'ផ្លាស់ប្តូរប្រេងម៉ាស៊ីន',
        description: 'ផ្លាស់ប្តូរប្រេងម៉ាស៊ីន និង Oil Filter',
        duration: '30 min',
        features: ['Premium Oil', 'Oil Filter', 'Engine Check'],
      },
      {
        name: 'Brake Clean',
        nameKh: 'សម្អាតហ្រ្រែក',
        description: 'សម្អាតប្រព័ន្ធហ្រ្រែក',
        duration: '45 min',
        features: ['Brake Cleaning', 'Brake Fluid Check', 'Pad Inspection'],
      },
      {
        name: 'Car Wash',
        nameKh: 'លាងរថយន្ត',
        description: 'លាងសម្អាតរថយន្ត',
        duration: '45 min',
        features: ['Exterior Wash', 'Interior Cleaning', 'Waxing'],
      },
    ] as Service[],

    products: [
      {
        name: 'Engine Oil',
        nameKh: 'ប្រេងម៉ាស៊ីន',
        quantity: '4L',
        brand: 'Castrol',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200',
      },
      {
        name: 'Brake Fluid',
        nameKh: 'ប្រេងហ្រ្រែក',
        quantity: '500ml',
        brand: 'DOT4',
        image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=200',
      },
    ] as Product[],

    benefits: [
      'សន្សំសំចៃ $20',
      'ការពារពេញលេញ',
      'ផលិតផលគុណភាពខ្ពស់',
      'ធានាការងារ 100%',
    ],

    faqs: [
      {
        question: 'តើកញ្ចប់នេះមានសុពលភាពរហូតដល់ពេលណា?',
        answer: 'រហូតដល់ថ្ងៃទី 31 ខែធ្នូ ឆ្នាំ 2024',
      },
    ] as FAQ[],

    testimonials: [
      {
        name: 'សុភា',
        rating: 5,
        comment: 'សេវាកម្មល្អណាស់!',
        date: '2024-01-10',
      },
    ] as Testimonial[],
  };

  /* =======================
     Helpers
  ======================= */

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  /* =======================
     Render
  ======================= */


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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Package Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <img
                                    src={pkg.gallery[selectedImage]}
                                    alt={pkg.title}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                                    សន្សំ ${pkg.savings}
                                </div>
                                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-current" />
                                    ពេញនិយម
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 p-4">
                                {pkg.gallery.map((img: string, idx: number) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Gallery ${idx + 1}`}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all ${selectedImage === idx ? 'ring-4 ring-red-600' : 'hover:opacity-75'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Package Info */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {pkg.code}
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        សុពលភាពដល់ {pkg.validUntil}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">{pkg.titleKh}</h1>
                                <p className="text-xl text-gray-600 mb-4">{pkg.title}</p>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                                        <span className="ml-1 font-bold text-lg">{pkg.rating}</span>
                                        <span className="text-gray-500 ml-1">({pkg.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-5 h-5 mr-2" />
                                        <span className="font-semibold">{pkg.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 pb-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800 mb-3">អំពីកញ្ចប់នេះ</h2>
                                <p className="text-gray-600 leading-relaxed">{pkg.fullDescription}</p>
                            </div>

                            {/* Included Services */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Wrench className="w-6 h-6 text-red-600" />
                                    សេវាកម្មដែលរួមបញ្ចូល
                                </h2>
                                <div className="space-y-3">
                                    {pkg.services.map((service: any, idx: number) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => toggleService(idx)}
                                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <Wrench className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-bold text-gray-800">{service.nameKh}</p>
                                                        <p className="text-sm text-gray-500">{service.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm text-gray-600">{service.duration}</span>
                                                    {expandedService === idx ? (
                                                        <ChevronUp className="w-5 h-5 text-gray-600" />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5 text-gray-600" />
                                                    )}
                                                </div>
                                            </button>

                                            {expandedService === idx && (
                                                <div className="px-4 pb-4 bg-gray-50">
                                                    <p className="text-gray-600 mb-3">{service.description}</p>
                                                    <div className="space-y-2">
                                                        {service.features.map((feature: string, fIdx: number) => (
                                                            <div key={fIdx} className="flex items-center gap-2">
                                                                <Check className="w-4 h-4 text-green-600" />
                                                                <span className="text-sm text-gray-700">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Included Products */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <ShoppingBag className="w-6 h-6 text-green-600" />
                                    ផលិតផលដែលរួមបញ្ចូល
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pkg.products.map((product: any, idx: number) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-800">{product.nameKh}</p>
                                                <p className="text-sm text-gray-600">{product.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.brand}</span>
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-yellow-600" />
                                    អត្ថប្រយោជន៍
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {pkg.benefits.map((benefit: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                                            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQs */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">សំណួរញឹកញាប់</h2>
                                <div className="space-y-4">
                                    {pkg.faqs.map((faq: any, idx: number) => (
                                        <div key={idx} className="bg-gray-50 p-5 rounded-lg">
                                            <h3 className="font-bold text-gray-800 mb-2">{faq.question}</h3>
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">ការវាយតម្លៃពីអតិថិជន</h2>
                                <div className="space-y-4">
                                    {pkg.testimonials.map((review: any, idx: number) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{review.name}</p>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_: any, i: number) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                            <div className="mb-6 pb-6 border-b">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-red-600">${pkg.price}</span>
                                            <span className="text-xl text-gray-400 line-through">${pkg.originalPrice}</span>
                                        </div>
                                        <p className="text-sm text-green-600 font-semibold mt-1">សន្សំ ${pkg.savings}!</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                                            -{Math.round((pkg.savings / pkg.originalPrice) * 100)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Calendar className="w-4 h-4 inline mr-2" />
                                        ជ្រើសរើសកាលបរិច្ឆេទ
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        ជ្រើសរើសម៉ោង
                                    </label>
                                    <select
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                    >
                                        <option value="">ជ្រើសរើសម៉ោង</option>
                                        <option value="08:00">08:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            <button className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors mb-4">
                                កក់កញ្ចប់នេះឥឡូវ
                            </button>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-sm">
                                    <Package className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-700">{pkg.services.length} សេវាកម្ម</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <ShoppingBag className="w-4 h-4 text-green-600" />
                                    <span className="text-gray-700">{pkg.products.length} ផលិតផល</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="text-gray-700">រយៈពេល {pkg.duration}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t">
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold">ធានាគុណភាព 100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}