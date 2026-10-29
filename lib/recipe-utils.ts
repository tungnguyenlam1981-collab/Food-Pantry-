export type IngredientMatch = {
  recipe: any;
  missingIngredients: string[];
  matchedIngredients: string[];
  requiredCount: number;
  matchedCount: number;
  missingCount: number;
  percentage: number;
};

export function normalizeIngredient(value: string): string {
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/\s*[-–—]\s*/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');

  const aliases: Record<string, string> = {
    garlics: 'garlic',
    garlicclove: 'garlic',
    'black beans': 'beans',
    bean: 'beans',
    chickpeas: 'chickpeas',
    lentil: 'lentils',
    lentils: 'lentils',
    ricecups: 'rice',
    onions: 'onion',
    tomatoe: 'tomato',
    tomatoes: 'tomato',
    carrot: 'carrot',
    carrots: 'carrot',
    noodles: 'noodles',
    pasta: 'pasta',
    oatmeal: 'oatmeal',
    soy: 'soy sauce',
    'soy sauce': 'soy sauce',
    peanutbutter: 'peanut butter',
    'peanut butter': 'peanut butter',
    cilantro: 'cilantro',
    peppers: 'bell pepper',
    'bell peppers': 'bell pepper',
    cannedvegetables: 'canned vegetables',
    canofvegetables: 'canned vegetables',
    peas: 'peas',
    'coconut milk': 'coconut milk',
    spinach: 'spinach',
    potato: 'potato',
    potatoes: 'potato',
    oil: 'oil',
    'olive oil': 'olive oil',
  };

  return aliases[cleaned] || cleaned;
}

export function getRequiredIngredients(recipe: any): string[] {
  return recipe.ingredients.map((ingredient: any) => normalizeIngredient(ingredient.item));
}

export function calculateRecipeMatch(userInput: string[], recipe: any): IngredientMatch {
  const userIngredients = userInput.map(normalizeIngredient);
  const required = getRequiredIngredients(recipe);
  const matched = required.filter((ingredient) => userIngredients.includes(ingredient));
  const missing = required.filter((ingredient) => !userIngredients.includes(ingredient));
  const percentage = required.length === 0 ? 100 : Math.round((matched.length / required.length) * 100);

  return {
    recipe,
    matchedIngredients: matched,
    missingIngredients: missing,
    requiredCount: required.length,
    matchedCount: matched.length,
    missingCount: missing.length,
    percentage,
  };
}

export function compareRecipesWithIngredients(userIngredients: string[], recipes: any[]) {
  return [...recipes]
    .map((recipe) => calculateRecipeMatch(userIngredients, recipe))
    .sort((a, b) => {
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      return a.missingCount - b.missingCount;
    });
}

export function getMissingIngredientHints(missingIngredients: string[]) {
  const map: Record<string, { note: string; location: string }[]> = {
    rice: [{ note: 'Commonly listed pantry item', location: 'USF Food Pantry' }],
    beans: [{ note: 'Commonly listed pantry item', location: 'USF Food Pantry' }],
    lentils: [{ note: 'Commonly listed pantry item', location: 'USF Food Pantry' }],
    pasta: [{ note: 'Commonly listed pantry item', location: 'USF Food Pantry' }],
    oatmeal: [{ note: 'Commonly listed pantry item', location: 'USF Food Pantry' }],
    'peanut butter': [{ note: 'Commonly listed pantry item', location: 'USF Food Pantry' }],
    tomato: [
      { note: 'Availability not confirmed', location: 'Outtahere Café / Undercaf' },
      { note: 'Check with location', location: 'Open Door Café / Lone Mountain Café' },
    ],
    onion: [{ note: 'Check with location', location: 'Open Door Café / Lone Mountain Café' }],
    garlic: [{ note: 'Availability not confirmed', location: 'Open Door Café / Lone Mountain Café' }],
    spinach: [{ note: 'Check with location', location: 'Open Door Café / Lone Mountain Café' }],
    carrot: [{ note: 'Check with location', location: 'Outtahere Café / Undercaf' }],
    potato: [{ note: 'Check with location', location: 'Open Door Café / Lone Mountain Café' }],
    'soy sauce': [{ note: 'Availability not confirmed', location: 'Open Door Café / Lone Mountain Café' }],
    'coconut milk': [{ note: 'Availability not confirmed', location: 'Open Door Café / Lone Mountain Café' }],
    'bell pepper': [{ note: 'Availability not confirmed', location: 'Outtahere Café / Undercaf' }],
    peas: [{ note: 'Check with location', location: 'Open Door Café / Lone Mountain Café' }],
    noodles: [{ note: 'Commonly listed pantry item', location: 'USF Food Pantry' }],
    'canned vegetables': [{ note: 'Commonly listed pantry item', location: 'USF Food Pantry' }],
  };

  return missingIngredients.flatMap((ingredient) =>
    map[ingredient] || [{ note: 'Availability not confirmed', location: 'Check with campus resource' }],
  );
}
