const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
    domains : [
      "media.wired.com","i.insider.com","npr.brightspotcdn.com","gizmodo.com","a.espncdn.com"
    ]
  },

  serverExternalPackages: ["@prisma/client"],
}

export default nextConfig
