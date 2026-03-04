'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image'

export default function AboutUs() {
    const t = useTranslations('about');

    return (
        <>
            <section className="py-10 bg-red-50">
                <div className="max-w-7xl mx-auto py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">

                        <div className="flex flex-col w-full px-6 md:px-10 lg:px-6 item-center">
                            <h1 className='text-2xl font-bold pb-3'>{t('title')} <span className='text-red-700 text-4xl'>Mr.LUBE</span></h1>
                            <p className='text-xl ps-2 font-medium leading-relaxed'>
                                <i className="ri-double-quotes-l text-xl me-2"></i>
                                {t('description')}

                                <br /><br />
                                {t('mainService')}

                                <br /><br />
                                {t('otherServices')}
                                <br />• {t('serviceList.0')}
                                <br />• {t('serviceList.1')}
                                <br />• {t('serviceList.2')}
                                <br />• {t('serviceList.3')}
                                <br />• {t('serviceList.4')}

                                <br /><br />
                                <span className='text-red-700 font-bold'> Mr.LUBE </span>
                                {t('mission')}
                                <i className="ri-double-quotes-r text-xl ms-2 mb-3"></i>
                            </p>

                        </div>

                        <div className="flex flex-col w-full lg:px-0 justify-center items-center ">
                            <img src="/home/aboutus.png" alt="Company Logo" className="max-w-xl lg:max-w-lg h-auto rounded-4xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Mr.LUBE */}
            <section className="py-10">
                <h1 className="text-3xl mb-3 font-bold text-center">{t('whyChooseTitle', { defaultValue: 'មូលហេតុជ្រើសរើសMR.LUBE' })}</h1>
                <p className="text-center text-red-600">{t('whyChooseSubtitle', { defaultValue: 'MR.LUBE ផ្ដល់សេវាកម្មគុណភាពខ្ពស់ដើម្បីធានាថា រថយន្តរបស់អ្នកដំណើរការល្អបំផុត' })}</p>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">

                        <div className="flex flex-col items-center text-center p-4">
                            <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                                <div className="w-8 h-8"><i className="ri-check-line text-3xl"></i></div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('whyChoose.fastService', { defaultValue: 'សេវាកម្មរហ័សទាន់ចិត្ត' })}</h3>
                            <p className="text-gray-600 text-sm">
                                {t('whyChoose.fastServiceDesc', { defaultValue: 'កក់ការណាត់ជួបងាយៗ និងទទួលសេវាកម្មឆាប់រហ័ស មិនចាំយូរ។' })}
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4">
                            <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                                <div className="w-8 h-8"><i className="ri-team-line text-3xl"></i></div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('whyChoose.experts', { defaultValue: 'អ្នកជំនាញមានបទពិសោធន៍' })}</h3>
                            <p className="text-gray-600 text-sm">
                                {t('whyChoose.expertsDesc', { defaultValue: 'ក្រុមការងារដែលមានជំនាញខ្ពស់ និងបទពិសោធន៍ជាយូរឆ្នាំ។' })}
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4">
                            <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                                <div className="w-8 h-8"><i className="ri-money-dollar-circle-line text-3xl"></i></div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('whyChoose.price', { defaultValue: 'តម្លៃសមរម្យ' })}</h3>
                            <p className="text-gray-600 text-sm">
                                {t('whyChoose.priceDesc', { defaultValue: 'តម្លៃសមរម្យ និងតម្លាភាពពេញលេញ។' })}
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4">
                            <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                                <div className="w-8 h-8"><i className="ri-verified-badge-line text-3xl"></i></div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('whyChoose.quality', { defaultValue: 'គុណភាព' })}</h3>
                            <p className="text-gray-600 text-sm">
                                {t('whyChoose.qualityDesc', { defaultValue: 'យើងប្រើប្រាស់តែផលិតផលដើម និងមានគុណភាពខ្ពស់។' })}
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16 px-6 text-center">
                {/* Section Header */}
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {t('missionTitle')}
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                    {t('missionSubtitle')}
                </p>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                        <img
                            src="/home/aboutus-1.png"
                            alt="Oil Change Service"
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6 text-left">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {t('cards.oilChange.title')}
                            </h3>
                            <p className="text-gray-600">
                                {t('cards.oilChange.description')}
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                        <img
                            src="/home/aboutus-2.png"
                            alt="Car Maintenance"
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6 text-left">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {t('cards.maintenance.title')}
                            </h3>
                            <p className="text-gray-600">
                                {t('cards.maintenance.description')}
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                        <img
                            src="/home/aboutus-3.png"
                            alt="Customer Service"
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6 text-left">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {t('cards.customerService.title')}
                            </h3>
                            <p className="text-gray-600">
                                {t('cards.customerService.description')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer link */}
                <div className="mt-12">
                    <a
                        href="#"
                        className="text-red-700 font-semibold hover:underline text-lg"
                    >
                        {t('learnMore')}
                    </a>
                </div>
            </section>
        </>
    )
}