import { useCallback, useState } from "react";

/**
 * Sync state with localStorage with full TypeScript support.
 * @param key - localStorage key
 * @param initialValue - default value if key not found
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                if (typeof window !== "undefined") {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.error(`useLocalStorage: error setting key "${key}"`, error);
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue);
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`useLocalStorage: error removing key "${key}"`, error);
        }
    }, [initialValue, key]);

    return [storedValue, setValue, removeValue] as const;
}
