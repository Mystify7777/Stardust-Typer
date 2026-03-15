import { describe, it, expect } from 'vitest'
import {
	calculateWordScore,
	computeComboMultiplier,
	PERFECT_BONUS_FACTOR,
	MAX_COMBO_MULTIPLIER
} from './useScoring'

const round = (value) => Math.round(value * 100) / 100

describe('useScoring helpers', () => {
	it('applies combo multiplier and perfect bonus', () => {
		const { baseScore, comboScore, perfectBonus, totalScore } = calculateWordScore({
			wordLength: 5,
			difficulty: 'Normal',
			combo: 3,
			wasPerfect: true
		})

		expect(baseScore).toBe(70)
		expect(comboScore).toBe(84)
		expect(perfectBonus).toBe(Math.round(baseScore * PERFECT_BONUS_FACTOR))
		expect(totalScore).toBe(comboScore + perfectBonus)
	})

	it('caps combo multiplier at max cap', () => {
		const capped = computeComboMultiplier(50)
		expect(round(capped)).toBe(MAX_COMBO_MULTIPLIER)
		const { comboScore, totalScore } = calculateWordScore({
			wordLength: 4,
			difficulty: 'Hard',
			combo: 50,
			wasPerfect: false
		})
		expect(comboScore).toBe(totalScore)
	})

	it('returns base multiplier when combo is 1', () => {
		const mult = computeComboMultiplier(1)
		expect(mult).toBe(1)
		const { comboScore, baseScore, perfectBonus } = calculateWordScore({
			wordLength: 6,
			difficulty: 'Easy',
			combo: 1,
			wasPerfect: false
		})
		expect(comboScore).toBe(baseScore)
		expect(perfectBonus).toBe(0)
	})
})
