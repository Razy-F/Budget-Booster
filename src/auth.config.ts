import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isHomePage = nextUrl.pathname === "/";
      if (isHomePage && !isLoggedIn) {
        console.log("login first");
        return false;
      } else if (isLoggedIn) {
        if (nextUrl.searchParams.get("callbackUrl")) {
          console.log("render the callback");
          return Response.redirect(
            new URL(nextUrl.searchParams.get("callbackUrl") as string)
          );
        } else {
          return true;
        }
      } else {
        false;
      }
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
