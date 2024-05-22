// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './(store)/store'
import { Suspense, use, useEffect, useLayoutEffect } from 'react'
import { getCookie } from 'cookies-next';
import { setAccessToken, setUser } from './(store)/authSlice';
import { useRouter } from "next/navigation";
import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: "Rentify",
//     description: "Rentify is a platform for renting and leasing properties.",
// };

export function Providers({ children }: { children: React.ReactNode }) {
    const user = useSelector((state: RootState) => state.auth.user)

    const dispatch = useDispatch()
    const router = useRouter()

    useLayoutEffect(() => {
        const userData = getCookie('user');
        const accessToken = getCookie('accessToken');

        if (userData && accessToken) {
            dispatch(setUser(JSON.parse(userData)))
            dispatch(setAccessToken(accessToken))
        }


    }, [dispatch, router])

    return (
        <html lang="en" className={'dark'}>
            {/* <head>
                <title>Rentify</title>
                <meta name='description' content= "Rentify is a platform for renting and leasing properties." />
            </head> */}
            <body>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </body>
        </html>
    )
}