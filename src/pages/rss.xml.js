import rss from '@astrojs/rss';
import { getCollection } from "astro:content";


export const GET = async (context) => {
    const posts = await getCollection('posts');
    return rss({
        title: 'Nick\'s Web Log',
        description: 'A journal for the setbacks and successes I face on learning everything possible',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/posts/${post.slug}`,
        })),
        customData: `<language>en-us</language>`,
    });
};