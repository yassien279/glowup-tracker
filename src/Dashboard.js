import React from "react";

// Sample personalized tips
const personalizedTips = [
  "It’s hot today! Use a lightweight moisturizer.",
  "Remember to detangle your curls gently.",
  "Try to drink at least 2L of water today.",
  "Protect your skin with SPF if you’re outside.",
  "Time to deep condition your hair this week!",
];

export default function Dashboard({ user }) {
  // Welcome & progress
  const name = user?.name || "Glow-Upper";

  // Random tip
  const tip =
    personalizedTips[Math.floor(Math.random() * personalizedTips.length)];

  // Budget overview (placeholder spent; you can replace with real data)
  const budget = parseInt(user?.budget, 10) || 0;
  const spent = parseInt(user?.spent, 10) || 0;
  const remaining = budget - spent;

  const recentPhoto =
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=100&q=80";

  const activitySummary =
    "Last check-in: Hair & skin routines complete yesterday.";

  return (
    <div className="p-6 md:p-12 bg-gray-900 min-h-screen">
      {/* Welcome & Motivation */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">
          Welcome{user?.name ? `, ${name}` : ""}!
        </h1>
        <p className="text-lg text-gray-200">
          Here’s your daily progress summary and quick overview.
        </p>
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-4 mt-6 mb-1">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: "60%" }} />
        </div>
        <span className="text-sm text-gray-400">60% weekly goal achieved</span>
      </div>

      {/* Personalized Tip */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          Personalized Tip
        </h2>
        <p className="text-gray-200">{tip}</p>
      </div>

      {/* Quick Budget Overview */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          Budget Overview
        </h2>
        <p className="text-gray-200">Monthly budget: AED {budget}</p>
        <p className="text-gray-200">Spent: AED {spent}</p>
        <p className="text-gray-200">Remaining: AED {remaining}</p>
      </div>

      {/* Today’s Goals */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Today's Goals</h2>
        <ul className="text-gray-200 list-disc list-inside">
          <li>Drink 2L of water</li>
          <li>Complete hair care routine</li>
          <li>Do your skin care routine</li>
          <li>Add a progress photo</li>
        </ul>
      </div>

      {/* Recent Visual Log */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Recent Visual Log</h2>
        <div className="flex items-center space-x-6">
          <img
            src={recentPhoto}
            alt="progress"
            className="w-24 h-24 rounded-xl object-cover border"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">
            + Add Photo
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          Recent Activity
        </h2>
        <p className="text-gray-300">{activitySummary}</p>
      </div>
    </div>
  );
}
