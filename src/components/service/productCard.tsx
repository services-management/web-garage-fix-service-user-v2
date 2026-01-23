import React from 'react';
import { Star, TrendingUp, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: any;
    isPopular?: boolean;
    rank?: number | null;
}

export default function ProductCard({ product, isPopular = false, rank = null }: ProductCardProps) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
            <div className="relative overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name} 
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
                        <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 z-10">
                            <TrendingUp className="w-4 h-4" />
                            លក់ដាច់ #{rank}
                        </div>
                        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 z-10">
                            {product.sales}+ លក់
                        </div>
                    </>
                )}
            </div>
            <div className={isPopular ? "p-6" : "p-5"}>
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`${isPopular ? 'text-xl' : 'text-lg'} font-bold text-gray-800`}>
                        {product.nameKh}
                    </h3>
                    <span className="text-sm text-gray-500">{product.code}</span>
                </div>
                <p className={`text-gray-500 text-sm ${isPopular ? 'mb-3' : 'mb-3'}`}>
                    {product.name}
                </p>
                <p className={`text-gray-600 ${isPopular ? 'mb-4' : 'text-sm mb-3'}`}>
                    {product.description}
                </p>

                <div className={`flex items-center mb-4 ${!isPopular && 'text-sm'}`}>
                    <Star className={`${isPopular ? 'w-5 h-5' : 'w-4 h-4'} text-yellow-400 fill-current`} />
                    <span className="ml-1 font-semibold">{product.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
                </div>

                <div className={`flex items-center justify-between ${isPopular && 'pt-4 border-t'}`}>
                    <span className={`${isPopular ? 'text-3xl' : 'text-2xl'} font-bold text-red-600`}>
                        ${product.price}
                    </span>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                                `/booking?productId=${product.id}&productName=${encodeURIComponent(product.name)}`
                            );
                        }}
                        className={`bg-green-600 text-white ${isPopular ? 'px-6 py-3' : 'px-5 py-2 text-sm'} rounded-lg hover:bg-green-700 transition-colors font-semibold`}
                    >
                        {isPopular ? 'ទិញឥឡូវ' : 'ទិញ'}
                    </button>
                </div>
            </div>
        </div>
    );
}