export const WORD_PACKS = {
  Core: {
    Easy: [
      "sun", "moon", "star", "sky", "rock", "tree", "wind", "sand", "ship", "bird",
      "water", "stone", "bright", "calm", "light", "swift", "breeze", "quiet", "soft", "warm"
    ],
    Normal: [
      "orbit", "meteor", "nebula", "comet", "galaxy", "cosmic", "rocket", "plasma", "fusion", "saturn",
      "aurora", "signal", "lumen", "vector", "cipher", "module", "quantum", "turbine", "horizon", "stellar"
    ],
    Hard: [
      "supernova", "singularity", "graviton", "telemetry", "trajectory", "ionization", "luminosity", "chronicle", "entropy", "tesseract",
      "hypersonic", "radiometry", "astronomy", "magnetar", "parallax", "quasar", "spectral", "monolith", "cypher", "anomaly"
    ]
  },
  Programming: {
    Easy: ["code", "bug", "loop", "byte", "data", "test", "lint", "push", "pull", "repo"],
    Normal: ["async", "await", "lambda", "socket", "cursor", "router", "schema", "bundle", "deploy", "render"],
    Hard: ["polymorph", "idempotent", "serialization", "immutability", "microservice", "observability", "backpressure", "virtualize", "compilation", "synchronization"]
  },
  Cyberpunk: {
    Easy: ["neon", "night", "rain", "grid", "byte", "hack", "glow", "city", "code", "gear"],
    Normal: ["chrome", "runner", "augmented", "noir", "signal", "overlay", "drifter", "synth", "holo", "cipher"],
    Hard: ["neuralink", "megacorp", "afterlight", "blackice", "technomancer", "datasphere", "quantwire", "ghostnet", "hyperchrome", "cipherpunk"]
  },
  Anime: {
    Easy: ["hero", "ninja", "spirit", "petal", "sword", "magic", "dream", "cat", "sky", "beam"],
    Normal: ["mecha", "senpai", "isekai", "cosplay", "alchemy", "guardian", "katana", "phoenix", "sakura", "shuriken"],
    Hard: ["tsukumogami", "kaminarimon", "interstellar", "synchronizer", "dimension", "transmutation", "spectralblade", "chronobreak", "astralweave", "aetherial"]
  }
}

const FALLBACK_PACK = 'Core'

export function getWordForPackAndDifficulty(pack = FALLBACK_PACK, difficulty = "Normal") {
  const safePack = WORD_PACKS[pack] ? pack : FALLBACK_PACK
  const pool = (WORD_PACKS[safePack] && WORD_PACKS[safePack][difficulty]) || WORD_PACKS[FALLBACK_PACK].Normal
  const idx = Math.floor(Math.random() * pool.length)
  return pool[idx]
}
