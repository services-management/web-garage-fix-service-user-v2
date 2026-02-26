'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Star, Clock, TrendingUp, ChevronRight, Award, Tag, Package,
    Wrench, ShoppingBag, Home, Building2, Sparkles, Zap, Shield,
    Droplet, Filter, Wind, Car, Calendar, MapPin, CheckCircle2,
    ArrowRight, Play, ChevronDown, User, Settings
} from 'lucide-react';
import ProductCard from '../../../components/service/productCard';
import { getAllProducts } from '@/lib/api/product';

// Tab Configuration
const TABS = [
    {
        id: 'oil-home',
        label: 'កក់សេវាកម្មប្តូរប្រេងនៅផ្ទះ',
        labelEn: 'Booking service Oil Change at Home',
        icon: Home,
        color: 'from-[#3B82F6] to-[#2563EB]'
    },
    {
        id: 'oil-garage',
        label: 'កក់សេវាកម្មប្តូរប្រេងនៅហាង',
        labelEn: 'Booking service Oil Change at Garage',
        icon: Building2,
        color: 'from-[#A855F7] to-[#9333EA]'
    },
    {
        id: 'products',
        label: 'ទិញផលិតផល',
        labelEn: 'Order Products',
        icon: ShoppingBag,
        color: 'from-[#10B981] to-[#059669]'
    }
];

// Car Makes
const CAR_MAKES = [
    'Toyota', 'Honda', 'Mazda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai',
    'Kia', 'Mercedes-Benz', 'BMW', 'Audi', 'Lexus', 'Mitsubishi', 'Suzuki',
    'Volkswagen', 'Subaru', 'Isuzu', 'Volvo', 'Land Rover', 'Jeep'
];

// Mock data for car models by make
const CAR_MODELS: { [key: string]: string[] } = {
    'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Tacoma', 'Tundra'],
    'Honda': ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V'],
    'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'CX-30', 'MX-5'],
    'Default': ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Coupe']
};

// Fuel Types
const FUEL_TYPES = [
    'Gasoline (Regular)',
    'Gasoline (Premium)',
    'Diesel',
    'Hybrid',
    'Electric',
    'Plug-in Hybrid'
];

// Engine Types by Fuel
const ENGINE_TYPES: { [key: string]: string[] } = {
    'Gasoline (Regular)': ['1.5L 4-Cylinder', '2.0L 4-Cylinder', '2.5L 4-Cylinder', '3.5L V6'],
    'Gasoline (Premium)': ['2.0L Turbo 4-Cylinder', '3.0L V6', '3.5L V6 Turbo', '5.0L V8'],
    'Diesel': ['2.0L 4-Cylinder Diesel', '2.8L 4-Cylinder Diesel', '3.0L V6 Diesel'],
    'Hybrid': ['1.8L Hybrid', '2.5L Hybrid'],
    'Electric': ['Electric Motor'],
    'Plug-in Hybrid': ['2.5L PHEV']
};

// Service Package Options
const SERVICE_OPTIONS = [
    {
        id: 'engine-oil',
        title: 'ប្រេងម៉ាស៊ីន 5W-40',
        titleEn: 'Engine Oil 5W-40',
        price: 55,
        included: true,
        required: true
    },
    {
        id: 'transmission-fluid',
        title: 'ប្រេងប្រអប់លេខ (Dexron iii)',
        titleEn: 'Transmission Fluid (Dexron iii)',
        price: 60,
        included: false,
        required: false
    },
    {
        id: 'engine-flush',
        title: 'ថ្នាំសម្អាតម៉ាស៊ីន',
        titleEn: 'Engine Flush',
        price: 13,
        included: false,
        required: false
    },
    {
        id: 'brake-fluid',
        title: 'ប្រេងហ្រ៊ែម កត្តិង',
        titleEn: 'Brake Fluid Dot3/Dot4',
        price: 15,
        included: false,
        required: false
    },
    {
        id: 'coolant',
        title: 'ទឹកក្រោស',
        titleEn: 'Coolant (40$ Dot3 & 50$ Dot4)',
        price: 45,
        included: false,
        required: false
    },
    {
        id: 'air-condition',
        title: 'ទឹកម៉ាស៊ីនត្រជាក់',
        titleEn: 'Air Condition -45C° 4L/35$',
        price: 35,
        included: false,
        required: false
    }
];

