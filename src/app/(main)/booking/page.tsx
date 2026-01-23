// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import StepOne from '@/components/booking/StepOne';
// import StepTwo from '@/components/booking/StepTwo';
// import StepThree from '@/components/booking/StepThree';
// import Stepper from '@/components/booking/Stepper';


// export default function BookingPage() {
//     interface BookingItem {
//         id: number;
//         type: string;
//         name: string;
//         price: number;
//     }

//     interface FormData {
//         phone: string;
//         full_name: string;
//         car_make: string;
//         car_model: string;
//         items: BookingItem[];
//         appointment_date: string;
//         start_time: string;
//         service_location: string;
//         note: string;
//         source: string;
//     }

//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState<FormData>({
//         phone: '',
//         full_name: '',
//         car_make: '',
//         car_model: '',
//         items: [],
//         appointment_date: '',
//         start_time: '',
//         service_location: '',
//         note: '',
//         source: 'Web'
//     });

//     const router = useRouter();
//     const searchParams = useSearchParams();

//     // Get the selected item details from URL params
//     const serviceId = searchParams.get('serviceId');
//     const packageId = searchParams.get('packageId');
//     const productId = searchParams.get('productId');

//     // Example data - Replace with your actual data or API fetch
//     const services = [
//         {
//             id: 1,
//             code: 'S001',
//             title: 'ការសម្អាតរថយន្តពេញលេញ',
//             description: 'សេវាកម្មសម្អាតរថយន្តពេញលេញ',
//             image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500',
//             price: 25,
//             rating: 4.8,
//             reviews: 245,
//             duration: '2 ម៉ោង',
//             bookings: 1250
//         },
//         // Add your other services here
//     ];

//     const packages = [
//         {
//             id: 1,
//             code: 'P001',
//             title: 'Premium Care Package',
//             titleKh: 'កញ្ចប់ថែទាំពិសេស',
//             description: 'Complete car care solution',
//             image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500',
//             price: 89,
//             originalPrice: 120,
//             savings: 31,
//             rating: 4.9,
//             reviews: 456,
//             duration: '3-4 ម៉ោង',
//             services: ['សម្អាត', 'ខាក់ស៊ី', 'ពិនិត្យ'],
//             products: ['ក្រមសម្អាត', 'ប្រេងម៉ាស៊ីន']
//         },
//         // Add your other packages here
//     ];

//     const products = [
//         {
//             id: 1,
//             code: 'PR001',
//             name: 'Premium Car Wax',
//             nameKh: 'ក្រមខាក់ស៊ីពិសេស',
//             description: 'Long-lasting protection',
//             image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500',
//             price: 35,
//             rating: 4.7,
//             reviews: 189,
//             sales: 850
//         },
//         // Add your other products here
//     ];

//     // Determine which item was selected and its type
//     let selectedItem: any = null;
//     let itemType: 'service' | 'package' | 'product' | undefined = undefined;

//     if (serviceId) {
//         selectedItem = services.find(s => s.id === parseInt(serviceId));
//         itemType = 'service';
//     } else if (packageId) {
//         selectedItem = packages.find(p => p.id === parseInt(packageId));
//         itemType = 'package';
//     } else if (productId) {
//         selectedItem = products.find(p => p.id === parseInt(productId));
//         itemType = 'product';
//     }

//     // Add selected item to formData items array on mount
//     useEffect(() => {
//         if (selectedItem && itemType) {
//             const itemName = itemType === 'service'
//                 ? (selectedItem as typeof services[0]).title
//                 : itemType === 'package'
//                     ? (selectedItem as typeof packages[0]).titleKh || (selectedItem as typeof packages[0]).title
//                     : (selectedItem as typeof products[0]).nameKh || (selectedItem as typeof products[0]).name;

//             setFormData(prev => ({
//                 ...prev,
//                 items: [{
//                     id: selectedItem.id,
//                     type: itemType,
//                     name: itemName,
//                     price: selectedItem.price
//                 }]
//             }));
//         }
//     }, []);

//     const handleNext = () => {
//         setCurrentStep(currentStep + 1);
//     };

//     const handleBack = () => {
//         setCurrentStep(currentStep - 1);
//     };

//     const handleSubmit = async () => {
//         console.log('Booking Data:', formData);
//         // Call your API here
//         // const response = await fetch('/api/booking', {
//         //   method: 'POST',
//         //   body: JSON.stringify(formData)
//         // });
//         alert('ការកក់របស់អ្នកត្រូវបានដាក់ស្នើដោយជោគជ័យ!');
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 mb-10">
//             {/* Header */}
//             <div className="max-w-7xl mx-auto p-4 ">
//                 <button
//                     onClick={() => router.back()}
//                     className="mr-4 hover:opacity-80 bg-red-600 text-white px-3 py-1 rounded-sm"
//                 >
//                     ← ត្រឡប់ក្រោយ
//                 </button>
//             </div>

//             {/* Stepper */}
//             <Stepper currentStep={currentStep} />

//             {/* Step Content */}
//             {currentStep === 1 && (
//                 <StepOne
//                     formData={formData}
//                     setFormData={setFormData}
//                     onNext={handleNext}
//                     selectedItem={selectedItem}
//                     itemType={itemType}
//                 />
//             )}

//             {currentStep === 2 && (
//                 <StepTwo
//                     formData={formData}
//                     setFormData={setFormData}
//                     onNext={handleNext}
//                     onBack={handleBack}
//                 />
//             )}

//             {currentStep === 3 && (
//                 <StepThree
//                     formData={formData}
//                     onBack={handleBack}
//                     onSubmit={handleSubmit}
//                 />
//             )}
//         </div>
//     );
// }

import { Suspense } from 'react';
import BookingClient from './BookingClient';

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="p-6">Loading booking...</div>}>
            <BookingClient />
        </Suspense>
    );
}

