import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
    '/',
    '/createPost',
]


const publicRoutes = ['/login', '/register']

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    let userData = request.cookies.get('user')?.value;

    // console.log(accessToken);

    if (protectedRoutes.includes(pathname) && !userData ) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

 
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
// export const config = {
//     matcher: ['/:path*']
// }