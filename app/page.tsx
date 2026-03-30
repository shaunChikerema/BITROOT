'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Code2, Database,
  Smartphone, Shield, Building2,
  ChevronRight, MapPin, ExternalLink,
  Image as ImageIcon, Play, X, ChevronLeft, ChevronRight as ChevronRightIcon
} from 'lucide-react';

// ── Hooks ──────────────────────────────────────────────────────────────────

function useInView() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.08 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [isInView, ref] as const;
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [inView, ref] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// ── Modal Components ────────────────────────────────────────────────────────

type ScreenshotModalProps = {
  project: 'keyat' | 'policybridge';
  onClose: () => void;
};

const projectScreenshots: Record<'keyat' | 'policybridge', { src: string; caption: string }[]> = {
  keyat: [
    { src: '/screenshots/keyat-home.png', caption: 'Homepage — property listings across Gaborone' },
    { src: '/screenshots/keyat-listing.png', caption: 'Listing detail with Orange Money payment flow' },
    { src: '/screenshots/keyat-search.png', caption: 'Search & filter with offline-first PWA support' },
  ],
  policybridge: [
    { src: '/screenshots/pb-dashboard.png', caption: 'Broker dashboard — client overview' },
    { src: '/screenshots/pb-policy.png', caption: 'Policy tracking & renewal management' },
    { src: '/screenshots/pb-pdf.png', caption: 'Auto-generated compliance PDF output' },
  ],
};

const projectVideos: Record<'keyat' | 'policybridge', { url: string; title: string }> = {
  keyat: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Keyat — Product Walkthrough' },
  policybridge: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'PolicyBridge — Product Walkthrough' },
};

function ScreenshotModal({ project, onClose }: ScreenshotModalProps) {
  const [idx, setIdx] = useState(0);
  const shots = projectScreenshots[project];
  const accentColor = project === 'keyat' ? 'bg-emerald-600' : 'bg-blue-600';

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % shots.length);
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + shots.length) % shots.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, shots.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <ImageIcon size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700 capitalize">{project}</span>
            <span className="text-xs text-slate-400">{idx + 1} / {shots.length}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="relative bg-slate-100 aspect-video flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-3">
            <ImageIcon size={48} strokeWidth={1} />
            <p className="text-xs font-medium text-slate-400">{shots[idx].src}</p>
            <p className="text-[11px] text-slate-300 max-w-xs text-center">{shots[idx].caption}</p>
          </div>
          {/* Uncomment once real screenshots exist:
          <img src={shots[idx].src} alt={shots[idx].caption} className="w-full h-full object-cover object-top" />
          */}

          {shots.length > 1 && (
            <>
              <button
                onClick={() => setIdx(i => (i - 1 + shots.length) % shots.length)}
                className="absolute left-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-slate-900 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setIdx(i => (i + 1) % shots.length)}
                className="absolute right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-slate-900 transition-all"
              >
                <ChevronRightIcon size={16} />
              </button>
            </>
          )}
        </div>

        <div className="px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">{shots[idx].caption}</p>
          <div className="flex gap-1.5">
            {shots.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? `${accentColor} scale-125` : 'bg-slate-200 hover:bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoModal({ project, onClose }: { project: 'keyat' | 'policybridge'; onClose: () => void }) {
  const video = projectVideos[project];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Play size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">{video.title}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="aspect-video bg-slate-900 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-slate-500 gap-3">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              <Play size={28} className="text-slate-400 ml-1" />
            </div>
            <p className="text-xs text-slate-500">Video demo coming soon</p>
          </div>
          {/* Uncomment to embed:
          <iframe src={video.url} title={video.title} className="w-full h-full" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          */}
        </div>
      </div>
    </div>
  );
}

// ── Project Action Buttons ─────────────────────────────────────────────────

type ProjectActionsProps = {
  project: 'keyat' | 'policybridge';
  siteUrl: string;
  onScreenshots: () => void;
  onVideo: () => void;
};

