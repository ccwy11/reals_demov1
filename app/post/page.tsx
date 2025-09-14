import Image from 'next/image';
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import BottomNavigation from '@/components/bottomnav';
// Itinerary data
const itineraryItems = [
    {
        id: 1,
        type: "restaurant",
        title: "Vacation Cabin Restaurant",
        time: "10:00 AM - 11:30 AM",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center",
        hasChange: true,
        hasBook: true
    },
    {
        id: 2,
        type: "restaurant",
        title: "Lunch: Pasta & All-Day Breakfast",
        time: "11:30 AM - 1:00 PM",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=center",
        hasChange: true,
        hasBook: true
    },
    {
        id: 3,
        type: "beach",
        title: "Chill at the Beach",
        time: "1:30 PM - 3:30 PM",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center",
        hasChange: true
    },
    {
        id: 4,
        type: "activity",
        title: "Cycling by the Coast",
        time: "4:00 PM - 5:30 PM",
        image: "https://images.unsplash.com/photo-1721699424366-0df0fad02406?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGUlMjBjb2FzdHxlbnwwfHwwfHx8MA%3D%3D",
        hasChange: true,
        hasBook: true
    },
    {
        id: 5,
        type: "cafe",
        title: "Pet Cafe with Cute Dogs",
        time: "6:00 PM - 7:30 PM",
        image: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=400&h=300&fit=crop&crop=center",
        hasChange: true,
        hasBook: true
    }
];

// User-shared photos in public/images folder
// Array of user-shared photos in the public folder
const userPhotos = [
    "/images/WA0003.jpg",
    "/images/WA0004.jpg",
    "/images/WA0005.jpg",
    "/images/WA0006.jpg",
];
/**
 * The Home component renders a page with a photo carousel, a caption, an itinerary and a footer.
 * The photo carousel displays a series of user-shared photos in the public folder.
 * The caption is a text block that describes the experience of using Reals to plan a day trip in Hong Kong.
 * The itinerary is a list of items, each item represents an event or activity in the day trip.
 * The footer contains a series of hashtags and a location indicator.
 */


export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div>
                <title>Day Trip Itinerary</title>
                <meta name="description" content="A romantic Hong Kong day trip itinerary" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" />
            </div>
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center p-4 border-b">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-white font-bold">R</span>
                    </div>
                    <div className="ml-3">
                        <p className="font-semibold">Reals</p>
                        <p className="text-sm text-gray-500">Hong Kong</p>
                    </div>
                </div>
                {/* Photo Carousel */}
                <Carousel className="w-full max-w-3xl mx-auto">
                    <CarouselContent>
                        {userPhotos.map((photo, index) => (
                            <CarouselItem key={index}>
                                <div className="p-2 sm:p-4">
                                    <Card className="border-0 shadow-none">
                                        <CardContent className="p-0">
                                            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/9]">
                                                <Image
                                                    src={photo}
                                                    alt={`User shared photo ${index + 1}`}
                                                    fill
                                                    style={{ objectFit: "cover" }}
                                                    className="rounded-lg"
                                                    placeholder="blur"
                                                    blurDataURL="/images/placeholder.jpg"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="h-10 w-10 sm:h-12 sm:w-12 -left-4 sm:-left-6" />
                    <CarouselNext className="h-10 w-10 sm:h-12 sm:w-12 -right-4 sm:-right-6" />
                </Carousel>

                {/* Caption */}
                <div className="p-4">
                    <p className="text-sm">
                        感謝 <span className="font-semibold">@Reals</span> 團隊幫我哋安排咗一個超貼心嘅一日行程! 平時我同男朋友都係Netflix mode過weekend🤭但今次想試吓啲新嘢，想chill之餘要有啲summer vibe. Reals真係有認真了解我哋想要啲咩，整咗個好fit我哋style嘅行程，唔會太趕又有啲驚喜 goooood! 大讚!😎
                    </p>
                </div>
                {/* Itinerary Items */}
                <div className="space-y-4 p-4">
                    {itineraryItems.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                            <div className="relative w-full h-48">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg"
                                />
                                {item.hasBook && (
                                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                        Booked
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-sm text-gray-600">{item.time}</p>
                                {item.hasChange && (
                                    <p className="text-xs text-gray-400 mt-1">Editable</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Footer */}
                <div className="p-4 border-t text-sm text-gray-500 pb-32">
                    <p>📍 A Perfect Day Trip in Hong Kong 🩷</p>
                    <p>#HongKongDate #CoupleGoals #SummerVibes</p>
                </div>
                <BottomNavigation />
            </div>
        </div>
    );
}