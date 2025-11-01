// app/page.tsx
import HomePage from '@/components/HomePage';

export const metadata = {
  title: 'BITROOT - Enterprise Software for Emerging Markets',
  description: 'Production-grade platforms serving thousands of users across critical infrastructure. Built for scale, security, and challenging market conditions in Botswana and Africa.',
  openGraph: {
    title: 'BITROOT - Enterprise Software for Emerging Markets',
    description: 'Production-grade platforms serving thousands of users across critical infrastructure.',
    type: 'website',
  },
};

export default function Home() {
  return <HomePage />;
}