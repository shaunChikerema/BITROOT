// ============================================
// FILE: components/BlogPostPage.tsx
// Complete blog post component with markdown rendering
// ============================================

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, Mail } from 'lucide-react';
import { BlogPost } from '@/lib/posts';

interface BlogPostPageProps {
  post: BlogPost;
}

// ============================================
// MARKDOWN PARSER
// ============================================

// Simple markdown-to-JSX parser for blog content
function parseContent(content: string) {
  const sections = content.split('\n\n');
  
  return sections.map((section, idx) => {
    // Handle H2 headers (##)
    if (section.startsWith('## ')) {
      return (
        <h2 key={idx} className="text-3xl font-bold text-white mt-12 mb-6 first:mt-0">
          {section.slice(3)}
        </h2>
      );
    }
    
    // Handle bullet lists (lines starting with -)
    if (section.includes('\n- ') || section.startsWith('- ')) {
      const items = section.split('\n').filter(line => line.trim().startsWith('- '));
      return (
        <ul key={idx} className="space-y-3 mb-6 ml-6">
          {items.map((item, i) => (
            <li key={i} className="text-slate-300 leading-relaxed relative pl-6 before:content-['→'] before:absolute before:left-0 before:text-cyan-400">
              {formatInlineText(item.slice(2))}
            </li>
          ))}
        </ul>
      );
    }
    
    // Handle regular paragraphs
    return (
      <p key={idx} className="text-slate-300 leading-relaxed mb-6 text-lg">
        {formatInlineText(section)}
      </p>
    );
  });
}

// Format inline markdown (bold, code, etc)
function formatInlineText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let keyCounter = 0;
  
  // Match **bold** and `code`
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > currentIndex) {
      parts.push(text.slice(currentIndex, match.index));
    }
    
    const matchedText = match[0];
    
    // Handle bold text
    if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
      parts.push(
        <strong key={`bold-${keyCounter++}`} className="text-white font-semibold">
          {matchedText.slice(2, -2)}
        </strong>
      );
    }
    // Handle inline code
    else if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
      parts.push(
        <code key={`code-${keyCounter++}`} className="bg-slate-900 text-cyan-400 px-2 py-0.5 rounded text-sm font-mono">
          {matchedText.slice(1, -1)}
        </code>
      );
    }
    
    currentIndex = match.index + matchedText.length;
  }
  
  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(text.slice(currentIndex));
  }
  
  return parts.length > 0 ? parts : [text];
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ============================================
            BACK BUTTON
            ============================================ */}
        <Link 
          href="/#blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <article>
          {/* ============================================
              ARTICLE HEADER
              Category badge, date, title, excerpt
              ============================================ */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-sm font-medium text-cyan-400 uppercase tracking-wide bg-cyan-400/10 px-3 py-1 rounded">
                {post.category}
              </span>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed">
              {post.excerpt}
            </p>
          </header>
          
          {/* ============================================
              ARTICLE CONTENT
              Parsed markdown with proper formatting
              ============================================ */}
          <div className="border-t border-slate-800 pt-10">
            <div className="prose prose-invert prose-lg max-w-none">
              {parseContent(post.content)}
            </div>
          </div>
        </article>
        
        {/* ============================================
            CTA SECTION
            Encourage readers to get in touch
            ============================================ */}
        <div className="mt-16 pt-10 border-t border-slate-800">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-center hover:border-cyan-500/30 transition-all">
            <h3 className="text-2xl font-bold text-white mb-3">Discuss This Topic</h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Have questions or want to explore these concepts for your project? We'd love to hear from you.
            </p>
            <a 
              href="mailto:hello@bitroot.tech"
              className="inline-flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 hover:shadow-xl hover:shadow-white/10 transition-all group"
            >
              <Mail size={20} />
              Get in Touch
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </a>
          </div>
        </div>

        {/* ============================================
            BACK TO BLOG LINK
            Navigate back to all articles
            ============================================ */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link 
            href="/#blog"
            className="text-slate-400 hover:text-cyan-400 transition flex items-center gap-2 justify-center"
          >
            <span>← Read more articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


// ============================================
// FEATURES & CAPABILITIES
// ============================================

/*
MARKDOWN PARSING:
✅ H2 Headers (##) - Large white bold headings
✅ Bullet Lists (-) - Cyan arrow indicators
✅ Bold Text (**text**) - White semibold
✅ Inline Code (`code`) - Cyan with dark background
✅ Paragraphs - Proper spacing and line height

DESIGN ELEMENTS:
✅ Category badge with cyan background
✅ Date and read time with icons
✅ Large responsive title
✅ Excerpt/subtitle
✅ Divider between header and content
✅ CTA card with hover effect
✅ Back navigation with animated arrow
✅ "Read more" link at bottom

RESPONSIVE:
✅ Mobile-friendly padding
✅ Flexible header layout
✅ Readable font sizes on all screens
✅ Touch-friendly link targets

ANIMATIONS:
✅ Back button hover (arrow slides left)
✅ CTA card hover (border glow)
✅ Get in Touch button hover (shadow + arrow slide)
✅ Link hover effects (color transitions)
*/


// ============================================
// CHANGELOG
// ============================================

/*
[2025-11-01] - Initial Blog Post Component
- Created BlogPostPage component for individual articles
- Implemented markdown parser for headers, bullets, bold, inline code
- Added category badge, date, and read time display
- Designed responsive article header with title and excerpt
- Added CTA section with email contact button
- Implemented back navigation with animated hover effects
- Added "Read more articles" link at bottom
- Styled with Tailwind CSS for consistent design system
- Optimized typography for readability (line height, spacing, sizing)
- Added Lucide React icons (ChevronLeft, Calendar, Clock, Mail)

[2025-11-01] - Visual Enhancements
- Enhanced category badge with cyan background glow
- Improved CTA card with border hover effect
- Added arrow animation on "Get in Touch" button
- Polished spacing and margins throughout
- Optimized for dark theme (slate-950 background)
*/