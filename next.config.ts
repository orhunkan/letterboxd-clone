const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },

  serverExternalPackages: ["@prisma/client"],
}

export default nextConfig
