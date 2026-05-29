import {create} from "zustand"

const useUnicafe = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    incrementGood: () => set(state => ({good: state.good + 1})),
    incrementNeutral: () => set(state => ({neutral: state.neutral + 1})),
    incrementBad: () => set(state => ({bad: state.bad + 1})),
  }
}))

export const useUnicafeGood = () => useUnicafe(state => state.good)
export const useUnicafeNeutral = () => useUnicafe(state => state.neutral)
export const useUnicafeBad = () => useUnicafe(state => state.bad)

export const useUnicafeAll = () => useUnicafe(state => state.good + state.neutral + state.bad)

export const useUnicafeAverage = () => useUnicafe(state => {
  const all = state.good + state.neutral + state.bad;
  return all === 0 ? 0 : (state.good - state.bad) / all
})

export const useUnicafePositive = () => useUnicafe(state => {
  const all = state.good + state.neutral + state.bad
  return all === 0 ? 0 : (state.good / all) * 100
})

export const useUnicafeFeedback = () => useUnicafe(state => state.actions)
