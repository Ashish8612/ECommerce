import { getSwatchColor } from "@/features/customer/products/product-list-shared";
import type { ProductSize } from "@/features/customer/products/types";
import { Check } from "lucide-react";

type CustomerProductOptionsGroupProps = {
  values: string[];
  selectedValue: string;
  onSelect: (value: ProductSize) => void;
  variant: "color" | "size";
};

function CustomerProductOptionsGroup({
  values,
  variant,
  selectedValue,
  onSelect,
}: CustomerProductOptionsGroupProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold uppercase tracking-wider text-muted-foreground">
          {variant === "color" ? "Select Color" : "Select Size"}
        </span>
        {selectedValue && (
          <span className="font-medium text-primary capitalize">
            {selectedValue}
          </span>
        )}
      </div>

      <div role="group" className="flex flex-wrap gap-2.5">
        {values.map((value) => {
          const isActive = selectedValue === value;

          if (variant === "color") {
            const swatchBg = getSwatchColor(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => onSelect(value as ProductSize)}
                className={`group flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary shadow-sm ring-2 ring-primary/30 scale-105 font-semibold"
                    : "border-border/70 bg-card text-foreground/80 hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border shadow-inner ${
                    isActive ? "border-primary" : "border-black/15"
                  }`}
                  style={{ backgroundColor: swatchBg }}
                >
                  {isActive && (
                    <Check className="h-2.5 w-2.5 text-white drop-shadow" strokeWidth={3} />
                  )}
                </span>
                <span className="capitalize">{value}</span>
              </button>
            );
          }

          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value as ProductSize)}
              className={`min-w-12 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                  : "border-border/70 bg-card text-foreground/80 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CustomerProductOptionsGroup;
