
import { Commonloader } from "@/components/common/loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCustomerHomeStore } from "@/features/customer/home/store";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Grid2X2, TicketPercent } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TypingText } from "@/components/ui/typing-text";

/* ── Layout ──────────────────────────────────────────────────────────── */
const pageWrapClass = "min-h-screen bg-background antialiased selection:bg-primary/20";
const containerClass = "w-full px-4 sm:px-6 lg:px-10 xl:px-14";
const sectionStackClass = "flex flex-col gap-12 py-8";

/* ── Section heading ─────────────────────────────────────────────────── */
const sectionHeadClass = "mb-6 space-y-1";
const sectionEyebrowClass = "text-xs font-bold uppercase tracking-[0.3em] text-primary/80";
const sectionTitleClass = "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl";

/* ── Banners ─────────────────────────────────────────────────────────── */
const bannerGridClass = "grid gap-4 lg:grid-cols-[1.6fr_1fr]";
const bannerMainCardClass =
  "group relative block overflow-hidden rounded-2xl border border-border/30 bg-card shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-primary/5";
const bannerMainImageClass =
  "h-[420px] w-full object-cover transition-all duration-700 group-hover:scale-105";

const bannerSideGridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-1";
const bannerSideCardClass =
  "group block overflow-hidden rounded-2xl border border-border/40 bg-card shadow-md transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5";
const bannerSideImageClass =
  "h-[200px] w-full object-cover transition-all duration-700 group-hover:scale-105";

/* ── Categories ─────────────────────────────────────────────────────── */
const categoryGridClass = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";
const categoryCardClass =
  "group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-1 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5";
const categoryContentClass =
  "h-full space-y-4 rounded-xl bg-gradient-to-br from-background/50 to-muted/30 p-6 backdrop-blur-sm transition-colors duration-300 group-hover:bg-background/80";
const categoryIconWrapClass =
  "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10";
const categoryIconClass = "h-5 w-5";
const categoryTitleClass = "text-base font-semibold tracking-tight text-foreground";
const categoryLinkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-primary/80";
const categoryArrowIconClass = "h-4 w-4 transition-transform group-hover:translate-x-1";

/* ── Coupons ─────────────────────────────────────────────────────────── */
const couponGridClass = "grid gap-4 md:grid-cols-2 xl:grid-cols-4";
const couponCardClass =
  "group relative overflow-hidden rounded-2xl border border-dashed border-primary/20 bg-primary/[0.02] transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.04]";
const couponContentClass = "space-y-4 p-6";
const couponIconWrapClass =
  "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-12";
const couponIconClass = "h-5 w-5";
const couponCodeClass = "text-xl font-bold tracking-widest text-primary";
const couponBadgeClass =
  "rounded-full border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary hover:bg-primary/20";
const couponCodeWrapClass = "space-y-0.5 pt-1";
const couponCodeLabelClass = "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground";

/* ── Products ────────────────────────────────────────────────────────── */
const productGridClass = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";
const productCardClass =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-card p-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5";
const productContentClass = "flex flex-1 flex-col justify-between space-y-3 p-3";
const productImageWrapClass =
  "relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted/30";
const productImageClass =
  "h-full w-full object-cover transition-all duration-500 group-hover:scale-105";
const productBrandClass = "text-[10px] font-bold uppercase tracking-wider text-muted-foreground";
const productTitleClass =
  "line-clamp-2 text-sm font-medium leading-relaxed text-foreground transition-colors group-hover:text-primary";
const productPriceRowClass = "flex items-end justify-between gap-2 pt-1";
const productPriceClass = "text-base font-semibold tracking-tight text-foreground";
const productOriginalPriceClass = "text-xs font-medium text-muted-foreground line-through";
const productViewClass =
  "inline-flex h-7 items-center justify-center rounded-full bg-primary/5 px-3 text-[11px] font-semibold text-primary opacity-0 transition-all duration-300 group-hover:bg-primary/10 group-hover:opacity-100";

