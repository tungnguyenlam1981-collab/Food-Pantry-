export type IngredientLine = {
  item: string;
  quantity?: string;
};

export type Recipe = {
  slug: string;
  title: string;
  country: string;
  image: string;
  time: string;
  servings: number;
  story: string;
  ingredients: IngredientLine[];
  optionalIngredients: IngredientLine[];
  equipment: string[];
  instructions: string[];
  contributor?: string;
  sourceNotes: string[];
  possibleSources: { ingredient: string; note: string; location: string }[];
};

export const recipes: Recipe[] = [
  {
    slug: 'coconut-rice-and-lentil-curry',
    title: 'Coconut Rice & Lentil Curry',
    country: 'India',
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    time: '30 minutes',
    servings: 2,
    story:
      'A pantry-friendly comfort meal inspired by everyday home cooking traditions from South Asia.',
    ingredients: [
      { item: 'rice', quantity: '1 cup' },
      { item: 'red lentils', quantity: '1/2 cup' },
      { item: 'onion', quantity: '1 small' },
      { item: 'garlic', quantity: '3 cloves' },
      { item: 'coconut milk', quantity: '1 can' },
      { item: 'spinach', quantity: '2 cups' },
      { item: 'tomato', quantity: '1' },
    ],
    optionalIngredients: [
      { item: 'cumin', quantity: '1 tsp' },
      { item: 'coriander', quantity: '1 tsp' },
      { item: 'chili flakes', quantity: 'optional' },
    ],
    equipment: ['Pot', 'Knife', 'Measuring Cup'],
    instructions: [
      'Rinse the lentils and rice lightly and set aside.',
      'Sauté onion and garlic in a pot until softened.',
      'Add tomato, lentils, and coconut milk with enough water to simmer.',
      'Cook until the lentils soften and the sauce thickens.',
      'Fold in spinach and serve over cooked rice.',
    ],
    sourceNotes: [
      'A simple, low-cost dish that works well with pantry staples and produce.',
      'Sample recipe only; ingredients may vary by pantry stock.',
    ],
    possibleSources: [
      { ingredient: 'rice', note: 'Commonly listed pantry item', location: 'USF Food Pantry' },
      { ingredient: 'beans', note: 'Commonly listed pantry item', location: 'USF Food Pantry' },
      { ingredient: 'spinach', note: 'Check with location', location: 'Open Door Café / Lone Mountain Café' },
    ],
  },
  {
    slug: 'mexican-rice-and-bean-skillet',
    title: 'Mexican Rice & Bean Skillet',
    country: 'Mexico',
    image:
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
    time: '25 minutes',
    servings: 2,
    story:
      'A quick skillet built around pantry staples and vibrant flavors common in home-cooked meals.',
    ingredients: [
      { item: 'rice', quantity: '1 cup' },
      { item: 'black beans', quantity: '1 cup' },
      { item: 'onion', quantity: '1/2' },
      { item: 'garlic', quantity: '2 cloves' },
      { item: 'tomato', quantity: '1 cup diced' },
      { item: 'corn', quantity: '1/2 cup' },
    ],
    optionalIngredients: [
      { item: 'lime', quantity: '1/2' },
      { item: 'cilantro', quantity: 'handful' },
      { item: 'chili powder', quantity: '1 tsp' },
    ],
    equipment: ['Skillet', 'Spoon', 'Lid'],
    instructions: [
      'Cook rice until fluffy or use leftover rice if available.',
      'Sauté onion and garlic until fragrant.',
      'Add tomato, beans, and corn and simmer briefly.',
      'Fold in rice and season to taste with pantry spices.',
      'Serve warm with lime or herbs if available.',
    ],
    sourceNotes: [
      'This recipe is designed to use affordable, high-yield pantry items.',
      'Sample recipe only and not an official USF recipe.',
    ],
    possibleSources: [
      { ingredient: 'rice', note: 'Commonly listed pantry item', location: 'USF Food Pantry' },
      { ingredient: 'beans', note: 'Commonly listed pantry item', location: 'USF Food Pantry' },
      { ingredient: 'tomato', note: 'Availability not confirmed', location: 'Outtahere Café / Undercaf' },
    ],
  },
  {
    slug: 'vegetable-noodle-bowl',
    title: 'Vegetable Noodle Bowl',
    country: 'Vietnam',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    time: '20 minutes',
    servings: 2,
    story:
      'A noodle bowl with crisp vegetables and a savory sauce inspired by quick home meals.',
    ingredients: [
      { item: 'noodles', quantity: '2 servings' },
      { item: 'carrot', quantity: '1' },
      { item: 'cabbage', quantity: '1 cup' },
      { item: 'onion', quantity: '1/2' },
      { item: 'garlic', quantity: '2 cloves' },
      { item: 'soy sauce', quantity: '2 tbsp' },
    ],
    optionalIngredients: [
      { item: 'peanut butter', quantity: '1 tbsp' },
      { item: 'chili', quantity: 'optional' },
      { item: 'lime', quantity: 'optional' },
    ],
    equipment: ['Pot', 'Pan', 'Tongs'],
    instructions: [
      'Cook noodles according to package directions and set aside.',
      'Sauté onion, garlic, carrot, and cabbage until tender.',
      'Add soy sauce and toss with noodles.',
      'Finish with optional peanut sauce or lime if available.',
    ],
    sourceNotes: [
      'Quick, flexible, and easy to modify with pantry items.',
      'Prototype content only.',
    ],
    possibleSources: [
      { ingredient: 'noodles', note: 'Commonly listed pantry item', location: 'USF Food Pantry' },
      { ingredient: 'soy sauce', note: 'Availability not confirmed', location: 'Open Door Café / Lone Mountain Café' },
      { ingredient: 'carrot', note: 'Check with location', location: 'Outtahere Café / Undercaf' },
    ],
  },
  {
    slug: 'ethiopian-lentil-stew',
    title: 'Ethiopian Lentil Stew',
    country: 'Ethiopia',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    time: '35 minutes',
    servings: 2,
    story:
      'A warming lentil stew that celebrates the everyday richness of plant-based home meals.',
    ingredients: [
      { item: 'lentils', quantity: '1 cup' },
      { item: 'onion', quantity: '1' },
      { item: 'garlic', quantity: '3 cloves' },
      { item: 'tomato', quantity: '1 can' },
      { item: 'carrot', quantity: '1' },
      { item: 'potato', quantity: '1 small' },
    ],
    optionalIngredients: [
      { item: 'berbere spice', quantity: '1 tsp' },
      { item: 'olive oil', quantity: '1 tbsp' },
      { item: 'spinach', quantity: 'optional' },
    ],
    equipment: ['Large Pot', 'Wooden Spoon', 'Knife'],
    instructions: [
      'Sauté onion and garlic until softened.',
      'Add chopped carrot, potato, lentils, and tomato to the pot.',
      'Cover with water and simmer until the lentils break down.',
      'Season with pantry spices and serve with rice or bread if available.',
    ],
    sourceNotes: [
      'This sample recipe reflects a broad, community-centered cooking tradition.',
      'No real student story or personal attribution is included.',
    ],
    possibleSources: [
      { ingredient: 'lentils', note: 'Commonly listed pantry item', location: 'USF Food Pantry' },
      { ingredient: 'tomato', note: 'Availability not confirmed', location: 'Outtahere Café / Undercaf' },
      { ingredient: 'potato', note: 'Check with location', location: 'Open Door Café / Lone Mountain Café' },
    ],
  },
  {
    slug: 'jollof-style-rice-bowl',
    title: 'Jollof-Style Rice Bowl',
    country: 'Nigeria',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    time: '35 minutes',
    servings: 2,
    story:
      'A one-pot rice dish built for campus living, focused on flavor and pantry flexibility.',
    ingredients: [
      { item: 'rice', quantity: '1 cup' },
      { item: 'onion', quantity: '1' },
      { item: 'garlic', quantity: '3 cloves' },
      { item: 'tomato', quantity: '1 cup' },
      { item: 'peas', quantity: '1/2 cup' },
      { item: 'carrot', quantity: '1' },
    ],
    optionalIngredients: [
      { item: 'bell pepper', quantity: '1' },
      { item: 'thyme', quantity: '1 tsp' },
      { item: 'chili', quantity: 'optional' },
    ],
    equipment: ['Pot', 'Lid', 'Measuring Cup'],
    instructions: [
      'Cook onion and garlic until aromatic.',
      'Stir in tomato and vegetables, then add rice.',
      'Simmer with water until the rice is tender and flavorful.',
      'Add peas and carrots near the end for texture.',
    ],
    sourceNotes: [
      'A flavorful sample recipe for prototype storytelling and matching logic.',
      'Not tied to any real student identity or approved USF program.',
    ],
    possibleSources: [
      { ingredient: 'rice', note: 'Commonly listed pantry item', location: 'USF Food Pantry' },
      { ingredient: 'peas', note: 'Check with location', location: 'Open Door Café / Lone Mountain Café' },
      { ingredient: 'carrot', note: 'Availability not confirmed', location: 'Outtahere Café / Undercaf' },
    ],
  },
  {
    slug: 'chickpea-pasta-spotlight',
    title: 'Chickpea Tomato Pasta',
    country: 'Italy',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
    time: '22 minutes',
    servings: 2,
    story:
      'A simple pasta inspired by sturdy pantry meals built around beans, tomatoes, and herbs.',
    ingredients: [
      { item: 'pasta', quantity: '2 servings' },
      { item: 'chickpeas', quantity: '1 cup' },
      { item: 'garlic', quantity: '2 cloves' },
      { item: 'tomato', quantity: '1 can' },
      { item: 'onion', quantity: '1/2' },
    ],
    optionalIngredients: [
      { item: 'olive oil', quantity: '1 tbsp' },
      { item: 'basil', quantity: 'optional' },
      { item: 'parmesan', quantity: 'optional' },
    ],
    equipment: ['Pot', 'Pan', 'Colander'],
    instructions: [
      'Boil pasta until tender and reserve a little cooking water.',
      'Sauté onion and garlic, then stir in tomato and chickpeas.',
      'Fold the pasta into the sauce and loosen with a splash of water.',
      'Finish with herbs or cheese if available.',
    ],
    sourceNotes: [
      'A familiar student-friendly meal that works with pantry basics.',
      'Sample recipe for prototype use only.',
    ],
    possibleSources: [
      { ingredient: 'pasta', note: 'Commonly listed pantry item', location: 'USF Food Pantry' },
      { ingredient: 'tomato', note: 'Check with location', location: 'Outtahere Café / Undercaf' },
      { ingredient: 'garlic', note: 'Availability not confirmed', location: 'Open Door Café / Lone Mountain Café' },
    ],
  },
];

export const pantryStaples = [
  'rice',
  'beans',
  'lentils',
  'pasta',
  'oatmeal',
  'peanut butter',
  'onion',
  'garlic',
  'tomato',
  'canned vegetables',
  'spinach',
  'carrot',
  'potato',
  'soy sauce',
  'oil',
];

export const officialPantryContact = 'https://myusf.usfca.edu/student-life/health-promotion-services/food-pantry/contact';

export const regionButtons = [
  { label: 'Mexico', x: '26%', y: '30%' },
  { label: 'India', x: '66%', y: '38%' },
  { label: 'Nigeria', x: '49%', y: '52%' },
  { label: 'Ethiopia', x: '55%', y: '49%' },
  { label: 'Vietnam', x: '76%', y: '48%' },
  { label: 'Italy', x: '47%', y: '42%' },
];

export const sourceDescriptors = [
  'Commonly listed pantry item',
  'Availability not confirmed',
  'Check with location',
];
