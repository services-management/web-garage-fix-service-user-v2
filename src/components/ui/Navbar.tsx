'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarHeight = 'h-16 md:h-20';

  return (
    <nav className={`sticky top-0 **left-0 right-0** w-full ${navbarHeight} bg-white text-gray-800 p-4 shadow-md z-50`}>
      <div className="container **mx-auto** flex justify-between items-center h-full">
        <Link href="/" className="font-bold">
          <Image
            src="/home/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-auto h-16 md:h-20"
          />
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${
          isOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-center gap-4 md:gap-6 absolute md:static top-16 left-0 right-0 md:top-auto md:left-auto md:right-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none w-full md:w-auto`}>
          <Link href="/" className="hover:text-red-600 transition-colors w-full md:w-auto text-xl">ទំព័រដើម</Link>
          <Link href="/service" className="hover:text-red-600 transition-colors w-full md:w-auto text-xl">សេវាកម្ម</Link>
          <Link href="/contact" className="hover:text-red-600 transition-colors w-full md:w-auto text-xl">ទំនាក់ទនង</Link>
          <Link href="/aboutUs" className="hover:text-red-600 transition-colors w-full md:w-auto text-xl">អំពីពួកយើង</Link>
          <Link href="/login" className='bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-lg rounded-lg'>ចូលប្រើប្រាស់</Link>
        </div>
      </div>
    </nav>
  );
}

