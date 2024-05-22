'use client'
import Cards from "@/components/Card";
import { Button, user } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "./(store)/store";
import { useRouter } from "next/navigation";

type PostProps = {
    _id: string
    place: string
    area: string
    price: string
    bedrooms: string
    bathrooms: string
    image: string
}

export default function Home() {
    const router = useRouter();

    const [posts, setPosts] = useState<[PostProps] | []>([]);

    const getAllPostsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getAllPosts`;

    const user = useSelector((state: RootState) => state.auth.user);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(getAllPostsUrl);
            console.log(response.data);

            if (response.status == 201 && response.data?.data) {
                setPosts(response.data.data);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("An error occurred");
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <div>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold">Welcome to Rentify</h1>

                {user?.role == 'seller' &&
                    <Button onClick={() => router.push("/createPost")} className="mt-4" variant="flat" color="warning">
                        Create Post
                    </Button>
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {posts.map((post) => (
                    <Cards key={post._id} place={post.place} price={post.price} area={post.area} bedrooms={post.bedrooms} bathrooms={post.bathrooms} image={post.image} />
                ))}
            </div>

        </div>
    );
}