function ProjectActions({ project, siteUrl, onScreenshots, onVideo }: ProjectActionsProps) {
  const isKeyat = project === 'keyat';
  const primaryStyle = isKeyat
    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-600 hover:border-emerald-500'
    : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-600 hover:border-blue-500';

  return (
    <div className="flex items-center gap-2 mt-5 pt-5 border-t border-slate-100">
      <a
        href={siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${primaryStyle}`}
      >
        <ExternalLink size={12} />
        Visit Site
      </a>
      <button
        onClick={e => { e.preventDefault(); e.stopPropagation(); onScreenshots(); }}
        className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg transition-all"
      >
        <ImageIcon size={12} />
        Screenshots
      </button>
      <button
        onClick={e => { e.preventDefault(); e.stopPropagation(); onVideo(); }}
        className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg transition-all"
      >
        <Play size={12} />
        Demo
      </button>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────

const trustedClients = [
  { name: 'Paragon Insurance Brokers', industry: 'Insurance' },
  { name: 'Alfa-First Insurance', industry: 'Insurance' },
  { name: 'Winning Pillar', industry: 'Consulting' },
  { name: 'Keyat Real Estate', industry: 'Real Estate' },
  { name: 'Botswana Savings Bank', industry: 'Finance' },
  { name: 'Gaborone Tech Hub', industry: 'Tech' },
  { name: 'Innovate Botswana', industry: 'Innovation' },
];

const teamMembers = [
  {
    name: 'Shaun Chikerema',
    role: 'Co-founder & CEO',
    expertise: 'Product Strategy · Business Development',
    initial: 'SC',
    color: 'bg-emerald-50 text-emerald-700',
    quote: 'We build software that works for Africa, not just in Africa.',
  },
  {
    name: 'Michael Kenosi',
    role: 'Lead Engineer',
    expertise: 'Full Stack · System Architecture',
    initial: 'MK',
    color: 'bg-blue-50 text-blue-600',
    quote: 'Good engineering is invisible — it just works.',
  },
  {
    name: 'William Tuahuku',
    role: 'Software Engineer',
    expertise: 'React · Node.js · Mobile',
    initial: 'WT',
    color: 'bg-violet-50 text-violet-600',
    quote: 'Every line of code is a decision about the user.',
  },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [modal, setModal] = useState<{
    type: 'screenshots' | 'video';
    project: 'keyat' | 'policybridge';
  } | null>(null);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ── Modals ──────────────────────────────────────────────── */}
      {modal?.type === 'screenshots' && (
        <ScreenshotModal project={modal.project} onClose={() => setModal(null)} />
      )}
      {modal?.type === 'video' && (
        <VideoModal project={modal.project} onClose={() => setModal(null)} />
      )}

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 bg-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            opacity: 0.35,
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(16, 185, 129, 0.09) 0%, transparent 65%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-[64px] font-extrabold tracking-tight mb-5 text-slate-900 leading-[1.08]">
                Africa's software studio.
                <br />
                <span className="text-emerald-700">We build products that ship.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
                We turn complex problems into software that works — on time, on budget, built to scale.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/26776051623"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg font-semibold transition-all text-sm shadow-sm shadow-green-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp us
                </a>
                <Link
                  href="#work"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold transition-all text-sm"
                >
                  See our work <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Trusted By Marquee ───────────────────────────────────── */}
      <FadeIn delay={200}>
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)' }} />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)' }} />

              <div style={{ display: 'flex', overflow: 'hidden' }}>
                {([0, 1] as const).map((trackIdx) => (
                  <div
                    key={trackIdx}
                    aria-hidden={trackIdx === 1}
                    className="animate-marquee"
                    style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                  >
                    {(
                      [
                        { type: 'img' as const, src: '/clients/paragon-logo.png', alt: 'Paragon Insurance Brokers', height: '50px', filter: 'grayscale(1) brightness(0.5)', opacity: 0.7 },
                        { type: 'text' as const, name: 'Winning Pillar' },
                        { type: 'img' as const, src: '/clients/alfa-first-logo.png', alt: 'Alfa-First Projects', height: '54px', filter: 'grayscale(1) brightness(0.5)', opacity: 0.7 },
                        { type: 'img' as const, src: '/clients/keyat-logo.png', alt: 'Keyat Real Estate', height: '34px', filter: 'none', opacity: 0.55 },
                        { type: 'text' as const, name: 'Botswana Savings Bank' },
                        { type: 'text' as const, name: 'Gaborone Tech Hub' },
                        { type: 'text' as const, name: 'Innovate Botswana' },
                      ] as (
                        | { type: 'img'; src: string; alt: string; height: string; filter: string; opacity: number }
                        | { type: 'text'; name: string }
                      )[]
                    ).map((item, i) =>
                      item.type === 'img' ? (
                        <img
                          key={i}
                          src={item.src}
                          alt={item.alt}
                          style={{
                            height: item.height,
                            width: 'auto',
                            objectFit: 'contain',
                            flexShrink: 0,
                            padding: '0 40px',
                            filter: item.filter,
                            opacity: item.opacity,
                          }}
                        />
                      ) : (
                        <span
                          key={i}
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#94a3b8',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            padding: '0 40px',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase' as const,
                          }}
                        >
                          {item.name}
                        </span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-6 tracking-wide">Trusted by businesses across Botswana</p>
          </div>
        </div>
      </FadeIn>

      {/* ── Services ────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-xl mb-14">
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-3">What we build</p>
              <h2 className="text-4xl font-extrabold mb-4 text-slate-900 tracking-tight">End-to-end software development</h2>
              <p className="text-slate-500 leading-relaxed">From concept to deployment — we own the full stack and deliver on time.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            <FadeIn delay={0} className="md:col-span-1">
              <div className="bg-white border border-slate-200 rounded-xl p-7 hover:border-emerald-200 hover:shadow-md transition-all group h-full flex flex-col">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mb-5 flex-shrink-0">
                  <Code2 className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">Web Applications</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">React, Next.js — responsive, performant, and accessible. From marketing sites to full SaaS platforms.</p>
                <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {['Next.js', 'React', 'TypeScript', 'Tailwind'].map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="bg-white border border-slate-200 rounded-xl p-7 hover:border-slate-300 hover:shadow-sm transition-all group h-full flex flex-col">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-5 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                  <Smartphone className="text-slate-600" size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">Mobile Apps</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">React Native, Flutter — cross-platform apps with native performance, built for low-bandwidth environments.</p>
                <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {['React Native', 'Flutter', 'Offline-first'].map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="bg-white border border-slate-200 rounded-xl p-7 hover:border-slate-300 hover:shadow-sm transition-all group h-full flex flex-col">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-5 flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                  <Database className="text-slate-600" size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">Backend & APIs</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">Node.js, Python, PostgreSQL — scalable, secure, and cloud-native architectures with Row-Level Security.</p>
                <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {['Node.js', 'PostgreSQL', 'Supabase', 'AWS'].map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────── */}
      <section id="work" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-xl mb-14">
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-3">Live products</p>
              <h2 className="text-4xl font-extrabold mb-4 text-slate-900 tracking-tight">Solutions that ship</h2>
              <p className="text-slate-500 leading-relaxed">Real products used by real customers in Botswana and beyond.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">

            {/* ── Keyat ── */}
            <FadeIn delay={80}>
              <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-200 hover:shadow-lg transition-all duration-300">

                <Link href="/projects/keyat" className="block">
                  <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden flex items-end">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Building2 size={120} className="text-emerald-800" />
                    </div>
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.06) 100%)`
                    }} />
                    {/* Replace with: <img src="/screenshots/keyat.png" alt="Keyat" className="absolute inset-0 w-full h-full object-cover object-top" /> */}
                    <div className="relative z-10 p-5 w-full">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-700 font-semibold">Live · keyat.vercel.app</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="p-7">
                  <Link href="/projects/keyat" className="block group/link">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Keyat</h3>
                        <p className="text-sm text-slate-400 mt-0.5">Real Estate Platform · Botswana</p>
                      </div>
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="text-emerald-700" size={20} />
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-5">
                      Property marketplace with Orange Money payments, offline-first PWA architecture, and verified listings across Gaborone.
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {['Next.js', 'Supabase', 'PWA'].map(tech => (
                          <span key={tech} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-medium">{tech}</span>
                        ))}
                      </div>
                      <div className="flex items-center text-emerald-700 text-sm font-semibold gap-1 group-hover:gap-2 transition-all flex-shrink-0 ml-3">
                        Explore <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>

                  <ProjectActions
                    project="keyat"
                    siteUrl="https://keyat.vercel.app"
                    onScreenshots={() => setModal({ type: 'screenshots', project: 'keyat' })}
                    onVideo={() => setModal({ type: 'video', project: 'keyat' })}
                  />
                </div>
              </div>
            </FadeIn>

            {/* ── PolicyBridge ── */}
            <FadeIn delay={160}>
              <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all duration-300">

                <Link href="/projects/policybridge" className="block">
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden flex items-end">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Shield size={120} className="text-blue-800" />
                    </div>
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(37,99,235,0.06) 100%)`
                    }} />
                    {/* Replace with: <img src="/screenshots/policybridge.png" alt="PolicyBridge" className="absolute inset-0 w-full h-full object-cover object-top" /> */}
                    <div className="relative z-10 p-5 w-full">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-xs text-blue-700 font-semibold">Beta · policybridge.vercel.app</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="p-7">
                  <Link href="/projects/policybridge" className="block group/link">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">PolicyBridge</h3>
                        <p className="text-sm text-slate-400 mt-0.5">Insurance Management SaaS</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="text-blue-600" size={20} />
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-5">
                      Multi-tenant platform for insurance brokers. Automates client management, policy tracking, and compliance PDF generation.
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {['Next.js', 'PostgreSQL', 'Puppeteer'].map(tech => (
                          <span key={tech} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-medium">{tech}</span>
                        ))}
                      </div>
                      <div className="flex items-center text-blue-600 text-sm font-semibold gap-1 group-hover:gap-2 transition-all flex-shrink-0 ml-3">
                        Explore <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>

                  <ProjectActions
                    project="policybridge"
                    siteUrl="https://policybridge.vercel.app"
                    onScreenshots={() => setModal({ type: 'screenshots', project: 'policybridge' })}
                    onVideo={() => setModal({ type: 'video', project: 'policybridge' })}
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={240}>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <a href="https://keyat.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-3.5 border border-dashed border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/40 transition-all group">
                <span className="text-sm text-slate-500 group-hover:text-emerald-700 font-medium">Visit keyat.vercel.app</span>
                <ExternalLink size={14} className="text-slate-400 group-hover:text-emerald-600" />
              </a>
              <a href="https://policybridge.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-3.5 border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/40 transition-all group">
                <span className="text-sm text-slate-500 group-hover:text-blue-600 font-medium">Visit policybridge.vercel.app</span>
                <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-500" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────────────── */}
      <section id="team" className="py-24 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-xl mb-14">
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-3">Our team</p>
              <h2 className="text-4xl font-extrabold mb-4 text-slate-900 tracking-tight">The people behind the code</h2>
              <p className="text-slate-500 leading-relaxed">A tight-knit team of engineers and designers who care deeply about building for Africa.</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamMembers.map((member, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                      {member.initial}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                      <p className="text-slate-500 text-xs font-medium mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3 border-l-2 border-slate-100 pl-3 italic">
                    "{member.quote}"
                  </p>
                  <p className="text-slate-400 text-xs font-medium">{member.expertise}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 border border-dashed border-slate-200 rounded-xl bg-white/60">
              <div className="flex-1">
                <p className="text-slate-700 font-semibold text-sm">Want to join the team?</p>
                <p className="text-slate-400 text-xs mt-0.5">We're always looking for engineers who care about Africa's digital future.</p>
              </div>
              <a href="mailto:careers@bitroot.tech"
                className="inline-flex items-center gap-1.5 text-emerald-700 text-sm font-semibold hover:gap-2.5 transition-all flex-shrink-0">
                View open positions <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-3xl mx-auto text-center px-6">
          <FadeIn>
            <div className="w-10 h-0.5 bg-emerald-500 mx-auto mb-7 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight">
              Ready to build your
              <br />next product?
            </h2>
            <p className="text-slate-400 text-lg mb-3 leading-relaxed">
              We have capacity for <strong className="text-white">2 new projects</strong> in Q2 2026.
            </p>
            <p className="text-slate-500 text-sm mb-10">No commitment. Just a conversation about your problem.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/26776051623"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg font-semibold text-sm transition-colors shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp us now
              </a>
              <a
                href="mailto:hello@bitroot.tech"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-semibold text-sm transition-colors"
              >
                Send an email <ArrowRight size={16} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Floating WhatsApp Button ─────────────────────────────── */}
      <a
        href="https://wa.me/26776051623"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
        style={{ boxShadow: '0 4px 24px rgba(37,211,102,0.35)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-semibold">Chat with us</span>
      </a>

    </div>
  );
}