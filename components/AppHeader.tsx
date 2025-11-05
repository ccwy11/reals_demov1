import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function AppHeader({ title = "Reals", showSearch = true }: { title?: string; showSearch?: boolean }) {
  return (
<div className="sticky top-0 bg-background/95 backdrop-blur-sm z-20 border-b border-border/50">
  <div className="flex items-center justify-between px-4 py-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center text-base font-bold text-background">R</div>
      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xl">👤</div>
  
        </div>
    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Reals</h1>
    <Button variant="ghost" size="icon" aria-label="View cart">
      <span className="text-2xl">🛒</span>
    </Button>
  </div>
      <div className="px-4 pb-4">
        
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <input
        type="text"
        placeholder="Search activities or events"
        className="w-full pl-10 pr-12 py-2.5 bg-muted rounded-full border-none outline-none focus:ring-2 focus:ring-primary shadow-sm transition-shadow"
        aria-label="Search activities or events"
      />
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
        aria-label="Filter search"
      >
        <SlidersHorizontal className="w-5 h-5" />
          </Button>

    </div>
  </div>
</div> 
  );
}




    // <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-20">
    //   <div className="flex items-center justify-between px-4 py-3">
    //     <div className="flex items-center gap-2">
    //       <div className="w-9 h-9 bg-foreground rounded-full flex items-center justify-center text-sm font-bold text-background">R</div>
    //       <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">👤</div>
    //     </div>

    //     <h1 className="text-2xl font-extrabold text-foreground">{title}</h1>

    //     <div className="w-9 h-9 flex items-center justify-center">🛒</div>
    //   </div>

    //   {showSearch && (
    //     <div className="px-4 pb-3">
    //       <div className="relative">
    //         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
    //         <input
    //           type="text"
    //           placeholder="Search events"
    //           className="w-full pl-10 pr-4 py-2 bg-muted rounded-full border-none outline-none focus:ring-2 focus:ring-ring"
    //         />
    //         <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
    //           <SlidersHorizontal className="w-4 h-4" />
    //         </Button>
    //       </div>
    //     </div>
    //   )}
    // </div>