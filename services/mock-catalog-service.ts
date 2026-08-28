import { Category, PaginatedResponse, Product, TenantConfig } from '@/types/api';

const categories: Category[] = [
  { id: 'amigurumis', name: 'Amigurumis', slug: 'amigurumis' },
  { id: 'ramos', name: 'Ramos', slug: 'ramos' },
  { id: 'hogar', name: 'Hogar', slug: 'hogar' },
  { id: 'personalizados', name: 'Personalizados', slug: 'personalizados' },
];

const category = (slug: string) => categories.find((item) => item.slug === slug)!;
const image = (file: string, altText: string) => ({ url: `/images/products/${file}`, altText });

const products: Product[] = [
  {
    id: 'prod-1', name: 'Arreglo de peluche tejido', slug: 'arreglo-peluche-tejido', price: 28,
    sku: 'SOL-001', quantity: 1,
    description: 'Un tierno peluche tejido presentado como ramo, listo para regalar.',
    primaryImage: image('arreglo-peluche.jpeg', 'Arreglo de peluche tejido a crochet'),
    categories: [category('ramos')],
  },
  {
    id: 'prod-2', name: 'Candy amigurumi', slug: 'candy-amigurumi', price: 35,
    sku: 'SOL-002', quantity: 1,
    description: 'Muñeca Candy tejida a mano con vestido y detalles personalizados.',
    primaryImage: image('candy-amigurumi.jpeg', 'Muñeca Candy amigurumi'),
    images: [
      image('candy-amigurumi-2.jpeg', 'Candy amigurumi en caja de regalo'),
      image('candy-amigurumi-3.jpeg', 'Candy amigurumi con traje azul'),
      image('candy-amigurumi-4.jpeg', 'Candy amigurumi con vestido rojo'),
    ],
    categories: [category('amigurumis')],
  },
  {
    id: 'prod-3', name: 'Ramo de tulipanes', slug: 'ramo-tulipanes', price: 24,
    sku: 'SOL-003', quantity: 2, description: 'Ramo de tulipanes tejidos en tonos rosados y pastel.',
    primaryImage: image('ramo-tulipanes.jpeg', 'Ramo de tulipanes tejidos'), categories: [category('ramos')],
  },
  {
    id: 'prod-4', name: 'Ramo de girasoles', slug: 'ramo-girasoles', price: 26,
    sku: 'SOL-004', quantity: 2, description: 'Girasoles y flores pequeñas tejidas a mano en un ramo duradero.',
    primaryImage: image('ramo-girasoles.jpeg', 'Ramo de girasoles tejidos'), categories: [category('ramos')],
  },
  {
    id: 'prod-5', name: 'Ramo de lirios', slug: 'ramo-lirios', price: 25,
    sku: 'SOL-005', quantity: 1, description: 'Delicado ramo tejido en tonos morados, blancos y verdes.',
    primaryImage: image('ramo-lirios.jpeg', 'Ramo de lirios tejidos'), categories: [category('ramos')],
  },
  {
    id: 'prod-6', name: 'Colección mágica de amigurumis', slug: 'coleccion-magica-amigurumis', price: 48,
    sku: 'SOL-006', quantity: 1, description: 'Set de personajes inspirados en un mundo de magia, tejidos a mano.',
    primaryImage: image('harry-potter-amigurumis.jpeg', 'Colección de amigurumis mágicos'), categories: [category('amigurumis')],
  },
  {
    id: 'prod-7', name: 'Kirby amigurumi', slug: 'kirby-amigurumi', price: 18,
    sku: 'SOL-007', quantity: 2, description: 'Pequeño personaje rosado tejido a mano con suaves detalles.',
    primaryImage: image('kirby-amigurumi.jpeg', 'Kirby tejido a crochet'), categories: [category('amigurumis')],
  },
  {
    id: 'prod-8', name: 'Manta ramo floral', slug: 'manta-ramo-floral', price: 65,
    sku: 'SOL-008', quantity: 1, description: 'Manta circular que se transforma en un hermoso ramo de flores.',
    primaryImage: image('manta-ramo.jpeg', 'Manta ramo con flores rosadas'),
    images: [image('manta-ramo-2.jpeg', 'Manta ramo extendida'), image('manta-ramo-3.jpeg', 'Manta ramo cerrada')],
    categories: [category('hogar')],
  },
  {
    id: 'prod-9', name: 'Coraje amigurumi', slug: 'coraje-amigurumi', price: 22,
    sku: 'SOL-009', quantity: 1, description: 'Coraje tejido a mano, con sus expresivos ojos y orejas largas.',
    primaryImage: image('coraje-amigurumi.jpeg', 'Coraje amigurumi'), categories: [category('amigurumis')],
  },
  {
    id: 'prod-10', name: 'Arreglo de Snoopy', slug: 'arreglo-snoopy', price: 30,
    sku: 'SOL-010', quantity: 1, description: 'Snoopy tejido y presentado en un ramo de rosas rojas.',
    primaryImage: image('snoopy-arreglo.jpeg', 'Arreglo tejido de Snoopy con rosas'), categories: [category('ramos')],
  },
  {
    id: 'prod-11', name: 'Muñeco personalizado', slug: 'muneco-personalizado', price: 32,
    sku: 'SOL-011', quantity: 1, description: 'Retrato tejido personalizado, creado a partir de tu idea o fotografía.',
    primaryImage: image('muneco-personalizado.jpeg', 'Muñeco personalizado tejido'), categories: [category('personalizados')],
  },
  {
    id: 'prod-12', name: 'Yoshi amigurumi', slug: 'yoshi-amigurumi', price: 25,
    sku: 'SOL-012', quantity: 1, description: 'Yoshi tejido a mano con su clásico diseño verde y blanco.',
    primaryImage: image('yoshi-amigurumi.jpeg', 'Yoshi amigurumi'), categories: [category('amigurumis')],
  },
];

