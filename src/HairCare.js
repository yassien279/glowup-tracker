import React, { useState } from "react";

// Hair care product database (expand this array as needed)
const hairProducts = [
  {
    name: "As I Am Coconut CoWash",
    type: "cleanser",
    price: 45,
    rating: 9.2,
    bestFor: ["2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"],
    porosity: ["Medium", "High"],
    scalp: ["Dry", "Balanced"],
    explanation: "Gentle, moisturizing cleanser for wavy, curly, and coily hair. Ideal for medium/high porosity.",
    link: "https://www.amazon.ae/dp/B003U6BT8K",
  },
  {
    name: "SheaMoisture Raw Shea Butter Moisture Retention Shampoo",
    type: "shampoo",
    price: 50,
    rating: 8.9,
    bestFor: ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"],
    porosity: ["Low", "Medium"],
    scalp: ["Dry", "Balanced"],
    explanation: "Moisturizes and protects dry, low-porosity hair. Gentle for frequent washing.",
    link: "https://www.amazon.ae/dp/B0038TVHGG",
  },
  {
    name: "Pantene Pro-V Volume Root Lifting Spray",
    type: "styler",
    price: 35,
    rating: 8.7,
    bestFor: ["1A", "1B", "1C", "2A", "2B"],
    porosity: ["Low", "Medium", "High"],
    scalp: ["Oily", "Balanced"],
    explanation: "Great for straight and wavy hair. Adds volume without heaviness. Perfect for oily scalp.",
    link: "https://www.amazon.ae/dp/B01MYZ7V9O",
  },
  {
    name: "Aussie Miracle Curls Leave-In Detangling Milk",
    type: "leave-in",
    price: 32,
    rating: 8.8,
    bestFor: ["2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"],
    porosity: ["Medium", "High"],
    scalp: ["Dry", "Sensitive", "Balanced"],
    explanation: "Eases detangling and hydrates curls. Gentle and affordable.",
    link: "https://www.amazon.ae/dp/B07N8R2PRH",
  },
  {
    name: "Schwarzkopf Got2b Volumizing Powder",
    type: "styler",
    price: 33,
    rating: 8.5,
    bestFor: ["1A", "1B", "1C", "2A"],
    porosity: ["Low", "Medium", "High"],
    scalp: ["Oily", "Balanced"],
    explanation: "Perfect for fine, straight hair needing instant root lift.",
    link: "https://www.amazon.ae/dp/B005IHH6Z4",
  },
  {
    name: "OGX Moroccan Argan Oil Conditioner",
    type: "conditioner",
    price: 55,
    rating: 8.6,
    bestFor: ["1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C"],
    porosity: ["Low", "Medium", "High"],
    scalp: ["Balanced", "Dry"],
    explanation: "Rich conditioner for all hair types except super-fine/straight. Helps with frizz.",
    link: "https://www.amazon.ae/dp/B003Y9GTYE",
  },
  // Add more products for every type as needed!
];

// "AI-like" explanations
const typeAdvice = {
  "1A": "Straight, fine hair: go light on products and avoid weighing hair down.",
  "2A": "Wavy, loose: gentle cleansing and lightweight stylers work well.",
  "2B": "Wavy, defined: hydration and soft hold help control frizz.",
  "2C": "Wavy, thick: needs more moisture, detangling, and curl-friendly stylers.",
  "3A": "Curly, loose: balance moisture and definition.",
  "3B": "Curly, springy: rich conditioners and curl creams help.",
  "3C": "Curly, tight: focus on deep hydration and gentle detangling.",
  "4A": "Coily, soft: creamy cleansers and deep conditioners keep coils happy.",
  "4B": "Coily, dense: thick creams and oils lock in moisture.",
  "4C": "Coily, shrinkage: gentle care, leave-ins, and oils are key.",
};

