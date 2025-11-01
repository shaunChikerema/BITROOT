// components/HomePage.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, Code, Zap, Shield, Layers, ArrowUpRight, CheckCircle2, Globe, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/posts';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.07]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Enterprise Software<br />for Emerging Markets
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed">
              Production-grade platforms serving thousands of users across critical infrastructure. Built for scale, security, and challenging market conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-white text-slate-950 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-50 hover:shadow-xl hover:shadow-white/10 transition-all flex items-center justify-center gap-2 group">
                Start Your Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#ecosystem" className="border border-slate-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-900 hover:border-slate-600 transition-all">
                View Live Systems
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Points */}
      <section className="py-12 px-4 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10,000+', label: 'Active Users' },
              { value: '99.9%', label: 'Platform Uptime' },
              { value: '$200M+', label: 'Market Coverage' },
              { value: '<2s', label: 'Load Time' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/30 transition-all">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">BITROOT Technology Ecosystem</h2>
            <p className="text-slate-400 text-lg">Production platforms serving real estate and insurance markets</p>
          </div>
          <div className="space-y-8">
            {[
              { 
                title: 'Keyat', 
                category: 'Real Estate Infrastructure', 
                description: 'Enterprise real estate platform with multi-tenant architecture serving 10,000+ users across Botswana. Features mobile money integration, progressive web app technology, and real-time property management.',
                tech: ['Next.js', 'React Native', 'Supabase', 'PWA'],
                metrics: { scale: '10K+ Users', transactions: '500+/month', performance: '<2s Load' }
              },
              { 
                title: 'PolicyBridge', 
                category: 'Insurance Management SaaS', 
                description: 'Enterprise insurance platform automating document processing for the $200M insurance market. Queue-based PDF generation handling 10,000+ monthly documents with compliance-first architecture and audit trails.',
                tech: ['Next.js', 'Puppeteer', 'TypeScript', 'PostgreSQL'],
                metrics: { scale: '500+ Brokers', processing: '10K+ Docs/mo', efficiency: '60% Faster' }
              }
            ].map((project, idx) => (
              <div key={idx} className="group border border-slate-800 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/5 rounded-lg p-8 transition-all duration-300 bg-slate-900/30 hover:bg-slate-900/50">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
                    </div>
                    <p className="text-slate-500 text-sm mb-4 font-medium">{project.category}</p>
                    <p className="text-slate-400 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded text-slate-400 text-xs whitespace-nowrap group-hover:border-slate-700 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
                  {Object.entries(project.metrics).map(([key, value], i) => (
                    <div key={i}>
                      <div className="text-lg font-bold text-white mb-1">{value}</div>
                      <div className="text-slate-500 text-xs uppercase tracking-wide">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiator Section */}
      <section id="approach" className="py-20 px-4 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Built for Real-World Conditions</h2>
            <p className="text-slate-400 text-lg">
              We architect systems that work in challenging environments—intermittent connectivity, diverse payment infrastructure, and complex regulatory landscapes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Offline-First Architecture</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Progressive web apps and mobile solutions that function seamlessly with intermittent connectivity. Data syncs automatically when connection is restored.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Multi-Tenant by Default</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Complete data isolation with row-level security. Scale from hundreds to thousands of organizations on shared infrastructure without compromising security.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Payment Agnostic</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Integrate with any payment provider—mobile money, traditional banking, or emerging fintech. Built-in fallback mechanisms and reconciliation systems.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Technical Foundation</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-cyan-500 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Type-Safe Development</h4>
                    <p className="text-slate-500 text-sm">End-to-end TypeScript with strict mode. Catch errors at compile time, not in production.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-cyan-500 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Real-Time by Default</h4>
                    <p className="text-slate-500 text-sm">PostgreSQL subscriptions and WebSocket connections for live updates across all connected clients.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-cyan-500 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Queue-Based Processing</h4>
                    <p className="text-slate-500 text-sm">Background job processing for document generation, email delivery, and data-intensive operations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Core Technologies</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wide">Application Layer</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js 15', 'React Native', 'TypeScript', 'Tailwind CSS'].map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wide">Data & Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['PostgreSQL', 'Supabase', 'Serverless Functions', 'Real-time'].map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wide">Infrastructure</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Vercel', 'CDN', 'Queue Processing', 'Monitoring'].map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What We Build</h2>
            <p className="text-slate-400 text-lg">End-to-end platform development for complex business requirements</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Code, 
                title: 'Web Platforms', 
                desc: 'Full-stack applications with Next.js, TypeScript, and serverless architecture. Optimized for performance and SEO.'
              },
              { 
                icon: Zap, 
                title: 'Mobile Apps', 
                desc: 'Cross-platform React Native applications with offline-first design and native performance.'
              },
              { 
                icon: Shield, 
                title: 'Enterprise Security', 
                desc: 'Multi-tenant architecture with row-level security, encryption, audit trails, and compliance controls.'
              },
              { 
                icon: Layers, 
                title: 'Cloud Infrastructure', 
                desc: 'Scalable deployment with CDN optimization, queue-based processing, and 99.9% uptime guarantees.'
              }
            ].map((service, idx) => (
              <div key={idx} className="group">
                <div className="mb-4 inline-flex p-3 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-cyan-500/50 transition">
                  <service.icon className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Insights</h2>
            <p className="text-slate-400 text-lg">Building enterprise software for emerging markets—lessons from the field</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group border border-slate-800 hover:border-cyan-500/40 rounded-lg overflow-hidden transition-all duration-300 bg-slate-900/30 hover:bg-slate-900/50 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-cyan-400 uppercase tracking-wide">{post.category}</span>
                    <span className="text-slate-700">•</span>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <ArrowRight className="text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#contact" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition">
              <span>Want to discuss these topics?</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Start a Project</h2>
            <p className="text-slate-400 text-lg mb-8">
              We work with companies building critical infrastructure in emerging markets. Let's discuss your technical requirements.
            </p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Our Process</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="text-white font-medium">Technical Discovery</div>
                  <div className="text-slate-500 text-sm">Review requirements, data models, and integration points</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="text-white font-medium">Architecture Design</div>
                  <div className="text-slate-500 text-sm">System design, database schema, and API specifications</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="text-white font-medium">Proposal & Timeline</div>
                  <div className="text-slate-500 text-sm">Detailed scope, milestone delivery plan, and pricing</div>
                </div>
              </div>
            </div>

            <a 
              href="mailto:hello@bitroot.tech" 
              className="w-full bg-white text-slate-950 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-50 hover:shadow-xl hover:shadow-white/10 transition-all flex items-center justify-center gap-2 group"
            >
              <Mail size={20} /> hello@bitroot.tech
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-6 justify-center mt-12 pt-8 border-t border-slate-800">
            <a href="https://github.com/bitroot" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/company/bitroot" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@bitroot.tech" className="text-slate-500 hover:text-cyan-400 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-slate-400 mb-2 text-lg">Building infrastructure for emerging markets</p>
            <p className="text-slate-600 text-sm">Gaborone, Botswana</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-sm">&copy; 2025 BITROOT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}