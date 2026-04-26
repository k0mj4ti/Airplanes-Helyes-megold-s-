import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken"
 
export function proxy(request) {
    const { pathname } = request.nextUrl;
    const method = request.method;

    if (pathname === '/api/planes' && method !== 'POST') {
        return NextResponse.next();
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader){
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    try {
        jwt.verify(token, process.env.JWT_SECRET)

        return NextResponse.next();
    } catch (error) {
        return new NextResponse("Unauthorized", { status: 401 })
    }
}
 
 
export const config = {
  matcher: [
    '/api/myplanes',
    '/api/planes/:path',
    '/api/planes'
  ],
}