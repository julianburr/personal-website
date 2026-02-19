import { useEffect, useState } from 'react';

export function usePersistedState<T = any>(key: string, fallback: T) {
  const fromStorage =
    typeof window !== 'undefined'
      ? window.localStorage?.getItem(key)
      : undefined;
  const fallbackValue = fromStorage
    ? (JSON.parse(fromStorage)?.value ?? fallback)
    : fallback;

  const [state, setState] = useState<T>(fallbackValue);

  useEffect(() => {
    window.localStorage?.setItem(
      key,
      JSON.stringify({ value: state, ts: new Date().getTime() }),
    );
  }, [state]);

  return [state, setState] as const;
}
