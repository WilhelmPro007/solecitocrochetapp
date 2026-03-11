import axios from 'axios';
import { API_ENDPOINTS, TENANT_HEADER } from '@/constants/api-constants';
import { PaginatedResponse, Product, Category, TenantConfig } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    [TENANT_HEADER]: TENANT_ID || '',
  },
});

export const CatalogService = {
  getProducts: async (limit = 10, offset = 0, categoryId?: string) => {
    const url = categoryId 
      ? API_ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryId) 
      : API_ENDPOINTS.PRODUCTS;
    const response = await apiClient.get<PaginatedResponse<Product>>(url, {
      params: { limit, offset },
    });
    return response.data;
  },
  
  getProductsByCategory: async (categoryId: string, limit = 10, offset = 0) => {
    const response = await apiClient.get<PaginatedResponse<Product>>(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryId), {
      params: { limit, offset },
    });
    return response.data;
  },
  
  getProductBySlug: async (slug: string) => {
    const response = await apiClient.get<Product>(API_ENDPOINTS.PRODUCT_BY_SLUG(slug));
    return response.data;
  },
  
  searchProducts: async (query: string, limit = 10, offset = 0) => {
    const response = await apiClient.get<PaginatedResponse<Product>>(API_ENDPOINTS.SEARCH_PRODUCTS, {
      params: { q: query, limit, offset },
    });
    return response.data;
  },
  
  getActiveCategories: async () => {
    const response = await apiClient.get<Category[]>(API_ENDPOINTS.CATEGORIES_ACTIVE);
    return response.data;
  },
  
  getTenantConfig: async () => {
    const response = await apiClient.get<TenantConfig>(API_ENDPOINTS.TENANT_CONFIG);
    return response.data;
  },
};
