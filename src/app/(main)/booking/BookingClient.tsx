'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StepOne from '@/components/booking/StepOne';
import StepTwo from '@/components/booking/StepTwo';
import StepThree from '@/components/booking/StepThree';
import Stepper from '@/components/booking/Stepper';

export default function BookingClient() {

    interface BookingItem {
        id: number;
        type: string;
        name: string;
        price: number;
    }

    interface FormData {
        phone: string;
        full_name: string;
        car_make: string;
        car_model: string;
        items: BookingItem[];
        appointment_date: string;
        start_time: string;
        service_location: string;
        // home address fields
        district: string;
        commune: string;
        street: string;
        location_note: string;
        note: string;
        source: string;
    }

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        phone: '',
        full_name: '',
        car_make: '',
        car_model: '',
        items: [],
        appointment_date: '',
        start_time: '',
        service_location: '',
        district: '',
        commune: '',
        street: '',
        location_note: '',
        note: '',
        source: 'Web',
    });

    // ── Read serviceType from URL param first, then localStorage fallback ──
    const router = useRouter();
    const searchParams = useSearchParams();

    // Service page passes ?tab=oil-home  or  ?tab=oil-garage
    const tabParam = searchParams.get('tab') as 'oil-home' | 'oil-garage' | null;

    const [serviceType, setServiceType] = useState<'oil-home' | 'oil-garage'>('oil-garage');

    useEffect(() => {
        if (tabParam) {
            // Prefer URL param (most reliable)
            setServiceType(tabParam === 'oil-home' ? 'oil-home' : 'oil-garage');
        } else {
            // Fallback: check localStorage saved by service page
            const saved = localStorage.getItem('bookingServiceType');
            if (saved === 'oil-home' || saved === 'oil-garage') {
                setServiceType(saved);
            }
        }
    }, [tabParam]);

    // ── URL params for pre-selected items ──
    const serviceId = searchParams.get('serviceId');
    const packageId = searchParams.get('packageId');
    const productId = searchParams.get('productId');

    // Example data
    const services = [
        {
            id: 1,
            code: 'S001',
            title: 'ការសម្អាតរថយន្តពេញលេញ',
            description: 'សេវាកម្មសម្អាតរថយន្តពេញលេញ',
            image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500',
            price: 25,
            rating: 4.8,
            reviews: 245,
            duration: '2 ម៉ោង',
            bookings: 1250,
        },
    ];

    const packages = [
        {
            id: 1,
            code: 'P001',
            title: 'Premium Care Package',
            titleKh: 'កញ្ចប់ថែទាំពិសេស',
            description: 'Complete car care solution',
            image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500',
            price: 89,
            originalPrice: 120,
            savings: 31,
            rating: 4.9,
            reviews: 456,
            duration: '3-4 ម៉ោង',
            services: ['សម្អាត', 'ខាក់ស៊ី', 'ពិនិត្យ'],
            products: ['ក្រមសម្អាត', 'ប្រេងម៉ាស៊ីន'],
        },
    ];

    const products = [
        {
            id: 1,
            code: 'PR001',
            name: 'Premium Car Wax',
            nameKh: 'ក្រមខាក់ស៊ីពិសេស',
            description: 'Long-lasting protection',
            image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500',
            price: 35,
            rating: 4.7,
            reviews: 189,
            sales: 850,
        },
    ];

    let selectedItem: any = null;
    let itemType: 'service' | 'package' | 'product' | undefined = undefined;

    if (serviceId) {
        selectedItem = services.find(s => s.id === parseInt(serviceId));
        itemType = 'service';
    } else if (packageId) {
        selectedItem = packages.find(p => p.id === parseInt(packageId));
        itemType = 'package';
    } else if (productId) {
        selectedItem = products.find(p => p.id === parseInt(productId));
        itemType = 'product';
    }

    useEffect(() => {
        if (selectedItem && itemType) {
            const itemName =
                itemType === 'service'
                    ? selectedItem.title
                    : itemType === 'package'
                    ? selectedItem.titleKh || selectedItem.title
                    : selectedItem.nameKh || selectedItem.name;

            setFormData(prev => ({
                ...prev,
                items: [{ id: selectedItem.id, type: itemType!, name: itemName, price: selectedItem.price }],
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNext = () => setCurrentStep(s => s + 1);
    const handleBack = () => setCurrentStep(s => s - 1);

    const handleSubmit = async () => {
        console.log('Booking Data:', formData);
        // Clean up localStorage after booking
        localStorage.removeItem('bookingServiceType');
        alert('ការកក់របស់អ្នកត្រូវបានដាក់ស្នើដោយជោគជ័យ!');
    };

    return (
        <div className="min-h-screen bg-gray-50 mb-10">

            <div className="max-w-7xl mx-auto p-4">
                <button
                    onClick={() => router.back()}
                    className="mr-4 hover:opacity-80 bg-red-600 text-white px-3 py-1 rounded-sm"
                >
                    ← ត្រឡប់ក្រោយ
                </button>
            </div>

            <Stepper currentStep={currentStep} />

            {currentStep === 1 && (
                <StepOne
                    formData={formData}
                    setFormData={setFormData}
                    onNext={handleNext}
                    selectedItem={selectedItem}
                    itemType={itemType}
                    serviceType={serviceType}
                />
            )}

            {currentStep === 2 && (
                <StepTwo
                    formData={formData}
                    setFormData={setFormData}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}

            {currentStep === 3 && (
                <StepThree
                    formData={formData}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}