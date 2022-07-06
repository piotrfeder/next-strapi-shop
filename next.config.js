const path = require('path')
const nextTranslate = require('next-translate')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./styles/main.scss";`
  },
  images: {
    domains: ['localhost', '0.0.0.0', 'localhost::1337'],
    formats: ['image/webp'],
  },
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'pl',
    localeDetection: true,
  }
}

module.exports = nextConfig
module.exports = nextTranslate()
