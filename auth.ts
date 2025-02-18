import NextAuth from "next-auth";
import authConfig from "./auth.config";
import prisma from "./app/_lib/db";
// import prisma from "./app/_lib/db";
// import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        select: {
          image: true,
        },
      });

      if (!existingUser) return token;

      token.image = existingUser.image;

      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.image = token.image as string;
      }

      return session;
    },
  },
  // adapter: PrismaAdapter(prisma),
  ...authConfig,
});
