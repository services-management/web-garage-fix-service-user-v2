// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//     Star,
//     ArrowLeft,
//     Check,
//     Shield,
//     Package,
//     Truck,
//     Award,
//     ShoppingCart,
//     Heart,
//     Share2,
//     Plus,
//     Minus,
//     AlertCircle,
//     Tag
// } from 'lucide-react';
// import { useRouter, useParams } from 'next/navigation';
// import { getProductById } from '@/lib/api/product';

// // Skeleton Loader Component
// const ProductDetailSkeleton = () => (
//     <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//             {/* Back Button Skeleton */}
//             <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Left Column - Image Skeleton */}
//                 <div className="space-y-4">
//                     <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                         <div className="w-full h-96 bg-gray-200 animate-pulse"></div>
//                         <div className="p-4">
//                             <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Column - Info Skeleton */}
//                 <div className="space-y-6">
//                     <div className="bg-white rounded-xl shadow-lg p-8">
//                         <div className="space-y-4 animate-pulse">
//                             <div className="h-4 w-20 bg-gray-200 rounded"></div>
//                             <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
//                             <div className="h-6 w-32 bg-gray-200 rounded"></div>
//                             <div className="h-12 w-40 bg-gray-200 rounded"></div>
//                             <div className="h-4 w-24 bg-gray-200 rounded"></div>
//                             <div className="h-20 w-full bg-gray-200 rounded"></div>
//                             <div className="h-12 w-48 bg-gray-200 rounded"></div>
//                             <div className="h-14 w-full bg-gray-200 rounded"></div>
//                             <div className="grid grid-cols-2 gap-3">
//                                 <div className="h-12 bg-gray-200 rounded"></div>
//                                 <div className="h-12 bg-gray-200 rounded"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// interface ProductData {
//     product_id: number;
//     name: string;
//     selling_price: string;
//     unit_cost: string;
//     description: string;
//     image_url: string;
//     status: string;
//     category_id: number;
//     category: {
//         name: string;
//         description: string;
//         categoryID: number;
//     };
//     inventory: any;
// }

// export default function ProductDetail() {
//     const params = useParams();
//     const productId = params.id as string;
//     const router = useRouter();

//     const [loading, setLoading] = useState(true);
//     const [product, setProduct] = useState<ProductData | null>(null);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedImage, setSelectedImage] = useState(0);

//     useEffect(() => {
//         async function fetchProductData() {
//             setLoading(true);
//             try {
//                 const productRes = await getProductById(Number(productId));
//                 setProduct(productRes);
//             } catch (error) {
//                 console.error("Failed to load product:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (productId) {
//             fetchProductData();
//         }
//     }, [productId]);

//     const handleAddToCart = () => {
//         if (!product) return;
//         router.push(
//             `/booking?productId=${product.product_id}&productName=${encodeURIComponent(product.name)}&quantity=${quantity}`
//         );
//     };

//     const handleQuantityChange = (delta: number) => {
//         const newQuantity = quantity + delta;
//         const maxQuantity = product?.inventory?.quantity || 100;
//         if (newQuantity >= 1 && newQuantity <= maxQuantity) {
//             setQuantity(newQuantity);
//         }
//     };

//     // Show skeleton while loading
//     if (loading) {
//         return <ProductDetailSkeleton />;
//     }