type ProductParams = {
  limit?: number;
  offset?: number;
  sort?: string;
  q?: string;
  category?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const MockCatalogService = {
  getProducts: async (params: ProductParams = {}): Promise<PaginatedResponse<Product>> => {
    const { limit = 10, offset = 0, q, sort, minPrice, maxPrice } = params;
    const selectedCategory = params.category ?? params.categoryId;
    const query = q?.trim().toLocaleLowerCase();
    let result = products.filter((product) => {
      const matchesCategory = !selectedCategory || product.categories?.some(
        (item) => item.id === selectedCategory || item.slug === selectedCategory,
      );
      const matchesQuery = !query || [product.name, product.description, ...product.categories!.map((item) => item.name)]
        .some((value) => value?.toLocaleLowerCase().includes(query));
      return matchesCategory && matchesQuery
        && (minPrice === undefined || product.price >= minPrice)
        && (maxPrice === undefined || product.price <= maxPrice);
    });

    if (sort === 'price:asc') result = result.toSorted((a, b) => a.price - b.price);
    if (sort === 'price:desc') result = result.toSorted((a, b) => b.price - a.price);
    if (sort === 'createdAt:asc') result = result.toReversed();

    return {
      success: true,
      message: 'Mock catalog loaded',
      data: result.slice(offset, offset + limit),
      meta: {
        total: result.length,
        count: Math.min(limit, Math.max(0, result.length - offset)),
        limit,
        offset,
        hasNext: offset + limit < result.length,
        hasPrevious: offset > 0,
      },
    };
  },

  getProductBySlug: async (slug: string) => products.find((product) => product.slug === slug)!,
  getActiveCategories: async () => categories,
  getTenantConfig: async (): Promise<TenantConfig> => ({
    name: 'Solecito Crochet',
    colors: { primary: '#ff5ebc', secondary: '#fdf2f8' },
    features: ['catalog', 'search', 'categories', 'whatsapp'],
  }),
};
