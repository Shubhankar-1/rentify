'use client';

import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, Switch } from "@nextui-org/react";
import Image from 'next/image';
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(store)/store';
import { clearAccessToken, clearUser } from '@/app/(store)/authSlice';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { getCookie } from 'cookies-next';

function NavBar() {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = () => {
        dispatch(clearUser())
        dispatch(clearAccessToken())
        router.replace('/login');
    }

    const segment = useSelectedLayoutSegment()

    const isAuthPage = segment === 'login' || segment === 'register';

    // const accessToken = useSelector((state: RootState) => state.auth.accessToken)

    const isAuthenticated = getCookie('user') ? true : false;
    // console.log(isAuthenticated);
    // console.log(accessToken?.length);

    // const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    // if (!isAuthPage) {
    return (
        <Navbar className='dark:bg-[#2e2e2e] bg-[#a8a8a8] w-full pl-8 absolute left-0 top-0 right-0'>

            {(!isAuthPage && isAuthenticated) ? (
                <Link href={"/"}>
                    <NavbarBrand>
                        <div className='text-lg md:text-2xl ml-2 font-bold tracking-wider dark:text-gray-300 '>Rentify</div>
                    </NavbarBrand>
                </Link>
            ) : (
                <NavbarBrand>
                    <div className='text-lg md:text-2xl ml-2 font-bold tracking-wider dark:text-gray-300 '>Rentify</div>
                </NavbarBrand>)
            }

            <NavbarContent justify="end">
                <NavbarItem>
                    <div className='flex'>
                        {(!isAuthPage && isAuthenticated) && <div className='flex gap-2'>
                            <Button color="danger" variant="shadow" onClick={() => handleLogout()}>
                                Logout
                            </Button>

                        </div>}
                    </div>
                </NavbarItem>

            </NavbarContent>
        </Navbar>
    )
}

export default NavBar