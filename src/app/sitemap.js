
import { client } from "../sanity/lib/client";

const BASE_URL = "https://www.getyourfruits.com";

export default async function sitemap() {
  const staticPages = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/categories`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/categories/nuts`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/categories/dried-fruits`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/categories/nutrition`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/categories/guides`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));

  const posts = await client.fetch(`
    *[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt)
    ] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  const articlePages = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post._updatedAt
      ? new Date(post._updatedAt)
      : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
