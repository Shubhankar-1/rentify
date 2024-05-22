'use client'
import { Button, Input, Spinner } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function PostForm() {
    const router = useRouter();
    const createPostUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/createPost`

    const [formData, setFormData] = React.useState(
        { "place": "", "area": "", "price": "", "bedrooms": "", "bathrooms": "", "image": "" });

    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log(formData);

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
            const response = await axios.post(createPostUrl, formData, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

            if (response.status == 201) {
                toast.success("Post Created Successful");
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
        <div>
            <form onSubmit={handleSubmit} className='relative flex flex-col justify-center items-center gap-8 rounded-2xl dark:bg-black/75 bg-black/10 shadow-lg py-10 px-8  md:max-w-lg md:px-14'>
                <div className='text-xl font-bold mb-4'>
                    Register
                </div>

                <div className='flex flex-col gap-4'>
                    <Input
                        type="text"
                        label="Place"
                        name='place'
                        id='place'
                        autoComplete="place"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.place} />

                    <Input
                        type="text"
                        label="Area"
                        name='area'
                        id='area'
                        autoComplete="area"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.area} />

                    <Input
                        type="number"
                        label="Price"
                        name='price'
                        id='price'
                        autoComplete="price"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.price} />

                    <Input
                        type="number"
                        label="Bedrooms"
                        name='bedrooms'
                        id='bedrooms'
                        autoComplete="bedrooms"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.bedrooms} />

                    <Input
                        type="number"
                        label="Bathrooms"
                        name='bathrooms'
                        id='bathrooms'
                        autoComplete="bathrooms"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.bathrooms} />

                    <Input
                        type="text"
                        label="Image"
                        name='image'
                        id='image'
                        autoComplete="image"
                        isRequired
                        onChange={handleInputChange}
                        value={formData.image} />




                </div>

                <div className='flex flex-col gap-4 w-full'>
                    <Button type='submit' color="success" variant="shadow" fullWidth endContent={isSubmitting ? <Spinner size='sm' color='white' /> : null} className="text-center text-white" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PostForm