// Skeleton Loaders
const ProductCardSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
        <div className="h-56 bg-gray-200"></div>
        <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="flex items-center justify-between pt-3">
                <div className="h-8 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
        </div>
    </div>
);

export default function ServiceRedesigned() {
    const [activeTab, setActiveTab] = useState('oil-home');
    const router = useRouter();

    // Car selection state
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedFuelType, setSelectedFuelType] = useState('');
    const [selectedEngine, setSelectedEngine] = useState('');

    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<any[]>([]);
    const [slidesLoading, setSlidesLoading] = useState(true);

    // Service selection state
    const [selectedServices, setSelectedServices] = useState<string[]>(['engine-oil']);

    // Products state
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Generate years (current year back to 1990)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

    // Check if oil change tabs - MUST be after activeTab is declared
    const isOilChangeTab = activeTab === 'oil-home' || activeTab === 'oil-garage';

    // Total slides count
    const totalSlides = slides.length || 3;

    // Proceed to booking
    const handleProceedToBooking = () => {
        // Method 1 (primary): pass tab as URL query param → most reliable
        router.push(`/booking?tab=${activeTab}`);

        // Method 2 (backup): also save to localStorage in case URL param is lost
        localStorage.setItem('bookingServiceType', activeTab);
    };

    // Fetch carousel slides from API
    useEffect(() => {
        async function fetchSlides() {
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/service-slides');
                const data = await response.json();

                // Assuming API returns: { slides: [...] } or just [...]
                const slidesData = Array.isArray(data) ? data : data?.slides || [];

                if (slidesData.length > 0) {
                    setSlides(slidesData);
                } else {
                    // Fallback to default slides if API returns empty
                    setSlides(getDefaultSlides());
                }
            } catch (error) {
                console.error("Failed to load slides", error);
                // Fallback to default slides on error
                setSlides(getDefaultSlides());
            } finally {
                setSlidesLoading(false);
            }
        }

        if (isOilChangeTab) {
            fetchSlides();
        }
    }, [activeTab, isOilChangeTab]);

    // Default slides fallback
    const getDefaultSlides = () => {
        const isHome = activeTab === 'oil-home';
        return [
            {
                id: 1,
                image_url: isHome
                    ? 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1400&q=80'
                    : 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
                badge_icon: 'home',
                badge_text: isHome ? 'Home Service' : 'Garage Service',
                title: isHome ? 'សេវាកម្មនៅផ្ទះអ្នក' : 'សេវាកម្មនៅហាង',
                description: isHome
                    ? 'យើងមកផ្ទះអ្នកដើម្បីផ្តល់សេវាកម្មគុណភាពខ្ពស់ ដោយក្រុមអ្នកជំនាញដែលមានបទពិសោធន៍'
                    : 'ចូលមកហាងរបស់យើងដើម្បីទទួលសេវាកម្មល្អបំផុត ជាមួយឧបករណ៍ទំនើបបំផុត',
                features: [
                    { text: 'ជំនាញវិជ្ជាជីវៈ' },
                    { text: 'សេវាកម្មរហ័ស' },
                    { text: 'ធានាគុណភាព' }
                ]
            },
            {
                id: 2,
                image_url: isHome
                    ? 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1400&q=80'
                    : 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da45?w=1400&q=80',
                badge_icon: 'award',
                badge_text: 'Quality Guaranteed',
                title: 'ធានាគុណភាព 100%',
                description: 'ប្រើប្រេងម៉ាស៊ីនគុណភាពខ្ពស់ Castrol / Mobil 1 និងបច្ចេកទេសជំនាញ ធានា 6 ខែ ឬ 10,000 គីឡូម៉ែត្រ',
                features: [
                    { text: 'តម្លៃសមរម្យ' },
                    { text: 'ធានា 6 ខែ' },
                    { text: 'ប្រេងម៉ាស៊ីនល្អ' }
                ]
            },
            {
                id: 3,
                image_url: isHome
                    ? 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1400&q=80'
                    : 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1400&q=80',
                badge_icon: 'clock',
                badge_text: 'Fast & Efficient',
                title: 'សេវាកម្មរហ័ស 30 នាទី',
                description: 'បញ្ចប់ការប្តូរប្រេងម៉ាស៊ីនក្នុងរយៈពេលត្រឹមតែ 30-45 នាទី រួមទាំងការត្រួតពិនិត្យជំនាញ',
                features: [
                    { text: 'ងាយស្រួល' },
                    { text: 'សន្សំពេលវេលា' },
                    { text: 'មិនចាំបាច់ចាំយូរ' }
                ]
            },
            {
                id: 4,
                image_url: isHome
                    ? 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1400&q=80'
                    : 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=1400&q=80',
                badge_icon: 'home',
                badge_text: 'Special Offer',
                title: 'ការបញ្ចុះតម្លៃពិសេស',
                description: 'ទទួលបានការបញ្ចុះតម្លៃ 20% សម្រាប់ការកក់លើកដំបូង និងសេវាកម្មបន្ថែមឥតគិតថ្លៃ',
                features: [
                    { text: 'បញ្ចុះ 20%' },
                    { text: 'ត្រួតពិនិត្យឥតគិតថ្លៃ' },
                    { text: 'ចូលរួមក្លឹបពិសេស' }
                ]
            }
        ];
    };

    // Auto-advance carousel
    useEffect(() => {
        if (slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Helper function to get icon component
    const getBadgeIcon = (iconName: string) => {
        switch (iconName) {
            case 'home': return activeTab === 'oil-home' ? Home : Building2;
            case 'award': return Award;
            case 'clock': return Clock;
            default: return Home;
        }
    };


    useEffect(() => {
        async function fetchProducts() {
            try {
                const productRes = await getAllProducts();
                const productData = Array.isArray(productRes) ? productRes : productRes?.data || [];
                setProducts(productData);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Reset dependent selections when parent changes
    useEffect(() => {
        setSelectedYear('');
        setSelectedModel('');
        setSelectedFuelType('');
        setSelectedEngine('');
    }, [selectedMake]);

    useEffect(() => {
        setSelectedModel('');
        setSelectedFuelType('');
        setSelectedEngine('');
    }, [selectedYear]);

    useEffect(() => {
        setSelectedFuelType('');
        setSelectedEngine('');
    }, [selectedModel]);

    useEffect(() => {
        setSelectedEngine('');
    }, [selectedFuelType]);

    const handleProductClick = (productId: number) => {
        router.push(`/service/product/${productId}`);
    };

    const toggleService = (serviceId: string) => {
        const service = SERVICE_OPTIONS.find(s => s.id === serviceId);
        if (service?.required) return; // Can't deselect required services

        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    const calculateTotal = () => {
        return SERVICE_OPTIONS
            .filter(service => selectedServices.includes(service.id))
            .reduce((sum, service) => sum + service.price, 0);
    };

    const getAvailableModels = () => {
        return CAR_MODELS[selectedMake] || CAR_MODELS['Default'];
    };

    const getAvailableEngines = () => {
        return ENGINE_TYPES[selectedFuelType] || [];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Hanuman:wght@400;700;900&display=swap');
                
                body {
                    font-family: 'Poppins', 'Hanuman', sans-serif;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                .btn-3d {
                    position: relative;
                    transform-style: preserve-3d;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .btn-3d:hover {
                    transform: translateY(-4px) scale(1.02);
                }

                .btn-3d:active {
                    transform: translateY(0px) scale(0.98);
                }

                .service-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .service-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-up {
                    animation: slideUp 0.6s ease-out forwards;
                }
            `}</style>

            {/* Hero Banner - Static Design */}
            <section className="relative h-[90vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '80px 80px'
                    }} />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626]/20 via-transparent to-[#F97316]/20" />

                <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full flex items-center">
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                        {/* Left - Text Content */}
                        <div className="text-white z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#DC2626] to-[#F97316] rounded-full mb-3 shadow-lg">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-bold">Premium Car Care Services</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-3 leading-tight">
                                <span className="block text-white drop-shadow-2xl">សេវាកម្ម</span>
                                <span className="block bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#F97316] bg-clip-text text-transparent mt-2">
                                    ថែទាំរថយន្ត
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
                                ជ្រើសរើសសេវាកម្មដែលសមស្របបំផុតសម្រាប់រថយន្តរបស់អ្នក ជាមួយបច្ចេកទេសជំនាញ និងគុណភាពខ្ពស់
                            </p>

                            <div className="flex flex-wrap gap-4 my-6">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white font-bold rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative flex items-center gap-3">
                                        <Sparkles className="w-5 h-5" />
                                        <span>ស្វែងរកសេវាកម្ម</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-8 mt-5 pt-10 border-t border-white/10">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">5000+</div>
                                    <div className="text-sm text-gray-400">អតិថិជនសប្បាយចិត្ត</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">50+</div>
                                    <div className="text-sm text-gray-400">សេវាកម្ម</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">24/7</div>
                                    <div className="text-sm text-gray-400">ជួយគាំទ្រ</div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Static Image */}
                        <div className="hidden lg:block relative">
                            <div className="relative w-full h-[500px]">
                                {/* Glow background */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#DC2626]/30 to-[#F97316]/30 rounded-full blur-3xl" />

                                {/* Hero Image */}
                                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/home/aboutus.png"
                                        alt="Car Service"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Optional subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-16 sm:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path
                            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                            fill="white"
                            fillOpacity="1"
                        />
                    </svg>
                </div>
            </section>

            {/* Modern Navigation Tabs */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="overflow-x-auto lg:overflow-visible">
                            <div className="flex gap-3 lg:justify-center min-w-max lg:min-w-0">
                                {TABS.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`
                                                group relative flex items-center gap-3 px-8 py-4 font-bold text-sm whitespace-nowrap rounded-2xl 
                                                transition-all duration-300 ease-out
                                                ${isActive
                                                    ? 'bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white shadow-xl shadow-red-500/30 scale-105'
                                                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900 hover:scale-105'
                                                }
                                            `}
                                        >
                                            <div className={`
                                                relative p-2.5 rounded-xl transition-all duration-300
                                                ${isActive
                                                    ? 'bg-white/20'
                                                    : 'bg-white group-hover:bg-gray-50'
                                                }
                                            `}>
                                                <Icon className={`
                                                    w-6 h-6 transition-all duration-300
                                                    ${isActive
                                                        ? 'text-white'
                                                        : 'text-gray-600 group-hover:text-[#DC2626]'
                                                    }
                                                `} strokeWidth={2.5} />
                                            </div>

                                            <div className="flex flex-col items-start gap-1">
                                                <span className={`
                                                    font-black text-base leading-none
                                                    ${isActive ? 'text-white' : 'text-gray-900'}
                                                `}>
                                                    {tab.label}
                                                </span>
                                                <span className={`
                                                    text-xs font-semibold leading-none
                                                    ${isActive ? 'text-white/90' : 'text-gray-500'}
                                                `}>
                                                    {tab.labelEn}
                                                </span>
                                            </div>

                                            {isActive && (
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-white rounded-full shadow-lg" />
                                            )}

                                            <div className={`
                                                absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
                                                ${isActive
                                                    ? 'bg-gradient-to-r from-[#DC2626]/20 to-[#F97316]/20 blur-xl'
                                                    : 'bg-gray-200/50 blur-md'
                                                }
                                            `} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Oil Change Tabs (Home & Garage) */}
                {isOilChangeTab && (
                    <div className="space-y-16">
                        {/* Service Slideshow Carousel - Pure React with API Data */}
                        <section className="animate-slide-up">
                            {slidesLoading ? (
                                // Loading skeleton
                                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 animate-pulse">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-gray-400">Loading...</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full">
                                    {/* Carousel wrapper */}
                                    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
                                        {slides.map((slide, index) => {
                                            const BadgeIcon = getBadgeIcon(slide.badge_icon || 'home');
                                            return (
                                                <div
                                                    key={slide.id || index}
                                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                                                >
                                                    <div className="absolute inset-0">
                                                        <img
                                                            src={slide.image_url || '/services/default-service.jpg'}
                                                            alt={slide.title || `Service Slide ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                                                    </div>

                                                    {/* Content Overlay */}
                                                    <div className="absolute inset-0 flex items-center px-6 md:px-12">
                                                        <div className="max-w-2xl">
                                                            {/* Badge */}
                                                            {slide.badge_text && (
                                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/90 backdrop-blur-md rounded-full mb-4 shadow-lg">
                                                                    <BadgeIcon className="w-4 h-4 text-white" />
                                                                    <span className="text-white text-sm font-bold">{slide.badge_text}</span>
                                                                </div>
                                                            )}

                                                            {/* Title */}
                                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
                                                                {slide.title}
                                                            </h2>

                                                            {/* Description */}
                                                            <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                                                                {slide.description}
                                                            </p>

                                                            {/* Features */}
                                                            {slide.features && slide.features.length > 0 && (
                                                                <div className="flex flex-wrap gap-4">
                                                                    {slide.features.map((feature: any, idx: number) => (
                                                                        <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg">
                                                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                                                            <span className="text-white font-semibold text-sm">{feature.text || feature}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Slider indicators */}
                                    {slides.length > 1 && (
                                        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                                            {slides.map((_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
                                                    aria-label={`Slide ${index + 1}`}
                                                    onClick={() => goToSlide(index)}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Slider controls */}
                                    {slides.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                                onClick={prevSlide}
                                            >
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none transition-all">
                                                    <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                                    </svg>
                                                    <span className="sr-only">Previous</span>
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                                onClick={nextSlide}
                                            >
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none transition-all">
                                                    <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                    </svg>
                                                    <span className="sr-only">Next</span>
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </section>

                        {/* Car Selection Form - All in One Card */}
                        <section>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                                    ជ្រើសរើសព័ត៌មានរថយន្ត
                                </h2>
                                <p className="text-base md:text-lg text-gray-600">
                                    បញ្ចូលព័ត៌មានរថយន្តដើម្បីទទួលបានសេវាកម្មដែលសមស្រប
                                </p>
                            </div>

                            <div className="max-w-3xl mx-auto">
                                {/* Single Card Container */}
                                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-gray-100">
                                    <div className="space-y-5">
                                        {/* Car Make Selection - ALWAYS VISIBLE */}
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                    <Car className="w-4 h-4 text-red-500" />
                                                </div>
                                                ម៉ាករថយន្ត (Car Make) *
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={selectedMake}
                                                    onChange={(e) => setSelectedMake(e.target.value)}
                                                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                >
                                                    <option value="">ជ្រើសរើសម៉ាករថយន្ត</option>
                                                    {CAR_MAKES.map(make => (
                                                        <option key={make} value={make}>{make}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Year Selection - Shows after Make */}
                                        {selectedMake && (
                                            <div className="animate-slide-up">
                                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                        <Calendar className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    ឆ្នាំផលិត (Year) *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={selectedYear}
                                                        onChange={(e) => setSelectedYear(e.target.value)}
                                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                    >
                                                        <option value="">ជ្រើសរើសឆ្នាំ</option>
                                                        {years.map(year => (
                                                            <option key={year} value={year}>{year}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Model Selection - Shows after Year */}
                                        {selectedYear && (
                                            <div className="animate-slide-up">
                                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                        <Settings className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    ម៉ូដែល/ស៊េរី (Model/Series) *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={selectedModel}
                                                        onChange={(e) => setSelectedModel(e.target.value)}
                                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                    >
                                                        <option value="">ជ្រើសរើសម៉ូដែល</option>
                                                        {getAvailableModels().map(model => (
                                                            <option key={model} value={model}>{model}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Fuel Type Selection - Shows after Model */}
                                        {selectedModel && (
                                            <div className="animate-slide-up">
                                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                        <Droplet className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    ប្រភេទឥន្ធនៈ (Fuel Type) *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={selectedFuelType}
                                                        onChange={(e) => setSelectedFuelType(e.target.value)}
                                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                    >
                                                        <option value="">ជ្រើសរើសប្រភេទឥន្ធនៈ</option>
                                                        {FUEL_TYPES.map(fuel => (
                                                            <option key={fuel} value={fuel}>{fuel}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Engine Selection - Shows after Fuel Type */}
                                        {selectedFuelType && (
                                            <div className="animate-slide-up">
                                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                        <Zap className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    ម៉ាស៊ីន (Engine) *
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={selectedEngine}
                                                        onChange={(e) => setSelectedEngine(e.target.value)}
                                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                    >
                                                        <option value="">ជ្រើសរើសម៉ាស៊ីន</option>
                                                        {getAvailableEngines().map(engine => (
                                                            <option key={engine} value={engine}>{engine}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Selected Car Summary - Shows when all fields are filled */}
                                        {selectedMake && selectedYear && selectedModel && selectedFuelType && selectedEngine && (
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 mt-6 animate-slide-up">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                                        <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.5} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-sm font-bold text-green-700">✅ រថយន្តរបស់អ្នក</span>
                                                        </div>
                                                        <p className="text-2xl font-black text-gray-900 mb-3">
                                                            {selectedYear} {selectedMake} {selectedModel}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border-2 border-green-200 shadow-sm">
                                                                <Droplet className="w-4 h-4 text-green-600" />
                                                                <span className="text-sm font-semibold text-gray-700">{selectedFuelType}</span>
                                                            </span>
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border-2 border-green-200 shadow-sm">
                                                                <Zap className="w-4 h-4 text-green-600" />
                                                                <span className="text-sm font-semibold text-gray-700">{selectedEngine}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Service Selection Section - Single Card with Image & Checkboxes */}
                        {selectedMake && selectedYear && selectedModel && selectedFuelType && selectedEngine && (
                            <section id="service-cards-section" className="mt-12 animate-slide-up">
                                <div className="text-center mb-12">
                                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                                        <span className="text-purple-600 font-bold text-sm">ជំហានទី 2</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
                                        ជ្រើសរើសសេវាកម្ម
                                    </h2>
                                    <p className="text-lg md:text-xl text-gray-600">
                                        ជ្រើសរើសសេវាកម្មដែលអ្នកត្រូវការសម្រាប់រថយន្តរបស់អ្នក
                                    </p>
                                </div>

                                {/* Single Service Card with Image on Left, Checkboxes on Right */}
                                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200">
                                    <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-0">
                                        {/* Left Side - Service Image */}
                                        <div className="relative h-[400px] lg:h-auto">
                                            <img
                                                src="/home/Toyota Alphard 2023(v6).jpg"
                                                alt="Service Package"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                            {/* Service Info Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <div className="inline-block px-4 py-2 bg-red-500/90 backdrop-blur-md rounded-full mb-3">
                                                    <span className="text-sm font-bold">V4 Package</span>
                                                </div>
                                                <h3 className="text-3xl font-black mb-2">
                                                    សេវាកម្មប្រេងម៉ាស៊ីន
                                                </h3>
                                                <p className="text-lg opacity-90">
                                                    Oil Change Service Package
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Side - Service Checkboxes (6 options) */}
                                        <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white">
                                            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                                    <Wrench className="w-6 h-6 text-white" />
                                                </div>
                                                ជ្រើសរើសសេវា
                                            </h3>

                                            <div className="space-y-3 mb-8">
                                                {SERVICE_OPTIONS.map((service, index) => (
                                                    <div
                                                        key={service.id}
                                                        onClick={() => toggleService(service.id)}
                                                        className={`
                                                            relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                                                            ${selectedServices.includes(service.id)
                                                                ? 'border-green-500 bg-green-50 shadow-md'
                                                                : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md'
                                                            }
                                                            ${service.required ? 'cursor-not-allowed' : ''}
                                                        `}
                                                    >
                                                        {/* Number Badge */}
                                                        <div className={`
                                                            w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0
                                                            ${selectedServices.includes(service.id)
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-gray-200 text-gray-600'
                                                            }
                                                        `}>
                                                            {index + 1}
                                                        </div>

                                                        {/* Service Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h4 className="font-black text-gray-900 text-sm md:text-base">
                                                                    {service.title}
                                                                </h4>
                                                                {service.required && (
                                                                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                                                                        តម្រូវ
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-600 mb-1">
                                                                {service.titleEn}
                                                            </p>
                                                            <p className="text-lg font-black text-red-600">
                                                                ${service.price}
                                                            </p>
                                                        </div>

                                                        {/* Checkbox */}
                                                        <div className={`
                                                            w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all
                                                            ${selectedServices.includes(service.id)
                                                                ? 'bg-green-500 border-green-500 scale-110'
                                                                : 'bg-white border-gray-300'
                                                            }
                                                        `}>
                                                            {selectedServices.includes(service.id) && (
                                                                <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Total Price */}
                                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <p className="text-gray-400 text-sm mb-1">សេវាកម្មដែលបានជ្រើសរើស</p>
                                                        <p className="text-white text-2xl font-black">
                                                            {selectedServices.length} services
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-gray-400 text-sm mb-1">តម្លៃសរុប</p>
                                                        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                                                            ${calculateTotal()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Book Button */}
                                            <button onClick={handleProceedToBooking} className="btn-3d w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-xl font-black text-lg shadow-2xl flex items-center justify-center gap-3">
                                                <Calendar className="w-6 h-6" />
                                                កក់ពេលវេលា
                                                <ArrowRight className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="space-y-16">
                        <section>
                            <div className="text-center mb-12">
                                <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                                    <span className="text-purple-600 font-bold text-sm">ផលិតផលគុណភាពខ្ពស់</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                                    ផលិតផលទាំងអស់
                                </h2>
                                <p className="text-xl text-gray-600">រកឃើញផលិតផលដែលសមស្របនឹងរថយន្តរបស់អ្នក</p>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, index) => (
                                        <ProductCardSkeleton key={index} />
                                    ))}
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-16">
                                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No products available</h3>
                                    <p className="text-gray-500">Check back soon for new products</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {products.map((product: any, index: number) => (
                                        <div
                                            key={product.product_id}
                                            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                            {/* Image */}
                                            <div className="relative h-56 overflow-hidden bg-gray-100">
                                                <img
                                                    src={product.image_url || '/placeholder-product.jpg'}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                                {index < 3 && (
                                                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white text-xs font-black rounded-full shadow-lg">
                                                        🔥 Popular
                                                    </div>
                                                )}
                                                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-lg">
                                                    #{index + 1}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 flex flex-col flex-1">
                                                <p className="text-xs text-gray-400 font-semibold mb-1">#PRD{product.product_id}</p>
                                                <h3 className="text-base font-black text-gray-900 mb-2 line-clamp-2 leading-snug">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                                                    {product.description}
                                                </p>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1 mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                                                    ))}
                                                    <span className="text-xs text-gray-500 ml-1">(150)</span>
                                                </div>

                                                {/* Price + Button */}
                                                <div className="flex items-center justify-between gap-3 mt-auto">
                                                    <p className="text-2xl font-black text-[#DC2626]">
                                                        ${Number(product.selling_price).toFixed(2)}
                                                    </p>
                                                    <button
                                                        onClick={() => handleProductClick(product.product_id)}
                                                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                        View Detail
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </div>

            {/* Footer CTA */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#F97316] text-white py-20 mt-20">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6">
                        <span className="text-sm font-bold">💬 ទាក់ទងមកយើងខ្ញុំ</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4">
                        រកមិនឃើញសេវាកម្មដែលអ្នកត្រូវការទេ?
                    </h2>
                    <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto font-medium">
                        ទាក់ទងមកយើងខ្ញុំដើម្បីទទួលបានប្រឹក្សាយោបល់ និងដំណោះស្រាយពិសេសសម្រាប់អ្នក
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="btn-3d bg-white text-[#DC2626] px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 shadow-2xl flex items-center gap-3 group">
                            <MapPin className="w-6 h-6" />
                            ទាក់ទងមកយើងខ្ញុំ
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="btn-3d bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 flex items-center gap-3">
                            <Calendar className="w-6 h-6" />
                            កក់ពេលវេលា
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}