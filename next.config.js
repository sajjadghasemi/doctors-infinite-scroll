/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: "custom",
        loaderFile: "./my/image/loader.js",
        domains: ["rickandmortyapi.com"],
    },
};

module.exports = nextConfig;
