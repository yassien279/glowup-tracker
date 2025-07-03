import React, { useState } from "react";

// Example workouts database (customize/expand as needed)
const workoutsDB = [
  {
    goal: "Weight Loss",
    equipment: ["Bodyweight", "Treadmill", "Dumbbell"],
    intensity: "Beginner",
    duration: 15,
    plan: [
      "Jumping jacks - 1 min",
      "Bodyweight squats - 15 reps",
      "Push-ups - 10 reps",
      "Treadmill brisk walk - 5 min",
      "Plank - 30 sec",
    ],
  },
  {
    goal: "Muscle Gain",
    equipment: ["Dumbbell"],
    intensity: "Intermediate",
    duration: 30,
    plan: [
      "Dumbbell bench press - 3x12",
      "Dumbbell rows - 3x12",
      "Dumbbell curls - 3x15",
      "Bodyweight squats - 3x15",
      "Plank - 45 sec",
    ],
  },
  {
    goal: "General Fitness",
    equipment: ["Bodyweight", "Dumbbell"],
    intensity: "Beginner",
    duration: 15,
    plan: [
      "Jumping jacks - 1 min",
      "Bodyweight lunges - 10 each leg",
      "Dumbbell shoulder press - 12 reps",
      "Treadmill walk - 5 min",
    ],
  },
  {
    goal: "Strength & Conditioning",
    equipment: ["Bodyweight", "Dumbbell"],
    intensity: "Advanced",
    duration: 30,
    plan: [
      "Push-ups - 4x15",
      "Dumbbell deadlift - 3x12",
      "Burpees - 3x10",
      "Treadmill run - 10 min",
      "Plank - 1 min",
    ],
  },
  // Add more workouts with more variety!
];

const achievementsDB = [
  { name: "First Workout!", key: "firstWorkout" },
  { name: "One Week Consistency", key: "weekStreak" },
  { name: "BMI Improved!", key: "bmiImproved" },
];

function calculateBMI(weight, height) {
  if (!weight || !height) return "";
  const bmi = weight / ((height / 100) ** 2);
  return bmi.toFixed(1);
}

