import MediaCard from "@/components/MediaCard";
import Image from "next/image";

export default function BookingSummary({ item }: { item: any }) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
      <div className="flex gap-4">
        <div className="w-24">
          <Image src={item.image} alt={item.title} className="w-full h-16 object-cover rounded" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.date} • {item.location}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">2 persons</div>
            <div className="text-sm font-semibold text-foreground">{item.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}