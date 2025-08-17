import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { getUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'PrepEdge AI - Smarter prep. Sharper scores.',
  description: 'AI-powered SAT prep that adapts to you. Get personalized study plans, adaptive practice, and expert explanations to boost your score.',
  keywords: 'SAT prep, AI tutoring, adaptive learning, college prep, test preparation',
  authors: [{ name: 'PrepEdge AI' }],
  openGraph: {
    title: 'PrepEdge AI - Smarter prep. Sharper scores.',
    description: 'AI-powered SAT prep that adapts to you. Get personalized study plans, adaptive practice, and expert explanations to boost your score.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrepEdge AI - Smarter prep. Sharper scores.',
    description: 'AI-powered SAT prep that adapts to you.',
  },
};

export const viewport: Viewport = {
  maximumScale: 1
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white text-black ${inter.className}`}
    >
      <body className="min-h-[100dvh] bg-white antialiased">
        <SWRConfig
          value={{
            fallback: {
              '/api/user': getUser(),
            }
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
