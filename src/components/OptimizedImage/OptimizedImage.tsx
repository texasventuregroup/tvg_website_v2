import { useState } from 'react';
import {
  getOptimizedImageUrl,
  getResponsiveSrcSet,
  isImageKitConfigured,
  imagePresets,
  type ImageOptimizationOptions
} from '../../config/images';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  preset?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  quality?: number;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  preset,
  className,
  style,
  loading = 'lazy',
  sizes = '100vw',
  quality,
  onError,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);

  // Get preset options if specified
  const presetOptions: ImageOptimizationOptions = preset && imagePresets[preset]
    ? imagePresets[preset]
    : {};

  const options: ImageOptimizationOptions = {
    width: width || presetOptions.width,
    height: height || presetOptions.height,
    quality: quality || presetOptions.quality,
  };

  // Get optimized URLs
  const optimizedSrc = isImageKitConfigured()
    ? getOptimizedImageUrl(src, options)
    : src;

  const srcSet = isImageKitConfigured() && !preset
    ? getResponsiveSrcSet(src, [320, 640, 960, 1280], { quality: options.quality })
    : undefined;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    // Fallback to original image if ImageKit fails
    if (isImageKitConfigured()) {
      (e.target as HTMLImageElement).src = src;
    }
    onError?.(e);
  };

  if (hasError && !isImageKitConfigured()) {
    return null;
  }

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width || options.width}
      height={height || options.height}
      className={className}
      style={style}
      loading={loading}
      onError={handleError}
      decoding="async"
    />
  );
}
