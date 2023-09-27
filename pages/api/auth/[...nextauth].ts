import nextauth from 'next-auth';
import NextAuth, { AuthOptions } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prismadb from '@/lib/prismadb'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'passord'
        }
      },
      async authorize(Credentials) {
        if (!Credentials?.email || !Credentials?.password) {
          throw new Error('Email and password required');
        }

        const users=[{email:'dummy123@gmail.com',password:'dummy'}]

        
        let user:any = users.find(usr=>usr.email===Credentials.email)
        // await prismadb.user.findUnique({
        //   where: {
        //     email: Credentials.email
        //   },
        // });
        if(user){
user['name']=user.email
        }
        console.log("check user",user)

        if (!user || !user.password) {
          throw new Error('Email does not exist');
        }
        const isCorrectPassword = await Credentials.password===user.password//compare(Credentials.password, user?.password);

        if (!isCorrectPassword) {
          throw new Error('Incorrect password');
        }

        return user;
      },
      
    }),
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
callbacks: {
  async jwt({ token, account }) {
    // Persist the OAuth access_token to the token right after signin
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async session({ session, token, user }:any) {
    // Send properties to the client, like an access_token from a provider.
    session.accessToken = token.accessToken
    return session
  }
}
});

