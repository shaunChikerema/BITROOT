'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search, ArrowLeft } from 'lucide-react';

function useInView(): [boolean, React.RefCallback<HTMLDivElement>] {
  const [isInView, setIsInView] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsInView(true); }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);
  return [isInView, setNode as React.RefCallback<HTMLDivElement>];
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [inView, ref] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }} className={className}>
      {children}
    </div>
  );
}

const blogPosts = [
  { id: 'offline-first-pwas', title: 'Building Offline-First PWAs for Intermittent Connectivity', excerpt: 'How we architected Keyat to work seamlessly when internet access is unreliable. Service workers, cache strategies, and sync patterns that actually work in production.', category: 'Architecture', date: 'Nov 2025', readTime: '8 min read', featured: true, color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'multi-tenant-security', title: 'Multi-Tenant Security: Row-Level Security in PostgreSQL', excerpt: 'Implementing true data isolation for thousands of organizations on shared infrastructure. Deep dive into RLS policies, performance optimization, and avoiding common pitfalls.', category: 'Security', date: 'Oct 2025', readTime: '12 min read', featured: true, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'mobile-money-integration', title: 'Mobile Money Integration: Lessons from Botswana', excerpt: 'Integrating with Orange Money and MyZaka in production. API quirks, reconciliation strategies, and building fallback mechanisms when payment providers go down.', category: 'Payments', date: 'Sep 2025', readTime: '10 min read', featured: false, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'queue-based-pdf-generation', title: 'Queue-Based PDF Generation at Scale', excerpt: 'Processing 10,000+ insurance documents monthly with Puppeteer and bull queues. Job prioritization, memory management, and handling failures gracefully.', category: 'Infrastructure', date: 'Aug 2025', readTime: '15 min read', featured: false, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'why-emerging-markets', title: 'Why We Build for Emerging Markets', excerpt: 'The technical and business case for focusing on African markets. Market size, payment infrastructure maturity, and where the biggest opportunities lie.', category: 'Strategy', date: 'Jul 2025', readTime: '6 min read', featured: false, color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'realtime-at-scale', title: 'Real-Time Updates Without Breaking the Bank', excerpt: 'Implementing WebSocket connections and PostgreSQL subscriptions cost-effectively. When to use real-time, when to poll, and optimizing for thousands of concurrent users.', category: 'Performance', date: 'Jun 2025', readTime: '9 min read', featured: false, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
];

const categories = ['All', 'Architecture', 'Security', 'Payments', 'Infrastructure', 'Strategy', 'Performance'];

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative bg-slate-900 text-white px-6 md:px-12 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </FadeIn>
          <FadeIn delay={100}>
            <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full mb-4">The BITROOT Blog</span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Technical Insights</h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">Building enterprise software for emerging markets — lessons, patterns, and war stories from the field.</p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 py-8 border-b border-slate-200 bg-slate-50 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors text-sm" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {featuredPosts.length > 0 && (
        <section className="px-6 md:px-12 py-16">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-6">Featured Articles</h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, idx) => (
                <FadeIn key={post.id} delay={idx * 100}>
                  <Link href={`/blog/${post.id}`} className="group block bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-green-500 hover:shadow-lg transition-all duration-300">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${post.color} mb-4`}>{post.category}</span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-green-500 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-6 text-sm">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                      </div>
                      <ArrowRight className="text-slate-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" size={18} />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular posts */}
      <section className="px-6 md:px-12 py-16 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-6">
              {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
            </h2>
          </FadeIn>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20"><p className="text-slate-500 text-lg">No articles found</p></div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {regularPosts.map((post, idx) => (
                <FadeIn key={post.id} delay={idx * 50}>
                  <Link href={`/blog/${post.id}`} className="group block bg-white border border-slate-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-md transition-all duration-300">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${post.color} mb-4`}>{post.category}</span>
                    <h3 className="font-bold mb-3 group-hover:text-green-500 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400">{post.date}</span>
                      <ArrowRight className="text-slate-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" size={14} />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 bg-green-500 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold mb-4">Want to Discuss These Topics?</h2>
            <p className="text-green-50 text-lg mb-8">We're happy to go deeper on architecture decisions, implementation details, or anything you're building.</p>
            <a href="mailto:hello@bitroot.tech" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-green-500 rounded-xl font-bold hover:bg-green-50 transition-colors">
              <span>Get in Touch</span>
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}