# Bug Log

## 2026-02-20
- Location: src/components/GameContainer.jsx
- Error: "Missing initializer in destructuring declaration" and earlier "Unexpected token" during `npm run dev`.
- Cause: Malformed JSX/useEffect after UI refactor—useEffect lacked closing brace and duplicate closing tags/return blocks were left in the file.
- Fix: Closed the useEffect properly and removed stray duplicated JSX so the component returns once outside the effect. Commit in-place fix applied.
- Follow-up: Reordered declarations and restored `startGame` after an accidental edit that reintroduced broken `useEffect` syntax; cleaned dependency array.

## 2026-02-20
- Location: src/components/GameContainer.jsx (combo tracking)
- Issue: Best combo displayed incorrectly (reset on leaving play or not recorded); game-over modal sometimes showed lower combo than achieved.
- Cause: Only current combo was tracked; it reset when leaving play and was passed directly to GameOver without persisting the max.
- Fix: Added bestCombo state with derived bestComboMultiplier; onComboChange now updates both current and best; best values passed to GameOver modal; current combo no longer cleared on game-state exit.*** End Patch
