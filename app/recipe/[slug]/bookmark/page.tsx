import Link from 'next/link';
import { recipes } from '@/data/recipes';
import { normalizeIngredient, calculateRecipeMatch } from '@/lib/recipe-utils';

export default function RecipeBookmarkPage({ params, searchParams }: { params: { slug: string }; searchParams?: { ingredients?: string | string[] } }) {
  const recipe = recipes.find((item) => item.slug === params.slug);
  if (!recipe) return null;

  const selectedInput = Array.isArray(searchParams?.ingredients)
    ? searchParams.ingredients.join(',')
    : searchParams?.ingredients || '';
  const userIngredients = selectedInput
    .split(',')
    .map((value) => normalizeIngredient(value))
    .filter(Boolean);
  const match = calculateRecipeMatch(userIngredients, recipe);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex items-center justify-between no-print">
        <Link href={`/recipe/${recipe.slug}?ingredients=${encodeURIComponent(userIngredients.join(','))}`} className="text-sm font-medium text-terracotta">
          ← Back to recipe
        </Link>
        <button onClick={() => window.print()} className="rounded-xl bg-olive px-4 py-2 text-sm font-medium text-white">
          Print bookmark
        </button>
      </div>

      <div className="rounded-[1.75rem] border-2 border-dashed border-stone-400 bg-[#fdf9f2] p-5 shadow-soft print:shadow-none">
        <div className="flex items-center justify-between border-b border-stone-300 pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">Pantry Passport</p>
            <h1 className="mt-1 text-2xl font-bold text-ink">{recipe.title}</h1>
          </div>
          <div className="rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-olive">
            {recipe.country}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1.3fr,0.7fr]">
          <div>
            <p className="text-sm font-semibold text-stone-700">Ingredients</p>
            <ul className="mt-2 space-y-1 text-sm text-stone-700">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.item}>• {ingredient.item} {ingredient.quantity ? `(${ingredient.quantity})` : ''}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-semibold text-stone-700">Quick instructions</p>
            <ol className="mt-2 space-y-1 text-sm text-stone-700">
              {recipe.instructions.slice(0, 3).map((step, index) => (
                <li key={step}><span className="font-bold text-terracotta">{index + 1}.</span> {step}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Prep</p>
              <p className="mt-2 text-lg font-semibold text-ink">{recipe.time}</p>
            </div>
            <div className="mt-4 h-20 rounded-xl border border-dashed border-stone-300 bg-[#faf7f2] p-3 text-center text-[10px] uppercase tracking-[0.2em] text-stone-500">
              QR code placeholder
              <div className="mt-3 h-10 w-10 rounded-md border border-stone-300 bg-white mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
