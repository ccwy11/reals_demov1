// components/BottomNav.tsx
'use client'; // For App Router, if using client-side hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // or useRouter().pathname for Pages Router
import { Search, Heart, Plus, Calendar, Settings } from "lucide-react";


interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    route: string;
    isCenter?: boolean;
}


const navItems: NavItem[] = [
    { icon: Search, label: "Explore", route: "/login" },
    { icon: Heart, label: "Wishlist", route: "/login" },
    { icon: Plus, label: "", route: "/demo", isCenter: true },
    { icon: Calendar, label: "Schedule", route: "/schedule" },
    { icon: Settings, label: "Setting", route: "/itineraries" }
];

export default function BottomNavigation() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border max-w-md mx-auto z-40">
            <div className="grid grid-cols-5 py-2">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.route;
                    const IconComponent = item.icon;

                    return (
                        <Link
                            key={index}
                            href={item.route}
                            className={`flex flex-col items-center justify-center py-2 ${item.isCenter ? "mx-4" : ""
                                }`}
                        >
                            {item.isCenter ? (
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                            ) : (
                                <>
                                    <IconComponent
                                        className={`w-5 h-5 mb-1 ${isActive ? "text-foreground" : "text-muted-foreground"
                                            }`}
                                    />
                                    <span
                                        className={`text-xs ${isActive ? "text-foreground" : "text-muted-foreground"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}