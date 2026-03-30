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
        <title>BITROOT — Africa's Software Studio | Web & Mobile App Development</title>
        <meta name="description" content="BITROOT builds world-class web and mobile applications for African businesses. Real estate, fintech, and enterprise software from Gaborone, Botswana." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">

        <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-white border-b border-slate-100'
        }`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center h-16">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 z-50" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-tight">BR</span>
                </div>
                <span className="text-lg font-bold text-slate-900 tracking-tight">BITROOT</span>
              </Link>

              {/* Desktop Nav — removed redundant "Home" link */}
              <div className="hidden md:flex items-center gap-0.5">
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

                <Link href="/#services" className="px-3.5 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-sm font-medium">
                  Services
                </Link>

                <Link href="/#team" className="px-3.5 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-sm font-medium">
                  Team
                </Link>

                <Link href="/blog" className="px-3.5 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-sm font-medium">
                  Blog
                </Link>

                {/* CTA — solid, not outlined, because the bar above is too subtle alone */}
                <a
                  href="https://wa.me/26776051623"
                  className="ml-2 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-1.5 rounded-lg font-semibold transition-all text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
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
                  { href: '/#services', label: 'Services' },
                  { href: '/#team', label: 'Team' },
                  { href: '/blog', label: 'Blog' },
                  ...productLinks.map(p => ({ href: p.href, label: p.label }))
                ].map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-base border-b border-slate-100">
                    {link.label}
                  </Link>
                ))}
                <a href="https://wa.me/26776051623" className="mt-4 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold text-center text-sm">
                  WhatsApp us
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
                <p className="text-slate-400 leading-relaxed mb-4 max-w-xs text-sm">
                  Africa's software studio. We build enterprise-grade web and mobile applications for businesses across the continent.
                </p>
                {/* Physical address — signals legitimacy */}
                <p className="text-slate-500 text-xs mb-5 leading-relaxed">
                  Plot 54358, Gaborone Central<br />
                  Gaborone, Botswana
                </p>
                <div className="flex flex-col gap-2">
                  <a href="mailto:hello@bitroot.tech" className="inline-block text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                    hello@bitroot.tech
                  </a>
                  <a href="https://wa.me/26776051623" className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-500 mb-4">Products</h4>
                <ul className="space-y-3">
                  <li><Link href="/projects/keyat" className="text-slate-400 hover:text-white transition-colors text-sm">Keyat Platform</Link></li>
                  <li><Link href="/projects/policybridge" className="text-slate-400 hover:text-white transition-colors text-sm">PolicyBridge</Link></li>
                  <li><a href="https://keyat.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">keyat.vercel.app ↗</a></li>
                  <li><a href="https://policybridge.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">policybridge.vercel.app ↗</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-500 mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><Link href="/#team" className="text-slate-400 hover:text-white transition-colors text-sm">Our Team</Link></li>
                  <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                  <li><a href="mailto:careers@bitroot.tech" className="text-slate-400 hover:text-white transition-colors text-sm">Careers</a></li>
                  {/* LinkedIn placeholder — add real URL */}
                  <li><a href="https://linkedin.com/company/bitroot" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">LinkedIn ↗</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-600 text-xs">© 2026 BITROOT Technologies (Pty) Ltd. · Gaborone, Botswana · Registered in Botswana</p>
              <p className="text-slate-700 text-xs">Built for Africa 🌍</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}