const porosityAdvice = {
  "Low": "Low porosity: Avoid heavy oils and butters. Use lightweight products and warm water to open cuticles.",
  "Medium": "Medium porosity: Most products work! Focus on routine and regular deep conditioning.",
  "High": "High porosity: Layer leave-ins and seal with oils to retain moisture.",
  "Not sure": "Not sure about porosity? Try both lightweight and richer products and notice how your hair reacts."
};

const scalpAdvice = {
  "Oily": "Oily scalp: Use clarifying shampoo regularly and avoid heavy products at roots.",
  "Dry": "Dry scalp: Moisturize your scalp, avoid sulfates, and wash less frequently.",
  "Balanced": "Balanced scalp: Most shampoos are fine, but listen to your scalp’s needs.",
  "Sensitive": "Sensitive scalp: Avoid fragrance and strong detergents.",
  "Not sure": "Not sure? Track scalp comfort as you test routines."
};

export default function HairCare({ userProfile }) {
  const [shoppingList, setShoppingList] = useState([]);
  const reportMonth = "July 2025";

  // User profile data
  const {
    hairType,
    hairPorosity,
    scalpType,
    budget,
    wantsSimpleRoutine,
    name,
  } = userProfile;

  // Pick up to 4 recommended products matching hair, porosity, scalp, and budget/routine
  const recommendations = hairProducts
    .filter(
      (p) =>
        (!hairType || p.bestFor.includes(hairType)) &&
        (!hairPorosity || p.porosity.includes(hairPorosity)) &&
        (!scalpType || p.scalp.includes(scalpType))
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, wantsSimpleRoutine === "Simple" ? 4 : 6);

  // Shopping list functions
  const addToList = (product) => {
    if (!shoppingList.includes(product)) setShoppingList([...shoppingList, product]);
  };
  const removeFromList = (product) => {
    setShoppingList(shoppingList.filter((p) => p !== product));
  };
  const shoppingTotal = shoppingList.reduce((sum, p) => sum + p.price, 0);

  // Monthly product report
  const monthlyReport = recommendations.map((p) => ({
    name: p.name,
    rating: p.rating,
    price: p.price,
    explanation: p.explanation,
  }));

  // Unique advice
  const adviceList = [
    typeAdvice[hairType],
    porosityAdvice[hairPorosity],
    scalpAdvice[scalpType],
  ].filter(Boolean);

  return (
    <div className="p-6 md:p-12 bg-gray-900 min-h-screen">
      {/* Personalized Advice */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Personalized Hair Advice</h2>
        <div className="mb-4 text-gray-200">
          <b>Name:</b> {name || "User"}<br />
          <b>Hair Type:</b> {hairType || "Not set"}<br />
          <b>Porosity:</b> {hairPorosity || "Not set"}<br />
          <b>Scalp:</b> {scalpType || "Not set"}<br />
          <b>Budget:</b> AED {budget}
        </div>
        <ul className="list-disc pl-5 text-gray-100">
          {adviceList.length
            ? adviceList.map((a, i) => <li key={i}>{a}</li>)
            : <li>Stay consistent and gentle with your routine. Track results and update as needed!</li>
          }
        </ul>
      </div>

      {/* Product Recommendations */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-green-300 mb-2">Recommended Products</h2>
        <div className="flex flex-wrap gap-8">
          {recommendations.map((product) => (
            <div key={product.name} className="bg-gray-700 rounded-lg p-4 w-72 flex flex-col justify-between">
              <h3 className="font-bold text-lg text-blue-200">{product.type.charAt(0).toUpperCase() + product.type.slice(1)}</h3>
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

      {/* Monthly Product Report */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-gray-100">Monthly Product Report ({reportMonth})</h2>
        <ul className="text-gray-200 list-disc pl-6">
          {monthlyReport.map((r) => (
            <li key={r.name} className="mb-2">
              <span className="font-semibold">{r.name}</span> – {r.rating}/10 – AED {r.price}
              <div className="text-gray-400 text-sm">{r.explanation}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
