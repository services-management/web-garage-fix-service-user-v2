import Image from "next/image"
import Link from "next/link"

export default function Contact() {
    return (
        <>
            {/* banner */}
            <section className="relative h-[50vh] py-10">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/home/servicebanner.webp')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                {/* Content - REMOVED 'container' and 'mx-auto' for full width */}
                <div className="relative px-4 h-full text-center pt-10">
                    <div className=" text-white">
                        <h1 className="text-3xl font-bold mb-4 ">ត្រៀមខ្លួនសម្រាប់ការណាត់ជួប?</h1>
                        <p className="text-lg mb-8 text-gray-200 text-pretty">ទាក់ទងមកយើងឥឡូវនេះ ឬមកទស្សនាយើងដើម្បីទទួលបានសេវាកម្មគុណភាពខ្ពស់</p>
                        <div className="flex justify-center gap-4">
                            <Link href="" className="bg-red-700 hover:bg-white hover:text-red-700 text-white px-8 py-2 text-lg rounded-lg">ទូរស័ព្ទឥឡូវនេះ</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* form for contact */}
            <section className="py-10 bg-red-50">
                <div className="max-w-7xl mx-auto py-10 bg-white rounded-lg shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                        <div className="flex flex-col w-full px-4 lg:px-0 justify-center items-center">
                            <img src="/home/Logo.png" alt="Company Logo" className="max-w-xs lg:max-w-md h-auto" />
                        </div>

                        <div className="flex flex-col w-full px-6 md:px-10 lg:px-6">

                            <form className="w-full max-w-md mx-auto">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">សរសេរសាររបស់លោកអ្នកនៅទីនេះ</h2>

                                <div className="mb-5">
                                    <label htmlFor="email" className="block mb-2 text-lg font-bold text-gray-900 ">ឈ្មោះពេញរបស់អ្នក</label>
                                    <input type="email" id="email" className="border w-full shadow-sm p-2.5 rounded-lg" placeholder="ឈ្មោះពេញរបស់អ្នក" />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="phoneNumber" className="block mb-2 text-lg font-bold text-gray-900 ">លេខទូរស័ព្ទ</label>
                                    <input type="text" id="phoneNumber" className="border w-full shadow-sm p-2.5 rounded-lg" placeholder="លេខទូរស័ព្ទ" />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="message" className="block mb-2 text-lg font-bold text-gray-900 ">សាររបស់អ្នក</label>
                                    <textarea id="message" rows={4} className="border w-full shadow-sm p-2.5 rounded-lg" placeholder="សាររបស់អ្នក..."></textarea>
                                </div>


                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">បញ្ចូន</button>
                            </form>

                        </div>
                    </div>
                </div>
            </section>

            {/* Way to Find us */}
            <section className="py-10">
                <h1 className="text-3xl mb-3 font-bold text-center">ស្វែងរកពួកយើង</h1>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        <div className="flex flex-col w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-100">
                            <div className="bg-red-700 text-center pb-2">
                                <div className="w-100 py-2">
                                    <i className="ri-map-pin-line text-white text-5xl"></i>
                                </div>
                                <span className="text-xl text-white font-medium">
                                    អាស័យដ្ធាន
                                </span>
                            </div>

                            <div className="p-4">
                                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                    ផ្លូវ៦០ម៉ែត្រ សង្កាត់ទឹកថ្លាខណ្ឌសែនសុខរាជធានីភ្នំពេញព្រះរាជាណាចក្រកម្ពុជា
                                </h5>
                                <Link href="https://maps.app.goo.gl/rLnv5o5YP27BVQ7C6?g_st=com.google.maps.preview.copy" className="text-red-700 hover:text-red-800 ">មើលផែនទី<i className="ri-arrow-right-up-line"></i></Link>
                            </div>
                        </div>

                        <div className="flex flex-col w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-100">
                            <div className="bg-red-700 text-center pb-2">
                                <div className="w-100 py-2">

                                    <i className="ri-phone-line text-white text-5xl"></i>
                                </div>
                                <span className="text-xl text-white font-medium">
                                    លេខទូរស័ព្ទ
                                </span>
                            </div>

                            <div className="p-4">
                                <div className="text-center">
                                    <p className="text-xl">+855 89 885 151</p>
                                    <p className="text-xl">+855 85 544 343</p>
                                </div>
                                <div className="flex justify-between py-3">
                                    <p className="text-slate-400 text-lg pt-1">ទាក់ទងមកកាន់យើងគ្រប់ពេល</p>
                                    <Link href="https://t.me/MrLube9" className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-lg rounded-sm">ទូរស័ព្ទឥឡូវនេះ</Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-100">
                            <div className="bg-red-700 text-center pb-2">
                                <div className="w-100 py-2">
                                    <i className="ri-time-line text-white text-5xl"></i>
                                </div>
                                <span className="text-xl text-white font-medium">
                                    ម៉ោងធ្វើការ
                                </span>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between border-b border-slate-400 pb-2">
                                    <p className="text-xl text-slate-400">ច័ន្ទ-សុក្រ</p>
                                    <p className="text-xl">7:30 - 5:00</p>
                                </div>
                                <div className="flex justify-between border-b border-slate-400 pb-2 pt-2">
                                    <p className="text-xl text-slate-400">សៅរ៍</p>
                                    <p className="text-xl">7:30 - 5:00</p>
                                </div>
                                <p className="text-xl text-slate-400 pt-2">អាទិត្យ</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="bg-gray-100 py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-xl font-semibold text-gray-700 mb-2">
                            ទីតាំង
                        </h1>
                        <p className="text-3xl md:text-4xl text-blue-700">
                            ពួកយើងនៅទីនេះដើម្បីជួយលោកអ្នក
                        </p>
                    </div>

                    <div className="shadow-2xl overflow-hidden border border-gray-300">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.644629677044!2d104.89106149999999!3d11.5474284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951006c9ff8c5%3A0x3d16847e68168362!2zTXItTHViZSAo4Z6f4Z-B4Z6c4Z624Z6A4Z6Y4Z-S4Z6Y4Z6U4Z-S4Z6P4Z684Z6a4Z6U4Z-S4Z6a4Z-B4Z6E4Z6Y4Z-J4Z624Z6f4Z-K4Z644Z6T4Z6h4Z624Z6T4Z6C4Z-S4Z6a4Z6U4Z-L4Z6U4Z-S4Z6a4Z6X4Z-B4Z6RKQ!5e1!3m2!1sen!2skh!4v1762669362468!5m2!1sen!2skh" 
                            width="100%" 
                            height="500" 
                            style={{ border: 0 }}
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-96 sm:h-[500px]"
                        ></iframe>
                    </div>

                </div>
            </section>
        </>
    )


}