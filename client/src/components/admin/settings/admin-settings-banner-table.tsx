import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminBanner } from "@/features/admin/settings/types";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";

const tableWrapClass = "overflow-x-auto";
const previewWrapClass =
  "h-16 w-28 overflow-hidden border border-border bg-muted";
const imageClass = "h-full w-full object-cover";
const publicIdTextClass =
  "max-w-[360px] truncate text-sm text-muted-foreground";
const actionsHeadClass = "w-[80px] text-right";

function formatDateTime(value: string) {
  return new Date(value).toLocaleDateString();
}

type AdminSettingsBannersTableProps = {
  items: AdminBanner[];
  onDelete: (bannerId: string) => Promise<boolean>;
  deletingBannerId: string | null;
};

function AdminSettingsBannersTable({
  items,
  onDelete,
  deletingBannerId,
}: AdminSettingsBannersTableProps) {
  const [bannerToDelete, setBannerToDelete] = useState<AdminBanner | null>(
    null,
  );

  async function handleConfirmDelete() {
    if (!bannerToDelete) return;
    const deleted = await onDelete(bannerToDelete._id);
    if (deleted) setBannerToDelete(null);
  }

  return (
    <>
      <div className={tableWrapClass}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Public ID</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className={actionsHeadClass}>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className={previewWrapClass}>
                    <img
                      src={item.imageUrl}
                      alt="Homepage banner"
                      className={imageClass}
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <p className={publicIdTextClass}>{item.imagePublicId}</p>
                </TableCell>
                <TableCell>
                  <p>{formatDateTime(item.createdAt)}</p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                      disabled={Boolean(deletingBannerId)}
                      onClick={() => setBannerToDelete(item)}
                      title="Delete banner"
                      aria-label="Delete banner"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={Boolean(bannerToDelete)}
        onOpenChange={(open) => {
          if (!open && !deletingBannerId) setBannerToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Homepage Banner</DialogTitle>
            <DialogDescription className="pt-2">
              This banner will be removed from the homepage and deleted
              permanently. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              disabled={Boolean(deletingBannerId)}
              onClick={() => setBannerToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={Boolean(deletingBannerId)}
              onClick={() => void handleConfirmDelete()}
            >
              {deletingBannerId ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete banner"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminSettingsBannersTable;
