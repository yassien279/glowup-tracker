import React, { useState } from "react";

// Example achievements (add more as you like)
const ACHIEVEMENTS = [
  {
    id: "first_photo",
    name: "First Progress Photo",
    desc: "Upload your first photo in Visual Logs.",
    category: "Any",
    unlocked: false,
    type: "Milestone",
  },
  {
    id: "week_streak",
    name: "7-Day Streak",
    desc: "Log activity for 7 days in a row.",
    category: "Discipline",
    unlocked: false,
    type: "Streak",
    progress: 3, // out of 7
    required: 7,
  },
  {
    id: "goal_weight",
    name: "Goal Weight Hit",
    desc: "Reach your weight goal in the Body tab.",
    category: "Body",
    unlocked: false,
    type: "Milestone",
  },
  {
    id: "skin_win",
    name: "Glow-Up Day",
    desc: "Complete a full skincare routine 30 days in a row.",
    category: "Skin",
    unlocked: false,
    type: "Streak",
    progress: 17, // out of 30
    required: 30,
  },
  {
    id: "curly_pride",
    name: "Hair Routine Champ",
    desc: "Follow your hair routine for a full month.",
    category: "Hair",
    unlocked: false,
    type: "Streak",
    progress: 12,
    required: 30,
  },
  {
    id: "fashion_icon",
    name: "Fashion Icon",
    desc: "Add 20 outfits to the Style board.",
    category: "Style",
    unlocked: false,
    type: "Milestone",
    progress: 8,
    required: 20,
  },
  {
    id: "hydration_hero",
    name: "Hydration Hero",
    desc: "Drink water every day for 2 weeks.",
    category: "Diet",
    unlocked: false,
    type: "Streak",
    progress: 9,
    required: 14,
  },
  // Example unlocked achievement
  {
    id: "profile_complete",
    name: "Profile Complete",
    desc: "Fill out your profile and preferences.",
    category: "Any",
    unlocked: true,
    type: "Milestone",
  },
];

const CATEGORY_COLORS = {
  Any: "bg-gray-700",
  Body: "bg-blue-800",
  Skin: "bg-pink-700",
  Hair: "bg-yellow-700",
  Diet: "bg-green-700",
  Style: "bg-purple-800",
  Discipline: "bg-orange-700",
};

export default function Achievements() {
  // This will later be dynamic from user data!
  const [achievements] = useState(ACHIEVEMENTS);

  return (
    <div className="p-8 md:p-12 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
        Achievements
      </h2>
      <div className="mb-6 text-center text-gray-200">
        Unlock badges by building habits, reaching goals, and tracking your glow-up progress!
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, idx) => (
          <div
            key={a.id}
            className={`rounded-xl shadow-lg p-5 flex flex-col items-center border-2 ${
              a.unlocked
                ? "border-yellow-400"
                : "border-gray-700 opacity-70 grayscale"
            } ${CATEGORY_COLORS[a.category] || "bg-gray-700"}`}
          >
            <div className="text-2xl font-bold mb-2">
              {a.unlocked ? "🏆" : "🔒"}
            </div>
            <div className="text-lg font-semibold mb-1 text-yellow-300 text-center">
              {a.name}
            </div>
            <div className="text-gray-100 text-sm mb-2 text-center">{a.desc}</div>
            <div className="mb-1 text-xs text-gray-300">
              Category: <b>{a.category}</b> | Type: <b>{a.type}</b>
            </div>
            {/* Progress bar for streaks/milestones */}
            {a.type === "Streak" || a.progress ? (
              <div className="w-full">
                <div className="text-xs text-gray-200 text-center">
                  {a.progress || 0}/{a.required || 1}
                </div>
                <div className="w-full bg-gray-800 h-3 rounded mb-2">
                  <div
                    className="h-3 bg-yellow-400 rounded"
                    style={{
                      width: `${Math.round(
                        ((a.progress || 0) / (a.required || 1)) * 100
                      )}%`,
                      transition: "width 0.4s",
                    }}
                  />
                </div>
              </div>
            ) : null}
            {a.unlocked && (
              <div className="mt-2 text-yellow-300 text-sm font-bold">
                Unlocked!
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 p-4 bg-yellow-800 text-yellow-100 rounded-lg max-w-xl mx-auto">
        <b>Tip:</b> More badges and unlock animations coming soon! Each badge represents your real progress.
      </div>
    </div>
  );
}
