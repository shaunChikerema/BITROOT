'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Code2, Database,
  Smartphone, Shield, Building2,
  ChevronRight, MapPin, ExternalLink,
  Image as ImageIcon, Play, X, ChevronLeft, ChevronRight as ChevronRightIcon, Download
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
  project: 'keyat' | 'policybridge' | 'shaun' | 'paragon';
  onClose: () => void;
};

const projectScreenshots: Record<'keyat' | 'policybridge' | 'shaun' | 'paragon', { src: string; caption: string }[]> = {
  keyat: [
    { src: '/screenshots/keyat/keyat-m-1.png',  caption: 'Homepage hero — Find your dream home' },
    { src: '/screenshots/keyat/keyat-m-2.png',  caption: 'Hero slider — Find your apartment' },
    { src: '/screenshots/keyat/keyat-m-3.png',  caption: 'Sign in — Google, Facebook & email auth' },
    { src: '/screenshots/keyat/keyat-m-4.png',  caption: 'Create account — multi-provider sign-up' },
    { src: '/screenshots/keyat/keyat-m-5.png',  caption: 'Tenant dashboard — featured & latest listings' },
    { src: '/screenshots/keyat/keyat-m-6.png',  caption: 'Latest listings — real Gaborone properties' },
    { src: '/screenshots/keyat/keyat-m-7.png',  caption: 'Landlord dashboard — 11 listings overview' },
    { src: '/screenshots/keyat/keyat-m-8.png',  caption: 'My Properties — filterable listings manager' },
    { src: '/screenshots/keyat/keyat-m-9.png',  caption: 'Agent dashboard — listings & market view' },
    { src: '/screenshots/keyat/keyat-m-10.png', caption: 'Featured Properties — verified listings with pricing' },
  ],
  policybridge: [
    { src: '/screenshots/pb-dashboard.png', caption: 'Broker dashboard — client overview' },
    { src: '/screenshots/pb-policy.png', caption: 'Policy tracking & renewal management' },
    { src: '/screenshots/pb-pdf.png', caption: 'Auto-generated compliance PDF output' },
  ],
  paragon: [
    { src: '/screenshots/paragon/paragon-1.png',  caption: 'Homepage hero — Compare Life Insurance from Botswana\'s Top Providers' },
    { src: '/screenshots/paragon/paragon-2.png',  caption: 'Hero slide 2 — Get Your Quote Within 1 Hour' },
    { src: '/screenshots/paragon/paragon-3.png',  caption: 'Our Partners — Compare Leading Insurers' },
    { src: '/screenshots/paragon/paragon-4.png',  caption: 'Provider cards — Hollard Life & Bona Life' },
    { src: '/screenshots/paragon/paragon-5.png',  caption: 'How It Works — 3-step simple process' },
    { src: '/screenshots/paragon/paragon-6.png',  caption: 'Step 3 & CTA — Ready to Protect Your Family?' },
    { src: '/screenshots/paragon/paragon-7.png',  caption: 'About page — Licensed by NBFIRA' },
    { src: '/screenshots/paragon/paragon-8.png',  caption: 'Our Story — We work for you, not the insurers' },
    { src: '/screenshots/paragon/paragon-9.png',  caption: 'Contact Us — Office & WhatsApp channels' },
    { src: '/screenshots/paragon/paragon-10.png', caption: 'Location map — Kgale Terrace, Gaborone' },
  ],
  shaun: [
    { src: '/screenshots/shaun-chikerema/01-hero.png', caption: 'Hero — name, tagline, and CTAs' },
    { src: '/screenshots/shaun-chikerema/02-work-section.png', caption: 'Production Projects section header' },
    { src: '/screenshots/shaun-chikerema/03-keyat-card.png', caption: 'Keyat project card with real estate screenshot' },
    { src: '/screenshots/shaun-chikerema/04-paragon-card.png', caption: 'Paragon Insurance card with live screenshot' },
    { src: '/screenshots/shaun-chikerema/05-blackdice-card.png', caption: 'BlackDice — Android music player card' },
    { src: '/screenshots/shaun-chikerema/06-experience-section.png', caption: 'Background, education & core stack' },
    { src: '/screenshots/shaun-chikerema/07-skills-fullstack.png', caption: 'Technical Skills — Full-Stack Web' },
    { src: '/screenshots/shaun-chikerema/08-skills-mobile-backend.png', caption: 'Technical Skills — Mobile & Backend' },
    { src: '/screenshots/shaun-chikerema/09-how-i-work.png', caption: '"How I Work" principles section' },
    { src: '/screenshots/shaun-chikerema/10-contact.png', caption: 'Contact section — based in Gaborone' },
  ],
};

