import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // i18n configuration is handled by next-intl plugin
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
