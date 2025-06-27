/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true,
  },
  images : {
    domains : [
      'res.cloudinary.com'
    ]
  }
};

module.exports = nextConfig;
