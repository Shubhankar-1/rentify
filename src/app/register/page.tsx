'use client'

import { Autocomplete, AutocompleteItem, Button, Input, Spinner } from '@nextui-org/react'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RootState } from '../(store)/store'


function Register() {

    const router = useRouter()

    // const { data: session } = useSession()
    // const user = useSelector((state: RootState) => state.auth.user)

    const authUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/register`

    const accessToken = useSelector((state: RootState) => state.auth.accessToken)

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle password visibility
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    // Define state variables for form input fields
    const [formData, setFormData] = useState({
        "firstName": '',
        "lastName": '',
        "email": '',
        "role": '',
        "phoneNumber": '',
        "password": '',
    });

    // Handle form input changes
    const handleInputChange = (event: { target: any }) => {
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

            if (response.status == 201) {
                toast.success("Register Successful");
                router.push('/login');
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

    const role = ['seller', 'buyer']

    return (
        <>
            <form onSubmit={handleSubmit} className='relative flex flex-col justify-center items-center gap-8 rounded-2xl dark:bg-black/75 bg-black/10 shadow-lg py-10 px-8  md:max-w-lg md:px-14'>
                <div className='text-xl font-bold mb-4'>
                    Register
                </div>

                <div className='flex flex-col gap-4'>
                    <Input
                        type="text"
                        label="First Name"
                        name='firstName'
                        id='firstName'
                        autoComplete="firstName"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.firstName} />
                    <Input
                        type="text"
                        label="Last Name"
                        name='lastName'
                        id='lastName'
                        autoComplete="lastName"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.lastName} />
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
                        type="phoneNumber"
                        label="Phone Number"
                        name='phoneNumber'
                        id='phoneNumber'
                        autoComplete="phoneNumber"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.phoneNumber} />
                    <Autocomplete
                        variant="faded"
                        label="Register as"
                        defaultInputValue={formData.role}
                        isRequired
                        classNames={{
                            base: "w-[200px]",
                            listboxWrapper: "max-h-[320px]",
                            selectorButton: "text-default-500"
                        }}
                        onInputChange={(e) => handleInputChange({ target: { name: "role", value: e } })}
                    >
                        {role.map((role, index) => (
                            <AutocompleteItem key={index} value={role}>
                                {role}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>

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
                        Register
                    </Button>

                    <Button href='/login' as={Link} color="success" variant="bordered" fullWidth>Login ?</Button>

                </div>
            </form>
        </>
    )
}

export default Register