export default function Body({ profile }) {
  // Basic Info
  const [weight, setWeight] = useState(Number(profile.weight) || "");
  const [height] = useState(Number(profile.height) || "");
  const [goalWeight, setGoalWeight] = useState("");
  const [measurements, setMeasurements] = useState({ waist: "", chest: "", arms: "", legs: "" });
  const [progressPhotos, setProgressPhotos] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");

  // Workout Plan Selection
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState("");
  const [selectedTime, setSelectedTime] = useState(15);

  // Workout Log
  const [workoutLog, setWorkoutLog] = useState([]);
  const [completedToday, setCompletedToday] = useState(false);

  // Achievements
  const [achievements, setAchievements] = useState({
    firstWorkout: false,
    weekStreak: false,
    bmiImproved: false,
  });

  // Motivation
  const motivationalQuotes = [
    "Small progress is still progress!",
    "Push yourself, because no one else is going to do it for you.",
    "You don't have to be extreme, just consistent.",
    "Take care of your body. It's the only place you have to live.",
    "Discipline is the bridge between goals and accomplishment.",
  ];

  // Progress Tracking
  const [weightHistory, setWeightHistory] = useState([
    { date: new Date().toLocaleDateString(), weight: Number(profile.weight) || 0 }
  ]);

  // Handle measurement change
  const handleMeasurement = (e) => {
    setMeasurements({ ...measurements, [e.target.name]: e.target.value });
  };

  // Handle new weight log
  const logWeight = () => {
    setWeightHistory([...weightHistory, { date: new Date().toLocaleDateString(), weight: weight }]);
  };

  // Add progress photo
  const addPhoto = () => {
    if (photoUrl.trim()) {
      setProgressPhotos([photoUrl, ...progressPhotos]);
      setPhotoUrl("");
    }
  };

  // Workout selection and logging
  const matchingWorkouts = workoutsDB.filter(
    (w) =>
      (!selectedGoal || w.goal === selectedGoal) &&
      (!selectedEquipment || w.equipment.includes(selectedEquipment)) &&
      (!selectedIntensity || w.intensity === selectedIntensity) &&
      (!selectedTime || w.duration === Number(selectedTime))
  );
  const today = new Date().toLocaleDateString();

  // Log workout completion
  const completeWorkout = () => {
    setWorkoutLog([...workoutLog, { date: today, plan: matchingWorkouts[0]?.plan || [] }]);
    setCompletedToday(true);
    if (!achievements.firstWorkout) {
      setAchievements({ ...achievements, firstWorkout: true });
    }
    // Simple streak achievement (7 days in a row)
    const streak = workoutLog
      .slice(-6)
      .every((log, i, arr) =>
        new Date(log.date).getDate() === new Date(today).getDate() - (arr.length - i)
      );
    if (streak && !achievements.weekStreak) {
      setAchievements({ ...achievements, weekStreak: true });
    }
    // BMI achievement
    if (goalWeight && Number(weight) < Number(goalWeight) && !achievements.bmiImproved) {
      setAchievements({ ...achievements, bmiImproved: true });
    }
  };

  // Educational tips
  const tips = [
    "Always warm up before workouts and cool down after.",
    "Track your weight and progress, but don't stress minor changes.",
    "Use correct form to avoid injury—quality over quantity!",
    "Rest is as important as exercise for muscle growth.",
    "Hydration and sleep boost recovery and performance.",
  ];

  return (
    <div className="p-6 md:p-12 bg-gray-900 min-h-screen">
      {/* Basic Stats */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-300 mb-2">Your Body Stats</h2>
        <div className="mb-2 text-gray-200">
          <div>Height: <b>{height} cm</b></div>
          <div>
            Weight:
            <input
              className="mx-2 px-2 rounded bg-gray-700 text-gray-200 w-20"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <button className="ml-2 px-3 py-1 bg-green-500 rounded text-white" onClick={logWeight}>
              Log
            </button>
          </div>
          <div>BMI: <b>{calculateBMI(weight, height)}</b></div>
          <div>
            Goal Weight:
            <input
              className="mx-2 px-2 rounded bg-gray-700 text-gray-200 w-20"
              type="number"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {["waist", "chest", "arms", "legs"].map((m) => (
            <label key={m} className="text-gray-200">
              {m.charAt(0).toUpperCase() + m.slice(1)} (cm)
              <input
                name={m}
                type="number"
                className="block mt-1 rounded px-2 py-1 bg-gray-700 text-gray-200 w-20"
                value={measurements[m]}
                onChange={handleMeasurement}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Weight Progress */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-green-300 mb-2">Weight Progress</h2>
        <div className="text-gray-100 mb-2">
          {weightHistory.map((w, i) => (
            <div key={i}>{w.date}: <b>{w.weight} kg</b></div>
          ))}
        </div>
      </div>

      {/* Progress Photos */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-gray-100">Visual Progress Log</h2>
        <input
          className="rounded-lg px-3 py-2 bg-gray-700 text-gray-200 w-full my-3"
          placeholder="Paste photo URL here..."
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={addPhoto}>
          Add Photo
        </button>
        <div className="flex gap-3 mt-4 flex-wrap">
          {progressPhotos.map((url, idx) => (
            <img key={idx} src={url} alt={`Progress ${idx}`} className="w-24 h-24 rounded-lg object-cover border" />
          ))}
        </div>
      </div>

      {/* Workout Plan Selection */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-300 mb-2">Personalized Workout Plan</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <select
            className="rounded px-3 py-2 bg-gray-700 text-gray-200"
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
          >
            <option value="">Goal</option>
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>General Fitness</option>
            <option>Strength & Conditioning</option>
          </select>
          <select
            className="rounded px-3 py-2 bg-gray-700 text-gray-200"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
          >
            <option value="">Equipment</option>
            <option>Bodyweight</option>
            <option>Dumbbell</option>
            <option>Treadmill</option>
          </select>
          <select
            className="rounded px-3 py-2 bg-gray-700 text-gray-200"
            value={selectedIntensity}
            onChange={(e) => setSelectedIntensity(e.target.value)}
          >
            <option value="">Intensity</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <select
            className="rounded px-3 py-2 bg-gray-700 text-gray-200"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={60}>1 hour</option>
          </select>
        </div>
        <div className="mb-2">
          {matchingWorkouts.length ? (
            <ul className="text-gray-200 list-disc pl-8">
              {matchingWorkouts[0].plan.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">No plan found for your selection. Try changing filters.</span>
          )}
        </div>
        <button
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={completeWorkout}
          disabled={completedToday || !matchingWorkouts.length}
        >
          {completedToday ? "Workout Completed Today" : "Mark as Completed"}
        </button>
      </div>

      {/* Workout Log & Achievements */}
      <div className="rounded-xl p-6 mb-8 bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-gray-100">Workout Log & Achievements</h2>
        <div className="mb-3 text-gray-200">
          {workoutLog.map((log, i) => (
            <div key={i}>
              {log.date}: <span className="text-green-300">Workout completed</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {achievementsDB.map((a) => (
            <div
              key={a.key}
              className={`rounded-full px-4 py-1 ${achievements[a.key] ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"
                }`}
            >
              {a.name}
            </div>
          ))}
        </div>
      </div>

      {/* Motivation & Tips */}
      <div className="rounded-xl p-6 bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-gray-100">Motivation & Tips</h2>
        <div className="italic text-yellow-200 mb-2">
          "{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"
        </div>
        <ul className="list-disc pl-5 text-gray-100">
          {tips.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
    </div>
  );
}
