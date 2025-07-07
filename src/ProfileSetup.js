import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Select } from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

// ---- Helper data ----
const steps = [
  "Basic Info",
  "Body Info",
  "Hair & Skin",
  "Face Concerns",
  "Allergies & Food",
  "Routine & Goals",
  "Review",
];

const genders = ["Male", "Female", "Other"];
const bodyTypes = ["Fat", "Skinny", "Muscular", "Average"];
const hairTypes = [
  "1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"
];
const porosities = ["Low", "Medium", "High", "Not sure"];
const scalpTypes = ["Oily", "Dry", "Balanced", "Sensitive", "Not sure"];
const skinTypes = ["Oily", "Dry", "Combination", "Sensitive", "Not sure"];
const faceConditions = [
  "Acne", "Redness", "Dark Spots", "Wrinkles", "Dryness", "Oiliness", "Scarring", "Puffiness", "Sensitivity"
];
const faceGoals = [
  "Clear Skin", "Fade Dark Spots", "Reduce Wrinkles", "Moisturized Skin", "Less Oiliness", "Even Tone", "Soothe Sensitivity", "Anti-Aging", "Brighter Complexion"
];

const initialData = {
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  bodyType: "",
  hairType: "",
  hairPorosity: "",
  scalpType: "",
  skinType: "",
  faceNow: [],
  faceWants: [],
  allergies: "",
  dislikedFoods: "",
  budget: "",
  hairRoutine: "simple",
  skinRoutine: "simple",
  bodyRoutine: "simple",
  goals: "",
  location: "",
};

