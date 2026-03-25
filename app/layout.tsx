'use client';

import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const productLinks = [
    { href: '/projects/keyat', label: 'Keyat', desc: 'Real Estate Platform', color: 'bg-emerald-50 text-emerald-700' },
    { href: '/projects/policybridge', label: 'PolicyBridge', desc: 'Insurance SaaS', color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>BITROOT — Web & Mobile App Development for Africa</title>
        <meta name="description" content="BITROOT builds world-class web and mobile applications for African businesses. Expert team delivering real estate, fintech, and enterprise software solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">

        {/* Announcement bar — subtle, not loud */}
        <div className="bg-slate-50 border-b border-slate-200 text-slate-600 text-center py-2 text-xs font-medium tracking-wide">
          Now accepting new projects for Q2 2026 —{' '}
          <a href="mailto:hello@bitroot.tech" className="text-emerald-700 font-semibold hover:underline">
            Book a free discovery call →
          </a>
        </div>

        <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-white border-b border-slate-100'
        }`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center h-16">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 z-50" onClick={() => setIsMobileMenuOpen(false)}>
                {/* Supabase-style: small monogram mark, dark text */}
                <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-tight">BR</span>
                </div>
                <span className="text-lg font-bold text-slate-900 tracking-tight">BITROOT</span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-0.5">
                <Link href="/" className="px-3.5 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-sm font-medium">
                  Home
                </Link>

                <div className="relative" onMouseEnter={() => setIsProductsOpen(true)} onMouseLeave={() => setIsProductsOpen(false)}>
                  <button className="flex items-center gap-1 px-3.5 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-sm font-medium">
                    Products
                    <ChevronDown size={14} className={`transition-transform text-slate-400 ${isProductsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isProductsOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-100 py-1.5 z-50">
                      {productLinks.map((p) => (
                        <Link key={p.href} href={p.href} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors group">
                          <div className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center flex-shrink-0 text-xs font-bold`}>
                            {p.label[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800 text-sm">{p.label}</div>
                            <div className="text-xs text-slate-400">{p.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/blog" className="px-3.5 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-sm font-medium">
                  Blog
                </Link>

                <Link href="/#team" className="px-3.5 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-sm font-medium">
                  Team
                </Link>

                {/* CTA button — outlined style, not filled green block */}
                <a
                  href="mailto:hello@bitroot.tech"
                  className="ml-4 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-4 py-1.5 rounded-lg font-medium transition-all text-sm"
                >
                  Get in Touch
                </a>
              </div>

              {/* Mobile toggle */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors z-50">
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6">
              <div className="flex flex-col gap-1">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/#team', label: 'Team' },
                  { href: '/blog', label: 'Blog' },
                  ...productLinks.map(p => ({ href: p.href, label: p.label }))
                ].map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-base border-b border-slate-100">
                    {link.label}
                  </Link>
                ))}
                <a href="mailto:hello@bitroot.tech" className="mt-4 border border-emerald-600 text-emerald-700 px-6 py-3 rounded-xl font-semibold text-center">
                  Get in Touch
                </a>
              </div>
            </div>
          )}
        </nav>

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-xs">BR</span>
                  </div>
                  <span className="text-lg font-bold tracking-tight">BITROOT</span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6 max-w-xs text-sm">
                  Building world-class web and mobile applications for African businesses. Headquartered in Gaborone, Botswana.
                </p>
                <a href="mailto:hello@bitroot.tech" className="inline-block text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                  hello@bitroot.tech →
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-500 mb-4">Products</h4>
                <ul className="space-y-3">
                  {['Keyat Platform', 'PolicyBridge', 'Case Studies'].map(item => (
                    <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{item}</a></li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-500 mb-4">Company</h4>
                <ul className="space-y-3">
                  {['About Us', 'Our Team', 'Blog', 'Careers'].map(item => (
                    <li key={item}><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 text-xs">© 2026 BITROOT Technologies. All rights reserved. · Gaborone, Botswana</p>
              <p className="text-slate-700 text-xs">Built with ❤️ for Africa</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}