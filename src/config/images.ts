// ImageKit CDN Configuration
// Replace with your ImageKit URL endpoint
export const IMAGEKIT_URL = import.meta.env.VITE_IMAGEKIT_URL || '';

// Check if ImageKit is configured
export const isImageKitConfigured = (): boolean => {
  return IMAGEKIT_URL.length > 0 && !IMAGEKIT_URL.includes('your_imagekit_id');
};

// Image optimization parameters
interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  blur?: number;
  focus?: 'face' | 'auto' | 'center';
}

/**
 * Get optimized image URL from ImageKit CDN
 * @param imagePath - Path to the image (e.g., '/images/members/john.jpg')
 * @param options - Optimization options
 */
export function getOptimizedImageUrl(
  imagePath: string,
  options: ImageOptimizationOptions = {}
): string {
  // If ImageKit is not configured, return the original path
  if (!isImageKitConfigured()) {
    return imagePath;
  }

  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    blur,
    focus,
  } = options;

  // Build transformation string
  const transforms: string[] = [];

  if (width) transforms.push(`w-${width}`);
  if (height) transforms.push(`h-${height}`);
  if (quality && quality !== 100) transforms.push(`q-${quality}`);
  if (format !== 'auto') transforms.push(`f-${format}`);
  if (blur) transforms.push(`bl-${blur}`);
  if (focus === 'face') transforms.push('fo-face');
  else if (focus === 'auto') transforms.push('fo-auto');

  // Construct the ImageKit URL
  const transformString = transforms.length > 0 ? `tr:${transforms.join(',')}/` : '';

  // Remove leading slash from imagePath if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  return `${IMAGEKIT_URL}/${transformString}${cleanPath}`;
}

/**
 * Get responsive image srcset for different screen sizes
 */
export function getResponsiveSrcSet(
  imagePath: string,
  widths: number[] = [320, 640, 960, 1280],
  options: Omit<ImageOptimizationOptions, 'width'> = {}
): string {
  if (!isImageKitConfigured()) {
    return '';
  }

  return widths
    .map(width => `${getOptimizedImageUrl(imagePath, { ...options, width })} ${width}w`)
    .join(', ');
}

// Preset configurations for different image types
export const imagePresets: Record<string, ImageOptimizationOptions> = {
  // Member profile photos - optimized for small display
  memberPhoto: {
    width: 300,
    height: 300,
    quality: 80,
    focus: 'face',
  },
  // Member popup photos - larger display
  memberPhotoLarge: {
    width: 400,
    height: 400,
    quality: 85,
    focus: 'face',
  },
  // Event images
  eventImage: {
    width: 600,
    quality: 80,
  },
  // Hero/cover images
  heroImage: {
    width: 1920,
    quality: 85,
  },
  // Card images
  cardImage: {
    width: 500,
    quality: 80,
  },
  // Thumbnail
  thumbnail: {
    width: 200,
    quality: 70,
  },
  // Partner logos
  partnerLogo: {
    width: 200,
    quality: 85,
  },
};

// Export the type for use in components
export type ImagePresetKey = keyof typeof imagePresets;
export type { ImageOptimizationOptions };

/**
 * Get optimized image URL using a preset
 */
export function getPresetImageUrl(
  imagePath: string,
  preset: keyof typeof imagePresets
): string {
  return getOptimizedImageUrl(imagePath, imagePresets[preset]);
}
