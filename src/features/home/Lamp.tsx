'use client';

import { usePersistedState } from '@/utils/usePersistedState';

export function Lamp() {
  const [isLightOn, setIsLightOn] = usePersistedState('home/lampLight', false);
  return (
    <>
      <button
        data-light={isLightOn}
        onClick={() => setIsLightOn(!isLightOn)}
        className="lamp highlight-object absolute cursor-pointer top-[44%] left-[67.5%] h-[6vh] w-[3vh] rounded-full"
      />
    </>
  );
}
