import React, { useState } from "react";

export default function FoodDiet({ profile }) {
  // Example user info (from profile setup)
  const allergies = profile.foodAllergies || [];
  const dislikes = profile.foodDislikes || [];
  const budget = profile.budget || "Not set";

  // State for each section
  const [mealPlan, setMealPlan] = useState([]);
  const [foodLog, setFoodLog] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [water, setWater] = useState(0);
  const [tips] = useState([
    "Drink a glass of water before every meal.",
    "Eat slowly and mindfully.",
    "Plan snacks to avoid unhealthy temptations.",
    "Try to include vegetables in every lunch and dinner."
  ]);
  const [reminders] = useState([
    { time: "10:00 AM", text: "Snack time! Choose something healthy." },
    { time: "12:30 PM", text: "Lunch time!" },
    { time: "3:00 PM", text: "Drink water." },
  ]);
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [weightHistory, setWeightHistory] = useState([
    { date: new Date().toLocaleDateString(), weight: profile.weight || "" }
  ]);

  // Placeholder: Simulate suggested meal (this would be AI-powered later)
  const suggestMeal = () => {
    setMealPlan([
      { type: "Breakfast", name: "Oatmeal with berries", calories: 300 },
      { type: "Lunch", name: "Grilled chicken salad", calories: 400 },
      { type: "Snack", name: "Apple & peanut butter", calories: 200 },
      { type: "Dinner", name: "Rice, vegetables, and beef", calories: 500 },
    ]);
  };

  // Placeholder: Add new food log entry
  const addFoodLog = (food) => {
    setFoodLog([...foodLog, food]);
    setNutrition({
      calories: nutrition.calories + (food.calories || 0),
      protein: nutrition.protein + (food.protein || 0),
      carbs: nutrition.carbs + (food.carbs || 0),
      fat: nutrition.fat + (food.fat || 0)
    });
  };

  // Placeholder: Add shopping item
  const addShoppingItem = (item) => {
    setShoppingList([...shoppingList, item]);
  };

  // Add favorite food
  const addFavorite = (food) => {
    setFavoriteFoods([...favoriteFoods, food]);
  };

  // Add new recipe
  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  // Water tracker
  const logWater = () => setWater(water + 1);

  return (
    <div className="p-6 md:p-10 bg-gray-900 min-h-screen space-y-8">
      {/* Budget and allergies */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="bg-blue-900 text-blue-200 px-4 py-2 rounded-xl">
          <b>Budget:</b> {budget}
        </div>
        <div className="bg-red-900 text-red-200 px-4 py-2 rounded-xl">
          <b>Allergies:</b> {allergies.length ? allergies.join(", ") : "None"}
        </div>
        <div className="bg-yellow-900 text-yellow-200 px-4 py-2 rounded-xl">
          <b>Dislikes:</b> {dislikes.length ? dislikes.join(", ") : "None"}
        </div>
      </div>

      {/* Personalized Meal Suggestions */}
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-300 mb-3">Today's Meal Suggestions</h2>
          <button
            className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
            onClick={suggestMeal}
          >
            Suggest Meals
          </button>
        </div>
        <ul className="space-y-2">
          {mealPlan.map((meal, i) => (
            <li key={i} className="text-gray-200">
              <b>{meal.type}:</b> {meal.name} ({meal.calories} kcal)
            </li>
          ))}
        </ul>
      </div>

      {/* Food Tracker */}
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-blue-300 mb-2">Food Tracker</h2>
        <div className="flex gap-2 items-end mb-3">
          <input className="rounded px-2 py-1 bg-gray-700 text-gray-100" placeholder="Food name" id="food-name" />
          <input className="rounded px-2 py-1 bg-gray-700 text-gray-100" placeholder="Calories" id="food-cal" type="number" />
          <input className="rounded px-2 py-1 bg-gray-700 text-gray-100" placeholder="Protein (g)" id="food-prot" type="number" />
          <button
            className="bg-blue-500 text-white rounded px-3 py-1"
            onClick={() => {
              const name = document.getElementById("food-name").value;
              const calories = Number(document.getElementById("food-cal").value);
              const protein = Number(document.getElementById("food-prot").value);
              addFoodLog({ name, calories, protein });
              addFavorite({ name, calories, protein });
            }}
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-8 text-gray-200">
          {foodLog.map((food, i) => (
            <li key={i}>{food.name} ({food.calories || 0} kcal, {food.protein || 0}g protein)</li>
          ))}
        </ul>
      </div>

      {/* Grocery List */}
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-yellow-300 mb-2">Grocery List</h2>
        <div className="flex gap-2 mb-3">
          <input className="rounded px-2 py-1 bg-gray-700 text-gray-100" id="grocery-item" placeholder="Item" />
          <button
            className="bg-yellow-500 text-white rounded px-3 py-1"
            onClick={() => {
              const item = document.getElementById("grocery-item").value;
              addShoppingItem(item);
              document.getElementById("grocery-item").value = "";
            }}
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-8 text-gray-200">
          {shoppingList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Nutrition Analysis */}
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-purple-300 mb-2">Nutrition Analysis</h2>
        <div className="text-gray-200">Calories: <b>{nutrition.calories}</b></div>
        <div className="text-gray-200">Protein: <b>{nutrition.protein}g</b></div>
        <div className="text-gray-200">Carbs: <b>{nutrition.carbs}g</b></div>
        <div className="text-gray-200">Fat: <b>{nutrition.fat}g</b></div>
      </div>

      {/* Progress Visualization (Weight History) */}
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-pink-300 mb-2">Progress Visualization</h2>
        <div className="mb-2 text-gray-100">
          {weightHistory.map((w, i) => (
            <div key={i}>{w.date}: <b>{w.weight} kg</b></div>
          ))}
        </div>
      </div>

      {/* Quick Add Favorites */}
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-orange-300 mb-2">Favorite Foods</h2>
        <ul className="list-disc pl-8 text-gray-200">
          {favoriteFoods.map((food, i) => (
            <li key={i}>{food.name} ({food.calories || 0} kcal, {food.protein || 0}g protein)</li>
          ))}
        </ul>
      </div>

      {/* Recipe Book */}
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-teal-300 mb-2">Recipe Book</h2>
        <ul className="list-disc pl-8 text-gray-200">
          {recipes.length === 0 && <li>Add recipes to see them here!</li>}
          {recipes.map((r, i) => (
            <li key={i}><b>{r.name}</b> ({r.calories} kcal)</li>
          ))}
        </ul>
      </div>

      {/* Water Tracker */}
      <div className="bg-gray-800 rounded-xl p-6 shadow flex flex-col items-start">
        <h2 className="text-xl font-bold text-blue-200 mb-2">Water Tracker</h2>
        <button className="bg-blue-500 text-white rounded px-3 py-1 mb-2" onClick={logWater}>+1 Glass</button>
        <div className="text-gray-200">Today: <b>{water}</b> glasses</div>
      </div>

      {/* Reminders & Tips */}
      <div className="bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-green-200 mb-2">Reminders & Tips</h2>
        <ul className="list-disc pl-8 text-gray-200 mb-2">
          {reminders.map((r, i) => <li key={i}>{r.time}: {r.text}</li>)}
        </ul>
        <div className="italic text-yellow-300">{tips[Math.floor(Math.random() * tips.length)]}</div>
      </div>
    </div>
  );
}
