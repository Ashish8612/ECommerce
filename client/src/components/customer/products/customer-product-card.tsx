import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { extractSalePrice, getCoverImage, getSwatchColor } from "@/features/customer/products/product-list-shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { formatPrice } from "@/lib/utils";
import { Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type CustomerProductCardProps = {
  product: CustomerProduct;
};

function CustomerProductCard({ product }: CustomerProductCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;
  const isFeatured = product.isFeatured;

  const [wishlisted, setWishlisted] = useState(false);

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      <Link to={`/collection/${product._id}`} className="flex flex-1 flex-col justify-between">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted/40">
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No Image
            </div>
          )}

          {/* Quick View Overlay on hover */}
          <div className="absolute inset-0 bg-black/35 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
            <span className="text-white text-xs font-bold tracking-wider uppercase bg-black/60 px-4 py-2 rounded-full border border-white/20 shadow-lg">
              Quick View
            </span>
          </div>

          {/* Sale / Featured Badge */}
          {isFeatured ? (
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-amber-950 shadow-md">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          ) : hasSale ? (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
              {product.salePercentage}% OFF
            </span>
          ) : null}

          {/* Floating Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishlisted((prev) => !prev);
            }}
            className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95 ${
              wishlisted ? "text-rose-500" : "text-muted-foreground hover:text-rose-500"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart
              className="h-4 w-4 transition-colors"
              fill={wishlisted ? "currentColor" : "none"}
            />
          </button>
        </div>

        <CardContent className="flex flex-1 flex-col justify-between space-y-3 p-3.5">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <span>{product.brand}</span>
              {product.category?.name && (
                <span className="text-[10px] lowercase text-muted-foreground/70">
                  {product.category.name}
                </span>
              )}
            </div>
            <p className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              {product.title}
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-foreground">
                  {formatPrice(salePrice)}
                </span>
                {hasSale && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Color swatches */}
              {product.colors.length > 0 && (
                <div className="flex items-center gap-1">
                  {product.colors.slice(0, 3).map((color) => (
                    <span
                      key={color}
                      className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: getSwatchColor(color) }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-[10px] text-muted-foreground font-medium">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            <Button className="w-full rounded-xl bg-primary text-primary-foreground font-semibold text-xs h-9 shadow-sm transition-all duration-200 group-hover:bg-primary/90">
              View Details
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default CustomerProductCard;
