import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  id?: number | string;
  title: string;
  date?: string;
  location?: string;
  price?: string;
  match?: string;
  image?: string;
  href?: string;
}

export default function MediaCard({ id, title, date, location, price, match, image, href = "/activity" }: MediaCardProps) {
  return (
    <Link href={href} className="block rounded-lg overflow-hidden bg-card shadow-sm">
      <div className="relative h-44">
        {image ? (
                  <Image src={image} alt={title} width={200} height={ 200} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">No image</div>
        )}

        {match && (
          <div className="absolute left-3 top-3 bg-black/50 px-2 py-1 rounded text-xs text-white">Match {match}</div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute left-3 bottom-3 text-white">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <div className="text-xs">{date} {date && location ? "•" : ""} {location}</div>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{location}</div>
        {price ? (
          <div className="text-sm font-semibold text-foreground">{price}</div>
        ) : (
          <div className="text-sm text-muted-foreground">Free</div>
        )}
      </div>
    </Link>
  );
}