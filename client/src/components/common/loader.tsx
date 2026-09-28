import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";


const wrapClass = "flex min-h-screen w-full items-center justify-center";

const contentClass =
  "flex flex-col items-center gap-3 text-sm text-muted-foreground";

const iconClass = "h-8 w-8 animate-spin text-primary";

type CommonLoaderProps = {
  text?: string;
  className?: string;
  iconClassName?: string;
};

export function Commonloader({
  text = "Loading...",
  className,
}: CommonLoaderProps) {
  return (
    <div className={cn(wrapClass, className)}>
      <div className={contentClass}>
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-primary/20 opacity-75"></div>
          <div className="absolute h-12 w-12 animate-pulse rounded-full bg-primary/40"></div>
          <div className="h-6 w-6 animate-bounce rounded-full bg-primary shadow-lg shadow-primary/30"></div>
        </div>
        <p className="mt-4 font-semibold tracking-wide animate-pulse text-foreground/80">{text}</p>
      </div>
    </div>
  );
}
