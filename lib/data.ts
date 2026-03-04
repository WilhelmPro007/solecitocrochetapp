export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  character?: string;
  badge?: string;
  isFavorite?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "prod_1",
    title: "Strawberry Bunny Amigurumi",
    price: 25.0,
    imageUrl: "https://placehold.co/400x500/ffcbf2/5c4d5c?text=Strawberry+Bunny",
    category: "Amigurumi",
    character: "Bunny",
    badge: "Bestseller",
  },
  {
    id: "prod_2",
    title: "Minty Frog Bucket Hat",
    price: 35.0,
    imageUrl: "https://placehold.co/400x500/c0fdfb/5c4d5c?text=Frog+Hat",
    category: "Wearables",
    character: "Frog",
    badge: "New",
  },
  {
    id: "prod_3",
    title: "Chunky Daisy Blanket",
    price: 85.0,
    imageUrl: "https://placehold.co/400x500/fff3b0/5c4d5c?text=Daisy+Blanket",
    category: "Home",
  },
  {
    id: "prod_4",
    title: "Sleeping Kitty Keychain",
    price: 15.0,
    imageUrl: "https://placehold.co/400x500/ffcbf2/5c4d5c?text=Kitty+Keychain",
    category: "Accessories",
    character: "Kitty",
  },
  {
    id: "prod_5",
    title: "Pastel Bear Cardigan",
    price: 120.0,
    imageUrl: "https://placehold.co/400x500/c0fdfb/5c4d5c?text=Bear+Cardigan",
    category: "Wearables",
    character: "Bear",
    badge: "Low Stock",
  },
  {
    id: "prod_6",
    title: "Lemon Slice Coaster Set",
    price: 18.0,
    imageUrl: "https://placehold.co/400x500/fff3b0/5c4d5c?text=Lemon+Coasters",
    category: "Home",
  },
  {
    id: "prod_7",
    title: "Cinnamon Roll Amigurumi",
    price: 28.0,
    imageUrl: "https://placehold.co/400x500/fffdf7/5c4d5c?text=Cinnamon+Roll",
    category: "Amigurumi",
    character: "Food",
  },
  {
    id: "prod_8",
    title: "Tulip Bouquet Crochet",
    price: 45.0,
    imageUrl: "https://placehold.co/400x500/ffcbf2/5c4d5c?text=Tulip+Bouquet",
    category: "Home",
    badge: "Gift Idea",
  },
  {
    id: "prod_9",
    title: "Mushroom Crossbody Bag",
    price: 55.0,
    imageUrl: "https://placehold.co/400x500/c0fdfb/5c4d5c?text=Mushroom+Bag",
    category: "Accessories",
  },
  {
    id: "prod_10",
    title: "Cloud Pillow Crochet",
    price: 40.0,
    imageUrl: "https://placehold.co/400x500/fffdf7/5c4d5c?text=Cloud+Pillow",
    category: "Home",
    badge: "Bestseller",
  },
  {
    id: "prod_11",
    title: "Boba Tea Plushie",
    price: 30.0,
    imageUrl: "https://placehold.co/400x500/ffcbf2/5c4d5c?text=Boba+Plushie",
    category: "Amigurumi",
    character: "Food",
  },
  {
    id: "prod_12",
    title: "Sunflower Hair Clips",
    price: 12.0,
    imageUrl: "https://placehold.co/400x500/fff3b0/5c4d5c?text=Sunflower+Clips",
    category: "Accessories",
  },
];
