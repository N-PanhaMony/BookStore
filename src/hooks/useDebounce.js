import { useState, useEffect } from "react";

/**
 * Custom debounce hook
 * @param {any} value - The value to debounce (like searchTerm)
 * @param {number} delay - Delay in ms (default 500)
 * @returns {any} The debounced value
 */
export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler); // cleanup when value changes
  }, [value, delay]);

  return debounced;
}
