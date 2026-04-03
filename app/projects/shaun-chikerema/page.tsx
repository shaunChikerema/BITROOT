'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Layers, Smartphone, Zap, Code2, Globe, ArrowRight, CheckCircle2, Monitor } from 'lucide-react';

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
    <div
      ref={setNode as React.RefCallback<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function ShaunChikeremaPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ── Hero ── */}
      <section style={{ background: '#3ECF8E' }} className="text-white px-6 md:px-12 pt-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-2 text-emerald-100 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={100}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <Code2 size={26} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Shaun Chikerema</h1>
                  <p className="text-emerald-100">Developer Portfolio</p>
                </div>
                <span className="px-3 py-1 text-white text-sm font-bold rounded-full" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  ● LIVE
                </span>
              </div>
              <p className="text-xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.9)' }}>
                A custom-designed developer portfolio for Shaun Chikerema — BITROOT's founder and lead engineer. Built to showcase six production projects with a polished design system, interactive screenshot lightbox, and a fully responsive mobile layout.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://shaun-chikerema.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                  style={{ color: '#3ECF8E' }}
                >
                  Visit Site <ExternalLink size={18} />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.25)' }}>
                <img
                  src="/screenshots/shaun-portfolio/preview.png"
                  alt="Shaun Chikerema portfolio preview"
                  className="w-full object-cover"
                  style={{ maxHeight: 340, objectPosition: '50% 10%' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Fallback card if no screenshot yet */}
                <div className="p-8 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <div className="flex items-center gap-2">
                    <Monitor size={16} className="text-white opacity-70" />
                    <span className="text-white text-sm font-medium opacity-80">shaun-chikerema.vercel.app</span>
                  </div>
                  <div className="h-2 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.25)' }} />
                  <div className="h-2 rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {['Next.js', 'Framer Motion', 'Vercel'].map(t => (
                      <div key={t} className="rounded-lg px-2 py-1.5 text-center text-xs font-semibold text-white" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Brief ── */}
      <section className="px-6 md:px-12 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-full border border-emerald-200 mb-6">
                The Brief
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                A Portfolio That Reflects Real Work
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Most developer portfolios are templates — generic layouts with placeholder projects and no evidence of actual shipped work. The brief was to build something that immediately communicates production experience: real projects, real screenshots, real links.
              </p>
              <p className="text-slate-500 leading-relaxed">
                The result is a fully custom site with its own design system — Playfair Display for the name mark, DM Sans for body, a mint green accent that runs consistently through every section — designed and built entirely by BITROOT.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── What We Built ── */}
      <section className="px-6 md:px-12 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-full border border-emerald-200 mb-4">
              What We Built
            </span>
            <h2 className="text-3xl font-extrabold mb-12">Key Features</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: 'Custom Design System',
                desc: 'Consistent typography, spacing, color tokens, and component library — no UI kit, built from scratch.',
              },
              {
                icon: Monitor,
                title: 'Screenshot Lightbox',
                desc: 'Full-screen screenshot gallery per project with keyboard navigation, desktop/mobile view toggle, and dot pagination.',
              },
              {
                icon: Smartphone,
                title: 'Mobile-First Layout',
                desc: 'Every section tested and refined for mobile. Project cards, hero, skills, and contact all stack cleanly on small screens.',
              },
              {
                icon: Zap,
                title: 'Framer Motion Animations',
                desc: 'Scroll-triggered reveals, staggered card entrances, and a hero name animation — all respecting prefers-reduced-motion.',
              },
              {
                icon: Globe,
                title: 'Contact Form + API',
                desc: 'Working project inquiry form with a Next.js API route, email delivery, and instant feedback states.',
              },
              {
                icon: Code2,
                title: 'Production Deployed',
                desc: 'Deployed on Vercel with CI/CD via GitHub. Optimized images, fast cold starts, and a custom domain.',
              },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-emerald-400 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                    <f.icon className="text-emerald-500" size={20} />
                  </div>
                  <h3 className="font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="px-6 md:px-12 py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-semibold rounded-full border border-emerald-500/30 mb-4">
              Tech Stack
            </span>
            <h2 className="text-3xl font-extrabold mb-12">How We Built It</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Code2,
                label: 'Frontend',
                items: ['Next.js 15 (App Router)', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
              },
              {
                icon: Globe,
                label: 'Design',
                items: ['Playfair Display — display type', 'DM Sans — body type', 'Custom CSS variables', 'Lucide Icons'],
              },
              {
                icon: Zap,
                label: 'Infrastructure',
                items: ['Vercel deployment', 'GitHub Actions CI/CD', 'Next.js API Routes', 'Optimized image pipeline'],
              },
            ].map((section, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <section.icon className="text-emerald-400" size={18} />
                    </div>
                    <h3 className="font-bold">{section.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {section.items.map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={15} />
                        <span className="text-slate-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn delay={200}>
            <div className="rounded-2xl p-8 text-center" style={{ background: '#3ECF8E' }}>
              <h3 className="text-xl font-extrabold mb-3">Need a Portfolio or Personal Brand Site?</h3>
              <p className="mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
                We design and build custom sites that actually represent your work — not templates.
              </p>
              <a
                href="mailto:hello@bitroot.tech"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                style={{ color: '#3ECF8E' }}
              >
                Start a Conversation <ArrowRight size={18} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}