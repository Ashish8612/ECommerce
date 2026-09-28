

export type ProductSort = "recent" | "price-low" | "price-high";

export type ProductSize = "XS" |"S" | "M" | "L" | "XL"| "XXL";

export type ProductCategory = {
  _id: string;
  name: string;
};

export type ProductImage = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export type CustomerProduct = {
  _id: string;
  title: string;
  description: string;
  category: ProductCategory;
  brand: string;
  stock: number;
  images: ProductImage[];
  colors: string[];
  sizes: ProductSize[];
  price: number;
  salePercentage: number;
  isFeatured?: boolean;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

export type GetCustomerProductsParams = {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  sort?: ProductSort;
  search?: string;
};

export type CustomerProductDetailsResponse = {
  product: CustomerProduct;
  relatedProducts: CustomerProduct[];
};
