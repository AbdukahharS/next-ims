import withPWA from 'next-pwa'

const withPWAConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  reactStrictMode: true,
  swcMinify: true,
}

export default withPWA(withPWAConfig)
