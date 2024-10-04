/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["portfolio-server-qx1n.onrender.com"],
  },
};

export default nextConfig;
