import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Handle SVG files as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgrOptions: {
              dimensions: false, // Remove width/height from SVG
              icon: true, // Optimize for icon usage
            },
          },
        },
      ],
    });
    
    return config;
  },
};

export default nextConfig;
