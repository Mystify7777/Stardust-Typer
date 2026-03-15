import { useEffect } from 'react'
import { EXTRA_LIFE_STREAK } from './useScoring'

const getActiveTarget = (starsRef, activeId) => {
	const candidates = starsRef.current.filter((s) => s.typed < s.word.length)
	if (candidates.length === 0) return null
	const sorted = [...candidates].sort((a, b) => b.y - a.y)
	if (!activeId) return sorted[0]
	return candidates.find((s) => s.id === activeId) || sorted[0]
}

export default function useKeyboardInput({
	isRunning,
	paused = false,
	difficulty,
	starsRef,
	updateStars,
	activeId,
	setActiveId,
	bumpCombo,
	scoreWord,
	onPerfectReset,
	onMissKey,
	onScoreGain,
	onScoreEvent,
	onWordComplete,
	onPerfectWord,
	onLifeGain,
	spawnLifePickup
}) {
	useEffect(() => {
		if (!isRunning || paused) return undefined

		const handleKeyDown = (e) => {
			const key = e.key.toLowerCase()

			if (key === 'arrowup' || key === 'arrowdown') {
				e.preventDefault()
				const candidates = starsRef.current.filter((s) => s.typed < s.word.length)
				if (candidates.length === 0) return
				const sorted = [...candidates].sort((a, b) => b.y - a.y)
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
			const target = getActiveTarget(starsRef, activeId)
			if (!target) return

			setActiveId(target.id)
			const expectedChar = target.word[target.typed]
			if (key !== expectedChar.toLowerCase()) {
				updateStars((prev) => prev.map((s) => (s.id === target.id ? { ...s, mistyped: true } : s)))
				if (onPerfectReset) onPerfectReset()
				if (onMissKey) onMissKey()
				return
			}

			const nextTyped = target.typed + 1
			const targetCompleted = nextTyped === target.word.length

			if (targetCompleted) {
				if (target.type === 'life') {
					if (onLifeGain) onLifeGain(1)
					updateStars((prev) => prev.filter((s) => s.id !== target.id))
					setActiveId(null)
					return
				}

				const comboAfter = bumpCombo()
				const { totalScore, perfectBonus } = scoreWord({
					wordLength: target.word.length,
					difficulty,
					wasPerfect: !target.mistyped
				})

				if (perfectBonus > 0 && onPerfectWord) {
					onPerfectWord({ base: totalScore - perfectBonus, bonus: perfectBonus })
				}
				if (onScoreGain) onScoreGain(totalScore)
				if (onScoreEvent) onScoreEvent({ amount: totalScore, x: target.x, y: target.y })
				if (comboAfter > 0 && comboAfter % EXTRA_LIFE_STREAK === 0) {
					spawnLifePickup()
				}
				updateStars((prev) => prev.filter((s) => s.id !== target.id))
				setActiveId(null)
				if (onWordComplete) onWordComplete()
				return
			}

			updateStars((prev) => prev.map((s) => (s.id === target.id ? { ...s, typed: nextTyped } : s)))
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isRunning, paused, difficulty, starsRef, activeId, setActiveId, updateStars, bumpCombo, scoreWord, onPerfectReset, onMissKey, onScoreGain, onScoreEvent, onWordComplete, onPerfectWord, onLifeGain, spawnLifePickup])
}
