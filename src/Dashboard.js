// src/Dashboard.js
import React, { useState, useEffect } from "react";

function Dashboard() {
  // You might use streak later, but if not, just leave this line as is (no setStreak).
  const [streak] = useState(0);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  // Example motivational quotes
  const quotes = [
    "You are your only limit.",
    "Small steps every day lead to big results.",
    "Discipline creates results.",
    "Glow-up is a lifestyle, not a moment.",
    "Stay consistent. Results will come."
  ];

  useEffect(() => {
    // Pick a random quote each visit
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#181c29] rounded-2xl shadow-2xl p-8 text-white flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome to Your Dashboard!</h1>
        <div className="text-xl mb-4 font-semibold">
          <span role="img" aria-label="sparkles">✨</span> {loading ? "Loading..." : quote}
        </div>
        <div className="flex flex-wrap gap-6 mt-4">
          {/* Example stats */}
          <StatCard label="Glow-Up Streak" value={streak + " days"} />
          <StatCard label="BMI" value="--" />
          <StatCard label="Water Drank" value="-- L" />
          <StatCard label="Tasks Done" value="--" />
        </div>
        {/* Add more widgets/components as your app grows */}
        <div className="mt-8 text-gray-400 text-sm">
          Tip: Your journey is unique. Keep logging progress and updating your profile for the best recommendations!
        </div>
      </div>
    </div>
  );
}

// Simple stat card for dashboard
function StatCard({ label, value }) {
  return (
    <div className="bg-[#21263c] rounded-xl p-4 min-w-[130px] flex flex-col items-center justify-center shadow-md">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

export default Dashboard;
