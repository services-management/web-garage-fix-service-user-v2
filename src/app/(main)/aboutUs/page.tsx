import Image from 'next/image'

export default function AboutUs() {
    return (
        <>
            <section className="py-10 bg-red-50">
                <div className="max-w-7xl mx-auto py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">

                        <div className="flex flex-col w-full px-6 md:px-10 lg:px-6 item-center">
                            <h1 className='text-2xl font-bold pb-3'>អំពី <span className='text-red-700 text-4xl'>Mr.LUBE</span></h1>
                            <p className='text-xl ps-2 font-medium leading-relaxed'>
                                <i className="ri-double-quotes-l text-xl me-2"></i>
                                ក្រុមហ៊ុន
                                <span className='text-red-700 text-2xl font-bold'> Mr.LUBE </span>
                                គឺបង្កើតឡើងដើម្បីជួយសម្រួលដល់ប្រជាពលរដ្ឋដែលពិបាករកកន្លែងជួសជុល និងកង្វះពេលវេលាក្នុងការស្វែងរកជាង។
                                ពួកយើងមានគោលបំណងចម្បងក្នុងការផ្តល់សេវាថែទាំយានយន្តដែលមានគុណភាព និងទំនុកចិត្ត។
                                បច្ចុប្បន្ននេះ ពួកយើងបានបង្កើតគេហទំព័រ
                                <span className='text-red-700 text-2xl font-bold'> Mr.LUBE </span>
                                ដើម្បីជួយសម្រួលបញ្ហារបស់ពុកម៉ែបងប្អូនក្នុងការថែទាំរថយន្តរបស់ខ្លួន។

                                <br /><br />
                                សេវាសំខាន់បំផុតរបស់យើងគឺសេវា
                                <span className='text-red-700 font-semibold'> ប្តូរប្រេងម៉ាស៊ីន (Oil Change) </span>
                                ដែលប្រើប្រាស់ផលិតផលមានគុណភាពខ្ពស់ និងមានស្តង់ដារអន្តរជាតិ។ ក្រុមជាងជំនាញរបស់យើងធានាថា
                                ការប្តូរប្រេងនឹងធ្វើឲ្យម៉ាស៊ីនដំណើរការល្អ ងាយស្រួល និងអាចប្រើប្រាស់បានយូរជាងមុន។

                                <br /><br />
                                ក្រៅពីនេះ
                                <span className='text-red-700 font-semibold'> Mr.LUBE </span>
                                ក៏ផ្តល់សេវាផ្សេងៗទៀតដូចជា៖
                                <br />• ពិនិត្យ និងប្តូរតម្រងខ្យល់ (Air Filter) និងតម្រងប្រេង (Oil Filter)
                                <br />• ប្តូរទឹកត្រជាក់ (Coolant Flush) និងសម្អាតប្រព័ន្ធត្រជាក់
                                <br />• ពិនិត្យហ្វ្រាំង ប្តូរទឹកហ្វ្រាំង និងថែទាំប្រព័ន្ធហ្វ្រាំង
                                <br />• ពិនិត្យថ្ម និងប្រព័ន្ធអគ្គិសនី
                                <br />• សម្អាតផ្ទៃខាងក្នុង និងជូតកញ្ចក់រថយន្ត

                                <br /><br />
                                <span className='text-red-700 font-bold'> Mr.LUBE </span>
                                តែងតែផ្តោតលើសេវារហ័ស ទាន់ចិត្ត និងមានភាពអនុភាព ដើម្បីធានាថា
                                អតិថិជនទទួលបានបទពិសោធន៍ល្អបំផុតក្នុងការថែទាំរថយន្ត។
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
                                តម្លៃសមរម្យ និងតម្លាភាពពេញលេញ។
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

            <section className="bg-gray-50 py-16 px-6 text-center">
                {/* Section Header */}
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    បំពេញបេសកកម្មរបស់យើងជាមួយគុណភាព និងទំនុកចិត្ត
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                    យើងប្តេជ្ញាផ្តល់សេវាថែទាំយានយន្តដែលមានគុណភាពខ្ពស់ បំពេញតាមតម្រូវការរបស់អតិថិជន
                    និងបង្កើតបទពិសោធន៍ថ្មីក្នុងការថែទាំរថយន្ត។
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
                                ប្តូរប្រេងម៉ាស៊ីន (Oil Change)
                            </h3>
                            <p className="text-gray-600">
                                ផ្តល់សេវាប្តូរប្រេងម៉ាស៊ីនជាមួយផលិតផលដែលមានគុណភាពខ្ពស់ និងធានាឲ្យម៉ាស៊ីនដំណើរការល្អ
                                ប្រកបដោយសុវត្ថិភាព។
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
                                ថែទាំប្រព័ន្ធរថយន្តទាំងមូល
                            </h3>
                            <p className="text-gray-600">
                                ពិនិត្យតម្រងខ្យល់ ប្តូរទឹកត្រជាក់ ប្តូរទឹកហ្វ្រាំង និងថែទាំប្រព័ន្ធអគ្គិសនី
                                ដើម្បីរក្សារថយន្តឲ្យនៅក្នុងសភាពល្អបំផុត។
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
                                សេវាអតិថិជនដែលអាចទុកចិត្តបាន
                            </h3>
                            <p className="text-gray-600">
                                ក្រុមការងាររបស់យើងតែងតែរួសរាយ រៀបចំសេវាផ្ទាល់ខ្លួន និងផ្តល់ការណែនាំសម្រាប់អតិថិជន
                                ដើម្បីធានាបទពិសោធន៍ល្អបំផុត។
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
                        ស្វែងយល់បន្ថែមអំពីសេវារបស់យើង →
                    </a>
                </div>
            </section>
        </>
    )
}