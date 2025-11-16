'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search, ArrowLeft } from 'lucide-react';

// Custom hooks
function useInView(): [boolean, React.RefCallback<HTMLDivElement>] {
  const [isInView, setIsInView] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return [isInView, setNode as React.RefCallback<HTMLDivElement>];
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const [inView, ref] = useInView();
  
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// Blog posts data
const blogPosts = [
  {
    id: 'offline-first-pwas',
    title: 'Building Offline-First PWAs for Intermittent Connectivity',
    excerpt: 'How we architected Keyat to work seamlessly when internet access is unreliable. Service workers, cache strategies, and sync patterns that actually work in production.',
    category: 'Architecture',
    date: 'Nov 2025',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 'multi-tenant-security',
    title: 'Multi-Tenant Security: Row-Level Security in PostgreSQL',
    excerpt: 'Implementing true data isolation for thousands of organizations on shared infrastructure. Deep dive into RLS policies, performance optimization, and avoiding common pitfalls.',
    category: 'Security',
    date: 'Oct 2025',
    readTime: '12 min read',
    featured: true
  },
  {
    id: 'mobile-money-integration',
    title: 'Mobile Money Integration: Lessons from Botswana',
    excerpt: 'Integrating with Orange Money and MyZaka in production. API quirks, reconciliation strategies, and building fallback mechanisms when payment providers go down.',
    category: 'Payments',
    date: 'Sep 2025',
    readTime: '10 min read',
    featured: false
  },
  {
    id: 'queue-based-pdf-generation',
    title: 'Queue-Based PDF Generation at Scale',
    excerpt: 'Processing 10,000+ insurance documents monthly with Puppeteer and bull queues. Job prioritization, memory management, and handling failures gracefully.',
    category: 'Infrastructure',
    date: 'Aug 2025',
    readTime: '15 min read',
    featured: false
  },
  {
    id: 'why-emerging-markets',
    title: 'Why We Build for Emerging Markets',
    excerpt: 'The technical and business case for focusing on African markets. Market size, payment infrastructure maturity, and where the biggest opportunities lie.',
    category: 'Strategy',
    date: 'Jul 2025',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 'realtime-at-scale',
    title: 'Real-Time Updates Without Breaking the Bank',
    excerpt: 'Implementing WebSocket connections and PostgreSQL subscriptions cost-effectively. When to use real-time, when to poll, and optimizing for thousands of concurrent users.',
    category: 'Performance',
    date: 'Jun 2025',
    readTime: '9 min read',
    featured: false
  }
];

const categories = ['All', 'Architecture', 'Security', 'Payments', 'Infrastructure', 'Strategy', 'Performance'];

export default function BlogListingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" 
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          opacity: Math.max(0, 1 - scrollY / 1000)
        }}
      />

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-32 pb-20">
        {/* Gradient blob */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none"
          style={{ opacity: Math.max(0.3, 1 - scrollY / 600) }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[0.95]">
              Technical Insights
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-12">
              Building enterprise software for emerging markets—lessons from the field
            </p>
          </FadeIn>

          {/* Search and Filter */}
          <FadeIn delay={300}>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>

              {/* Category filters */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="relative px-6 md:px-12 pb-16">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Featured</h2>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, idx) => (
                <FadeIn key={post.id} delay={idx * 100}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="group block border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-300 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden"
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <span className="text-cyan-400">{post.category}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar size={12} />
                          <span>{post.date}</span>
                        </div>
                        <ArrowRight className="text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={18} />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="relative px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">
              {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
            </h2>
          </FadeIn>

          {filteredPosts.length === 0 ? (
            <FadeIn delay={100}>
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No articles found</p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {regularPosts.map((post, idx) => (
                <FadeIn key={post.id} delay={idx * 50}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="group block border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Slide-in gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="text-cyan-400">{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-xs text-gray-600">{post.date}</span>
                        <ArrowRight className="text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={14} />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 md:px-12 py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Discuss These Topics?</h2>
            <p className="text-gray-400 text-lg mb-8">
              We're always happy to dive deeper into technical architecture and implementation details
            </p>
            <a 
              href="mailto:hello@bitroot.tech"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all group"
            >
              <span>Get in Touch</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}