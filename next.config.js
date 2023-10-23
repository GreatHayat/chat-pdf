/** @type {import('next').NextConfig} */
const nextConfig = {
  // (Optional) Export as a standalone site
  // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  output: "standalone", // Feel free to modify/remove this option

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },

  images: { domains: ["picsum.photos"] },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.node/,
  //     use: "raw-loader",
  //   });
  //   return config;
  // },
};

module.exports = nextConfig;
