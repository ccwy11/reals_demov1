
import * as input from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Star, Search, Heart, Plus, Settings, Calendar } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/bottomnav"

const categories = [
  { icon: "🔥", label: "Popular" },
  { icon: "🎨", label: "Arts & Culture" },
  { icon: "⚡", label: "Active" },
  { icon: "🧘", label: "Relax" },
  { icon: "🍽️", label: "Food" },
  { icon: "🍻", label: "Bars" },
  { icon: "📅", label: "Events" },
  { icon: "📱", label: "See all" }
];

const reelsFeed = [
  {
    id: 1,
    user: {
      name: "Pumkinpie",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    title: "Sunset Stroll at Ha Pak Nai‼️",
    description: "Chasing Sunsets with My Love at Ha Pak Nai 🌅💖",
    image: "https://images.unsplash.com/photo-1566869296634-0621a207b7e0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw1MTExOTJ8fGVufDB8fHx8fA%3D%3D",
    likes: 20,
    type: "single"
  },
  {
    id: 2,
    user: {
      name: "Espresso",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    title: "Star Ferry Romance",
    description: "Sailing Across Victoria Harbour with Bae 🚤✨",
    image: "https://images.unsplash.com/photo-1575646942673-dec5dacb77b6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmVycnklMjBuaWdodHxlbnwwfHwwfHx8MA%3D%3D",
    likes: 5,
    type: "single"
  },
  {
    id: 3,
    user: {
      name: "sunflower",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    title: "Hongkong Hidden Gems - Local Recommendations",
    description: "Picnic Date Goals at Inspiration Lake 🧺💑",
    images: [
      "https://images.unsplash.com/photo-1574920443828-8c5d8b75f327?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=200&h=150&fit=crop"
    ],
    likes: 623,
    type: "grid"
  },
  {
    id: 4,
    user: {
      name: "Almondmilk",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    title: "Hongkong's New! Super Large Indoor Playground - Perfect for Holidays!",
    description: "Indoor Sports must do",
    image: "https://images.unsplash.com/photo-1593104126192-a09fe7123329?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kb29yJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D",
    likes: 165,
    type: "single"
  }
];

const featuredReals = [
  {
    id: 1,
    title: "Pottery",
    match: "89%",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    action: "Book"
  },
  {
    id: 2,
    title: "Archery",
    match: "70%",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center",
    action: "Book"
  }
];

const trendingReals = [
  // {
  //   id: 1,
  //   title: "Pottery",
  //   match: "89%",
  //   image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
  //   action: "Book"
  // },
  // {
  //   id: 2,
  //   title: "Archery",
  //   match: "70%",
  //   image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center",
  //   action: "Book"
  // },
  // {
  //   id: 3,
  //   title: "Archery",
  //   match: "70%",
  //   image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center",
  //   action: "Book"
  // },
  // {
  //   id: 4,
  //   title: "Archery",
  //   match: "70%",
  //   image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center",
  //   action: "Book"
  // }
];


export default function Home() {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
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

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <input.Input className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-none outline-none focus:ring-2 focus:ring-ring" type="text"
              placeholder="Search" />

          </div>
        </div>

        {/* Sort Button */}
        {/* <div className="px-4 pb-3">
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="w-2/12 text-muted-foreground">
              Sort <ArrowUpDown className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div> */}

        {/* Main Content */}
        {/* <div className="px-4 pb-24"> */}
        {/* Categories */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                <span className="text-xl">{category.icon}</span>
              </div>
              <span className="text-xs text-center text-foreground font-medium">
                {category.label}
              </span>
            </div>
          ))}
          {/* </div> */}
        </div>

        {/* Featured Reals */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">Featured Reals</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featuredReals.map((real) => (
              <Link href="/activity"
                key={real.id}
                // to="/activity"
                className="relative bg-card rounded-lg overflow-hidden shadow-sm block"
              >
                <div className="relative ">
                  <Image
                    src={real.image}
                    alt={real.title}
                    width={400}
                    height={300}
                    className="w-full h-32 object-cover"
                  />
                  <button className="absolute top-2 right-2 w-6 h-6 bg-black/20 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white fill-white" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/60 rounded px-2 py-1">
                    <span className="text-white text-xs">Match {real.match}</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-foreground">{real.title}</h3>
                    <Button size="sm" className="bg-primary text-primary-foreground ">
                      {real.action}
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Reals */}

        {/* <h2 className="text-lg font-semibold text-foreground mb-4">Trending Reals</h2>

        <div className="grid grid-cols-2 gap-4">
          {trendingReals.map((real) => (
            <div key={real.id} className="relative bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <Image
                  src={real.image}
                  alt={real.title}
                  width={400}
                  height={300}
                  className="w-full h-32 object-cover"
                />
                <button className="absolute top-2 right-2 w-6 h-6 bg-black/20 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/60 rounded px-2 py-1">
                  <span className="text-white text-xs">Match {real.match}</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-foreground">{real.title}</h3>
              </div>
            </div>
          ))}
        </div> */}
        {/* Reels Feed */}
        <Link href={"/post"}>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">🤙Recommeded Reels</h2>
            <div className="grid grid-cols-2 gap-4">
              {reelsFeed.map((reel) => (
                <div key={reel.id} className="bg-card rounded-lg overflow-hidden">
                  {/* User Header */}
                  <div className="flex items-center gap-3 p-4 pb-2">
                    <Image
                      width={400}
                      height={300}
                      src={reel.user.avatar}
                      alt={reel.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">{reel.user.name}</span>
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-2">
                    <h3 className="text-sm font-medium text-foreground mb-2 leading-tight">
                      {reel.title}
                    </h3>
                  </div>

                  {/* Images */}
                  {reel.type === "single" ? (
                    <div className="px-4">
                      <Image
                       
                        width={400}
                        height={300}
                         src={reel.image!}
                        alt={reel.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="px-4">
                      <div className="grid grid-cols-3 gap-1">
                        {reel.images?.slice(0, 6).map((img, index) => (
                          <Image
                            width={400}
                            height={300}
                            key={index}
                            src={img}
                            alt=""
                            className="w-full h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Like Count */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{reel.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>

      <BottomNav />
      {/* </div> */}
    </div >
  )
}