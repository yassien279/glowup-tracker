import React from "react";
export default function Settings({ onProfileReset }) {
  return (
    <div className="p-10 text-center text-2xl text-gray-400">
      Settings coming soon!
      <br />
      <button
        onClick={onProfileReset}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Reset Profile
      </button>
    </div>
  );
}
