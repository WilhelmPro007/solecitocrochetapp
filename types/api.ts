export interface Image {
  url: string;
  isPrimary: boolean;
  altText?: string;
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
  price: string;
  comparePrice?: string;
  sku?: string;
  quantity?: number;
  description?: string;
  images: Image[];
  categories?: Category[];
}

export interface Meta {
  total: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
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
