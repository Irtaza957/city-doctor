/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "crm.fandcproperties.ru",
        protocol: "https",
      },
      {
        hostname: "randomuser.me",
        protocol: "https",
      },
      {
        hostname: "citydoctor.ae",
        protocol: "https",
      },
      {
        hostname: "w7.pngwing.com",
        protocol: "https",
      },
      {
        hostname: "img.icons8.com",
        protocol: "https",
      },
      {
        hostname: "ui.shadcn.com",
        protocol: "https",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
        protocol: "https",
      },
      {
        hostname: "images.pexels.com",
        protocol: "https",
      },
      {
        hostname: "f.nooncdn.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
