import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", "*");
  }

  return response;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
