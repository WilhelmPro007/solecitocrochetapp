export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_SLUG: (slug: string) => `/products/slug/${slug}`,
  SEARCH_PRODUCTS: '/products/search',
  CATEGORIES_ACTIVE: '/categories',
  PRODUCTS_BY_CATEGORY: (categoryId: string) => `/products/category/${categoryId}`,
  TENANT_CONFIG: '/tenants/config',
} as const;

export const TENANT_HEADER = 'x-tenant-id';
