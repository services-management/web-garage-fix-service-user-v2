'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, TrendingUp, ChevronRight, Award, Tag, Package, Wrench, ShoppingBag, Link } from 'lucide-react';
import ServiceCard from '../../../components/service/serviceCard';
import ProductCard from '../../../components/service/productCard';
import PackageCard from '../../../components/service/packageCard';

export default function Service() {
    const [activeTab, setActiveTab] = useState('services');
    const router = useRouter();

    // Navigation handlers
    const handleServiceClick = (serviceId: number) => {
        router.push(`/service/service/${serviceId}`);
    };

    const handleProductClick = (productId: number) => {
        router.push(`/service/product/${productId}`);
    };

    const handlePackageClick = (packageId: number) => {
        router.push(`/service/package/${packageId}`);
    };

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

                {/* Content */}
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
                        {tabs.map((tab: any) => {
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
                                {popularServices.map((service: any, index: number) => (
                                    <div key={service.id} onClick={() => handleServiceClick(service.id)} className="cursor-pointer">
                                        <ServiceCard 
                                            service={service} 
                                            isPopular={true} 
                                            rank={index + 1} 
                                        />
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
                                {services.map((service: any) => (
                                    <div key={service.id} onClick={() => handleServiceClick(service.id)} className="cursor-pointer">
                                        <ServiceCard 
                                            service={service} 
                                            isPopular={false} 
                                        />
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
                                {popularProducts.map((product: any, index: number) => (
                                    <div key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                                        <ProductCard 
                                            product={product} 
                                            isPopular={true} 
                                            rank={index + 1} 
                                        />
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
                                {products.map((product: any) => (
                                    <div key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                                        <ProductCard 
                                            product={product} 
                                            isPopular={false} 
                                        />
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
                                {popularPackages.map((pkg: any) => (
                                    <div key={pkg.id} onClick={() => handlePackageClick(pkg.id)} className="cursor-pointer">
                                        <PackageCard 
                                            pkg={pkg} 
                                            isPopular={true} 
                                        />
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
                                {packages.map((pkg: any) => (
                                    <div key={pkg.id} onClick={() => handlePackageClick(pkg.id)} className="cursor-pointer">
                                        <PackageCard 
                                            pkg={pkg} 
                                            isPopular={false} 
                                        />
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