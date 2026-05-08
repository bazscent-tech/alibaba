import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/account/', '/orders/', '/cart/', '/wishlist/'],
    },
    sitemap: 'https://shabam.com/sitemap.xml',
  };
}
