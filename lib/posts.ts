// This is a mock data file. In a real project, you'd fetch from a CMS or markdown files.
export function getPostBySlug(slug: string) {
  const posts: Record<string, any> = {
    'offline-first-pwas': {
      title: 'Building Offline-First PWAs for Intermittent Connectivity',
      category: 'Architecture',
      date: 'Nov 2025',
      readTime: '8 min read',
      content: '<p>This is a sample blog post. Replace with real content.</p>'
    },
    'multi-tenant-security': {
      title: 'Multi-Tenant Security: Row-Level Security in PostgreSQL',
      category: 'Security',
      date: 'Oct 2025',
      readTime: '12 min read',
      content: '<p>Sample content for multi-tenant security.</p>'
    },
    'mobile-money-integration': {
      title: 'Mobile Money Integration: Lessons from Botswana',
      category: 'Payments',
      date: 'Sep 2025',
      readTime: '10 min read',
      content: '<p>Sample content for mobile money.</p>'
    }
  };
  return posts[slug] || null;
}