import { useCallback, useRef } from 'react'
import { getDifficultyConfig } from '../utils/difficulty'

export const EXTRA_LIFE_STREAK = 8
export const MAX_COMBO_MULTIPLIER = 3
export const COMBO_INCREMENT = 0.1 // +10% per word up to cap
export const PERFECT_BONUS_FACTOR = 0.5 // +50% of base word score when no mistakes

export const computeComboMultiplier = (combo) => {
	const mult = 1 + Math.max(0, combo - 1) * COMBO_INCREMENT
	return Math.min(mult, MAX_COMBO_MULTIPLIER)
}

export const calculateWordScore = ({ wordLength, difficulty, combo, wasPerfect }) => {
	const cfg = getDifficultyConfig(difficulty)
	const baseScore = wordLength * 10 * cfg.scoreMultiplier
	const comboMultiplier = computeComboMultiplier(combo)
	const comboScore = Math.round(baseScore * comboMultiplier)
	const perfectBonus = wasPerfect ? Math.round(baseScore * PERFECT_BONUS_FACTOR) : 0
	return {
		baseScore,
		comboScore,
		totalScore: comboScore + perfectBonus,
		perfectBonus
	}
}

export default function useScoring({ onComboChange } = {}) {
	const comboRef = useRef(0)

	const reportCombo = useCallback(
		(value) => {
			comboRef.current = value
			if (onComboChange) onComboChange(value)
		},
		[onComboChange]
	)

	const resetCombo = useCallback(() => reportCombo(0), [reportCombo])

	const bumpCombo = useCallback(() => {
		const next = comboRef.current + 1
		reportCombo(next)
		return next
	}, [reportCombo])

	const getComboMultiplier = useCallback(() => computeComboMultiplier(comboRef.current), [])

	const scoreWord = useCallback(
		({ wordLength, difficulty, wasPerfect }) =>
			calculateWordScore({ wordLength, difficulty, combo: comboRef.current, wasPerfect }),
		[]
	)

	return {
		comboRef,
		resetCombo,
		bumpCombo,
		getComboMultiplier,
		scoreWord
	}
}
