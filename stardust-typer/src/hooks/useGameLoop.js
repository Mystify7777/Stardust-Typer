import { useEffect, useRef, useState } from 'react'
import { getWordForDifficulty } from '../utils/wordLists'

const DIFFICULTY_CONFIG = {
	Easy: { spawnInterval: 1600, speed: 60, scoreMultiplier: 1 },
	Normal: { spawnInterval: 1200, speed: 80, scoreMultiplier: 1.4 },
	Hard: { spawnInterval: 900, speed: 110, scoreMultiplier: 1.8 }
}

const EXTRA_LIFE_STREAK = 8
const MAX_COMBO_MULTIPLIER = 3
const COMBO_INCREMENT = 0.1 // +10% per word up to cap
const PERFECT_BONUS_FACTOR = 0.5 // +50% of base word score when no mistakes

const STAGE_HEIGHT = 600

// Handles spawning/moving stars and typing interaction while the game is running.
export default function useGameLoop({
	isRunning,
	paused = false,
	difficulty,
	resetSeed = 0,
	onLifeLost,
	onScoreGain,
	onLifeGain,
	onComboChange,
	onPerfectWord,
	onPerfectReset,
	onMissKey,
	onWordComplete
}) {
	const [stars, setStars] = useState([])
	const [activeId, setActiveId] = useState(null)
	const rafRef = useRef(null)
	const lastSpawnRef = useRef(performance.now())
	const lastFrameRef = useRef(performance.now())
	const starsRef = useRef([])
	const comboRef = useRef(0)

	const reportCombo = (value) => {
		comboRef.current = value
		if (onComboChange) onComboChange(value)
	}

	const getComboMultiplier = () => {
		const mult = 1 + Math.max(0, comboRef.current - 1) * COMBO_INCREMENT
		return Math.min(mult, MAX_COMBO_MULTIPLIER)
	}

	const syncStars = (updater) => {
		setStars((prev) => {
			const next = typeof updater === 'function' ? updater(prev) : updater
			starsRef.current = next
			return next
		})
	}

	const spawnStar = (type = 'word') => {
		const word = getWordForDifficulty(difficulty)
		const x = 8 + Math.random() * 84 // percentage across stage, keeps inside view
		const star = { id: crypto.randomUUID(), word, x, y: -30, typed: 0, difficulty, type, mistyped: false }
		syncStars((prev) => [...prev, star])
	}

	const spawnLifePickup = () => {
		// Avoid stacking multiple life drops on screen at once.
		if (starsRef.current.some((s) => s.type === 'life')) return
		const x = 10 + Math.random() * 80
		const star = { id: crypto.randomUUID(), word: 'life', x, y: -30, typed: 0, difficulty, type: 'life' }
		syncStars((prev) => [...prev, star])
	}

	const step = (now) => {
		const cfg = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Normal
		const delta = (now - lastFrameRef.current) / 1000
		lastFrameRef.current = now

		// Move stars and collect any that fell past the stage bottom.
		let lost = 0
		const moved = starsRef.current
			.map((s) => ({ ...s, y: s.y + cfg.speed * delta }))
			.filter((s) => {
				const alive = s.y < STAGE_HEIGHT
				if (!alive && s.type === 'word') lost += 1
				return alive
			})
		syncStars(moved)
		if (lost > 0) {
			reportCombo(0)
			if (onLifeLost) onLifeLost(lost)
		}

		// Spawn new stars on interval.
		if (now - lastSpawnRef.current >= cfg.spawnInterval) {
			spawnStar()
			lastSpawnRef.current = now
		}

		rafRef.current = requestAnimationFrame(step)
	}

	useEffect(() => {
		if (!isRunning) {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
			// Only clear stars when stopping play (not when pausing)
			if (!paused) {
				syncStars([])
				setActiveId(null)
				comboRef.current = 0
			}
			return
		}

		// Reset loop state when starting or when resetSeed changes.
		lastSpawnRef.current = performance.now()
		lastFrameRef.current = performance.now()
		syncStars([])
		setActiveId(null)
		reportCombo(0)
		rafRef.current = requestAnimationFrame(step)

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
		}
	}, [isRunning, difficulty, resetSeed, paused])

	useEffect(() => {
		if (!isRunning) return

		const handleKeyDown = (e) => {
			const key = e.key.toLowerCase()

			if (key === 'arrowup' || key === 'arrowdown') {
				e.preventDefault()
				const candidates = starsRef.current.filter((s) => s.typed < s.word.length)
				if (candidates.length === 0) return
				const sorted = [...candidates].sort((a, b) => b.y - a.y) // descending by y
				const currentIdx = sorted.findIndex((s) => s.id === activeId)
				if (key === 'arrowdown') {
					const next = sorted[(currentIdx + 1 + sorted.length) % sorted.length]
					setActiveId(next.id)
					return
				}
				const next = sorted[(currentIdx - 1 + sorted.length) % sorted.length]
				setActiveId(next.id)
				return
			}

			if (key.length !== 1 || key < 'a' || key > 'z') return

			const cfg = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Normal
			const candidates = starsRef.current.filter((s) => s.typed < s.word.length)
			if (candidates.length === 0) return

			// Focus the lowest star (closest to failing) unless a manual selection exists.
			const fallback = candidates.reduce((best, s) => (s.y > best.y ? s : best), candidates[0])
			const target = candidates.find((s) => s.id === activeId) || fallback
			setActiveId(target.id)
			const expectedChar = target.word[target.typed]
			if (key !== expectedChar.toLowerCase()) {
				// Mark this word as no longer perfect if a wrong key was pressed.
				syncStars((prev) => prev.map((s) => (s.id === target.id ? { ...s, mistyped: true } : s)))
				if (onPerfectReset) onPerfectReset()
				if (onMissKey) onMissKey()
				return
			}

			const nextTyped = target.typed + 1
			const targetCompleted = nextTyped === target.word.length

			if (targetCompleted) {
				if (target.type === 'life') {
					if (onLifeGain) onLifeGain(1)
					syncStars((prev) => prev.filter((s) => s.id !== target.id))
					setActiveId(null)
					return
				}

				reportCombo(comboRef.current + 1)
				const comboMultiplier = getComboMultiplier()
				const baseScore = target.word.length * 10 * cfg.scoreMultiplier
				const comboScore = Math.round(baseScore * comboMultiplier)
				let totalScore = comboScore
				if (!target.mistyped) {
					const bonus = Math.round(baseScore * PERFECT_BONUS_FACTOR)
					totalScore += bonus
					if (onPerfectWord) onPerfectWord({ base: comboScore, bonus })
				}
				if (onScoreGain) onScoreGain(totalScore)
				if (comboRef.current > 0 && comboRef.current % EXTRA_LIFE_STREAK === 0) {
					spawnLifePickup()
				}
				syncStars((prev) => prev.filter((s) => s.id !== target.id))
				setActiveId(null)
				if (onWordComplete) onWordComplete()
				return
			}

			syncStars((prev) => prev.map((s) => (s.id === target.id ? { ...s, typed: nextTyped } : s)))
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isRunning, difficulty, onScoreGain, activeId, onMissKey, onWordComplete, onPerfectReset, onPerfectWord])

	return { stars, activeId }
}
