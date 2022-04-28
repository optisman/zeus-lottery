const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    REACT_APP_CHAIN_ID: process.env.REACT_APP_CHAIN_ID,
  }
}

module.exports = nextConfig
