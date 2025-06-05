import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

const publicPaths = ["/", "/sign-in", "/sign-up", /^\/blog\/[^/]+$/]

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Paths that should redirect to /feed if logged in
  const redirectIfLoggedInPaths = ["/", "/sign-in", "/sign-up"]

  // If user is on a redirectable public page, check session
  if (redirectIfLoggedInPaths.includes(pathname)) {
    const session = await auth()
    if (session?.user) {
      // User is logged in, redirect to /feed
      const url = req.nextUrl.clone()
      url.pathname = "/feed"
      return NextResponse.redirect(url)
    }
    // Not logged in, allow to see the page
    return NextResponse.next()
  }

  // All other public pages, allow access
  const isPublic = publicPaths.some((path) =>
    typeof path === "string"
      ? pathname === path
      : path instanceof RegExp
      ? path.test(pathname)
      : false
  )
  if (isPublic) {
    return NextResponse.next()
  }

  // For protected pages, require authentication
  const session = await auth()
  if (!session?.user) {
    const url = req.nextUrl.clone()
    url.pathname = "/sign-in"
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|api|static|.*\\..*).*)",
  ],
}