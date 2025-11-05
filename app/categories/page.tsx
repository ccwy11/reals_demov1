'use client'
import BottomNavigation from "@/components/bottomnav";
import Link from "next/link";
// import AppHeader from "../components/AppHeader";
// import BottomNavigation from "../components/Bottomnav";
// import Chip from "../components/Chip";

const whatToDo = [
  { label: "Workshops", emoji: "🛠️" },
  { label: "Art", emoji: "🎨" },
  { label: "Outdoor", emoji: "☀️" },
  { label: "Active", emoji: "🏃" },
  { label: "Relax", emoji: "🛋️" },
  { label: "Events", emoji: "📅" },
  { label: "Getaway", emoji: "✈️" },
  { label: "Live music", emoji: "🎵" }
];

const whatToEat = [
  { label: "Fine dining", emoji: "🍽️" },
  { label: "Cocktail", emoji: "🍸" },
  { label: "Coffee", emoji: "☕" },
  { label: "Wine", emoji: "🍷" }
];

const whatToGet = [
  { label: "Flowers", emoji: "🌸" },
  { label: "Gift", emoji: "🎁" }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
     

            <AppHeader/>
      <div className="px-4 pb-28 pt-4 space-y-6">
        <div className="flex gap-3">
          <button className="flex-1 rounded-full py-3 bg-card shadow-sm border border-border font-medium">❤️ Featured</button>
          <button className="flex-1 rounded-full py-3 bg-card shadow-sm border border-border font-medium">⏱️ Limited</button>
        </div>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">What to Do</h2>
            <button className="text-sm text-muted-foreground">▾</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {whatToDo.map((c) => (
              <Chip key={c.label} label={c.label} icon={c.emoji} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">What to Eat</h2>
            <button className="text-sm text-muted-foreground">▾</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {whatToEat.map((c) => (
              <Chip key={c.label} label={c.label} icon={c.emoji} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">What to Get</h2>
            <button className="text-sm text-muted-foreground">▾</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {whatToGet.map((c) => (
              <Chip key={c.label} label={c.label} icon={c.emoji} />
            ))}
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}