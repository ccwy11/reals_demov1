import { Search, SlidersHorizontal, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/bottomnav";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, title: "teamLab Future Park", image: "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 2, title: "S20 Hong Kong Songkran Music Festival", image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=600&h=400&fit=crop" },
  { id: 3, title: "West Kowloon Park", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=400&fit=crop" }
];

const featured = {
  title: "Tung Hing Glass & Pottery",
  match: "89%",
  image: "https://images.pexels.com/photos/3981749/pexels-photo-3981749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
};

const trending = [
  { id: 1, title: "Archery Tag at Lai Chi Kok", match: "70%", image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=500&fit=crop" },
  { id: 2, title: "Cocktail Masterclass at Penicillin", match: "82%", image: "https://images.pexels.com/photos/8129909/pexels-photo-8129909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-foreground rounded-full flex items-center justify-center text-sm font-bold text-background">R</div>
            <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">👤</div>
          </div>

          <h1 className="text-2xl font-extrabold text-foreground">Reals</h1>

          <div className="w-9 h-9 flex items-center justify-center">🛒</div>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-full border-none outline-none focus:ring-2 focus:ring-ring"
            />
            <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-28">
        {/* Popular horizontal scroller */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Popular Arts & Culture</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((c) => (
              <Link key={c.id} href="/activity" className="min-w-[220px] rounded-lg overflow-hidden bg-card shadow-sm">
                <div className="relative h-36 w-full">
                  <Image
                    width={600}
                    height={400}
                    src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute left-3 bottom-3 text-white font-semibold text-sm drop-shadow">{c.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Featured Reals</h3>
            <Link href="/" className="text-sm text-destructive">See all</Link>
          </div>

          <Link href="/post2" className="block rounded-xl overflow-hidden bg-card shadow-md">
            <div className="relative h-44">
              <Image
                width={1200}
                    height={700}
                src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute left-4 bottom-4 text-white">
                <h4 className="text-xl font-bold">{featured.title}</h4>
                <div className="text-sm">Match {featured.match}</div>
              </div>
              <div className="absolute right-3 top-3 w-8 h-8 bg-black/25 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          </Link>
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Trending Reals</h3>
            <Link href="/" className="text-sm text-destructive">See all</Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {trending.map((t) => (
              <Link key={t.id} href="/post" className="rounded-lg overflow-hidden bg-card shadow-sm block">
                <div className="relative h-28">
                  <Image src={t.image} alt={t.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover" />
                  <div className="absolute left-3 bottom-3 text-white font-semibold text-sm drop-shadow">{t.title}</div>
                  <div className="absolute left-3 top-3 bg-black/50 px-2 py-1 rounded text-xs text-white">Match {t.match}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}