export default function ProfileSetup({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  function handleArray(field, option, checked) {
    setForm(f => ({
      ...f,
      [field]: checked
        ? [...(f[field] || []), option]
        : (f[field] || []).filter(x => x !== option)
    }));
  }

  function getStepContent(s) {
    switch (s) {
      case 0:
        return (
          <>
            <CardHeader className="flex flex-col items-center gap-3">
              <motion.div
                initial={{ scale: 0.6, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 330, damping: 14 }}
                className="rounded-full bg-gradient-to-tr from-indigo-400 via-fuchsia-400 to-blue-300 dark:from-fuchsia-700 dark:to-indigo-900 p-4 shadow-xl border-2 border-white/40"
              >
                <User size={40} className="text-white drop-shadow" />
              </motion.div>
              <CardTitle className="text-2xl sm:text-3xl font-extrabold text-center text-black dark:text-white tracking-tight">
                Welcome{form.name ? `, ${form.name}` : ""}!
              </CardTitle>
              <div className="text-base sm:text-lg text-muted-foreground font-medium text-center dark:text-slate-200">
                Let’s start your glow-up journey.
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 pt-2">
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Name</label>
                <Input
                  className="text-base sm:text-lg py-2 px-3 rounded-xl w-full"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  autoFocus
                />
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Age</label>
                <Input
                  className="text-base sm:text-lg py-2 px-3 rounded-xl w-full"
                  type="number"
                  min={1}
                  max={120}
                  placeholder="Age"
                  value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Gender</label>
                <Select
                  className="text-base sm:text-lg py-2 rounded-xl w-full"
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="">Select gender</option>
                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
                </Select>
              </div>
            </CardContent>
          </>
        );
      case 1:
        return (
          <>
            <CardHeader className="flex flex-col items-center gap-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-black dark:text-white">Body Info</CardTitle>
              <div className="text-base sm:text-lg text-muted-foreground font-medium dark:text-slate-200">Let’s tailor your plan.</div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Height (cm)</label>
                <Input
                  className="text-base sm:text-lg py-2 px-3 rounded-xl w-full"
                  type="number"
                  min={50}
                  max={250}
                  placeholder="e.g., 170"
                  value={form.height}
                  onChange={e => setForm({ ...form, height: e.target.value })}
                />
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  Enter your height in centimeters. <span className="italic">Tip: 1 inch = 2.54cm</span>
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Weight (kg)</label>
                <Input
                  className="text-base sm:text-lg py-2 px-3 rounded-xl w-full"
                  type="number"
                  min={20}
                  max={200}
                  placeholder="e.g., 60"
                  value={form.weight}
                  onChange={e => setForm({ ...form, weight: e.target.value })}
                />
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  Use your current weight. We’ll track your progress!
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Body Type</label>
                <Select
                  className="text-base sm:text-lg py-2 rounded-xl w-full"
                  value={form.bodyType}
                  onChange={e => setForm({ ...form, bodyType: e.target.value })}
                >
                  <option value="">Select body type</option>
                  {bodyTypes.map(b => <option key={b} value={b}>{b}</option>)}
                </Select>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  Unsure? <span className="italic">Average = “in-between”, Skinny = “underweight”, Muscular = “athletic”, Fat = “overweight”.</span>
                </div>
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader className="flex flex-col items-center gap-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-black dark:text-white">Hair & Skin</CardTitle>
              <div className="text-base sm:text-lg text-muted-foreground font-medium dark:text-slate-200">Let’s personalize your care.</div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Hair Type</label>
                <Select
                  className="text-base sm:text-lg py-2 rounded-xl w-full"
                  value={form.hairType}
                  onChange={e => setForm({ ...form, hairType: e.target.value })}
                >
                  <option value="">Select hair type</option>
                  {hairTypes.map(h => <option key={h} value={h}>{h}</option>)}
                </Select>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  <span className="italic">Straight: 1A-1C | Wavy: 2A-2C | Curly: 3A-3C | Coily: 4A-4C.<br/>Search "hair type chart" if you’re unsure.</span>
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Hair Porosity</label>
                <Select
                  className="text-base sm:text-lg py-2 rounded-xl w-full"
                  value={form.hairPorosity}
                  onChange={e => setForm({ ...form, hairPorosity: e.target.value })}
                >
                  <option value="">Select porosity</option>
                  {porosities.map(p => <option key={p} value={p}>{p}</option>)}
                </Select>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  <b>How to check?</b> Place a clean hair strand in a cup of water. If it <b>sinks fast</b>, high porosity; <b>floats</b>, low; <b>midway</b>, medium.
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Scalp Type</label>
                <Select
                  className="text-base sm:text-lg py-2 rounded-xl w-full"
                  value={form.scalpType}
                  onChange={e => setForm({ ...form, scalpType: e.target.value })}
                >
                  <option value="">Select scalp type</option>
                  {scalpTypes.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  <b>Oily:</b> Gets greasy fast. <b>Dry:</b> Flaky/itchy. <b>Balanced:</b> Neither dry nor oily.
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Face Skin Type</label>
                <Select
                  className="text-base sm:text-lg py-2 rounded-xl w-full"
                  value={form.skinType}
                  onChange={e => setForm({ ...form, skinType: e.target.value })}
                >
                  <option value="">Select skin type</option>
                  {skinTypes.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  <b>Oily:</b> Shiny all day. <b>Dry:</b> Flaky/tight. <b>Combination:</b> Oily T-zone, dry elsewhere. <b>Sensitive:</b> Red/irritated easily.
                </div>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader className="flex flex-col items-center gap-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-black dark:text-white">Your Face Concerns</CardTitle>
              <div className="text-base sm:text-lg text-muted-foreground font-medium dark:text-slate-200">Let’s customize your skincare plan.</div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <div className="font-bold text-base sm:text-lg text-black dark:text-white mb-2">What do you have now?</div>
                <div className="flex flex-wrap gap-3">
                  {faceConditions.map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.faceNow.includes(option)}
                        onChange={e => handleArray("faceNow", option, e.target.checked)}
                      />
                      <span className="text-sm sm:text-base text-black dark:text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-bold text-base sm:text-lg text-black dark:text-white mb-2">What do you want?</div>
                <div className="flex flex-wrap gap-3">
                  {faceGoals.map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.faceWants.includes(option)}
                        onChange={e => handleArray("faceWants", option, e.target.checked)}
                      />
                      <span className="text-sm sm:text-base text-black dark:text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader className="flex flex-col items-center gap-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-black dark:text-white">Allergies & Food</CardTitle>
              <div className="text-base sm:text-lg text-muted-foreground font-medium dark:text-slate-200">Let’s keep you safe and happy.</div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Allergies</label>
                <Input
                  className="text-base sm:text-lg py-2 px-3 rounded-xl w-full"
                  placeholder="e.g., nuts, gluten (comma-separated)"
                  value={form.allergies}
                  onChange={e => setForm({ ...form, allergies: e.target.value })}
                />
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  List any allergies for custom recommendations (leave blank if none).
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Foods You Dislike</label>
                <Input
                  className="text-base sm:text-lg py-2 px-3 rounded-xl w-full"
                  placeholder="e.g., eggs, fish (comma-separated)"
                  value={form.dislikedFoods}
                  onChange={e => setForm({ ...form, dislikedFoods: e.target.value })}
                />
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  These will be excluded from meal plans/recipes.
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Budget (AED/USD/etc.)</label>
                <Input
                  className="text-base sm:text-lg py-2 px-3 rounded-xl w-full"
                  type="number"
                  min={0}
                  placeholder="How much do you spend per month?"
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                />
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  So we can recommend top, mid, or budget products.
                </div>
              </div>
            </CardContent>
          </>
        );
      case 5:
        return (
          <>
            <CardHeader className="flex flex-col items-center gap-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-black dark:text-white">Routine & Goals</CardTitle>
              <div className="text-base sm:text-lg text-muted-foreground font-medium dark:text-slate-200">Build your custom plan.</div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <label className="font-bold flex items-center gap-2 text-base sm:text-lg mb-1 text-black dark:text-white">
                  Hair Routine Complexity
                  <Switch
                    checked={form.hairRoutine === "complicated"}
                    onChange={val =>
                      setForm({ ...form, hairRoutine: val ? "complicated" : "simple" })
                    }
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200">{form.hairRoutine === "complicated" ? "Complicated" : "Simple"}</span>
                </label>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  Complicated = more products/steps, Simple = easy/minimal routine.
                </div>
              </div>
              <div>
                <label className="font-bold flex items-center gap-2 text-base sm:text-lg mb-1 text-black dark:text-white">
                  Skin Routine Complexity
                  <Switch
                    checked={form.skinRoutine === "complicated"}
                    onChange={val =>
                      setForm({ ...form, skinRoutine: val ? "complicated" : "simple" })
                    }
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200">{form.skinRoutine === "complicated" ? "Complicated" : "Simple"}</span>
                </label>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  Complicated = more products/steps, Simple = easy/minimal routine.
                </div>
              </div>
              <div>
                <label className="font-bold flex items-center gap-2 text-base sm:text-lg mb-1 text-black dark:text-white">
                  Body Routine Complexity
                  <Switch
                    checked={form.bodyRoutine === "complicated"}
                    onChange={val =>
                      setForm({ ...form, bodyRoutine: val ? "complicated" : "simple" })
                    }
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-200">{form.bodyRoutine === "complicated" ? "Complicated" : "Simple"}</span>
                </label>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  Complicated = more products/steps, Simple = easy/minimal routine.
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Glow-Up Goals</label>
                <Input
                  className="text-base py-2 w-full"
                  placeholder="e.g., Lose 5kg, clearer skin, healthier hair"
                  value={form.goals}
                  onChange={e => setForm({ ...form, goals: e.target.value })}
                />
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  Your #1 glow-up focus.
                </div>
              </div>
              <div>
                <label className="font-bold text-base sm:text-lg mb-1 block text-black dark:text-white">Location (optional)</label>
                <Input
                  className="text-base py-2 w-full"
                  placeholder="City, Country or leave blank"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </CardContent>
          </>
        );
      case 6:
        return (
          <>
            <CardHeader className="flex flex-col items-center gap-1">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-black dark:text-white">
                Review & Confirm
              </CardTitle>
              <div className="text-base text-muted-foreground font-medium text-center dark:text-slate-200">Double check before you finish!</div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-base sm:text-lg">
                {Object.entries(form).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="font-medium capitalize text-black dark:text-white">{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-black dark:text-white">
                      {Array.isArray(v) ? (v.length ? v.join(", ") : <span className="text-muted-foreground">—</span>) : (typeof v === "string" && v.trim() === "" ? <span className="text-muted-foreground">—</span> : v)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  }

  function validateStep() {
    let newErrors = {};
    if (step === 0) {
      if (!form.name.trim()) newErrors.name = "Name required";
      if (!form.age) newErrors.age = "Age required";
      if (!form.gender) newErrors.gender = "Gender required";
    }
    if (step === 1) {
      if (!form.height) newErrors.height = "Height required";
      if (!form.weight) newErrors.weight = "Weight required";
      if (!form.bodyType) newErrors.bodyType = "Body type required";
    }
    if (step === 2) {
      if (!form.hairType) newErrors.hairType = "Hair type required";
      if (!form.hairPorosity) newErrors.hairPorosity = "Porosity required";
      if (!form.scalpType) newErrors.scalpType = "Scalp type required";
      if (!form.skinType) newErrors.skinType = "Skin type required";
    }
    if (step === 3) {
      if (!form.faceNow.length) newErrors.faceNow = "Pick at least 1 current skin concern";
      if (!form.faceWants.length) newErrors.faceWants = "Pick at least 1 goal";
    }
    if (step === 4) {
      if (form.budget && isNaN(Number(form.budget))) newErrors.budget = "Budget must be a number";
    }
    if (step === 5) {
      if (!form.goals.trim()) newErrors.goals = "Goal required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    setStep(step + 1);
  }
  function handleBack() {
    setStep(step - 1);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep()) return;
    localStorage.setItem("glowup-profile", JSON.stringify(form));
    if (onComplete) onComplete(form);
  }

  const variants = {
    initial: { opacity: 0, y: 32, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -32, scale: 0.96 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-sky-900 to-fuchsia-900 dark:from-[#050b18] dark:to-[#21173a] px-1 sm:px-2 py-8 sm:py-16 relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1.4, opacity: 0.26 }}
        transition={{ duration: 1.3, type: "spring" }}
        className="absolute top-1/2 left-1/3 w-[48vw] h-[32vw] bg-fuchsia-400 rounded-full blur-3xl opacity-60 -z-10"
      />
      <Card className="
        w-full 
        max-w-xl 
        sm:max-w-lg 
        md:max-w-xl 
        lg:max-w-2xl
        rounded-3xl shadow-2xl border-0
        bg-white/90 dark:bg-[#171c28]/85
        backdrop-blur-xl
        px-2 sm:px-6 md:px-8 py-6 sm:py-10
        relative
      ">
        <form onSubmit={handleSubmit}>
          {/* Progress bar */}
          <div className="mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, type: "spring" }}
              className="h-2 rounded-xl bg-gradient-to-r from-indigo-400 via-blue-400 to-fuchsia-400 shadow-lg"
              style={{
                boxShadow: "0 0 24px 4px #a78bfa88, 0 3px 18px #3b82f675",
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-lg font-extrabold text-indigo-700 dark:text-fuchsia-200 drop-shadow">{steps[step]}</div>
              <div className="text-base text-muted-foreground font-bold dark:text-gray-300">{step + 1} / {steps.length}</div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.32 }}
              className="mb-2"
            >
              {getStepContent(step)}
            </motion.div>
          </AnimatePresence>
          <CardFooter className="flex gap-2 justify-end mt-5">
            {step > 0 && (
              <Button type="button" onClick={handleBack} variant="outline" className="font-semibold">
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={handleNext} className="bg-gradient-to-r from-blue-400 via-fuchsia-400 to-indigo-500 text-white font-bold shadow">
                Next
              </Button>
            ) : (
              <Button type="submit" className="bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white font-extrabold shadow-xl">
                Finish & Save
              </Button>
            )}
          </CardFooter>
          {Object.keys(errors).length > 0 && (
            <div className="mt-3 text-base text-red-400 font-semibold">
              {Object.values(errors).map((msg, i) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
