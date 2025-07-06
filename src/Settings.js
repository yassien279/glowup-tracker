import React, { useState } from "react";

export default function Settings({ profile, setProfile, theme, setTheme }) {
  // Profile info state
  const [editProfile, setEditProfile] = useState({
    name: profile?.name || "",
    age: profile?.age || "",
    email: profile?.email || "",
  });

  // Theme state (assumes dark/light logic in App.js)
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Notification settings
  const [notifications, setNotifications] = useState({
    water: true,
    routines: true,
    meals: false,
  });

  // Feedback state
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Save profile edits
  const handleSaveProfile = () => {
    setProfile(editProfile);
    alert("Profile updated!");
  };

  // Handle notification toggle
  const handleNotifChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle feedback submit
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback("");
    setTimeout(() => setSubmitted(false), 2500); // Simulate feedback send
  };

  return (
    <div className="p-8 md:p-12 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
        Settings
      </h2>

      {/* Profile Edit */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">Edit Profile Information</h3>
        <div className="flex flex-col gap-3">
          <input
            className="rounded p-2 bg-gray-700 text-blue-200"
            placeholder="Name"
            value={editProfile.name}
            onChange={e => setEditProfile({ ...editProfile, name: e.target.value })}
          />
          <input
            className="rounded p-2 bg-gray-700 text-blue-200"
            type="number"
            placeholder="Age"
            value={editProfile.age}
            onChange={e => setEditProfile({ ...editProfile, age: e.target.value })}
          />
          <input
            className="rounded p-2 bg-gray-700 text-blue-200"
            placeholder="Email (optional)"
            value={editProfile.email}
            onChange={e => setEditProfile({ ...editProfile, email: e.target.value })}
          />
          <button
            className="bg-blue-500 px-4 py-2 rounded text-white font-bold hover:bg-blue-600 transition"
            onClick={handleSaveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 max-w-xl mx-auto flex items-center justify-between">
        <h3 className="text-xl font-semibold text-yellow-300">Theme</h3>
        <button
          className={`px-4 py-2 rounded text-white font-bold ${theme === "dark" ? "bg-gray-700" : "bg-yellow-500"}`}
          onClick={toggleTheme}
        >
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold text-green-300 mb-3">Notification Settings</h3>
        <div className="flex flex-col gap-3 text-green-100">
          <label>
            <input
              type="checkbox"
              checked={notifications.water}
              onChange={() => handleNotifChange("water")}
              className="mr-2"
            />
            Water Reminders
          </label>
          <label>
            <input
              type="checkbox"
              checked={notifications.routines}
              onChange={() => handleNotifChange("routines")}
              className="mr-2"
            />
            Routine Reminders
          </label>
          <label>
            <input
              type="checkbox"
              checked={notifications.meals}
              onChange={() => handleNotifChange("meals")}
              className="mr-2"
            />
            Meal Reminders
          </label>
        </div>
      </div>

      {/* Change Password/Logout (placeholder for future) */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold text-purple-300 mb-3">Account</h3>
        <div className="text-gray-300 mb-3">
          <i>Account features (change password, logout) coming soon!</i>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded font-bold opacity-60 cursor-not-allowed">
          Change Password
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded font-bold opacity-60 cursor-not-allowed ml-3">
          Logout
        </button>
      </div>

      {/* Feedback/Bug Report */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold text-pink-300 mb-3">Feedback & Bug Report</h3>
        <form onSubmit={handleSubmitFeedback}>
          <textarea
            className="rounded p-2 bg-gray-700 text-pink-200 w-full mb-2"
            placeholder="Tell us how to improve or report a bug!"
            rows={3}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
          />
          <button
            className="bg-pink-500 px-4 py-2 rounded text-white font-bold hover:bg-pink-600 transition"
            type="submit"
            disabled={submitted}
          >
            {submitted ? "Submitted!" : "Send Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
