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
          
                  const user = await prismadb.user.findUnique({ where: {
                    email: Credentials.email
                  },
                });
          
                  if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exist');
                  }
          
                  const isCorrectPassword = await compare(Credentials.password, user.hashedPassword);
          
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
            secret: process.env.NEXTAUTH_SECRET
            
          });
                
        