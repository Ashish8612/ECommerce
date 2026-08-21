import { useEffect, useMemo, useState } from "react";
import type { AdminBanner } from "./types";
import { getAdminBanners, uploadAdminBanners } from "./api";
import { toast } from "sonner";

export function useAdminSettings() {
  const [items, setItems] = useState<AdminBanner[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function refreshBanners() {
    try {
      setLoading(true);
      const response = await getAdminBanners();
      setItems(response?.items ?? []);
    } catch (e) {
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshBanners();
  }, []);

  async function handleUpload() {
    try {
      if (!files.length) {
        toast.error("Please select at least one image first!");
        return;
      }
      setUploading(true);

      const formData = new FormData();

      files.forEach((file) => formData.append("images", file));

      const response = await uploadAdminBanners(formData);
      
      setItems(response?.items ?? []);
      setFiles([]);
      toast.success("Banners uploaded successfully!");
    } catch (e) {
      console.log(e);
      toast.error(e instanceof Error ? e.message : "Failed to upload banners");
    } finally {
      setUploading(false);
    }
  }

  const fileCountLabel = useMemo(() => {
    if (!files.length) return "No files selected";
    if (files.length === 1) return files[0].name;

    return `${files.length} files selected`;
  }, [files]);

  return {
    items,
    files,
    setFiles,
    fileCountLabel,
    loading,
    setLoading,
    refreshBanners,
    handleUpload,
    uploading,
  };
}
