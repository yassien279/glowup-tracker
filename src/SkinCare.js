import React, { useState } from "react";

// Skin care product database (expand this array for more options!)
const skincareProducts = [
  {
    name: "CeraVe Hydrating Cleanser",
    type: "cleanser",
    price: 50,
    rating: 9.2,
    bestFor: ["Dry", "Sensitive", "Normal", "Combination"],
    helpsWith: ["Dryness", "Redness"],
    explanation: "Gentle, non-foaming cleanser that hydrates and soothes.",
    link: "https://www.amazon.ae/CeraVe-Hydrating-Facial-Cleanser/dp/B01MSSDEPK/",
  },
  {
    name: "La Roche-Posay Effaclar Duo",
    type: "treatment",
    price: 95,
    rating: 9.0,
    bestFor: ["Oily", "Combination", "Acne"],
    helpsWith: ["Acne", "Oiliness", "Pores"],
    explanation: "Targets breakouts, unclogs pores, and controls shine.",
    link: "https://www.amazon.ae/Roche-Posay-Effaclar-Acne-Treatment/dp/B00HHGIWDC/",
  },
  {
    name: "Neutrogena Hydro Boost Gel",
    type: "moisturizer",
    price: 60,
    rating: 8.9,
    bestFor: ["Oily", "Combination", "Dry", "Normal"],
    helpsWith: ["Hydration", "Smooth Texture"],
    explanation: "Lightweight, oil-free hydration perfect for layering.",
    link: "https://www.amazon.ae/Neutrogena-Hydro-Boost-Water-Moisturizer/dp/B00NR1YIKM/",
  },
  {
    name: "COSRX Snail 96 Mucin Essence",
    type: "serum",
    price: 85,
    rating: 9.3,
    bestFor: ["Dry", "Sensitive", "Normal", "Redness"],
    helpsWith: ["Hydration", "Redness", "Smooth Texture"],
    explanation: "Deeply hydrates and repairs for radiant, healthy skin.",
    link: "https://www.amazon.ae/COSRX-Advanced-Snail-Mucin-Essence/dp/B00PBX3L7K/",
  },
  {
    name: "Nivea Sun UV Face Shine Control SPF 50",
    type: "sunscreen",
    price: 40,
    rating: 8.7,
    bestFor: ["Oily", "Combination", "Normal"],
    helpsWith: ["Pigmentation", "Oiliness"],
    explanation: "Non-greasy sun protection that prevents dark spots and shine.",
    link: "https://www.amazon.ae/NIVEA-Control-Sunscreen-Protection-Skincare/dp/B07B8TZH3F/",
  },
];

const routineSteps = [
  { step: "Cleanser", types: ["cleanser"] },
  { step: "Serum/Essence", types: ["serum"] },
  { step: "Treatment", types: ["treatment"] },
  { step: "Moisturizer", types: ["moisturizer"] },
  { step: "Sunscreen (AM only)", types: ["sunscreen"] },
];

// AI-like advice for skin concerns/goals (you can expand these)
const concernAdvice = {
  "Acne": "Be gentle with your skin! Use a mild cleanser, spot treatments, and non-comedogenic products. Avoid over-washing and always moisturize.",
  "Dryness": "Focus on hydration! Layer hydrating serums and always use a rich moisturizer after cleansing.",
  "Oiliness": "Gel cleansers and lightweight oil-free moisturizers work best. Don’t skip moisturizer even if you're oily.",
  "Pigmentation": "Look for products with niacinamide and use sunscreen every day to prevent dark spots.",
  "Aging/Wrinkles": "Use gentle cleansers, hydrating serums, and sunscreen. Retinol and peptides help with aging.",
  "Dark Spots": "Target with vitamin C and niacinamide serums. Consistent sunscreen is key.",
  "Redness": "Look for soothing ingredients (snail mucin, panthenol, ceramides). Avoid fragrances and harsh scrubs.",
  "Pores": "Gentle exfoliation (like salicylic acid) and lightweight products help keep pores clear."
};

const goalAdvice = {
  "Clear Skin": "Keep your routine simple, gentle, and consistent. Don’t skip cleansing and sunscreen.",
  "Brightening": "Vitamin C serums and regular sunscreen are your friends. Exfoliate weekly if not sensitive.",
  "Hydration": "Layer hydrating products: toner, essence, serum, and moisturizer. Drink plenty of water.",
  "Oil Control": "Look for mattifying and oil-control products, but don’t over-strip your skin.",
  "Anti-Aging": "Gentle cleansing, hydrating serums, retinol (PM), and sunscreen (AM) are key.",
  "Even Skin Tone": "Brightening serums and regular sunscreen help. Don’t pick at blemishes.",
  "Reduce Redness": "Use calming ingredients and avoid hot water and harsh scrubs.",
  "Smooth Texture": "Regular gentle exfoliation (chemical, not physical) and hydration improve skin feel."
};

