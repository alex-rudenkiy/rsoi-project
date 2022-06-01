// next.config.js
module.exports = {
    images: {
        domains: ['rsoiproject.ddns.net']
    },
   experimental: {
    outputStandalone: true
   },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true
    }

}
