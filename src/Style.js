import React, { useState } from "react";

const ITEM_CATEGORIES = ["Top", "Bottom", "Shoes", "Accessory", "Jacket", "Other"];
const COLORS = ["Black", "White", "Blue", "Red", "Green", "Yellow", "Pink", "Beige", "Grey", "Other"];

export default function Style() {
  // Wardrobe state
  const [wardrobe, setWardrobe] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "Top", color: "Black" });

  // Swipe system
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [likedFits, setLikedFits] = useState([]);
  const [dislikedFits, setDislikedFits] = useState([]);
  // Wishlist
  const [wishlist, setWishlist] = useState([]);
  const [wishItem, setWishItem] = useState({ name: "", link: "", price: "" });
  // Fit upload for AI rating/feedback
  const [uploadedFit, setUploadedFit] = useState(null);

  // Add item to wardrobe
  const addItem = () => {
    if (!newItem.name) return;
    setWardrobe([...wardrobe, { ...newItem }]);
    setNewItem({ name: "", category: "Top", color: "Black" });
  };

  // Generate a "fit" (outfit suggestion) by picking random items from each category in wardrobe
  const generateFits = () => {
    // Create up to 20 possible fits from wardrobe items
    let fits = [];
    for (let i = 0; i < 20; i++) {
      let fit = [];
      ITEM_CATEGORIES.forEach(cat => {
        const items = wardrobe.filter(w => w.category === cat);
        if (items.length) {
          fit.push(items[Math.floor(Math.random() * items.length)]);
        }
      });
      if (fit.length > 0) fits.push(fit);
    }
    return fits;
  };

  const fits = generateFits();

  // Swipe actions
  const swipeLeft = () => setDislikedFits([...dislikedFits, fits[swipeIdx]]) || setSwipeIdx(swipeIdx + 1);
  const swipeRight = () => setLikedFits([...likedFits, fits[swipeIdx]]) || setSwipeIdx(swipeIdx + 1);

  // Wardrobe stats
  const colorStats = COLORS.map(color => ({
    color,
    count: wardrobe.filter(item => item.color === color).length
  }));
  const mostWornColor = colorStats.reduce((a, b) => (a.count > b.count ? a : b), { color: "", count: 0 });
  const neverUsed = wardrobe.filter(item =>
    !likedFits.flat().some(fitItem => fitItem && fitItem.name === item.name)
  );

  // Wishlist logic
  const addWishItem = () => {
    if (!wishItem.name) return;
    setWishlist([...wishlist, { ...wishItem, bought: false }]);
    setWishItem({ name: "", link: "", price: "" });
  };
  const toggleBought = idx => {
    setWishlist(
      wishlist.map((item, i) =>
        i === idx ? { ...item, bought: !item.bought } : item
      )
    );
  };

  // Fit upload for AI feedback (base version)
  const handleFitUpload = e => {
    if (e.target.files.length === 0) return;
    const reader = new FileReader();
    reader.onloadend = () => setUploadedFit(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="p-8 md:p-12 bg-gray-900 min-h-screen space-y-10">
      {/* Wardrobe builder */}
      <div className="bg-gray-800 rounded-xl p-6 shadow mb-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-3">Your Wardrobe</h2>
        <div className="flex flex-wrap gap-4 mb-3">
          <input
            className="rounded p-1 bg-gray-700 text-purple-200"
            placeholder="Item name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          />
          <select
            className="rounded p-1 bg-gray-700 text-purple-200"
            value={newItem.category}
            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
          >
            {ITEM_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            className="rounded p-1 bg-gray-700 text-purple-200"
            value={newItem.color}
            onChange={e => setNewItem({ ...newItem, color: e.target.value })}
          >
            {COLORS.map(c => <option key={c}>{c}</option>)}
          </select>
          <button
            className="bg-purple-500 px-3 py-1 rounded text-white font-bold hover:bg-purple-600"
            onClick={addItem}
          >Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {wardrobe.length === 0
            ? <div className="text-purple-200 italic">Add your clothes to start building outfits!</div>
            : wardrobe.map((item, i) => (
              <span key={i} className="bg-purple-700 text-white rounded px-2 py-1 text-sm">{item.name} ({item.category}, {item.color})</span>
            ))}
        </div>
      </div>

      {/* Swipe-to-rate outfits */}
      <div className="bg-gray-800 rounded-xl p-6 shadow mb-6">
        <h2 className="text-2xl font-bold text-pink-400 mb-3">Swipe Your Outfits</h2>
        {fits.length === 0 ? (
          <div className="text-gray-300">Add more wardrobe items to see outfit suggestions!</div>
        ) : swipeIdx >= fits.length ? (
          <div className="text-green-400 font-bold">No more fits to swipe. You’ve rated all combos!</div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-2 text-lg text-pink-300 font-semibold">Fit Suggestion:</div>
            <div className="flex gap-3 flex-wrap justify-center mb-3">
              {fits[swipeIdx].map((item, j) => (
                <span key={j} className="bg-pink-700 text-white rounded px-3 py-2 text-lg">{item.name} <span className="text-xs opacity-60">({item.category}, {item.color})</span></span>
              ))}
            </div>
            <div className="flex gap-6">
              <button onClick={swipeLeft} className="text-2xl bg-gray-700 hover:bg-red-700 text-red-300 px-6 py-2 rounded-xl font-bold">👎</button>
              <button onClick={swipeRight} className="text-2xl bg-gray-700 hover:bg-green-700 text-green-300 px-6 py-2 rounded-xl font-bold">👍</button>
            </div>
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          <div className="text-green-300 font-medium">Liked: {likedFits.length}</div>
          <div className="text-red-300 font-medium">Disliked: {dislikedFits.length}</div>
        </div>
      </div>

      {/* Fit upload for feedback/rating */}
      <div className="bg-gray-800 rounded-xl p-6 shadow mb-6">
        <h2 className="text-2xl font-bold text-teal-400 mb-2">Upload Your Fit for Feedback</h2>
        <input type="file" accept="image/*" onChange={handleFitUpload} className="mb-2" />
        {uploadedFit && (
          <div className="mt-2">
            <img src={uploadedFit} alt="Uploaded fit" className="max-h-48 rounded-xl mb-2" />
            <div className="bg-teal-700 text-teal-100 rounded p-2">
              <b>Rating & Feedback (future):</b> AI feedback and score will appear here!
            </div>
          </div>
        )}
      </div>

      {/* Wishlist */}
      <div className="bg-gray-800 rounded-xl p-6 shadow mb-6">
        <h2 className="text-2xl font-bold text-yellow-300 mb-2">Wishlist</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <input
            className="rounded p-1 bg-gray-700 text-yellow-200"
            placeholder="Item name"
            value={wishItem.name}
            onChange={e => setWishItem({ ...wishItem, name: e.target.value })}
          />
          <input
            className="rounded p-1 bg-gray-700 text-yellow-200"
            placeholder="Store/link"
            value={wishItem.link}
            onChange={e => setWishItem({ ...wishItem, link: e.target.value })}
          />
          <input
            className="rounded p-1 bg-gray-700 text-yellow-200"
            placeholder="Price"
            value={wishItem.price}
            onChange={e => setWishItem({ ...wishItem, price: e.target.value })}
          />
          <button
            className="bg-yellow-500 px-3 py-1 rounded text-white font-bold hover:bg-yellow-600"
            onClick={addWishItem}
          >Add</button>
        </div>
        <ul className="list-disc pl-8 text-gray-200">
          {wishlist.length === 0 && <li>No items in your wishlist yet.</li>}
          {wishlist.map((item, i) => (
            <li key={i} className={item.bought ? "line-through opacity-60" : ""}>
              {item.name} <span className="text-xs text-yellow-300">({item.link}, {item.price})</span>
              <button
                className="ml-3 bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                onClick={() => toggleBought(i)}
              >{item.bought ? "Unmark" : "Bought"}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Wardrobe stats/analytics */}
      <div className="bg-gray-800 rounded-xl p-6 shadow mb-6">
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Wardrobe Stats</h2>
        <div className="flex flex-wrap gap-4 text-blue-200">
          <div><b>Most Worn Color:</b> {mostWornColor.count > 0 ? mostWornColor.color : "None"}</div>
          <div><b>Never Used:</b> {neverUsed.length === 0 ? "None" : neverUsed.map(i => i.name).join(", ")}</div>
        </div>
        <div className="mt-3 text-sm text-gray-300 italic">More analytics coming soon!</div>
      </div>
    </div>
  );
}
