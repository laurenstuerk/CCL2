// src/pages/public/static/BlogPage.jsx

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Dummy data for blog posts. This can be replaced by an API call.
const blogPosts = [
  {
    id: 1,
    slug: 'the-future-of-browser-gaming-with-webgl',
    title: 'The Future of Browser Gaming with WebGL',
    author: 'Laurens T.',
    date: 'June 14, 2025',
    excerpt: 'WebGL technology is revolutionizing what\'s possible in the browser, allowing for console-quality graphics without any downloads. We dive deep into how this technology powers games like Marble Rush 3D.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
  },
  {
    id: 2,
    slug: 'designing-our-new-user-dashboard',
    title: 'Designing Our New User Dashboard',
    author: 'Jona Eichen',
    date: 'June 1, 2025',
    excerpt: 'A behind-the-scenes look at the design process for the new Ripground user dashboard, focusing on user experience and a futuristic aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1621111848501-8d3634f82336?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    slug: 'building-a-fair-and-competitive-leaderboard',
    title: 'Building a Fair and Competitive Leaderboard',
    author: 'Laurens T.',
    date: 'May 25, 2025',
    excerpt: 'Leaderboards are the heart of competitive play. We explore the technical challenges and ethical considerations of building a system that is both fair and motivating for all players.',
    imageUrl: 'https://images.unsplash.com/photo-1533237264985-ee62f6d342bb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
    {
    id: 4,
    slug: 'community-spotlight-may-2025',
    title: 'Community Spotlight: May 2025',
    author: 'Ripground Team',
    date: 'May 20, 2025',
    excerpt: 'Highlighting the most incredible player achievements, high scores, and community contributions from the past month. See if you made the cut!',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function BlogPage() {
    const featuredPost = blogPosts.find(post => post.featured);
    const recentPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <Helmet>
        <title>Blog - Ripground</title>
        <meta name="description" content="The official Ripground blog. Get the latest news, game updates, and behind-the-scenes stories from our team." />
      </Helmet>
      
      <div className="prose prose-invert prose-lg max-w-none">
        {/* Header Section */}
        <header className="text-center pt-16 pb-12 bg-neutral-950 border-b border-neutral-800">
            <h1 className="text-5xl font-bold tracking-tight text-white">The Ripground Log</h1>
            <p className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto">
                News, game updates, and behind-the-scenes stories from the Ripground team.
            </p>
        </header>

        <div className="py-16">
            {/* Featured Post Section */}
            {featuredPost && (
                <section aria-labelledby="featured-post-heading">
                    <div className="container mx-auto">
                        <article className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="aspect-video rounded-lg overflow-hidden">
                                <img src={featuredPost.imageUrl} alt="" className="w-full h-full object-cover"/>
                            </div>
                            <div>
                                <h2 id="featured-post-heading" className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Featured Post</h2>
                                <h3 className="mt-4 text-3xl md:text-4xl font-bold text-white hover:text-neutral-200 transition-colors">
                                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                                </h3>
                                <p className="mt-4 text-neutral-300">{featuredPost.excerpt}</p>
                                <p className="mt-4 text-sm text-neutral-400">{featuredPost.date} &middot; by {featuredPost.author}</p>
                                <Button asChild variant="link" className="text-blue-400 px-0 mt-4">
                                    <Link to={`/blog/${featuredPost.slug}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>
                        </article>
                    </div>
                </section>
            )}

            {/* Recent Posts Section */}
            <section className="mt-20" aria-labelledby="recent-posts-heading">
                <div className="container mx-auto">
                    <h2 id="recent-posts-heading" className="text-3xl font-bold text-center">More From the Blog</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentPosts.map(post => (
                           <article key={post.id} className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 flex flex-col">
                                <div className="aspect-video">
                                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover"/>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-white hover:text-neutral-200 transition-colors">
                                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h3>
                                    <p className="mt-3 text-neutral-400 flex-grow">{post.excerpt}</p>
                                    <p className="mt-4 pt-4 border-t border-neutral-800 text-sm text-neutral-500">{post.date} &middot; by {post.author}</p>
                                </div>
                           </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
      </div>
    </>
  );
}