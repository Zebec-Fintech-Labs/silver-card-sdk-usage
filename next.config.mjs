/** @type {import('next').NextConfig} */
// const TerserPlugin = require("terser-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  httpAgentOptions: {
    keepAlive: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    RPC_NETWORK: process.env.RPC_NETWORK,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    API_KEY: process.env.API_KEY,
  },
  experimental: {
    turbo: false, // Ensure Turbopack is disabled
  },

  generateEtags: false,
  webpack(config, { isServer }) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
    };

    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      }
    );
    // if (!isServer) {
    //   config.optimization.minimizer = [
    //     new TerserPlugin({
    //       terserOptions: {
    //         ecma: 8, // Set ECMAScript version to 8
    //         compress: true,
    //         mangle: true,
    //         output: {
    //           comments: false,
    //         },
    //       },
    //     }),
    //   ];
    // }
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       terserOptions: {
  //         ecma: 2015, // or set to 2015 or higher
  //         compress: true,
  //         output: {
  //           comments: false
  //         }
  //       }
  //     })
  //   ]
  // }
};

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors https://magic.store",
  },
  {
    key: "Cache-Control",
    value: "no-store",
  },
];

export default nextConfig;
