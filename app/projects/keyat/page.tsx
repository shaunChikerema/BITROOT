'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Building2, Smartphone, Zap, Shield, Users, Search, MapPin, CreditCard, CheckCircle2, Code2, Database, Globe, ArrowRight } from 'lucide-react';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [inView, setInView] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);
  return (
    <div ref={setNode as React.RefCallback<HTMLDivElement>} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }} className={className}>
      {children}
    </div>
  );
}

export default function KeyatProductPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-green-500 text-white px-6 md:px-12 pt-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-2 text-green-100 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={100}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Building2 size={26} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Keyat</h1>
                  <p className="text-green-100">Real Estate Platform</p>
                </div>
                <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full border border-white/30">● LIVE</span>
              </div>
              <p className="text-xl text-green-50 leading-relaxed mb-8">
                A live property marketplace with 29+ verified listings in Gaborone. Connecting tenants, landlords, and agents in Botswana's real estate market with modern tooling and mobile money payments.
              </p>
              <a href="https://keyat.vercel.app" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-500 rounded-xl font-bold hover:bg-green-50 transition-colors">
                Visit Platform <ExternalLink size={18} />
              </a>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="grid grid-cols-3 gap-4">
                {[['29+', 'Properties Live'], ['PWA', 'Offline-First'], ['OrangeMoney', 'Integrated'], ['Multi', 'Tenant'], ['Live', 'Production'], ['TypeScript', 'End-to-End']].map(([v, l]) => (
                  <div key={l} className="bg-white/15 border border-white/20 rounded-2xl p-4 text-center">
                    <p className="font-extrabold text-white">{v}</p>
                    <p className="text-xs text-green-100 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 md:px-12 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-500 text-sm font-semibold rounded-full border border-green-200 mb-6">The Problem</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Botswana's Real Estate Market Was Running on WhatsApp</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Landlords shared listings through informal WhatsApp groups. Tenants browsed scattered Facebook posts. Agents kept client records in Excel. There was no centralized platform, no verified listings, and no online payment.
              </p>
              <p className="text-slate-500">
                Keyat changes that — a modern property platform built specifically for Botswana's market, with Orange Money payments and offline-first design for intermittent connectivity.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="inline-block px-3 py-1 bg-green-50 text-green-500 text-sm font-semibold rounded-full border border-green-200 mb-4">Key Features</span>
            <h2 className="text-3xl font-extrabold mb-12">Built for the Market</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: 'Property Search', desc: 'Advanced filtering by location, price, size, and amenities. All Gaborone neighborhoods covered.' },
              { icon: CreditCard, title: 'Orange Money Payments', desc: 'Native mobile money integration. Tenants pay rent directly through the platform.' },
              { icon: Smartphone, title: 'Offline-First PWA', desc: 'Works without internet. Service worker caches critical data, syncs when connected.' },
              { icon: Users, title: 'Multi-Role Platform', desc: 'Separate dashboards for tenants, landlords, and agents with role-based access control.' },
              { icon: MapPin, title: 'Location-Aware', desc: 'Map views, neighbourhood guides, and proximity search for schools and amenities.' },
              { icon: Shield, title: 'Verified Listings', desc: 'All properties go through a verification process. No ghost listings or scams.' },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                    <f.icon className="text-green-500" size={20} />
                  </div>
                  <h3 className="font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="px-6 md:px-12 py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-sm font-semibold rounded-full border border-green-500/30 mb-4">Tech Stack</span>
            <h2 className="text-3xl font-extrabold mb-12">How We Built It</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Code2, label: 'Frontend', items: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PWA / Service Workers'] },
              { icon: Database, label: 'Backend', items: ['PostgreSQL', 'Supabase', 'Row-Level Security', 'Serverless Functions'] },
              { icon: Globe, label: 'Integrations', items: ['Orange Money API', 'MyZaka Gateway', 'Vercel CDN', 'WebSockets'] },
            ].map((section, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <section.icon className="text-green-400" size={18} />
                    </div>
                    <h3 className="font-bold">{section.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {section.items.map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="text-green-500 flex-shrink-0" size={15} />
                        <span className="text-slate-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <div className="bg-green-500 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-extrabold mb-3">Interested in a Similar Platform?</h3>
              <p className="text-green-50 mb-6">Our team can build a custom real estate or marketplace solution for your market.</p>
              <a href="mailto:hello@bitroot.tech" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-500 rounded-xl font-bold hover:bg-green-50 transition-colors">
                Start a Conversation <ArrowRight size={18} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}