import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

function LinkedIn(options) {
  return {
    id: 'linkedin',
    name: 'LinkedIn',
    type: 'oauth',
    version: '2.0',
    scope: 'r_liteprofile,r_emailaddress',
    params: {
      grant_type: 'authorization_code',
      client_id: options.clientId,
      client_secret: options.clientSecret
    },
    accessTokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    authorizationUrl:
      'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
    profileUrl:
      'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)',
    profile: async (profile, tokens) => {
      const res = await fetch(
        `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${tokens.access_token}`
      )

      const data = await res.json()
      const email = data.elements[0]['handle~'].emailAddress

      const imageRes = await fetch(
        `https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams(elements)))&oauth2_access_token=${tokens.access_token}`
      )

      const imageData = await imageRes.json()

      const image =
        imageData.profilePicture['displayImage~'].elements[2].identifiers[0]
          .identifier

      return {
        id: profile.id,
        name: profile.localizedFirstName + ' ' + profile.localizedLastName,
        email,
        image
      }
    },
    ...options
  }
}

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    })
  ],
  database: process.env.DATABASE_URL,

  session: {
    jwt: true
  },
  pages: {
    error: '/auth/error'
  },
  callbacks: {
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  }
})
