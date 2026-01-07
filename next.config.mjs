/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mematikan pengecekan eslint agar build lebih ringan
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Mematikan pengecekan typescript jika ada
  typescript: {
    ignoreBuildErrors: true,
  },
  // Mematikan source maps untuk menghemat RAM
  productionBrowserSourceMaps: false,
};

export default nextConfig;