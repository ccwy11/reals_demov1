"use client";

import { ArrowLeft, RotateCcw, Heart, Search, Plus, Calendar, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/bottomnav";
import Image from "next/image";
import Link from "next/link";

export default function Activity() {
  const [quantity, setQuantity] = useState(2);
  const router = useRouter();

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Header (consistent with app) */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-foreground rounded-full flex items-center justify-center text-sm font-bold text-background">R</div>
            <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">👤</div>
          </div>

          <h1 className="text-2xl font-extrabold text-foreground">Reals</h1>

          <div className="w-9 h-9 flex items-center justify-center">🛒</div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-80">
              <Image
                  width={1200 }
                  height={800}
          src="https://images.pexels.com/photos/1000454/pexels-photo-1000454.jpeg"
          alt="Pottery workshop"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Action Icons */}
        <div className="absolute top-4 right-4 space-y-3">
          <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
            <RotateCcw className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Star favorite */}
        <div className="absolute right-4 top-20 w-10 h-10 bg-black/25 rounded-full flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>

        {/* View time slots Button */}
        <div className="absolute bottom-4 right-4">
          <Button className="bg-primary text-white px-4 py-2 rounded-lg">View time slots</Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-28 pt-6">
        {/* Title and Price */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">Pottery workshop</h1>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">$250</span>
            <span className="text-muted-foreground">/ per person</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-muted-foreground leading-relaxed">
            Indulge in a hands-on pottery workshop where you will craft and glaze your own piece under expert guidance. Perfect for dates and creative outings.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-card rounded-lg p-4 shadow-sm border border-border mb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Booking summary</h3>
              <p className="text-sm text-muted-foreground mb-3">2 persons x $250 • 22 Nov 2025</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Creative</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Indoor</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-foreground">$500.00</span>
            <div className="flex items-center gap-3">
              <button onClick={handleDecrement} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 rotate-45" />
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button onClick={handleIncrement} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mb-6">
          <Button className="w-full bg-primary text-white py-4 text-lg font-medium rounded-lg">Confirm</Button>
        </div>

        {/* Related Activities (small grid) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Related Reals</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/activity" className="rounded-lg overflow-hidden bg-card shadow-sm block">
              <div className="relative h-28">
                              <Image
                                  width={800}
                                  height={500}
                                  src="https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=500&fit=crop" alt="Archery" className="w-full h-full object-cover" />
                <div className="absolute left-3 bottom-3 text-white font-semibold text-sm drop-shadow">Archery Tag at Lai Chi Kok</div>
                <div className="absolute left-3 top-3 bg-black/50 px-2 py-1 rounded text-xs text-white">Match 70%</div>
              </div>
            </Link>

            <Link href="/activity" className="rounded-lg overflow-hidden bg-card shadow-sm block">
              <div className="relative h-28">
                              <Image
                                  width={800}
                                  height={500}
                                  src="https://images.unsplash.com/photo-1542444459-db6d3d4f9b2b?w=800&h=500&fit=crop" alt="Cocktail" className="w-full h-full object-cover" />
                <div className="absolute left-3 bottom-3 text-white font-semibold text-sm drop-shadow">Cocktail Masterclass at Penicillin</div>
                <div className="absolute left-3 top-3 bg-black/50 px-2 py-1 rounded text-xs text-white">Match 82%</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
