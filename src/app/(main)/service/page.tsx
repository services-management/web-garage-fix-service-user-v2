'use client';

import React, { useState } from 'react';
import { Star, Clock, TrendingUp, ChevronRight, Award, Tag, Package, Wrench, ShoppingBag, Link } from 'lucide-react';

export default function Service() {
    const [activeTab, setActiveTab] = useState('services');

    const popularServices = [
        {
            id: 1,
            title: 'ការផ្លាស់ប្តូរប្រេងម៉ាស៊ីន',
            titleEn: 'Premium Oil Change',
            code: '#0001',
            price: 25.00,
            image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500',
            description: 'ប្រេងប្រកបដោយគុណភាពខ្ពស់សមរម្យសម្រាប់រថយន្តប្រើប្រាស់ប្រេងសាំង',
            rating: 4.8,
            reviews: 124,
            duration: '30 min',
            bookings: 450
        },
        {
            id: 2,
            title: 'សម្អាតហ្រ្រែក',
            titleEn: 'Brake Cleaning',
            code: '#0002',
            price: 35.00,
            image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500',
            description: 'សេវាកម្មសម្អាតប្រព័ន្ធហ្រ្រែកឱ្យដំណើរការប្រសើរ',
            rating: 4.9,
            reviews: 98,
            duration: '45 min',
            bookings: 380
        },
        {
            id: 3,
            title: 'ពិនិត្យម៉ាស៊ីន',
            titleEn: 'Engine Check',
            code: '#0003',
            price: 40.00,
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
            description: 'ពិនិត្យម៉ាស៊ីនឱ្យបានហ្មត់ចត់និងជូនដំណឹងអំពីបញ្ហា',
            rating: 4.7,
            reviews: 156,
            duration: '60 min',
            bookings: 290
        }
    ];

    const services = [
        {
            id: 4,
            title: 'លាងរថយន្តពិសេស',
            code: '#0004',
            price: 15.00,
            image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500',
            description: 'សេវាកម្មលាងរថយន្តពិសេស',
            rating: 4.6,
            reviews: 210,
            duration: '40 min'
        },
        {
            id: 5,
            title: 'ផ្លាស់ប្តូរសំបកកង់',
            code: '#0005',
            price: 80.00,
            image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500',
            description: 'សេវាកម្មផ្លាស់ប្តូរសំបកកង់',
            rating: 4.8,
            reviews: 145,
            duration: '50 min'
        },
        {
            id: 6,
            title: 'ពិនិត្យអេឡិចត្រូនិច',
            code: '#0006',
            price: 50.00,
            image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500',
            description: 'ពិនិត្យប្រព័ន្ធអេឡិចត្រូនិច',
            rating: 4.5,
            reviews: 87,
            duration: '45 min'
        }
    ];

    const popularProducts = [
        {
            id: 1,
            name: 'Engine Oil 5W-30',
            nameKh: 'ប្រេងម៉ាស៊ីន 5W-30',
            code: '#P001',
            price: 50,
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
            description: 'ប្រេងម៉ាស៊ីនគុណភាពខ្ពស់',
            rating: 4.9,
            reviews: 320,
            sales: 850
        },
        {
            id: 2,
            name: 'Brake Fluid DOT4',
            nameKh: 'ប្រេងហ្រ្រែក DOT4',
            code: '#P002',
            price: 120,
            image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500',
            description: 'ប្រេងហ្រ្រែកគុណភាពខ្ពស់',
            rating: 4.8,
            reviews: 245,
            sales: 620
        },
        {
            id: 3,
            name: 'Air Filter',
            nameKh: 'ផ្ទាំងចម្រោះខ្យល់',
            code: '#P003',
            price: 35,
            image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500',
            description: 'ផ្ទាំងចម្រោះខ្យល់គុណភាពល្អ',
            rating: 4.7,
            reviews: 189,
            sales: 510
        }
    ];

    const products = [
        {
            id: 4,
            name: 'Car Shampoo',
            nameKh: 'សាប៊ូលាងរថយន្ត',
            code: '#P004',
            price: 25,
            image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500',
            description: 'សាប៊ូលាងរថយន្តពិសេស',
            rating: 4.6,
            reviews: 167
        },
        {
            id: 5,
            name: 'Coolant',
            nameKh: 'ទឹកត្រជាក់',
            code: '#P005',
            price: 45,
            image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500',
            description: 'ទឹកត្រជាក់ម៉ាស៊ីន',
            rating: 4.7,
            reviews: 134
        },
        {
            id: 6,
            name: 'Tire Shine',
            nameKh: 'ថ្នាំស្ប្រៃកង់',
            code: '#P006',
            price: 18,
            image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500',
            description: 'ថ្នាំស្ប្រៃកង់ឱ្យស្អាត',
            rating: 4.5,
            reviews: 92
        }
    ];

    const popularPackages = [
        {
            id: 1,
            title: 'Premium Complete',
            titleKh: 'កញ្ចប់ថែទាំពេញលេញ',
            code: '#PKG001',
            price: 89.99,
            originalPrice: 110.00,
            image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500',
            description: 'កញ្ចប់សេវាកម្មពេញលេញ',
            services: ['Oil Change', 'Brake Clean', 'Car Wash'],
            products: ['Engine Oil', 'Brake Fluid'],
            rating: 4.9,
            reviews: 289,
            duration: '2h',
            savings: 20
        },
        {
            id: 2,
            title: 'Essential',
            titleKh: 'កញ្ចប់មូលដ្ឋាន',
            code: '#PKG002',
            price: 45.00,
            originalPrice: 55.00,
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
            description: 'កញ្ចប់សេវាកម្មមូលដ្ឋាន',
            services: ['Oil Change', 'Filter Check'],
            products: ['Engine Oil'],
            rating: 4.7,
            reviews: 198,
            duration: '1.5h',
            savings: 10
        }
    ];

    const packages = [
        {
            id: 3,
            title: 'Brake System',
            titleKh: 'កញ្ចប់ប្រព័ន្ធហ្រ្រែក',
            code: '#PKG003',
            price: 65.00,
            originalPrice: 75.00,
            image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500',
            description: 'កញ្ចប់ថែទាំប្រព័ន្ធហ្រ្រែក',
            services: ['Brake Clean', 'Pad Check'],
            products: ['Brake Fluid'],
            rating: 4.8,
            reviews: 156,
            duration: '1.5h',
            savings: 10
        },
        {
            id: 4,
            title: 'Appearance',
            titleKh: 'កញ្ចប់សម្អាត',
            code: '#PKG004',
            price: 55.00,
            originalPrice: 65.00,
            image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500',
            description: 'កញ្ចប់សម្អាតរថយន្ត',
            services: ['Wash', 'Waxing'],
            products: ['Shampoo', 'Wax'],
            rating: 4.6,
            reviews: 134,
            duration: '2h',
            savings: 10
        }
    ];

    const tabs = [
        { id: 'services', label: 'សេវាកម្ម', labelEn: 'Services', icon: Wrench },
        { id: 'products', label: 'ផលិតផល', labelEn: 'Products', icon: ShoppingBag },
        { id: 'packages', label: 'កញ្ចប់សេវា', labelEn: 'Packages', icon: Package }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Herobanner */}
            <section className="relative h-[50vh] bg-gray-900">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/home/servicebanner.webp')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content - REMOVED 'container' and 'mx-auto' for full width */}
                <div className="relative px-4 max-w-7xl mx-auto h-full flex items-center">
                    <div className="max-w-2xl text-white">
                         <h1 className="text-4xl md:text-5xl font-bold mb-4">សេវាកម្មថែទាំរថយន្ត</h1>
                        <p className="text-lg md:text-xl mb-8 opacity-90">ជ្រើសរើសសេវាកម្មដែលសមស្របបំផុត</p>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-lg rounded-lg">
                            ស្វែងរកសេវាកម្ម
                        </button>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-1 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-semibold text-base whitespace-nowrap transition-all duration-200 border-b-4 ${activeTab === tab.id
                                            ? 'border-red-600 text-red-600 bg-red-50'
                                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <div className="flex flex-col items-start">
                                        <span>{tab.label}</span>
                                        <span className="text-xs opacity-75">{tab.labelEn}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Services Tab */}
                {activeTab === 'services' && (
                    <div className="space-y-16">
                        {/* Popular Services */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <TrendingUp className="w-8 h-8 text-red-600" />
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">សេវាកម្មពេញនិយម</h2>
                                    </div>
                                    <p className="text-gray-600">សេវាកម្មដែលត្រូវបានកក់ច្រើនបំផុត</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {popularServices.map((service, index) => (
                                    <div key={service.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                                        <div className="relative overflow-hidden">
                                            <img src={service.image} alt={service.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" />
                                            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                                                <Award className="w-4 h-4" />
                                                #{index + 1} ពេញនិយម
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                                                {service.bookings}+ កក់
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                                                <span className="text-sm text-gray-500">{service.code}</span>
                                            </div>
                                            <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="flex items-center">
                                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                    <span className="ml-1 font-semibold">{service.rating}</span>
                                                    <span className="text-gray-500 text-sm ml-1">({service.reviews})</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">{service.duration}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <span className="text-3xl font-bold text-red-600">${service.price}</span>
                                                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                                                    កក់ឥឡូវ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* All Services */}
                        <section>
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">សេវាកម្មទាំងអស់</h2>
                                <p className="text-gray-600">ស្វែងរកសេវាកម្មផ្សេងទៀតដែលអ្នកត្រូវការ</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                                            <p className="text-gray-600 text-sm mb-3">{service.description}</p>

                                            <div className="flex items-center gap-3 mb-4 text-sm">
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="ml-1 font-semibold">{service.rating}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    <span>{service.duration}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-red-600">${service.price}</span>
                                                <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm">
                                                    កក់
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="space-y-16">
                        {/* Popular Products */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Tag className="w-8 h-8 text-red-600" />
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">ផលិតផលពេញនិយម</h2>
                                    </div>
                                    <p className="text-gray-600">ផលិតផលដែលត្រូវបានទិញច្រើនបំផុត</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {popularProducts.map((product, index) => (
                                    <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                                        <div className="relative overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" />
                                            <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" />
                                                លក់ដាច់ #{index + 1}
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                                                {product.sales}+ លក់
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-gray-800">{product.nameKh}</h3>
                                                <span className="text-sm text-gray-500">{product.code}</span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-3">{product.name}</p>
                                            <p className="text-gray-600 mb-4">{product.description}</p>

                                            <div className="flex items-center mb-4">
                                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                <span className="ml-1 font-semibold">{product.rating}</span>
                                                <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <span className="text-3xl font-bold text-red-600">${product.price}</span>
                                                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                                                    ទិញឥឡូវ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* All Products */}
                        <section>
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">ផលិតផលទាំងអស់</h2>
                                <p className="text-gray-600">រកឃើញផលិតផលផ្សេងទៀត</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">{product.nameKh}</h3>
                                            <p className="text-gray-500 text-sm mb-3">{product.name}</p>
                                            <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                                            <div className="flex items-center mb-4 text-sm">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="ml-1 font-semibold">{product.rating}</span>
                                                <span className="text-gray-500 ml-1">({product.reviews})</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-red-600">${product.price}</span>
                                                <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
                                                    ទិញ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                    <div className="space-y-16">
                        {/* Popular Packages */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Award className="w-8 h-8 text-red-600" />
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">កញ្ចប់សេវាពេញនិយម</h2>
                                    </div>
                                    <p className="text-gray-600">កញ្ចប់សេវាដែលត្រូវបានជ្រើសរើសច្រើន</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {popularPackages.map((pkg) => (
                                    <div key={pkg.id} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-red-100">
                                        <div className="relative overflow-hidden">
                                            <img src={pkg.image} alt={pkg.title} className="w-full h-64 object-cover" />
                                            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                                                សន្សំ ${pkg.savings}
                                            </div>
                                            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                                                <Star className="w-4 h-4 fill-current" />
                                                ពេញនិយម
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{pkg.titleKh}</h3>
                                                    <p className="text-gray-600">{pkg.title}</p>
                                                </div>
                                                <span className="text-sm text-gray-500">{pkg.code}</span>
                                            </div>

                                            <p className="text-gray-600 mb-6">{pkg.description}</p>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="flex items-center">
                                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                    <span className="ml-1 font-semibold">{pkg.rating}</span>
                                                    <span className="text-gray-500 text-sm ml-1">({pkg.reviews})</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">{pkg.duration}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-4 mb-6">
                                                <div>
                                                    <p className="font-bold text-gray-800 mb-2">សេវាកម្ម:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {pkg.services.map((service, idx) => (
                                                            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                                {service}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 mb-2">ផលិតផល:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {pkg.products.map((product, idx) => (
                                                            <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                                {product}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-3xl font-bold text-red-600">${pkg.price}</span>
                                                        <span className="text-gray-400 line-through">${pkg.originalPrice}</span>
                                                    </div>
                                                </div>
                                                <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                                                    កក់ឥឡូវ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* All Packages */}
                        <section>
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">កញ្ចប់សេវាទាំងអស់</h2>
                                <p className="text-gray-600">រកឃើញកញ្ចប់សេវាផ្សេងទៀត</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {packages.map((pkg) => (
                                    <div key={pkg.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                                        <div className="relative">
                                            <img src={pkg.image} alt={pkg.title} className="w-full h-56 object-cover" />
                                            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                                                សន្សំ ${pkg.savings}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{pkg.titleKh}</h3>
                                                    <p className="text-gray-500">{pkg.title}</p>
                                                </div>
                                                <span className="text-sm text-gray-500">{pkg.code}</span>
                                            </div>

                                            <p className="text-gray-600 mb-4">{pkg.description}</p>

                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="ml-1 font-semibold">{pkg.rating}</span>
                                                    <span className="text-gray-500 text-sm ml-1">({pkg.reviews})</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">{pkg.duration}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-4">
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm mb-1">សេវាកម្ម:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {pkg.services.map((service, idx) => (
                                                            <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                                                {service}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm mb-1">ផលិតផល:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {pkg.products.map((product, idx) => (
                                                            <span key={idx} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                                                {product}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl font-bold text-red-600">${pkg.price}</span>
                                                        <span className="text-gray-400 line-through text-sm">${pkg.originalPrice}</span>
                                                    </div>
                                                </div>
                                                <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                                                    កក់ឥឡូវ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </div>

            {/* Footer CTA */}
            <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">រកមិនឃើញសេវាកម្មដែលអ្នកត្រូវការទេ?</h2>
                    <p className="text-xl mb-8 opacity-90">ទាក់ទងមកយើងខ្ញុំដើម្បីទទួលបានប្រឹក្សាយោបល់</p>
                    <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                        ទាក់ទងមកយើងខ្ញុំ
                    </button>
                </div>
            </section>
        </div>
    );
}