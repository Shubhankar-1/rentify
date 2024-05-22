import { Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

type CardProps = {
    place: string
    area: string
    price: string
    bedrooms: string
    bathrooms: string
    image: string
}

function Cards({ place, area, price, bedrooms, bathrooms, image }: CardProps) {
    return (

        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                {image &&
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={image}
                        height={180}
                        width={270}
                    />}
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div className="text-lg font-bold text-center">{place}</div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm">Area: {area}</div>
                    <div className="text-sm">Price: {price}</div>
                    <div className="text-sm">Bedrooms: {bedrooms}</div>
                    <div className="text-sm">Bathrooms: {bathrooms}</div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Cards