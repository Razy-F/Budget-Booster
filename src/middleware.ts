export { auth as middleware } from "@/auth";
export const config = {
  //this regex avoids running the middleware on paths such as the favicon or static images
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png).*)"],
};
