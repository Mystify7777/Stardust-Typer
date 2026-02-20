export const WORD_SETS = {
  Easy: [
    "sun", "moon", "star", "sky", "rock", "tree", "wind", "sand", "ship", "bird",
    "water", "stone", "bright", "calm", "light", "swift", "breeze", "quiet", "soft", "warm"
  ],
  Normal: [
    "orbit", "meteor", "nebula", "comet", "galaxy", "cosmic", "rocket", "plasma", "fusion", "saturn",
    "aurora", "signal", "lumen", "vector", "cipher", "module", "quantum", "module", "turbine", "horizon"
  ],
  Hard: [
    "supernova", "singularity", "graviton", "telemetry", "trajectory", "ionization", "luminosity", "chronicle", "entropy", "tesseract",
    "hypersonic", "radiometry", "astronomy", "magnetar", "parallax", "quasar", "spectral", "monolith", "cypher", "anomaly"
  ]
}

export function getWordForDifficulty(difficulty = "Normal") {
  const pool = WORD_SETS[difficulty] || WORD_SETS.Normal
  const idx = Math.floor(Math.random() * pool.length)
  return pool[idx]
}
