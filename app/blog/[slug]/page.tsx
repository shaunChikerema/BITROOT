import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-8">Oops! That blog post doesn't exist.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    </div>
  );
}