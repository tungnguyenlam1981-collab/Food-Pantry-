import { notFound } from 'next/navigation';
import Link from 'next/link';
import { recipes } from '@/data/recipes';
import { calculateRecipeMatch, normalizeIngredient } from '@/lib/recipe-utils';

export default function RecipeDetailPage({ params, searchParams }: { params: { slug: string }; searchParams?: { ingredients?: string | string[] } }) {
  const recipe = recipes.find((item) => item.slug === params.slug);
  if (!recipe) notFound();

  const selectedInput = Array.isArray(searchParams?.ingredients)
    ? searchParams.ingredients.join(',')
    : searchParams?.ingredients || '';
  const userIngredients = selectedInput
    .split(',')
    .map((value) => normalizeIngredient(value))
    .filter(Boolean);
  const match = calculateRecipeMatch(userIngredients, recipe);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/" className="text-sm font-medium text-terracotta">← Back to recipes</Link>
        <div className="flex gap-3">
          <Link href={`/recipe/${recipe.slug}/bookmark?ingredients=${encodeURIComponent(userIngredients.join(','))}`} className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700">
            Printable bookmark
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-soft">
        <img src={recipe.image} alt={recipe.title} className="h-72 w-full object-cover" />
        <div className="grid gap-8 p-6 lg:grid-cols-[1.3fr,0.7fr] lg:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{recipe.country}</p>
            <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{recipe.title}</h1>
            <p className="mt-4 text-base leading-7 text-stone-700">{recipe.story}</p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-stone-700">
              <span className="rounded-full bg-[#edf3ee] px-3 py-1.5">⏱ {recipe.time}</span>
              <span className="rounded-full bg-[#fbeee8] px-3 py-1.5">👥 {recipe.servings} servings</span>
              <span className="rounded-full bg-[#f6f1de] px-3 py-1.5">{match.percentage}% match</span>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-ink">Required ingredients</h2>
                <ul className="mt-3 space-y-2 text-sm text-stone-700">
                  {recipe.ingredients.map((item) => (
                    <li key={item.item} className="flex justify-between gap-3 rounded-xl bg-stone-50 px-3 py-2">
                      <span>{item.item}</span>
                      <span className="text-stone-500">{item.quantity || 'as needed'}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-ink">Optional ingredients</h2>
                <ul className="mt-3 space-y-2 text-sm text-stone-700">
                  {recipe.optionalIngredients.length > 0 ? (
                    recipe.optionalIngredients.map((item) => (
                      <li key={item.item} className="rounded-xl border border-dashed border-stone-300 px-3 py-2">
                        {item.item} {item.quantity && `• ${item.quantity}`}
                      </li>
                    ))
                  ) : (
                    <li className="rounded-xl border border-dashed border-stone-300 px-3 py-2">No optional ingredients listed.</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-ink">Cooking instructions</h2>
              <ol className="mt-3 space-y-3 text-sm leading-6 text-stone-700">
                {recipe.instructions.map((step, index) => (
                  <li key={step} className="rounded-xl bg-[#faf7f2] p-3">
                    <span className="mr-2 font-bold text-terracotta">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-stone-200 bg-[#faf7f2] p-4">
              <h2 className="text-lg font-semibold text-ink">Your pantry match</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-[#edf3ee] p-3">
                  <p className="text-stone-500">Available</p>
                  <p className="text-xl font-semibold text-olive">{match.matchedCount}</p>
                </div>
                <div className="rounded-xl bg-[#fbeee8] p-3">
                  <p className="text-stone-500">Missing</p>
                  <p className="text-xl font-semibold text-terracotta">{match.missingCount}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-stone-700">
                {match.missingCount > 0
                  ? `You are missing: ${match.missingIngredients.join(', ')}.`
                  : 'This recipe can be prepared with your selected ingredients.'}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-ink">Equipment</h2>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {recipe.equipment.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-ink">Possible ingredient sources</h2>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {recipe.possibleSources.map((source) => (
                  <li key={source.ingredient}>
                    <span className="font-medium">{source.ingredient}</span> — {source.note} ({source.location})
                  </li>
                ))}
              </ul>
            </div>

            {recipe.contributor && (
              <div className="rounded-2xl border border-stone-200 bg-[#f3ead9] p-4 text-sm text-stone-700">
                <p className="font-semibold text-ink">Contributor story</p>
                <p className="mt-2">{recipe.contributor}</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
