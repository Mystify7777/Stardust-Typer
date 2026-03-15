export const DIFFICULTY_CONFIG = {
  Easy: { spawnInterval: 1600, speed: 60, scoreMultiplier: 1 },
  Normal: { spawnInterval: 1200, speed: 80, scoreMultiplier: 1.4 },
  Hard: { spawnInterval: 900, speed: 110, scoreMultiplier: 1.8 },
};

export const STAGE_HEIGHT = 600;
export const MAX_SCALE = 2; // cap progressive scaling to avoid runaway speed/spawn
export const SCALE_TIME_DENOM = 60; // seconds to reach 2x difficulty

export const getDifficultyConfig = (difficulty) => DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Normal;