//     // Show error state if product not found
//     if (!product) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                     <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//                     <p className="text-xl font-semibold text-gray-800 mb-4">Product not found</p>
//                     <button
//                         onClick={() => router.push('/service')}
//                         className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
//                     >
//                         Back to Products
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const isInStock = product.status === 'Active';
//     const sellingPrice = parseFloat(product.selling_price);
//     const unitCost = parseFloat(product.unit_cost);
//     const hasDiscount = sellingPrice < unitCost;
//     const discountPercentage = hasDiscount
//         ? Math.round((1 - sellingPrice / unitCost) * 100)
//         : 0;

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 {/* Back Button */}
//                 <button
//                     onClick={() => router.push('/service')}
//                     className="flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors group"
//                 >
//                     <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
//                     <span className="font-medium">Back to Products</span>
//                 </button>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//                     {/* Left Column - Image */}
//                     <div className="space-y-4">
//                         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                             <div className="relative">
//                                 <img
//                                     src={product.image_url || '/placeholder-product.png'}
//                                     alt={product.name}
//                                     className="w-full h-[500px] object-cover"
//                                 />
//                                 {/* Discount Badge */}
//                                 {hasDiscount && (
//                                     <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
//                                         -{discountPercentage}% OFF
//                                     </div>
//                                 )}
//                                 {/* Status Badge */}
//                                 <div className="absolute top-4 left-4">
//                                     <span
//                                         className={`px-4 py-2 rounded-full text-sm font-semibold ${isInStock
//                                                 ? 'bg-green-500 text-white'
//                                                 : 'bg-gray-500 text-white'
//                                             }`}
//                                     >
//                                         {product.status}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Category Info */}
//                         {product.category && (
//                             <div className="bg-white rounded-xl shadow-lg p-6">
//                                 <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
//                                     <Tag className="w-5 h-5 mr-2 text-red-600" />
//                                     Product Category
//                                 </h3>
//                                 <div className="space-y-2">
//                                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                                         <span className="text-gray-600">Category:</span>
//                                         <span className="font-semibold text-gray-900">{product.category.name}</span>
//                                     </div>
//                                     {product.category.description && (
//                                         <p className="text-gray-600 text-sm mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
//                                             {product.category.description}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Inventory Info */}
//                         {product.inventory && (
//                             <div className="bg-white rounded-xl shadow-lg p-6">
//                                 <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
//                                     <Package className="w-5 h-5 mr-2 text-red-600" />
//                                     Inventory Status
//                                 </h3>
//                                 <div className="space-y-2">
//                                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                                         <span className="text-gray-600">Available Stock:</span>
//                                         <span className="font-bold text-green-600">{product.inventory.quantity || 0} units</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Column - Product Info & Purchase */}
//                     <div className="space-y-6">
//                         <div className="bg-white rounded-xl shadow-lg p-8">
//                             {/* Product Header */}
//                             <div className="mb-6">
//                                 <div className="flex items-center gap-2 mb-2">
//                                     <span className="text-gray-500 text-sm font-mono">#{product.product_id}</span>
//                                 </div>
//                                 <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

//                                 {/* Price Section */}
//                                 <div className="mb-6">
//                                     <div className="flex items-baseline gap-3 mb-2">
//                                         <span className="text-5xl font-bold text-red-600">
//                                             ${sellingPrice.toFixed(2)}
//                                         </span>
//                                         {hasDiscount && (
//                                             <span className="text-2xl text-gray-400 line-through">
//                                                 ${unitCost.toFixed(2)}
//                                             </span>
//                                         )}
//                                     </div>
//                                     {hasDiscount && (
//                                         <p className="text-green-600 font-semibold">
//                                             You save ${(unitCost - sellingPrice).toFixed(2)} ({discountPercentage}%)
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Stock Status */}
//                                 <div className="flex items-center gap-2 mb-6">
//                                     <div className={`w-3 h-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                                     <span className={`font-semibold ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
//                                         {isInStock ? 'In Stock' : 'Out of Stock'}
//                                     </span>
//                                     {product.inventory && (
//                                         <span className="text-gray-500 ml-2">
//                                             ({product.inventory.quantity || 0} available)
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Description */}
//                             <div className="mb-6 pb-6 border-b">
//                                 <h3 className="text-lg font-bold text-gray-800 mb-3">Product Description</h3>
//                                 <p className="text-gray-600 leading-relaxed">{product.description}</p>
//                             </div>

//                             {/* Quantity Selector */}
//                             <div className="mb-6">
//                                 <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity:</label>
//                                 <div className="flex items-center gap-4">
//                                     <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
//                                         <button
//                                             onClick={() => handleQuantityChange(-1)}
//                                             disabled={quantity <= 1 || !isInStock}
//                                             className="px-4 py-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             <Minus className="w-5 h-5" />
//                                         </button>
//                                         <span className="px-8 py-3 font-bold text-xl border-x-2 border-gray-300 min-w-[80px] text-center">
//                                             {quantity}
//                                         </span>
//                                         <button
//                                             onClick={() => handleQuantityChange(1)}
//                                             disabled={quantity >= (product.inventory?.quantity || 100) || !isInStock}
//                                             className="px-4 py-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                         >
//                                             <Plus className="w-5 h-5" />
//                                         </button>
//                                     </div>
//                                     <div className="text-gray-600">
//                                         <span className="text-sm">Total:</span>
//                                         <span className="font-bold text-2xl text-red-600 ml-2">
//                                             ${(sellingPrice * quantity).toFixed(2)}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="space-y-3 mb-6">
//                                 <button
//                                     onClick={handleAddToCart}
//                                     disabled={!isInStock}
//                                     className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${isInStock
//                                             ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl'
//                                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                         }`}
//                                 >
//                                     <ShoppingCart className="w-5 h-5" />
//                                     {isInStock ? 'Add to Cart' : 'Out of Stock'}
//                                 </button>
//                                 <div className="grid grid-cols-2 gap-3">
//                                     <button className="border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
//                                         <Heart className="w-5 h-5" />
//                                         Wishlist
//                                     </button>
//                                     <button className="border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
//                                         <Share2 className="w-5 h-5" />
//                                         Share
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Benefits */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
//                                 <div className="flex items-center gap-3 text-gray-700">
//                                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                                         <Truck className="w-6 h-6 text-green-600" />
//                                     </div>
//                                     <div>
//                                         <p className="font-semibold">Free Shipping</p>
//                                         <p className="text-xs text-gray-500">Orders over $100</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-3 text-gray-700">
//                                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                                         <Shield className="w-6 h-6 text-blue-600" />
//                                     </div>
//                                     <div>
//                                         <p className="font-semibold">Quality Guaranteed</p>
//                                         <p className="text-xs text-gray-500">Authentic products</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import React, { useState, useEffect } from 'react';
import {
    Star, ArrowLeft, Shield, Package, Truck, Award,
    ShoppingCart, Heart, Share2, Plus, Minus, AlertCircle,
    Tag, CheckCircle2, X, Zap, ChevronRight, Sparkles,
    Clock, RotateCcw, MapPin, Phone, ArrowRight
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById } from '@/lib/api/product';

