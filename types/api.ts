export interface Image {
  id?: string;
  url?: string;
  imageData?: string;
  altText?: string;
  isPrimary?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  sku?: string;
  quantity?: number;
  description?: string;
  isActive?: boolean;
  primaryImage: Image;
  images?: (Image | string)[]; // Allowing both structured images and raw base64 strings
  categoryName?: string;
  categories?: Category[];
}

export interface Meta {
  total: number;
  count?: number;
  limit: number;
  offset: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: Meta;
}

export interface TenantConfig {
  logo?: string;
  name: string;
  colors?: {
    primary: string;
    secondary: string;
  };
  features: string[];
}
