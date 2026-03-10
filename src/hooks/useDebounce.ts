import { useCallback, useRef, useState } from "react";

/**
 * Debounce a value – useful for search inputs.
 * @param value - the value to debounce
 * @param delay - delay in ms (default 400)
 */
export function useDebounce<T>(value: T, delay = 400): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const timer = useRef<ReturnType<typeof setTimeout>>(null);

    // Update debounced value after delay
    const update = useCallback(
        (val: T) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setDebouncedValue(val), delay);
        },
        [delay]
    );

    // Keep value in sync
    if (value !== debouncedValue) {
        update(value);
    }

    return debouncedValue;
}
