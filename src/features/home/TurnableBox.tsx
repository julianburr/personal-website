"use client";

import { ArrowFatUp } from "@phosphor-icons/react";
import classNames from "classnames";

import { usePersistedState } from "@/utils/usePersistedState";

export function TurnableBox({ className }: { className: classNames.Argument }) {
  const [turned, setTurned] = usePersistedState("turnable-box", true);
  return (
    <button
      onClick={() => setTurned(!turned)}
      className={classNames(
        className,
        "flex flex-col text-center justify-center border-none p-0 items-center cursor-pointer transition-all text-black/20 hover:drop-shadow-xl",
        { ["rotate-180"]: turned }
      )}
    >
      <ArrowFatUp className="flex text-3xl" />
      <span className="font-heading">This side up</span>
    </button>
  );
}
