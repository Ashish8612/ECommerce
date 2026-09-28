import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { extractSalePrice } from "@/features/customer/products/product-list-shared";
import type { CustomerProduct, ProductSize } from "@/features/customer/products/types";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingBag, Truck } from "lucide-react";
import CustomerProductOptionsGroup from "./customer-product-options-group";

type CustomerProductDetailsSummaryProps = {
  product: CustomerProduct;
  selectedColor: string;
  selectedSize: string;
  setSelectedColor: (value: string) => void;
  setSelectedSize: (value: ProductSize) => void;
  toggleWishlist: () => Promise<void>;
  isWishlistActive: boolean;
  onAddToCart: () => Promise<void>;
};

function CustomerProductDetailsSummary({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  toggleWishlist,
  isWishlistActive,
  onAddToCart,
}: CustomerProductDetailsSummaryProps) {
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;
  const hasFreeShipping = salePrice > 999;

  return (
    <section className="space-y-5 animate-fade-in-up">

      {/* ── Top badges row ── */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-full border border-border bg-muted/70 text-muted-foreground hover:bg-muted/70 backdrop-blur-sm">
          {product?.category?.name}
        </Badge>

        {product?.stock > 0 ? (
          <Badge className="rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 backdrop-blur-sm">
            {product.stock <= 5 ? `Only ${product.stock} left` : "In stock"}
          </Badge>
        ) : (
          <Badge variant="destructive" className="rounded-full">
            Out of stock
          </Badge>
        )}
      </div>

      {/* ── Meta pills row ── */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="flex items-center gap-1.5 bg-muted/60 rounded-xl px-3 py-1.5">
          <span className="text-muted-foreground">Brand</span>
          <span className="font-semibold text-foreground">{product?.brand}</span>
        </span>
        <span className="flex items-center gap-1.5 bg-muted/60 rounded-xl px-3 py-1.5">
          <span className="text-muted-foreground">Category</span>
          <span className="font-semibold text-foreground">{product?.category?.name}</span>
        </span>
      </div>

      {/* ── Dark premium price block ── */}
      <div
        className="relative overflow-hidden rounded-2xl p-5 text-white"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)",
          backgroundImage:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%), url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Crect width='40' height='40'/%3E%3Crect x='0' y='0' width='1' height='40'/%3E%3Crect x='39' y='0' width='1' height='40'/%3E%3Crect x='0' y='0' width='40' height='1'/%3E%3Crect x='0' y='39' width='40' height='1'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "auto, 40px 40px",
        }}
      >
        {/* Sale badge — absolute top-right */}
        {hasSale && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {product.salePercentage}% OFF
          </span>
        )}

        {/* Price row */}
        <div className="flex flex-wrap items-end gap-3 mb-1">
          <span className="text-4xl font-black text-white tracking-tight leading-none">
            {formatPrice(salePrice)}
          </span>
          {hasSale && (
            <span className="text-lg line-through text-slate-400 mb-0.5">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Free shipping badge inside price block */}
        {hasFreeShipping && (
          <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Truck className="h-3.5 w-3.5" />
            Free Shipping
          </div>
        )}
      </div>

      {/* ── Description ── */}
      {product.description && (
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}

      {/* ── Color options ── */}
      {product.colors.length > 0 && (
        <CustomerProductOptionsGroup
          values={product.colors}
          selectedValue={selectedColor}
          onSelect={setSelectedColor}
          variant="color"
        />
      )}

      {/* ── Size options ── */}
      {product.sizes?.length > 0 && (
        <CustomerProductOptionsGroup
          values={product.sizes}
          selectedValue={selectedSize}
          onSelect={setSelectedSize}
          variant="size"
        />
      )}

      {/* ── Action buttons ── */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        {/* Add to Cart */}
        <Button
          type="button"
          className="flex-1 w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-2xl h-12 sm:h-13 text-sm sm:text-base font-bold shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-indigo-500/40 gap-2 border-0"
          disabled={product.stock < 1}
          onClick={() => void onAddToCart()}
        >
          <ShoppingBag className="h-4.5 w-4.5 shrink-0" />
          Add to Cart
        </Button>

        {/* Wishlist */}
        <Button
          type="button"
          variant="outline"
          className={`shrink-0 w-full sm:w-auto rounded-2xl h-12 sm:h-13 px-5 sm:px-6 text-sm font-semibold transition-all gap-2 border-2 ${
            isWishlistActive
              ? "border-rose-400 text-rose-500 bg-rose-50/50 dark:bg-rose-950/20 hover:border-rose-500 hover:text-rose-600"
              : "border-border hover:border-rose-400 hover:text-rose-500"
          }`}
          onClick={() => void toggleWishlist()}
        >
          <Heart
            className={`h-4.5 w-4.5 shrink-0 transition-colors duration-200 ${
              isWishlistActive
                ? "fill-rose-500 stroke-rose-500"
                : "stroke-current"
            }`}
          />
          <span>{isWishlistActive ? "Saved" : "Wishlist"}</span>
        </Button>
      </div>
    </section>
  );
}

export default CustomerProductDetailsSummary;
