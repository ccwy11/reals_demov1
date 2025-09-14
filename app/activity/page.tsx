"use client";
import { ArrowLeft, RotateCcw, Heart, Search, Plus, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/bottomnav";

export default function Activity() {
    const [activeTab, setActiveTab] = useState("Explore");
    const [quantity, setQuantity] = useState(2);
    const router = useRouter();

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

    return (
        <div className="min-h-screen bg-background w-full max-w-2xl mx-auto relative">
            {/* Hero Image Section */}
            <div className="relative h-80 sm:h-96 md:h-[32rem]">
                <Image
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                    alt="Pottery workshop"
                    width={800}
                    height={900}
                    className="w-full h-full object-cover rounded-b-lg"
                    priority
                />

                {/* Action Icons */}
                <div className="absolute top-4 left-4">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                <div className="absolute top-4 right-4 space-y-3">
                    <button
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                        aria-label="Share"
                    >
                        <RotateCcw className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                        aria-label="Like"
                    >
                        <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* View Time Slots Button */}
                <div className="absolute bottom-4 right-4">
                    <Button className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base">
                        View time slots
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-4 sm:px-6 py-6 pb-24">
                {/* Title and Price */}
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Pottery workshop
                    </h1>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-bold text-foreground">$250</span>
                        <span className="text-sm sm:text-base text-muted-foreground">/ per person</span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Indulge in a sensual journey of hands-on intimacy as you mold clay together, igniting
                        sparks of love in our enchanting romantic pottery workshop.
                    </p>
                </div>

                {/* Booking Details */}
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base text-muted-foreground">
                            {quantity} persons x $250
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base text-muted-foreground">22 Mar 2024</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xl sm:text-2xl font-bold text-foreground">
                            ${(quantity * 250).toFixed(2)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDecrement}
                                className="w-8 h-8 sm:w-10 sm:h-10 border border-border rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <Plus className="w-4 h-4 rotate-45" />
                            </button>
                            <span className="text-lg sm:text-xl font-medium w-8 text-center">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                className="w-8 h-8 sm:w-10 sm:h-10 border border-border rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <Button className="w-full bg-primary text-white py-4 text-base sm:text-lg font-medium rounded-lg">
                    Confirm
                </Button>
            </div>
            <BottomNavigation />
        </div>
    )
}