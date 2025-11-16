'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Code2, Zap, Shield, Building2, Smartphone, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';

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

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" 
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          opacity: Math.max(0, 1 - scrollY / 1000)
        }}
      />

      {/* Hero */}
      <section 
        className="relative min-h-screen flex items-center px-6 md:px-12"
        onMouseMove={handleMouseMove}
      >
        <div 
          className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none"
          style={{
            transform: `translate(calc(-50% + ${(mousePos.x - 50) * 0.3}px), calc(-50% + ${(mousePos.y - 50) * 0.3}px))`,
            transition: 'transform 0.3s ease-out',
            opacity: Math.max(0.3, 1 - scrollY / 800)
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full py-32">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-sm mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-400">Live Beta • 29+ Properties Listed</span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Real Estate & Insurance Software
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                Built for Africa
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl leading-relaxed">
              Two live platforms replacing Excel, WhatsApp, and filing cabinets in Botswana's markets.
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-3xl">
              Works offline. Accepts mobile money. Built for emerging markets.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://keyat.vercel.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Browse Properties</span>
                <ExternalLink size={18} className="relative group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#products" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-all"
              >
                <span>See Both Platforms</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>

        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{ animation: 'scroll-line 2s infinite ease-in-out' }}
            />
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">The Market Reality</h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-6">
                Botswana's real estate and insurance sectors are worth hundreds of millions. 
                Yet most agencies still run on <span className="text-white">Excel spreadsheets, WhatsApp, and filing cabinets</span>.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                No modern property management. No automated document processing. No mobile money integration. 
                Just manual work that doesn't scale.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Live Platforms</h2>
            <p className="text-xl text-gray-500 mb-20 max-w-2xl">
              Built for Botswana. Available now.
            </p>
          </FadeIn>

          <div className="space-y-6">
            {/* Keyat */}
            <FadeIn delay={100}>
              <div className="group relative border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
                <div className="relative h-64 md:h-96 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center gap-4 p-8">
                    <div className="hidden md:block w-64 h-full rounded-2xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-90" />
                          <div className="text-sm font-semibold mb-2">Keyat Platform</div>
                          <div className="text-xs opacity-75">29+ Properties Live</div>
                          <div className="mt-4 text-xs bg-white/20 rounded-full px-3 py-1 inline-block">
                            Trusted in Botswana
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-64 h-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 z-10">
                      <div className="w-full h-full bg-white flex flex-col">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white">
                          <div className="text-sm opacity-90">Good morning,</div>
                          <div className="font-semibold">Tenant</div>
                        </div>
                        <div className="flex-1 p-4 space-y-3 bg-gray-50">
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100"></div>
                              <div>Your Activity</div>
                            </div>
                            <div className="text-xs text-gray-500">12 viewed • 2 tours</div>
                          </div>
                          <div className="bg-blue-600 rounded-lg p-3 text-white">
                            <div className="text-xs mb-1">Featured Property</div>
                            <div className="text-sm font-semibold">P38,899/month</div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-white rounded-lg p-2 text-center shadow-sm">
                              <div className="text-xs text-gray-600">Search</div>
                            </div>
                            <div className="flex-1 bg-white rounded-lg p-2 text-center shadow-sm">
                              <div className="text-xs text-gray-600">Favorites</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:block w-64 h-full rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="w-full h-full bg-white flex flex-col">
                        <div className="h-1/2 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-xs mb-2">Property Details</div>
                            <div className="text-lg font-bold">P38,899</div>
                            <div className="text-xs opacity-75">/month</div>
                          </div>
                        </div>
                        <div className="flex-1 p-4 space-y-2">
                          <div className="flex gap-2 text-xs">
                            <div className="flex-1 bg-gray-100 rounded p-2 text-center">3 BR</div>
                            <div className="flex-1 bg-gray-100 rounded p-2 text-center">2 BA</div>
                          </div>
                          <div className="bg-blue-600 text-white rounded-lg p-2 text-center text-xs">
                            Contact Landlord
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="p-8 md:p-12 bg-gradient-to-br from-white/[0.02] to-transparent">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-3xl font-bold group-hover:text-cyan-400 transition-colors">Keyat</h3>
                        <span className="px-2 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded">LIVE</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Real Estate Platform</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                    Live property marketplace with 29+ verified listings in Gaborone. Multi-tenant platform connecting tenants, landlords, and agents. 
                    <span className="text-white"> Orange Money payments enabled</span>.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-xl font-bold text-cyan-400">29+</div>
                      <div className="text-xs text-gray-500">Properties Live</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-xl font-bold text-cyan-400">PWA</div>
                      <div className="text-xs text-gray-500">Offline-first</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-xl font-bold text-cyan-400">Live</div>
                      <div className="text-xs text-gray-500">In Production</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://keyat.vercel.app" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-all"
                    >
                      <span>View Platform</span>
                      <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <a 
                      href="/projects/keyat"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 rounded-lg font-medium transition-all"
                    >
                      <span>Case Study</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* PolicyBridge */}
            <FadeIn delay={200}>
              <div className="group relative border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
                <div className="relative h-64 md:h-96 bg-gradient-to-br from-purple-900/20 to-blue-900/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full max-w-4xl h-full rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                      <div className="w-full h-full bg-white flex">
                        <div className="w-16 bg-gradient-to-b from-blue-600 to-purple-600 flex flex-col items-center py-4 gap-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                          <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                          <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                          <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                        </div>
                        <div className="flex-1 bg-gray-50 p-6">
                          <div className="mb-4">
                            <div className="text-sm text-gray-600 mb-1">Client Portfolio</div>
                            <div className="flex items-center gap-4">
                              <div className="bg-blue-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold">14 Clients</div>
                              <div className="bg-white rounded-lg px-3 py-1.5 text-xs border border-gray-200">BWP 50,200</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="text-xs text-gray-500 mb-1">Policies</div>
                              <div className="text-lg font-bold text-gray-800">24</div>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="text-xs text-gray-500 mb-1">Claims</div>
                              <div className="text-lg font-bold text-gray-800">3</div>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="text-xs text-gray-500 mb-1">Payments</div>
                              <div className="text-lg font-bold text-gray-800">12</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="text-xs font-semibold text-gray-700 mb-2">Recent Activity</div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <div className="text-gray-600">New Policy Created</div>
                                <div className="ml-auto text-gray-400">2h</div>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <div className="text-gray-600">Payslip Generated</div>
                                <div className="ml-auto text-gray-400">5h</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="p-8 md:p-12 bg-gradient-to-br from-white/[0.02] to-transparent">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-3xl font-bold group-hover:text-cyan-400 transition-colors">PolicyBridge</h3>
                        <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">LIVE BETA</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Insurance Management SaaS</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                    Insurance broker platform for client management, policy tracking, and automated payslip generation. 
                    <span className="text-white"> Built for Botswana's insurance market</span>.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-xl font-bold text-cyan-400">Auto</div>
                      <div className="text-xs text-gray-500">PDF Generation</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-xl font-bold text-cyan-400">Multi</div>
                      <div className="text-xs text-gray-500">Tenant SaaS</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-xl font-bold text-cyan-400">Beta</div>
                      <div className="text-xs text-gray-500">Testing Live</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://policybridge.vercel.app" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-all"
                    >
                      <span>View Platform</span>
                      <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <a 
                      href="/projects/policybridge"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 rounded-lg font-medium transition-all"
                    >
                      <span>Case Study</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Built For Reality */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Reality</h2>
            <p className="text-xl text-gray-500 mb-16 max-w-2xl">
              Not Silicon Valley assumptions. African market realities.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Smartphone, title: 'Offline-First', desc: 'PWAs that work when connectivity fails. Data syncs automatically when connection returns.' },
              { icon: Zap, title: 'Mobile Money', desc: 'Orange Money and MyZaka integration. Built-in reconciliation and fallback mechanisms.' },
              { icon: Shield, title: 'Multi-Tenant', desc: 'Row-level security at database level. Scale from 10 to 10,000 organizations safely.' }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group p-8 border border-white/5 rounded-xl hover:border-white/10 transition-all duration-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="text-cyan-400" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-bold mb-6">Modern Stack</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Type-safe, scalable, production-ready. Built with Next.js 15, TypeScript, PostgreSQL, and serverless infrastructure.
                </p>
                <div className="space-y-4">
                  {['End-to-end TypeScript with strict mode', 'PostgreSQL with row-level security', 'Real-time subscriptions via Supabase', 'Queue-based PDF generation (Puppeteer)', 'Vercel edge deployment with CDN'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-cyan-400 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="p-8 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-6">Core Technologies</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Frontend', items: ['Next.js 15', 'React Native', 'TypeScript', 'Tailwind CSS'] },
                    { title: 'Backend', items: ['PostgreSQL', 'Supabase', 'Serverless', 'Puppeteer'] },
                    { title: 'Integrations', items: ['Orange Money', 'MyZaka', 'PWA', 'WebSockets'] }
                  ].map((section, i) => (
                    <div key={i}>
                      <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider">{section.title}</div>
                      <div className="flex flex-wrap gap-2">
                        {section.items.map((tech, j) => (
                          <span key={j} className="px-3 py-1 text-xs border border-white/10 rounded bg-white/5 text-gray-400">{tech}</span>
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

      {/* Solo Founder */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="p-8 md:p-12 border border-white/5 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent" />
              <div className="ml-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Code2 size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Built by a Solo Technical Founder</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Both platforms designed, developed, and deployed by one founder-engineer over 7 months. 
                      Every line of code. Every architectural decision. Database design to payment integration to production deployment.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                  <div>
                    <div className="text-xl font-bold mb-1">7 months</div>
                    <div className="text-sm text-gray-500">Development time</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold mb-1">2 platforms</div>
                    <div className="text-sm text-gray-500">Live in production</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold mb-1">Gaborone</div>
                    <div className="text-sm text-gray-500">Based in Botswana</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Insights */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Insights</h2>
                <p className="text-xl text-gray-500">Building for emerging markets</p>
              </div>
              <a href="/blog" className="hidden md:flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
                <span>View all</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Offline-First PWAs for Intermittent Connectivity', category: 'Architecture', time: '8 min' },
              { title: 'Multi-Tenant Security with PostgreSQL RLS', category: 'Security', time: '12 min' },
              { title: 'Mobile Money Integration: Lessons from Botswana', category: 'Payments', time: '10 min' }
            ].map((post, i) => (
              <FadeIn key={i} delay={i * 100}>
                <a href="/blog" className="group block p-6 border border-white/5 rounded-xl hover:border-white/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span className="text-cyan-400">{post.category}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-4 group-hover:text-cyan-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <ArrowRight className="text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={14} />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-6">
              <Sparkles className="text-cyan-400" size={16} />
              <span className="text-sm text-cyan-400">Platforms Live • Join Early Adopters</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Early Access</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Keyat is live with 29+ properties. PolicyBridge is in beta testing. Be among the first to modernize your operations.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="p-8 md:p-12 border border-white/5 rounded-2xl mb-12 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-8">What You Get</h3>
                <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
                  {[
                    { title: 'Platform Access', desc: 'Start using live platforms today' },
                    { title: 'Direct Support', desc: 'Technical walkthrough with founder' },
                    { title: 'Shape Features', desc: 'Your feedback influences roadmap' }
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
                  className="group/btn inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  <Mail size={18} className="relative" />
                  <span className="relative">hello@bitroot.tech</span>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex items-center justify-center gap-6 pt-8 border-t border-white/5">
              <a href="https://github.com" className="text-gray-500 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Linkedin size={20} />
              </a>
              <a href="mailto:hello@bitroot.tech" className="text-gray-500 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Mail size={20} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 md:px-12 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 mb-2">Building infrastructure for emerging markets</p>
          <p className="text-gray-700 text-sm mb-6">Gaborone, Botswana</p>
          <p className="text-gray-700 text-sm">&copy; 2025 BITROOT. All rights reserved.</p>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
}