import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.texasventuregroup.com';

const routes = [
  '',
  '/analysts',
  '/associates',
  '/hackathons',
  '/events',
  '/sponsors',
  '/members',
  '/partnerships',
  '/treks',
  '/treks/sf',
  '/treks/nyc',
  '/apply',
  '/join',
  '/work-with-us',
  '/bevsanddevs',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
