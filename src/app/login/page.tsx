'use client'

import { Button, Input, Spinner } from '@nextui-org/react'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../(store)/store'
import { setUser } from '../(store)/authSlice'


function Register() {

    const router = useRouter()

    const dispatch = useDispatch()
    // const { data: session } = useSession()
    // const user = useSelector((state: RootState) => state.auth.user)

    const authUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`

    const accessToken = useSelector((state: RootState) => state.auth.accessToken)

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle password visibility
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    // Define state variables for form input fields
    const [formData, setFormData] = useState({
        "email": '',
        "password": '',
    });

    // Handle form input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmitting(true);

        try {
            const response = await axios.post(authUrl, formData, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

            console.log(response);
            
            if (response.status == 201 && response.data?.data) {
                dispatch(setUser(response.data?.data));
                toast.success("Login Successful");
                router.push('/');

            } else {
                toast.error(response.data.message);
            }

            // router.push('/');

            // Do something with the response (e.g., redirect to a dashboard page)
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }

        setIsSubmitting(false);
    };



    return (
        <>
            <form onSubmit={handleSubmit} className='relative flex flex-col justify-center items-center gap-8 rounded-2xl dark:bg-black/75 bg-black/10 shadow-lg py-10 px-8  md:max-w-lg md:px-14'>
                <div className='text-xl font-bold mb-4'>
                    Login
                </div>

                <div className='flex flex-col gap-4'>
                    <Input
                        type="email"
                        label="Email"
                        name='email'
                        id='email'
                        autoComplete="email"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.email} />

                    <Input
                        label="Password"
                        name='password'
                        id='password'
                        onChange={handleInputChange}
                        autoComplete='current-password'
                        isRequired
                        value={formData.password}

                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"} />
                </div>

                <div className='flex flex-col gap-4 w-full'>
                    <Button type='submit' color="success" variant="shadow" fullWidth endContent={isSubmitting ? <Spinner size='sm' color='white' /> : null} className="text-center text-white" >
                        Login
                    </Button>

                    <Button href='/register' as={Link} color="success" variant="bordered" fullWidth>Register ?</Button>

                </div>
            </form>
        </>
    )
}

export default Register