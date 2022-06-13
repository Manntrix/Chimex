import getMembership from '@/functions/fetch/membersuite/getMembership'
import getMembershipOrganization from '@/functions/fetch/membersuite/getMembershipOrganization'
import getMembershipProduct from '@/functions/fetch/membersuite/getMembershipProduct'
import getMembershipType from '@/functions/fetch/membersuite/getMembershipType'
import getUser from '@/functions/fetch/membersuite/getUser'
import login from '@/functions/fetch/membersuite/login'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

function createUserObj(
  token,
  user,
  membership,
  membershipType,
  membershipProduct,
  membershipOrganization
) {
  return {
    accessToken: token,
    accessTokenExpires: new Date().getTime() + 3600 * 1000,
    userId: user?.userId,
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    membership: {
      type: membershipType?.name,
      product: membershipProduct?.productName,
      organization: membershipOrganization?.name,
      memberSince: membership?.joinDate,
      renewAt: membership?.renewalDate,
      expireAt: membership?.expirationDate,
      dueAmount: membership?.currentDuesAmount,
    },
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'un-pw-login',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const token = await login(credentials)

        if (token) {
          const user = await getUser(token)
          const membership = await getMembership(token, user?.membershipId)
          const membershipType = await getMembershipType(
            token,
            membership?.type
          )
          const membershipProduct = await getMembershipProduct(
            token,
            membership?.product
          )
          const membershipOrganization = await getMembershipOrganization(
            token,
            membership?.membershipOrganization
          )

          if (user) {
            const userObj = createUserObj(
              token,
              user,
              membership,
              membershipType,
              membershipProduct,
              membershipOrganization
            )

            return userObj
          }
        }
        return null
      },
    }),
  ],
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET_KEY,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = user
      }
      return token
    },
    async session({ session, token }) {
      session = token
      return session
    },
  },
})