export default function SkinCare({ profile }) {
  const [photos, setPhotos] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  // Get user details from profile
  const budget = profile.budget;
  const skinType = profile.faceSkinType;
  const skinConcerns = profile.skinConcerns || [];
  const skinGoals = profile.skinGoals || [];

  // Filter + prioritize products for user
  const recommendedProducts = routineSteps.map((step) => {
    // Find product matching skin type, within budget, for the current step
    const match = skincareProducts
      .filter(
        (p) =>
          step.types.includes(p.type) &&
          p.bestFor.some((type) => skinType && type.toLowerCase().includes(skinType.toLowerCase())) &&
          (!skinConcerns.length || skinConcerns.some((c) => p.helpsWith.includes(c)))
      )
      .sort((a, b) => b.rating - a.rating || a.price - b.price)[0];
    return match;
  }).filter(Boolean);

  // Shopping list handlers
  const addToList = (product) => {
    if (!shoppingList.includes(product)) setShoppingList([...shoppingList, product]);
  };
  const removeFromList = (product) => {
    setShoppingList(shoppingList.filter((p) => p !== product));
  };
  const shoppingTotal = shoppingList.reduce((sum, p) => sum + p.price, 0);

  // Photo handlers
  const addPhoto = () => {
    if (photoUrl.trim()) {
      setPhotos([photoUrl, ...photos]);
      setPhotoUrl("");
    }
  };

  // Show top advice for each concern/goal
  const uniqueAdvice = Array.from(
    new Set([
      ...skinConcerns.map((c) => concernAdvice[c]).filter(Boolean),
      ...skinGoals.map((g) => goalAdvice[g]).filter(Boolean),
    ])
  );

  return (
    <div className="p-6 md:p-12 bg-gray-900 min-h-screen">
      {/* Personalized Advice */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-green-300 mb-2">Targeted Skin Advice</h2>
        <div className="mb-4 text-gray-200">
          <b>Skin Type:</b> {skinType || "Not set"}<br />
          <b>Concerns:</b> {skinConcerns.length ? skinConcerns.join(", ") : "None selected"}<br />
          <b>Goals:</b> {skinGoals.length ? skinGoals.join(", ") : "None selected"}<br />
          <b>Budget:</b> AED {budget}
        </div>
        <ul className="list-disc pl-5 text-gray-100">
          {uniqueAdvice.length > 0
            ? uniqueAdvice.map((ad, idx) => <li key={idx}>{ad}</li>)
            : <li>Stay consistent with gentle skincare and SPF for the best results.</li>}
        </ul>
      </div>

      {/* Personalized Routine & Product Recommendations */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Recommended Routine</h2>
        <div className="flex flex-wrap gap-8">
          {recommendedProducts.map((product, idx) => (
            <div key={product.name} className="bg-gray-700 rounded-lg p-4 w-72 flex flex-col justify-between">
              <h3 className="font-bold text-lg text-green-200">{routineSteps[idx].step}</h3>
              <p className="font-semibold text-gray-100 mb-2">{product.name}</p>
              <div className="mb-1 text-green-400 font-semibold">{product.rating}/10</div>
              <div className="text-gray-300 mb-1">AED {product.price}</div>
              <p className="text-sm text-gray-200 mb-2">{product.explanation}</p>
              <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                Buy on Amazon UAE
              </a>
              <button
                className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => addToList(product)}
                disabled={shoppingList.includes(product)}
              >
                Add to Shopping List
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping List */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-gray-100">Shopping List</h2>
        <div className="text-gray-200 mb-2">Total: <b>AED {shoppingTotal}</b> / Budget: AED {budget}</div>
        {shoppingTotal > budget && <div className="text-red-400">Over budget!</div>}
        {shoppingList.map((p) => (
          <div key={p.name} className="flex justify-between text-gray-200 my-1">
            {p.name} (AED {p.price})
            <button className="text-red-400" onClick={() => removeFromList(p)}>Remove</button>
          </div>
        ))}
      </div>

      {/* Progress Photos */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-gray-100">Skin Progress Photos</h2>
        <input
          className="rounded-lg px-3 py-2 bg-gray-700 text-gray-200 w-full my-3"
          placeholder="Paste photo URL here..."
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={addPhoto}>
          Add Photo
        </button>
        <div className="flex gap-3 mt-4 flex-wrap">
          {photos.map((url, idx) => (
            <img key={idx} src={url} alt={`Progress ${idx}`} className="w-24 h-24 rounded-lg object-cover border" />
          ))}
        </div>
      </div>

      {/* Monthly Report */}
      <div className="rounded-xl p-6 bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-gray-100">Monthly Skin Report</h2>
        <div className="text-gray-200">
          <ul>
            {recommendedProducts.map((p) => (
              <li key={p.name}>
                {p.name} – AED {p.price} ({p.rating}/10)
              </li>
            ))}
          </ul>
          <div className="mt-2">Total Spent: <b className="text-green-300">AED {shoppingTotal}</b></div>
        </div>
      </div>
    </div>
  );
}
