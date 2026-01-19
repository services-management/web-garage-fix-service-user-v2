'use client';

import React, { useState } from 'react';
import { Star, ArrowLeft, Check, Shield, Package, Truck, Award, ShoppingCart, Heart, Share2, Plus, Minus } from 'lucide-react';

interface ProductDetailProps {
    productId?: string | number;
}
import { useRouter, useParams } from 'next/navigation';
export default function ProductDetail() {
    const params = useParams();
    const serviceId = params.id as string; // ✅ FIXED
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const router = useRouter();

    // In real app, fetch product data based on productId
    const product = {
        id: 1,
        name: 'Engine Oil 5W-30',
        nameKh: 'ប្រេងម៉ាស៊ីន 5W-30',
        code: '#P001',
        price: 50,
        originalPrice: 65,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
            'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800',
            'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800'
        ],
        description: 'ប្រេងម៉ាស៊ីនគុណភាពខ្ពស់',
        fullDescription: 'ប្រេងម៉ាស៊ីន Synthetic 5W-30 គុណភាពខ្ពស់ពី Brand ល្បីៗ សម្រាប់ការពារម៉ាស៊ីនរថយន្តរបស់អ្នកឱ្យប្រសើរជាងមុន។ ផលិតផលនេះត្រូវបានធ្វើតេស្តហើយទទួលបានការយល់ព្រមពីក្រុមហ៊ុនផលិតរថយន្តធំៗ។',
        rating: 4.9,
        reviews: 320,
        sales: 850,
        inStock: true,
        stockQuantity: 45,
        brand: 'Castrol',
        volume: '4 Liters',
        type: 'Full Synthetic',
        features: [
            'ការពារម៉ាស៊ីនពីការរំខានខ្ពស់',
            'សន្សំសំចៃប្រេងឥន្ធនៈរហូតដល់ 3%',
            'កាត់បន្ថយការបំពុលបរិស្ថាន',
            'អាចប្រើបានសម្រាប់រថយន្តទាំងអស់',
            'អាយុកាលវែង - រហូតដល់ 10,000km',
            'លំហូរប្រេងល្អនៅសីតុណ្ហភាពទាប'
        ],
        specifications: {
            'ប្រភេទ': 'Full Synthetic',
            'Viscosity': '5W-30',
            'បរិមាណ': '4 Liters',
            'Brand': 'Castrol',
            'API Classification': 'SN',
            'ACEA': 'A3/B4',
            'ប្រទេសផលិត': 'Thailand'
        },
        warranty: '12 ខែ',
        shipping: 'ដឹកជញ្ជូនដោយឥតគិតថ្លៃ ទិញលើសពី $100',
        reviews_data: [
            {
                name: 'សុខា',
                rating: 5,
                date: '2024-01-15',
                comment: 'ប្រេងគុណភាពល្អណាស់ រថយន្តរបស់ខ្ញុំដំណើរការរលូនជាងមុន។',
                helpful: 15
            },
            {
                name: 'ដារ៉ា',
                rating: 5,
                date: '2024-01-10',
                comment: 'តម្លៃសមរម្យ សេវាកម្មល្អ។ នឹងទិញម្តងទៀត។',
                helpful: 12
            }
        ],
        relatedProducts: [
            { id: 2, name: 'Oil Filter', nameKh: 'ថ្នាំចម្រោះប្រេង', price: 15, image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400' },
            { id: 3, name: 'Air Filter', nameKh: 'ថ្នាំចម្រោះខ្យល់', price: 25, image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400' }
        ]
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
            setQuantity(newQuantity);
        }
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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <img
                                    src={product.gallery[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-96 object-cover"
                                />
                                {product.originalPrice > product.price && (
                                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-2 p-4">
                                {product.gallery.map((img: string, idx: number) => (
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

                        {/* Product Features */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">លក្ខណៈពិសេស</h3>
                            <div className="space-y-3">
                                {product.features.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Info & Purchase */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            {/* Product Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {product.brand}
                                    </span>
                                    <span className="text-gray-500">{product.code}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.nameKh}</h1>
                                <p className="text-xl text-gray-600 mb-4">{product.name}</p>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="ml-1 font-bold text-lg">{product.rating}</span>
                                        <span className="text-gray-500 ml-1">({product.reviews} reviews)</span>
                                    </div>
                                    <div className="h-6 w-px bg-gray-300"></div>
                                    <span className="text-gray-600">{product.sales}+ លក់</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-4xl font-bold text-red-600">${product.price}</span>
                                    {product.originalPrice > product.price && (
                                        <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                                    )}
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-2 mb-6">
                                    {product.inStock ? (
                                        <>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span className="text-green-600 font-semibold">មានក្នុងស្តុក ({product.stockQuantity} units)</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <span className="text-red-600 font-semibold">អស់ពីស្តុក</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6 pb-6 border-b">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">អំពីផលិតផល</h3>
                                <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">បរិមាណ:</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="px-6 py-2 font-bold text-lg border-x-2 border-gray-300">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                            disabled={quantity >= product.stockQuantity}
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <span className="text-gray-600">សរុប: <span className="font-bold text-xl text-red-600">${(product.price * quantity).toFixed(2)}</span></span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 mb-6">
                                <button className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    បន្ថែមទៅកន្ត្រក
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                        <Heart className="w-5 h-5" />
                                        ចូលចិត្ត
                                    </button>
                                    <button className="border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                        <Share2 className="w-5 h-5" />
                                        ចែករំលែក
                                    </button>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Truck className="w-6 h-6 text-green-600" />
                                    <div>
                                        <p className="font-semibold text-sm">ដឹកជញ្ជូនឥតគិតថ្លៃ</p>
                                        <p className="text-xs text-gray-500">ទិញលើសពី $100</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="font-semibold text-sm">ធានា {product.warranty}</p>
                                        <p className="text-xs text-gray-500">ផលិតផលពិតប្រាកដ</p>
                                    </div>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">លក្ខណៈបច្ចេកទេស</h3>
                                <div className="space-y-2">
                                    {Object.entries(product.specifications).map(([key, value]: [string, any], idx: number) => (
                                        <div key={idx} className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="text-gray-600">{key}:</span>
                                            <span className="font-semibold text-gray-800">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">ការវាយតម្លៃ & ពិនិត្យ</h2>
                        <button className="text-red-600 font-semibold hover:underline">បន្ថែមការវាយតម្លៃ</button>
                    </div>

                    <div className="space-y-6">
                        {product.reviews_data.map((review: any, idx: number) => (
                            <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{review.name}</p>
                                                <div className="flex items-center gap-2">
                                                    {[...Array(5)].map((_: any, i: number) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <button className="text-sm text-gray-600 hover:text-red-600">
                                    👍 មានប្រយោជន៍ ({review.helpful})
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">ផលិតផលទាក់ទង</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {product.relatedProducts.map((item: any) => (
                            <div key={item.id} className="group cursor-pointer">
                                <div className="bg-gray-100 rounded-lg overflow-hidden mb-3">
                                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-1">{item.nameKh}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.name}</p>
                                <p className="text-lg font-bold text-red-600">${item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}