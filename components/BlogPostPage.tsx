'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

// Custom hooks
function useInView(): [boolean, React.RefCallback<HTMLDivElement>] {
  const [isInView, setIsInView] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
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

interface BlogPostPageProps {
  post: {
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    readTime: string;
    author?: string;
  };
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <section className="relative px-6 md:px-12 pt-32 pb-16">
        {/* Gradient blob */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none"
          style={{ opacity: Math.max(0.3, 1 - scrollY / 600) }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeIn>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {post.excerpt}
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="flex items-center justify-between py-6 border-y border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                {post.author && (
                  <>
                    <span className="text-gray-700">•</span>
                    <span className="text-sm text-gray-400">{post.author}</span>
                  </>
                )}
              </div>
              
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href
                    });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
              >
                <Share2 size={14} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={100}>
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-white
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-200
                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-cyan-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                prose-ul:text-gray-400 prose-ul:my-6
                prose-ol:text-gray-400 prose-ol:my-6
                prose-li:my-2
                prose-blockquote:border-l-cyan-500 prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400
                prose-img:rounded-xl prose-img:border prose-img:border-white/10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>
        </div>
      </article>

      {/* Related / CTA Section */}
      <section className="relative px-6 md:px-12 py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="p-8 md:p-12 border border-white/5 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent text-center">
              <h3 className="text-2xl font-bold mb-4">Want to Discuss This?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                We're always happy to dive deeper into technical architecture and implementation details
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-all"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Blog</span>
                </Link>
                <a 
                  href="mailto:hello@bitroot.tech"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all"
                >
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}