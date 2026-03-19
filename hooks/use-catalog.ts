import { useState, useEffect, useRef } from 'react';
import { CatalogService } from '@/services/catalog-service';
import { Product, PaginatedResponse, Category, TenantConfig } from '@/types/api';

/**
 * Scalable hook for infinite product lists with filtering and search support.
 * Unifies pagination logic and prevents infinite fetch loops.
 */
export function useInfiniteProducts(initialLimit = 8, category?: string, searchQuery?: string, sort?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<Product>['meta'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [offset, setOffset] = useState(0);
  const lastFilters = useRef({ category, searchQuery, sort });

  // Single effect to handle fetches and resets
  useEffect(() => {
    let ignore = false;
    
    // Detect if filters changed to force a reset
    const filtersChanged = 
      lastFilters.current.category !== category ||
      lastFilters.current.searchQuery !== searchQuery ||
      lastFilters.current.sort !== sort;

    if (filtersChanged) {
      lastFilters.current = { category, searchQuery, sort };
    }

    const fetchItems = async (isReset: boolean) => {
      try {
        setLoading(true);
        const fetchOffset = isReset ? 0 : offset;
        
        const result = await CatalogService.getProducts({
          limit: initialLimit,
          offset: fetchOffset,
          category,
          q: searchQuery,
          sort
        });

        if (!ignore) {
          if (isReset) {
            setProducts(result.data);
            setOffset(0);
          } else {
            setProducts(prev => [...prev, ...result.data]);
          }
          setMeta(result.meta);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchItems(filtersChanged || offset === 0);

    return () => {
      ignore = true;
    };
  }, [offset, category, searchQuery, sort, initialLimit]);


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
        const result = await CatalogService.getProducts({ categoryId });
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
        const result = await CatalogService.getProducts({ limit, offset, category });
        
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
        const result = await CatalogService.getProducts({ q: query, limit, offset });
        
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
