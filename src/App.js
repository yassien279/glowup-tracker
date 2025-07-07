import React, { useState, useEffect } from "react";
import ProfileSetup from "./ProfileSetup";
import Dashboard from "./Dashboard"; // You’ll build this next!

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Try to load profile from localStorage
    const saved = localStorage.getItem("glowup-profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  function handleComplete(newProfile) {
    setProfile(newProfile);
  }

  // Add a reset button for dev/testing!
  function handleReset() {
    localStorage.removeItem("glowup-profile");
    window.location.reload();
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-sky-900 to-fuchsia-900 dark:from-[#050b18] dark:to-[#21173a]">
      {!profile ? (
        <ProfileSetup onComplete={handleComplete} />
      ) : (
        <div>
          <Dashboard profile={profile} />
          <button
            onClick={handleReset}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white rounded-xl px-4 py-2 shadow-md opacity-80 hover:opacity-100 transition-all"
          >
            Reset Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
