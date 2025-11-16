'use client';

import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
  ];

  const productLinks = [
    { href: '/projects/keyat', label: 'Keyat', desc: 'Real Estate Platform' },
    { href: '/projects/policybridge', label: 'PolicyBridge', desc: 'Insurance SaaS' },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>BITROOT - Real Estate & Insurance Software for Africa</title>
        <meta name="description" content="Live platforms replacing Excel and WhatsApp in Botswana's real estate and insurance markets. Built for emerging markets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased bg-black text-white">
        <nav 
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-black/95 backdrop-blur-md border-b border-white/10' 
              : 'bg-black/90 backdrop-blur-sm border-b border-white/5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link 
                href="/" 
                className="text-xl font-bold text-white hover:text-cyan-400 transition-colors z-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BITROOT
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>

                {/* Products Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <span>Products</span>
                    <ChevronDown size={16} className={`transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isProductsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-black border border-white/10 rounded-lg shadow-2xl py-2">
                      {productLinks.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          className="block px-4 py-3 hover:bg-white/5 transition-colors group"
                        >
                          <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {product.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  href="/blog" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>

                <a
                  href="mailto:hello@bitroot.tech"
                  className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all"
                >
                  Contact
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-50"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm md:hidden"
                style={{ top: '64px' }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            {/* Mobile Menu Panel */}
            <div
              className={`md:hidden fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 bg-black border-l border-white/10 transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex flex-col p-6 space-y-6">
                {/* Mobile Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-cyan-400 transition-colors text-lg font-medium py-2 border-b border-white/10"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Products Section */}
                <div className="border-b border-white/10 pb-4">
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-3">Products</div>
                  {productLinks.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                    >
                      <div className="font-medium">{product.label}</div>
                      <div className="text-xs text-gray-500">{product.desc}</div>
                    </Link>
                  ))}
                </div>
                
                {/* Mobile CTA */}
                <a
                  href="mailto:hello@bitroot.tech"
                  className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}