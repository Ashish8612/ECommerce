import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Promo } from "@/features/admin/promo/types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type PromoTableProps = {
  promos: Promo[];
  loading: boolean;
  deletingPromoId: string;
  onEdit: (promo: Promo) => void;
  onDelete: (promoId: string) => Promise<void>;
};

const wrapClass = "overflow-x-auto rounded-xl border border-border";

const tableHeaderClass = "bg-muted/50";

const loadingCellClass = "h-28 text-center text-muted-foreground";

const codeCellClass = "font-medium text-foreground";

function formatDateTime(value: string) {
  return new Date(value).toLocaleDateString();
}

function PromoTable({
  promos,
  loading,
  onDelete,
  onEdit,
  deletingPromoId,
}: PromoTableProps) {
  const [promoToDelete, setPromoToDelete] = useState<Promo | null>(null);

  async function handleConfirmDelete() {
    if (!promoToDelete) return;
    const id = promoToDelete._id;
    setPromoToDelete(null);
    await onDelete(id);
  }

  return (
    <>
      <div className={wrapClass}>
        <Table>
          <TableHeader className={tableHeaderClass}>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Min Order</TableHead>
              <TableHead>Valid From</TableHead>
              <TableHead>Valid Till</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className={loadingCellClass}>
                  Loading Promos...
                </TableCell>
              </TableRow>
            ) : promos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className={loadingCellClass}>
                  No Promos found
                </TableCell>
              </TableRow>
            ) : (
              promos.map((promo) => {
                const isDeleting = deletingPromoId === promo._id;

                return (
                  <TableRow key={promo._id}>
                    <TableCell className={codeCellClass}>{promo.code}</TableCell>
                    <TableCell>{promo.percentage}%</TableCell>
                    <TableCell>{promo.count}</TableCell>
                    <TableCell>{promo.minimumOrderValue}</TableCell>
                    <TableCell>{formatDateTime(promo.startsAt)}</TableCell>
                    <TableCell>{formatDateTime(promo.endsAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => onEdit(promo)}
                          title="Edit promo"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                          disabled={isDeleting}
                          onClick={() => setPromoToDelete(promo)}
                          title="Delete promo"
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

      {/* Delete Confirmation Modal */}
      <Dialog
        open={Boolean(promoToDelete)}
        onOpenChange={(open) => {
          if (!open) setPromoToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Promo Code</DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to delete promo code{" "}
              <span className="font-semibold text-foreground">
                "{promoToDelete?.code}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setPromoToDelete(null)}
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

export default PromoTable;
