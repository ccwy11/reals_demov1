"use client"
import { ArrowLeft, Search, Plus, Calendar, Settings, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/bottomnav";
import Image from "next/image";
// import { Link, useNavigate } from "react-router-dom";

const itineraryItems = [
    {
        id: 1,
        type: "restaurant",
        title: "Vacation Cabin Restaurant",
        time: "10:00 AM - 11:30 AM",
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center",
        isTransport: true,
        description:"travel by mtr",
        hasChange: true,
        hasBook: true
    },
    {
        id: 2,
        type: "restaurant",
        title: "Lunch: Pasta & All-Day Breakfast",
        time: "11:30 AM - 1:00 PM",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=center",
        isTransport: false,
        description:"travel by mtr",
        hasChange: true,
        hasBook: true
    },
    {
        id: 3,
        type: "beach",
        title: "Chill at the Beach",
        time: "1:30 PM - 3:30 PM",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center",
        isTransport: true,
        description:"travel by mtr",
        hasChange: true
    },
    {
        id: 4,
        type: "activity",
        title: "Cycling by the Coast",
        time: "4:00 PM - 5:30 PM",
        url: "https://images.unsplash.com/photo-1721699424366-0df0fad02406?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGUlMjBjb2FzdHxlbnwwfHwwfHx8MA%3D%3D",
        isTransport: false,
        description:"travel by mtr",
        hasChange: true,
        hasBook: true
    },
    {
        id: 5,
        type: "cafe",
        title: "Pet Cafe with Cute Dogs",
        time: "6:00 PM - 7:30 PM",
        url: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=400&h=300&fit=crop&crop=center",
        isTransport: false,
        description:"travel by mtr",
        hasChange: true,
        hasBook: true
    }
];

export default function Itinerary() {
    const [activeTab, setActiveTab] = useState("Schedule");
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border">
                <div className="flex items-center px-4 py-3 sm:py-4 max-w-md mx-auto">
                    <button
                        // onClick={() => navigate(-1)}
                        className="p-2 mr-3 rounded-full hover:bg-muted"
                    >
                        <ArrowLeft className="w-6 h-6 text-foreground" />
                    </button>
                    <h1 className="text-lg sm:text-xl font-semibold text-foreground">Proposed Itinerary</h1>
                </div>
            </header>

            {/* Itinerary Content */}
            <div className="flex-1 px-4 py-6 pb-24 max-w-md mx-auto w-full">
                <div className="space-y-6">
                    {itineraryItems.map((item) => (
                        <div key={item.id}>
                            {item.isTransport ? (
                                /* Transport Item */
                                <div className="flex items-center gap-3 py-3">
                                    <div className="w-1 h-10 bg-muted-foreground/30"></div>
                                    <p className="text-sm sm:text-base text-muted-foreground flex-1">
                                        {item.description}
                                    </p>
                                </div>
                            ) : (
                                /* Activity Item */
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <Image
                                            width={400}
                                            height={300}
                                            src={item.url}
                                            alt={item.title}
                                            className="w-20 h-20 rounded-lg object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-muted-foreground mb-3">
                                            {item.time}
                                        </p>
                                        <div className="flex gap-3">
                                            {item.hasChange && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-sm px-4 py-2 h-9 rounded-lg"
                                                >
                                                    Change
                                                </Button>
                                            )}
                                            {item.hasBook && (
                                                <Button
                                                    size="sm"
                                                    className="text-sm px-4 py-2 h-9 rounded-lg bg-primary text-white"
                                                >
                                                    Book
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
