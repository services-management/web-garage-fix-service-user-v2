import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

        {/* Content - REMOVED 'container' and 'mx-auto' for full width */}
        <div className="relative px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">សូមស្វាគមន៍មកកាន់MR.LUBEជា ក្រុមហ៊ុនរបស់យើង</h1>
            <p className="text-lg mb-8 text-gray-200 text-pretty">យើងផ្តល់សេវាកម្មថែទាំរថយន្តគ្រប់ប្រភេទដោយបច្ចេកទេសទំនើប</p>
            <Link href="/aboutUs" className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 text-lg rounded-lg">ស្វែងយល់បន្ថែម</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Mr.LUBE */}
      <section className="py-10">
        <h1 className="text-3xl mb-3 font-bold text-center">មូលហេតុជ្រើសរើសMR.LUBE</h1>
        <p className="text-center text-red-600">MR.LUBE ផ្ដល់សេវាកម្មគុណភាពខ្ពស់ដើម្បីធានាថា រថយន្តរបស់អ្នកដំណើរការល្អបំផុត</p>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">

            <div className="flex flex-col items-center text-center p-4">
              <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                <div className="w-8 h-8"><i className="ri-check-line text-3xl"></i></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">សេវាកម្មរហ័សទាន់ចិត្ត</h3>
              <p className="text-gray-600 text-sm">
                កក់ការណាត់ជួបងាយៗ និងទទួលសេវាកម្មឆាប់រហ័ស មិនចាំយូរ។
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                <div className="w-8 h-8"><i className="ri-team-line text-3xl"></i></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">អ្នកជំនាញមានបទពិសោធន៍</h3>
              <p className="text-gray-600 text-sm">
                ក្រុមការងារដែលមានជំនាញខ្ពស់ និងបទពិសោធន៍ជាយូរឆ្នាំ។
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                <div className="w-8 h-8"><i className="ri-money-dollar-circle-line text-3xl"></i></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">តម្លៃសមរម្យ</h3>
              <p className="text-gray-600 text-sm">
                តម្លៃយុត្តិធម៌ និងតម្លាភាពពេញលេញ។
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="text-white bg-red-700 rounded-full p-4 mb-4">
                <div className="w-8 h-8"><i className="ri-verified-badge-line text-3xl"></i></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">គុណភាព</h3>
              <p className="text-gray-600 text-sm">
                យើងប្រើប្រាស់តែផលិតផលដើម និងមានគុណភាពខ្ពស់។
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Service */}
      <section className="py-10 bg-red-50">
        <h1 className="text-3xl mb-3 font-bold text-center">សេវាកម្មដែលពេញនិយម</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">

            <div className="flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700 ">
              <div className="text-center p-4"><i className="ri-oil-line text-8xl"></i></div>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight ">សេវាកម្មប្តូរប្រេងម៉ាសុីន</h5>
                </a>
                <div className="flex items-center my-2">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-half-line text-yellow-400"></i>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ">4.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold ">$599</span>
                  <a href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">ព័ត៍មានលម្អិត</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700 ">
              <div className="text-center p-4"><i className="ri-oil-line text-8xl"></i></div>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight ">សេវាកម្មប្តូរប្រេងម៉ាសុីន</h5>
                </a>
                <div className="flex items-center my-2">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-half-line text-yellow-400"></i>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">4.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold ">$599</span>
                  <a href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">ព័ត៍មានលម្អិត</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700 ">
              <div className="text-center p-4"><i className="ri-oil-line text-8xl"></i></div>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight ">សេវាកម្មប្តូរប្រេងម៉ាសុីន</h5>
                </a>
                <div className="flex items-center my-2">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-fill text-yellow-400"></i>
                    <i className="ri-star-half-line text-yellow-400"></i>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">4.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold ">$599</span>
                  <a href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">ព័ត៍មានលម្អិត</a>
                </div>
              </div>
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

        {/* Content - REMOVED 'container' and 'mx-auto' for full width */}
        <div className="relative px-4 h-full text-center pt-10">
          <div className=" text-white">
            <h1 className="text-3xl font-bold mb-4 ">ត្រៀមខ្លួនសម្រាប់ការណាត់ជួប?</h1>
            <p className="text-lg mb-8 text-gray-200 text-pretty">ទាក់ទងមកយើងឥឡូវនេះ ឬមកទស្សនាយើងដើម្បីទទួលបានសេវាកម្មគុណភាពខ្ពស់</p>
            <div className="flex justify-center gap-4">
              <Link href="" className="bg-red-700 hover:bg-white hover:text-red-700 text-white px-8 py-2 text-lg rounded-lg">ទូរស័ព្ទឥឡូវនេះ</Link>
              <Link href="https://maps.app.goo.gl/rLnv5o5YP27BVQ7C6?g_st=com.google.maps.preview.copy" className="bg-white hover:bg-red-700 hover:text-white text-red-700 px-8 py-2 text-lg rounded-lg">មើលទីតាំង</Link>
            </div>
          </div>
        </div>
      </section>

    </>

  );
}
