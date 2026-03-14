import axios from 'axios';
import { API_ENDPOINTS, TENANT_HEADER } from '@/constants/api-constants';
import { PaginatedResponse, Product, Category, TenantConfig, ApiResponse } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  if (tenantId) {
    config.headers[TENANT_HEADER] = tenantId;
  }
  return config;
});

export const CatalogService = {
  getProducts: async (limit = 10, offset = 0, categoryId?: string) => {
    let url: string = API_ENDPOINTS.PRODUCTS;
    
    if (categoryId) {
      // If it looks like a UUID, use ID endpoint, otherwise assume it's a slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoryId);
      url = isUuid 
        ? API_ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryId) 
        : API_ENDPOINTS.PRODUCTS_BY_CATEGORY_SLUG(categoryId);
    }

    const response = await apiClient.get<PaginatedResponse<Product>>(url, {
      params: { limit, offset },
    });
    return response.data;
  },
  
  getProductsByCategory: async (categoryId: string, limit = 10, offset = 0) => {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoryId);
    const url = isUuid 
      ? API_ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryId) 
      : API_ENDPOINTS.PRODUCTS_BY_CATEGORY_SLUG(categoryId);

    const response = await apiClient.get<PaginatedResponse<Product>>(url, {
      params: { limit, offset },
    });
    return response.data;
  },
  
  getProductBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCT_BY_SLUG(slug));
    return response.data.data;
  },
  
  searchProducts: async (query: string, limit = 10, offset = 0) => {
    const response = await apiClient.get<PaginatedResponse<Product>>(API_ENDPOINTS.SEARCH_PRODUCTS, {
      params: { q: query, limit, offset },
    });
    return response.data;
  },
  
  getActiveCategories: async () => {
    const response = await apiClient.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES_ACTIVE);
    return response.data.data;
  },
  
  getTenantConfig: async () => {
    const response = await apiClient.get<ApiResponse<TenantConfig>>(API_ENDPOINTS.TENANT_CONFIG);
    return response.data.data;
  },
};
