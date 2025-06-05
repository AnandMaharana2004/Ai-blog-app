import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {

    domains: [
      'images.unsplash.com', // Add this line for Unsplash images
      'api.dicebear.com',    // Add this line for DiceBear Avatars/Profile Pics
      // Add any other domains where your images are hosted
    ],
  }
};

export default nextConfig;
