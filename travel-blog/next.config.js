/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'file.rendit.io', 'res.cloudinary.com', ''],
    },
}

module.exports = nextConfig
