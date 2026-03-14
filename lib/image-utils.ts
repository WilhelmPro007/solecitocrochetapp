import { Image } from '@/types/api';

/**
 * Resolves the image source from an Image object or a base64 string.
 * Handles:
 * 1. image.imageData (with or without data: prefix)
 * 2. image.url
 * 3. raw string (base64)
 */
export const getProductImageSrc = (image?: Image | string): string => {
  const fallback = 'https://placehold.co/800x800/f7f7f7/cccccc?text=Sin+Imagen';
  
  if (!image) return fallback;
  
  if (typeof image === 'string') {
    if (image.startsWith('data:')) return image;
    // Assume it's a raw base64 string if no prefix
    if (image.length > 100) return `data:image/webp;base64,${image}`;
    return image; // Might be a regular URL string
  }
  
  if (image.imageData) {
    if (image.imageData.startsWith('data:')) return image.imageData;
    return `data:image/webp;base64,${image.imageData}`;
  }
  
  return image.url || fallback;
};
