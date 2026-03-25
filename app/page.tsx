'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Code2, Database, Globe, 
  Smartphone, Shield, Users, Building2, 
  CreditCard, FileText, MapPin, Search, Award,
  Rocket, BarChart3, ChevronRight
} from 'lucide-react';

function TypedSuffix({ 
  prefix, 
  suffixes, 
  typingSpeed = 80, 
  deletingSpeed = 40, 
  pauseTime = 2000 
}: { 
  prefix: string; 
  suffixes: string[]; 
  typingSpeed?: number; 
  deletingSpeed?: number; 
  pauseTime?: number;
}) {
  const [currentSuffixIndex, setCurrentSuffixIndex] = useState(0);
  const [currentDisplaySuffix, setCurrentDisplaySuffix] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullSuffix = suffixes[currentSuffixIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentDisplaySuffix === currentFullSuffix) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && currentDisplaySuffix === '') {
      setIsDeleting(false);
      setCurrentSuffixIndex((prev) => (prev + 1) % suffixes.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(() => {
        setCurrentDisplaySuffix((prev) => {
          if (!isDeleting) return currentFullSuffix.slice(0, prev.length + 1);
          else return currentFullSuffix.slice(0, prev.length - 1);
        });
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentDisplaySuffix, isDeleting, currentSuffixIndex, suffixes, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span>
      {prefix}{' '}
      {/* Muted emerald — not screaming green */}
      <span className="text-emerald-700 border-r-2 border-emerald-600 pr-1">
        {currentDisplaySuffix}
      </span>
    </span>
  );
}

const trustedCompanies = [
  { name: 'Paragon Insurance Brokers' },
  { name: 'Alfa-First Insurance' },
  { name: 'Winning Pillar' },
  { name: 'Keyat Real Estate' },
  { name: 'Botswana Savings Bank' },
  { name: 'Gaborone Tech Hub' },
  { name: 'Innovate Botswana' },
];

const builtSuffixes = ['to Scale', 'for the Web', 'for Android & iOS', 'for the Market'];

function useInView() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.1 }
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
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `all 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
      className={className}
    >
      {children}
    </div>
  );
}

const teamMembers = [
  { name: 'Thabo Molefe', role: 'CTO & Co-founder', expertise: 'System Architecture, Cloud', image: 'T', color: 'bg-emerald-50 text-emerald-700' },
  { name: 'Kabelo Dlamini', role: 'Lead Frontend Engineer', expertise: 'React, Next.js, PWA', image: 'K', color: 'bg-blue-50 text-blue-600' },
  { name: 'Lebo Ncube', role: 'Backend & Database Lead', expertise: 'PostgreSQL, Supabase', image: 'L', color: 'bg-violet-50 text-violet-600' },
  { name: 'Tumelo Moeng', role: 'Mobile Developer', expertise: 'React Native, Flutter', image: 'T', color: 'bg-amber-50 text-amber-600' },
  { name: 'Goitseone Phiri', role: 'Product Manager', expertise: 'Fintech, Real Estate', image: 'G', color: 'bg-rose-50 text-rose-600' },
  { name: 'Mpho Sebina', role: 'UI/UX Designer', expertise: 'Design Systems, Accessibility', image: 'M', color: 'bg-cyan-50 text-cyan-600' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-28 bg-white">
        {/* Very subtle grid pattern — Supabase-style */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #e2e8f020 1px, transparent 1px),
                              linear-gradient(to bottom, #e2e8f020 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Soft green radial glow — not a green block */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(16, 185, 129, 0.07) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge — understated */}
              <div className="inline-flex items-center gap-2 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-full px-3.5 py-1 text-xs font-medium mb-8 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Trusted by African businesses since 2023
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
                Web & Mobile Apps
                <br />
                <TypedSuffix prefix="Built" suffixes={builtSuffixes} />
              </h1>

              <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                We design and develop enterprise-grade software that solves real problems in emerging markets. 
                From real estate marketplaces to insurance platforms — we deliver.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {/* Primary: filled emerald — used ONCE, not everywhere */}
                <a
                  href="mailto:hello@bitroot.tech"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold transition-all text-sm shadow-sm"
                >
                  Start a Project <ArrowRight size={15} />
                </a>
                {/* Secondary: clean border */}
                <Link
                  href="#work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold transition-all text-sm"
                >
                  See Our Work <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Marquee — toned down */}
          <div className="mt-20 overflow-hidden">
            <p className="text-center text-xs text-slate-400 mb-5 uppercase tracking-widest font-medium">Trusted by</p>
            <div className="relative">
              <div className="animate-marquee inline-flex gap-12">
                {trustedCompanies.concat(trustedCompanies).map((company, idx) => (
                  <span key={idx} className="text-slate-400 text-sm font-medium px-4 py-2 whitespace-nowrap">
                    {company.name}
                  </span>
                ))}
              </div>
              <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center max-w-xl mx-auto mb-14">
              {/* Section label — small emerald text, not a green badge */}
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-2">What We Do</p>
              <h2 className="text-3xl font-extrabold mb-3 text-slate-900">End-to-End Software Development</h2>
              <p className="text-slate-500 text-sm leading-relaxed">From concept to deployment, we build solutions that scale with your business.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Code2, title: 'Web Applications', desc: 'React, Next.js, Vue — responsive, performant, and accessible web apps.' },
              { icon: Smartphone, title: 'Mobile Apps', desc: 'React Native, Flutter — cross-platform apps with native performance.' },
              { icon: Database, title: 'Backend & APIs', desc: 'Node.js, Python, PostgreSQL — scalable serverless and cloud architectures.' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white border border-slate-200 rounded-xl p-7 hover:border-emerald-200 hover:shadow-sm transition-all group">
                  {/* Icon: small, refined */}
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                    <s.icon className="text-emerald-700" size={20} />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-slate-900">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────── */}
      <section id="work" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center max-w-xl mx-auto mb-14">
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-2">Live Projects</p>
              <h2 className="text-3xl font-extrabold mb-3 text-slate-900">Solutions That Ship</h2>
              <p className="text-slate-500 text-sm leading-relaxed">Real products used by real customers in Botswana and beyond.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Keyat */}
            <FadeIn delay={100}>
              <Link href="/projects/keyat" className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-200 hover:shadow-md transition-all">
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="text-emerald-700" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Keyat</h3>
                      <p className="text-xs text-slate-400">Real Estate Platform</p>
                    </div>
                    {/* Status dot — small, not a shouting badge */}
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs text-slate-400 font-medium">Live</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    Property marketplace with Orange Money payments, offline-first PWA, and 29+ verified listings in Gaborone.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Next.js', 'Supabase', 'PWA', 'Orange Money'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-medium">{tech}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center text-emerald-700 text-sm font-semibold gap-1 group-hover:gap-2 transition-all">
                    Explore Keyat <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* PolicyBridge */}
            <FadeIn delay={180}>
              <Link href="/projects/policybridge" className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all">
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">PolicyBridge</h3>
                      <p className="text-xs text-slate-400">Insurance Management SaaS</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-xs text-slate-400 font-medium">Beta</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    Multi-tenant platform for insurance brokers. Automates client management, policy tracking, and compliance PDF generation.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Next.js', 'PostgreSQL', 'Row-Level Security', 'Puppeteer'].map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-medium">{tech}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center text-blue-600 text-sm font-semibold gap-1 group-hover:gap-2 transition-all">
                    Explore PolicyBridge <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────────────── */}
      <section id="team" className="py-24 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center max-w-xl mx-auto mb-14">
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-2">Our Team</p>
              <h2 className="text-3xl font-extrabold mb-3 text-slate-900">The People Behind the Code</h2>
              <p className="text-slate-500 text-sm leading-relaxed">A diverse, experienced team passionate about building for Africa.</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamMembers.map((member, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 hover:shadow-sm transition-all">
                  <div className={`w-16 h-16 mx-auto rounded-full ${member.color} flex items-center justify-center text-xl font-bold mb-4`}>
                    {member.image}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                  {/* Role in emerald — accent, not decoration */}
                  <p className="text-emerald-700 text-xs font-semibold mt-0.5 mb-1">{member.role}</p>
                  <p className="text-slate-400 text-xs">{member.expertise}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-slate-400 text-sm mb-3">Want to join our team?</p>
            <a href="mailto:careers@bitroot.tech" className="inline-flex items-center gap-1.5 text-emerald-700 text-sm font-semibold hover:gap-2.5 transition-all">
              View Open Positions <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      {/* No more solid green block — charcoal with green accent */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <FadeIn>
            {/* Small green accent line above heading */}
            <div className="w-10 h-0.5 bg-emerald-500 mx-auto mb-6 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Ready to Build Your Next Product?</h2>
            <p className="text-slate-400 text-base mb-8">Let's discuss how we can help bring your vision to life.</p>
            <a
              href="mailto:hello@bitroot.tech"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm"
            >
              Get in Touch <ArrowRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}