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
  /**
   * Universal product fetcher supporting search, categories, and all filters.
   */
  getProducts: async (params: {
    limit?: number;
    offset?: number;
    sort?: string;
    q?: string;
    category?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
  } = {}) => {
    // Determine which endpoint to use. q implies search.
    const url = params.q ? API_ENDPOINTS.SEARCH_PRODUCTS : API_ENDPOINTS.PRODUCTS;
    
    const response = await apiClient.get<PaginatedResponse<Product>>(url, {
      params,
    });
    return response.data;
  },
  
  getProductBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCT_BY_SLUG(slug));
    return response.data.data;
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
