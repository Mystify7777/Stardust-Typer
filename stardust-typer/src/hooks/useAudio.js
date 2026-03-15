import { useCallback, useRef } from 'react'

const createTone = (ctx, { frequency = 440, duration = 0.08, type = 'sine', volume = 0.12 }) => {
	const osc = ctx.createOscillator()
	const gain = ctx.createGain()
	osc.type = type
	osc.frequency.value = frequency
	gain.gain.value = volume
	osc.connect(gain)
	gain.connect(ctx.destination)
	osc.start()
	osc.stop(ctx.currentTime + duration)
}

export default function useAudio() {
	const ctxRef = useRef(null)

	const getCtx = () => {
		if (!ctxRef.current) {
			ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
		}
		return ctxRef.current
	}

	const playHit = useCallback(() => {
		createTone(getCtx(), { frequency: 640, duration: 0.09, type: 'triangle', volume: 0.14 })
	}, [])

	const playMiss = useCallback(() => {
		createTone(getCtx(), { frequency: 200, duration: 0.1, type: 'sawtooth', volume: 0.12 })
	}, [])

	const playLife = useCallback(() => {
		const ctx = getCtx()
		createTone(ctx, { frequency: 520, duration: 0.08, type: 'square', volume: 0.12 })
		createTone(ctx, { frequency: 780, duration: 0.08, type: 'square', volume: 0.1 })
	}, [])

	const playLoseLife = useCallback(() => {
		createTone(getCtx(), { frequency: 110, duration: 0.18, type: 'sawtooth', volume: 0.16 })
	}, [])

	const playPause = useCallback(() => {
		createTone(getCtx(), { frequency: 360, duration: 0.08, type: 'triangle', volume: 0.1 })
	}, [])

	return { playHit, playMiss, playLife, playLoseLife, playPause }
}