// ─── Skeleton ────────────────────────────────────────────────────────────────
const ProductDetailSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded-full mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="h-[550px] bg-gray-200 rounded-3xl" />
                <div className="space-y-5">
                    <div className="h-5 w-24 bg-gray-200 rounded-full" />
                    <div className="h-10 w-3/4 bg-gray-200 rounded-xl" />
                    <div className="h-14 w-40 bg-gray-200 rounded-xl" />
                    <div className="h-24 bg-gray-200 rounded-2xl" />
                    <div className="h-14 bg-gray-200 rounded-2xl" />
                    <div className="h-14 bg-gray-200 rounded-2xl" />
                </div>
            </div>
        </div>
    </div>
);

// ─── Add to Cart Modal ────────────────────────────────────────────────────────
interface CartModalProps {
    product: ProductData;
    quantity: number;
    onClose: () => void;
    onProceed: () => void;
}

const AddToCartModal = ({ product, quantity, onClose, onProceed }: CartModalProps) => {
    const sellingPrice = parseFloat(product.selling_price);
    const total = sellingPrice * quantity;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-0 md:p-4">
                <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-lg shadow-2xl animate-slideUp overflow-hidden">

                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-[#DC2626] to-[#F97316] p-6 text-white">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-white/80 text-sm font-semibold">Added to Cart</p>
                                <h3 className="text-xl font-black">Order Summary</h3>
                            </div>
                        </div>
                    </div>

                    {/* Product Preview */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex gap-4 items-center">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-md">
                                <img
                                    src={product.image_url || '/placeholder-product.jpg'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400 font-semibold mb-1">#{product.product_id}</p>
                                <h4 className="font-black text-gray-900 text-base leading-snug line-clamp-2 mb-1">{product.name}</h4>
                                <p className="text-sm text-gray-500">{product.category?.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-semibold">Unit Price</span>
                            <span className="font-black text-gray-900">${sellingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-semibold">Quantity</span>
                            <span className="font-black text-gray-900">× {quantity}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-2 border-red-100">
                            <span className="text-gray-800 font-black text-lg">Total</span>
                            <span className="text-2xl font-black text-[#DC2626]">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Delivery Note */}
                    <div className="px-6 pb-2">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                            <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <p className="text-sm text-green-700 font-semibold">Free delivery on orders over $100</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 pt-4 space-y-3">
                        <button
                            onClick={onProceed}
                            className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white font-black text-lg rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
                        >
                            <Zap className="w-5 h-5" />
                            Proceed to Booking
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProductData {
    product_id: number;
    name: string;
    selling_price: string;
    unit_cost: string;
    description: string;
    image_url: string;
    status: string;
    category_id: number;
    category: { name: string; description: string; categoryID: number };
    inventory: any;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductDetail() {
    const params = useParams();
    const productId = params.id as string;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<ProductData | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

    useEffect(() => {
        async function fetchProductData() {
            setLoading(true);
            try {
                const productRes = await getProductById(Number(productId));
                setProduct(productRes);
            } catch (error) {
                console.error('Failed to load product:', error);
            } finally {
                setLoading(false);
            }
        }
        if (productId) fetchProductData();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;
        setShowCartModal(true);
    };

    const handleProceedToBooking = () => {
        if (!product) return;
        router.push(
            `/booking?productId=${product.product_id}&productName=${encodeURIComponent(product.name)}&quantity=${quantity}`
        );
    };

    const handleQuantityChange = (delta: number) => {
        const max = product?.inventory?.quantity || 100;
        setQuantity(q => Math.min(Math.max(1, q + delta), max));
    };

    if (loading) return <ProductDetailSkeleton />;

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-800 mb-4">Product not found</p>
                    <button
                        onClick={() => router.push('/service')}
                        className="bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const isInStock = product.status === 'Active';
    const sellingPrice = parseFloat(product.selling_price);
    const unitCost = parseFloat(product.unit_cost);
    const hasDiscount = sellingPrice < unitCost;
    const discountPct = hasDiscount ? Math.round((1 - sellingPrice / unitCost) * 100) : 0;

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Hanuman:wght@400;700;900&display=swap');
                body { font-family: 'Poppins', 'Hanuman', sans-serif; }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
                .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
                .animate-slideInLeft { animation: slideInLeft 0.5s ease-out forwards; }
                .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; }

                .product-image-wrap:hover .product-img { transform: scale(1.05); }
                .product-img { transition: transform 0.6s ease; }

                .qty-btn:hover { background: #fee2e2; }
                .qty-btn:active { transform: scale(0.92); }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">

                {/* ── Top Nav Bar ─────────────────────────────────── */}
                <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                        <button
                            onClick={() => router.push('/service')}
                            className="flex items-center gap-2 text-gray-600 hover:text-[#DC2626] font-bold transition-colors group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-red-50 flex items-center justify-center transition-colors">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            </div>
                            <span className="hidden sm:block">Back to Products</span>
                        </button>

                        {/* Breadcrumb */}
                        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                            <span className="hover:text-[#DC2626] cursor-pointer font-semibold" onClick={() => router.push('/service')}>Products</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-gray-900 font-bold line-clamp-1 max-w-[200px]">{product.name}</span>
                        </div>

                        <button
                            onClick={() => setIsWishlisted(w => !w)}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'}`}
                        >
                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* ── Main Content ─────────────────────────────────── */}
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                        {/* ── LEFT: Image Panel ─────────────────────── */}
                        <div className="animate-slideInLeft">
                            {/* Main Image */}
                            <div className="product-image-wrap relative rounded-3xl overflow-hidden bg-white shadow-2xl mb-4 aspect-square">
                                <img
                                    src={product.image_url || '/placeholder-product.png'}
                                    alt={product.name}
                                    className="product-img w-full h-full object-cover"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {hasDiscount && (
                                        <div className="px-3 py-1.5 bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white text-xs font-black rounded-full shadow-lg">
                                            -{discountPct}% OFF
                                        </div>
                                    )}
                                    <div className={`px-3 py-1.5 text-xs font-black rounded-full shadow-lg ${isInStock ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                        {isInStock ? '● In Stock' : '● Out of Stock'}
                                    </div>
                                </div>

                                {/* Floating product ID */}
                                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-lg">
                                    #PRD{product.product_id}
                                </div>

                                {/* Gradient overlay bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>

                            {/* Info Cards Row */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: Shield, label: 'Quality', sub: 'Guaranteed', color: 'blue' },
                                    { icon: Truck, label: 'Free Delivery', sub: 'Over $100', color: 'green' },
                                    { icon: RotateCcw, label: 'Easy Return', sub: '30 days', color: 'orange' },
                                ].map(({ icon: Icon, label, sub, color }) => (
                                    <div key={label} className="bg-white rounded-2xl p-4 shadow-md text-center border border-gray-100">
                                        <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : 'bg-orange-100'
                                            }`}>
                                            <Icon className={`w-5 h-5 ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : 'text-orange-600'
                                                }`} />
                                        </div>
                                        <p className="text-xs font-black text-gray-900">{label}</p>
                                        <p className="text-xs text-gray-500">{sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: Product Info ────────────────────── */}
                        <div className="animate-slideInRight space-y-6">

                            {/* Category pill */}
                            {product.category && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full">
                                    <Tag className="w-4 h-4 text-[#DC2626]" />
                                    <span className="text-sm font-bold text-[#DC2626]">{product.category.name}</span>
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                                {product.name}
                            </h1>

                            {/* Rating Row */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-gray-700">4.7</span>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-500 font-semibold">150 reviews</span>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-green-600 font-bold">400 sold</span>
                            </div>

                            {/* Price Block */}
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                                        ${sellingPrice.toFixed(2)}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-2xl text-gray-500 line-through font-semibold">
                                            ${unitCost.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                {hasDiscount && (
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-green-400" />
                                        <p className="text-green-400 font-bold text-sm">
                                            You save ${(unitCost - sellingPrice).toFixed(2)} ({discountPct}% off)
                                        </p>
                                    </div>
                                )}
                                {/* Stock indicator */}
                                <div className="mt-4 flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full ${isInStock ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]' : 'bg-red-400'}`} />
                                    <span className={`text-sm font-bold ${isInStock ? 'text-green-400' : 'text-red-400'}`}>
                                        {isInStock ? `In Stock — ${product.inventory?.quantity || 0} units available` : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div>
                                <label className="block text-sm font-black text-gray-700 mb-3">Select Quantity</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1 || !isInStock}
                                            className="qty-btn w-12 h-12 flex items-center justify-center text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-16 text-center font-black text-xl text-gray-900 border-x-2 border-gray-200 py-2">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={quantity >= (product.inventory?.quantity || 100) || !isInStock}
                                            className="qty-btn w-12 h-12 flex items-center justify-center text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Running total */}
                                    <div className="flex-1 bg-red-50 border-2 border-red-100 rounded-2xl px-4 py-3 flex items-center justify-between">
                                        <span className="text-sm text-gray-600 font-semibold">Subtotal</span>
                                        <span className="text-xl font-black text-[#DC2626]">
                                            ${(sellingPrice * quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-3 pt-2">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!isInStock}
                                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-200 flex items-center justify-center gap-3 ${isInStock
                                            ? 'bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98]'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    {isInStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setIsWishlisted(w => !w)}
                                        className={`py-3.5 rounded-2xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${isWishlisted
                                                ? 'border-red-500 bg-red-50 text-red-600'
                                                : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                        {isWishlisted ? 'Saved' : 'Wishlist'}
                                    </button>
                                    <button className="py-3.5 rounded-2xl font-bold border-2 border-gray-200 text-gray-600 hover:border-gray-400 transition-all flex items-center justify-center gap-2">
                                        <Share2 className="w-5 h-5" />
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Tabs Section ──────────────────────────────── */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16 border border-gray-100">
                        {/* Tab Nav */}
                        <div className="flex border-b border-gray-100">
                            {(['description', 'specs', 'reviews'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-4 text-sm font-bold capitalize transition-all border-b-2 ${activeTab === tab
                                            ? 'border-[#DC2626] text-[#DC2626] bg-red-50/50'
                                            : 'border-transparent text-gray-500 hover:text-gray-800'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            {activeTab === 'description' && (
                                <div className="animate-fadeIn">
                                    <h3 className="text-xl font-black text-gray-900 mb-4">About This Product</h3>
                                    <p className="text-gray-600 leading-relaxed text-base mb-6">
                                        {product.description || 'No description available.'}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            'Premium quality materials',
                                            'Compatible with most vehicles',
                                            'Easy installation',
                                            'Long-lasting performance',
                                        ].map(point => (
                                            <div key={point} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-sm font-semibold text-gray-700">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'specs' && (
                                <div className="animate-fadeIn">
                                    <h3 className="text-xl font-black text-gray-900 mb-4">Specifications</h3>
                                    <div className="space-y-2">
                                        {[
                                            { label: 'Product ID', value: `#PRD${product.product_id}` },
                                            { label: 'Category', value: product.category?.name || '—' },
                                            { label: 'Status', value: product.status },
                                            { label: 'Stock Available', value: `${product.inventory?.quantity || 0} units` },
                                            { label: 'Unit Price', value: `$${sellingPrice.toFixed(2)}` },
                                        ].map(({ label, value }) => (
                                            <div key={label} className="flex items-center justify-between py-3 px-4 rounded-xl even:bg-gray-50">
                                                <span className="text-gray-500 font-semibold text-sm">{label}</span>
                                                <span className="text-gray-900 font-black text-sm">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="animate-fadeIn">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="text-center">
                                            <div className="text-6xl font-black text-gray-900">4.7</div>
                                            <div className="flex justify-center gap-0.5 my-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-5 h-5 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-500 font-semibold">150 reviews</p>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            {[5, 4, 3, 2, 1].map(star => (
                                                <div key={star} className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-gray-600 w-4">{star}</span>
                                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"
                                                            style={{ width: `${[75, 15, 6, 2, 2][5 - star]}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-400 w-8">{[75, 15, 6, 2, 2][5 - star]}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-center text-gray-500 text-sm py-4">Detailed reviews coming soon.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Add to Cart Modal ─────────────────────────────── */}
            {showCartModal && product && (
                <AddToCartModal
                    product={product}
                    quantity={quantity}
                    onClose={() => setShowCartModal(false)}
                    onProceed={handleProceedToBooking}
                />
            )}
        </>
    );
}