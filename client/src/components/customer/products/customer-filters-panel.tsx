
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SIZE_OPTIONS } from "@/features/admin/products/constants";
import type { ProductCategory } from "@/features/admin/products/types";
import { BRAND_OPTIONS, getSwatchColor, type CustomerProductFilters, type FacetKey } from "@/features/customer/products/product-list-shared";
import { Check } from "lucide-react";

const panelWrapClass = "space-y-6 overflow-y-auto px-4 py-2 lg:px-0 lg:py-0";

const panelHeaderClass = "flex items-center justify-between gap-3";

const titleClass = "text-base font-bold text-foreground";

const clearButtonClass = "rounded-full px-4 text-sm h-8 bg-primary/10 text-primary hover:bg-primary/20 border-0";

const sectionClass = "space-y-3";

const sectionTitleClass = "text-xs font-semibold uppercase tracking-widest text-muted-foreground";

const stackedOptionsClass = "space-y-1";

const colorsWrapClass = "flex flex-wrap gap-3";

const sizesWrapClass = "flex flex-wrap gap-2";

type CustomerFiltersPanelProps = {
  categories: ProductCategory[];
  filters: CustomerProductFilters;
  availableColors: string[];
  hasActiveFilters: boolean;
  onToggleFacet: (key: FacetKey, value: string) => void;
  onClearFilters: () => void;
};

function CustomerFiltersPanel({
  categories,
  filters,
  availableColors,
  hasActiveFilters,
  onClearFilters,
  onToggleFacet,
}: CustomerFiltersPanelProps) {
  return (
    <div className={panelWrapClass}>
      <div className={panelHeaderClass}>
        <h2 className={titleClass}>Filters</h2>
        {hasActiveFilters ? (
          <Button
            variant={"ghost"}
            className={clearButtonClass}
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        ) : null}
      </div>

      <Separator className="opacity-50" />

      {/* Categories */}
      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>Categories</h3>
        <div className={stackedOptionsClass}>
          {categories.map((item) => {
            const isActive = filters.category === item._id;
            return (
              <button
                key={item._id}
                type="button"
                onClick={() => onToggleFacet("category", item._id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                    isActive ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {isActive && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                {item.name}
              </button>
            );
          })}
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* Brands */}
      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>Brands</h3>
        <div className={stackedOptionsClass}>
          {BRAND_OPTIONS.map((brand) => {
            const isActive = filters.brand === brand;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => onToggleFacet("brand", brand)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                    isActive ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {isActive && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                {brand}
              </button>
            );
          })}
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* Colors */}
      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>Colors</h3>
        <div className={colorsWrapClass}>
          {availableColors.map((color) => {
            const isActive = filters.color === color;
            return (
              <button
                key={color}
                type="button"
                title={color}
                onClick={() => onToggleFacet("color", color)}
                className={`group relative flex flex-col items-center gap-1.5`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                    isActive
                      ? "border-primary ring-2 ring-primary/30 scale-110"
                      : "border-transparent hover:border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: getSwatchColor(color) }}
                >
                  {isActive && (
                    <Check className="h-4 w-4 text-white drop-shadow" strokeWidth={3} />
                  )}
                </span>
                <span className={`text-[10px] capitalize ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                  {color}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* Sizes */}
      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>Sizes</h3>
        <div className={sizesWrapClass}>
          {SIZE_OPTIONS.map((size) => {
            const isActive = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onToggleFacet("size", size)}
                className={`min-w-12 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default CustomerFiltersPanel;
