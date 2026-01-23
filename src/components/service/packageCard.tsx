import React from 'react';
import { Star, Clock, Award, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PackageCardProps {
    pkg: any;
    isPopular?: boolean;
}

export default function PackageCard({ pkg, isPopular = false }: PackageCardProps) {
    const router = useRouter();

    return (
        <div className={`bg-white rounded-xl ${isPopular ? 'shadow-xl hover:shadow-2xl border-2 border-red-100' : 'shadow-md hover:shadow-xl'} transition-all duration-300 overflow-hidden group cursor-pointer`}>
            <div className="relative overflow-hidden">
                <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className={`w-full ${isPopular ? 'h-64' : 'h-56'} object-cover group-hover:scale-110 transition-transform duration-300`} 
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-12 h-12 text-white mx-auto mb-2" />
                        <p className="text-white font-bold text-lg">មើលព័ត៌មានលម្អិត</p>
                        <p className="text-white text-sm opacity-90">View Details</p>
                    </div>
                </div>
                <div className={`absolute top-4 left-4 ${isPopular ? 'bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 shadow-lg' : 'bg-red-600 px-4 py-2'} text-white rounded-full font-bold z-10`}>
                    សន្សំ ${pkg.savings}
                </div>
                {isPopular && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2 z-10">
                        <Star className="w-4 h-4 fill-current" />
                        ពេញនិយម
                    </div>
                )}
            </div>
            <div className={isPopular ? "p-8" : "p-6"}>
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className={`${isPopular ? 'text-2xl' : 'text-xl'} font-bold text-gray-800 mb-1`}>
                            {pkg.titleKh}
                        </h3>
                        <p className={`${isPopular ? 'text-gray-600' : 'text-gray-500'}`}>
                            {pkg.title}
                        </p>
                    </div>
                    <span className="text-sm text-gray-500">{pkg.code}</span>
                </div>

                <p className={`text-gray-600 ${isPopular ? 'mb-6' : 'mb-4'}`}>
                    {pkg.description}
                </p>

                <div className={`flex items-center ${isPopular ? 'gap-4 mb-6' : 'gap-3 mb-4'}`}>
                    <div className="flex items-center">
                        <Star className={`${isPopular ? 'w-5 h-5' : 'w-4 h-4'} text-yellow-400 fill-current`} />
                        <span className="ml-1 font-semibold">{pkg.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({pkg.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock className={`${isPopular ? 'w-4 h-4' : 'w-4 h-4'} mr-1`} />
                        <span className="text-sm">{pkg.duration}</span>
                    </div>
                </div>

                <div className={`space-y-${isPopular ? '4' : '3'} ${isPopular ? 'mb-6' : 'mb-4'}`}>
                    <div>
                        <p className={`${isPopular ? 'font-bold text-gray-800 mb-2' : 'font-semibold text-gray-800 text-sm mb-1'}`}>
                            សេវាកម្ម:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {pkg.services.map((service: string, idx: number) => (
                                <span 
                                    key={idx} 
                                    className={`${isPopular ? 'bg-blue-100 text-blue-700 px-3 py-1 text-sm' : 'bg-blue-50 text-blue-700 px-2 py-1 text-xs'} rounded-full font-medium`}
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className={`${isPopular ? 'font-bold text-gray-800 mb-2' : 'font-semibold text-gray-800 text-sm mb-1'}`}>
                            ផលិតផល:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {pkg.products.map((product: string, idx: number) => (
                                <span 
                                    key={idx} 
                                    className={`${isPopular ? 'bg-green-100 text-green-700 px-3 py-1 text-sm' : 'bg-green-50 text-green-700 px-2 py-1 text-xs'} rounded-full font-medium`}
                                >
                                    {product}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`flex items-center justify-between ${isPopular ? 'pt-6' : 'pt-4'} border-t`}>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className={`${isPopular ? 'text-3xl' : 'text-2xl'} font-bold text-red-600`}>
                                ${pkg.price}
                            </span>
                            <span className={`text-gray-400 line-through ${!isPopular && 'text-sm'}`}>
                                ${pkg.originalPrice}
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                                `/booking?packageId=${pkg.id}&packageName=${encodeURIComponent(pkg.title)}`
                            );
                        }}
                        className={`bg-red-600 text-white ${isPopular ? 'px-8 py-3' : 'px-6 py-2'} rounded-lg hover:bg-red-700 transition-colors font-semibold`}
                    >
                        កក់ឥឡូវ
                    </button>
                </div>
            </div>
        </div>
    );
}