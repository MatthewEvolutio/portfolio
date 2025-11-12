/**
 * Returns the base path for assets based on environment
 * In production on GitHub Pages, adds /portfolio prefix
 * On Vercel or in development, returns empty string
 * 
 * Detects Vercel by checking if we're NOT running with /portfolio basePath
 * This works on both server and client during navigation
 */
export function getBasePath(): string {
  const isProd = process.env.NODE_ENV === 'production';
  
  // On client side, check if the current path starts with /portfolio
  if (typeof window !== 'undefined') {
    const isGitHubPages = window.location.pathname.startsWith('/portfolio');
    return isGitHubPages ? '/portfolio' : '';
  }
  
  // On server side, check VERCEL env var
  const isVercel = process.env.VERCEL === '1';
  return isProd && !isVercel ? '/portfolio' : '';
}

/**
 * Converts an asset path to include the basePath in production
 * Usage: assetUrl('/me.jpg') => '/portfolio/me.jpg' on GitHub Pages, '/me.jpg' on Vercel/dev
 */
export function assetUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBasePath()}${normalizedPath}`;
}
