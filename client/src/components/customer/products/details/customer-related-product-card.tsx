import { Card, CardContent } from "@/components/ui/card";
import { extractSalePrice, getCoverImage } from "@/features/customer/products/product-list-shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { formatPrice } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type CustomerProductRelatedCardProps = {
  product: CustomerProduct;
};

function CustomerProductRelatedCard({
  product,
}: CustomerProductRelatedCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <Link to={`/collection/${product._id}`} className="block h-full">
        {/* Image wrap */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted/40">
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No Image
            </div>
          )}

          {hasSale && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
              {product.salePercentage}% OFF
            </span>
          )}
        </div>

        {/* Content wrap */}
        <CardContent className="space-y-2 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {product.title}
          </h3>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-foreground">
                {formatPrice(salePrice)}
              </span>
              {hasSale && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-primary group-hover:text-white">
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default CustomerProductRelatedCard;
