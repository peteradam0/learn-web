import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/api/uploadthing", "/test", "/api/socket", "/api/token"],

  async afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (req.nextUrl.pathname.includes("/administration")) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${req.cookies.get("__session")?.value}`,
        },
      });

      const userData = await res.json();

      if (userData.userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
