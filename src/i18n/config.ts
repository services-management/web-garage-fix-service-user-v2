export type Locale = (typeof locales)[number];

export const locales = ['kh', 'en'] as const;
export const defaultLocale: Locale = 'kh';

export const localeLabels: Record<Locale, string> = {
  kh: 'ខ្មែរ',
  en: 'English',
};
