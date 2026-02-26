'use client';

import { Books } from '@/features/home/Books';
import { CoffeeMug } from '@/features/home/CoffeeMug';
import { Globe } from '@/features/home/Globe';
import { Lamp } from '@/features/home/Lamp';
import { PenAndPaper } from '@/features/home/PenAndPaper';
import { RubicsCube } from '@/features/home/RubicsCube';

export function InteractiveElements() {
  return (
    <>
      <Lamp />
      <CoffeeMug />
      <Globe />
      <RubicsCube />
      <Books />
      <PenAndPaper />
    </>
  );
}
