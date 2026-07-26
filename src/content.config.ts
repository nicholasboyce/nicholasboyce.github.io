// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      tags: z.array(z.string())
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};