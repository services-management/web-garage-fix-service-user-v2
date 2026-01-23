import React from 'react';
import { Star, Clock, Award, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation'; 

interface ServiceCardProps {
    service: any;
    isPopular?: boolean;
    rank?: number | null;
}

export default function ServiceCard({ service, isPopular = false, rank = null }: ServiceCardProps) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
            <div className="relative overflow-hidden">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-12 h-12 text-white mx-auto mb-2" />
                        <p className="text-white font-bold text-lg">មើលព័ត៌មានលម្អិត</p>
                        <p className="text-white text-sm opacity-90">View Details</p>
                    </div>
                </div>
                {isPopular && rank && (
                    <>
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 z-10">
                            <Award className="w-4 h-4" />
                            #{rank} ពេញនិយម
                        </div>
                        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 z-10">
                            {service.bookings}+ កក់
                        </div>
                    </>
                )}
            </div>
            <div className={isPopular ? "p-6" : "p-5"}>
                <div className="flex justify-between items-start mb-3">
                    <h3 className={`${isPopular ? 'text-xl' : 'text-lg'} font-bold text-gray-800`}>
                        {service.title}
                    </h3>
                    <span className="text-sm text-gray-500">{service.code}</span>
                </div>
                <p className={`text-gray-600 mb-4 ${isPopular ? 'line-clamp-2' : 'text-sm mb-3'}`}>
                    {service.description}
                </p>

                <div className={`flex items-center ${isPopular ? 'gap-4' : 'gap-3'} mb-4 ${!isPopular && 'text-sm'}`}>
                    <div className="flex items-center">
                        <Star className={`${isPopular ? 'w-5 h-5' : 'w-4 h-4'} text-yellow-400 fill-current`} />
                        <span className="ml-1 font-semibold">{service.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({service.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock className={`${isPopular ? 'w-4 h-4' : 'w-4 h-4'} mr-1`} />
                        <span className={`!isPopular && 'text-sm'`}>{service.duration}</span>
                    </div>
                </div>

                <div className={`flex items-center justify-between ${isPopular && 'pt-4 border-t'}`}>
                    <span className={`${isPopular ? 'text-3xl' : 'text-2xl'} font-bold text-red-600`}>
                        ${service.price}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); 
                            router.push(
                                `/booking?serviceId=${service.id}&serviceName=${encodeURIComponent(service.title)}`
                            );
                        }}
                        className={`bg-red-600 text-white ${isPopular ? 'px-6 py-3' : 'px-5 py-2 text-sm'
                            } rounded-lg hover:bg-red-700 transition-colors font-semibold`}
                    >
                        {isPopular ? 'កក់ឥឡូវ' : 'កក់'}
                    </button>

                </div>
            </div>
        </div>
    );
}