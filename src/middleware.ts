import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextApiRequest, res: NextApiResponse) {

  // const session = await getServerSession(authOptions)
  const session = await getToken({req,secret: process.env.NEXTAUTH_SECRET,})
  
  console.log(session,'cok')
  if(!session){
    // return NextResponse.redirect('/features/sign-in')
    return NextResponse.redirect(new URL('/api/auth/signin', req.url))
  } 
}
 

// export { default } from "next-auth/middleware"
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/product/:path*','/chat','/dashboard'],
}
