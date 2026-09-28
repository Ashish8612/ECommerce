import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/features/admin/products/types";
import { getCoverImage } from "@/features/admin/products/use-products-form";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const wrapperClass = "overflow-x-auto rounded-xl border border-border";

const tableHeaderClass = "bg-muted/50";

const imageHeadClass = "w-[90px]";

const actionsHeadClass = "w-[100px] text-right";

const stateCellClass = "h-28 text-center text-muted-foreground";

const imageBoxClass =
  "h-14 w-14 overflow-hidden rounded-lg border border-border bg-muted";

const imageClass = "h-full w-full object-cover";

type ProductsTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => Promise<void> | void;
  deletingProductId?: string | null;
  loading: boolean;
};

export function ProductsTable({
  products,
  onEdit,
  onDelete,
  deletingProductId,
  loading,
}: ProductsTableProps) {
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  async function handleConfirmDelete() {
    if (!productToDelete) return;
    const id = productToDelete._id;
    setProductToDelete(null);
    await onDelete(id);
  }

  return (
    <>
      <div className={wrapperClass}>
        <Table>
          <TableHeader className={tableHeaderClass}>
            <TableRow>
              <TableHead className={imageHeadClass}>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className={actionsHeadClass}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className={stateCellClass}>
                  Loading Products...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className={stateCellClass}>
                  No products found!!!
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => {
                const cover = getCoverImage(product.images);
                const isDeleting = deletingProductId === product._id;

                return (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className={imageBoxClass}>
                        {cover ? (
                          <img
                            src={cover.url}
                            alt={product.title}
                            className={imageClass}
                          />
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-foreground">{product.title}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.category?.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => onEdit(product)}
                          title="Edit product"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                          disabled={isDeleting}
                          onClick={() => setProductToDelete(product)}
                          title="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => {
          if (!open) setProductToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{productToDelete?.title}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setProductToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => void handleConfirmDelete()}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
