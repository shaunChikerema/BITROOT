'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Shield, FileText, Users, CreditCard, CheckCircle2, Code2, Database, Globe, ArrowRight, Zap } from 'lucide-react';

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

export default function PolicyBridgePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-blue-600 text-white px-6 md:px-12 pt-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={100}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Shield size={26} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">PolicyBridge</h1>
                  <p className="text-blue-200">Insurance Management SaaS</p>
                </div>
                <span className="px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full border border-white/30">BETA</span>
              </div>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                Multi-tenant SaaS for insurance brokers in Botswana. Automates client management, policy tracking, and compliance-ready PDF payslip generation.
              </p>
              <a href="https://policybridge.vercel.app" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Visit Platform <ExternalLink size={18} />
              </a>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <p className="text-sm font-semibold text-blue-200 mb-4">Live Dashboard Preview</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[['14', 'Clients'], ['24', 'Policies'], ['3', 'Claims']].map(([v, l]) => (
                    <div key={l} className="bg-white/15 rounded-xl p-3 text-center">
                      <p className="font-extrabold text-white text-lg">{v}</p>
                      <p className="text-xs text-blue-200">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[['New Policy Created', '2h'], ['Payslip Generated', '5h'], ['Premium Collected', '1d']].map(([label, time]) => (
                    <div key={label} className="flex items-center gap-2 bg-white/10 rounded-lg p-2.5">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-white flex-1">{label}</span>
                      <span className="text-xs text-blue-300">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full border border-blue-200 mb-4">Features</span>
            <h2 className="text-3xl font-extrabold mb-12">Everything an Insurance Broker Needs</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Client Portfolio', desc: 'Manage all clients, their policies, documents, and payment history in one place.' },
              { icon: FileText, title: 'Auto PDF Generation', desc: 'Compliant payslips and policy documents generated automatically with queue-based processing.' },
              { icon: Shield, title: 'Multi-Tenant Isolation', desc: 'Each broker\'s data completely isolated via row-level security. 100% private.' },
              { icon: CreditCard, title: 'Premium Tracking', desc: 'Track premium payments, outstanding balances, and generate reconciliation reports.' },
              { icon: Zap, title: 'Real-Time Updates', desc: 'Live notifications for policy changes, claim status updates, and payment confirmations.' },
              { icon: Globe, title: 'Built for Botswana', desc: 'Configured for BWP currency, local insurance regulations, and Botswana tax codes.' },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <f.icon className="text-blue-600" size={20} />
                  </div>
                  <h3 className="font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold mb-4">Join the Beta Program</h2>
            <p className="text-blue-100 mb-8 text-lg">We're onboarding select insurance brokers in Botswana for the beta. Your feedback shapes the roadmap.</p>
            <a href="mailto:hello@bitroot.tech" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Apply for Beta Access <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}