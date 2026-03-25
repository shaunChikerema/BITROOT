'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Code2, Database, Globe, 
  Smartphone, Shield, Users, Building2, 
  CreditCard, FileText, MapPin, Search, Award,
  Rocket, BarChart3, ChevronRight
} from 'lucide-react';

// Typed suffix component - prefix stays static, suffix animates
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
          if (!isDeleting) {
            return currentFullSuffix.slice(0, prev.length + 1);
          } else {
            return currentFullSuffix.slice(0, prev.length - 1);
          }
        });
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentDisplaySuffix, isDeleting, currentSuffixIndex, suffixes, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span>
      {prefix}{' '}
      <span className="text-green-500 border-r-2 border-green-500 pr-1">
        {currentDisplaySuffix}
      </span>
    </span>
  );
}

// Trusted companies data
const trustedCompanies = [
  { name: 'Paragon Insurance Brokers' },
  { name: 'Alfa-First Insurance' },
  { name: 'Winning Pillar' },
  { name: 'Keyat Real Estate' },
  { name: 'Botswana Savings Bank' },
  { name: 'Gaborone Tech Hub' },
  { name: 'Innovate Botswana' },
];

// Phrases for typed animation
const builtSuffixes = [
  'to Scale',
  'for the Web',
  'for Android & iOS',
  'for the Market',
];

const worksOnSuffixes = [
  'Android',
  'iOS',
  'Web',
  'Desktop',
  'Tablet',
];

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
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
      className={className}
    >
      {children}
    </div>
  );
}

const teamMembers = [
  { name: 'Thabo Molefe', role: 'CTO & Co-founder', expertise: 'System Architecture, Cloud', image: 'T', color: 'bg-green-100 text-green-700' },
  { name: 'Kabelo Dlamini', role: 'Lead Frontend Engineer', expertise: 'React, Next.js, PWA', image: 'K', color: 'bg-blue-100 text-blue-700' },
  { name: 'Lebo Ncube', role: 'Backend & Database Lead', expertise: 'PostgreSQL, Supabase', image: 'L', color: 'bg-purple-100 text-purple-700' },
  { name: 'Tumelo Moeng', role: 'Mobile Developer', expertise: 'React Native, Flutter', image: 'T', color: 'bg-amber-100 text-amber-700' },
  { name: 'Goitseone Phiri', role: 'Product Manager', expertise: 'Fintech, Real Estate', image: 'G', color: 'bg-rose-100 text-rose-700' },
  { name: 'Mpho Sebina', role: 'UI/UX Designer', expertise: 'Design Systems, Accessibility', image: 'M', color: 'bg-cyan-100 text-cyan-700' },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-slate-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span>Trusted by African businesses since 2023</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900">
                Web & Mobile Apps
                <br />
                <TypedSuffix prefix="Built" suffixes={builtSuffixes} />
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We design and develop enterprise-grade software that solves real problems in emerging markets. 
                From real estate marketplaces to insurance platforms — we deliver.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a href="mailto:hello@bitroot.tech" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                  Start a Project <ArrowRight size={18} />
                </a>
                <Link href="#work" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:border-green-500 rounded-xl font-semibold transition-all">
                  See Our Work <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Trusted by - Infinite scroll marquee */}
          <div className="mt-20 overflow-hidden whitespace-nowrap">
            <p className="text-center text-sm text-slate-500 mb-4">Trusted by industry leaders</p>
            <div className="relative">
              <div className="animate-marquee inline-flex gap-12">
                {trustedCompanies.concat(trustedCompanies).map((company, idx) => (
                  <span key={idx} className="text-slate-400 text-lg font-medium px-4 py-2">
                    {company.name}
                  </span>
                ))}
              </div>
              <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Services / What We Do */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">What We Do</span>
              <h2 className="text-4xl font-extrabold mt-2 mb-4">End-to-End Software Development</h2>
              <p className="text-slate-600">From concept to deployment, we build solutions that scale with your business.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Code2, title: 'Web Applications', desc: 'React, Next.js, Vue — responsive, performant, and accessible web apps.' },
              { icon: Smartphone, title: 'Mobile Apps', desc: 'React Native, Flutter — cross-platform apps with native performance.' },
              { icon: Database, title: 'Backend & APIs', desc: 'Node.js, Python, PostgreSQL — scalable serverless and cloud architectures.' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-md transition-all">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                    <s.icon className="text-green-500" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="work" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Live Projects</span>
              <h2 className="text-4xl font-extrabold mt-2 mb-4">Solutions That Ship</h2>
              <p className="text-slate-600">Real products used by real customers in Botswana and beyond.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Keyat */}
            <FadeIn delay={100}>
              <Link href="/projects/keyat" className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-green-300 hover:shadow-xl transition-all">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                      <Building2 className="text-green-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-green-500 transition-colors">Keyat</h3>
                      <p className="text-sm text-slate-500">Real Estate Platform</p>
                    </div>
                    <span className="ml-auto text-green-500 text-sm font-medium">● LIVE</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Property marketplace with Orange Money payments, offline-first PWA, and 29+ verified listings in Gaborone.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'Supabase', 'PWA', 'Orange Money'].map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{tech}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center text-green-500 font-medium group-hover:translate-x-1 transition-transform">
                    Explore Keyat <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* PolicyBridge */}
            <FadeIn delay={200}>
              <Link href="/projects/policybridge" className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Shield className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">PolicyBridge</h3>
                      <p className="text-sm text-slate-500">Insurance Management SaaS</p>
                    </div>
                    <span className="ml-auto text-amber-600 text-sm font-medium">● BETA</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Multi-tenant platform for insurance brokers. Automates client management, policy tracking, and compliance PDF generation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'PostgreSQL', 'Row-Level Security', 'Puppeteer'].map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{tech}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                    Explore PolicyBridge <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Our Team</span>
              <h2 className="text-4xl font-extrabold mt-2 mb-4">The People Behind the Code</h2>
              <p className="text-slate-600">A diverse, experienced team passionate about building for Africa.</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition-all">
                  <div className={`w-24 h-24 mx-auto rounded-full ${member.color} flex items-center justify-center text-3xl font-bold mb-4`}>
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-green-500 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-slate-500 text-sm">{member.expertise}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 mb-4">Want to join our team?</p>
            <a href="mailto:careers@bitroot.tech" className="inline-flex items-center gap-2 text-green-500 font-semibold hover:gap-3 transition-all">
              View Open Positions <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-500 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Build Your Next Product?</h2>
            <p className="text-green-50 text-lg mb-8">Let's discuss how we can help bring your vision to life.</p>
            <a href="mailto:hello@bitroot.tech" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-500 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors shadow-lg">
              Get in Touch <ArrowRight size={20} />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}