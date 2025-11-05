import { Search, SlidersHorizontal, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/Bottomnav";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import SavedButton from '@/components/SavedButton';


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
  { id: 2, title: "Cocktail Masterclass at Penicillin", match: "82%", image: "https://images.pexels.com/photos/8129909/pexels-photo-8129909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
   { id: 3, title: "Archery Tag at Lai Chi Kok", match: "70%", image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=500&fit=crop" },
     { id: 4, title: "Archery Tag at Lai Chi Kok", match: "70%", image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=500&fit=crop" },
];

  const sharedExperiences = [
          
                    { id:1,
                        userAvatar: "https://wvhrwywa93.ufs.sh/f/qAkxodQH27JRFtxigVcjr8UNizbhKsQZ7xqLDTkOn1GuHe9g",
                        title: "Found the best hidden cocktail bar",
                        image: "/images/WA0004.jpg"
    },
              { id:2,
                        userAvatar: "https://wvhrwywa93.ufs.sh/f/qAkxodQH27JR2aTK1poLABvuNSpJ3sUI4gdkTrcQKimlhfE8",
                        userName: "Jess & Leo",
                        title: "Our pottery class & cafe hopping day!",
                        image: "/images/IMG_8205.jpg"
                    },
                ]

export default function Home() {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <AppHeader/>
      {/* Header */}

      <div className="px-4 pb-28">
        {/* Popular horizontal scroller */}
 <section className="py-6 px-4">
  <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Popular Arts & Culture</h2>
            
    <Link href="/categories" className="text-sm text-primary hover:underline">See all</Link>
  </div>
  <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
    {categories.map((c) => (
      <Link
        key={c.id}
        href="/activity"
        className="min-w-[220px] rounded-xl overflow-hidden bg-card shadow-md snap-start"
        aria-label={`View ${c.title} activity`}
      >
        <div className="relative h-36 w-full">
          <Image
            width={600}
            height={400}
            src={c.image}
            alt={`Image of ${c.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute left-3 bottom-3 text-white font-semibold text-base drop-shadow-md">{c.title}</div>
        </div>
      </Link>
    ))}
  </div>
        </section>
        {/* wishlist */}
<section>
      <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Explore Events</h1>
      <div className="flex items-center gap-4 p-6 border rounded-lg">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
        <div>
          <h3 className="font-semibold">Sunset Yoga on Beach</h3>
          <p className="text-sm text-gray-600">$25 • Event</p>
        </div>
        <SavedButton />
      </div>
      <Link href="/wishlist" className="mt-6 inline-block text-blue-600 hover:underline">
        → Go to Wishlist
      </Link>
          </div>
          </section>
        {/* Featured */}
     <section className="py-6 px-4">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-semibold text-foreground">Featured Reals</h2>
    <Link href="/featured" className="text-sm text-primary hover:underline">See all</Link>
  </div>
  <Link
    href="/post2"
    className="block rounded-xl overflow-hidden bg-card shadow-lg hover:scale-[1.02] transition-transform"
    aria-label={`View ${featured.title} featured post`}
  >
    <div className="relative h-44">
      <Image
        width={1200}
        height={700}
        src={featured.image}
        alt={`Image of ${featured.title}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute left-4 bottom-4 text-white">
        <h3 className="text-xl font-bold">{featured.title}</h3>
        <div className="text-sm">Match {featured.match}</div>
      </div>
      <div className="absolute right-3 top-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center">
        <Star className="w-4 h-4 text-white" />
      </div>
    </div>
  </Link>
        </section>
        

        {/* sharedExperiences */}
<section className="py-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Shared Experiences</h2>
            <Link href="/experiences" className="text-sm text-primary hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sharedExperiences.map((exp) => (
              <Link
        key={exp.id}
    href={exp.id === 1 ? "/post" : "/post2"}
                className="rounded-xl overflow-hidden bg-card shadow-md hover:scale-[1.02] transition-transform"
                aria-label={`View ${exp.userName}'s shared experience`}
              >
                <div className="relative h-40">
                  <Image
                    width={800}
                    height={500}
                    src={exp.image}
                    alt={`Image of ${exp.title}`}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute left-3 bottom-3 text-white">
                    <div className="flex items-center gap-2">
                      <Image
                        width={24}
                        height={24}
                        src={exp.userAvatar}
                        alt={`${exp.userName}'s avatar`}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium">{exp.userName}</span>
                    </div>
                    <h3 className="text-base font-semibold">{exp.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
<section className="py-6 px-4">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-semibold text-foreground">Trending Reals</h2>
    <Link href="/trending" className="text-sm text-primary hover:underline">See all</Link>
  </div>
  <div className="grid grid-cols-2 gap-4">
    {trending.map((t) => (
      <Link
        key={t.id}
        href="/activity"
        className="rounded-xl overflow-hidden bg-card shadow-md hover:scale-[1.02] transition-transform"
        aria-label={`View ${t.title} trending post`}
      >
        <div className="relative h-28">
          <Image
            width={800}
            height={500}
            src={t.image}
            alt={`Image of ${t.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute left-3 bottom-3 text-white font-semibold text-sm drop-shadow-md">{t.title}</div>
          <div className="absolute left-3 top-3 bg-black/60 px-2 py-1 rounded text-xs text-white">Match {t.match}</div>
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
