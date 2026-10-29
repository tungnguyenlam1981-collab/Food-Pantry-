import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/#explore', label: 'Explore Recipes' },
  { href: '/passport', label: 'My Passport' },
  { href: '/submit', label: 'Submit Recipe' },
  { href: '/volunteer', label: 'Volunteer' },
];

export function AppHeader() {
  return (
    <header className="border-b border-stone-200 bg-[#f8f2e8]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-lg font-bold text-olive">
            P
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">USF prototype</p>
            <h1 className="text-xl font-semibold text-ink">Pantry Passport</h1>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-stone-700 transition hover:text-terracotta">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/passport"
          className="rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:border-terracotta hover:text-terracotta"
        >
          My Passport
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-[#f3ead9]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-stone-700 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-ink">Pantry Passport</p>
          <p>Prototype concept for classroom and student-team exploration.</p>
        </div>
        <div className="flex items-center gap-3">
          <span>Sample recipes only. Not an official USF service.</span>
          <a
            href="https://www.instagram.com/usfpantry/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open USF Pantry Instagram"
            className="rounded-full bg-olive px-3 py-2 text-white transition hover:bg-sage"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem('pantry-passport-saves');
    if (raw) {
      try {
        setSavedRecipes(JSON.parse(raw));
      } catch {
        setSavedRecipes([]);
      }
    }
  }, []);

  useEffect(() => {
    if (savedRecipes.length > 0 || window.localStorage.getItem('pantry-passport-saves')) {
      window.localStorage.setItem('pantry-passport-saves', JSON.stringify(savedRecipes));
    }
  }, [savedRecipes]);

  return { savedRecipes, setSavedRecipes };
}