const projectVideos: Record<'keyat' | 'policybridge', { url: string; title: string }> = {
  keyat: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Keyat — Product Walkthrough' },
  policybridge: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'PolicyBridge — Product Walkthrough' },
};

function ScreenshotModal({ project, onClose }: ScreenshotModalProps) {
  const [idx, setIdx] = useState(0);
  const shots = projectScreenshots[project];
  const accentColor = project === 'keyat' ? 'bg-emerald-600' : project === 'policybridge' ? 'bg-blue-600' : project === 'paragon' ? 'bg-cyan-500' : 'bg-emerald-500';

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
            <span className="text-sm font-semibold text-slate-700 capitalize">{project === 'shaun' ? 'Shaun Chikerema' : project === 'paragon' ? 'Paragon Insurance' : project}</span>
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
          <img
            src={shots[idx].src}
            alt={shots[idx].caption}
            className="w-full h-full object-cover object-top"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-3 -z-10">
            <ImageIcon size={48} strokeWidth={1} />
            <p className="text-xs font-medium text-slate-400">{shots[idx].src}</p>
          </div>

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

// ── Marquee items ──────────────────────────────────────────────────────────
//
// Per-logo filter strategy:
//
//   Paragon    — transparent PNG, coloured mark
//                → grayscale(1) brightness(0.4) — standard greyscale darkening
//
//   Alfa-First — solid BLACK background PNG
//                → invert(1) flips black bg → white, dark marks → light
//                   grayscale(1) neutralises colour cast
//                   brightness(0.35) re-darkens the marks to a readable grey
//                   No mix-blend-mode needed — bg is now white, not black
//
//   Keyat      — solid BLACK background PNG, dark-navy "KEYAT" text + gold icon
//                → same invert(1) trick: black→white, navy→light-grey (readable),
//                   gold→blue-grey (acceptable in greyscale)
//                   brightness(0.45) to darken marks back to visible grey
//
// Height calibration — visual ink area, not bounding box:
//   Paragon is portrait/tall → 52px
//   Alfa-First is wide/short → 58px (extra height to match visual weight)
//   Keyat is very wide       → 42px (text already reads large)
// ─────────────────────────────────────────────────────────────────────────────
type MarqueeImg  = {
  type: 'img';
  src: string;
  alt: string;
  height: string;
  filter: string;
  opacity: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
};
type MarqueeText = { type: 'text'; name: string };
type MarqueeItem = MarqueeImg | MarqueeText;

const marqueeItems: MarqueeItem[] = [
  {
    // Transparent PNG — greyscale + darken
    type: 'img',
    src: '/clients/paragon-logo.png',
    alt: 'Paragon Insurance Brokers',
    height: '52px',
    filter: 'grayscale(1) brightness(0.4)',
    opacity: 0.8,
  },
  { type: 'text', name: 'Winning Pillar' },
  {
    // Black bg PNG — invert flips bg to white, marks to light tones,
    // then brightness re-darkens them to a visible medium grey
    type: 'img',
    src: '/clients/alfa-first-logo.png',
    alt: 'Alfa-First Projects',
    height: '58px',
    filter: 'invert(1) grayscale(1) brightness(0.35)',
    opacity: 0.82,
  },
  {
    // Black bg PNG — same invert trick; navy "KEYAT" text becomes legible grey
    type: 'img',
    src: '/clients/keyat-logo.png',
    alt: 'Keyat Real Estate',
    height: '42px',
    filter: 'invert(1) grayscale(1) brightness(0.45)',
    opacity: 0.8,
  },
  { type: 'text', name: 'Botswana Savings Bank' },
  { type: 'text', name: 'Gaborone Tech Hub' },
  { type: 'text', name: 'Innovate Botswana' },
];

// ── Keyat Slideshow ────────────────────────────────────────────────────────

const KEYAT_SHOTS = [
  { src: '/screenshots/keyat/keyat-m-1.png',  label: 'Hero' },
  { src: '/screenshots/keyat/keyat-m-5.png',  label: 'Tenant' },
  { src: '/screenshots/keyat/keyat-m-7.png',  label: 'Landlord' },
  { src: '/screenshots/keyat/keyat-m-9.png',  label: 'Agent' },
  { src: '/screenshots/keyat/keyat-m-10.png', label: 'Listings' },
];

function KeyatSlideshow({ onOpen }: { onOpen: () => void }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % KEYAT_SHOTS.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => { setIdx(i); setFading(false); }, 300);
  };

  return (
    <div className="relative h-96 lg:h-auto overflow-hidden bg-slate-100 cursor-pointer" onClick={onOpen}>
      {KEYAT_SHOTS.map((shot, i) => (
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.label}
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
          style={{ opacity: i === idx ? (fading ? 0 : 1) : 0 }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/30 transition-all duration-300 flex items-center justify-center group">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-slate-800 text-xs font-semibold shadow-lg">
          <ImageIcon size={13} /> View all 10 screenshots
        </span>
      </div>
      <div className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-semibold text-white/70 uppercase tracking-widest">{KEYAT_SHOTS[idx].label}</span>
        <div className="flex gap-1.5 pointer-events-auto">
          {KEYAT_SHOTS.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); goTo(i); }}
              className={`rounded-full transition-all duration-300 ${i === idx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Show screenshot ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Paragon Slideshow ──────────────────────────────────────────────────────

const PARAGON_SHOTS = [
  { src: '/screenshots/paragon/paragon-1.png',  label: 'Hero' },
  { src: '/screenshots/paragon/paragon-3.png',  label: 'Partners' },
  { src: '/screenshots/paragon/paragon-5.png',  label: 'Process' },
  { src: '/screenshots/paragon/paragon-6.png',  label: 'CTA' },
  { src: '/screenshots/paragon/paragon-9.png',  label: 'Contact' },
];

function ParagonSlideshow({ onOpen }: { onOpen: () => void }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % PARAGON_SHOTS.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => { setIdx(i); setFading(false); }, 300);
  };

  return (
    <div className="relative h-96 lg:h-auto overflow-hidden bg-slate-100 cursor-pointer" onClick={onOpen}>
      {PARAGON_SHOTS.map((shot, i) => (
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.label}
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
          style={{ opacity: i === idx ? (fading ? 0 : 1) : 0 }}
        />
      ))}

      {/* Gradient for dot legibility */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/30 transition-all duration-300 flex items-center justify-center group">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-slate-800 text-xs font-semibold shadow-lg">
          <ImageIcon size={13} /> View all 10 screenshots
        </span>
      </div>

      {/* Dot nav + label */}
      <div className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-semibold text-white/70 uppercase tracking-widest">{PARAGON_SHOTS[idx].label}</span>
        <div className="flex gap-1.5 pointer-events-auto">
          {PARAGON_SHOTS.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); goTo(i); }}
              className={`rounded-full transition-all duration-300 ${i === idx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Show screenshot ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Portfolio Slideshow ────────────────────────────────────────────────────

const SLIDESHOW_SHOTS = [
  { src: '/screenshots/shaun-chikerema/03-keyat-card.png',        label: 'Projects' },
  { src: '/screenshots/shaun-chikerema/01-hero.png',              label: 'Hero' },
  { src: '/screenshots/shaun-chikerema/09-how-i-work.png',        label: 'How I Work' },
  { src: '/screenshots/shaun-chikerema/07-skills-fullstack.png',  label: 'Skills' },
  { src: '/screenshots/shaun-chikerema/10-contact.png',           label: 'Contact' },
];

function PortfolioSlideshow({ onOpen }: { onOpen: () => void }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  // Auto-rotate every 3 s
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % SLIDESHOW_SHOTS.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => { setIdx(i); setFading(false); }, 300);
  };

  return (
    <div className="relative h-96 lg:h-auto overflow-hidden order-last lg:order-first bg-slate-900 cursor-pointer" onClick={onOpen}>
      {/* Images — stack all, show active */}
      {SLIDESHOW_SHOTS.map((shot, i) => (
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.label}
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
          style={{ opacity: i === idx ? (fading ? 0 : 1) : 0 }}
        />
      ))}

      {/* Dark gradient at bottom for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/70 to-transparent pointer-events-none" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/30 transition-all duration-300 flex items-center justify-center group">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-slate-800 text-xs font-semibold shadow-lg">
          <ImageIcon size={13} /> View all 10 screenshots
        </span>
      </div>

      {/* Dot nav + label */}
      <div className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-semibold text-white/70 uppercase tracking-widest">{SLIDESHOW_SHOTS[idx].label}</span>
        <div className="flex gap-1.5 pointer-events-auto">
          {SLIDESHOW_SHOTS.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); goTo(i); }}
              className={`rounded-full transition-all duration-300 ${i === idx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Show screenshot ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [modal, setModal] = useState<{
    type: 'screenshots' | 'video';
    project: 'keyat' | 'policybridge' | 'shaun' | 'paragon';
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
      {/*
        FIX NOTES:
        1. Outer wrapper uses overflow-hidden + flex via className (not inline style)
           so Tailwind purge picks it up and there's no style conflict.
        2. Two identical tracks side-by-side. Both run animate-marquee which
           translates -100% over 25 s. Because each track is min-width:100% the
           second track starts exactly where the first ends, giving a seamless loop.
        3. Keyat logo now uses the same greyscale filter as all other logos so the
           dark background doesn't stand out.
      */}
      <FadeIn delay={200}>
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-6">
            {/*
              MARQUEE FIX:
              - Single overflow-hidden wrapper only (no nested one)
              - Two tracks side-by-side, each width: max-content so the browser
                measures the real pixel width of all items
              - Both tracks translate -100% of THEIR OWN width over 25s
              - When track 1 exits left, track 2 (which started immediately after)
                fills the gap — seamless, no jump, no gap
            */}
            <div className="relative overflow-hidden">
              {/* left fade */}
              <div
                className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)' }}
              />
              {/* right fade */}
              <div
                className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)' }}
              />

              {/* ── scrolling track ── */}
              <div style={{ display: 'flex', width: 'max-content' }}>
                {([0, 1] as const).map((trackIdx) => (
                  <div
                    key={trackIdx}
                    aria-hidden={trackIdx === 1}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: 'max-content',
                      flexShrink: 0,
                      animation: 'marquee 25s linear infinite',
                    }}
                  >
                    {marqueeItems.map((item, i) =>
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
                            padding: '0 48px',
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
                            padding: '0 48px',
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

          {/* Section header */}
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
              <div>
                <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-3">Our work</p>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Products & client work
                </h2>
              </div>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed sm:text-right">
                From proprietary SaaS to client sites — all shipped, all live.
              </p>
            </div>
          </FadeIn>

          {/* ── Project rows ── */}
          <div className="space-y-6">

            {/* ── 01 · Keyat ── */}
            <FadeIn delay={60}>
              <div className="group relative grid lg:grid-cols-[1fr_420px] rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-200 hover:shadow-xl transition-all duration-500 bg-white">

                {/* Left — info */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold text-slate-300 tracking-widest">01</span>
                      <span className="h-px flex-1 bg-slate-100" />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-semibold text-emerald-700">Live</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">SaaS Product</span>
                    </div>

                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Keyat</h3>
                    <p className="text-sm text-slate-400 font-medium mb-5">Real Estate Platform · Botswana</p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-sm">
                      Property marketplace with Orange Money payments, offline-first PWA architecture, and verified listings across Gaborone.
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {['Next.js 15', 'TypeScript', 'Supabase', 'PostgreSQL', 'PWA'].map(t => (
                        <span key={t} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-xs rounded-lg font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://keyat.vercel.app"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all"
                    >
                      <ExternalLink size={12} /> Visit Site
                    </a>
                    <Link
                      href="/projects/keyat"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-all"
                    >
                      Case Study <ArrowRight size={12} />
                    </Link>
                    <button
                      onClick={() => setModal({ type: 'screenshots', project: 'keyat' })}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-all"
                    >
                      <ImageIcon size={12} /> Screenshots
                    </button>
                  </div>
                </div>

                {/* Right — auto-rotating slideshow */}
                <KeyatSlideshow onOpen={() => setModal({ type: 'screenshots', project: 'keyat' })} />
              </div>
            </FadeIn>

            {/* ── 02 · PolicyBridge ── */}
            <FadeIn delay={120}>
              <div className="group relative grid lg:grid-cols-[420px_1fr] rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all duration-500 bg-white">

                {/* Left — visual (reversed order) */}
                <div className="relative h-96 lg:h-auto bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-100 overflow-hidden order-last lg:order-first">
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
                    <Shield size={200} className="text-blue-900" />
                  </div>
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(59,130,246,0.15) 0%, transparent 60%)' }} />
                  {/* Swap for real screenshot: */}
                  {/* <img src="/screenshots/policybridge/policybridge-1.jpg" alt="PolicyBridge" className="absolute inset-0 w-full h-full object-cover object-top" /> */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm">
                      <p className="text-xs font-bold text-slate-700 mb-1">policybridge.vercel.app</p>
                      <p className="text-[11px] text-slate-400">Insurance SaaS · Multi-tenant</p>
                    </div>
                  </div>
                </div>

                {/* Right — info */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold text-slate-300 tracking-widest">02</span>
                      <span className="h-px flex-1 bg-slate-100" />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-[11px] font-semibold text-amber-700">Beta</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">SaaS Product</span>
                    </div>

                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">PolicyBridge</h3>
                    <p className="text-sm text-slate-400 font-medium mb-5">Insurance Management SaaS</p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-sm">
                      Multi-tenant platform for insurance brokers. Automates client management, policy tracking, and compliance PDF generation.
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {['Next.js 15', 'PostgreSQL', 'Node.js', 'Puppeteer', 'Redis'].map(t => (
                        <span key={t} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-xs rounded-lg font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://policybridge.vercel.app"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all"
                    >
                      <ExternalLink size={12} /> Visit Site
                    </a>
                    <Link
                      href="/projects/policybridge"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-all"
                    >
                      Case Study <ArrowRight size={12} />
                    </Link>
                    <button
                      onClick={() => setModal({ type: 'screenshots', project: 'policybridge' })}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-all"
                    >
                      <ImageIcon size={12} /> Screenshots
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── 03 · Paragon — Client Work ── */}
            <FadeIn delay={180}>
              <div className="group relative grid lg:grid-cols-[1fr_420px] rounded-2xl border border-slate-200 overflow-hidden hover:border-cyan-200 hover:shadow-xl transition-all duration-500 bg-white">

                {/* Left — info */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold text-slate-300 tracking-widest">03</span>
                      <span className="h-px flex-1 bg-slate-100" />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[11px] font-semibold text-cyan-700">Live</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Client Work</span>
                    </div>

                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Paragon Insurance Brokers</h3>
                    <p className="text-sm text-slate-400 font-medium mb-5">Marketing Site · Gaborone, Botswana</p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-sm">
                      Marketing website for a licensed NBFIRA insurance broker. Multi-page site with WhatsApp-integrated quote flow, provider showcase, and scroll animations.
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {['Next.js', 'Tailwind CSS', 'Vercel', 'WhatsApp API'].map(t => (
                        <span key={t} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-xs rounded-lg font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://paragoninsurancebrokers.co.bw"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-all"
                    >
                      <ExternalLink size={12} /> Visit Site
                    </a>
                    <button
                      onClick={() => setModal({ type: 'screenshots', project: 'paragon' })}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-all"
                    >
                      <ImageIcon size={12} /> Screenshots
                    </button>
                  </div>
                </div>

                {/* Right — auto-rotating slideshow */}
                <ParagonSlideshow onOpen={() => setModal({ type: 'screenshots', project: 'paragon' })} />
              </div>
            </FadeIn>

            {/* ── 04 · BlackDice ── */}
            <FadeIn delay={240}>
              <div className="group relative grid lg:grid-cols-[420px_1fr] rounded-2xl border border-slate-200 overflow-hidden hover:border-red-200 hover:shadow-xl transition-all duration-500 bg-white">

                {/* Left — dark visual */}
                <div className="relative h-96 lg:h-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden order-last lg:order-first">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 40% 50%, rgba(230,57,70,0.2) 0%, transparent 60%)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-24 h-24 rounded-full border-4 border-red-500/30 flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)' }}>
                        <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-slate-500" />
                        </div>
                      </div>
                      <div className="flex gap-1 items-end">
                        {[3,5,4,7,5,3,6,4,5,3,6,5].map((h, i) => (
                          <div key={i} className="w-1 rounded-full bg-red-500/60" style={{ height: h * 4 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <p className="text-xs font-bold text-white mb-1">BlackDice</p>
                      <p className="text-[11px] text-slate-400">Android · Offline-first music player</p>
                    </div>
                  </div>
                </div>

                {/* Right — info */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold text-slate-300 tracking-widest">04</span>
                      <span className="h-px flex-1 bg-slate-100" />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100">
                        <Smartphone size={10} className="text-red-500" />
                        <span className="text-[11px] font-semibold text-red-600">Android App</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Mobile</span>
                    </div>

                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">BlackDice</h3>
                    <p className="text-sm text-slate-400 font-medium mb-5">Local Music Player · Android</p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-sm">
                      Offline-first Android music player with a vinyl-themed UI, EQ visualizer synced to playback, and full queue management. No internet required.
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {['React Native', 'Expo SDK 54', 'TypeScript', 'expo-av', 'expo-media-library'].map(t => (
                        <span key={t} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-xs rounded-lg font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://expo.dev/artifacts/eas/eca90fc4-8707-470e-b804-4ae59e23edb1.apk"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all"
                    >
                      <Download size={12} /> Download APK
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── 05 · Yonder ── */}
            <FadeIn delay={300}>
              <div className="group relative grid lg:grid-cols-[1fr_420px] rounded-2xl border border-slate-200 overflow-hidden hover:border-amber-200 hover:shadow-xl transition-all duration-500 bg-white">

                {/* Left — info */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold text-slate-300 tracking-widest">05</span>
                      <span className="h-px flex-1 bg-slate-100" />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100">
                        <Smartphone size={10} className="text-amber-500" />
                        <span className="text-[11px] font-semibold text-amber-700">iOS & Android</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Mobile</span>
                    </div>

                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Yonder</h3>
                    <p className="text-sm text-slate-400 font-medium mb-5">Public Domain Audiobook Player</p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-sm">
                      Streams real LibriVox recordings from archive.org with chapter navigation, playback speed control, sleep timer, bookmarks, and a warm amber-themed UI.
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {['React Native', 'Expo SDK 54', 'TypeScript', 'expo-av', 'AsyncStorage'].map(t => (
                        <span key={t} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-xs rounded-lg font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl cursor-not-allowed">
                      <Smartphone size={12} /> Coming to App Store
                    </span>
                  </div>
                </div>

                {/* Right — warm visual */}
                <div className="relative h-96 lg:h-auto bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(245,166,35,0.2) 0%, transparent 60%)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-28 bg-amber-800/10 rounded-lg border border-amber-200 flex items-center justify-center">
                        <div className="text-3xl">📖</div>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-32 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                          <div className="w-1/2 h-full bg-amber-500 rounded-full" />
                        </div>
                        <p className="text-[10px] text-amber-600 font-medium">Chapter 4 of 12</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-amber-100 shadow-sm">
                      <p className="text-xs font-bold text-slate-700 mb-1">Yonder</p>
                      <p className="text-[11px] text-slate-400">8 audiobooks · LibriVox · Free forever</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── 06 · Shaun Chikerema — Portfolio ── */}
            <FadeIn delay={360}>
              <div className="group relative grid lg:grid-cols-[420px_1fr] rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-200 hover:shadow-xl transition-all duration-500 bg-white">

                {/* Left — auto-rotating slideshow */}
                <PortfolioSlideshow onOpen={() => setModal({ type: 'screenshots', project: 'shaun' })} />

                {/* Right — info */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold text-slate-300 tracking-widest">06</span>
                      <span className="h-px flex-1 bg-slate-100" />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-semibold text-emerald-700">Live</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Client Work</span>
                    </div>

                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Shaun Chikerema</h3>
                    <p className="text-sm text-slate-400 font-medium mb-5">Developer Portfolio · Personal Brand Site</p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-sm">
                      Custom portfolio for BITROOT's founder — a bespoke design system, interactive screenshot lightbox, Framer Motion animations, and a fully responsive mobile layout.
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {['Next.js 15', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vercel'].map(t => (
                        <span key={t} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 text-xs rounded-lg font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="https://shaun-chikerema.vercel.app"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-white text-xs font-semibold rounded-xl transition-all"
                      style={{ background: '#3ECF8E' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      <ExternalLink size={12} /> Visit Site
                    </a>
                    <button
                      onClick={() => setModal({ type: 'screenshots', project: 'shaun' })}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-all"
                    >
                      <ImageIcon size={12} /> Screenshots
                    </button>
                    <Link
                      href="/projects/shaun-chikerema"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-all"
                    >
                      Case Study <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
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