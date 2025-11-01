// ============================================
// FILE: app/layout.tsx (UPDATED - Mobile Responsive)
// ============================================

'use client';

import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Note: Since we're using 'use client', metadata needs to be in a separate file
// Create app/metadata.ts and import it, OR move metadata to page.tsx files

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/#ecosystem', label: 'Ecosystem' },
    { href: '/#capabilities', label: 'Capabilities' },
    { href: '/#approach', label: 'Approach' },
    { href: '/#blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>BITROOT - Enterprise Software for Emerging Markets</title>
        <meta name="description" content="Production-grade platforms serving thousands of users across critical infrastructure in Botswana and Africa." />
        <meta name="keywords" content="enterprise software, emerging markets, Botswana, real estate, insurance, SaaS" />
        <meta property="og:title" content="BITROOT - Enterprise Software for Emerging Markets" />
        <meta property="og:description" content="Production-grade platforms serving thousands of users across critical infrastructure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bitroot.tech" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-white">
        <nav 
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg' 
              : 'bg-slate-950/90 backdrop-blur-sm border-b border-slate-800'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link 
                href="/" 
                className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors z-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BITROOT
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8 items-center">
                {navLinks.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="mailto:hello@bitroot.tech"
                  className="bg-white text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-50 transition-all ml-4"
                >
                  Get Started
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors z-50"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                style={{ top: '64px' }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            {/* Mobile Menu Panel */}
            <div
              className={`md:hidden fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 bg-slate-900 border-l border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex flex-col p-6 space-y-6">
                {/* Mobile Navigation Links */}
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-lg font-medium py-2 border-b border-slate-800 last:border-b-0"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile CTA Button */}
                <a
                  href="mailto:hello@bitroot.tech"
                  className="bg-white text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-all text-center mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        {children}
      </body>
    </html>
  );
}


// ============================================
// ALTERNATIVE: If you need to keep metadata export
// Use this version with separate metadata
// ============================================

/*
// FILE: app/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BITROOT - Enterprise Software for Emerging Markets',
  description: 'Production-grade platforms serving thousands of users across critical infrastructure in Botswana and Africa.',
  keywords: ['enterprise software', 'emerging markets', 'Botswana', 'real estate', 'insurance', 'SaaS'],
  openGraph: {
    title: 'BITROOT - Enterprise Software for Emerging Markets',
    description: 'Production-grade platforms serving thousands of users across critical infrastructure.',
    type: 'website',
    url: 'https://bitroot.tech',
  },
};

// Then in layout.tsx, remove 'use client' and import metadata from page.tsx instead
*/


// ============================================
// USAGE NOTES
// ============================================

/*
WHAT'S INCLUDED:
✅ Hamburger menu icon (☰) on mobile
✅ Slide-in menu panel from right side
✅ Backdrop overlay when menu is open
✅ Close on outside click
✅ Close on link click
✅ Smooth animations
✅ Scroll lock when menu is open
✅ Enhanced scroll effect on desktop
✅ Accessible (aria labels)
✅ Touch-friendly tap targets

MOBILE MENU BEHAVIOR:
1. Click hamburger (☰) → Menu slides in from right
2. Dark overlay appears over content
3. Click any link → Menu closes, navigates to section
4. Click outside → Menu closes
5. Click X icon → Menu closes
6. Scroll is locked while menu is open

RESPONSIVE BREAKPOINTS:
- Mobile: < 768px (shows hamburger menu)
- Desktop: ≥ 768px (shows horizontal nav)

STYLING:
- Menu slides in from right with smooth animation
- 256px width (w-64)
- Full height minus nav bar
- Dark slate background with border
- Links have hover effects
- CTA button at bottom

TESTING CHECKLIST:
□ Resize browser to mobile width
□ Click hamburger icon → menu opens
□ Click outside → menu closes
□ Click link → navigates and closes
□ Check on actual mobile device
□ Test landscape and portrait
□ Verify scroll lock works
□ Check touch targets are large enough

KNOWN LIMITATIONS:
- Metadata must be in page.tsx files (not layout with 'use client')
- If you need metadata in layout, use the alternative approach shown above

CUSTOMIZATION:
- Change menu width: w-64 → w-full or w-80
- Change slide direction: right-0 → left-0 and translate-x-full → -translate-x-full
- Change menu background: bg-slate-900 → bg-slate-950
- Add icons to links using lucide-react
*/