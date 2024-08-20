/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true, // It is not defined after nexjs 14
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};

export default nextConfig;
