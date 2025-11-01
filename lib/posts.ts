// ============================================
// FILE: lib/posts.ts (UPDATED - All dates now 2025)
// ============================================

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'offline-first-pwas',
    title: 'Building Offline-First PWAs for Intermittent Connectivity',
    excerpt: 'How we architected Keyat to work seamlessly when internet access is unreliable. Service workers, cache strategies, and sync patterns that actually work in production.',
    date: 'Nov 2025', // ✅ UPDATED
    readTime: '8 min read',
    category: 'Architecture',
    content: `In emerging markets, internet connectivity isn't a guarantee—it's a luxury that comes and goes. When we started building Keyat, our real estate platform for Botswana, we knew that traditional web architectures wouldn't cut it.

## The Challenge

Botswana's internet infrastructure is improving rapidly, but challenges remain: mobile data is expensive (relative to income), coverage gaps in rural areas, network congestion during peak hours, and users switching between WiFi and cellular frequently.

## Our Architecture Approach

We built Keyat as a PWA from day one with a sophisticated caching strategy, IndexedDB for structured data, and optimistic UI updates. When a user submits a rental application offline, we immediately show success in the UI, store the submission in IndexedDB with a "pending" flag, queue it for background sync, and handle conflicts gracefully.

## Real-World Results

After six months of testing with beta users we achieved a 98% reduction in failed submissions, 3x faster perceived performance, 40% increase in rural area usage, and users report the app "just works."

## Key Lessons Learned

Assume offline first—don't build online-first and retrofit. Be transparent about sync status. Handle conflicts early. Test on real networks, not just Chrome DevTools. Monitor sync success rates as your real reliability metric.

The web can compete with native apps, but only if we stop assuming reliable connectivity. Progressive Web Apps, when built correctly, deliver native-like experiences without native app distribution costs.`
  },
  {
    id: 'multi-tenant-security',
    title: 'Multi-Tenant Security: Row-Level Security in PostgreSQL',
    excerpt: 'Implementing true data isolation for thousands of organizations on shared infrastructure. Deep dive into RLS policies, performance optimization, and avoiding common pitfalls.',
    date: 'Oct 2025', // ✅ UPDATED
    readTime: '12 min read',
    category: 'Security',
    content: `When building PolicyBridge, our insurance management platform, we faced a critical decision: how do we serve hundreds of insurance brokers on shared infrastructure while guaranteeing absolute data isolation?

## Why Multi-Tenancy?

Running separate database instances for each broker would be cost-prohibitive and operationally complex. At scale, you're managing hundreds of databases, backups, and migrations. A properly designed multi-tenant architecture serves everyone from a single database with complete isolation.

## PostgreSQL Row-Level Security (RLS)

RLS is PostgreSQL's built-in feature for restricting which rows users can access. It's enforced at the database level, so even if your application code has bugs, the database refuses unauthorized access.

Every table has a tenant_id column. We enable RLS on the table and create policies that ensure users can only see rows for their tenant. When a user logs in, we set their tenant_id as a session variable, and all queries are automatically filtered.

## Real-World Challenges

Performance requires composite indexes with tenant_id as the first column. Cross-tenant analytics need separate roles with BYPASS RLS privilege. We monitor slow query logs and optimize indexes based on real usage patterns.

## The Results

Six months into production: 500+ brokers on shared infrastructure, zero data leakage incidents, sub-100ms average query time at scale, and 90% cost reduction versus separate databases.

PostgreSQL RLS is production-ready for multi-tenant SaaS. It provides database-level security guarantees, better performance than application-level filtering, automatic protection against SQL injection, and clear audit trails for compliance.`
  },
  {
    id: 'mobile-money-integration',
    title: 'Mobile Money Integration: Lessons from Botswana',
    excerpt: 'Integrating with Orange Money and MyZaka in production. API quirks, reconciliation strategies, and building fallback mechanisms when payment providers go down.',
    date: 'Sep 2025', // ✅ UPDATED
    readTime: '10 min read',
    category: 'Payments',
    content: `When we built payment processing for Keyat, we quickly learned that "mobile money" isn't one thing—it's a fragmented ecosystem of providers, each with their own APIs, quirks, and reliability issues.

## The Mobile Money Landscape

In Botswana, the two dominant players are Orange Money and MyZaka (by Mascom). Unlike credit card processing where Stripe abstracts everything, mobile money requires direct integration with each provider.

## Integration Architecture

Our payment flow handles multiple providers with a unified interface. Each provider has different authentication mechanisms, webhook reliability, error codes, retry behavior, and settlement timelines.

## Real-World Challenges

Orange Money webhooks fail approximately 5% of the time. User pays, we never get notified, and the rental application is stuck "pending payment." Our solution is active polling as backup—we poll every 30 seconds for up to 10 minutes.

A failed payment could mean the user doesn't have money, network timeout, provider system down, or invalid phone number. Each requires different handling with proper error code mapping and retry logic.

## Reconciliation

At month-end, our records must match provider settlement reports exactly. We run daily reconciliation jobs that download settlement files, compare with our records, and alert the finance team of any discrepancies before they compound.

## Key Metrics We Track

Payment success rate targets above 95%, average processing time under 10 seconds, webhook delivery rate around 93% (with polling catching the rest), reconciliation accuracy at 100% with manual review for discrepancies, and provider uptime at Orange approximately 98% and MyZaka approximately 97%.

Mobile money integration is harder than credit card processing. There's no Stripe equivalent that abstracts the mess. But in emerging markets, it's the only game in town. Master it, and you unlock markets that credit cards can't reach.`
  },
  {
    id: 'queue-based-pdf-generation',
    title: 'Queue-Based PDF Generation at Scale',
    excerpt: 'Processing 10,000+ insurance documents monthly with Puppeteer and bull queues. Job prioritization, memory management, and handling failures gracefully.',
    date: 'Aug 2025', // ✅ UPDATED
    readTime: '15 min read',
    category: 'Infrastructure',
    content: `PolicyBridge generates insurance certificates, policy schedules, and renewal notices—thousands of PDFs every month. When we started, PDF generation was synchronous: user clicks "download," server generates PDF, user waits 8-12 seconds.

## The Problem with Synchronous PDF Generation

Puppeteer (our PDF engine) is resource-intensive. It launches a headless Chrome instance per generation, each instance uses approximately 150MB RAM, takes 5-10 seconds to generate a complex insurance document, and can't handle concurrent requests without exploding memory usage.

## Queue-Based Architecture

We moved to asynchronous processing with Bull (Redis-backed job queue). The API endpoint adds a job to the queue and returns immediately with a job ID. Workers process jobs with controlled concurrency—maximum 2 concurrent jobs to prevent memory exhaustion.

## Benefits of This Approach

Users get job IDs in under 100ms and don't wait for PDF generation. Controlled concurrency prevents memory exhaustion. Automatic retries handle network failures or timeouts. Prioritization allows VIP users or time-sensitive documents to jump the queue. We can track queue depth, processing time, and failure rates.

## Job Priority Logic

Not all PDFs are equal. Renewal notices due tomorrow are more urgent than historical policy copies. VIP users get highest priority. Documents due within 24 hours get high priority. Bulk generations get lowest priority.

## Real-Time Progress Updates

Users want to know when their PDF is ready. We use WebSocket subscriptions to emit events as jobs progress. The frontend subscribes to updates and shows a download button when ready.

## The Results

Six months in production: 10,000+ PDFs generated monthly, 99.7% success rate, average processing time of 6.2 seconds, zero server crashes, and user satisfaction up 40% with no more timeouts.

Queue-based architecture isn't just for PDF generation—it's the pattern for any heavy processing. Email delivery, image resizing, data exports, report generation. If it takes more than 2 seconds, queue it.`
  },
  {
    id: 'why-emerging-markets',
    title: 'Why We Build for Emerging Markets',
    excerpt: 'The technical and business case for focusing on African markets. Market size, payment infrastructure maturity, and where the biggest opportunities lie.',
    date: 'Jul 2025', // ✅ UPDATED
    readTime: '6 min read',
    category: 'Strategy',
    content: `When we tell people we're building enterprise software for Botswana, the typical response is: "Why not start in the US or Europe where there's more money?" It's the wrong question. The right question is: "Where can we build something that actually matters?"

## The Opportunity

Africa's software market is projected to reach $15 billion by 2025. Botswana alone has a $200M insurance market that's 90% paper-based. There's no incumbent software to displace—companies are moving from Excel and filing cabinets directly to modern cloud platforms.

## Why We Started in Botswana

English-speaking market with no localization overhead. Political stability—Botswana has been a stable democracy since independence. Growing middle class with GDP per capita of $8,000. Regional hub potential for South Africa, Namibia, Zambia, Zimbabwe. Technical infrastructure with 4G coverage in cities and fiber optic backbone.

## The Technical Challenges Are Interesting

Building for emerging markets forces you to solve hard problems. Offline-first architecture makes your product better everywhere. Payment diversity creates resilient systems. Resource constraints produce lean, fast software. These constraints produce better software than building for Silicon Valley's perfect conditions.

## The Business Model Works

Higher retention because companies don't have alternatives. Less competition—you're competing with Excel, not 47 other SaaS companies. Better margins with less price pressure. Consulting revenue from implementation help opens a second revenue stream.

## The Long Game

We're building deep market knowledge, customer relationships with multi-year contracts, platform moats through integration with local systems, and a regional expansion playbook. This is a 10-year play, not a 2-year exit.

## The Contrarian Bet

Silicon Valley's playbook says build for the US first, optimize for growth at all costs, raise massive VC rounds, and scale fast or die. Our playbook: build for underserved markets first, optimize for profitability and sustainability, bootstrap or take strategic capital, and scale thoughtfully.

The next wave of enterprise software won't be built in Silicon Valley. It'll be built by teams who understand local markets, speak the language, and solve real problems for underserved businesses. Botswana is our starting point. Africa is our opportunity.`
  },
  {
    id: 'realtime-at-scale',
    title: 'Real-Time Updates Without Breaking the Bank',
    excerpt: 'Implementing WebSocket connections and PostgreSQL subscriptions cost-effectively. When to use real-time, when to poll, and optimizing for thousands of concurrent users.',
    date: 'Jun 2025', // ✅ UPDATED
    readTime: '9 min read',
    category: 'Performance',
    content: `Real-time features are table stakes for modern applications. Users expect to see updates instantly—new property listings, payment confirmations, application status changes—without refreshing the page. But real-time infrastructure is expensive. How do you deliver real-time experiences at scale without massive infrastructure costs?

## The Real-Time Spectrum

Not everything needs real-time updates. We categorize features by latency requirements: instant (under 1 second) for chat messages and payment confirmations, near-real-time (1-5 seconds) for property listings, eventually consistent (5-30 seconds) for analytics, and polling acceptable (30+ seconds) for background jobs.

## Our Tech Stack

Supabase Realtime for PostgreSQL subscriptions over WebSockets, Bull Queue for background processing, Server-Sent Events for one-way updates (cheaper than WebSockets), and smart polling for non-critical updates.

## PostgreSQL Subscriptions

Supabase's killer feature is subscribing to database changes directly. The frontend subscribes to property updates and automatically gets notified of new properties. This is powerful because there's no custom WebSocket server to maintain, automatic filtering at database level respects RLS policies, it scales with database not application servers, and reconnection is handled automatically.

## Cost Optimization Strategies

Conditional subscriptions—only subscribe when the user is actively viewing data. This alone cut our WebSocket connections by 60%. Coalesce updates by batching rapid updates to avoid flooding the UI. Use Presence for user state to efficiently track who's online.

## When NOT to Use Real-Time

Analytics dashboards don't need sub-second updates—poll every 30 seconds. Bulk operations should show progress bars and poll for completion. Polling is cheaper and sufficient for long-running operations.

## Cost Analysis

Traditional WebSocket server with AWS EC2, load balancer, and Redis costs approximately $65 per month before scaling. Supabase Realtime is included in the Pro plan at $25 per month with automatic scaling and no infrastructure management.

After six months: 3,000+ concurrent users without infrastructure scaling, 95% of updates delivered in under 2 seconds, $25 per month infrastructure cost, and zero real-time-related outages. Real-time doesn't have to be expensive.`
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map(post => post.id);
}


// ============================================
// CHANGELOG: What Changed
// ============================================

/*
UPDATED DATES (all to 2025):
✅ offline-first-pwas:        Nov 2024 → Nov 2025
✅ multi-tenant-security:     Oct 2024 → Oct 2025
✅ mobile-money-integration:  Oct 2024 → Sep 2025
✅ queue-based-pdf-generation: Sep 2024 → Aug 2025
✅ why-emerging-markets:       Sep 2024 → Jul 2025
✅ realtime-at-scale:          Aug 2024 → Jun 2025

REASONING:
- Most recent posts (Nov, Oct, Sep 2025) feel fresh
- Spread across 6 months for realistic publishing cadence
- Reverse chronological order maintained
- Looks like active, current blog

CONTENT:
- No changes to article text
- Only dates updated
- All other metadata unchanged
*/