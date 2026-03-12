import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Centre {
    id: string;
    name: string;
    code: string;
}

export const CENTRES: Centre[] = [
    { id: '1', name: 'Tampines Mall', code: 'TMC' },
    { id: '2', name: 'KAP Mall', code: 'KAP' },
    { id: '3', name: 'Ang Mo Kio', code: 'AMK' },
    { id: '4', name: 'TEE Cares', code: 'TEE' },
];

interface CentreState {
    currentCentre: Centre;
    isMaintenanceMode: boolean;
    
    // Actions
    setCentre: (centre: Centre) => void;
    toggleMaintenanceMode: (enabled: boolean) => void;
}

export const useCentreStore = create<CentreState>()(
    persist(
        (set) => ({
            currentCentre: CENTRES[0],
            isMaintenanceMode: false,

            setCentre: (currentCentre) => set({ currentCentre }),
            toggleMaintenanceMode: (isMaintenanceMode) => set({ isMaintenanceMode }),
        }),
        {
            name: "centre-storage",
        }
    )
);