export function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state);

  useEffect(() => {
    void loadHome();
  }, [loadHome]);

  if (loading) return <Commonloader />;

  const mainBanner = data.banners[0] || null;
  const sideBanners = data.banners.slice(1, 3);
  const currentBannerGridClass = sideBanners.length > 0 ? bannerGridClass : "grid gap-4 grid-cols-1";

  return (
    <div className={pageWrapClass}>
      <div className={containerClass}>
        <div className={sectionStackClass}>

          {/* ── Hero Banners ──────────────────────────────────────────── */}
          <section className="animate-fade-in-up">
            <div className={currentBannerGridClass}>
              <Card className={bannerMainCardClass}>
                {mainBanner && (
                  <img src={mainBanner.imageUrl} alt="Feature Banner" className={bannerMainImageClass} />
                )}
              </Card>
              {sideBanners.length > 0 && (
                <div className={bannerSideGridClass}>
                  {sideBanners.map((item) => (
                    <Card key={item._id} className={bannerSideCardClass}>
                      <img src={item.imageUrl} alt="Side Banner" className={bannerSideImageClass} />
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ── Categories ───────────────────────────────────────────── */}
          {!!data.categories.length && (
            <section className="animate-fade-in-up stagger-2">
              <div className={sectionHeadClass}>
                <p className={sectionEyebrowClass}>Categories</p>
                <h2 className={sectionTitleClass}>
                  Browse by{" "}
                  <TypingText
                    words={["collection", "category", "trending style", "comfort"]}
                    className="text-primary font-semibold"
                  />
                </h2>
              </div>
              <div className={categoryGridClass}>
                {data.categories.slice(0, 8).map((categoryItem, i) => (
                  <Link key={categoryItem._id} to={`/collections?category=${categoryItem._id}`}
                    className={`animate-fade-in-up stagger-${i + 1}`}>
                    <Card className={categoryCardClass}>
                      <CardContent className={categoryContentClass}>
                        <div className={categoryIconWrapClass}>
                          <Grid2X2 className={categoryIconClass} />
                        </div>
                        <p className={categoryTitleClass}>{categoryItem.name}</p>
                        <span className={categoryLinkClass}>
                          View Collection
                          <ArrowRight className={categoryArrowIconClass} />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Coupons ──────────────────────────────────────────────── */}
          {!!data.coupons.length && (
            <section className="animate-fade-in-up stagger-3">
              <div className={sectionHeadClass}>
                <p className={sectionEyebrowClass}>Offers</p>
                <h2 className={sectionTitleClass}>Live Coupon Cards</h2>
              </div>
              <div className={couponGridClass}>
                {data.coupons.slice(0, 8).map((coupon, i) => (
                  <Card key={coupon._id} className={`${couponCardClass} animate-fade-in-up stagger-${i + 1}`}>
                    <CardContent className={couponContentClass}>
                      <div className={couponIconWrapClass}>
                        <TicketPercent className={couponIconClass} />
                      </div>
                      <Badge className={couponBadgeClass}>{coupon.percentage}% OFF</Badge>
                      <div className={couponCodeWrapClass}>
                        <p className={couponCodeLabelClass}>Coupon Code</p>
                        <p className={couponCodeClass}>{coupon.code}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* ── Recent Products ───────────────────────────────────────── */}
          {!!data.recentProducts.length && (
            <section className="pb-4 animate-fade-in-up stagger-4">
              <div className={sectionHeadClass}>
                <p className={sectionEyebrowClass}>Latest</p>
                <h2 className={sectionTitleClass}>Recent Products</h2>
              </div>
              <div className={productGridClass}>
                {data.recentProducts.slice(0, 12).map((product, i) => (
                  <Link to={`/collection/${product._id}`} key={product._id}
                    className={`animate-fade-in-up stagger-${i + 1}`}>
                    <Card className={productCardClass}>
                      <CardContent className={productContentClass}>
                        <div className={productImageWrapClass}>
                          <img src={product.image} alt={product.title} className={productImageClass} />
                        </div>
                        <div className="space-y-1">
                          <p className={productBrandClass}>{product.brand}</p>
                          <p className={productTitleClass}>{product.title}</p>
                        </div>
                        <div className={productPriceRowClass}>
                          <div>
                            <p className={productPriceClass}>{formatPrice(product.finalPrice)}</p>
                            {product.salePercentage > 0 && (
                              <p className={productOriginalPriceClass}>{formatPrice(product.price)}</p>
                            )}
                          </div>
                          <span className={productViewClass}>View</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
