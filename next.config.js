const withPwa = require('next-pwa')

module.exports = withPwa({
  images: {
    domains: ['lh3.googleusercontent.com', 'media-exp1.licdn.com']
  }, 
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true
  },
})