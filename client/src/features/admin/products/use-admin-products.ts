import { useCallback, useState } from "react";
import { deleteAdminProduct, getAdminCategories, getAdminProducts } from "./api";
import type { Category, Product } from "./types";
import { useEffect } from "react";
import { toast } from "sonner";

export function useAdminProducts() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryDialogOpen, setcategoryDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    const data = await getAdminCategories();
    setcategories(data ?? []);
  }, []);

  const loadProducts = useCallback(async (searchValue = "") => {
    setLoading(true);

    try {
      const data = await getAdminProducts(searchValue);
      setProducts(data ?? []);
    } catch {
      console.log("fetching failed");
    } finally {
      setLoading(false);
    }
  }, []);

  function openCreateDialog() {
    setEditingProduct(null);
    setProductDialogOpen(true);
  }

  function openEditDialog(product: Product) {
    setEditingProduct(product);
    setProductDialogOpen(true);
  }

  function closeProductDialog() {
    setProductDialogOpen(false);
    setEditingProduct(null);
  }

  const deleteProduct = useCallback(async (productId: string) => {
    try {
      setDeletingProductId(productId);
      await deleteAdminProduct(productId);
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeletingProductId(null);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([loadCategories(), loadProducts(search)]);
  }, [loadCategories, loadProducts, search]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadProducts(search);
    }, 250);

    return () => clearTimeout(timer);
  }, [search, loadProducts]);

  return {
    search,
    setSearch,
    products,
    categories,
    loading,
    refreshAll,
    categoryDialogOpen,
    setcategoryDialogOpen,
    productDialogOpen,
    setProductDialogOpen,
    editingProduct,
    openCreateDialog,
    closeProductDialog,
    openEditDialog,
    deleteProduct,
    deletingProductId,
  };
}
