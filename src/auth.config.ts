import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) {
        return true;
      } else return false;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
