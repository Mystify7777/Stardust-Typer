import { useCallback, useState } from 'react'
import useStars from './useStars'
import useKeyboardInput from './useKeyboardInput'
import useScoring from './useScoring'

// Handles spawning/moving stars and typing interaction while the game is running.
export default function useGameLoop({
	isRunning,
	paused = false,
	difficulty,
	wordPack = 'Core',
	resetSeed = 0,
	onLifeLost,
	onScoreGain,
	onScoreEvent,
	onLifeGain,
	onComboChange,
	onPerfectWord,
	onPerfectReset,
	onMissKey,
	onWordComplete,
	onMissCascade
}) {
	const [activeId, setActiveId] = useState(null)
	const scoring = useScoring({ onComboChange })

	const clearActive = useCallback(() => setActiveId(null), [])

	const { stars, starsRef, updateStars, spawnLifePickup } = useStars({
		isRunning,
		paused,
		difficulty,
		wordPack,
		resetSeed,
		onLifeLost,
		onMissCascade,
		onComboReset: scoring.resetCombo,
		onActiveClear: clearActive
	})

	useKeyboardInput({
		isRunning,
		paused,
		difficulty,
		starsRef,
		updateStars,
		activeId,
		setActiveId,
		bumpCombo: scoring.bumpCombo,
		scoreWord: scoring.scoreWord,
		onPerfectReset,
		onMissKey,
		onScoreGain,
		onScoreEvent,
		onWordComplete,
		onPerfectWord,
		onLifeGain,
		spawnLifePickup
	})

	return { stars, activeId }
}
