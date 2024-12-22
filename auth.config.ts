import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./app/_lib/authActions";
import { LoginSchema } from "./app/_schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const result = LoginSchema.safeParse(credentials);

        if (!result.success) return null;

        const user = await getUserByEmail(credentials.email as string);

        if (!user || !user.password) return null;

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password as string,
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
} satisfies NextAuthConfig;
