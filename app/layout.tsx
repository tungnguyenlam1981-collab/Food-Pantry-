import type { Metadata } from 'next';
import './globals.css';
import { AppHeader, SiteFooter } from '@/components/site-shell';

export const metadata: Metadata = {
  title: 'Pantry Passport',
  description: 'A student-led prototype for discovering recipes from ingredients already on hand.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f7f3e9] text-ink antialiased">
        <AppHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
