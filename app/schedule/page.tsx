"use client"
import { Search, SlidersHorizontal, Heart, Plus, Calendar, Settings, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BottomNav from "@/components/Bottomnav";

const bookings = [
    {
        id: 1,
        title: "1st Anniversary Date",
        date: "2024/07/18",
        tags: ["Creative", "Indoor"],
        tagColors: ["bg-red-100 text-red-800", "bg-blue-100 text-blue-800"]
    },
    {
        id: 2,
        title: "Birthday Celebration",
        date: "2024/06/01",
        tags: ["Sports", "Outdoor", "Adventure"],
        tagColors: ["bg-green-100 text-green-800", "bg-yellow-100 text-yellow-800", "bg-purple-100 text-purple-800"]
    },
    {
        id: 3,
        title: "Weekend Date",
        date: "2024/05/30",
        tags: ["Cultural", "Entertainment", "Nightlife"],
        tagColors: ["bg-pink-100 text-pink-800", "bg-indigo-100 text-indigo-800", "bg-orange-100 text-orange-800"]
    },
    // {
    //     id: 4,
    //     title: "Chill Date",
    //     date: "2024/05/30",
    //     tags: ["Cultural", "Entertainment", "Nightlife"],
    //     tagColors: ["bg-pink-100 text-pink-800", "bg-indigo-100 text-indigo-800", "bg-orange-100 text-orange-800"]
    // }
    // ,
    // {
    //     id: 5,
    //     title: "Outdoor Date",
    //     date: "2024/05/30",
    //     tags: ["Cultural", "Entertainment", "Nightlife"],
    //     tagColors: ["bg-pink-100 text-pink-800", "bg-indigo-100 text-indigo-800", "bg-orange-100 text-orange-800"]
    // }
];

const sortOptions = [
    "Event Date",
    "Duration",
    "Cost",
    "Booking status"
];

export default function Schedule() {
    // const [activeTab, setActiveTab] = useState("Schedule");
    // const [currentTab, setCurrentTab] = useState("Itineraries");
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortBy, setSortBy] = useState("Event Date");

    return (
        <div className="h-screen bg-background max-w-md mx-auto relative">
            {/* Header */}
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">R</span>
                        </div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">👤</span>
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-foreground">Reals</h1>

                    <div className="w-8 h-8 flex items-center justify-center">
                        <span className="text-lg">🛒</span>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="px-4 pb-4 ">
                    <div className="flex gap-8">
                        <button
                        // onClick={() =>
                        //      setCurrentTab("Itineraries")
                        //     }
                        // className={`pb-2 border-b-2 transition-colors ${currentTab === "Itineraries"
                        //     ? "border-primary text-foreground font-medium"
                        //     : "border-transparent text-muted-foreground"
                        //     }`}
                        >
                            Itineraries
                        </button>
                        <button
                        // onClick={() => setCurrentTab("My bookings")}
                        // className={`pb-2 border-b-2 transition-colors ${currentTab === "My bookings"
                        //     ? "border-primary text-foreground font-medium"
                        //     : "border-transparent text-muted-foreground"
                        //     }`}
                        >
                            My bookings
                        </button>
                    </div>
                </div>

                {/* Sort Button */}
                <div className="px-4 pb-3">
                    <div className="flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                            onClick={() => setShowSortModal(true)}
                        >
                            Sort <SlidersHorizontal className="ml-1 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 pb-24 h-screen">
                {/* Bookings List */}
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-card rounded-lg p-4 shadow-sm border border-border">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground mb-1">{booking.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">{booking.date}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${booking.tagColors[index]}`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground ml-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sort Modal */}
            {showSortModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
                    <div className="bg-background w-full rounded-t-2xl p-6 animate-in slide-in-from-bottom">
                        <div className="flex justify-between items-center mb-6">
                            <button onClick={() => setShowSortModal(false)}>
                                <X className="w-6 h-6 text-foreground" />
                            </button>
                            <h2 className="text-lg font-semibold text-foreground">Sort by:</h2>
                            <div className="w-6" />
                        </div>

                        <div className="space-y-4">
                            {sortOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setSortBy(option);
                                        setShowSortModal(false);
                                    }}
                                    className="w-full flex justify-between items-center py-3 border-b border-border last:border-b-0"
                                >
                                    <span className="text-foreground font-medium">{option}</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl">↕️</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Add Button */}
            <div className="fixed bottom-24 right-4">
                <Button size="icon" className="w-12 h-12 rounded-full bg-muted shadow-lg">
                    <Plus className="w-6 h-6" />
                </Button>
            </div>

            <BottomNav />



        </div>
    );
}
