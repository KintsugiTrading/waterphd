import { create } from 'zustand'

type WaterCycleStage = 'hero' | 'evaporation' | 'condensation' | 'precipitation' | 'research' | 'contact'

interface WaterCycleState {
    currentStage: WaterCycleStage
    setStage: (stage: WaterCycleStage) => void
}

export const useWaterCycleStore = create<WaterCycleState>((set) => ({
    currentStage: 'hero',
    setStage: (stage) => set({ currentStage: stage }),
}))
