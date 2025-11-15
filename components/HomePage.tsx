'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Code2, Zap, Shield, Layers, ArrowUpRight, Globe, Calendar, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

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

const blogPosts = [
  {
    id: 'multi-tenant-architecture',
    title: 'Building Multi-Tenant SaaS in Botswana',
    excerpt: 'How we architected complete data isolation for 500+ concurrent organizations using Supabase Row Level Security.',
    category: 'Architecture',
    date: 'Nov 10, 2024',
    readTime: '8 min'
  },
  {
    id: 'local-payments',
    title: 'Integrating Orange Money at Scale',
    excerpt: 'Lessons from building payment infrastructure that works with Botswana\'s mobile money ecosystem.',
    category: 'Integration',
    date: 'Nov 5, 2024',
    readTime: '6 min'
  },
  {
    id: 'offline-first',
    title: 'PWAs for Emerging Markets',
    excerpt: 'Why offline-first architecture matters when building for intermittent connectivity.',
    category: 'Mobile',
    date: 'Oct 28, 2024',
    readTime: '7 min'
  }
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      {/* Hero */}
      <section 
        className="relative min-h-screen flex items-center px-6 md:px-12"
        onMouseMove={handleMouseMove}
      >
        {/* Animated gradient blob */}
        <div 
          className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none"
          style={{
            transform: `translate(calc(-50% + ${(mousePos.x - 50) * 0.3}px), calc(-50% + ${(mousePos.y - 50) * 0.3}px))`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full py-32">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-gray-400">Launching Q1 2026</span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
              Enterprise Software
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                for Emerging Markets
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl leading-relaxed">
              Production-ready platforms built for Botswana's real estate and insurance markets. 
              Multi-tenant architecture designed for scale, security, and challenging connectivity.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                <span>Request Early Access</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-all"
              >
                View Projects
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="relative px-6 md:px-12 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { value: '10K+', label: 'Concurrent users', sub: 'Built for scale' },
              { value: '<200ms', label: 'Search speed', sub: 'Optimized queries' },
              { value: '$200M', label: 'Market size', sub: 'Botswana insurance' },
              { value: '7 mo', label: 'Development', sub: 'Solo founder' }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
                  <div className="text-gray-700 text-xs">{stat.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative px-6 md:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Projects</h2>
              <p className="text-xl text-gray-500 max-w-2xl">
                Two production platforms serving real-world markets
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {[
              {
                name: 'Keyat',
                desc: 'Multi-tenant real estate platform with Orange Money integration, PWA technology, and real-time property management.',
                tag: 'Real Estate Platform',
                stack: ['Next.js 15', 'React Native', 'Supabase', 'PWA'],
                metrics: [
                  { label: 'Scale', value: '10K+ listings' },
                  { label: 'Performance', value: '<200ms search' },
                  { label: 'Integration', value: 'Orange Money' }
                ]
              },
              {
                name: 'PolicyBridge',
                desc: 'Enterprise insurance platform with automated document processing for Botswana\'s $200M insurance market.',
                tag: 'Insurance SaaS',
                stack: ['Next.js 15', 'Puppeteer', 'TypeScript', 'PostgreSQL'],
                metrics: [
                  { label: 'Automation', value: '20+ hrs/week saved' },
                  { label: 'Processing', value: '10K+ docs/mo' },
                  { label: 'Security', value: 'Audit trails' }
                ]
              }
            ].map((project, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="group relative border border-white/5 rounded-2xl p-8 md:p-12 hover:border-white/10 transition-all duration-500 bg-gradient-to-br from-white/[0.02] to-transparent">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">{project.tag}</div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                          {project.name}
                        </h3>
                      </div>
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 text-cyan-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={24} />
                    </div>

                    <p className="text-lg text-gray-400 mb-8 max-w-3xl leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 text-xs border border-white/10 rounded-lg bg-white/5 text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
                      {project.metrics.map((metric, i) => (
                        <div key={i}>
                          <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
                          <div className="text-lg font-semibold">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Context */}
          <FadeIn delay={200}>
            <div className="mt-16 p-8 md:p-12 border border-white/5 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent">
              <div className="flex items-start gap-4 max-w-3xl">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Code2 size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Built by Solo Founder-Engineer</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Both platforms were designed, developed, and deployed by a single technical founder over 7 months. 
                    From database architecture to payment integration to deployment—every line of code, every design decision.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Approach */}
      <section className="relative px-6 md:px-12 py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Built for Reality</h2>
              <p className="text-xl text-gray-500 max-w-2xl">
                Architected for challenging environments—intermittent connectivity, diverse payment infrastructure, complex regulations
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { 
                icon: Globe, 
                title: 'Offline-First', 
                desc: 'PWAs and mobile solutions designed for intermittent connectivity. Data syncs automatically when connection restores.'
              },
              { 
                icon: Shield, 
                title: 'Multi-Tenant Security', 
                desc: 'Complete data isolation with row-level security. Scale from hundreds to thousands of organizations safely.'
              },
              { 
                icon: Zap, 
                title: 'Local Payments', 
                desc: 'Orange Money, banking, and mobile money integrations. Built-in fallback mechanisms and reconciliation.'
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group p-8 border border-white/5 rounded-xl hover:border-white/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn>
              <div>
                <h3 className="text-2xl font-semibold mb-8">Technical Foundation</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Type-Safe Development', desc: 'End-to-end TypeScript with strict mode' },
                    { title: 'Real-Time by Default', desc: 'PostgreSQL subscriptions and WebSocket connections' },
                    { title: 'Queue-Based Processing', desc: 'Background jobs for documents and data-intensive operations' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1 bg-gradient-to-b from-cyan-500 to-transparent flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="p-8 border border-white/5 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Core Technologies</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Application', items: ['Next.js 15', 'React Native', 'TypeScript', 'Tailwind'] },
                    { title: 'Data & Backend', items: ['PostgreSQL', 'Supabase', 'Serverless', 'Real-time'] },
                    { title: 'Infrastructure', items: ['Vercel', 'CDN', 'Queues', 'Monitoring'] }
                  ].map((section, i) => (
                    <div key={i}>
                      <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider">{section.title}</div>
                      <div className="flex flex-wrap gap-2">
                        {section.items.map((tech, j) => (
                          <span key={j} className="px-3 py-1 text-xs border border-white/10 rounded bg-white/5 text-gray-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative px-6 md:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">What Gets Built</h2>
              <p className="text-xl text-gray-500 max-w-2xl">
                End-to-end platform development for complex business requirements
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code2, title: 'Web Platforms', desc: 'Full-stack applications with Next.js, TypeScript, and serverless architecture' },
              { icon: Zap, title: 'Mobile Apps', desc: 'Cross-platform React Native with offline-first design' },
              { icon: Shield, title: 'Enterprise Security', desc: 'Multi-tenant architecture with encryption and audit trails' },
              { icon: Layers, title: 'Cloud Infrastructure', desc: 'Scalable deployment with CDN and production monitoring' }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className="group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="text-cyan-400" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="relative px-6 md:px-12 py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Insights</h2>
              <p className="text-xl text-gray-500 max-w-2xl">
                Building enterprise software for emerging markets
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <FadeIn key={i} delay={i * 100}>
                <a href={`#blog/${post.id}`} className="group block p-6 border border-white/5 rounded-xl hover:border-white/10 transition-all duration-300">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
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
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-600">{post.date}</span>
                    <ArrowRight className="text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={14} />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative px-6 md:px-12 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Get Early Access</h2>
            <p className="text-xl text-gray-400 mb-12">
              Production-ready platforms launching Q1 2026. Join early adopters testing the beta.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="p-8 md:p-12 border border-white/5 rounded-2xl mb-12 bg-gradient-to-br from-white/[0.02] to-transparent">
              <h3 className="text-xl font-semibold mb-8">What You Get</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
                {[
                  { title: 'Beta Access', desc: 'First access before public launch' },
                  { title: 'Technical Walkthrough', desc: 'Direct demo with the founder' },
                  { title: 'Custom Options', desc: 'White-label or custom features' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="text-cyan-400 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <div className="font-medium mb-1">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a 
                href="mailto:hello@bitroot.tech"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                <Mail size={18} />
                <span>hello@bitroot.tech</span>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex items-center justify-center gap-6 pt-8 border-t border-white/5">
              <a href="https://github.com" className="text-gray-500 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:hello@bitroot.tech" className="text-gray-500 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gray-500 mb-2">Building infrastructure for emerging markets</p>
            <p className="text-gray-700 text-sm mb-6">Gaborone, Botswana</p>
            <p className="text-gray-700 text-sm">&copy; 2025 BITROOT. All rights reserved.</p>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}