import { useState, useEffect } from 'react';
import { CatalogService } from '@/services/catalog-service';
import { Product, PaginatedResponse, Category, TenantConfig } from '@/types/api';

/**
 * Scalable hook for infinite product lists with filtering and search support.
 * Unifies pagination logic and prevents infinite fetch loops.
 */
export function useInfiniteProducts(initialLimit = 8, category?: string, searchQuery?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<Product>['meta'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [offset, setOffset] = useState(0);

  // Reset state when category or search query changes
  useEffect(() => {
    setProducts([]);
    setOffset(0);
    setMeta(null);
    setError(null);
    // Intersection observer in the component should trigger the first fetch via offset=0 or we do it here
  }, [category, searchQuery]);

  useEffect(() => {
    let ignore = false;
    
    const fetchItems = async () => {
      try {
        setLoading(true);
        let result: PaginatedResponse<Product>;
        
        if (searchQuery) {
          result = await CatalogService.searchProducts(searchQuery, initialLimit, offset);
        } else {
          result = await CatalogService.getProducts(initialLimit, offset, category);
        }

        if (!ignore) {
          setProducts(prev => (offset === 0 ? result.data : [...prev, ...result.data]));
          setMeta(result.meta);
        }
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchItems();

    return () => {
      ignore = true;
    };
  }, [offset, category, searchQuery, initialLimit]);

  const loadMore = () => {
    if (!loading && meta && products.length < meta.total) {
      setOffset(prev => prev + initialLimit);
    }
  };

  const hasMore = meta ? products.length < meta.total : false;
  const total = meta?.total || 0;

  return { 
    products, 
    loading, 
    error, 
    hasMore, 
    loadMore, 
    total,
    reset: () => {
        setProducts([]);
        setOffset(0);
    }
  };
}

// Keep existing hooks for single product, categories and tenant config as they are stable
export function useProduct(slug: string) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const result = await CatalogService.getProductBySlug(slug);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  return { data, loading, error };
}

export function useCategories() {
  const [data, setData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await CatalogService.getActiveCategories();
        // Handle both direct array and { data: [...] } responses
        const categoriesData = Array.isArray(result) ? result : (result as any)?.data || [];
        setData(categoriesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { data, loading, error };
}

export function useProductsByCategory(categoryId: string) {
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) return;
      try {
        setLoading(true);
        const result = await CatalogService.getProductsByCategory(categoryId);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return { data, loading, error };
}

export function useTenantConfig() {
  const [data, setData] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const result = await CatalogService.getTenantConfig();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  return { data, loading, error };
}

// Deprecated hooks to be replaced by useInfiniteProducts
export function useProducts(limit = 10, offset = 0, category?: string) {
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [lastParams, setLastParams] = useState({ limit, offset, category });

  if (lastParams.category !== category) {
    setLastParams({ limit, offset, category });
    setData(null);
    setLoading(true);
  } else if (lastParams.limit !== limit || lastParams.offset !== offset) {
    setLastParams({ limit, offset, category });
    setLoading(true);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let result;
        if (category) {
          result = await CatalogService.getProductsByCategory(category, limit, offset);
        } else {
          result = await CatalogService.getProducts(limit, offset);
        }
        
        setData(prev => {
          if (offset === 0) return result;
          if (prev) {
            return {
              ...result,
              data: [...prev.data, ...result.data]
            };
          }
          return result;
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, offset, category]);

  return { data, loading, error };
}

export function useCatalogSearch(query: string, limit = 10, offset = 0) {
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [lastParams, setLastParams] = useState({ query, limit, offset });

  if (lastParams.query !== query || lastParams.limit !== limit || lastParams.offset !== offset) {
    setLastParams({ query, limit, offset });
    setLoading(true);
    if (lastParams.query !== query) setData(null);
  }

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) {
        setData(null);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const result = await CatalogService.searchProducts(query, limit, offset);
        
        setData(prev => {
          if (offset === 0 || !prev) return result;
          return {
            ...result,
            data: [...prev.data, ...result.data]
          };
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [query, limit, offset]);

  return { data, loading, error };
}
