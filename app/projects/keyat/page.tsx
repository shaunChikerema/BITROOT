'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Building2, Smartphone, Zap, Shield, Users, Search, MapPin, Calendar, CreditCard, CheckCircle2, Code2, Database, Globe, ArrowRight } from 'lucide-react';

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

export default function KeyatProductPage() {
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

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-32 pb-20">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none"
          style={{ opacity: Math.max(0.3, 1 - scrollY / 600) }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <a 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </a>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Building2 size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold">Keyat</h1>
                <p className="text-xl text-gray-400 mt-2">Real Estate Platform for Botswana</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                LIVE IN PRODUCTION
              </span>
              <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                29+ PROPERTIES LISTED
              </span>
              <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
                PWA • OFFLINE-FIRST
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              A modern property marketplace connecting tenants, landlords, and agents in Gaborone. 
              Built mobile-first with offline capabilities and Orange Money integration.
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://keyat.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                <span>View Live Platform</span>
                <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#architecture"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-all"
              >
                <span>Technical Details</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="text-4xl font-bold mb-6">The Problem</h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-6">
                  Botswana's rental market runs on WhatsApp groups, Facebook posts, and word-of-mouth. 
                  Tenants waste days driving around looking for properties. Landlords struggle with verification. 
                  Agents manually coordinate everything via phone calls.
                </p>
                <div className="space-y-4">
                  {[
                    'No centralized property listings',
                    'Manual tenant screening and verification',
                    'Payment tracking via spreadsheets',
                    'No digital contracts or documentation',
                    'Poor communication between all parties'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="p-8 border border-white/5 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent">
                <h3 className="text-2xl font-bold mb-6">Market Reality</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">200K+</div>
                    <div className="text-sm text-gray-500">Active rental seekers in Gaborone</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">90%</div>
                    <div className="text-sm text-gray-500">Still use manual processes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">14 days</div>
                    <div className="text-sm text-gray-500">Average time to find housing</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-6">The Solution</h2>
            <p className="text-xl text-gray-400 max-w-3xl mb-16">
              A multi-sided marketplace that works offline, accepts mobile money, and handles the entire rental workflow.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'For Tenants',
                desc: 'Browse verified properties, schedule tours, submit applications, and track everything in one place.'
              },
              {
                icon: Building2,
                title: 'For Landlords',
                desc: 'List properties, screen tenants, manage leases, and receive payments via Orange Money.'
              },
              {
                icon: Shield,
                title: 'For Agents',
                desc: 'Manage multiple properties, coordinate viewings, handle paperwork, and earn commissions.'
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="p-8 border border-white/5 rounded-xl hover:border-white/10 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="text-blue-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-16">Key Features</h2>
          </FadeIn>

          <div className="space-y-24">
            {/* Feature 1 */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Search className="text-blue-400" size={28} />
                    <h3 className="text-2xl font-bold">Smart Property Search</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Advanced filtering by location, price, bedrooms, amenities. Real-time availability. 
                    Map view with property clusters. Saved searches with notifications.
                  </p>
                  <div className="space-y-3">
                    {['Filter by 15+ criteria', 'Map-based browsing', 'Save favorite properties', 'Price alerts'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-blue-400" size={18} />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <Search className="text-blue-400/30" size={80} />
                </div>
              </div>
            </FadeIn>

            {/* Feature 2 */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <Calendar className="text-purple-400/30" size={80} />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-purple-400" size={28} />
                    <h3 className="text-2xl font-bold">Tour Scheduling</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Tenants book viewings directly. Landlords manage availability. Automated reminders. 
                    Built-in calendar sync. No more phone tag.
                  </p>
                  <div className="space-y-3">
                    {['One-click booking', 'SMS/email reminders', 'Reschedule anytime', 'Tour history tracking'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-purple-400" size={18} />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Feature 3 */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="text-cyan-400" size={28} />
                    <h3 className="text-2xl font-bold">Orange Money Integration</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Native mobile money payments. Automated rent collection. Payment reminders. 
                    Full transaction history. Reconciliation built-in.
                  </p>
                  <div className="space-y-3">
                    {['Orange Money & MyZaka', 'Automated billing', 'Payment tracking', 'Receipt generation'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-cyan-400" size={18} />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <CreditCard className="text-cyan-400/30" size={80} />
                </div>
              </div>
            </FadeIn>

            {/* Feature 4 */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-green-900/20 to-cyan-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <Smartphone className="text-green-400/30" size={80} />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="text-green-400" size={28} />
                    <h3 className="text-2xl font-bold">Offline-First PWA</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Works without internet. Service worker caching. Background sync when online. 
                    Installable like a native app. Fast, reliable, always available.
                  </p>
                  <div className="space-y-3">
                    {['Works offline', 'Add to home screen', 'Push notifications', 'Auto-sync data'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-green-400" size={18} />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-6">Technical Architecture</h2>
            <p className="text-xl text-gray-400 mb-16 max-w-3xl">
              Built for scale, reliability, and offline-first performance.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <FadeIn delay={100}>
              <div className="p-8 border border-white/5 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="text-blue-400" size={24} />
                  <h3 className="text-xl font-bold">Frontend</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { tech: 'Next.js 15', desc: 'App router, server components' },
                    { tech: 'React Native', desc: 'iOS/Android apps' },
                    { tech: 'TypeScript', desc: 'End-to-end type safety' },
                    { tech: 'Tailwind CSS', desc: 'Utility-first styling' },
                    { tech: 'Service Workers', desc: 'Offline caching & sync' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white font-medium">{item.tech}</span>
                      <span className="text-gray-500 text-sm">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="p-8 border border-white/5 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="text-cyan-400" size={24} />
                  <h3 className="text-xl font-bold">Backend</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { tech: 'PostgreSQL', desc: 'Primary database' },
                    { tech: 'Supabase', desc: 'Auth, real-time, storage' },
                    { tech: 'Row-Level Security', desc: 'Multi-tenant isolation' },
                    { tech: 'Vercel Functions', desc: 'Serverless API routes' },
                    { tech: 'Orange Money API', desc: 'Payment processing' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white font-medium">{item.tech}</span>
                      <span className="text-gray-500 text-sm">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <div className="p-8 border border-white/5 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="text-purple-400" size={24} />
                <h3 className="text-xl font-bold">Infrastructure & Performance</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'CDN & Edge', desc: 'Vercel Edge Network for global low-latency delivery' },
                  { title: 'Image Optimization', desc: 'Next.js Image component with WebP/AVIF support' },
                  { title: 'Real-time Sync', desc: 'WebSocket connections for live updates' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="font-semibold mb-2">{item.title}</div>
                    <div className="text-sm text-gray-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Results */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-16">Current Status</h2>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '29+', label: 'Properties Listed', color: 'blue' },
              { number: '100%', label: 'Uptime', color: 'green' },
              { number: '<2s', label: 'Page Load Time', color: 'cyan' },
              { number: 'Live', label: 'In Production', color: 'purple' }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="p-8 border border-white/5 rounded-xl text-center hover:border-white/10 transition-all group">
                  <div className={`text-4xl font-bold mb-2 text-${stat.color}-400`}>{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-6">Try Keyat Today</h2>
            <p className="text-xl text-gray-400 mb-12">
              Browse 29+ verified properties in Gaborone. List your property. Schedule tours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://keyat.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                <span>Visit Platform</span>
                <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="mailto:hello@bitroot.tech"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-all"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}