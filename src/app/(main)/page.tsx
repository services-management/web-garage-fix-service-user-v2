'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ServiceCard from '@/components/service/serviceCard';
import Image from "next/image";
import Link from "next/link";

const getPopularServices = (t: any) => [
  {
    id: 1,
    title: t('services.oilChange'),
    titleEn: 'Premium Oil Change',
    code: '#0001',
    price: 25.0,
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500',
    description: t('services.oilChangeDesc'),
    rating: 4.8,
    reviews: 124,
    duration: '30 min',
    bookings: 450,
  },
  {
    id: 2,
    title: t('services.brakeCleaning'),
    titleEn: 'Brake Cleaning',
    code: '#0002',
    price: 35.0,
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500',
    description: t('services.brakeCleaningDesc'),
    rating: 4.9,
    reviews: 98,
    duration: '45 min',
    bookings: 380,
  },
  {
    id: 3,
    title: t('services.engineCheck'),
    titleEn: 'Engine Check',
    code: '#0003',
    price: 40.0,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
    description: t('services.engineCheckDesc'),
    rating: 4.7,
    reviews: 156,
    duration: '60 min',
    bookings: 290,
  },
];

export default function Home() {
  const router = useRouter();
  const t = useTranslations();
  const popularServices = getPopularServices(t);

  return (
    <>
      {/* Herobanner */}
      <section className="relative h-[90vh] bg-gray-900">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/home/banner.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t('home.hero.title')}</h1>
            <p className="text-lg mb-8 text-gray-200 text-pretty">{t('home.hero.subtitle')}</p>
            <Link href="/aboutUs" className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 text-lg rounded-lg">{t('home.hero.cta')}</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Mr.LUBE */}
      <section className="py-10">
        <h1 className="text-3xl mb-3 font-bold text-center">{t('home.whyChoose.title')}</h1>
        <p className="text-center text-red-600">{t('home.whyChoose.subtitle')}</p>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">

            <div className="flex flex-col items-center text-center p-4">
              <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                <div className="w-8 h-8"><i className="ri-check-line text-3xl"></i></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.whyChoose.features.fastService.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('home.whyChoose.features.fastService.description')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                <div className="w-8 h-8"><i className="ri-team-line text-3xl"></i></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.whyChoose.features.experts.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('home.whyChoose.features.experts.description')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                <div className="w-8 h-8"><i className="ri-money-dollar-circle-line text-3xl"></i></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.whyChoose.features.price.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('home.whyChoose.features.price.description')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                <div className="w-8 h-8"><i className="ri-verified-badge-line text-3xl"></i></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.whyChoose.features.quality.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('home.whyChoose.features.quality.description')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Service */}
      <section className="py-10 bg-red-50">
        <h1 className="text-3xl mb-3 font-bold text-center">
          {t('home.popularServices.title')}
        </h1>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service, index) => (
              <div
                key={service.id}
                onClick={() => router.push(`/service/service/${service.id}`)}
                className="cursor-pointer"
              >
                <ServiceCard
                  service={service}
                  isPopular={true}
                  rank={index + 1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Way to Find us */}
      <section className="py-10">
        <h1 className="text-3xl mb-3 font-bold text-center">{t('home.findUs.title')}</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div className="flex flex-col w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-100">
              <div className="bg-red-700 text-center pb-2">
                <div className="w-100 py-2">
                  <i className="ri-map-pin-line text-white text-5xl"></i>
                </div>
                <span className="text-xl text-white font-medium">
                  {t('home.findUs.address.title')}
                </span>
              </div>

              <div className="p-4">
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                  {t('home.findUs.address.value')}
                </h5>
                <Link href="https://maps.app.goo.gl/rLnv5o5YP27BVQ7C6?g_st=com.google.maps.preview.copy" className="text-red-700 hover:text-red-800 ">{t('home.findUs.address.viewMap')}<i className="ri-arrow-right-up-line"></i></Link>
              </div>
            </div>

            <div className="flex flex-col w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-100">
              <div className="bg-red-700 text-center pb-2">
                <div className="w-100 py-2">

                  <i className="ri-phone-line text-white text-5xl"></i>
                </div>
                <span className="text-xl text-white font-medium">
                  {t('home.findUs.phone.title')}
                </span>
              </div>

              <div className="p-4">
                <div className="text-center">
                  <p className="text-xl">+855 89 885 151</p>
                  <p className="text-xl">+855 85 544 343</p>
                </div>
                <div className="flex justify-between py-3">
                  <p className="text-slate-400 text-lg pt-1">{t('home.findUs.phone.contactUs')}</p>
                  <Link href="https://t.me/MrLube9" className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-lg rounded-sm">{t('home.findUs.phone.callNow')}</Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-100">
              <div className="bg-red-700 text-center pb-2">
                <div className="w-100 py-2">
                  <i className="ri-time-line text-white text-5xl"></i>
                </div>
                <span className="text-xl text-white font-medium">
                  {t('home.findUs.hours.title')}
                </span>
              </div>

              <div className="p-4">
                <div className="flex justify-between border-b border-slate-400 pb-2">
                  <p className="text-xl text-slate-400">{t('home.findUs.hours.weekdays')}</p>
                  <p className="text-xl">{t('home.findUs.hours.time')}</p>
                </div>
                <div className="flex justify-between border-b border-slate-400 pb-2 pt-2">
                  <p className="text-xl text-slate-400">{t('home.findUs.hours.saturday')}</p>
                  <p className="text-xl">{t('home.findUs.hours.time')}</p>
                </div>
                <p className="text-xl text-slate-400 pt-2">{t('home.findUs.hours.sunday')}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="relative h-[50vh] py-10">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/home/homebanner.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative px-4 h-full text-center pt-10">
          <div className=" text-white">
            <h1 className="text-3xl font-bold mb-4 ">{t('home.ctaSection.title')}</h1>
            <p className="text-lg mb-8 text-gray-200 text-pretty">{t('home.ctaSection.subtitle')}</p>
            <div className="flex justify-center gap-4">
              <Link href="" className="bg-red-700 hover:bg-white hover:text-red-700 text-white px-8 py-2 text-lg rounded-lg">{t('home.ctaSection.callNow')}</Link>
              <Link href="https://maps.app.goo.gl/rLnv5o5YP27BVQ7C6?g_st=com.google.maps.preview.copy" className="bg-white hover:bg-red-700 hover:text-white text-red-700 px-8 py-2 text-lg rounded-lg">{t('home.ctaSection.viewLocation')}</Link>
            </div>
          </div>
        </div>
      </section>

    </>

  );
}
