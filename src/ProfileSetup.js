import React, { useState } from "react";

const hairTypes = [
  "1A", "1B", "1C",
  "2A", "2B", "2C",
  "3A", "3B", "3C",
  "4A", "4B", "4C"
];

const porosityOptions = ["Low", "Medium", "High", "Not sure"];
const scalpOptions = ["Oily", "Dry", "Balanced", "Sensitive", "Not sure"];
const skinTypes = ["Oily", "Dry", "Combination", "Sensitive", "Normal", "Not sure"];
const skinConcerns = [
  "Acne", "Dryness", "Oiliness", "Pigmentation",
  "Aging/Wrinkles", "Dark Spots", "Redness", "Pores"
];
const skinGoals = [
  "Clear Skin", "Brightening", "Hydration", "Oil Control",
  "Anti-Aging", "Even Skin Tone", "Reduce Redness", "Smooth Texture"
];
const routineComplexity = ["Simple", "Complicated"];

export default function ProfileSetup({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    hairType: "",
    hairPorosity: "",
    scalpType: "",
    faceSkinType: "",
    skinConcerns: [],
    skinGoals: [],
    allergies: "",
    dislikes: "",
    budget: "",
    wantsSimpleRoutine: "Simple"
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleMultiSelect(e, key) {
    const { value, checked } = e.target;
    let newArr = [...form[key]];
    if (checked) {
      newArr.push(value);
    } else {
      newArr = newArr.filter((item) => item !== value);
    }
    setForm({ ...form, [key]: newArr });
  }

  function nextStep() {
    setStep((s) => s + 1);
  }
  function prevStep() {
    setStep((s) => s - 1);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onComplete(form);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <form
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        {/* Stepper */}
        <div className="flex justify-between mb-6">
          {[...Array(9)].map((_, idx) => (
            <div
              key={idx}
              className={`w-8 h-2 rounded-full mx-1 ${step >= idx ? "bg-blue-400" : "bg-gray-700"
                }`}
            />
          ))}
        </div>

        {/* Step 0: Name & Age */}
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold text-blue-300 mb-4">Let's Get Started!</h2>
            <label className="block mb-2 text-gray-200">
              Your Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              />
            </label>
            <label className="block mb-2 text-gray-200">
              Age
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={nextStep}
                disabled={!form.name || !form.age}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 1: Gender */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold text-blue-300 mb-4">Gender (optional)</h2>
            <label className="block mb-2 text-gray-200">
              Gender
              <input
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                placeholder="(Optional)"
              />
            </label>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="text-gray-300 bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2: Height & Weight */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-blue-300 mb-4">Your Stats</h2>
            <label className="block mb-2 text-gray-200">
              Height (cm)
              <input
                name="height"
                type="number"
                value={form.height}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              />
            </label>
            <label className="block mb-2 text-gray-200">
              Weight (kg)
              <input
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              />
            </label>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="text-gray-300 bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={nextStep}
                disabled={!form.height || !form.weight}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3: Hair Details */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold text-pink-300 mb-4">Hair Details</h2>
            <label className="block mb-2 text-gray-200">
              Hair Type
              <select
                name="hairType"
                value={form.hairType}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              >
                <option value="">Select...</option>
                {hairTypes.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2 text-gray-200">
              Hair Porosity
              <select
                name="hairPorosity"
                value={form.hairPorosity}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              >
                <option value="">Select...</option>
                {porosityOptions.map((p) => (
                  <option value={p} key={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2 text-gray-200">
              Scalp Type
              <select
                name="scalpType"
                value={form.scalpType}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              >
                <option value="">Select...</option>
                {scalpOptions.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="text-gray-300 bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={nextStep}
                disabled={!form.hairType || !form.hairPorosity || !form.scalpType}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 4: Face Skin Type */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-bold text-green-300 mb-4">Face Skin Profile</h2>
            <label className="block mb-2 text-gray-200">
              Face Skin Type
              <select
                name="faceSkinType"
                value={form.faceSkinType}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              >
                <option value="">Select...</option>
                {skinTypes.map((t) => (
                  <option value={t} key={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="text-gray-300 bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={nextStep}
                disabled={!form.faceSkinType}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 5: Skin Concerns (multi-select) */}
        {step === 5 && (
          <>
            <h2 className="text-xl font-bold text-green-300 mb-4">Skin Concerns</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {skinConcerns.map((c) => (
                <label key={c} className="text-gray-200 flex items-center gap-1 bg-gray-700 rounded px-2 py-1">
                  <input
                    type="checkbox"
                    value={c}
                    checked={form.skinConcerns.includes(c)}
                    onChange={(e) => handleMultiSelect(e, "skinConcerns")}
                  />
                  {c}
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="text-gray-300 bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 6: Skin Goals (multi-select) */}
        {step === 6 && (
          <>
            <h2 className="text-xl font-bold text-green-300 mb-4">Skin Goals</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {skinGoals.map((g) => (
                <label key={g} className="text-gray-200 flex items-center gap-1 bg-gray-700 rounded px-2 py-1">
                  <input
                    type="checkbox"
                    value={g}
                    checked={form.skinGoals.includes(g)}
                    onChange={(e) => handleMultiSelect(e, "skinGoals")}
                  />
                  {g}
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="text-gray-300 bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 7: Food Allergies & Dislikes */}
        {step === 7 && (
          <>
            <h2 className="text-xl font-bold text-blue-300 mb-4">Food Preferences</h2>
            <label className="block mb-2 text-gray-200">
              Food Allergies (comma separated)
              <input
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                placeholder="e.g. nuts, shellfish"
              />
            </label>
            <label className="block mb-2 text-gray-200">
              Foods You Dislike (comma separated)
              <input
                name="dislikes"
                value={form.dislikes}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                placeholder="e.g. cheese, broccoli"
              />
            </label>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="text-gray-300 bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 8: Budget & Routine Complexity */}
        {step === 8 && (
          <>
            <h2 className="text-xl font-bold text-green-300 mb-4">Routine Preferences</h2>
            <label className="block mb-2 text-gray-200">
              Monthly Budget for Routines (AED)
              <input
                name="budget"
                type="number"
                value={form.budget}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
                required
              />
            </label>
            <label className="block mb-2 text-gray-200">
              Do you want a simple or complicated routine?
              <select
                name="wantsSimpleRoutine"
                value={form.wantsSimpleRoutine}
                onChange={handleChange}
                className="block mt-1 w-full rounded px-3 py-2 bg-gray-700 text-gray-200"
              >
                {routineComplexity.map((opt) => (
                  <option value={opt} key={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="text-gray-300 bg-gray-700 px-5 py-2 rounded hover:bg-gray-600"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                disabled={!form.budget}
              >
                Finish & Get Started
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
