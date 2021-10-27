const withPwa = require('next-pwa')

const prod = process.env.NODE_ENV === 'production'

module.exports = withPwa({
  images: {
    domains: ['lh3.googleusercontent.com', 'media-exp1.licdn.com']
  }, 
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: prod ? false : true
  },
})