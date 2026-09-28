
import { Commonloader } from "@/components/common/loader";
import CustomerFiltersPanel from "@/components/customer/products/customer-filters-panel";
import CustomerProductCard from "@/components/customer/products/customer-product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { ProductSort } from "@/features/customer/products/types";
import { useCustomerProductList } from "@/features/customer/products/use-coustomer-collections";
import { SlidersHorizontal } from "lucide-react";

const containerClass = "w-full px-4 sm:px-6 lg:px-10 xl:px-14";

function Collections() {
  const {
    sort,
    changeSort,
    loading,
    products,
    hasActiveFilters,
    categories,
    availableColors,
    filters,
    toggleFacet,
    clearFilters,
    activeFilterBadges,
  } = useCustomerProductList();

  if (loading) return <Commonloader />;

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero / Header bar ─────────────────────────────────────────── */}
      <section className="border-b border-border/40 bg-gradient-to-br from-primary/5 via-background to-background animate-fade-in">
        <div className={`${containerClass} py-6`}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/80 animate-fade-in-up">New Collections</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between animate-fade-in-up stagger-1">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Premium everyday essentials
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {products.length === 0 ? "No products found" : `${products.length} item${products.length !== 1 ? "s" : ""} found`}
              </p>
            </div>
            <Select value={sort} onValueChange={(value) => changeSort(value as ProductSort)}>
              <SelectTrigger className="w-[175px] rounded-xl bg-card border-border/60 shadow-sm text-sm">
                <SelectValue placeholder="Sort By">
                  {(val) =>
                    val === "recent"
                      ? "Newest First"
                      : val === "price-low"
                      ? "Price: Low to High"
                      : val === "price-high"
                      ? "Price: High to Low"
                      : val
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className={`${containerClass} py-4`}>

        {/* Top bar: active filter badges + mobile filter */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 animate-fade-in-up stagger-2">
          <div className="flex flex-wrap items-center gap-2">
            {activeFilterBadges.map((item) => (
              <Badge
                key={item.key}
                className="rounded-full border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 px-3 text-xs animate-scale-in"
              >
                {item.label}: {item.value}
              </Badge>
            ))}
          </div>

          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger render={
              <Button size="sm" className="rounded-full lg:hidden gap-1.5 text-xs px-4 h-8 btn-gradient text-white">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </Button>
            } />
            <SheetContent side="left" className="w-full max-w-sm border-border bg-background">
              <SheetHeader className="sr-only">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <CustomerFiltersPanel
                categories={categories}
                filters={filters}
                availableColors={availableColors}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
                onToggleFacet={toggleFacet}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* ── Layout: sidebar + grid ─────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">

          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block animate-slide-in-left">
            <Card className="sticky top-20 rounded-2xl border-border/40 bg-card p-4 shadow-sm">
              <CustomerFiltersPanel
                categories={categories}
                filters={filters}
                availableColors={availableColors}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
                onToggleFacet={toggleFacet}
              />
            </Card>
          </aside>

          {/* Product grid */}
          <section>
            {!loading && !products.length ? (
              <Card className="rounded-2xl border-border/40 bg-card/80 animate-scale-in">
                <CardContent className="flex min-h-52 flex-col items-center justify-center gap-4 p-6 text-center">
                  <p className="text-lg font-semibold text-foreground">No Products Found</p>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters} className="rounded-full btn-gradient text-white" size="sm">
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : null}

            {!loading && products.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((item, i) => (
                  <div
                    key={item._id}
                    className={`animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
                  >
                    <CustomerProductCard product={item} />
                  </div>
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Collections;
