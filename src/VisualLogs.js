import React, { useState } from "react";

const CATEGORY_OPTIONS = ["Hair", "Skin", "Body", "Style", "Other"];

export default function VisualLogs() {
  const [photos, setPhotos] = useState([]);
  const [upload, setUpload] = useState(null);
  const [category, setCategory] = useState("Hair");
  const [note, setNote] = useState("");

  // Handle photo file selection
  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return;
    setUpload(e.target.files[0]);
  };

  // Add uploaded photo to gallery
  const handleUpload = () => {
    if (!upload) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos([
        ...photos,
        {
          url: reader.result,
          category,
          note,
          date: new Date().toLocaleString(),
        },
      ]);
      setUpload(null);
      setNote("");
    };
    reader.readAsDataURL(upload);
  };

  return (
    <div className="p-8 md:p-12 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-pink-400 mb-8">
        Visual Logs
      </h2>
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row md:items-end gap-4">
        {/* Upload controls */}
        <div>
          <label className="block text-gray-200 mb-2 font-medium">Select Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-gray-200 mb-2"
          />
        </div>
        <div>
          <label className="block text-gray-200 mb-2 font-medium">Category</label>
          <select
            className="rounded p-1 bg-gray-700 text-pink-200"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-200 mb-2 font-medium">Note (optional)</label>
          <input
            className="rounded p-1 bg-gray-700 text-pink-200 w-full"
            placeholder="e.g., 'After haircut', 'Day 1', etc."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>
        <button
          className="bg-pink-500 px-4 py-2 rounded text-white font-bold hover:bg-pink-600 transition"
          onClick={handleUpload}
          disabled={!upload}
        >
          Upload
        </button>
      </div>

      <h3 className="text-2xl text-gray-200 mb-4 font-semibold">Your Progress Gallery</h3>
      {photos.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          No photos uploaded yet. Start your glow-up journey by adding your first photo!
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center"
            >
              <img
                src={photo.url}
                alt={`Progress ${photo.category}`}
                className="w-full max-h-64 object-contain rounded-xl mb-3"
              />
              <div className="text-pink-300 font-bold mb-1">{photo.category}</div>
              <div className="text-gray-200 mb-1">{photo.note}</div>
              <div className="text-xs text-gray-400">{photo.date}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-12 p-4 bg-pink-800 text-pink-100 rounded-lg max-w-xl mx-auto">
        <b>Tip:</b> Add a note and tag for every photo to track haircuts, skin care progress, gym gains, or outfit changes!
        <br />More features (timeline, compare, milestones) coming soon.
      </div>
    </div>
  );
}
