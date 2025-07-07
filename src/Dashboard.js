// src/Dashboard.js
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Example usage of setStreak so it’s not “unused”:
    const saved = localStorage.getItem("glowup-streak");
    setStreak(saved ? Number(saved) : 1);
  }, []);

  const quotes = [
    "You are your only limit.",
    "Small steps every day lead to big results.",
    "Discipline creates results.",
    "Glow-up is a lifestyle, not a moment.",
    "Stay consistent. Results will come.",
  ];
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#181c29] rounded-2xl shadow-2xl p-8 text-white flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold">Welcome back!</h1>
        <p className="text-xl italic">✨ {quote}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Glow-Up Streak" value={`${streak} days`} />
          <StatCard label="BMI" value="—" />
          <StatCard label="Water" value="— L" />
          <StatCard label="Tasks" value="—" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#21263c] rounded-xl p-4 flex flex-col items-center">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}
