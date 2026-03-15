import { useEffect, useRef, useState } from 'react'
import { getWordForPackAndDifficulty } from '../utils/wordLists'
import { getDifficultyConfig, STAGE_HEIGHT, MAX_SCALE, SCALE_TIME_DENOM } from '../utils/difficulty'

const createStar = ({ word, difficulty, x, type = 'word' }) => ({
	id: crypto.randomUUID(),
	word,
	x,
	y: -30,
	typed: 0,
	difficulty,
	type,
	mistyped: false
})

export default function useStars({
	isRunning,
	paused = false,
	difficulty,
	wordPack = 'Core',
	resetSeed = 0,
	onLifeLost,
	onMissCascade,
	onComboReset,
	onActiveClear
}) {
	const [stars, setStars] = useState([])
	const rafRef = useRef(null)
	const lastSpawnRef = useRef(performance.now())
	const lastFrameRef = useRef(performance.now())
	const starsRef = useRef([])
	const elapsedRef = useRef(0)

	const syncStars = (updater) => {
		setStars((prev) => {
			const next = typeof updater === 'function' ? updater(prev) : updater
			starsRef.current = next
			return next
		})
	}

	const spawnStar = () => {
		const word = getWordForPackAndDifficulty(wordPack, difficulty)
		const x = 8 + Math.random() * 84
		syncStars((prev) => [...prev, createStar({ word, difficulty, x })])
	}

	const spawnLifePickup = () => {
		if (starsRef.current.some((s) => s.type === 'life')) return
		const x = 10 + Math.random() * 80
		syncStars((prev) => [...prev, createStar({ word: 'life', difficulty, x, type: 'life' })])
	}

	const resetLoop = (clearCombo = false) => {
		if (rafRef.current) cancelAnimationFrame(rafRef.current)
		lastSpawnRef.current = performance.now()
		lastFrameRef.current = performance.now()
		elapsedRef.current = 0
		syncStars([])
		if (clearCombo && onComboReset) onComboReset()
		if (clearCombo && onActiveClear) onActiveClear()
	}

	const step = (now) => {
		const cfg = getDifficultyConfig(difficulty)
		const delta = (now - lastFrameRef.current) / 1000
		lastFrameRef.current = now
		elapsedRef.current += delta

		const scale = Math.min(1 + elapsedRef.current / SCALE_TIME_DENOM, MAX_SCALE)
		const scaledInterval = cfg.spawnInterval / scale
		const scaledSpeed = cfg.speed * scale

		let lost = 0
		let moved = starsRef.current
			.map((s) => ({ ...s, y: s.y + scaledSpeed * delta }))
			.filter((s) => {
				const alive = s.y < STAGE_HEIGHT
				if (!alive && s.type === 'word') lost += 1
				return alive
			})

		if (lost > 0) {
			if (onComboReset) onComboReset()
			if (onActiveClear) onActiveClear()
			if (onLifeLost) onLifeLost(lost)
			const clearedLower = moved.filter((s) => s.type === 'word' && s.y >= STAGE_HEIGHT / 2)
			if (clearedLower.length > 0) {
				const clearedIds = new Set(clearedLower.map((s) => s.id))
				moved = moved.filter((s) => !clearedIds.has(s.id))
				if (onMissCascade) onMissCascade(clearedLower.length)
			}
		}

		syncStars(moved)

		if (now - lastSpawnRef.current >= scaledInterval) {
			spawnStar()
			lastSpawnRef.current = now
		}

		rafRef.current = requestAnimationFrame(step)
	}

	useEffect(() => {
		if (!isRunning) {
			resetLoop(true)
			return undefined
		}

		resetLoop(true)
		rafRef.current = requestAnimationFrame(step)

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRunning, difficulty, resetSeed])

	useEffect(() => {
		if (!isRunning) return undefined

		if (paused) {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
			rafRef.current = null
			return undefined
		}

		lastFrameRef.current = performance.now()
		if (!rafRef.current) rafRef.current = requestAnimationFrame(step)
		return undefined
	}, [paused, isRunning])

	return {
		stars,
		starsRef,
		updateStars: syncStars,
		spawnLifePickup
	}
}
