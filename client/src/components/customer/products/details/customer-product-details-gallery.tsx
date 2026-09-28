
import { getCoverImage } from "@/features/customer/products/product-list-shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type CustomerProductDetailsGalleryProps = {
  product: CustomerProduct;
  selectedImage: string;
  setSelectedImage: (value: string) => void;
};

function CustomerProductDetailsGallery({
  product,
  selectedImage,
  setSelectedImage,
}: CustomerProductDetailsGalleryProps) {
  const galleryImages = product.images || [];
  const coverImage = getCoverImage(product);

  // Build a flat list of all image URLs to cycle through
  const allImages: string[] = galleryImages.length
    ? galleryImages.map((img) => img.url)
    : coverImage
    ? [coverImage]
    : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep activeIndex in sync when parent changes selectedImage
  useEffect(() => {
    if (!selectedImage) return;
    const idx = allImages.indexOf(selectedImage);
    if (idx !== -1 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  const goTo = useCallback(
    (idx: number) => {
      setFade(false);
      setTimeout(() => {
        const next = (idx + allImages.length) % allImages.length;
        setActiveIndex(next);
        setSelectedImage(allImages[next] ?? "");
        setFade(true);
      }, 180);
    },
    [allImages, setSelectedImage],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (allImages.length <= 1 || isPaused) return;
    timerRef.current = setInterval(() => {
      goTo(activeIndex + 1);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [allImages.length, isPaused, activeIndex, goTo]);

  const displayImage = allImages[activeIndex] ?? coverImage ?? "";

  if (!displayImage) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-border/40 bg-muted text-sm text-muted-foreground">
        No Image
      </div>
    );
  }

  return (
    <div className="w-full max-w-[480px] mx-auto space-y-3">
      {/* ── Main image with carousel controls ─────────────────────── */}
      <div
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 shadow-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Image — framed to fit viewport */}
        <div className="aspect-[4/3] sm:aspect-square max-h-[420px] w-full flex items-center justify-center bg-muted/20">
          <img
            src={displayImage}
            alt={product.title}
            className={`h-full w-full object-cover transition-all duration-500 ${
              fade ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
            }`}
          />
        </div>

        {/* Prev / Next arrows — appear on hover */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </>
        )}

        {/* Dot indicators at the bottom */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {allImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setIsPaused(true);
                  goTo(i);
                  setTimeout(() => setIsPaused(false), 5000);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "h-2 w-5 bg-primary shadow"
                    : "h-2 w-2 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}

        {/* Slide counter badge */}
        {allImages.length > 1 && (
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
            {activeIndex + 1} / {allImages.length}
          </span>
        )}
      </div>

      {/* ── Thumbnail strip ────────────────────────────────────────── */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((url, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setIsPaused(true);
                  goTo(i);
                  setTimeout(() => setIsPaused(false), 5000);
                }}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  isActive
                    ? "border-primary ring-2 ring-primary/30 scale-[1.06]"
                    : "border-border/40 opacity-60 hover:opacity-90 hover:border-border"
                }`}
              >
                <img
                  src={url}
                  alt={`${product.title} ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomerProductDetailsGallery;
