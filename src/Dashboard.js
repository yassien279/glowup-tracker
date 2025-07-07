import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { Button } from "./components/ui/button";
import { User } from "lucide-react";
import { motion } from "framer-motion";

// Motivational quotes
const quotes = [
  "Keep glowing, inside and out! ✨",
  "Every day is a new chance to level up. 🚀",
  "Progress, not perfection! 🌱",
  "Self-care is power. 🔥",
  "Your glow is unstoppable. 💎",
  "You’re one step closer to your goals! 🏆",
  "Consistency is your superpower. ⚡",
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Achievements sample
const fakeAchievements = [
  { label: "7-Day Streak", icon: "🔥" },
  { label: "3 Wash Days", icon: "🧴" },
  { label: "Lost 1kg", icon: "🏅" },
];

// Progress sample data (customize for real)
function getProgress(profile) {
  return [
    { area: "Hair", value: 60, color: "from-fuchsia-400 to-pink-500" },
    { area: "Skin", value: 40, color: "from-blue-400 to-indigo-400" },
    { area: "Body", value: 35, color: "from-lime-400 to-emerald-400" },
    { area: "Food", value: 50, color: "from-orange-400 to-amber-500" },
    { area: "Style", value: 20, color: "from-cyan-400 to-blue-300" },
  ];
}

export default function Dashboard({ profile }) {
  const [quote, setQuote] = useState("");
  const [streak, setStreak] = useState(1); // Later, calculate this for real

  useEffect(() => {
    setQuote(getRandomQuote());
    // Calculate or fetch streak from localStorage or backend
    // setStreak(...);
  }, []);

  // Simple BMI calculation
  function getBMI() {
    const h = parseFloat(profile.height) / 100;
    const w = parseFloat(profile.weight);
    if (!h || !w) return "--";
    return (w / (h * h)).toFixed(1);
  }

  // Next tasks (fake sample logic, expand with your own rules!)
  function getNextTasks() {
    const tasks = [];
    if (profile.hairType) tasks.push("It's almost time for your next wash day! 🧴");
    if (profile.skinType) tasks.push("Don't forget your night skincare routine tonight! 🛁");
    if (profile.goals?.toLowerCase().includes("weight")) tasks.push("Get some steps in today! 🚶‍♂️");
    return tasks;
  }

  // Visual log preview (for now, just placeholder)
  const recentPhotos = [
    // { url: "some-url", type: "hair", date: "2025-07-01" },
    // Add real images later
  ];

  // Progress bars for each area
  const progress = getProgress(profile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-sky-900 to-fuchsia-900 dark:from-[#050b18] dark:to-[#21173a] px-2 py-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1.4, opacity: 0.25 }}
        transition={{ duration: 1.3, type: "spring" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[54vw] h-[32vw] bg-fuchsia-400 rounded-full blur-3xl opacity-70 -z-10"
      />

      <div className="max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Welcome / Profile card */}
        <Card className="col-span-1 xl:col-span-2 p-6 bg-white/80 dark:bg-[#181c2a]/80 rounded-2xl shadow-xl flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-blue-400 p-2 shadow-lg">
              <User size={48} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-black dark:text-white">Welcome, {profile.name}!</div>
              <div className="text-lg text-indigo-700 dark:text-fuchsia-300 font-semibold">{quote}</div>
            </div>
          </div>
          <div className="flex gap-5 items-center mt-2">
            <div className="flex flex-col">
              <span className="text-gray-700 dark:text-white font-semibold">BMI</span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-fuchsia-400">{getBMI()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700 dark:text-white font-semibold">Weight</span>
              <span className="text-2xl font-bold text-blue-500 dark:text-blue-300">{profile.weight} kg</span>
            </div>
            {/* You can add more stats (water intake, streaks, etc) here */}
            <div className="flex flex-col">
              <span className="text-gray-700 dark:text-white font-semibold">Glow Streak</span>
              <span className="text-2xl font-bold text-pink-500 dark:text-pink-300">{streak} days</span>
            </div>
          </div>
        </Card>

        {/* Progress cards */}
        <Card className="col-span-1 flex flex-col gap-5 p-6 bg-white/80 dark:bg-[#181c2a]/80 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {progress.map(({ area, value, color }) => (
              <div key={area}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-gray-800 dark:text-white">{area}</span>
                  <span className="font-semibold text-indigo-700 dark:text-fuchsia-200">{value}%</span>
                </div>
                <Progress value={value} className={`h-3 rounded-full bg-gradient-to-r ${color}`} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tasks & Tips */}
        <Card className="col-span-1 flex flex-col gap-4 p-6 bg-white/80 dark:bg-[#181c2a]/80 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {getNextTasks().length ? getNextTasks().map((t, i) => (
                <li key={i} className="text-base text-indigo-700 dark:text-fuchsia-200 font-semibold">{t}</li>
              )) : <li className="text-base text-gray-500">No tasks for now!</li>}
            </ul>
            <div className="mt-4">
              <div className="text-sm text-gray-600 dark:text-slate-300 font-semibold mb-1">Personalized Tip:</div>
              <div className="text-base text-indigo-800 dark:text-fuchsia-200 italic">
                {profile.goals?.length ? `Remember: ${profile.goals}` : "Set a goal to get the best recommendations!"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="col-span-1 flex flex-col gap-3 p-6 bg-white/80 dark:bg-[#181c2a]/80 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              {fakeAchievements.map(a => (
                <div key={a.label} className="flex flex-col items-center">
                  <span className="text-3xl">{a.icon}</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-fuchsia-200">{a.label}</span>
                </div>
              ))}
            </div>
            <Button className="mt-4 bg-gradient-to-r from-indigo-400 to-fuchsia-400 text-white font-bold w-full shadow">
              View All Achievements
            </Button>
          </CardContent>
        </Card>

        {/* Visual Log Preview */}
        <Card className="col-span-1 xl:col-span-2 flex flex-col gap-3 p-6 bg-white/80 dark:bg-[#181c2a]/80 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black dark:text-white">Recent Progress Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              {recentPhotos.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 italic">No photos yet. Upload to see your journey!</div>
              ) : (
                recentPhotos.map((p, i) => (
                  <div key={i} className="w-24 h-24 bg-gradient-to-tr from-indigo-400 via-fuchsia-300 to-blue-300 rounded-xl shadow-inner flex items-center justify-center">
                    <img src={p.url} alt={p.type} className="w-full h-full object-cover rounded-xl" />
                  </div>
                ))
              )}
            </div>
            <Button className="mt-4 bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white font-bold w-full shadow">
              Upload New Photo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
