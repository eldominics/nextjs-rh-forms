/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**", // Match all paths under the domain
      },
      {
        protocol: "https",
        hostname: "product-form-bucket.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**", // Match all paths under the domain
      },
    ],
  },
};

export default nextConfig;
