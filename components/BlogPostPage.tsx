'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

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

interface BlogPostPageProps {
  post: {
    title: string;
    category: string;
    date: string;
    readTime: string;
    content: string;
  };
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-slate-900 text-white px-6 md:px-12 pt-20 pb-16">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </FadeIn>
          <FadeIn delay={100}>
            <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full mb-4">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div
              className="prose prose-slate prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-500 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>
        </div>
      </section>

      {/* Share */}
      <section className="px-6 md:px-12 py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900 mb-1">Found this useful?</p>
            <p className="text-sm text-slate-500">Share it with your team or network.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-sm transition-colors">
            <Share2 size={16} />
            Share Article
          </button>
        </div>
      </section>
    </div>
  );
}