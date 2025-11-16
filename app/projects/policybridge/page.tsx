'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Shield, FileText, Users, BarChart3, Zap, Database, CheckCircle2, Code2, Clock, DollarSign, TrendingUp, Download, ArrowRight } from 'lucide-react';

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

export default function PolicyBridgeProductPage() {
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
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/20 rounded-full blur-[150px] pointer-events-none"
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
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold">PolicyBridge</h1>
                <p className="text-xl text-gray-400 mt-2">Insurance Management SaaS</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                LIVE BETA
              </span>
              <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
                AUTO PDF GENERATION
              </span>
              <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                MULTI-TENANT SAAS
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-8">
              Complete insurance broker management platform. Handle clients, policies, claims, and payments. 
              Automated payslip generation via Puppeteer. Built for Botswana's insurance market.
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://policybridge.vercel.app"
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
                  Insurance brokers in Botswana manage hundreds of clients and policies using Excel, WhatsApp, and physical files. 
                  Document generation is manual. Payment tracking is chaos. Commission calculations take days.
                </p>
                <div className="space-y-4">
                  {[
                    'Client data scattered across spreadsheets',
                    'Manual payslip and document creation',
                    'No centralized policy tracking',
                    'Payment reconciliation nightmare',
                    'Commission calculations by hand'
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
                <h3 className="text-2xl font-bold mb-6">Market Snapshot</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">$200M+</div>
                    <div className="text-sm text-gray-500">Insurance market size (Botswana)</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                    <div className="text-sm text-gray-500">Active insurance brokers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
                    <div className="text-sm text-gray-500">Modern SaaS solutions available</div>
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
              End-to-end broker operations platform that automates everything from client onboarding to payslip generation.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Client Management',
                desc: 'Centralized client database with full history, documents, and communication logs.'
              },
              {
                icon: FileText,
                title: 'Policy Tracking',
                desc: 'Manage policies across all providers. Renewal reminders. Claim submission and tracking.'
              },
              {
                icon: DollarSign,
                title: 'Payment & Commissions',
                desc: 'Automated payment tracking, commission calculations, and payslip generation via Puppeteer.'
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="p-8 border border-white/5 rounded-xl hover:border-white/10 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="text-purple-400" size={24} />
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
                    <Users className="text-purple-400" size={28} />
                    <h3 className="text-2xl font-bold">Client Portfolio Management</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Complete client lifecycle management. Store contact details, policy preferences, communication history. 
                    Track portfolio value per client. Segment by risk profile and revenue.
                  </p>
                  <div className="space-y-3">
                    {['360° client view', 'Document storage', 'Activity timeline', 'Risk profiling'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-purple-400" size={18} />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <Users className="text-purple-400/30" size={80} />
                </div>
              </div>
            </FadeIn>

            {/* Feature 2 */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <FileText className="text-blue-400/30" size={80} />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="text-blue-400" size={28} />
                    <h3 className="text-2xl font-bold">Policy Lifecycle Management</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Create, track, and renew policies across all insurance providers. Automated renewal reminders. 
                    Premium calculations. Policy comparisons. Claims submission and tracking.
                  </p>
                  <div className="space-y-3">
                    {['Multi-provider support', 'Renewal automation', 'Claims tracking', 'Policy analytics'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-blue-400" size={18} />
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
                    <Download className="text-cyan-400" size={28} />
                    <h3 className="text-2xl font-bold">Automated Payslip Generation</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Queue-based PDF generation using Puppeteer. Custom templates. Batch processing. 
                    Email delivery. Digital signatures. Archive management. Process 1000s of documents monthly.
                  </p>
                  <div className="space-y-3">
                    {['Puppeteer PDF engine', 'Custom templates', 'Batch generation', 'Email delivery'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-cyan-400" size={18} />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <Download className="text-cyan-400/30" size={80} />
                </div>
              </div>
            </FadeIn>

            {/* Feature 4 */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-green-900/20 to-cyan-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <TrendingUp className="text-green-400/30" size={80} />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="text-green-400" size={28} />
                    <h3 className="text-2xl font-bold">Commission Management</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Automated commission calculations based on policy types and tiers. Payment tracking. 
                    Reconciliation workflows. Generate commission statements. Track broker performance.
                  </p>
                  <div className="space-y-3">
                    {['Auto calculations', 'Tiered commissions', 'Payment reconciliation', 'Performance reports'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-green-400" size={18} />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Feature 5 */}
            <FadeIn delay={100}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="text-blue-400" size={28} />
                    <h3 className="text-2xl font-bold">Analytics & Reporting</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Real-time dashboards for portfolio performance, revenue tracking, client growth. 
                    Custom reports. Export to Excel. Forecast revenue. Identify at-risk policies.
                  </p>
                  <div className="space-y-3">
                    {['Real-time dashboards', 'Revenue forecasting', 'Client segmentation', 'Export reports'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="text-blue-400" size={18} />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-white/5 h-64 flex items-center justify-center">
                  <BarChart3 className="text-blue-400/30" size={80} />
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
              Multi-tenant SaaS with row-level security, queue-based processing, and automated document generation.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <FadeIn delay={100}>
              <div className="p-8 border border-white/5 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="text-purple-400" size={24} />
                  <h3 className="text-xl font-bold">Frontend</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { tech: 'Next.js 15', desc: 'App router, React Server Components' },
                    { tech: 'TypeScript', desc: 'Strict mode, full type safety' },
                    { tech: 'Tailwind CSS', desc: 'Custom component library' },
                    { tech: 'Recharts', desc: 'Interactive analytics dashboards' },
                    { tech: 'React Query', desc: 'Server state management' }
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
                  <h3 className="text-xl font-bold">Backend & Database</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { tech: 'PostgreSQL', desc: 'Primary database with JSONB' },
                    { tech: 'Row-Level Security', desc: 'Tenant data isolation' },
                    { tech: 'Supabase', desc: 'Auth, real-time, storage' },
                    { tech: 'Bull Queue', desc: 'Job processing & retries' },
                    { tech: 'Puppeteer', desc: 'PDF generation engine' }
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
                <Zap className="text-green-400" size={24} />
                <h3 className="text-xl font-bold">Key Technical Implementations</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Multi-Tenancy', desc: 'RLS policies at database level for complete data isolation between brokers' },
                  { title: 'PDF Generation', desc: 'Queue-based Puppeteer processing with retry logic and memory management' },
                  { title: 'Real-time Updates', desc: 'WebSocket subscriptions for live dashboard updates and notifications' }
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

      {/* Implementation Deep Dive */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-16">Technical Deep Dives</h2>
          </FadeIn>

          <div className="space-y-12">
            <FadeIn delay={100}>
              <div className="p-8 border border-white/5 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent">
                <h3 className="text-2xl font-bold mb-4">Queue-Based PDF Generation</h3>
                <p className="text-gray-400 mb-6">
                  Processing 10,000+ insurance documents monthly requires robust infrastructure. 
                  We use Bull queues with Puppeteer for reliable, scalable PDF generation.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-purple-400">Architecture</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Redis-backed Bull queue for job management</li>
                      <li>• Separate worker processes for PDF generation</li>
                      <li>• Automatic retry with exponential backoff</li>
                      <li>• Job prioritization (urgent vs batch)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-cyan-400">Optimizations</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Template caching to reduce render time</li>
                      <li>• Memory limits per Puppeteer instance</li>
                      <li>• Batch processing for bulk operations</li>
                      <li>• CDN storage for generated documents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="p-8 border border-white/5 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent">
                <h3 className="text-2xl font-bold mb-4">Multi-Tenant Security</h3>
                <p className="text-gray-400 mb-6">
                  True data isolation using PostgreSQL Row-Level Security. Each broker's data is completely isolated at the database level.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-purple-400">Implementation</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• RLS policies on all tables</li>
                      <li>• tenant_id column on every row</li>
                      <li>• JWT-based tenant identification</li>
                      <li>• Automatic policy enforcement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-cyan-400">Benefits</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Zero-trust data isolation</li>
                      <li>• No application-level filtering needed</li>
                      <li>• Scales to 10,000+ tenants</li>
                      <li>• Regulatory compliance built-in</li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="relative px-6 md:px-12 py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-16">Current Status</h2>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: 'Beta', label: 'Live Testing', color: 'blue' },
              { number: 'Auto', label: 'PDF Generation', color: 'purple' },
              { number: 'Multi', label: 'Tenant SaaS', color: 'cyan' },
              { number: '99%', label: 'Uptime', color: 'green' }
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
            <h2 className="text-4xl font-bold mb-6">Request Early Access</h2>
            <p className="text-xl text-gray-400 mb-12">
              PolicyBridge is in beta testing with select insurance brokers. Join the waitlist for early access.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://policybridge.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all"
              >
                <span>View Demo</span>
                <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="mailto:hello@bitroot.tech"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-all"
              >
                <span>Request Access</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}