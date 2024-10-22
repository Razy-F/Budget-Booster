import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) {
        return true;
      } else return false;
    },
    async session({ session, token }) {
      // Add the user id to the session object
      if (token.sub) session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      // This is called when a user signs in
      if (user) {
        token.id = user.id; // Add the user id to the token
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
