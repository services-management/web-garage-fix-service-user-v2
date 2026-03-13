'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    Star, Clock, TrendingUp, ChevronRight, Award, Tag, Package,
    Wrench, ShoppingBag, Home, Building2, Sparkles, Zap, Shield,
    Droplet, Filter, Wind, Car, Calendar, MapPin, CheckCircle2,
    ArrowRight, Play, ChevronDown, User, Settings
} from 'lucide-react';
import ProductCard from '../../../components/service/productCard';
import { getAllProducts } from '@/lib/api/product';
import {
    getAllMakes,
    getModelsByMake,
    getYearsByModel,
    getVehicleConfigurations,
    VehicleMake,
    VehicleModel,
    VehicleDetail,
    getVehicleById,
    getServiceEstimates,
    ServiceEstimate,
} from '@/lib/api/vehicle';
import { getSlideshow, Slide } from '@/lib/api/slideshow';

// Tab Configuration - will be translated in component
const getTabs = (t: any) => [
    {
        id: 'oil-home',
        label: t('service.tabs.oilHome'),
        icon: Home,
        color: 'from-[#3B82F6] to-[#2563EB]'
    },
    {
        id: 'oil-garage',
        label: t('service.tabs.oilGarage'),
        icon: Building2,
        color: 'from-[#A855F7] to-[#9333EA]'
    },
    {
        id: 'products',
        label: t('service.tabs.products'),
        icon: ShoppingBag,
        color: 'from-[#10B981] to-[#059669]'
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

const SelectSkeleton = () => (
    <div className="w-full h-14 bg-gray-100 rounded-xl animate-pulse" />
);

export default function ServiceRedesigned() {
    const t = useTranslations();
    const TABS = getTabs(t);
    const [activeTab, setActiveTab] = useState('oil-home');

    useEffect(() => {
        const pageTitleMap: Record<string, string> = {
            'oil-home': t('service.pageTitles.oilHome'),
            'oil-garage': t('service.pageTitles.oilGarage'),
            'products': t('service.pageTitles.products'),
        };
        const pageTitle = pageTitleMap[activeTab] || t('service.pageTitles.oilHome');
        document.title = `${pageTitle} - MR.LUBE`;
    }, [activeTab, t]);

    const router = useRouter();

    // ─── Vehicle filter state ───────────────────────────────────────────────
    // Step 1 – Make
    const [makes, setMakes] = useState<VehicleMake[]>([]);
    const [makesLoading, setMakesLoading] = useState(false);
    const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);

    // Step 2 – Model (fetched by make id)
    const [models, setModels] = useState<VehicleModel[]>([]);
    const [modelsLoading, setModelsLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);

    // Step 3 – Year (fetched by model id)
    const [years, setYears] = useState<number[]>([]);
    const [yearsLoading, setYearsLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    // Step 4 – Configuration (fetched by model id + year)
    const [configurations, setConfigurations] = useState<number[]>([]);
    const [configurationsLoading, setConfigurationsLoading] = useState(false);
    const [selectedConfiguration, setSelectedConfiguration] = useState<number | null>(null);

    // Vehicle detail (fetched after configuration is selected)
    const [vehicleDetail, setVehicleDetail] = useState<VehicleDetail | null>(null);
    const [vehicleDetailLoading, setVehicleDetailLoading] = useState(false);

    // Service estimates from API (fetched after vehicle + tab is known)
    const [serviceEstimates, setServiceEstimates] = useState<ServiceEstimate[]>([]);
    const [serviceEstimatesLoading, setServiceEstimatesLoading] = useState(false);
    // Track which service_ids are selected (by service_id number)
    const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
    // ───────────────────────────────────────────────────────────────────────

    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [slidesLoading, setSlidesLoading] = useState(true);

    // Service selection state

    // Products state
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const isOilChangeTab = activeTab === 'oil-home' || activeTab === 'oil-garage';

    // ─── Proceed to booking ─────────────────────────────────────────────────
    const handleProceedToBooking = () => {
        router.push(`/booking?tab=${activeTab}`);
        localStorage.setItem('bookingServiceType', activeTab);
    };

    // ─── Fetch Makes on mount (only for oil tabs) ───────────────────────────
    useEffect(() => {
        if (!isOilChangeTab) return;
        setMakesLoading(true);
        getAllMakes()
            .then(setMakes)
            .catch((err) => console.error('Failed to load makes', err))
            .finally(() => setMakesLoading(false));
    }, [isOilChangeTab]);

    // ─── Fetch Models when make changes ────────────────────────────────────
    useEffect(() => {
        if (!selectedMake) {
            setModels([]);
            setSelectedModel(null);
            setYears([]);
            setSelectedYear(null);
            setConfigurations([]);
            setSelectedConfiguration(null);
            setVehicleDetail(null);
            return;
        }
        setModelsLoading(true);
        setSelectedModel(null);
        setYears([]);
        setSelectedYear(null);
        setConfigurations([]);
        setSelectedConfiguration(null);
        getModelsByMake(selectedMake.id)
            .then(setModels)
            .catch((err) => console.error('Failed to load models', err))
            .finally(() => setModelsLoading(false));
    }, [selectedMake]);

    // ─── Fetch Years when model changes ────────────────────────────────────
    useEffect(() => {
        if (!selectedModel) {
            setYears([]);
            setSelectedYear(null);
            setConfigurations([]);
            setSelectedConfiguration(null);
            setVehicleDetail(null);
            return;
        }
        setYearsLoading(true);
        setSelectedYear(null);
        setConfigurations([]);
        setSelectedConfiguration(null);
        getYearsByModel(selectedModel.id)
            .then(setYears)
            .catch((err) => console.error('Failed to load years', err))
            .finally(() => setYearsLoading(false));
    }, [selectedModel]);

    // ─── Fetch Configurations when year changes ─────────────────────────────
    useEffect(() => {
        if (!selectedModel || !selectedYear) {
            setConfigurations([]);
            setSelectedConfiguration(null);
            setVehicleDetail(null);
            return;
        }
        setConfigurationsLoading(true);
        setSelectedConfiguration(null);
        setVehicleDetail(null);
        getVehicleConfigurations(selectedModel.id, selectedYear)
            .then(setConfigurations)
            .catch((err) => console.error('Failed to load configurations', err))
            .finally(() => setConfigurationsLoading(false));
    }, [selectedModel, selectedYear]);

    // ─── Mock fallback services (used when API is unavailable) ────────────────
    const FALLBACK_SERVICES: ServiceEstimate[] = [
        { service_id: 1, service_name: t('service.serviceOptions.engineOil'),        service_type: 'Home', base_labor_price: '55', products: [], total_estimated_price: '55',  total_duration_minutes: 30 },
        { service_id: 2, service_name: t('service.serviceOptions.transmissionFluid'), service_type: 'Home', base_labor_price: '60', products: [], total_estimated_price: '60',  total_duration_minutes: 45 },
        { service_id: 3, service_name: t('service.serviceOptions.engineFlush'),       service_type: 'Home', base_labor_price: '13', products: [], total_estimated_price: '13',  total_duration_minutes: 20 },
        { service_id: 4, service_name: t('service.serviceOptions.brakeFluid'),        service_type: 'Home', base_labor_price: '15', products: [], total_estimated_price: '15',  total_duration_minutes: 20 },
        { service_id: 5, service_name: t('service.serviceOptions.coolant'),           service_type: 'Home', base_labor_price: '45', products: [], total_estimated_price: '45',  total_duration_minutes: 30 },
        { service_id: 6, service_name: t('service.serviceOptions.airCondition'),      service_type: 'Home', base_labor_price: '35', products: [], total_estimated_price: '35',  total_duration_minutes: 40 },
    ];

        // ─── Fetch Vehicle Detail when configuration (vehicle id) is selected ────
    useEffect(() => {
        if (!selectedConfiguration) {
            setVehicleDetail(null);
            return;
        }
        setVehicleDetailLoading(true);
        getVehicleById(selectedConfiguration)
            .then(setVehicleDetail)
            .catch((err) => console.error('Failed to load vehicle detail', err))
            .finally(() => setVehicleDetailLoading(false));
    }, [selectedConfiguration]);

    // ─── Fetch Service Estimates when vehicle + tab changes ────────────────────
    useEffect(() => {
        setServiceEstimates([]);
        setSelectedServiceIds([]);

        if (!selectedConfiguration || !isOilChangeTab) return;

        const serviceType = activeTab === 'oil-home' ? 'Home' : 'Garage';
        setServiceEstimatesLoading(true);

        getServiceEstimates(selectedConfiguration, serviceType)
            .then((data) => {
                if (data && data.length > 0) {
                    setServiceEstimates(data);
                    // Auto-select the first service by default
                    setSelectedServiceIds([data[0].service_id]);
                } else {
                    console.warn('No service estimates from API, using fallback');
                    setServiceEstimates(FALLBACK_SERVICES);
                    setSelectedServiceIds([FALLBACK_SERVICES[0].service_id]);
                }
            })
            .catch((err) => {
                console.error('Service estimates fetch failed, using fallback:', err);
                setServiceEstimates(FALLBACK_SERVICES);
                setSelectedServiceIds([FALLBACK_SERVICES[0].service_id]);
            })
            .finally(() => setServiceEstimatesLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedConfiguration, activeTab]);

        // ─── Carousel / Slides ──────────────────────────────────────────────────
    useEffect(() => {
        // Reset slides every time tab changes so stale data doesn't show
        setSlides([]);
        setCurrentSlide(0);
        setSlidesLoading(true);

        if (!isOilChangeTab) return;

        const serviceType = activeTab === 'oil-home' ? 'Home' : 'Garage';

        getSlideshow(serviceType)
            .then((data) => {
                // Use API data directly — only fall back if API returns empty array
                if (data && data.length > 0) {
                    setSlides(data);
                } else {
                    console.warn(`Slideshow API returned empty for "${serviceType}", using fallback`);
                    setSlides(getDefaultSlides());
                }
            })
            .catch((err) => {
                console.error('Slideshow fetch failed:', err);
                setSlides(getDefaultSlides());
            })
            .finally(() => setSlidesLoading(false));
    }, [activeTab, isOilChangeTab]);

    // Fallback slides if API returns empty (images only, matching Slide type)
    const getDefaultSlides = (): Slide[] => {
        const serviceType = activeTab === 'oil-home' ? 'Home' : 'Garage';
        const homeImages = [
            'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1400&q=80',
            'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1400&q=80',
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1400&q=80',
        ];
        const garageImages = [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
            'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da45?w=1400&q=80',
            'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1400&q=80',
        ];
        const images = activeTab === 'oil-home' ? homeImages : garageImages;
        return images.map((url, i) => ({ id: i + 1, image_url: url, service_type: serviceType as 'Home' | 'Garage' }));
    };

    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    const goToSlide = (index: number) => setCurrentSlide(index);


    // ─── Products ───────────────────────────────────────────────────────────
    useEffect(() => {
        async function fetchProducts() {
            try {
                const productRes = await getAllProducts();
                const productData = Array.isArray(productRes) ? productRes : productRes?.data || [];
                setProducts(productData);
            } catch (error) {
                console.error('Failed to load products', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // ─── Helpers ────────────────────────────────────────────────────────────
    const handleProductClick = (productId: number) => router.push(`/service/product/${productId}`);

    const toggleService = (serviceId: number) => {
        setSelectedServiceIds(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const calculateTotal = () =>
        serviceEstimates
            .filter(s => selectedServiceIds.includes(s.service_id))
            .reduce((sum, s) => sum + parseFloat(s.total_estimated_price || '0'), 0);

    // All four steps filled
    const isCarFullySelected =
        !!selectedMake && !!selectedModel && !!selectedYear && selectedConfiguration !== null && !!vehicleDetail;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .btn-3d {
                    position: relative;
                    transform-style: preserve-3d;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .btn-3d:hover { transform: translateY(-4px) scale(1.02); }
                .btn-3d:active { transform: translateY(0px) scale(0.98); }
                .service-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                .service-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
            `}</style>

            {/* ── Hero Banner ─────────────────────────────────────────────── */}
            <section className="relative h-[90vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '80px 80px'
                    }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626]/20 via-transparent to-[#F97316]/20" />

                <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full flex items-center">
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                        <div className="text-white z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#DC2626] to-[#F97316] rounded-full mb-3 shadow-lg">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-bold">Premium Car Care Services</span>
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-3 leading-tight">
                                <span className="block text-white drop-shadow-2xl">{t('service.hero.title')}</span>
                                <span className="block bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#F97316] bg-clip-text text-transparent mt-2">
                                    {t('service.hero.subtitle')}
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
                                {t('service.hero.description')}
                            </p>
                            <div className="flex flex-wrap gap-4 my-6">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white font-bold rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative flex items-center gap-3">
                                        <Sparkles className="w-5 h-5" />
                                        <span>{t('service.hero.searchButton')}</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-8 mt-5 pt-10 border-t border-white/10">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">5000+</div>
                                    <div className="text-sm text-gray-400">{t('service.hero.happyCustomers')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">50+</div>
                                    <div className="text-sm text-gray-400">{t('service.hero.services')}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-white mb-1">24/7</div>
                                    <div className="text-sm text-gray-400">{t('service.hero.support')}</div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="relative w-full h-[500px]">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#DC2626]/30 to-[#F97316]/30 rounded-full blur-3xl" />
                                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                                    <img src="/home/aboutus.png" alt="Car Service" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-16 sm:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="white" fillOpacity="1" />
                    </svg>
                </div>
            </section>

            {/* ── Navigation Tabs ──────────────────────────────────────────── */}
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
                                            <div className={`relative p-2.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/20' : 'bg-white group-hover:bg-gray-50'}`}>
                                                <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[#DC2626]'}`} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <span className={`font-black text-base leading-none ${isActive ? 'text-white' : 'text-gray-900'}`}>
                                                    {tab.label}
                                                </span>
                                            </div>
                                            {isActive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-white rounded-full shadow-lg" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Tab Content ──────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-12">

                {/* Oil Change Tabs */}
                {isOilChangeTab && (
                    <div className="space-y-16">

                        {/* Carousel */}
                        <section className="animate-slide-up">
                            {slidesLoading ? (
                                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 animate-pulse">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-gray-400">Loading...</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full">
                                    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
                                        {slides.map((slide, index) => (
                                            <div
                                                key={slide.id}
                                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                                            >
                                                <img
                                                    src={slide.image_url}
                                                    alt={`${slide.service_type} service slide ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {slides.length > 1 && (
                                        <>
                                            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                                                {slides.map((_, index) => (
                                                    <button key={index} type="button" className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`} onClick={() => goToSlide(index)} />
                                                ))}
                                            </div>
                                            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prevSlide}>
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-white/50 transition-all">
                                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" /></svg>
                                                </span>
                                            </button>
                                            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextSlide}>
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-white/50 transition-all">
                                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" /></svg>
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </section>

                        {/* ── Car Filter Form ──────────────────────────────── */}
                        <section>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                                    {t('service.carInfo.title')}
                                </h2>
                                <p className="text-base md:text-lg text-gray-600">
                                    {t('service.carInfo.subtitle')}
                                </p>
                            </div>

                            <div className="max-w-3xl mx-auto">
                                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-gray-100">
                                    <div className="space-y-5">

                                        {/* STEP 1 – Car Make */}
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                    <Car className="w-4 h-4 text-red-500" />
                                                </div>
                                                {t('service.carFilter.carMake')} *
                                            </label>
                                            {makesLoading ? <SelectSkeleton /> : (
                                                <div className="relative">
                                                    <select
                                                        value={selectedMake?.id ?? ''}
                                                        onChange={(e) => {
                                                            const make = makes.find(m => m.id === Number(e.target.value)) ?? null;
                                                            setSelectedMake(make);
                                                        }}
                                                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                    >
                                                        <option value="">{t('service.carFilter.selectCarMake')}</option>
                                                        {makes.filter(m => m.is_active).map(make => (
                                                            <option key={make.id} value={make.id}>{make.name}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                </div>
                                            )}
                                        </div>

                                        {/* STEP 2 – Car Model (shown after make) */}
                                        {selectedMake && (
                                            <div className="animate-slide-up">
                                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                        <Settings className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    {t('service.carFilter.model')} *
                                                </label>
                                                {modelsLoading ? <SelectSkeleton /> : (
                                                    <div className="relative">
                                                        <select
                                                            value={selectedModel?.id ?? ''}
                                                            onChange={(e) => {
                                                                const model = models.find(m => m.id === Number(e.target.value)) ?? null;
                                                                setSelectedModel(model);
                                                            }}
                                                            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                        >
                                                            <option value="">{t('service.carFilter.selectModel')}</option>
                                                            {models.filter(m => m.is_active).map(model => (
                                                                <option key={model.id} value={model.id}>{model.name}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* STEP 3 – Year (shown after model) */}
                                        {selectedModel && (
                                            <div className="animate-slide-up">
                                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                        <Calendar className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    {t('service.carFilter.year')} *
                                                </label>
                                                {yearsLoading ? <SelectSkeleton /> : (
                                                    <div className="relative">
                                                        <select
                                                            value={selectedYear ?? ''}
                                                            onChange={(e) => setSelectedYear(Number(e.target.value) || null)}
                                                            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                        >
                                                            <option value="">{t('service.carFilter.selectYear')}</option>
                                                            {years.map(year => (
                                                                <option key={year} value={year}>{year}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* STEP 4 – Configuration (shown after year) */}
                                        {selectedYear && (
                                            <div className="animate-slide-up">
                                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                                                        <Zap className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    {t('service.carFilter.engine')} *
                                                </label>
                                                {configurationsLoading ? <SelectSkeleton /> : (
                                                    <div className="relative">
                                                        <select
                                                            value={selectedConfiguration ?? ''}
                                                            onChange={(e) => setSelectedConfiguration(Number(e.target.value) || null)}
                                                            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer text-base"
                                                        >
                                                            <option value="">{t('service.carFilter.selectEngine')}</option>
                                                            {configurations.length > 0
                                                                ? configurations.map((vehicleId) => (
                                                                    <option key={vehicleId} value={vehicleId}>Vehicle #{vehicleId}</option>
                                                                ))
                                                                : <option value="" disabled>No configurations available</option>
                                                            }
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Vehicle Detail Summary - shown after configuration selected */}
                                        {selectedConfiguration !== null && (
                                            <div className="mt-6 animate-slide-up">
                                                {vehicleDetailLoading ? (
                                                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 animate-pulse space-y-3">
                                                        <div className="h-5 bg-gray-200 rounded w-1/3" />
                                                        <div className="h-8 bg-gray-200 rounded w-2/3" />
                                                        <div className="flex gap-2">
                                                            {[...Array(4)].map((_, i) => <div key={i} className="h-8 bg-gray-200 rounded-lg w-24" />)}
                                                        </div>
                                                    </div>
                                                ) : vehicleDetail ? (
                                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5">
                                                        {/* Header */}
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                                                <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold text-green-600 uppercase tracking-wide">{t('service.carFilter.yourCar')}</p>
                                                                <p className="text-xl font-black text-gray-900">
                                                                    {vehicleDetail.year} {vehicleDetail.model.make.name} {vehicleDetail.model.name}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Detail Badges */}
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-green-200 shadow-sm">
                                                                <Car className="w-4 h-4 text-green-600" />
                                                                <span className="text-xs font-bold text-gray-700">{vehicleDetail.model.make.name} {vehicleDetail.model.name}</span>
                                                            </span>
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-green-200 shadow-sm">
                                                                <Shield className="w-4 h-4 text-blue-500" />
                                                                <span className="text-xs font-bold text-gray-700">{vehicleDetail.vehicle_type}</span>
                                                            </span>
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-green-200 shadow-sm">
                                                                <Droplet className="w-4 h-4 text-blue-400" />
                                                                <span className="text-xs font-bold text-gray-700">{vehicleDetail.fuel_type}</span>
                                                            </span>
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-green-200 shadow-sm">
                                                                <Zap className="w-4 h-4 text-orange-500" />
                                                                <span className="text-xs font-bold text-gray-700">{vehicleDetail.engine}L</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ── Service Selection ────────────────────────────── */}
                        {isCarFullySelected && (
                            <section id="service-cards-section" className="mt-12 animate-slide-up">
                                <div className="text-center mb-12">
                                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                                        <span className="text-purple-600 font-bold text-sm">{t('service.step2.badge')}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
                                        {t('service.step2.title')}
                                    </h2>
                                    <p className="text-lg md:text-xl text-gray-600">
                                        {t('service.step2.subtitle')}
                                    </p>
                                </div>

                                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200">
                                    <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-0">
                                        {/* Left – Image */}
                                        <div className="relative h-[400px] lg:h-auto">
                                            <img src="/home/Toyota Alphard 2023(v6).jpg" alt="Service Package" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <div className="inline-block px-4 py-2 bg-red-500/90 backdrop-blur-md rounded-full mb-3">
                                                    <span className="text-sm font-bold">V4 Package</span>
                                                </div>
                                                <h3 className="text-3xl font-black mb-2">{t('service.package.title')}</h3>
                                                <p className="text-lg opacity-90">{t('service.package.subtitle')}</p>
                                            </div>
                                        </div>

                                        {/* Right – Checkboxes */}
                                        <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white">
                                            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                                    <Wrench className="w-6 h-6 text-white" />
                                                </div>
                                                {t('service.package.selectService')}
                                            </h3>

                                            {/* Service list — API data or fallback mock */}
                                            <div className="space-y-3 mb-8">
                                                {serviceEstimatesLoading ? (
                                                    // Skeleton while loading
                                                    [...Array(4)].map((_, i) => (
                                                        <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                                                    ))
                                                ) : serviceEstimates.map((service, index) => {
                                                    const isSelected = selectedServiceIds.includes(service.service_id);
                                                    const price = parseFloat(service.total_estimated_price || '0');
                                                    return (
                                                        <div
                                                            key={service.service_id}
                                                            onClick={() => toggleService(service.service_id)}
                                                            className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                                                                ${isSelected
                                                                    ? 'border-green-500 bg-green-50 shadow-md'
                                                                    : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md'
                                                                }`}
                                                        >
                                                            {/* Index badge */}
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                                                {index + 1}
                                                            </div>

                                                            {/* Service info */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                                    <h4 className="font-black text-gray-900 text-sm md:text-base">{service.service_name}</h4>
                                                                    <span className={`px-2 py-0.5 text-white text-xs font-bold rounded-full ${service.service_type === 'Home' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                                                                        {service.service_type}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <p className="text-lg font-black text-red-600">
                                                                        ${isNaN(price) ? '—' : price.toFixed(2)}
                                                                    </p>
                                                                    {service.total_duration_minutes > 0 && (
                                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                                            <Clock className="w-3 h-3" />
                                                                            {service.total_duration_minutes} min
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Checkbox */}
                                                            <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-green-500 border-green-500 scale-110' : 'bg-white border-gray-300'}`}>
                                                                {isSelected && <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <p className="text-gray-400 text-sm mb-1">{t('service.selectedServices')}</p>
                                                        <p className="text-white text-2xl font-black">{selectedServiceIds.length} services</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-gray-400 text-sm mb-1">{t('service.totalPrice')}</p>
                                                        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                                                            ${calculateTotal().toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <button onClick={handleProceedToBooking} className="btn-3d w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-xl font-black text-lg shadow-2xl flex items-center justify-center gap-3">
                                                <Calendar className="w-6 h-6" />
                                                {t('service.bookNow')}
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
                                    <span className="text-purple-600 font-bold text-sm">{t('service.products.badge')}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t('service.products.title')}</h2>
                                <p className="text-xl text-gray-600">{t('service.products.subtitle')}</p>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, index) => <ProductCardSkeleton key={index} />)}
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
                                        <div key={product.product_id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                            <div className="relative h-56 overflow-hidden bg-gray-100">
                                                <img src={product.image_url || '/placeholder-product.jpg'} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                                                {index < 3 && (
                                                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white text-xs font-black rounded-full shadow-lg">🔥 Popular</div>
                                                )}
                                                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-lg">#{index + 1}</div>
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <p className="text-xs text-gray-400 font-semibold mb-1">#PRD{product.product_id}</p>
                                                <h3 className="text-base font-black text-gray-900 mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
                                                <div className="flex items-center gap-1 mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                                                    ))}
                                                    <span className="text-xs text-gray-500 ml-1">(150)</span>
                                                </div>
                                                <div className="flex items-center justify-between gap-3 mt-auto">
                                                    <p className="text-2xl font-black text-[#DC2626]">${Number(product.selling_price).toFixed(2)}</p>
                                                    <button onClick={() => handleProductClick(product.product_id)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
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
                    <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6">
                        <span className="text-sm font-bold">{t('service.contact.badge')}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4">{t('service.contact.title')}</h2>
                    <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto font-medium">{t('service.contact.subtitle')}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="btn-3d bg-white text-[#DC2626] px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 shadow-2xl flex items-center gap-3 group">
                            <MapPin className="w-6 h-6" />
                            {t('service.contact.button')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="btn-3d bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 flex items-center gap-3">
                            <Calendar className="w-6 h-6" />
                            {t('service.bookNow')}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}