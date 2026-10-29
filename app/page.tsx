"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { officialPantryContact, pantryStaples, recipes, regionButtons } from '@/data/recipes';
import { compareRecipesWithIngredients, getMissingIngredientHints, normalizeIngredient } from '@/lib/recipe-utils';

function AppPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [passportOpen, setPassportOpen] = useState(false);

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
    window.localStorage.setItem('pantry-passport-saves', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const addIngredient = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const normalized = normalizeIngredient(trimmed);
    if (!selectedIngredients.includes(normalized)) {
      setSelectedIngredients((current) => [...current, normalized]);
    }
    setInputValue('');
  };

  const removeIngredient = (item: string) => {
    setSelectedIngredients((current) => current.filter((entry) => entry !== item));
  };

  const runSearch = () => {
    if (selectedIngredients.length === 0) {
      setMatchResults([]);
      return;
    }

    const next = compareRecipesWithIngredients(selectedIngredients, recipes);
    setMatchResults(next);
    const countryFromFirstResult = next[0]?.recipe.country || null;
    setActiveCountry(countryFromFirstResult);
  };

  const filteredResults = useMemo(() => {
    if (!activeCountry) return matchResults;
    return matchResults.filter((match) => match.recipe.country === activeCountry);
  }, [activeCountry, matchResults]);

  const topRecipe = filteredResults[0] || matchResults[0];
  const missingHints = topRecipe ? getMissingIngredientHints(topRecipe.missingIngredients) : [];
  const availableCountries = [...new Set(recipes.map((recipe) => recipe.country))];

  const toggleSaveRecipe = (slug: string) => {
    setSavedRecipes((current) =>
      current.includes(slug) ? current.filter((entry) => entry !== slug) : [...current, slug],
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-[2rem] border border-stone-200 bg-[#f6efe3] p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">Cook with what you have</p>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">One pantry. A world of recipes.</h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              Discover meals from across the world using the ingredients you already have on hand. This prototype is designed for students to explore accessible, flexible cooking ideas without needing a full pantry.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm">
            <p className="font-semibold text-ink">Prototype note</p>
            <p>Sample recipes only. No official USF endorsement, inventory access, or student data collection.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.6fr,0.8fr]">
        <section className="space-y-8">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink">Ingredient match</h3>
              <span className="rounded-full bg-[#ecf4ea] px-2 py-1 text-xs font-medium text-olive">Demo mode</span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="ingredient-input">Add ingredient</label>
              <input
                id="ingredient-input"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addIngredient(inputValue);
                  }
                }}
                placeholder="Add rice, beans, spinach..."
                className="flex-1 rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-base text-ink outline-none transition focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
              />
              <button
                type="button"
                onClick={() => addIngredient(inputValue)}
                className="rounded-xl bg-terracotta px-5 py-3 font-medium text-white transition hover:bg-[#b85d3b]"
              >
                Add
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {pantryStaples.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => addIngredient(item)}
                  className="rounded-full border border-stone-200 bg-[#f7f2ea] px-3 py-1.5 text-sm text-stone-700 transition hover:border-terracotta hover:text-terracotta"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 min-h-[48px] rounded-xl border border-dashed border-stone-300 bg-[#faf7f2] p-3">
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map((ingredient) => (
                  <button
                    key={ingredient}
                    type="button"
                    onClick={() => removeIngredient(ingredient)}
                    className="rounded-full bg-olive px-3 py-1.5 text-sm text-white transition hover:bg-sage"
                    aria-label={`Remove ${ingredient}`}
                  >
                    {ingredient} ×
                  </button>
                ))
              ) : (
                <p className="text-sm text-stone-500">No ingredients added yet. Start with a few pantry staples.</p>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={runSearch}
                className="rounded-xl bg-olive px-5 py-3 font-medium text-white transition hover:bg-[#3d5739]"
              >
                Find My Recipes
              </button>
              <button
                type="button"
                onClick={() => setSelectedIngredients([])}
                className="rounded-xl border border-stone-300 bg-white px-5 py-3 font-medium text-stone-700 transition hover:border-stone-400"
              >
                Clear all
              </button>
            </div>
          </div>

          <div id="explore" className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-semibold text-ink">Interactive world map</h3>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <span className="h-2.5 w-2.5 rounded-full bg-terracotta"></span>
                <span>Matching countries</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-[#f8f3e2] p-3">
              <div className="relative h-[280px] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_top,_#f7f0de,_#edf2dd_40%,_#dfe7d5_100%)]">
                <svg viewBox="0 0 800 360" className="h-full w-full" role="img" aria-label="Illustrated world map with recipe countries highlighted">
                  <path d="M60 140 L150 100 L200 145 L215 120 L295 130 L290 200 L215 232 L180 210 L130 220 L80 190 Z" fill="#d6d8b8" opacity="0.9" />
                  <path d="M335 120 L470 92 L525 120 L560 176 L515 218 L435 240 L370 200 L340 160 Z" fill="#cfe1c4" opacity="0.9" />
                  <path d="M470 210 L565 200 L620 245 L590 305 L520 292 L475 255 Z" fill="#d7d2b9" opacity="0.9" />
                  <path d="M600 120 L690 110 L760 150 L740 215 L655 230 L607 200 Z" fill="#d3d9c8" opacity="0.9" />
                  <path d="M670 235 L745 245 L770 290 L665 320 L615 280 Z" fill="#d9ccb1" opacity="0.9" />
                </svg>

                {regionButtons.map((region) => {
                  const isActive = activeCountry === region.label || (matchResults.some((match) => match.recipe.country === region.label) && activeCountry === region.label);
                  return (
                    <button
                      key={region.label}
                      type="button"
                      onClick={() => setActiveCountry(region.label)}
                      style={{ left: region.x, top: region.y }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[11px] font-semibold shadow-sm transition ${
                        isActive ? 'border-terracotta bg-terracotta text-white' : 'border-stone-300 bg-white/80 text-stone-700 hover:border-terracotta'
                      }`}
                    >
                      {region.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {availableCountries.map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => setActiveCountry(country)}
                  className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                    activeCountry === country
                      ? 'border-terracotta bg-[#fef1e7] text-terracotta'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink">Recipes & matches</h3>
              {matchResults.length > 0 && (
                <span className="text-sm text-stone-600">{filteredResults.length} match{filteredResults.length === 1 ? '' : 'es'}</span>
              )}
            </div>

            {matchResults.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-[#faf7f2] p-6 text-sm text-stone-600">
                Add ingredients to compare against the sample recipe library and see the closest options.
              </div>
            ) : (
              <div className="grid gap-5 xl:grid-cols-2">
                {filteredResults.map((match) => {
                  const saveEnabled = savedRecipes.includes(match.recipe.slug);
                  return (
                    <article key={match.recipe.slug} className="overflow-hidden rounded-2xl border border-stone-200 bg-[#fcfaf7]">
                      <img src={match.recipe.image} alt={match.recipe.title} className="h-44 w-full object-cover" />
                      <div className="space-y-4 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{match.recipe.country}</p>
                            <h4 className="mt-1 text-xl font-semibold text-ink">{match.recipe.title}</h4>
                          </div>
                          <span className="rounded-full bg-[#ecf4ea] px-2.5 py-1 text-[11px] font-medium text-olive">
                            {match.percentage}% match
                          </span>
                        </div>

                        <div className="flex gap-4 text-sm text-stone-600">
                          <span>⏱ {match.recipe.time}</span>
                          <span>🥘 {match.recipe.ingredients.length} required</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="rounded-xl bg-[#edf3ee] p-2.5">
                            <p className="text-stone-500">Available</p>
                            <p className="font-semibold text-olive">{match.matchedCount}</p>
                          </div>
                          <div className="rounded-xl bg-[#fbeee8] p-2.5">
                            <p className="text-stone-500">Missing</p>
                            <p className="font-semibold text-terracotta">{match.missingCount}</p>
                          </div>
                        </div>

                        <div>
                          <p className="mb-1 text-sm font-medium text-stone-700">Missing ingredients</p>
                          <ul className="text-sm text-stone-600">
                            {match.missingIngredients.length > 0 ? (
                              match.missingIngredients.map((ingredient) => <li key={ingredient}>• {ingredient}</li>)
                            ) : (
                              <li>None — this recipe fits your current ingredients set.</li>
                            )}
                          </ul>
                        </div>

                        <div className="flex gap-3">
                          <Link
                            href={`/recipe/${match.recipe.slug}?ingredients=${encodeURIComponent(selectedIngredients.join(','))}`}
                            className="flex-1 rounded-xl bg-olive px-4 py-2.5 text-center font-medium text-white transition hover:bg-[#3d5739]"
                          >
                            View Recipe
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleSaveRecipe(match.recipe.slug)}
                            className={`rounded-xl border px-4 py-2.5 font-medium transition ${
                              saveEnabled
                                ? 'border-terracotta bg-[#fef1e7] text-terracotta'
                                : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                            }`}
                          >
                            {saveEnabled ? 'Saved' : 'Save to Passport'}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </section>

        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className={`rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft ${passportOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink">My Passport</h3>
              <button type="button" className="lg:hidden" onClick={() => setPassportOpen(false)}>
                Close
              </button>
            </div>

            {savedRecipes.length === 0 ? (
              <div className="rounded-2xl bg-[#faf7f2] p-4 text-sm text-stone-600">
                Save your favorite recipes to build a travel-style passport of meals you want to try.
              </div>
            ) : (
              <div className="space-y-3">
                {savedRecipes.map((slug) => {
                  const recipe = recipes.find((item) => item.slug === slug);
                  if (!recipe) return null;
                  return (
                    <div key={recipe.slug} className="rounded-2xl border border-stone-200 bg-[#fcfaf7] p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{recipe.country}</p>
                          <p className="mt-1 font-semibold text-ink">{recipe.title}</p>
                        </div>
                        <span className="rounded-full bg-[#ecf4ea] px-2 py-0.5 text-[10px] font-medium text-olive">Stamp</span>
                      </div>
                      <Link href={`/recipe/${recipe.slug}`} className="mt-3 inline-flex text-sm font-medium text-terracotta">
                        View recipe →
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            <Link href="/passport" className="mt-5 block rounded-xl bg-olive px-4 py-3 text-center font-medium text-white transition hover:bg-[#3d5739]">
              Open full passport
            </Link>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-terracotta px-4 py-3 font-medium text-white lg:hidden"
            onClick={() => setPassportOpen((current) => !current)}
          >
            {passportOpen ? 'Hide passport' : 'Show passport'}
          </button>
        </aside>
      </div>

      {topRecipe && (
        <section className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-ink">Where to find missing ingredients</h3>
            <span className="text-sm text-stone-600">Sample campus guidance</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {missingHints.length > 0 ? (
              missingHints.map((hint, index) => (
                <div key={`${hint.location}-${index}`} className="rounded-2xl border border-stone-200 bg-[#faf7f2] p-4">
                  <p className="text-sm font-semibold text-ink">{hint.location}</p>
                  <p className="mt-2 text-sm text-stone-600">{hint.note}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-[#faf7f2] p-4 text-sm text-stone-600">
                You have enough ingredients for the top match. Keep exploring to find the next recipe idea.
              </div>
            )}
          </div>

          <div className="mt-5 rounded-2xl border border-stone-200 bg-[#f3ead9] p-4 text-sm text-stone-700">
            <p className="font-semibold text-ink">Location guidance</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>USF Food Pantry: commonly listed pantry items, including rice, beans, pasta, oatmeal, ramen, peanut butter, canned vegetables, and other staples.</li>
              <li>Open Door Café / Lone Mountain Café and Outtahere Café / Undercaf: availability is not confirmed for grocery ingredients, so check with the location before relying on them.</li>
              <li>Official pantry contact page: <a href={officialPantryContact} target="_blank" rel="noopener noreferrer" className="underline text-terracotta">USF Food Pantry contact</a></li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default AppPage;
