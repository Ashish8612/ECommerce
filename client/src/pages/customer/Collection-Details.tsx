import { Commonloader } from "@/components/common/loader";
import CustomerProductDetailsGallery from "@/components/customer/products/details/customer-product-details-gallery";
import CustomerProductDetailsSummary from "@/components/customer/products/details/customer-product-details-summary";
import CustomerProductRelatedCard from "@/components/customer/products/details/customer-related-product-card";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerProductDetailsStore } from "@/features/customer/products/details/store";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useAuth } from "@clerk/react";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const containerClass = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

function CollectionDetails() {
  const { id = "" } = useParams();
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootstrapped } = useAuthStore();

  const {
    loadProduct,
    clear,
    data,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    toggleWishlist,
    addToCart,
  } = useCustomerProductDetailsStore((state) => state);

  const wishlistItems = useCustomerWishlistStore((state) => state.items);

  const product = data?.product ?? null;
  const relatedProducts = data?.relatedProducts ?? [];
  const isWishlistActive = !!product
    ? wishlistItems.some((item) => item.productId === product._id)
    : false;

  useEffect(() => {
    void loadProduct(id);

    return () => {
      clear();
    };
  }, [clear, id, loadProduct]);

  if (!product) return <Commonloader />;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top navigation bar ── */}
      <section className="border-b border-border/40 bg-gradient-to-br from-primary/5 via-background to-background animate-fade-in">
        <div className={`${containerClass} py-3.5 flex items-center justify-between`}>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-sm transition-all hover:border-primary/50 hover:text-primary hover:shadow-md"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Collections
          </Link>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/80">{product?.brand}</p>
            <p className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">{product?.title}</p>
          </div>
        </div>
      </section>

      {/* ── Main Details Grid ── */}
      <div className={`${containerClass} py-6`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-start">
          {/* Gallery with slide in */}
          <div className="animate-fade-in-up">
            <CustomerProductDetailsGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>

          {/* Details Summary with staggered animation */}
          <div className="animate-fade-in-up stagger-2">
            <CustomerProductDetailsSummary
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              setSelectedColor={setSelectedColor}
              setSelectedSize={setSelectedSize}
              toggleWishlist={() =>
                toggleWishlist(
                  isLoaded,
                  isBootstrapped,
                  Boolean(isSignedIn),
                  isWishlistActive,
                )
              }
              isWishlistActive={isWishlistActive}
              onAddToCart={() =>
                addToCart(isLoaded, isBootstrapped, Boolean(isSignedIn))
              }
            />
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-14 space-y-5 animate-fade-in-up stagger-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">You may also like</p>
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Related Products</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item, i) => (
                <div key={item._id} className={`animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}>
                  <CustomerProductRelatedCard product={item} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default CollectionDetails;
