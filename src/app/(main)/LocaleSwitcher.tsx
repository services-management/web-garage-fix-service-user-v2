'use client';

import { useTransition, useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { locales, localeLabels, type Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function onChange(nextLocale: Locale) {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }
    startTransition(() => {
      setUserLocale(nextLocale);
    });
    setIsOpen(false);
  }

  // Get flag emoji based on locale
  const getFlag = (loc: Locale) => {
    return loc === 'kh' ? '🇰🇭' : '🇺🇸';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm
          transition-all duration-200 ease-out
          ${isOpen 
            ? 'bg-red-50 text-red-600 ring-2 ring-red-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
          }
          ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{getFlag(locale)}</span>
        <span className="uppercase font-bold">{locale}</span>
        <ChevronDown className={`
          w-4 h-4 transition-transform duration-200
          ${isOpen ? 'rotate-180' : ''}
        `} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="
          absolute right-0 mt-2 w-44 
          bg-white rounded-xl shadow-xl border border-gray-100 
          py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200
        ">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Select Language
          </div>
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => onChange(loc)}
              className={`
                w-full flex items-center justify-between px-4 py-3 text-left
                transition-colors duration-150
                ${locale === loc 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{getFlag(loc)}</span>
                <div>
                  <div className="font-semibold text-sm">{localeLabels[loc]}</div>
                  <div className="text-xs text-gray-400 uppercase">{loc}</div>
                </div>
              </div>
              {locale === loc && (
                <Check className="w-4 h-4 text-red-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
