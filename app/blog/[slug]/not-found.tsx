// ============================================
// FILE 3: app/blog/[slug]/not-found.tsx
// ============================================

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Blog Post Not Found</h2>
        <p className="text-slate-400 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/#blog"
          className="inline-flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition"
        >
          <ChevronLeft size={20} />
          Back to Blog
        </Link>
      </div>
    </div>
  );
}