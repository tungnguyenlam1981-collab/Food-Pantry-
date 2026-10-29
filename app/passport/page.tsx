"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { recipes } from '@/data/recipes';

export default function PassportPage() {
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

  const savedItems = recipes.filter((recipe) => savedRecipes.includes(recipe.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Passport</p>
          <h1 className="text-3xl font-bold text-ink">Saved recipes</h1>
        </div>
        <Link href="/" className="rounded-xl bg-olive px-4 py-2 text-sm font-medium text-white">Back to home</Link>
      </div>

      {savedItems.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
          Your passport is empty right now. Save recipes from the homepage to build your collection.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {savedItems.map((recipe) => (
            <article key={recipe.slug} className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-soft">
              <img src={recipe.image} alt={recipe.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{recipe.country}</p>
                <h2 className="mt-2 text-xl font-semibold text-ink">{recipe.title}</h2>
                <div className="mt-3 flex items-center justify-between text-sm text-stone-600">
                  <span>⏱ {recipe.time}</span>
                  <span>🥘 {recipe.servings} servings</span>
                </div>
                <Link href={`/recipe/${recipe.slug}`} className="mt-4 inline-flex rounded-xl bg-olive px-4 py-2 font-medium text-white">
                  View recipe
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
