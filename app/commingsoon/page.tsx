import Link from "next/link";
import { Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/bottomnav";

interface Props {
  feature?: string;
}

const ComingSoon: React.FC<Props> = ({ feature }) => {
  const title = feature ? `${feature} Coming Soon` : "Coming Soon";
  const description = feature
    ? `We're building the ${feature.toLowerCase()} experience. Check back soon!`
    : "We're building this experience. Check back soon!";

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Hourglass className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground mb-6">{description}</p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ComingSoon;