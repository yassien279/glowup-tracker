import React, { useState } from "react";
import Dashboard from "./Dashboard";
import HairCare from "./HairCare";
import SkinCare from "./SkinCare";
import Body from "./Body";
import FoodDiet from "./FoodDiet";
import VisualLogs from "./VisualLogs";
import Achievements from "./Achievements";
import Style from "./Style";
import Settings from "./Settings";
import ProfileSetup from "./ProfileSetup";

const tabs = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Hair Care", value: "hair" },
  { label: "Skin Care", value: "skin" },
  { label: "Body", value: "body" },
  { label: "Food & Diet", value: "food" },
  { label: "Visual Logs", value: "visual" },
  { label: "Achievements", value: "achievements" },
  { label: "Style", value: "style" },
  { label: "Settings", value: "settings" },
];

function App() {
  const [profile, setProfile] = useState(null); // User profile data after onboarding
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [showProfileSetup, setShowProfileSetup] = useState(true);

  // Handle completion of profile setup
  const handleProfileComplete = (userData) => {
    setProfile(userData);
    setShowProfileSetup(false);
    setCurrentTab("dashboard");
  };

  // Reset to profile setup (Settings can call this)
  const handleProfileReset = () => {
    setProfile(null);
    setShowProfileSetup(true);
  };

  // Wait until profile is complete
  if (showProfileSetup || !profile) {
    return (
      <div>
        <ProfileSetup onComplete={handleProfileComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-center gap-2 py-3 bg-gray-950 border-b border-gray-800 shadow-lg sticky top-0 z-20">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-150
              ${currentTab === tab.value
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-800 text-gray-200 hover:bg-blue-900"}
            `}
            onClick={() => setCurrentTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-2 py-6">
        {currentTab === "dashboard" && <Dashboard profile={profile} />}
        {currentTab === "hair" && <HairCare userProfile={profile} />}
        {currentTab === "skin" && <SkinCare profile={profile} />}
        {currentTab === "body" && <Body profile={profile} />}
        {currentTab === "food" && <FoodDiet profile={profile} />}
        {currentTab === "visual" && <VisualLogs profile={profile} />}
        {currentTab === "achievements" && <Achievements profile={profile} />}
        {currentTab === "style" && <Style profile={profile} />}
        {currentTab === "settings" && (
          <Settings profile={profile} onProfileReset={handleProfileReset} />
        )}
      </main>
    </div>
  );
}

export default App;
