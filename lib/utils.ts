/**
 * Returns the base path for assets based on environment
 * In production (GitHub Pages), adds /portfolio prefix
 * In development, returns empty string
 */
export function getBasePath(): string {
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? '/portfolio' : '';
}

/**
 * Converts an asset path to include the basePath in production
 * Usage: assetUrl('/me.jpg') => '/portfolio/me.jpg' in prod, '/me.jpg' in dev
 */
export function assetUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBasePath()}${normalizedPath}`;
}
