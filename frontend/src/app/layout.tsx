import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SERAI - Boutique Hotel Booking Reinvented',
  description: 'Discover and book unique boutique hotels with AI-powered pricing and personalized experiences.',
  keywords: ['hotel', 'booking', 'boutique', 'travel', 'hospitality', 'AI'],
  authors: [{ name: 'SERAI Team' }],
  icons: {
    icon: '/Serai-Favicon-Black.ico',
    shortcut: '/Serai-Favicon-Black.ico',
    apple: '/Serai-Favicon-Black.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
