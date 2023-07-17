import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextApiRequest, res: NextApiResponse) {

  // const session = await getServerSession(authOptions)
  const session = await getToken({req})
  
  if(!session){
    // return NextResponse.redirect('/features/sign-in')
    return NextResponse.rewrite(new URL('/api/auth/signin', req.url))
  } 

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/features/product/:path*','/features/chat','/features/add-product'],
}
